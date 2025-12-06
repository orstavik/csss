import { TYPB, isColor, isLength } from "./func.js";

const textDecoration = TYPB({
  noSkipInk: "none",
  over: "overline",
  under: "underline",
  through: "line-through",
}, {
  isColor,
  isLength,
  style: a => /^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/.test(a.text) ? a : undefined,
}, {
}, ({ style, over, under, through, isColor, isLength, noSkipInk }) => ({
  textDecoration: [style, over, under, through, isColor, isLength].filter(Boolean).join(" ") || "solid",
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