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
  Number,
  Url,
  TYPB,
} from "./func.js";

const FILTER_FUNCS = {
  blur: SIN(null, Length, (n, v) => `${n}(${v})`),
  brightness: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  contrast: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  grayscale: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  invert: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  opacity: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  saturate: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  sepia: SIN(null, NumberPercent, (n, v) => `${n}(${v})`),
  hueRotate: SIN(null, Angle, (n, v) => `hue-rotate(${v})`),
  dropShadow: SEQ([Color, Length, Length, LengthPercent], (n, ar) => `drop-shadow(${ar.join(" ")})`),
};

const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const rotate = SIN(null, Angle, (name, v) => ({ transform: `${name}(${v})` }));
const translateX = SIN(null, LengthPercent, (name, v) => ({ transform: `${name}(${v})` }));
const scaleX = SIN(null, NumberPercent, (name, v) => ({ transform: `${name}(${v})` }));
const skewX = SIN(null, AnglePercent, (name, v) => ({ transform: `${name}(${v})` }));
const perspective = SIN(null, Length, (name, v) => ({ transform: `${name}(${v})` }));

export default {
  filter: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
  backdrop: TYPB(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SEQ(Array(6).fill(Number), transformWithFunc),
  matrix3d: SEQ(Array(16).fill(Number), transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SEQ(Array(3).fill(LengthPercent), transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SEQ(Array(3).fill(Number), transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: SEQ([Number, Number, Number, Angle], transformWithFunc),
  translate: SINmax(2, LengthPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  scale: SINmax(2, NumberPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  skew: SINmax(2, AnglePercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
};