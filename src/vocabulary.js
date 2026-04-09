import NativeCss from "./nativeCss.js";
import { CsssPrimitives } from "./func2.js";
import { Color } from "./funcColor.js";

import backgrounds from "./bg.js";
import border from "./border.js";
import fonts from "./font.js";
import block from "./block.js";
import blockItem from "./blockItem.js";
import flex from "./flex.js";
import flexItem from "./flexItem.js";
import grid from "./grid.js";
import gridItem from "./gridItem.js";
import iBlock from "./iBlock.js";
import iBlockItem from "./iBlockItem.js";
import lineClamp from "./lineClamp.js";
import boxItem from "./boxItem.js";
import box from "./box.js";
import palette from "./palette.js";
import transitions from "./transitions.js";
import textDecorations from "./textDecorations.js";
import shadows from "./shadows.js";
import position from "./position.js";
import svg from "./svg.js";
import paragraph from "./paragraph.js";
import paragraphItem from "./paragraphItem.js";
import filter from "./filter.js";
import transforms from "./transform.js";
import animations from "./animations2.js";

const ObjectFit = {       //convert to objectFit("fill|contain|cover|scale-down|none") etc.
  objectFit: undefined,
  fitFill: { objectFit: "fill" },
  fitContain: { objectFit: "contain" },
  fitCover: { objectFit: "cover" },
  fitScaleDown: { objectFit: "scale-down" },
  fitNone: { objectFit: "none" },
};

const SHORTS = {
  ...boxItem.props,
  ...box.props,

  ...backgrounds.props,
  ...fonts.props,
  ...palette,
  ...block.props,
  ...blockItem.props,
  ...flex.props,
  ...flexItem.props,
  ...grid.props,
  ...gridItem.props,
  ...iBlock.props,
  ...iBlockItem.props,
  ...lineClamp.props,
  ...paragraph.props,
  ...paragraphItem.props,
  ...textDecorations.props,
  ...position.props,
  ...shadows.props,
  ...transitions.props,
  ...border.props,
  ...svg.props,
  ...filter.props,
  ...transforms.props,
  ...paragraph.props,
  ...animations.props,
  ...ObjectFit,
  ...box.csss,
  ...boxItem.csss,
  ...block.csss,
  ...blockItem.csss,
  ...flex.csss,
  ...flexItem.csss,
  ...grid.csss,
  ...gridItem.csss,
  ...iBlock.csss,
  ...iBlockItem.csss,
  ...lineClamp.csss,
  ...paragraph.csss,
  ...paragraphItem.csss,
  ...textDecorations.csss,
  ...position.csss,
  ...fonts.csss,
  ...backgrounds.csss,
  ...shadows.csss,
  ...transitions.csss,
  ...border.csss,
  ...svg.csss,
  ...filter.csss,
  ...transforms.csss,
  ...animations.csss,
  displayNone: { display: "none" },
};

for (let [kebab, types] of Object.entries(NativeCss.supported)) {
  let camel = kebab.replace(/-([a-z])/g, g => g[1].toUpperCase());
  if (camel in SHORTS)
    continue;

  const Interpreters2 = {
    number: CsssPrimitives.NumberInterpreter,
    zero: CsssPrimitives.Zero,
    length: CsssPrimitives.Length,
    percent: CsssPrimitives.Percent,
    angle: CsssPrimitives.Angle,
    time: CsssPrimitives.Time,
    resolution: CsssPrimitives.Resolution,
    color: Color,
    url: CsssPrimitives.Url,
    repeat: CsssPrimitives.Repeat,
    minmax: CsssPrimitives.MinMax,
    span: CsssPrimitives.Span,
    image: CsssPrimitives.Image,
    quote: CsssPrimitives.Quote,
    lengthNumber: CsssPrimitives.LengthNumber,
    lengthPercent: CsssPrimitives.LengthPercent,
    lengthPercentNumber: CsssPrimitives.LengthPercentNumber,
    anglePercent: CsssPrimitives.AnglePercent,
    numberPercent: CsssPrimitives.NumberPercent,
  };
  const functions = [...types.map(t => Interpreters2[t]).filter(Boolean)].reverse();

  function interpretNativeValue({ args, name }) {
    const argsOut = args.map(a => {
      let result;
      for (const cb of functions)
        if (result = cb(a))
          return result;
      if (a.name)
        throw new SyntaxError(`Could not interpret to ${camel}(${a.name}(...)).`);
      return a;
    });
    return { [camel]: argsOut.join(" ") };
  }
  Object.defineProperty(interpretNativeValue, 'name', { value: camel });
  SHORTS[camel] = interpretNativeValue;
}

// const Animatables = "translateY|translate|translateX|translateZ|scale|scaleX|scaleY|scaleZ|rotate|rotateX|rotateY|rotateZ|skewX|skewY|opacity|bg|bgColor|color|border|Border".split("|");
// for (let k of Animatables)
//   SHORTS[k] = animationHo(SHORTS[k]);

const REVERSES = {
  ...boxItem.css,
  ...box.css,
  ...block.css,
  ...blockItem.css,
  ...flex.css,
  ...flexItem.css,
  ...grid.css,
  ...gridItem.css,
  ...iBlock.css,
  ...iBlockItem.css,
  ...lineClamp.css,
  ...paragraph.css,
  ...paragraphItem.css,
  // ...textDecorations.css,
  // ...position.css,
};

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

//i think this is not needed, as we are using the overflow shorthand, and that fixes this issue?
// | **overflow-block**       | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-block: scroll) {…}`
// | **overflow-inline**      | `none`, `scroll`, `optional-paged`, `paged` | `@media (overflow-inline: none) {…}`
// const RENAMES = {
//   "overflow-block": "overflow-y",
//   "overflow-inline": "overflow-x",
// };

export { SHORTS, MEDIA_WORDS, REVERSES };


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
