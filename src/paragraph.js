import { CsssPrimitives, CsssFunctions } from "./func.js";
const { LengthPercent, LengthPercentNumber } = CsssPrimitives;
const { TypeBasedFunction, FunctionPropertyType, CssValuesToCsssTable, SingleTable, PropertyType } = CsssFunctions;
import { CssFunctions } from "./funcReverse.js";
const { SingleArgumentFunctionReverse, Optional, SingleTableReverse, SingleTableReverseObject, normalizeToLogical } = CssFunctions;

const hyphens = {
  hyphens: "auto",
  shy: "manual",
  noHyphens: "none",
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
  breakTerminal: { wordBreak: "break-all", overflowWrap: "anywhere" },
  breakCompound: { wordBreak: "break-word", overflowWrap: "anywhere" },
};

//killing wordBreak and overflowWrap might be good..
const wordBreak = {
  breakAll: "break-all",
  keepAll: "keep-all",
  breakNormal: "normal",
  breakWord: "break-word",
};
const overflowWrap = {
  wrapNormal: "normal",
  wrapBreakWord: "break-word",
  wrapAnywhere: "anywhere",
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
  SingleTable("wordBreak", wordBreak),
  SingleTable("overflowWrap", overflowWrap),
  FunctionPropertyType("indent", "textIndent", LengthPercent),
  FunctionPropertyType("spacing", "wordSpacing", LengthPercent),
  a => a.text && wordBreakAndOverflowWrap[a.text]
);

const PARAGRAPHS = {
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

const paragraphDefaults = {
  lineHeight: "normal",
  textIndent: "0px",
  wordSpacing: "0px",
  hyphens: "none",
  whiteSpace: "normal",
  overflowWrap: "normal",
  wordBreak: "normal",
  lineBreak: "auto",
  textAlign: "start",
  textAlignLast: "auto",
  hangingPunctuation: "none",
};
const paragraphDefaultsUnset = Object.fromEntries(Object.keys(props).map(k => [k, "unset"]));

function Paragraph({ name, args }) {
  const namedParagraphStyle = PARAGRAPHS[args[0]?.text];
  if (namedParagraphStyle)
    args = args.slice(1);
  return {
    ...paragraphDefaultsUnset,
    ...namedParagraphStyle,
    ...paragraph({ name, args })
  };
}

export default {
  csss: {
    paragraph,
    Paragraph,
  },
  props,
  css: {
    //simplify imperative
    paragraph: style => {
      const s = normalizeToLogical(style);
      if (style.textAlign && style.textAlign !== s.textAlign) s.textAlign = style.textAlign;
      return Optional("$paragraph", "$Paragraph", paragraphDefaults,
        { prop: Object.keys(props), rev: SingleTableReverseObject(PARAGRAPHS) },
        { prop: "lineHeight", rev: s => (s.lineHeight && s.lineHeight !== "_" && s.lineHeight !== "unset") ? s.lineHeight : undefined },
        { prop: "hyphens", rev: SingleTableReverse("hyphens", hyphens) },
        {
          prop: ["whiteSpace", "whiteSpaceCollapse", "textWrapMode"],
          rev: s => {
            if (s.whiteSpace && s.whiteSpace !== "unset" && s.whiteSpace !== "initial") {
              const rev = SingleTableReverse("whiteSpace", whiteSpace)(s);
              if (rev) return rev;
            }
            const c = s.whiteSpaceCollapse, tw = s.textWrapMode;
            if (!c && !tw) return;
            if (c === "collapse" && tw === "nowrap") return "nowrap";
            if (c === "preserve" && tw === "nowrap") return "pre";
            if (c === "preserve" && (!tw || tw === "unset" || tw === "initial")) return "preserve";
            if (c === "preserve" && tw === "wrap") return "preWrap";
            if (c === "preserve-breaks" && tw === "wrap") return "preLine";
            if (c === "collapse" && tw === "wrap") return "whiteSpaceNormal";
            if (c === "preserve-breaks" && (!tw || tw === "unset" || tw === "initial")) return "preserveBreaks";
            if (c === "break-spaces" && tw === "wrap") return "breakSpaces";
          }
        },
        { prop: "lineBreak", rev: SingleTableReverse("lineBreak", lineBreak) },
        { prop: "textAlignLast", rev: SingleTableReverse("textAlignLast", textAlignLast) },
        { prop: "textAlign", rev: SingleTableReverse("textAlign", alignText) },
        { prop: "hangingPunctuation", rev: SingleTableReverse("hangingPunctuation", hangingPunctuation) },
        { prop: "textIndent", rev: SingleArgumentFunctionReverse("indent", "textIndent", v => v, "_") },
        { prop: "wordSpacing", rev: SingleArgumentFunctionReverse("spacing", "wordSpacing", v => v, "_") },
        { prop: "wordBreak", rev: SingleTableReverse("wordBreak", wordBreak) },
        { prop: "overflowWrap", rev: SingleTableReverse("overflowWrap", overflowWrap) }
      )(s);
    }
  }
};