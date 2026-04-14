import { CsssPrimitives, CsssFunctions, CssFunctions, matchArgsWithInterpreters } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional } = CssFunctions;

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

const scrollSnapAlignReverse = Object.fromEntries(Object.entries(scrollSnapAlign).map(([k, v]) => [v, k]));

const scrollSnapStopReverse = Object.fromEntries(Object.entries(scrollSnapStop).map(([k, v]) => [v, k]));
const scrollMargin = LogicalFourReverse("scroll-margin", "scrollMargin", v => v, "_");

export default {
  csss: {
    boxItem,
    BoxItem
  },
  props,
  css: {
    boxItem: style => {
      const margin = scrollMargin(style);
      const snapAlign = scrollSnapAlignReverse[style["scroll-snap-align"]];
      const snapStop = scrollSnapStopReverse[style["scroll-snap-stop"]];
      const bigB = margin && (snapAlign || style["scroll-snap-align"]) && (snapStop || style["scroll-snap-stop"] === "unset");
      const res = [margin, snapAlign, snapStop].filter(Boolean);
      return !res.length ? undefined : `$${bigB ? "B" : "b"}oxItem(${res.join(",")})`;
    },
  }
};