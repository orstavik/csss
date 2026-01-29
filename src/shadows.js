//todo we could beneficially use the clock 10:30 etc. as directions for both shadows and gradients!!
import { Length, Color, TYPB, isLengthNumber, WORD_IN_TABLE, Radian } from "./func.js";

// Shadows are handled similarly to transitions. Or even more semantically regulated.
// There are say 10 different types of SHADES. They specify a lengthFactor, blurFactor, spreadFactor. 
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

const SHADES = {
  ambient: { l: 1, b: 1.5, s: 1.25 },
  edgeGlow: { l: 1, b: 3, s: -.5 },
  soft: { l: 1, b: 1, s: 0 },
  normal: { l: 1, b: 1.5, s: 0.75 },
  medium: { l: 1.5, b: 2, s: 1 },
  hard: { l: 2, b: 3, s: 1.5 },
  sharp: { l: 3, b: 4, s: 2 },
  heavy: { l: 4, b: 5, s: 3 },
  massive: { l: 6, b: 8, s: 4 },
  dramatic: { l: 8, b: 10, s: 6 },
  pronounced: { l: 10, b: 12, s: 8 },
  subtle: { l: 0.05, b: 0.1, s: 0.1 },
  delicate: { l: 0.07, b: 0.15, s: 0.15 },
};

//default angle 135deg
// default length is plain number? 5 is "normal" => 0.25rem. 1 is very small => 0.05rem. 10 is large => 0.5rem.
function calculateShadow({ type, angle = Math.PI * .75, length = { num: 5 }, color = "var(--shadowColor, #0003)" }) {
  if (!type) throw new SyntaxError("Missing shadow name: " + Object.keys(SHADES).join("|"));
  if (!length.unit) { length.num /= 20; length.unit = "rem"; }
  const { num, unit } = length;
  const round = (num, places = 2, m = 10 ** places) => Math.round(num * m) / m;
  const x = -round(Math.cos(angle) * type.l * num) + unit;
  const y = round(Math.sin(angle) * type.l * num) + unit;
  const blur = round(type.b * num) + unit;
  const spread = round(type.s * num) + unit;
  return { x, y, blur, spread, color };
}

const IgnoreError = cb => (...args) => { try { return cb(...args); } catch (e) { } }
const parseAbsoluteShadowArgs = IgnoreError(TYPB({}, {
  x: Length,
  y: Length,
  blur: Length,
  spread: Length,
  color: Color,
}, {}));

const parseNamedShadowArgs = TYPB({}, {
  type: WORD_IN_TABLE(SHADES),
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

export default {
  boxShadowInset: a => ({ boxShadow: "inset " + boxShadow(a) }),
  boxShadow: a => ({ boxShadow: boxShadow(a) }),
  textShadow: a => ({ textShadow: textDropShadow(a) }),
  dropShadow: a => `drop-shadow(${textDropShadow(a)})`,
  noBoxShadow: { boxShadow: "none" },
  noTextShadow: { textShadow: "none" },
};
