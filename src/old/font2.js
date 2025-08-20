import { isLength, default as NativeCssProperties } from "./func.js";

const FONT_RESET = {
  fontFamily: `var(--fontFamily, unset)`,
  fontStyle: `var(--fontStyle, unset)`,
  fontWeight: `var(--fontWeight, unset)`,
  fontVariantCaps: `var(--fontVariantCaps, unset)`,
  fontStretch: `var(--fontStretch, unset)`,
  textTransform: `var(--textTransform, unset)`,
  letterSpacing: `var(--letterSpacing, unset)`,
  fontSynthesis: `var(--fontSynthesis, unset)`,
};

//$type(name,...args) => creates a type with the given name and properties.
//$type(name) => uses a type and sets the font properties to the type's properties.
//$type => resets all font properties to the previous $font/$type
function type(...args) {
  if (!args.length) return FONT_RESET;

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
      textTransform: `var(--${name}TextTransform, unset)`,
      letterSpacing: `var(--${name}LetterSpacing, unset)`,
      fontSynthesis: `var(--${name}FontSynthesis, unset)`,
      "--fontFamily": `var(--${name}FontFamily, unset)`,
      "--fontStyle": `var(--${name}FontStyle, unset)`,
      "--fontWeight": `var(--${name}FontWeight, unset)`,
      "--fontVariantCaps": `var(--${name}FontVariantCaps, unset)`,
      "--fontStretch": `var(--${name}FontStretch, unset)`,
      "--textTransform": `var(--${name}TextTransform, unset)`,
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

function noSynthesis(...args) {
  if (!args.length) return { fontSynthesis: "none" };
  const res = ["style", "weight", "small-caps", "position"];
  for (let a of args) {
    if (a === "smallCaps") a = "small-caps";
    if (res.includes(a)) res.splice(res.indexOf(a), 1);
    else throw new SyntaxError(`Unknown font synthesis property: ${a}`);
  }
  return { fontSynthesis: res.join(" ") };
}
function isFontFamily(a) {
  return (a instanceof Object && Object.keys(a).length == 1) ? a.fontFamily :
    (a[0] === "'" || a[0] === '"') ? a.replaceAll("+", " ") : //todo see if i can extract content out of quotes here?
      a.startsWith("url(") ? a :
        undefined;
}

//$font("Arial+Black",sansSerif,uiSansSerif,serif,bold,smallCaps,ultraCondensed,capitalize,oblique(-10deg))
//$font("Arial+Black",sansSerif,uiSansSerif,900,smallCaps,ultraCondensed,capitalize,oblique(10deg))
//if first argument is a --type-variable, it is considered a typeface name.$font(--type-common,...)
function font(...args) {
  const res = {
    fontFamily: "unset",
    fontStyle: "unset",
    fontWeight: "unset",
    fontVariantCaps: "unset",
    fontStretch: "unset",
    textTransform: "unset",
    letterSpacing: "unset",
    fontSynthesis: "unset",
  };
  //1. extract all font family arguments
  const ff = [];
  for (let family; family = isFontFamily(args[0]); args.shift())
    ff.push(family);
  if (ff.length)
    res.fontFamily = ff.join(", ");
  //2. arguments is free sequence
  for (let a of args) {
    if (a instanceof Object) Object.assign(res, a);
    if (a.match(/^[1-9]00$/)) res.fontWeight = a;
    if (isLength(a)) res.fontSize = a;
    throw `Unrecognized font property: ${a}`;
  }
  return res;
}
font.scope = {
  ...NativeCssProperties.font.scope,
  size: a => ({ fontSize: a }),
  weight: a => ({ fontWeight: a }),
  style: a => ({ fontStyle: a }),
  variant: a => ({ fontVariant: a }),
  stretch: a => ({ fontStretch: a }),
  transform: a => ({ textTransform: a }),
  spacing: a => ({ letterSpacing: a }),
  noSynthesis,
}

//adding words

const WORDS = {
  font: {
    Family: {
      serif: "serif",
      monospace: "monospace",
      cursive: "cursive",
      fantasy: "fantasy",
      emoji: "emoji",
      math: "math",
      fangsong: "fangsong",
      ui: "ui",

      //Pascal no translate
      Arial: "Arial",
      Calibri: "Calibri",
      Cambria: "Cambria",
      Candara: "Candara",
      Consolas: "Consolas",
      Constantia: "Constantia",
      Corbel: "Corbel",
      Georgia: "Georgia",
      Impact: "Impact",
      Tahoma: "Tahoma",
      Verdana: "Verdana",
      Garamond: "Garamond",
      Helvetica: "Helvetica",
      Geneva: "Geneva",
      Didot: "Didot",
      Optima: "Optima",
      Futura: "Futura",
      Baskerville: "Baskerville",
      Copperplate: "Copperplate",
      Menlo: "Menlo",
      Monaco: "Monaco",
      Chalkboard: "Chalkboard",
      Wingdings: "Wingdings",
      Webdings: "Webdings",
      Symbol: "Symbol",
      BlinkMacSystemFont: "BlinkMacSystemFont",
      Roboto: "Roboto",

      //Pascal add spaces
      ArialBlack: "Arial Black",
      AndaleMono: "Andale Mono",
      PalatinoTimes: "Palatino Times",
      DejaVuSans: "DejaVu Sans",
      DejaVuSerif: "DejaVu Serif",
      DejaVuSansMono: "DejaVu Sans Mono",
      LiberationSans: "Liberation Sans",
      LiberationSerif: "Liberation Serif",
      LiberationMono: "Liberation Mono",
      NimbusRomanNo9L: "Nimbus Roman No9 L",
      NimbusSansL: "Nimbus Sans L",
      NimbusMonoL: "Nimbus Mono L",
      CenturySchoolbookL: "Century Schoolbook L",
      URWChanceryL: "URW Chancery L",
      URWGothicL: "URW Gothic L",
      URWBookmanL: "URW Bookman L",
      ComicSansMS: "Comic Sans MS",
      AppleChancery: "Apple Chancery",
      MarkerFelt: "Marker Felt",
      LucidaConsole: "Lucida Console",
      LucidaSansUnicode: "Lucida Sans Unicode",
      PalatinoLinotype: "Palatino Linotype",
      SegoeUI: "Segoe UI",
      TimesNewRoman: "Times New Roman",
      TrebuchetMS: "Trebuchet MS",
      LucidaGrande: "Lucida Grande",
      HoeflerText: "Hoefler Text",
      AmericanTypewriter: "American Typewriter",
      GillSans: "Gill Sans",
      BookAntiqua: "Book Antiqua",
      CenturyGothic: "Century Gothic",
      FranklinGothicMedium: "Franklin Gothic Medium",
      BookmanOldStyle: "Bookman Old Style",
      BrushScriptMT: "Brush Script MT",
      HelveticaNeue: "Helvetica Neue",
      CourierMonaco: "Courier Monaco",

      //Pascal to kebab
      uiSerif: "ui-serif",
      uiSansSerif: "ui-sans-serif",
      uiMonospace: "ui-monospace",
      uiRounded: "ui-rounded",
      uiEmoji: "ui-emoji",
      uiFangsong: "ui-fangsong",
      sansSerif: "sans-serif",
      systemUi: "system-ui",
      AppleSystem: "-apple-system",

      //added
      CourierNew: "Courier New",
      Palatino: "Palatino",
      // Palatino: "Palatino Linotype",
      Bookman: "Bookman",
      GoudyOldStyle: "Goudy Old Style",
      AvantGarde: "Avant Garde",
      ArialNarrow: "Arial Narrow",
      ArialRoundedMTB: "Arial Rounded MT Bold",
      MSSansSerif: "MS Sans Serif",
      Ubuntu: "Ubuntu",
      Cantarell: "Cantarell",
      DroidSans: "Droid Sans",
      DroidSerif: "Droid Serif",
      DroidSansMono: "Droid Sans Mono",

      //KNOWN BAD FONTS
      Comic: "Comic Sans MS",
      Times: "Times New Roman",
      Courier: "Courier New",
      Lucida: "Lucida Sans Unicode",
    },
    Weight: {
      bold: "bold",
      normal: "normal",
      bolder: "bolder",
      lighter: "lighter",
    },
    Style: {
      italic: "italic",
      oblique: "oblique",
    },
    Variants: {
      smallCaps: "small-caps",
      allSmallCaps: "all-small-caps",
      petiteCaps: "petite-caps",
      allPetiteCaps: "all-petite-caps",
      unicase: "unicase",
      titlingCaps: "titling-caps",

      titling: "titling-caps",
      small: "small-caps",
      allSmall: "all-small-caps",
      petite: "petite-caps",
      allPetite: "all-petite-caps",
    },

    //add some more

    Synthesis: {
      noSynthesis: "none",
      //   noSynthesisPosition: "smallCaps",
      //   weight: "weight",
      //   position: "position",
    },
    Stretch: {
      ultraCondensed: "ultra-condensed",
      extraCondensed: "extra-condensed",
      condensed: "condensed",
      semiCondensed: "semi-condensed",
      semiExpanded: "semi-expanded",
      expanded: "expanded",
      extraExpanded: "extra-expanded",
      ultraExpanded: "ultra-expanded",
    }
    //  stretch(.) => { fontStretch: "normal" },
    //  style(.)=> { fontStyle: "unset" },
    //  variant(.) => { fontVariant: "unset" },
    //  transform(.) => { textTransform: "unset" },
    //  letterSpacing(.) => { letterSpacing: "unset" },
  },
  text: {
    Transform: {
      capitalize: "capitalize",
      uppercase: "uppercase",
      lowercase: "lowercase",
      fullWidth: "full-width",
      fullSizeKana: "full-size-kana",
      mathAuto: "math-auto",
      math: "math-auto",
      kana: "full-size-kana",
      upper: "uppercase",
      lower: "lowercase",
    }
  }
};
function* fontWords() {
  for (let [main, one] of Object.entries(WORDS))
    for (let [prop, two] of Object.entries(one))
      for (let [short, value] of Object.entries(two))
        yield { prop: main + prop, short, value };
}
//0. adding all fonts under small first letter too. Ie. [Arial] => [Arial,arial], [Times] => [times,Times].
for (let short in WORDS.font.Family)
  WORDS.font.Family[short[0].toLowerCase() + short.slice(1)] = WORDS.font.Family[short];

const SHORTS = { font, type };
for (let { short, prop, value } of fontWords()) {
  SHORTS[short] = { [prop]: value == "unset" ? `var(--${prop},unset)` : value };
  font.scope[short] = font.scope[short[0].toLowerCase() + short.slice(1)] =
    { [prop]: value == "unset" ? `var(--${prop},unset)` : value };
}
// SHORTS[prop] //here we should work on droplets??

export default SHORTS;