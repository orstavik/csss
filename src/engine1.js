import { interpret as parseCssShorts, extractShort, extractShortSelector } from "./Parser.js";

/**
 * Use memoize to cache the results of this function.
 *    memoize(parseCssShorts, 333);
 * 
 * @param {String} short string to parse 
 * @returns {{ short: string, layer: string, media: string, selector: string, props: Object, cssText:string }}
 */
function memoize(fn, max = 333) {
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
 * If you have a cssRules object, then you need to do:
 *   const extractShort = memoize(extractShortSelector, 333);
 *   const allShorts = [...cssRules].map(extractShort);
 *   const parseFun = memoize(parseCssShorts, 333);
 *   sequence(allShorts, el.classList, parseFun);
 * 
 * @param {[string]} allShorts 
 * @param {[string]} classListShorts 
 * @param {Function} parseFun 
 * @returns {[string]} sequenced classListShorts
 */
function sequence(allShorts, classListShorts, parseFun) {
  const layerPosition = {};
  const res = [...classListShorts];
  for (let i = 0; i < res.length; i++) {
    const cls = res[i];
    const shortObj = parseFun(cls);
    if (!shortObj) continue; // not a short
    let pos = allShorts.indexOf(cls);
    if (pos == -1) pos = Infinity;
    if (pos >= layerPosition[shortObj.layer])
      layerPosition[shortObj.layer] = pos;
    else
      res[--i] = cls + "!"; // mark and redo!
  }
  return res;
}

function updateClassList(currentClassList, newClasses) {
  for (let i = 0; i < currentClassList.length; i++) {
    const cls = currentClassList[i];
    const sequencedCls = newClasses[i];
    if (cls !== sequencedCls)
      currentClassList.replace(cls, sequencedCls);
  }
}

/**
 * @param {Element} root from where to check for short occurrences 
 * @param {CSSStyleSheet} styleSheet with the shorts to check
 * @param {Function} extractSelector function to extract the short from a rule (this can be a memoized function) 
 */
function removeUnusedShorts(root, styleSheet, extractSelector = extractShortSelector) {
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    const rule = styleSheet.cssRules[i];
    const shortSelector = extractSelector(rule);
    if (shortSelector && !root.querySelector(shortSelector))
      styleSheet.deleteRule(i);
  }
}

function updateStyleText(styleEl) {
  styleEl.textContent = [...styleEl.sheet.cssRules].map(r => r.cssText).join('\n');
}

export {
  parseCssShorts,
  memoize,
  sequence,
  extractShort,
  extractShortSelector,

  updateClassList,
  removeUnusedShorts,
  updateStyleText,
};


//styleEl,[$bob,.hello$bob$,$alice] => [$bob,$bob$,$alice$$]