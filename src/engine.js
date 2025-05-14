import { extractSuperShorts, ShortBlock } from "./Parser.js";
import nativeAndMore from "./func.js";
import layouts from "./layout.js";
import colorPalette from "./palette.js";
import { BuiltinSupers } from "./BuiltinSupers.js";

class UpgradeRegistry {
  #register = {};

  waitFor(name, element, clazz) {
    (this.#register[name] ??= []).push({ clazz, element: new WeakRef(element) });
  }

  enoughWaiting(name) {
    let undone = this.#register[name];
    if (!undone) return;
    delete this.#register[name];
    undone = undone.reduce((res, { clazz, element }) => {
      element = element.deref();
      element?.classList.contains(clazz) && res.push({ clazz, element });
      return res;
    }, []);
    return undone.length ? undone : undefined;
  }
}

const SHORTS = {
  ...nativeAndMore,
  ...colorPalette,
  ...layouts,
};

const RENAME = {
  overflowBlock: "overflowY",
  overflowInline: "overflowX",
};

class SheetWrapper {
  rules = {};

  static getKey(r) {
    return [r.parentRule?.media?.mediaText, r.selectorText].filter(Boolean).join(" { ");
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
    this.styleEl = sheet.ownerNode;
    this.sheet = sheet;
    this.items = this.setupLayer("items", sheet);
    this.container = this.setupLayer("container", sheet);
    this.supers = {};
    this.shorts = { ...SHORTS };
    this.renameMap = { ...RENAME };
    this.setupStatement();
    this.readSupers(BuiltinSupers);
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

  addRule(str, el) {
    const shorts = new ShortBlock(str);
    try {
      for (const rule of shorts.rules(this.shorts, this.supers, this.renameMap))
        this.addRuleImpl(rule);
    } catch (err) {
      if (err.message.startsWith("Unknown short function: $"))
        return upgrades.waitFor(err.message.slice(24), el, str);
      throw err;
    }
  }

  addRuleImpl(rule) {
    const { layer, registry } = rule.item ? this.items : this.container;
    const key = [rule.media, rule.selector].filter(Boolean).join(" { ");
    let ruleAndPos = registry.get(key);
    if (!ruleAndPos) {
      layer.insertRule(rule.rule, layer.cssRules.length);
      ruleAndPos = { rule, css: layer.cssRules[layer.cssRules.length - 1], pos: layer.cssRules.length - 1 };
      registry.set(key, ruleAndPos);
    }
    return ruleAndPos;
  }

  readSupers(txt) {
    const supers = extractSuperShorts(txt, this.shorts, this.supers);
    Object.assign(this.supers, supers);
  }

  #isInUse(r) {
    if (r instanceof CSSMediaRule) r = r.cssRules[0];
    if (!(r instanceof CSSStyleRule)) return false;
    const className = r.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/)?.[1].replaceAll(/\\(.)/g, "$1");
    return className && this.styleEl.getRootNode().querySelector(`[class~="${className}"]`);
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
      this.sheet = this.styleEl.sheet;
      this.items = this.setupLayer("items", this.sheet);
      this.container = this.setupLayer("container", this.sheet);
    });
  }
}

const upgrades = new UpgradeRegistry();

for (const [k, short] of Object.entries(SHORTS)) {
  if (short?.itemScope) {
    for (const [k2, func] of Object.entries(short.itemScope)) {
      short.itemScope["$" + k2] = func;
      delete func[k2];
    }
  }
  registerShort("$" + k, short);
}

function registerShort(name, func) {
  if (name in SHORTS)
    throw new Error(`Short name ${name} already exists`);
  SHORTS[name] = func;
  const todos = upgrades.enoughWaiting(name);
  if (!todos)
    return;
  const style = document.querySelector("style");
  const csss = new SheetWrapper(style.sheet);
  for (const { clazz, element } of todos)
    csss.addRule(clazz, element);
}

export { SheetWrapper, registerShort };