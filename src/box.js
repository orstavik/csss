import { ValueTypes, FunctionTypes, Interpreters } from "./func.js";
const { basic: isBasic } = Interpreters;
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;

function toSize(NAME, { args }) {
  if (args.length != 1 && args.length != 3)
    throw new SyntaxError(`$${NAME}() accepts only 1 or 3 arguments, got ${args.length}.`);
  args = args.map(a =>
    a.text == "_" ? "unset" :
      isBasic(a).text
  );
  if (args.length === 1)
    return { [NAME]: args[0] };
  const NAME2 = NAME[0].toUpperCase() + NAME.slice(1);
  return {
    ["min" + NAME2]: args[0],
    [NAME]: args[1],
    ["max" + NAME2]: args[2]
  };
}

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
  inline: toSize.bind(null, "inlineSize"),
  block: toSize.bind(null, "blockSize"),
  scrollPadding: LogicalFour("scroll-padding", LengthPercent),
  ...OVERFLOWS,
};

const BOX_ITEM = {
  scrollMargin: LogicalFour("scroll-margin", LengthPercent),
  snapStart: { scrollSnapAlign: "start" },
  snapStartCenter: { scrollSnapAlign: "start center" },
  snapStartEnd: { scrollSnapAlign: "start end" },
  snapCenter: { scrollSnapAlign: "center" },
  snapCenterStart: { scrollSnapAlign: "center start" },
  snapCenterEnd: { scrollSnapAlign: "center end" },
  snapEnd: { scrollSnapAlign: "end" },
  snapEndStart: { scrollSnapAlign: "end start" },
  snapEndCenter: { scrollSnapAlign: "end center" },
  noSnap: { scrollSnapAlign: "none" },
  snapStop: { scrollSnapStop: "always" },
};

const DEFAULTS = {
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

const box = FunctionBasedOnValueTypes(BOX, {}, {}, res => Object.assign({}, ...Object.values(res)));
const boxItem = FunctionBasedOnValueTypes(BOX_ITEM, {}, {}, res => Object.assign({}, ...Object.values(res)));

export default {
  box,
  boxItem,
  Box: FunctionWithDefaultValues(DEFAULTS.Box, box),
  BoxItem: FunctionWithDefaultValues(DEFAULTS.BoxItem, boxItem),
  inlineSize: undefined,
  blockSize: undefined,
  minInlineSize: undefined,
  maxInlineSize: undefined,
  minBlockSize: undefined,
  maxBlockSize: undefined,
  overflow: undefined,
  scrollPadding: undefined,
  scrollSnapType: undefined,
  scrollMargin: undefined,
  scrollSnapAlign: undefined,
  scrollSnapStop: undefined,
};
