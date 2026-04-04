import { CsssPrimitives, CsssFunctions } from "./func2.js";
const { Angle, Length, Name, Fraction, Integer, Quote, Percent, Word, Basic, NameUnset, AbsoluteUrl } = CsssPrimitives;
const { AccumulatingTypeBasedFunction, FunctionWithDefaultValues, ParseFirstThenRest, FunctionPropertyType, SF2, SingleTableRaw } = CsssFunctions;

const PROPS = {
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

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 */
const SYNTHESIS_WORDS = (function () {
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
  ...SYNTHESIS_WORDS,
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

};

const FONT_FUNCTIONS = [
  SF2("variant/1-5", [Word], (n, v) => ({ fontVariant: v.join(" ") })), //todo: more specific parsing?
  FunctionPropertyType("width", "fontWidth", Percent),
  FunctionPropertyType("spacing", "letterSpacing", Length), //"_" => "normal". This should be LengthNormal? where we do "_" as "normal"?
  FunctionPropertyType("adjust", "fontSizeAdjust", Basic),
  SingleTableRaw(FONT_WORDS)
];


// @font-face {
// font-family: "Trickster";
// src:
//   local("Trickster"),
//   url("trickster-COLRv1.otf") format("opentype") tech(color-COLRv1),
//   url("trickster-outline.otf") format("opentype"),
//   url("trickster-outline.woff") format("woff");
// }
// becomes 
// "./trickster-COLRv1.otf#family=Trickster&format=opentype&tech=color-COLRv1&src=trickster-outline.otf&format=opentype&src=trickster-outline.woff&format=woff"
function FontFaceUrl(t) {
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

const FontFamily = a => {
  const t = FontFaceUrl(a) ?? Word(a) ?? Quote(a);
  if (t) return { fontFamily: t };
};
const FontSize = a => { const t = Length(a); if (t) return { fontSize: t }; };
const FontSizeAdjust = a => { const t = Fraction(a); if (t) return { fontSizeAdjust: t }; };
const FontWeight = a => { const t = Integer(a); if (t) return { fontWeight: t }; };
const FontAngle = a => { const t = Angle(a); if (t) return { fontStyle: "oblique " + t }; };

const fontTypeBased = AccumulatingTypeBasedFunction(
  ...FONT_FUNCTIONS,
  FontSize,
  FontSizeAdjust,
  FontWeight,
  FontAngle,
  FontFamily
);

const font = ({ name, args }) => {
  if (name !== "font") return;
  const obj = fontTypeBased({ name, args });
  const res = {};

  for (let [k, v] of Object.entries(obj)) {
    if (k === "fontFamily") {
      let fontFamilies = Array.isArray(v) ? v : [v];
      if (fontFamilies.includes("emoji")) {
        fontFamilies.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
        fontFamilies = fontFamilies.filter(f => f !== "emoji");
      }
      res.fontFamily = fontFamilies
        .map(f => f.fontFamily ?? f)
        .map(f => typeof f === "string" ? f.replaceAll("+", " ") : f)
        .join(", ");
      for (let face of fontFamilies.filter(f => f instanceof Object))
        res["@font-face " + face.src.split("\n")[0]] = face;
    } else if (k === "Angle") res.fontStyle = "oblique " + v; // From original font code
    else if (v instanceof Object && !Array.isArray(v)) Object.assign(res, v);
    else res[k] = v;
  }

  return res;
};

const innerFont = ({ args }) => font({ name: "font", args });

const FontUnset = ParseFirstThenRest(NameUnset, innerFont, (typeface, res = {}) => {
  if (typeface !== "unset")
    for (let k in PROPS)
      if (!(k in res))
        res[k] = `var(--${typeface + k[0].toUpperCase() + k.slice(1)}, unset)`;
  return res;
});

const Font = a => {
  if (a.name !== "Font") return;
  return FunctionWithDefaultValues(DEFAULTS, FontUnset)(a);
};

const Typeface = a => {
  if (a.name !== "Typeface") return;
  return ParseFirstThenRest(Name, innerFont, (typeface, tmp = {}) => {
    const res = {};
    for (let k in PROPS)
      if (tmp[k] !== undefined)
        res[`--${typeface + k[0].toUpperCase() + k.slice(1)}`] = tmp[k];
    for (let k in tmp)
      if (k.startsWith("@"))
        res[k] = tmp[k];
    return res;
  })(a);
};

const DEFAULTS = Object.fromEntries(Object.keys(PROPS).map(k => [k, "unset"]));
export default {
  props: PROPS,
  csss: {
    font,
    Font,
    Typeface,
  },
  css: {}
};