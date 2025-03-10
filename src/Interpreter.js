import { parse$Expression, Expression } from "./Parser.js";

class Selector {

  static wherify(select) {
    if (select.length === 1)
      return select;
    const i = select.indexOf("*");
    const head = i && `:where(${select.slice(0, i).join("")})`;
    let tail = select.slice(i + 1);
    let tail2 = "";
    for (let i = tail.length - 1; i >= 0; i--) {
      const s = tail[i];
      if (s === ">" || s === "+" || s === "~" || s === " ") {
        tail2 = `:has(${[...tail.slice(i), tail2].join("")}))`;
        tail = tail.slice(0, i);
      }
    }
    tail = tail.length && `:where(${tail.join("")})`;
    tail2 &&= `:where(${tail2})`;
    return ["*", head, tail, tail2].filter(Boolean);
  }

  static impliedSelfStar(select) {
    if (!select.length)
      return ["*"];
    if (select.some(t => t === "*"))
      return select;
    const first = select[0].match(/^[>+~]$/);
    const last = select.at(-1).match(/^[>+~]$/);
    if (first && last)
      throw `Relationship selector both front and back: ${select.join("")}`;
    if (last)// last will not work for recognizing the class name for the selector..
      return [...select, "*"];
    return ["*", ...select];
  }

  static selectorNot(select) {
    if (select.at(-1) === "!")
      throw `Invalid selector, not at the end: ${select.join("")}`;
    const res = [];
    for (let i = 0; i < select.length; i++)
      res.push(select[i] === "!" ? `:not(${select[++i]})` : select[i]);
    return res;
  }

  constructor({ medias, selects }, supers, clazz) {
    this.medias = medias;
    this.selects = selects;

    this.selects2 = selects.map(s => supers[s] ?? s)
      //todo supers[s] should return an array, and this we should splice into selects, instead of just adding as we do here.
      .map(s => s === ">>" ? " " : s)
      .map(Selector.selectorNot)
      .map(Selector.impliedSelfStar)
      .map(Selector.wherify);
    this.medias2 = medias.map(s => supers[s] ?? s)
      .map(m => m.replace(/^@/, ""))
      .join(" and ").replaceAll("and , and", ",");
    // if (clazz)
    //   this.selects2 = this.selects2.map(cs => cs.map(s => s === "*" ? clazz : s));
  }
}

export class Short {
  static itemSelector(selects) {
    selects = selects.map(s => s.join(""));
    return selects.length === 1 ? selects[0] : `:where(\n${selects.join(", ")}\n)`;
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