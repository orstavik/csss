import { isColor, toRadiusFour, toLogicalEight, isLengthPercent } from "./func.js";

//$border(2px,4px,solid,red,blue)
//$border(2px,solid,red)
const STYLE_WORDS = {
  solid: "solid",
  dotted: "dotted",
  dashed: "dashed",
  double: "double",
  groove: "groove",
  ridge: "ridge",
  inset: "inset",
  outset: "outset",
  hidden: "hidden",
};
const WIDTH_WORDS = {
  thin: "thin",
  medium: "medium",
  thick: "thick",
};
const radius = toRadiusFour.bind(null, "radius");
const radius8 = toLogicalEight.bind(null, "radius", 0);
const RADIUS = {
  radius,
  r: radius,
  radius8,
  r8: radius8,
};

function border(ar) {
  let borderRadius, width = [], style = [], color = [];
  for (let a of ar) {
    let v;
    if (borderRadius && a.name in RADIUS)
      throw new SyntaxError(`More than one $border radius argument: ${a.text}.`);
    else if (v = isColor(a)?.text)
      color.push(v);
    else if (v = isLengthPercent(a)?.text ?? WIDTH_WORDS[a.text])
      width.push(v);
    else if (v = STYLE_WORDS[a.text])
      style.push(v);
    else if (v = RADIUS[a.name]?.(a.args)?.text)
      borderRadius = v;
    else
      throw new SyntaxError(`Could not interpret $border argument: ${a.text}.`);
  }
  if (width.length > 4)
    throw new SyntaxError(`Too many border widths specified: ${width.join(" ")}.`);
  if (style.length > 4)
    throw new SyntaxError(`Too many border styles specified: ${style.join(" ")}.`);
  if (color.length > 4)
    throw new SyntaxError(`Too many border colors specified: ${color.join(" ")}.`);
  if (width.length < 2 && style.length < 2 && color.length < 2) {
    const border = [width[0], style[0] ?? "solid", color[0]].filter(Boolean).join(" ");
    return radius ? { border, borderRadius } : { border };
  }
  const borderInline = [width[0], width[2], style[0] ?? "solid", style[2], color[0], color[2]].filter(Boolean).join(" ");
  const borderBlock = [width[1] ?? width[0], width[3], style[1] ?? style[0] ?? "solid", style[3], color[1] ?? color[0], color[3]].filter(Boolean).join(" ");
  return radius ? { borderInline, borderBlock, borderRadius } : { borderInline, borderBlock };
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