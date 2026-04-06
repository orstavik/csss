import { CsssPrimitives, CsssFunctions, BadArgument } from "./func2.js";
const { Angle, Length, Name, Fraction, Integer, Quote, Percent, Word, Basic, NameUnset, AbsoluteUrl } = CsssPrimitives;
const { FunctionWithDefaultValues, ParseFirstThenRest, FunctionType, FunctionPropertyType, SF2, CssValuesToCsssTable } = CsssFunctions;

// http://dbushell.com/2024/11/05/webkit-font-smoothing/
// this should be added by default, same as padding:0, margin: 0, box-sizing: border-box, etc.
// :root { -webkit-font-smoothing: antialiased; }

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

const cache = new Set();
function fontImpl(NAME, I, Singles, Arrays, args) {
  cache.clear();
  const res = {};
  main: for (let i = 0; i < args.length; i++) {
    const a = args[i];
    for (let key in Singles) {
      if (cache.has(key))
        continue;
      const v = Singles[key](a);
      if (v == null)
        continue;
      cache.add(key);
      res[key] = v;
      continue main;
    }
    for (let key in Arrays) {
      const v = Arrays[key](a);
      if (v == null)
        continue;
      (res[key] ??= []).push(v);
      continue main;
    }
    for (let k in cache)
      if (Singles[k](a) != null)
        throw BadArgument(NAME, args, I + i, `Multiple values for ${k} specified.`);
    throw BadArgument(NAME, args, I + i, "Unknown argument.");
  }
  return res;
}

const SynthesisTable = CssValuesToCsssTable("none|style|weight|small-caps|position");
const FontSynthesis = SF2("synthesis/1-4", [a => SynthesisTable[a.text]], (name, args) => {
  if (args.find((a, i) => args.lastIndexOf(a) !== i))
    throw BadArgument(name, args, i, "Duplicate synthesis type.");
  return args.map(a => SynthesisTable[a.text]).join(" ");
});

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 */

const Transforms = CssValuesToCsssTable("uppercase|lowercase|capitalize|full-width");
Transforms.transformNone = "none";
const TextTransform = a => Transforms[a.text];

const Weights = CssValuesToCsssTable("bold|bolder|lighter");
Weights.weightNormal = "normal";
const FontWeight = a => Weights[a.text] ?? (((a = Integer(a)) && a >= 1 && a <= 1000 && a) || undefined);

const Styles = CssValuesToCsssTable("italic");
Styles.styleNormal = "normal";
const FontStyle = a => Styles[a.text] ?? ((a = Angle(a)) && `oblique ${a}`);

const VariantCaps = CssValuesToCsssTable("small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps");
const VariantNumeric = CssValuesToCsssTable("ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums");
const VariantEastAsian = CssValuesToCsssTable("jis78|jis83|jis90|jis04|simplified|traditional");
const VariantEmoji = CssValuesToCsssTable("emoji|text|unicode");
const VariantAlternate = CssValuesToCsssTable("historical-forms");//|stylistic(set)?\\d+|styleset\\d+|character-variant\\d+");
const VariantLigatures = CssValuesToCsssTable("common-ligatures|no-common-ligatures|discretionary-ligatures|no-discretionary-ligatures|historical-ligatures|no-historical-ligatures|contextual|no-contextual");
const VariantPosition = CssValuesToCsssTable("sub|super");
const FontVariant = SF2("variant/1-9", [({ text }) => VariantCaps[text] ?? VariantNumeric[text] ?? VariantEastAsian[text] ?? VariantEmoji[text] ?? VariantAlternate[text] ?? VariantLigatures[text] ?? VariantPosition[text]], (name, args) => args.map(a => a.text).join(" "));

const Widths = CssValuesToCsssTable("condensed|expanded|semi-condensed|semi-expanded|extra-condensed|extra-expanded|ultra-condensed|ultra-expanded");
const Width = FunctionType("width", a => a.text === "normal" ? "normal" : Percent(a));
const FontWidth = a => Widths[a.text] ?? Width(a);

const Kernings = CssValuesToCsssTable("auto|normal|none");
const FontKerning = SF2("kerning/1", [a => Kernings[a.text]], (name, args) => args[0]);

