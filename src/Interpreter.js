import { parse$Expression, Expression } from "./Parser.js";

class Selector {
  constructor({medias, selects}, supers) {
    this.medias = medias;
    this.selects = selects;

    this.medias2 = InterpreterSelector.mediasToString(
      medias.map(s => supers[s] ?? s));
    this.selects2 = selects.map(s => supers[s] ?? s)
      .map(s => s === ">>" ? " " : s)
      .map(InterpreterSelector.selectorNot)
      .map(InterpreterSelector.selectorHas)
      .map(InterpreterSelector.impliedSelfStar);
  }
}

export class Short {
  static itemSelector(selects) {
    selects = selects.map(s => s.join(""));
    return selects.length === 1 && selects[0] === "*"? "*" : `:where(\n${selects.join(", ")}\n)`;
  }

  static containerSelector(selects2, clazz) {
    selects2 = selects2.map(cs => cs.map(s => s === "*" ? clazz : s).join(""));
    return selects2.join(",\n");
  }

  static ruleToString({ medias2, medias3 = medias2, selectorStr, body }) {
    body = `${selectorStr} { ${body} }`;
    return medias3 ? `@media ${medias3} {  ${body} }` : body;
  }

  constructor(SHORTS, supers, str) {
    this.clazz = "." + str.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");;
    [this.container, ...this.items] = this.units = parse$Expression(str);

    for (let unit of this.units) {
      const shortsI = unit.shorts.map(short => Interpreter.interpretExp(SHORTS, short));
      unit.shorts2 = Interpreter.mergeOrStack(shortsI);
      unit.body = Object.entries(unit.shorts2).map(([k, v]) => `${k}: ${v};`).join(" ");
      Object.assign(unit, new Selector(unit.selector, supers));//InterpreterSelector.interpret(supers, unit.selector));
    }
    this.container.selectorStr = Short.containerSelector(this.container.selects2, this.clazz);
    for (const item of this.items) {
      item.selectorStr = this.container.selectorStr + ">" + Short.itemSelector(item.selects2);
      item.medias3 = [this.container.medias2, item.medias2].filter(Boolean).join(" and ");
    }
    for (const unit of this.units)
      unit.rule = Short.ruleToString(unit);
  }
}

const STACKABLE_PROPERTIES = {
  background: ",",
  transition: ",",
  "font-family": ",",
  "voice-family": ",",
  "text-shadow": ",",
  "box-shadow": ",",
  animation: ",",
  mask: ",",
  "font-feature-settings": ",",
  "will-change": ",",

  transform: " ",
  filter: " ",
  "counter-reset": " ",
  "counter-increment": " ",
  "font-variant": " ",
};

class Interpreter {

  static interpretExp(scope, exp) {
    const cb = scope[exp.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${exp.name}`);
    const innerScope = !cb.scope ? scope : Object.assign({}, scope, cb.scope);
    const args = exp.args.map(x => x instanceof Expression ? Interpreter.interpretExp(innerScope, x) : x);
    return cb.call(exp, ...args);
  }

  static mergeOrStack(shortsI) {
    const res = {};
    for (const obj of shortsI) {
      // const obj = Interpreter.interpretExp(scope, short);
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k, "inherit"))
          if (!CSS.supports(k, v))
            throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
        //else, the browser doesn't support the property, because the property is too modern.
        if (!(k in res))
          res[k] = v;
        else if (k in STACKABLE_PROPERTIES)
          res[k] += (STACKABLE_PROPERTIES[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }
}

class InterpreterSelector {

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

  static interpret(supers, { medias, selects }) {
    const medias2 = InterpreterSelector.mediasToString(
      medias.map(s => supers[s] ?? s));
    const selects2 = selects.map(s => supers[s] ?? s)
      .map(s => s === ">>" ? " " : s)
      .map(InterpreterSelector.selectorNot)
      .map(InterpreterSelector.selectorHas)
      .map(InterpreterSelector.impliedSelfStar);
    return { selects2, medias2 };
  }
}