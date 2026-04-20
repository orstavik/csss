/**
 * Core CSSS helpers:
 * - Re-exports the parser (see Parser.js).
 * - Provides utilities to memoize parsing, keep stylesheets in sync with the DOM,
 *   and remove unused short-generated rules.
 */
export * from "./Parser.js";

/**
 * Memoizes a single-argument function (typically CSSS.parse) with a two-tier cache.
 *
 * Usage:
 *   const parse = memoize(CSSS.parse, 333);
 *
 * @template T
 * @param {(arg: string) => T} fn   Function to memoize (e.g. CSSS.parse)
 * @param {number} [max=333]        Max size of the \"young\" cache before it rolls into \"old\"
 * @returns {(arg: string) => T}    Memoized function
 */
export function memoize(fn, max = 333) {
  let young = new Map(), old = new Map();
  return function (arg) {
    if (young.size > max) { old = young; young = new Map(); }
    if (young.has(arg)) return young.get(arg);
    if (old.has(arg)) { const v = old.get(arg); young.set(arg, v); return v; }
    const v = fn(arg);
    young.set(arg, v);
    return v;
  };
}

/**
 * Replaces classes on an element's classList to match a new ordered list.
 *
 * @param {DOMTokenList} currentClassList  Element.classList to mutate
 * @param {string[]} newClasses            New classes in the desired order
 */
export function updateClassList(currentClassList, newClasses) {
  for (let i = 0; i < currentClassList.length; i++) {
    const cls = currentClassList[i];
    const sequencedCls = newClasses[i];
    if (cls !== sequencedCls)
      currentClassList.replace(cls, sequencedCls);
  }
}

/**
 * Removes CSS rules produced by CSSS shorts that no longer have matching
 * elements in the DOM.
 *
 * @param {Element|Document} root          Root in which to search for occurrences
 * @param {CSSStyleSheet} styleSheet       Stylesheet containing rules from shorts
 * @param {(rule: CSSRule) => string|null} [reverseEngineer=extractSelector]
 *        Function that, given a rule, returns the selector for the original short
 */
export function removeUnusedShorts(root, styleSheet, reverseEngineer = extractSelector) {
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    const rule = styleSheet.cssRules[i];
    const shortSelector = reverseEngineer(rule);
    if (shortSelector && !root.querySelector(shortSelector))
      styleSheet.deleteRule(i);
  }
}

/**
 * Synchronizes a <style> element's textContent with its CSSOM rules.
 *
 * @param {HTMLStyleElement} styleEl  The style element to update
 */
export function updateStyleText(styleEl) {
  styleEl.textContent = [...styleEl.sheet.cssRules].map(r => r.cssText).join('\n');
}

//DEMO FOR HOW TO PATCH FONT IMPORTS IN CSSS
// (function () {

//   //extracts only the first fontFamily if it is in a body.
//   function extractFontFamily(style) {
//     const fontFamily = style.fontFamily ??
//       Object.entries(style).find(([k]) => k.endsWith('FontFamily'))?.[1];
//     return fontFamily.split(',')[0].trim().replace(/['"]/g, '');
//   }

//   //adds a fonts.googleapis.com/css2 import to the styleSheet if needed for the fontFamily
//   async function patchFontFamilyIfNeeded(styleSheet, family) {
//     await document.fonts.ready();
//     if (document.fonts.check(family))
//       return;
//     family = `@import url('https://fonts.googleapis.com/css2?display=swap&family=${family.replace(/ /g, '+')}');`;
//     styleSheet.insertRule(familyImport, 1); //1 is the first @import; 0 is the @layer; rule
//   }


//   //ho function that returns undefined if the same result has already been given before
//   function onlyOnce(fn) {
//     const done = new Set();
//     return function onlyOnce(...args) {
//       const res = fn(...args);
//       if (done.has(res)) return undefined;
//       done.add(res);
//       return res;
//     };
//   }

//   let shorts;      //list of shorts to parse and check.
//   let styleSheet; // the stylesheet that is used to check for font patches.

//   const familyExtractor = onlyOnce(extractFontFamily);
//   for (let short of shorts) {
//     const { full, body } = CSSS.parser(short);
//     styleSheet.insertRule(full, styleSheet.cssRules.length);
//     //the rule is now added, and the browser will try to load the font. async.
//     const family = familyExtractor(body);
//     if (family) //first and only time we encounter a new fontFamily
//       patchFontImports(styleSheet, family);
//   }
// });