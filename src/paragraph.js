import { ValueTypes, FunctionTypes } from "./func.js";
const { LengthPercentNumber, LengthPercent, WordToValue } = ValueTypes;
const { TYPB, SIN, Umbrella, FIRST } = FunctionTypes;

const paragraph = TYPB({
  indent: SIN(LengthPercent, (n, v) => ({ textIndent: v })),
  spacing: SIN(LengthPercent, (n, v) => ({ wordSpacing: v })),

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
  preserveSpaces: { whiteSpace: "preserve-spaces" },
  breakSpaces: { whiteSpace: "break-spaces" },
  preserveNowrap: { whiteSpace: "preserve nowrap" },
  preserveBreaksNowrap: { whiteSpace: "preserve-breaks nowrap" },
  preserveSpacesNowrap: { whiteSpace: "preserve-spaces nowrap" },
  breakSpacesNowrap: { whiteSpace: "break-spaces nowrap" },

  anywhere: { wordBreak: "break-all", overflowWrap: "anywhere" },
  breakWord: { wordBreak: "break-all", overflowWrap: "break-word" },
  overflowWrapNone: { wordBreak: "none", overflowWrap: "none" },
  //wordBreak: keep-all

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
  textAlign: "unset",
  textAlignLast: "unset",
  hangingPunctuation: "unset",
};
const PARAGRAPHS = {
  _: {},
  scientific: { textAlign: "justify", textAlignLast: "justify" },
  oldBook: { textAlign: "justify", textAlignLast: "justify" },
};


const Paragraph = Umbrella(PARAGRAPH,
  FIRST(
    WordToValue(PARAGRAPHS),
    paragraph,
    (n, first, rest) => ({ ...PARAGRAPHS[first], ...rest }))
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
  textAlign: undefined,
  textAlignLast: undefined,
  hangingPunctuation: undefined,
};
