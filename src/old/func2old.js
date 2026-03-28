import { ValueTypes, BadArgument } from "./func.js";
const { Length, Percent } = ValueTypes;

const TypeBasedFunction2 = Spec => {
  return ({ args, name }) => {
    const res = {};
    main: for (let out, i = 0; i < args.length; i++) {
      for (let ARG of Spec.ARGS)
        if ((out = ARG.csss(args[i])) !== undefined) {
          if (typeof out === "string")
            res[ARG.PROPS[0]] = out;
          else
            Object.assign(res, out);
          continue main;
        }
      throw BadArgument(name, args, i);//, ARG.csssName); Todo we need to make the Interpreter for the arguments
      //todo I think that we can do that in the constructor of the CsssFunction
    }
    return res;
  };
}

const LogicalFour2Post = NAME => ar => ar.length < 2 ? { [NAME]: ar[0] ?? "none" } :
  {
    [NAME + "Block"]: ar[2] != null && ar[2] != ar[0] ? ar[0] + " " + ar[2] : ar[0],
    [NAME + "Inline"]: ar[3] != null && ar[3] != ar[1] ? (ar[1] ?? ar[0]) + " " + ar[3] : ar[1] ?? ar[0],
  };

const LogicalFour2 = ({ ARGS }) => {
  const Interpreter = makeInterpreter(ARGS.map(s => s.csss));
  return ({ args }) => args.map(Interpreter);
};

const LogicalFourToShort = ({ ARGS, PROPS }) => {
  PROPS = Object.keys(PROPS).filter(p => p.includes("Start") || p.includes("End"));
  const INTERPRETER = makeInterpreter(ARGS.map(s => s.css));
  return style => {
    const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
    if (args[1] !== args[3])
      return args;
    args.pop();
    if (args[0] !== args[2])
      return args;
    args.pop();
    if (args[0] !== args[1])
      return args;
    args.pop();
    return args;
  }
};

const Optional = (ARGS, POST) => style => {
  let args;
  for (let [props, fn] of ARGS)
    if (props.some(p => style[p] !== undefined))
      (args ??= []).push(fn(style, props));
  return args && POST(args);
}

class CsssPrimitive {
  #csss;
  #css;
  constructor(csss, css) {
    this.#csss = makeInterpreter(csss);
    this.#css = makeInterpreter(css);
  }
  get csss() { return this.#csss; }
  get css() { return this.#css; }
}

class CsssSinglePropertyWord {
  #csss;
  #css;
  constructor({ property, csssToCss }) {
    this.PROPS = [property];
    this.csssToCss = Object.create(null);
    this.cssToCsss = Object.create(null);
    for (let [word, value] of Object.entries(csssToCss)) {
      this.csssToCss[word] = { [property]: value };
      this.cssToCsss[value] = word;
    }
    this.#csss = x => this.csssToCss[x.text];
    this.#css = style => this.cssToCsss[style[property]];
    Object.freeze(this);
  }
  get csss() { return this.#csss; }
  get css() { return this.#css; }
}
function parseSignature(SIG) {
  return { NAME: SIG };
  const [NAME, ARITY] = SIG.split("/");
  if (!ARITY) return { NAME, checkArity: ({ name }) => name === NAME };
  //todo add support for ","
  let [MIN, MAX = MIN] = ARITY.split("-");
  if (MAX === "") MAX = Infinity;
  return {
    NAME, MIN: Number(MIN), MAX: Number(MAX), checkArity: ({ name, args }) => {
      if (name === NAME) {
        if (args.length < MIN || args.length > MAX)
          throw new SyntaxError(`${name}() takes ${MIN}${MIN !== MAX ? "-" + MAX : ""} arguments, got ${args.length}.`);
        else
          return true;
      }
    }
  };
}

class CsssFunction {
  #csss;
  #css;
  constructor({ csssName, ARGS = [], PROPS, DEFAULT, csss, css, csssPost, cssPost }) {
    const { NAME, checkArity } = parseSignature(csssName);
    if (!NAME) throw new Error("CsssFunction must have a name");
    if (typeof csss !== "function") throw new Error("CsssFunction must have a csss function");
    if (typeof css !== "function") throw new Error("CsssFunction must have a css function");
    if (csssPost != null && typeof csssPost !== "function") throw new Error("csssPost must be undefined or a function");
    if (cssPost != null && typeof cssPost !== "function") throw new Error("cssPost must be undefined or a function");
    if (!ARGS.every(a => a instanceof CsssPrimitive || a instanceof CsssSinglePropertyWord || a instanceof CsssFunction))
      throw new Error("All ARGS must be instances of CsssPrimitive, CsssSinglePropertyWord or CsssFunction");
    if (PROPS && typeof PROPS !== "object") throw new Error("PROPS must be undefined or an object");
    if (DEFAULT && typeof DEFAULT !== "object") throw new Error("DEFAULT must be undefined or an object");
    this.csssName = NAME;
    this.ARGS = ARGS;
    this.PROPS = PROPS ?? this.ARGS.reduce((acc, v) => ({ ...acc, ...v.PROPS }), {});
    this.DEFAULT = DEFAULT ?? Object.fromEntries(Object.entries(this.PROPS).filter(([_, v]) => v !== undefined));
    // const csss2 = x => (checkArity(x) && csss(x));
    const csss2 = csss(this);
    const css2 = css(this);
    this.#csss = csssPost ? x => csssPost(csss2(x)) : csss2;
    this.#css = cssPost ? style => cssPost(css2(style)) : css2;
    Object.freeze(this);
  }
  get csss() { return this.#csss; }
  get css() { return this.#css; }
}

function makeInterpreter(funcs) {
  if (!Array.isArray(funcs)) return funcs;
  if (funcs.length < 2) return funcs[0];
  const name = funcs.map(p => p.name).join("/");
  return {
    [name]: x => {
      for (let p of funcs)
        if ((p = p(x)) != null)
          return p;
    }
  }[name];
}

const LengthPercent2 = new CsssPrimitive([Length, Percent], v => v);
const FunctionString = (name, args) => `${name}(${args.join(",")})`;