
import { CsssPrimitives, CsssFunctions } from "./func2.js";
const { FunctionWithDefaultValues, SF2, TypeBasedFunction, PropertyType, SingleTable, CssValuesToCsssTable, FunctionPropertyType } = CsssFunctions;
const { SingleTableRaw, LengthPercentNumber, NumberInterpreter, Url, Length, UrlUnset } = CsssPrimitives;
import { Color } from "./funcColor.js";
const ColorUrl = a => Color(a) ?? Url(a);

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
  SF2("dasharray/2-", [LengthPercentNumber], (name, ar) => ({ strokeDasharray: ar.join(", ") })),
  FunctionPropertyType("dashoffset", "strokeDashoffset", LengthPercentNumber),
  FunctionPropertyType("miterlimit", "strokeMiterlimit", NumberInterpreter)
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

  markerStart: FunctionPropertyType("markerStart", "markerStart", Url),
  markerEnd: FunctionPropertyType("markerEnd", "markerEnd", Url),
  markerMid: FunctionPropertyType("markerMid", "markerMid", Url),
  marker: SF2("marker/1-3", [UrlUnset], (name, m) =>
    m.length == 1 ? { marker: m[0] } :
      m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
        { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
  ),

  stopColor: FunctionPropertyType("stopColor", "stopColor", ColorUrl),
  stopOpacity: FunctionPropertyType("stopOpacity", "stopOpacity", NumberInterpreter),
  vectorEffect: FunctionPropertyType("vectorEffect", "vectorEffect", SingleTableRaw(vectorEffect)),
  clipRule: FunctionPropertyType("clipRule", "clipRule", SingleTableRaw(clipRule)),
  colorInterpolation: FunctionPropertyType("colorInterpolation", "colorInterpolation", SingleTableRaw(colorInterpolation)),
  shapeRendering: FunctionPropertyType("shapeRendering", "shapeRendering", SingleTableRaw(shapeRendering)),
  colorRendering: FunctionPropertyType("colorRendering", "colorRendering", SingleTableRaw(colorRendering)),
  imageRendering: FunctionPropertyType("imageRendering", "imageRendering", SingleTableRaw(imageRendering)),
  maskType: FunctionPropertyType("maskType", "maskType", SingleTableRaw(maskType)),
  paintOrder: SF2("paintOrder/0-4", [SingleTableRaw(paintOrder)], (name, ar) => ({ paintOrder: ar.join(" ") })),
  lightingColor: FunctionPropertyType("lightingColor", "lightingColor", ColorUrl),
  svgOpacity: FunctionPropertyType("svgOpacity", "svgOpacity", NumberInterpreter),

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