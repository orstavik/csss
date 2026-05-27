import { CsssPrimitives, CsssFunctions, matchArgsWithInterpreters } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, ValueReverse } = CssFunctions;

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
const scrollMargin = LogicalFourReverse("scroll-margin", "scrollMargin",ValueReverse, "_");

export default {
  csss: {
    boxItem,
    BoxItem
  },
  props,
  css: {
    boxItem: (style, parentStyle) => {
      // debugger
      const margin = scrollMargin(style);
      const snapAlign = scrollSnapAlignReverse[style["scrollSnapAlign"]];
      const snapStop = scrollSnapStopReverse[style["scrollSnapStop"]];
      const res = [margin, snapAlign, snapStop].filter(Boolean);
      if (!res.length) return;
      const unsets = [
        ...Object.keys(DefaultBoxItem),
        ...Object.keys(scrollMarginProps)
      ].filter(k => style[k] === "unset" || style[k] === "initial");
      const name = res.length + unsets.length >= 3 ? "BoxItem" : "boxItem";
      return `$${name}(${res.join(",")})`;
    },
  }
};
