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
      Palatino: "Palatino Linotype",
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
      allCaps: "uppercase",
      smallCaps: "lowercase",
      uppercase: "uppercase",
      lowercase: "lowercase",
      fullWidth: "full-width",
      fullSizeKana: "full-size-kana",
      mathAuto: "math-auto",
    }
  }
};
function* fontWords() {
  for (let [main, one] of Object.entries(WORDS))
    for (let [prop, two] of Object.entries(one))
      for (let [short, value] of Object.entries(two))
        yield { prop: main + prop, short, value };
}
//0. adding all fonts under small first letter too Arial => arial, Times => times, etc.
for (let short in WORDS.font.Family)
  WORDS.font.Family[short[0].toLowerCase() + short.slice(1)] = WORDS.font.Family[short];

//1. adding words under the font.scope
for (let { short, prop, value } of fontWords())
  font.scope[short] = font.scope[short[0].toLowerCase() + short.slice()] = { [prop]: value };

//2. adding words as superShorts.
const SHORTS = { font };
for (let { short, prop, value } of fontWords()) {
  SHORTS[short] = function () { return { [prop]: value }; } //todo i can't just use objects here, right?
  //question, should the superShort words be added as the full font? Or just using their property?
  // SHORTS[short] = function (...args) { return this.font({ [prop]: value }, ...args); }
  // SHORTS[short].scope = font.scope;
  Object.defineProperty(SHORTS[short], "name", { value: short });
  SHORTS[short]
}

export default SHORTS;