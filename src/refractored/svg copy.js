/**
 * This file defines SVG-related CSS shorts. A short is a function that the CSSS
 * parser calls with a parsed expression; it returns an object of camelCase CSS
 * properties. Class names like $stroke(red, 2px) are parsed into that expression
 * and then passed to the short.
 *
 * Helpers used from func.js (imported with descriptive names below):
 *
 * - parseTypedPropertyBlock(defaults, singleSlots, multiSlots?, post?)
 *   Parses a short's arguments by type (named or positional slots); returns one
 *   object of CSS properties.
 *
 * - umbrellaWithDefaults(defaultObject, parser)
 *   With no arguments returns defaultObject; with arguments runs parser(expression)
 *   and merges with defaults.
 *
 * - parseSingleArgument(interpreter, post?)
 *   Single-argument short: one argument, one interpreter; optional post(name, value);
 *   returns one property.
 *
 * - parseSequence(signature, interpreters, post)
 *   Fixed arity: N arguments interpreted in order; post(name, results) returns
 *   final property object.
 *
 * - CamelWords(allowedWords)
 *   Maps pipe-separated words to kebab-case CSS value.
 *
 * - WordInTable(table)
 *   Maps word to value from lookup table.
 *
 * - Type interpreters (Length, LengthPercent, LengthPercentNumber, NumberInterpreter,
 *   ColorUrl, Url, UrlUnset, Fraction): validate/interpret one argument and return
 *   CSS value string (or number for NumberInterpreter/Fraction).
 */
import {
    FunctionTypes,
    ValueTypes,
} from "../func.js";

const { LengthPercent,
    LengthPercentNumber,
    NumberInterpreter,
    ColorUrl,
    Url,
    UrlUnset,
    CamelWords,
    Fraction,
    Length,
    WordInTable,
} = ValueTypes;

const {
    TYPB: FunctionBasedOnValueTypes,
    Umbrella: FunctionWithDefaultValues,
    Sequence: SequentialFunction,
    SIN: SingleArgumentFunction,
} = FunctionTypes;

// --- Stroke shorts (outline of shapes) ---

/** Used when $Stroke() is called with no args. */
const strokeDefaultProperties = {
    stroke: "unset",
    strokeWidth: "unset",
    strokeOpacity: "unset",
    strokeLinecap: "unset",
    strokeLinejoin: "unset",
    strokeDasharray: "unset",
    strokeDashoffset: "unset",
    strokeMiterlimit: "unset",
};

const stroke = FunctionBasedOnValueTypes({}, {
    stroke: ColorUrl,
    strokeWidth: Length, //todo we need Integer here too, as 1,2,3,4 is valid
    strokeOpacity: NumberInterpreter, //todo and this should be a Fraction? Or a Percent?
    strokeLinecap: CamelWords("butt|round|square"),
    strokeLinejoin: CamelWords("miter|round|bevel"),
    strokeDasharray: SequentialFunction("dasharray/2-", [LengthPercentNumber], (name, ar) => ar.join(", ")),
    strokeDashoffset: SequentialFunction("dashoffset", [LengthPercent], (name, ar) => ar[0]),
    strokeMiterlimit: SequentialFunction("miterlimit", [NumberInterpreter], (name, ar) => ar[0]),
}, {});

// --- Fill shorts (interior of shapes) ---

/** Used when $Fill() is called with no args. */
const fillDefaultProperties = {
    fill: "unset",
    fillOpacity: "unset",
    fillRule: "unset",
};

const fill = FunctionBasedOnValueTypes({}, {
    fill: ColorUrl,
    fillOpacity: NumberInterpreter,
    fillRule: CamelWords("evenodd|nonzero"),
}, {});

// --- SVG text alignment shorts ---

/** Used when $SvgText() is called with no args. */
const svgTextDefaultProperties = {
    textAnchor: "unset",
    dominantBaseline: "unset",
    alignmentBaseline: "unset",
    baselineShift: "unset",
};

const svgText = FunctionBasedOnValueTypes({}, {
    textAnchor: CamelWords("start|middle|end"),
    dominantBaseline: CamelWords("auto|textBottom|alphabetic|ideographic|middle|central|mathematical|hanging|textTop"),
    alignmentBaseline: CamelWords("auto|baseline|beforeEdge|textBeforeEdge|middle|central|afterEdge|textAfterEdge|ideographic|alphabetic|hanging|mathematical"),
    baselineShift: CamelWords("sub|super|baseline"),
}, {});

