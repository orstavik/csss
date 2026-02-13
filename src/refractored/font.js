/**
 * Font shorts:
 * - Express font settings as semantic tokens: weight/style/stretch/caps/size,
 *   plus font-face URLs that expand into @font-face blocks.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses words + typed slots into font props.
 * - FunctionWithDefaultValues (Umbrella): wraps parsed props with FontDefaults.
 * - SequentialFunction (Sequence), SingleArgumentFunction (SIN), FIRST.
 * - ValueTypes: Length, Integer, Fraction, Angle, Percent, AbsoluteUrl, Quote,
 *   Basic, Word, Name, NameUnset.
 *
 * Export map:
 * - `font` parser (shorthand).
 * - `Font` umbrella: applies FontDefaults and var(...) indirection.
 * - `Typeface`: writes CSS variables / @font-face rules.
 * - Reserved font-related longhands in default export.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  AbsoluteUrl,
  Quote,
  Angle,
  Integer,
  Fraction,
  Length,
  Percent,
  Basic,
  Word,
  Name,
  NameUnset,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  Umbrella: FunctionWithDefaultValues,
  Sequence: SequentialFunction,
  SIN: SingleArgumentFunction,
  FIRST: ParseFirstThenRest,
} = FunctionTypes;

const FontDefaults = {
  fontFamily: "unset",
  fontSize: "unset",
  fontStyle: "unset",
  fontWeight: "unset",
  fontSizeAdjust: "unset",
  letterSpacing: "unset",
  textTransform: "unset",
  fontWidth: "unset",
  fontStretch: "unset",
  fontVariantCaps: "unset",
  fontSynthesis: "unset",
  fontFeatureSettings: "unset",
  fontVariationSettings: "unset",
  WebkitFontSmoothing: "unset",
  MozOsxFontSmoothing: "unset",
  fontKerning: "unset",
  hyphens: "unset",
};

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * Most of the text properties are either layout (text-align, line-height, word-spacing, hyphenation).
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 * ??candidate for font is hyphenation. Where we break the words, that could be more a font characteristic than a layout characteristic??
 */
const SynthesisWords = (function () {
  function* permutations(arr, remainder) {
    for (let i = 0; i < arr.length; i++) {
      const x = arr[i];
      const rest = arr.slice(0, i).concat(arr.slice(i + 1));
      if (remainder == 1)
        yield [x];
      else
        for (let p of permutations(rest, remainder - 1))
          yield [x, ...p];
    }
  }
  const res = {};
  const synths = ["Style", "Weight", "SmallCaps", "Position"];
  for (let k = 1; k <= synths.length - 1; k++)
    for (const combo of permutations(synths, k))
      res["no" + combo.join("") + "Synthesis"] = synths.filter(k => !combo.includes(k)).join(" ").replace("Caps", "-caps").toLowerCase();
  res.noSynthesis = { fontSynthesis: "none" };
  return res;
})();

const FONT_WORDS = {
  ...SynthesisWords,
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  fullWidth: { textTransform: "full-width" },
  noTransform: { textTransform: "none" },

  bold: { fontWeight: "bold" },
  b: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  noWeight: { fontWeight: "normal" },

  italic: { fontStyle: "italic" },
  ital: { fontStyle: "italic" },
  i: { fontStyle: "italic" },
  noStyle: { fontStyle: "normal" },

  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  noVariant: { fontVariantCaps: "normal" },

  condensed: { fontWidth: "condensed" },
  expanded: { fontWidth: "expanded" },
  semiCondensed: { fontWidth: "semi-condensed" },
  semiExpanded: { fontWidth: "semi-expanded" },
  extraCondensed: { fontWidth: "extra-condensed" },
  extraExpanded: { fontWidth: "extra-expanded" },
  ultraCondensed: { fontWidth: "ultra-condensed" },
  ultraExpanded: { fontWidth: "ultra-expanded" },
  noStretch: { fontWidth: "normal" },

  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },

  hyphens: { hyphens: "auto" },
  shy: { hyphens: "manual" },
  noHyphens: { hyphens: "none" },

  normal: { fontStyle: "normal", fontWeight: "normal" },
  smooth: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" }, //todo this is wrong? should be "antialiased" for WebkitFontSmoothing and "grayscale" for MozOsxFontSmoothing??

  larger: { fontSize: "larger" },
  smaller: { fontSize: "smaller" },
  xxs: { fontSize: "xx-small" },
  xs: { fontSize: "x-small" },
  sm: { fontSize: "small" },
  md: { fontSize: "medium" },
  lg: { fontSize: "large" },
  xl: { fontSize: "x-large" },
  xxl: { fontSize: "xx-large" },
  xxxl: { fontSize: "xxx-large" },

  variant: SequentialFunction("variant/1-5", [Word], (n, v) => ({ fontVariant: v.join(" ") })), //todo: more specific parsing?
  width: SingleArgumentFunction(Percent, (n, v) => ({ fontWidth: v })),
  spacing: SingleArgumentFunction(Length, (n, v) => ({ letterSpacing: v })), //"_" => "normal". This should be LengthNormal? where we do "_" as "normal"?
  adjust: SingleArgumentFunction(Basic, (n, v) => ({ fontSizeAdjust: v })),
};


