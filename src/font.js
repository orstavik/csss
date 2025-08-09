import { isLength } from "./func.js";

const FONT_DEFAULTS = Object.freeze({
  fontFamily: "system-ui, sans-serif",
  fontSize: "1rem",
  fontStyle: "unset",
  fontWeight: "unset",
  fontVariantCaps: "unset",
  fontSizeAdjust: "unset",
  fontStretch: "unset",
  fontSynthesis: "unset",
  letterSpacing: "unset",
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

  condensed: { Stretch: "condensed" },
  expanded: { Stretch: "expanded" },
  semiCondensed: { Stretch: "semi-condensed" },
  semiExpanded: { Stretch: "semi-expanded" },
  extraCondensed: { Stretch: "extra-condensed" },
  extraExpanded: { Stretch: "extra-expanded" },
  ultraCondensed: { Stretch: "ultra-condensed" },
  ultraExpanded: { Stretch: "ultra-expanded" },
  noStretch: { Stretch: "normal" },

  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },

  normal: { fontStyle: "normal", fontWeight: "normal" },
  smooth: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  emoji: { fontEmoji: ", 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" },
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

function nonFontArg(a) {
  if (a instanceof Object) return a;
  if (isLength(a)) return { fontSize: a };
  const aNum = parseFloat(a);
  if (a == aNum && Number.isInteger(aNum) && aNum >= 1 && aNum <= 1000) return { fontWeight: a };
  if (aNum == a && !Number.isInteger(aNum) && aNum > 0) return { fontSizeAdjust: aNum };
  if (aNum + "deg" == a) return { fontStyle: "oblique " + a };
  const fontSynthesis = noSynthesis(a);
  if (fontSynthesis) return { fontSynthesis };
}

function fontImpl(...args) {
  if (!args.length)
    return Object.fromEntries(Object.entries(FONT_DEFAULTS).map(([k, v]) => [k, `var(--${k}, ${v})`]));
  const res = { ...FONT_DEFAULTS };
  const ff = [];
  for (let a of args) {
    const nonFont = nonFontArg(a);
    if (nonFont)
      Object.assign(res, nonFont);
    else {
      const family = typeof a == "string" && a.replaceAll(/^['"]|['"]$/g, "").replaceAll("+", " ");
      if (!family)
        throw new SyntaxError(`Unrecognized $font argument: ${a}`);
      ff.push(family);
    }
  }
  if (ff.length)
    res.fontFamily = ff.join(", ");
  if (res.fontEmoji) {
    res.fontFamily += res.fontEmoji;
    delete res.fontEmoji;
  }
  return res;
}

function font(...args) {
  return fontImpl(...args);
  //todo add all the --fontVariableName: value
}
font.scope = {
  // ...NativeCssProperties.font.scope,
  ...KEYWORDS,
  size: a => ({ fontSize: a }),
  weight: a => ({ fontWeight: a }),
  style: a => ({ fontStyle: a }),
  variant: a => ({ fontVariant: a }),
  stretch: a => ({ fontStretch: a }),
  space: a => ({ letterSpacing: a }),
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

function makeConstUse(obj, name) {
  const res = {};
  for (const [k, v] of Object.entries(obj))
    res[k] = res["--" + k] = `var(--${name + k[0].toUpperCase() + k.slice(1)}, ${v})`;
  return res;
}
function makeConstDeclaration(obj, name) {
  const res = {};
  for (const [k, v] of Object.entries(obj))
    res["--" + name + k[0].toUpperCase() + k.slice(1)] = v;
  return res;
}

function type(...args) {
  if (!args.length)
    throw new SyntaxError("The $type() function must always include a name as first argument");
  const name = args[0];
  if (!(typeof name != "string"))
    throw new SyntaxError(`The typename in $type(typename,...args) is not interpreted as a string: "${JSON.stringify(name)}"`);
  if (!name.match(/^[a-z][a-z0-9-]*$/))
    throw new SyntaxError(`The typename in $type(typename,...args) must be lowercase and match(/^[a-z][a-z0-9-]*$/): "${name}"`);

  return args.length === 1 ?
    makeConstUse(BUILTIN_TYPES[name] ?? FONT_DEFAULTS, name) :
    makeConstDeclaration(font(...args), name);
}
type.scope = { ...font.scope };

export default {
  font,
  type,

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
  transitional: { fontFamily: "Charter,'Bitstream Charter','Sitka Text',Cambria,serif" },
  oldStyle: { fontFamily: "'Iowan Old Style','Palatino Linotype','URW Palladio L',P052,serif" },
  humanist: { fontFamily: "Seravek,'Gill Sans Nova',Ubuntu,Calibri,'DejaVu Sans',source-sans-pro,sans-serif" },
  geometricHumanist: { fontFamily: "Avenir,Montserrat,Corbel,'URW Gothic',source-sans-pro,sans-serif" },
  classicalHumanist: { fontFamily: "Optima,Candara,'Noto Sans',sans-serif" },
  neoGrotesque: { fontFamily: "Inter,Roboto,'Helvetica Neue','Arial Nova','Nimbus Sans',Arial,sans-serif" },
  monospaceSlabSerif: { fontFamily: "'Nimbus Mono PS','Courier New',monospace," },
  monospaceCode: { fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,'DejaVu Sans Mono',monospace" },
  industrial: { fontFamily: "Bahnschrift,'DIN Alternate','Franklin Gothic Medium','Nimbus Sans Narrow',sans-serif-condensed,sans-serif" },
  roundedSans: { fontFamily: "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif" },
  slabSerif: { fontFamily: "Rockwell,'Rockwell Nova','Roboto Slab','DejaVu Serif','Sitka Small',serif" },
  antique: { fontFamily: "Superclarendon,'Bookman Old Style','URW Bookman','URW Bookman L','Georgia Pro',Georgia,serif" },
  didone: { fontFamily: "Didot,'Bodoni MT','Noto Serif Display','URW Palladio L',P052,Sylfaen,serif" },
  handwritten: { fontFamily: "'Segoe Print','Bradley Hand',Chilanka,TSCu_Comic,casual,cursive" },
};
