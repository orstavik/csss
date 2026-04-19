export const WebColors = {
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
const WebColorsHex6ToName = Object.fromEntries(Object.entries(WebColors).map(([k, v]) => [v, k]));

//from hex => lch
function hex6ToName({ hex6 }) {
  return { name: WebColorsHex6ToName[hex6.toLowerCase()] };
}
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
  return (alpha == null || alpha === 1) ?
    { hex8: hex6 } :
    { hex8: hex6 + Math.round(alpha * 255).toString(16).padStart(2, "0") };
}

//main functions
function makeColor(transforms, all) {
  return transforms.reduce((acc, fn) => ({ ...acc, ...fn(acc) }), all);
}
export function fromHex8(hex8) {
  return makeColor([hex8ToHex6A, hex6ToRgb, rgbToRGB, RGBToXyz, xyzToLab, labToLch, hex6ToName], { hex8 });
}
export function fromHex6(hex6, alpha) {
  return makeColor([hex6ToRgb, rgbToRGB, RGBToXyz, xyzToLab, labToLch, hex6AToHex8, hex6ToName], { hex6, alpha });
}
export function fromRgb(r, g, b, alpha) {
  return makeColor([rgbToRGB, RGBToXyz, xyzToLab, labToLch, rgbToHex6, hex6AToHex8, hex6ToName], { r, g, b, alpha });
}
export function fromLinearRgb(R, G, B, alpha) {
  return makeColor([RGBToXyz, xyzToLab, labToLch, RGBToRgb, rgbToHex6, hex6AToHex8, hex6ToName], { R, G, B, alpha });
}
export function fromXyz(x, y, z, alpha) {
  return makeColor([xyzToLab, labToLch, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8, hex6ToName], { x, y, z, alpha });
}
export function fromLab(L, a, b, alpha) {
  return makeColor([labToLch, labToXyz, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8, hex6ToName], { L, a, b, alpha });
}
export function fromLCH(L, C, H, alpha) {
  return makeColor([lchToLab, labToXyz, xyzToRGB, RGBToRgb, rgbToHex6, hex6AToHex8, hex6ToName], { L, C, H, alpha });
}

const namePercent = new RegExp(`^(${Object.keys(WebColors).join("|")})(\\.\\d+)?$`);
export function fromNameAlpha(txt) {
  const [, name, alpha] = txt.toLowerCase().match(namePercent) || [];
  return name && makeColor([hex6ToRgb, rgbToRGB, RGBToXyz, xyzToLab, labToLch, hex6AToHex8, hex6ToName], {
    name,
    alpha: alpha != null ? parseFloat(alpha) : undefined,
    hex6: WebColors[name],
  });
}

export function fromHex(txt) {
  if (!txt.match(/^([0-9a-f]{3}[0-9a-f]?){1,2}$/i))
    return;
  if (txt.length < 6)
    txt = txt.split("").map(c => c + c).join("");
  return txt.length === 8 ? fromHex8(txt) : fromHex6(txt);
}

export function fromHexOrName(txt) {
  if (txt[0] === "#")
    txt = txt.slice(1);
  if (txt === "transparent")
    return { name: txt, alpha: 0 };
  return fromHex(txt) ?? fromNameAlpha(txt);
}