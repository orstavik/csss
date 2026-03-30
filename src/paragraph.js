import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { LengthPercent, LengthPercentNumber } = CsssPrimitives;
const { TypeBasedFunction, SingleArgumentFunction, FunctionWithDefaultValues, ParseFirstThenRest } = CsssFunctions;
const { SingleArgumentFunctionReverse, Optional, SingleTableReverse } = CssFunctions;

const PARAGRAPH_PROPS = {
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

const textAlign = {
  start: "start",
  end: "end",
  left: "left",
  right: "right",
  center: "center",
  justify: "justify",
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
  SingleArgumentFunction("indent", LengthPercent, (n, v) => ({ textIndent: v })),
  SingleArgumentFunction("spacing", LengthPercent, (n, v) => ({ wordSpacing: v })),
  (a) => {
    let res = LengthPercentNumber(a);
    if (res !== undefined) return { lineHeight: res };
  },
  a => {
    const map = {
      ...Object.fromEntries(Object.entries(hyphens).map(([k,v]) => [k, {hyphens: v}])),
      ...Object.fromEntries(Object.entries(whiteSpace).map(([k,v]) => [k, {whiteSpace: v}])),
      ...wordBreakAndOverflowWrap,
      ...Object.fromEntries(Object.entries(lineBreak).map(([k,v]) => [k, {lineBreak: v}])),
      ...Object.fromEntries(Object.entries(textAlign).map(([k,v]) => [k, {textAlign: v}])),
      ...Object.fromEntries(Object.entries(textAlignLast).map(([k,v]) => [k, {textAlignLast: v}])),
      ...Object.fromEntries(Object.entries(hangingPunctuation).map(([k,v]) => [k, {hangingPunctuation: v}])),
    };
    return map[a.text];
  }
);

const PARAGRAPH = Object.fromEntries(Object.keys(PARAGRAPH_PROPS).map(k => [k, "unset"]));

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

const Paragraph = FunctionWithDefaultValues(PARAGRAPH,
  ParseFirstThenRest(
    (a) => PARAGRAPHS[a.text],
    paragraph,
    (a, b) => ({ ...a, ...b })
  )
);

export default {
  csss: {
    paragraph,
    Paragraph,
  },
  props: PARAGRAPH_PROPS,
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
      SingleTableReverse("textAlign", textAlign),
      SingleTableReverse("textAlignLast", textAlignLast),
      SingleTableReverse("hangingPunctuation", hangingPunctuation)
    )
  }
};
