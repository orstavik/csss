import { CsssPrimitives, CsssFunctions, matchArgsWithInterpreters } from "./func.js";
const { LengthPercent } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
const { ValueReverse } = CssFunctions
import { Color } from "./funcColor.js";
import { CssFunctions } from "./funcReverse.js";

const squeezeArgs = args => {
  if (!args) return args;
  if (args.length === 8 && args[7] === args[3]) args.pop();
  if (args.length === 7 && args[6] === args[2]) args.pop();
  if (args.length === 6 && args[5] === args[1]) args.pop();
  if (args.length === 5 && args[4] === args[0]) args.pop();
  if (args.length === 4 && args[3] === args[1]) args.pop();
  if (args.length === 3 && args[2] === args[0]) args.pop();
  if (args.length === 2 && args[1] === args[0]) args.pop();
  return args;
};

const Styles = CssValuesToCsssTable("solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden");
const Style = a => Styles[a.text];
const Widths = CssValuesToCsssTable("thin|medium|thick");
const Width = a => Widths[a.text] ?? LengthPercent(a);

/**
 * args.length 0-4: blockStart inlineStart blockEnd inlineEnd 
 * args.length 4+: blockStartStart inlineStartStart blockEndStart inlineEndStart blockStartEnd inlineStartEnd blockEndEnd inlineEndEnd
 */
const Radius = ({ name, args }) => {
  if (name !== "radius") return;
  if (!args.length || args.length > 8) throw new SyntaxError(`radius() takes 1-8 arguments, got ${args.length}.`);
  const ar = args.map(LengthPercent);
  if (ar.length === 1)
    return { borderRadius: ar[0] };
  const [tl, lt, bl = tl, rt = lt, tr = tl, lb = lt, br = bl, rb = rt] = ar;
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
  },
  css: {
    border: style => {
      const {
        borderBlockStartWidth: w1, borderInlineStartWidth: w2, borderBlockEndWidth: w3, borderInlineEndWidth: w4,
        borderBlockStartStyle: s1, borderInlineStartStyle: s2, borderBlockEndStyle: s3, borderInlineEndStyle: s4,
        borderBlockStartColor: c1, borderInlineStartColor: c2, borderBlockEndColor: c3, borderInlineEndColor: c4,
        borderStartStartRadius: r1, borderStartEndRadius: r2, borderEndStartRadius: r3, borderEndEndRadius: r4,
      } = style;
      const width1 = (w1 != null || w2 != null || w3 != null || w4 != null) ? [w1, w2, w3, w4] : null;
      const style1 = (s1 != null || s2 != null || s3 != null || s4 != null) ? [s1, s2, s3, s4] : null;
      const color1 = (c1 != null || c2 != null || c3 != null || c4 != null) ? [c1, c2, c3, c4] : null;
      const radius1 = (r1 != null || r2 != null || r3 != null || r4 != null) ? [r1, r2, r3, r4] : null;
      if (!width1 && !style1 && !color1 && !radius1)
        return undefined;
      let radiusX;
      if (radius1) {
        const [tl, lt, tr, rt, bl, lb, br, rb] = radius1.flatMap(a => ((a = a.split(/\s+/)), a.length == 2 ? a : [a[0], a[0]]));
        radiusX = [tl, lt, bl, rt, tr, lb, br, rb];
      }
      const width2 = width1?.map(v => ValueReverse(v) ?? "0");
      const style2 = style1?.map(v => ValueReverse(v) ?? "none");
      const color2 = color1?.map(v => ValueReverse(v) ?? "#currentcolor");
      const radius2 = radiusX?.map(v => ValueReverse(v) ?? "0");

      let width3 = squeezeArgs(width2);
      let style3 = squeezeArgs(style2);
      let color3 = squeezeArgs(color2);
      let radius3 = squeezeArgs(radius2);

      const name = (width3 && style3 && color3 && radius3) ? "$Border" : "$border";
      if (name === "$Border") {
        if (width3.length === 1 && width3[0] === "medium") width3 = null;
        // if (style3.length === 1 && style3[0] === "none") style3 = null;
        if (color3.length === 1 && color3[0] === "#currentcolor") color3 = null;
        if (radius3.length === 1 && radius3[0] === "0") radius3 = null;
      }
      const res = [];
      if (style3) res.push(...style3);
      if (width3) res.push(...width3);
      if (color3) res.push(...color3);
      if (radius3) res.push(`radius(${radius3.join(",")})`);
      return `${name}(${res.join(",")})`;
    }
  }
  //todo border-image!
}