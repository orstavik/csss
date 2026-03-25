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

const OVERFLOWS = (_ => {
  const SETTINGS = {
    Visible: { overflow: "visible" },
    Hidden: { overflow: "hidden" },
    Clip: { overflow: "clip" },
    Auto: { overflow: "auto" },
    Scroll: { overflow: "scroll" },
    Snap: { overflow: "auto", scrollSnapType: "both" },
    SnapMandatory: { overflow: "auto", scrollSnapType: "both mandatory" },
    ScrollSnap: { overflow: "scroll", scrollSnapType: "both" },
    ScrollSnapMandatory: { overflow: "scroll", scrollSnapType: "both mandatory" },
  };
  const res = {};
  for (let [A, a] of Object.entries(SETTINGS)) {
    res["overflow" + A] = a;
    for (let [B, b] of Object.entries(SETTINGS)) {
      if (A == B) continue;
      res["overflow" + A + B] = { overflow: a.overflow + " " + b.overflow };
      if (a.scrollSnapType && b.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = "both" + (A.endsWith("Mandatory") || B.endsWith("Mandatory") ? " mandatory" : "");
      else if (a.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = a.scrollSnapType.replace("both", "block")
      else if (b.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = b.scrollSnapType.replace("both", "inline");
    }
  }
  return res;
})();

const BOX = {
  inline: SequentialFunction("inline/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { inlineSize: ar[0] } : { minInlineSize: ar[0], inlineSize: ar[1], maxInlineSize: ar[2] ?? "unset" }),
  block: SequentialFunction("block/1-3", [LengthPercentUnset], (_, ar) =>
    ar.length === 1 ? { blockSize: ar[0] } : { minBlockSize: ar[0], blockSize: ar[1], maxBlockSize: ar[2] ?? "unset" }),
  scrollPadding: LogicalFour("scrollPadding", LengthPercent),
  ...OVERFLOWS,
};

const scrollSnapStop = {
  snapAlways: "always",
  snapNormal: "normal",
};
const scrollSnapAlign = {
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
};

const BOX_ITEM = {
  scrollMargin: LogicalFour("scrollMargin", LengthPercent),
  scrollSnapAlign: WordToValue("scrollSnapAlign", scrollSnapAlign),
  scrollSnapStop: WordToValue("scrollSnapStop", scrollSnapStop),
};

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