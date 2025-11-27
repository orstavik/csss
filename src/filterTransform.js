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

const filter1 = (prop, name, evaluators) => args => {
  if (args.length != evaluators.length)
    throw new SyntaxError(`${name} requires exactly ${evaluators.length} arguments, got ${args.length} arguments.`);
  return { [prop]: `${name}(${args.map((a, i) => evaluators[i](a, i)).join(" ")})` };
};

const filter2 = (prop, evaluator) => args => {
  if (args.length != 1)
    throw new SyntaxError(`${prop} requires exactly 1 argument, got ${args.length} arguments.`);
  return { [prop]: evaluator(args[0]) };
};

const transform1 = (name, evaluator, count) => args => {
  if (args.length != count)
    throw new SyntaxError(`${name} requires exactly ${count} arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
};

const transform2 = (name, evaluator) => args => {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return { transform: `${name}(${args.map(evaluator).join(", ")})` };
};
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

  blur: filter1("filter", "blur", [evaluateLength]),
  brightness: filter1("filter", "brightness", [evaluateNumberPercent]),
  contrast: filter1("filter", "contrast", [evaluateNumberPercent]),
  grayscale: filter1("filter", "grayscale", [evaluateNumberPercent]),
  invert: filter1("filter", "invert", [evaluateNumberPercent]),
  opacity: filter1("filter", "opacity", [evaluateNumberPercent]),
  saturate: filter1("filter", "saturate", [evaluateNumberPercent]),
  sepia: filter1("filter", "sepia", [evaluateNumberPercent]),
  dropShadow: filter1("filter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  hueRotate: filter1("filter", "hue-rotate", [evaluateAngle]),
  filter: filter2("filter", evaluateUrl),

  backdropBlur: filter1("backdropFilter", "blur", [evaluateLength]),
  backdropBrightness: filter1("backdropFilter", "brightness", [evaluateNumberPercent]),
  backdropContrast: filter1("backdropFilter", "contrast", [evaluateNumberPercent]),
  backdropGrayscale: filter1("backdropFilter", "grayscale", [evaluateNumberPercent]),
  backdropInvert: filter1("backdropFilter", "invert", [evaluateNumberPercent]),
  backdropOpacity: filter1("backdropFilter", "opacity", [evaluateNumberPercent]),
  backdropSaturate: filter1("backdropFilter", "saturate", [evaluateNumberPercent]),
  backdropSepia: filter1("backdropFilter", "sepia", [evaluateNumberPercent]),
  backdropDropShadow: filter1("backdropFilter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  backdropHueRotate: filter1("backdropFilter", "hue-rotate", [evaluateAngle]),
  backdropFilter: filter2("backdropFilter", evaluateUrl),

  matrix: transform1("matrix", evaluateNumber, 6),
  matrix3d: transform1("matrix3d", evaluateNumber, 16),
  perspective: transform1("perspective", evaluateLength, 1),
  rotate: transform1("rotate", evaluateAngle, 1),
  rotateZ: transform1("rotateZ", evaluateAngle, 1),
  rotateY: transform1("rotateY", evaluateAngle, 1),
  rotateX: transform1("rotateX", evaluateAngle, 1),
  translateX: transform1("translateX", evaluateLengthPercent, 1),
  translateY: transform1("translateY", evaluateLengthPercent, 1),
  translateZ: transform1("translateZ", evaluateLengthPercent, 1),
  translate3d: transform1("translate3d", evaluateLengthPercent, 3),
  scaleX: transform1("scaleX", evaluateNumber, 1),
  scaleY: transform1("scaleY", evaluateNumber, 1),
  scaleZ: transform1("scaleZ", evaluateNumber, 1),
  scale3d: transform1("scale3d", evaluateNumber, 3),
  skewX: transform1("skewX", evaluateAnglePercent, 1),
  skewY: transform1("skewY", evaluateAnglePercent, 1),
  translate: transform2("translate", evaluateLengthPercent),
  scale: transform2("scale", evaluateNumberPercent),
  skew: transform2("skew", evaluateAnglePercent),
  rotate3d,
};