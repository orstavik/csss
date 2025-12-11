import { TYPB, Color, Length } from "./func.js";

const textDecoration = TYPB({
  noSkipInk: "none",
  over: "overline",
  under: "underline",
  through: "line-through",
}, {
  Color,
  Length,
  style: a => a.text?.match(/^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/)?.[0],
}, {
}, ({ style, over, under, through, Color, Length, noSkipInk }) => ({
  textDecoration: [style, over, under, through, Color, Length].filter(Boolean).join(" ") || "solid",
  textDecorationSkipInk: noSkipInk ?? "auto",
}));

export default {
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
  textDecoration,
  noTextDecoration: { textDecoration: "none", textDecorationSkipInk: "auto" },
  textDecorationNone: { textDecoration: "none", textDecorationSkipInk: "auto" },
}