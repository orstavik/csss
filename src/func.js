//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//mdn specifies more lengths, but we don't support them yet.
import { TYPES, isLength, isAngle, isTime } from "./Parser.js";
export { TYPES, isLength, isAngle, isTime };

//todo here we need + - * / ?? var calc max min clamp log exp etc.
//they should return the type if it can be deduced by the number.
//we need 3 types of outcome
//Number
//Var
//String //if we have a string or var below, we must go with string. But the string can contain a type.

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

const FACTORS = {
  // Times
  s_ms: 1000,
  // Length
  in_cm: 2.54,
  in_mm: 25.4,
  in_pt: 72,
  in_pc: 6,
  cm_mm: 10,
  pc_mm: 25.4 / 6,
  pc_pt: 12,
  cm_Q: 40,
  mm_Q: 4,
  in_Q: 25.4 / 0.25,
  pt_Q: (25.4 / 72) / 0.25,
  // Frequency
  kHz_Hz: 1000,
  // Angles
  turn_deg: 360,
  turn_rad: 2 * Math.PI,
  turn_grad: 400,
  rad_deg: 180 / Math.PI,
  rad_grad: 200 / Math.PI,
  deg_grad: 400 / 360,
  // Resolution
  dppx_dpi: 96,
  dppx_dpcm: 96 / 2.54,
  dpcm_dpi: 2.54,
};

function plus(args) {
  args = args.map(interpretBasic);
  if (args[0].type !== args[1].type)
    throw new SyntaxError(`+ can only be used with same types, got ${args.map(a => a.type).join("+")}`);
  const factor = args[0].unit === args[1].unit ? 1 :
    FACTORS[args[0].unit + "_" + args[1].unit] ??
    (1 / FACTORS[args[1].unit + "_" + args[0].unit]);
  if (factor) {
    const num = args[0].num + args[1].num * factor;
    const text = num + args[0].unit;
    return { ...args[0], text, num };
  }
  return { type: args[0].type, text: `calc(${args.map(a => a.text).join(" + ")})` };
}
function multi(args) {
  args = args.map(interpretBasic);
  if (args[0].type !== "number" && args[1].type !== "number")
    throw new SyntaxError(`* can only be used when one of the factors is a pure number, got ${args.map(a => a.type).join("*")}`);
  if (("num" in args[0] && "num" in args[1])) {
    const base = args[1].type === "number" ? args[0] : args[1];
    const num = args[0].num * args[1].num;
    const text = num + base.unit;
    return { ...base, text, num };
  }
  return { type: args[0].type, text: `calc(${args.map(a => a.text).join(" * ")})` };
}
// function divide(args) {
//   debugger
//   args = args.map(interpretBasic);
//   if (args[1].type !== "number" || args[0].type === "number")
//     throw new SyntaxError(`/ can only be used with one number, got ${args.map(a => a.type).join("/")}`);
//   const num = args[0].num / args[1].num;
//   const text = num + (args[0].unit ?? "") + (args[1].unit ? "/" + args[1].unit : "");
//   return { ...args[0], text, num };
// }  

const CORE = {
  "+": plus,
  "*": multi,
}

export function interpretBasic(arg) {
  if (arg.kind !== "EXP")
    return arg;
  if (arg.name in CORE)
    return CORE[arg.name](arg.args);
  debugger
  throw new SyntaxError(arg.name + "() is not a basic function.")
}

export function interpret(arg, type) {
  if (arg.kind === "EXP") {
    const func = scope[arg.name];
    if (!func)
      throw new SyntaxError(arg.name + "() is not a base function.")
    arg = func(arg.args);
  }
  if (type && arg.type && !type.includes(arg.type))
    throw new SyntaxError(`Type mismatch: expected ${type}, got ${arg.type}`);
  return arg;
}

export function toRadiusFour(NAME, ar) {
  ar = ar.map(interpretBasic).map(a => a.text);
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  return {
    [NAME + "StartStart"]: ar[0],
    [NAME + "EndEnd"]: ar[2] ?? ar[0],
    [NAME + "StartEnd"]: ar[1],
    [NAME + "EndStart"]: ar[3] ?? ar[1],
  };
}

