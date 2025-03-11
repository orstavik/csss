import { parse$Expression } from "./Parser.js";

export class Shorts {

  constructor(exp) {
    this.exp = exp;
    this.clazz = "." + exp.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
    this.units = parse$Expression(exp);
  }

  interpret(SHORTS, supers) {
    const shorts = this.units.map(unit => unit.interpret(SHORTS, supers));
    let containerSelector, containerMedias;
    return shorts.map(({medias, selector, shorts}, i) => {
      medias = containerMedias ? [medias, containerMedias].filter(Boolean).join(" and ") : medias;
      selector = containerSelector ? containerSelector + ">*" + selector : this.clazz + selector;
      containerSelector ??= selector;
      containerMedias ??= medias;
      return new Rule(medias, selector, shorts, !!i);
    });
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