/**
 * Filter and transform shorts:
 * - Map expressions like $filter(blur(4px), brightness(120%)) and
 *   $rotate(45deg) into CSS `filter`, `backdrop-filter` and `transform` values.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses typed argument blocks into objects.
 * - SingleArgumentFunction (SIN): single-argument helpers for individual functions.
 * - SequentialFunction (Sequence): fixed-arity helpers for matrix/3d functions.
 * - ValueTypes: Angle, AnglePercent, Length, LengthPercent, NumberPercent,
 *   NumberInterpreter, Url.
 *
 * Export map:
 * - `filter`, `backdrop`: main shorts that build the `filter` and
 *   `backdrop-filter` properties.
 * - Transform shorts: rotate/translate/scale/skew + 2d/3d matrix helpers.
 * - Placeholders: transform, backdropFilter (reserve native longhands).
 */
import shadow from "./shadows.js";
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  Angle,
  AnglePercent,
  Length,
  LengthPercent,
  NumberPercent,
  NumberInterpreter,
  Url,
} = ValueTypes;

const {
  SIN: SingleArgumentFunction,
  Sequence: SequentialFunction,
  TYPB: FunctionBasedOnValueTypes,
} = FunctionTypes;

/** Maps filter-function shorts to their stringified CSS representations. */
const FilterFunctionMap = {
  blur: SingleArgumentFunction(Length, (n, v) => `${n}(${v})`),
  brightness: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  contrast: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  grayscale: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  invert: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  opacity: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  saturate: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  sepia: SingleArgumentFunction(NumberPercent, (n, v) => `${n}(${v})`),
  hueRotate: SingleArgumentFunction(Angle, (n, v) => `hue-rotate(${v})`),
  dropShadow: shadow.dropShadow,
};

/** Builds a `transform` property from a function name and argument list. */
const buildTransformFromArgs = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
/** Builds a `transform` property from a function name and a single argument. */
const buildSingleArgTransform = (name, v) => ({ transform: `${name}(${v})` });

/** Shortcuts for common transform functions. */
const rotate = SingleArgumentFunction(Angle, buildSingleArgTransform);
const translateX = SingleArgumentFunction(LengthPercent, buildSingleArgTransform);
const scaleX = SingleArgumentFunction(NumberPercent, buildSingleArgTransform);
const skewX = SingleArgumentFunction(AnglePercent, buildSingleArgTransform);
const perspective = SingleArgumentFunction(Length, buildSingleArgTransform);

export default {
  // --- Filter / backdrop-filter shorts ---
  filter: FunctionBasedOnValueTypes(FilterFunctionMap, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: FunctionBasedOnValueTypes(FilterFunctionMap, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  // --- Transform shorts & placeholders ---
  transform: undefined,
  matrix: SequentialFunction("matrix/6", [NumberInterpreter], buildTransformFromArgs),
  matrix3d: SequentialFunction("matrix3d/16", [NumberInterpreter], buildTransformFromArgs),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SequentialFunction("translate3d/3", [LengthPercent], buildTransformFromArgs),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SequentialFunction("scale3d/3", [NumberInterpreter], buildTransformFromArgs),
  skewX,
  skewY: skewX,
  rotate3d: SequentialFunction("rotate3d/4", [NumberInterpreter, NumberInterpreter, NumberInterpreter, Angle], buildTransformFromArgs),
  translate: SequentialFunction("translate/1-2", [LengthPercent], buildTransformFromArgs),
  scale: SequentialFunction("scale/1-2", [NumberPercent], buildTransformFromArgs),
  skew: SequentialFunction("skew/1-2", [AnglePercent], buildTransformFromArgs),
};