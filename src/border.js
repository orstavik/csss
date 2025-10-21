import { isBasic, isColor, toLogicalFour, toLogicalEight, toRadiusFour } from "./func.js";

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
      isColor(a) ??
      isBasic(a);
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

export default {
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
}