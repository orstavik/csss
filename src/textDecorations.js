import { CsssPrimitives, BadArgument, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { Length } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
const { ValueReverse, ColorReverse, TableReverse } = CssFunctions;
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
  textDecorationSkipInk: "auto", //todo do we need to add this property?? nah..
};
const styleReverse = TableReverse(style);

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
    textDecoration: style => {
      let { textDecoration, textDecorationLine, textDecorationStyle,
        textDecorationColor, textDecorationThickness, textDecorationSkipInk } = style;
      if (textDecorationLine === "none" || textDecoration === "none")
        return "$textDecorationNone";

      textDecorationStyle &&= styleReverse[textDecorationStyle];
      textDecorationColor &&= ColorReverse(textDecorationColor);
      textDecorationThickness &&= ValueReverse(textDecorationThickness);
      textDecorationLine &&= textDecorationLine
        .replaceAll(/none|initial/g, "").trim()
        .replaceAll(/line-?/g, "")
        .replaceAll(" ", ",");
      textDecorationSkipInk = (textDecorationSkipInk === "none" && "noSkipInk");
      const args = [textDecorationStyle, textDecorationLine, textDecorationColor, textDecorationThickness, textDecorationSkipInk].filter(Boolean);
      return args.length ? `$textDecoration(${args.join(",")})` : undefined;
    }
  }
};