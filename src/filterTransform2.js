import {
  isAngle,
  isLength,
  isLengthPercent,
  isNumber,
  isColor,
  isUrl,
  isNumberPercent,
  SEQ,
  SINmax,
  SIN,
  Angle,
  AnglePercent,
  Length,
  LengthPercent,
  NumberPercent,
  TYPA,
} from "./func.js";

const StrFunc = (name) => ar => `${name}(${ar.join(" ")})`;

const FILTER_FUNCS = {
  blur: SEQ([isLength], StrFunc("blur")),
  brightness: SEQ([isNumberPercent], StrFunc("brightness")),
  contrast: SEQ([isNumberPercent], StrFunc("contrast")),
  grayscale: SEQ([isNumberPercent], StrFunc("grayscale")),
  invert: SEQ([isNumberPercent], StrFunc("invert")),
  opacity: SEQ([isNumberPercent], StrFunc("opacity")),
  saturate: SEQ([isNumberPercent], StrFunc("saturate")),
  sepia: SEQ([isNumberPercent], StrFunc("sepia")),
  dropShadow: SEQ([isColor, isLength, isLength, isLengthPercent], StrFunc("drop-shadow")),
  hueRotate: SEQ([isAngle], StrFunc("hue-rotate")),
};

function handleFilters(name, obj) {
  obj.isUrl &&= obj.isUrl.map(a => a.text).join(" ");
  return { [name]: Object.values(obj).join(" ") };
}


const CommaStrFunc = (name) => ar => ({ transform: `${name}(${ar.join(", ")})` });
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
  matrix: SEQ([Array(6).fill(isNumber)], CommaStrFunc("matrix")),
  matrix3d: SEQ([Array(16).fill(isNumber)], CommaStrFunc("matrix3d")),
  perspective,
  rotate,
  rotateX: rotate,
  rotateY: rotate,
  rotateZ: rotate,
  translateX,
  translateY: translateX,
  translateZ: translateX,
  translate3d: SEQ([Array(3).fill(isLengthPercent)], CommaStrFunc("translate3d")),
  scaleX,
  scaleY: scaleX,
  scaleZ: scaleX,
  scale3d: SEQ([Array(3).fill(isNumber)], CommaStrFunc("scale3d")),
  skewX,
  skewY: skewX,
  rotate3d: SEQ([isNumber, isNumber, isNumber, isAngle], CommaStrFunc("rotate3d")),
  translate: SINmax(null, 2, LengthPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  scale: SINmax(null, 2, NumberPercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
  skew: SINmax(null, 2, AnglePercent, (name, ar) => ({ transform: `${name}(${ar.join(", ")})` })),
};