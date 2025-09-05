import {
  interpretColor,
  interpretLength,
  interpretLengthPercent,
  interpretPercent,
  interpretAngle,
  interpretImage
} from "./func.js";

function pos(name, dims, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError("background position() requires one or two arguments.");
  if (dims && dims.length > args.length)
    throw new SyntaxError(`background (${name} require ${dims.length} arguments, got ${args.length}.`);
  args = args.map(a => {
    a = ["top", "bottom", "left", "right", "center"].find(a.text) ??
      interpretLengthPercent(a);
    if (!a)
      throw new SyntaxError(`background position argument not LengthPercent: ${a.text}`);
    return a.text;
  });
  return dims?.map((d, i) => `${d} ${args[i]}`).join(" ") ??
    args.join(" ");
}
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

const BACKGROUND_FUNCS = {
  position: pos.bind(null, "position", null),
  top: pos.bind(null, "top", ["top"]),
  bottom: pos.bind(null, "bottom", ["bottom"]),
  left: pos.bind(null, "left", ["left"]),
  right: pos.bind(null, "right", ["right"]),
  center: pos.bind(null, "center", ["center", "center"]),
  topLeft: pos.bind(null, "topLeft", ["top", "left"]),
  topRight: pos.bind(null, "topRight", ["top", "right"]),
  bottomLeft: pos.bind(null, "bottomLeft", ["bottom", "left"]),
  bottomRight: pos.bind(null, "bottomRight", ["bottom", "right"]),
  topCenter: pos.bind(null, "topCenter", ["top", "center"]),
  bottomCenter: pos.bind(null, "bottomCenter", ["bottom", "center"]),
  leftCenter: pos.bind(null, "leftCenter", ["center", "left"]),
  rightCenter: pos.bind(null, "rightCenter", ["center", "right"]),
  size
};

const BACKGROUND_WORDS = {
  top: { backgroundPosition: "top" },
  bottom: { backgroundPosition: "bottom" },
  left: { backgroundPosition: "left" },
  right: { backgroundPosition: "right" },
  center: { backgroundPosition: "center" },
  topLeft: { backgroundPosition: "top left" },
  topRight: { backgroundPosition: "top right" },
  bottomLeft: { backgroundPosition: "bottom left" },
  bottomRight: { backgroundPosition: "bottom right" },
  topCenter: { backgroundPosition: "top center" },
  bottomCenter: { backgroundPosition: "bottom center" },
  leftCenter: { backgroundPosition: "left center" },
  rightCenter: { backgroundPosition: "right center" },
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
    a = BACKGROUND_WORDS[a.text] ?? BACKGROUND_FUNCS[a.name]?.(a.args);
    a ? Object.assign(res, a) : args.push(a);
  }
  return { res, args };
}

