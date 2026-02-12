/**
 * This file defines background-related CSS shorts. A short is a function that the CSSS
 * parser calls with a parsed expression; it returns an object of camelCase CSS
 * properties. Class names like $bg(linear(...), cover, center) are parsed into that
 * expression and then passed to the short.
 *
 * Helpers used from func.js (imported with descriptive names below):
 *
 * - FunctionBasedOnValueTypes (TYPB)
 *   Parses a short's arguments by type (named or positional slots); returns one
 *   object of CSS properties.
 *
 * - FunctionWithDefaultValues (Umbrella)
 *   With no arguments returns defaultObject; with arguments runs parser(expression)
 *   and merges with defaults.
 *
 * - SingleArgumentFunction (SIN)
 *   Single-argument short: one argument, one interpreter; optional post(name, value);
 *   returns one property.
 *
 * - SequentialFunction (Sequence)
 *   Fixed arity: N arguments interpreted in order; post(name, results) returns
 *   final property object.
 *
 * - CamelWords(allowedWords)
 *   Maps pipe-separated words to kebab-case CSS value.
 *
 * - WordInTable(table)
 *   Maps word to value from lookup table.
 *
 * - Type interpreters (Color, LengthPercent, Url, Angle, AnglePercent): validate/interpret
 *   one argument and return CSS value string.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  Color,
  LengthPercent,
  Url,
  WORD_IN_TABLE: WordInTable,
  CamelWords,
  Angle,
  AnglePercent,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  SIN: SingleArgumentFunction,
  Sequence: SequentialFunction,
  Umbrella: FunctionWithDefaultValues,
} = FunctionTypes;

// --- Background defaults ---

/** Used when $bg() is called with no args. */
const BackgroundDefaultProperties = {
  background: "none",
  backgroundImage: "unset",
  backgroundPosition: "0% 0%",
  backgroundRepeat: "repeat",
  backgroundSize: "auto",
  backgroundOrigin: "padding-box",
  backgroundClip: "border-box",
  backgroundBlendMode: "normal",
  backgroundAttachment: "scroll",
};

// --- Gradient color space keywords ---

/** Maps color space keywords (hslLonger, oklab, etc.) to CSS "in ..." strings. */
const GradientColorSpaceKeyword = WordInTable({
  hslLonger: "in hsl longer hue",
  hslShorter: "in hsl shorter hue",
  hslIncreasing: "in hsl increasing hue",
  hslDecreasing: "in hsl decreasing hue",
  hwbLonger: "in hwb longer hue",
  hwbShorter: "in hwb shorter hue",
  hwbIncreasing: "in hwb increasing hue",
  hwbDecreasing: "in hwb decreasing hue",
  lchLonger: "in lch longer hue",
  lchShorter: "in lch shorter hue",
  lchIncreasing: "in lch increasing hue",
  lchDecreasing: "in lch decreasing hue",
  oklchLonger: "in oklch longer hue",
  oklchShorter: "in oklch shorter hue",
  oklchIncreasing: "in oklch increasing hue",
  oklchDecreasing: "in oklch decreasing hue",
  oklab: "in oklab",
  lab: "in lab",
  lch: "in lch",
  srgb: "in srgb",
  srgbLinear: "in srgb-linear",
  displayP3: "in display-p3",
  a98Rgb: "in a98-rgb",
  prophotoRgb: "in prophoto-rgb",
  rec2020: "in rec2020",
  xyz: "in xyz",
  xyzD50: "in xyz-d50",
  xyzD65: "in xyz-d65",
});

// --- Linear gradient direction keywords ---

/** Maps direction keywords (left, up, downRight, etc.) to CSS "to ..." strings. */
const LinearGradientDirectionKeyword = WordInTable({
  left: "to left",
  right: "to right",
  up: "to top",
  down: "to bottom",
  upLeft: "to top left",
  upRight: "to top right",
  downLeft: "to bottom left",
  downRight: "to bottom right",
});

// --- Gradient argument interpreters ---

/** Interprets angle (e.g., 45deg) or direction keyword (e.g., "left") for linear gradients. */
const LinearGradientAngleOrDirection = e => Angle(e) ?? LinearGradientDirectionKeyword(e);

/** Parses color-stop tuples with optional angle: color(angle?) or color angle. */
const ColorStopWithOptionalAngleSequence = SequentialFunction("(/1-3", [Color, AnglePercent], (_, res) => res.join(" "));
/** Interprets single color or color-stop tuple with optional angle. */
const ColorStopWithOptionalAngle = e => Color(e) ?? ColorStopWithOptionalAngleSequence(e);

