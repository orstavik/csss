import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional } = CssFunctions;

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
    iBlock: Optional("iBlock",
      LogicalFourReverse("padding", "padding", v => v, "_")
    ),
  }
};
