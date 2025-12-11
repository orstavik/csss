import {
  isAngle,
  isAnglePercent,
  isLength,
  isLengthPercent,
  isNumber,
  isColor,
  isUrl,
  isNumberPercent,
  SEQ,
  SIN_minmax,
  TYPA,
} from "./func.js";

const StrFunc = (name) => ar => `${name}(${ar.join(" ")})`;
const CommaStrFunc = (name) => ar => ({ transform: `${name}(${ar.join(", ")})` });

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

export default {
  filter: TYPA(FILTER_FUNCS, { isUrl }, handleFilters.bind(null, "filter")),
  backdrop: TYPA(FILTER_FUNCS, { isUrl }, handleFilters.bind(null, "backdropFilter")),
  backdropFilter: undefined,

  transform: undefined,
  matrix: SEQ([Array(6).fill(isNumber)], CommaStrFunc("matrix")),
  matrix3d: SEQ([Array(16).fill(isNumber)], CommaStrFunc("matrix3d")),
  perspective: SEQ([isLength], CommaStrFunc("perspective")),
  rotate: SEQ([isAngle], CommaStrFunc("rotate")),
  rotateZ: SEQ([isAngle], CommaStrFunc("rotateZ")),
  rotateY: SEQ([isAngle], CommaStrFunc("rotateY")),
  rotateX: SEQ([isAngle], CommaStrFunc("rotateX")),
  translateX: SEQ([isLengthPercent], CommaStrFunc("translateX")),
  translateY: SEQ([isLengthPercent], CommaStrFunc("translateY")),
  translateZ: SEQ([isLengthPercent], CommaStrFunc("translateZ")),
  translate3d: SEQ([Array(3).fill(isLengthPercent)], CommaStrFunc("translate3d")),
  scaleX: SEQ([isNumber], CommaStrFunc("scaleX")),
  scaleY: SEQ([isNumber], CommaStrFunc("scaleY")),
  scaleZ: SEQ([isNumber], CommaStrFunc("scaleZ")),
  scale3d: SEQ([Array(3).fill(isNumber)], CommaStrFunc("scale3d")),
  skewX: SEQ([isAnglePercent], CommaStrFunc("skewX")),
  skewY: SEQ([isAnglePercent], CommaStrFunc("skewY")),
  rotate3d: SEQ([isNumber, isNumber, isNumber, isAngle], CommaStrFunc("rotate3d")),
  translate: SIN_minmax(1, 2, isLengthPercent, CommaStrFunc("translate")),
  scale: SIN_minmax(1, 2, isNumberPercent, CommaStrFunc("scale")),
  skew: SIN_minmax(1, 2, isAnglePercent, CommaStrFunc("skew")),
};