import { Rule, extractShort, shortClassName } from "./Parser.js";
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

const parseCssShorts = (str) => Rule.interpret(str, SHORTS, MEDIA_WORDS, RENAME);

function findLayerType(short) {
  if (!short.includes("$")) return;
  const num = short.match(/\$*$/)?.[0].length ?? "";
  if (short[0] === "$") return "containerDefault" + num;
  if (short[0] === "|" && short[1] === "$") return "itemDefault" + num;
  const shortWithoutQuote = short.replaceAll(/''/g, ""); // remove all text within quotes
  const i = shortWithoutQuote.indexOf("$");
  const j = shortWithoutQuote.indexOf("|");
  if (j < 0 || i < j) return "container" + num;
  return "item" + num;
}
//make a memoize ho function that caches on the string value first argument
function memoize(fn) {
  const cache = {};
  return function (arg) {
    return cache[arg] ??= fn(arg);
  };
}

export function sequenceClasslistRaw(rulesWithShorts, shortToLayerName, classList) {
  const layerPostions = {};
  const res = [...classList];
  for (let i = 0; i < res.length; i++) {
    const cls = res[i];
    const layerName = shortToLayerName[cls];
    if (!layerName)
      continue;
    let pos = rulesWithShorts.findIndex(r => r.short == cls);
    if (pos < 0) pos = Infinity;
    if (pos < layerPostions[layerName]) {
      res[i] = cls + "$"; // mark as not the latest in layer
      i--;
      continue; //try again
    } else {
      layerPostions[layerName] = pos;
    }
  }
  return res;
}

export function sequenceClasslist(style, classList) {
  const rulesWithShorts = style.sheet.cssRules;
  for (let rule of rulesWithShorts)
    rule.short ??= extractShort(rule);
  const shortToLayerName = {};
  for (let cls of classList)
    shortToLayerName[cls] ??= findLayerType(cls);
  return sequenceClasslistRaw(rulesWithShorts, shortToLayerName, classList);
}

class SheetWrapper {

  #array = null;
  #el = null;
  #sheet = null;

  constructor(styleEl) {
    this.#el = styleEl ?? document.createElement("style");
    this.#sheet = styleEl.sheet;
    if (!this.#sheet.cssRules[0]?.cssText.startsWith("@layer container,"))
      this.#sheet.insertRule("@layer container, containerDefault, items, itemsDefault;", 0);
    this.#array = [...this.#sheet.cssRules].map(extractShort);
  }

  removeUnusedShorts(doc = this.#el.ownerDocument) {
    if (doc.isConnected)
      for (const short of this.#array)
        if (short && !doc.querySelector(shortClassName(short)))
          this.deleteShort(short);
  }

  cleanup() {
    this.#el.textContent = [...this.#sheet.cssRules].map(r => r.cssText).join('\n');
    this.#sheet = this.#el.sheet;
  }

  indexOf(short) {
    return this.#array.indexOf(short);
  }

  #appendShort(short) {
    const rule = parseCssShorts(short)?.full;
    if (!rule)
      return -1;
    this.#sheet.insertRule(rule, this.#sheet.cssRules.length);
    this.#array.push(short);
    return this.#array.length - 1;
  }

  addShort(short) {
    let pos = this.#array.indexOf(short);
    if (pos >= 0) return pos;
    this.#appendShort(short);
  }

  deleteShort(short) {
    const i = this.#array.indexOf(short);
    if (i < 0) return;
    this.#sheet.deleteRule(i);
    this.#array.splice(i, 1);
  }

  checkClassList(classList) {
    const latestInLayer = {};
    for (let i = 0; i < classList.length; i++) {
      const cls = classList[i];
      let pos = this.#array.indexOf(cls);
      if (pos < 0)
        pos = this.addShort(cls);
      if (pos < 0)
        continue; // not a short
      const layerRule = this.#sheet.cssRules[pos];
      const layerName = layerRule.name;
      if (!(latestInLayer[layerName] > pos))
        latestInLayer[layerName] = pos;
      else
        classList.replace(cls, cls + "$"), i--;
    }
  }
}

export { SheetWrapper, parseCssShorts };

// function correctlySequencedClassList(shortsInSequence, rulesInSequence, clsList) {
//   const res = [];
//   const latestInLayer = {};
//   for (let i = 0; i < clsList.length; i++) {
//     const cls = clsList[i];
//     const pos = sheetWrapper.indexOf(cls);
//     if (pos < 0) {
//       res.push(cls);
//       continue; // not a short
//     }

//     let pos = res.indexOf(cls);
//     if (pos >= 0) {
//       if (latestInLayer[cls] > pos) {
//         res.splice(pos, 1);
//         i--;
//       } else {
//         latestInLayer[cls] = pos;
//       }
//       continue;
//     }
//     pos = res.length;
//     res.push(cls);
//     latestInLayer[cls] = pos;
//   }
// }

//styleEl,[$bob,.hello$bob$,$alice] => [$bob,$bob$,$alice$$]

function sequenceShorts(styleEl, classList) {
  return classList.map(cls => {
    const pos = getShortPosition(styleEl, cls);
    //this is a stateful function, that can cache the positioning of styleEl
    //this would then need to block all the calls to that function. We would need to wrap it to protect it from being used by others.
    //we can wrap the styleEl in a custom HTMLElement prototype that blocks .textContent and .innerHTML and .insertRule, .deleteRule and .sheet?
  });
}

// To sort, i use .className. To append $ to class, we use .classList.replace(oldName, oldName+"$")
// The pure function is to sort the classList (which we will not use?),
// and rename classList. It will return an array with the classes correctly named according to the stylesheet. Array in, array out.
// Find unspecified. Iterate an array and find the classes that is not in a stylesheet unDefinedShorts(styleEl, iterOfClasses)