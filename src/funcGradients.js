import { CsssFunctions, CsssPrimitives } from "./func.js";
const { SF2, CssValuesToCsssTable } = CsssFunctions;
const { Length, LengthPercent, Angle, AnglePercent, SingleTableRaw } = CsssPrimitives;

import { Color, ColorInterpolationMethod } from "./funcColor.js";

const LinearDirections = CssValuesToCsssTable("to left|to right|to top|to bottom|to top left|to top right|to bottom left|to bottom right");
const LinearDirection = SingleTableRaw(LinearDirections);

const FarthestClosests = CssValuesToCsssTable("farthest-corner|farthest-side|closest-corner|closest-side");
const FarthestClosest = SingleTableRaw(FarthestClosests);

const atPositionsX = CssValuesToCsssTable("left|right|center");//start|end|xStart|xEnd
const atPositionsY = CssValuesToCsssTable("top|bottom|center");//start|end|yStart|yEnd
const atPositionX = SingleTableRaw(atPositionsX);
const atPositionY = SingleTableRaw(atPositionsY);

const AngleOrLinearDirection = e => Angle(e) ?? LinearDirection(e);
const ColorStopAnglePercentTuple = SF2("(/1-3", [Color, AnglePercent], (_, res) => res.join(" "));
const ColorStopAnglePercent = e => Color(e) ?? ColorStopAnglePercentTuple(e);

const At2 = ({ name, args }) => {
  if (name !== "at") return;
  if (args.length < 1 || args.length > 4) throw new SyntaxError(`at() takes 1 to 4 arguments, got ${args.length}.`);
  let i = 0;
  let x = atPositionX(args[i]);
  if (x) { i++; }
  if (x === "left") x = "";
  const xL = args.length > i && LengthPercent(args[i]);
  if (xL) { i++; }
  let y = args.length > i && atPositionY(args[i]);
  if (y) { i++; }
  if (y === "top") y = "";
  const yL = args.length > i && LengthPercent(args[i]);
  if (yL) { i++; }
  if (i !== args.length) throw BadArgument("name", args, i, "Invalid argument.");
  const at = [x, xL, y, yL].filter(Boolean).join(" ");
  return at.length ? "at " + at : "";
}

function getColorStops(args, i, name) {
  const stops = [];
  for (; i < args.length; i++) {
    const c = ColorStopAnglePercent(args[i]);
    if (!c)
      throw BadArgument(name, args, i, "conic(angle,at,colorInterpolationMethod,...[Color|(Color,Percent,Percent)]");
    stops.push(c);
  }
  if (!stops.length)
    throw BadArgument(name, args, args.length - 1, `${name}() must have at least one color stop`);
  return stops;
}

const conic = ({ name, args }) => {
  let m = name?.match(/^(repeating)?(conic)$/i);
  if (!m) return;
  const repeating = m[1] ? "repeating-" : "";

  let i = 0;
  let angle = Angle(args[i]);
  if (angle) { angle = "from " + angle; i++; }
  let at = At2(args[i]);
  if (at != null) { i++; }
  let colorMeth = ColorInterpolationMethod(args[i]);
  if (colorMeth) { colorMeth = "in " + colorMeth; i++; }

  const colorStops = getColorStops(args, i, name);

  if (angle || at || colorMeth)
    colorStops.unshift([angle, at, colorMeth].filter(Boolean).join(" "));
  return `${repeating}conic-gradient(${colorStops.join(", ")})`;
}

const linear = ({ name, args }) => {
  let m = name?.match(/^(repeating)?(linear)$/i);
  if (!m) return;
  const repeating = m[1] ? "repeating-" : "";

  let i = 0;
  let angleOrDir = AngleOrLinearDirection(args[i]);
  if (angleOrDir) i++;
  let colorMeth = ColorInterpolationMethod(args[i]);
  if (colorMeth) { colorMeth = "in " + colorMeth; i++; }

  const colorStops = getColorStops(args, i, name);
  if (angleOrDir || colorMeth)
    colorStops.unshift([angleOrDir, colorMeth].filter(Boolean).join(" "));
  return `${repeating}linear-gradient(${colorStops.join(", ")})`;
}

const ellipse = ({ name, args }) => {
  let m = name?.match(/^(repeating|)ellipse$/i);
  if (!m) return;
  const repeating = m[1] ? "repeating-" : "";

  let i = 0;
  let size1 = LengthPercent(args[i]) ?? FarthestClosest(args[i]);
  if (size1) { i++; }
  let size2 = LengthPercent(args[i]) ?? FarthestClosest(args[i]);
  if (size2) { i++; }
  let at = At2(args[i]);
  if (at != null) { i++; }
  let colorMeth = ColorInterpolationMethod(args[i]);
  if (colorMeth) { colorMeth = "in " + colorMeth; i++; }
  const colorStops = getColorStops(args, i, name);
  colorStops.unshift(["ellipse", size1, size2, at, colorMeth].filter(Boolean).join(" "));
  return `${repeating}radial-gradient(${colorStops.join(", ")})`;
}

const circle = ({ name, args }) => {
  let m = name?.match(/^(repeating|)circle$/i);
  if (!m) return;
  const repeating = m[1] ? "repeating-" : "";

  let i = 0;
  let size = Length(args[i]) ?? FarthestClosest(args[i]);
  if (size) { i++; }
  let at = At2(args[i]);
  if (at != null) { i++; }
  let colorMeth = ColorInterpolationMethod(args[i]);
  if (colorMeth) { colorMeth = "in " + colorMeth; i++; }
  const colorStops = getColorStops(args, i, name);
  const first = [size, at, colorMeth].filter(Boolean).join(" ");
  if (first) colorStops.unshift(first);
  return `${repeating}radial-gradient(${colorStops.join(", ")})`;
};

export default {
  csss: {
    ellipse,
    circle,
    conic,
    linear,
  }
}
