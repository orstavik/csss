import {
  TYPB, Umbrella, SINmax, SIN,
  LengthPercent, LengthPercentNumber, NumberInterpreter, ColorUrl, Length, Url, UrlUnset,
  CamelWords,
  Words, Fraction,
  CHECKNAME,
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

const stroke = TYPB({
}, {
  stroke: ColorUrl,
  strokeWidth: Length,
  strokeOpacity: NumberInterpreter,
  strokeLinecap: CamelWords("butt|round|square"),
  strokeLinejoin: CamelWords("miter|round|bevel"),
  strokeDasharray: CHECKNAME("dasharray", SINmax(999, LengthPercentNumber, (name, ar) => ar.join(", "))),
  strokeDashoffset: CHECKNAME("dashoffset", SIN(LengthPercent)),
  strokeMiterlimit: CHECKNAME("miterlimit", SIN(NumberInterpreter)),
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

const Stroke = Umbrella(strokeDefaults, stroke);
const Fill = Umbrella(fillDefaults, fill);
const SvgText = Umbrella(svgTextDefaults, svgText);

const markerStart = SIN(Url, (name, v) => ({ [name]: v }));
const markerEnd = SIN(Url, (name, v) => ({ [name]: v }));
const markerMid = SIN(Url, (name, v) => ({ [name]: v }));
const marker = SINmax(3, UrlUnset, (name, m) =>
  m.length == 1 ? { marker: m[0] } :
    m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
      { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
);

// **csss:** $fill(url(#gradient))
// **css:**
// ```css
// @layer containerDefault {
//   .\$fill\(url\(\#gradient\)\) {
//     fill: url(#gradient);
//   }
// }
// ```
//
// **csss:** $marker(url(#arrow),_,_)
// **css:**
// ```css
// @layer containerDefault {
// .\$marker\(url\(\#arrow\)\,_\,_\) {
// marker-start: url(#arrow);
// marker-mid: unset;
// marker-end: unset;
// }
// }
// ```
// 
// **csss:** $markerStart(url(#arrow))
// **css:**
// ```css
// @layer containerDefault {
// .\$markerStart\(url\(\#arrow\)\) {
// marker-start: url(#arrow);
// }
// }
// ```

// function createMarkerFunction(property) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: "none" };
//     const marker = extractUrl(args) ?? (extractName(args) === "none" ? "none" : null);
//     if (!marker) throw new SyntaxError(`${property}() requires url() or 'none'. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: marker };
//   };
// }

// const markerStart = createMarkerFunction("marker-start");
// const markerMid = createMarkerFunction("marker-mid");
// const markerEnd = createMarkerFunction("marker-end");

const strokeNone = {
  stroke: "none",
  strokeWidth: "unset",
  strokeOpacity: "unset",
  strokeLinecap: "unset",
  strokeLinejoin: "unset",
  strokeDasharray: "unset",
  strokeDashoffset: "unset",
  strokeMiterlimit: "unset",
};

export default {
  stroke,
  Stroke,

  fill,
  Fill,

  svgText,
  SvgText,

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
  noStroke: strokeNone,
  fillNone: { fill: "none", fillOpacity: "unset", fillRule: "unset" },
  noFill: { fill: "none", fillOpacity: "unset", fillRule: "unset" },

  marker,
  markerStart,
  markerMid,
  markerEnd,
  noMarker: { marker: "none" },
  markerNone: { marker: "none" },

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

  thinStroke: { "stroke-width": "1" },
  mediumStroke: { "stroke-width": "2" },
  thickStroke: { "stroke-width": "3" },
  solidStroke: { "stroke-dasharray": "none" },
  dashedStroke: { "stroke-dasharray": "5,5" },
  dottedStroke: { "stroke-dasharray": "1,1" },
  roundStroke: { "stroke-linecap": "round", "stroke-linejoin": "round" },
  sharpStroke: { "stroke-linecap": "butt", "stroke-linejoin": "miter" },
  nonScalingStroke: { "vector-effect": "non-scaling-stroke" },
  nonzeroFill: { "fill-rule": "nonzero" },
  evenoddFill: { "fill-rule": "evenodd" },
  crispEdges: { "shape-rendering": "crispEdges" },
  geometricPrecision: { "shape-rendering": "geometricPrecision" },
  optimizeSpeed: { "color-rendering": "optimizeSpeed", "image-rendering": "optimizeSpeed" },
  optimizeQuality: { "color-rendering": "optimizeQuality", "image-rendering": "optimizeQuality" },
};