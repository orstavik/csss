import {
  evaluateAngle,
  evaluateAnglePercent,
  evaluateLength,
  evaluateLengthPercent,
  evaluateNumber,
  evaluateColor,
  evaluateUrl,
  evaluateNumberPercent,
} from "./func.js";

function evaluate(evaluators, args, optionals) {
  const res = [];
  for (let i = 0; i < evaluators.length; i++) {

  }
  return evaluators.map((evaluator, i) => {
    const v = evaluator(args[i], i);
    if (!v && optional[i]) return undefined;
    if (!v) throw new SyntaxError(`Bad argument ${i + 1}: ${args[i].text ?? args[i]}. Expected ${evaluator.name.slice(2)}.`);
    return v;
  });
}

const strictFunctionAsObj = (prop, funcName, sep, evaluators) =>
  args => ({ [prop]: `${funcName}(${evaluators.map((e, i) => e(args[i], i)).join(sep)})` });

// const onePropObj = (prop, cb) => (args) => ({ [prop]: cb(args) });
// const cssFunction = (name, sep = ", ") => (ar) => `${name}(${ar.join(sep)})`;
// const argSequence = (evaluators) => (args) => {
//   if (args.length != evaluators.length)
//     throw new SyntaxError(`${name} requires exactly ${evaluators.length} arguments, got ${args.length} arguments.`);
//   return args.map((a, i) => {
//     const v = evaluators[i](a, i);
//     if (v !== undefined) return v;
//     throw new SyntaxError(`Bad argument ${i + 1}: ${a.text ?? a}. Expected ${evaluators[i].name.slice(2)}.`);
//   });
// };

// const blur = onePropObj("filter", cssFunction("blur", " ", argSequence([evaluateLength])));

// const argSequenceOptional = (evaluators, skips) => (args) => args.reduce((acc, arg, i) => {
//   const v = evaluators[i](arg, i);
//   if (!v && skips[i]) return acc;
//   if (!v) throw new SyntaxError(`Bad argument ${i + 1}: ${arg.text ?? arg}`);
//   acc.push(v);
//   return acc;
// }, []);


const sequenceFunctionAsObj = (prop, name, evaluators, sep = " ") => args => {
  if (args.length != evaluators.length)
    throw new SyntaxError(`${name} requires ${evaluators.length} arguments, got ${args.length} arguments.`);
  return { [prop]: `${name}(${args.map((a, i) => evaluators[i](a, i)).join(sep)})` };
};

const sequenceProperties = (prop, evaluators, sep = " ") => args => {
  if (args.length != evaluators.length)
    throw new SyntaxError(`${prop} requires ${evaluators.length} arguments, got ${args.length} arguments.`);
  return { [prop]: args.map((a, i) => evaluators[i](a, i)).join(sep) };
};

const transform2 = (prop, name, [evaluator], sep) => args => {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return { [prop]: `${name}(${args.map(evaluator).join(sep)})` };
};

export default {
  transform: undefined,

  noBackdropFilter: { backdropFilter: "none" },
  noFilter: { filter: "none" },

  blur: sequenceFunctionAsObj("filter", "blur", [evaluateLength]),
  brightness: sequenceFunctionAsObj("filter", "brightness", [evaluateNumberPercent]),
  contrast: sequenceFunctionAsObj("filter", "contrast", [evaluateNumberPercent]),
  grayscale: sequenceFunctionAsObj("filter", "grayscale", [evaluateNumberPercent]),
  invert: sequenceFunctionAsObj("filter", "invert", [evaluateNumberPercent]),
  opacity: sequenceFunctionAsObj("filter", "opacity", [evaluateNumberPercent]),
  saturate: sequenceFunctionAsObj("filter", "saturate", [evaluateNumberPercent]),
  sepia: sequenceFunctionAsObj("filter", "sepia", [evaluateNumberPercent]),
  dropShadow: sequenceFunctionAsObj("filter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  hueRotate: sequenceFunctionAsObj("filter", "hue-rotate", [evaluateAngle]),
  filter: sequenceProperties("filter", [evaluateUrl]),

  backdropBlur: sequenceFunctionAsObj("backdropFilter", "blur", [evaluateLength]),
  backdropBrightness: sequenceFunctionAsObj("backdropFilter", "brightness", [evaluateNumberPercent]),
  backdropContrast: sequenceFunctionAsObj("backdropFilter", "contrast", [evaluateNumberPercent]),
  backdropGrayscale: sequenceFunctionAsObj("backdropFilter", "grayscale", [evaluateNumberPercent]),
  backdropInvert: sequenceFunctionAsObj("backdropFilter", "invert", [evaluateNumberPercent]),
  backdropOpacity: sequenceFunctionAsObj("backdropFilter", "opacity", [evaluateNumberPercent]),
  backdropSaturate: sequenceFunctionAsObj("backdropFilter", "saturate", [evaluateNumberPercent]),
  backdropSepia: sequenceFunctionAsObj("backdropFilter", "sepia", [evaluateNumberPercent]),
  backdropDropShadow: sequenceFunctionAsObj("backdropFilter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  backdropHueRotate: sequenceFunctionAsObj("backdropFilter", "hue-rotate", [evaluateAngle]),
  backdropFilter: sequenceProperties("backdropFilter", [evaluateUrl]),

  matrix: sequenceFunctionAsObj("transform", "matrix", Array(6).fill(evaluateNumber), ", "),
  matrix3d: sequenceFunctionAsObj("transform", "matrix3d", Array(16).fill(evaluateNumber), ", "),
  perspective: sequenceFunctionAsObj("transform", "perspective", [evaluateLength], ", "),
  rotate: sequenceFunctionAsObj("transform", "rotate", [evaluateAngle], ", "),
  rotateZ: sequenceFunctionAsObj("transform", "rotateZ", [evaluateAngle], ", "),
  rotateY: sequenceFunctionAsObj("transform", "rotateY", [evaluateAngle], ", "),
  rotateX: sequenceFunctionAsObj("transform", "rotateX", [evaluateAngle], ", "),
  translateX: sequenceFunctionAsObj("transform", "translateX", [evaluateLengthPercent], ", "),
  translateY: sequenceFunctionAsObj("transform", "translateY", [evaluateLengthPercent], ", "),
  translateZ: sequenceFunctionAsObj("transform", "translateZ", [evaluateLengthPercent], ", "),
  translate3d: sequenceFunctionAsObj("transform", "translate3d", Array(3).fill(evaluateLengthPercent), ", "),
  scaleX: sequenceFunctionAsObj("transform", "scaleX", [evaluateNumber], ", "),
  scaleY: sequenceFunctionAsObj("transform", "scaleY", [evaluateNumber], ", "),
  scaleZ: sequenceFunctionAsObj("transform", "scaleZ", [evaluateNumber], ", "),
  scale3d: sequenceFunctionAsObj("transform", "scale3d", Array(3).fill(evaluateNumber), ", "),
  skewX: sequenceFunctionAsObj("transform", "skewX", [evaluateAnglePercent], ", "),
  skewY: sequenceFunctionAsObj("transform", "skewY", [evaluateAnglePercent], ", "),
  translate: transform2("transform", "translate", [evaluateLengthPercent], ", "),
  scale: transform2("transform", "scale", [evaluateNumberPercent], ", "),
  skew: transform2("transform", "skew", [evaluateAnglePercent], ", "),
  rotate3d: sequenceFunctionAsObj("transform", "rotate3d", [evaluateNumber, evaluateNumber, evaluateNumber, evaluateAngle], ", "),
};