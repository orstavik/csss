import {
  TYPB, Umbrella, SINmax, SIN, LengthPercent, LengthPercentNumber, NumberInterpreter, ColorUrl, Length, Url, UrlUnset, CamelWords, Words, Fraction, Sequence,
} from "./func.js";

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

//todo should we make a table with some common words? 
// It will be hard for the llm to know these words, and i am not sure we need to teach it this thing..
// solidStroke: { "stroke-dasharray": "none" },
// dashedStroke: { "stroke-dasharray": "5,5" },
// dottedStroke: { "stroke-dasharray": "1,1" },
// roundStroke: { "stroke-linecap": "round", "stroke-linejoin": "round" },
// sharpStroke: { "stroke-linecap": "butt", "stroke-linejoin": "miter" },
// optimizeSpeed: { "color-rendering": "optimizeSpeed", "image-rendering": "optimizeSpeed" },
// optimizeQuality: { "color-rendering": "optimizeQuality", "image-rendering": "optimizeQuality" },

const stroke = TYPB({
}, {
  stroke: ColorUrl,
  strokeWidth: Length, //todo we need Integer here too, as 1,2,3,4 is valid
  strokeOpacity: NumberInterpreter,
  strokeLinecap: CamelWords("butt|round|square"),
  strokeLinejoin: CamelWords("miter|round|bevel"),
  strokeDasharray: Sequence("dasharray/2-", [LengthPercentNumber], (name, ar) => ar.join(", ")),
  strokeDashoffset: Sequence("dashoffset", [LengthPercent], (name, ar) => ar[0]),
  strokeMiterlimit: Sequence("miterlimit", [NumberInterpreter], (name, ar) => ar[0]),
}, {});

const fill = TYPB({}, {
  fill: ColorUrl,
  fillOpacity: NumberInterpreter,
  fillRule: CamelWords("evenodd|nonzero"),
}, {});

const svgText = TYPB({
}, {
  textAnchor: CamelWords("start|middle|end"),
  dominantBaseline: CamelWords("auto|textBottom|alphabetic|ideographic|middle|central|mathematical|hanging|textTop"),
  alignmentBaseline: CamelWords("auto|baseline|beforeEdge|textBeforeEdge|middle|central|afterEdge|textAfterEdge|ideographic|alphabetic|hanging|mathematical"),
  baselineShift: CamelWords("sub|super|baseline"),
}, {});

const strokeNone = { ...strokeDefaults, stroke: "none" };
const fillNone = { ...fillDefaults, fill: "none" };
const svgTextNone = { ...svgTextDefaults };

export default {
  stroke,
  fill,
  svgText,

  Stroke: Umbrella(strokeDefaults, stroke),
  Fill: Umbrella(fillDefaults, fill),
  SvgText: Umbrella(svgTextDefaults, svgText),

  markerStart: SIN(Url, (name, v) => ({ [name]: v })),
  markerEnd: SIN(Url, (name, v) => ({ [name]: v })),
  markerMid: SIN(Url, (name, v) => ({ [name]: v })),
  marker: SINmax(3, UrlUnset, (name, m) =>
    m.length == 1 ? { marker: m[0] } :
      m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
        { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
  ),

  stopColor: SIN(ColorUrl, (p, v = "currentColor") => ({ [p]: v })),
  stopOpacity: SIN(Fraction, (p, v = "1") => ({ [p]: v })),
  vectorEffect: SIN(CamelWords("none|nonScalingStroke|nonScalingSize|nonRotation|fixedPosition"), (p, v) => ({ [p]: v })),
  clipRule: SIN(CamelWords("nonzero|evenodd"), (p, v) => ({ [p]: v })),
  colorInterpolation: SIN(CamelWords("auto|sRGB|linearRGB"), (p, v) => ({ [p]: v })),
  shapeRendering: SIN(Words("auto|optimizeSpeed|crispEdges|geometricPrecision"), (p, v) => ({ [p]: v })),
  colorRendering: SIN(CamelWords("auto|optimizeSpeed|optimizeQuality"), (p, v) => ({ [p]: v })),
  imageRendering: SIN(CamelWords("auto|optimizeSpeed|optimizeQuality|pixelated"), (p, v) => ({ [p]: v })),
  maskType: SIN(CamelWords("luminance|alpha"), (p, v) => ({ [p]: v })),
  paintOrder: SINmax(3, Words("normal|fill|stroke|markers"), (p, v = ["normal"]) => ({ [p]: v.join(" ") })),
  lightingColor: SIN(ColorUrl, (p, v = "currentColor") => ({ [p]: v })),
  svgOpacity: SIN(Fraction, (p, v = "1") => ({ [p]: v })),

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