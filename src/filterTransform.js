import {
  isAngle,
  isAnglePercent,
  isLength,
  isLengthPercent,
  isNumber,
  isColor,
  isUrl,
  isNumberPercent,
} from "./func.js";

const sequence = (interpreters, post) => (args, name) => {
  if (args.length != interpreters.length)
    throw new SyntaxError(`${name} requires ${interpreters.length} arguments, got ${args.length} arguments.`);
  return post(interpreters.map((interpreter, i) => {
    const a2 = interpreter(args[i]);
    if (a2)
      return a2.text;
    throw new SyntaxError(`Bad argument ${name}/${i + 1}.
    "${args[i].text}" is not a ${interpreter.name.slice(2)}.
    ${name}(${args.slice(0, i).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).join(",")}).`);
  }));
};

const polymorphism = (funcs) => (args, name) => {
  let errors = [];
  for (let cb of funcs) {
    try {
      const v = cb(args, name);
      if (v !== undefined) return v;
    } catch (e) {
      errors.push(e.message);
    }
  }
  throw new SyntaxError(errors.join("\n   OR   \n"));
};

const SpaceListObj = (prop) => ar => ({ [prop]: ar.join(" ") });
const SpaceFuncObj = (prop, func) => ar => ({ [prop]: `${func}(${ar.join(" ")})` });
const CommaFuncObj = (prop, func) => ar => ({ [prop]: `${func}(${ar.join(", ")})` });

export default {
  transform: undefined,

  noBackdropFilter: { backdropFilter: "none" },
  noFilter: { filter: "none" },

  blur: sequence([isLength], SpaceFuncObj("filter", "blur")),
  brightness: sequence([isNumberPercent], SpaceFuncObj("filter", "brightness")),
  contrast: sequence([isNumberPercent], SpaceFuncObj("filter", "contrast")),
  grayscale: sequence([isNumberPercent], SpaceFuncObj("filter", "grayscale")),
  invert: sequence([isNumberPercent], SpaceFuncObj("filter", "invert")),
  opacity: sequence([isNumberPercent], SpaceFuncObj("filter", "opacity")),
  saturate: sequence([isNumberPercent], SpaceFuncObj("filter", "saturate")),
  sepia: sequence([isNumberPercent], SpaceFuncObj("filter", "sepia")),
  dropShadow: sequence([isColor, isLength, isLength, isLengthPercent], SpaceFuncObj("filter", "drop-shadow")),
  hueRotate: sequence([isAngle], SpaceFuncObj("filter", "hue-rotate")),
  filter: sequence([isUrl], SpaceListObj("filter")),

  backdropBlur: sequence([isLength], SpaceFuncObj("backdropFilter", "blur")),
  backdropBrightness: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "brightness")),
  backdropContrast: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "contrast")),
  backdropGrayscale: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "grayscale")),
  backdropInvert: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "invert")),
  backdropOpacity: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "opacity")),
  backdropSaturate: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "saturate")),
  backdropSepia: sequence([isNumberPercent], SpaceFuncObj("backdropFilter", "sepia")),
  backdropDropShadow: sequence([isColor, isLength, isLength, isLengthPercent], SpaceFuncObj("backdropFilter", "drop-shadow")),
  backdropHueRotate: sequence([isAngle], SpaceFuncObj("backdropFilter", "hue-rotate")),
  backdropFilter: sequence([isUrl], SpaceListObj("backdropFilter")),

  matrix: sequence([Array(6).fill(isNumber)], CommaFuncObj("transform", "matrix")),
  matrix3d: sequence([Array(16).fill(isNumber)], CommaFuncObj("transform", "matrix3d")),
  perspective: sequence([isLength], CommaFuncObj("transform", "perspective")),
  rotate: sequence([isAngle], CommaFuncObj("transform", "rotate")),
  rotateZ: sequence([isAngle], CommaFuncObj("transform", "rotateZ")),
  rotateY: sequence([isAngle], CommaFuncObj("transform", "rotateY")),
  rotateX: sequence([isAngle], CommaFuncObj("transform", "rotateX")),
  translateX: sequence([isLengthPercent], CommaFuncObj("transform", "translateX")),
  translateY: sequence([isLengthPercent], CommaFuncObj("transform", "translateY")),
  translateZ: sequence([isLengthPercent], CommaFuncObj("transform", "translateZ")),
  translate3d: sequence([Array(3).fill(isLengthPercent)], CommaFuncObj("transform", "translate3d")),
  scaleX: sequence([isNumber], CommaFuncObj("transform", "scaleX")),
  scaleY: sequence([isNumber], CommaFuncObj("transform", "scaleY")),
  scaleZ: sequence([isNumber], CommaFuncObj("transform", "scaleZ")),
  scale3d: sequence([Array(3).fill(isNumber)], CommaFuncObj("transform", "scale3d")),
  skewX: sequence([isAnglePercent], CommaFuncObj("transform", "skewX")),
  skewY: sequence([isAnglePercent], CommaFuncObj("transform", "skewY")),
  rotate3d: sequence([isNumber, isNumber, isNumber, isAngle], CommaFuncObj("transform", "rotate3d")),

  translate: polymorphism([
    sequence([isLengthPercent], CommaFuncObj("transform", "translate")),
    sequence([isLengthPercent, isLengthPercent], CommaFuncObj("transform", "translate")),
  ]),
  scale: polymorphism([
    sequence([isNumberPercent], CommaFuncObj("transform", "scale")),
    sequence([isNumberPercent, isNumberPercent], CommaFuncObj("transform", "scale")),
  ]),
  skew: polymorphism([
    sequence([isAnglePercent], CommaFuncObj("transform", "skew")),
    sequence([isAnglePercent, isAnglePercent], CommaFuncObj("transform", "skew")),
  ]),
};