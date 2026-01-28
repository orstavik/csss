import {
  SINmax,
  SIN,
  SEQ,
  Angle,
  AnglePercent,
  Color,
  Length,
  LengthPercent,
  NumberPercent,
  NumberInterpreter,
  Url,
  TYPB,
} from "./func.js";

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
  dropShadow: SEQ([Color, Length, Length, LengthPercent], (n, ar) => `drop-shadow(${ar.join(" ")})`),
  //this is done in shadows.. we need this to be used from there, as we have some more functionality that can be useful!
};

const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const rotate = SIN(Angle, (name, v) => ({ transform: `${name}(${v})` }));
const translateX = SIN(LengthPercent, (name, v) => ({ transform: `${name}(${v})` }));
const scaleX = SIN(NumberPercent, (name, v) => ({ transform: `${name}(${v})` }));
const skewX = SIN(AnglePercent, (name, v) => ({ transform: `${name}(${v})` }));
const perspective = SIN(Length, (name, v) => ({ transform: `${name}(${v})` }));

export default {
  filter: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SINmax(6, NumberInterpreter, transformWithFunc),
  matrix3d: SINmax(16, NumberInterpreter, transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SINmax(3, LengthPercent, transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SINmax(3, NumberInterpreter, transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: SEQ([NumberInterpreter, NumberInterpreter, NumberInterpreter, Angle], transformWithFunc),
  translate: SINmax(2, LengthPercent, transformWithFunc),
  scale: SINmax(2, NumberPercent, transformWithFunc),
  skew: SINmax(2, AnglePercent, transformWithFunc),
};