import { isLength } from "./func.js";

const FONT_RESET = {
  fontFamily: `var(--fontFamily, unset)`,
  fontSize: `var(--fontSize, 1rem)`,
  fontStyle: `var(--fontStyle, unset)`,
  fontWeight: `var(--fontWeight, unset)`,
  fontVariantCaps: `var(--fontVariantCaps, unset)`,
  fontStretch: `var(--fontStretch, unset)`,
  fontSynthesis: `var(--fontSynthesis, unset)`,
  fontSizeAdjust: `var(--fontSizeAdjust, unset)`,
  letterSpacing: `var(--letterSpacing, unset)`,
};

const FONT_DEFAULTS = {
  fontFamily: "unset",
  fontSize: "1rem",
  fontStyle: "unset",
  fontWeight: "unset",
  fontVariantCaps: "unset",
  fontSizeAdjust: "unset",
  fontStretch: "unset",
  fontSynthesis: "unset",
  letterSpacing: "unset",
};

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
};

function noSynthesis(a) {
  const args = a.match(/^no((Weight|Style|SmallCaps|Position)*)Synthesis$/)?.[1];
  if (args == null) return;
  if (!args) return "none";
  return ["Style", "Weight", "SmallCaps", "Position"]
    .filter(a => args.includes(a))
    .join(" ")
    .replace("Caps", "-caps").toLowerCase();
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

function font(...args) {
  if (!args.length) return { ...FONT_RESET };
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
  return res;
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
function type(...args) {
  if (!args.length) throw new SyntaxError("The $type() function must always include a name as first argument");

  const name = args[0];
  if (!(typeof name != "string"))
    throw new SyntaxError(`The typename in $type(typename,...args) is not interpreted as a string: "${JSON.stringify(name)}"`);
  if (!name.match(/^[a-z][a-z0-9-]*$/))
    throw new SyntaxError(`The typename in $type(typename,...args) must be lowercase and match(/^[a-z][a-z0-9-]*$/): "${name}"`);
  if (args.length === 1)
    return {
      fontFamily: `var(--${name}FontFamily, unset)`,
      fontStyle: `var(--${name}FontStyle, unset)`,
      fontWeight: `var(--${name}FontWeight, unset)`,
      fontVariantCaps: `var(--${name}FontVariantCaps, unset)`,
      fontStretch: `var(--${name}FontStretch, unset)`,
      letterSpacing: `var(--${name}LetterSpacing, unset)`,
      fontSynthesis: `var(--${name}FontSynthesis, unset)`,
      "--fontFamily": `var(--${name}FontFamily, unset)`,
      "--fontStyle": `var(--${name}FontStyle, unset)`,
      "--fontWeight": `var(--${name}FontWeight, unset)`,
      "--fontVariantCaps": `var(--${name}FontVariantCaps, unset)`,
      "--fontStretch": `var(--${name}FontStretch, unset)`,
      "--letterSpacing": `var(--${name}LetterSpacing, unset)`,
      "--fontSynthesis": `var(--${name}FontSynthesis, unset)`,
    };
  const fs = font(...args.slice(1)); //do we want to rename the font here to type?
  const res = {};
  for (const k in fs)
    if (!k.startsWith("--"))
      res["--" + name + k[0].toUpperCase() + k.slice(1)] = fs[k];
  return res;
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