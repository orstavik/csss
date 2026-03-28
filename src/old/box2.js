import { ValueTypes, FunctionTypes } from "./func.js";
const { LogicalFour, FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, TypeBasedFunction } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;

const ScrollPadding = {
  csss: LogicalFour("scrollPadding", LengthPercent),
  css: LogicalFourToShort("scrollPadding", TmpInterpreter),
  DEFAULTS: {
    scrollPadding: 0,
    scrollPaddingBlock: 0,
    scrollPaddingInline: 0,
    scrollPaddingBlockStart: 0,
    scrollPaddingBlockEnd: 0,
    scrollPaddingInlineStart: 0,
    scrollPaddingInlineEnd: 0,
    scrollPaddingTop: undefined,
    scrollPaddingRight: undefined,
    scrollPaddingBottom: undefined,
    scrollPaddingLeft: undefined,
  },
};
const ScrollSnapType = {
  csss: {
    snap: "both",
    snapNone: "none",
    snapBlock: "block",
    snapInline: "inline",
    snapMandatory: "both mandatory",
    snapBlockMandatory: "block mandatory",
    snapInlineMandatory: "inline mandatory",
  },
  DEFAULTS: {
    scrollSnapType: "unset",
  },
};

const Overflow = {
  csss: {
    auto: "auto",
    clip: "clip",
    hidden: "hidden",
    scroll: "scroll",
    visible: "visible",
    autoClip: "auto clip",
    autoHidden: "auto hidden",
    autoScroll: "auto scroll",
    autoVisible: "auto visible",
    clipAuto: "clip auto",
    clipHidden: "clip hidden",
    clipScroll: "clip scroll",
    clipVisible: "clip visible",
    hiddenAuto: "hidden auto",
    hiddenClip: "hidden clip",
    hiddenScroll: "hidden scroll",
    hiddenVisible: "hidden visible",
    scrollAuto: "scroll auto",
    scrollClip: "scroll clip",
    scrollHidden: "scroll hidden",
    scrollVisible: "scroll visible",
    visibleAuto: "visible auto",
    visibleClip: "visible clip",
    visibleHidden: "visible hidden",
    visibleScroll: "visible scroll",
  },
  //css as csss is a dictionary, then we can reverse it to get the css version of the property.
  DEFAULTS: {
    overflow: "auto",
    overflowBlock: "auto",
    overflowInline: "auto",
    overflowX: undefined,
    overflowY: undefined,
  },
};

