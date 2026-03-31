
import { ValueTypes } from "./func.js";
import { CsssPrimitives, CsssFunctions } from "./func2.js";
const { FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, TypeBasedFunction, PropertyType, SingleTable, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentNumber, NumberInterpreter, ColorUrl, Url, LengthPercent, Length } = CsssPrimitives;
const { Fraction, UrlUnset, CamelWords, WordToValue } = ValueTypes;

const strokeDefaults = {
  stroke: "unset",
  strokeWidth: "unset",
  strokeOpacity: "unset",
  strokeLinecap: "unset",
  strokeLinejoin: "unset",
  strokeDasharray: "unset",
  strokeDashoffset: "unset",
  strokeMiterlimit: "unset",
};

const fillDefaults = {
  fill: "unset",
  fillOpacity: "unset",
  fillRule: "unset",
};

const svgTextDefaults = {
  textAnchor: "unset",
  dominantBaseline: "unset",
  alignmentBaseline: "unset",
  baselineShift: "unset",
};

const strokeLinecap = CssValuesToCsssTable("butt|round|square");
const strokeLinejoin = CssValuesToCsssTable("miter|round|bevel");
const fillRule = CssValuesToCsssTable("evenodd|nonzero");
const textAnchor = CssValuesToCsssTable("start|middle|end");
const dominantBaseline = CssValuesToCsssTable("auto|text-bottom|alphabetic|ideographic|middle|central|mathematical|hanging|text-top");
const alignmentBaseline = CssValuesToCsssTable("auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical");
const baselineShift = CssValuesToCsssTable("sub|super|baseline");

//todo should we make a table with some common words? 
// It will be hard for the llm to know these words, and i am not sure we need to teach it this thing..
// solidStroke: { "stroke-dasharray": "none" },
// dashedStroke: { "stroke-dasharray": "5,5" },
// dottedStroke: { "stroke-dasharray": "1,1" },
// roundStroke: { "stroke-linecap": "round", "stroke-linejoin": "round" },
// sharpStroke: { "stroke-linecap": "butt", "stroke-linejoin": "miter" },
// optimizeSpeed: { "color-rendering": "optimizeSpeed", "image-rendering": "optimizeSpeed" },
// optimizeQuality: { "color-rendering": "optimizeQuality", "image-rendering": "optimizeQuality" },

const stroke = TypeBasedFunction(
  PropertyType("stroke", ColorUrl),
  PropertyType("strokeWidth", Length),
  PropertyType("strokeOpacity", NumberInterpreter),
  SingleTable("strokeLinecap", strokeLinecap),
  SingleTable("strokeLinejoin", strokeLinejoin),
  SequentialFunction("dasharray/2-", [LengthPercentNumber], (name, ar) => ({ strokeDasharray: ar.join(", ") })),
  SequentialFunction("dashoffset/", [LengthPercent], (name, ar) => ({ strokeDashoffset: ar[0] })),
  SingleArgumentFunction("miterlimit", NumberInterpreter, (name, ar) => ({ strokeMiterlimit: ar }))
);

const fill = TypeBasedFunction(
  PropertyType("fill", ColorUrl),
  PropertyType("fillOpacity", NumberInterpreter),
  SingleTable("fillRule", fillRule),
);

const svgText = TypeBasedFunction(
  SingleTable("textAnchor", textAnchor),
  SingleTable("dominantBaseline", dominantBaseline),
  SingleTable("alignmentBaseline", alignmentBaseline),
  SingleTable("baselineShift", baselineShift)
);

const strokeNone = { ...strokeDefaults, stroke: "none" };
const fillNone = { ...fillDefaults, fill: "none" };
const svgTextNone = { ...svgTextDefaults };

export default {
  stroke,
  fill,
  svgText,

  Stroke: FunctionWithDefaultValues(strokeDefaults, stroke),
  Fill: FunctionWithDefaultValues(fillDefaults, fill),
  SvgText: FunctionWithDefaultValues(svgTextDefaults, svgText),

  markerStart: SingleArgumentFunction("markerStart", Url, (name, v) => ({ [name]: v })),
  markerEnd: SingleArgumentFunction("markerEnd", Url, (name, v) => ({ [name]: v })),
  markerMid: SingleArgumentFunction("markerMid", Url, (name, v) => ({ [name]: v })),
  marker: SequentialFunction("marker/1-3", [UrlUnset], (name, m) =>
    m.length == 1 ? { marker: m[0] } :
      m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
        { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
  ),

  stopColor: SingleArgumentFunction("stopColor", e => ColorUrl(e) ?? "currentColor", (p, v) => ({ [p]: v })),
  stopOpacity: SingleArgumentFunction("stopOpacity", e => Fraction(e) ?? "1", (p, v) => ({ [p]: v })),
  vectorEffect: SingleArgumentFunction("vectorEffect", CamelWords("none|nonScalingStroke|nonScalingSize|nonRotation|fixedPosition"), (p, v) => ({ [p]: v })),
  clipRule: SingleArgumentFunction("clipRule", CamelWords("nonzero|evenodd"), (p, v) => ({ [p]: v })),
  colorInterpolation: SingleArgumentFunction("colorInterpolation", CamelWords("auto|sRGB|linearRGB"), (p, v) => ({ [p]: v })),
  shapeRendering: SingleArgumentFunction("shapeRendering", WordToValue({ auto: "auto", optimizeSpeed: "optimizeSpeed", crispEdges: "crispEdges", geometricPrecision: "geometricPrecision" }), (p, v) => ({ [p]: v })),
  colorRendering: SingleArgumentFunction("colorRendering", CamelWords("auto|optimizeSpeed|optimizeQuality"), (p, v) => ({ [p]: v })),
  imageRendering: SingleArgumentFunction("imageRendering", CamelWords("auto|optimizeSpeed|optimizeQuality|pixelated"), (p, v) => ({ [p]: v })),
  maskType: SingleArgumentFunction("maskType", CamelWords("luminance|alpha"), (p, v) => ({ [p]: v })),
  paintOrder: SequentialFunction("paintOrder/0-4", [e => CamelWords("normal|fill|stroke|markers")(e) ?? "normal"], (p, v) => ({ [p]: v.join(" ") })),
  lightingColor: SingleArgumentFunction("lightingColor", e => ColorUrl(e) ?? "currentColor", (p, v) => ({ [p]: v })),
  svgOpacity: SingleArgumentFunction("svgOpacity", e => Fraction(e) ?? "1", (p, v) => ({ [p]: v })),

  strokeWidth: undefined,
  strokeLinecap: undefined,
  strokeLinejoin: undefined,
  strokeDasharray: undefined,
  strokeMiterlimit: undefined,
  strokeDashoffset: undefined,
  strokeOpacity: undefined,
  fillOpacity: undefined,
  fillRule: undefined,
  textAnchor: undefined,
  dominantBaseline: undefined,
  alignmentBaseline: undefined,
  baselineShift: undefined,

  strokeNone,
  fillNone,
  svgTextNone,
  noStroke: strokeNone,
  noFill: fillNone,
  noSvgText: svgTextNone,
  noMarker: { marker: "none" },
  markerNone: { marker: "none" },
};