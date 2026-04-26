import { CsssPrimitives, CsssFunctions } from "./func.js";
const { FunctionWithDefaultValues, SF2, TypeBasedFunction, PropertyType, SingleTable, CssValuesToCsssTable, FunctionPropertyType } = CsssFunctions;
const { SingleTableRaw, LengthPercentNumber, NumberInterpreter, Url, Length, UrlUnset } = CsssPrimitives;
import { CssFunctions } from "./funcReverse.js";
const { ValueReverse, TableReverse, ColorReverse, SingleArgumentFunctionReverse: SAR, Optional, normalizeToLogical } = CssFunctions;
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

const strokeLinecapRev = TableReverse(strokeLinecap);
const strokeLinejoinRev = TableReverse(strokeLinejoin);
const fillRuleRev = TableReverse(fillRule);
const textAnchorRev = TableReverse(textAnchor);
const dominantBaselineRev = TableReverse(dominantBaseline);
const alignmentBaselineRev = TableReverse(alignmentBaseline);
const baselineShiftRev = TableReverse(baselineShift);
const vectorEffectRev = TableReverse(vectorEffect);
const colorInterpolationRev = TableReverse(colorInterpolation);
const shapeRenderingRev = TableReverse(shapeRendering);
const colorRenderingRev = TableReverse(colorRendering);
const imageRenderingRev = TableReverse(imageRendering);
const maskTypeRev = TableReverse(maskType);
const paintOrderRev = TableReverse(paintOrder);

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
    //simplify imperative
    stroke: style => {
      const s = normalizeToLogical(style);
      if (s.stroke === "none") return "$strokeNone";
      return Optional("$stroke", "$Stroke", strokeDefaults,
        { prop: "stroke", rev: style => (style.stroke && style.stroke !== "unset") ? (ColorReverse(style.stroke) ?? style.stroke) : undefined },
        { prop: "strokeWidth", rev: style => (style.strokeWidth && style.strokeWidth !== "unset") ? style.strokeWidth : undefined },
        { prop: "strokeOpacity", rev: style => (style.strokeOpacity && style.strokeOpacity !== "unset") ? ValueReverse(style.strokeOpacity) : undefined },
        { prop: "strokeLinecap", rev: style => (style.strokeLinecap && style.strokeLinecap !== "unset") ? strokeLinecapRev[style.strokeLinecap.toLowerCase()] : undefined },
        { prop: "strokeLinejoin", rev: style => (style.strokeLinejoin && style.strokeLinejoin !== "unset") ? strokeLinejoinRev[style.strokeLinejoin.toLowerCase()] : undefined },
        { prop: "strokeDasharray", rev: style => (style.strokeDasharray && style.strokeDasharray !== "unset") ? `dasharray(${ValueReverse(style.strokeDasharray.replace(/,\s*/g, ","))})` : undefined },
        { prop: "strokeDashoffset", rev: style => (style.strokeDashoffset && style.strokeDashoffset !== "unset") ? `dashoffset(${ValueReverse(style.strokeDashoffset)})` : undefined },
        { prop: "strokeMiterlimit", rev: style => (style.strokeMiterlimit && style.strokeMiterlimit !== "unset") ? `miterlimit(${ValueReverse(style.strokeMiterlimit)})` : undefined },
      )(s);
    },
    fill: style => {
      const s = normalizeToLogical(style);
      if (s.fill === "none") return "$fillNone";
      return Optional("$fill", "$Fill", fillDefaults,
        { prop: "fill", rev: style => (style.fill && style.fill !== "unset") ? ColorReverse(style.fill) : undefined },
        { prop: "fillOpacity", rev: style => (style.fillOpacity && style.fillOpacity !== "unset") ? ValueReverse(style.fillOpacity) : undefined },
        { prop: "fillRule", rev: style => (style.fillRule && style.fillRule !== "unset") ? fillRuleRev[style.fillRule.toLowerCase()] : undefined },
      )(s);
    },
    svgText: style => Optional("$svgText", "$SvgText", svgTextDefaults,
      { prop: "textAnchor", rev: style => (style.textAnchor && style.textAnchor !== "unset") ? textAnchorRev[style.textAnchor.toLowerCase()] : undefined },
      { prop: "dominantBaseline", rev: style => (style.dominantBaseline && style.dominantBaseline !== "unset") ? dominantBaselineRev[style.dominantBaseline.toLowerCase()] : undefined },
      { prop: "alignmentBaseline", rev: style => (style.alignmentBaseline && style.alignmentBaseline !== "unset") ? alignmentBaselineRev[style.alignmentBaseline.toLowerCase()] : undefined },
      { prop: "baselineShift", rev: style => (style.baselineShift && style.baselineShift !== "unset") ? baselineShiftRev[style.baselineShift.toLowerCase()] : undefined },
    )(normalizeToLogical(style)),
    marker: style => {
      const s = normalizeToLogical(style);
      if (s.marker === "none") return "$markerNone";
      if (s.marker) return `$marker(${ValueReverse(s.marker)})`;
      if (s.markerStart && s.markerMid && s.markerEnd) return `$marker(${ValueReverse(s.markerStart)},${ValueReverse(s.markerMid)},${ValueReverse(s.markerEnd)})`;
      if (s.markerStart && s.markerEnd) return `$marker(${ValueReverse(s.markerStart)},${ValueReverse(s.markerEnd)})`;
    },
    stopColor: style => SAR("$stopColor", "stopColor", v => ColorReverse(v) ?? v)(normalizeToLogical(style)),
    stopOpacity: style => SAR("$stopOpacity", "stopOpacity", ValueReverse)(normalizeToLogical(style)),
    vectorEffect: style => SAR("$vectorEffect", "vectorEffect", v => vectorEffectRev[v])(normalizeToLogical(style)),
    clipRule: style => SAR("$clipRule", "clipRule", v => fillRuleRev[v])(normalizeToLogical(style)),
    colorInterpolation: style => SAR("$colorInterpolation", "colorInterpolation", v => colorInterpolationRev[v])(normalizeToLogical(style)),
    shapeRendering: style => SAR("$shapeRendering", "shapeRendering", v => shapeRenderingRev[v])(normalizeToLogical(style)),
    colorRendering: style => SAR("$colorRendering", "colorRendering", v => colorRenderingRev[v])(normalizeToLogical(style)),
    imageRendering: style => SAR("$imageRendering", "imageRendering", v => imageRenderingRev[v])(normalizeToLogical(style)),
    maskType: style => SAR("$maskType", "maskType", v => maskTypeRev[v])(normalizeToLogical(style)),
    paintOrder: style => {
      const s = normalizeToLogical(style);
      if (!s.paintOrder || s.paintOrder === "normal") return undefined;
      const args = s.paintOrder.split(/\s+/).map(v => paintOrderRev[v] ?? v);
      return `$paintOrder(${args.join(",")})`;
    },
    lightingColor: style => SAR("$lightingColor", "lightingColor", v => ColorReverse(v) ?? v)(normalizeToLogical(style)),
    svgOpacity: style => SAR("$svgOpacity", "svgOpacity", ValueReverse)(normalizeToLogical(style)),
  }
};