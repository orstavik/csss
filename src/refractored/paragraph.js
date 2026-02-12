/**
 * Paragraph shorts:
 * - Map expressions like $paragraph(justify, indent(2em)) into
 *   CSS paragraph-level properties: text-align, hyphens, white-space, etc.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses words + typed slots into properties.
 * - FunctionWithDefaultValues (Umbrella): wraps parsed props with ParagraphDefaults.
 * - SingleArgumentFunction (SIN): single-argument helpers for indent, spacing.
 * - FIRST: first-argument lookup (named paragraph styles like "scientific").
 * - WordInTable: maps words to values from a lookup table.
 *
 * Export map:
 * - `paragraph`: main short parser.
 * - `Paragraph`: umbrella that applies ParagraphDefaults and named styles.
 * - Reserved paragraph-related longhand properties.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  LengthPercentNumber,
  LengthPercent,
  WORD_IN_TABLE: WordInTable,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  SIN: SingleArgumentFunction,
  Umbrella: FunctionWithDefaultValues,
  FIRST: ParseFirstThenRest,
} = FunctionTypes;

// --- Main paragraph short ---

/** Parses $paragraph(...) arguments into text-align, white-space, hyphen, and related properties. */
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

// --- Paragraph defaults and presets ---

/** Used when $Paragraph() is called with no args. */
const ParagraphDefaults = {
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
/** Named paragraph style presets. */
const ParagraphPresets = {
  _: {},
  scientific: { textAlign: "justify", textAlignLast: "justify" },
  oldBook: { textAlign: "justify", textAlignLast: "justify" },
};


/** Umbrella: applies ParagraphDefaults; first arg can be a named style. */
const Paragraph = FunctionWithDefaultValues(ParagraphDefaults,
  ParseFirstThenRest(
    WordInTable(ParagraphPresets),
    paragraph,
    (n, first, rest) => ({ ...ParagraphPresets[first], ...rest }))
);

/**
 * Export map:
 * - Parsers: `paragraph` (internal, used by Paragraph umbrella).
 * - Umbrellas: `Paragraph` (defaults + named styles + parser).
 * - Reserved longhands: lineHeight, textIndent, wordSpacing, hyphens,
 *   whiteSpace, overflowWrap, wordBreak, textAlign, textAlignLast,
 *   hangingPunctuation.
 */
export default {
  paragraph,
  Paragraph,
  // --- Reserved keys (no direct short) ---
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
