import { parse$Expression } from "./Parser.js";

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

export class Short {
  static mergeOrStack(shortsI) {
    const res = {};
    for (const obj of shortsI) {
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

  constructor(str) {
    this.units = parse$Expression(str);
    this.clazz = "." + str.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  interpret(SHORTS, supers) {
    let containerSelector, containerMedias;
    const res = [];
    for (let unit of this.units) {
      const shortsI = unit.shorts.map(exp => exp.interpret(SHORTS));
      const shorts2 = Short.mergeOrStack(shortsI);
      // const body = Object.entries(shorts2).map(([k, v]) => `${k}: ${v};`).join(" ");
      let { medias, selector } = unit.selector.interpret(supers);
      medias = containerMedias ? [medias, containerMedias].filter(Boolean).join(" and ") : medias;
      selector = containerSelector ? containerSelector + ">*" + selector : this.clazz + selector;
      // const rule = medias ?
      //   `@media ${medias} { ${selector} { ${body} } }` :
      //   `${selector} { ${body} }`;
      containerSelector ??= selector;
      containerMedias ??= medias;
      res.push(new Rule(medias, selector, shorts2, unit.item));
    }
    return res;
  }
}

class Rule {
  constructor(medias, selector, shorts, item) {
    this.medias = medias;
    this.selector = selector;
    this.shorts = shorts;
    this.item = item;
  }
  get isEmpty() {
    return !Object.keys(this.shorts).length;
  }
  get body() {
    return Object.entries(this.shorts).map(([k, v]) => `${k}: ${v};`).join(" ");
  }
  get rule() {
    return this.medias ?
      `@media ${this.medias} { ${this.selector} { ${this.body} } }` :
      `${this.selector} { ${this.body} }`;
  }
}