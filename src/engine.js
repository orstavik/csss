import { Rule } from "./Parser.js";
import nativeAndMore from "./func.js";
import fonts from "./font.js";
import layouts from "./layout.js";
import gradients from "./gradient.js";
// import colorPalette from "./palette.js";

const MEDIA_WORDS = {
  progressive: "scan: progressive",
  interlace: "scan: interlace",
  dim: "light-level: dim",
  normalLight: "light-level: normal",
  washed: "light-level: washed",
  reducedData: "prefers-reduced-data: reduce",
  noReducedData: "prefers-reduced-data: no-preference",
  noScript: "scripting: none",
  initScript: "scripting: initial-only",
  reloadScript: "scripting: reload",
  stableScript: "scripting: stable",

  dark: "prefers-color-scheme: dark",
  light: "prefers-color-scheme: light",
  noColorScheme: "prefers-color-scheme: no-preference",
  portrait: "orientation: portrait",
  landscape: "orientation: landscape",
  highContrast: "prefers-contrast: high",
  lowContrast: "prefers-contrast: low",
  forcedContrast: "prefers-contrast: forced",
  reducedTransparency: "prefers-reduced-transparency: reduce",
  noReducedTransparency: "prefers-reduced-transparency: no-preference",
  forcedColors: "forced-colors: active",
  noForcedColors: "forced-colors: none",
  invertedColors: "inverted-colors: inverted",
  noInvertedColors: "inverted-colors: none",
  p3: 'color-gamut: p3',
  srgb: 'color-gamut: srgb',
  rec2020: 'color-gamut: rec2020',
  highDynamicRange: "dynamic-range: high",
  standardDynamicRange: "dynamic-range: standard",
  reducedMotion: "prefers-reduced-motion: reduce",
  noReducedMotion: "prefers-reduced-motion: no-preference",
  standalone: "display-mode: standalone",
  fullscreen: "display-mode: fullscreen",
  minimalUi: "display-mode: minimal-ui",
  browser: "display-mode: browser",
  windowControlsOverlay: "display-mode: window-controls-overlay",
  pip: "display-mode: picture-in-picture",
  slowUpdate: "update: slow",
  fastUpdate: "update: fast",
  noUpdate: "update: none",
  hover: "hover: hover",
  noHover: "hover: none",
  coarsePointer: "pointer: coarse",
  finePointer: "pointer: fine",
  noPointer: "pointer: none",
  grid: "grid: 1",
  bitmap: "grid: 0",
  anyHover: "any-hover: hover",
  anyNoHover: "any-hover: none",
  anyCoarsePointer: "any-pointer: coarse",
  anyFinePointer: "any-pointer: fine",
  anyNoPointer: "any-pointer: none",
  anyGrid: "any-grid: 1",
  anyBitmap: "any-grid: 0",
  screen: "screen",
  print: "print",
  all: "all",
}

// todo make this work with @media.
// | **overflow-block**       | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-block: scroll) {…}`
// | **overflow-inline**      | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-inline: none) {…}`
const RENAME = {
  "overflow-block": "overflow-y",
  "overflow-inline": "overflow-x",
};

class UpgradeRegistry {
  #register = {};
  #shorts = {}

  constructor(dict) {
    for (const [k, short] of Object.entries(dict))
      this.registerShort(k, short);
  }

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

  registerShort(name, func) {
    const [main, name2 = main] = name.split(".");
    const table = name2 != main ? this.#shorts[main].scope ??= {} : this.#shorts;
    if (name2 in table)
      throw new Error(`Short name ${name} already exists`);
    table[name2] = func;
    this.rerun(name);
  }

  get shorts() {
    return this.#shorts;
  }

  get medias() {
    return MEDIA_WORDS;
  }

  registerMedia(name, txt) {
    if (name in MEDIA_WORDS)
      throw new Error(`Media name ${name} already exists`);
    MEDIA_WORDS[name] = txt;
    this.rerun(`@${name}`);
  }

  rerun(name) {
    const todos = this.enoughWaiting(name);
    if (!todos)
      return;
    const style = document.querySelector("style");
    const csss = new SheetWrapper(style.sheet);
    for (const { clazz, element } of todos)
      csss.addRule(clazz, element);
  }
}

const upgrades = new UpgradeRegistry({
  ...nativeAndMore,
  ...fonts,
  ...gradients,
  // ...colorPalette,
  ...layouts,
});

const parseCssShorts = (str) => Rule.interpret(str, upgrades, RENAME);
const registerShort = (name, func) => upgrades.registerShort(name, func);

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

  addRule(str, el) {
    try {
      const rule = Rule.interpret(str, upgrades, RENAME);
      if (!rule) return;
      const { layer, registry } = rule.item ? this.items : this.container;
      const key = rule.key;
      let ruleAndPos = registry.get(key);
      if (!ruleAndPos) {
        layer.insertRule(rule.rule, layer.cssRules.length);
        ruleAndPos = { rule, css: layer.cssRules[layer.cssRules.length - 1], pos: layer.cssRules.length - 1 };
        registry.set(key, ruleAndPos);
      }
      return ruleAndPos;
    } catch (err) {
      if (err instanceof ReferenceError)
        return upgrades.waitFor(err.message, el, str);
      throw err;
    }
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
      this.sheet.ownerNode.textContent = [...this.sheet.cssRules].map(r => r.cssText).join('\n\n');
      this.sheet = this.styleEl.sheet;
      this.items = this.setupLayer("items", this.sheet);
      this.container = this.setupLayer("container", this.sheet);
    });
  }
}

export { SheetWrapper, registerShort, parseCssShorts };