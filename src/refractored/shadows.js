/**
 * Shadow shorts:
 * - Map expressions like $boxShadow(normal, 135deg, 5, #0003) into
 *   CSS `box-shadow`, `text-shadow`, and `drop-shadow()` values.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses named shadow parameters.
 * - ValueTypes: Length, Color, Radian, WordInTable.
 * - isLengthNumber: validates length or plain number arguments.
 *
 * Shadow types (Shades): define relative factors for offset, blur, and spread
 * that scale with a user-provided length value.
 *
 * Export map:
 * - `boxShadow`, `boxShadowInset`, `textShadow`, `dropShadow`: shadow shorts.
 * - Presets: `noBoxShadow`, `noTextShadow`.
 */
//todo we could beneficially use the clock 10:30 etc. as directions for both shadows and gradients!!
import {
  FunctionTypes,
  ValueTypes,
  isLengthNumber,
} from "./func.js";

const {
  Length,
  Color,
  WordInTable,
  Radian,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
} = FunctionTypes;

// Shadows are handled similarly to transitions. Or even more semantically regulated.
// There are say 10 different types of Shades. They specify a lengthFactor, blurFactor, spreadFactor. 
// Then in the $shadow(shade,angle,length,color?) to use it.
// If the length is passed in as 
// 
// var(--shadowColor, #0003) is the default color for the shadow.
// To change the default shadow color to for example white in @dark mode, do for example:
//   @dark$--shadowColor(#fff3)
// 
// By design, we flip @light/@dark on the elements with the shadow. Lob.
// This is likely better than trying to cluster such changes, as the shadows is unlikely to follow the same thematic logic in light and dark mode.
// Ie. elements that have the same shadow in lightmode, might have different/no shadows in darkmode, and vice versa.

// --- Shadow type presets ---

/** Named shadow presets: each defines lengthFactor, blurFactor, and spreadFactor. */
const Shades = {
  ambient: { lengthFactor: 1, blurFactor: 1.5, spreadFactor: 1.25 },
  edgeGlow: { lengthFactor: 1, blurFactor: 3, spreadFactor: -.5 },
  soft: { lengthFactor: 1, blurFactor: 1, spreadFactor: 0 },
  normal: { lengthFactor: 1, blurFactor: 1.5, spreadFactor: 0.75 },
  medium: { lengthFactor: 1.5, blurFactor: 2, spreadFactor: 1 },
  hard: { lengthFactor: 2, blurFactor: 3, spreadFactor: 1.5 },
  sharp: { lengthFactor: 3, blurFactor: 4, spreadFactor: 2 },
  heavy: { lengthFactor: 4, blurFactor: 5, spreadFactor: 3 },
  massive: { lengthFactor: 6, blurFactor: 8, spreadFactor: 4 },
  dramatic: { lengthFactor: 8, blurFactor: 10, spreadFactor: 6 },
  pronounced: { lengthFactor: 10, blurFactor: 12, spreadFactor: 8 },
  subtle: { lengthFactor: 0.05, blurFactor: 0.1, spreadFactor: 0.1 },
  delicate: { lengthFactor: 0.07, blurFactor: 0.15, spreadFactor: 0.15 },
};

// --- Shadow calculation ---

//default angle 135deg
// default length is plain number? 5 is "normal" => 0.25rem. 1 is very small => 0.05rem. 10 is large => 0.5rem.
/** Computes x/y/blur/spread/color from named shadow parameters. */
function calculateShadow({ type, angle = Math.PI * .75, length = { num: 5 }, color = "var(--shadowColor, #0003)" }) {
  if (!type) throw new SyntaxError("Missing shadow name: " + Object.keys(Shades).join("|"));
  if (!length.unit) { length.num /= 20; length.unit = "rem"; }
  const { num, unit } = length;
  const round = (num, places = 2, m = 10 ** places) => Math.round(num * m) / m;
  const x = -round(Math.cos(angle) * type.lengthFactor * num) + unit;
  const y = round(Math.sin(angle) * type.lengthFactor * num) + unit;
  const blur = round(type.blurFactor * num) + unit;
  const spread = round(type.spreadFactor * num) + unit;
  return { x, y, blur, spread, color };
}

// --- Shadow argument parsers ---

const suppressErrors = cb => (...args) => { try { return cb(...args); } catch (e) { } }
const parseAbsoluteShadowArgs = suppressErrors(FunctionBasedOnValueTypes({}, {
  x: Length,
  y: Length,
  blur: Length,
  spread: Length,
  color: Color,
}, {}));

const parseNamedShadowArgs = FunctionBasedOnValueTypes({}, {
  type: WordInTable(Shades),
  angle: Radian,
  length: isLengthNumber,
  color: Color,
}, {}, calculateShadow);

function boxShadow(a) {
  const { x, y, blur, spread, color } = parseAbsoluteShadowArgs(a) ?? parseNamedShadowArgs(a);
  return [x, y, blur, spread, color].filter(Boolean).join(" ");
}
function textDropShadow(a) {
  const { x, y, blur, color } = parseAbsoluteShadowArgs(a) ?? parseNamedShadowArgs(a);
  return [x, y, blur, color].filter(Boolean).join(" ");
}

/**
 * Export map:
 * - `boxShadow`, `boxShadowInset`: box-shadow shorts.
 * - `textShadow`: text-shadow short.
 * - `dropShadow`: returns a drop-shadow() filter function string.
 * - Presets: `noBoxShadow`, `noTextShadow`.
 */
export default {
  boxShadowInset: a => ({ boxShadow: "inset " + boxShadow(a) }),
  boxShadow: a => ({ boxShadow: boxShadow(a) }),
  textShadow: a => ({ textShadow: textDropShadow(a) }),
  dropShadow: a => `drop-shadow(${textDropShadow(a)})`,
  noBoxShadow: { boxShadow: "none" },
  noTextShadow: { textShadow: "none" },
};
