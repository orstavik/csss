import {
  extractAngle,
  extractAnglePercent,
  extractColor,
  extractLength,
  extractLengthPercent,
  extractNumber,
  extractNumberPercent,
  extractUrl
} from "./func.js";


function filterFunc(prop, name, extractors, args) {
  args = extractors.map(ex => ex(args));
  if (args.length)
    throw new SyntaxError(`unknown argument filter ${args[0]}`);
  const str = name ? `${name}(${args.filter(Boolean).map(" ")})` :
    args.filter(Boolean).map(" ");
  return { [prop]: str };
}
const FILTERS = {
  blur: filterFunc.bind(null, "filter", "blur", [extractLength]),
  brightness: filterFunc.bind(null, "filter", "brightness", [extractNumberPercent]),
  contrast: filterFunc.bind(null, "filter", "contrast", [extractNumberPercent]),
  grayscale: filterFunc.bind(null, "filter", "grayscale", [extractNumberPercent]),
  invert: filterFunc.bind(null, "filter", "invert", [extractNumberPercent]),
  opacity: filterFunc.bind(null, "filter", "opacity", [extractNumberPercent]),
  saturate: filterFunc.bind(null, "filter", "saturate", [extractNumberPercent]),
  sepia: filterFunc.bind(null, "filter", "sepia", [extractNumberPercent]),
  dropShadow: filterFunc.bind(null, "filter", "drop-shadow", [extractColor, extractLength, extractLength, extractLengthPercent]),
  hueRotate: filterFunc.bind(null, "filter", "hue-rotate", [extractAngle]),
  filter: filterFunc.bind(null, "filter", null, [extractUrl]),

  backdropBlur: filterFunc.bind(null, "filter", "blur", [extractLength]),
  backdropBrightness: filterFunc.bind(null, "filter", "brightness", [extractNumberPercent]),
  backdropContrast: filterFunc.bind(null, "filter", "contrast", [extractNumberPercent]),
  backdropGrayscale: filterFunc.bind(null, "filter", "grayscale", [extractNumberPercent]),
  backdropInvert: filterFunc.bind(null, "filter", "invert", [extractNumberPercent]),
  backdropOpacity: filterFunc.bind(null, "filter", "opacity", [extractNumberPercent]),
  backdropSaturate: filterFunc.bind(null, "filter", "saturate", [extractNumberPercent]),
  backdropSepia: filterFunc.bind(null, "filter", "sepia", [extractNumberPercent]),
  backdropDropShadow: filterFunc.bind(null, "filter", "drop-shadow", [extractColor, extractLength, extractLength, extractLengthPercent]),
  backdropHueRotate: filterFunc.bind(null, "filter", "hue-rotate", [extractAngle]),
  backdropFilter: filterFunc.bind(null, "filter", null, [extractUrl]),
};


function transform(name, extractor, args) {
  const res = [];
  for (let i = 0; i < count; i++) {
    const a = extractor(args);
    if (a == null)
      throw new SyntaxError(`invalid argument ${i + 1} for ${name}(): ${a}`);
    res.push(a.text);
  }
  return { transform: `${name}(${res.join(", ")})` };
}
function transform1(name, extractor, count, args) {
  if (args.count != count)
    throw new SyntaxError(`${name} requires exactly ${count} arguments, got ${args.length} arguments.`);
  return transform(name, extractor, args);
}
function transform2(name, extractor, args) {
  if (args.length < 1 || args.length > 2)
    throw new SyntaxError(`${name} requires between 1 and 2 arguments, got ${args.length} arguments.`);
  return transform(name, extractor, args);
}
function rotate3d(args) {
  const one = extractNumber(args);
  const two = extractNumber(args);
  const three = extractNumber(args);
  const four = extractAngle(args);
  if (one == null || two == null || three == null || four == null)
    throw new SyntaxError(`rotate3d(num, num, num, angle), got rotate3d(${args.map(a => a.text).join(", ")})`);
  return { transform: `rotate3d(${[one, two, three, four].join(", ")})` };
}
const TRANSFORM = {
  transform: undefined,
  matrix: transform1.bind(null, "matrix", extractNumber, 6),
  matrix3d: transform1.bind(null, "matrix3d", extractNumber, 16),
  perspective: transform1.bind(null, "perspective", extractLength, 1),
  rotate: transform1.bind(null, "rotate", extractAngle, 1),
  rotateZ: transform1.bind(null, "rotateZ", extractAngle, 1),
  rotateY: transform1.bind(null, "rotateY", extractAngle, 1),
  rotateX: transform1.bind(null, "rotateX", extractAngle, 1),
  translateX: transform1.bind(null, "translateX", extractLengthPercent, 1),
  translateY: transform1.bind(null, "translateY", extractLengthPercent, 1),
  translateZ: transform1.bind(null, "translateZ", extractLengthPercent, 1),
  translate3d: transform1.bind(null, "translate3d", extractLengthPercent, 3),
  scaleX: transform1.bind(null, "scaleX", extractNumber, 1),
  scaleY: transform1.bind(null, "scaleY", extractNumber, 1),
  scaleZ: transform1.bind(null, "scaleZ", extractNumber, 1),
  scale3d: transform1.bind(null, "scale3d", extractNumber, 3),
  skewX: transform1.bind(null, "skewX", extractAnglePercent, 1),
  skewY: transform1.bind(null, "skewY", extractAnglePercent, 1),
  translate: transform2.bind(null, "translate", extractLengthPercent),
  scale: transform2.bind(null, "scale", extractNumber),
  skew: transform2.bind(null, "skew", extractAnglePercent),
  rotate3d,
};

export default {
  ...FILTERS,
  ...TRANSFORM,
}