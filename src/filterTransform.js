import shadow from "./shadows.js";
import { ValueTypes, FunctionTypes } from "./func.js";
const { FunctionBasedOnValueTypes, SequentialFunction, SingleArgumentFunction } = FunctionTypes;
const { Angle, Length, NumberInterpreter, Url, AnglePercent, LengthPercent, NumberPercent } = ValueTypes;

const FILTER_FUNCS = {
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

const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const transformWithFuncOne = (name, v) => ({ transform: `${name}(${v})` });
const rotate = SingleArgumentFunction(Angle, transformWithFuncOne);
const translateX = SingleArgumentFunction(LengthPercent, transformWithFuncOne);
const scaleX = SingleArgumentFunction(NumberPercent, transformWithFuncOne);
const skewX = SingleArgumentFunction(AnglePercent, transformWithFuncOne);
const perspective = SingleArgumentFunction(Length, transformWithFuncOne);

export default {
  filter: FunctionBasedOnValueTypes(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: FunctionBasedOnValueTypes(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SequentialFunction("matrix/6", [NumberInterpreter], transformWithFunc),
  matrix3d: SequentialFunction("matrix3d/16", [NumberInterpreter], transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SequentialFunction("translate3d/3", [LengthPercent], transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SequentialFunction("scale3d/3", [NumberInterpreter], transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: SequentialFunction("rotate3d/4", [NumberInterpreter, NumberInterpreter, NumberInterpreter, Angle], transformWithFunc),
  translate: SequentialFunction("translate/1-2", [LengthPercent], transformWithFunc),
  scale: SequentialFunction("scale/1-2", [NumberPercent], transformWithFunc),
  skew: SequentialFunction("skew/1-2", [AnglePercent], transformWithFunc),
};