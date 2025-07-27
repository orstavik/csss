import { Rule, extractLongestCssClass, shortClassName } from "./Parser.js";
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

class SheetWrapper {
  #array = null;
  constructor(styleEl) {
    !styleEl && document.head.append(styleEl = document.createElement("style"));
    this.styleEl = styleEl;
    this.sheet = styleEl.sheet;
    if (!this.sheet.cssRules[0]?.cssText.startsWith("@layer container,"))
      this.sheet.insertRule("@layer container, containerDefault, items, itemsDefault;", 0);
    this.#array = [...this.sheet.cssRules].map(extractLongestCssClass);
  }

  async cleanup(doc = this.styleEl.ownerDocument) {
    await new Promise(r => requestAnimationFrame(r));
    for (const short of this.#array)
      if (short && !doc.querySelector(shortClassName(short)))
        this.deleteShort(short);
    this.styleEl.textContent = [...this.sheet.cssRules].map(r => r.cssText).join('\n');
    this.sheet = this.styleEl.sheet;
  }

  addShort(short) {
    let pos = this.#array.indexOf(short);
    if (pos >= 0) return pos;
    const rule = parseCssShorts(short)?.full;
    if (!rule)
      return -1;
    this.sheet.insertRule(rule, this.sheet.cssRules.length);
    this.#array.push(short);
    return this.#array.length - 1;
  }

  deleteShort(short) {
    const i = this.#array.indexOf(short);
    if (i < 0) return;
    this.sheet.deleteRule(i);
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
      const layerRule = this.sheet.cssRules[pos];
      const layerName = layerRule.name;
      if (!(latestInLayer[layerName] > pos))
        latestInLayer[layerName] = pos;
      else
        classList.replace(cls, cls + "$"), i--;
    }
  }
}

export { SheetWrapper, parseCssShorts };