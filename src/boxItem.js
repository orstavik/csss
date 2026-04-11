import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional } = CssFunctions;

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
  props: {
    ...scrollMarginProps,
    scrollSnapAlign: undefined,
    scrollSnapStop: undefined,
  },
  css: {
    boxItem: Optional("boxItem",
      LogicalFourReverse("scrollMargin", "scrollMargin", v => v, "_"),
      SingleTableReverse("scrollSnapAlign", scrollSnapAlign),
      SingleTableReverse("scrollSnapStop", scrollSnapStop),
    ),
  }
};