import { ValueTypes, FunctionTypes } from "./func.js";
const { LengthPercentNumber, LengthPercent, WordToValue } = ValueTypes;
const { FunctionBasedOnValueTypes, SingleArgumentFunction, FunctionWithDefaultValues, ParseFirstThenRest } = FunctionTypes;

const paragraph = FunctionBasedOnValueTypes({
  indent: SingleArgumentFunction(LengthPercent, (n, v) => ({ textIndent: v })),
  spacing: SingleArgumentFunction(LengthPercent, (n, v) => ({ wordSpacing: v })),

  hyphens: { hyphens: "auto" },
  shy: { hyphens: "manual" },

  //todo i don't think that we need to include these settings as white-space overrides it: whiteSpaceCollapse: "unset", textWrapMode: "unset", 
  nowrap: { whiteSpace: "nowrap" },
  pre: { whiteSpace: "pre" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  whiteSpaceNormal: { whiteSpace: "normal" },

  preserve: { whiteSpace: "preserve" },
  preserveBreaks: { whiteSpace: "preserve-breaks" },
  breakSpaces: { whiteSpace: "break-spaces" },
  preserveNowrap: { whiteSpace: "preserve nowrap" },
  preserveBreaksNowrap: { whiteSpace: "preserve-breaks nowrap" },
  breakSpacesNowrap: { whiteSpace: "break-spaces nowrap" },

  breakWord: { wordBreak: "normal", overflowWrap: "break-word" },
  breakAnywhere: { wordBreak: "normal", overflowWrap: "anywhere" },
  breakLongWords: { wordBreak: "keep-all", overflowWrap: "break-word" },
  breakNone: { wordBreak: "keep-all", overflowWrap: "normal" },
  breakAll: { wordBreak: "break-all", overflowWrap: "normal" },
  breakNormal: { wordBreak: "normal", overflowWrap: "normal" },

  lineBreakLoose: { lineBreak: "loose" },
  lineBreakStrict: { lineBreak: "strict" },
  lineBreakAnywhere: { lineBreak: "anywhere" },
  lineBreakNormal: { lineBreak: "normal" },

  start: { textAlign: "start" },
  end: { textAlign: "end" },
  left: { textAlign: "left" },
  right: { textAlign: "right" },
  center: { textAlign: "center" },
  justify: { textAlign: "justify" },
  lastStart: { textAlignLast: "start" },
  lastEnd: { textAlignLast: "end" },
  lastLeft: { textAlignLast: "left" },
  lastRight: { textAlignLast: "right" },
  lastCenter: { textAlignLast: "center" },
  lastJustify: { textAlignLast: "justify" },

  //exp safari  
  hangingPunctuationFirst: { hangingPunctuation: "first" },
  hangingPunctuationLast: { hangingPunctuation: "last" },
  hangingPunctuationAllowEnd: { hangingPunctuation: "allow-end" },
  hangingPunctuationForceEnd: { hangingPunctuation: "force-end" },
  hangingPunctuationNone: { hangingPunctuation: "none" },

}, {
  lineHeight: LengthPercentNumber,      //todo this is not so good. Here we need to redo all of them.. A little too little automatic.
}, {
}, res => {
  res.lineHeight &&= { lineHeight: res.lineHeight };
  return Object.assign({}, ...Object.values(res))
});

const PARAGRAPH = {
  lineHeight: "unset",
  textIndent: "unset",
  wordSpacing: "unset",
  hyphens: "unset",
  whiteSpace: "unset",
  overflowWrap: "unset",
  wordBreak: "unset",
  lineBreak: "unset",
  textAlign: "unset",
  textAlignLast: "unset",
  hangingPunctuation: "unset",
};
const PARAGRAPHS = {
  _: {},
  body: {
    lineHeight: "1.5",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "auto",
    whiteSpace: "unset",
    overflowWrap: "break-word",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "start",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  legible: {
    lineHeight: "1.6",
    textIndent: "unset",
    wordSpacing: "0.05em",
    hyphens: "none",
    whiteSpace: "unset",
    overflowWrap: "break-word",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "start",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  journal: {
    lineHeight: "1.5",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "auto",
    whiteSpace: "unset",
    overflowWrap: "unset",
    wordBreak: "unset",
    lineBreak: "strict",
    textAlign: "justify",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  novel: {
    lineHeight: "1.5",
    textIndent: "1.5em",
    wordSpacing: "unset",
    hyphens: "auto",
    whiteSpace: "unset",
    overflowWrap: "unset",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "justify",
    textAlignLast: "unset",
    hangingPunctuation: "last"
  },
  display: {
    lineHeight: "1.1",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "none",
    whiteSpace: "unset",
    overflowWrap: "break-word",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "start",
    textAlignLast: "unset",
    hangingPunctuation: "first"
  },
  caption: {
    lineHeight: "1.3",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "none",
    whiteSpace: "unset",
    overflowWrap: "break-word",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "center",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  tabular: {
    lineHeight: "1.3",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "none",
    whiteSpace: "nowrap",
    overflowWrap: "unset",
    wordBreak: "normal",
    lineBreak: "unset",
    textAlign: "end",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  interactive: {
    lineHeight: "1",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "none",
    whiteSpace: "nowrap",
    overflowWrap: "unset",
    wordBreak: "unset",
    lineBreak: "unset",
    textAlign: "center",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  terminal: {
    lineHeight: "1.4",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "none",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
    wordBreak: "break-all",
    lineBreak: "unset",
    textAlign: "start",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  },
  compound: {
    lineHeight: "1.5",
    textIndent: "unset",
    wordSpacing: "unset",
    hyphens: "auto",
    whiteSpace: "unset",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    lineBreak: "unset",
    textAlign: "start",
    textAlignLast: "unset",
    hangingPunctuation: "unset"
  }
};


const Paragraph = FunctionWithDefaultValues(PARAGRAPH,
  ParseFirstThenRest(
    WordToValue(PARAGRAPHS),
    paragraph,
    (n, first, rest) => ({ ...first, ...rest }))
);

export default {
  paragraph,
  Paragraph,
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
