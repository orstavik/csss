import {
  Color,
  LengthPercent,
  Url,
  //todo isImage
  // interpretImage,
  extractLengthPercent,
  extractAnglePercent,
  extractAngle,
  extractColor,
  makeExtractor,
  TYPB,
  SIN,
  SINmax,
} from "./func.js";

const POSITION_WORDS = {};
const POSITIONS_FUNCS = {
  position: SINmax(2, LengthPercent, (name, ar) => ({ backgroundPosition: ar.join(" ") })),
};

const AT_POSITION_WORDS = {};
const AT_POSITION_FUNCS = {
  at: SINmax(2, LengthPercent, (name, ar) => "at " + ar.join(" ")),
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

    POSITIONS_FUNCS[name] = SINmax(dims.length, LengthPercent,
      (name, ar) => ({ backgroundPosition: [inline, ar[0], block, ar[1]].filter(Boolean).join(" ") }));
    AT_POSITION_FUNCS[atName] = SINmax(dims.length, LengthPercent,
      (name, ar) => "at " + [inline, ar[0], block, ar[1]].filter(Boolean).join(" "));
  }
}

function interpretColorSpace(a) {
  const res = {
    hslLonger: "in hsl longer hue",
    hslShorter: "in hsl shorter hue",
    hslIncreasing: "in hsl increasing hue",
    hslDecreasing: "in hsl decreasing hue",
    hwbLonger: "in hwb longer hue",
    hwbShorter: "in hwb shorter hue",
    hwbIncreasing: "in hwb increasing hue",
    hwbDecreasing: "in hwb decreasing hue",
    lchLonger: "in lch longer hue",
    lchShorter: "in lch shorter hue",
    lchIncreasing: "in lch increasing hue",
    lchDecreasing: "in lch decreasing hue",
    oklchLonger: "in oklch longer hue",
    oklchShorter: "in oklch shorter hue",
    oklchIncreasing: "in oklch increasing hue",
    oklchDecreasing: "in oklch decreasing hue",
    oklab: "in oklab",
    lab: "in lab",
    lch: "in lch",
    srgb: "in srgb",
    srgbLinear: "in srgb-linear",
    displayP3: "in display-p3",
    a98Rgb: "in a98-rgb",
    prophotoRgb: "in prophoto-rgb",
    rec2020: "in rec2020",
    xyz: "in xyz",
    xyzD50: "in xyz-d50",
    xyzD65: "in xyz-d65",
  }[a.text];
  if (res) return { text: res };
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

function radial(type, first, { args }) {
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

function conic(type, { args }) {
  let angle = extractAngle(args);
  angle &&= "from " + angle;
  const at = extractAt(args);
  const colorSpace = extractColorSpace(args);
  const colorStops = extractColorStops(args, extractAnglePercent);
  const first = [angle, at, colorSpace].filter(Boolean).join(" ");
  return `${type}-gradient(${[first, ...colorStops].filter(Boolean).join(", ")})`;
}

const linear = (TYPE, ANGLE) => ({ args }) => {
  const angle = ANGLE || extractAngle(args);
  const colorSpace = extractColorSpace(args);
  const colorStops = extractColorStops(args, extractLengthPercent);
  const first = [angle, colorSpace].filter(Boolean).join(" ");
  return { backgroundImage: `${TYPE}-gradient(${[first, ...colorStops].filter(Boolean).join(", ")})` };
}

const GRADIENTS = {
  linear: linear("linear", ""),
  linearLeft: linear("linear", "to left"),
  linearRight: linear("linear", "to right"),
  linearUp: linear("linear", "to top"),
  linearDown: linear("linear", "to bottom"),
  linearUpLeft: linear("linear", "to top left"),
  linearUpRight: linear("linear", "to top right"),
  linearDownLeft: linear("linear", "to bottom left"),
  linearDownRight: linear("linear", "to bottom right"),
  repeatingLinear: linear("repeating-linear", ""),
  repeatingLinearLeft: linear("repeating-linear", "to left"),
  repeatingLinearRight: linear("repeating-linear", "to right"),
  repeatingLinearUp: linear("repeating-linear", "to top"),
  repeatingLinearDown: linear("repeating-linear", "to bottom"),
  repeatingLinearUpLeft: linear("repeating-linear", "to top left"),
  repeatingLinearUpRight: linear("repeating-linear", "to top right"),
  repeatingLinearDownLeft: linear("repeating-linear", "to bottom left"),
  repeatingLinearDownRight: linear("repeating-linear", "to bottom right"),

  radial: e => ({ backgroundImage: radial("radial", "", e) }),
  ellipse: e => ({ backgroundImage: radial("radial", "", e) }),
  ellipseFarthestCorner: e => ({ backgroundImage: radial("radial", "", e) }),
  ellipseFarthestSide: e => ({ backgroundImage: radial("radial", "farthest-side", e) }),
  ellipseClosestCorner: e => ({ backgroundImage: radial("radial", "closest-corner", e) }),
  ellipseClosestSide: e => ({ backgroundImage: radial("radial", "closest-side", e) }),
  circle: e => ({ backgroundImage: radial("radial", "circle", e) }),
  circleFarthestCorner: e => ({ backgroundImage: radial("radial", "circle", e) }),
  circleFarthestSide: e => ({ backgroundImage: radial("radial", "circle farthest-side", e) }),
  circleClosestCorner: e => ({ backgroundImage: radial("radial", "circle closest-corner", e) }),
  circleClosestSide: e => ({ backgroundImage: radial("radial", "circle closest-side", e) }),

  repeatingRadial: e => ({ backgroundImage: radial("repeating-radial", "", e) }),
  repeatingEllipse: e => ({ backgroundImage: radial("repeating-radial", "ellipse", e) }),
  repeatingEllipseFarthestCorner: e => ({ backgroundImage: radial("repeating-radial", "", e) }),
  repeatingEllipseFarthestSide: e => ({ backgroundImage: radial("repeating-radial", "farthest-side", e) }),
  repeatingEllipseClosestCorner: e => ({ backgroundImage: radial("repeating-radial", "closest-corner", e) }),
  repeatingEllipseClosestSide: e => ({ backgroundImage: radial("repeating-radial", "closest-side", e) }),
  repeatingCircle: e => ({ backgroundImage: radial("repeating-radial", "circle", e) }),
  repeatingCircleFarthestCorner: e => ({ backgroundImage: radial("repeating-radial", "circle", e) }),
  repeatingCircleFarthestSide: e => ({ backgroundImage: radial("repeating-radial", "circle farthest-side", e) }),
  repeatingCircleClosestCorner: e => ({ backgroundImage: radial("repeating-radial", "circle closest-corner", e) }),
  repeatingCircleClosestSide: e => ({ backgroundImage: radial("repeating-radial", "circle closest-side", e) }),

  conic: e => ({ backgroundImage: conic("conic", e) }),
  repeatingConic: e => ({ backgroundImage: conic("repeating-conic", e) }),
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
  size: SINmax(2, LengthPercent, (name, ar) => ({ backgroundSize: ar.join(" ") })),
  ...POSITIONS_FUNCS,
  ...GRADIENTS,
};

const bg = TYPB({ ...BACKGROUND_WORDS, ...BACKGROUND_FUNCS }, {}, { Color, Url },

  res => {
    //todo check that we only get one color
    res.Color &&= { backgroundImage: `linear-gradient(${res.Color.join(", ")})` }
    //todo check that we only get one url //todo this should be isImage
    res.Url &&= { backgroundImage: res.Url[0] }
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
  bgColor: SIN(Color, (n, v) => ({ backgroundColor: v })),
  bg
};