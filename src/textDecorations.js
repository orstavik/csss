import { CsssPrimitives, BadArgument, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { Length } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
const { ValueReverse, ColorReverse, Optional, normalizeToLogical, TableReverse } = CssFunctions;
import { Color } from "./funcColor.js";

const style = CssValuesToCsssTable("solid|dashed|dotted|double|wavy|blink|grammar-error|spelling-error");

const textDecoration = ({ name, args }) => {
  let s, o, u, t, c, l, tsi;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!c && (c = Color(a))) continue;
    if (!l && (l = Length(a))) continue;
    if (a.kind !== "WORD") throw BadArgument(name, args, i);
    if (!s && (s = style[a.text])) continue;
    if (!o && a.text === "over" && (o = "overline")) continue;
    if (!u && a.text === "under" && (u = "underline")) continue;
    if (!t && a.text === "through" && (t = "line-through")) continue;
    if (!tsi && a.text === "noSkipInk" && (tsi = "none")) continue;
    throw BadArgument(name, args, i);
  }
  return {
    textDecoration: [s, o, u, t, c, l].filter(Boolean).join(" ") || "solid",
    textDecorationSkipInk: tsi || "auto",
  };
};
const textDecorationNone = {
  textDecoration: "none",
  textDecorationSkipInk: "auto",
};
const styleReverse = TableReverse(style);

const props = {
  textDecoration: undefined,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
};

export default {
  csss: {
    textDecoration,
    textDecorationNone,
  },
  props,
  css: {
    textDecoration: style => {
      style = normalizeToLogical(style);
      if (style.textDecorationLine === "none" || style.textDecoration === "none") return "$textDecorationNone";
      return Optional("$textDecoration",
        style => {
          const s = style.textDecorationStyle?.toLowerCase();
          return (s && s !== "solid" && s !== "initial") ? styleReverse[s] : undefined;
        },
        style => {
          const l = style.textDecorationLine?.toLowerCase();
          if (!l || l === "none" || l === "initial") return undefined;
          const res = [];
          if (l.includes("overline")) res.push("over");
          if (l.includes("underline")) res.push("under");
          if (l.includes("line-through")) res.push("through");
          return res.length ? res.join(",") : undefined;
        },
        style => {
          const c = style.textDecorationColor;
          return (c && c !== "initial" && c !== "currentcolor") ? ColorReverse(c) : undefined;
        },
        style => ValueReverse(style.textDecorationThickness),
        style => style.textDecorationSkipInk === "none" ? "noSkipInk" : undefined
      )(style);
    }
  }
};
