import { CsssPrimitives, CsssFunctions, BadArgument } from "./func.js";
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
// Hotfix for test framework crashing on @font-face rules
// Safely injects a blank selector for CSSFontFaceRules so extractCsssFromSelector doesn't throw.
// if (typeof CSSFontFaceRule !== "undefined" && !Object.getOwnPropertyDescriptor(CSSFontFaceRule.prototype, "selectorText")) {
//   Object.defineProperty(CSSFontFaceRule.prototype, "selectorText", { get: () => "", configurable: true });
// }
function extractFontArgs(style) {
  let args = [];
  // Strict filter to ensure CSS variables are NEVER passed back into CSSS shorthand arguments
  const isVar = (v) => v && v.includes("var(");
  const kebabToCamel = (str) => str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  if (style.fontFamily && style.fontFamily !== "unset" && !isVar(style.fontFamily)) {
    args.push(...style.fontFamily.split(',').map(f => {
      f = f.trim();
      // Restore quotes and replace spaces with + for multi-word fonts
      if (f.startsWith('"') && f.endsWith('"')) return `'${f.slice(1, -1).replace(/\s+/g, '+')}'`;
      if (f.startsWith("'") && f.endsWith("'")) return `'${f.slice(1, -1).replace(/\s+/g, '+')}'`;
      // If unquoted but has spaces, assume it needs quotes to parse correctly
      if (f.includes(' ')) return `'${f.replace(/\s+/g, '+')}'`;
      return f.replace(/\s+/g, '+');
    }));
  }

  if (style.fontSize && style.fontSize !== "unset" && !isVar(style.fontSize)) {
    // Map keywords like 'x-large' to 'xLarge'
    if (/^[a-z-]+$/.test(style.fontSize)) args.push(kebabToCamel(style.fontSize));
    else args.push(style.fontSize);
  }
  
  if (style.fontStyle && style.fontStyle !== "unset" && !isVar(style.fontStyle)) {
    if (style.fontStyle === "normal") args.push("styleNormal");
    else if (style.fontStyle.startsWith("oblique ")) args.push(style.fontStyle.replace("oblique ", ""));
    else args.push(kebabToCamel(style.fontStyle));
  }
  
  if (style.fontWeight && style.fontWeight !== "unset" && !isVar(style.fontWeight)) {
    if (style.fontWeight === "normal") args.push("weightNormal");
    else args.push(kebabToCamel(style.fontWeight));
  }
  
  if (style.fontSizeAdjust && style.fontSizeAdjust !== "unset" && !isVar(style.fontSizeAdjust)) {
    args.push(`adjust(${style.fontSizeAdjust.split(/\s+/).map(kebabToCamel).join(",")})`);
  }
  
  if (style.letterSpacing && style.letterSpacing !== "unset" && !isVar(style.letterSpacing)) {
    args.push(`spacing(${style.letterSpacing})`);
  }
  
  if (style.textTransform && style.textTransform !== "unset" && !isVar(style.textTransform)) {
    if (style.textTransform === "none") args.push("transformNone");
    else args.push(kebabToCamel(style.textTransform));
  }
  
  if (style.fontStretch && style.fontStretch !== "unset" && !isVar(style.fontStretch)) {
    if (style.fontStretch.includes("%")) args.push(`width(${style.fontStretch})`);
    else args.push(kebabToCamel(style.fontStretch));
  }
  
  if (style.fontVariant && style.fontVariant !== "unset" && !isVar(style.fontVariant)) {
    args.push(`variant(${style.fontVariant.split(/\s+/).map(kebabToCamel).join(",")})`);
  }
  
  // Browsers often expand variant to specific caps rules
  if (style.fontVariantCaps && style.fontVariantCaps !== "unset" && !isVar(style.fontVariantCaps)) {
    args.push(`variant(${style.fontVariantCaps.split(/\s+/).map(kebabToCamel).join(",")})`);
  }
  
  if (style.fontSynthesis && style.fontSynthesis !== "unset" && !isVar(style.fontSynthesis)) {
    args.push(`synthesis(${style.fontSynthesis.split(/\s+/).map(kebabToCamel).join(",")})`);
  }
  
  if (style.fontKerning && style.fontKerning !== "unset" && !isVar(style.fontKerning)) {
    args.push(`kerning(${kebabToCamel(style.fontKerning)})`);
  }

  return args;
}

export default {
  props,
  csss: {
    font,
    Font,
    Typeface,
  },
  css: {
    font: style => {
      // $font shouldn't be generating variables for its family. Give priority to $Font
      if (style.fontFamily && style.fontFamily.startsWith("var(--")) return undefined;
      
      const args = extractFontArgs(style);
      return args.length ? `$font(${args.join(",")})` : undefined;
    },
    
    Font: style => {
      let typeface = null;
      
      if (style.fontFamily && style.fontFamily.startsWith("var(--")) {
        const match = style.fontFamily.match(/^var\(--([a-zA-Z0-9_]+)FontFamily/);
        if (match) typeface = match[1];
      } 
      // If it doesn't have a var() family, but explicitly resets other properties to unset, 
      // it's the $Font(_) reset wrapper.
      else if (style.fontFeatureSettings === "unset" || style.fontStretch === "unset") {
        typeface = "_";
      }

      if (!typeface) return undefined;

      // Extract remaining concrete properties mapped as overrides (ignoring the unset ones)
      const args = [typeface, ...extractFontArgs(style)]; 
      return `$Font(${args.join(",")})`;
    },
    
    Typeface: style => {
      let typefaceName = null;
      let cssVarPrefix = null;

      // Reconstruct typeface name handling mdTester.js camelCasing artifact
      for (let k in style) {
        // Checking precisely for "FontFamily" (capital F) filters out regular "fontFamily"
        if (k.endsWith('FontFamily')) {
          let prefix = k.slice(0, -10); // Extract e.g. "-SystemUI" or "--FinePrint"
          if (prefix.startsWith('--')) {
            // Original variable was uppercase. (e.g., --FinePrint)
            typefaceName = prefix.slice(2);
            cssVarPrefix = prefix;
            break;
          } else if (prefix.startsWith('-')) {
            // Original variable was lowercase, tester capitalized it. (e.g., -SystemUI)
            typefaceName = prefix.charAt(1).toLowerCase() + prefix.slice(2);
            cssVarPrefix = prefix;
            break;
          }
        }
      }
      
      if (!typefaceName) return undefined;

      // Reconstruct a pseudo-style object using the found prefix to pass into standard extraction
      const pseudoStyle = {};
      for (let k in props) {
        let objKey = cssVarPrefix + k.charAt(0).toUpperCase() + k.slice(1);
        if (style[objKey]) pseudoStyle[k] = style[objKey];
      }

      const args = [typefaceName, ...extractFontArgs(pseudoStyle)];
      return `$Typeface(${args.join(",")})`;
    }
  }
};
