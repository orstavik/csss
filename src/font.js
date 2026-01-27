import { extractName, Quote, Angle, Integer, Fraction, extractUrl, isFraction, isInteger, isLength, Length, isAngle, isQuote, SIN, Percent, Basic, FIRST, Umbrella, Word, NameUnset, SINmax, TYPB } from "./func.js";

//The $font umbrella and $typeface cloud regulate this property cluster. $typeface also regulates @font-face{}.
const FONT_DEFAULTS = Object.entries({
  fontFamily: "FontFamily",
  fontSize: "FontSize",
  fontStyle: "FontStyle",
  fontWeight: "FontWeight",
  fontSizeAdjust: "FontSizeAdjust",
  letterSpacing: "LetterSpacing",
  textTransform: "TextTransform",
  fontWidth: "FontWidth",
  fontStretch: "FontWidth",  // fontStretch uses the same CSS variable as fontWidth
  fontVariantCaps: "FontVariantCaps",
  fontSynthesis: "FontSynthesis",
  fontFeatureSettings: "FontFeatureSettings",
  fontVariationSettings: "FontVariationSettings",
  WebkitFontSmoothing: "WebkitFontSmoothing",
  MozOsxFontSmoothing: "MozOsxFontSmoothing",
  fontKerning: "FontKerning",
  hyphens: "Hyphens",
});

const fontDefaults2 = {
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

//$typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
function face({ args }) {

  function featureAndVariation(args) {
    //todo this doesn't work? a.text.split instead of a.split ? 
    return args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");
  }

  const FACE = {
    feature: ({ args }) => ({ fontFeatureSettings: featureAndVariation(args) }),
    variation: ({ args }) => ({ fontVariationSettings: featureAndVariation(args) }),
    i: { fontStyle: "italic" },
    italic: { fontStyle: "italic" },
    ital: { fontStyle: "italic" },
  };

  let src = extractUrl(args);
  if (!src)
    throw new SyntaxError(`The first argument of face(...) must be a quote or a URL, but got: ${args[0]}`);
  const res = {
    fontFamily: src.slice(4, -1),
    fontStyle: "normal",
    src,
  };
  for (let a of args) {
    const a2 = FACE[a.name]?.(a) ?? FACE[a.text];
    if (a2) Object.assign(res, a2);
    throw new SyntaxError(`Unrecognized font face argument: ${a}`);
  }
  return res;//{ [`@font-face /*${res.fontFamily} ${res.fontStyle}*/`]: res };
}

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

  variant: SINmax(5, Word, (n, v) => ({ fontVariant: v })), //todo: more specific parsing?
  width: SIN(Percent, (n, v) => ({ fontWidth: v })),
  spacing: SIN(Length, (n, v) => ({ letterSpacing: v })), //"_" => "normal". This should be LengthNormal? where we do "_" as "normal"?
  adjust: SIN(Basic, (n, v) => ({ fontSizeAdjust: v })),
};

//todo it is a problem that we are passing in the fontFaceName here.. This means that we can't do the $font() as it would need a face thing..
//todo the face(...) should only be allowed in the Umbrella structure. We need to extract the face() same way as we do with the $animation functions.
function fontImpl({ name, args }) {
  const fontFaceName = name;
  let res = {}, family = [], emoji;
  for (let a of args) {
    let a2;
    if (a.text == "emoji")
      emoji = ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'];
    else if (a2 = isQuote(a))
      family.push(a2.text.slice(1, -1).replaceAll("+", " "));
    else if (a2 = isLength(a))
      res.fontSize = a2.text;
    else if (a2 = isAngle(a))
      res.fontStyle = "oblique " + a2.text;
    else if (a2 = FONT_WORDS[a.text] ?? FONT_WORDS[a.name]?.(a))
      Object.assign(res, a2);
    else if (a.kind == "WORD")
      family.push(a.text);
    else if (a2 = isInteger(a))
      res.fontWeight = a2.num;
    else if (a2 = isFraction(a))
      res.fontSizeAdjust = a2.num;
    else if (a.name == "face" && (a2 = face(a))) {
      if (fontFaceName) {
        a2.fontFamily = fontFaceName;
        a2.src = `local(${fontFaceName}), ${a2.src}`;
      }
      family.push(a2.fontFamily);
      res[`@font-face /*${a2.fontFamily} ${a2.fontStyle}*/`] = a2;
    } else
      throw new SyntaxError(`Unrecognized $font argument: ${a}`);
  }
  if (emoji)
    family.push(...emoji);
  if (family.length)
    res.fontFamily = family.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
  return res;
}

const fixFontFamily = fonts => {
  if (fonts.includes("emoji")) {
    fonts.splice(fonts.indexOf("emoji"), 1);
    fonts.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  }
  return fonts.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
}

const font = TYPB(FONT_WORDS, {
  fontSize: Length,
  fontSizeAdjust: Fraction,
  fontWeight: Integer,
  Angle
}, {
  fontFamily: t => Word(t) ?? Quote(t)
}, obj => {
  const res = {};
  for (let [k, v] of Object.entries(obj)) {
    if (k === "fontFamily") res.fontFamily = fixFontFamily(v);
    else if (k === "Angle") res.fontStyle = "oblique " + v;
    else if (k[0] === "@") res[k] = v;
    else if (v instanceof Object) Object.assign(res, v);
    else res[k] = v;
  }
  return res;
});

const fontWithName = FIRST(
  NameUnset,
  font,
  (nameNode, nameText, fontProps = {}) => {
    //todo both of these rules are a little bit unnecessary? There are usecases for both, no?
    if (nameText === "unset" && !fontProps.fontFamily)
      throw new SyntaxError(`$Font(_, ...) requires a font family.`);
    if (nameText !== "unset" && fontProps.fontFamily)
      throw new SyntaxError(`$Font(${nameText}, ...) refering to a $Type(${nameText},...) cannot specify a fontFamily.`);

    if (nameText === "unset")
      return fontProps;
    const res = {};
    for (let [k, varKey] of FONT_DEFAULTS)
      res[k] = fontProps?.[k] ?? `var(--${nameText + varKey}, unset)`;
    res.fontFamily = `var(--${nameText}FontFamily, ${nameText})`;
    return res;
  }
);

function Typeface({ args }) {
  const typeName = extractName(args);
  if (!typeName)
    throw new SyntaxError(`first argument is not a name: "${args[0].text}"`);
  const tmp = fontImpl({ name: typeName, args });
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS) {
    if (tmp[k] !== undefined)
      res[`--${typeName + varKey}`] = tmp[k];
  }
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}

export default {
  font,
  Font: Umbrella(fontDefaults2, fontWithName),

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