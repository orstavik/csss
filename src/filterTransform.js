import {
  interpretAngle,
  interpretAnglePercent,
  interpretLength,
  interpretLengthPercent,
  interpretNumber,
  interpretColor,
  interpretUrl,
  interpretNumberPercent,

  extractAngle,
  extractNumber
} from "./func.js";


function filterFunc(prop, name, interpretors, args) {
  if (args.length != interpretors.length)
    throw new SyntaxError(`${name} requires exactly ${interpretors.length} arguments, got ${args.length} arguments.`);
  const res = args.map((a, i) => {
    const interpret = interpretors[i];
    const a2 = interpret(a);
    if (a2 == null)
      throw new SyntaxError(`invalid argument ${i + 1} for ${name}(): ${a}`);
    return a2.text;
  });
  const str = name ? `${name}(${res.join(" ")})` : res.join(" ");
  return { [prop]: str };
}
const FILTERS = {
  blur: filterFunc.bind(null, "filter", "blur", [interpretLength]),
  brightness: filterFunc.bind(null, "filter", "brightness", [interpretNumberPercent]),
  contrast: filterFunc.bind(null, "filter", "contrast", [interpretNumberPercent]),
  grayscale: filterFunc.bind(null, "filter", "grayscale", [interpretNumberPercent]),
  invert: filterFunc.bind(null, "filter", "invert", [interpretNumberPercent]),
  opacity: filterFunc.bind(null, "filter", "opacity", [interpretNumberPercent]),
  saturate: filterFunc.bind(null, "filter", "saturate", [interpretNumberPercent]),
  sepia: filterFunc.bind(null, "filter", "sepia", [interpretNumberPercent]),
  dropShadow: filterFunc.bind(null, "filter", "drop-shadow", [interpretColor, interpretLength, interpretLength, interpretLengthPercent]),
  hueRotate: filterFunc.bind(null, "filter", "hue-rotate", [interpretAngle]),
  filter: filterFunc.bind(null, "filter", null, [interpretUrl]),

  backdropBlur: filterFunc.bind(null, "backdropFilter", "blur", [interpretLength]),
  backdropBrightness: filterFunc.bind(null, "backdropFilter", "brightness", [interpretNumberPercent]),
  backdropContrast: filterFunc.bind(null, "backdropFilter", "contrast", [interpretNumberPercent]),
  backdropGrayscale: filterFunc.bind(null, "backdropFilter", "grayscale", [interpretNumberPercent]),
  backdropInvert: filterFunc.bind(null, "backdropFilter", "invert", [interpretNumberPercent]),
  backdropOpacity: filterFunc.bind(null, "backdropFilter", "opacity", [interpretNumberPercent]),
  backdropSaturate: filterFunc.bind(null, "backdropFilter", "saturate", [interpretNumberPercent]),
  backdropSepia: filterFunc.bind(null, "backdropFilter", "sepia", [interpretNumberPercent]),
  backdropDropShadow: filterFunc.bind(null, "backdropFilter", "drop-shadow", [interpretColor, interpretLength, interpretLength, interpretLengthPercent]),
  backdropHueRotate: filterFunc.bind(null, "backdropFilter", "hue-rotate", [interpretAngle]),
  backdropFilter: filterFunc.bind(null, "backdropFilter", null, [interpretUrl]),
  noBackdropFilter: { backdropFilter: "none" },
};


function transform(name, interpret, args) {
  const res = args.map((a, i) => {
    const a2 = interpret(a);
    if (a2 == null)
      throw new SyntaxError(`invalid argument ${i + 1} for ${name}(): ${a}`);
    return a2.text;
  });
  return { transform: `${name}(${res.join(", ")})` };
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
  matrix: transform1.bind(null, "matrix", interpretNumber, 6),
  matrix3d: transform1.bind(null, "matrix3d", interpretNumber, 16),
  perspective: transform1.bind(null, "perspective", interpretLength, 1),
  rotate: transform1.bind(null, "rotate", interpretAngle, 1),
  rotateZ: transform1.bind(null, "rotateZ", interpretAngle, 1),
  rotateY: transform1.bind(null, "rotateY", interpretAngle, 1),
  rotateX: transform1.bind(null, "rotateX", interpretAngle, 1),
  translateX: transform1.bind(null, "translateX", interpretLengthPercent, 1),
  translateY: transform1.bind(null, "translateY", interpretLengthPercent, 1),
  translateZ: transform1.bind(null, "translateZ", interpretLengthPercent, 1),
  translate3d: transform1.bind(null, "translate3d", interpretLengthPercent, 3),
  scaleX: transform1.bind(null, "scaleX", interpretNumber, 1),
  scaleY: transform1.bind(null, "scaleY", interpretNumber, 1),
  scaleZ: transform1.bind(null, "scaleZ", interpretNumber, 1),
  scale3d: transform1.bind(null, "scale3d", interpretNumber, 3),
  skewX: transform1.bind(null, "skewX", interpretAnglePercent, 1),
  skewY: transform1.bind(null, "skewY", interpretAnglePercent, 1),
  translate: transform2.bind(null, "translate", interpretLengthPercent),
  scale: transform2.bind(null, "scale", interpretNumberPercent),
  skew: transform2.bind(null, "skew", interpretAnglePercent),
  rotate3d,
};

export default {
  ...FILTERS,
  ...TRANSFORM,
}