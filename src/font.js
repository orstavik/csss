import { extractName, extractUrl, interpretName, isNumber, isLength, isAngle, isQuote, isPercent, isBasic } from "./func.js";

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
  return { [`@fontFace /*${res.fontFamily} ${res.fontStyle}*/`]: res };
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

  variant: ({ args }) => ({ fontVariant: interpretBasic(args[0]) }),
  width: ({ args }) => ({ fontWidth: isPercent(args[0]) }),
  spacing: ({ args }) => (args[0].text == "normal" ? args[0].text : { letterSpacing: isLength(args[0]) }),
  adjust: ({ args }) => ({ fontSizeAdjust: interpretBasic(args[0]) }),
};

//first have a function that extracts all the nonFamily 
function fontImpl(fontFaceName, args) {
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
  if (!family.length)
    throw new SyntaxError(`No font family specified in $font: ${args}`);
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

const BUILTIN_TYPES = {
  transitional: { fontFamily: "Charter,'Bitstream Charter','Sitka Text',Cambria,serif" },
  oldStyle: { fontFamily: "'Iowan Old Style','Palatino Linotype','URW Palladio L',P052,serif" },
  humanist: { fontFamily: "Seravek,'Gill Sans Nova',Ubuntu,Calibri,'DejaVu Sans',source-sans-pro,sans-serif" },
  geometricHumanist: { fontFamily: "Avenir,Montserrat,Corbel,'URW Gothic',source-sans-pro,sans-serif" },
  classicalHumanist: { fontFamily: "Optima,Candara,'Noto Sans',sans-serif" },
  neoGrotesque: { fontFamily: "Inter,Roboto,'Helvetica Neue','Arial Nova','Nimbus Sans',Arial,sans-serif" },
  monospaceSlabSerif: { fontFamily: "'Nimbus Mono PS','Courier New',monospace,", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  monospaceCode: { fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,'DejaVu Sans Mono',monospace" },
  industrial: { fontFamily: "Bahnschrift,'DIN Alternate','Franklin Gothic Medium','Nimbus Sans Narrow',sans-serif-condensed,sans-serif" },
  roundedSans: { fontFamily: "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif" },
  slabSerif: {
    "@fontFace": { fontFamily: "Rockwell,", src: "local('Rockwell')", ascentOverride: "100%" },
    fontFamily: "Rockwell,'Rockwell Nova','Roboto Slab','DejaVu Serif','Sitka Small',serif",
  },
  antique: { fontFamily: "Superclarendon,'Bookman Old Style','URW Bookman','URW Bookman L','Georgia Pro',Georgia,serif" },
  didone: { fontFamily: "Didot,'Bodoni MT','Noto Serif Display','URW Palladio L',P052,Sylfaen,serif", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  handwritten: { fontFamily: "'Segoe Print','Bradley Hand',Chilanka,TSCu_Comic,casual,cursive" },
};

//I think that for $font() we should have either using a name, *or* using a face(). If we use a typeface, then we can't override the family.
//that just breads confusion. So, if the $font() only has a single family, then we try to use that as the typeface name. Otherwise, we consider it a face referece. 
function font({ args }) {
  const typeName = interpretName(args[0]);
  if (!typeName)
    throw new SyntaxError(`first argument is not a name: "${args[0].text}"`);
  const tmp = fontImpl(undefined, args);
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    res[k] = tmp[k] ?? `var(--${typeName + varKey}, unset)`; //clashing
  res.fontStretch = res.fontWidth;
  tmp.fontFamily.length == 1 ?
    res.fontFamily = `var(--${typeName}FontFamily, ${typeName})` : //single family means typeface reference.
    res.fontFamily = tmp.fontFamily + `, var(--${typeName}FontFamily, unset)`; //multiple families means face reference.
  return res;
}

function typeFace({ args }) {
  const typeName = extractName(args);
  if (!typeName)
    throw new SyntaxError(`first argument is not a name: "${args[0].text}"`);
  const tmp = fontImpl(typeName, args);
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    res[`--${typeName + varKey}`] = tmp[k] ?? undefined;
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}

function makeSingleDroplet(NAME, FUNC) {
  return function ({ args }) {
    if (args.length != 1)
      throw new SyntaxError(`$${NAME} droplet only accepts one argument, but got ${args.length}: ${args.map(a => a.text).join(", ")}`);
    const a = args[0];
    const v = a.text == "unset" ? `var(--${NAME}, unset)` : FUNC(a)?.text;
    if (v == null)
      throw new SyntaxError(`Could not interpret $${NAME} argument: ${args[0].text}.`);
    return { [NAME]: v };
  }
}

export default {
  font,
  typeface: typeFace,

  //droplets
  fontSize: makeSingleDroplet("fontSize", isLength),
  // fontFamily: makeSingleDroplet("fontFamily", isBasic), //todo this should not be possible.
  // fontStyle: makeSingleDroplet("fontStyle", isBasic),
  // fontWeight: makeSingleDroplet("fontWeight", isBasic),
  // fontVariantCaps: makeSingleDroplet("fontVariantCaps", isBasic),
  fontWidth: makeSingleDroplet("fontWidth", isBasic),     //todo we need to make them return both props.
  fontStretch: makeSingleDroplet("fontStretch", isBasic), //todo we need to make them return both props.
  fontSynthesis: makeSingleDroplet("fontSynthesis", isBasic),
  fontSizeAdjust: makeSingleDroplet("fontSizeAdjust", isBasic),
  letterSpacing: makeSingleDroplet("letterSpacing", isBasic),


  //global font words
  ...SYNTHESIS_WORDS,
  uppercase: { textTransform: "uppercase" },
  lowercase: { textTransform: "lowercase" },
  capitalize: { textTransform: "capitalize" },
  fullWidth: { textTransform: "full-width" },
  noTextTransform: { textTransform: "none" },
  textTransform: undefined,

  italic: { fontStyle: "italic" },
  noStyle: { fontStyle: "normal" },
  bold: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  noWeight: { fontWeight: "normal" },
  normal: { fontStyle: "normal", fontWeight: "normal" },
  larger: { fontSize: "larger" },
  smaller: { fontSize: "smaller" },
  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  condensed: { fontStretch: "condensed" },
  expanded: { fontStretch: "expanded" },

  semiCondensed: { fontStretch: "semi-condensed", fontWidth: "semi-condensed" },
  semiExpanded: { fontStretch: "semi-expanded", fontWidth: "semi-expanded" },
  extraCondensed: { fontStretch: "extra-condensed", fontWidth: "extra-condensed" },
  extraExpanded: { fontStretch: "extra-expanded", fontWidth: "extra-expanded" },
  ultraCondensed: { fontStretch: "ultra-condensed", fontWidth: "ultra-condensed" },
  ultraExpanded: { fontStretch: "ultra-expanded", fontWidth: "ultra-expanded" },
  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
  noHyphens: { hyphens: "none" },
};


const BUILTIN_TYPES2 = {
  transitional: {
    fontFamilyPlus: "Charter ~0.50 SafariOld, 'Bitstream Charter' ~0.50, 'Sitka Text' ~0.52, Cambria 0.466, serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
  },

  oldStyle: {
    fontFamilyPlus: "'Iowan Old Style' ~0.52 SafariOld, 'Palatino Linotype' ~0.47, 'URW Palladio L' ~0.47, P052 ~0.47, serif",
    fontSizeAdjust: 0.47,
    fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
  },

  humanist: {
    fontFamilyPlus: "Seravek ~0.52 SafariOld, 'Gill Sans Nova' ~0.48, Ubuntu ~0.53, Calibri 0.466, 'DejaVu Sans' ~0.53, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.53,
    fontFamily: "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  },

  geometricHumanist: {
    fontFamilyPlus: "Avenir ~0.52 SafariOld, Montserrat ~0.52, Corbel ~0.47, 'URW Gothic' ~0.48, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  },

  classicalHumanist: {
    fontFamilyPlus: "Optima ~0.48 SafariOld, Candara 0.463, 'Noto Sans' ~0.53, sans-serif",
    fontSizeAdjust: 0.48,
    fontFamily: "Optima, Candara, 'Noto Sans', sans-serif",
  },

  neoGrotesque: {
    fontFamilyPlus: "Inter ~0.55, Roboto 0.528, 'Helvetica Neue' 0.523 SafariOld, 'Arial Nova' ~0.519, 'Nimbus Sans' ~0.523, Arial 0.519, sans-serif",
    fontSizeAdjust: 0.528,
    fontFamily: "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  },

  monospaceSlabSerif: {
    fontFamilyPlus: "'Nimbus Mono PS' 0.425, 'Courier New' 0.423, monospace",
    fontSizeAdjust: 0.425,
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },

  monospaceCode: {
    fontFamilyPlus: "ui-monospace, 'Cascadia Code' ~0.54, 'Source Code Pro' ~0.53, Menlo ~0.50 SafariOld, Consolas ~0.49, 'DejaVu Sans Mono' ~0.49, monospace",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  },

  industrial: {
    fontFamilyPlus: "Bahnschrift ~0.50, 'DIN Alternate' ~0.47 SafariOld, 'Franklin Gothic Medium' ~0.52, 'Nimbus Sans Narrow' ~0.523, sans-serif-condensed, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
  },

  roundedSans: {
    fontFamilyPlus: "ui-rounded, 'Hiragino Maru Gothic ProN' ~0.50 SafariOld, Quicksand ~0.53, Comfortaa ~0.50, Manjari ~0.52, 'Arial Rounded MT' ~0.519, 'Arial Rounded MT Bold' ~0.519, Calibri 0.466, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
  },

  slabSerif: {
    fontFamilyPlus: "Rockwell ~0.46, 'Rockwell Nova' ~0.46, 'Roboto Slab' ~0.52, 'DejaVu Serif' ~0.46, 'Sitka Small' ~0.56, serif",
    fontSizeAdjust: 0.46,
    fontFamily: "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
    "@fontFace": { fontFamily: "Rockwell", src: "local('Rockwell')", ascentOverride: "100%" },
  },

  antique: {
    fontFamilyPlus: "Superclarendon ~0.47 SafariOld, 'Bookman Old Style' ~0.50, 'URW Bookman' ~0.50, 'URW Bookman L' ~0.50, 'Georgia Pro' 0.481, Georgia 0.481, serif",
  },

  didone: {
    fontFamilyPlus: "Didot ~0.42 SafariOld, 'Bodoni MT' ~0.40, 'Noto Serif Display' ~0.45, 'URW Palladio L' ~0.47, P052 ~0.47, Sylfaen ~0.46, serif",
  },

  handwritten: {
    fontFamilyPlus: "'Segoe Print' ~0.53, 'Bradley Hand' ~0.53 SafariOld, Chilanka ~0.52, TSCu_Comic ~0.50, casual, cursive",
  },
};
