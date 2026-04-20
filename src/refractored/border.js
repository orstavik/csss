/**
 * This file defines border-related CSS shorts. A short is a function that the CSSS
 * parser calls with a parsed expression; it returns an object of camelCase CSS
 * properties. Class names like $Border(radius(4px), solid, red) are parsed into that
 * expression and then passed to the short.
 *
 * Helpers used from func.js (imported with descriptive names below):
 *
 * - FunctionBasedOnValueTypes (TYPB)
 *   Parses a short's arguments by type (named or positional slots); returns one
 *   object of CSS properties.
 *
 * - SequentialFunction (Sequence)
 *   Fixed arity: N arguments interpreted in order; post(name, results) returns
 *   final property object.
 *
 * - CamelWords(allowedWords)
 *   Maps pipe-separated words to kebab-case CSS value.
 *
 * - Type interpreters (Color, LengthPercent): validate/interpret one argument and return
 *   CSS value string.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  Color,
  LengthPercent,
  CamelWords,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  Sequence: SequentialFunction,
} = FunctionTypes;

// --- Border umbrella wrapper ---

/**
 * Wraps the border parser to apply logical border defaults and handle shorthand
 * conversion. When no logical properties are set, converts to `border` shorthand.
 * Applies defaults: style="solid", width="medium", color="currentColor" when needed.
 */
const BorderUmbrellaWrapper = cb => exp => {
  const res = cb(exp);
  if (!res.borderStartStartRadius) res.borderRadius ??= "0";
  if (!res.borderInlineColor && !res.borderInlineStyle && !res.borderInlineWidth) {
    const res2 = {
      border: [res.borderWidth, res.borderStyle, res.borderColor].filter(Boolean).join(" ") || "none",
      ...res,
    }
    delete res2.borderColor;
    delete res2.borderStyle;
    delete res2.borderWidth;
    return res2;
  }
  if (!res.borderInlineStyle) res.borderStyle ??= "solid";
  if (!res.borderInlineWidth) res.borderWidth ??= "medium";
  if (!res.borderInlineColor) res.borderColor ??= "currentColor";
  return res;
};

// --- Border radius parser ---

/**
 * Parses logical border-radius arguments (1-8 values) into logical corner properties.
 *
 * Logical property order: inline then block, start then end.
 * - 1 value: all corners same
 * - 2 values: [inline, block] → applied to all corners
 * - 3-4 values: [inlineStart, blockStart, inlineEnd, blockEnd]
 * - 5-8 values: individual corner overrides (see inline comments for mapping)
 *
 * Each corner can have two values: block-radius inline-radius (e.g., "2px 4px").
 */
const BorderRadiusParser = SequentialFunction("/1-8", [LengthPercent], (n, ar) => {
  if (ar.length === 1)
    return { borderRadius: ar[0] };
  if (ar.length === 2) {
    const [inlineRadius, blockRadius] = ar;
    return {
      borderStartStartRadius: `${blockRadius} ${inlineRadius}`,
      borderStartEndRadius: `${blockRadius} ${inlineRadius}`,
      borderEndEndRadius: `${blockRadius} ${inlineRadius}`,
      borderEndStartRadius: `${blockRadius} ${inlineRadius}`,
    };
  }
  if (ar.length <= 4) {
    const [inlineStart, blockStart, inlineEnd, blockEnd = blockStart] = ar;
    return {
      borderStartStartRadius: inlineStart == blockStart ? inlineStart : `${blockStart} ${inlineStart}`,
      borderStartEndRadius: blockStart == inlineEnd ? blockStart : `${blockStart} ${inlineEnd}`,
      borderEndStartRadius: blockEnd == inlineStart ? blockEnd : `${blockEnd} ${inlineStart}`,
      borderEndEndRadius: inlineEnd == blockEnd ? inlineEnd : `${blockEnd} ${inlineEnd}`,
    };
  }
  // 5-8 values: individual corner overrides
  // Values 5-8 override: 5→inlineLeftBottom(+1), 6→blockTopRight(+2), 7→inlineRightBottom(+3), 8→blockBottomRight(+4)
  const [inlineLeftTop, blockTopLeft, inlineRightTop, blockBottomLeft, inlineLeftBottom, blockTopRight = blockTopLeft, inlineRightBottom = inlineRightTop, blockBottomRight = blockBottomLeft] = ar;
  return {
    borderStartStartRadius: blockTopLeft == inlineLeftTop ? blockTopLeft : `${blockTopLeft} ${inlineLeftTop}`,
    borderStartEndRadius: blockTopRight == inlineRightTop ? blockTopRight : `${blockTopRight} ${inlineRightTop}`,
    borderEndStartRadius: blockBottomLeft == inlineLeftBottom ? blockBottomLeft : `${blockBottomLeft} ${inlineLeftBottom}`,
    borderEndEndRadius: blockBottomRight == inlineRightBottom ? blockBottomRight : `${blockBottomRight} ${inlineRightBottom}`,
  };
});

// --- Logical border property helper ---

/**
 * Converts 1-4 logical border property values (width/style/color) into
 * logical CSS properties (borderInline*, borderBlock*).
 *
 * @param {string} prop - Property suffix ("Width", "Style", "Color")
 * @param {Array} ar - Array of 1-4 values
 * @returns {Object} Object with borderInline* and/or borderBlock* properties
 */
