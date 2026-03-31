import { ResolveMath } from "./funcMath2.js";

function BadArgument(name, args, I, message = "") {
  args = args.map(a => a.text ?? (a.name + "/" + a.args.length));
  args[I] = ` => ${args[I]} <= `;
  return new SyntaxError(`Bad argument ${name}/${I + 1}:  ${name}(${args.join(",")})` + message);
}

const CsssPrimitives = {
  LengthPercent: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0") ? a.text : undefined),
  LengthPercentUnset: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0" || a.text === "_") ? (a.text === "_" ? "unset" : a.text) : undefined),
  LengthPercentAuto: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0" || a.text === "_") ? (a.text === "_" ? "auto" : a.text) : undefined),
  Basic: ResolveMath(a => a.text),
  RepeatBasic: ResolveMath(a => a.name === "repeat" ? `repeat(${a.args.map(a => a.text).join(", ")})` : a.text),
  SpanBasic: ResolveMath(a => a.name === "span" ? `span ${a.args[0].text}` : a.text),
  NumberInterpreter: ResolveMath(a => (a.type === "number" && a.unit === "") ? a.num : undefined),
  LengthPercentNumber: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.type === "number") ? a.text : undefined),
};

const CsssFunctions = {
  // CssValuesToCsssTableObject: (oneProp, oneValues, twoProp, twoValues) => {
  //   const toCamelCase = s => s.replace(/[^a-z]./g, m => m[1].toUpperCase());
  //   const Table = {};
  //   for (let one of oneValues.split("|")) {
  //     Table[toCamelCase(one)] = { [oneProp]: one, [twoProp]: "unset" };
  //     for (let two of twoValues.split("|")) {
  //       Table[toCamelCase(two)] = { [oneProp]: "unset", [twoProp]: two };
  //       Table[toCamelCase(one + " " + two)] = { [oneProp]: one, [twoProp]: two };
  //     }
  //   }
  //   return Table;
  // },
  CssValuesToCsssTable: (One, Two = "") => {
    const toCamelCase = s => s.replace(/[^a-z]./g, m => m[1].toUpperCase());
    const Table = {};
    for (let b of One.split("|")) {
      Table[toCamelCase(b)] = b;
      for (let i of Two.split("|"))
        if (b != i)
          Table[toCamelCase(b + " " + i)] = b + " " + i;
    }
    return Table;
  },
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
  SequentialFunction: (SIG, INTERPRETERS, POST) => {
    const parseSignature = SIG => {
      const [NAME, ARITY] = SIG.split("/");
      if (ARITY == undefined || ARITY == "") return { NAME };
      let [MIN, MAX = MIN] = ARITY.split("-");
      if (MAX === "") MAX = Infinity;
      return { NAME, MIN: Number(MIN), MAX: Number(MAX) };
    };
    const { NAME, MIN = INTERPRETERS.length, MAX = INTERPRETERS.length } = parseSignature(SIG);
    return ({ args, name }) => {
      if (NAME && NAME !== name) return;
      if (args.length < MIN || args.length > MAX)
        throw new SyntaxError(`${name}() requires ${MIN} to ${MAX} arguments, got ${args.length}.`);
      const res = args.map((a, i) => {
        const a2 = (INTERPRETERS[i] ??= INTERPRETERS.at(-1))(a);
        if (a2) return a2;
        throw BadArgument(name, args, i, INTERPRETERS[i].name);
      });
      return POST ? POST(name, res) : res;
    }
  },
  SingleArgumentFunction: (CsssName, INTERPRETER, POST) => ({ args, name }) => {
    if (CsssName !== name) return;
    if (args.length != 1)
      throw new SyntaxError(`${name} requires 1 argument, got ${args.length} arguments.`);
    const v = INTERPRETER(args[0]);
    if (v == null) throw BadArgument(name, args, 0, INTERPRETER.name);
    return POST ? POST(name, v) : v;
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
  TypeBasedFunction: (...FUNCTIONS) => {
    const once = new Set();
    return ({ args, name }) => {
      once.clear();
      const res = {};
      main: for (let i = 0; i < args.length; i++) {
        for (let fn of FUNCTIONS) {
          if (once.has(fn)) continue;
          const v = fn(args[i]);
          if (v == null) continue;
          once.add(fn);
          Object.assign(res, v);
          continue main;
        }
        throw BadArgument(name, args, i, "Unknown argument.");
      }
      return res;
    }
  },
  FunctionWithDefaultValues: (BASE, CB) => {
    Object.freeze(BASE);
    const reduce = o => { for (let k in o) if ((k + "Block") in o && (k + "Inline") in o) delete o[k]; return o };
    return x => !x.args?.length ? BASE : reduce({ ...BASE, ...CB(x) });
  },
  SizeFunction: (CsssName, CssName, INTERPRETER) => {
    const min = "min" + CssName[0].toUpperCase() + CssName.slice(1);
    const max = "max" + CssName[0].toUpperCase() + CssName.slice(1);
    return ({ args, name }) => {
      if (CsssName !== name)
        return;
      if (args.length < 1 || args.length > 3)
        throw new SyntaxError(`${name}() requires 1 to 3 arguments, got ${args.length}.`);
      const res = args.map((a, i) => {
        const a2 = INTERPRETER(a);
        if (a2)
          return a2;
        throw BadArgument(name, args, i, INTERPRETER.name);
      });
      return args.length === 1 ?
        { [CssName]: res[0] } :
        { [min]: res[0], [CssName]: res[1], [max]: res[2] ?? "unset" };
    }
  },
};

const CssFunctions = {
  SingleArgumentFunctionReverse: (CsssFnName, CssProp, INTERPRETER, DEFAULT = "_") => style => {
    let arg = INTERPRETER(style[CssProp]) ?? DEFAULT;
    if (arg !== DEFAULT) return `${CsssFnName}(${arg})`;
  },
  LogicalFourReverse: (CssPrefix, CsssFnName, INTERPRETER, DEFAULT = "_") => {
    const PROPS = ["BlockStart", "InlineStart", "BlockEnd", "InlineEnd"].map(s => CssPrefix + s);
    return style => {
      let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
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
    return args && `${CsssName}(${args.join(",")})`;
  }
};

export {
  CsssFunctions,
  CsssPrimitives,
  CssFunctions,
}