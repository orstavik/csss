import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional, OptionalReset, DisplayMode, ValueReverse, normalizeToLogical } = CssFunctions;

const DefaultIBlock = {
  display: "inline-block",
  padding: "unset",
};

const paddingProps = {
  padding: undefined,
  paddingBlock: undefined,
  paddingInline: undefined,
  paddingBlockStart: undefined,
  paddingInlineStart: undefined,
  paddingBlockEnd: undefined,
  paddingInlineEnd: undefined,
  paddingTop: undefined,
  paddingRight: undefined,
  paddingBottom: undefined,
  paddingLeft: undefined,
};

const iBlock = TypeBasedFunction(
  LogicalFour("padding", "padding", LengthPercent)
);

const IBlock = FunctionWithDefaultValues(DefaultIBlock, iBlock);

export default {
  csss: {
    iBlock,
    IBlock
  },
  props: {
    display: undefined,
    ...paddingProps,
  },
  css: {
    iBlock: style => {
      if (style.display && style.display !== "inline-block" && style.display !== "unset") return;
      const isIBlock = style.display === "inline-block";
      const normalized = normalizeToLogical(style);
      const paddingRev = LogicalFourReverse("padding", "padding", ValueReverse, "_")(normalized);
      if (paddingRev) return `${isIBlock ? "$IBlock" : "$iBlock"}(${paddingRev})`;
      const hasExplicitUnset = Object.keys(paddingProps).some(p => style.hasOwnProperty(p) && (style[p] === "unset" || style[p] === "initial"));
      if (!hasExplicitUnset) return undefined;
      return isIBlock ? "$IBlock" : "$iBlock";
    },
  }
};