function LogicalBorderPropertyHelper(prop, ar) {
  if (!ar)
    return {};
  if (ar.length > 4)
    throw new SyntaxError(`More than 4 border ${prop} arguments.`);
  return ar.length == 1 ?
    { ["border" + prop]: ar[0] } :
    {
      ["borderInline" + prop]: [ar[0], ar[2]].filter(Boolean).join(" "),
      ["borderBlock" + prop]: [ar[1], ar[3]].filter(Boolean).join(" "),
    };
}

// --- Main border short ---

/** Border width interpreter: accepts LengthPercent or keywords (thin|medium|thick). */
const BorderWidthInterpreter = a => LengthPercent(a) ?? CamelWords("thin|medium|thick")(a);

/** Border style interpreter: accepts CSS border-style keywords. */
const BorderStyleInterpreter = CamelWords("solid|dotted|dashed|double|groove|ridge|inset|outset|none|hidden");

/**
 * Main parser for $border(...) short. Handles radius, width, style, and color
 * with logical (inline/block) property support.
 */
const BorderShort = FunctionBasedOnValueTypes({
  radius: BorderRadiusParser,
  r: BorderRadiusParser,
},
  {},
  {
    Color,
    Width: BorderWidthInterpreter,
    Style: BorderStyleInterpreter,
  }, obj => {
    const res = {};
    if (obj.Width) Object.assign(res, LogicalBorderPropertyHelper("Width", obj.Width));
    if (obj.Style) Object.assign(res, LogicalBorderPropertyHelper("Style", obj.Style));
    if (obj.Color) Object.assign(res, LogicalBorderPropertyHelper("Color", obj.Color));
    if (obj.radius ?? obj.r) Object.assign(res, obj.radius ?? obj.r);
    return res;
  }
);

/**
 * Export map:
 * - Parsers: BorderShort (internal, used by Border umbrella)
 * - Umbrellas (defaults + parser): Border
 * - Presets: noBorder
 * - Placeholders: borderStyle, borderWidth, borderColor, borderRadius, and all
 *   directional/logical border properties (reserve name, no override)
 */
export default {
  // --- Border parser and umbrella ---
  border: BorderShort,
  Border: BorderUmbrellaWrapper(BorderShort),

  // --- Border presets ---
  noBorder: { border: "none" },

  // --- Reserved keys (no direct short) ---

  borderStyle: undefined,
  borderWidth: undefined,
  borderColor: undefined,
  borderRadius: undefined,

  borderTopStyle: undefined,
  borderTopWidth: undefined,
  borderTopColor: undefined,

  borderRightStyle: undefined,
  borderRightWidth: undefined,
  borderRightColor: undefined,

  borderBottomStyle: undefined,
  borderBottomWidth: undefined,
  borderBottomColor: undefined,

  borderLeftStyle: undefined,
  borderLeftWidth: undefined,
  borderLeftColor: undefined,

  borderInline: undefined,
  borderBlock: undefined,

  borderInlineStart: undefined,
  borderBlockStart: undefined,
  borderInlineEnd: undefined,
  borderBlockEnd: undefined,

  borderInlineEndColor: undefined,
  borderBlockStartColor: undefined,
  borderInlineStartColor: undefined,
  borderBlockEndColor: undefined,

  borderInlineEndWidth: undefined,
  borderBlockStartWidth: undefined,
  borderInlineStartWidth: undefined,
  borderBlockEndWidth: undefined,

  borderInlineEndStyle: undefined,
  borderBlockStartStyle: undefined,
  borderInlineStartStyle: undefined,
  borderBlockEndStyle: undefined,

  borderStartEndRadius: undefined,
  borderEndStartRadius: undefined,
  borderStartStartRadius: undefined,
  borderEndEndRadius: undefined,
  //todo block all the others properties that can set border style, width, color, and radius.
};

// //there are different ways to do the logic here..
// //length == 2, I think that we could have top/bottom too
// //length == 3, then the third becomes all the inline ones
// //length === 4, then forth is the inline on the end side
// export function toLogicalEight(NAME, DEFAULT, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   let [bss, iss, bes, ies, bse, ise, bee, iee] = ar;
//   if (ar.length === 2) ise = ies = iee = iss, bse = bes = bee = bss;
//   if (ar.length === 3) ise = ies = iee = iss, bse = bss, bee = bes;
//   if (ar.length === 4) ise = iss, iee = ies, bse = bss, bee = bes;
//   if (ar.length === 5) ise = iss, iee = ies, bee = bes;
//   if (ar.length === 6) iee = ies, bee = bes;
//   if (ar.length === 7) iee = ies;
//   const res = {};
//   if (bss || iss) res[NAME + "TopLeft"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
//   if (bse || ies) res[NAME + "TopRight"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
//   if (bes || ise) res[NAME + "BottomLeft"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
//   if (bee || iee) res[NAME + "BottomRight"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
//   return res;
// }

// export function toRadiusFour(NAME, ar) {
//   ar = ar.map(isBasic).map(a => a.text);
//   if (!(ar instanceof Array))
//     return { [NAME]: ar };
//   if (ar.length === 1)
//     return { [NAME]: ar[0] };
//   return {
//     [NAME + "StartStart"]: ar[0],
//     [NAME + "EndEnd"]: ar[2] ?? ar[0],
//     [NAME + "StartEnd"]: ar[1],
//     [NAME + "EndStart"]: ar[3] ?? ar[1],
//   };
// }