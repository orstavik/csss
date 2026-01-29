import { TYPB, Color, Length, Umbrella, WORD_IN_TABLE } from "./func.js";

const DefaultTextDecoration = { textDecoration: "unset", textDecorationSkipInk: "auto" };

const textDecoration = TYPB({}, {
  textDecorationSkipInk: WORD_IN_TABLE({ noSkipInk: "none" }),
  Color,
  Length,
  style: a => a.text?.match(/^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/)?.[0],
}, {
  lines: WORD_IN_TABLE({ over: "overline", under: "underline", through: "line-through", }),
}, ({ style, lines, Color, Length, textDecorationSkipInk }) => {
  lines = Array.from(new Set(lines));
  const textDecoration = [style, ...lines, Color, Length].filter(Boolean).join(" ") || "solid";
  return !textDecorationSkipInk ?
    { textDecoration } :
    { textDecoration, textDecorationSkipInk, };
});

export default {
  textDecoration: Umbrella(DefaultTextDecoration, textDecoration),
  noTextDecoration: DefaultTextDecoration,
  textDecorationNone: DefaultTextDecoration,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
}