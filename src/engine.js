import { extractSuperShorts, Shorts } from "./Parser.js";

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


const BuiltinSuperSelectors = `
  @sm = @(min-width:640px);
  @md = @(min-width:768px);
  @lg = @(min-width:1024px);
  @xl = @(min-width:1280px);
  @2xl = @(min-width:1536px);
  @dark = @(prefers-color-scheme:dark);
  :first = :first-child;
  :last = :last-child;
  :edge = :first-child,:last-child;
`;
const BuiltinSuperShorts = `
$bold = $font-weight(bold);
$italic = $font-style(italic);
$oblique = $font-style(oblique);

$small-caps = $font-variant(small-caps);
$all-small-caps = $font-variant(all-small-caps);
$petite-caps = $font-variant(petite-caps);
$all-petite-caps = $font-variant(all-petite-caps);
$unicase = $font-variant(unicase);
$titling-caps = $font-variant(titling-caps);

$capitalize = $text-transform(capitalize);
$uppercase = $text-transform(uppercase);
$lowercase = $text-transform(lowercase);
$math-auto = $text-transform(math-auto);

$underline = $text-decoration(underline);
$overline = $text-decoration(overline);
$line-through = $text-decoration(line-through);

$ultra-condensed = $font-stretch(ultra-condensed);
$extra-condensed = $font-stretch(extra-condensed);
$condensed = $font-stretch(condensed);
$semi-condensed = $font-stretch(semi-condensed);
$semi-expanded = $font-stretch(semi-expanded);
$expanded = $font-stretch(expanded);
$extra-expanded = $font-stretch(extra-expanded);
$ultra-expanded = $font-stretch(ultra-expanded);

$serif = $font-family(serif);
$sans-serif = $font-family(sans-serif);
$monospace = $font-family(monospace);
$cursive = $font-family(cursive);
$fantasy = $font-family(fantasy);
$system-ui = $font-family(system-ui);
$ui-serif = $font-family(ui-serif);
$ui-sans-serif = $font-family(ui-sans-serif);
`;
//$full-width = $text-transform(full-width);
//$full-size-kana = $text-transform(full-size-kana);


export class SheetWrapper {
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
    this.sheet = sheet;
    this.supers = {};
    this.items = this.setupLayer("items", sheet);
    this.container = this.setupLayer("container", sheet);
    this.setupStatement();
    this.readSupers(BuiltinSuperSelectors);
    this.readSupers(BuiltinSuperShorts);
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
    const shorts = new Shorts(str);
    for (const rule of shorts.rules(SHORTS, this.supers))
      this.addRuleImpl(rule);
  }

  addRuleImpl(rule) {
    const { layer, registry } = rule.item ? this.items : this.container;
    const key = [rule.media, rule.selector].filter(Boolean).join(" { ");
    let pos = Array.from(registry.keys()).indexOf(key);
    if (pos >= 0)
      return pos;
    layer.insertRule(rule.rule, layer.cssRules.length);
    registry.set(key, layer.cssRules[layer.cssRules.length - 1]);
    return registry.size - 1;
  }

  readSupers(txt) {
    const supers = extractSuperShorts(txt, SHORTS);
    Object.assign(this.supers, supers);
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