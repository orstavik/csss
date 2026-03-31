import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { LengthPercent, LengthPercentNumber } = CsssPrimitives;
const { TypeBasedFunction, FunctionPropertyType, FunctionWithDefaultValues, ParseFirstThenRest, CssValuesToCsssTable, SingleTable, PropertyType } = CsssFunctions;
const { SingleArgumentFunctionReverse, Optional, SingleTableReverse } = CssFunctions;

const hyphens = {
  hyphens: "auto",
  shy: "manual",
};

const whiteSpace = {
  nowrap: "nowrap",
  pre: "pre",
  preWrap: "pre-wrap",
  preLine: "pre-line",
  whiteSpaceNormal: "normal",
  preserve: "preserve",
  preserveBreaks: "preserve-breaks",
  breakSpaces: "break-spaces",
  preserveNowrap: "preserve nowrap",
  preserveBreaksNowrap: "preserve-breaks nowrap",
  breakSpacesNowrap: "break-spaces nowrap",
};
const alignText = CssValuesToCsssTable("start|end|left|right|center|justify");

const wordBreakAndOverflowWrap = {
  breakWord: { wordBreak: "normal", overflowWrap: "break-word" },
  breakAnywhere: { wordBreak: "normal", overflowWrap: "anywhere" },
  breakLongWords: { wordBreak: "keep-all", overflowWrap: "break-word" },
  breakNone: { wordBreak: "keep-all", overflowWrap: "normal" },
  breakAll: { wordBreak: "break-all", overflowWrap: "normal" },
  breakNormal: { wordBreak: "normal", overflowWrap: "normal" },
};

const lineBreak = {
  lineBreakLoose: "loose",
  lineBreakStrict: "strict",
  lineBreakAnywhere: "anywhere",
  lineBreakNormal: "normal",
};


const textAlignLast = {
  lastStart: "start",
  lastEnd: "end",
  lastLeft: "left",
  lastRight: "right",
  lastCenter: "center",
  lastJustify: "justify",
};

const hangingPunctuation = {
  hangingPunctuationFirst: "first",
  hangingPunctuationLast: "last",
  hangingPunctuationAllowEnd: "allow-end",
  hangingPunctuationForceEnd: "force-end",
  hangingPunctuationNone: "none",
};

const paragraph = TypeBasedFunction(
  PropertyType("lineHeight", LengthPercentNumber),
  SingleTable("hyphens", hyphens),
  SingleTable("whiteSpace", whiteSpace),
  SingleTable("lineBreak", lineBreak),
  SingleTable("textAlignLast", textAlignLast),
  SingleTable("textAlign", alignText),
  SingleTable("hangingPunctuation", hangingPunctuation),
  FunctionPropertyType("indent", "textIndent", LengthPercent),
  FunctionPropertyType("spacing", "wordSpacing", LengthPercent),
  a => a.text && wordBreakAndOverflowWrap[a.text]
);

const PARAGRAPHS = {
  _: {},
  body: {
    lineHeight: "1.5",
    hyphens: "auto",
    overflowWrap: "break-word",
    textAlign: "start",
  },
  legible: {
    lineHeight: "1.6",
    wordSpacing: "0.05em",
    hyphens: "none",
    overflowWrap: "break-word",
    textAlign: "start",
  },
  journal: {
    lineHeight: "1.5",
    hyphens: "auto",
    lineBreak: "strict",
    textAlign: "justify",
  },
  novel: {
    lineHeight: "1.5",
    textIndent: "1.5em",
    hyphens: "auto",
    textAlign: "justify",
    hangingPunctuation: "last"
  },
  display: {
    lineHeight: "1.1",
    hyphens: "none",
    overflowWrap: "break-word",
    textAlign: "start",
    hangingPunctuation: "first"
  },
  caption: {
    lineHeight: "1.3",
    hyphens: "none",
    overflowWrap: "break-word",
    textAlign: "center",
  },
  tabular: {
    lineHeight: "1.3",
    hyphens: "none",
    whiteSpace: "nowrap",
    wordBreak: "normal",
    textAlign: "end",
  },
  interactive: {
    lineHeight: "1",
    hyphens: "none",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  terminal: {
    lineHeight: "1.4",
    hyphens: "none",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    wordBreak: "break-all",
    textAlign: "start",
  },
  compound: {
    lineHeight: "1.5",
    hyphens: "auto",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    textAlign: "start",
  }
};

const props = {
  lineHeight: undefined,
  textIndent: undefined,
  wordSpacing: undefined,
  hyphens: undefined,
  whiteSpace: undefined,
  overflowWrap: undefined,
  wordBreak: undefined,
  lineBreak: undefined,
  textAlign: undefined,
  textAlignLast: undefined,
  hangingPunctuation: undefined,
};

const Paragraph = FunctionWithDefaultValues(
  Object.fromEntries(Object.keys(props).map(k => [k, "unset"])),
  ParseFirstThenRest(
    a => a.text && PARAGRAPHS[a.text],
    paragraph,
    (a, b) => ({ ...a, ...b })
  )
);

export default {
  csss: {
    paragraph,
    Paragraph,
  },
  props,
  css: {
    paragraph: Optional("paragraph",
      SingleArgumentFunctionReverse("indent", "textIndent", v => v, "_"),
      SingleArgumentFunctionReverse("spacing", "wordSpacing", v => v, "_"),
      style => {
        if (style.lineHeight && style.lineHeight !== "_") return style.lineHeight;
      },
      SingleTableReverse("hyphens", hyphens),
      SingleTableReverse("whiteSpace", whiteSpace),
      style => {
        const w = style.wordBreak;
        const o = style.overflowWrap;
        if (!w && !o) return undefined;
        for (let [k, v] of Object.entries(wordBreakAndOverflowWrap)) {
          if (v.wordBreak === w && v.overflowWrap === o) return k;
        }
        return undefined;
      },
      SingleTableReverse("lineBreak", lineBreak),
      SingleTableReverse("textAlign", alignText),
      SingleTableReverse("textAlignLast", textAlignLast),
      SingleTableReverse("hangingPunctuation", hangingPunctuation)
    )
  }
};
