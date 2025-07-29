import { interpret, extractShort, extractShortSelector } from "./Parser.js";
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

  sm: "min-width:640px",
  md: "min-width:768px",
  lg: "min-width:1024px",
  xl: "min-width:1280px",
  xxl: "min-width:1536px",
  xxxl: "min-width:1920px",
};

// todo make this work with @media.
// | **overflow-block**       | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-block: scroll) {…}`
// | **overflow-inline**      | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-inline: none) {…}`
const RENAME = {
  "overflow-block": "overflow-y",
  "overflow-inline": "overflow-x",
};

const SHORTS = {
  ...nativeAndMore,
  ...fonts,
  ...gradients,
  // ...colorPalette,
  ...layouts,
  lineClamp: function (lines, ...args) {
    return this.block({
      display: "-webkit-box",
      WebkitLineClamp: lines,
      WebkitBoxOrient: "vertical",
      overflowY: "hidden"
    }, ...args);
  },
};

/**
 * Use memoize to cache the results of this function.
 *    memoize(parseCssShorts, 333);
 * 
 * @param {String} short string to parse 
 * @returns {{ short: string, layer: string, media: string, selector: string, props: Object, cssText:string }}
 */
function parseCssShorts(short) {
  return interpret(short, SHORTS, MEDIA_WORDS, RENAME);
}

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

function updateClassList(classList, sequencedClassList) {
  for (let i = 0; i < classList.length; i++) {
    const cls = classList[i];
    const sequencedCls = sequencedClassList[i];
    if (cls !== sequencedCls)
      classList.replace(cls, sequencedCls);
  }
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