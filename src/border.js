import { BadArgument, CsssPrimitives, CsssFunctions, matchArgsWithInterpreters } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { Length, LengthPercent, NumberInterpreter, Percent, Url } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
import { Color } from "./funcColor.js";
const { ColorReverse, ValueReverse, normalizeToLogical, Optional } = CssFunctions;

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
  // $Border resets radius and border-image
  if (!res.borderStartStartRadius && !res.borderTopLeftRadius && !res.borderRadius) {
    res.borderRadius = "0";
  }

  const hasLogical = res.borderInlineWidth || res.borderBlockWidth || res.borderInlineStartWidth ||
    res.borderInlineStyle || res.borderBlockStyle || res.borderInlineStartStyle ||
    res.borderInlineColor || res.borderBlockColor || res.borderInlineStartColor;

  if (hasLogical) {
    res.borderImageOutset = "initial";
    res.borderImageRepeat = "initial";
    res.borderImageSlice = "initial";
    res.borderImageSource = "initial";
    res.borderImageWidth = "initial";
  }

  if (!hasLogical && !res.borderBlockColor && !res.borderBlockStyle && !res.borderBlockWidth) {
    const res2 = {
      border: [res.borderWidth, res.borderStyle, res.borderColor].filter(Boolean).join(" ") || "none",
      ...res,
    }
    delete res2.borderColor;
    delete res2.borderStyle;
    delete res2.borderWidth;
    return res2;
  }
  if (!res.borderInlineStyle && !res.borderBlockStyle) res.borderStyle ??= "solid";
  if (!res.borderInlineWidth && !res.borderBlockWidth) res.borderWidth ??= "medium";
  if (!res.borderInlineColor && !res.borderBlockColor) res.borderColor ??= "currentColor";
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

  borderImage: undefined,
  borderImageSource: undefined,
  borderImageSlice: undefined,
  borderImageWidth: undefined,
  borderImageOutset: undefined,
  borderImageRepeat: undefined,
}

const borderProps = [
  "borderWidth", "borderStyle", "borderColor",
  "borderTopWidth", "borderTopStyle", "borderTopColor",
  "borderRightWidth", "borderRightStyle", "borderRightColor",
  "borderBottomWidth", "borderBottomStyle", "borderBottomColor",
  "borderLeftWidth", "borderLeftStyle", "borderLeftColor",
  "borderInlineStartWidth", "borderInlineStartStyle", "borderInlineStartColor",
  "borderInlineEndWidth", "borderInlineEndStyle", "borderInlineEndColor",
  "borderBlockStartWidth", "borderBlockStartStyle", "borderBlockStartColor",
  "borderBlockEndWidth", "borderBlockEndStyle", "borderBlockEndColor",
  "borderRadius", "borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius",
  "borderStartStartRadius", "borderStartEndRadius", "borderEndStartRadius", "borderEndEndRadius",
  "borderImage", "borderImageSource", "borderImageSlice", "borderImageWidth", "borderImageOutset", "borderImageRepeat"
];

function compressFour(a, b, c, d, defaultVal) {
  const val = v => (v === undefined || v === null || v === "") ? defaultVal : v;
  a = val(a);
  b = val(b);
  c = val(c);
  d = val(d);
  if (a === defaultVal && b === defaultVal && c === defaultVal && d === defaultVal) return [];
  if (a === b && b === c && c === d) return [a];
  if (a === c && b === d) return [a, b];
  if (b === d) return [a, b, c];
  return [a, b, c, d];
}

function borderReadFour(style, suffix, defaultVal) {
  let bs = style["borderBlockStart" + suffix], be = style["borderBlockEnd" + suffix];
  let is_ = style["borderInlineStart" + suffix], ie = style["borderInlineEnd" + suffix];
  if (bs == null && is_ == null && be == null && ie == null) {
    bs = style["borderTop" + suffix];
    ie = style["borderRight" + suffix];
    be = style["borderBottom" + suffix];
    is_ = style["borderLeft" + suffix];
  }
  return compressFour(bs, is_, be, ie, defaultVal);
}

function borderReverseRadius(style) {
  const parse = v => {
    if (!v || v === "0" || v === "0px" || v === "unset") return ["0px", "0px"];
    const p = String(v).split(/\s+/);
    return p.length === 1 ? [p[0], p[0]] : p;
  };
  const rd = style.borderRadius;
  if (rd && rd !== "0" && rd !== "0px" && rd !== "unset") {
    const p = rd.split(/\s+/);
    return `radius(${p[0]})`;
}
  const ss = parse(style.borderStartStartRadius ?? style.borderTopLeftRadius);
  const se = parse(style.borderStartEndRadius ?? style.borderTopRightRadius);
  const ee = parse(style.borderEndEndRadius ?? style.borderBottomRightRadius);
  const es = parse(style.borderEndStartRadius ?? style.borderBottomLeftRadius);
  const tl = ss[0], lt = ss[1];
  const tr = se[0], rt = se[1];
  const br = ee[0], rb = ee[1];
  const bl = es[0], lb = es[1];
  let args = [lt, tl, rt, bl, lb, tr, rb, br];
  if (tr === tl && rb === rt && br === bl) {
    args = [lt, tl, rt, bl, lb];
    if (lb === lt) {
      args = [lt, tl, rt, bl];
      // Radius(l, t, r, b=t)
      if (bl === tl) {
        args = [lt, tl, rt];
        // Radius(l, t) -> all corners t l
        if (rt === lt) {
          args = [lt, tl];
          // Radius(val) -> all corners val
          if (tl === lt) {
            args = [lt];
          }
        }
      }
    }
  }
  if (args.length === 8 && args[7] === bl) args.pop();
  if (args.length === 7 && args[6] === rt) args.pop();
  if (args.length === 6 && args[5] === tl) args.pop();
  while (args.length > 1 && args.at(-1) === "0px") args.pop();
  if (args.length === 1 && (args[0] === "0px" || args[0] === "0")) return undefined;
  return `radius(${args.join(",")})`;
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
      const is0 = v => !v || v === "0" || v === "0px" || v === "none";
      if ((["borderBlockStartStyle", "borderInlineStartStyle", "borderBlockEndStyle", "borderInlineEndStyle"].every(p => style[p] === "none") ||
           ["borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle"].every(p => style[p] === "none")) &&
        is0(style.borderRadius) && is0(style.borderTopLeftRadius) && is0(style.borderStartStartRadius)) return "$noBorder";
      
      const r4 = (s, t, d) => {
        const v = borderReadFour(s, t, d);
        return v.length ? v.join(",") : undefined;
      };
      return Optional("$border", "$Border", borderProps,
        { prop: borderProps.filter(p => p.endsWith("Width")), rev: s => r4(s, "Width", "medium") },
        { prop: borderProps.filter(p => p.endsWith("Style")), rev: s => r4(s, "Style", "none") },
        { prop: borderProps.filter(p => p.endsWith("Color")), rev: s => {
          const v = borderReadFour(s, "Color", "currentcolor");
          return v.length ? v.map(c => ColorReverse(c) ?? c).join(",") : undefined;
        }},
        { prop: borderProps.filter(p => p.includes("Radius")), rev: borderReverseRadius }
      )(normalizeToLogical(style));
    }
  }
  //todo border-image!
}