const Hyphens = { hyphens: "auto", hyphensManual: "manual", hyphensNone: "none" };
const Hyphen = a => Hyphens[a.text];

const Sizes = CssValuesToCsssTable("larger|smaller|xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large");
const FontSize = a => Sizes[a.text] ?? Length(a);

const LetterSpacing = FunctionType("spacing", Length);

const FontMetrics = CssValuesToCsssTable("ex-height|cap-height|ch-width|ic-width|ic-height");
const FontSizeAdjust = ({ name, args }) => {
  if (name !== "adjust") return;
  let i = 0;
  const fontMetric = FontMetrics[args[i].text];
  if (fontMetric) i++;
  const fromFont = args[i].text === "fromFont" ? "from-font" : undefined;
  if (fromFont) i++;
  const number = NumberInterpreter(args[i]);
  if (number != null) i++;
  if (i !== args.length) throw BadArgument(name, args, i, "Invalid argument.");
  return [fontMetric, fromFont, number].filter(Boolean).join(" ");
};

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

  for (let i = 0, v; i < args.length; i++) {
    const arg = args[i];

    v = FontVariant(arg);
    if (v && res.fontVariant != null) throw BadArgument(name, args, i, "Multiple font variant values specified.");
    if (v) { res.fontVariant = v; continue; }

    v = LetterSpacing(arg);
    if (v && res.letterSpacing != null) throw BadArgument(name, args, i, "Multiple letter spacing values specified.");
    if (v) { res.letterSpacing = v; continue; }

    v = FontSizeAdjust(arg);
    if (v && res.fontSizeAdjust != null) throw BadArgument(name, args, i, "Multiple font size adjust values specified.");
    if (v) { res.fontSizeAdjust = v; continue; }

    v = Hyphen(arg);
    if (v && res.hyphens != null) throw BadArgument(name, args, i, "Multiple hyphens values specified.");
    if (v) { res.hyphens = v; continue; }

    v = FontKerning(arg);
    if (v && res.fontKerning != null) throw BadArgument(name, args, i, "Multiple font kerning values specified.");
    if (v) { res.fontKerning = v; continue; }

    v = TextTransform(arg);
    if (v && res.textTransform != null) throw BadArgument(name, args, i, "Multiple text transform values specified.");
    if (v) { res.textTransform = v; continue; }

    v = Fraction(arg);
    if (v && res.fontSizeAdjust != null) throw BadArgument(name, args, i, "Multiple font size adjust values specified.");
    if (v) { res.fontSizeAdjust = v; continue; }

    v = FontSize(arg);
    if (v && res.fontSize != null) throw BadArgument(name, args, i, "Multiple font sizes specified.");
    if (v) { res.fontSize = v; continue; }

    v = FontWidth(arg);
    if (v && res.fontStretch != null) throw BadArgument(name, args, i, "Multiple font stretch values specified.");
    if (v) { res.fontStretch = v; continue; }

    v = FontSynthesis(arg);
    if (v && res.fontSynthesis != null) throw BadArgument(name, args, i, "Multiple font synthesis values specified.");
    if (v) { res.fontSynthesis = v; continue; }

    v = FontWeight(arg);
    if (v && res.fontWeight != null) throw BadArgument(name, args, i, "Multiple font weights specified.");
    if (v) { res.fontWeight = v; continue; }

    v = FontStyle(arg);
    if (v && res.fontStyle != null) throw BadArgument(name, args, i, "Multiple font styles specified.");
    if (v) { res.fontStyle = v; continue; }

    v = FontFamily(arg);
    if (v) { fontFamilies.push(v); continue; }

    throw BadArgument(name, args, i);
  }

  if (!fontFamilies.length)
    return res;
  if (fontFamilies.includes("emoji")) {
    fontFamilies.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    fontFamilies = fontFamilies.filter(f => f !== "emoji");
  }
  const fontFamily = fontFamilies
    .map(f => f.fontFamily ?? f)
    .map(f => typeof f === "string" ? f.replaceAll("+", " ") : f)
    .join(", ");
  for (let face of fontFamilies.filter(f => f instanceof Object))
    res["@font-face " + face.src.split("\n")[0]] = face;
  return { fontFamily, ...res };
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