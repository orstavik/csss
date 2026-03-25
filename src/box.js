import { ValueTypes, FunctionTypes } from "./func.js";
const { LogicalFour, FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;

export const PROPS = {
  Box: {
    inlineSize: "unset",
    blockSize: "unset",
    minInlineSize: "unset",
    maxInlineSize: "unset",
    minBlockSize: "unset",
    maxBlockSize: "unset",
    overflow: "unset",
    scrollPadding: "unset",
    scrollSnapType: "unset",
  },
  BoxItem: {
    scrollMargin: "unset",
    scrollSnapAlign: "unset",
    scrollSnapStop: "unset",
  },
};

const BOX = {
  inline: SequentialFunction("inline/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { inlineSize: ar[0] } : { minInlineSize: ar[0], inlineSize: ar[1], maxInlineSize: ar[2] ?? "unset" }),
  block: SequentialFunction("block/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { blockSize: ar[0] } : { minBlockSize: ar[0], blockSize: ar[1], maxBlockSize: ar[2] ?? "unset" }),
  scrollPadding: LogicalFour("scrollPadding", LengthPercent),

  auto: { overflow: "auto" },
  clip: { overflow: "clip" },
  hidden: { overflow: "hidden" },
  scroll: { overflow: "scroll" },
  visible: { overflow: "visible" },
  autoClip: { overflow: "auto clip" },
  autoHidden: { overflow: "auto hidden" },
  autoScroll: { overflow: "auto scroll" },
  autoVisible: { overflow: "auto visible" },
  clipAuto: { overflow: "clip auto" },
  clipHidden: { overflow: "clip hidden" },
  clipScroll: { overflow: "clip scroll" },
  clipVisible: { overflow: "clip visible" },
  hiddenAuto: { overflow: "hidden auto" },
  hiddenClip: { overflow: "hidden clip" },
  hiddenScroll: { overflow: "hidden scroll" },
  hiddenVisible: { overflow: "hidden visible" },
  scrollAuto: { overflow: "scroll auto" },
  scrollClip: { overflow: "scroll clip" },
  scrollHidden: { overflow: "scroll hidden" },
  scrollVisible: { overflow: "scroll visible" },
  visibleAuto: { overflow: "visible auto" },
  visibleClip: { overflow: "visible clip" },
  visibleHidden: { overflow: "visible hidden" },
  visibleScroll: { overflow: "visible scroll" },

  snap: { scrollSnapType: "both" },
  snapNone: { scrollSnapType: "none" },
  // snapX: { scrollSnapType: "x" },        
  // snapY: { scrollSnapType: "y" },
  snapBlock: { scrollSnapType: "block" },
  snapInline: { scrollSnapType: "inline" },
  snapMandatory: { scrollSnapType: "both mandatory" },
  // snapXMandatory: { scrollSnapType: "x mandatory" },
  // snapYMandatory: { scrollSnapType: "y mandatory" },
  snapBlockMandatory: { scrollSnapType: "block mandatory" },
  snapInlineMandatory: { scrollSnapType: "inline mandatory" },
};

const BOX_ITEM = {
  scrollMargin: LogicalFour("scrollMargin", LengthPercent),

  snapAlways: { scrollSnapStop: "always" },
  snapNormal: { scrollSnapStop: "normal" },

  snapStart: { scrollSnapAlign: "start" },
  snapStartCenter: { scrollSnapAlign: "start center" },
  snapStartEnd: { scrollSnapAlign: "start end" },
  snapCenter: { scrollSnapAlign: "center" },
  snapCenterStart: { scrollSnapAlign: "center start" },
  snapCenterEnd: { scrollSnapAlign: "center end" },
  snapEnd: { scrollSnapAlign: "end" },
  snapEndStart: { scrollSnapAlign: "end start" },
  snapEndCenter: { scrollSnapAlign: "end center" },
  snapNone: { scrollSnapAlign: "none" },
};

// if the box has scroll snap type, then overflow should be auto, if it is unset.
// or, we should throw an error if this is the case. That we have snapType, but not overflow set to auto or scroll.
// which is better?

const box = FunctionBasedOnValueTypes(BOX, {}, {}, res => Object.assign({}, ...Object.values(res)));
const boxItem = FunctionBasedOnValueTypes(BOX_ITEM, {}, {}, res => Object.assign({}, ...Object.values(res)));

export const SHORTS = {
  ...Object.fromEntries(Object.keys(PROPS.Box).map(k => [k])),
  ...Object.fromEntries(Object.keys(PROPS.BoxItem).map(k => [k])),
  box,
  boxItem,
  Box: FunctionWithDefaultValues(PROPS.Box, box),
  BoxItem: FunctionWithDefaultValues(PROPS.BoxItem, boxItem),
};