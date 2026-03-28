import { ResolveMath } from "./funcMath2.js";
import NativeCss from "./nativeCss.js";

function BadArgument(name, args, I, expectedType = "") {
  args = args.map(a => a.text ?? (a.name + "/" + a.args.length));
  args[I] = ` => ${args[I]} <= `;
  expectedType &&= `\n${args[I]} is not a ${expectedType}`;
  return new SyntaxError(`Bad argument ${name}/${I + 1}:  ${name}(${args.join(",")})` + expectedType);
}

const CsssPrimitives = {
  LengthPercent: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0") ? a.text : undefined),
  LengthPercentUnset: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0" || a.text === "_") ? (a.text === "_" ? "unset" : a.text) : undefined),
};

const CsssFunctions = {
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
  TypeBasedFunction: (...FUNCTIONS) => ({ args, name }) => {
    const res = {};
    main: for (let i = 0; i < args.length; i++) {
      for (let fn of FUNCTIONS) {
        const v = fn(args[i]);
        if (v != null) {
          Object.assign(res, v);
          continue main;
        }
      }
      throw BadArgument(name, args, i);
    }
    return res;
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