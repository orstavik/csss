import { default as NativeCssProperties, isLength, isColor, toLogicalFour, toRadiusFour, toLogicalEight, borderSwitch } from "./func.js";

//border: 2px 4px solid red blue;
//$border(w(2px,4px),solid,c(red,blue))
//$border(2px,solid,red)
function border(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    if (isColor(a))
      return { Color: a };
    if (isLength(a) || a.match(/(^(min|max|clamp)\()/))
      return { Width: a };
    return a; //todo this throws, right?
  });
  return borderSwitch(Object.assign({ Style: "solid" }, ...args));
}

const borderColor = toLogicalFour.bind(null, "Color");
borderColor.scope = NativeCssProperties.borderColor.scope;
const borderWidth = toLogicalFour.bind(null, "Width");
borderWidth.scope = NativeCssProperties.borderWidth.scope;
const borderRadius = toRadiusFour.bind(null, "Radius");
borderRadius.scope = NativeCssProperties.borderRadius.scope;
const borderRadius8 = toLogicalEight.bind(null, "Radius", 0);
borderRadius8.scope = NativeCssProperties.borderRadius.scope;
const borderStyle = toLogicalFour.bind(null, "Style");
borderStyle.scope = NativeCssProperties.borderStyle.scope;

border.scope = {

  width: borderWidth,
  w: borderWidth,
  style: borderStyle,
  s: borderStyle,
  radius: borderRadius,
  r: borderRadius,
  r4: borderRadius,
  r8: borderRadius8,
  color: borderColor,
  c: borderColor,
  //it should default to borderWidth handling of the arguments.
  ...NativeCssProperties.borderWidth.scope, //we want the min/max/clamp and transition properties.
  solid: { Style: "solid" },
  dotted: { Style: "dotted" },
  dashed: { Style: "dashed" },
  double: { Style: "double" },
  groove: { Style: "groove" },
  ridge: { Style: "ridge" },
  inset: { Style: "inset" },
  outset: { Style: "outset" },
  hidden: { Style: "hidden" },
  none: { Style: "none" },
  thin: { Width: "thin" },
  medium: { Width: "medium" },
  thick: { Width: "thick" },
};

export default {
  border,
  borderWidth: undefined,
  borderStyle: undefined,
  borderRadius: undefined,
  // borderColor: undefined,
  ...BackgroundFunctions,
};