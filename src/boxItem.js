import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional, ValueReverse, normalizeToLogical } = CssFunctions;

const scrollMarginProps = {
  scrollMargin: undefined,
  scrollMarginBlock: undefined,
  scrollMarginInline: undefined,
  scrollMarginBlockStart: undefined,
  scrollMarginInlineStart: undefined,
  scrollMarginBlockEnd: undefined,
  scrollMarginInlineEnd: undefined,
  scrollMarginTop: undefined,
  scrollMarginRight: undefined,
  scrollMarginBottom: undefined,
  scrollMarginLeft: undefined,
};

const props = {
  display: undefined,
  ...scrollMarginProps,
  scrollSnapAlign: undefined,
  scrollSnapStop: undefined,
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
const scrollSnapStop = {
  snapAlways: "always",
  snapNormal: "normal",
};
const DefaultBoxItem = {
  scrollMargin: "unset",
  scrollSnapAlign: "unset",
  scrollSnapStop: "unset",
};
const boxItem = TypeBasedFunction(
  LogicalFour("scrollMargin", "scrollMargin", LengthPercent),
  SingleTable("scrollSnapAlign", scrollSnapAlign),
  SingleTable("scrollSnapStop", scrollSnapStop)
);
const BoxItem = FunctionWithDefaultValues(DefaultBoxItem, boxItem);

export default {
  csss: {
    boxItem,
    BoxItem
  },
  props,
  css: {
    boxItem: style => Optional("$boxItem", "$BoxItem", DefaultBoxItem,
        { prop: Object.keys(scrollMarginProps), rev: LogicalFourReverse("scroll-margin", "scrollMargin", ValueReverse, "_") },
        { prop: "scrollSnapAlign", rev: SingleTableReverse("scrollSnapAlign", scrollSnapAlign) },
        { prop: "scrollSnapStop", rev: SingleTableReverse("scrollSnapStop", scrollSnapStop) }
      )(normalizeToLogical(style)),
  }
};
