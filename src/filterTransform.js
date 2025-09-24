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


function filterFunc(prop, name, interpretors, args) {
  if (args.length != interpretors.length)
    throw new SyntaxError(`${name} requires exactly ${interpretors.length} arguments, got ${args.length} arguments.`);
  const res = args.map((a, i) => interpretors[i](a, i));
  const str = name ? `${name}(${res.join(" ")})` : res.join(" ");
  return { [prop]: str };
}
const FILTERS = {
  blur: filterFunc.bind(null, "filter", "blur", [evaluateLength]),
  brightness: filterFunc.bind(null, "filter", "brightness", [evaluateNumberPercent]),
  contrast: filterFunc.bind(null, "filter", "contrast", [evaluateNumberPercent]),
  grayscale: filterFunc.bind(null, "filter", "grayscale", [evaluateNumberPercent]),
  invert: filterFunc.bind(null, "filter", "invert", [evaluateNumberPercent]),
  opacity: filterFunc.bind(null, "filter", "opacity", [evaluateNumberPercent]),
  saturate: filterFunc.bind(null, "filter", "saturate", [evaluateNumberPercent]),
  sepia: filterFunc.bind(null, "filter", "sepia", [evaluateNumberPercent]),
  dropShadow: filterFunc.bind(null, "filter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  hueRotate: filterFunc.bind(null, "filter", "hue-rotate", [evaluateAngle]),
  filter: filterFunc.bind(null, "filter", null, [evaluateUrl]),

  backdropBlur: filterFunc.bind(null, "backdropFilter", "blur", [evaluateLength]),
  backdropBrightness: filterFunc.bind(null, "backdropFilter", "brightness", [evaluateNumberPercent]),
  backdropContrast: filterFunc.bind(null, "backdropFilter", "contrast", [evaluateNumberPercent]),
  backdropGrayscale: filterFunc.bind(null, "backdropFilter", "grayscale", [evaluateNumberPercent]),
  backdropInvert: filterFunc.bind(null, "backdropFilter", "invert", [evaluateNumberPercent]),
  backdropOpacity: filterFunc.bind(null, "backdropFilter", "opacity", [evaluateNumberPercent]),
  backdropSaturate: filterFunc.bind(null, "backdropFilter", "saturate", [evaluateNumberPercent]),
  backdropSepia: filterFunc.bind(null, "backdropFilter", "sepia", [evaluateNumberPercent]),
  backdropDropShadow: filterFunc.bind(null, "backdropFilter", "drop-shadow", [evaluateColor, evaluateLength, evaluateLength, evaluateLengthPercent]),
  backdropHueRotate: filterFunc.bind(null, "backdropFilter", "hue-rotate", [evaluateAngle]),
  backdropFilter: filterFunc.bind(null, "backdropFilter", null, [evaluateUrl]),
  noBackdropFilter: { backdropFilter: "none" },
};

function transform(name, interpret, args) {
  return { transform: `${name}(${args.map(interpret).join(", ")})` };
}
function transform1(name, extractor, count, args) {
  if (args.length != count)
    throw new SyntaxError(`${name} requires exactly ${count} arguments, got ${args.length} arguments.`);
  return transform(name, extractor, args);
}
function transform2(name, extractor, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return transform(name, extractor, args);
}
function rotate3d([one, two, three, four]) {
  one = evaluateNumber(one, 0);
  two = evaluateNumber(two, 1);
  three = evaluateNumber(three, 2);
  four = evaluateAngle(four, 3);
  return { transform: `rotate3d(${[one, two, three, four].join(", ")})` };
}
const TRANSFORM = {
  transform: undefined,
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

export default {
  ...FILTERS,
  ...TRANSFORM,
}