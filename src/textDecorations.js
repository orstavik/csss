import { interpretColor, interpretLength } from "./func.js";

//sequence based
function textDecoration(line, style, args) {
  let thick, color, textDecorationSkipInk;
  for (let a of args) {
    let a2;
    if (a2 = interpretColor(a))
      color = a2.text;
    else if (a2 = interpretLength(a))
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
  dashedOverLine: args => textDecoration("overline", "dashed", args),
  dashedOverLineThrough: args => textDecoration("overline line-through", "dashed", args),
  dashedOverUnderLine: args => textDecoration("overline underline", "dashed", args),
  dashedOverUnderLineThrough: args => textDecoration("overline underline line-through", "dashed", args),
  dashedLineThrough: args => textDecoration("line-through", "dashed", args),
  dashedUnderLine: args => textDecoration("underline", "dashed", args),
  dashedUnderLineThrough: args => textDecoration("underline line-through", "dashed", args),
  dottedOverLine: args => textDecoration("overline", "dotted", args),
  dottedOverLineThrough: args => textDecoration("overline line-through", "dotted", args),
  dottedOverUnderLine: args => textDecoration("overline underline", "dotted", args),
  dottedOverUnderLineThrough: args => textDecoration("overline underline line-through", "dotted", args),
  dottedLineThrough: args => textDecoration("line-through", "dotted", args),
  dottedUnderLine: args => textDecoration("underline", "dotted", args),
  dottedUnderLineThrough: args => textDecoration("underline line-through", "dotted", args),
  doubleOverLine: args => textDecoration("overline", "double", args),
  doubleOverLineThrough: args => textDecoration("overline line-through", "double", args),
  doubleOverUnderLine: args => textDecoration("overline underline", "double", args),
  doubleOverUnderLineThrough: args => textDecoration("overline underline line-through", "double", args),
  doubleLineThrough: args => textDecoration("line-through", "double", args),
  doubleUnderLine: args => textDecoration("underline", "double", args),
  doubleUnderLineThrough: args => textDecoration("underline line-through", "double", args),
  wavyOverLine: args => textDecoration("overline", "wavy", args),
  wavyOverLineThrough: args => textDecoration("overline line-through", "wavy", args),
  wavyOverUnderLine: args => textDecoration("overline underline", "wavy", args),
  wavyOverUnderLineThrough: args => textDecoration("overline underline line-through", "wavy", args),
  wavyLineThrough: args => textDecoration("line-through", "wavy", args),
  wavyUnderLine: args => textDecoration("underline", "wavy", args),
  wavyUnderLineThrough: args => textDecoration("underline line-through", "wavy", args),
  overLine: args => textDecoration("overline", null, args),
  overLineThrough: args => textDecoration("overline line-through", null, args),
  overUnderLine: args => textDecoration("overline underline", null, args),
  overUnderLineThrough: args => textDecoration("overline underline line-through", null, args),
  lineThrough: args => textDecoration("line-through", null, args),
  underLine: args => textDecoration("underline", null, args),
  underLineThrough: args => textDecoration("underline line-through", null, args),
  blink: args => textDecoration("blink", null, args),
  grammarError: args => textDecoration("grammar-error", null, args),
  spellingError: args => textDecoration("spelling-error", null, args),
}