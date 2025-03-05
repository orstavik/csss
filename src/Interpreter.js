import { Expression, DictMap } from "./Parser.js";

const toCamel = s => s.replace(/[A-Z]/g, "-$&").toLowerCase();

export class Interpreter {

  constructor(shortFuncs, stackables) {
    this.shortFuncs = DictMap(shortFuncs, toCamel);
    this.stackables = stackables;
  }

  interpretExp(exp, scope = {}) {
    if (typeof exp == "string") exp = new Expression(exp, []);
    const cb = scope[exp.name] ?? this.shortFuncs[exp.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${exp.name}`);
    const innerScope = Object.assign(scope, cb.scope);
    const args = exp.args.map(x => x instanceof Expression ? this.interpretExp(x, innerScope) : x);
    return cb.call(exp, ...args);
  }

  mergeOrStack(shorts) {
    const res = {};
    for (const short of shorts) {
      const obj = this.interpretExp(short);
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k, "inherit"))
          if (!CSS.supports(k, v))
            throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
        //else, the browser doesn't support the property, because the property is too modern.
        if (!(k in res))
          res[k] = v;
        else if (k in this.stackables)
          res[k] += (this.stackables[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }
}

export class InterpreterSelector {
  constructor(supers) {
    this.supers = supers;
  }

  static selectorNot(select) {
    if (select.at(-1) === "!")
      throw `Invalid selector, not at the end: ${select.join("")}`;
    const res = [];
    for (let i = 0; i < select.length; i++)
      res.push(select[i] === "!" ? `:not(${select[++i]})` : select[i]);
    return res;
  }

  static selectorHas(select) {
    const i = select.indexOf("&");
    if (i <= 0)
      return select;
    const has = `:has(${select.slice(0, i).join("")})`; //todo do we need }*)`? at the end here?
    return [...select.slice(i), has];
  }

  static impliedSelfStar(select) {
    if (!select.length)
      return ["*"];
    if (select.some(t => t === "*"))
      return select;
    const first = select[0]?.[0].match(/[>+~]/);
    const last = select.at(-1)?.[0].match(/[>+~]/);
    if (first && last)
      throw `Relationship selector both front and back: ${select.join("")}`;
    if (last)// last will not work for recognizing the class name for the selector..
      return [...select, "*"];
    return ["*", ...select];
  }

  static mediasToString(medias) {
    medias = medias.map(m => m.replace(/^@/, ""));
    return medias.join(" and ").replaceAll("and , and", ",");
  }

  interpret({ medias, selects }) {
    const medias2 = InterpreterSelector.mediasToString(
      medias.map(s => this.supers[s] ?? s));
    const selects2 = selects.map(s => this.supers[s] ?? s)
      .map(s => s === ">>" ? " " : s)
      .map(InterpreterSelector.selectorNot)
      .map(InterpreterSelector.selectorHas)
      .map(InterpreterSelector.impliedSelfStar);
    return { selects2, medias2 };
  }
}