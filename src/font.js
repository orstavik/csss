import { extractName, extractUrl, isNumber, isLength, isAngle, isQuote, SIN, Percent, isBasic, FIRST, Umbrella, Word, NameUnset, SINmax } from "./func.js";

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

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * Most of the text properties are either layout (text-align, line-height, word-spacing, hyphenation).
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 * ??candidate for font is hyphenation. Where we break the words, that could be more a font characteristic than a layout characteristic??
 */

//$typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
function face({ args }, fontFamily) {

  function featureAndVariation(args) {
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
    fontFamily: fontFamily ??= src.slice(4, -1),
    fontStyle: "normal",
    src: `local(${fontFamily}), ${src}`,
  };
  for (let a of args) {
    const a2 = FACE[a.name]?.(a) ?? FACE[a.text];
    if (a2) Object.assign(res, a2);
    throw new SyntaxError(`Unrecognized font face argument: ${a}`);
  }
  return { [`@font-face /*${res.fontFamily} ${res.fontStyle}*/`]: res };
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

  // variant: ({ args }) => ({ fontVariant: isBasic(args[0]).text }),
  variant: SINmax(5, Word,(n, v) => ({ fontVariant: v })), //todo: more specific parsing?
  width: SIN(Percent,(n,v) => ({ fontWidth: v })),
  spacing: ({ args }) => (args[0].text == "normal" ? args[0].text : { letterSpacing: isLength(args[0]).text }),
  adjust: ({ args }) => ({ fontSizeAdjust: isBasic(args[0]).text }),
};

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
    else if (a.name == "face" && (a2 = face(a, fontFaceName))) {
      Object.assign(res, a2);
      family.push(Object.values(a2)[0].fontFamily);
    } else if (a2 = isNumber(a)?.num) {
      if (a2 && 1 <= a2 && a2 <= 1000)
        res.fontWeight = a2;
      else if (0 < a2 && a2 < 1)
        res.fontSizeAdjust = a2;
      else
        throw new SyntaxError(`Unrecognized $font number (0.01-0.99 ): ${a2}`);
    } else
      throw new SyntaxError(`Unrecognized $font argument: ${a}`);
  }
  if (emoji)
    family.push(...emoji);
  if (family.length)
    res.fontFamily = family.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
  return res;
}

//100%lob
//$font("company orange",grotesque)
//  <h1 $bold>
//  <div $italic ...>
//    <p   
//    <p $font>  //resets to last known font

//lob -1, but with 4 token exact reference for portal. $type(name
//$typeface(flow,"company orange",grotesque,condensed,italic,-10deg,uppercase,spacing(-3),700)
//$typeface(flow)
//   $bold
//      $type

//$type(name,...args) => creates a type with the given name and properties.
//$type(name) => uses a type and sets the font properties to the type's properties.

// Font defaults for umbrella
const fontDefaults = Object.fromEntries(
  Object.entries({
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
  }).map(([k]) => [k, "unset"])
);

const fontWithName = FIRST(
  NameUnset,    
  fontImpl,     
  (nameNode, nameText, fontProps) => {
    if (nameText === "unset") {
      if (!fontProps?.fontFamily) {
        throw new SyntaxError(`$Font(_, ...) requires at least one font family after underscore`);
      }
      return fontProps;
    }
    if (fontProps?.fontFamily) {
      throw new SyntaxError(`$Font(${nameText}, ...) cannot contain font families. Found font-family in arguments. Use $Font(_, fontFamily, ...) instead.`);
    }
    const res = {};
    for (let [k, varKey] of FONT_DEFAULTS) {
      res[k] = fontProps?.[k] ?? `var(--${nameText + varKey}, unset)`;
    }
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

// function makeSingleDroplet(NAME, FUNC) {
//   return function ({ args }) {
//     if (args.length != 1)
//       throw new SyntaxError(`$${NAME} droplet only accepts one argument, but got ${args.length}: ${args.map(a => a.text).join(", ")}`);
//     const a = args[0];
//     const v = a.text == "unset" ? `var(--${NAME}, unset)` : FUNC(a)?.text;
//     if (v == null)
//       throw new SyntaxError(`Could not interpret $${NAME} argument: ${args[0].text}.`);
//     return { [NAME]: v };
//   }
// }

export default {
  font: fontImpl,
  Font: Umbrella(fontDefaults, fontWithName),
  
  Typeface,

  // fontSize: makeSingleDroplet("fontSize", isLength),
  // // fontFamily: makeSingleDroplet("fontFamily", isBasic), //todo this should not be possible.
  // // fontStyle: makeSingleDroplet("fontStyle", isBasic),
  // // fontWeight: makeSingleDroplet("fontWeight", isBasic),
  // // fontVariantCaps: makeSingleDroplet("fontVariantCaps", isBasic),
  // fontWidth: makeSingleDroplet("fontWidth", isBasic),     //todo we need to make them return both props.
  // fontStretch: makeSingleDroplet("fontStretch", isBasic), //todo we need to make them return both props.
  // fontSynthesis: makeSingleDroplet("fontSynthesis", isBasic),
  // fontSizeAdjust: makeSingleDroplet("fontSizeAdjust", isBasic),
  // letterSpacing: makeSingleDroplet("letterSpacing", isBasic),


  // //global font words
  // ...SYNTHESIS_WORDS,
  // uppercase: { textTransform: "uppercase" },
  // lowercase: { textTransform: "lowercase" },
  // capitalize: { textTransform: "capitalize" },
  // fullWidth: { textTransform: "full-width" },
  // noTextTransform: { textTransform: "none" },
  // textTransform: undefined,

  // italic: { fontStyle: "italic" },
  // noStyle: { fontStyle: "normal" },
  // bold: { fontWeight: "bold" },
  // bolder: { fontWeight: "bolder" },
  // lighter: { fontWeight: "lighter" },
  // noWeight: { fontWeight: "normal" },
  // normal: { fontStyle: "normal", fontWeight: "normal" },
  // larger: { fontSize: "larger" },
  // smaller: { fontSize: "smaller" },
  // smallCaps: { fontVariantCaps: "small-caps" },
  // allSmallCaps: { fontVariantCaps: "all-small-caps" },
  // petiteCaps: { fontVariantCaps: "petite-caps" },
  // allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  // unicase: { fontVariantCaps: "unicase" },
  // titlingCaps: { fontVariantCaps: "titling-caps" },
  // condensed: { fontStretch: "condensed" },
  // expanded: { fontStretch: "expanded" },

  // semiCondensed: { fontStretch: "semi-condensed", fontWidth: "semi-condensed" },
  // semiExpanded: { fontStretch: "semi-expanded", fontWidth: "semi-expanded" },
  // extraCondensed: { fontStretch: "extra-condensed", fontWidth: "extra-condensed" },
  // extraExpanded: { fontStretch: "extra-expanded", fontWidth: "extra-expanded" },
  // ultraCondensed: { fontStretch: "ultra-condensed", fontWidth: "ultra-condensed" },
  // ultraExpanded: { fontStretch: "ultra-expanded", fontWidth: "ultra-expanded" },
  // kerning: { fontKerning: "normal" },
  // noKerning: { fontKerning: "none" },
  // shy: { hyphens: "manual" },
  // hyphens: { hyphens: "auto" },
  // noHyphens: { hyphens: "none" },
};

