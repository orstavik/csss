import { isBasic, isColor, isLengthPercent } from "../func.js";

const BorderUmbrella = cb => exp => {
  const res = cb(exp);
  if (!res.inlineBorderColor && !res.inlineBorderStyle && !res.inlineBorderWidth) {
    const res2 = {
      border: [res.borderWidth, res.borderStyle, res.borderColor].filter(Boolean).join(" "),
      ...res,
    }
    delete res2.borderColor;
    delete res2.borderStyle;
    delete res2.borderWidth;
    return res2;
  }
  if (!res.inlineBorderStyle) res.borderStyle ??= "solid";
  if (!res.inlineBorderWidth) res.borderWidth ??= "medium";
  if (!res.inlineBorderColor) res.borderColor ??= "currentColor";
  return res;
};

//1. BlockInline order is the naming sequence of each corner, and also the two values for each corner.
//   borderStartEndRadius: 2px 4px means something like borderTopRightRadius with top radius 2px side radius 4px.
//2. When we pass values into the function, we follow the normal css logical property sequence, inline then block, start then end.
//3. Upto 4 values is easy: inline, block, inlineEnd, blockEnd.
//4. More than 4 values follows the same sequence for the first 4 values, but then values 5 to 8 will override:
//   5: inlineLeftBottom (and 1: inlineLeftTop), 
//   6: blockTopRight (and 2: blockTopLeft), 
//   7: inlineRightBottom (and 3: inlineRightTop), 
//   8: blockBottomRight (and 4: blockBottomLeft).
function radius(ar) {
  ar = ar.map(isBasic).map(a => a.text);
  if (ar.length > 8)
    throw new SyntaxError(`max 8 arguments for borderRadius: ${ar.length}.`);
  if (ar.length === 1)
    return { borderRadius: ar[0] };
  if (ar.length === 2) {
    const [l, t] = ar;
    return {
      borderStartStartRadius: `${t} ${l}`,
      borderStartEndRadius: `${t} ${l}`,
      borderEndEndRadius: `${t} ${l}`,
      borderEndStartRadius: `${t} ${l}`,
    };
  }
  if (ar.length <= 4) {
    const [l, t, r, b = t] = ar;
    return {
      borderStartStartRadius: l == t ? l : `${t} ${l}`,
      borderStartEndRadius: t == r ? t : `${t} ${r}`,
      borderEndStartRadius: b == l ? b : `${b} ${l}`,
      borderEndEndRadius: r == b ? r : `${b} ${r}`,
    };
  }
  const [lt, tl, rt, bl, lb, tr = tl, rb = rt, br = bl] = ar;
  return {
    borderStartStartRadius: tl == lt ? tl : `${tl} ${lt}`,
    borderStartEndRadius: tr == rt ? tr : `${tr} ${rt}`,
    borderEndStartRadius: bl == lb ? bl : `${bl} ${lb}`,
    borderEndEndRadius: br == rb ? br : `${br} ${rb}`,
  };
}

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
  none: "none",
  hidden: "hidden",
};
const WIDTH_WORDS = {
  thin: "thin",
  medium: "medium",
  thick: "thick",
};
const RADIUS = {
  radius,
  r: radius,
};

function border({ args: ar }) {
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
    else if (v = RADIUS[a.name]?.(a.args))
      borderRadius = v;
    else
      throw new SyntaxError(`Could not interpret $border argument: ${a.text}.`);
  }
  const tooBig = color.length > 4 ? "color" : style.length > 4 ? "style" : width.length > 4 ? "width" : "";
  if (tooBig)
    throw new SyntaxError(`More than 4 border ${tooBig} arguments.`);
  const res = { ...borderRadius };
  if (width.length == 1) res.borderWidth = width[0];
  if (width.length > 1) {
    res.borderInlineWidth = [width[0], width[2]].filter(Boolean).join(" ");
    res.borderBlockWidth = [width[1], width[3]].filter(Boolean).join(" ");
  }
  if (color.length == 1) res.borderColor = color[0];
  if (color.length > 1) {
    res.borderInlineColor = [color[0], color[2]].filter(Boolean).join(" ");
    res.borderBlockColor = [color[1], color[3]].filter(Boolean).join(" ");
  }
  if (style.length == 1) res.borderStyle = style[0];
  if (style.length > 1) {
    res.borderInlineStyle = [style[0], style[2]].filter(Boolean).join(" ");
    res.borderBlockStyle = [style[1], style[3]].filter(Boolean).join(" ");
  }
  return res;
}

export default {
  border,
  Border: BorderUmbrella(border),
  noBorder: { border: "none" },

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

  borderInline: undefined,
  borderBlock: undefined,

  borderInlineStart: undefined,
  borderBlockStart: undefined,
  borderInlineEnd: undefined,
  borderBlockEnd: undefined,

  borderInlineEndColor: undefined,
  borderBlockStartColor: undefined,
  borderInlineStartColor: undefined,
  borderBlockEndColor: undefined,

  borderInlineEndWidth: undefined,
  borderBlockStartWidth: undefined,
  borderInlineStartWidth: undefined,
  borderBlockEndWidth: undefined,

  borderInlineEndStyle: undefined,
  borderBlockStartStyle: undefined,
  borderInlineStartStyle: undefined,
  borderBlockEndStyle: undefined,

  borderStartEndRadius: undefined,
  borderEndStartRadius: undefined,
  borderStartStartRadius: undefined,
  borderEndEndRadius: undefined,
  //todo block all the others properties that can set border style, width, color, and radius.
}

// //there are different ways to do the logic here..
// //length == 2, I think that we could have top/bottom too
// //length == 3, then the third becomes all the inline ones
// //length === 4, then forth is the inline on the end side
// export function toLogicalEight(NAME, DEFAULT, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   let [bss, iss, bes, ies, bse, ise, bee, iee] = ar;
//   if (ar.length === 2) ise = ies = iee = iss, bse = bes = bee = bss;
//   if (ar.length === 3) ise = ies = iee = iss, bse = bss, bee = bes;
//   if (ar.length === 4) ise = iss, iee = ies, bse = bss, bee = bes;
//   if (ar.length === 5) ise = iss, iee = ies, bee = bes;
//   if (ar.length === 6) iee = ies, bee = bes;
//   if (ar.length === 7) iee = ies;
//   const res = {};
//   if (bss || iss) res[NAME + "TopLeft"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
//   if (bse || ies) res[NAME + "TopRight"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
//   if (bes || ise) res[NAME + "BottomLeft"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
//   if (bee || iee) res[NAME + "BottomRight"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
//   return res;
// }

// export function toRadiusFour(NAME, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   return {
//     [NAME + "StartStart"]: ar[0],
//     [NAME + "EndEnd"]: ar[2] ?? ar[0],
//     [NAME + "StartEnd"]: ar[1],
//     [NAME + "EndStart"]: ar[3] ?? ar[1],
//   };
// }