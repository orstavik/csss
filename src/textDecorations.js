import { CsssPrimitives, BadArgument, CsssFunctions } from "./func2.js";
const { Color, Length } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;

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
}
export default {
  csss: {
    textDecoration,
    textDecorationNone,
  },
  props: {
    textDecoration: undefined,
    textDecorationColor: undefined,
    textDecorationLine: undefined,
    textDecorationSkip: undefined,
    textDecorationSkipInk: undefined,
    textDecorationStyle: undefined,
    textDecorationThickness: undefined,
  },
  css: {

  }
}