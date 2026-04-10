
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

const props = {
  stroke: undefined,
  fill: undefined,
  svgText: undefined,

  markerStart: undefined,
  markerEnd: undefined,
  markerMid: undefined,
  marker: undefined,

  stopColor: undefined,
  stopOpacity: undefined,
  vectorEffect: undefined,
  clipRule: undefined,
  colorInterpolation: undefined,
  shapeRendering: undefined,
  colorRendering: undefined,
  imageRendering: undefined,
  maskType: undefined,
  paintOrder: undefined,
  lightingColor: undefined,
  svgOpacity: undefined,

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
};
export default {
  props,
  csss: {
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
    strokeNone,
    fillNone,
    svgTextNone,
    // noStroke: strokeNone,
    // noFill: fillNone,
    // noSvgText: svgTextNone,
    // noMarker: { marker: "none" },
    markerNone: { marker: "none" },
  },
  css: {
    stroke: style => {
      let args = [];
      if (style.stroke === "none") return "strokeNone";
      if (style.stroke && style.stroke !== "unset") args.push(style.stroke);
      if (style.strokeWidth && style.strokeWidth !== "unset") args.push(style.strokeWidth);
      if (style.strokeOpacity && style.strokeOpacity !== "unset") args.push(style.strokeOpacity);
      if (style.strokeLinecap && style.strokeLinecap !== "unset") args.push(style.strokeLinecap);
      if (style.strokeLinejoin && style.strokeLinejoin !== "unset") args.push(style.strokeLinejoin);
      if (style.strokeDasharray && style.strokeDasharray !== "unset") args.push(`dasharray(${style.strokeDasharray.replace(/,\s*/g, ",")})`);
      if (style.strokeDashoffset && style.strokeDashoffset !== "unset") args.push(`dashoffset(${style.strokeDashoffset})`);
      if (style.strokeMiterlimit && style.strokeMiterlimit !== "unset") args.push(`miterlimit(${style.strokeMiterlimit})`);
      return args.length ? `stroke(${args.join(",")})` : undefined;
    },
    fill: style => {
      let args = [];
      if (style.fill === "none") return "fillNone";
      if (style.fill && style.fill !== "unset") args.push(style.fill);
      if (style.fillOpacity && style.fillOpacity !== "unset") args.push(style.fillOpacity);
      if (style.fillRule && style.fillRule !== "unset") args.push(style.fillRule);
      return args.length ? `fill(${args.join(",")})` : undefined;
    },
    svgText: style => {
      let args = [];
      if (style.textAnchor && style.textAnchor !== "unset") args.push(style.textAnchor);
      if (style.dominantBaseline && style.dominantBaseline !== "unset") args.push(style.dominantBaseline);
      if (style.alignmentBaseline && style.alignmentBaseline !== "unset") args.push(style.alignmentBaseline);
      if (style.baselineShift && style.baselineShift !== "unset") args.push(style.baselineShift);
      return args.length ? `svgText(${args.join(",")})` : undefined;
    },
    marker: style => {
      if (style.marker === "none") return "markerNone";
      if (style.marker) return `marker(${style.marker})`;
      if (style.markerStart && style.markerMid && style.markerEnd) return `marker(${style.markerStart},${style.markerMid},${style.markerEnd})`;
      if (style.markerStart && style.markerEnd) return `marker(${style.markerStart},${style.markerEnd})`;
      return undefined;
    },
    stopColor: style => style.stopColor ? `stopColor(${style.stopColor})` : undefined,
    stopOpacity: style => style.stopOpacity ? `stopOpacity(${style.stopOpacity})` : undefined,
    vectorEffect: style => style.vectorEffect ? `vectorEffect(${style.vectorEffect})` : undefined,
    clipRule: style => style.clipRule ? `clipRule(${style.clipRule})` : undefined,
    colorInterpolation: style => style.colorInterpolation ? `colorInterpolation(${style.colorInterpolation})` : undefined,
    shapeRendering: style => style.shapeRendering ? `shapeRendering(${style.shapeRendering})` : undefined,
    colorRendering: style => style.colorRendering ? `colorRendering(${style.colorRendering})` : undefined,
    imageRendering: style => style.imageRendering ? `imageRendering(${style.imageRendering})` : undefined,
    maskType: style => style.maskType ? `maskType(${style.maskType})` : undefined,
    paintOrder: style => style.paintOrder ? `paintOrder(${style.paintOrder.replace(/\s+/g, ",")})` : undefined,
    lightingColor: style => style.lightingColor ? `lightingColor(${style.lightingColor})` : undefined,
    svgOpacity: style => style.svgOpacity ? `svgOpacity(${style.svgOpacity})` : undefined,
  }
};