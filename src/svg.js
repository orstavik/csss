import { CsssPrimitives, CsssFunctions } from "./func.js";
const { FunctionWithDefaultValues, SF2, TypeBasedFunction, PropertyType, SingleTable, CssValuesToCsssTable, FunctionPropertyType } = CsssFunctions;
const { SingleTableRaw, LengthPercentNumber, NumberInterpreter, Url, Length, UrlUnset } = CsssPrimitives;
import { CssFunctions } from "./funcReverse.js";
const { ValueReverse, TableReverse, ColorReverse} = CssFunctions;
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
    stroke: style => {
      if (style.stroke === "none") return "$strokeNone";
      let { stroke, strokeWidth, strokeOpacity, strokeLinecap, strokeLinejoin,
        strokeDasharray, strokeDashoffset, strokeMiterlimit } = style;
      stroke &&= ColorReverse(stroke);
      strokeWidth &&= ValueReverse(strokeWidth);
      strokeOpacity &&= ValueReverse(strokeOpacity);
      strokeLinecap &&= strokeLinecapRev[strokeLinecap];
      strokeLinejoin &&= strokeLinejoinRev[strokeLinejoin];
      strokeDasharray &&= ValueReverse(strokeDasharray) && `dasharray(${ValueReverse(strokeDasharray)})`;
      strokeDashoffset &&= ValueReverse(strokeDashoffset) && `dashoffset(${ValueReverse(strokeDashoffset)})`;
      strokeMiterlimit &&= ValueReverse(strokeMiterlimit) && `miterlimit(${ValueReverse(strokeMiterlimit)})`;
      const args = [stroke, strokeWidth, strokeOpacity, strokeLinecap, strokeLinejoin,
        strokeDasharray, strokeDashoffset, strokeMiterlimit].filter(Boolean);
      if (!args.length) return;
      const unsets = Object.entries(style).filter(([k, v]) => v === "unset" || v === "initial").length;
      const name = args.length + unsets >= Object.keys(strokeDefaults).length ? "$Stroke" : "$stroke";
      return `${name}(${args.join(",")})`;
    },

    fill: style => {
      if (style.fill === "none") return "$fillNone";
      let { fill, fillOpacity, fillRule } = style;
      fill &&= ColorReverse(fill);
      fillOpacity &&= ValueReverse(fillOpacity);  
      fillRule &&= fillRuleRev[fillRule];
      const args = [fill, fillOpacity, fillRule].filter(Boolean);
      if (!args.length) return;
      const unsets = Object.entries(style).filter(([k, v]) => v === "unset" || v === "initial").length;
      const name = args.length + unsets >= Object.keys(fillDefaults).length ? "$Fill" : "$fill";
      return `${name}(${args.join(",")})`;
    },

    svgText: style => {
      let { textAnchor, dominantBaseline, alignmentBaseline, baselineShift } = style;
      textAnchor &&= textAnchorRev[textAnchor];
      dominantBaseline &&= dominantBaselineRev[dominantBaseline];
      alignmentBaseline &&= alignmentBaselineRev[alignmentBaseline];
      baselineShift &&= baselineShiftRev[baselineShift];
      const args = [textAnchor, dominantBaseline, alignmentBaseline, baselineShift].filter(Boolean);
      if (!args.length) return;
      const unsets = Object.entries(style).filter(([k, v]) => v === "unset" || v === "initial").length;
      const name = args.length + unsets >= Object.keys(svgTextDefaults).length ? "$SvgText" : "$svgText";
      return `${name}(${args.join(",")})`;
    },
    marker: style => {
      if (style.marker === "none") return "$markerNone";
      if (style.marker) return `$marker(${ValueReverse(style.marker)})`;
      if (style.markerStart && style.markerMid && style.markerEnd) return `$marker(${ValueReverse(style.markerStart)},${ValueReverse(style.markerMid)},${ValueReverse(style.markerEnd)})`;
      if (style.markerStart && style.markerEnd) return `$marker(${ValueReverse(style.markerStart)},${ValueReverse(style.markerEnd)})`;
    },
    stopColor: v => v.stopColor &&= `$stopColor(${ColorReverse(v.stopColor)})` ,
    stopOpacity: v => v.stopOpacity &&= `$stopOpacity(${ValueReverse(v.stopOpacity)})`,
    vectorEffect: v => v.vectorEffect &&= `$vectorEffect(${vectorEffectRev[v.vectorEffect]})` ,
    clipRule: v => v.clipRule &&= `$clipRule(${fillRuleRev[v.clipRule]})` ,
    colorInterpolation: v => v.colorInterpolation &&= `$colorInterpolation(${colorInterpolationRev[v.colorInterpolation]})` ,
    shapeRendering: v => v.shapeRendering &&= `$shapeRendering(${shapeRenderingRev[v.shapeRendering]})` ,
    colorRendering: v => v.colorRendering &&= `$colorRendering(${colorRenderingRev[v.colorRendering]})` ,
    imageRendering: v => v.imageRendering &&= `$imageRendering(${imageRenderingRev[v.imageRendering]})` ,
    maskType: v => v.maskType &&= `$maskType(${maskTypeRev[v.maskType]})` ,
    paintOrder: v => {
      if (!v.paintOrder || v.paintOrder === "normal") return undefined;
      const args = v.paintOrder.split(/\s+/).map(part => paintOrderRev[part] ?? part);
      return `$paintOrder(${args.join(",")})`;
    },
    lightingColor: v => v.lightingColor &&= `$lightingColor(${ColorReverse(v.lightingColor)})` ,
    svgOpacity: v => v.svgOpacity &&= `$svgOpacity(${ValueReverse(v.svgOpacity)})` ,
  }
};
