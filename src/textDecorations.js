
import { ValueTypes, FunctionTypes } from "./func.js";
import { ReverseFunctionTypes, ReverseValueTypes } from "./reverse.js";
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest } = FunctionTypes;
const { ReverseFunctionWithDefaultValues, ReverseFunctionBasedOnValueTypes } = ReverseFunctionTypes;
const { ReverseWordToValue } = ReverseValueTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes; const DefaultTextDecoration = { textDecoration: "none", textDecorationSkipInk: "auto" };

const textDecoration = FunctionBasedOnValueTypes({}, {
  textDecorationSkipInk: WordToValue({ noSkipInk: "none" }),
  Color,
  Length,
  style: a => a.text?.match(/^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/)?.[0],
}, {
  lines: WordToValue({ over: "overline", under: "underline", through: "line-through", }),
}, ({ style, lines, Color, Length, textDecorationSkipInk }) => {
  lines = Array.from(new Set(lines));
  const textDecoration = [style, ...lines, Color, Length].filter(Boolean).join(" ") || "solid";
  return !textDecorationSkipInk ?
    { textDecoration } :
    { textDecoration, textDecorationSkipInk, };
});

const reverseTextDecorationInner = (style) => {
  let args = [];
  if (style.textDecorationSkipInk === "none") {
    args.push("noSkipInk");
    delete style.textDecorationSkipInk;
  } else if (style.textDecorationSkipInk === "auto" || style.textDecorationSkipInk === "unset") {
    delete style.textDecorationSkipInk;
  }

  if (style.textDecoration && style.textDecoration !== "none" && style.textDecoration !== "unset") {
    // Basic split for reconstruction
    args.push(...style.textDecoration.split(" "));
    delete style.textDecoration;
  } else if (style.textDecoration === "none" || style.textDecoration === "unset") {
    delete style.textDecoration;
  }
  return args;
};

export const _reverse = {
  textDecoration: ReverseFunctionWithDefaultValues(DefaultTextDecoration, reverseTextDecorationInner, "textDecoration", "TextDecoration")
};

export default {
  _reverse,
  textDecoration: FunctionWithDefaultValues(DefaultTextDecoration, textDecoration),
  noTextDecoration: DefaultTextDecoration,
  textDecorationNone: DefaultTextDecoration,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
}