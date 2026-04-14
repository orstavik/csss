import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional } = CssFunctions;

const DefaultBlock = {
  display: "block",
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

const block = TypeBasedFunction(
  LogicalFour("padding", "padding", LengthPercent)
);

const Block = FunctionWithDefaultValues(DefaultBlock, block);

export default {
  csss: {
    block,
    Block
  },
  props: {
    display: undefined,
    ...paddingProps,
  },
  css: {
    block: Optional("block",
      LogicalFourReverse("padding", "padding", v => v, "_")
    ),
  }
};
