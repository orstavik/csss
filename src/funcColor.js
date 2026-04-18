import { fromHexOrName } from "./Color.js";
import { BadArgument, CsssFunctions } from "./func.js";
const { CssValuesToCsssTable } = CsssFunctions;

const ColorSpaces = CssValuesToCsssTable("srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|xyz|xyz-d50|xyz-d65|oklch|oklab|lab|lch");

const ColorInterpolationMethods = CssValuesToCsssTable(
  "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65|" +
  "hsl|hsl longer hue|hsl increasing hue|hsl decreasing hue|" +
  "hwb|hwb longer hue|hwb increasing hue|hwb decreasing hue|" +
  "lch|lch longer hue|lch increasing hue|lch decreasing hue|" +
  "oklch|oklch longer hue|oklch increasing hue|oklch decreasing hue");
const ColorInterpolationMethod = a => a.kind === "WORD" ? ColorInterpolationMethods[a.text] : undefined;

function vectorizeColors({ name, args, kind, text }) {
  if (kind === "COLOR") return [text.slice(1)];
  if (name === "#hash") return args.map(({ text }) => text.slice(1));
}

function AbsoluteColorVector(a) {
  return vectorizeColors(a)?.map((hex, i) => {
    if (!hex) return;
    const c = fromHexOrName(hex);
    if (!c) throw BadArgument(`#AbsoluteColor`, v, i);
    return c.name ?? `#${c.hex8}`;
  });
}

function colorMix(space, c1, C) {
  if (c1) return `color-mix(in ${space}, ${c1}, ${C.name ?? `#${C.hex6}`} ${(C.alpha ?? .5) * 100}%)`;
  if (C.name && !C.alpha) return C.name;
  return `#${C.hex8}`;
}

const RelativeColors = {
  calc: {
    "+": (c, v) => `calc(${c} + ${v})`,
    "-": (c, v) => `calc(${c} - ${v})`,
    "*": (c, v, min) => v > 1 ?
      `max(${c} * ${v}, ${c} + ${min})` :
      `min(${c} * ${v}, ${c} - ${min})`,
    "/": (c, v, min) => v > 1 ?
      `min(${c} / ${v}, ${c} - ${min})` :
      `max(${c} / ${v}, ${c} + ${min})`,
  },
  directions: {
    "A": (color, C, v) => `rgb(from ${color} r g b / ${C("a", v, .05)})`,
    "R": (color, C, v) => `color(from ${color} linear-srgb ${C("r", v, .02)} g b / alpha)`,
    "G": (color, C, v) => `color(from ${color} linear-srgb r ${C("g", v, .02)} b / alpha)`,
    "B": (color, C, v) => `color(from ${color} linear-srgb r g ${C("b", v, .02)} / alpha)`,
    "Y": (color, C, v) => `color(from ${color} linear-srgb ${C("r", v, .02)} ${C("g", v, .02)} ${C("b", v, .02)} / alpha)`,
    "L": (color, C, v) => `oklch(from ${color} ${C("l", v, .02)} c h / alpha)`,
    "C": (color, C, v) => `oklch(from ${color} l ${C("c", v, .01)} h / alpha)`,
    "H": (color, C, v) => `oklch(from ${color} l c ${C("h", v, 1)} / alpha)`,
    "LabA": (color, C, v) => `oklab(from ${color} l ${C("a", v, .02)} b / alpha)`,
    "LabB": (color, C, v) => `oklab(from ${color} l a ${C("b", v, .02)} / alpha)`,
  },
};

function relativeColor(color, txt) {
  let m = txt.match(/^([ARGBYLCH]|Lab[AB])([+*/-])(\d*\.?\d+)?$/);
  if (!m) return;
  const [_, dir, op, val] = m;
  const D = RelativeColors.directions[dir];
  const C = RelativeColors.calc[op];
  return D(color, C, parseFloat(val));
}

function parseVector1(txt) {
  let m = txt.match(/^([a-z_]+)(\d*\.?\d+)?$/i);
  if (!m) return;
  const [_, vectorName, alpha] = m;
  return alpha == null ?
    { color: `var(--color-${vectorName})`, vectorName } :
    { color: `color-mix(in oklab, transparent, var(--color-${vectorName}) ${alpha}%)`, vectorName };
}

function parseVector2(colorspace, vector, i, color, txt) {
  return vector && txt.match(/^\d*\.?\d+$/) &&
    `color-mix(in ${colorspace}, ${color}, var(--color-${vector}-${i}, var(--color-${vector})) ${parseFloat(txt)}%)`;
}

function Color(a) {
  let c, color, colorSpace = "oklab", vectorName, V = 0;
  const v = vectorizeColors(a);
  if (v == null) return;
  for (let i = 0; i < v.length; i++) {
    let hex = v[i];
    if (!hex)
      continue;
    else if (hex in ColorSpaces)
      colorSpace = ColorSpaces[hex];
    else if (c = fromHexOrName(hex))
      color = colorMix(colorSpace, color, c);
    else if (c = relativeColor(color, hex))
      color = c;
    else if (c = parseVector1(hex))
      ({ color, vectorName } = c), V++;
    else if (c = parseVector2(colorSpace, vectorName, V, color, hex))
      (color = c), V++;
    else
      throw new BadArgument(`#color`, v, i);
  }
  return color;
}

export {
  Color,
  AbsoluteColorVector,
  ColorInterpolationMethod,
};