import { ValueTypes, FunctionTypes } from "./func.js";
const { LogicalFour, FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, TypeBasedFunction } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;

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
  scrollPadding: LogicalFour("scrollPadding", LengthPercent),
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
