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

function filter1(prop, name, evaluators, args) {
  if (args.length != evaluators.length)
    throw new SyntaxError(`${name} requires exactly ${evaluators.length} arguments, got ${args.length} arguments.`);
  return { [prop]: `${name}(${args.map((a, i) => evaluators[i](a, i)).join(" ")})` };
}
function filter2(prop, evaluator, args) {
  if (args.length != 1)
    throw new SyntaxError(`${prop} requires exactly 1 argument, got ${args.length} arguments.`);
  return { [prop]: evaluator(args[0]) };
}

function transform1(name, evaluator, count, args) {
  if (args.length != count)
    throw new SyntaxError(`${name} requires exactly ${count} arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
}
function transform2(name, evaluator, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
}
function rotate3d([one, two, three, four]) {
  one = evaluateNumber(one, 0);
  two = evaluateNumber(two, 1);
  three = evaluateNumber(three, 2);
  four = evaluateAngle(four, 3);
  return { transform: `rotate3d(${[one, two, three, four].join(", ")})` };
}

export default {
  transform: undefined,

  noBackdropFilter: { backdropFilter: "none" },
  noFilter: { filter: "none" },

  blur: filter1.bind(null, "filter", "blur", [evaluateLength]),
  brightness: filter1.bind(null, "filter", "brightness", [evaluateNumberPercent]),
  contrast: filter1.bind(null, "filter", "contrast", [evaluateNumberPercent]),
  grayscale: filter1.bind(null, "filter", "grayscale", [evaluateNumberPercent]),
  invert: filter1.bind(null, "filter", "invert", [evaluateNumberPercent]),
  opacity: filter1.bind(null, "filter", "opacity", [evaluateNumberPercent]),
  saturate: filter1.bind(null, "filter", "saturate", [evaluateNumberPercent]),
  sepia: filter1.bind(null, "filter", "sepia", [evaluateNumberPercent]),
  dropShadow: filter1.bind(null, "filter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  hueRotate: filter1.bind(null, "filter", "hue-rotate", [evaluateAngle]),
  filter: filter2.bind(null, "filter", evaluateUrl),

  backdropBlur: filter1.bind(null, "backdropFilter", "blur", [evaluateLength]),
  backdropBrightness: filter1.bind(null, "backdropFilter", "brightness", [evaluateNumberPercent]),
  backdropContrast: filter1.bind(null, "backdropFilter", "contrast", [evaluateNumberPercent]),
  backdropGrayscale: filter1.bind(null, "backdropFilter", "grayscale", [evaluateNumberPercent]),
  backdropInvert: filter1.bind(null, "backdropFilter", "invert", [evaluateNumberPercent]),
  backdropOpacity: filter1.bind(null, "backdropFilter", "opacity", [evaluateNumberPercent]),
  backdropSaturate: filter1.bind(null, "backdropFilter", "saturate", [evaluateNumberPercent]),
  backdropSepia: filter1.bind(null, "backdropFilter", "sepia", [evaluateNumberPercent]),
  backdropDropShadow: filter1.bind(null, "backdropFilter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  backdropHueRotate: filter1.bind(null, "backdropFilter", "hue-rotate", [evaluateAngle]),
  backdropFilter: filter2.bind(null, "backdropFilter", evaluateUrl),

  matrix: transform1.bind(null, "matrix", evaluateNumber, 6),
  matrix3d: transform1.bind(null, "matrix3d", evaluateNumber, 16),
  perspective: transform1.bind(null, "perspective", evaluateLength, 1),
  rotate: transform1.bind(null, "rotate", evaluateAngle, 1),
  rotateZ: transform1.bind(null, "rotateZ", evaluateAngle, 1),
  rotateY: transform1.bind(null, "rotateY", evaluateAngle, 1),
  rotateX: transform1.bind(null, "rotateX", evaluateAngle, 1),
  translateX: transform1.bind(null, "translateX", evaluateLengthPercent, 1),
  translateY: transform1.bind(null, "translateY", evaluateLengthPercent, 1),
  translateZ: transform1.bind(null, "translateZ", evaluateLengthPercent, 1),
  translate3d: transform1.bind(null, "translate3d", evaluateLengthPercent, 3),
  scaleX: transform1.bind(null, "scaleX", evaluateNumber, 1),
  scaleY: transform1.bind(null, "scaleY", evaluateNumber, 1),
  scaleZ: transform1.bind(null, "scaleZ", evaluateNumber, 1),
  scale3d: transform1.bind(null, "scale3d", evaluateNumber, 3),
  skewX: transform1.bind(null, "skewX", evaluateAnglePercent, 1),
  skewY: transform1.bind(null, "skewY", evaluateAnglePercent, 1),
  translate: transform2.bind(null, "translate", evaluateLengthPercent),
  scale: transform2.bind(null, "scale", evaluateNumberPercent),
  skew: transform2.bind(null, "skew", evaluateAnglePercent),
  rotate3d,
};