/** Presets for $noStroke / $strokeNone (stroke: none). */
const strokeNone = { ...strokeDefaultProperties, stroke: "none" };
/** Presets for $noFill / $fillNone (fill: none). */
const fillNone = { ...fillDefaultProperties, fill: "none" };
/** Presets for $noSvgText / $svgTextNone. */
const svgTextNone = { ...svgTextDefaultProperties };

/**
 * Export map:
 * - Parsers: stroke, fill, svgText
 * - Umbrellas (defaults + parser): Stroke, Fill, SvgText
 * - Single-arg / sequence shorts: markerStart, markerEnd, markerMid, marker,
 *   stopColor, stopOpacity, vectorEffect, clipRule, colorInterpolation,
 *   shapeRendering, colorRendering, imageRendering, maskType, paintOrder,
 *   lightingColor, svgOpacity
 * - Placeholders: strokeWidth, strokeLinecap, ... (reserve name, no override)
 * - Presets: strokeNone, fillNone, svgTextNone, noStroke, noFill, noSvgText,
 *   noMarker, markerNone
 */
export default {
    stroke,
    fill,
    svgText,

    Stroke: FunctionWithDefaultValues(strokeDefaultProperties, stroke),
    Fill: FunctionWithDefaultValues(fillDefaultProperties, fill),
    SvgText: FunctionWithDefaultValues(svgTextDefaultProperties, svgText),

    // --- Markers (start / mid / end) ---
    markerStart: SingleArgumentFunction(Url, (name, v) => ({ [name]: v })),
    markerEnd: SingleArgumentFunction(Url, (name, v) => ({ [name]: v })),
    markerMid: SingleArgumentFunction(Url, (name, v) => ({ [name]: v })),
    marker: SequentialFunction("marker/1-3", [UrlUnset], (name, m) =>
        m.length == 1 ? { marker: m[0] } :
            m.length == 2 ? { markerStart: m[0], markerEnd: m[1] } :
                { markerStart: m[0], markerMid: m[1], markerEnd: m[2] }
    ),

    // --- Single-property SVG shorts ---
    stopColor: SingleArgumentFunction(ColorUrl, (p, v = "currentColor") => ({ [p]: v })),
    stopOpacity: SingleArgumentFunction(Fraction, (p, v = "1") => ({ [p]: v })),
    vectorEffect: SingleArgumentFunction(CamelWords("none|nonScalingStroke|nonScalingSize|nonRotation|fixedPosition"), (p, v) => ({ [p]: v })),
    clipRule: SingleArgumentFunction(CamelWords("nonzero|evenodd"), (p, v) => ({ [p]: v })),
    colorInterpolation: SingleArgumentFunction(CamelWords("auto|sRGB|linearRGB"), (p, v) => ({ [p]: v })),
    shapeRendering: SingleArgumentFunction(WordInTable({ auto: "auto", optimizeSpeed: "optimizeSpeed", crispEdges: "crispEdges", geometricPrecision: "geometricPrecision" }), (p, v) => ({ [p]: v })),
    colorRendering: SingleArgumentFunction(CamelWords("auto|optimizeSpeed|optimizeQuality"), (p, v) => ({ [p]: v })),
    imageRendering: SingleArgumentFunction(CamelWords("auto|optimizeSpeed|optimizeQuality|pixelated"), (p, v) => ({ [p]: v })),
    maskType: SingleArgumentFunction(CamelWords("luminance|alpha"), (p, v) => ({ [p]: v })),
    paintOrder: SequentialFunction("paintOrder/0-4", [CamelWords("normal|fill|stroke|markers")], (p, v = ["normal"]) => ({ [p]: v.join(" ") })),
    lightingColor: SingleArgumentFunction(ColorUrl, (p, v = "currentColor") => ({ [p]: v })),
    svgOpacity: SingleArgumentFunction(Fraction, (p, v = "1") => ({ [p]: v })),

    // --- Reserved keys (no direct short) & preset objects ---
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
