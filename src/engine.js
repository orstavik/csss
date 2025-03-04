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

  static ruleToString(selectors, body) {
    selectors = selectors.filter(Boolean);
    return `${selectors.join(" { ")} { ${body}${" }".repeat(selectors.length)}`;
  }

  constructor(str) {
    this.clazz = "." + str.replaceAll(/[^a-z0-9_-]/g, "\\$&");;
    this.units = Object.values(parse$Expression(str));
    for (let unit of this.units) {
      unit.shorts2 = shortFuncs.mergeOrStack(unit.shorts);
      unit.body = Object.entries(unit.shorts2).map(([k, v]) => `${k}: ${v};`).join(" ");
      Object.assign(unit, shortSelector.interpret(unit.selector));
    }
    this.container = this.units.find(u => !u.selector.item);
    this.items = this.units.filter(u => u !== this.container);
    this.container.selectorStr = Short.containerSelector(this.container.selects2, this.clazz);
    this.container.selectors = [this.container.medias2, this.container.selectorStr];

    for (const item of this.items) {
      item.selectorStr = this.container.selectorStr + ">" + Short.itemSelector(item.selects2);
      item.medias3 = [this.container.medias2, item.medias2].filter(Boolean).join(" and ");
      item.selectors = [item.medias3, item.selectorStr];
    }

    for (const unit of this.units)
      unit.rule = Short.ruleToString(unit.selectors, unit.body);
  }
}

export class SheetWrapper {
  rules = {};

  static normalize = rule => rule.replaceAll(/\s+/g, " "); //todo exclude spaces inside "quotes'"
  static mediaString = (media, rule) => SheetWrapper.normalize(`@media ${media} { ${rule} }`);

  static layerMediaRules(layer) {
    const res = new Map();
    for (const a of layer.cssRules) {
      if (a instanceof CSSMediaRule) {
        for (const b of a.cssRules)
          if (b instanceof CSSStyleRule)
            res.set(SheetWrapper.mediaString(a.mediaText, b.cssText), b);
      } else if (a instanceof CSSStyleRule)
        res.set(SheetWrapper.normalize(a.cssText), a);
    }
    return res;
  }

  constructor(sheet) {
    this.sheet = sheet;
    this.setupStatement();
    this.container = this.setupLayer("container", sheet);
    this.items = this.setupLayer("items", sheet);
  }

  setupStatement(){
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
    for (const { item, shorts, rule } of short.units)
      if (shorts.length)
        this.addRuleImpl(rule, item ? this.items : this.container);
  }

  addRuleImpl(rule, { layer, registry }) {
    rule = SheetWrapper.normalize(rule);
    let pos = Array.from(registry.keys()).indexOf(rule);
    if (pos >= 0)
      return pos;
    layer.insertRule(rule, layer.cssRules.length);
    const obj = layer.cssRules[layer.cssRules.length - 1];
    registry.set(rule, obj);
    pos = registry.size - 1;
    return pos;
  }

  #cleanTask;
  #cleanup() {
    const isInUse = rule => {
      if (rule instanceof CSSMediaRule)
        rule = rule.cssRules[0];
      if (!(rule instanceof CSSStyleRule))
        return false;
      const className = rule.selectorText.match(/^\.((\\.|[a-z0-9_-])+)/)?.[1].replaceAll(/\\(.)/g, "$1");
      return className && document.querySelector(`[class~="${className}"]`);
    }

