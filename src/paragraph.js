import { CsssPrimitives, CsssFunctions } from "./func.js";
const { LengthPercent, LengthPercentNumber } = CsssPrimitives;
const { TypeBasedFunction, FunctionPropertyType, CssValuesToCsssTable, SingleTable, PropertyType } = CsssFunctions;
import { CssFunctions } from "./funcReverse.js";
const { ValueReverse } = CssFunctions;
const TableReverse = Table => Object.fromEntries(Object.entries(Table).map(([k, v]) => [v, k]))

const hyphens = {
  hyphens: "auto",
  shy: "manual",
  noHyphens: "none",
};

const whiteSpace = {
  nowrap: "nowrap", //collapse nowrap
  pre: "pre", // preserve nowrap
  preWrap: "pre-wrap", //preserve wrap
  preLine: "pre-line", //preserve-breaks wrap
  whiteSpaceNormal: "normal", //collapse wrap,  DEFAULT 
  breakSpaces: "break-spaces", //break-spaces wrap
  preserveBreaksNowrap: "preserve-breaks nowrap",
  breakSpacesNowrap: "break-spaces nowrap",
};

const alignText = CssValuesToCsssTable("start|end|center|justify");

//breakLongWords: { wordBreak: "keep-all", overflowWrap: "break-word" },
//breakNormal: { wordBreak: "normal", overflowWrap: "normal" },
const overflowWrap = {
  breakWord: "break-word",
  breakAnywhere: "anywhere",
  overflowWrapNormal: "normal",
};
const wordBreak = {
  keepAll: "keep-all",
  breakAll: "break-all",
  wordBreakNormal: "normal",
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

const hyphensReverse = TableReverse(hyphens);
const lineBreakReverse = TableReverse(lineBreak);
const textAlignLastReverse = TableReverse(textAlignLast);
const textAlignReverse = TableReverse(alignText);
const hangingPunctuationReverse = TableReverse(hangingPunctuation);
const wordBreakReverse = TableReverse(wordBreak);
wordBreakReverse["normal"] = "wordBreakNormal";
const overflowWrapReverse = TableReverse(overflowWrap);
overflowWrapReverse["normal"] = "overflowWrapNormal";
const whiteSpaceTableReverse = TableReverse(whiteSpace);
whiteSpaceTableReverse["preserve nowrap"] = "pre";
whiteSpaceTableReverse["preserve-breaks"] = "preLine";
whiteSpaceTableReverse["preserve"] = "preWrap";

const paragraph =
  TypeBasedFunction(
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
    FunctionPropertyType("spacing", "wordSpacing", LengthPercent)
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
    wordBreak: "normal",
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

// const paragraphDefaults = {
//   lineHeight: "normal",
//   textIndent: "0px",
//   wordSpacing: "0px",
//   hyphens: "none",
//   whiteSpace: "normal",
//   overflowWrap: "normal",
//   wordBreak: "normal",
//   lineBreak: "auto",
//   textAlign: "start",
//   textAlignLast: "auto",
//   hangingPunctuation: "none",
// };
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

function whiteSpaceLongToShort({ whiteSpaceCollapse: c, textWrapMode: tw }) {
  if (!c && !tw) return;
  if (tw === "unset" || tw === "wrap" || tw === "initial") tw = "";
  if (c === "unset" || c === "initial" || c === "collapse") c = "";
  return [c, tw].filter(Boolean).join(" ");
}

export default {
  csss: {
    paragraph,
    Paragraph,
  },
  props,
  css: {
    paragraph: style => {
      let {
        hyphens, textAlign, textAlignLast, hangingPunctuation, lineBreak, wordBreak, overflowWrap,
        lineHeight, textIndent, wordSpacing, whiteSpace, whiteSpaceCollapse: c, textWrapMode: tw } = style;
      whiteSpace ||= whiteSpaceLongToShort(style);

      hyphens &&= hyphensReverse[hyphens];
      textAlign &&= textAlignReverse[textAlign];
      textAlignLast &&= textAlignLastReverse[textAlignLast];
      hangingPunctuation &&= hangingPunctuationReverse[hangingPunctuation];
      lineBreak &&= lineBreakReverse[lineBreak];
      wordBreak &&= wordBreakReverse[wordBreak];
      overflowWrap &&= overflowWrapReverse[overflowWrap];
      lineHeight &&= ValueReverse(lineHeight);
      textIndent &&= ValueReverse(textIndent);
      textIndent &&= `indent(${textIndent})`;
      wordSpacing &&= ValueReverse(wordSpacing);
      wordSpacing &&= `spacing(${wordSpacing})`;
      whiteSpace &&= whiteSpaceTableReverse[whiteSpace];
      const args2 = [
        hyphens, lineBreak, textAlignLast, textAlign, hangingPunctuation,
        wordBreak, overflowWrap, lineHeight, textIndent, wordSpacing, whiteSpace].filter(Boolean);
      if (!args2.length)
        return;
      const unsets2 = Object.entries(style).filter(([k]) => style[k] === "unset" || style[k] === "initial");
      const name2 = args2.length + unsets2.length > 9 ? "$Paragraph" : "$paragraph";
      return `${name2}(${args2.join(",")})`;
    }
  }
};