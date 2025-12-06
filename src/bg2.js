import {
  isColor,
  isLengthPercent,
  isUrl,
  //todo isImage
  // interpretImage,
  extractLengthPercent,
  extractAnglePercent,
  extractAngle,
  extractColor,
  makeExtractor,
  TYPA,
  SEQ,
  SIN_minmax,
} from "./func.js";

const POSITION_WORDS = {};
const POSITIONS_FUNCS = {
  position: SIN_minmax(1, 2, isLengthPercent, ar => ({ backgroundPosition: ar.join(" ") })),
};

const AT_POSITION_WORDS = {};
const AT_POSITION_FUNCS = {
  at: SIN_minmax(1, 2, isLengthPercent, ar => "at " + ar.join(" ")),
};

for (let Inline of ["Left", "Right", "Center", ""]) {
  const inline = Inline.toLowerCase();
  for (let Block of ["Top", "Bottom", "Center", ""]) {
    const block = Block.toLowerCase();
    if (block === inline) continue;
    //todo center center is not accepted? what does a single Center mean?
    //todo with nothing, then we have position: ... and `at ...`
    const name = inline + Block;
    if (name in POSITION_WORDS) continue;
    const atName = "at" + Inline + Block;
    const dims = [inline, block].filter(Boolean);
    POSITION_WORDS[name] = dims.join(" ");
    AT_POSITION_WORDS[atName] = "at " + POSITION_WORDS[name];

    POSITIONS_FUNCS[name] = SEQ(Array(dims.length).fill(isLengthPercent),
      ar => ({ backgroundPosition: [inline, ar[0], block, ar[1]].filter(Boolean).join(" ") }));
    AT_POSITION_FUNCS[atName] = SEQ(Array(dims.length).fill(isLengthPercent),
      ar => `at ${[inline, ar[0], block, ar[1]].filter(Boolean).join(" ")}`);
  }
}

function interpretColorSpace(a) {
  const res = {
    hslLonger: "hsl longer hue",
    hslShorter: "hsl shorter hue",
    hslIncreasing: "hsl increasing hue",
    hslDecreasing: "hsl decreasing hue",
    hwbLonger: "hwb longer hue",
    hwbShorter: "hwb shorter hue",
    hwbIncreasing: "hwb increasing hue",
    hwbDecreasing: "hwb decreasing hue",
    lchLonger: "lch longer hue",
    lchShorter: "lch shorter hue",
    lchIncreasing: "lch increasing hue",
    lchDecreasing: "lch decreasing hue",
    oklchLonger: "oklch longer hue",
    oklchShorter: "oklch shorter hue",
    oklchIncreasing: "oklch increasing hue",
    oklchDecreasing: "oklch decreasing hue",
    oklab: "oklab",
    lab: "lab",
    lch: "lch",
    srgb: "srgb",
    srgbLinear: "srgb-linear",
    displayP3: "display-p3",
    a98Rgb: "a98-rgb",
    prophotoRgb: "prophoto-rgb",
    rec2020: "rec2020",
    xyz: "xyz",
    xyzD50: "xyz-d50",
    xyzD65: "xyz-d65",
  }[a.text];
  if (res) return { text: "in " + res };
}

const extractColorSpace = makeExtractor(interpretColorSpace);

const extractAt = makeExtractor(a => {
  const a2 = AT_POSITION_WORDS[a.text] ??
    AT_POSITION_FUNCS[a.name]?.(a);
  return a2 && { text: a2 };
});

//"Mdn: Including two stop positions is equivalent to declaring two color stops with the same color at the two positions."
function extractColorStop(args, lengthOrAngleExtractor) {
  const color = extractColor(args);
  if (!color) return;
  const len1 = args.length && lengthOrAngleExtractor(args);
  if (!len1) return color;
  const len2 = args.length && lengthOrAngleExtractor(args);
  if (!len2) return color + " " + len1;
  return color + " " + len1 + " " + len2;
}

function extractColorStops(args, lengthOrAngleExtractor) {
  const colorStops = [];
  while (args.length) {
    const cs = extractColorStop(args, lengthOrAngleExtractor);
    if (!cs)
      throw new SyntaxError(`invalid color stop argument: ${args[0]}`);
    colorStops.push(cs);
  }
  if (colorStops.length > 1)
    return colorStops;
  throw new SyntaxError(`gradient() functions requires at least two colors, got ${colorStops.length}.`);
}

function radial(type, first, args) {
  const len = extractLengthPercent(args);
  const len2 = extractLengthPercent(args);
  if (first === "circle" && len2)
    throw new SyntaxError(`radial(circle) can only have one length argument (radius), got two: ${len.text} and ${len2.text}`);
  const at = extractAt(args);
  const colorSpace = extractColorSpace(args);
  const colorStops = extractColorStops(args, extractLengthPercent);
  first = [first, len, len2, at, colorSpace].filter(Boolean).join(" ");
  return `${type}-gradient(${[first, ...colorStops].filter(Boolean).join(", ")})`;
}

