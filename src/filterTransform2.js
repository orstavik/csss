import {
  isUrl,
  SINmax,
  SIN,
  SEQ2,
  Angle,
  AnglePercent,
  Color,
  Length,
  LengthPercent,
  NumberPercent,
  Number,
  TYPA,
} from "./func.js";

const StrFunc2 = (name, ar) => `${name}(${ar.join(" ")})`;

const FILTER_FUNCS = {
  blur: SEQ2(null, [Length], StrFunc2),
  brightness: SEQ2(null, [NumberPercent], StrFunc2),
  contrast: SEQ2(null, [NumberPercent], StrFunc2),
  grayscale: SEQ2(null, [NumberPercent], StrFunc2),
  invert: SEQ2(null, [NumberPercent], StrFunc2),
  opacity: SEQ2(null, [NumberPercent], StrFunc2),
  saturate: SEQ2(null, [NumberPercent], StrFunc2),
  sepia: SEQ2(null, [NumberPercent], StrFunc2),
  dropShadow: SEQ2(null, [Color, Length, Length, LengthPercent], (n, ar) => `drop-shadow(${ar.join(" ")})`),
  hueRotate: SEQ2(null, [Angle], (n, ar) => `hue-rotate(${ar.join(" ")})`),
};

function handleFilters(name, obj) {
  obj.isUrl &&= obj.isUrl.map(a => a.text).join(" ");
  return { [name]: Object.values(obj).join(" ") };
}


const transformWithFunc = (name, ar) => ({ transform: `${name}(${ar.join(", ")})` });
const rotate = SIN(null, Angle, (name, v) => ({ transform: `${name}(${v})` }));
const translateX = SIN(null, LengthPercent, (name, v) => ({ transform: `${name}(${v})` }));
const scaleX = SIN(null, NumberPercent, (name, v) => ({ transform: `${name}(${v})` }));
const skewX = SIN(null, AnglePercent, (name, v) => ({ transform: `${name}(${v})` }));
const perspective = SIN(null, Length, (name, v) => ({ transform: `${name}(${v})` }));

export default {
  filter: TYPA(FILTER_FUNCS, { isUrl }, handleFilters.bind(null, "filter")),
  backdrop: TYPA(FILTER_FUNCS, { isUrl }, handleFilters.bind(null, "backdropFilter")),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SEQ2(null, Array(6).fill(Number), transformWithFunc),
  matrix3d: SEQ2(null, Array(16).fill(Number), transformWithFunc),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SEQ2(null, Array(3).fill(LengthPercent), transformWithFunc),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SEQ2(null, Array(3).fill(Number), transformWithFunc),
  skewX,
  skewY: skewX,
  rotate3d: SEQ2(null, [Number, Number, Number, Angle], transformWithFunc),
  translate: SINmax(null, 2, LengthPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  scale: SINmax(null, 2, NumberPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  skew: SINmax(null, 2, AnglePercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
};