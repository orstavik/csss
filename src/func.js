import Maths from "./funcMath.js";

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
      throw BadArgument(name, args, 0, INTERPRETER.name);
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
    let arg = INTERPRETER(style[CssProp]) ?? DEFAULT;
    if (arg !== DEFAULT) return `${CsssFnName}(${arg})`;
  },
  LogicalFourReverse: (CssPrefix, CsssFnName, INTERPRETER, DEFAULT = "_") => {
    const PROPS = ["-block-start", "-inline-start", "-block-end", "-inline-end"].map(s => CssPrefix + s);
    return style => {
      let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
      if (args.every(a => a === DEFAULT)) return undefined;
      if (args[1] === args[3] && (args.pop() || true))
        if (args[0] === args[2] && (args.pop() || true))
          if (args[0] === args[1] && (args.pop() || true))
            ;
      return `${CsssFnName}(${args.join(",")})`;
    }
  },
  SingleTableReverse: (CssProp, Table) => {
    Table = Object.fromEntries(Object.entries(Table).map(([k, v]) => [v, k]));
    return style => Table[style[CssProp]];
  },
  SingleTableReverseObject: Table => style => {
    main: for (let short in Table) {
      for (let p in Table[short])
        if (style[p] !== Table[short][p])
          continue main;
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
  }
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