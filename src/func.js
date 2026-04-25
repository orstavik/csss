import Maths from "./funcMath.js";
import { WebColors } from "./Color.js";
import { cssPhysicalToLogical as normalizeToLogical } from "./cssPhysicalToLogical.js";

const toCamelCase = s => s.replace(/[^a-z]./ig, m => m[1].toUpperCase());

export function BadArgument(name, args, I, message = "") {
  args = args.map(a => a.text ?? (a.name + "/" + a.args.length));
  args[I] = ` => ${args[I]} <= `;
  return new SyntaxError(`Bad argument ${name}/${I + 1}:  ${name}(${args.join(",")})` + message);
}

const once = new Set();
export function matchArgsWithInterpreters(NAME, i, args, INTERPRETERS) {
  once.clear();
  const res = Array(INTERPRETERS.length);
  main: for (; i < args.length; i++) {
    for (let j = 0; j < INTERPRETERS.length; j++) {
      const fn = INTERPRETERS[j];
      if (once.has(j)) continue;
      const v = fn(args[i]);
      if (v == null) continue;
      once.add(j);
      res[j] = v;
      continue main;
    }
    if (args[i].text === "_") continue;
    throw BadArgument(NAME, args, i, "Unknown argument.");
  }
  return res;
}

export function flatVector(op, INTERPRETER, x) {
  if (x.name !== op)
    return (x = INTERPRETER(x)) == null ? x : [x];
  const parts = [];
  for (; x.name === op; x = x.args[0])
    parts.unshift(x.args[1]);
  parts.unshift(x);
  return parts.map((a, i) => {
    const ms = INTERPRETER(a);
    if (ms != null) return ms;
    throw BadArgument(">", parts, i, `Expected ${INTERPRETER.name}, got ${parts[i]}.`);
  });
}

const parseSignature = SIG => {
  const [NAME, ARITY] = SIG.split("/");
  if (ARITY == undefined || ARITY == "") return { NAME };
  let [MIN, MAX = MIN] = ARITY.split("-");
  if (MAX === "") MAX = Infinity;
  return { NAME, MIN: Number(MIN), MAX: Number(MAX) };
};

const SF2 = (CsssNameArity, INTERPRETERS, POST) => {
  const { NAME, MIN = INTERPRETERS.length, MAX = INTERPRETERS.length } = parseSignature(CsssNameArity);
  return ({ args, name }) => {
    if (NAME && NAME !== name) return;
    if (args.length < MIN || args.length > MAX)
      throw new SyntaxError(`${name}() requires ${MIN} to ${MAX} arguments, got ${args.length}.`);

    const res = args.map((a, i) => {
      const a2 = (INTERPRETERS[i] ??= INTERPRETERS.at(-1))(a);
      if (a2 != null) return a2;
      throw BadArgument(name, args, i, INTERPRETERS[i].name);
    });
    return POST ? POST(name, res) : res;
  }
};

const Url = a => a.kind === "QUOTE" ? `url(${a.text})` : a?.name === "url" ? `url(${a.args[0].text})` : undefined;
const Unset = a => a.text === "_" ? "unset" : undefined;
const Name = a => a.kind === "WORD" && a.text.match(/^[a-z_][a-z_0-9-]*$/i)?.[0];
const Quote = a => a.kind === "QUOTE" ? a.text : undefined;
const Word = a => a.kind === "WORD" ? a.text : undefined;