function conic(type, args) {
  let angle = extractAngle(args);
  angle &&= "from " + angle;
  const at = extractAt(args);
  const colorSpace = extractColorSpace(args);
  const colorStops = extractColorStops(args, extractAnglePercent);
  const first = [angle, at, colorSpace].filter(Boolean).join(" ");
  return `${type}-gradient(${[first, ...colorStops].filter(Boolean).join(", ")})`;
}

function linear(type, angle, args) {
  angle ||= extractAngle(args);
  const colorSpace = extractColorSpace(args);
  const colorStops = extractColorStops(args, extractLengthPercent);
  const first = [angle, colorSpace].filter(Boolean).join(" ");
  return `${type}-gradient(${[first, ...colorStops].filter(Boolean).join(", ")})`;
}

const GRADIENTS = {
  linear: e => ({ backgroundImage: linear("linear", "", e.args) }),
  linearLeft: e => ({ backgroundImage: linear("linear", "to left", e.args) }),
  linearRight: e => ({ backgroundImage: linear("linear", "to right", e.args) }),
  linearUp: e => ({ backgroundImage: linear("linear", "to top", e.args) }),
  linearDown: e => ({ backgroundImage: linear("linear", "to bottom", e.args) }),
  linearUpLeft: e => ({ backgroundImage: linear("linear", "to top left", e.args) }),
  linearUpRight: e => ({ backgroundImage: linear("linear", "to top right", e.args) }),
  linearDownLeft: e => ({ backgroundImage: linear("linear", "to bottom left", e.args) }),
  linearDownRight: e => ({ backgroundImage: linear("linear", "to bottom right", e.args) }),
  repeatingLinear: e => ({ backgroundImage: linear("repeating-linear", "", e.args) }),
  repeatingLinearLeft: e => ({ backgroundImage: linear("repeating-linear", "to left", e.args) }),
  repeatingLinearRight: e => ({ backgroundImage: linear("repeating-linear", "to right", e.args) }),
  repeatingLinearUp: e => ({ backgroundImage: linear("repeating-linear", "to top", e.args) }),
  repeatingLinearDown: e => ({ backgroundImage: linear("repeating-linear", "to bottom", e.args) }),
  repeatingLinearUpLeft: e => ({ backgroundImage: linear("repeating-linear", "to top left", e.args) }),
  repeatingLinearUpRight: e => ({ backgroundImage: linear("repeating-linear", "to top right", e.args) }),
  repeatingLinearDownLeft: e => ({ backgroundImage: linear("repeating-linear", "to bottom left", e.args) }),
  repeatingLinearDownRight: e => ({ backgroundImage: linear("repeating-linear", "to bottom right", e.args) }),

  radial: e => ({ backgroundImage: radial("radial", "", e.args) }),
  ellipse: e => ({ backgroundImage: radial("radial", "", e.args) }),
  ellipseFarthestCorner: e => ({ backgroundImage: radial("radial", "", e.args) }),
  ellipseFarthestSide: e => ({ backgroundImage: radial("radial", "farthest-side", e.args) }),
  ellipseClosestCorner: e => ({ backgroundImage: radial("radial", "closest-corner", e.args) }),
  ellipseClosestSide: e => ({ backgroundImage: radial("radial", "closest-side", e.args) }),
  circle: e => ({ backgroundImage: radial("radial", "circle", e.args) }),
  circleFarthestCorner: e => ({ backgroundImage: radial("radial", "circle", e.args) }),
  circleFarthestSide: e => ({ backgroundImage: radial("radial", "circle farthest-side", e.args) }),
  circleClosestCorner: e => ({ backgroundImage: radial("radial", "circle closest-corner", e.args) }),
  circleClosestSide: e => ({ backgroundImage: radial("radial", "circle closest-side", e.args) }),

  repeatingRadial: e => ({ backgroundImage: radial("repeating-radial", "", e.args) }),
  repeatingEllipse: e => ({ backgroundImage: radial("repeating-radial", "ellipse", e.args) }),
  repeatingEllipseFarthestCorner: e => ({ backgroundImage: radial("repeating-radial", "", e.args) }),
  repeatingEllipseFarthestSide: e => ({ backgroundImage: radial("repeating-radial", "farthest-side", e.args) }),
  repeatingEllipseClosestCorner: e => ({ backgroundImage: radial("repeating-radial", "closest-corner", e.args) }),
  repeatingEllipseClosestSide: e => ({ backgroundImage: radial("repeating-radial", "closest-side", e.args) }),
  repeatingCircle: e => ({ backgroundImage: radial("repeating-radial", "circle", e.args) }),
  repeatingCircleFarthestCorner: e => ({ backgroundImage: radial("repeating-radial", "circle", e.args) }),
  repeatingCircleFarthestSide: e => ({ backgroundImage: radial("repeating-radial", "circle farthest-side", e.args) }),
  repeatingCircleClosestCorner: e => ({ backgroundImage: radial("repeating-radial", "circle closest-corner", e.args) }),
  repeatingCircleClosestSide: e => ({ backgroundImage: radial("repeating-radial", "circle closest-side", e.args) }),

  conic: e => ({ backgroundImage: conic("conic", e.args) }),
  repeatingConic: e => ({ backgroundImage: conic("repeating-conic", e.args) }),
};


