import { isBasic, isColor, isLengthPercent } from "./func.js";

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
    else if (v = RADIUS[a.name]?.(a.args))
      borderRadius = v;
    else
      throw new SyntaxError(`Could not interpret $border argument: ${a.text}.`);
  }
  const maxLength = Math.max(width.length, style.length, color.length);
  if (!maxLength && borderRadius)
    return borderRadius;
  borderRadius ??= {};
  style[0] ??= "solid";
  if (maxLength == 1) {
    const border = [width[0], style[0], color[0]].filter(Boolean).join(" ");
    return { border, ...borderRadius };
  }
  style[1] ??= style[0];
  width[1] ??= width[0];
  color[1] ??= color[0];
  if (maxLength == 2) {
    const borderInline = [width[0], style[0], color[0]].filter(Boolean).join(" ");
    const borderBlock = [width[1], style[1], color[1]].filter(Boolean).join(" ");
    return { borderInline, borderBlock, ...borderRadius };
  }
  style[2] ??= style[0];
  width[2] ??= width[0];
  color[2] ??= color[0];
  if (maxLength == 3) {
    const borderInlineStart = [width[0], style[0], color[0]].filter(Boolean).join(" ");
    const borderBlock = [width[1], style[1], color[1]].filter(Boolean).join(" ");
    const borderInlineEnd = [width[2], style[2], color[2]].filter(Boolean).join(" ");
    return { borderInlineStart, borderBlock, borderInlineEnd, ...borderRadius };
  }
  style[3] ??= style[1];
  width[3] ??= width[1];
  color[3] ??= color[1];
  if (maxLength == 4) {
    const borderInlineStart = [width[0], style[0], color[0]].filter(Boolean).join(" ");
    const borderBlockStart = [width[1], style[1], color[1]].filter(Boolean).join(" ");
    const borderInlineEnd = [width[2], style[2], color[2]].filter(Boolean).join(" ");
    const borderBlockEnd = [width[3], style[3], color[3]].filter(Boolean).join(" ");
    return { borderInlineStart, borderBlockStart, borderInlineEnd, borderBlockEnd, ...borderRadius };
  }
  const tooBig = width.length > 4 ? width : style.length > 4 ? style : color;
  throw new SyntaxError(`More than 4 border arguments: ${tooBig.join(" ")}.`);
}

export default {
  border,
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