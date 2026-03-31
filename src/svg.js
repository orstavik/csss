
import { CsssPrimitives, CsssFunctions } from "./func2.js";
const { FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, TypeBasedFunction, PropertyType, SingleTable, SingleTableRaw, CssValuesToCsssTable, FunctionProperty } = CsssFunctions;
const { LengthPercentNumber, NumberInterpreter, ColorUrl, Url, LengthPercent, Length, UrlUnset } = CsssPrimitives;

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

const vectorEffect = CssValuesToCsssTable("none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position");
const clipRule = fillRule;
const colorInterpolation = CssValuesToCsssTable("auto|sRGB|linearRGB");
const shapeRendering = CssValuesToCsssTable("auto|optimizeSpeed|crispEdges|geometricPrecision");
const colorRendering = CssValuesToCsssTable("auto|optimizeSpeed|optimizeQuality");
const imageRendering = CssValuesToCsssTable("auto|smooth|high-quality|pixelated|crisp-edges");
const maskType = CssValuesToCsssTable("luminance|alpha");
const paintOrder = CssValuesToCsssTable("normal|fill|stroke|markers");

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

  markerStart: FunctionProperty("markerStart", "markerStart", Url),
  markerEnd: FunctionProperty("markerEnd", "markerEnd", Url),
  markerMid: FunctionProperty("markerMid", "markerMid", Url),
  marker: SequentialFunction("marker/1-3", [UrlUnset], (name, m) =>
    m.length == 1 ? { marker: m[0] } :
      m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
        { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
  ),

  stopColor: FunctionProperty("stopColor", "stopColor", ColorUrl),
  stopOpacity: FunctionProperty("stopOpacity", "stopOpacity", NumberInterpreter),
  vectorEffect: TypeBasedFunction(SingleTable("vectorEffect", vectorEffect)),
  clipRule: TypeBasedFunction(SingleTable("clipRule", clipRule)),
  colorInterpolation: TypeBasedFunction(SingleTable("colorInterpolation", colorInterpolation)),
  shapeRendering: TypeBasedFunction(SingleTable("shapeRendering", shapeRendering)),
  colorRendering: TypeBasedFunction(SingleTable("colorRendering", colorRendering)),
  imageRendering: TypeBasedFunction(SingleTable("imageRendering", imageRendering)),
  maskType: TypeBasedFunction(SingleTable("maskType", maskType)),
  paintOrder: SequentialFunction("paintOrder/0-4", [SingleTableRaw(paintOrder)], (name, ar) => ({ paintOrder: ar.join(" ") })),
  lightingColor: FunctionProperty("lightingColor", "lightingColor", ColorUrl),
  svgOpacity: FunctionProperty("svgOpacity", "svgOpacity", NumberInterpreter),

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
  // noStroke: strokeNone,
  // noFill: fillNone,
  // noSvgText: svgTextNone,
  // noMarker: { marker: "none" },
  markerNone: { marker: "none" },
};