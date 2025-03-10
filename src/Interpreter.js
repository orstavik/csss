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

  constructor(SHORTS, supers, str) {
    this.units = parse$Expression(str);
    this.clazz = "." + str.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");

    let containerSelector, containerMedias;
    for (let unit of this.units) {
      const shortsI = unit.shorts.map(exp => exp.interpret(SHORTS));
      unit.shorts2 = Short.mergeOrStack(shortsI);
      unit.body = Object.entries(unit.shorts2).map(([k, v]) => `${k}: ${v};`).join(" ");
      const { medias, selector } = unit.selector.interpret(supers);
      unit.medias = containerMedias ? [medias, containerMedias].filter(Boolean).join(" and ") : medias;
      unit.selectorStr = containerSelector ? containerSelector + ">*" + selector : this.clazz + selector;
      unit.rule = unit.medias ?
        `@media ${unit.medias} { ${unit.selectorStr} { ${unit.body} } }` :
        `${unit.selectorStr} { ${unit.body} }`;
      containerSelector ??= unit.selectorStr;
      containerMedias ??= unit.medias;
    }
  }
}