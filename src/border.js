import { CsssPrimitives, CsssFunctions, matchArgsWithInterpreters } from "./func.js";
const { LengthPercent } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
const { ValueReverse} = CssFunctions
import { Color } from "./funcColor.js";
import { CssFunctions } from "./funcReverse.js";

const Styles = CssValuesToCsssTable("solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden");
const Style = a => Styles[a.text];
const Widths = CssValuesToCsssTable("thin|medium|thick");
const Width = a => Widths[a.text] ?? LengthPercent(a);

//1. BlockInline order is the naming sequence of each corner, and also the two values for each corner.
//   borderStartEndRadius: 2px 4px means something like borderTopRightRadius with top radius 2px side radius 4px.
//2. When we pass values into the function, we follow the normal css logical property sequence, inline then block, start then end.
//3. Upto 4 values is easy: inline, block, inlineEnd, blockEnd.
//4. More than 4 values follows the same sequence for the first 4 values, but then values 5 to 8 will override:
//   5: inlineLeftBottom (and 1: inlineLeftTop), 
//   6: blockTopRight (and 2: blockTopLeft), 
//   7: inlineRightBottom (and 3: inlineRightTop), 
//   8: blockBottomRight (and 4: blockBottomLeft).
const Radius = ({ name, args }) => {
  if (name !== "radius") return;
  if (!args.length || args.length > 8) throw new SyntaxError(`radius() takes 1-8 arguments, got ${args.length}.`);
  const ar = args.map(LengthPercent);
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
};
function borderTypeReverse(Type, style) {
  const bs = ValueReverse(style[`borderBlockStart${Type}`]);
  const be = ValueReverse(style[`borderBlockEnd${Type}`]);
  const is_ = ValueReverse(style[`borderInlineStart${Type}`]);
  const ie = ValueReverse(style[`borderInlineEnd${Type}`]);
  if (Type === "Color" && [bs, be, is_, ie].every(v => v == null || v.toLowerCase() === "currentcolor")) return [];
  const a1 = is_ ?? bs;
  const a2 = be ?? bs;
  const a3 = ie ?? a1;

  let args = [
    bs,
    a1 !== bs ? a1 : null,
    a2 !== bs ? a2 : null,
    a3 !== a1 ? a3 : null,
  ];
  while (args.length && args.at(-1) == null) args.pop();
  if (!args.length || args[0] == null) return [];
  return args.map(v => v ?? "0");
}
function borderRadiusReverse(style) {
  const parseCorner = val => {
    if (!val || ["unset", "initial"].includes(val))
      return ["0", "0"];
    const [a, b = a] = val.trim().split(/\s+/);
    return [
      ValueReverse(a) ?? "0",
      ValueReverse(b) ?? "0"
    ];
  };
  const [[t, l], [t2, r], [b, l2], [b2, r2]] =
    [style.borderStartStartRadius, style.borderStartEndRadius, style.borderEndStartRadius, style.borderEndEndRadius].map(parseCorner);
  if ([t, l, t2, r, b, l2, b2, r2].every(v => v === "0")) return undefined;
  const isGrid = t === t2 && b === b2 && l === l2 && r === r2;
  if (isGrid) {
    if (t === b && l === r)
      return `radius(${t === l ? l : `${l},${t}`})`;
    const args = [l, t, r !== l && r, b !== t && b].filter(v => v != null);
    return `radius(${args.join(",")})`;
  }
  const args = [
    l, t, r, b,
    l2 !== l && l2,
    t2 !== t && t2,
    r2 !== r && r2,
    b2 !== b && b2,
  ].filter(v => v != null);
  return `radius(${args.join(",")})`;
}

function borderFourToOneOrTwo(Type, args) {
  return !args.length ? undefined :
    args.length === 1 ? ({ ["border" + Type]: args[0] }) :
      ({
        ["borderBlock" + Type]: args[2] != null && args[2] != args[0] ? args[0] + " " + args[2] : args[0],
        ["borderInline" + Type]: args[3] != null && args[3] != args[1] ? (args[1] ?? args[0]) + " " + args[3] : args[1] ?? args[0],
      });
}

const border = ({ name, args }) => {
  const [
    w1, w2, w3, w4,
    s1, s2, s3, s4,
    c1, c2, c3, c4,
    radius
  ] = matchArgsWithInterpreters(name, 0, args, [
    Width, Width, Width, Width,
    Style, Style, Style, Style,
    Color, Color, Color, Color,
    Radius,
  ]);
  const widths = [w1, w2, w3, w4].filter(Boolean);
  const styles = [s1, s2, s3, s4].filter(Boolean);
  const colors = [c1, c2, c3, c4].filter(Boolean);
  const res = {};
  if (widths.length) Object.assign(res, borderFourToOneOrTwo("Width", widths));
  if (styles.length) Object.assign(res, borderFourToOneOrTwo("Style", styles));
  if (colors.length) Object.assign(res, borderFourToOneOrTwo("Color", colors));
  if (radius) Object.assign(res, radius);
  return res;
}

const Border = exp => {
  const res = border(exp);
  if (!res.borderStartStartRadius) res.borderRadius ??= "0";
  if (!res.borderInlineColor && !res.borderInlineStyle && !res.borderInlineWidth) {
    const res2 = {
      border: [res.borderWidth, res.borderStyle, res.borderColor].filter(Boolean).join(" ") || "none",
      ...res,
    }
    delete res2.borderColor;
    delete res2.borderStyle;
    delete res2.borderWidth;
    return res2;
  }
  if (!res.borderInlineStyle) res.borderStyle ??= "solid";
  if (!res.borderInlineWidth) res.borderWidth ??= "medium";
  if (!res.borderInlineColor) res.borderColor ??= "currentColor";
  return res;
};

const props = {
  border: undefined,
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
}


export default {
  props,
  csss: {
    border,
    Border,
    noBorder: { border: "none" },
  },
  css: {
    border: style => {
      if (style.border === "none") return "$noBorder";
      const widths = borderTypeReverse("Width", style);
      const styles = borderTypeReverse("Style", style);
      if (styles.length && styles.every(s => s.toLowerCase() === "none")) return "$noBorder";
      const colors = borderTypeReverse("Color", style);
      const radius = borderRadiusReverse(style);
      console.log({ widths, styles, colors, radius });
      const args = [...widths, ...styles, ...colors];
      if (radius) args.push(radius);
      const hasBorderStyle = Object.keys(props).some(k => k.includes("Style") && style[k] && !["unset", "initial", "none"].includes(style[k]));
      const hasBorderWidth = Object.keys(props).some(k => k.includes("Width") && style[k] && !["unset", "initial", "0"].includes(style[k]));
      if (!args.length) return undefined;
      const name = hasBorderStyle && hasBorderWidth ? "$Border" : "$border";
      return `${name}(${args.join(",")})`;
    }
  }
  //todo border-image!
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
