const FACTORS = {
  // Times
  s_ms: 1000,
  ms_s: 1 / 1000,
  // Length
  in_cm: 2.54,       // in
  in_mm: 25.4,
  in_pt: 72,
  in_pc: 6,
  in_Q: 101.6,
  cm_in: 1 / 2.54,
  mm_in: 1 / 25.4,
  pt_in: 1 / 72,
  pc_in: 1 / 6,
  Q_in: 1 / 101.6,
  cm_mm: 10,         // cm
  cm_pt: 72 / 2.54,
  cm_pc: 6 / 2.54,
  cm_Q: 40,
  mm_cm: 1 / 10,
  pt_cm: 2.54 / 72,
  pc_cm: 2.54 / 6,
  Q_cm: 1 / 40,
  mm_pt: 72 / 25.4,  // mm
  mm_pc: 6 / 25.4,
  mm_Q: 4,
  pt_mm: 25.4 / 72,
  pc_mm: 25.4 / 6,
  Q_mm: 1 / 4,
  pt_pc: 1 / 12,     // pt
  pt_Q: 101.6 / 72,
  pc_pt: 12,         // pc
  Q_pt: 72 / 101.6,
  pc_Q: 101.6 / 6,   // pc,Q
  Q_pc: 6 / 101.6,
  // Angles
  turn_deg: 360,         // turn
  turn_rad: 2 * Math.PI,
  turn_grad: 400,
  deg_turn: 1 / 360,
  rad_turn: 1 / (2 * Math.PI),
  grad_turn: 1 / 400,
  rad_deg: 180 / Math.PI, // rad
  rad_grad: 200 / Math.PI,
  grad_rad: Math.PI / 200,
  deg_rad: Math.PI / 180,
  deg_grad: 400 / 360,    // deg,grad
  grad_deg: 360 / 400,
  // Resolution (CSS)
  dppx_dpi: 96,       // dppx
  dppx_dpcm: 96 / 2.54,
  dpcm_dppx: 2.54 / 96,
  dpi_dppx: 1 / 96,
  dpcm_dpi: 2.54,     // dpcm,dpi
  dpi_dpcm: 1 / 2.54,
};

//computable: number is number or of a single type that can be factorized
//incalculable: if missing .num or units cannot be converted to first common unit
function computableNumbers(args) {
  let nums = [], firstUnit;
  for (let a of args) {
    if (a.num == null)
      return; //incomputable
    if (a.type == "number")
      nums.push(a.num);
    else if (a.unit == (firstUnit ??= a.unit))
      nums.push(a.num);
    else if (FACTORS[firstUnit + "_" + a.type])
      nums.push(a.num * FACTORS[firstUnit + "_" + a.type]);
    else
      return; //incomputable
  }
  return nums;
}

function angleToRad({ unit, num }) {
  return unit == "deg" ? num * Math.PI / 180 :
    unit == "grad" ? num * Math.PI / 200 :
      unit == "turn" ? num * 2 * Math.PI :
        num;
}

function plus(a, b) { return a + b; }
function minus(a, b) { return a - b; }
function multi(a, b) { return a * b; }
function divide(a, b) { return a / b; }

function mod(a, b) { return a - b * Math.floor(a / b); }
function rem(a, b) { return a - b * Math.trunc(a / b); }
function clamp(a, b, c) { return Math.min(Math.max(a, b), c); }

function sin(a) { return Math.sin(angleToRad(a)); }
function cos(a) { return Math.cos(angleToRad(a)); }
function tan(a) { return Math.tan(angleToRad(a)); }

function log(a, b = Math.E) { return Math.log(a) / Math.log(b); }

const pow = Math.pow;
const min = Math.min;
const max = Math.max;
const round = Math.round;
const asin = Math.asin;
const acos = Math.acos;
const atan = Math.atan;
const atan2 = Math.atan2;
const sqrt = Math.sqrt;
const hypot = Math.hypot;
const exp = Math.exp;
const abs = Math.abs;
const sign = Math.sign;

//CHECKS
//returns [inputUnit, outputUnit].
//if undefined, [arg[0].unit, arg[0].unit]
//if incompatible units, throws SyntaxError
function sameType(args) {
  args.reduce((t, a) => {
    if (t && a.type && t.type != a.type)
      throw new SyntaxError(`Incompatible type differences: ${t.text} vs ${a.text}`);
    return a.type ? a : t;
  }, null);
}
function illegalDividend(a, b) {
  if (b.type != "number") throw "Dividend must be a plain number.";
  if (b.num == 0) throw "Divide by zero.";
}
function singleArgumentOnly(args) {
  if (args.length != 1) throw "This function only takes a single argument.";
}
function singlePositiveArgumentOnly(args) {
  singleArgumentOnly(args);
  if (args[0].num <= 0) throw "Argument must be positive.";
}
function singleAngleOnly(args) {
  singleArgumentOnly(args);
  if (args[0].type != "angle") throw "Argument must be angle.";
}
function singleNumberOnly(args) {
  singleArgumentOnly(args);
  if (args[0].type != "number") throw "Argument must be number.";
}
function twoSameType(args) {
  if (args.length != 2) throw "requires two arguments.";
  sameType(args);
}
function secondArgumentIsNumber(args) {
  if (args.length != 2) throw "requires two arguments.";
  if (args[1].type != "number") throw "second argument must be a plain number.";
}
function optionalSecondNumber(args) {
  if (args.length == 1) return;
  secondArgumentIsNumber(args);
  if (args[1] <= 0) throw "second argument must be positive.";
}
function onlyOneArgWithUnit(args) {
  if (args.filter(a => a.unit).length > 1) throw "Only one argument can have a unit.";
}
function firstIsVar(args) {
  if (args[0].kind != "VAR")
    throw "?? must follow a var() expression.";
}
//POSTS
function toNumber(num, a) { return { type: "number", unit: "", num, text: num }; }
function toAngle(num, a) { return { type: "angle", unit: "rad", num, text: num }; }
function updateFirst(num, a) { return { ...a, num, text: num + a.unit }; }
//TEXTERS
function texter(name, args) { return `${name}(${args.join(", ")})`; }
function stripCalc(name, args) {
  return `${name}(${args.map(a => a.replaceAll(/^calc\((.*)\)$/g, (_, a) => a)).join(", ")})`;
}

function doMath(check, func, post, texter, name, args) {
  check(args);
  const nums = computableNumbers(args);
  return nums ?
    post(func(...nums), args[0]) :
    { type: args.find(a => a.type)?.type, text: texter(args.map(a => a.text)) };
}

var Maths = {
  "-": doMath.bind(null, sameType, minus, updateFirst, txts => `calc(${txts.join(" - ")})`),
  "+": doMath.bind(null, sameType, plus, updateFirst, txts => `calc(${txts.join(" + ")})`),
  "*": doMath.bind(null, onlyOneArgWithUnit, multi, updateFirst, txts => `calc(${txts.join(" * ")})`),
  "/": doMath.bind(null, illegalDividend, divide, updateFirst, txts => `calc(${txts.join(" / ")})`),
  "**": doMath.bind(null, secondArgumentIsNumber, pow, updateFirst, texter.bind(null, "pow")),
  "??": doMath.bind(null, firstIsVar, undefined, undefined, txts => txts[0].slice(0, -1) + "," + txts[1] + ")"),
  mod: doMath.bind(null, illegalDividend, mod, updateFirst, texter.bind(null, "mod")),
  rem: doMath.bind(null, illegalDividend, rem, updateFirst, texter.bind(null, "rem")),
  clamp: doMath.bind(null, sameType, clamp, updateFirst, texter.bind(null, "clamp")),
  min: doMath.bind(null, sameType, min, updateFirst, texter.bind(null, "min")),
  max: doMath.bind(null, sameType, max, updateFirst, texter.bind(null, "max")),
  round: doMath.bind(null, sameType, round, updateFirst, stripCalc.bind(null, "round")),
  sin: doMath.bind(null, singleAngleOnly, sin, toNumber, texter.bind(null, "sin")),
  cos: doMath.bind(null, singleAngleOnly, cos, toNumber, texter.bind(null, "cos")),
  tan: doMath.bind(null, singleAngleOnly, tan, toNumber, texter.bind(null, "tan")),
  asin: doMath.bind(null, singleNumberOnly, asin, toAngle, texter.bind(null, "asin")),
  acos: doMath.bind(null, singleNumberOnly, acos, toAngle, texter.bind(null, "acos")),
  atan: doMath.bind(null, singleNumberOnly, atan, toAngle, texter.bind(null, "atan")),
  atan2: doMath.bind(null, twoSameType, atan2, toAngle, texter.bind(null, "atan2")),
  sqrt: doMath.bind(null, singlePositiveArgumentOnly, sqrt, updateFirst, texter.bind(null, "sqrt")),
  hypot: doMath.bind(null, sameType, hypot, updateFirst, texter.bind(null, "hypot")),
  log: doMath.bind(null, optionalSecondNumber, log, updateFirst, texter.bind(null, "log")),
  exp: doMath.bind(null, singleArgumentOnly, exp, updateFirst, texter.bind(null, "exp")),
  abs: doMath.bind(null, singleArgumentOnly, abs, updateFirst, texter.bind(null, "abs")),
  sign: doMath.bind(null, singleArgumentOnly, sign, toNumber, texter.bind(null, "sign")),
};

const TYPES$1 = {
  number: "1",
  zero: "0",
  length: "1px",
  percent: "1%",
  angle: "1deg",
  time: "1s",
  resolution: "1dppx",
  frequency: "1Hz",
  color: "#123",
  fr: "1fr",  // always correlate with minmax
  repeat: "repeat(2,1fr)",
  url: "url('link')",
  counter: "counter(my-counter)",
  counters: "counters(my-counter, '.')",
  span: "span 2",
  filter: "blur()",
  transform: "translateX(0)",
  gradient: "linear-gradient(white, black)",
  //attr: "attr(data-my-attr)", //is supported for all props, for some reason, but only works in content.
};

function isSupported(k) {
  return CSS.supports(k, "unset") &&
    Object.entries(TYPES$1).map(([type, tst]) => CSS.supports(k, tst) && type).filter(Boolean);
}

function longhands(obj) {
  const keys = Object.keys(obj).sort((a, b) => b.length - a.length);
  const longs = keys.filter((k, i) => keys.findIndex(x => x.startsWith(k)) === i);
  longs.push("color", "content");//todo patches for the long hand filter
  return longs.sort();
}

async function analyzeNativeCssProps() {
  const SPEC = await (await fetch("https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data")).json();
  const supported = {};
  const unsupported = {};
  for (let k of longhands(SPEC.css.properties)) {
    const types = isSupported(k);
    types ?
      supported[k] = types : //mergeTypes(types)
      unsupported[k] = SPEC.css.properties[k];
  }
  supported.content.push("attr");
  return { supported, unsupported };
}
const NativeCss = await analyzeNativeCssProps();

//colors
const WEBCOLORS = {
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

function toLogicalFour(NAME, ar) {
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

function isBasic(arg) {
  if (arg.kind == "VAR")
    arg.text = `var(${arg.text})`;
  if (arg.kind !== "EXP")
    return arg;
  if (arg.name in Maths)
    return Maths[arg.name](arg.name, arg.args.map(isBasic));
}
function isWord(a) {
  if (a.kind === "WORD")
    return a;
}
function isColor(a) {
  if (a.kind === "COLOR")
    return parseColor(a.text);
  //todo the color must be a color or a variable.
  const key = a.name?.slice(1);
  if (key in COLORS)
    return { type: "color", text: COLORS[a.name?.slice(1)]?.(a.args) };
}
function isMinmax(a) {
  if (a.name === "minmax")
    return { type: "length", text: `minmax(${a.args.map(isBasic).map(t => t.text).join(", ")})` };
}
function isRepeat(a) {
  if (a.name === "repeat")
    return { type: "length", text: `repeat(${a.args.map(a => isMinmax(a) ?? isBasic(a)).map(t => t.text).join(", ")})` };
}
function isSpan(a) {
  if (a.name === "span")
    return { type: a.type, text: "span " + isBasic(a.args[0]).text };
}
function isUrl(a) {
  if (a.kind === "QUOTE")
    return { type: "url", text: `url(${a.text})` };
  if (a.name === "url") {
    if (a.args.length != 1) throw new SyntaxError("url() requires exactly one argument.");
    return { type: "url", text: `url(${isBasic(a.args[0]).text})` };
  }
}
function isAngle(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle")
    return a;
}
function isAnglePercent(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle" || a?.type === "percent")
    return a;
}
function isLengthPercent(a) {
  a = isBasic(a);
  if (a?.type === "length" || a?.type === "percent" || (a?.num == 0 && a?.type === "number"))
    return a;
}
function isLengthPercentNumber(a) {
  a = isBasic(a);
  if (a?.type === "length" || a?.type === "percent" || a?.type === "number")
    return a;
}
function isPercent(a) {
  a = isBasic(a);
  if (a?.type === "percent")
    return a;
}
function isZero(a) {
  a = isBasic(a);
  if (a?.text === "0")
    return a;
}
function isLength(a) {
  a = isBasic(a);
  if (a?.type === "length" || (a?.num == 0 && a?.type === "number"))
    return a;
}
function isLengthNumber(a) {
  a = isBasic(a);
  if (a?.type === "length" || a?.type === "number")
    return a;
}
function isTime(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "time", text: "0s", unit: "s", num: 0 };
  if (a?.type === "time")
    return a;
}
function isResolution(a) {
  a = isBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "resolution", text: "0x", unit: "x", num: 0 };
  if (a?.type === "resolution")
    return a;
}
function isNumber(a) {
  a = isBasic(a);
  if (a?.type === "number" && a.unit == "")
    return a;
}
function isFraction(a) {
  a = isNumber(a);
  if (a && !Number.isInteger(a.num))
    return a;
}
function isInteger(a) {
  a = isNumber(a);
  if (a && Number.isInteger(a.num))
    return a;
}
function isNumberPercent(a) {
  a = isBasic(a);
  if (a?.type === "number" && a.unit == "" || a?.type === "percent")
    return a;
}
function isQuote(a) {
  if (a.kind === "QUOTE")
    return a;
}
function isName(a) {
  if (a.kind === "WORD" && a.text[0].match(/[a-zA-Z0-9-]/))
    return a;
}

