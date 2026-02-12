/**
 * Vocabulary module:
 * - Aggregates all short definitions from individual modules into a single
 *   SHORTS lookup object, and defines MEDIA_WORDS for @-rule media queries.
 *
 * This is the central registry that the Parser uses to resolve short names
 * to their handler functions or preset objects.
 *
 * Export map:
 * - `SHORTS`: merged object of all short handlers/presets from every module.
 * - `MEDIA_WORDS`: lookup of media query keywords to CSS media feature strings.
 */
import nativeAndMore from "./func.js";
import backgrounds from "./bg.js";
import border from "./border.js";
import fonts from "./font.js";
import layouts from "./layout.js";
import palette from "./palette.js";
import transitions from "./transitions.js";
import textDecorations from "./textDecorations.js";
import filterTransforms from "./filterTransform.js";
import shadows from "./shadows.js";
import position from "./position.js";
import svg from "./svg.js";
import whitespace from "./whitespace.js";
import paragraph from "./paragraph.js";
import { wrapWithAnimationSupport } from "./animations.js";

// --- Animation-aware short wrappers ---

const Animations = {
  translateY: wrapWithAnimationSupport(filterTransforms.translateY),
  translate: wrapWithAnimationSupport(filterTransforms.translate),
  translateX: wrapWithAnimationSupport(filterTransforms.translateX),
  translateZ: wrapWithAnimationSupport(filterTransforms.translateZ),
  scale: wrapWithAnimationSupport(filterTransforms.scale),
  scaleX: wrapWithAnimationSupport(filterTransforms.scaleX),
  scaleY: wrapWithAnimationSupport(filterTransforms.scaleY),
  scaleZ: wrapWithAnimationSupport(filterTransforms.scaleZ),
  rotate: wrapWithAnimationSupport(filterTransforms.rotate),
  rotateX: wrapWithAnimationSupport(filterTransforms.rotateX),
  rotateY: wrapWithAnimationSupport(filterTransforms.rotateY),
  rotateZ: wrapWithAnimationSupport(filterTransforms.rotateZ),
  skewX: wrapWithAnimationSupport(filterTransforms.skewX),
  skewY: wrapWithAnimationSupport(filterTransforms.skewY),
  opacity: wrapWithAnimationSupport(nativeAndMore.opacity),
  bg: wrapWithAnimationSupport(backgrounds.bg),
  bgColor: wrapWithAnimationSupport(backgrounds.bgColor),
  color: wrapWithAnimationSupport(nativeAndMore.color),
  border: wrapWithAnimationSupport(border.border),
  Border: wrapWithAnimationSupport(border.Border),
}

// --- Object fit presets ---

const ObjectFit = {
  objectFit: undefined,
  fitFill: { objectFit: "fill" },
  fitContain: { objectFit: "contain" },
  fitCover: { objectFit: "cover" },
  fitScaleDown: { objectFit: "scale-down" },
  noObjectFit: { objectFit: "none" },
};

// --- Merged short registry ---

const SHORTS = {
  ...nativeAndMore,
  ...backgrounds,
  ...fonts,
  ...palette,
  ...layouts,
  ...transitions,
  ...textDecorations,
  ...border,
  ...filterTransforms,
  ...shadows,
  ...position,
  ...svg,
  ...paragraph,
  ...whitespace,
  ...ObjectFit,
  ...Animations,
};

// --- Media query keyword mappings ---

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
  dark: "(prefers-color-scheme:dark)",
};

// | **overflow-block**       | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-block: scroll) {…}`
// | **overflow-inline**      | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-inline: none) {…}`
// const RENAMES = {
//   "overflow-block": "overflow-y",
//   "overflow-inline": "overflow-x",
// };

export { SHORTS, MEDIA_WORDS };


/*
todo not implemented. :edge should be included!
:first = :first-child;
:second = :nth-child(2);
:third = :nth-child(3);
:fourth = :nth-child(4);
:fifth = :nth-child(5);
:sixth = :nth-child(6);
:seventh = :nth-child(7);
:eighth = :nth-child(8);
:ninth = :nth-child(9);
:tenth = :nth-child(10);
:last = :last-child;
:edge = :first-child,:last-child;
:edge = :where(:first-child,:last-child); //this is correct
:edge = :is(:first,:last); //todo this is not correct, but it is a good start.
*/
