import { parse$Expression } from "./Parser.js";
import { Interpreter, InterpreterSelector } from "./Interpreter.js";
import nativeAndMore from "./func.js";
import layouts from "./layout.js";
import colorPalette from "./palette.js";

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
  // "font-variant": " ",//todo
};

const shortFuncs = new Interpreter({
  ...nativeAndMore,
  ...colorPalette,
  ...layouts,
}, STACKABLE_PROPERTIES);

//todo missing specificity
const SelectorSupers = {
  "@sm": "(min-width:640px)",
  "@md": "(min-width:768px)",
  "@lg": "(min-width:1024px)",
  "@xl": "(min-width:1280px)",
  "@2xl": "(min-width:1536px)",
  "@dark": "(prefers-color-scheme:dark)",
  ":first": ":first-child",
  ":last": ":last-child",
  ":edge": ":is(:first-child,:last-child)",
};

const shortSelector = new InterpreterSelector(SelectorSupers);

class Short {
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

  constructor(str) {
    this.clazz = "." + str.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");;
    this.units = Object.values(parse$Expression(str));
    for (let unit of this.units) {
      unit.shorts2 = shortFuncs.mergeOrStack(unit.shorts);
      unit.body = Object.entries(unit.shorts2).map(([k, v]) => `${k}: ${v};`).join(" ");
      Object.assign(unit, shortSelector.interpret(unit.selector));
    }
    this.container = this.units.find(u => !u.selector.item);
    this.items = this.units.filter(u => u !== this.container);
    this.container.selectorStr = Short.containerSelector(this.container.selects2, this.clazz);
    for (const item of this.items) {
      item.selectorStr = this.container.selectorStr + ">" + Short.itemSelector(item.selects2);
      item.medias3 = [this.container.medias2, item.medias2].filter(Boolean).join(" and ");
    }
    for (const unit of this.units)
      unit.rule = Short.ruleToString(unit);
  }
}

export class SheetWrapper {
  rules = {};

  static #formatter = new CSSStyleSheet();
  static getKey(r) {
    if (typeof r === "string") {
      this.#formatter.insertRule(r, 0);
      r = this.#formatter.cssRules[0];
      r = r.cssRules[0] ?? r;
      this.#formatter.deleteRule(0);
    }
    const m = r.parentRule?.media?.mediaText;
    return (m ? m + "{" : "") + r.selectorText;
  }

  static layerMediaRules(layer) {
    const res = new Map();
    for (const a of layer.cssRules) {
      if (a instanceof CSSMediaRule) {
        for (const b of a.cssRules)
          if (b instanceof CSSStyleRule)
            res.set(SheetWrapper.getKey(b), b);
      } else if (a instanceof CSSStyleRule)
        res.set(SheetWrapper.getKey(a), a);
    }
    return res;
  }

  constructor(sheet) {
    this.sheet = sheet;
    this.items = this.setupLayer("items", sheet);
    this.container = this.setupLayer("container", sheet);
    this.setupStatement();
  }

  setupStatement() {
    for (const r of this.sheet.cssRules)
      if (r instanceof CSSLayerStatementRule && "@layer container, items;" === r.cssText.replaceAll(/\s+/g, " "))
        return;
    this.sheet.insertRule("@layer container, items;", 0);
  }

  setupLayer(name) {
    for (const layer of this.sheet.cssRules)
      if (layer instanceof CSSLayerBlockRule && layer.name === name)
        return { layer, registry: SheetWrapper.layerMediaRules(layer) };
    this.sheet.insertRule(`@layer ${name} {}`, 0);
    return { layer: this.sheet.cssRules[0], registry: new Map() };
  }

  addRule(str) {
    const short = new Short(str);
    for (const { selector: { item }, shorts, rule } of short.units)
      if (shorts.length)
        this.addRuleImpl(rule, item ? this.items : this.container);
  }

  addRuleImpl(rule, { layer, registry }) {
    const key = SheetWrapper.getKey(rule);
    let pos = Array.from(registry.keys()).indexOf(key);
    if (pos >= 0)
      return pos;
    layer.insertRule(rule, layer.cssRules.length);
    registry.set(key, layer.cssRules[layer.cssRules.length - 1]);
    return registry.size - 1;
  }

  #cleanTask;
  #cleanup() {
    const isInUse = r => {
      if (r instanceof CSSMediaRule) r = r.cssRules[0];
      if (!(r instanceof CSSStyleRule)) return false;
      const className = r.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/)?.[1].replaceAll(/\\(.)/g, "$1");
      return className && document.querySelector(`[class~="${className}"]`);
    }

    const cleanupLayer = layer => {
      for (let i = layer.cssRules.length - 1; i >= 0; i--)
        if (!isInUse(layer.cssRules[i]))
          layer.deleteRule(i);
    }

    this.#cleanTask = null;
    cleanupLayer(this.container.layer);
    cleanupLayer(this.items.layer);
    this.sheet.ownerNode.textContent = [...this.sheet.cssRules].map(r => r.cssText).join('\n');
  }

  cleanup() {
    this.#cleanTask ??= requestAnimationFrame(() => this.#cleanup());
  }
}