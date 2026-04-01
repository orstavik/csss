import { CsssPrimitives, CsssFunctions } from "./func2.js";

const { TypeBasedFunction, FunctionWithDefaultValues, SF2, ParseFirstThenRest, SingleTable, SingleTableRaw, PropertyType, FunctionPropertyType } = CsssFunctions;
const { Length, Name, Fraction, Integer, Quote, Percent, Word, Basic, Unset, Url } = CsssPrimitives;

// Angle interpretation similar to func.js
function isAngle(a) {
  if (a?.num == 0 && a.type === "number")
    return { type: "angle", text: "0deg", unit: "deg", num: 0 };
  if (a?.type === "angle")
    return a;
}
const Angle = a => isAngle(a)?.text;

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
  fontVariant: undefined,
};

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
  res.noSynthesis = "none";
  return res;
})();

const fontSynthesisTable = SYNTHESIS_WORDS;

const textTransformTable = {
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
  fullWidth: "full-width",
  noTransform: "none",
};

const fontWeightTable = {
  bold: "bold",
  b: "bold",
  bolder: "bolder",
  lighter: "lighter",
  noWeight: "normal",
};

const fontStyleTable = {
  italic: "italic",
  ital: "italic",
  i: "italic",
  noStyle: "normal",
};

const fontVariantCapsTable = {
  smallCaps: "small-caps",
  allSmallCaps: "all-small-caps",
  petiteCaps: "petite-caps",
  allPetiteCaps: "all-petite-caps",
  unicase: "unicase",
  titlingCaps: "titling-caps",
  noVariant: "normal",
};

const fontWidthTable = {
  condensed: "condensed",
  expanded: "expanded",
  semiCondensed: "semi-condensed",
  semiExpanded: "semi-expanded",
  extraCondensed: "extra-condensed",
  extraExpanded: "extra-expanded",
  ultraCondensed: "ultra-condensed",
  ultraExpanded: "ultra-expanded",
  noStretch: "normal",
};

const fontKerningTable = {
  kerning: "normal",
  noKerning: "none",
};

const hyphensTable = {
  hyphens: "auto",
  shy: "manual",
  noHyphens: "none",
};

const fontSizeTable = {
  larger: "larger",
  smaller: "smaller",
  xxs: "xx-small",
  xs: "x-small",
  sm: "small",
  md: "medium",
  lg: "large",
  xl: "x-large",
  xxl: "xx-large",
  xxxl: "xxx-large",
};

const mixedTable = {
  normal: { fontStyle: "normal", fontWeight: "normal" },
  smooth: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" }, //todo this is wrong? should be "antialiased" for WebkitFontSmoothing and "grayscale" for MozOsxFontSmoothing??
};


const AbsoluteUrl = a => {
  if (a.kind === "QUOTE" && a.text.match(/^["'\`](https?|data):/i))
    return new URL(a.text.slice(1, -1));
  else if (a.name === "url" && a.args.length === 1 && (a = a.args[0].text))
    if (a.match(/^["'\`](https?|data):/i))
      try { return new URL(a.slice(1, -1)); } catch (e) { }
};

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

const fontInner = TypeBasedFunction(
  SingleTable("fontSynthesis", fontSynthesisTable),
  SingleTable("textTransform", textTransformTable),
  SingleTable("fontWeight", fontWeightTable),
  SingleTable("fontStyle", fontStyleTable),
  SingleTable("fontVariantCaps", fontVariantCapsTable),
  SingleTable("fontWidth", fontWidthTable),
  SingleTable("fontKerning", fontKerningTable),
  SingleTable("hyphens", hyphensTable),
  SingleTable("fontSize", fontSizeTable),

  (a) => {
    if (a.kind === "WORD" && mixedTable[a.text]) return mixedTable[a.text];
  },

  a => {
    if (a.name === "variant") return { fontVariant: a.args.map(x => x.text).join(" ") };
  },
  FunctionPropertyType("width", "fontWidth", Percent),
  FunctionPropertyType("spacing", "letterSpacing", Length),
  FunctionPropertyType("adjust", "fontSizeAdjust", a => Basic(a) || Fraction(a)),

  PropertyType("fontSize", Length),
  PropertyType("fontSizeAdjust", Fraction),
  PropertyType("fontWeight", Integer),
  PropertyType("fontStyle", a => {
    const angle = Angle(a);
    if (angle) return "oblique " + angle;
  }),

  a => {
    let fontFamily = FontFaceUrl(a) ?? (a.kind === "WORD" ? a.text : undefined) ?? Quote(a);
    if (fontFamily) {
        return { fontFamily: [fontFamily] };
    }
  }
);

const font = (arg) => {
    const res = fontInner(arg);
    const finalRes = {};
    for (let [k, v] of Object.entries(res)) {
        if (k === "fontFamily") {
            let families = v;
            if (families.includes("emoji")) {
              families.push("Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
              families = families.filter(f => f !== "emoji");
            }
            finalRes.fontFamily = families
              .map(f => f.fontFamily ?? f)
              .map(f => typeof f === "string" ? f.replaceAll("+", " ") : f)
              .join(", ");
            for (let face of families.filter(f => f instanceof Object))
              finalRes["@font-face " + face.src.split("\n")[0]] = face;
        } else if (v instanceof Object) {
            Object.assign(finalRes, v);
        } else {
            finalRes[k] = v;
        }
    }
    return finalRes;
};


const NameUnset = a => Name(a) ?? Unset(a);

const Font = ParseFirstThenRest(NameUnset, font, (typeface, res = {}) => {
  if (typeface !== "unset")
    for (let k in PROPS)
      if (!(k in res))
        res[k] = `var(--${typeface + k[0].toUpperCase() + k.slice(1)}, unset)`;
  return res;
}
);

const Typeface = ParseFirstThenRest(Name, font, (typeface, tmp = {}) => {
  const res = {};
  for (let k in PROPS)
    if (tmp[k] !== undefined)
      res[`--${typeface + k[0].toUpperCase() + k.slice(1)}`] = tmp[k];
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}
)

const DEFAULTS = Object.fromEntries(Object.keys(PROPS).map(k => [k, "unset"]));

export default {
  csss: {
    font,
    Font: FunctionWithDefaultValues(DEFAULTS, Font),
    Typeface,
  },
  props: {
    ...PROPS,
  },
  css: {}
};