/** Parses color-stop tuples with optional length: color(length?) or color length. */
const ColorStopWithOptionalLengthSequence = SequentialFunction("(/1-3", [Color, LengthPercent], (_, res) => res.join(" "));
/** Interprets single color or color-stop tuple with optional length. */
const ColorStopWithOptionalLength = e => Color(e) ?? ColorStopWithOptionalLengthSequence(e);

/** Interprets background position keywords (top, center, blockStart, etc.). */
const BackgroundPositionKeywordOrCenter = CamelWords("top|bottom|left|right|center|xStart|xEnd|yStart|yEnd|blockStart|blockEnd|inlineStart|inlineEnd");
/** Interprets length/percent or position keyword. */
const LengthPercentOrBackgroundPosition = e => LengthPercent(e) ?? BackgroundPositionKeywordOrCenter(e);
/** Interprets length/percent or "auto" keyword. */
const LengthPercentOrAuto = e => e.text === "auto" ? "auto" : LengthPercent(e);

/** Interprets radial gradient size keywords (farthestCorner, closestSide, etc.). */
const RadialGradientSizeKeyword = CamelWords("farthestCorner|farthestSide|closestCorner|closestSide");
/** Interprets length/percent or radial size keyword. */
const LengthPercentOrRadialSizeKeyword = e => LengthPercent(e) ?? RadialGradientSizeKeyword(e);
/** Interprets background position keywords for use in position parsing. */
const BackgroundPositionKeyword = CamelWords("left|center|right|top|bottom|xStart|xEnd|yStart|yEnd|blockStart|blockEnd|inlineStart|inlineEnd");
/** Parses "at" position clause: at(x, y) or at(x y). */
const AtPositionClause = SequentialFunction("at/1-2", [LengthPercentOrBackgroundPosition], (n, res) => "at " + res.join(" "));

// --- Gradient type parsers ---

