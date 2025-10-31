import { isBasic, isNumber, extractColor, extractLength, extractName, extractUrl, extractNumber } from "./func.js";

function createColorFunction(property) {
    return args => {
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

function createLengthFunction(property, defaultValue) {
    return function (args) {
        if (!args?.length) return { [property]: defaultValue };
        const value = extractLength(args) ?? extractName(args);
        if (!value) throw new SyntaxError(`${property}() requires a length or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
        if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
        return { [property]: value };
    };
}

function createEnumFunction(property, validWords) {
    return args => {
        if (!args?.length) return { [property]: validWords[Object.keys(validWords)[0]] };
        const v = extractName(args);
        if (!(v in validWords)) throw new SyntaxError(`Unknown ${property}: ${v}. Use: ${Object.keys(validWords).join(", ")}`);
        if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
        return { [property]: validWords[v] };
    };
}

function createOpacityFunction(property) {
    return args => {
        if (!args?.length) return { [property]: "1" };
        const opacity = isNumber(args[0]) ?? isBasic(args[0]);
        if (!opacity) throw new SyntaxError(`${property}() requires a number or percentage. Got: ${args[0]?.text || 'undefined'}`);
        args.shift();
        if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
        return { [property]: opacity.text };
    };
}

function createMarkerFunction(property) {
    return function (args) {
        if (!args?.length) return { [property]: "none" };
        const marker = extractUrl(args) ?? (extractName(args) === "none" ? "none" : null);
        if (!marker) throw new SyntaxError(`${property}() requires url() or 'none'. Got: ${args[0]?.text || 'undefined'}`);
        if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
        return { [property]: marker };
    };
}

function createNumberFunction(property, defaultValue) {
    return function (args) {
        if (!args?.length) return { [property]: defaultValue };
        const value = extractNumber(args) ?? extractName(args);
        if (!value)throw new SyntaxError(`${property}() requires a number or valid CSS value. Got: ${args[0]?.text || 'undefined'}`);
        if (args.length) throw new SyntaxError(`Unknown ${property} argument: ${args[0].text}`);
        return { [property]: value };
    };
}

function strokeDasharray(args) {
    if (!args?.length) return { "stroke-dasharray": "none" };
    const values = [];
    while (args.length) {
        const arg = args.shift();
        const basic = isBasic(arg);
        if (basic && (basic.type === "number" || basic.type === "length" || basic.text === "none")) {
            values.push(basic.text);
        } else if (arg.kind === "WORD" && arg.text === "none") {
            values.push("none");
        } else {
            args.unshift(arg);
            break;
        }
    }
    if (args.length) throw new SyntaxError(`Unknown strokeDasharray argument: ${args[0].text}`);
    return { "stroke-dasharray": values.join(" ") };
}

function paintOrder(args) {
    if (!args?.length) return { "paint-order": "normal" };
    
    const values = [];
    while (args.length) {
        const v = extractName(args);
        if (!(v in PAINT_ORDER_WORDS)) throw new SyntaxError(`Unknown paint-order value: ${v}. Use: ${Object.keys(PAINT_ORDER_WORDS).join(", ")}`);
        values.push(PAINT_ORDER_WORDS[v]);
    }
    
    return { "paint-order": values.join(" ") };
}

const LINECAP_WORDS = {
    butt: "butt",
    round: "round",
    square: "square",
};

const LINEJOIN_WORDS = {
    miter: "miter",
    round: "round",
    bevel: "bevel",
};

const TEXT_ANCHOR_WORDS = {
    start: "start",
    middle: "middle",
    end: "end"
};

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

const DOMINANT_BASELINE_WORDS = {
    auto: "auto", ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging",
    mathematical: "mathematical", central: "central", middle: "middle",
    textAfterEdge: "text-after-edge", textBeforeEdge: "text-before-edge"
};

const ALIGNMENT_BASELINE_WORDS = {
    auto: "auto", baseline: "baseline", beforeEdge: "before-edge", textBeforeEdge: "text-before-edge",
    middle: "middle", central: "central", afterEdge: "after-edge", textAfterEdge: "text-after-edge",
    ideographic: "ideographic", alphabetic: "alphabetic", hanging: "hanging", mathematical: "mathematical"
};

const RULE_WORDS = { 
    nonzero: "nonzero", 
    evenodd: "evenodd" 
};

const COLOR_INTERPOLATION_WORDS = { 
    auto: "auto", 
    sRGB: "sRGB", 
    linearRGB: "linearRGB" 
};

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

const MASK_TYPE_WORDS = { 
    luminance: "luminance", 
    alpha: "alpha" 
};


const fill = createColorFunction("fill");
const stroke = createColorFunction("stroke");
const stopColor = createColorFunction("stop-color");
const lightingColor = createColorFunction("lighting-color");
const strokeWidth = createLengthFunction("stroke-width", "1");
const strokeDashoffset = createLengthFunction("stroke-dashoffset", "0");
const baselineShift = createLengthFunction("baseline-shift", "baseline");
const strokeLinecap = createEnumFunction("stroke-linecap", LINECAP_WORDS);
const strokeLinejoin = createEnumFunction("stroke-linejoin", LINEJOIN_WORDS);
const textAnchor = createEnumFunction("text-anchor", TEXT_ANCHOR_WORDS);
const shapeRendering = createEnumFunction("shape-rendering", SHAPE_RENDERING_WORDS);
const vectorEffect = createEnumFunction("vector-effect", VECTOR_EFFECT_WORDS);
const dominantBaseline = createEnumFunction("dominant-baseline", DOMINANT_BASELINE_WORDS);
const alignmentBaseline = createEnumFunction("alignment-baseline", ALIGNMENT_BASELINE_WORDS);
const fillRule = createEnumFunction("fill-rule", RULE_WORDS);
const clipRule = createEnumFunction("clip-rule", RULE_WORDS);
const colorInterpolation = createEnumFunction("color-interpolation", COLOR_INTERPOLATION_WORDS);
const colorRendering = createEnumFunction("color-rendering", COLOR_RENDERING_WORDS);
const imageRendering = createEnumFunction("image-rendering", IMAGE_RENDERING_WORDS);
const maskType = createEnumFunction("mask-type", MASK_TYPE_WORDS);
const fillOpacity = createOpacityFunction("fill-opacity");
const strokeOpacity = createOpacityFunction("stroke-opacity");
const svgOpacity = createOpacityFunction("opacity");
const stopOpacity = createOpacityFunction("stop-opacity");
const markerStart = createMarkerFunction("marker-start");
const markerMid = createMarkerFunction("marker-mid");
const markerEnd = createMarkerFunction("marker-end");
const strokeMiterlimit = createNumberFunction("stroke-miterlimit", "4");

export default {
    fill,
    stroke,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    strokeDasharray,
    strokeMiterlimit,
    strokeDashoffset,
    paintOrder,
    vectorEffect,
    fillOpacity,
    strokeOpacity,
    opacity: svgOpacity,
    markerStart,
    markerMid,
    markerEnd,
    stopColor,
    stopOpacity,
    textAnchor,
    dominantBaseline,
    alignmentBaseline,
    baselineShift,
    fillRule,
    clipRule,
    shapeRendering,
    colorInterpolation,
    colorRendering,
    imageRendering,
    lightingColor,
    maskType,
    noFill: () => ({ fill: "none" }),
    noStroke: () => ({ stroke: "none" }),
    noMarkers: () => ({ "marker-start": "none", "marker-mid": "none", "marker-end": "none" }),
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
    startText: { "text-anchor": "start" },
    middleText: { "text-anchor": "middle" },
    endText: { "text-anchor": "end" },
    alphabeticBaseline: { "dominant-baseline": "alphabetic" },
    middleBaseline: { "dominant-baseline": "middle" },
    hangingBaseline: { "dominant-baseline": "hanging" },
    crispEdges: { "shape-rendering": "crispEdges" },
    geometricPrecision: { "shape-rendering": "geometricPrecision" },
    optimizeSpeed: { "color-rendering": "optimizeSpeed", "image-rendering": "optimizeSpeed" },
    optimizeQuality: { "color-rendering": "optimizeQuality", "image-rendering": "optimizeQuality" },
};