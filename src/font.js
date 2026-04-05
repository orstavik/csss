import { CsssPrimitives, CsssFunctions, BadArgument } from "./func2.js";
const { Angle, Length, Name, Fraction, Integer, Quote, Percent, Word, Basic, NameUnset, AbsoluteUrl } = CsssPrimitives;
const { FunctionWithDefaultValues, ParseFirstThenRest, FunctionPropertyType, SF2, CssValuesToCsssTable } = CsssFunctions;

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

const Transforms = CssValuesToCsssTable("uppercase|lowercase|capitalize|full-width");
Transforms.noTransform = "none";
const Weights = CssValuesToCsssTable("bold|bolder|lighter");
Weights.noWeight = "normal";
const Styles = CssValuesToCsssTable("italic");
Styles.noStyle = "normal";
const VariantCaps = CssValuesToCsssTable("small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps");
VariantCaps.noVariant = "normal";
const Widths = CssValuesToCsssTable("condensed|expanded|semi-condensed|semi-expanded|extra-condensed|extra-expanded|ultra-condensed|ultra-expanded");
Widths.noStretch = "normal";
const Kernings = CssValuesToCsssTable("kerning");
Kernings.noKerning = "none";
const Hyphens = { hyphens: "auto", shy: "manual", noHyphens: "none" };
const Sizes = CssValuesToCsssTable("larger|smaller|xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large");

const variant = SF2("variant/1-5", [Word], (n, v) => v.join(" ")); //todo: more specific parsing?


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

const FontFamily = a => FontFaceUrl(a) ?? Word(a) ?? Quote(a);
// const FontSize = a => { const t = Length(a); if (t) return { fontSize: t }; };
// const FontSizeAdjust = a => { const t = Fraction(a); if (t) return { fontSizeAdjust: t }; };
// const FontWeight = a => { const t = Integer(a); if (t) return { fontWeight: t }; };
// const FontAngle = a => { const t = Angle(a); if (t) return { fontStyle: "oblique " + t }; };

const font = ({ name, args }) => {
  if (name.toLowerCase() !== "font") return;
  let res = {};
  let fontFamilies = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.kind === "WORD") {
      const text = arg.text;
      if (res.fontSynthesis == null) if (text in SYNTHESIS_WORDS) { Object.assign(res, SYNTHESIS_WORDS[text]); continue; }
      if (res.textTransform == null) if (text in Transforms) { res.textTransform = Transforms[text]; continue; }
      if (res.fontWeight == null) if (text in Weights) { res.fontWeight = Weights[text]; continue; }
      if (res.fontStyle == null) if (text in Styles) { res.fontStyle = Styles[text]; continue; }
      if (res.fontVariantCaps == null) if (text in VariantCaps) { res.fontVariantCaps = VariantCaps[text]; continue; }
      if (res.fontWidth == null) if (text in Widths) { res.fontWidth = Widths[text]; continue; }
      if (res.fontKerning == null) if (text in Kernings) { res.fontKerning = Kernings[text]; continue; }
      if (res.hyphens == null) if (text in Hyphens) { res.hyphens = Hyphens[text]; continue; }
      if (res.fontSize == null) if (text in Sizes) { res.fontSize = Sizes[text]; continue; }
      if (res.fontStyle == null) if (text === "normal") { res.fontStyle = "normal"; res.fontWeight = "normal"; continue; }
      if (res.WebkitFontSmoothing == null) if (text === "smooth") { res.WebkitFontSmoothing = "auto"; res.MozOsxFontSmoothing = "auto"; continue; }
    }

    if (arg.name === "variant") { res.fontVariant = variant(arg); continue; }
    if (arg.name === "width") { const val = Percent(arg.args[0]); if (val) { res.fontWidth = val; continue; } }
    if (arg.name === "spacing") { const val = Length(arg.args[0]); if (val) { res.letterSpacing = val; continue; } }
    if (arg.name === "adjust") { const val = Basic(arg.args[0]); if (val) { res.fontSizeAdjust = val; continue; } }

    const vLength = Length(arg);
    if (vLength && !res.fontSize) { res.fontSize = vLength; continue; }

    const vFraction = Fraction(arg);
    if (vFraction && !res.fontSizeAdjust) { res.fontSizeAdjust = vFraction; continue; }

    const vInteger = Integer(arg);
    if (vInteger && !res.fontWeight) { res.fontWeight = vInteger; continue; }

    const vAngle = Angle(arg);
    if (vAngle && !res.fontStyle) { res.fontStyle = "oblique " + vAngle; continue; }

    const vFontFamily = FontFamily(arg);
    if (vFontFamily) { fontFamilies.push(vFontFamily); continue; }

    throw BadArgument(name, args, i);
  }

  if (fontFamilies.length > 0) {
    if (fontFamilies.includes("emoji")) {
      fontFamilies.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
      fontFamilies = fontFamilies.filter(f => f !== "emoji");
    }
    const fontFamily = fontFamilies
      .map(f => f.fontFamily ?? f)
      .map(f => typeof f === "string" ? f.replaceAll("+", " ") : f)
      .join(", ");
    res = { fontFamily, ...res };
    for (let face of fontFamilies.filter(f => f instanceof Object))
      res["@font-face " + face.src.split("\n")[0]] = face;
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