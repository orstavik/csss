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

//collapse and //wrap is default
const whiteSpace = {
  nowrap: "nowrap", //collapse nowrap
  pre: "pre", // preserve nowrap
  preWrap: "pre-wrap", //preserve wrap
  preLine: "pre-line", //preserve-breaks wrap
  whiteSpaceNormal: "normal", //collapse wrap,
  // preserveBreaks: "preserve-breaks wrap", // same as pre-line
  breakSpaces: "break-spaces", //break-spaces wrap
  preserveNowrap: "preserve nowrap",
  preserveBreaksNowrap: "preserve-breaks nowrap",
  breakSpacesNowrap: "break-spaces nowrap",
};
const whiteSpaceTableReverse = TableReverse(whiteSpace);
whiteSpaceTableReverse["preserve nowrap"] = "pre";
whiteSpaceTableReverse["preserve-breaks"] = "preLine";
whiteSpaceTableReverse["preserve"] = "preWrap";

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
    FunctionPropertyType("spacing", "wordSpacing", LengthPercent),
    // a => a.text && wordBreakAndOverflowWrap[a.text]
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

const hyphensReverse = TableReverse(hyphens);
const lineBreakReverse = TableReverse(lineBreak);
const textAlignLastReverse = TableReverse(textAlignLast);
const textAlignReverse = TableReverse(alignText);
const hangingPunctuationReverse = TableReverse(hangingPunctuation);
const wordBreakReverse = TableReverse(wordBreak);
wordBreakReverse["normal"] = "wordBreakNormal";
const overflowWrapReverse = TableReverse(overflowWrap);
overflowWrapReverse["normal"] = "overflowWrapNormal";

const reverseProperties = {
  hyphens: v => hyphensReverse[v],
  lineBreak: v => lineBreakReverse[v],
  textAlignLast: v => textAlignLastReverse[v],
  textAlign: v => textAlignReverse[v],
  hangingPunctuation: v => hangingPunctuationReverse[v],
  wordBreak: v => wordBreakReverse[v],
  overflowWrap: v => overflowWrapReverse[v],
  lineHeight: ValueReverse,
  textIndent: v => ((v = ValueReverse(v)) != null) && `indent(${v})`,
  wordSpacing: v => ((v = ValueReverse(v)) != null) && `spacing(${v})`,
};
const whiteSpaceReverse = style => {
  let { whiteSpace, whiteSpaceCollapse: c, textWrapMode: tw } = style;
  const wsr = whiteSpaceTableReverse[whiteSpace];
  if (wsr) return wsr;
  if (!c && !tw) return;
  if ((!tw || tw === "unset" || tw === "wrap" || tw === "initial")) tw = "";
  if (c === "unset" || c === "initial" || c === "collapse") c = "";
  whiteSpace = [c, tw].filter(Boolean).join(" ");
  return whiteSpaceTableReverse[whiteSpace];
}

export default {
  csss: {
    paragraph,
    Paragraph,
  },
  props,
  css: {
    paragraph: style => {
      let args = Object.entries(reverseProperties).map(([key, rev]) => rev(style[key]));
      args.push(whiteSpaceReverse(style))
      args = args.filter(Boolean);
      if (!args.length)
        return;
      const unsets = Object.entries(style).filter(([k]) => style[k] === "unset" || style[k] === "initial");
      //todo here we can match against the named paragraphs.
      const name = args.length + unsets.length > 9 ? "$Paragraph" : "$paragraph";
      return `${name}(${args.join(",")})`;
    }
  }
};