    const cleanupLayer = (layer) => {
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

// function selectorText(rule) {
//   return rule.selectorText ??
//     (rule instanceof CSSLayerBlockRule ? `@layer ${rule.name} ` :
//       rule instanceof CSSMediaRule ? `@media ${rule.media.mediaText} ` :
//         undefined);
// }

// function sheetHas(selectors, rules, pos = 0) {
//   for (let rule of rules) {
//     if (selectors[0] === selectorText(rule)) {
//       if (selectors.length === 1)
//         return [pos, rule];
//       if (selectors.length > 1)
//         if ((rule = sheetHas(selectors.slice(1), rule.cssRules, pos))[1] != null)
//           return rule;
//     }
//     pos++;
//   }
//   return [pos, null];
// }

// function fullText(rule) {
//   let test = rule.cssText;
//   while (rule.parentRule)
//     test = `${selectorText(rule = rule.parentRule)} {${test} } `;
//   return test;
// }

// const cache = {};
// function appendRule(sheet, selectors, rule) {
//   if (rule in cache)
//     return cache[rule];
//   let [pos, res] = sheetHas(selectors, sheet.cssRules);
//   res &&= fullText(res);
//   if (res && res.replaceAll(/\s/g, "") === rule.replaceAll(/\s/g, ""))
//     return cache[rule] = pos;
//   if (res)
//     console.warn("Existing rule differs: \n" + res.cssText + "\n\n vs.\n\n " + rule);
//   sheet.insertRule(rule, sheet.cssRules.length);
//   return cache[rule] = pos;
// }

// export class StyleWrapper {

//   constructor(styleEl) {
//     const styleSheet = styleEl.sheet;
//     this.styleSheet = styleSheet;
//     this.styler = new SheetWrapper(styleSheet);
//   }

//   addRule(str) {
//     const short = new Short(str);
//     for (const unit of short.units)
//       this.styler.addRule(unit.rule);
// const clazz = "." + str.replaceAll(/[^a-z0-9_-]/g, "\\$&");;
// let exp = parse$Expression(str);
// for (let unit of Object.values(exp)) {
//   unit.shorts2 = shortFuncs.mergeOrStack(unit.shorts);
//   Object.assign(unit, shortSelector.interpret(unit.selector));
// }
// const container = Object.values(exp).find(u => !u.items);
// const { selects2, medias2, shorts2 } = container;
// const containerSelector = StyleWrapper.selectToString(selects2, clazz);
// const selectors = ["@layer container", medias2, containerSelector].filter(Boolean);
// const shortsBody = Object.entries(shorts2).map(([k, v]) => `${k}:${v};`).join("");
// const rule = StyleWrapper.containerToString(selectors, shortsBody);
// debugger
// this.styler.addRule(rule);

// for (const item of Object.values(exp).filter(u => u.items)) {
//   const { selects2, medias2, shorts2 } = item;
//   const itemSelector = containerSelector + ">*" + StyleWrapper.selectToString(selects2, clazz);
//   const medias3 = [container.medias2, medias2].filter(Boolean).join(" and ");
//   const selectors = ["@layer items", medias3, itemSelector].filter(Boolean);
//   const shortsBody = Object.entries(shorts2).map(([k, v]) => `${k}:${v};`).join("");
//   const rule = StyleWrapper.containerToString(selectors, shortsBody);
//   this.styler.addRule(rule);
// }
//   }
// }



// export const toCss = txt => shortSelector.toCssText(shortFuncs.interpretClass(parse$Expression(txt)));

// export function cssClassName(shortName) {
//   return "." + shortName.replaceAll(/[^a-z0-9_-]/g, "\\$&");;
// }

/**
 * $short specificity
 */

// //dynamic element
// const elUix = /hover|active|focus|focus-visible|focus-within/.source;
// const elMedia = /playing|paused|current|past|future/.source;
// const elMediaSafari = /buffering|muted|seeking|stalled/.source;
// const elForm = /default|autofill|checked|indeterminate|blank|valid|invalid|in-range|out-of-range|required|optional|user-valid|user-invalid/.source;
// const elLink = /link|visited/.source;
// const elModal = /fullscreen|modal|picture-in-picture/.source;
// //actionable element
// //These properties are structural, but they communicate to user about interaction. 
// //Thus interactional/dynamic oriented.
// const elForm2 = /enabled|disabled|read-only|read-write|placeholder-shown/.source;
// const elLink2 = /any-link|local-link|target|target-within|scope/.source;

// //dynamic window
// const winDark = /dark|light/.source;
// const winLang = /lang\([a-zA-Z0-9,-]+\)/.source;
// const winDir = /dir\((?:rtl|ltr)\)/.source;

// //static dom structure
// const staticTree = /root|empty|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type/.source;
// const staticTreeFunctions = /(?:nth-of-type|nth-of-last-type|nth-of-child|nth-of-last-child)/.source;
// const AnPlusB = /\((?:odd|even|-?\d+(?:[+-]\d+)?)\)/.source;


// let PSEUDO_EL = `:(?:${elUix}|${elMedia}|${elMediaSafari}|${elForm}|${elLink}|${elModal}|${elForm2}|${elLink2})`;
// let PSEUDO_WIN = `:(?:${winDark}|${winLang}|${winDir})`;
// let PSEUDO_STATIC = `:(?:${staticTree}|${staticTreeFunctions + AnPlusB})`;

// const ATTR_OP = /[$*~|^]?=/.source;
// const STRING = /"(?:\\.|[^"\\])*"/.source;
// const ATTR = new RegExp(`\\[[^"\\]]+(?:${ATTR_OP + STRING})?\\]`).source;

// const CLASS = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.source;
// const TAG = /[a-z][a-z0-9-]*/.source;
// //we use &=>and !=>not
// const MEDIA = /@media\([a-z0-9:><=&!,-]+\)/.source;

// const EL = `${PSEUDO_EL}|${ATTR}`;
// const WIN = `${PSEUDO_WIN}|${MEDIA}`;
// const DOM = `${PSEUDO_STATIC}|${CLASS}|${TAG}`;
// const DIVIDER = />>|[\s>+~]/.source;
// const NOT_START = /:not\(/.source;
// const HAS_START = /:has\(/.source;
// const END = /\)/.source;
// let SELECTOR_TOKENS = `(${EL})|(${WIN})|(${DOM})|(${DIVIDER})|(${NOT_START})|(${HAS_START})|(${END})|(%)|(.)`;
// SELECTOR_TOKENS = new RegExp(SELECTOR_TOKENS, "g");

// function countSpecificity(tokens, res, depth = 0, isHas = false) {
//   for (let [, el, win, dom, divider, not, has, end, percent, any] of tokens) {
//     if (divider)
//       (res[1] += res[0]), (res[0] = 0);
//     else if (el)
//       res[isHas ? 1 : 0]++;
//     else if (win)
//       res[2]++;
//     else if (dom)
//       res[3]++;
//     else if (not)
//       countSpecificity(tokens, res, depth + 1, isHas);
//     else if (has)
//       countSpecificity(tokens, res, depth + 1, true);
//     else if (end) {
//       if (depth) return res;
//       throw new SyntaxError("Missing parenthesis start '('.");
//     }
//     // else if(percent) ; //do nothing
//   }
//   if (!depth) return res;
//   throw new SyntaxError("Missing parenthesis start ')'.");
// }

// export function selector$specificity(selector) {
//   const res = countSpecificity(selector.matchAll(SELECTOR_TOKENS), [0, 0, 0, 0]);
//   return res[0] * 1000 + res[1] * 100 + res[2] * 10 + res[3];
// }

/**
 * $SHORT_ABBREVIATIONS
 */
// const SHORT_ABBREVIATIONS = {
//   ">>": " ",
//   ":sm": "@media(min-width:640px)",
//   ":md": "@media(min-width:768px)",
//   ":lg": "@media(min-width:1024px)",
//   ":xl": "@media(min-width:1280px)",
//   ":2xl": "@media(min-width:1536px)",
//   ":dark": "@media(prefers-color-scheme:dark)",
//   ":first": ":first-child",
//   ":last": ":last-child",
//   ":edge": ":is(:first-child,:last-child)",
// };

// const ABBREVIATIONS = new RegExp(Object.keys(SHORT_ABBREVIATIONS).join("|"), "g");
// function selector$abbrivations(selector) {
//   return selector.replaceAll(ABBREVIATIONS, t => SHORT_ABBREVIATIONS[t]);
// }

/**
 * $short SELECTOR
 *
 * NO-SPACE-PERCENT-selector
 * 1. ">>" is the descendant space selector.
 * 2. "%" is a placeholder for implied selector.
 *
 * TODO not supported
 *  :where(), :state(), :has-slotted, :host, :host-context(), :slotted()
 */

// const testSelector = (function () {
//   const styleSheet = new CSSStyleSheet();
//   return function testSelector(selector, txt = selector) {
//     try {
//       selector = selector.replaceAll("%", ".HELLO-SUNSHINE");
//       styleSheet.insertRule(selector + " { border-width: 2px; }");
//       styleSheet.deleteRule(0);
//     } catch (err) {
//       throw new SyntaxError("Illegal no-space-percent selector: " + txt);
//     }
//   };
// })();

// function parse$Selector(txt) {
//   txt = txt.trim();
//   const cssSelector = selector$abbrivations(txt);
//   //todo extract media queries!!
//   testSelector(cssSelector, txt);
//   const specificity = selector$specificity(cssSelector);
//   return cssSelector + "$$" + specificity;
// }

// function parse$ContainerSelector(txt) {
//   txt = txt.split(",").map(txt => txt.includes("%") ? txt : "%" + txt).join(",");
//   return parse$Selector(txt);
// }

// function parse$ItemSelector(txt) {
//   if (txt.includes("%"))
//     throw new SyntaxError("$short item selector cannot contain %: " + txt);
//   return "|" + (parse$Selector(txt.slice(1) || "*"));
// }

/**
 * toCssText
 */
// function ruleToString(selector, props) {
//   let str = selector + " {";
//   for (let [k, v] of Object.entries(props))
//     str += `\n  ${k}: ${v};`;
//   return str + "\n}";
// }

// function* toCssText(shortName, dict) {
//   const cssName = "." + shortName.replaceAll(/[^a-z0-9_-]/g, "\\$&");
//   let specificity, sel, props, rule;
//   //container
//   [sel, props] = Object.entries(dict).find(([k]) => !k.startsWith("|"));
//   sel = parse$ContainerSelector(sel);
//   [sel, specificity] = sel.split(/\$\$(\d+$)/);
//   const conSel = `:where(${sel.replaceAll("%", cssName)})`;
//   if (Object.keys(props).length) {
//     rule = ruleToString(conSel, props);
//     yield `/*container ${specificity}*/\n/*${shortName}*/\n${rule}`;
//   }
//   //items
//   for ([sel, props] of Object.entries(dict)) {
//     if (!sel.startsWith("|"))
//       continue;
//     sel = parse$ItemSelector(sel);
//     [, sel, specificity] = sel.match(/\|(.*)\$\$(\d+)$/s);
//     sel = `${conSel} >\n:where(${sel || "*"})`;
//     rule = ruleToString(sel, props);
//     yield `/*item ${specificity}*/\n/*${shortName}*/\n${rule}`;
//   }
// }