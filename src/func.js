import Maths from "./funcMath.js";
import NativeCss from "./nativeCss.js";

//colors
export const WEBCOLORS = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "778899",
  lightslategrey: "778899",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "00ff00",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "ff00ff",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  red: "ff0000",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "ffffff",
  whitesmoke: "f5f5f5",
  yellow: "ffff00",
  yellowgreen: "9acd32",
};

function nativeCssColorFunction(name, args) {
  if (args.length < 3 || args.length > 5)
    throw new SyntaxError(`${name} accepts 3 to 5 arguments: ${args}`);
  args = args.map(a => isColor(a) ?? isBasic(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  return `${name}(${txts.join(" ")})`;
}

function nativeCssColorSpaceFunction(space, args) {
  if (args.length < 3 || args.length > 5)
    throw new SyntaxError(`color() accepts only 3 to 5 arguments: ${args}`);
  args = args.map(a => isColor(a) ?? isBasic(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  txts.unshift(space);
  return `color(${txts.join(" ")})`;
}

function cssColorMix([space, one, two, percent]) {
  space = space == "_" ? "oklab" : isBasic(space).text;
  one = isColor(one).text;
  two = isColor(two).text;
  two += " " + (percent ? isBasic(percent).text : "50%");
  return `color-mix(in ${[space, one, two].join(", ")})`;
}

//#123 => hash(123) => #123
//#primary#30 => hash(primary,30)
//#primary#30#a80 => hash(primary,30,a80)
//#primary#brown33#50
function hash(oneTwo) {
  let [one, two] = oneTwo.map(isColor);
  if (two.vector == "") {
    let left = oneTwo[0], i = 1;
    while (left.name === "#hash") {
      left = left.args[0];
      i++;
    }
    const vector = left.kind == "COLOR" && isColor(left).vector;
    if (!vector)
      throw new SyntaxError(`First color ${left.text} is not a color vector, while ${two.text} is a relative color vector.`);
    if (two.percent >= 100)
      return `var(--color-${vector})`;
    return `color-mix(in oklab, ${one.text}, var(--color-${vector + i}) ${two.percent}%)`;
  }
  if (two.percent >= 100)
    return two.hue ?? two.text;
  return `color-mix(in oklab, ${one.text}, ${two.hue ?? two.text} ${two.percent}%)`;
}

function rgb(rgb) { return rgbaImpl("rgb", rgb); }
function rgba(rgba) { return rgbaImpl("rgba", rgba); }
function rgbaImpl(name, rgba) {
  if (name.length != rgba.length)
    throw new SyntaxError(`${name}() requires exactly ${name.length} arguments.`);
  rgba = rgba.map(isBasic);
  let hex = "";
  for (let i = 0; i < rgba.length; i++) {
    const c = rgba[i];
    let num = c.num;
    if (num == null)
      break;
    if (c.type == "percent")
      num *= 2.55;
    else if (c.type == "number" && i == 3)
      num *= 255;
    else if (c.type != "number")
      throw new SyntaxError(`Expected number or percent, got ${c.type}: ${c.text}`);
    hex += Math.min(Math.max(0, Math.round(num)), 255).toString(16).padStart(2, '0');
  }
  return hex.length === rgba.length * 2 ? "#" + hex :
    name + "(" + rgba.map(c => c.text).join(", ") + ")";
}

const CRX = new RegExp("^#(?:" +
  [
    "(transparent)",
    "a(\\d\\d)",
    "([0-9a-f]{6})([0-9a-f]{2})?",
    "([0-9a-f]{3})([0-9a-f]{1})?",
    "(" + Object.keys(WEBCOLORS).join("|") + ")(\\d\\d)?",
    "(.*?)(\\d\\d)?",
  ].join("|") +
  ")$", "i");

function parseColor(txt) {
  let [, transparent, alpha, c6, c8 = "", c3, c4 = "", name, p = 100, vector, vp = 100] = txt.match(CRX);
  if (transparent)
    return {
      type: "color",
      text: "transparent",
      hue: "transparent",
      percent: 0
    };
  if (alpha)
    return {
      type: "color",
      text: "transparent",
      hue: "transparent",
      percent: 100 - parseInt(alpha)
    };
  if (c3) {
    c6 = c3.split("").map(c => c + c).join('');
    c8 = c4 + c4;
  }
  if (c6)
    return {
      type: "color",
      text: "#" + c6 + c8,
      hue: "#" + c6,
      hex: c6,
      percent: c8 ? (parseInt(c8, 16) / 255 * 100).toFixed(2) : 100,
    };
  if (name) {
    const percent = parseInt(p);
    const hex = WEBCOLORS[name];
    return {
      type: "color",
      text: percent == 100 ? name :
        "#" + hex + Math.round(percent / 100 * 255).toString(16).padStart(2, '0'),
      hue: name,
      hex,
      percent
    };
  }
  if (vector && vp == 100)
    return {
      type: "color",
      text: `var(--color-${vector})`,
      vector,
      percent: 100
    };

  const percent = parseInt(vp);
  return {
    type: "color",
    text: `color-mix(in oklab, transparent, var(--color-${vector}) ${percent}%)`,
    vector,
    percent
  };
}

const COLORS = {
  hash,
  rgb: rgb,
  rgba: rgba,
  hsl: nativeCssColorFunction.bind(null, "hsl"),
  hsla: nativeCssColorFunction.bind(null, "hsla"),
  hwb: nativeCssColorFunction.bind(null, "hwb"),
  lab: nativeCssColorFunction.bind(null, "lab"),
  lch: nativeCssColorFunction.bind(null, "lch"),
  oklab: nativeCssColorFunction.bind(null, "oklab"),
  oklch: nativeCssColorFunction.bind(null, "oklch"),

  srgb: nativeCssColorSpaceFunction.bind(null, "srgb"),
  srgbLinear: nativeCssColorSpaceFunction.bind(null, "srgb-linear"),
  displayP3: nativeCssColorSpaceFunction.bind(null, "display-p3"),
  a98Rgb: nativeCssColorSpaceFunction.bind(null, "a98-rgb"),
  prophotoRgb: nativeCssColorSpaceFunction.bind(null, "prophoto-rgb"),
  rec2020: nativeCssColorSpaceFunction.bind(null, "rec2020"),
  xyz: nativeCssColorSpaceFunction.bind(null, "xyz"),
  xyzD50: nativeCssColorSpaceFunction.bind(null, "xyz-d50"),
  xyzD65: nativeCssColorSpaceFunction.bind(null, "xyz-d65"),
  color: nativeCssColorSpaceFunction.bind(null, "srgb"),

  mix: cssColorMix.bind(null),
  mixHslLonger: args => cssColorMix([{ kind: "WORD", text: "hsl longer hue" }, ...args]),
  mixHslShorter: args => cssColorMix([{ kind: "WORD", text: "hsl shorter hue" }, ...args]),
  mixHslIncreasing: args => cssColorMix([{ kind: "WORD", text: "hsl increasing hue" }, ...args]),
  mixHslDecreasing: args => cssColorMix([{ kind: "WORD", text: "hsl decreasing hue" }, ...args]),
  mixHwbLonger: args => cssColorMix([{ kind: "WORD", text: "hwb longer hue" }, ...args]),
  mixHwbShorter: args => cssColorMix([{ kind: "WORD", text: "hwb shorter hue" }, ...args]),
  mixHwbIncreasing: args => cssColorMix([{ kind: "WORD", text: "hwb increasing hue" }, ...args]),
  mixHwbDecreasing: args => cssColorMix([{ kind: "WORD", text: "hwb decreasing hue" }, ...args]),
  mixLchLonger: args => cssColorMix([{ kind: "WORD", text: "lch longer hue" }, ...args]),
  mixLchShorter: args => cssColorMix([{ kind: "WORD", text: "lch shorter hue" }, ...args]),
  mixLchIncreasing: args => cssColorMix([{ kind: "WORD", text: "lch increasing hue" }, ...args]),
  mixLchDecreasing: args => cssColorMix([{ kind: "WORD", text: "lch decreasing hue" }, ...args]),
  mixOklchLonger: args => cssColorMix([{ kind: "WORD", text: "oklch longer hue" }, ...args]),
  mixOklchShorter: args => cssColorMix([{ kind: "WORD", text: "oklch shorter hue" }, ...args]),
  mixOklchIncreasing: args => cssColorMix([{ kind: "WORD", text: "oklch increasing hue" }, ...args]),
  mixOklchDecreasing: args => cssColorMix([{ kind: "WORD", text: "oklch decreasing hue" }, ...args]),
};

export function toLogicalFour(NAME, ar) {
  ar = ar.map(isBasic).map(a => a.text);
  return ar.length === 1 ? { [NAME]: ar[0] } :
    {
      [NAME + "Block"]: ar[2] != null && ar[2] != ar[0] ? ar[0] + " " + ar[2] : ar[0],
      [NAME + "Inline"]: ar[3] != null && ar[3] != ar[1] ? (ar[1] ?? ar[0]) + " " + ar[3] : ar[1] ?? ar[0],
    };
}
// const NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;
// const NativeCssScopeAttrCounter = {
//   counter: (...args) => `counter(${args.join(",")})`,
//   counters: (...args) => `counters(${args.join(",")})`,
//   attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
// };

export function isBasic(arg) {
  if (arg.kind == "VAR")
    arg.text = `var(${arg.text})`;
  if (arg.kind !== "EXP")
    return arg;
  if (arg.name in Maths)
    return Maths[arg.name](arg.name, arg.args.map(isBasic));
}
export function isWord(a) {
  if (a.kind === "WORD")
    return a;
}
export function isColor(a) {
  if (a.kind === "COLOR")
    return parseColor(a.text);
  //todo the color must be a color or a variable.
  const key = a.name?.slice(1);
  if (key in COLORS)
    return { type: "color", text: COLORS[a.name?.slice(1)]?.(a.args) };
}
export function isMinmax(a) {
  if (a.name === "minmax")
    return { type: "length", text: `minmax(${a.args.map(isBasic).map(t => t.text).join(", ")})` };
}
export function isRepeat(a) {
  if (a.name === "repeat")
    return { type: "length", text: `repeat(${a.args.map(a => isMinmax(a) ?? isBasic(a)).map(t => t.text).join(", ")})` };
}
export function isSpan(a) {
  if (a.name === "span")
    return { type: a.type, text: "span " + isBasic(a.args[0]).text };
}
export function isUrl(a) {
  if (a.kind === "QUOTE")
    return { type: "url", text: `url(${a.text})` };
  if (a.name === "url") {
    if (a.args.length != 1) throw new SyntaxError("url() requires exactly one argument.");
    return { type: "url", text: `url(${isBasic(a.args[0]).text})` };
  }
}
export function isAngle(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle")
    return a;
}
export function isAnglePercent(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle" || a?.type === "percent")
    return a;
}
export function isLengthPercent(a) {
  a = isBasic(a);
  if (a?.type === "length" || a?.type === "percent" || (a?.num == 0 && a?.type === "number"))
    return a;
}
export function isLengthPercentNumber(a) {
  a = isBasic(a);
  if (a?.type === "length" || a?.type === "percent" || a?.type === "number")
    return a;
}
export function isPercent(a) {
  a = isBasic(a);
  if (a?.type === "percent")
    return a;
}
export function isZero(a) {
  a = isBasic(a);
  if (a?.text === "0")
    return a;
}
export function isLength(a) {
  a = isBasic(a);
  if (a?.type === "length" || (a?.num == 0 && a?.type === "number"))
    return a;
}
export function isTime(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "time", text: "0s", unit: "s", num: 0 };
  if (a?.type === "time")
    return a;
}
export function isResolution(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "resolution", text: "0x", unit: "x", num: 0 };
  if (a?.type === "resolution")
    return a;
}
export function isNumber(a) {
  a = isBasic(a);
  if (a?.type === "number" && a.unit == "")
    return a;
}
export function isNumberPercent(a) {
  a = isBasic(a);
  if (a?.type === "number" && a.unit == "" || a?.type === "percent")
    return a;
}
export function isQuote(a) {
  if (a.kind === "QUOTE")
    return a;
}
export function isName(a) {
  if (a.kind === "WORD" && a.text[0].match(/[a-zA-Z0-9-]/))
    return a;
}

//interprets returns STRINGS
export function interpretName(a) {
  if (a.kind === "WORD" && a.text[0].match(/[a-zA-Z0-9-]/))
    return a.text;
}
export function interpretRadian(a) {
  if (a?.num == 0 && a.type === "number")
    return 0;
  if (a?.type !== "angle")
    return;
  if (a.unit === "rad")
    return a.num;
  if (a.unit === "deg")
    return a.num * (Math.PI / 180);
  if (a.unit === "grad")
    return a.num * (Math.PI / 200);
  if (a.unit === "turn")
    return a.num * (2 * Math.PI);
}
export function interpretMimeType(a) {
  const MIME = {
    image: "image/*",
    imageJpeg: "image/jpeg",
    imagePng: "image/png",
    imageGif: "image/gif",
    imageWebp: "image/webp",
    imageAvif: "image/avif",
    imageSvgXml: "image/svg+xml",
  };
  if (a.text in MIME)
    return `type(${MIME[a.text]})`;
}

export function interpretImage(arg) {
  const url = isUrl(arg);
  if (url) return url;
  if (arg.name == "imageSet") {
    const set = [];
    const args = arg.args.slice();
    while (args.length) {
      const url = isUrl(a);
      if (!url)
        throw new SyntaxError("imageSet() sequences must start with a url.");
      args.shift();
      let type = args.length && interpretMimeType(args[0]);
      let resolution = args.length && isResolution(args[0]);
      type ||= args.length && interpretMimeType(args[0]);
      type && args.shift();
      resolution && args.shift();
      set.push([url.text, type, resolution].filter(Boolean).join(" "));
    }
    return `image-set(${set.join(", ")})`;
  }
}

export function makeExtractor(cb) {
  return function (args) {
    if (!args?.length) return;
    const res = cb(args[0]);
    return res != null && args.shift() && res.text;
  };
}
export const extractTime = makeExtractor(isTime);
export const extractLength = makeExtractor(isLength);
export const extractLengthPercent = makeExtractor(isLengthPercent);
export const extractAngle = makeExtractor(isAngle);
export const extractAnglePercent = makeExtractor(isAnglePercent);
export const extractNumber = makeExtractor(isNumber);
export const extractNumberPercent = makeExtractor(isNumberPercent);
export const extractUrl = makeExtractor(isUrl);
export const extractImage = makeExtractor(interpretImage);
export const extractMimeType = makeExtractor(interpretMimeType);
export const extractColor = makeExtractor(isColor);
export const extractWord = makeExtractor(isWord);
export function extractName(args) {
  const a = extractWord(args);
  return a ?? interpretName(a);
}
export function extractRadian(args) {
  const a = extractAngle(args) || undefined;
  return a && interpretRadian(a);
}

function makeEvaluator(interpret) {
  return function (a, i) {
    const a2 = interpret(a);
    if (a2)
      return a2.text;
    throw new SyntaxError(`invalid argument ${i + 1}: "${a.text}" cannot be interpreted as ${interpret.name.slice(9)}.`);
  }
}
export const evaluateTime = makeEvaluator(isTime);
export const evaluateLength = makeEvaluator(isLength);
export const evaluateLengthPercent = makeEvaluator(isLengthPercent);
export const evaluateAngle = makeEvaluator(isAngle);
export const evaluateAnglePercent = makeEvaluator(isAnglePercent);
export const evaluateNumber = makeEvaluator(isNumber);
export const evaluateNumberPercent = makeEvaluator(isNumberPercent);
export const evaluateUrl = makeEvaluator(isUrl);
export const evaluateImage = makeEvaluator(interpretImage);
export const evaluateMimeType = makeEvaluator(interpretMimeType);
export const evaluateColor = makeEvaluator(isColor);
export const evaluateName = makeEvaluator(interpretName);

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   //todo handle as css vars.
//    path: (...args) => `path(${args.join(",")})`,
//    imageSet: (...args) => `image-set(${args.join(",")})`,
// };

const INTERPRETERS = {
  number: isNumber,
  zero: isZero,
  length: isLength,
  percent: isPercent,
  angle: isAngle,
  time: isTime,
  resolution: isResolution,
  color: isColor,
  url: isUrl,
  repeat: isRepeat,
  minmax: isMinmax,
  span: isSpan,
  image: interpretImage,
  quote: isQuote,
  basic: isBasic,
};

const NativeCssProperties = Object.fromEntries(Object.entries(NativeCss.supported).map(([kebab, types]) => {
  let camel = kebab.replace(/-([a-z])/g, g => g[1].toUpperCase());
  function fixBorderNames(originalCamel) {
    const m = originalCamel.match(/^(border)(.+)(Style|Width|Color|Radius)$/);
    return m ? m[1] + m[3] + m[2] : originalCamel;
  }
  camel = fixBorderNames(camel);
  const functions = [isBasic, ...types.map(t => INTERPRETERS[t]).filter(Boolean)].reverse();

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
    return { [camel]: argsOut.map(t => t.text).join(" ") };
  }
  Object.defineProperty(interpretNativeValue, 'name', { value: camel });
  return [camel, interpretNativeValue];
}));

//subdue scopes (font,fontStyle,fontWeight,... -> font { style,weight,... })
//longest name first;
// const keys = Object.keys(NativeCssProperties).sort((a, b) => b.length - a.length);
// for (let k of keys)
//   for (let s of keys.filter(x => x.startsWith(k) && x != k)) {
//     // if (s.startsWith("border"))
//     //   debugger
//     NativeCssProperties[k].scope[s.slice(k.length)] = NativeCssProperties[s];
//     delete NativeCssProperties[s];
//   }

//todo ANIMATION!!!
// NativeCssProperties.animation.scope = ANIMATION_FUNCTIONS;
// const ANIMATION_FUNCTIONS = {
//   linear: (...args) => `linear(${args[0]},${args.length > 2 ? args.slice(1, -1).join(" ") + "," : ""}${args[args.length - 1]})`,
//   ease: (...args) => `ease(${args.join(",")})`,
//   steps: (...args) => `steps(${args.join(",")})`,
//   cubicBezier: (...args) => `cubic-bezier(${args.join(",")})`,
// };

const UnpackedNativeCssProperties = {
  ...NativeCssProperties,
};

export default {
  ...UnpackedNativeCssProperties,
  em: NativeCssProperties.fontSize,
};

export const SEQ = (interpreters, post) => ({ args, name }) => {
  if (args.length != interpreters.length)
    throw new SyntaxError(`${name} requires ${interpreters.length} arguments, got ${args.length} arguments.`);
  return post(interpreters.map((interpreter, i) => {
    const a2 = interpreter(args[i]);
    if (a2)
      return a2.text;
    throw new SyntaxError(`Bad argument ${name}/${i + 1}.
    "${args[i].text}" is not a ${interpreter.name.slice(2)}.
    ${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
  }));
};

// export const SIN_minmax = (min, max, interpreter, post) => ({ args, name }) => {
//   if (args.length < min || args.length > max)
//     throw new SyntaxError(`${name} requires ${min} to ${max} arguments, got ${args.length} arguments.`);
//   return post(args.map((a, i) => {
//     const a2 = interpreter(a);
//     if (a2)
//       return a2.text;
//     throw new SyntaxError(`Bad argument ${name}/${i + 1}.
//     "${a.text}" is not a ${interpreter.name.slice(2)}.
//     ${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${a.text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
//   }));
// };

export const POLY = (funcs) => (exp) => {
  let errors = [];
  for (let cb of funcs) {
    try {
      const v = cb(exp);
      if (v !== undefined) return v;
    } catch (e) {
      errors.push(e.message);
    }
  }
  throw new SyntaxError(errors.join("\n   OR   \n"));
};

export const SpaceListObj = (prop) => ar => ({ [prop]: ar.join(" ") });
export const SpaceFuncObj = (prop, func) => ar => ({ [prop]: `${func}(${ar.join(" ")})` });
export const CommaFuncObj = (prop, func) => ar => ({ [prop]: `${func}(${ar.join(", ")})` });

const matchPrimes = (primes) => {
  primes = Object.entries(primes);
  return a => {
    for (let [k, v] of primes)
      if ((v = v(a)) !== undefined)
        return [k, v];
  };
};

//todo make TYPA into a function that returns .text values instead of the tokens that matches. We want the extractInterpreter function.
export const TYPA = (wes = {}, primes = {}, post) => {
  primes = matchPrimes(primes);
  return ({ args, name }) => {
    if (!args?.length) throw new SyntaxError(`${name} requires at least one argument.`);
    const res = {};
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      let kv;
      if (a.name in wes)
        res[a.name] = wes[a.name](a);
      else if (a.text in wes)
        res[a.text] = wes[a.text];
      else if (kv = primes(a))
        (res[kv[0]] ??= []).push(kv[1]);
      else
        throw new SyntaxError(`Bad argument ${name}/${i + 1}.
${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
    }
    return post(res);
  };
};
export const TYPB = (wes = {}, singlePrimes = {}, primes = {}, post) => {
  singlePrimes = matchPrimes(singlePrimes);
  primes = matchPrimes(primes);
  return ({ args, name }) => {
    if (!args?.length) throw new SyntaxError(`${name} requires at least one argument.`);
    const res = {};
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      let kv;
      if (a.name in wes)
        res[a.name] = wes[a.name](a);
      // res[a.name] = wes[a.name](a)?.text;
      else if (a.text in wes)
        res[a.text] = wes[a.text];
      else if (kv = singlePrimes(a))
        if (res[kv[0]] !== undefined) throw new SyntaxError(`Duplicate argument ${name}/${i + 1}.`);
        else res[kv[0]] = kv[1]?.text;
      else if (kv = primes(a))
        (res[kv[0]] ??= []).push(kv[1]?.text);
      else
        throw new SyntaxError(`Bad argument ${name}/${i + 1}.
${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
    }
    return post(res);
  };
};

export const UMBRELLA = (SCHEMA, POST) => {
  const umbrella = Object.fromEntries(Object.entries(SCHEMA).map(([k]) => [k, "unset"]));
  return ({ args, name }) => {
    if (!args?.length) throw new SyntaxError(`${name} requires at least one argument.`);
    const res = args.reduce((res, a, i) => {
      for (let k in SCHEMA) {
        if (res[k] !== "unset") continue;
        const v = SCHEMA[k](a);
        if (v == null) continue;
        if (v instanceof Object)
          return Object.assign(res, v);
        res[k] = v;
        return res;
      }
      throw new SyntaxError(`Bad argument ${name}/${i + 1}.
${name}(${[...args.slice(0, i).map(a => a.text), ` => ${args[i].text} <= `, ...args.slice(i + 1).map(a => a.text)].join(",")}).`);
    }, { ...umbrella });
    return POST ? POST(res) : res;
  };
};

// export const SIN_minmax2 = (NAME, min, max, interpreter, post) => ({ args, name }) => {
//   if (NAME !== name) return;
//   if (args.length < min || args.length > max)
//     throw new SyntaxError(`${name} requires ${min} to ${max} arguments, got ${args.length} arguments.`);
//   return post(args.map((a, i) => {
//     const a2 = interpreter(a);
//     if (a2 != null)
//       return a2;
//     throw new SyntaxError(`Bad argument ${name}/${i + 1}.
//     "${a.text}" is not a ${interpreter.name}.
//     ${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${a.text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
//   }));
// };

export const SIN = (NAME, interpreter, post) => ({ args, name }) => {
  if (NAME && NAME !== name) return;
  if (args.length != 1)
    throw new SyntaxError(`${name} requires 1 argument, got ${args.length} arguments.`);
  const v = interpreter(args[0]);
  return post ? post(name, v) : v;
};

export const SINmax = (NAME, max, interpreter, post) => ({ args, name }) => {
  if (NAME && NAME !== name) return;
  if (args.length < 1 || args.length > max)
    throw new SyntaxError(`${name} requires 1 to ${max} arguments, got ${args.length} arguments.`);
  return post(name, args.map((a, i) => {
    const a2 = interpreter(a);
    if (a2 != null)
      return a2;
    args = args.map(a => a.text);
    args[i] = ` !! ${args[i]} {{is not a ${interpreter.name}}} !! `;
    throw new SyntaxError(`Bad argument: ${name}(${args.join(",")})`);
  }));
};

export const SEQ2 = (NAME, interpreters, post) => ({ args, name }) => {
  if (NAME && NAME !== name) return;
  if (args.length != interpreters.length)
    throw new SyntaxError(`${name} requires ${interpreters.length} arguments, got ${args.length} arguments.`);
  return post(name, interpreters.map((interpreter, i) => {
    const a2 = interpreter(args[i]);
    if (a2)
      return a2;
    throw new SyntaxError(`Bad argument ${name}/${i + 1}.
    "${args[i].text}" is not a ${interpreter.name.slice(2)}.
    ${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
  }));
};

export const SEQopt = (NAME, interpreters, post) => ({ args, name }) => {
  if (NAME && NAME !== name) return;
  if (args.length < 1 || args.length > interpreters.length)
    throw new SyntaxError(`${name} requires 1 to ${interpreters.length} arguments, got ${args.length} arguments.`);
  return post(args.map((a, i) => {
    const interpreter = interpreters[i];
    const a2 = interpreter(a);
    if (a2 != null)
      return a2;
    args = args.map(a => a.text);
    args[i] = ` !! ${args[i]} {{is not a ${interpreter.name}}} !! `;
    throw new SyntaxError(`Bad argument: ${name}(${args.join(",")})`);
  }));
};

export const CUSTOM_WORD = (NAME, WORDS, POST) => {
  const lookupTable = Object.fromEntries(WORDS.split("|").map(w => [w.replaceAll(/-([a-z])/g, c => c[1].toUpperCase()), w]));
  const cb = POST ?
    a => ((a.text in lookupTable) ? POST(lookupTable[a.text]) : undefined) :
    a => lookupTable[a.text];
  Object.defineProperty(cb, "name", { value: NAME });
  return cb;
};

export const Unset = a => a.text == "_" ? "unset" : undefined;
export const LengthPercent = a => (isLength(a) ?? isPercent(a))?.text;
export const LengthPercentNumber = a => (isLength(a) ?? isPercent(a) ?? isNumber(a))?.text;
export const Number = a => isNumber(a)?.text;
export const NumberPercent = a => (isNumber(a) ?? isPercent(a))?.text;
export const Angle = a => isAngle(a)?.text;
export const AnglePercent = a => (isAngle(a) ?? isPercent(a))?.text;
export const Color = a => isColor(a)?.text;
export const Length = a => isLength(a)?.text;
export const Url = a => isUrl(a)?.text;
export const UrlUnset = a => isUrl(a)?.text ?? Unset(a);
