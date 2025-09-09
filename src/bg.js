import {
  interpretColor,
  interpretLengthPercent,
  interpretAngle,
  interpretAnglePercent,
  interpretImage,
  makeExtractor,
} from "./func.js";

function size(args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError("background size() requires one or two arguments.");
  args = args.map(a => {
    a = a.text == "auto" ? a.text : interpretLengthPercent(a);
    if (!a)
      throw new SyntaxError(`background size argument not LengthPercent: ${a.text}`);
    return a.text;
  });
  return { backgroundSize: args.join(" ") };
}

function pos(name, dims, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError("background position() requires one or two arguments.");
  if (dims && dims.length > args.length)
    throw new SyntaxError(`background (${name} require ${dims.length} arguments, got ${args.length}.`);
  return args.map((a, i) => {
    if (["left", "right", "center", "top", "bottom"].includes(a.text))
      return a.text;
    a = interpretLengthPercent(a);
    if (a)
      return dims ? dims[i] + " " + a.text : a.text;
    throw new SyntaxError(`background position argument not LengthPercent: ${a.text}`);
  }).join(" ");
}

const POSITION_WORDS = {};
const AT_POSITION_WORDS = {};
const POSITIONS_FUNCS = { position: args => pos("position", null, args) };
const AT_POSITION_FUNCS = { at: args => ("at " + pos("position", null, args)) };

for (let Inline of ["Left", "Right", "Center", ""]) {
  const inline = Inline.toLowerCase();
  for (let Block of ["Top", "Bottom", "Center", ""]) {
    const block = Block.toLowerCase();
    if (block === inline) continue;
    const name = inline + Block;
    if (name in POSITION_WORDS) continue;
    const atName = "at" + Inline + Block;
    const dims = [inline, block].filter(Boolean);
    POSITION_WORDS[name] = dims.join(" ");
    AT_POSITION_WORDS[atName] = "at " + POSITION_WORDS[name];
    POSITIONS_FUNCS[name] = args => ({ backgroundPosition: pos(name, dims, args) });
    AT_POSITION_FUNCS[atName] = args => ("at " + pos(name, dims, args));
  }
}

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
  size,
  position: pos.bind(null, "position", null),
  ...POSITIONS_FUNCS,
};

