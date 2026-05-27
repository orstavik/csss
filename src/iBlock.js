import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, ValueReverse } = CssFunctions;

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
      if (style.display !== "inline-block" && style.display !== undefined) return;
      const rev = LogicalFourReverse("padding", "padding", ValueReverse)(style);
      const args = [rev].filter(Boolean);
      const unsets = Object.keys(DefaultIBlock).filter(k => style[k] === "unset" || style[k] === "initial").length;
      if (!args.length && !unsets) return;
      const name = style.display === "inline-block" && args.length + unsets >= 1 ? "$IBlock" : "$iBlock";
      return `${name}(${args.join(",")})`;
    }
  }
};