const AbsoluteUrl = a => {
  if (a.kind === "QUOTE" && a.text.match(/^["'\`](https?|data):/i))
    return new URL(a.text.slice(1, -1));
  else if (a.name === "url" && a.args.length === 1 && (a = a.args[0].text))
    if (a.match(/^["'\`](https?|data):/i))
      try { return new URL(a.slice(1, -1)); } catch (e) { }
};

const MimeTypes = {
  image: "image/*",
  imageJpeg: "image/jpeg",
  imagePng: "image/png",
  imageGif: "image/gif",
  imageWebp: "image/webp",
  imageAvif: "image/avif",
  imageSvgXml: "image/svg+xml",
};
const MimeType = a => MimeTypes[a.text];
const ImageSet = SF2("image-set/1-3", [MimeType, Url, Maths.csss.Resolution], (name, [mime, url, resolution]) => `image-set(${url} ${mime} ${resolution})`);

//these return strings.
const CsssPrimitives = {
  ...Maths.csss,
  Name,
  Quote,
  Unset,
  UrlUnset: a => Url(a) ?? Unset(a),
  Url,
  Word,
  NameUnset: a => Name(a) ?? Unset(a),
  MimeType,
  //todo we need to work with the image types.
  ImageSet,
  Image: a => Url(a) ?? ImageSet(a),
  AbsoluteUrl,
  SingleTableRaw: Table => ({ text }) => Table[text],
  SingleFunctionFunction: (CssName, INTERPRETER) => {
    const CsssName = toCamelCase(CssName);
    return ({ name, args }) => name === CsssName && args.length === 1 ? `${CssName}(${INTERPRETER(args[0])})` : undefined
  },
};
//these returns objects.
const CsssFunctions = {
  //this is special
  CssValuesToCsssTable: (One, Two = "") => {
    const Table = {};
    for (let b of One.split("|")) {
      Table[toCamelCase(b)] = b;
      if (Two)
        for (let i of Two.split("|"))
          if (b != i)
            Table[toCamelCase(b + " " + i)] = b + " " + i;
    }
    return Table;
  },
  FunctionType: (CsssName, INTERPRETER) => ({ args, name }) => name === CsssName ? INTERPRETER(args) : undefined,
  PropertyType: (CssProp, Type) => a => (a = Type(a)) && { [CssProp]: a },
  SingleTable: (CssProp, Table) => ({ text }) => text in Table ? { [CssProp]: Table[text] } : undefined,
  LogicalFour: (CsssName, CssName, INTERPRETER) => ({ args, name }) => {
    if (CsssName != name) return;
    if (args.length > 4)
      throw new SyntaxError(`${CsssName}() takes max 4 arguments, got ${args.length}.`);

    if (!args.length)
      return { [CsssName]: "none" };
    args = args.map((a, i) => {
      if (a = INTERPRETER(a))
        return a;
      throw BadArgument(CsssName, args, i, INTERPRETER.name);
    });
    return args.length === 1 ? { [CssName]: args[0] } :
      {
        [CssName + "Block"]: args[2] != null && args[2] != args[0] ? args[0] + " " + args[2] : args[0],
        [CssName + "Inline"]: args[3] != null && args[3] != args[1] ? (args[1] ?? args[0]) + " " + args[3] : args[1] ?? args[0],
      };
  },
  SF2,
  FunctionPropertyType: (CsssName, CssProp, INTERPRETER) => ({ args, name }) => {
    if (CsssName !== name) return;
    if (args.length != 1)
      throw new SyntaxError(`${name}() requires 1 argument, got ${args.length} arguments.`);

    const v = INTERPRETER(args[0]);
    if (v == null) throw BadArgument(name, args, 0, INTERPRETER.name);
    return { [CssProp]: v };
  },
  FunctionFunctionPropertyType: (CssProp, CssFunction, INTERPRETER) => {
    const CsssName = toCamelCase(CssFunction);
    return ({ args, name }) => {
      if (CsssName !== name) return;
      if (args.length != 1)
        throw new SyntaxError(`${name}() requires 1 argument, got ${args.length} arguments.`);

      const v = INTERPRETER(args[0]);
      if (v == null) throw BadArgument(name, args, 0, INTERPRETER.name);
      return { [CssProp]: `${CssFunction}(${v})` };
    }
  },
  SizeFunction: (direction, Op, INTERPRETER) => {
    const Direction = direction[0].toUpperCase() + direction.slice(1);
    const min = `min${Direction}Size`, normal = `${direction}Size`, max = `max${Direction}Size`;
    return x => {
      const res = flatVector(Op, INTERPRETER, x);
      if (res == null) return;
      if (res.length === 1) return { [normal]: res[0] };
      if (res.length === 2) return { [min]: res[0], [normal]: res[1] };
      if (res.length === 3) return { [min]: res[0], [normal]: res[1], [max]: res[2] };
      throw new SyntaxError(`size using ${Op}-vector takes 1 to 3 arguments, got ${res.length}.`);
    }
  },
  ParseFirstThenRest: (INTERPRETER, INNERcb, POST) => ({ args, name }) => {
    if (!args.length)
      throw new SyntaxError(`${name} requires at least 1 argument, got 0 arguments.`)

    const first = INTERPRETER(args[0]);
    if (first == null)
      return INNERcb({ args, name });
    const res = args.length > 1 ? INNERcb({ name, args: args.slice(1) }) : undefined;
    return POST(first, res);
  },
  TypeBasedFunction: (...FUNCTIONS) => ({ args, name }) => Object.assign({}, ...matchArgsWithInterpreters(name, 0, args, FUNCTIONS)),
  FunctionWithDefaultValues: (BASE, CB) => {
    Object.freeze(BASE);
    const reduce = o => { for (let k in o) if ((k + "Block") in o && (k + "Inline") in o) delete o[k]; return o };
    return x => !x.args?.length ? BASE : reduce({ ...BASE, ...CB(x) });
  },
};

const CssFunctions = {
  SingleArgumentFunctionReverse: (CsssFnName, CssProp, INTERPRETER, DEFAULT = "_") => style => {
    let arg = INTERPRETER(style[CssProp] == "unset" ? undefined : style[CssProp]) ?? DEFAULT;
    if (arg !== DEFAULT) return `${CsssFnName}(${arg})`;
  },
  normalizeToLogical,
  LogicalFourReverse: (CssPrefix, CsssFnName, INTERPRETER, DEFAULT = "_") => {
    const toCamel = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

    const squeezeArgs = (args, minArgs = 1) => {
      if (args.every(a => a === DEFAULT)) return undefined;
      if (args.length === 4) {
        if (args[1] === args[3] && (args.pop() || true))
          if (args[0] === args[2] && (args.pop() || true))
            if (args.length > minArgs && args[0] === args[1] && (args.pop() || true))
              ;
      } else if (args.length === 3) {
        if (args[0] === args[2]) args.pop();
        if (args.length > minArgs && args[0] === args[1]) args.pop();
      } else if (args.length === 2) {
        if (args.length > minArgs && args[0] === args[1]) args.pop();
      }
      return `${CsssFnName}(${args.join(",")})`;
    };

    // Setup for Logical Properties
    const PROPS = ["-block-start", "-inline-start", "-block-end", "-inline-end"].map(s => CssPrefix + s);
    const PROPS_CAMEL = PROPS.map(toCamel);
    const SHORTHAND = toCamel(CssPrefix);

    // Setup for Physical Properties 
    const prefixCamel = toCamel(CssPrefix);
    const PHYSICAL_PROPS_CAMEL = ["Top", "Right", "Bottom", "Left"].map(s => prefixCamel + s);

    return style => {
      // 0. --- SHORTHAND PROPERTY CHECK ---
      const shorthand = style[SHORTHAND];
      if (shorthand !== undefined) {
        const tokens = spacelessCssTokens(shorthand);
        if (!tokens.length) return undefined;
        const args = tokens.map(v => INTERPRETER(v) ?? DEFAULT);
        return squeezeArgs(args);
      }

      // 1. --- PHYSICAL PROPERTIES CHECK ---
      const [t, r, b, l] = PHYSICAL_PROPS_CAMEL.map(p => style[p]);
      const hasPhysical = t !== undefined || r !== undefined || b !== undefined || l !== undefined;

      if (hasPhysical) {
        if (t !== undefined && t === r && t === b && t === l) {
          const val = INTERPRETER(t) ?? DEFAULT;
          // CRITICAL FIX: If it resolves to the default value, hide it!
          if (val === DEFAULT) return undefined;

          return `${CsssFnName}(${val})`;
        }
      }

      // 2. --- ORIGINAL LOGICAL PROPERTIES LOGIC ---
      let args = PROPS_CAMEL.map(p => INTERPRETER(style[p]) ?? DEFAULT);
      return squeezeArgs(args, 2);
    }
  },
  SingleTableReverse: (CssProp, Table) => {
    Table = Object.fromEntries(Object.entries(Table).map(([k, v]) => [v.toLowerCase(), k]));
    return style => style[CssProp] && Table[style[CssProp].toLowerCase()];
  },
  SingleTableReverseObject: Table => style => {
    main: for (let short in Table) {
      const preset = Table[short];
      if (!Object.keys(preset).length) continue;
      for (let p in preset) {
        if (style[p]?.toLowerCase() !== preset[p]?.toLowerCase()) {
          continue main;
        }
      }
      return short;
    }
  },
  SequentialFunctionReverse: (CsssFnName, PROPS, INTERPRETER, DEFAULT = "_") => style => {
    let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
    while (args.length && args.at(-1) === DEFAULT)
      args.pop();
    return args.length ? `${CsssFnName}(${args.join(",")})` : undefined;
  },
  Optional: (CsssName, ...Fns) => style => {
    let args;
    for (let fn of Fns)
      if ((fn = fn(style)) !== undefined)
        (args ??= []).push(fn);
    return args?.length && `${CsssName}(${args.join(",")})`;
  },
  /**
   * OptionalReset reverses CSS styles into a CSSS shorthand.
   * It handles two names:
   * - shortName: Used when only a subset of properties are explicitly set (additive mode).
   * - longName: Used when all properties are set or some are explicitly "unset" (reset mode).
   * 
   * @param {string} shortName - The shorthand name (e.g., "$boxItem")
   * @param {string} longName - The longhand name that implies defaults (e.g., "$BoxItem")
   * @param {object} defaults - Default values for the properties covered by this function.
   * @param {...object} PropFns - Array of { prop, rev } where rev() returns the CSSS argument.
   */
  OptionalReset: (shortName, longName, defaults, ...PropFns) => style => {
    let args = [];
    const props = Array.isArray(defaults) ? defaults : Object.keys(defaults);
    const covered = new Set();
    const explicitProps = [];

    // 1. Run all reverse mapping functions to see which properties are explicitly set.
    for (const { prop, rev } of PropFns) {
      const val = rev(style);
      const propArray = Array.isArray(prop) ? prop : [prop];

      if (val !== undefined) {
        args.push(val);
        // Mark these properties as "covered" by the generated arguments.
        propArray.forEach(p => covered.add(p));
      }
      // Keep track of all properties we *can* check for unsets.
      explicitProps.push(...propArray);
    }

    // If no properties were explicitly set, we don't output anything.
    if (!args.length) return;

    // 2. Check for "explicit unsets". 
    // If a property is "unset" or "initial" in the style but not "covered" by our arguments,
    // it means the user explicitly wanted to reset it (e.g., using a reset shorthand).
    let anyExplicitUnset = false;
    for (const p of explicitProps) {
      if (!covered.has(p) && style.hasOwnProperty(p) && (style[p] === "unset" || style[p] === "initial")) {
        anyExplicitUnset = true;
        break;
      }
    }

    // Also check properties listed in defaults that might not have been in PropFns.
    if (!anyExplicitUnset) {
      const isReset = v => v === "unset" || v === "initial" || v === "0" || v === "0px" || v === "none";
      for (const p of props) {
        if (!covered.has(p) && isReset(style[p])) {
          anyExplicitUnset = true;
          break;
        }
      }
    }

    // 3. Decide between shortName (additive) and longName (reset).
    // Use longName if ALL properties are covered OR if any property was explicitly unset.
    const allSet = props.every(p => covered.has(p));
    const name = (allSet || anyExplicitUnset) ? longName : shortName;
    return `${name}(${args.join(",")})`;
  },
  CalcReverse: val => {
    if (typeof val !== "string") return undefined;
    if (val.startsWith("calc(") && val.endsWith(")")) {
      return val.slice(5, -1).replace(/\s+/g, "");
    }
    if (/^(min|max|clamp|round|mod|rem|sin|cos|tan|asin|acos|atan|atan2|sqrt|hypot|log|exp|abs|sign)\(/.test(val)) {
      return val.replace(/\s+/g, "");
    }
    return undefined;
  },
  TableReverse: Table => Object.fromEntries(Object.entries(Table).map(([k, v]) => [v.toLowerCase(), k])),
  ColorReverse: val => {
    if (!val || val === "none" || val === "unset" || val === "transparent" || val === "currentColor" || val === "currentcolor")
      return undefined;
    const m = val.match(/^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/);
    if (m) {
      const [r, g, b] = [+m[1], +m[2], +m[3]];
      const a = m[4] != null ? parseFloat(m[4]) : 1;
      if (a === 0) return undefined;
      const hex = [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
      if (a < 1) return `#${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
      return `#${hex}`;
    }
    if (val.startsWith("#")) return val;
    if (/^[a-z]+$/i.test(val) && val.toLowerCase() in WebColors) return `#${val}`;
    return undefined;
  },
  ValueReverse: val => (val === "unset" || val === "initial") ? undefined : (val === "auto" ? "_" : (CssFunctions.CalcReverse(val) ?? CssFunctions.ColorReverse(val) ?? (val === "0px" ? "0" : val))),
  DisplayMode: (style, displayValue, LowerName, UpperName) => {
    return style.display === displayValue
      ? UpperName
      : (!style.display || style.display === "unset")
        ? LowerName
        : undefined;
  },
};

function spacelessCssTokens(str) {
  // a) Replace spaces inside quotes with '+', ignoring escaped quotes
  str = str.trim().replaceAll(/(["'])(?:\\.|(?!\1)[^\\])*\1/g, m => m.replaceAll(' ', '+'));
  let now = "", res = [];
  for (let i = 0, d = 0; i < str.length; i++) {
    const c = str[i];
    if (c === "(") d++;
    else if (c === ")") d--;

    if (c !== " " || d) now += c;
    else if (now) { res.push(now); (now = ""); }
  }
  now && res.push(now);
  return res;
}

const splitOnComma = ar => {
  const res = [];
  let now = [];
  for (let a of ar) {
    if (a.endsWith(",")) {
      now.push(a.slice(0, -1));
      res.push(now.join(","));
      now = [];
    } else
      now.push(a);
  }
  return res;
}

const CssPrimitives = {
  spacelessCssTokens,
  splitOnComma,
  Word
}

export {
  CsssFunctions,
  CsssPrimitives,
  CssFunctions,
  CssPrimitives,
}
