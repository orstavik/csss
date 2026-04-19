import { fromHexOrName } from "./Color.js";
import { BadArgument, CsssFunctions, CsssPrimitives } from "./func.js";
const { CssValuesToCsssTable } = CsssFunctions;
const { NumberInterpreter } = CsssPrimitives;

const ColorInterpolationMethods = CssValuesToCsssTable(
  "srgb|srgb-linear|display-p3|display-p3-linear|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65|" +
  "hsl|hsl longer hue|hsl increasing hue|hsl decreasing hue|" +
  "hwb|hwb longer hue|hwb increasing hue|hwb decreasing hue|" +
  "lch|lch longer hue|lch increasing hue|lch decreasing hue|" +
  "oklch|oklch longer hue|oklch increasing hue|oklch decreasing hue");
const ColorInterpolationMethod = a => ColorInterpolationMethods[a.text];

function AbsoluteColorVector(a) {
  if (a.name !== "#") return;
  return a.args.map((hex, i) => {
    if (!hex) return;
    const c = fromHexOrName(hex);
    if (!c) throw BadArgument(`#AbsoluteColor`, a.args, i);
    return c.name ?? `#${c.hex8}`;
  });
}

function fullColor(space, color, hex) {
  const C = fromHexOrName(hex);
  if (!C) return;
  const { name, hex6, hex8, alpha } = C;
  return color ? `color-mix(in ${space}, ${color}, ${name ?? `#${hex6}`} ${(alpha ?? .5) * 100}%)` :
    name && !alpha ? name :
      `#${hex8}`;
}

const RelativeColors = {
  calc: {
    "+": (c, v) => `calc(${c} + ${v})`,
    "-": (c, v) => `calc(${c} - ${v})`,
    "*": (c, v, min) => v > 1 ?
      `max(${c} * ${v}, ${c} + ${min})` :
      `min(${c} * ${v}, ${c} - ${min})`,
    "": (c, v) => v,
  },
  directions: {
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
  let m = txt.match(/^([ARGBYLCH]|Lab[AB])([+*-]|)(\d*\.?\d+)?$/);
  if (!m) return;
  const [_, dir, op, val] = m;
  const D = RelativeColors.directions[dir];
  const C = RelativeColors.calc[op];
  return D(color, C, parseFloat(val));
}

function colorVector(colorspace, color, txt) {
  const m = txt.match(/^([a-z_]+)(00|\d\d)?(\.\d+)?$/i);
  if (!m) return;
  const [_, vectorName, index, alpha] = m;
  let name = `var(--color-${vectorName})`;
  if (index === "00")
    name = `var(--color-${vectorName}-1)`;
  else if (index)
    name = `color-mix(in ${colorspace}, ${name} ${parseInt(index)}%, var(--color-${vectorName}-1))`;
  if (alpha)
    name = `color-mix(in ${colorspace}, ${color ?? "transparent"}, ${name} ${parseFloat(alpha)}%)`;
  return name;
}

function HardColor(a) {
  if (a.name !== "#") return;
  let colorSpace = "oklab";
  return a.args.reduce((res, txt, i) => {
    if (!txt)
      return res;
    if (txt in ColorInterpolationMethods)
      return (colorSpace = ColorInterpolationMethods[txt]), res;
    const c = fullColor(colorSpace, res, txt) ?? relativeColor(res, txt) ?? colorVector(colorSpace, res, txt);
    if (c)
      return c;
    throw new BadArgument(`#color`, a.args, i);
  }, undefined);
}

function Color(a) {
  if (a.name === "/") {
    const c = HardColor(a.args[0]);
    if (!c) return;
    let alpha = NumberInterpreter(a.args[1]);
    if (alpha == null || alpha < 0) throw BadArgument("TransparentColor", a.args, 1, "alpha must be positive number.");
    if (alpha < 1) alpha *= 100;
    return `rgb(from ${c} r g b / ${alpha}%)`;
  }
  return HardColor(a);
}

export {
  Color,
  AbsoluteColorVector,
  ColorInterpolationMethod,
};