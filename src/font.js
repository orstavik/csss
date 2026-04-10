import { CsssPrimitives, CsssFunctions, BadArgument } from "./func2.js";
const { Angle, Length, Name, Integer, Quote, Percent, Word, NumberInterpreter, AbsoluteUrl } = CsssPrimitives;
const { FunctionType, SF2, CssValuesToCsssTable } = CsssFunctions;

// http://dbushell.com/2024/11/05/webkit-font-smoothing/
// this should be added by default, same as padding:0, margin: 0, box-sizing: border-box, etc.
// :root { -webkit-font-smoothing: antialiased; }

// note: font-width is not supported yet.

const props = {
  fontFamily: undefined,
  fontSize: undefined,
  fontStyle: undefined,
  fontWeight: undefined,
  fontSizeAdjust: undefined,
  letterSpacing: undefined,
  textTransform: undefined,
  fontStretch: undefined,
  fontVariantCaps: undefined,
  fontSynthesis: undefined,
  fontFeatureSettings: undefined,
  fontVariationSettings: undefined,
  fontKerning: undefined,
};

const SynthesisTable = CssValuesToCsssTable("none|style|weight|small-caps|position");
const fontSynthesis = SF2("synthesis/1-4", [a => SynthesisTable[a.text]], (_, ar) => {
  if (ar.find((a, i) => ar.lastIndexOf(a) !== i))
    throw BadArgument("synthesis", ar, i, "Duplicate synthesis type.");
  return ar.map(a => SynthesisTable[a.text]).join(" ");
});

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 */

const Transforms = CssValuesToCsssTable("uppercase|lowercase|capitalize|full-width");
Transforms.transformNone = "none";
const textTransform = a => Transforms[a.text];

const Weights = CssValuesToCsssTable("bold|bolder|lighter");
Weights.weightNormal = "normal";
const fontWeight = a => Weights[a.text] ?? (((a = Integer(a)) && a >= 1 && a <= 1000 && a) || undefined);

const Styles = CssValuesToCsssTable("italic");
Styles.styleNormal = "normal";
const fontStyle = a => Styles[a.text] ?? ((a = Angle(a)) && `oblique ${a}`);

const VariantCaps = CssValuesToCsssTable("small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps");
const VariantNumeric = CssValuesToCsssTable("ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums");
const VariantEastAsian = CssValuesToCsssTable("jis78|jis83|jis90|jis04|simplified|traditional");
const VariantEmoji = CssValuesToCsssTable("emoji|text|unicode");
const VariantAlternate = CssValuesToCsssTable("historical-forms");//|stylistic(set)?\\d+|styleset\\d+|character-variant\\d+");
const VariantLigatures = CssValuesToCsssTable("common-ligatures|no-common-ligatures|discretionary-ligatures|no-discretionary-ligatures|historical-ligatures|no-historical-ligatures|contextual|no-contextual");
const VariantPosition = CssValuesToCsssTable("sub|super");
const fontVariant = SF2("variant/1-9", [({ text }) => VariantCaps[text] ?? VariantNumeric[text] ?? VariantEastAsian[text] ?? VariantEmoji[text] ?? VariantAlternate[text] ?? VariantLigatures[text] ?? VariantPosition[text]], (name, args) => args.map(a => a.text).join(" "));

const Stretches = CssValuesToCsssTable("condensed|expanded|semi-condensed|semi-expanded|extra-condensed|extra-expanded|ultra-condensed|ultra-expanded");
const Stretch = FunctionType("width", a => a.text === "normal" ? "normal" : Percent(a));
const fontStretch = a => Stretches[a.text] ?? Stretch(a);

const Kernings = CssValuesToCsssTable("auto|normal|none");
const fontKerning = SF2("kerning/1", [a => Kernings[a.text]], (_, args) => args[0]);

const Sizes = CssValuesToCsssTable("larger|smaller|xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large");
const fontSize = a => Sizes[a.text] ?? Length(a);

const letterSpacing = FunctionType("spacing", Length);

const FontMetrics = CssValuesToCsssTable("ex-height|cap-height|ch-width|ic-width|ic-height");
const fontSizeAdjust = ({ name, args }) => {
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

function fontImpl(NAME, I, args) {
  const cache = new Set();
  const Singles = {
    fontSize,
    fontStyle,
    fontWeight,
    fontSizeAdjust,
    letterSpacing,
    textTransform,
    fontStretch,
    fontVariant,
    fontSynthesis,
    fontKerning,
  };
  const res = {}, fontFamilies = [];
  main: for (let i = I; i < args.length; i++) {
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
    const v = FontFamily(a);
    if (v != null) {
      fontFamilies.push(v);
      continue main;
    }
    for (let k in cache)
      if (Singles[k](a) != null)
        throw BadArgument(NAME, args, i, `Multiple values for ${k} specified.`);
    throw BadArgument(NAME, args, i, "Unknown argument.");
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
}

const font = ({ name, args }) => name === "font" && fontImpl(name, 0, args);

const Font = ({ name, args }) => {
  if (name !== "Font") return;
  const typeface = Name(args[0]);
  if (!typeface) throw BadArgument(name, args, 0, "First argument must be a typeface name.");
  const res = fontImpl(name, 1, args);
  for (let k in props)
    if (!(k in res))
      res[k] = typeface === "_" ? "unset" : `var(--${typeface + k[0].toUpperCase() + k.slice(1)}, unset)`;
  return res;
};

const Typeface = ({ name, args }) => {
  if (name !== "Typeface") return;
  const typeface = Name(args[0]);
  if (!typeface) throw BadArgument(name, args, 0, "First argument must be a typeface name.");
  const tmp = fontImpl(name, 1, args);
  const res = {};
  for (let k in props)
    if (tmp[k] !== undefined)
      res[`--${typeface + k[0].toUpperCase() + k.slice(1)}`] = tmp[k];
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
};

export default {
  props,
  csss: {
    font,
    Font,
    Typeface,
  },
  css: {
    font: style => {
      let args = [];
      if (style.fontFamily && style.fontFamily !== "unset") args.push(style.fontFamily.replace(/\s+/g, "+").replace(/,/g, ", "));
      if (style.fontSize && style.fontSize !== "unset") args.push(style.fontSize);
      if (style.fontStyle && style.fontStyle !== "unset") args.push(style.fontStyle);
      if (style.fontWeight && style.fontWeight !== "unset") args.push(style.fontWeight);
      if (style.fontSizeAdjust && style.fontSizeAdjust !== "unset") args.push(`adjust(${style.fontSizeAdjust.replace(/\s+/g, ",")})`);
      if (style.letterSpacing && style.letterSpacing !== "unset") args.push(`spacing(${style.letterSpacing})`);
      if (style.textTransform && style.textTransform !== "unset") args.push(style.textTransform);
      if (style.fontStretch && style.fontStretch !== "unset") args.push(style.fontStretch.replace(/\s+/g, ""));
      if (style.fontVariant && style.fontVariant !== "unset") args.push(`variant(${style.fontVariant.replace(/\s+/g, ",")})`);
      if (style.fontSynthesis && style.fontSynthesis !== "unset") args.push(`synthesis(${style.fontSynthesis.replace(/\s+/g, ",")})`);
      if (style.fontKerning && style.fontKerning !== "unset") args.push(`kerning(${style.fontKerning})`);

      return args.length ? `font(${args.join(",")})` : undefined;
    }
  }
};