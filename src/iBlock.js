import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional, DisplayMode, ValueReverse, normalizeToLogical } = CssFunctions;

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
      return Optional("$iBlock", "$IBlock", DefaultIBlock,
        { prop: ["display", ...Object.keys(paddingProps)], rev: LogicalFourReverse("padding", "padding", ValueReverse, "_") }
      )(normalizeToLogical(style));
    }
  }
};