function interpretColorSpace(a) {
  return {
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
}

function makeExtractor(cb) {
  return function (args) {
    const res = cb(args[0]);
    return res != null && args.shift() && res.text;
  };
}

const extractLength = makeExtractor(interpretLengthPercent);
const extractAngle = makeExtractor(interpretAngle);
const extractColor = makeExtractor(interpretColor);
const extractColorSpace = makeExtractor(interpretColorSpace);

function extractAt(args) {
  const WORDS = {
    atTop: "top",
    atBottom: "bottom",
    atLeft: "left",
    atRight: "right",
    atCenter: "center",
    atTopLeft: "top left",
    atTopRight: "top right",
    atTopCenter: "top center",
    atBottomLeft: "bottom left",
    atBottomRight: "bottom right",
    atBottomCenter: "bottom center",
    atCenterLeft: "center left",
    atCenterRight: "center right",
  };
  if (args[0]?.text in WORDS) {
    args.shift();
    return WORDS[args[0].text];
  }
  if (args[0]?.name != "at")
    return "";
  const at = args.shift();
  if (at.args.length < 1 || at.args.length > 2)
    throw new SyntaxError(`Gradient at() function must have one or two arguments, got ${at.args.length}`);
  const res = at.args.map(a => {
    a = interpretLength(a) ??
      interpretPercent(a);
    if (!a)
      throw new SyntaxError(`Could not interpret gradient() "at"-position argument : ${a}`);
    return a.text;
  });
  return res.join(" ");
}

function extractColorStop(args, lengthOrAngleExtractor) {
  const color = extractColor(args);
  if (!color) return;
  const len1 = lengthOrAngleExtractor(args);
  if (!len1) return color.text;
  const len2 = lengthOrAngleExtractor(args);
  if (!len2) return color.text + " " + len2.text;
  return color.text + " " + len1.text + " " + len2.text;
}

function extractColorStops(args, lengthOrAngleExtractor) {
  const colorStops = [];
  while (args.length) {
    const cs = extractColorStop(args, lengthOrAngleExtractor);
    if (!cs)
      throw new SyntaxError(`invalid color stop argument: ${args[0]}`);
    colorStops.push(cs);
  }
  return colorStops;
}

function radial(type, first, args) {
  let len = extractLength(args);
  let len2 = extractLength(args);
  if (first === "circle" && len2)
    throw new SyntaxError(`radial(circle) can only have one length argument (radius), got two: ${len.text} and ${len2.text}`);
  let at = extractAt(args);
  at &&= "at " + at;
  let colorSpace = extractColorSpace(args);
  colorSpace &&= "in " + colorSpace;
  first == [first, len, len2, at, colorSpace].filter(Boolean).join(" ");
  first &&= first + ",";
  const colorStops = extractColorStops(args, extractLength);
  if (colorStops.length < 2)
    throw new SyntaxError(`radial-gradient() requires at least two color stops, got ${colorStops.length}`);
  return `${type}-gradient(${[first, ...colorStops].join(", ")})`;
}

function conic(type, args) {
  let angle = extractAngle(args);
  angle &&= "from " + angle.text;
  let at = extractAt(args);
  at &&= "at " + at;
  let colorSpace = extractColorSpace(args);
  colorSpace &&= "in " + colorSpace;
  let first = [angle, at, colorSpace].filter(Boolean).join(" ");
  first &&= first + ",";
  const colorStops = extractColorStops(args, extractAngle);
  if (colorStops.length < 2)
    throw new SyntaxError(`conic-gradient() requires at least two color stops, got ${colorStops.length}`);
  return `${type}-gradient(${[angle, ...colorStops].join(", ")})`;
}

function linear(type, angle, args) {
  angle ||= extractAngle(args);
  let colorSpace = extractColorSpace(args);
  colorSpace &&= "in " + colorSpace;
  let first = [angle, colorSpace].filter(Boolean).join(" ");
  first &&= first + ",";
  const colorStops = extractColorStops(args, extractLength);
  return `${type}-gradient(${[first, ...colorStops].join(", ")})`;
}

function bg(args) {
  const { res, args: rest } = initiateBackground(args);
  res.backgroundImage = interpretImage(a);
  if (!backgroundImage) {
    let color = interpretColor(a);
    if (color)
      res.backgroundImage = `linear-gradient(${color.text},${color.text})`;
  }
  if (!res.backgroundImage)
    throw new SyntaxError(`$bg must include either a color or url: ${a.text}.`);
  if (rest.length)
    throw new SyntaxError(`Could not interpret $bg() argument: ${rest[0].text}.`);
  return res;
}

const BackgroundFunctions = {
  linear: linear.bind(null, "linear", ""),
  linearLeft: linear.bind(null, "linear", "to left"),
  linearRight: linear.bind(null, "linear", "to right"),
  linearUp: linear.bind(null, "linear", "to top"),
  linearDown: linear.bind(null, "linear", "to bottom"),
  linearUpLeft: linear.bind(null, "linear", "to top left"),
  linearUpRight: linear.bind(null, "linear", "to top right"),
  linearDownLeft: linear.bind(null, "linear", "to bottom left"),
  linearDownRight: linear.bind(null, "linear", "to bottom right"),
  repeatingLinear: linear.bind(null, "repeating-linear", ""),
  repeatingLinearLeft: linear.bind(null, "repeating-linear", "to left"),
  repeatingLinearRight: linear.bind(null, "repeating-linear", "to right"),
  repeatingLinearUp: linear.bind(null, "repeating-linear", "to top"),
  repeatingLinearDown: linear.bind(null, "repeating-linear", "to bottom"),
  repeatingLinearUpLeft: linear.bind(null, "repeating-linear", "to top left"),
  repeatingLinearUpRight: linear.bind(null, "repeating-linear", "to top right"),
  repeatingLinearDownLeft: linear.bind(null, "repeating-linear", "to bottom left"),
  repeatingLinearDownRight: linear.bind(null, "repeating-linear", "to bottom right"),

  radial: radial.bind(null, "radial", ""),
  circle: radial.bind(null, "radial", "circle"),
  ellipse: radial.bind(null, "radial", "ellipse"),
  ellipseFarthestCorner: radial.bind(null, "radial", "farthest-corner"),
  ellipseFarthestSide: radial.bind(null, "radial", "farthest-side"),
  ellipseClosestCorner: radial.bind(null, "radial", "closest-corner"),
  ellipseClosestSide: radial.bind(null, "radial", "closest-side"),

  repeatingRadial: radial.bind(null, "repeating-radial", ""),
  repeatingCircle: radial.bind(null, "repeating-radial", "circle"),
  repeatingEllipse: radial.bind(null, "repeating-radial", "ellipse"),
  repeatingEllipseFarthestCorner: radial.bind(null, "repeating-radial", "farthest-corner"),
  repeatingEllipseFarthestSide: radial.bind(null, "repeating-radial", "farthest-side"),
  repeatingEllipseClosestCorner: radial.bind(null, "repeating-radial", "closest-corner"),
  repeatingEllipseClosestSide: radial.bind(null, "repeating-radial", "closest-side"),

  conic: conic.bind(null, "conic"),
  repeatingConic: conic.bind(null, "repeating-conic"),

  bg,
};

//conic from 45deg at center, red, blue 90deg, green 180deg, red
//linear to bottom right, red, blue 50%, green
//radial circle at center, red, blue 50%, green
//radial ellipse farthest-corner at center, red, blue 50%, green
//conic at center, red, blue 90deg, green 180deg, red
//conic from 45deg, red, blue 90deg, green 180deg, red
//conic red, blue 90deg, green 180deg, red
//linear red, blue 50%, green
//radial red, blue 50%, green