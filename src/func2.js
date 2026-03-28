import { ResolveMath } from "./funcMath2.js";
import NativeCss from "./nativeCss.js";

const CsssPrimitives = {
  LengthPercent: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0") ? a.text : undefined),
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
};

const CssFunctions = {
  LogicalFourReverse: (CssPrevix, CsssFnName, INTERPRETER, DEFAULT = "_") => {
    const PROPS = ["BlockStart", "InlineStart", "BlockEnd", "InlineEnd"].map(s => CssPrevix + s);
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