const BACKGROUND_WORDS = {
  ...POSITION_WORDS,
  repeat: { backgroundRepeat: "repeat" },
  repeatX: { backgroundRepeat: "repeat-x" },
  repeatY: { backgroundRepeat: "repeat-y" },
  space: { backgroundRepeat: "space" },
  round: { backgroundRepeat: "round" },
  noRepeat: { backgroundRepeat: "no-repeat" },

  cover: { backgroundSize: "cover" },
  contain: { backgroundSize: "contain" },

  contentBox: { backgroundOrigin: "content-box" },
  borderBox: { backgroundOrigin: "border-box" },

  clipPaddingBox: { backgroundClip: "padding-box" },
  clipContentBox: { backgroundClip: "content-box" },
  clipText: { backgroundClip: "text" },
  clipBorderArea: { backgroundClip: "border-area" },

  multiply: { backgroundBlendMode: "multiply" },
  screen: { backgroundBlendMode: "screen" },
  overlay: { backgroundBlendMode: "overlay" },
  darken: { backgroundBlendMode: "darken" },
  lighten: { backgroundBlendMode: "lighten" },
  colorDodge: { backgroundBlendMode: "color-dodge" },
  colorBurn: { backgroundBlendMode: "color-burn" },
  hardLight: { backgroundBlendMode: "hard-light" },
  softLight: { backgroundBlendMode: "soft-light" },
  difference: { backgroundBlendMode: "difference" },
  exclusion: { backgroundBlendMode: "exclusion" },
  hue: { backgroundBlendMode: "hue" },
  saturation: { backgroundBlendMode: "saturation" },
  color: { backgroundBlendMode: "color" },
  luminosity: { backgroundBlendMode: "luminosity" },

  fixed: { backgroundAttachment: "fixed" },
  scroll: { backgroundAttachment: "scroll" },
  local: { backgroundAttachment: "local" },
  scrollLocal: { backgroundAttachment: "scroll local" },
  localScroll: { backgroundAttachment: "local scroll" },
  fixedLocal: { backgroundAttachment: "fixed local" },
  scrollFixed: { backgroundAttachment: "scroll fixed" },
  fixedScroll: { backgroundAttachment: "fixed scroll" },
  localFixed: { backgroundAttachment: "local fixed" },
};

const BACKGROUND_FUNCS = {
  size: SEQ([isLengthPercent, isLengthPercent], ar => ({ backgroundSize: ar.join(" ") })),
  ...POSITIONS_FUNCS,
  ...GRADIENTS,
};

const bg = TYPA({ ...BACKGROUND_WORDS, ...BACKGROUND_FUNCS }, { isColor, isUrl },

  res => {
    //todo check that we only get one color
    res.isColor &&= { backgroundImage: `linear-gradient(${res.isColor[0].text})` }
    //todo check that we only get one url //todo this should be isImage
    res.isUrl &&= { backgroundImage: res.isUrl[0].text }
    //todo check that we only define backgroundImage once, and all the other properties just once
    return Object.assign({
      background: "none",
      backgroundImage: undefined,
      backgroundPosition: "0% 0%",
      backgroundRepeat: "repeat",
      backgroundSize: "auto",
      backgroundOrigin: "padding-box",
      backgroundClip: "border-box",
      backgroundBlendMode: "normal",
      backgroundAttachment: "scroll",
    }, ...Object.values(res));
  }
);

// function bgColorOrImage(args) {
//   const img = interpretImage(args[0]);  //isColor => linear-gradient on top level
//isUrl => becomes a url() on top level
//   if (img)
//     return args.shift(), img.text;
//   const color = isColor(args[0]);
//   if (color)
//     return args.shift(), `linear-gradient(${color.text})`;
//   throw new SyntaxError(`$bg must include either a color or url: ${color.text}.`);
// }
// const bg = ({ name, args }) => initiateBackground(args);
// function bg({ args: argsIn }) {
//   const { res, args } = initiateBackground(argsIn);
//   if (!args.length)
//     throw new SyntaxError(`Missing background main argument: color, image, or gradient.`);
//   res.backgroundImage = cb(args);
//   if (args.length)
//     throw new SyntaxError(`Could not interpret $bg() argument: ${args[0].text}.`);
//   return res;
// }

export default {
  background: undefined,
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundPosition: undefined,
  backgroundRepeat: undefined,
  backgroundSize: undefined,
  backgroundOrigin: undefined,
  backgroundClip: undefined,
  backgroundBlendMode: undefined,
  backgroundAttachment: undefined,
  bg
};