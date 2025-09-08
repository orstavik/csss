import {
  extractAngle,
  extractColor,
  extractLength,
  extractLengthPercent,
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
export default {
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