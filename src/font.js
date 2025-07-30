import { isLength } from "./func.js";

//$font("Arial+Black",serif,bold,small-caps,ultra-condensed,capitalize,sans-serif,oblique(-10deg),ui-sans-serif)
//$font("Arial+Black",sans-serif,ui-sans-serif,900,small-caps,ultra-condensed,capitalize,oblique(10deg))
function font(...args) {
  const res = {
    fontStyle: "unset",
    fontWeight: "unset",
    fontVariantCaps: "unset",
    fontStretch: "unset",
    textTransform: "unset",
    letterSpacing: "unset"
  };
  args = args.map(a => {
    if (a instanceof Object) return a;
    if (a.match(/^[1-9]00$/)) return { fontWeight: a };
    if (isLength(a)) return { letterSpacing: a };
    //todo with font-size added, this should not be letter spacing.
    //todo i think letterSpacing should be spacing() or gap() or letterSpacing() or space()?
    if (a[0] === "'" || a[0] === '"') return { fontFamily: a.replaceAll("+", " ") };
    if (a.startsWith("url(")) return { fontFamily: a };
    throw `Unrecognized font property: ${a}`;
  });
  Object.assign(res, ...args);
  res.fontFamily = args.map(a => a.fontFamily).filter(Boolean).join(", ");
  return res;
}
font.scope = {
  url: (...args) => `url(${args.join(" ")})`,
  size: a => ({ fontSize: a }),
  weight: a => ({ fontWeight: a }),
  style: a => ({ fontStyle: a }),
  variant: a => ({ fontVariant: a }),
  stretch: a => ({ fontStretch: a }),
  transform: a => ({ textTransform: a }),
  letterSpacing: a => ({ letterSpacing: a }),
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

const SHORTS = { font };
for (let { short, prop, value } of fontWords()) {
  //1. add the short both in the scope of $font and top level
  SHORTS[short] = font.scope[short] = font.scope[short[0].toLowerCase() + short.slice()] = { [prop]: value };
  //2. adding words as superShorts.
}

export default SHORTS;