import {
  TYPB, Umbrella, SINmax, SIN,
  extractName, extractUrl, extractColor,
  isNumber, isBasic,
  LengthPercent, LengthPercentNumber, NumberInterpreter, ColorUrl, Length, Url, UrlUnset,
  CamelWords,
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

//arity is an optional check function that can wrap other functions to check for 

// function oneOfEach(definitions, args) {
//   const res = {};
//   const usedKeys = new Set();
//   for (let a of args)
//     for (const [prop, def] of Object.entries(definitions)) {
//       if (!usedKeys.has(prop))
//         continue;
//       if (!(a.text in definitions || a.name in definitions))
//         throw new TypeError(`Unknown argument: ${a.text}`);
//       Object.assign(res, definitions[a.text] ?? definitions[a.name](a));
//     }
//   return res;
// }

// const x = {
//   butt: {strokeLinecap: "butt"}, 
//   round: {strokeLinecap: "round"}, 
//   square: {strokeLinecap: "square"}, 
//   miter: {strokeLinejoin: isLengthPercent}, 
//   round: {strokeLinejoin: "round"}, 
//   bevel: {strokeLinejoin: "bevel"},
//   strokeColor: isColor,
//   strokeWidth: isLengthPercent,
//   strokeOpacity: isFraction,
//   dash: {
//     strokeDasharray: isLengthPercentNumber,
//     strokeDashoffset: { offset: isLengthPercentNumber },
//   }
// };


// const y = [
//   ["butt", "strokeLinecap", "butt" ],
//   ["round", "strokeLinecap", "round" ],
//   ["square", "strokeLinecap", "square" ],
//   ["miter", "strokeLinejoin", isLengthPercent ],
//   ["round", "strokeLinejoin", "round" ],
//   ["bevel", "strokeLinejoin", "bevel" ]

// ].forEach(([name, property, value]) => {
//   stroke[name + "Stroke"] = { [property]: value };
// });

// function dash(args) {
//   return clusterInArrays({
//     strokeDasharray: isLengthPercentNumber,
//     strokeDashoffset: { offset: isLengthPercentNumber },
//   }, args);
// }
// //$stroke(color, lengthPercent width, butt|round|square, miter(number)|round|bevel, dash(offset(number/lengthPercent),...number/lengthPercent),opacity(fraction/percent))
// function stroke(args) {
//   return oneOfEach({
//     strokeColor: isColor,
//     strokeWidth: isLengthPercent,
//     strokeLinecap: ["butt", "round", "square"],
//     strokeLinejoin: { miter: isLengthPercent } || ["round", "bevel"], //todo this doesn't work.
//     strokeOpacity: { strokeOpacity: isFraction },
//     dash,
//   }, args);
// }
//$fill(color, opacity(fraction/percent), nonzero|evenodd)

//$svg(opacity(fraction/percent), )

function createColorFunction(property) {
  return ({ args }) => {
    if (!args?.length) return { [property]: "currentColor" };
    const c = extractColor(args) || extractUrl(args);
    if (c) {
      if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
      return { [property]: c };
    }
    const b = isBasic(args[0]);
    if (b) {
      args.shift();
      if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
      return { [property]: b.text };
    }
    throw new SyntaxError(`${property}() requires a color, url(), or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
  }
}

// function createLengthFunction(property, defaultValue) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: defaultValue };
//     const value = extractLength(args) ?? extractName(args);
//     if (!value) throw new SyntaxError(`${property}() requires a length or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: value };
//   };
// }

function createEnumFunction(property, validWords) {
  return ({ args }) => {
    if (!args?.length) return { [property]: validWords[Object.keys(validWords)[0]] };
    const v = extractName(args);
    if (!(v in validWords)) throw new SyntaxError(`Unknown ${property}: ${v}. Use: ${Object.keys(validWords).join(", ")}`);
    if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
    return { [property]: validWords[v] };
  };
}

function createOpacityFunction(property) {
  return ({ args }) => {
    if (!args?.length) return { [property]: "1" };
    const opacity = isNumber(args[0]) ?? isBasic(args[0]);
    if (!opacity) throw new SyntaxError(`${property}() requires a number or percentage. Got: ${args[0]?.text || 'undefined'}`);
    args.shift();
    if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
    return { [property]: opacity.text };
  };
}

// function createMarkerFunction(property) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: "none" };
//     const marker = extractUrl(args) ?? (extractName(args) === "none" ? "none" : null);
//     if (!marker) throw new SyntaxError(`${property}() requires url() or 'none'. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: marker };
//   };
// }

// function createNumberFunction(property, defaultValue) {
//   return ({ args }) => {
//     if (!args?.length) return { [property]: defaultValue };
//     const value = extractNumber(args) ?? extractName(args);
//     if (!value) throw new SyntaxError(`${property}() requires a number or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
//     if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
//     return { [property]: value };
//   };
// }

// function strokeDasharray({ args }) {
//   if (!args?.length) return { "stroke-dasharray": "none" };
//   const values = [];
//   while (args.length) {
//     const arg = args.shift();
//     const basic = isBasic(arg);
//     if (basic && (basic.type === "number" || basic.type === "length" || basic.text === "none")) {
//       values.push(basic.text);
//     } else if (arg.kind === "WORD" && arg.text === "none") {
//       values.push("none");
//     } else {
//       args.unshift(arg);
//       break;
//     }
//   }
//   if (args.length) throw new SyntaxError(`Unknown strokeDasharray argument: ${args[0].text}`);
//   return { "stroke-dasharray": values.join(" ") };
// }

function paintOrder({ args }) {
  if (!args?.length) return { "paint-order": "normal" };

  const values = [];
  while (args.length) {
    const v = extractName(args);
    if (!(v in PAINT_ORDER_WORDS)) throw new SyntaxError(`Unknown paint-order value: ${v}. Use: ${Object.keys(PAINT_ORDER_WORDS).join(", ")}`);
    values.push(PAINT_ORDER_WORDS[v]);
  }

  return { "paint-order": values.join(" ") };
}

// const LINECAP_WORDS = {
//   butt: "butt",
//   round: "round",
//   square: "square",
// };

// const LINEJOIN_WORDS = {
//   miter: "miter",
//   round: "round",
//   bevel: "bevel",
// };

// const TEXT_ANCHOR_WORDS = {
//   start: "start",
//   middle: "middle",
//   end: "end"
// };

const SHAPE_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  crispEdges: "crispEdges",
  geometricPrecision: "geometricPrecision"
};

const PAINT_ORDER_WORDS = {
  normal: "normal",
  fill: "fill",
  stroke: "stroke",
  markers: "markers"
};

const VECTOR_EFFECT_WORDS = {
  none: "none",
  nonScalingStroke: "non-scaling-stroke",
  nonScalingSize: "non-scaling-size",
  nonRotation: "non-rotation",
  fixedPosition: "fixed-position"
};

// const DOMINANT_BASELINE_WORDS = {
//   auto: "auto", ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging",
//   mathematical: "mathematical", central: "central", middle: "middle",
//   textAfterEdge: "text-after-edge", textBeforeEdge: "text-before-edge"
// };

// const ALIGNMENT_BASELINE_WORDS = {
//   auto: "auto", baseline: "baseline", beforeEdge: "before-edge", textBeforeEdge: "text-before-edge",
//   middle: "middle", central: "central", afterEdge: "after-edge", textAfterEdge: "text-after-edge",
//   ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging", mathematical: "mathematical"
// };

const RULE_WORDS = {
  nonzero: "nonzero",
  evenodd: "evenodd"
};

// const COLOR_INTERPOLATION_WORDS = {
//   auto: "auto",
//   sRGB: "sRGB",
//   linearRGB: "linearRGB"
// };

const COLOR_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  optimizeQuality: "optimizeQuality"
};

const IMAGE_RENDERING_WORDS = {
  auto: "auto",
  optimizeSpeed: "optimizeSpeed",
  optimizeQuality: "optimizeQuality",
  pixelated: "pixelated"
};

// const MASK_TYPE_WORDS = {
//   luminance: "luminance",
//   alpha: "alpha"
// };


const stopColor = createColorFunction("stop-color");
const stopOpacity = createOpacityFunction("stop-opacity");
const lightingColor = createColorFunction("lighting-color");
const vectorEffect = createEnumFunction("vector-effect", VECTOR_EFFECT_WORDS);
const clipRule = createEnumFunction("clip-rule", RULE_WORDS);
// const colorInterpolation = createEnumFunction("color-interpolation", COLOR_INTERPOLATION_WORDS);
const shapeRendering = createEnumFunction("shape-rendering", SHAPE_RENDERING_WORDS);
const colorRendering = createEnumFunction("color-rendering", COLOR_RENDERING_WORDS);
const imageRendering = createEnumFunction("image-rendering", IMAGE_RENDERING_WORDS);
// const maskType = createEnumFunction("mask-type", MASK_TYPE_WORDS);
const svgOpacity = createOpacityFunction("opacity");
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

  stopColor,
  stopOpacity,

  paintOrder,
  vectorEffect,
  opacity: svgOpacity,
  clipRule,
  shapeRendering,
  // colorInterpolation,
  colorRendering,
  imageRendering,
  lightingColor,
  // maskType, //alpha, luminance is default/none.  as it doesn't inherit, we would likely not 

  //loners
  maskType: { "mask-type": "alpha" },
  colorInterpolationSRGB: { "color-interpolation": "sRGB" },
  colorInterpolationLinearRGB: { "color-interpolation": "linearRGB" },


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