//interprets returns STRINGS
function interpretName(a) {
  if (a.kind === "WORD" && a.text[0].match(/[a-zA-Z0-9-]/))
    return a.text;
}
function interpretRadian(a) {
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
function interpretMimeType(a) {
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

function interpretImage(arg) {
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

function makeExtractor(cb) {
  return function (args) {
    if (!args?.length) return;
    const res = cb(args[0]);
    return res != null && args.shift() && res.text;
  };
}
const extractTime = makeExtractor(isTime);
const extractLength = makeExtractor(isLength);
const extractLengthPercent = makeExtractor(isLengthPercent);
const extractAngle = makeExtractor(isAngle);
const extractAnglePercent = makeExtractor(isAnglePercent);
const extractNumber = makeExtractor(isNumber);
const extractNumberPercent = makeExtractor(isNumberPercent);
const extractUrl = makeExtractor(isUrl);
const extractImage = makeExtractor(interpretImage);
const extractMimeType = makeExtractor(interpretMimeType);
const extractColor = makeExtractor(isColor);
const extractWord = makeExtractor(isWord);
function extractName(args) {
  const a = extractWord(args);
  return a ?? interpretName(a);
}

function makeEvaluator(interpret) {
  return function (a, i) {
    const a2 = interpret(a);
    if (a2)
      return a2.text;
    throw new SyntaxError(`invalid argument ${i + 1}: "${a.text}" cannot be interpreted as ${interpret.name.slice(9)}.`);
  }
}
const evaluateTime = makeEvaluator(isTime);
const evaluateLength = makeEvaluator(isLength);
const evaluateLengthPercent = makeEvaluator(isLengthPercent);
const evaluateAngle = makeEvaluator(isAngle);
const evaluateAnglePercent = makeEvaluator(isAnglePercent);
const evaluateNumber = makeEvaluator(isNumber);
const evaluateNumberPercent = makeEvaluator(isNumberPercent);
const evaluateUrl = makeEvaluator(isUrl);
const evaluateImage = makeEvaluator(interpretImage);
const evaluateMimeType = makeEvaluator(interpretMimeType);
const evaluateColor = makeEvaluator(isColor);
const evaluateName = makeEvaluator(interpretName);

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

var nativeAndMore = {
  ...UnpackedNativeCssProperties,
  em: NativeCssProperties.fontSize,
};

const matchPrimes = (primes) => {
  primes = Object.entries(primes);
  return (a, res) => {
    for (let [k, v] of primes)
      if (!(k in res))
        if ((v = v(a)) !== undefined)
          return [k, v];
  };
};

function BadArgument(name, args, I, expectedType = "") {
  args = args.map(a => a.text ?? (a.name + "/" + a.args.length));
  args[I] = ` => ${args[I]} <= `;
  expectedType &&= `\n${args[I]} is not a ${expectedType}`;
  return new SyntaxError(`Bad argument ${name}/${I + 1}:  ${name}(${args.join(",")})` + expectedType);
}

const TYPB = (wes = {}, singlePrimes = {}, primes = {}, post) => {
  singlePrimes = matchPrimes(singlePrimes);
  primes = matchPrimes(primes);
  return ({ args, name }) => {
    // if (!args?.length) throw new SyntaxError(`${name} requires at least one argument.`); //todo do we need this one? we could do this as a separate function that we wrap around the $iBlock and $border and what have you.
    const res = {};
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      let kv;
      if (a.name in wes)
        res[a.name] = wes[a.name](a);
      else if (a.text in wes)
        res[a.text] = wes[a.text];
      else if (kv = singlePrimes(a, res))
        res[kv[0]] = kv[1];
      else if (kv = primes(a, {}))
        (res[kv[0]] ??= []).push(kv[1]);
      else
        throw BadArgument(name, args, i);
    }
    return post ? post(res) : res;
  };
};

// export const UMBRELLA = (SCHEMA, POST) => {
//   const umbrella = Object.fromEntries(Object.entries(SCHEMA).map(([k]) => [k, "unset"]));
//   return ({ args, name }) => {
//     if (!args?.length) throw new SyntaxError(`${name} requires at least one argument.`);
//     const res = args.reduce((res, a, i) => {
//       for (let k in SCHEMA) {
//         if (res[k] !== "unset") continue;
//         const v = SCHEMA[k](a);
//         if (v == null) continue;
//         if (v instanceof Object)
//           return Object.assign(res, v);
//         res[k] = v;
//         return res;
//       }
//       throw BadArgument(name, args, i);
//     }, { ...umbrella });
//     return POST ? POST(res) : res;
//   };
// };

const Umbrella = (base, cb) => exp => Object.assign({}, base, cb(exp));

const SIN = (interpreter, post) => ({ args, name }) => {
  if (args.length != 1)
    throw new SyntaxError(`${name} requires 1 argument, got ${args.length} arguments.`);
  const v = interpreter(args[0]);
  return post ? post(name, v) : v;
};

const CHECKNAME = (NAME, cb) => exp => NAME === exp.name ? cb(exp) : undefined;

const SINmax = (max, interpreter, post) => ({ args, name }) => {
  if (args.length < 1 || args.length > max)
    throw new SyntaxError(`${name} requires 1 to ${max} arguments, got ${args.length} arguments.`);
  return post(name, args.map((a, i) => {
    const a2 = interpreter(a);
    if (a2 != null)
      return a2;
    throw BadArgument(name, args, i, interpreter.name);
  }));
};

const SEQ = (interpreters, post) => ({ args, name }) => {
  if (args.length != interpreters.length)
    throw new SyntaxError(`${name} requires ${interpreters.length} arguments, got ${args.length} arguments.`);
  return post(name, interpreters.map((interpreter, i) => {
    const a2 = interpreter(args[i]);
    if (a2)
      return a2;
    throw BadArgument(name, args, i, interpreter.name);
  }));
};

const CUSTOM_WORD = (NAME, WORDS, POST) => {
  const lookupTable = Object.fromEntries(WORDS.split("|").map(w => [w.replaceAll(/-([a-z])/g, c => c[1].toUpperCase()), w]));
  const cb = POST ?
    a => ((a.text in lookupTable) ? POST(lookupTable[a.text]) : undefined) :
    a => lookupTable[a.text];
  Object.defineProperty(cb, "name", { value: NAME });
  return cb;
};

const WORD_IN_TABLE = TABLE => ({ text }) => TABLE[text];

const FIRST = (INTERPRETER, INNERcb, POST) => ({ args, name }) => {
  if (!args.length)
    throw new SyntaxError(`${name} requires at least 1 argument, got 0 arguments.`)
  const first = INTERPRETER(args[0]);
  if (first == null)
    throw BadArgument(name, args, 0, INTERPRETER.name);
  const res = args.length > 1 ? INNERcb({ name, args: args.slice(1) }) : undefined;
  return POST ? POST(name, first, res) : first;
};

const CamelWords = (WORDS) => {
  const lookupTable = Object.fromEntries(WORDS.split("|").map(w => [w, w.replaceAll(/[A-Z]/g, c => "-" + c.toLowerCase())]));
  return a => lookupTable[a.text];
};

const Angle = a => isAngle(a)?.text;
const Color = a => isColor(a)?.text;
const Length = a => isLength(a)?.text;
const Name = a => isName(a)?.text;
const NumberInterpreter = a => isNumber(a)?.num;
const Fraction = a => isFraction(a)?.num;
const Integer = a => isInteger(a)?.num;
const Quote = a => isQuote(a)?.text;
const Percent = a => isPercent(a)?.text;
const Time = a => isTime(a)?.text;
const Unset = a => a.text == "_" ? "unset" : undefined;
const Url = a => isUrl(a)?.text;
const Word = a => isWord(a)?.text;
const Basic = a => isBasic(a)?.text; //todo this should be replaced with something more precise in the HO functions
const Radian = a => (a = isAngle(a)) ? interpretRadian(a) : undefined;
const Repeat = a => isRepeat(a)?.text;
const Span = a => isSpan(a)?.text;
const AbsoluteUrl = a => {
  if (a.kind === "QUOTE" && a.text.match(/^["'`](https?|data):/i))
    return new URL(a.text.slice(1, -1));
  else if (a.name === "url" && a.args.length === 1 && (a = a.args[0].text))
    if (a.match(/^["'`](https?|data):/i))
      try { return new URL(a.slice(1, -1)); } catch (e) { }
};
// export const RelativeUrl = a => {  //todo implement, this is just a draft.
//   class RelativeURL {
//     constructor(url) {
//       this.url = url;
//       this.dots = url.match(/^[.]*/)[0];
//       this.tstPath = new URL("http://n" + url);
//     }
//     interpretAgainst(url) {
//       const otherAbs = new URL(url, this.tstPath);
//       const dots = url.match(/^[.]*/)[0];
//       return dots + otherAbs.pathname + otherAbs.search + otherAbs.hash;
//     }
//   }
//   if (a.kind === "QUOTE" && a.text.match(/^["'`](.?.?)\//i))
//     return new RelativeURL(a.text.slice(1, -1));
//   else if (a.name === "url" && a.args.length === 1 && (a = a.args[0].text))
//     if (a.match(/^["'`](.?.?)\//i))
//       return new RelativeURL(a.slice(1, -1));
// }

const AnglePercent = a => Angle(a) ?? Percent(a);
const LengthUnset = a => Length(a) ?? Unset(a);
const LengthPercent = a => Length(a) ?? Percent(a);
const LengthPercentUnset = a => Length(a) ?? Percent(a) ?? Unset(a);
const LengthPercentNumber = a => Length(a) ?? Percent(a) ?? NumberInterpreter(a);
const NameUnset = a => Name(a) ?? Unset(a);
const NumberPercent = a => NumberInterpreter(a) ?? Percent(a);
const UrlUnset = a => Url(a) ?? Unset(a);
const ColorUrl = a => Color(a) ?? Url(a);
const ColorPrimitive = a => (a.kind === "COLOR" && (a = parseColor(a.text)).hex) ? a : undefined;
const RepeatBasic = a => Repeat(a) ?? Basic(a);
const SpanBasic = a => Span(a) ?? Basic(a);

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

    POSITIONS_FUNCS[name] = SEQ(Array(dims.length).fill(LengthPercent),
      (name, ar) => ({ backgroundPosition: [inline, ar[0], block, ar[1]].filter(Boolean).join(" ") }));
    AT_POSITION_FUNCS[atName] = SEQ(Array(dims.length).fill(LengthPercent),
      (name, ar) => `at ${[inline, ar[0], block, ar[1]].filter(Boolean).join(" ")}`);
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
  size: SEQ([LengthPercent, LengthPercent], (name, ar) => ({ backgroundSize: ar.join(" ") })),
  ...POSITIONS_FUNCS,
  ...GRADIENTS,
};

const bg = TYPB({ ...BACKGROUND_WORDS, ...BACKGROUND_FUNCS }, {}, { Color, Url },

  res => {
    //todo check that we only get one color
    res.Color &&= { backgroundImage: `linear-gradient(${res.Color.join(", ")})` };
    //todo check that we only get one url //todo this should be isImage
    res.Url &&= { backgroundImage: res.Url[0] };
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

var backgrounds = {
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

const BorderUmbrella = cb => exp => {
  const res = cb(exp);
  if (!res.borderStartStartRadius) res.borderRadius ??= "0";
  if (!res.borderInlineColor && !res.borderInlineStyle && !res.borderInlineWidth) {
    const res2 = {
      border: [res.borderWidth, res.borderStyle, res.borderColor].filter(Boolean).join(" ") || "none",
      ...res,
    };
    delete res2.borderColor;
    delete res2.borderStyle;
    delete res2.borderWidth;
    return res2;
  }
  if (!res.borderInlineStyle) res.borderStyle ??= "solid";
  if (!res.borderInlineWidth) res.borderWidth ??= "medium";
  if (!res.borderInlineColor) res.borderColor ??= "currentColor";
  return res;
};

//1. BlockInline order is the naming sequence of each corner, and also the two values for each corner.
//   borderStartEndRadius: 2px 4px means something like borderTopRightRadius with top radius 2px side radius 4px.
//2. When we pass values into the function, we follow the normal css logical property sequence, inline then block, start then end.
//3. Upto 4 values is easy: inline, block, inlineEnd, blockEnd.
//4. More than 4 values follows the same sequence for the first 4 values, but then values 5 to 8 will override:
//   5: inlineLeftBottom (and 1: inlineLeftTop), 
//   6: blockTopRight (and 2: blockTopLeft), 
//   7: inlineRightBottom (and 3: inlineRightTop), 
//   8: blockBottomRight (and 4: blockBottomLeft).
const radius = SINmax(8, LengthPercent, (n, ar) => {
  if (ar.length === 1)
    return { borderRadius: ar[0] };
  if (ar.length === 2) {
    const [l, t] = ar;
    return {
      borderStartStartRadius: `${t} ${l}`,
      borderStartEndRadius: `${t} ${l}`,
      borderEndEndRadius: `${t} ${l}`,
      borderEndStartRadius: `${t} ${l}`,
    };
  }
  if (ar.length <= 4) {
    const [l, t, r, b = t] = ar;
    return {
      borderStartStartRadius: l == t ? l : `${t} ${l}`,
      borderStartEndRadius: t == r ? t : `${t} ${r}`,
      borderEndStartRadius: b == l ? b : `${b} ${l}`,
      borderEndEndRadius: r == b ? r : `${b} ${r}`,
    };
  }
  const [lt, tl, rt, bl, lb, tr = tl, rb = rt, br = bl] = ar;
  return {
    borderStartStartRadius: tl == lt ? tl : `${tl} ${lt}`,
    borderStartEndRadius: tr == rt ? tr : `${tr} ${rt}`,
    borderEndStartRadius: bl == lb ? bl : `${bl} ${lb}`,
    borderEndEndRadius: br == rb ? br : `${br} ${rb}`,
  };
});

function inlineBlockFour(prop, ar) {
  if (!ar)
    return {};
  if (ar.length > 4)
    throw new SyntaxError(`More than 4 border ${prop} arguments.`);
  return ar.length == 1 ?
    { ["border" + prop]: ar[0] } :
    {
      ["borderInline" + prop]: [ar[0], ar[2]].filter(Boolean).join(" "),
      ["borderBlock" + prop]: [ar[1], ar[3]].filter(Boolean).join(" "),
    };
}

const border = TYPB({
  radius,
  r: radius,
},
  {},
  {
    Color,
    Width: a => LengthPercent(a) ?? CamelWords("thin|medium|thick")(a),
    Style: CamelWords("solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden"),
  }, obj => {
    const res = {};
    if (obj.Width) Object.assign(res, inlineBlockFour("Width", obj.Width));
    if (obj.Style) Object.assign(res, inlineBlockFour("Style", obj.Style));
    if (obj.Color) Object.assign(res, inlineBlockFour("Color", obj.Color));
    if (obj.radius ?? obj.r) Object.assign(res, obj.radius ?? obj.r);
    return res;
  }
);

var border$1 = {
  border,
  Border: BorderUmbrella(border),
  noBorder: { border: "none" },

  borderStyle: undefined,
  borderWidth: undefined,
  borderColor: undefined,
  borderRadius: undefined,

  borderTopStyle: undefined,
  borderTopWidth: undefined,
  borderTopColor: undefined,

  borderRightStyle: undefined,
  borderRightWidth: undefined,
  borderRightColor: undefined,

  borderBottomStyle: undefined,
  borderBottomWidth: undefined,
  borderBottomColor: undefined,

  borderLeftStyle: undefined,
  borderLeftWidth: undefined,
  borderLeftColor: undefined,

  borderInline: undefined,
  borderBlock: undefined,

  borderInlineStart: undefined,
  borderBlockStart: undefined,
  borderInlineEnd: undefined,
  borderBlockEnd: undefined,

  borderInlineEndColor: undefined,
  borderBlockStartColor: undefined,
  borderInlineStartColor: undefined,
  borderBlockEndColor: undefined,

  borderInlineEndWidth: undefined,
  borderBlockStartWidth: undefined,
  borderInlineStartWidth: undefined,
  borderBlockEndWidth: undefined,

  borderInlineEndStyle: undefined,
  borderBlockStartStyle: undefined,
  borderInlineStartStyle: undefined,
  borderBlockEndStyle: undefined,

  borderStartEndRadius: undefined,
  borderEndStartRadius: undefined,
  borderStartStartRadius: undefined,
  borderEndEndRadius: undefined,
  //todo block all the others properties that can set border style, width, color, and radius.
};

// //there are different ways to do the logic here..
// //length == 2, I think that we could have top/bottom too
// //length == 3, then the third becomes all the inline ones
// //length === 4, then forth is the inline on the end side
// export function toLogicalEight(NAME, DEFAULT, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   let [bss, iss, bes, ies, bse, ise, bee, iee] = ar;
//   if (ar.length === 2) ise = ies = iee = iss, bse = bes = bee = bss;
//   if (ar.length === 3) ise = ies = iee = iss, bse = bss, bee = bes;
//   if (ar.length === 4) ise = iss, iee = ies, bse = bss, bee = bes;
//   if (ar.length === 5) ise = iss, iee = ies, bee = bes;
//   if (ar.length === 6) iee = ies, bee = bes;
//   if (ar.length === 7) iee = ies;
//   const res = {};
//   if (bss || iss) res[NAME + "TopLeft"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
//   if (bse || ies) res[NAME + "TopRight"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
//   if (bes || ise) res[NAME + "BottomLeft"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
//   if (bee || iee) res[NAME + "BottomRight"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
//   return res;
// }

// export function toRadiusFour(NAME, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   return {
//     [NAME + "StartStart"]: ar[0],
//     [NAME + "EndEnd"]: ar[2] ?? ar[0],
//     [NAME + "StartEnd"]: ar[1],
//     [NAME + "EndStart"]: ar[3] ?? ar[1],
//   };
// }

const FontDefaults = {
  fontFamily: "unset",
  fontSize: "unset",
  fontStyle: "unset",
  fontWeight: "unset",
  fontSizeAdjust: "unset",
  letterSpacing: "unset",
  textTransform: "unset",
  fontWidth: "unset",
  fontStretch: "unset",
  fontVariantCaps: "unset",
  fontSynthesis: "unset",
  fontFeatureSettings: "unset",
  fontVariationSettings: "unset",
  WebkitFontSmoothing: "unset",
  MozOsxFontSmoothing: "unset",
  fontKerning: "unset",
  hyphens: "unset",
};

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * Most of the text properties are either layout (text-align, line-height, word-spacing, hyphenation).
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 * ??candidate for font is hyphenation. Where we break the words, that could be more a font characteristic than a layout characteristic??
 */
const SYNTHESIS_WORDS = (function () {
  function* permutations(arr, remainder) {
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i];
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      if (remainder == 1)
        yield [x];
      else
        for (let p of permutations(rest, remainder - 1))
          yield [x, ...p];
    }
  }
  const res = {};
  const synths = ["Style", "Weight", "SmallCaps", "Position"];
  for (let k = 1; k <= synths.length - 1; k++)
    for (const combo of permutations(synths, k))
      res["no" + combo.join("") + "Synthesis"] = synths.filter(k => !combo.includes(k)).join(" ").replace("Caps", "-caps").toLowerCase();
  res.noSynthesis = { fontSynthesis: "none" };
  return res;
})();

const FONT_WORDS = {
  ...SYNTHESIS_WORDS,
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  fullWidth: { textTransform: "full-width" },
  noTransform: { textTransform: "none" },

  bold: { fontWeight: "bold" },
  b: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  noWeight: { fontWeight: "normal" },

  italic: { fontStyle: "italic" },
  ital: { fontStyle: "italic" },
  i: { fontStyle: "italic" },
  noStyle: { fontStyle: "normal" },

  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  noVariant: { fontVariantCaps: "normal" },

  condensed: { fontWidth: "condensed" },
  expanded: { fontWidth: "expanded" },
  semiCondensed: { fontWidth: "semi-condensed" },
  semiExpanded: { fontWidth: "semi-expanded" },
  extraCondensed: { fontWidth: "extra-condensed" },
  extraExpanded: { fontWidth: "extra-expanded" },
  ultraCondensed: { fontWidth: "ultra-condensed" },
  ultraExpanded: { fontWidth: "ultra-expanded" },
  noStretch: { fontWidth: "normal" },

  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },

  hyphens: { hyphens: "auto" },
  shy: { hyphens: "manual" },
  noHyphens: { hyphens: "none" },

  normal: { fontStyle: "normal", fontWeight: "normal" },
  smooth: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" }, //todo this is wrong? should be "antialiased" for WebkitFontSmoothing and "grayscale" for MozOsxFontSmoothing??

  larger: { fontSize: "larger" },
  smaller: { fontSize: "smaller" },
  xxs: { fontSize: "xx-small" },
  xs: { fontSize: "x-small" },
  sm: { fontSize: "small" },
  md: { fontSize: "medium" },
  lg: { fontSize: "large" },
  xl: { fontSize: "x-large" },
  xxl: { fontSize: "xx-large" },
  xxxl: { fontSize: "xxx-large" },

  variant: SINmax(5, Word, (n, v) => ({ fontVariant: v })), //todo: more specific parsing?
  width: SIN(Percent, (n, v) => ({ fontWidth: v })),
  spacing: SIN(Length, (n, v) => ({ letterSpacing: v })), //"_" => "normal". This should be LengthNormal? where we do "_" as "normal"?
  adjust: SIN(Basic, (n, v) => ({ fontSizeAdjust: v })),
};


// @font-face {
// font-family: "Trickster";
// src:
//   local("Trickster"),
//   url("trickster-COLRv1.otf") format("opentype") tech(color-COLRv1),
//   url("trickster-outline.otf") format("opentype"),
//   url("trickster-outline.woff") format("woff");
// }
// becomes 
// "./trickster-COLRv1.otf#family=Trickster&format=opentype&tech=color-COLRv1&src=trickster-outline.otf&format=opentype&src=trickster-outline.woff&format=woff"
function FontFaceUrl(t) {
  const font = AbsoluteUrl(t);
  if (!font)
    return;
  const sp = new URLSearchParams(font.hash.slice(1));
  const url = new URL("", font);
  const res = {
    fontFamily: font.pathname.split("/").at(-1).split(/[.-]/)[0],
    src: [`url("${url}")`],
  };
  const SHORTCUTS = {
    family: "fontFamily",
    style: "fontStyle",
    weight: "fontWeight",
    stretch: "fontStretch",
    variant: "fontVariant",
    featureSettings: "fontFeatureSettings",
    variationSettings: "fontVariationSettings",
  };
  for (let [k, v] of sp.entries()) {
    k = SHORTCUTS[k] ?? k;
    v = v.replaceAll("+", " ");
    if (k === "src")
      res.src.push(`url("${new URL(v, url)}")`);
    else if (k === "format" || k === "tech")
      res.src.at(-1)[k] += ` ${k}(${v})`;
    else
      res[k] = v;
  }
  res.src = `/*${font}*/\nlocal("${res.fontFamily}"),\n` + res.src.join(",\n");
  return res;
}

const font = TYPB(FONT_WORDS, {
  fontSize: Length,
  fontSizeAdjust: Fraction,
  fontWeight: Integer,
  Angle,
}, {
  fontFamily: t => FontFaceUrl(t) ?? Word(t) ?? Quote(t)
}, obj => {
  const res = {};
  for (let [k, v] of Object.entries(obj)) {
    if (k === "fontFamily") {
      if (v.includes("emoji")) {
        v.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
        v = v.filter(f => f !== "emoji");
      }
      res.fontFamily = v
        .map(f => f.fontFamily ?? f)
        .map(f => f.replaceAll("+", " "))
        .join(", ");
      for (let face of v.filter(f => f instanceof Object))
        res["@font-face " + face.src.split("\n")[0]] = face;
    } else if (k === "Angle") res.fontStyle = "oblique " + v;
    else if (v instanceof Object) Object.assign(res, v);
    else res[k] = v;
  }
  return res;
});

const Font = FIRST(NameUnset, font,
  (_, typeName, fontProps = {}) => {
    const res = { ...FontDefaults, ...fontProps };
    if (typeName !== "unset")
      for (let k in res)
        if (res[k] === FontDefaults[k])
          res[k] = `var(--${typeName + k[0].toUpperCase() + k.slice(1)}, unset)`;
    return res;
  }
);

const Typeface = FIRST(Name, font,
  (_, typeName, tmp = {}) => {
    const res = {};
    for (let k in FontDefaults)
      if (tmp[k] !== undefined)
        res[`--${typeName + k[0].toUpperCase() + k.slice(1)}`] = tmp[k];
    for (let k in tmp)
      if (k.startsWith("@"))
        res[k] = tmp[k];
    return res;
  }
);

var fonts = {
  font,
  Font: Umbrella(FontDefaults, Font),
  Typeface,

  fontFamily: undefined,
  fontSize: undefined,
  fontStyle: undefined,
  fontWeight: undefined,
  fontSizeAdjust: undefined,
  letterSpacing: undefined,
  textTransform: undefined,
  fontWidth: undefined,
  fontStretch: undefined,
  fontVariantCaps: undefined,
  fontSynthesis: undefined,
  fontFeatureSettings: undefined,
  fontVariationSettings: undefined,
  WebkitFontSmoothing: undefined,
  MozOsxFontSmoothing: undefined,
  fontKerning: undefined,
  hyphens: undefined,
};

function toSize(NAME, { args }) {
  if (args.length != 1 && args.length != 3)
    throw new SyntaxError(`$${NAME}() accepts only 1 or 3 arguments, got ${args.length}.`);
  args = args.map(a =>
    a.text == "_" ? "unset" :
      isBasic(a).text
  );
  if (args.length === 1)
    return { [NAME]: args[0] };
  const NAME2 = NAME[0].toUpperCase() + NAME.slice(1);
  return {
    ["min" + NAME2]: args[0],
    [NAME]: args[1],
    ["max" + NAME2]: args[2]
  };
}

function size({ args }) {
  if (args.length == 1)
    return toSize("inlineSize", { args });
  if (args.length == 2)
    return {
      ...toSize("inlineSize", { args: [args[0]] }),
      ...toSize("blockSize", { args: [args[1]] })
    };
  if (args.length == 6)
    return {
      ...toSize("inlineSize", { args: args.slice(0, 3) }),
      ...toSize("blockSize", { args: args.slice(3) })
    };
  throw new SyntaxError(`$size() accepts only 1, 2 or 4 arguments, got ${args.length}.`);
}

const ALIGNMENTS = (_ => {
  const POSITIONS = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const SPACE = "|Around|Between|Evenly";
  const BASELINE = "|Baseline|First|Last";
  const LEFTRIGHT = "|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight";
  const SELFSTARTEND = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";
  const LEGACY = "|Legacy|LegacyLeft|LegacyRight|LegacyCenter";

  const AlignContent = "Normal|Stretch" + POSITIONS + SPACE + BASELINE;
  const JustifyContent = "Normal|Stretch" + POSITIONS + SPACE + LEFTRIGHT;
  const AlignItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifyItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT + LEGACY;
  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifySelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT;

  function lowSpaceKebab(str) {
    return str
      .replace(/Around|Between|Evenly/g, "space-$&")
      .replace(/(Unsafe|Safe|Legacy)(?!$)/g, "$& ")
      .replace(/(Self|Flex|Anchor)(?!$)/g, "$&-")
      .replace(/First|Last/g, "$& baseline")
      .toLowerCase();
  }

  function makePlaceAligns(prop, name, one, two) {

    const res = {};
    for (let a of one.split("|")) {
      res[name + a] = { [prop]: lowSpaceKebab(a) };
      if (two)
        for (let b of two.split("|"))
          if (a != b)
            res[name + a + b] = { [prop]: lowSpaceKebab(a) + " " + lowSpaceKebab(b) };
    }
    return res;
  }

  return {
    placeContent: makePlaceAligns("placeContent", "content", AlignContent, JustifyContent),
    placeItems: makePlaceAligns("placeItems", "items", AlignItems, JustifyItems),
    placeSelf: makePlaceAligns("placeSelf", "self", AlignSelf, JustifySelf),
    alignItems: makePlaceAligns("alignItems", "items", AlignItems),
    alignSelf: makePlaceAligns("alignSelf", "self", AlignSelf),
  }
})();

//todo overflows
const OVERFLOWS = (_ => {
  const SETTINGS = {
    Visible: { overflow: "visible" },
    Hidden: { overflow: "hidden" },
    Clip: { overflow: "clip" },
    Auto: { overflow: "auto" },
    Scroll: { overflow: "scroll" },
    Snap: { overflow: "auto", scrollSnapType: "both" },
    SnapMandatory: { overflow: "auto", scrollSnapType: "both mandatory" },
    ScrollSnap: { overflow: "scroll", scrollSnapType: "both" },
    ScrollSnapMandatory: { overflow: "scroll", scrollSnapType: "both mandatory" },
  };
  const res = {};
  for (let [A, a] of Object.entries(SETTINGS)) {
    res["overflow" + A] = a;
    for (let [B, b] of Object.entries(SETTINGS)) {
      if (A == B) continue;
      res["overflow" + A + B] = {
        overflowBlock: a.overflow,
        overflowInline: b.overflow,
      };
      if (a.scrollSnapType && b.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = "both" + (A.endsWith("Mandatory") || B.endsWith("Mandatory") ? " mandatory" : "");
      else if (a.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = a.scrollSnapType.replace("both", "block");
      else if (B.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = a.scrollSnapType.replace("both", "inline");
    }
  }
  return res;
})();

const CONTAINER = {
  padding: ({ args }) => toLogicalFour("padding", args),
  scrollPadding: ({ args }) => toLogicalFour("scroll-padding", args),
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
  ...OVERFLOWS,
};

const ITEM = {
  margin: ({ args }) => toLogicalFour("margin", args),
  scrollMargin: ({ args }) => toLogicalFour("scroll-margin", args),
  inlineSize: toSize.bind(null, "inlineSize"), //todo should we block this? is size(10px) enough?
  blockSize: toSize.bind(null, "blockSize"),   //todo should we block this? is size(_,10px) enough?
  size,
  // w: AllFunctions.width,
  // h: AllFunctions.height,
  // width: AllFunctions.width,
  // height: AllFunctions.height,
  snapStart: { scrollSnapAlign: "start" },
  snapStartCenter: { scrollSnapAlign: "start center" },
  snapStartEnd: { scrollSnapAlign: "start end" },
  snapCenter: { scrollSnapAlign: "center" },
  snapCenterStart: { scrollSnapAlign: "center start" },
  snapCenterEnd: { scrollSnapAlign: "center end" },
  snapEnd: { scrollSnapAlign: "end" },
  snapEndStart: { scrollSnapAlign: "end start" },
  snapEndCenter: { scrollSnapAlign: "end center" },
  noSnap: { scrollSnapAlign: "none" },
  // verticalAlign: AllFunctions.verticalAlign, //todo is this allowed for grid and flex?
};

const gap = SINmax(2, LengthPercentUnset, (n, ar) => {
  if (ar[0] == ar[1] || ar.length == 1) return { gap: ar[0] };
  if (ar[1] == "unset") return { rowGap: ar[0] };
  if (ar[0] == "unset") return { columnGap: ar[1] };
  return { gap: ar.join(" ") };
});

const DEFAULTS = {
  Block: {
    display: "block",
    //todo this is NOT as easy as I thought..
    //">* /*blockItem*/": BlockItemDefaults,    //the BlockItem defaults are always set by the Block.
  },
  BlockItem: {
    inlineSize: "unset",
    blockSize: "unset",
    marginBlock: "unset",
    marginInline: "unset",
    scrollMargin: "unset",
    scrollSnapAlign: "unset",
  },
  LineClamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3, //this is always overwritten
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden",
  },
  Flex: {
    display: "flex",
    alignItems: "unset",
    placeContent: "unset",
  },
  Grid: {
    display: "grid",
    placeItems: "unset",
    placeContent: "unset",
  },
  IBlock: {
    display: "inline-block",
  },
};

const IBLOCK = {
  ...CONTAINER,
};

const _IBlockItem = {
  ...ITEM,
  alignTop: { verticalAlign: "top" },
  alignMiddle: { verticalAlign: "middle" },
  alignBottom: { verticalAlign: "bottom" },
  alignBaseline: { verticalAlign: "baseline" },
  alignTextTop: { verticalAlign: "text-top" },
  alignTextBottom: { verticalAlign: "text-bottom" },
  alignSuper: { verticalAlign: "super" },
  alignSub: { verticalAlign: "sub" },
};

const GRID = {
  ...CONTAINER,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
  cols: SINmax(999, RepeatBasic, (n, ar) => ({ gridTemplateColumns: ar.join(" ") })), //todo what is the bertScore distance from cols to columns?
  columns: SINmax(999, RepeatBasic, (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  rows: SINmax(999, RepeatBasic, (n, ar) => ({ gridTemplateRows: ar.join(" ") })),
  areas: SINmax(999, RepeatBasic, (n, ar) => ({ gridTemplateAreas: ar.join(" ") })),
  gap,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

const _GridItem = {
  ...ALIGNMENTS.placeSelf,
  ...ITEM,
  column: SINmax(2, SpanBasic, (n, ar) => ({ gridColumn: ar.join(" / ") })), //todo test how `_` works as first or second argument.
  row: SINmax(2, SpanBasic, (n, ar) => ({ gridRow: ar.join(" / ") })),       //todo test how `_` works as first or second argument.
};

const FLEX = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...CONTAINER,
  gap,
};

const _FlexItem = {
  ...ITEM,
  ...ALIGNMENTS.alignSelf,
  basis: SIN(Basic, (n, v) => ({ flexBasis: v })),
  grow: SIN(Basic, (n, v) => ({ flexGrow: v })),
  shrink: SIN(Basic, (n, v) => ({ flexShrink: v })),
  order: SIN(Basic, (n, v) => ({ [n]: v })),
  //todo safe
};

const BlockItem = {
  ...ITEM,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
};

const block = TYPB(CONTAINER, {}, {}, res => Object.assign({}, ...Object.values(res)));
const blockItem = TYPB(BlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const lineClamp = FIRST(NumberInterpreter, block, (n, a, b) => ({ ...DEFAULTS.LineClamp, WebkitLineClamp: a, ...b }));
const grid = TYPB(GRID, {}, {}, res => Object.assign({}, ...Object.values(res)));
const gridItem = TYPB(_GridItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flex = TYPB(FLEX, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flexItem = TYPB(_FlexItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlock = TYPB(IBLOCK, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlockItem = TYPB(_IBlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));

var layouts = {
  block,
  blockItem,
  lineClamp,
  flex,
  flexItem,
  grid,
  gridItem,
  iBlock,
  iBlockItem,

  Block: Umbrella(DEFAULTS.Block, block),
  BlockItem: Umbrella(DEFAULTS.BlockItem, blockItem),
  LineClamp: Umbrella(DEFAULTS.Block, lineClamp),
  IBlock: Umbrella(DEFAULTS.IBlock, iBlock),
  IBlockItem: Umbrella(DEFAULTS.BlockItem, iBlockItem),
  Grid: Umbrella(DEFAULTS.Grid, grid),
  GridItem: Umbrella(DEFAULTS.BlockItem, gridItem),
  Flex: Umbrella(DEFAULTS.Flex, flex),
  FlexItem: Umbrella(DEFAULTS.BlockItem, flexItem),

  lineHeight: SIN(LengthPercentNumber, (n, v) => ({ lineHeight: v })),
  wordSpacing: SIN(Length, (n, v) => ({ wordSpacing: v })),

  hide: _ => ({ display: "none" }),

  order: undefined,
  float: undefined,
  gap: undefined,
  margin: undefined,
  padding: undefined,
  width: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  height: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  inlineSize: undefined,
  minInlineSize: undefined,
  maxInlineSize: undefined,
  blockSize: undefined,
  minBlockSize: undefined,
  maxBlockSize: undefined,
  overflow: undefined,
  overflowX: undefined,
  overflowY: undefined,
  overflowBlock: undefined,
  overflowInline: undefined,
  scrollSnapType: undefined,
  scrollSnapAlign: undefined,
  scrollSnapStop: undefined,
  scrollPadding: undefined,
  scrollMargin: undefined,

  placeContent: undefined,
  justifyContent: undefined,
  alignContent: undefined,
  placeItems: undefined,
  justifyItems: undefined,
  alignItems: undefined,
  placeSelf: undefined,
  justifySelf: undefined,
  alignSelf: undefined,
};

//from hex => lch
function hex8ToHex6A({ hex8 }) {
  return {
    hex6: hex8.slice(0, 6),
    alpha: parseInt(hex8.slice(6, 8), 16) / 255,
  };
}
function hex6ToRgb({ hex6 }) {
  return {
    r: parseInt(hex6.slice(0, 2), 16),
    g: parseInt(hex6.slice(2, 4), 16),
    b: parseInt(hex6.slice(4, 6), 16),
  };
}
function rgbToRGB({ r, g, b }) {
  const linearize = c => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return { R: linearize(r), G: linearize(g), B: linearize(b) };
}
function RGBToXyz({ R, G, B }) {
  const x = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
  const y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
  const z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B;
  return { x, y, z };
}
function xyzToLab({ x, y, z }) {
  const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  const lCube = Math.cbrt(l);
  const mCube = Math.cbrt(m);
  const sCube = Math.cbrt(s);

  const L = 0.2104542553 * lCube + 0.7936177850 * mCube - 0.0040720468 * sCube;
  const a = 1.9779984951 * lCube - 2.4285922050 * mCube + 0.4505937099 * sCube;
  const b = 0.0259040371 * lCube + 0.7827717662 * mCube - 0.8086757660 * sCube;

  return { L, a, b };
}
function labToLch({ L, a, b }) {
  const C = Math.sqrt(a * a + b * b);
  let H = Math.atan2(b, a) * (180 / Math.PI);
  if (H < 0) H += 360;
  return { L, C, H };
}

//from lch => hex
function lchToLab({ L, C, H }) {
  const hRad = H * (Math.PI / 180);
  const a = Math.cos(hRad) * C;
  const b = Math.sin(hRad) * C;
  return { L, a, b };
}
function labToXyz({ L, a, b }) {
  const lCube = Math.cbrt((L + 0.3963377774 * a + 0.2158037573 * b) ** 3);
  const mCube = Math.cbrt((L - 0.1055613458 * a - 0.0638541728 * b) ** 3);
  const sCube = Math.cbrt((L - 0.0894841775 * a - 1.2914855480 * b) ** 3);

  const x = +1.2270138511 * lCube - 0.5577999807 * mCube + 0.2812561490 * sCube;
  const y = -0.0405801784 * lCube + 1.1122568696 * mCube - 0.0716766787 * sCube;
  const z = -0.0763812845 * lCube - 0.4214819784 * mCube + 1.5861632204 * sCube;

  return { x, y, z };
}
function xyzToRGB({ x, y, z }) {
  const R = +3.2404541621 * x - 1.5371385120 * y - 0.4985314096 * z;
  const G = -0.9692660304 * x + 1.8760108452 * y + 0.0415560175 * z;
  const B = +0.0556434309 * x - 0.2040259134 * y + 1.0572251880 * z;
  return { R, G, B };
}
function RGBToRgb({ R, G, B }) {
  const delinearize = c => c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return {
    r: Math.min(255, Math.max(0, delinearize(R) * 255)),
    g: Math.min(255, Math.max(0, delinearize(G) * 255)),
    b: Math.min(255, Math.max(0, delinearize(B) * 255)),
  };
}
function rgbToHex6({ r, g, b }) {
  return { hex6: [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("") };
}
function hex6AToHex8({ hex6, alpha }) {
  return { hex8: hex6 + Math.round(alpha * 255).toString(16).padStart(2, "0") };
}

//main functions
function makeColor(transforms, all) {
  return transforms.reduce((acc, fn) => ({ ...acc, ...fn(acc) }), all);
}
function fromHex8(hex8) {
  return makeColor([hex8ToHex6A, hex6ToRgb, rgbToRGB, RGBToXyz, xyzToLab, labToLch], { hex8 });
}
function fromHex6(hex6, alpha = 1) {
  return makeColor([hex6ToRgb, rgbToRGB, RGBToXyz, xyzToLab, labToLch, hex6AToHex8], { hex6, alpha });
}
function fromRgb(r, g, b, alpha = 1) {
  return makeColor([rgbToRGB, RGBToXyz, xyzToLab, labToLch, rgbToHex6, hex6AToHex8], { r, g, b, alpha });
}
function fromLinearRgb(R, G, B, alpha = 1) {
  return makeColor([RGBToXyz, xyzToLab, labToLch, RGBToRgb, rgbToHex6, hex6AToHex8], { R, G, B, alpha });
}
function fromXyz(x, y, z, alpha = 1) {
  return makeColor([xyzToLab, labToLch, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8], { x, y, z, alpha });
}
function fromLab(L, a, b, alpha = 1) {
  return makeColor([labToLch, labToXyz, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8], { L, a, b, alpha });
}
function fromLCH(L, C, H, alpha = 1) {
  return makeColor([lchToLab, labToXyz, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8], { L, C, H, alpha });
}

function makeColors(name, color) {
  const round = (num, places = 3) => Math.round(num * 10 ** places) / (10 ** places);
  let { L, C, H } = fromHex6(color.hex);
  if (C == 0)
    return { [name]: color.text };
  L = round(L);
  H = Math.round(H);
  const pop = fromLCH(L, round((.5 - C) * .5 + C), H);
  const accent = fromLCH(L, round((.5 - C) * .7 + C), H);
  const bland = fromLCH(L, round(C * .5), H);
  const neutral = fromLCH(L, 0, H);
  return {
    [name]: color.text,
    [name + "Pop"]: "#" + pop.hex6,
    [name + "Accent"]: "#" + accent.hex6,
    [name + "Bland"]: "#" + bland.hex6,
    [name + "Neutral"]: "#" + neutral.hex6,
  };
}

const Palette = SEQ([Name, ColorPrimitive, ColorPrimitive], (n, [name, main, on]) => ({
  ...makeColors(`--color-${name}`, main),
  ...makeColors(`--color-on${name[0].toUpperCase() + name.slice(1)}`, on)
}));

var palette = {
  Palette,

};

//ease is defined in native css as accelerating and decelerating.
//crisp means that it starts or ends quickly, but not both.
//harsh means that it starts or ends very quickly, but not both.
//playful means that it overshoots either coming in, going out, or both.
//bounce means that it overshoots more than playful, either coming in, going out, or both.
//hesitate means that it goes forward, then pauses, then forward again. 
//wiggle means that it goes forward, then backtracks a little, then forward again.
//wobble means that it goes forward, then backtracks a fully, then forward again, then backtracks a little, then forward again.

function cubicBezier([x1, y1, x2, y2], sampleSize = 240, precision = 5) {
  if (![x1, y1, x2, y2].every(Number.isFinite))
    throw new TypeError("Control points must be finite numbers.");
  if (precision < 3)
    throw new RangeError("precision must be ≥ 2 (recommend ≥ 3).");

  const xInc = 1 / (sampleSize - 1);
  const tInc = xInc / precision;
  const res = new Array(sampleSize);
  res[0] = 0;
  res[sampleSize - 1] = 1; //x=1, y=1
  for (let xStep = xInc, prevX = 0, prevY = 0, t = tInc, n = 1; xStep < 1; t += tInc) {
    const u = 1 - t;
    const tt = t * t;
    const ttt = tt * t;
    const uut3 = 3 * u * u * t, utt3 = 3 * u * tt;
    const x = uut3 * x1 + utt3 * x2 + ttt;
    const y = uut3 * y1 + utt3 * y2 + ttt;
    if (x >= xStep) {
      const ratio = (xStep - prevX) / (x - prevX);
      res[n++] = prevY + (y - prevY) * ratio;
      xStep += xInc;
    }
    prevX = x, prevY = y;
  }
  if (res[sampleSize - 2] == undefined) {
    debugger
    return cubicBezier([x1, y1, x2, y2], sampleSize, precision * 2);
  }
  return res;
}

function computeDecay(count, height, hDecay) {
  const timeDecay = Math.sqrt(hDecay);
  let time = 1 / ((1 - Math.pow(timeDecay, count)) / (1 - timeDecay));
  const res = [];
  for (let i = 0; i < count; i++, height *= hDecay, time *= timeDecay)
    res.push({ height, time });
  return res;
}

function bounce(count, firstHeight, decay = 0.7, width = 120) {
  if (count % .5 != 0)
    throw new RangeError("count must be whole or half numbers.");
  const overshoot = count % 1;
  const steps = computeDecay(Math.ceil(count), firstHeight, decay);
  const overshootScale = 1 + (steps[0].time / 2);

  const pointSet = steps.flatMap(({ time, height }) => {
    const halfSize = Math.round(time * .5 * width * overshootScale);
    const half = cubicBezier([0, 0, .58, 1], halfSize).map(y => y * height);
    return [half, half.slice().reverse().slice(1)];
  });
  overshoot && pointSet.shift();
  return pointSet.flat();
}

function sineWave(count, height, width = 120) {
  const res = Array(width);
  res[0] = res[width - 1] = 0;
  for (let x = 1; x < (width - 1); x++) {
    const t = x / (width - 1);
    res[x] = -Math.sin(t * Math.PI * 2 * count) * height;// * ease(t);
  }
  return res;
}

function sineWaveEase(count, height, width = 120) {
  return sineWave(count, height, width).map((y, i) => y * Math.cos((Math.PI / 2) * (i / width)));
}

function line(width) {
  return Array.from({ length: width }, (_, i) => i / (width - 1));
}

function cssLinear(ys) {
  return `linear(${ys.map(n => (Math.round(n * 1000) / 1000).toString().replace("0.", ".")).join(",")})`;
}
function join(...numSets) {
  return numSets.map((s, i) => !i ? s : s.slice(1)).flat();
}
function inverse(ar) {
  return ar.map(y => 1 - y).reverse();
}

const BEZIER = {
  slowIn: [.3, 0, 1, 1],   // gentle "ease-in"
  easeIn: [.42, 0, 1, 1],
  quickIn: [.55, 0, 1, 1], // stronger "ease-in"
};
for (let [k, v] of Object.entries(BEZIER))
  BEZIER[k.replace("In", "Out")] = v.map(n => 1 - n);


const _easeBack = join(cubicBezier(BEZIER.easeIn, 28), sineWaveEase(1, .075, 10).map(y => 1 - y));
const backInEaseOut = cssLinear(inverse(_easeBack));
const easeInBackOut = cssLinear(_easeBack);
const backInOut = cssLinear(join(
  sineWaveEase(1, .14, 20).reverse(),
  line(20),
  sineWaveEase(1, .14, 20).map(y => 1 - y)
));

const _easeInBounceOut = join(cubicBezier(BEZIER.easeIn, 70), bounce(3, .18, 0.33, 40).map(y => 1 - y));
const easeInBounceOut = cssLinear(_easeInBounceOut);
const bounceInEaseOut = cssLinear(inverse(_easeInBounceOut));
const _bounceInOut = join(
  bounce(3.5, .5, 0.6, 60).reverse(),
  bounce(3.5, .5, 0.6, 60).map(y => 1 - y)
);
const bounceInOut = cssLinear(_bounceInOut);
const _easeInSpringOut = join(
  cubicBezier(BEZIER.easeIn, 70),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
);
const easeInSpringOut = cssLinear(_easeInSpringOut);
const springInEaseOut = cssLinear(inverse(_easeInSpringOut));
const springInOut = cssLinear(join(
  sineWaveEase(2, .1, 40).reverse(),
  line(40),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
));
const wobble = cssLinear(join(
  sineWave(2, .1, 60).reverse().map((y, i) => y + i / 120),
  sineWave(2, .1, 60).map((y, i) => 1 - y - (60 - i) / 120)
));

var CURVES = /*#__PURE__*/Object.freeze({
  __proto__: null,
  backInEaseOut: backInEaseOut,
  backInOut: backInOut,
  bounceInEaseOut: bounceInEaseOut,
  bounceInOut: bounceInOut,
  easeInBackOut: easeInBackOut,
  easeInBounceOut: easeInBounceOut,
  easeInSpringOut: easeInSpringOut,
  springInEaseOut: springInEaseOut,
  springInOut: springInOut,
  wobble: wobble
});

function cubicBezierFunction(ar) {
  if (ar.length != 4) throw new SyntaxError(`cubic-bezier timing function requires 4 numbers, got ${ar.length}`);
  return `cubic-bezier(${ar.join(",")})`;
}

const transition = TYPB({
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  linear: "linear",
  ...CURVES,
  steps: SIN(NumberInterpreter, (n, v) => `steps(${v})`),
  stepsEnd: SIN(NumberInterpreter, (n, v) => `steps(${v})`),
  stepsStart: SIN(NumberInterpreter, (n, v) => `steps(${v}, start)`),
  stepsBoth: SIN(NumberInterpreter, (n, v) => `steps(${v}, jump-both)`),
  stepsNone: SIN(NumberInterpreter, (n, v) => `steps(${v}, jump-none)`),
  allowDiscrete: "allow-discrete",
}, {
  duration: Time,
  delay: Time,
}, {
  cubicBezier: NumberInterpreter,
  properties: Name,
},
  ({ properties, duration, delay, allowDiscrete, ...timers }) => {
    if (Object.keys(timers).length > 1) throw new SyntaxError(`more than one transition timing function: ${Object.keys(timers).join(" AND ")}`);
    timers.cubicBezier &&= cubicBezierFunction(timers.cubicBezier);
    let [timerName, timerValue] = Object.entries(timers)[0] ?? [];
    const res = {};
    if (timerName in CURVES) {
      res[`:root /*--transition-${timerName}*/`] = { [`--transition-${timerName}`]: timerValue };
      timerValue = `var(--transition-${timerName})`;
    }
    const tail = [timerValue, duration, delay, allowDiscrete].filter(Boolean).join(" ");
    res.transition = !properties ? tail : properties.map(p => `${p} ${tail}`).join(", ");
    return res;
  });

var transitions = {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  transitionSkipInk: undefined,
  transition,
};

const textDecoration = TYPB({
  noSkipInk: "none",
  over: "overline",
  under: "underline",
  through: "line-through",
}, {
  Color,
  Length,
  style: a => a.text?.match(/^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/)?.[0],
}, {
}, ({ style, over, under, through, Color, Length, noSkipInk }) => ({
  textDecoration: [style, over, under, through, Color, Length].filter(Boolean).join(" ") || "solid",
  textDecorationSkipInk: noSkipInk ?? "auto",
}));

var textDecorations = {
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
  textDecoration,
  noTextDecoration: { textDecoration: "none", textDecorationSkipInk: "auto" },
  textDecorationNone: { textDecoration: "none", textDecorationSkipInk: "auto" },
};

const FILTER_FUNCS = {
  blur: SIN(Length, (n, v) => `${n}(${v})`),
  brightness: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  contrast: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  grayscale: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  invert: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  opacity: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  saturate: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  sepia: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  hueRotate: SIN(Angle, (n, v) => `hue-rotate(${v})`),
  dropShadow: SEQ([Color, Length, Length, LengthPercent], (n, ar) => `drop-shadow(${ar.join(" ")})`),
};

const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const rotate = SIN(Angle, (name, v) => ({ transform: `${name}(${v})` }));
const translateX = SIN(LengthPercent, (name, v) => ({ transform: `${name}(${v})` }));
const scaleX = SIN(NumberPercent, (name, v) => ({ transform: `${name}(${v})` }));
const skewX = SIN(AnglePercent, (name, v) => ({ transform: `${name}(${v})` }));
const perspective = SIN(Length, (name, v) => ({ transform: `${name}(${v})` }));

var filterTransforms = {
  filter: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SEQ(Array(6).fill(NumberInterpreter), transformWithFunc),
  matrix3d: SEQ(Array(16).fill(NumberInterpreter), transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SEQ(Array(3).fill(LengthPercent), transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SEQ(Array(3).fill(NumberInterpreter), transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: SEQ([NumberInterpreter, NumberInterpreter, NumberInterpreter, Angle], transformWithFunc),
  translate: SINmax(2, LengthPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  scale: SINmax(2, NumberPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  skew: SINmax(2, AnglePercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
};

//todo we could beneficially use the clock 10:30 etc. as directions for both shadows and gradients!!

// Shadows are handled similarly to transitions. Or even more semantically regulated.
// There are say 10 different types of SHADES. They specify a lengthFactor, blurFactor, spreadFactor. 
// Then in the $shadow(shade,angle,length,color?) to use it.
// If the length is passed in as 
// 
// var(--shadowColor, #0003) is the default color for the shadow.
// To change the default shadow color to for example white in @dark mode, do for example:
//   @dark$--shadowColor(#fff3)
// 
// By design, we flip @light/@dark on the elements with the shadow. Lob.
// This is likely better than trying to cluster such changes, as the shadows is unlikely to follow the same thematic logic in light and dark mode.
// Ie. elements that have the same shadow in lightmode, might have different/no shadows in darkmode, and vice versa.

const SHADES = {
  ambient: { l: 1, b: 1.5, s: 1.25 },
  edgeGlow: { l: 1, b: 3, s: -.5 },
  soft: { l: 1, b: 1, s: 0 },
  normal: { l: 1, b: 1.5, s: 0.75 },
  medium: { l: 1.5, b: 2, s: 1 },
  hard: { l: 2, b: 3, s: 1.5 },
  sharp: { l: 3, b: 4, s: 2 },
  heavy: { l: 4, b: 5, s: 3 },
  massive: { l: 6, b: 8, s: 4 },
  dramatic: { l: 8, b: 10, s: 6 },
  pronounced: { l: 10, b: 12, s: 8 },
  subtle: { l: 0.05, b: 0.1, s: 0.1 },
  delicate: { l: 0.07, b: 0.15, s: 0.15 },
};

//default angle 135deg
// default length is plain number? 5 is "normal" => 0.25rem. 1 is very small => 0.05rem. 10 is large => 0.5rem.
function calculateShadow({ type, angle = Math.PI * .75, length = { num: 5 }, color = "var(--shadowColor, #0003)" }) {
  if (!type) throw new SyntaxError("Missing shadow name: " + Object.keys(SHADES).join("|"));
  if (!length.unit) { length.num /= 20; length.unit = "rem"; }
  const { num, unit } = length;
  const round = (num, places = 2, m = 10 ** places) => Math.round(num * m) / m;
  const x = -round(Math.cos(angle) * type.l * num) + unit;
  const y = round(Math.sin(angle) * type.l * num) + unit;
  const blur = round(type.b * num) + unit;
  const spread = round(type.s * num) + unit;
  return { x, y, blur, spread, color };
}

const IgnoreError = cb => (...args) => { try { return cb(...args); } catch (e) { } };
const parseAbsoluteShadowArgs = IgnoreError(TYPB({}, {
  x: Length,
  y: Length,
  blur: Length,
  spread: Length,
  color: Color,
}, {}));

const parseNamedShadowArgs = TYPB({}, {
  type: WORD_IN_TABLE(SHADES),
  angle: Radian,
  length: isLengthNumber,
  color: Color,
}, {}, calculateShadow);

function boxShadow(a) {
  const { x, y, blur, spread, color } = parseAbsoluteShadowArgs(a) ?? parseNamedShadowArgs(a);
  return [x, y, blur, spread, color].filter(Boolean).join(" ");
}
function textDropShadow(a) {
  const { x, y, blur, color } = parseAbsoluteShadowArgs(a) ?? parseNamedShadowArgs(a);
  return [x, y, blur, color].filter(Boolean).join(" ");
}

var shadows = {
  boxShadowInset: a => ({ boxShadow: "inset " + boxShadow(a) }),
  boxShadow: a => ({ boxShadow: boxShadow(a) }),
  textShadow: a => ({ textShadow: textDropShadow(a) }),
  dropShadow: textDropShadow,
  noBoxShadow: { boxShadow: "none" },
  noTextShadow: { textShadow: "none" },
};

const origin = {
  left: ["left"],
  right: ["right"],
  top: ["top"],
  bottom: ["bottom"],
  leftTop: ["left", "top"],
  rightTop: ["right", "top"],
  leftBottom: ["left", "bottom"],
  rightBottom: ["right", "bottom"],
  start: ["insetInlineStart", "insetBlockStart"],
  end: ["insetInlineEnd", "insetBlockEnd"],
  startEnd: ["insetInlineStart", "insetBlockEnd"],
  endStart: ["insetInlineEnd", "insetBlockStart"],
  startTop: ["insetInlineStart", "top"],
  endTop: ["insetInlineEnd", "top"],
  startBottom: ["insetInlineStart", "bottom"],
  endBottom: ["insetInlineEnd", "bottom"],
  leftStart: ["left", "insetBlockStart"],
  rightStart: ["right", "insetBlockStart"],
  leftEnd: ["left", "insetBlockEnd"],
  rightEnd: ["right", "insetBlockEnd"],
};

function position(position, {args: ar}) {
  const res = { position };
  if (!ar?.length) return res;
  const [pl1, pl2] = origin[extractName(ar)] ?? ["left", "top"];
  res[pl1] = extractLengthPercent(ar);
  if (ar.length) res[pl2] = extractLengthPercent(ar);
  if (ar.length)
    throw new SyntaxError(`unknown argument: $position(${ar[0].text}).`);
  return res;
}

const absolute = position.bind(null, "absolute");
const relative = position.bind(null, "relative");
const fixed = position.bind(null, "fixed");
const sticky = position.bind(null, "sticky");


// container {
//   anchor-name: --some-name-never-declared;
// }


// item {
//   position-anchor: --some-name-never-declared;
//   position: absolute;
//   left: anchor(right);
//   bottom: anchor(top);
// }

// implementation
// This is essentially a sideways umbrella. $positionAnchor(some-name-never-declared)
// Then, $position(absolute,anchor(some-name-never-declared,top,left,bottom,right) || leftTop(l,t),etc.) 

function positionAnchor(ar) {
  const name = extractName(ar);
  if (!name) throw new SyntaxError(`$positionAnchor argument must always begin with a valid identifier name.`);
  if (!ar.length) //sideways umbrella 
    return { "position-anchor": `--${name}` };
  //i think that we need special rules to tackle "0" and turn into top/bottom or left/right
}


var position$1 = {
  absolute,
  relative,
  fixed,
  sticky,

  // positionAnchor,
};

const strokeDefaults = {
  stroke: "unset",
  strokeWidth: "unset",
  strokeOpacity: "unset",
  strokeLinecap: "unset",
  strokeLinejoin: "unset",
  strokeDasharray: "unset",
  strokeDashoffset: "unset",
  strokeMiterlimit: "unset",
};

const fillDefaults = {
  fill: "unset",
  fillOpacity: "unset",
  fillRule: "unset",
};

const svgTextDefaults = {
  textAnchor: "unset",
  dominantBaseline: "unset",
  alignmentBaseline: "unset",
  baselineShift: "unset",
};

const stroke = TYPB({
}, {
  stroke: ColorUrl,
  strokeWidth: Length,
  strokeOpacity: NumberInterpreter,
  strokeLinecap: CamelWords("butt|round|square"),
  strokeLinejoin: CamelWords("miter|round|bevel"),
  strokeDasharray: CHECKNAME("dasharray", SINmax(999, LengthPercentNumber, (name, ar) => ar.join(", "))),
  strokeDashoffset: CHECKNAME("dashoffset", SIN(LengthPercent)),
  strokeMiterlimit: CHECKNAME("miterlimit", SIN(NumberInterpreter)),
}, {});

const fill = TYPB({}, {
  fill: ColorUrl,
  fillOpacity: NumberInterpreter,
  fillRule: CamelWords("evenodd|nonzero"),
}, {});

const svgText = TYPB({
}, {
  textAnchor: CamelWords("start|middle|end"),
  dominantBaseline: CamelWords("auto|textBottom|alphabetic|ideographic|middle|central|mathematical|hanging|textTop"),
  alignmentBaseline: CamelWords("auto|baseline|beforeEdge|textBeforeEdge|middle|central|afterEdge|textAfterEdge|ideographic|alphabetic|hanging|mathematical"),
  baselineShift: CamelWords("sub|super|baseline"),
}, {});

const Stroke = Umbrella(strokeDefaults, stroke);
const Fill = Umbrella(fillDefaults, fill);
const SvgText = Umbrella(svgTextDefaults, svgText);

const markerStart = SIN(Url, (name, v) => ({ [name]: v }));
const markerEnd = SIN(Url, (name, v) => ({ [name]: v }));
const markerMid = SIN(Url, (name, v) => ({ [name]: v }));
const marker = SINmax(3, UrlUnset, (name, m) =>
  m.length == 1 ? { marker: m[0] } :
    m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
      { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
);

// **csss:** $fill(url(#gradient))
// **css:**
// ```css
// @layer containerDefault {
//   .\$fill\(url\(\#gradient\)\) {
//     fill: url(#gradient);
//   }
// }
// ```
//
// **csss:** $marker(url(#arrow),_,_)
// **css:**
// ```css
// @layer containerDefault {
// .\$marker\(url\(\#arrow\)\,_\,_\) {
// marker-start: url(#arrow);
// marker-mid: unset;
// marker-end: unset;
// }
// }
// ```
// 
// **csss:** $markerStart(url(#arrow))
// **css:**
// ```css
// @layer containerDefault {
// .\$markerStart\(url\(\#arrow\)\) {
// marker-start: url(#arrow);
// }
// }
// ```

//arity is an optional check function that can wrap other functions to check for 

// function oneOfEach(definitions, args) {
//   const res = {};
//   const usedKeys = new Set();
//   for (let a of args)
//     for (const [prop, def] of Object.entries(definitions)) {
//       if (!usedKeys.has(prop))
//         continue;
//       if (!(a.text in definitions || a.name in definitions))
//         throw new TypeError(`Unknown argument: ${a.text}`);
//       Object.assign(res, definitions[a.text] ?? definitions[a.name](a));
//     }
//   return res;
// }

// const x = {
//   butt: {strokeLinecap: "butt"}, 
//   round: {strokeLinecap: "round"}, 
//   square: {strokeLinecap: "square"}, 
//   miter: {strokeLinejoin: isLengthPercent}, 
//   round: {strokeLinejoin: "round"}, 
//   bevel: {strokeLinejoin: "bevel"},
//   strokeColor: isColor,
//   strokeWidth: isLengthPercent,
//   strokeOpacity: isFraction,
//   dash: {
//     strokeDasharray: isLengthPercentNumber,
//     strokeDashoffset: { offset: isLengthPercentNumber },
//   }
// };


// const y = [
//   ["butt", "strokeLinecap", "butt" ],
//   ["round", "strokeLinecap", "round" ],
//   ["square", "strokeLinecap", "square" ],
//   ["miter", "strokeLinejoin", isLengthPercent ],
//   ["round", "strokeLinejoin", "round" ],
//   ["bevel", "strokeLinejoin", "bevel" ]

// ].forEach(([name, property, value]) => {
//   stroke[name + "Stroke"] = { [property]: value };
// });

// function dash(args) {
//   return clusterInArrays({
//     strokeDasharray: isLengthPercentNumber,
//     strokeDashoffset: { offset: isLengthPercentNumber },
//   }, args);
// }
// //$stroke(color, lengthPercent width, butt|round|square, miter(number)|round|bevel, dash(offset(number/lengthPercent),...number/lengthPercent),opacity(fraction/percent))
// function stroke(args) {
//   return oneOfEach({
//     strokeColor: isColor,
//     strokeWidth: isLengthPercent,
//     strokeLinecap: ["butt", "round", "square"],
//     strokeLinejoin: { miter: isLengthPercent } || ["round", "bevel"], //todo this doesn't work.
//     strokeOpacity: { strokeOpacity: isFraction },
//     dash,
//   }, args);
// }
//$fill(color, opacity(fraction/percent), nonzero|evenodd)

//$svg(opacity(fraction/percent), )

function createColorFunction(property) {
  return ({ args }) => {
    if (!args?.length) return { [property]: "currentColor" };
    const c = extractColor(args) || extractUrl(args);
    if (c) {
      if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
      return { [property]: c };
    }
    const b = isBasic(args[0]);
    if (b) {
      args.shift();
      if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
      return { [property]: b.text };
    }
    throw new SyntaxError(`${property}() requires a color, url(), or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
  }
}

// function createLengthFunction(property, defaultValue) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: defaultValue };
//     const value = extractLength(args) ?? extractName(args);
//     if (!value) throw new SyntaxError(`${property}() requires a length or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: value };
//   };
// }

function createEnumFunction(property, validWords) {
  return ({ args }) => {
    if (!args?.length) return { [property]: validWords[Object.keys(validWords)[0]] };
    const v = extractName(args);
    if (!(v in validWords)) throw new SyntaxError(`Unknown ${property}: ${v}. Use: ${Object.keys(validWords).join(", ")}`);
    if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
    return { [property]: validWords[v] };
  };
}

function createOpacityFunction(property) {
  return ({ args }) => {
    if (!args?.length) return { [property]: "1" };
    const opacity = isNumber(args[0]) ?? isBasic(args[0]);
    if (!opacity) throw new SyntaxError(`${property}() requires a number or percentage. Got: ${args[0]?.text || 'undefined'}`);
    args.shift();
    if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
    return { [property]: opacity.text };
  };
}

// function createMarkerFunction(property) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: "none" };
//     const marker = extractUrl(args) ?? (extractName(args) === "none" ? "none" : null);
//     if (!marker) throw new SyntaxError(`${property}() requires url() or 'none'. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: marker };
//   };
// }

// function createNumberFunction(property, defaultValue) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: defaultValue };
//     const value = extractNumber(args) ?? extractName(args);
//     if (!value) throw new SyntaxError(`${property}() requires a number or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: value };
//   };
// }

// function strokeDasharray({ args }) {
//   if (!args?.length) return { "stroke-dasharray": "none" };
//   const values = [];
//   while (args.length) {
//     const arg = args.shift();
//     const basic = isBasic(arg);
//     if (basic && (basic.type === "number" || basic.type === "length" || basic.text === "none")) {
//       values.push(basic.text);
//     } else if (arg.kind === "WORD" && arg.text === "none") {
//       values.push("none");
//     } else {
//       args.unshift(arg);
//       break;
//     }
//   }
//   if (args.length) throw new SyntaxError(`Unknown strokeDasharray argument: ${args[0].text}`);
//   return { "stroke-dasharray": values.join(" ") };
// }

function paintOrder({ args }) {
  if (!args?.length) return { "paint-order": "normal" };

  const values = [];
  while (args.length) {
    const v = extractName(args);
    if (!(v in PAINT_ORDER_WORDS)) throw new SyntaxError(`Unknown paint-order value: ${v}. Use: ${Object.keys(PAINT_ORDER_WORDS).join(", ")}`);
    values.push(PAINT_ORDER_WORDS[v]);
  }

  return { "paint-order": values.join(" ") };
}

// const LINECAP_WORDS = {
//   butt: "butt",
//   round: "round",
//   square: "square",
// };

// const LINEJOIN_WORDS = {
//   miter: "miter",
//   round: "round",
//   bevel: "bevel",
// };

// const TEXT_ANCHOR_WORDS = {
//   start: "start",
//   middle: "middle",
//   end: "end"
// };

const SHAPE_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  crispEdges: "crispEdges",
  geometricPrecision: "geometricPrecision"
};

const PAINT_ORDER_WORDS = {
  normal: "normal",
  fill: "fill",
  stroke: "stroke",
  markers: "markers"
};

const VECTOR_EFFECT_WORDS = {
  none: "none",
  nonScalingStroke: "non-scaling-stroke",
  nonScalingSize: "non-scaling-size",
  nonRotation: "non-rotation",
  fixedPosition: "fixed-position"
};

// const DOMINANT_BASELINE_WORDS = {
//   auto: "auto", ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging",
//   mathematical: "mathematical", central: "central", middle: "middle",
//   textAfterEdge: "text-after-edge", textBeforeEdge: "text-before-edge"
// };

// const ALIGNMENT_BASELINE_WORDS = {
//   auto: "auto", baseline: "baseline", beforeEdge: "before-edge", textBeforeEdge: "text-before-edge",
//   middle: "middle", central: "central", afterEdge: "after-edge", textAfterEdge: "text-after-edge",
//   ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging", mathematical: "mathematical"
// };

const RULE_WORDS = {
  nonzero: "nonzero",
  evenodd: "evenodd"
};

// const COLOR_INTERPOLATION_WORDS = {
//   auto: "auto",
//   sRGB: "sRGB",
//   linearRGB: "linearRGB"
// };

const COLOR_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  optimizeQuality: "optimizeQuality"
};

const IMAGE_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  optimizeQuality: "optimizeQuality",
  pixelated: "pixelated"
};

// const MASK_TYPE_WORDS = {
//   luminance: "luminance",
//   alpha: "alpha"
// };


const stopColor = createColorFunction("stop-color");
const stopOpacity = createOpacityFunction("stop-opacity");
const lightingColor = createColorFunction("lighting-color");
const vectorEffect = createEnumFunction("vector-effect", VECTOR_EFFECT_WORDS);
const clipRule = createEnumFunction("clip-rule", RULE_WORDS);
// const colorInterpolation = createEnumFunction("color-interpolation", COLOR_INTERPOLATION_WORDS);
const shapeRendering = createEnumFunction("shape-rendering", SHAPE_RENDERING_WORDS);
const colorRendering = createEnumFunction("color-rendering", COLOR_RENDERING_WORDS);
const imageRendering = createEnumFunction("image-rendering", IMAGE_RENDERING_WORDS);
// const maskType = createEnumFunction("mask-type", MASK_TYPE_WORDS);
const svgOpacity = createOpacityFunction("opacity");
// const markerStart = createMarkerFunction("marker-start");
// const markerMid = createMarkerFunction("marker-mid");
// const markerEnd = createMarkerFunction("marker-end");

const strokeNone = {
  stroke: "none",
  strokeWidth: "unset",
  strokeOpacity: "unset",
  strokeLinecap: "unset",
  strokeLinejoin: "unset",
  strokeDasharray: "unset",
  strokeDashoffset: "unset",
  strokeMiterlimit: "unset",
};

var svg = {
  stroke,
  Stroke,

  fill,
  Fill,

  svgText,
  SvgText,

  strokeWidth: undefined,
  strokeLinecap: undefined,
  strokeLinejoin: undefined,
  strokeDasharray: undefined,
  strokeMiterlimit: undefined,
  strokeDashoffset: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  fillRule: undefined,
  textAnchor: undefined,
  dominantBaseline: undefined,
  alignmentBaseline: undefined,
  baselineShift: undefined,

  strokeNone,
  noStroke: strokeNone,
  fillNone: { fill: "none", fillOpacity: "unset", fillRule: "unset" },
  noFill: { fill: "none", fillOpacity: "unset", fillRule: "unset" },

  marker,
  markerStart,
  markerMid,
  markerEnd,
  noMarker: { marker: "none" },
  markerNone: { marker: "none" },

  stopColor,
  stopOpacity,

  paintOrder,
  vectorEffect,
  opacity: svgOpacity,
  clipRule,
  shapeRendering,
  // colorInterpolation,
  colorRendering,
  imageRendering,
  lightingColor,
  // maskType, //alpha, luminance is default/none.  as it doesn't inherit, we would likely not 

  //loners
  maskType: CUSTOM_WORD("maskType", "alpha"),
  colorInterpolation: CUSTOM_WORD("colorInterpolation", "sRGB|linearRGB"),


  thinStroke: { "stroke-width": "1" },
  mediumStroke: { "stroke-width": "2" },
  thickStroke: { "stroke-width": "3" },
  solidStroke: { "stroke-dasharray": "none" },
  dashedStroke: { "stroke-dasharray": "5,5" },
  dottedStroke: { "stroke-dasharray": "1,1" },
  roundStroke: { "stroke-linecap": "round", "stroke-linejoin": "round" },
  sharpStroke: { "stroke-linecap": "butt", "stroke-linejoin": "miter" },
  nonScalingStroke: { "vector-effect": "non-scaling-stroke" },
  nonzeroFill: { "fill-rule": "nonzero" },
  evenoddFill: { "fill-rule": "evenodd" },
  crispEdges: { "shape-rendering": "crispEdges" },
  geometricPrecision: { "shape-rendering": "geometricPrecision" },
  optimizeSpeed: { "color-rendering": "optimizeSpeed", "image-rendering": "optimizeSpeed" },
  optimizeQuality: { "color-rendering": "optimizeQuality", "image-rendering": "optimizeQuality" },
};

const WHITESPACE = {
  nowrap: { whiteSpace: "nowrap" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  pre: { whiteSpace: "pre" },
  breakSpaces: { whiteSpace: "break-spaces" },
  normal: { whiteSpace: "normal" },
};

var whitespace = {
  ...WHITESPACE,
};

const paragraph = TYPB({
  indent: SIN(LengthPercent, (n, v) => ({ textIndent: v })),
  spacing: SIN(LengthPercent, (n, v) => ({ wordSpacing: v })),

  hyphens: { hyphens: "auto" },
  shy: { hyphens: "manual" },

  //todo i don't think that we need to include these settings as white-space overrides it: whiteSpaceCollapse: "unset", textWrapMode: "unset", 
  nowrap: { whiteSpace: "nowrap" },
  pre: { whiteSpace: "pre" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  whiteSpaceNormal: { whiteSpace: "normal" },

  preserve: { whiteSpace: "preserve" },
  preserveBreaks: { whiteSpace: "preserve-breaks" },
  preserveSpaces: { whiteSpace: "preserve-spaces" },
  breakSpaces: { whiteSpace: "break-spaces" },
  preserveNowrap: { whiteSpace: "preserve nowrap" },
  preserveBreaksNowrap: { whiteSpace: "preserve-breaks nowrap" },
  preserveSpacesNowrap: { whiteSpace: "preserve-spaces nowrap" },
  breakSpacesNowrap: { whiteSpace: "break-spaces nowrap" },

  anywhere: { wordBreak: "break-all", overflowWrap: "anywhere" },
  breakWord: { wordBreak: "break-all", overflowWrap: "break-word" },
  overflowWrapNone: { wordBreak: "none", overflowWrap: "none" },
  //wordBreak: keep-all

  start: { textAlign: "start" },
  end: { textAlign: "end" },
  left: { textAlign: "left" },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  justify: { textAlign: "justify" },
  lastStart: { textAlignLast: "start" },
  lastEnd: { textAlignLast: "end" },
  lastLeft: { textAlignLast: "left" },
  lastRight: { textAlignLast: "right" },
  lastCenter: { textAlignLast: "center" },
  lastJustify: { textAlignLast: "justify" },

  //exp safari  
  hangingPunctuationFirst: { hangingPunctuation: "first" },
  hangingPunctuationLast: { hangingPunctuation: "last" },
  hangingPunctuationAllowEnd: { hangingPunctuation: "allow-end" },
  hangingPunctuationForceEnd: { hangingPunctuation: "force-end" },
  hangingPunctuationNone: { hangingPunctuation: "none" },

}, {
  lineHeight: LengthPercentNumber,      //todo this is not so good. Here we need to redo all of them.. A little too little automatic.
}, {
}, res => {
  res.lineHeight &&= { lineHeight: res.lineHeight };
  return Object.assign({}, ...Object.values(res))
});

const PARAGRAPH = {
  lineHeight: "unset",
  textIndent: "unset",
  wordSpacing: "unset",
  hyphens: "unset",
  whiteSpace: "unset",
  overflowWrap: "unset",
  wordBreak: "unset",
  textAlign: "unset",
  textAlignLast: "unset",
  hangingPunctuation: "unset",
};
const PARAGRAPHS = {
  _: {},
  scientific: { textAlign: "justify", textAlignLast: "justify" },
  oldBook: { textAlign: "justify", textAlignLast: "justify" },
};


const Paragraph = Umbrella(PARAGRAPH,
  FIRST(
    WORD_IN_TABLE(PARAGRAPHS),
    paragraph,
    (n, first, rest) => ({ ...PARAGRAPHS[first], ...rest }))
);

var paragraph$1 = {
  paragraph,
  Paragraph,
  lineHeight: undefined,
  textIndent: undefined,
  wordSpacing: undefined,
  hyphens: undefined,
  whiteSpace: undefined,
  overflowWrap: undefined,
  wordBreak: undefined,
  textAlign: undefined,
  textAlignLast: undefined,
  hangingPunctuation: undefined,
};

const DIRECTION_WORDS = {
  normal: "normal",
  reverse: "reverse",
  alternate: "alternate",
  alternateReverse: "alternate-reverse",
};

const FILL_MODE_WORDS = {
  forwards: "forwards",
  backwards: "backwards",
  both: "both",
  none: "none",
};

const PLAY_STATE_WORDS = {
  running: "running",
  paused: "paused",
};

const EASING_WORDS = {
  ease: "ease",
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  ...CURVES,
};

const ANIMS = {
  animation: TYPB({
    infinite: "infinite",
    ...EASING_WORDS,
    ...DIRECTION_WORDS,
    ...FILL_MODE_WORDS,
    ...PLAY_STATE_WORDS,
  }, {
    duration: Time,
    delay: Time,
    iterationCount: NumberInterpreter,
  }, {
    cubicBezier: NumberInterpreter,
    steps: NumberInterpreter,
  }, (res) => {
    const settings = {};
    if (res.duration) settings.duration = res.duration;
    if (res.delay) settings.delay = res.delay;
    if (res.iterationCount) settings.iterationCount = res.iterationCount;
    if (res.infinite) settings.iterationCount = "infinite";
    // Handle direction
    for (let key in DIRECTION_WORDS) {
      if (res[key]) {
        settings.direction = DIRECTION_WORDS[key];
        break;
      }
    }
    // Handle fillMode
    for (let key in FILL_MODE_WORDS) {
      if (res[key]) {
        settings.fillMode = FILL_MODE_WORDS[key];
        break;
      }
    }

    // Handle playState
    for (let key in PLAY_STATE_WORDS) {
      if (res[key]) {
        settings.playState = PLAY_STATE_WORDS[key];
        break;
      }
    }

    // Handle easing
    for (let key in EASING_WORDS) {
      if (res[key]) {
        settings.easing = EASING_WORDS[key];
        break;
      }
    }
    if (res.cubicBezier) {
      settings.easing = { name: "cubicBezier", args: res.cubicBezier };
    }
    if (res.steps) {
      settings.easing = { name: "steps", args: res.steps };
    }
    return { settings };
  }),
  to: function ({ args }) {
    return { settings: {}, stepKey: "100%", nextArgs: args };
  },
  from: function ({ args }) {
    return { settings: {}, stepKey: "0%", nextArgs: args };
  },
  go: function ({ args }) {
    // go(50%) means keyframe at 50%
    const percent = args[0]?.text || "50%";
    return { settings: {}, stepKey: percent, nextArgs: args.slice(1) };
  },
  infiniteAlternate: { settings: { iterationCount: "infinite", direction: "alternate" } },
  infinite: { settings: { iterationCount: "infinite" } },
  alternate: { settings: { direction: "alternate" } },
  reverse: { settings: { direction: "reverse" } },
  forwards: { settings: { fillMode: "forwards" } },
  backwards: { settings: { fillMode: "backwards" } },
  both: { settings: { fillMode: "both" } },
};

//TODO not implemented/supported, neither here nor in the Parser.js
// **csssx:** $translateX(100px,to(*3))
// **cssx:**
// ```css
// @keyframes translateX-to-\*3 {
//   100% {
//     transform: translateX(300px);
//   }
// }

// @layer containerDefault {
//   .\$translateX\(100px\,to\(\*3\)\) {
//     transform: translateX(100px);
//     animation: translateX-to-\*3 1s;
//   }
// }
// ```
// function isRelativeCalc(arg) {
//   return arg?.kind === "EXP" && arg.name in Maths && arg.args?.length > 0;
// }
// function processRelCalc(relCalcs, argsIn) {
//  for each relCalc in relCalcs
//  find out if relCalc is a relative calc
//  if(!(relCalc.kind == "EXP" && relCalc.args.length > 1 && relCalc.args[0] == null))
//    return undefined;
//  run the relCalc against all the incoming argsIn
//  here we can either fail if not all argsIn are computable, 
//  or we can just filter away the argsIn that are not computable.
//  const argsOut = argsIn.map(a => /*compute(relCalc.name, a, relCalc.args[1])?.text*/);
//  then return the resulting argsIn.map(arg => arg.text);
//         if (nextArgs && isRelativeCalc(nextArgs[0]))
//         nextArgs = args2.map(baseArg => {
//           const relCalc = nextArgs.find(na => isRelativeCalc(na));
//           return relCalc ? processRelCalc(relCalc, baseArg) : baseArg;
//         });
// }

function animationHo(cb) {
  return ({ name, args }) => {
    // Find where animation functions start (check both .name for EXP and .text for WORD)
    const i = args.findIndex(a => (a.name in ANIMS) || (a.text in ANIMS));
    if (i === -1)
      return cb({ name, args });

    const args2 = args.slice(0, i);
    const anims = args.slice(i);

    // Generate unique animation name based on property name and content
    //todo we need to have the expression get the .text property too..
    const animContent = [name, ...anims.map(({ text, name, args }) => text ?? (name + args.map(a => a.text).join(",")))].join("-");
    const animName = animContent.replaceAll(/[^a-zA-Z0-9-_]/g, "\\$&").substring(0, 50);

    const result = cb({ name, args: args2 });
    const settings = {};
    const keyframes = {};
    // Process each animation step
    for (let anim of anims) {
      let extraSettings, stepKey, nextArgs;
      if (anim.text in ANIMS)
        ({ settings: extraSettings, stepKey, nextArgs } = ANIMS[anim.text]);
      else if (anim.name in ANIMS)
        ({ settings: extraSettings, stepKey, nextArgs } = ANIMS[anim.name](anim));
      else
        throw new SyntaxError(`Not a valid animation argument: ${animName}. Remember, all animation arguments must come after other arguments for every property.`);

      // nextArgs = processRelCalc(nextArgs[0], nextArgs);
      if (nextArgs)
        keyframes[stepKey] = cb({ name, args: nextArgs });
      if (extraSettings)
        Object.assign(settings, extraSettings);
    }

    // Build animation CSS property
    const animationParts = [animName];
    // Add default duration if not specified
    animationParts.push(settings.duration || "2s");
    if (settings.easing) {
      if (typeof settings.easing === "string") {
        animationParts.push(settings.easing);
      } else if (settings.easing.name === "cubicBezier") {
        animationParts.push(`cubic-bezier(${settings.easing.args.map(NumberInterpreter).join(",")})`);
      } else if (settings.easing.name === "steps") {
        animationParts.push(`steps(${settings.easing.args.map(NumberInterpreter).join(",")})`);
      }
    }
    if (settings.delay) animationParts.push(settings.delay);
    if (settings.iterationCount) animationParts.push(settings.iterationCount);
    if (settings.direction) animationParts.push(settings.direction);
    if (settings.fillMode) animationParts.push(settings.fillMode);
    if (settings.playState) animationParts.push(settings.playState);

    result.animation = animationParts.join(" ");
    result[`@keyframes ${animName}`] = keyframes;
    return result;
  };
}

var animations = {
  animation: undefined,
  animationName: undefined,
  animationDuration: undefined,
  animationTimingFunction: undefined,
  animationDelay: undefined,
  animationIterationCount: undefined,
  animationDirection: undefined,
  animationFillMode: undefined,
  animationPlayState: undefined,
};

const Animations = {
  translateY: animationHo(filterTransforms.translateY),
  translate: animationHo(filterTransforms.translate),
  translateX: animationHo(filterTransforms.translateX),
  translateZ: animationHo(filterTransforms.translateZ),
  scale: animationHo(filterTransforms.scale),
  scaleX: animationHo(filterTransforms.scaleX),
  scaleY: animationHo(filterTransforms.scaleY),
  scaleZ: animationHo(filterTransforms.scaleZ),
  rotate: animationHo(filterTransforms.rotate),
  rotateX: animationHo(filterTransforms.rotateX),
  rotateY: animationHo(filterTransforms.rotateY),
  rotateZ: animationHo(filterTransforms.rotateZ),
  skewX: animationHo(filterTransforms.skewX),
  skewY: animationHo(filterTransforms.skewY),
  opacity: animationHo(nativeAndMore.opacity),
  bg: animationHo(backgrounds.bg),
  bgColor: animationHo(backgrounds.bgColor),
  color: animationHo(nativeAndMore.color),
  border: animationHo(border$1.border),
  Border: animationHo(border$1.Border),
};

const ObjectFit = {
  objectFit: undefined,
  fitFill: { objectFit: "fill" },
  fitContain: { objectFit: "contain" },
  fitCover: { objectFit: "cover" },
  fitScaleDown: { objectFit: "scale-down" },
  noObjectFit: { objectFit: "none" },
};

const SHORTS = {
  ...nativeAndMore,
  ...backgrounds,
  ...fonts,
  ...palette,
  ...layouts,
  ...transitions,
  ...textDecorations,
  ...border$1,
  ...filterTransforms,
  ...shadows,
  ...position$1,
  ...svg,
  ...paragraph$1,
  ...whitespace,
  ...ObjectFit,
  ...Animations,
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
  dark: "(prefers-color-scheme:dark)",
};


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

/**
 * If you have a cssRules object, then you need to do:
 *   const extract = memoize(extractSelector, 333);
 *   const allShorts = [...cssRules].map(CSSS.extract);
 *   const parseFun = memoize(CSSS.parse, 333);
 *   sequence(allShorts, el.classList, parseFun);
 * 
 * @param {[string]} allShorts 
 * @param {[string]} classListShorts 
 * @param {Function} parseFun 
 * @returns {[string]} sequenced classListShorts
 */
function sequence(allShorts, classListShorts, parseFun) {
  const layerPosition = {};
  const res = [...classListShorts];
  for (let i = 0; i < res.length; i++) {
    const cls = res[i];
    const shortObj = parseFun(cls);
    if (!shortObj) continue; // not a short
    let pos = allShorts.indexOf(cls);
    if (pos == -1) pos = Infinity;
    if (pos >= layerPosition[shortObj.layer])
      layerPosition[shortObj.layer] = pos;
    else
      res[--i] = cls + "!"; // mark and redo!
  }
  return res;
}

//not useful, should be under interpret.
// function findLayerType(short) {
//   if (!short.includes("$")) return;
//   if (short[0] === "$") return "containerDefault";
//   if (short.startsWith("|$") return "itemDefault";
//   const shortWithoutQuote = short.replaceAll(/''/g, ""); // remove all text within quotes
//   const i = shortWithoutQuote.indexOf("$");
//   const j = shortWithoutQuote.indexOf("|");
//   if (j < 0 || i < j) return "container";
//   return "item";
// }

function extractShortSelector(rule) {
  if (!(rule instanceof CSSLayerStatementRule && rule.cssRules?.length == 1)) return false;
  rule = rule.cssRules[0];
  if (rule instanceof CSSMediaRule && rule.cssRules.length == 1) rule = rule.cssRules[0];
  if (!(rule instanceof CSSStyleRule) || rule.cssRules.length != 1) return false;
  return rule.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/g)?.[0] || false;
}
function extractShort(rule) {
  const className = extractShortSelector(rule);
  return className && className.slice(1).replaceAll("\\", "");
}

function extractAtRules(obj) {
  const atRules = {}, mainRule = {};
  for (let [k, v] of Object.entries(obj))
    ((k.match(/^[@:]/)) ? atRules : mainRule)[k] = v;
  return { atRules, mainRule };
}

function kebabcaseKeys(obj) {
  if (!(obj instanceof Object)) return obj;
  return Object.fromEntries(Object.entries(obj).map(([k, v]) =>
    [k.match(/^(--|@|:)/) ? k : k.replace(/[A-Z]/g, "-$&").toLowerCase(), kebabcaseKeys(v)]));
}

function checkProperty(obj) {
  for (let k in obj)
    if (CSS.supports(k, "inherit") && !CSS.supports(k, obj[k]))
      throw new SyntaxError(`Invalid CSS$ value => ${k}: ${obj[k]}`);
}

function bodyToTxt(name, body, depth = 0) {
  const spaces = "  ".repeat(depth);
  const spaces2 = "  ".repeat(depth + 1);
  const body2 = Object.entries(body).map(([k, v]) =>
    v instanceof Object ?
      bodyToTxt(k, v, depth + 1) :
      `${spaces2}${k}: ${v};`
  ).join("\n");
  return `${spaces}${name} {\n${body2}\n${spaces}}`;
}

function interpretShort(exp) {
  try {
    const cb = SHORTS[exp.name ?? exp.text];
    if (!cb) throw new ReferenceError(exp.name);
    return cb instanceof Function ? cb(exp) : cb;
  } catch (e) {
    debugger;
    //todo improve error message
    throw e;
  }
}

const MAGICWORD = `$"'$`;
function parse(short) {
  const clazz = "." + short.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
  short = short.match(/(.*?)\!*$/)[1];
  const { exp, media } = parseMediaQuery(short, MEDIA_WORDS);
  let [sel, ...exprList] = exp.split(/\$(?=(?:[^"]*"[^"]*")*[^"]*$)(?=(?:[^']*'[^']*')*[^']*$)/);
  exprList = exprList.map(parseNestedExpression);
  exprList = exprList.map(interpretShort);
  exprList &&= clashOrStack(exprList);
  let { selector, item, grandItem } = parseSelectorPipe(sel, clazz);
  const layer = (grandItem ? "grandItems" : item ? "items" : "container") + (short.match(/^(\$|\|\$|\|\|\$)/) ? "Default" : "");
  exprList = kebabcaseKeys(exprList);
  const { atRules, mainRule: body } = extractAtRules(exprList);
  checkProperty(body);
  let obj = { [selector]: body };
  if (media) obj = { [`@media ${media}`]: obj };
  const cssText = bodyToTxt(`@layer ${layer}`, obj);
  const main = { short, layer, media, selector, body, cssText };

  const atRuleTexts = Object.entries(atRules).map(([rule, body]) => ({ rule, body, cssText: bodyToTxt(rule, body) }));
  return [main, ...atRuleTexts];
}

const clashOrStack = (function () {
  const STACKABLE_PROPERTIES = {
    background: ", ",
    backgroundImage: ", ",
    backgroundPosition: ", ",
    backgroundRepeat: ", ",
    backgroundSize: ", ",
    backgroundOrigin: ", ",
    backgroundClip: ", ",
    backgroundBlendMode: ", ",
    backgroundAttachment: ", ",
    transition: ", ",
    fontFamily: ", ",
    voiceFamily: ", ",
    textShadow: ", ",
    boxShadow: ", ",
    animation: ", ",
    mask: ", ",
    fontFeatureSettings: ", ",
    willChange: ", ",

    backdropFilter: " ",
    transform: " ",
    filter: " ",
    counterReset: " ",
    counterIncrement: " ",
    fontVariant: " ",
  };

  return function clashOrStack(shortsI) {
    const res = {};
    for (const obj of shortsI) {
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        if (!(k in res))
          res[k] = v;
        //todo if ::before and ::after or >* or other atRules clash, then add /*comments to separate them*/ as transitions and @font-face does.
        else if (k in STACKABLE_PROPERTIES)
          res[k] += (STACKABLE_PROPERTIES[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }
})();

function goRightComma(tokens, divider) {
  const args = [];
  if (tokens[0].text == ")" && tokens.shift())
    return args;
  while (tokens.length) {
    const a = goRightOperator(tokens);
    args.push(a);
    if (tokens[0].text === ")" && tokens.shift())
      return args;
    if (tokens[0].text === divider && tokens.shift())
      continue;
    throw new SyntaxError(`Expected ${[divider, ")"].filter(Boolean).join(" or ")}, got: ${tokens[0].text}`);
  }
  throw new SyntaxError("missing ')'");
}

function operatorPriority(a, name, b) {
  const PRI = { "**": 1, "*": 2, "/": 2, "+": 3, "-": 3, "??": 4, };
  const leftPri = PRI[a.name] ?? 0;
  const rightPri = PRI[name] ?? 10;
  if (leftPri <= rightPri)
    return { kind: "EXP", name, args: [a, b] };
  a.args[1] = { kind: "EXP", name, args: [a.args[1], b] };
  return a;
}

function goRightOperator(tokens) {
  let a = goDeep(tokens);
  while (tokens.length) {
    const { kind, text } = tokens[0];
    if (kind === "OPERATOR")
      a = operatorPriority(a, tokens.shift().text, goDeep(tokens));
    else if (kind === "NUMBER" && (text[0] == "-" || text[0] == "+"))
      a = { kind: "EXP", name: "+", args: [a, goDeep(tokens)] };
    else if (kind == "COLOR" && (a.type == "color" || a.kind == "COLOR"))
      a = { kind: "EXP", name: "#hash", type: "color", args: [a, goDeep(tokens)] };
    else
      break;
  }
  return a;
}


function goDeep(tokens) {
  if (tokens[0].text === "(")
    return { kind: "EXP", name: tokens.shift().text, args: goRightComma(tokens, ",") };
  if (tokens[0].kind === "SYN")
    throw new SyntaxError(`Expected expression, got: ${tokens[0].text}`);
  if (tokens[1].text === "(") {
    const { text: name, kind } = tokens.shift();
    tokens.shift();
    return kind == "COLOR" ?
      { kind: "EXP", type: "color", name, args: goRightComma(tokens, ",") } :
      { kind: "EXP", name, args: goRightComma(tokens, ",") };
  }
  //todo we must check here that the .kind is valid.
  return tokens.shift();
}

function parseNestedExpression(shortExp) {
  const newTokens = tokenize(shortExp);
  try {
    if (newTokens.length == 1) return newTokens[0];
    const short = goDeep(newTokens);
    if (newTokens.length) throw new SyntaxError("too many tokens.");
    if (short.kind !== "EXP") throw new SyntaxError("Short is not a valid expression.");
    return short;
  } catch (e) {
    e.message += `\n${shortExp}\n${" ".repeat(shortExp.length - newTokens.reduce(((acc, { text }) => acc + text.length), 0))}^`;
    console.error(e);
    debugger
    throw e;
  }
}

//todo we don't support nested :not(:has(...))
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
const clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source; //class
const op = />>|[>+~&,!]/.source;
const selectorTokens = new RegExp(`(\\s+)|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");

function parseSelectorPipe(str, clazz) {

  function cartesianProduct(ar) {
    return ar.length == 1 ? ar :
      ar[0].flatMap(head => cartesianProduct(ar.slice(1)).map(tail => head + ">" + tail));
  }

  const levels = str.split("|").map(parseSelectorComma).map((selectors, i) => {
    return i === 0 ?
      selectors.map(sel => sel.replace(MAGICWORD, clazz)) :
      selectors.map(sel => {
        if (!sel.startsWith(MAGICWORD))
          throw new SyntaxError("Item selector can't have ancestor expression: " + sel);
        return sel === MAGICWORD ? "*" : sel.slice(MAGICWORD.length);
      });
  });
  return {
    selector: cartesianProduct(levels).join(",  "),
    item: levels.length === 2,
    grandItem: levels.length === 3
  };
}
function parseSelectorComma(str) {
  let tokens = [...str.matchAll(selectorTokens)];
  const badToken = tokens.find(([t, ws, select, error]) => error);
  if (badToken)
    throw `Bad selector token: ${badToken[0]}`;
  tokens = tokens.filter(([t, ws]) => !ws);
  const selects = [[]];
  for (const [t] of tokens)
    t === "," ? selects.push([]) : selects.at(-1).push(t);
  return selects.map(Selector.interpret);
}

class Selector {

  static replaceNot(select) {
    const res = [];
    for (let i = 0; i < select.length; i++) {
      if (select[i] == "!" && select[i + 1]?.match(/^[^!>+~*\s]$/))
        res.push(`:not(${select[++i]})`);
      else if (select[i] == "!")
        throw new SyntaxError(`! can't come before ${select[i + 1] || "<endof selector>"}`);
      else
        res.push(select[i]);
    }
    return res;
  }

  static interpret(select) {
    if (!select.length)
      return MAGICWORD;
    select = select.map(s => s == ">>" ? " " : s);
    if (select[0].match(/^[>+~\s]$/))
      select.unshift("*");
    if (select.at(-1).match(/^[>+~\s]$/))
      select.push("*");
    let star = select.indexOf("*");
    if (star == -1) {
      select.unshift("*");
      star = 0;
    }
    if (star !== select.lastIndexOf("*"))
      throw `Only one '*' allowed per selector expression: ${select.join("")} `;
    select = Selector.replaceNot(select);

    let head = "";
    while (select.length) {
      let first = select.shift();
      if (first === "*") break;
      if (!first.match(/^[>+~\s]$/))
        first = `:where(${first})`;
      head += first;
    }
    let body = "";
    while (select.length) {
      if (select[0].match(/^[>+~\s]$/))
        break;
      body += select.shift();
    }
    let tail = select.join("");
    tail &&= `:has(${tail})`;
    body += tail;
    body &&= `:where(${body})`;
    return head + MAGICWORD + body;
  }
}

function mediaComparator(str) {
  const rx = new RegExp(
    "^(?:" +
    "(width|height|aspectRatio|resolution|color|monochrome|colorIndex)" +
    "(<=|>=|==|<|>)" +
    "(\\d+(?:\\.\\d+)?)" +
    "(?:" +
    "(px|em|rem|in|cm|mm|pt|pc)|" +
    "(dpi|dpcm|dppx)|" +
    "(\\/\\d+(?:\\.\\d+)?)" +
    ")?" +
    ")$");
  const m = str.match(rx);
  if (!m)
    return;
  let [, name, op, num, length, res, frac] = m;
  const type = length ?? res ?? frac ?? "";
  if (
    (name.match(/width|height/) && !length) ||
    (name == "aspectRatio" && (length || res)) ||
    (name == "resolution" && !res) ||
    (name.match(/color|monochrome|colorIndex/) && type)
  )
    throw new SyntaxError(`Invalid ${name}: ${num}${type} `);
  let snake = name.replace(/[A-Z]/g, "-$&").toLowerCase();
  if (op == "<")
    num = parseFloat(num) - 0.01;
  else if (op == ">")
    num = parseFloat(num) + 0.01;
  if (op.includes("<"))
    snake = `max - ${snake} `;
  else if (op.includes(">"))
    snake = `min - ${snake} `;
  return `${snake}: ${num}${type} `;
}

function parseMediaQuery(str, register) {
  if (str[0] !== "@")
    return { exp: str };
  if (str[1] !== "(") {
    const m = str.slice(1).match(/^[a-z][a-z0-9_]*/i);
    if (!m)
      throw new SyntaxError(`Invalid media query: "${str}".`);
    const word = m[0];
    const t = register[word];
    if (!t)
      throw new ReferenceError("@" + word);
    return { exp: str.slice(1 + word.length), media: `(${t})` };
  }
  let i = 2, tokens = [], level = 1;
  for (; i < str.length; i++) {
    if (str[i] == ",") tokens.push(str[i]);
    else if (str[i] == "(") level++, tokens.push(str[i]);
    else if (str[i] == ")") {
      if (!--level) { i++; break; }
      tokens.push(str[i]);
    }
    else if (str[i] === "!") tokens.push("not");
    else if (str[i] === "&") tokens.push("and");
    else if (str[i] === "|") tokens.push("or");
    else {
      let start = i;
      while (i < str.length && /[^,()&|!]/.test(str[i]))
        i++;
      const word = str.slice(start, i--);
      const t = mediaComparator(word) ?? register[word];
      if (!t)
        throw word.match(/^[a-z][a-z_0-9]*$/i) ?
          new ReferenceError("@" + word) :
          new SyntaxError(`Invalid media query: "${word}" in "${str}".`);
      tokens.push(
        t == "all" || t == "print" || t == "screen" ? t :
          `(${t})`
      );
    }
  }
  return { exp: str.slice(i), media: `${tokens.join(" ")} ` };
}

//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//check if we support all lengths.
const TYPES = {
  LENGTHS: "px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex",
  PERCENT: "%",
  ANGLES: "deg|grad|rad|turn",
  TIMES: "s|ms",
  FR: "fr",

  COLOR_NAMES: "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
  COLOR_FUNCTIONS: "rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch",
  // MATH: "min|max|clamp|round|ceil|floor|abs|sin|cos|tan|asin|acos|atan|atan2|sqrt|log2|log10|exp|pow",
  // OTHER_FUNCTIONS: "url|attr|var|env|counter|counters|rect|repeat|minmax",
};

const NUMBER = `(-?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(?:(${TYPES.LENGTHS})|(${TYPES.ANGLES})|(${TYPES.TIMES})|(${TYPES.PERCENT})|(${TYPES.FR}))?`;


const tokenize = (_ => {
  const QUOTE = /([`'"])(\\.|(?!\2).)*?\2/.source;
  const VAR = /--[a-zA-Z][a-zA-Z0-9_]*/.source;
  const WORD = /[._a-zA-Z][._%a-zA-Z0-9+<-]*/.source;
  const NUMBER_WORDS = /e|pi|infinity|NaN/.source; //todo not added yet.
  const COLOR = `#[a-zA-Z0-9_]+`;
  const OPERATOR = /\?\?|\*\*|[*/+-]/.source;
  const CPP = /[,()]/.source;

  const TOKENS = new RegExp([
    QUOTE,
    "\\s+",
    NUMBER,
    VAR,
    WORD,
    COLOR,
    OPERATOR,
    CPP,
    ".+"
  ].map(x => `(${x})`)
    .join("|"),
    "gi");

  return function tokenize(input) {
    const out = [];
    for (let m; (m = TOKENS.exec(input));) {
      const [text, _, q, quote, ws, n, num, length, angle, time, percent, fr, vari, word, c, op, cpp] = m;
      if (ws) continue;
      else if (num) {
        const n = Number(num);
        const type = length ? "length" : angle ? "angle" : time ? "time" : percent ? "percent" : fr ? "fr" : "number";
        const unit = length ?? angle ?? time ?? percent ?? fr ?? "";
        out.push({ text, kind: "NUMBER", num: n, unit, type });
      }
      else if (c) out.push({ text, kind: "COLOR" });
      else if (quote) out.push({ text, kind: "QUOTE" });
      else if (vari) out.push({ text, kind: "VAR" });
      else if (word) out.push({ text, kind: "WORD" });
      else if (op) out.push({ text, kind: "OPERATOR" });
      else if (cpp) out.push({ text, kind: "SYN" });
      else throw new SyntaxError(`Unknown token: ${text} in ${input}`);
    }
    return out;
  }
})();

/**
 * Use memoize to cache the results of this function.
 *    memoize(CSSS.parse, 333);
 * 
 * @param {String} short string to parse 
 * @returns {{ short: string, layer: string, media: string, selector: string, props: Object, cssText:string }}
 */
function memoize(fn, max = 333) {
  let young = new Map(), old = new Map();
  return function (arg) {
    if (young.size > max) { old = young; young = new Map(); }
    if (young.has(arg)) return young.get(arg);
    if (old.has(arg)) { const v = old.get(arg); young.set(arg, v); return v; }
    const v = fn(arg);
    young.set(arg, v);
    return v;
  };
}

function updateClassList(currentClassList, newClasses) {
  for (let i = 0; i < currentClassList.length; i++) {
    const cls = currentClassList[i];
    const sequencedCls = newClasses[i];
    if (cls !== sequencedCls)
      currentClassList.replace(cls, sequencedCls);
  }
}

/**
 * @param {Element} root from where to check for short occurrences 
 * @param {CSSStyleSheet} styleSheet with the shorts to check
 * @param {Function} reverseEngineer function to extract the class selector from a rule built by a csss short 
 * (the reverseEngineer function can be a memoized if needed) 
 */
function removeUnusedShorts(root, styleSheet, reverseEngineer = extractSelector) {
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    const rule = styleSheet.cssRules[i];
    const shortSelector = reverseEngineer(rule);
    if (shortSelector && !root.querySelector(shortSelector))
      styleSheet.deleteRule(i);
  }
}

function updateStyleText(styleEl) {
  styleEl.textContent = [...styleEl.sheet.cssRules].map(r => r.cssText).join('\n');
}

//DEMO FOR HOW TO PATCH FONT IMPORTS IN CSSS
// (function () {

//   //extracts only the first fontFamily if it is in a body.
//   function extractFontFamily(style) {
//     const fontFamily = style.fontFamily ??
//       Object.entries(style).find(([k]) => k.endsWith('FontFamily'))?.[1];
//     return fontFamily.split(',')[0].trim().replace(/['"]/g, '');
//   }

//   //adds a fonts.googleapis.com/css2 import to the styleSheet if needed for the fontFamily
//   async function patchFontFamilyIfNeeded(styleSheet, family) {
//     await document.fonts.ready();
//     if (document.fonts.check(family))
//       return;
//     family = `@import url('https://fonts.googleapis.com/css2?display=swap&family=${family.replace(/ /g, '+')}');`;
//     styleSheet.insertRule(familyImport, 1); //1 is the first @import; 0 is the @layer; rule
//   }


//   //ho function that returns undefined if the same result has already been given before
//   function onlyOnce(fn) {
//     const done = new Set();
//     return function onlyOnce(...args) {
//       const res = fn(...args);
//       if (done.has(res)) return undefined;
//       done.add(res);
//       return res;
//     };
//   }

//   let shorts;      //list of shorts to parse and check.
//   let styleSheet; // the stylesheet that is used to check for font patches.

//   const familyExtractor = onlyOnce(extractFontFamily);
//   for (let short of shorts) {
//     const { full, body } = CSSS.parser(short);
//     styleSheet.insertRule(full, styleSheet.cssRules.length);
//     //the rule is now added, and the browser will try to load the font. async.
//     const family = familyExtractor(body);
//     if (family) //first and only time we encounter a new fontFamily
//       patchFontImports(styleSheet, family);
//   }
// });

export { TYPES, extractShort, extractShortSelector, memoize, parse, removeUnusedShorts, sequence, updateClassList, updateStyleText };
//# sourceMappingURL=csss.js.map
