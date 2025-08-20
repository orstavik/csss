import { isLength } from "./func.js";

const FONT_DEFAULTS = Object.entries({
  fontFamily: "FontFamily",
  fontSize: "FontSize",
  fontStyle: "FontStyle",
  fontWeight: "FontWeight",
  fontSizeAdjust: "FontSizeAdjust",
  letterSpacing: "LetterSpacing",
  fontStretch: "FontStretch",
  fontVariantCaps: "FontVariantCaps",
  fontSynthesis: "FontSynthesis",
  fontFeatureSettings: "FontFeatureSettings",
  fontVariationSettings: "FontVariationSettings",
  WebkitFontSmoothing: "WebkitFontSmoothing",
  MozOsxFontSmoothing: "MozOsxFontSmoothing",
  fontKerning: "FontKerning",
});

const KEYWORDS = {
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

  condensed: { fontStretch: "condensed" },
  expanded: { fontStretch: "expanded" },
  semiCondensed: { fontStretch: "semi-condensed" },
  semiExpanded: { fontStretch: "semi-expanded" },
  extraCondensed: { fontStretch: "extra-condensed" },
  extraExpanded: { fontStretch: "extra-expanded" },
  ultraCondensed: { fontStretch: "ultra-condensed" },
  ultraExpanded: { fontStretch: "ultra-expanded" },
  noStretch: { fontStretch: "normal" },

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
};

function noSynthesis(a) {
  const args = a.match(/^no((Weight|Style|SmallCaps|Position)*)Synthesis$/)?.[1];
  if (args == null) return;
  if (!args) return "none";
  return ["Style", "Weight", "SmallCaps", "Position"]
    .filter(a => args.includes(a))
    .join(" ")
    .replace("Caps", "-caps")
    .toLowerCase();
}

function fontNumbers(a) {
  const aNum = parseFloat(a);
  if (a == aNum && Number.isInteger(aNum) && 1 <= aNum && aNum <= 1000)
    return { fontWeight: a };
  if (aNum == a && !Number.isInteger(aNum) && 1 > aNum && aNum > 0)
    return { fontSizeAdjust: aNum };
  if (aNum + "deg" == a)
    return { fontStyle: "oblique " + a };
}

//first have a function that extracts all the nonFamily 
function fontImpl(fontFaceName, ...args) {
  const res = {};
  let family = [];
  let b, emoji, faces = [];
  for (let a of args) {
    if (a == undefined)
      throw new SyntaxError(`Empty arguments in $font: ${a}`);
    else if (faces.length && a.face)
      faces.push(a.face);
    else if (a.face)
      family.push(fontFaceName ??= a.face.src), faces.push(a.face);
    else if (a instanceof Object)
      Object.assign(res, a);
    else if (isLength(a))
      res.fontSize = a;
    else if (b = noSynthesis(a))
      res.fontSynthesis = b;
    else if (b = fontNumbers(a))
      Object.assign(res, b);
    else if (a == "emoji")
      emoji = ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'];
    else if (typeof a == "string")
      family.push(a.replaceAll(/^['"]|['"]$/g, "").replaceAll("+", " "));
    else
      throw new SyntaxError(`Unrecognized $font argument: ${a}`);
  }
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    res[`@fontFace /*${fontFaceName} ${face.fontStyle}*/`] = {
      fontFamily: fontFaceName,
      ...face,
      src: `local('${fontFaceName}'), url(${face.src})`,
    };
  }
  if (emoji)
    family.push(...emoji);
  if (!family.length)
    throw new SyntaxError(`No font family specified in $font: ${args}`);
  res.fontFamily = family.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
  return res;
}

function face(src, ...args) {
  args = args.map(a => {
    if (a instanceof Object)
      return a;
    if (a === "i" || a === "italic" || a === "ital")
      return { fontStyle: "italic" };
    throw new SyntaxError(`Unrecognized font face argument: ${a}`);
  });
  return { face: { src: src.slice(1, -1), fontStyle: "normal", ...args } };
}
face.feature = (...args) => args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");
face.variation = (...args) => args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");


function font(...args) {
  if (typeof args[0] != "string")
    throw new SyntaxError(`The first argument of $font must be a string type name, but got: ${JSON.stringify(args[0])}`);
  const typeName = args[0].replaceAll(/[^a-z0-9-]/g, "_").replaceAll(/-[a-z]/g, m => m[1].toUpperCase());
  const tmp = fontImpl(undefined, ...args);
  const vars = {}, res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    vars["--font" + varKey] = (res[k] = tmp[k] ?? `var(--${typeName + varKey}, unset)`);
  return { ...res, ...vars };
}
font.scope = {
  // ...NativeCssProperties.font.scope,
  ...KEYWORDS,
  face,

  size: a => ({ fontSize: a }),
  weight: a => ({ fontWeight: a }),
  style: a => ({ fontStyle: a }),
  variant: a => ({ fontVariant: a }),
  stretch: a => ({ fontStretch: a }),
  spacing: a => ({ letterSpacing: a }),
  adjust: a => ({ fontSizeAdjust: a }),
};


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

function type(name, ...args) {
  // if (typeof name != "string")
  //   throw new SyntaxError(`The typename in $type(typename,...args) is not interpreted as a string: "${JSON.stringify(name)}"`);
  // if (!name.match(/^[a-z][a-z0-9-]*$/))
  //   throw new SyntaxError(`The typename in $type(typename,...args) must be lowercase and match(/^[a-z][a-z0-9-]*$/): "${name}"`);
  if (!name || typeof name != "string")
    throw new SyntaxError("The $typeface(name) function must always include a string name as first argument.");
  const tmp = fontImpl(name, ...args);
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    res[`--${name + varKey}`] = tmp[k] ?? "unset";
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}
type.scope = { ...font.scope };

export default {
  font,
  typeface: type,

  //droplets
  fontFamily: a => ({ [p]: a == "unset" ? `var(--fontFamily, unset)` : a }),
  fontStyle: a => ({ [p]: a == "unset" ? `var(--fontStyle, unset)` : a }),
  fontWeight: a => ({ [p]: a == "unset" ? `var(--fontWeight, unset)` : a }),
  fontVariantCaps: a => ({ [p]: a == "unset" ? `var(--fontVariantCaps, unset)` : a }),
  fontStretch: a => ({ [p]: a == "unset" ? `var(--fontStretch, unset)` : a }),
  fontSynthesis: a => ({ [p]: a == "unset" ? `var(--fontSynthesis, unset)` : a }),
  fontSizeAdjust: a => ({ [p]: a == "unset" ? `var(--fontSizeAdjust, unset)` : a }),
  letterSpacing: a => ({ [p]: a == "unset" ? `var(--letterSpacing, unset)` : a }),

  //global font words
  bold: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  italic: { fontStyle: "italic" },
  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  condensed: { Stretch: "condensed" },
  expanded: { Stretch: "expanded" },
  semiCondensed: { Stretch: "semi-condensed" },
  semiExpanded: { Stretch: "semi-expanded" },
  extraCondensed: { Stretch: "extra-condensed" },
  extraExpanded: { Stretch: "extra-expanded" },
  ultraCondensed: { Stretch: "ultra-condensed" },
  ultraExpanded: { Stretch: "ultra-expanded" },
  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },
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
