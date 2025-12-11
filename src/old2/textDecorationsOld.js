import { isColor, isLength } from "./func.js";

//sequence based
function textDecoration(line, style, args) {
  let thick, color, textDecorationSkipInk;
  for (let a of args) {
    let a2;
    if (a2 = isColor(a))
      color = a2.text;
    else if (a2 = isLength(a))
      thick = a2.text;
    else if (a.text = "noSkipInk")
      textDecorationSkipInk = "none";
    else
      throw new SyntaxError(`Invalid $textDecoration argument: ${a.text}.`);
  }
  return {
    textDecoration: [line, style, color, thick].filter(Boolean).join(" "),
    textDecorationSkipInk,
  };
}

export default {
  textDecoration: undefined,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
  noTextDecoration: { textDecoration: "none", textDecorationSkipInk: "none" },
  dashedOverLine: textDecoration.bind(null, "overline", "dashed"),
  dashedOverLineThrough: textDecoration.bind(null, "overline line-through", "dashed"),
  dashedOverUnderLine: textDecoration.bind(null, "overline underline", "dashed"),
  dashedOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "dashed"),
  dashedLineThrough: textDecoration.bind(null, "line-through", "dashed"),
  dashedUnderLine: textDecoration.bind(null, "underline", "dashed"),
  dashedUnderLineThrough: textDecoration.bind(null, "underline line-through", "dashed"),
  dottedOverLine: textDecoration.bind(null, "overline", "dotted"),
  dottedOverLineThrough: textDecoration.bind(null, "overline line-through", "dotted"),
  dottedOverUnderLine: textDecoration.bind(null, "overline underline", "dotted"),
  dottedOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "dotted"),
  dottedLineThrough: textDecoration.bind(null, "line-through", "dotted"),
  dottedUnderLine: textDecoration.bind(null, "underline", "dotted"),
  dottedUnderLineThrough: textDecoration.bind(null, "underline line-through", "dotted"),
  doubleOverLine: textDecoration.bind(null, "overline", "double"),
  doubleOverLineThrough: textDecoration.bind(null, "overline line-through", "double"),
  doubleOverUnderLine: textDecoration.bind(null, "overline underline", "double"),
  doubleOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "double"),
  doubleLineThrough: textDecoration.bind(null, "line-through", "double"),
  doubleUnderLine: textDecoration.bind(null, "underline", "double"),
  doubleUnderLineThrough: textDecoration.bind(null, "underline line-through", "double"),
  wavyOverLine: textDecoration.bind(null, "overline", "wavy"),
  wavyOverLineThrough: textDecoration.bind(null, "overline line-through", "wavy"),
  wavyOverUnderLine: textDecoration.bind(null, "overline underline", "wavy"),
  wavyOverUnderLineThrough: textDecoration.bind(null, "overline underline line-through", "wavy"),
  wavyLineThrough: textDecoration.bind(null, "line-through", "wavy"),
  wavyUnderLine: textDecoration.bind(null, "underline", "wavy"),
  wavyUnderLineThrough: textDecoration.bind(null, "underline line-through", "wavy"),
  overLine: textDecoration.bind(null, "overline", null),
  overLineThrough: textDecoration.bind(null, "overline line-through", null),
  overUnderLine: textDecoration.bind(null, "overline underline", null),
  overUnderLineThrough: textDecoration.bind(null, "overline underline line-through", null),
  lineThrough: textDecoration.bind(null, "line-through", null),
  underLine: textDecoration.bind(null, "underline", null),
  underLineThrough: textDecoration.bind(null, "underline line-through", null),
  blink: textDecoration.bind(null, "blink", null),
  grammarError: textDecoration.bind(null, "grammar-error", null),
  spellingError: textDecoration.bind(null, "spelling-error", null),
}