/** Parser for $conic(...) gradient arguments. */
const ConicGradientArgs = FunctionBasedOnValueTypes({}, {
  At: AtPositionClause,
  Angle,
  ColorSpace: GradientColorSpaceKeyword,
}, {
  colorStops: ColorStopWithOptionalAngle,
}, ({ Angle, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`conic() must have at least one color stop`);
  Angle &&= "from " + Angle;
  const first = [Angle, At, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
})

/** Parser for $linear(...) gradient arguments. */
const LinearGradientArgs = FunctionBasedOnValueTypes({}, {
  AngleOrLinearDirection: LinearGradientAngleOrDirection,
  ColorSpace: GradientColorSpaceKeyword,
}, {
  colorStops: ColorStopWithOptionalLength,
}, ({ AngleOrLinearDirection, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`linear() must have at least one color stop`);
  const first = [AngleOrLinearDirection, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});

/** Parser for $radial(...) / $ellipse(...) gradient arguments. */
const RadialGradientArgs = FunctionBasedOnValueTypes({}, {
  At: AtPositionClause,
  ColorSpace: GradientColorSpaceKeyword,
  FarthestClosest: RadialGradientSizeKeyword,
}, {
  colorStops: ColorStopWithOptionalLength,
  size: LengthPercent,
}, ({ size, FarthestClosest, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`radial() must have at least one color stop`);
  if (size?.length > 2)
    throw new SyntaxError(`radial() size cannot be more than two values: ${size}`);
  size &&= size.join(" ");
  if (size && FarthestClosest)
    throw new SyntaxError(`radial() size specified twice: ${size} AND ${FarthestClosest}`);
  const first = [size, FarthestClosest, At, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});

/** Parser for $circle(...) gradient arguments. */
const CircularRadialGradientArgs = FunctionBasedOnValueTypes({}, {
  At: AtPositionClause,
  ColorSpace: GradientColorSpaceKeyword,
  size: LengthPercentOrRadialSizeKeyword,
}, {
  colorStops: ColorStopWithOptionalLength,
}, ({ size, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`circle() must have at least one color stop`);
  return ["circle", size, At, ColorSpace].filter(Boolean).join(" ") + ", " + colorStops.join(", ")
});

// --- Main background short ---

/** Main parser for $bg(...) short. Handles gradients, sizes, positions, and all background-* properties. */
const BackgroundShort = FunctionBasedOnValueTypes({
  size: SequentialFunction("size/1-2", [LengthPercentOrAuto], (name, ar) => ar.join(" ")),
  linear: LinearGradientArgs,
  ellipse: RadialGradientArgs,
  radial: RadialGradientArgs,
  circle: CircularRadialGradientArgs,
  conic: ConicGradientArgs,
  repeatingLinear: LinearGradientArgs,
  repeatingEllipse: RadialGradientArgs,
  repeatingRadial: RadialGradientArgs,

  repeatingCircle: CircularRadialGradientArgs,
  repeatingConic: ConicGradientArgs,
}, {
  backgroundRepeat: CamelWords("repeat|repeatX|repeatY|space|round|noRepeat"),
  backgroundSize: CamelWords("cover|contain"),
  backgroundOrigin: WordInTable({ originBorderBox: "borderBox", originPaddingBox: "paddingBox", originContentBox: "contentBox" }),
  backgroundClip: CamelWords("borderBox|paddingBox|contentBox|text|borderArea"),
  backgroundAttachment: CamelWords("fixed|scroll|local"),
  backgroundBlendMode: CamelWords("multiply|screen|overlay|darken|lighten|colorDodge|colorBurn|hardLight|softLight|difference|exclusion|hue|saturation|color|luminosity"),
}, {
  Color, Url, positions: BackgroundPositionKeyword, positionValues: LengthPercent
},
  res => {
    if (res.positionValues?.length > 2)
      throw new SyntaxError(`background-position has max 2 values: ${res.positionValues}`);
    if (res.positions?.length > 2)
      throw new SyntaxError(`background-position has max 2 directions: ${res.positions}`);
    if (res.positions || res.positionValues) {
      const [a, c] = res.positions ?? [];
      const [b, d] = res.positionValues ?? [];
      res.backgroundPosition = [a, b, c, d].filter(Boolean).join(" ");
      delete res.positions;
      delete res.positionValues;
    }
    if (res.linear) {
      res.backgroundImage = `linear-gradient(${res.linear})`;
      delete res.linear;
    }
    if (res.ellipse) {
      res.backgroundImage = `radial-gradient(${res.ellipse})`;
      delete res.ellipse;
    }
    if (res.radial) {
      res.backgroundImage = `radial-gradient(${res.radial})`;
      delete res.radial;
    }
    if (res.circle) {
      res.backgroundImage = `radial-gradient(${res.circle})`;
      delete res.circle;
    }
    if (res.conic) {
      res.backgroundImage = `conic-gradient(${res.conic})`;
      delete res.conic;
    }
    if (res.repeatingLinear) {
      res.backgroundImage = `repeating-linear-gradient(${res.repeatingLinear})`;
      delete res.repeatingLinear;
    }
    if (res.repeatingEllipse) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingEllipse})`;
      delete res.repeatingEllipse;
    }
    if (res.repeatingRadial) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingRadial})`;
      delete res.repeatingRadial;
    }
    if (res.repeatingCircle) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingCircle})`;
      delete res.repeatingCircle;
    }
    if (res.repeatingConic) {
      res.backgroundImage = `repeating-conic-gradient(${res.repeatingConic})`;
      delete res.repeatingConic;
    }
    if (res.size) {
      res.backgroundSize = res.size;
      delete res.size;
    }
    if (res.Color) {
      if (res.Color.length == 1)
        res.backgroundColor = res.Color[0];
      else
        res.backgroundImage = `linear-gradient(${res.Color.join(", ")})`;
      delete res.Color;
    }
    //todo check that we only get one url //todo this should be isImage
    if (res.Url) {
      res.backgroundImage = res.Url[0];
      delete res.Url;
    }
    //todo check that we only define backgroundImage once, and all the other properties just once
    return res;
  }
);

/**
 * Export map:
 * - Parsers: BackgroundShort (internal, used by bg umbrella)
 * - Umbrellas (defaults + parser): bg
 * - Single-arg helpers: bgColor
 * - Placeholders: background, backgroundColor, backgroundImage, backgroundPosition,
 *   backgroundRepeat, backgroundSize, backgroundOrigin, backgroundClip,
 *   backgroundBlendMode, backgroundAttachment (reserve name, no override)
 */
export default {
  // --- Reserved keys (no direct short) ---
  background: undefined,
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundPosition: undefined,
  backgroundRepeat: undefined,
  backgroundSize: undefined,
  backgroundOrigin: undefined,
  backgroundClip: undefined,
  backgroundBlendMode: undefined,
  backgroundAttachment: undefined,

  // --- Single-property background shorts ---
  bgColor: SingleArgumentFunction(Color, (n, v) => ({ backgroundColor: v })),

  // --- Background umbrella (defaults + parser) ---
  bg: FunctionWithDefaultValues(BackgroundDefaultProperties, BackgroundShort),
};