function initiateBackground(argsIn) {
  const res = {
    backgroundImage: undefined,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    backgroundOrigin: "padding-box",
    backgroundClip: "border-box",
    backgroundBlendMode: "normal",
    backgroundAttachment: "scroll",
  };
  const args = [];
  for (let a of argsIn) {
    const a2 = BACKGROUND_WORDS[a.text] ??
      BACKGROUND_FUNCS[a.name]?.(a.args);
    a2 ? Object.assign(res, a2) : args.push(a);
  }
  return { res, args };
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

const extractLengthPercent = makeExtractor(interpretLengthPercent);
const extractAnglePercent = makeExtractor(interpretAnglePercent);
const extractAngle = makeExtractor(interpretAngle);
const extractColor = makeExtractor(interpretColor);
const extractColorSpace = makeExtractor(interpretColorSpace);

const extractAt = makeExtractor(a => {
  const a2 = AT_POSITION_WORDS[a.text] ??
    AT_POSITION_FUNCS[a.name]?.(a.args);
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

function bgColorOrImage(args) {
  const img = interpretImage(args[0]);
  if (img)
    return args.shift(), img.text;
  const color = interpretColor(args[0]);
  if (color)
    return args.shift(), `linear-gradient(${color.text})`;
  throw new SyntaxError(`$bg must include either a color or url: ${color.text}.`);
}

function makeBg(cb) {
  return function (argsIn) {
    const { res, args } = initiateBackground(argsIn);
    if (!args.length)
      throw new SyntaxError(`Missing background main argument: color, image, or gradient.`);
    res.backgroundImage = cb(args);
    if (args.length)
      throw new SyntaxError(`Could not interpret $bg() argument: ${args[0].text}.`);
    return res;
  };
}

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

  linear: makeBg(linear.bind(null, "linear", "")),
  linearLeft: makeBg(linear.bind(null, "linear", "to left")),
  linearRight: makeBg(linear.bind(null, "linear", "to right")),
  linearUp: makeBg(linear.bind(null, "linear", "to top")),
  linearDown: makeBg(linear.bind(null, "linear", "to bottom")),
  linearUpLeft: makeBg(linear.bind(null, "linear", "to top left")),
  linearUpRight: makeBg(linear.bind(null, "linear", "to top right")),
  linearDownLeft: makeBg(linear.bind(null, "linear", "to bottom left")),
  linearDownRight: makeBg(linear.bind(null, "linear", "to bottom right")),
  repeatingLinear: makeBg(linear.bind(null, "repeating-linear", "")),
  repeatingLinearLeft: makeBg(linear.bind(null, "repeating-linear", "to left")),
  repeatingLinearRight: makeBg(linear.bind(null, "repeating-linear", "to right")),
  repeatingLinearUp: makeBg(linear.bind(null, "repeating-linear", "to top")),
  repeatingLinearDown: makeBg(linear.bind(null, "repeating-linear", "to bottom")),
  repeatingLinearUpLeft: makeBg(linear.bind(null, "repeating-linear", "to top left")),
  repeatingLinearUpRight: makeBg(linear.bind(null, "repeating-linear", "to top right")),
  repeatingLinearDownLeft: makeBg(linear.bind(null, "repeating-linear", "to bottom left")),
  repeatingLinearDownRight: makeBg(linear.bind(null, "repeating-linear", "to bottom right")),

  radial: makeBg(radial.bind(null, "radial", "")),
  ellipse: makeBg(radial.bind(null, "radial", "")),
  ellipseFarthestCorner: makeBg(radial.bind(null, "radial", "")),
  ellipseFarthestSide: makeBg(radial.bind(null, "radial", "farthest-side")),
  ellipseClosestCorner: makeBg(radial.bind(null, "radial", "closest-corner")),
  ellipseClosestSide: makeBg(radial.bind(null, "radial", "closest-side")),
  circle: makeBg(radial.bind(null, "radial", "circle")),
  circleFarthestCorner: makeBg(radial.bind(null, "radial", "circle")),
  circleFarthestSide: makeBg(radial.bind(null, "radial", "circle farthest-side")),
  circleClosestCorner: makeBg(radial.bind(null, "radial", "circle closest-corner")),
  circleClosestSide: makeBg(radial.bind(null, "radial", "circle closest-side")),

  repeatingRadial: makeBg(radial.bind(null, "repeating-radial", "")),
  repeatingEllipse: makeBg(radial.bind(null, "repeating-radial", "ellipse")),
  repeatingEllipseFarthestCorner: makeBg(radial.bind(null, "repeating-radial", "")),
  repeatingEllipseFarthestSide: makeBg(radial.bind(null, "repeating-radial", "farthest-side")),
  repeatingEllipseClosestCorner: makeBg(radial.bind(null, "repeating-radial", "closest-corner")),
  repeatingEllipseClosestSide: makeBg(radial.bind(null, "repeating-radial", "closest-side")),
  repeatingCircle: makeBg(radial.bind(null, "repeating-radial", "circle")),
  repeatingCircleFarthestCorner: makeBg(radial.bind(null, "repeating-radial", "circle")),
  repeatingCircleFarthestSide: makeBg(radial.bind(null, "repeating-radial", "circle farthest-side")),
  repeatingCircleClosestCorner: makeBg(radial.bind(null, "repeating-radial", "circle closest-corner")),
  repeatingCircleClosestSide: makeBg(radial.bind(null, "repeating-radial", "circle closest-side")),

  conic: makeBg(conic.bind(null, "conic")),
  repeatingConic: makeBg(conic.bind(null, "repeating-conic")),

  bg: makeBg(bgColorOrImage),
};