const InlineSize = {
  csss: SequentialFunction("inline/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { inlineSize: ar[0] } : { minInlineSize: ar[0], inlineSize: ar[1], maxInlineSize: ar[2] ?? "unset" }),
  css: PropsToOneThree("inline", TmpInterpreter),
  DEFAULTS: {
    inlineSize: "unset",
    minInlineSize: "unset",
    maxInlineSize: "unset",
  },
};

const BlockSize = {
  csss: SequentialFunction("block/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { blockSize: ar[0] } : { minBlockSize: ar[0], blockSize: ar[1], maxBlockSize: ar[2] ?? "unset" }),
  css: PropsToOneThree("block", TmpInterpreter),
  DEFAULTS: {
    blockSize: "unset",
    minBlockSize: "unset",
    maxBlockSize: "unset",
  },
};

const ScrollSnapAlign = {
  csss: {
    snapStart: "start",
    snapStartCenter: "start center",
    snapStartEnd: "start end",
    snapCenter: "center",
    snapCenterStart: "center start",
    snapCenterEnd: "center end",
    snapEnd: "end",
    snapEndStart: "end start",
    snapEndCenter: "end center",
    snapNone: "none",
  },
  DEFAULTS: {
    scrollSnapAlign: "unset",
  },
};
const ScrollMargin = {
  csss: LogicalFour("scrollMargin", LengthPercent),
  css: LogicalFourToShort("scrollMargin", TmpInterpreter),
  DEFAULTS: {
    scrollMargin: "unset",
    scrollMarginBlock: "unset",
    scrollMarginInline: "unset",
    scrollMarginBlockStart: "unset",
    scrollMarginBlockEnd: "unset",
    scrollMarginInlineStart: "unset",
    scrollMarginInlineEnd: "unset",
    scrollMarginTop: undefined,
    scrollMarginRight: undefined,
    scrollMarginBottom: undefined,
    scrollMarginLeft: undefined,
  },
}
const ScrollSnapStop = {
  csss: {
    snapAlways: "always",
    snapNormal: "normal",
  },
  DEFAULTS: {
    scrollSnapStop: "unset",
  },
};
const boxItem = TypeBasedFunction({
  scrollMargin: ScrollMargin.csss,
  scrollSnapAlign: ScrollSnapAlign.csss,
  scrollSnapStop: ScrollSnapStop.csss,
});
const BoxItem = FunctionWithDefaultValues(ScrollMargin.DEFAULTS, boxItem);
const boxItemReverse = Optional([
  [Object.keys(ScrollSnapStop.csss), WordsInReverse(ScrollSnapStop.csss, TmpInterpreter)],
  [Object.keys(ScrollSnapAlign.csss), WordsInReverse(ScrollSnapAlign.csss, TmpInterpreter)],
  [DIR.map(s => kebabCase("scrollMargin" + s)), LogicalFourToShort("scrollMargin", TmpInterpreter)],
],
  args => `$boxItem(${args.join(",")})`
);

const BOX_ITEM = {
  scrollMargin: LogicalFour("scrollMargin", LengthPercent),
  scrollSnapAlign: {
    snapStart: "start",
    snapStartCenter: "start center",
    snapStartEnd: "start end",
    snapCenter: "center",
    snapCenterStart: "center start",
    snapCenterEnd: "center end",
    snapEnd: "end",
    snapEndStart: "end start",
    snapEndCenter: "end center",
    snapNone: "none",
  },
  scrollSnapStop: {
    snapAlways: "always",
    snapNormal: "normal",
  },
};

const BOX = {
  inlineSize: SequentialFunction("inline/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { inlineSize: ar[0] } : { minInlineSize: ar[0], inlineSize: ar[1], maxInlineSize: ar[2] ?? "unset" }),
  blockSize: SequentialFunction("block/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { blockSize: ar[0] } : { minBlockSize: ar[0], blockSize: ar[1], maxBlockSize: ar[2] ?? "unset" }),
  minInlineSize: undefined,
  maxInlineSize: undefined,
  minBlockSize: undefined,
  maxBlockSize: undefined,
  overflow: {
    auto: "auto",
    clip: "clip",
    hidden: "hidden",
    scroll: "scroll",
    visible: "visible",
    autoClip: "auto clip",
    autoHidden: "auto hidden",
    autoScroll: "auto scroll",
    autoVisible: "auto visible",
    clipAuto: "clip auto",
    clipHidden: "clip hidden",
    clipScroll: "clip scroll",
    clipVisible: "clip visible",
    hiddenAuto: "hidden auto",
    hiddenClip: "hidden clip",
    hiddenScroll: "hidden scroll",
    hiddenVisible: "hidden visible",
    scrollAuto: "scroll auto",
    scrollClip: "scroll clip",
    scrollHidden: "scroll hidden",
    scrollVisible: "scroll visible",
    visibleAuto: "visible auto",
    visibleClip: "visible clip",
    visibleHidden: "visible hidden",
    visibleScroll: "visible scroll",
  },
  overflowBlock: undefined,
  overflowInline: undefined,
  overflowX: undefined,
  overflowY: undefined,
  scrollPadding: LogicalFour("scrollPadding", LengthPercent),
  scrollPaddingBlock: undefined,
  scrollPaddingInline: undefined,
  scrollPaddingBlockStart: undefined,
  scrollPaddingBlockEnd: undefined,
  scrollPaddingInlineStart: undefined,
  scrollPaddingInlineEnd: undefined,
  scrollPaddingTop: undefined,
  scrollPaddingRight: undefined,
  scrollPaddingBottom: undefined,
  scrollPaddingLeft: undefined,
  scrollSnapType: {
    snap: "both",
    snapNone: "none",
    snapBlock: "block",
    snapInline: "inline",
    snapMandatory: "both mandatory",
    snapBlockMandatory: "block mandatory",
    snapInlineMandatory: "inline mandatory",
  },
};

const box = TypeBasedFunction(BOX);
const boxItem = TypeBasedFunction(BOX_ITEM);

const DefaultBox = Object.fromEntries(Object.keys(BOX).map(k => [k, "unset"]));
const DefaultBoxItem = Object.fromEntries(Object.keys(BOX_ITEM).map(k => [k, "unset"]));

export default {
  ...DefaultBox,
  ...DefaultBoxItem,
  box,
  boxItem,
  Box: FunctionWithDefaultValues(DefaultBox, box),
  BoxItem: FunctionWithDefaultValues(DefaultBoxItem, boxItem),
};

const DIR = ["BlockStart", "InlineStart", "BlockEnd", "InlineEnd"];
const kebabCase = s => s.replaceAll(/([A-Z])/g, "-$1").toLowerCase();

const padding = DIR.map(s => kebabCase("padding" + s));
const borderColor = DIR.map(s => kebabCase("border" + s + "Color"));

const inlineSize = ["minInlineSize", "inlineSize", "maxInlineSize"].map(kebabCase);
const blockSize = ["minBlockSize", "blockSize", "maxBlockSize"].map(kebabCase);

const SequenceToShort = (NAME, INTERPRETER) => (style, PROPS) =>
  `${NAME}(${PROPS.map(p => style[p]).filter(v => v == null).map(INTERPRETER).join(",")})`;

const PropsToOneThree = (NAME, INTERPRETER) => (style, PROPS) => {
  if (PROPS.every(p => style[p] === undefined))
    return;
  const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
  return `${NAME}(${args[0] === "_" && args[2] === "_" ? args[1] : args.join(",")})`;
}

const TmpInterpreter = v => v;

const WordsInReverse = (DICT, INTERPRETER) => {
  const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
  return (style, [prop]) => _DICT[style[prop]] ?? INTERPRETER(style[prop]);
}

const WordsInReverseSpaceMerge = (DICT, INTERPRETER) => {
  const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
  return (style, PROPS) => _DICT[PROPS.map(p => INTERPRETER(style[p])).join(" ")];
}

const LogicalFourToShort = (NAME, INTERPRETER) => {
  return (style, PROPS) => {
    if (PROPS.every(p => style[p] === undefined))
      return;
    const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
    if (args[1] !== args[3])
      return `${NAME}(${args.join(",")})`;
    args.pop();
    if (args[0] !== args[2])
      return `${NAME}(${args.join(",")})`;
    args.pop();
    if (args[0] !== args[1])
      return `${NAME}(${args.join(",")})`;
    args.pop();
    return `${NAME}(${args[0]})`;
  }
};

const Optional = (ARGS, POST) => style => {
  let args;
  for (let [props, fn] of ARGS)
    if (props.some(p => style[p] !== undefined))
      (args ??= []).push(fn(style, props));
  return args && POST(args);
}

const _box = Optional([
  [["scroll-snap-type"], WordsInReverse(BOX.scrollSnapType, TmpInterpreter)],
  [["overflow-inline", "overflow-block"], WordsInReverseSpaceMerge(BOX.overflow, TmpInterpreter)],
  [["minInlineSize", "inlineSize", "maxInlineSize"], PropsToOneThree("inline", TmpInterpreter)],
  [["minBlockSize", "blockSize", "maxBlockSize"], PropsToOneThree("block", TmpInterpreter)],
  [DIR.map(s => kebabCase("scrollPadding" + s)), LogicalFourToShort("scrollPadding", TmpInterpreter)],
],
  args => `$box(${args.join(",")})`);

const reversals = {
  box: _box,
}

function reverse(style, reversals) {
  debugger
  const shorts = Object.values(reversals).map(rev => rev(style)).filter(Boolean);
}

const tst = {
  "scroll-snap-type": "both mandatory",
  "scroll-padding-block-start": "1em",
  "scroll-padding-block-end": "1em",
  "scroll-padding-inline-start": "2em",
  "scroll-padding-inline-end": "2em"
};

reverse(tst, reversals);
