import shadow from "./shadows.js";
import { SIN, Sequence, Angle, AnglePercent, Length, LengthPercent, NumberPercent, NumberInterpreter, Url, TYPB, } from "./func.js";

const FILTER_FUNCS = {
  blur: SIN(Length, (n, v) => `${n}(${v})`),
  brightness: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  contrast: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  grayscale: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  invert: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  opacity: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  saturate: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  sepia: SIN(NumberPercent, (n, v) => `${n}(${v})`),
  hueRotate: SIN(Angle, (n, v) => `hue-rotate(${v})`),
  dropShadow: shadow.dropShadow,
};

const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const transformWithFuncOne = (name, v) => ({ transform: `${name}(${v})` });
const rotate = SIN(Angle, transformWithFuncOne);
const translateX = SIN(LengthPercent, transformWithFuncOne);
const scaleX = SIN(NumberPercent, transformWithFuncOne);
const skewX = SIN(AnglePercent, transformWithFuncOne);
const perspective = SIN(Length, transformWithFuncOne);

export default {
  filter: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  transform: undefined,
  matrix: Sequence("matrix/6", [NumberInterpreter], transformWithFunc),
  matrix3d: Sequence("matrix3d/16", [NumberInterpreter], transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: Sequence("translate3d/3", [LengthPercent], transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: Sequence("scale3d/3", [NumberInterpreter], transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: Sequence("rotate3d/4", [NumberInterpreter, NumberInterpreter, NumberInterpreter, Angle], transformWithFunc),
  translate: Sequence("translate/1-2", [LengthPercent], transformWithFunc),
  scale: Sequence("scale/1-2", [NumberPercent], transformWithFunc),
  skew: Sequence("skew/1-2", [AnglePercent], transformWithFunc),
};