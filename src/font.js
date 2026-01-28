import { extractName, Quote, Angle, Integer, Fraction, Url, extractUrl, isFraction, isInteger, isLength, Length, isAngle, isQuote, SIN, Percent, Basic, FIRST, Umbrella, Word, NameUnset, SINmax, TYPB } from "./func.js";

/**
 * Interprets a relative URL against an absolute URL or a relative URL.
 * 
 * @param {string} src 
 * @param {string} baseIsh 
 * @returns {string} an absolute url if the base was absolute, or a relative-to-the-relative url.
 */
function RelativeUrl(src, baseIsh) {
  const relative = baseIsh.match(/^[.]*\//)[0];
  if (!relative)
    return new URL(src, baseIsh).url;
  const dots = relative.slice(0, -1);
  const base = "http://n/" + relative
  return dots + new URL(src, base).pathname;
}

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

//$typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)

/**
 * TextTransform is a semi inherited css property (inherits over inline elements, but not block elements).
 * The same way as shifting font family or style, caption is a family-ish trait. Would be normal to consider part of font umbrella.
 * Most of the text properties are either layout (text-align, line-height, word-spacing, hyphenation).
 * text-decoration is standalone. text-shadow is standalone (in same space as colors).
 * ??candidate for font is hyphenation. Where we break the words, that could be more a font characteristic than a layout characteristic??
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

function fontFaceProcess(face, fontFamily) {
  return {
    ...face,
    fontFamily: fontFamily,
    src: `local(${fontFamily}), ${face.src}`
  };
}

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
      if (fontFaceName)
        a2 = fontFaceProcess(a2, fontFaceName);
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

const FontFaceShortNames = {
  family: "fontFamily",
  style: "fontStyle",
  weight: "fontWeight",
  stretch: "fontStretch",
  unicodeRange: "unicodeRange",
  variant: "fontVariant",
  featureSettings: "fontFeatureSettings",
  variationSettings: "fontVariationSettings",
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
function processFace(font) {
  if (font.startsWith("url("))
    font = font.slice(5, -1);
  if (font[0] == '"' || font[0] == "'")
    font = font.slice(1, -1);

  const url = new URL(font);
  const hash = url.hash.slice(1);
  url.hash = "";
  const sp = new URLSearchParams(hash);
  const res = {
    fontFamily: url.pathname.split("/").at(-1).split(/[.-]/)[0],
    src: [{ url: url.toString() }]
  };
  for (let [k, v] of sp.entries()) {
    k = FontFaceShortNames[k] ?? k;
    v = v.replaceAll("+", " ");
    if (k.endsWith("Settings"))
      v = '"' + v.replace(' ', '" ');
    if (k === "src")
      res.src.push({ url: v });
    else if (k === "format" || k === "tech")
      res.src.at(-1)[k] = v;
    else
      res[k] = v
  }

  res.src = res.src.map(({ url, format, tech }, i, arr) => {
    if (i) url = RelativeUrl(url, arr[0].url);
    let res = `url("${url}")`;
    if (format) res += ` format("${format}")`;
    if (tech) res += ` tech("${tech}")`;
    return res;
  }).join(",\n");
  res.src = `local("${res.fontFamily}"),\n${res.src}`;
  return res;
}

const fixFontFamily = fonts => {
  const res = [], faces = [];
  let emoji;
  for (let f of fonts) {
    if (f === "emoji")
      emoji = true;
    else if (f.match(/^["']([.]{1,2}\/|[a-z]*\:\/\/)/i)) {
      const face = processFace(f);
      res.push(face.fontFamily)
      //todo we don't need the comment at this level? we can do that outside in the caching space?
      faces.push({ [`@font-face /*${f}*/`]: face });
    } else {
      res.push(f.replaceAll("+", " "));
    }
  }
  if (emoji)
    res.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
  return { faces, fonts: res };
}

const font = TYPB(FONT_WORDS, {
  fontSize: Length,
  fontSizeAdjust: Fraction,
  fontWeight: Integer,
  Angle,
}, {
  fontFamily: t => Word(t) ?? Quote(t) ?? Url(t)
}, obj => {
  const res = {};
  for (let [k, v] of Object.entries(obj)) {
    if (k === "fontFamily") {
      const { faces, fonts } = fixFontFamily(v);
      res.fontFamily = fonts.join(", ");
      Object.assign(res, ...faces);
    } else if (k === "Angle") res.fontStyle = "oblique " + v;
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

const Typeface = FIRST(
  NameUnset,
  font,
  (nameNode, typeName, tmp = {}) => {
    //todo both of these rules are a little bit unnecessary? There are usecases for both, no?
    if (typeName === "unset")
      throw new SyntaxError(`$TypeFace must have a name first argument: "${typeName}"`);
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
)

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