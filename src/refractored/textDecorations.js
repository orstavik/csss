/**
 * Text decoration shorts:
 * - Map expressions like $textDecoration(under, wavy, red) into
 *   CSS `text-decoration` and `text-decoration-skip-ink` properties.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses style/color/line arguments.
 * - FunctionWithDefaultValues (Umbrella): wraps parsed props with defaults.
 * - WordInTable: maps shorthand words (over, under, through) to CSS values.
 * - ValueTypes: Color, Length.
 *
 * Export map:
 * - `textDecoration`: umbrella (defaults + parser).
 * - Presets: `noTextDecoration`, `textDecorationNone`.
 * - Reserved text-decoration-related longhand properties.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  Color,
  Length,
  WordInTable,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  Umbrella: FunctionWithDefaultValues,
} = FunctionTypes;

// --- Text decoration defaults ---

/** Used when $textDecoration() is called with no args. */
const TextDecorationDefaultProperties = { textDecoration: "none", textDecorationSkipInk: "auto" };

// --- Main text decoration short ---

/** Parses $textDecoration(...) arguments into decoration line, style, color, and thickness. */
const textDecoration = FunctionBasedOnValueTypes({}, {
  textDecorationSkipInk: WordInTable({ noSkipInk: "none" }),
  Color,
  Length,
  style: a => a.text?.match(/^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/)?.[0],
}, {
  lines: WordInTable({ over: "overline", under: "underline", through: "line-through", }),
}, ({ style, lines, Color, Length, textDecorationSkipInk }) => {
  lines = Array.from(new Set(lines));
  const textDecoration = [style, ...lines, Color, Length].filter(Boolean).join(" ") || "solid";
  return !textDecorationSkipInk ?
    { textDecoration } :
    { textDecoration, textDecorationSkipInk, };
});

/**
 * Export map:
 * - `textDecoration`: umbrella (defaults + parser).
 * - Presets: `noTextDecoration`, `textDecorationNone`.
 * - Reserved longhands: textDecorationColor, textDecorationLine,
 *   textDecorationSkip, textDecorationSkipInk, textDecorationStyle,
 *   textDecorationThickness.
 */
export default {
  textDecoration: FunctionWithDefaultValues(TextDecorationDefaultProperties, textDecoration),
  noTextDecoration: TextDecorationDefaultProperties,
  textDecorationNone: TextDecorationDefaultProperties,
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
}