export function toLogicalFour(NAME, ar) {
  ar = ar.map(interpretBasic).map(a => a.text);
  return ar.length === 1 ? { [NAME]: ar[0] } :
    {
      [NAME + "Block"]: ar[2] != null && ar[2] != ar[0] ? ar[0] + " " + ar[2] : ar[0],
      [NAME + "Inline"]: ar[3] != null && ar[3] != ar[1] ? (ar[1] ?? ar[0]) + " " + ar[3] : ar[1] ?? ar[0],
    };
}
//todo there are different ways to do the logic here..
//todo length == 2, I think that we could have top/bottom too
//todo length == 3, then the third becomes all the inline ones
//todo length === 4, then forth is the inline on the end side
function toLogicalEight(NAME, DEFAULT, ar) {
  ar = ar.map(interpretBasic).map(a => a.text);
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  let [bss, iss, bes, ies, bse, ise, bee, iee] = ar;
  if (ar.length === 2) ise = ies = iee = iss, bse = bes = bee = bss;
  if (ar.length === 3) ise = ies = iee = iss, bse = bss, bee = bes;
  if (ar.length === 4) ise = iss, iee = ies, bse = bss, bee = bes;
  if (ar.length === 5) ise = iss, iee = ies, bee = bes;
  if (ar.length === 6) iee = ies, bee = bes;
  if (ar.length === 7) iee = ies;
  const res = {};
  if (bss || iss) res[NAME + "TopLeft"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
  if (bse || ies) res[NAME + "TopRight"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
  if (bes || ise) res[NAME + "BottomLeft"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
  if (bee || iee) res[NAME + "BottomRight"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
  return res;
}

export function borderSwitch(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => {
    if (k === "transition") return [k, v];
    const [wsr, ...dirs] = k.split(/(?=[A-Z])/);
    return [["border", ...dirs, wsr].join(""), v];
  }));
}

//scope functions start
const NativeCssScopeMath = {
  min: (...args) => `min(${args.join(",")})`,
  max: (...args) => `max(${args.join(",")})`,
  clamp: (...args) => `clamp(${args.join(",")})`,
  minmax: (...args) => `minmax(${args.join(",")})`,  //only used in grid, but native valid property+value check captures wrong use
};
for (const v of Object.values(NativeCssScopeMath))
  v.scope = NativeCssScopeMath;

const NativeCssScopeRepeat = (i, ...args) => `repeat(${i}, ${args.join(" ")})`;
NativeCssScopeRepeat.scope = NativeCssScopeMath;
const NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;

const NativeCssScopeAttrCounter = {
  counter: (...args) => `counter(${args.join(",")})`,
  counters: (...args) => `counters(${args.join(",")})`,
  attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
};

function nativeCssColorFunction(name, args) {
  if (args.length < 3 || args.length > 5)
    throw new SyntaxError(`${name} accepts 3 to 5 arguments: ${args}`);
  args = args.map(a => interpretColor(a) ?? interpretBasic(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  return `${name}(${txts.join(" ")})`;
}
//todo untested!!
function nativeCssColorSpaceFunction(space, args) {
  if (args.length < 3 || args.length > 5)
    throw new SyntaxError(`color() accepts only 3 to 5 arguments: ${args}`);
  args = args.map(a => interpretColor(a) ?? interpretBasic(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  txts.unshift(space);
  return `color(${txts.join(" ")})`;
}
function cssColorMix([space, one, two, percent]) {
  space = space == "_" ? "oklab" : interpretBasic(space).text;
  one = interpretColor(one).text;
  two = interpretColor(two).text;
  two += " " + (percent ? interpretBasic(percent).text : "50%");
  return `color-mix(in ${[space, one, two].join(", ")})`;
}

//#123 => hash(123) => #123
//#primary#30 => hash(primary,30)
//#primary#30#a80 => hash(primary,30,a80)
function hash(oneTwo) {
  const [one, two] = oneTwo.map(interpretColor);
  return `color-mix(in oklab, ${one.text}, ${two.hue ?? two.text} ${two.percent}%)`;
}

function rgb(rgb) { return rgbaImpl("rgb", rgb); }
function rgba(rgba) { return rgbaImpl("rgba", rgba); }
function rgbaImpl(name, rgba) {
  if (name.length != rgba.length)
    throw new SyntaxError(`${name}() requires exactly ${name.length} arguments.`);
  rgba = rgba.map(interpretBasic);
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
  // return { kind: "color", text, type: "color" };
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

const scope = {
  // Generic
  ...CORE,
  // Lengths
  minmax: interpretMinmax,
  span: interpretSpan,
  // Colors
  color: interpretColor,


  // SpecializedNativeCssFunctions,
  ...NativeCssScopeMath,
  repeat: NativeCssScopeRepeat,
  url: NativeCssScopeUrl,
  ...NativeCssScopeAttrCounter,
  // colorMix: nativeCssColorMixFunction,
};

const colorHex = /^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?|([0-9a-fA-F]{3})([0-9a-fA-F])$/
const colorName = new RegExp(`^#(${Object.keys(WEBCOLORS).join("|")})(\\d\\d)?$`);
const colorAlpha = /^a(\d\d)$/;
function parseColor(txt) {
  let m = txt.match(colorAlpha);
  if (m)
    return {
      type: "color",
      text: "transparent",
      hue: "transparent",
      percent: 100 - parseInt(m[1])
    };

  m = txt.match(colorHex);
  if (m) {
    let [, c6, c8 = "", c3, c4 = ""] = m;
    if (c3) {
      c6 = c3.split("").map(c => c + c).join('');
      c8 = c4 + c4;
    }
    return {
      type: "color",
      text: "#" + c6 + c8,
      hue: "#" + c6,
      hex: c6,
      percent: c8 ? (parseInt(c8, 16) / 255 * 100).toFixed(2) : 100,
    };
  }
  m = txt.match(colorName);
  if (m) {
    let [, name, percent = "100"] = m;
    percent = parseInt(percent);
    const hex = WEBCOLORS[name];
    const c8 = percent == 100 ? "" : Math.round(percent / 100 * 255).toString(16).padStart(2, '0');
    return {
      type: "color",
      text: c8 ? "#" + hex + c8 : name,
      hue: name,
      hex,
      percent
    };
  }
  let [, vector, percent] = txt.match(/^(.*)(\d\d)?$/);
  let text = `var(--color-${vector})`;
  if (percent == null)
    return {
      type: "color",
      text,
      vector,
      percent: 100
    };
  percent = parseInt(percent);
  text = `color-mix(in oklab, transparent, ${text} ${percent}%)`;
  return { type: "color", text, vector, percent };
}

export function interpretColor(a) {
  if (a.kind === "COLOR")
    return parseColor(a.text);
  //todo the color must be a color or a variable.
  const key = a.name?.slice(1);
  if (key in COLORS)
    return { type: "color", text: COLORS[a.name?.slice(1)]?.(a.args) };
}
export function interpretMinmax(a) {
  if (a.name === "minmax")
    return { type: "length", text: `minmax(${a.args.map(interpretBasic).map(t => t.text).join(", ")})` };
}
export function interpretRepeat(a) {
  if (a.name === "repeat")
    return { type: "length", text: `repeat(${a.args.map(a => interpretMinmax(a) ?? interpretBasic(a)).map(t => t.text).join(", ")})` };
}
export function interpretSpan(a) {
  if (a.name === "span")
    return { type: a.type, text: "span " + interpretBasic(a.args[0]).text };
}
export function interpretUrl(a) {
  if (a.name === "url")
    return { type: "url", text: `url(${a.args.map(interpretBasic).map(t => t.text).join(" ")})` };
}

const ColorNames = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i.source;
const ColorFunctionStart = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\(/.source;
const ColorVar = /^var\(--color-/.source;
const ColorHash = /^#[a-fA-F0-9]{3,8}$/.source;
const ColorString = new RegExp(`${ColorNames}|${ColorFunctionStart}|${ColorVar}|${ColorHash}`);

export function isColor(x) {
  return ColorString.test(x) && x;
}

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   //todo handle as css vars.
//    path: (...args) => `path(${args.join(",")})`,
//    imageSet: (...args) => `image-set(${args.join(",")})`,
// };

//no shorts before this point
const NativeCssProperties = Object.fromEntries(
  Object.getOwnPropertyNames(document.createElement('div').style).map(camel => {
    //todo Here we need to get the inner scope to work for different functions.
    //todo but we can separate on different categories such as length and % and degree etc.
    const kebab = camel.replace(/([A-Z])/g, "-$1").toLowerCase();
    const functions = [interpretBasic];
    if (CSS.supports(kebab, "#123456"))
      functions.unshift(interpretColor);
    if (CSS.supports(kebab, "repeat(2, 6px)"))
      functions.unshift(interpretRepeat);
    if (CSS.supports(kebab, "minmax(2px, 6px)"))
      functions.unshift(interpretMinmax);
    if (CSS.supports(kebab, "span 2"))
      functions.unshift(interpretSpan)
    if (CSS.supports(kebab, "url('link')"))
      functions.unshift(interpretUrl)

    // res.scope = {};
    // //todo this is wrong, because we are not fixing the 
    // if (CSS.supports(kebab, "1px"))
    //   res.scope.length = true;
    // if (CSS.supports(kebab, "1deg"))
    //   res.scope.angle = true;
    // if (CSS.supports(kebab, "1%"))
    //   res.scope.percent = true;
    // if (CSS.supports(kebab, "1s"))
    //   res.scope.time = true;
    // if (CSS.supports(kebab, "1") || CSS.supports(kebab, "0"))
    //   res.scope.number = true;
    // if (CSS.supports(name, "min(0,1)") || CSS.supports(name, "min(0px,1px)"))
    //   Object.assign(res.scope, NativeCssScopeMath);
    // if (CSS.supports(name, "url(http://example.com)"))
    //   res.scope.url = NativeCssScopeUrl;
    // if (CSS.supports(name, "#123456") || CSS.supports(name, "#123 1px 1px"))
    //   Object.assign(res.scope, NativeColorsFunctions);
    // if (CSS.supports(name, "repeat(2, 60px)"))//camel.match(/^(gridTemplateColumns|gridTemplateRows|gridTemplateAreas|gridTemplate|grid)$/))
    //   res.scope.repeat = NativeCssScopeRepeat;
    // if (CSS.supports(name, "attr(data-foo)"))
    //   res.scope.attr = NativeCssScopeAttrCounter.attr;
    // if (CSS.supports(name, "counter(my-counter)"))
    //   res.scope.counter = NativeCssScopeAttrCounter.counter;
    // if (CSS.supports(name, "counters(my-counter, '.')"))
    //   res.scope.counters = NativeCssScopeAttrCounter.counters;
    function fixBorderNames(originalCamel) {
      const m = originalCamel.match(/^border(.+)(Style|Width|Color|Radius)$/);
      return m ? "border" + m[2] + m[1] : originalCamel;
    }
    camel = fixBorderNames(camel);
    function interpretNativeValue(args) {
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
    interpretNativeValue.scope = {}; // todo remove this one
    Object.defineProperty(interpretNativeValue, 'name', { value: camel });
    return [camel, interpretNativeValue];
  }));

//subdue scopes (font,fontStyle,fontWeight,... -> font { style,weight,... })
//longest name first;
const keys = Object.keys(NativeCssProperties).sort((a, b) => b.length - a.length);
for (let k of keys)
  for (let s of keys.filter(x => x.startsWith(k) && x != k)) {
    // if (s.startsWith("border"))
    //   debugger
    NativeCssProperties[k].scope[s.slice(k.length)] = NativeCssProperties[s];
    delete NativeCssProperties[s];
  }

//UNPACKED $filter scope functions
const NativeCssFilterFunctions = {
  blur: (...args) => ({ filter: `blur(${args.join(" ")})` }),
  brightness: (...args) => ({ filter: `brightness(${args.join(" ")})` }),
  contrast: (...args) => ({ filter: `contrast(${args.join(" ")})` }),
  grayscale: (...args) => ({ filter: `grayscale(${args.join(" ")})` }),
  invert: (...args) => ({ filter: `invert(${args.join(" ")})` }),
  opacity: (...args) => ({ filter: `opacity(${args.join(" ")})` }),
  saturate: (...args) => ({ filter: `saturate(${args.join(" ")})` }),
  sepia: (...args) => ({ filter: `sepia(${args.join(" ")})` }),
  dropShadow: (...args) => ({ filter: `drop-shadow(${args.join(" ")})` }),
  hueRotate: (...args) => ({ filter: `hue-rotate(${args.join(" ")})` }),
};
for (const cb of Object.values(NativeCssFilterFunctions))
  cb.scope = { ...NativeCssScopeMath };
NativeCssFilterFunctions.filterUrl = (...args) => ({ filter: `url(${args.join(" ")})` });

//UNPACKED $transform scope functions
const NativeCssTransformFunctions = {
  matrix: (...args) => ({ transform: `matrix(${args.join(",")})` }),
  matrix3d: (...args) => ({ transform: `matrix3d(${args.join(",")})` }),
  translate: (...args) => ({ transform: `translate(${args.join(",")})` }),
  translate3d: (...args) => ({ transform: `translate3d(${args.join(",")})` }),
  scale: (...args) => ({ transform: `scale(${args.join(",")})` }),
  scale3d: (...args) => ({ transform: `scale3d(${args.join(",")})` }),
  rotate: (...args) => ({ transform: `rotate(${args.join(",")})` }),
  rotate3d: (...args) => ({ transform: `rotate3d(${args.join(",")})` }),
  skew: (...args) => ({ transform: `skew(${args.join(",")})` }),
  translateX: (...args) => ({ transform: `translateX(${args.join(",")})` }),
  translateY: (...args) => ({ transform: `translateY(${args.join(",")})` }),
  translateZ: (...args) => ({ transform: `translateZ(${args.join(",")})` }),
  scaleX: (...args) => ({ transform: `scaleX(${args.join(",")})` }),
  scaleY: (...args) => ({ transform: `scaleY(${args.join(",")})` }),
  scaleZ: (...args) => ({ transform: `scaleZ(${args.join(",")})` }),
  rotateX: (...args) => ({ transform: `rotateX(${args.join(",")})` }),
  rotateY: (...args) => ({ transform: `rotateY(${args.join(",")})` }),
  rotateZ: (...args) => ({ transform: `rotateZ(${args.join(",")})` }),
  skewX: (...args) => ({ transform: `skewX(${args.join(",")})` }),
  skewY: (...args) => ({ transform: `skewY(${args.join(",")})` }),
};
for (const cb of Object.values(NativeCssTransformFunctions))
  cb.scope = { ...NativeCssScopeMath };

const ANIMATION_FUNCTIONS = {
  linear: (...args) => `linear(${args[0]},${args.length > 2 ? args.slice(1, -1).join(" ") + "," : ""}${args[args.length - 1]})`,
  ease: (...args) => `ease(${args.join(",")})`,
  steps: (...args) => `steps(${args.join(",")})`,
  cubicBezier: (...args) => `cubic-bezier(${args.join(",")})`,
};

NativeCssProperties.animation.scope = ANIMATION_FUNCTIONS;

const UnpackedNativeCssProperties = {
  ...NativeCssProperties,
  transform: undefined,
  ...NativeCssTransformFunctions,
  filter: undefined,
  ...NativeCssFilterFunctions,
};
// margin: toLogicalFour.bind(null, "margin"),
// scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
// padding: toLogicalFour.bind(null, "padding"),
// scrollPadding: toLogicalFour.bind(null, "scroll-padding"),

//todo and radius toLogicalEight.. maybe


//$bg
function formatCssString(str) {
  const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%|deg|grad|rad|turn/.source;
  return str
    .replaceAll(new RegExp(`(${LENGTHS_PER})([a-zA-Z])`, 'g'), '$1 $2')
    .replaceAll(/([a-zA-Z])(\d)/g, '$1 $2')
    .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
    .replaceAll(new RegExp(`(${LENGTHS_PER})(-?\\d)`, 'g'), '$1 $2')
    .replaceAll(/\b(closest|farthest) (side|corner)\b/gi, '$1-$2')
    .toLowerCase();
}

function bgImpl(...args) {
  const res = {
    backgroundImage: undefined,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "repeat",
    backgroundSize: "auto auto",
    backgroundOrigin: "padding-box",
    backgroundClip: "border-box",
    backgroundBlendMode: "normal",
    backgroundAttachment: "scroll",
  };
  const colors = [], args2 = [];
  for (const a of args)
    (a && typeof a === 'object') ? Object.assign(res, a) :
      isColor(a) ? colors.push(a) :
        args2.push(formatCssString(a));
  return { res, colors, args2 };
}

//process arguments sequentially, separating geometry from color stops.
function doGradient(name, ...args) {
  const { res } = bgImpl(); // Get default background properties
  const geometry = [];
  const colorStops = [];
  let inColorStops = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg && typeof arg === 'object') {
      Object.assign(res, arg);
      continue;
    }

    if (isColor(arg)) {
      inColorStops = true;
      let colorStop = arg;

      let positionsCollected = 0;
      while (i + 1 < args.length && positionsCollected < 2) {
        const nextArg = args[i + 1];
        if (isLength(nextArg) || (name.includes('conic') && isAngle(nextArg))) {
          colorStop += ` ${nextArg}`;
          i++;
          positionsCollected++;
        } else break;
      }

      colorStops.push(colorStop);
    } else if (!inColorStops) {
      const processed = formatCssString(arg);

      if (name === 'conic' && isAngle(processed))
        geometry.push(`from ${processed}`);
      else
        geometry.push(processed);
    }
  }

  const geometryString = geometry.filter(Boolean).join(" ");
  const allParams = [geometryString, ...colorStops].filter(Boolean).join(", ");
  res.backgroundImage = `${name}-gradient(${allParams})`;
  return res;
}

const BG_SCOPE = {
  pos: (block = "0", inline = "0") => ({ backgroundPosition: `${block[0] === "-" ? `bottom ${block.slice(1)}` : block} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
  position: (block = "0", inline = "0") => ({ backgroundPosition: `${block[0] === "-" ? `bottom ${block.slice(1)}` : block} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
  size: (inline, block = "auto") => ({ backgroundSize: `${inline} ${block}` }),

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
  scroll: { backgroundAttachment: "scroll" },
  fixed: { backgroundAttachment: "fixed" },
  local: { backgroundAttachment: "local" },
};

function bg(args) {
  const res = {
    backgroundImage: undefined,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "repeat",
    backgroundSize: "auto auto",
    backgroundOrigin: "padding-box",
    backgroundClip: "border-box",
    backgroundBlendMode: "normal",
    backgroundAttachment: "scroll",
  };
  for (let a of args) {
    a =
      BG_SCOPE[a.text] ??
      BG_SCOPE[a.name]?.(a.args) ??
      interpretColor(a) ??
      interpretUrl(a);
    if (a.type == "color")
      a = { backgroundImage: `linear-gradient(${a.text})` };
    if (a.type == "url")
      a = { backgroundImage: a.text }; //todo the text should include url(...)
    if (a.text)
      debugger;      // throw new SyntaxError(`Could not interpret $bg(${args.map(a => a.text).join(",")}).`);
    Object.assign(res, a);
  }
  // if (!colors.length && !args2.length)
  //   throw new SyntaxError(`$bg(${args.join(",")}) is missing a color or url argument.`);
  // if (colors.length > 1)
  //   throw new SyntaxError(`use $bg(color1,left)$bg(color2,right) for layered backgrounds, not $bg(${colors.join(",")}).`);
  // if (args2.length > 1)
  //   throw new SyntaxError(`use $bg(url1)$bg(url2) for layered backgrounds, not $bg(${args2.join(",")}).`);
  // if (colors.length && args2.length)
  //   throw new SyntaxError(`use $bg(color)$bg(url) for layered backgrounds, not $bg(${colors.join(",")},${args2.join(",")}).`);
  return res;
}

const BackgroundFunctions = {
  linear: (...args) => doGradient("linear", ...args),
  radial: (...args) => doGradient("radial", ...args),
  conic: (...args) => doGradient("conic", ...args),
  repeatingLinear: (...args) => doGradient("repeating-linear", ...args),
  repeatingRadial: (...args) => doGradient("repeating-radial", ...args),
  repeatingConic: (...args) => doGradient("repeating-conic", ...args),
  bg,
  background: bg,
};

for (const k in BackgroundFunctions)
  BackgroundFunctions[k].scope = {
    // stops: (...args) => ({ stops: args }),
    ...NativeCssProperties.background.scope,
    ...NativeCssScopeMath, //todo do we need this, or is it covered by background above?
  };

//border: 2px 4px solid red blue;
//$border(w(2px,4px),solid,c(red,blue))
//$border(2px,solid,red)
function border(ar) {
  //todo here we want to extract the color first.
  //todo then we would like to extract the length? but maybe that is easier later..
  const borderColor = toLogicalFour.bind(null, "borderColor");
  const borderWidth = toLogicalFour.bind(null, "borderWidth");
  const borderRadius = toRadiusFour.bind(null, "borderRadius");
  const borderRadius8 = toLogicalEight.bind(null, "borderRadius", 0);
  const borderStyle = toLogicalFour.bind(null, "borderStyle");
  const Border = {
    //word => property
    solid: { borderStyle: "solid" },
    dotted: { borderStyle: "dotted" },
    dashed: { borderStyle: "dashed" },
    double: { borderStyle: "double" },
    groove: { borderStyle: "groove" },
    ridge: { borderStyle: "ridge" },
    inset: { borderStyle: "inset" },
    outset: { borderStyle: "outset" },
    hidden: { borderStyle: "hidden" },
    none: { borderStyle: "none" },
    thin: { borderWidth: "thin" },
    medium: { borderWidth: "medium" },
    thick: { borderWidth: "thick" },
    //expression => interpret function
    width: borderWidth,
    w: borderWidth,
    style: borderStyle,
    s: borderStyle,
    radius: borderRadius,
    r: borderRadius,
    r4: borderRadius,
    r8: borderRadius8,
    color: borderColor,
    c: borderColor,
  };
  ar = ar.map(a =>
    Border[a.name]?.(a.args) ??
    Border[a.text] ??
    //todo we need this to be implemented in the interpret function so that interpret returns the calculated ones.
    //todo the shorthand structure. Type => property.
    (a.type == "length" && { borderWidth: a.text }) ??
    // a.type == "color" ?? {borderColor: a.text} ??  //todo the shorthand structure. Type => property.
    interpret(a));
  return Object.assign({ borderStyle: "solid" }, ...ar);
}

//text decorations
//sequence based
//color defaults to --color_textdecorationcolor, then currentcolor
//todo work with color inheritance happening here..
function textDecoration(
  textDecorationLine = "underline",
  textDecorationStyle = "unset",
  textDecorationThickness = "unset",
  textDecorationColor = "var(--color-textdecorationcolor, currentcolor)") {
  return { textDecorationLine, textDecorationThickness, textDecorationStyle, textDecorationColor };
}
// textDecoration.scope = {
//   ...NativeCssProperties.textDecorationThickness.scope,
//   ...NativeCssProperties.textDecorationColor.scope,
// }
const textDecorations = {
  dashedOverLine: function (...args) { return textDecoration.call(this, "overline", "dashed", ...args); },
  dashedOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "dashed", ...args); },
  dashedOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "dashed", ...args); },
  dashedOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "dashed", ...args); },
  dashedLineThrough: function (...args) { return textDecoration.call(this, "line-through", "dashed", ...args); },
  dashedUnderLine: function (...args) { return textDecoration.call(this, "underline", "dashed", ...args); },
  dashedUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "dashed", ...args); },
  dottedOverLine: function (...args) { return textDecoration.call(this, "overline", "dotted", ...args); },
  dottedOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "dotted", ...args); },
  dottedOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "dotted", ...args); },
  dottedOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "dotted", ...args); },
  dottedLineThrough: function (...args) { return textDecoration.call(this, "line-through", "dotted", ...args); },
  dottedUnderLine: function (...args) { return textDecoration.call(this, "underline", "dotted", ...args); },
  dottedUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "dotted", ...args); },
  doubleOverLine: function (...args) { return textDecoration.call(this, "overline", "double", ...args); },
  doubleOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "double", ...args); },
  doubleOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "double", ...args); },
  doubleOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "double", ...args); },
  doubleLineThrough: function (...args) { return textDecoration.call(this, "line-through", "double", ...args); },
  doubleUnderLine: function (...args) { return textDecoration.call(this, "underline", "double", ...args); },
  doubleUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "double", ...args); },
  wavyOverLine: function (...args) { return textDecoration.call(this, "overline", "wavy", ...args); },
  wavyOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "wavy", ...args); },
  wavyOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "wavy", ...args); },
  wavyOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "wavy", ...args); },
  wavyLineThrough: function (...args) { return textDecoration.call(this, "line-through", "wavy", ...args); },
  wavyUnderLine: function (...args) { return textDecoration.call(this, "underline", "wavy", ...args); },
  wavyUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "wavy", ...args); },
  overLine: function (...args) { return textDecoration.call(this, "overline", "solid", ...args); },
  overLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "solid", ...args); },
  overUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "solid", ...args); },
  overUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "solid", ...args); },
  lineThrough: function (...args) { return textDecoration.call(this, "line-through", "solid", ...args); },
  underLine: function (...args) { return textDecoration.call(this, "underline", "solid", ...args); },
  underLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "solid", ...args); },
  blink: function (...args) { return textDecoration.call(this, "blink", null, ...args); },
  grammarError: function (...args) { return textDecoration.call(this, "grammar-error", null, ...args); },
  spellingError: function (...args) { return textDecoration.call(this, "spelling-error", null, ...args); },
}
for (let func of Object.values(textDecorations))
  func.scope = textDecoration.scope;

export default {
  ...UnpackedNativeCssProperties,

  border,
  em: NativeCssProperties.fontSize,
  ...BackgroundFunctions,
  textDecoration,
  ...textDecorations,
};