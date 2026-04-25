import { CsssPrimitives, CsssFunctions, CssFunctions, matchArgsWithInterpreters } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional, OptionalReset, ValueReverse, normalizeToLogical, DisplayMode } = CssFunctions;

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
const scrollMarginReverse = (style) => {
  const { scrollMarginTop, scrollMarginRight, scrollMarginBottom, scrollMarginLeft } = style;
  const allSame = (
    scrollMarginTop === scrollMarginRight &&
    scrollMarginTop === scrollMarginBottom &&
    scrollMarginTop === scrollMarginLeft
  );
  if (allSame && scrollMarginTop !== undefined) {
    return `scrollMargin(${scrollMarginTop})`;
  }
  return LogicalFourReverse("scroll-margin", "scrollMargin", ValueReverse, "_")(style);
};
const BoxItem = FunctionWithDefaultValues(DefaultBoxItem, boxItem);

const scrollSnapAlignReverse = Object.fromEntries(Object.entries(scrollSnapAlign).map(([k, v]) => [v, k]));

const scrollSnapStopReverse = Object.fromEntries(Object.entries(scrollSnapStop).map(([k, v]) => [v, k]));
const scrollMargin = LogicalFourReverse("scroll-margin", "scrollMargin", ValueReverse, "_");

export default {
  csss: {
    boxItem,
    BoxItem
  },
  props,
  css: {
    boxItem: style => {
      const normalized = normalizeToLogical(style);
      return OptionalReset("$boxItem", "$BoxItem", DefaultBoxItem,
        { prop: ["scrollMargin", "scrollMarginTop", "scrollMarginRight", "scrollMarginBottom", "scrollMarginLeft", "scrollMarginBlockStart", "scrollMarginInlineStart", "scrollMarginBlockEnd", "scrollMarginInlineEnd"], rev: LogicalFourReverse("scroll-margin", "scrollMargin", ValueReverse, "_") },
        { prop: "scrollSnapAlign", rev: style => scrollSnapAlignReverse[style.scrollSnapAlign] },
        { prop: "scrollSnapStop", rev: style => scrollSnapStopReverse[style.scrollSnapStop] }
      )(normalized);
    },
  }
};
