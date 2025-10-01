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
    else if (a.type == "number")
      nums.push(a.num);
    else if (a.unit == (firstUnit ??= a.unit))
      nums.push(a.num);
    else if (FACTORS[firstUnit + "_ " + a.type])
      nums.push(a.num * FACTORS[firstUnit + "_ " + a.type]);
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
const round$1 = Math.round;
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
  for (let a of args)
    if (a.type != args[0].type)
      throw `Incompatible type differences: ${first.text} vs ${a.text}`;
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
//POSTS
function toNumber(num, a) { return { type: "number", unit: "", num, text: num }; }
function toAngle(num, a) { return { type: "angle", unit: "rad", num, text: num }; }
function updateFirst(num, a) { return { ...a, num, text: num + a.unit }; }
//TEXTERS
function texter(name, args) { return `${name}(${args.map(a => a.text).join(", ")})`; }

function doMath(check, func, post, texter, name, args) {
  check(args);
  const nums = computableNumbers(args);
  return nums ?
    post(func(...nums), args[0]) :
    { type: args[0].type, text: texter(args.map(a => a.text), name) };
}

var Maths = {
  "-": doMath.bind(null, sameType, minus, updateFirst, txts => `calc(${txts.join(" - ")})`),
  "+": doMath.bind(null, sameType, plus, updateFirst, txts => `calc(${txts.join(" + ")})`),
  "*": doMath.bind(null, onlyOneArgWithUnit, multi, updateFirst, txts => `calc(${txts.join(" * ")})`),
  "/": doMath.bind(null, illegalDividend, divide, updateFirst, txts => `calc(${txts.join(" / ")})`),
  "**": doMath.bind(null, secondArgumentIsNumber, pow, updateFirst, texter.bind(null, "pow")),
  mod: doMath.bind(null, illegalDividend, mod, updateFirst, texter.bind(null, "mod")),
  rem: doMath.bind(null, illegalDividend, rem, updateFirst, texter.bind(null, "rem")),
  clamp: doMath.bind(null, sameType, clamp, updateFirst, texter.bind(null, "clamp")),
  min: doMath.bind(null, sameType, min, updateFirst, texter.bind(null, "min")),
  max: doMath.bind(null, sameType, max, updateFirst, texter.bind(null, "max")),
  round: doMath.bind(null, singleArgumentOnly, round$1, updateFirst, texter.bind(null, "round")),
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
  args = args.map(a => interpretColor(a) ?? interpretBasic$1(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  return `${name}(${txts.join(" ")})`;
}

function nativeCssColorSpaceFunction(space, args) {
  if (args.length < 3 || args.length > 5)
    throw new SyntaxError(`color() accepts only 3 to 5 arguments: ${args}`);
  args = args.map(a => interpretColor(a) ?? interpretBasic$1(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  txts.unshift(space);
  return `color(${txts.join(" ")})`;
}

function cssColorMix([space, one, two, percent]) {
  space = space == "_" ? "oklab" : interpretBasic$1(space).text;
  one = interpretColor(one).text;
  two = interpretColor(two).text;
  two += " " + (percent ? interpretBasic$1(percent).text : "50%");
  return `color-mix(in ${[space, one, two].join(", ")})`;
}

//#123 => hash(123) => #123
//#primary#30 => hash(primary,30)
//#primary#30#a80 => hash(primary,30,a80)
//#primary#brown33#50
function hash(oneTwo) {
  let [one, two] = oneTwo.map(interpretColor);
  if (two.vector == "") {
    let left = oneTwo[0], i = 1;
    while (left.name === "#hash") {
      left = left.args[0];
      i++;
    }
    const vector = left.kind == "COLOR" && interpretColor(left).vector;
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
  rgba = rgba.map(interpretBasic$1);
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
    "([0-9a-fA-F]{3})([0-9a-fA-F])",
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




function toRadiusFour(NAME, ar) {
  ar = ar.map(interpretBasic$1).map(a => a.text);
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

function toLogicalFour(NAME, ar) {
  ar = ar.map(interpretBasic$1).map(a => a.text);
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
  ar = ar.map(interpretBasic$1).map(a => a.text);
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

// const NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;
// const NativeCssScopeAttrCounter = {
//   counter: (...args) => `counter(${args.join(",")})`,
//   counters: (...args) => `counters(${args.join(",")})`,
//   attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
// };

function interpretBasic$1(arg) {
  if (arg.kind !== "EXP")
    return arg;
  if (arg.name in Maths)
    return Maths[arg.name](arg.name, arg.args.map(interpretBasic$1));
}
function interpretName(arg) {
  if (arg.kind === "WORD" && arg.text[0].match(/[a-zA-Z0-9-]/))
    return arg;
}
function interpretColor(a) {
  if (a.kind === "COLOR")
    return parseColor(a.text);
  //todo the color must be a color or a variable.
  const key = a.name?.slice(1);
  if (key in COLORS)
    return { type: "color", text: COLORS[a.name?.slice(1)]?.(a.args) };
}
function interpretMinmax(a) {
  if (a.name === "minmax")
    return { type: "length", text: `minmax(${a.args.map(interpretBasic$1).map(t => t.text).join(", ")})` };
}
function interpretRepeat(a) {
  if (a.name === "repeat")
    return { type: "length", text: `repeat(${a.args.map(a => interpretMinmax(a) ?? interpretBasic$1(a)).map(t => t.text).join(", ")})` };
}
function interpretSpan(a) {
  if (a.name === "span")
    return { type: a.type, text: "span " + interpretBasic$1(a.args[0]).text };
}
function interpretUrl(a) {
  if (a.kind === "QUOTE")
    return { type: "url", text: `url(${a.text})` };
  if (a.name === "url") {
    if (args.length != 1) throw new SyntaxError("url() requires exactly one argument.");
    return { type: "url", text: `url(${interpretBasic$1(a.args[0]).text})` };
  }
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
  const url = interpretUrl(arg);
  if (url) return url;
  if (arg.name == "imageSet") {
    const set = [];
    const args = arg.args.slice();
    while (args.length) {
      const url = interpretUrl(a);
      if (!url)
        throw new SyntaxError("imageSet() sequences must start with a url.");
      args.shift();
      let type = args.length && interpretMimeType(args[0]);
      let resolution = args.length && interpretResolution(args[0]);
      type ||= args.length && interpretMimeType(args[0]);
      type && args.shift();
      resolution && args.shift();
      set.push([url.text, type, resolution].filter(Boolean).join(" "));
    }
    return `image-set(${set.join(", ")})`;
  }
}

function interpretAngle(a) {
  a = interpretBasic$1(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle")
    return a;
}
function interpretAnglePercent(a) {
  a = interpretBasic$1(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle" || a?.type === "percent")
    return a;
}
function interpretLengthPercent(a) {
  a = interpretBasic$1(a);
  if (a?.type === "length" || a?.type === "percent" || (a?.num == 0 && a?.type === "number"))
    return a;
}
function interpretPercent(a) {
  a = interpretBasic$1(a);
  if (a?.type === "percent")
    return a;
}
function interpretZero(a) {
  a = interpretBasic$1(a);
  if (a?.text === "0")
    return a;
}
function interpretLength(a) {
  a = interpretBasic$1(a);
  if (a?.type === "length" || (a?.num == 0 && a?.type === "number"))
    return a;
}
function interpretTime(a) {
  a = interpretBasic$1(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "time", text: "0s", unit: "s", num: 0 };
  if (a?.type === "time")
    return a;
}
function interpretResolution(a) {
  a = interpretBasic$1(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "resolution", text: "0x", unit: "x", num: 0 };
  if (a?.type === "resolution")
    return a;
}
function interpretNumber(a) {
  a = interpretBasic$1(a);
  if (a?.type === "number" && a.unit == "")
    return a;
}
function interpretNumberPercent(a) {
  a = interpretBasic$1(a);
  if (a?.type === "number" && a.unit == "" || a?.type === "percent")
    return a;
}
function interpretQuote(a) {
  if (a.kind === "QUOTE")
    return a;
}
function makeExtractor(cb) {
  return function (args) {
    if (!args?.length) return;
    const res = cb(args[0]);
    return res != null && args.shift() && res.text;
  };
}
const extractTime = makeExtractor(interpretTime);
const extractLength = makeExtractor(interpretLength);
const extractLengthPercent = makeExtractor(interpretLengthPercent);
const extractAngle = makeExtractor(interpretAngle);
const extractAnglePercent = makeExtractor(interpretAnglePercent);
const extractNumber$1 = makeExtractor(interpretNumber);
const extractNumberPercent = makeExtractor(interpretNumberPercent);
const extractUrl = makeExtractor(interpretUrl);
const extractImage = makeExtractor(interpretImage);
const extractMimeType = makeExtractor(interpretMimeType);
const extractColor = makeExtractor(interpretColor);
const extractName = makeExtractor(interpretName);

function makeEvaluator(interpret) {
  return function (a, i) {
    const a2 = interpret(a);
    if (a2)
      return a2.text;
    throw new SyntaxError(`invalid argument ${i + 1}: "${a.text}" cannot be interpreted as ${interpret.name.slice(9)}.`);
  }
}
const evaluateTime = makeEvaluator(interpretTime);
const evaluateLength = makeEvaluator(interpretLength);
const evaluateLengthPercent = makeEvaluator(interpretLengthPercent);
const evaluateAngle = makeEvaluator(interpretAngle);
const evaluateAnglePercent = makeEvaluator(interpretAnglePercent);
const evaluateNumber = makeEvaluator(interpretNumber);
const evaluateNumberPercent = makeEvaluator(interpretNumberPercent);
const evaluateUrl = makeEvaluator(interpretUrl);
const evaluateImage = makeEvaluator(interpretImage);
const evaluateMimeType = makeEvaluator(interpretMimeType);
const evaluateColor = makeEvaluator(interpretColor);
const evaluateName = makeEvaluator(interpretName);

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   //todo handle as css vars.
//    path: (...args) => `path(${args.join(",")})`,
//    imageSet: (...args) => `image-set(${args.join(",")})`,
// };

const INTERPRETERS = {
  number: interpretNumber,
  zero: interpretZero,
  length: interpretLength,
  percent: interpretPercent,
  angle: interpretAngle,
  time: interpretTime,
  resolution: interpretResolution,
  color: interpretColor,
  url: interpretUrl,
  repeat: interpretRepeat,
  minmax: interpretMinmax,
  span: interpretSpan,
  image: interpretImage,
  quote: interpretQuote,
  basic: interpretBasic$1,
};

const NativeCssProperties = Object.fromEntries(Object.entries(NativeCss.supported).map(([kebab, types]) => {
  let camel = kebab.replace(/-([a-z])/g, g => g[1].toUpperCase());
  function fixBorderNames(originalCamel) {
    const m = originalCamel.match(/^(border)(.+)(Style|Width|Color|Radius)$/);
    return m ? m[1] + m[3] + m[2] : originalCamel;
  }
  camel = fixBorderNames(camel);
  const functions = [interpretBasic$1, ...types.map(t => INTERPRETERS[t]).filter(Boolean)].reverse();

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

function size$1(args) {
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
  size: size$1,
  position: pos.bind(null, "position", null),
  ...POSITIONS_FUNCS,
};

function initiateBackground(argsIn) {
  const res = {
    background: "none",
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

const color = toLogicalFour.bind(null, "borderColor");
const width = toLogicalFour.bind(null, "borderWidth");
const radius = toRadiusFour.bind(null, "borderRadius");
const radius8 = toLogicalEight.bind(null, "borderRadius", 0);
const BORDER = {
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
  width,
  w: width,
  radius,
  r: radius,
  radius8,
  r8: radius8,
  color,
  c: color,
};

//border: 2px 4px solid red blue;
//$border(w(2px,4px),solid,c(red,blue))
//$border(2px,solid,red)
function border(ar) {
  ar = ar.map(a => {
    a = BORDER[a.name]?.(a.args) ??
      BORDER[a.text] ??
      interpretColor(a) ??
      interpretBasic$1(a);
    if (!a)
      throw new SyntaxError(`Could not interpret $border argument: ${a.text}.`);
    if (a.type == "color")
      return { borderColor: a.text };
    if (a.type == "length")
      return { borderWidth: a.text };
    return a;
  });
  return Object.assign({ borderStyle: "solid" }, ...ar);
}

var border$1 = {
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
  //todo so many, make more that we should block.
  border,
  noBorder: { border: "none" },
};

const FONT_WORDS = {
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

  condensed: { fontStretch: "condensed" },
  expanded: { fontStretch: "expanded" },
  semiCondensed: { fontStretch: "semi-condensed" },
  semiExpanded: { fontStretch: "semi-expanded" },
  extraCondensed: { fontStretch: "extra-condensed" },
  extraExpanded: { fontStretch: "extra-expanded" },
  ultraCondensed: { fontStretch: "ultra-condensed" },
  ultraExpanded: { fontStretch: "ultra-expanded" },
  noStretch: { fontStretch: "normal" },

  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },

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
};

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

function featureAndVariation(args) {
  return args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");
}

//$typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
const FACE = {
  feature: args => ({ fontFeatureSettings: featureAndVariation(args) }),
  variation: args => ({ fontVariationSettings: featureAndVariation(args) }),
  i: { fontStyle: "italic" },
  italic: { fontStyle: "italic" },
  ital: { fontStyle: "italic" },
};

function face(args, fontFamily) {
  let src = extractUrl(args);
  if (!src)
    throw new SyntaxError(`The first argument of face(...) must be a quote or a URL, but got: ${args[0]}`);
  const res = {
    fontFamily: fontFamily ??= src.slice(4, -1),
    fontStyle: "normal",
    src: `local(${fontFamily}), ${src}`,
  };
  for (let a of args) {
    const a2 = FACE[a.name] ?? FACE[a.text];
    if (a2) Object.assign(res, a2);
    throw new SyntaxError(`Unrecognized font face argument: ${a}`);
  }
  return { [`@fontFace /*${res.fontFamily} ${res.fontStyle}*/`]: res };
}

const FONT_FUNCTIONS = {
  size: a => ({ fontSize: interpretLength(a) }),
  // weight: a => ({ fontWeight: interpretNumber(a) }), //todo this should be primitive
  // style: a => ({ fontStyle: interpretWord(a) }), //todo this should not be allowed to be wrapped??
  variant: a => ({ fontVariant: interpretBasic(a) }),
  stretch: a => ({ fontStretch: interpretBasic(a) }),
  spacing: a => ({ letterSpacing: interpretBasic(a) }),
  adjust: a => ({ fontSizeAdjust: interpretBasic(a) }),
};


const FONT_DEFAULTS = Object.entries({
  fontFamily: "FontFamily",
  fontSize: "FontSize",
  fontStyle: "FontStyle",
  fontWeight: "FontWeight",
  fontSizeAdjust: "FontSizeAdjust",
  letterSpacing: "LetterSpacing",
  fontStretch: "FontStretch",
  fontVariantCaps: "FontVariantCaps",
  fontSynthesis: "FontSynthesis",
  fontFeatureSettings: "FontFeatureSettings",
  fontVariationSettings: "FontVariationSettings",
  WebkitFontSmoothing: "WebkitFontSmoothing",
  MozOsxFontSmoothing: "MozOsxFontSmoothing",
  fontKerning: "FontKerning",
});


//first have a function that extracts all the nonFamily 
function fontImpl(fontFaceName, args) {
  let res = {}, family = [], emoji;
  for (let a of args) {
    let a2;
    if (a.text == "emoji")
      emoji = ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'];
    else if (a2 = interpretQuote(a))
      family.push(a2.text.slice(1, -1).replaceAll("+", " "));
    else if (a2 = interpretLength(a))
      res.fontSize = a2.text;
    else if (a2 = interpretAngle(a))
      res.fontStyle = "oblique " + a2.text;
    else if (a2 = FONT_WORDS[a.text] ?? FONT_FUNCTIONS[a.name]?.(a.args) ?? SYNTHESIS_WORDS[a.text])
      Object.assign(res, a2);
    else if (a.kind == "WORD")
      family.push(a.text);
    else if (a.name == "face" && (a2 = face(a.args, fontFaceName))) {
      Object.assign(res, a2);
      family.push(Object.values(a2)[0].fontFamily);
    } else if (a2 = interpretNumber(a)?.num) {
      if (a2 && 1 <= a2 && a2 <= 1000)
        res.fontWeight = a2;
      else if (0 < a2 && a2 < 1)
        res.fontSizeAdjust = a2;
      else
        throw new SyntaxError(`Unrecognized $font number (0.01-0.99 ): ${a2}`);
    } else
      throw new SyntaxError(`Unrecognized $font argument: ${a}`);
  }
  if (emoji)
    family.push(...emoji);
  if (!family.length)
    throw new SyntaxError(`No font family specified in $font: ${args}`);
  res.fontFamily = family.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
  return res;
}

//100%lob
//$font("company orange",grotesque)
//  <h1 $bold>
//  <div $italic ...>
//    <p   
//    <p $font>  //resets to last known font

//lob -1, but with 4 token exact reference for portal. $type(name
//$typeface(flow,"company orange",grotesque,condensed,italic,-10deg,uppercase,spacing(-3),700)
//$typeface(flow)
//   $bold
//      $type

//$type(name,...args) => creates a type with the given name and properties.
//$type(name) => uses a type and sets the font properties to the type's properties.

const BUILTIN_TYPES = {
  transitional: { fontFamily: "Charter,'Bitstream Charter','Sitka Text',Cambria,serif" },
  oldStyle: { fontFamily: "'Iowan Old Style','Palatino Linotype','URW Palladio L',P052,serif" },
  humanist: { fontFamily: "Seravek,'Gill Sans Nova',Ubuntu,Calibri,'DejaVu Sans',source-sans-pro,sans-serif" },
  geometricHumanist: { fontFamily: "Avenir,Montserrat,Corbel,'URW Gothic',source-sans-pro,sans-serif" },
  classicalHumanist: { fontFamily: "Optima,Candara,'Noto Sans',sans-serif" },
  neoGrotesque: { fontFamily: "Inter,Roboto,'Helvetica Neue','Arial Nova','Nimbus Sans',Arial,sans-serif" },
  monospaceSlabSerif: { fontFamily: "'Nimbus Mono PS','Courier New',monospace,", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  monospaceCode: { fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,'DejaVu Sans Mono',monospace" },
  industrial: { fontFamily: "Bahnschrift,'DIN Alternate','Franklin Gothic Medium','Nimbus Sans Narrow',sans-serif-condensed,sans-serif" },
  roundedSans: { fontFamily: "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif" },
  slabSerif: {
    "@fontFace": { fontFamily: "Rockwell,", src: "local('Rockwell')", ascentOverride: "100%" },
    fontFamily: "Rockwell,'Rockwell Nova','Roboto Slab','DejaVu Serif','Sitka Small',serif",
  },
  antique: { fontFamily: "Superclarendon,'Bookman Old Style','URW Bookman','URW Bookman L','Georgia Pro',Georgia,serif" },
  didone: { fontFamily: "Didot,'Bodoni MT','Noto Serif Display','URW Palladio L',P052,Sylfaen,serif", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  handwritten: { fontFamily: "'Segoe Print','Bradley Hand',Chilanka,TSCu_Comic,casual,cursive" },
};

// todo should we add extra requirements for the typeName? say it can only be of specific characters?
// typeName.match(/^[a-z][a-z0-9-]*$/))
function font(args) {
  const typeName = interpretName(args[0])?.text;
  if (!typeName)
    throw new SyntaxError(`first argument is not a name: "${args[0].text}"`);
  const tmp = fontImpl(undefined, args);
  const vars = {}, res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    vars["--font" + varKey] = (res[k] = tmp[k] ?? `var(--${typeName + varKey}, unset)`);
  return { ...res, ...vars };
}

function typeFace(args) {
  const typeName = extractName(args);
  if (!typeName)
    throw new SyntaxError(`first argument is not a name: "${args[0].text}"`);
  const tmp = fontImpl(typeName, args);
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    res[`--${typeName + varKey}`] = tmp[k] ?? undefined;
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}

var fonts = {
  font,
  typeface: typeFace,

  //droplets
  fontFamily: a => ({ [p]: a == "unset" ? `var(--fontFamily, unset)` : a }),
  fontStyle: a => ({ [p]: a == "unset" ? `var(--fontStyle, unset)` : a }),
  fontWeight: a => ({ [p]: a == "unset" ? `var(--fontWeight, unset)` : a }),
  fontVariantCaps: a => ({ [p]: a == "unset" ? `var(--fontVariantCaps, unset)` : a }),
  fontStretch: a => ({ [p]: a == "unset" ? `var(--fontStretch, unset)` : a }),
  fontSynthesis: a => ({ [p]: a == "unset" ? `var(--fontSynthesis, unset)` : a }),
  fontSizeAdjust: a => ({ [p]: a == "unset" ? `var(--fontSizeAdjust, unset)` : a }),
  letterSpacing: a => ({ [p]: a == "unset" ? `var(--letterSpacing, unset)` : a }),

  //global font words
  // bold: { fontWeight: "bold" },
  // bolder: { fontWeight: "bolder" },
  // lighter: { fontWeight: "lighter" },
  // italic: { fontStyle: "italic" },
  // smallCaps: { fontVariantCaps: "small-caps" },
  // allSmallCaps: { fontVariantCaps: "all-small-caps" },
  // petiteCaps: { fontVariantCaps: "petite-caps" },
  // allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  // unicase: { fontVariantCaps: "unicase" },
  // titlingCaps: { fontVariantCaps: "titling-caps" },
  // condensed: { Stretch: "condensed" },
  // expanded: { Stretch: "expanded" },
  // semiCondensed: { Stretch: "semi-condensed" },
  // semiExpanded: { Stretch: "semi-expanded" },
  // extraCondensed: { Stretch: "extra-condensed" },
  // extraExpanded: { Stretch: "extra-expanded" },
  // ultraCondensed: { Stretch: "ultra-condensed" },
  // ultraExpanded: { Stretch: "ultra-expanded" },
  // kerning: { fontKerning: "normal" },
  // noKerning: { fontKerning: "none" },
};


const BUILTIN_TYPES2 = {
  transitional: {
    fontFamilyPlus: "Charter ~0.50 SafariOld, 'Bitstream Charter' ~0.50, 'Sitka Text' ~0.52, Cambria 0.466, serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
  },

  oldStyle: {
    fontFamilyPlus: "'Iowan Old Style' ~0.52 SafariOld, 'Palatino Linotype' ~0.47, 'URW Palladio L' ~0.47, P052 ~0.47, serif",
    fontSizeAdjust: 0.47,
    fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
  },

  humanist: {
    fontFamilyPlus: "Seravek ~0.52 SafariOld, 'Gill Sans Nova' ~0.48, Ubuntu ~0.53, Calibri 0.466, 'DejaVu Sans' ~0.53, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.53,
    fontFamily: "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  },

  geometricHumanist: {
    fontFamilyPlus: "Avenir ~0.52 SafariOld, Montserrat ~0.52, Corbel ~0.47, 'URW Gothic' ~0.48, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  },

  classicalHumanist: {
    fontFamilyPlus: "Optima ~0.48 SafariOld, Candara 0.463, 'Noto Sans' ~0.53, sans-serif",
    fontSizeAdjust: 0.48,
    fontFamily: "Optima, Candara, 'Noto Sans', sans-serif",
  },

  neoGrotesque: {
    fontFamilyPlus: "Inter ~0.55, Roboto 0.528, 'Helvetica Neue' 0.523 SafariOld, 'Arial Nova' ~0.519, 'Nimbus Sans' ~0.523, Arial 0.519, sans-serif",
    fontSizeAdjust: 0.528,
    fontFamily: "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  },

  monospaceSlabSerif: {
    fontFamilyPlus: "'Nimbus Mono PS' 0.425, 'Courier New' 0.423, monospace",
    fontSizeAdjust: 0.425,
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },

  monospaceCode: {
    fontFamilyPlus: "ui-monospace, 'Cascadia Code' ~0.54, 'Source Code Pro' ~0.53, Menlo ~0.50 SafariOld, Consolas ~0.49, 'DejaVu Sans Mono' ~0.49, monospace",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  },

  industrial: {
    fontFamilyPlus: "Bahnschrift ~0.50, 'DIN Alternate' ~0.47 SafariOld, 'Franklin Gothic Medium' ~0.52, 'Nimbus Sans Narrow' ~0.523, sans-serif-condensed, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
  },

  roundedSans: {
    fontFamilyPlus: "ui-rounded, 'Hiragino Maru Gothic ProN' ~0.50 SafariOld, Quicksand ~0.53, Comfortaa ~0.50, Manjari ~0.52, 'Arial Rounded MT' ~0.519, 'Arial Rounded MT Bold' ~0.519, Calibri 0.466, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
  },

  slabSerif: {
    fontFamilyPlus: "Rockwell ~0.46, 'Rockwell Nova' ~0.46, 'Roboto Slab' ~0.52, 'DejaVu Serif' ~0.46, 'Sitka Small' ~0.56, serif",
    fontSizeAdjust: 0.46,
    fontFamily: "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
    "@fontFace": { fontFamily: "Rockwell", src: "local('Rockwell')", ascentOverride: "100%" },
  },

  antique: {
    fontFamilyPlus: "Superclarendon ~0.47 SafariOld, 'Bookman Old Style' ~0.50, 'URW Bookman' ~0.50, 'URW Bookman L' ~0.50, 'Georgia Pro' 0.481, Georgia 0.481, serif",
  },

  didone: {
    fontFamilyPlus: "Didot ~0.42 SafariOld, 'Bodoni MT' ~0.40, 'Noto Serif Display' ~0.45, 'URW Palladio L' ~0.47, P052 ~0.47, Sylfaen ~0.46, serif",
  },

  handwritten: {
    fontFamilyPlus: "'Segoe Print' ~0.53, 'Bradley Hand' ~0.53 SafariOld, Chilanka ~0.52, TSCu_Comic ~0.50, casual, cursive",
  },
};

function toSize(NAME, args) {
  if (args.length != 1 && args.length != 3)
    throw new SyntaxError(`$${NAME}() accepts only 1 or 3 arguments, got ${args.length}.`);
  args = args.map(a =>
    a.text == "_" ? "unset" :
      interpretBasic$1(a).text
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

function size(args) {
  if (args.length == 1)
    return toSize("inlineSize", args);
  if (args.length == 2)
    return {
      ...toSize("inlineSize", [args[0]]),
      ...toSize("blockSize", [args[1]])
    };
  if (args.length == 6)
    return {
      ...toSize("inlineSize", args.slice(0, 3)),
      ...toSize("blockSize", args.slice(3))
    };
  throw new SyntaxError(`$size() accepts only 1, 2 or 4 arguments, got ${args.length}.`);
}

//todo turn this into memory thing. same with O2
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
    textAlign: makePlaceAligns("textAlign", "text", "Normal|Start|End|Center|Justify|Left|Right"),
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

function checkUndefined(funcName, argsIn, argsOut) {
  for (let i = 0; i < argsIn.length; i++)
    if (argsOut[i] === undefined)
      throw new ReferenceError(`$${funcName}() cannot process ${argsIn[i].name}.`);
}

//todo rename this to container() and then do block, grid, flex as the two options.
//todo the question is if this will be recognized by the llm..
//they put lineHeight with font. This is wrong.. It will influence layout and doesn't influence font.
//so it should be with layout.
//todo rename the text block layout unit to $page
function defaultContainer(obj, argsIn, argsOut) {
  const containerDefaults = {
    wordSpacing: "unset",
    lineHeight: "unset",
    whiteSpace: "unset",
    hyphens: "unset",
    textAlign: "unset",
    textIndent: "unset",
  };
  checkUndefined(obj.display, argsIn, argsOut);
  return Object.assign(obj, containerDefaults, ...argsOut);
}

function defaultItem(name, argsIn, argsOut) {
  checkUndefined(name, argsIn, argsOut);
  return Object.assign({}, ...argsOut);
}

const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
  ...ALIGNMENTS.textAlign,
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  nowrap: { whiteSpace: "nowrap" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  pre: { whiteSpace: "pre" },
  breakSpaces: { whiteSpace: "break-spaces" },
  ellipsis: { whiteSpace: "nowrap", textOverflow: "ellipsis" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textIndent: nativeAndMore.textIndent,
  indent: nativeAndMore.textIndent,
  inlineSize: toSize.bind(null, "inlineSize"), //todo should we block this?
  blockSize: toSize.bind(null, "blockSize"),   //todo should we block this?
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

function gap(args) {
  if (!args.length || args.length > 2)
    throw new SyntaxError("gap only accepts 1 or 2 arguments");
  args = args.map(interpretBasic$1).map(a => a.text);
  if (args.length == 1 || args[0] == args[1])
    return { gap: args[0] };
  args = args.map(a => a == "unset" ? "normal" : a);
  return { gap: args[0] + " " + args[1] };
}

//todo rename this to space() and then do block, inline as the two options.
//todo the question is if this will be recognized by the llm..
//they put lineHeight with font. This is wrong.. It will influence layout and doesn't influence font.
//so it should be with layout.
function blockGap(args) {
  const [wordSpacing, lineHeight] = args.map(interpretBasic$1).map(a => a.text);
  return { wordSpacing, lineHeight };
}
const BLOCK = {
  ...LAYOUT,
  ...OVERFLOWS,
  gap: blockGap,
};
const BlockItem = {
  ..._LAYOUT,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
};

function block(args) {
  const args2 = args.map(a => BLOCK[a.name]?.(a.args) ?? BLOCK[a.text]);
  return defaultContainer({ display: "block" }, args, args2);
}

function blockItem(argsIn) {
  const argsOut = argsIn.map(a => BlockItem[a.name]?.(a.args) ?? BlockItem[a.text]);
  return defaultItem("blockItem", argsIn, argsOut);
}

function lineClamp([lines, ...args]) {
  lines = interpretBasic$1(lines);
  if (lines.type != "number")
    throw new SyntaxError(`$lineClamp() first argument must be a simple number, got ${lines}.`);
  return Object.assign(block(args), {
    display: "-webkit-box",
    WebkitLineClamp: lines.num,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden"
  });
}

const GRID = {
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
  cols: args => ({ gridTemplateColumns: args.map(a => interpretRepeat(a) ?? interpretBasic$1(a)).map(a => a.text).join(" ") }),
  columns: args => ({ gridTemplateColumns: args.map(a => interpretRepeat(a) ?? interpretBasic$1(a)).map(a => a.text).join(" ") }),
  rows: args => ({ gridTemplateRows: args.map(a => interpretRepeat(a) ?? interpretBasic$1(a)).map(a => a.text).join(" ") }),
  areas: args => ({ gridTemplateAreas: args.map(a => interpretRepeat(a) ?? interpretBasic$1(a)).map(a => a.text).join(" ") }),
  ...LAYOUT,
  gap,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

function grid(argsIn) {
  const argsOut = argsIn.map(a => GRID[a.name]?.(a.args) ?? GRID[a.text]);
  return defaultContainer({ display: "grid", placeItems: "unset", placeContent: "unset" }, argsIn, argsOut);
}

//       1  2345   6789
// $grid(col(1,span(3))) => "{ gridColumn: 1 / span 3 }"
//
// $grid(colStartEnd(1,3)) => "{ gridColumn: 1 / 3 }"
// $grid(colSpan(1,3)) => "{ gridColumn: 1 / span 3 }"
//       1     2345   6
// $grid(column_1_span3) => "{ gridColumn: 1 / span 3 }"

// $flex

// $grid(col(1,4))
// $grid(col_1_4)
const column = args => {
  const [start, end] = args.map(a => interpretSpan(a) ?? interpretBasic$1(a)).map(a => a.text);
  return { gridColumn: end ? `${start} / ${end}` : start };
};
const row = args => {
  const [start, end] = args.map(a => interpretSpan(a) ?? interpretBasic$1(a)).map(a => a.text);
  return { gridRow: end ? `${start} / ${end}` : start };
};

const GridItem = {
  ...ALIGNMENTS.placeSelf,
  ..._LAYOUT,
  column,
  row,
};
function gridItem(argsIn) {
  const argsOut = argsIn.map(a => GridItem[a.name]?.(a.args) ?? GridItem[a.text]);
  return defaultItem("gridItem", argsIn, argsOut);
}

const FLEX = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...LAYOUT,
  gap,
};

function flex(argsIn) {
  const argsOut = argsIn.map(a => FLEX[a.name]?.(a.args) ?? FLEX[a.text]);
  return defaultContainer({ display: "flex", alignItems: "unset", placeContent: "unset" }, argsIn, argsOut);
}
const FlexItem = {
  ..._LAYOUT,
  ...ALIGNMENTS.alignSelf,
  basis: args => ({ flexBasis: args.map(interpretBasic$1).map(a => a.text).join(" ") }),
  grow: args => ({ flexGrow: args.map(interpretBasic$1).map(a => a.text).join(" ") }),
  shrink: args => ({ flexShrink: args.map(interpretBasic$1).map(a => a.text).join(" ") }),
  order: args => ({ order: args.map(interpretBasic$1).map(a => a.text).join(" ") }),
  //todo safe
};

function flexItem(argsIn) {
  const argsOut = argsIn.map(a => FlexItem[a.name]?.(a.args) ?? FlexItem[a.text]);
  return defaultItem("flexItem", argsIn, argsOut);
}

var layouts = {
  order: undefined,
  float: undefined,
  gap: undefined,
  margin: undefined, //_LAYOUT.margin, 
  padding: undefined,// LAYOUT.padding,
  width: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  height: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  inlinseSize: undefined,
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
  textAlign: undefined,
  //we want to block *all* that are used here!

  block,
  blockItem,
  grid,
  gridItem,
  flex,
  flexItem,
  lineClamp,
  hide: _ => ({ display: "none" }),
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

function round(num, places = 2) {
  const m = 10 ** places;
  return Math.round(num * m) / m;
}

function palette([role, ...colors]) {
  if (!role || colors.length < 2)
    throw "palette() requires role and at least two colors as parameters";
  if (role.kind !== "WORD")
    throw "First parameter must be a simple word";
  role = `--color-${role.text}`;

  colors = colors.map((color, i) => {
    color = interpretColor(color);
    if (!color) throw `Parameter ${i + 2} is not a valid color`;
    if (!color.hex) throw `Parameter ${i + 2} is not a primitive color`;
    i ||= "";
    let { L, C, H } = fromHex6(color.hex, color.percent);
    if (C == 0)
      throw new SyntaxError(`Cannot create palette from achromatic color: ${color.text}`);
    L = round(L, 3);
    H = Math.round(H);
    const pop = fromLCH(L, round((.5 - C) * .5 + C, 3), H);
    const accent = fromLCH(L, round((.5 - C) * .7 + C, 3), H);
    const bland = fromLCH(L, round(C * .5, 3), H);
    const neutral = fromLCH(L, 0, H);
    return {
      [role + i]: color.text,
      [role + "Pop" + i]: "#" + pop.hex6,
      [role + "Accent" + i]: "#" + accent.hex6,
      [role + "Bland" + i]: "#" + bland.hex6,
      [role + "Neutral" + i]: "#" + neutral.hex6,
    };
  });
  return Object.assign({}, ...colors);
}

var palette$1 = {
  palette
};

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
const backInEaseOut$1 = cssLinear(inverse(_easeBack));
const easeInBackOut$1 = cssLinear(_easeBack);
const backInOut$1 = cssLinear(join(
  sineWaveEase(1, .14, 20).reverse(),
  line(20),
  sineWaveEase(1, .14, 20).map(y => 1 - y)
));

const _easeInBounceOut = join(cubicBezier(BEZIER.easeIn, 70), bounce(3, .18, 0.33, 40).map(y => 1 - y));
const easeInBounceOut$1 = cssLinear(_easeInBounceOut);
const bounceInEaseOut$1 = cssLinear(inverse(_easeInBounceOut));
const _bounceInOut = join(
  bounce(3.5, .5, 0.6, 60).reverse(),
  bounce(3.5, .5, 0.6, 60).map(y => 1 - y)
);
const bounceInOut$1 = cssLinear(_bounceInOut);
const _easeInSpringOut = join(
  cubicBezier(BEZIER.easeIn, 70),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
);
const easeInSpringOut$1 = cssLinear(_easeInSpringOut);
const springInEaseOut$1 = cssLinear(inverse(_easeInSpringOut));
const springInOut$1 = cssLinear(join(
  sineWaveEase(2, .1, 40).reverse(),
  line(40),
  sineWaveEase(2, .1, 40).map(y => 1 - y)
));
const wobble$1 = cssLinear(join(
  sineWave(2, .1, 60).reverse().map((y, i) => y + i / 120),
  sineWave(2, .1, 60).map((y, i) => 1 - y - (60 - i) / 120)
));

//ease is defined in native css as accelerating and decelerating.
//crisp means that it starts or ends quickly, but not both.
//harsh means that it starts or ends very quickly, but not both.
//playful means that it overshoots either coming in, going out, or both.
//bounce means that it overshoots more than playful, either coming in, going out, or both.
//hesitate means that it goes forward, then pauses, then forward again. 
//wiggle means that it goes forward, then backtracks a little, then forward again.
//wobble means that it goes forward, then backtracks a fully, then forward again, then backtracks a little, then forward again.


function transition(timing, args) {
  const dur = extractTime(args);
  const delay = extractTime(args);
  const settings = [dur, delay].filter(Boolean);
  const props = [];
  let a2;
  for (let a of args)
    if (a.text == "allowDiscrete") settings.push("allow-discrete");
    else if (a2 = interpretName(a)) props.push(a.text);
    else throw new SyntaxError(`Not a valid $transition property: ${a.text}.`);
  const _var = props.length > 1 ? timing : undefined;
  settings.push(props.length > 1 ? "var(--t)" : timing);
  let transition = settings.join(" ");
  if (props.length)
    transition = props.map(p => `${p} ${transition}`).join(", ");
  return { "--t": _var, transition };
}

function jump(type, args) {
  const steps = interpretNumber(args[0])?.num;
  if (steps > 0)
    return transition(`steps(${steps}, ${type})`, args.slice(1));
  throw new SyntaxError(`$jump requires a positive integer argument first.`);
}

function cube(cube, args) { return transition(`cubic-bezier(${cube})`, args); }

const backInEaseOut = transition.bind(null, backInEaseOut$1);
const easeInBackOut = transition.bind(null, easeInBackOut$1);
const backInOut = transition.bind(null, backInOut$1);
const easeInBounceOut = transition.bind(null, easeInBounceOut$1);
const bounceInEaseOut = transition.bind(null, bounceInEaseOut$1);
const bounceInOut = transition.bind(null, bounceInOut$1);
const easeInSpringOut = transition.bind(null, easeInSpringOut$1);
const springInEaseOut = transition.bind(null, springInEaseOut$1);
const springInOut = transition.bind(null, springInOut$1);
const wobble = transition.bind(null, wobble$1);

var transitions = {

  ...undefined,

  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,

  slide: transition.bind(null, "linear"), //this can be empty?
  ease: transition.bind(null, "ease"),
  easeIn: transition.bind(null, "ease-in"),
  easeOut: transition.bind(null, "ease-out"),
  easeInOut: transition.bind(null, "ease-in-out"),

  crisp: cube.bind(null, "0.20,0,0.80,1"),
  crispIn: cube.bind(null, "0.20,0,0.66,1"),
  crispOut: cube.bind(null, "0.35,0,0.80,1"),
  crispInOut: cube.bind(null, "0.20,0,0.80,1"),
  harsh: cube.bind(null, "0.05,0,0.90,1"),
  harshIn: cube.bind(null, "0.05,0,0.66,1"),
  harshOut: cube.bind(null, "0.35,0,0.90,1"),
  harshInOut: cube.bind(null, "0.05,0,0.90,1"),

  backInEaseOut,
  easeInBackOut,
  backInOut,
  easeInBounceOut,
  bounceInEaseOut,
  bounceInOut,
  easeInSpringOut,
  springInEaseOut,
  springInOut,
  wobble,

  transition: ([x1, y1, x2, y2, ...args]) => {
    x1 = extractNumber(x1);
    y1 = extractNumber(y1);
    x2 = extractNumber(x2);
    y2 = extractNumber(y2);
    if (!x1 || !y1 || !x2 || !y2)
      throw new SyntaxError(`$transition (cubic-bezier) requires four number arguments first.`);
    return transition(`cubic-bezier(${x1},${y1},${x2},${y2})`, args.slice(4))
  },
  jump: jump.bind(null, ""), //jumpEnd is default.
  jumpEnd: jump.bind(null, "jump-end"),
  jumpStart: jump.bind(null, "jump-start"),
  jumpNone: jump.bind(null, "jump-none"),
  jumpBoth: jump.bind(null, "jump-both"),
};

//sequence based
function textDecoration(line, style, args) {
  let thick, color, textDecorationSkipInk;
  for (let a of args) {
    let a2;
    if (a2 = interpretColor(a))
      color = a2.text;
    else if (a2 = interpretLength(a))
      thick = a2.text;
    else if (a.text = "noSkipInk")
      textDecorationSkipInk = "none";
    else
      throw new SyntaxError(`Invalid $textDecoration argument: ${a.text}.`);
  }
  return {
    textDecoration: [line, style, color, thick].filter(Boolean).join(" "),
    textDecorationSkipInk,
  };
}

var textDecorations = {
  textDecoration: undefined,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
  noTextDecoration: { textDecoration: "none", textDecorationSkipInk: "none" },
  dashedOverLine: textDecoration.bind(null, "overline", "dashed"),
  dashedOverLineThrough: textDecoration.bind(null, "overline line-through", "dashed"),
  dashedOverUnderLine: textDecoration.bind(null, "overline underline", "dashed"),
  dashedOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "dashed"),
  dashedLineThrough: textDecoration.bind(null, "line-through", "dashed"),
  dashedUnderLine: textDecoration.bind(null, "underline", "dashed"),
  dashedUnderLineThrough: textDecoration.bind(null, "underline line-through", "dashed"),
  dottedOverLine: textDecoration.bind(null, "overline", "dotted"),
  dottedOverLineThrough: textDecoration.bind(null, "overline line-through", "dotted"),
  dottedOverUnderLine: textDecoration.bind(null, "overline underline", "dotted"),
  dottedOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "dotted"),
  dottedLineThrough: textDecoration.bind(null, "line-through", "dotted"),
  dottedUnderLine: textDecoration.bind(null, "underline", "dotted"),
  dottedUnderLineThrough: textDecoration.bind(null, "underline line-through", "dotted"),
  doubleOverLine: textDecoration.bind(null, "overline", "double"),
  doubleOverLineThrough: textDecoration.bind(null, "overline line-through", "double"),
  doubleOverUnderLine: textDecoration.bind(null, "overline underline", "double"),
  doubleOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "double"),
  doubleLineThrough: textDecoration.bind(null, "line-through", "double"),
  doubleUnderLine: textDecoration.bind(null, "underline", "double"),
  doubleUnderLineThrough: textDecoration.bind(null, "underline line-through", "double"),
  wavyOverLine: textDecoration.bind(null, "overline", "wavy"),
  wavyOverLineThrough: textDecoration.bind(null, "overline line-through", "wavy"),
  wavyOverUnderLine: textDecoration.bind(null, "overline underline", "wavy"),
  wavyOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "wavy"),
  wavyLineThrough: textDecoration.bind(null, "line-through", "wavy"),
  wavyUnderLine: textDecoration.bind(null, "underline", "wavy"),
  wavyUnderLineThrough: textDecoration.bind(null, "underline line-through", "wavy"),
  overLine: textDecoration.bind(null, "overline", null),
  overLineThrough: textDecoration.bind(null, "overline line-through", null),
  overUnderLine: textDecoration.bind(null, "overline underline", null),
  overUnderLineThrough: textDecoration.bind(null, "overline underline line-through", null),
  lineThrough: textDecoration.bind(null, "line-through", null),
  underLine: textDecoration.bind(null, "underline", null),
  underLineThrough: textDecoration.bind(null, "underline line-through", null),
  blink: textDecoration.bind(null, "blink", null),
  grammarError: textDecoration.bind(null, "grammar-error", null),
  spellingError: textDecoration.bind(null, "spelling-error", null),
};

function filter1(prop, name, evaluators, args) {
  if (args.length != evaluators.length)
    throw new SyntaxError(`${name} requires exactly ${evaluators.length} arguments, got ${args.length} arguments.`);
  return { [prop]: `${name}(${args.map((a, i) => evaluators[i](a, i)).join(" ")})` };
}
function filter2(prop, evaluator, args) {
  if (args.length != 1)
    throw new SyntaxError(`${prop} requires exactly 1 argument, got ${args.length} arguments.`);
  return { [prop]: evaluator(args[0]) };
}

function transform1(name, evaluator, count, args) {
  if (args.length != count)
    throw new SyntaxError(`${name} requires exactly ${count} arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
}
function transform2(name, evaluator, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
}
function rotate3d([one, two, three, four]) {
  one = evaluateNumber(one, 0);
  two = evaluateNumber(two, 1);
  three = evaluateNumber(three, 2);
  four = evaluateAngle(four, 3);
  return { transform: `rotate3d(${[one, two, three, four].join(", ")})` };
}

var filterTransforms = {
  transform: undefined,

  noBackdropFilter: { backdropFilter: "none" },
  noFilter: { filter: "none" },

  blur: filter1.bind(null, "filter", "blur", [evaluateLength]),
  brightness: filter1.bind(null, "filter", "brightness", [evaluateNumberPercent]),
  contrast: filter1.bind(null, "filter", "contrast", [evaluateNumberPercent]),
  grayscale: filter1.bind(null, "filter", "grayscale", [evaluateNumberPercent]),
  invert: filter1.bind(null, "filter", "invert", [evaluateNumberPercent]),
  opacity: filter1.bind(null, "filter", "opacity", [evaluateNumberPercent]),
  saturate: filter1.bind(null, "filter", "saturate", [evaluateNumberPercent]),
  sepia: filter1.bind(null, "filter", "sepia", [evaluateNumberPercent]),
  dropShadow: filter1.bind(null, "filter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  hueRotate: filter1.bind(null, "filter", "hue-rotate", [evaluateAngle]),
  filter: filter2.bind(null, "filter", evaluateUrl),

  backdropBlur: filter1.bind(null, "backdropFilter", "blur", [evaluateLength]),
  backdropBrightness: filter1.bind(null, "backdropFilter", "brightness", [evaluateNumberPercent]),
  backdropContrast: filter1.bind(null, "backdropFilter", "contrast", [evaluateNumberPercent]),
  backdropGrayscale: filter1.bind(null, "backdropFilter", "grayscale", [evaluateNumberPercent]),
  backdropInvert: filter1.bind(null, "backdropFilter", "invert", [evaluateNumberPercent]),
  backdropOpacity: filter1.bind(null, "backdropFilter", "opacity", [evaluateNumberPercent]),
  backdropSaturate: filter1.bind(null, "backdropFilter", "saturate", [evaluateNumberPercent]),
  backdropSepia: filter1.bind(null, "backdropFilter", "sepia", [evaluateNumberPercent]),
  backdropDropShadow: filter1.bind(null, "backdropFilter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  backdropHueRotate: filter1.bind(null, "backdropFilter", "hue-rotate", [evaluateAngle]),
  backdropFilter: filter2.bind(null, "backdropFilter", evaluateUrl),

  matrix: transform1.bind(null, "matrix", evaluateNumber, 6),
  matrix3d: transform1.bind(null, "matrix3d", evaluateNumber, 16),
  perspective: transform1.bind(null, "perspective", evaluateLength, 1),
  rotate: transform1.bind(null, "rotate", evaluateAngle, 1),
  rotateZ: transform1.bind(null, "rotateZ", evaluateAngle, 1),
  rotateY: transform1.bind(null, "rotateY", evaluateAngle, 1),
  rotateX: transform1.bind(null, "rotateX", evaluateAngle, 1),
  translateX: transform1.bind(null, "translateX", evaluateLengthPercent, 1),
  translateY: transform1.bind(null, "translateY", evaluateLengthPercent, 1),
  translateZ: transform1.bind(null, "translateZ", evaluateLengthPercent, 1),
  translate3d: transform1.bind(null, "translate3d", evaluateLengthPercent, 3),
  scaleX: transform1.bind(null, "scaleX", evaluateNumber, 1),
  scaleY: transform1.bind(null, "scaleY", evaluateNumber, 1),
  scaleZ: transform1.bind(null, "scaleZ", evaluateNumber, 1),
  scale3d: transform1.bind(null, "scale3d", evaluateNumber, 3),
  skewX: transform1.bind(null, "skewX", evaluateAnglePercent, 1),
  skewY: transform1.bind(null, "skewY", evaluateAnglePercent, 1),
  translate: transform2.bind(null, "translate", evaluateLengthPercent),
  scale: transform2.bind(null, "scale", evaluateNumberPercent),
  skew: transform2.bind(null, "skew", evaluateAnglePercent),
  rotate3d,
};

function _boxShadow(ar) {
  let color, a2;
  const res = [];
  for (let a of ar) {
    if (a.text == "none")
      res.push("none");
    else if (a2 = interpretColor(a))
      color = a2.text;
    else if (a2 = interpretLength(a))
      res.push(a2.text);
    else
      throw new SyntaxError(`Could not interpret $boxShadow argument: ${a.text}.`);
  }
  if (res.length < 2 || res.length > 4)
    throw new SyntaxError(`$boxShadow requires two, three, or four length arguments.`);
  color && res.push(color);
  return res.join(" ");
}

function boxShadow(ar) {
  return { boxShadow: _boxShadow(ar) };
}

function boxShadowInset(ar) {
  return { boxShadow: "inset " + _boxShadow(ar) };
}

var boxShadow$1 = {
  boxShadow,
  boxShadowInset,
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

function position(position, ar) {
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
  ...palette$1,
  ...layouts,
  ...transitions,
  ...textDecorations,
  ...border$1,
  ...filterTransforms,
  ...boxShadow$1,
  ...position$1,
  ...ObjectFit,
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
    (k.startsWith("@") ? atRules : mainRule)[k] = v;
  return { atRules, mainRule };
}

function kebabcaseKeys(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) =>
    [k.startsWith("--") ? k : k.replace(/[A-Z]/g, "-$&").toLowerCase(), v]));
}

function checkProperty(obj) {
  for (let k in obj)
    if (CSS.supports(k, "inherit") && !CSS.supports(k, obj[k]))
      throw new SyntaxError(`Invalid CSS$ value: ${k} = ${obj[k]}`);
}

function bodyToTxt(rule, props) {
  const body = Object.entries(props).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  return `${rule} {\n${body}\n}`;
}

const MAGICWORD = `$"'$`;
function parse(short) {
  const clazz = "." + short.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
  short = short.match(/(.*?)\!*$/)[1];
  const { exp, media } = parseMediaQuery(short, MEDIA_WORDS);
  let [sel, ...exprList] = exp.split(/\$(?=(?:[^"]*"[^"]*")*[^"]*$)(?=(?:[^']*'[^']*')*[^']*$)/);
  exprList = exprList.map(parseNestedExpression);
  exprList = exprList.map(exp => {
    const cb = SHORTS[exp.name] ?? SHORTS[exp.text];
    if (!cb) throw new ReferenceError(exp.name);
    return !(cb instanceof Function) ? cb : cb(exp.args);
    // cb({ todo: "here we need math and var and calc and env" }, exp.args);
  });
  exprList &&= clashOrStack(exprList);
  let { selector, item } = parseSelectorPipe(sel, clazz);
  const layer = (item ? "items" : "container") + (short.match(/^(\$|\|\$)/) ? "Default" : "");
  exprList = kebabcaseKeys(exprList);
  const { atRules, mainRule } = extractAtRules(exprList);
  checkProperty(mainRule);
  let cssText = bodyToTxt(selector, mainRule);
  if (media) cssText = `@media ${media} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;
  cssText = `@layer ${layer} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;

  for (let atRule in atRules)
    atRules[atRule] = kebabcaseKeys(atRules[atRule]);
  const atRuleText = Object.entries(atRules).map(([rule, body]) => bodyToTxt(rule, body)).join("\n\n");
  return { short, layer, media, selector, mainRule, cssText, atRules, atRuleText };
  // const miniCssRule = {cssText, name: layer, cssRules: [{ media, cssRules: [{ selectorText: selector, style: { cssText: body }, props }] }]};
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
  if (tokens[0] == ")" && tokens.shift())
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

function goRightOperator(tokens) {
  let a = goDeep(tokens);
  while (tokens.length) {
    const { kind, text } = tokens[0];
    if (kind === "OPERATOR")
      a = { kind: "EXP", name: tokens.shift().text, args: [a, goDeep(tokens)] };
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
  let [body1, body2] = str.split("|").map(parseSelectorComma);
  for (let i = 0; i < body1.length; i++)
    body1[i] = body1[i].replace(MAGICWORD, clazz);;

  if (!body2)
    return { selector: body1.join(", "), item: false };

  for (let i = 0; i < body2.length; i++) {
    const expr = body2[i];
    if (!expr.startsWith(MAGICWORD))
      throw new SyntaxError("Item selector can't have ancestor expression: " + expr);
    body2[i] = expr === MAGICWORD ? "*" : expr.slice(MAGICWORD.length);
  }

  let res = [];
  for (let con of body1)
    for (let item of body2)
      res.push(con + ">" + item);
  return { selector: res.join(","), item: true };
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
  MATH: "min|max|clamp|round|ceil|floor|abs|sin|cos|tan|asin|acos|atan|atan2|sqrt|log2|log10|exp|pow",
  // OTHER_FUNCTIONS: "url|attr|var|env|counter|counters|rect|repeat|minmax",
};

const NUMBER = `(-?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(?:(${TYPES.LENGTHS})|(${TYPES.ANGLES})|(${TYPES.TIMES})|(${TYPES.PERCENT})|(${TYPES.FR}))?`;
const MATH = new RegExp(`^(${TYPES.MATH})$`);


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
      else if (word && text.match(MATH)) out.push({ text, kind: "MATH" });
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
