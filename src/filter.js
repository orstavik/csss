import { CsssPrimitives, CsssFunctions, BadArgument } from "./func.js";
const { NumberPercent, Length, Angle, Url } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
import { CssFunctions } from "./funcReverse.js";
const { ValueReverse2, parseCssValue, spaceArray } = CssFunctions;

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

const CssToCsss = {
  blur: "blur",
  brightness: "brightness",
  contrast: "contrast",
  grayscale: "grayscale",
  invert: "invert",
  opacity: "opacity",
  saturate: "saturate",
  sepia: "sepia",
  "hue-rotate": "hueRotate",
};

function reverseFilter(str) {
  const expr = parseCssValue(str);
  const v2 = spaceArray(expr);
  return v2.map((a) => {
    if (a.type === "fn" && a.value === "drop-shadow")
      return `dropShadow(${spaceArray(a.args).map(ValueReverse2).join(",")})`;
    if (a.type === "fn" && a.value in CssToCsss)
      return `${CssToCsss[a.value]}(${ValueReverse2(a.args[0])})`;
    else
      return ValueReverse2(a);
  });
}

export default {
  props: { filter: undefined, backdrop: undefined, backdropFilter: undefined },
  csss: {
    filter: x => ({ filter: filterRaw(x) }),
    backdrop: x => ({ backdropFilter: filterRaw(x) }),
  },
  css: {
    filter: style => {
      return (!style.filter || style.filter === "none") ? undefined
        : `$filter(${reverseFilter(style.filter)})`;
    },
    backdrop: style => {
      return (!style.backdropFilter || style.backdropFilter === "none") ? undefined
        : `$backdrop(${reverseFilter(style.backdropFilter)})`;
    }
  },
};