// @font-face {
// font-family: "Trickster";
// src:
//   local("Trickster"),
//   url("trickster-COLRv1.otf") format("opentype") tech(color-COLRv1),
//   url("trickster-outline.otf") forma//   url("trickster-outline.woff") format("woff");
// }
// becomes 
// "./trickster-COLRv1.otf#family=Trickster&format=opentype&tech=color-COLRv1&src=trickster-outline.otf&format=opentype&src=trickster-outline.woff&format=woff"
function parseFontFaceUrl(t) {
  const font = AbsoluteUrl(t);
  if (!font)
    return;
  const sp = new URLSearchParams(font.hash.slice(1));
  const url = new URL("", font);
  const res = {
    fontFamily: font.pathname.split("/").at(-1).split(/[.-]/)[0],
    src: [`url("${url}")`],
  };
  const SHORTCUTS = {
    family: "fontFamily",
    style: "fontStyle",
    weight: "fontWeight",
    stretch: "fontStretch",
    variant: "fontVariant",
    featureSettings: "fontFeatureSettings",
    variationSettings: "fontVariationSettings",
  };
  for (let [k, v] of sp.entries()) {
    k = SHORTCUTS[k] ?? k;
    v = v.replaceAll("+", " ");
    if (k === "src")
      res.src.push(`url("${new URL(v, url)}")`);
    else if (k === "format" || k === "tech")
      res.src.at(-1)[k] += ` ${k}(${v})`;
    else
      res[k] = v
  }
  res.src = `/*${font}*/\nlocal("${res.fontFamily}"),\n` + res.src.join(",\n");
  return res;
}

const font = FunctionBasedOnValueTypes(FONT_WORDS, {
  fontSize: Length,
  fontSizeAdjust: Fraction,
  fontWeight: Integer,
  Angle,
}, {
  fontFamily: t => parseFontFaceUrl(t) ?? Word(t) ?? Quote(t)
}, obj => {
  const res = {};
  for (let [k, v] of Object.entries(obj)) {
    if (k === "fontFamily") {
      if (v.includes("emoji")) {
        v.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
        v = v.filter(f => f !== "emoji");
      }
      res.fontFamily = v
        .map(f => f.fontFamily ?? f)
        .map(f => f.replaceAll("+", " "))
        .join(", ");
      for (let face of v.filter(f => f instanceof Object))
        res["@font-face " + face.src.split("\n")[0]] = face;
    } else if (k === "Angle") res.fontStyle = "oblique " + v;
    else if (v instanceof Object) Object.assign(res, v);
    else res[k] = v;
  }
  return res;
});

const Font = ParseFirstThenRest(NameUnset, font,
  (_, typeName, fontProps = {}) => {
    const res = { ...FontDefaults, ...fontProps };
    if (typeName !== "unset")
      for (let k in res)
        if (res[k] === FontDefaults[k])
          res[k] = `var(--${typeName + k[0].toUpperCase() + k.slice(1)}, unset)`;
    return res;
  }
);

const Typeface = ParseFirstThenRest(Name, font,
  (_, typeName, parsedFontProps = {}) => {
    const res = {};
    for (let k in FontDefaults)
      if (parsedFontProps[k] !== undefined)
        res[`--${typeName + k[0].toUpperCase() + k.slice(1)}`] = parsedFontProps[k];
    for (let k in parsedFontProps)
      if (k.startsWith("@"))
        res[k] = parsedFontProps[k];
    return res;
  }
)

/**
 * Export map:
 * - `font`: main font shorthand parser.
 * - `Font`: umbrella that applies `FontDefaults` and var(...) indirection.
 * - `Typeface`: writes CSS variables and @font-face rules.
 * - default export: reserves all font-related longhand properties.
 */
export default {
  font,
  Font: FunctionWithDefaultValues(FontDefaults, Font),
  Typeface,

  fontFamily: undefined,
  fontSize: undefined,
  fontStyle: undefined,
  fontWeight: undefined,
  fontSizeAdjust: undefined,
  letterSpacing: undefined,
  textTransform: undefined,
  fontWidth: undefined,
  fontStretch: undefined,
  fontVariantCaps: undefined,
  fontSynthesis: undefined,
  fontFeatureSettings: undefined,
  fontVariationSettings: undefined,
  WebkitFontSmoothing: undefined,
  MozOsxFontSmoothing: undefined,
  fontKerning: undefined,
  hyphens: undefined,
};
