import { ValueTypes, FunctionTypes } from "./func.js";
const { LengthPercentNumber, LengthPercent, WordToValue } = ValueTypes;
const { FunctionBasedOnValueTypes, SingleArgumentFunction, FunctionWithDefaultValues, ParseFirstThenRest } = FunctionTypes;

const PROPS = {
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

const PARAGRAPH = Object.fromEntries(Object.keys(PROPS).map(k => [k, "unset"]));
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
  ParseFirstThenRest(WordToValue(PARAGRAPHS), paragraph, (a, b) => ({ ...a, ...b })));

export default {
  ...PROPS,
  paragraph,
  Paragraph,
};
