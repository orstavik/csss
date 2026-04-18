import { CsssFunctions, CsssPrimitives } from "./func.js";
const { SF2, CssValuesToCsssTable } = CsssFunctions;
const { AngleNumber, PercentNumber } = CsssPrimitives;

const RGBPercentNumber = a => a.unit === "percent" ? a.num * 2.55 : (a.type === "number" && !a.unit) ? a.num : undefined;
const AlphaValue = a => (a.unit === "percent" && a.num >= 0 && a.num <= 100) ? a.num * .01 : (a.type === "number" && !a.unit && a.num >= 0 && a.num <= 1) ? a.num : undefined;

const ColorSpaces = CssValuesToCsssTable("srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65|oklch|oklab|lab|lch");
const ColorSpace = a => a.kind === "WORD" ? ColorSpaces[a.text] : undefined;

const ColorInterpolationMethods = CssValuesToCsssTable(
  "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65|" +
  "hsl|hsl longer hue|hsl increasing hue|hsl decreasing hue|" +
  "hwb|hwb longer hue|hwb increasing hue|hwb decreasing hue|" +
  "lch|lch longer hue|lch increasing hue|lch decreasing hue|" +
  "oklch|oklch longer hue|oklch increasing hue|oklch decreasing hue");
const ColorInterpolationMethod = a => a.kind === "WORD" ? ColorInterpolationMethods[a.text] : undefined;

const ColorRaw = a =>
  a.kind === "COLOR" ? parseColor(a.text) :
    a.name in COLORS ? { type: "color", text: COLORS[a.name](a) } :
      undefined;
const Color = a => ColorRaw(a)?.text;
const ColorPrimitive = a => (a = ColorRaw(a))?.hex && a;

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

//#123 => hash(123) => #123
//#primary#30 => hash(primary,30)
//#primary#30#a80 => hash(primary,30,a80)
//#primary#brown33#50
function hash({ args }) {
  let [one, two] = args.map(ColorRaw);
  if (two.vector == "") {
    let left = args[0], i = 1;
    while (left.name === "#hash") {
      left = left.args[0];
      i++;
    }
    const vector = left.kind == "COLOR" && ColorRaw(left).vector;
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


const fourIsSlash = ar => ar.reduce((acc, cur, i) => acc + (i === 3 ? (" / " + cur) : i ? (" " + cur) : cur), "");
const COLORS = {
  "#hash": hash,
  "#rgb": SF2("#rgb/3-4", [RGBPercentNumber, RGBPercentNumber, RGBPercentNumber, AlphaValue], (_, ar) => `rgb(${fourIsSlash(ar)})`),
  "#rgba": SF2("#rgba/4", [RGBPercentNumber, RGBPercentNumber, RGBPercentNumber, AlphaValue], (_, ar) => `rgba(${fourIsSlash(ar)})`),
  "#hsl": SF2("#hsl/3-4", [AngleNumber, PercentNumber, PercentNumber, AlphaValue], (_, ar) => `hsl(${fourIsSlash(ar)})`),
  "#hsla": SF2("#hsla/4", [AngleNumber, PercentNumber, PercentNumber, AlphaValue], (_, ar) => `hsla(${fourIsSlash(ar)})`),
  "#hwb": SF2("#hwb/3-4", [AngleNumber, PercentNumber, PercentNumber, AlphaValue], (_, ar) => `hwb(${fourIsSlash(ar)})`),
  "#lab": SF2("#lab/3-4", [PercentNumber, PercentNumber, PercentNumber, AlphaValue], (_, ar) => `lab(${fourIsSlash(ar)})`),
  "#oklab": SF2("#oklab/3-4", [PercentNumber, PercentNumber, PercentNumber, AlphaValue], (_, ar) => `oklab(${fourIsSlash(ar)})`),
  "#lch": SF2("#lch/3-4", [PercentNumber, PercentNumber, AngleNumber, AlphaValue], (_, ar) => `lch(${fourIsSlash(ar)})`),
  "#oklch": SF2("#oklch/3-4", [PercentNumber, PercentNumber, AngleNumber, AlphaValue], (_, ar) => `oklch(${fourIsSlash(ar)})`),

  "#srgb": SF2("#srgb/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(srgb ${fourIsSlash(ar)})`),
  "#srgbLinear": SF2("#srgbLinear/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(srgb-linear ${fourIsSlash(ar)})`),
  "#displayP3": SF2("#displayP3/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(display-p3 ${fourIsSlash(ar)})`),
  "#a98Rgb": SF2("#a98Rgb/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(a98-rgb ${fourIsSlash(ar)})`),
  "#prophotoRgb": SF2("#prophotoRgb/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(prophoto-rgb ${fourIsSlash(ar)})`),
  "#rec2020": SF2("#rec2020/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(rec2020 ${fourIsSlash(ar)})`),
  "#xyz": SF2("#xyz/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(xyz ${fourIsSlash(ar)})`),
  "#xyzD50": SF2("#xyzD50/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(xyz-d50 ${fourIsSlash(ar)})`),
  "#xyzD65": SF2("#xyzD65/3-4", [AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(xyz-d65 ${fourIsSlash(ar)})`),

  "#colorFrom": SF2("#colorFrom/5-6", [Color, ColorSpace, AlphaValue, AlphaValue, AlphaValue, AlphaValue], (_, ar) => `color(from ${ar[0]} ${ar[1]} ${fourIsSlash(ar.slice(2))})`),

  "#mix": SF2("#mix/5", [ColorInterpolationMethod, Color, PercentNumber, Color, PercentNumber], (_, ar) => `color-mix(in ${ar[0]}, ${ar[1]} ${ar[2]}, ${ar[3]} ${ar[4]})`),
};

export {
  ColorRaw,
  Color,
  ColorPrimitive,
  ColorInterpolationMethod,
};