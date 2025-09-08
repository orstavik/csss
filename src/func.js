//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//mdn specifies more lengths, but we don't support them yet.
import { TYPES, isLength, isAngle, isTime } from "./Parser.js";
import Maths from "./funcMath.js";
export { TYPES, isLength, isAngle, isTime };

//todo here we need + - * / ?? var calc max min clamp log exp etc.
//they should return the type if it can be deduced by the number.
//we need 3 types of outcome
//Number
//Var
//String //if we have a string or var below, we must go with string. But the string can contain a type.

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
  args = args.map(a => interpretColor(a) ?? interpretBasic(a));
  const from = args[0].type === "color";
  const txts = args.map(a => a.text);
  if (args.length - from === 4) txts.splice(-1, 0, "/");
  if (from) txts.unshift("from");
  return `${name}(${txts.join(" ")})`;
}

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
export function toLogicalEight(NAME, DEFAULT, ar) {
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

// const NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;
// const NativeCssScopeAttrCounter = {
//   counter: (...args) => `counter(${args.join(",")})`,
//   counters: (...args) => `counters(${args.join(",")})`,
//   attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
// };

export function makeExtractor(cb) {
  return function (args) {
    const res = cb(args[0]);
    return res != null && args.shift() && res.text;
  };
}

export function interpretBasic(arg) {
  if (arg.kind !== "EXP")
    return arg;
  if (arg.name in Maths)
    return Maths[arg.name](arg.name, arg.args.map(interpretBasic));
}
export function interpretName(arg) {
  if (arg.kind === "WORD" && arg.text[0].match(/[a-zA-Z]/))
    return arg;
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
  if (a.kind === "QUOTE")
    return { type: "url", text: `url(${a.text})` };
  if (a.name === "url") {
    if (args.length != 1) throw new SyntaxError("url() requires exactly one argument.");
    return { type: "url", text: `url(${interpretBasic(a.args[0]).text})` };
  }
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

export function interpretAngle(a) {
  a = interpretBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle")
    return a;
}
export function interpretAnglePercent(a) {
  a = interpretBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle" || a?.type === "percent")
    return a;
}
export function interpretLengthPercent(a) {
  a = interpretBasic(a);
  if (a?.type === "length" || a?.type === "percent" || (a?.num == 0 && a?.type === "number"))
    return a;
}
export function interpretLength(a) {
  a = interpretBasic(a);
  if (a?.type === "length" || (a?.num == 0 && a?.type === "number"))
    return a;
}
export function interpretTime(a) {
  a = interpretBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "time", text: "0s", unit: "s", num: 0 };
  if (a?.type === "time")
    return a;
}
export function interpretResolution(a) {
  a = interpretBasic(a);
  if (a?.num == 0 && a.type === "number")
    return { type: "resolution", text: "0x", unit: "x", num: 0 };
  if (a?.type === "resolution")
    return a;
}
export function interpretNumber(a) {
  a = interpretBasic(a);
  if (a?.type === "number" && a.unit == "")
    return a;
}
export function interpretQuote(a) {
  if (a.kind === "QUOTE")
    return a;
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

export default {
  ...UnpackedNativeCssProperties,

  em: NativeCssProperties.fontSize,
};