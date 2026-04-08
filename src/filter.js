import { CsssPrimitives, CsssFunctions, BadArgument } from "./func2.js";
const { NumberPercent, Length, Angle, Url } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
import shadow from "./shadows.js";
const textDropShadowRaw = shadow.raw.textDropShadowRaw;

const CsssToCss = CssValuesToCsssTable("blur|brightness|contrast|grayscale|invert|opacity|saturate|sepia|hue-rotate");
const FunctionToType = {
  blur: Length,
  brightness: NumberPercent,
  contrast: NumberPercent,
  grayscale: NumberPercent,
  invert: NumberPercent,
  opacity: NumberPercent,
  saturate: NumberPercent,
  sepia: NumberPercent,
  hueRotate: Angle,
};

const filterRaw = ({ name: filterName, args }) => args.map((a, i) => {
  let v;
  if ((v = FunctionToType[a.name]?.(a.args[0])) != null)
    return `${CsssToCss[a.name]}(${v})`;
  if ((v = Url(a)) != null)
    return v;
  if ((v = textDropShadowRaw(a)) != null)
    return `drop-shadow(${v})`;
  throw BadArgument(filterName, args, i, `Expected ${Object.keys(FunctionToType).join(", ")}, or a url.`);
}).join(" ");

export default {
  props: { filter: undefined, backdrop: undefined, backdropFilter: undefined },
  csss: {
    filter: x => ({ filter: filterRaw(x) }),
    backdrop: x => ({ backdropFilter: filterRaw(x) }),
  },
  css: {},
};