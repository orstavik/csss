import { findStatements } from "./Parser.js";
import { Shorts } from "./Interpreter.js";

function DictMap(dict, kCB, vCB) {
  const res = {};
  for (const [k, v] of Object.entries(dict))
    res[kCB ? kCB(k) : k] = vCB ? vCB(v) : v;
  return res;
}

import nativeAndMore from "./func.js";
import layouts from "./layout.js";
import colorPalette from "./palette.js";

const toCamel = s => s.replace(/[A-Z]/g, "-$&").toLowerCase();
const SHORTS = DictMap({
  ...nativeAndMore,
  ...colorPalette,
  ...layouts,
}, toCamel);


const SelectorSupers = `
  @sm = (min-width:640px);
  @md = (min-width:768px);
  @lg = (min-width:1024px);
  @xl = (min-width:1280px);
  @2xl = (min-width:1536px);
  @dark = (prefers-color-scheme:dark);
  :first = :first-child;
  :last = :last-child;
  :edge = :is(:first-child,:last-child);
`;

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
    this.supers = {};
    this.items = this.setupLayer("items", sheet);
    this.container = this.setupLayer("container", sheet);
    this.setupStatement();
    this.readSupers(SelectorSupers);
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
    const units = new Shorts(str).interpret(SHORTS, this.supers);
    for (const { item, body, rule } of units)
      if (body)
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

  readSupers(txt) {
    for (const { name, body } of findStatements(txt)) {
      if (name in this.supers)
        console.warn(`Super ${name} overwritten.`);
      this.supers[name] = body;
      if (name[0] === "$"){
        this.supers[name] = new Shorts(this.supers, body);
        //todo here we need to add the name to the SHORTS too.
      }
    }
  }

  #isInUse(r) {
    if (r instanceof CSSMediaRule) r = r.cssRules[0];
    if (!(r instanceof CSSStyleRule)) return false;
    const className = r.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/)?.[1].replaceAll(/\\(.)/g, "$1");
    return className && this.sheet.ownerNode.getRootNode().querySelector(`[class~="${className}"]`);
  }

  #removeUnused(layer) {
    for (let i = layer.cssRules.length - 1; i >= 0; i--)
      if (!this.#isInUse(layer.cssRules[i]))
        layer.deleteRule(i);
  }

  #cleanTask;
  cleanup() {
    this.#cleanTask ??= requestAnimationFrame(_ => {
      this.#cleanTask = null;
      this.#removeUnused(this.container.layer);
      this.#removeUnused(this.items.layer);
      this.sheet.ownerNode.textContent = [...this.sheet.cssRules].map(r => r.cssText).join('\n');
    });
  }
}