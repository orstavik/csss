import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, ValueReverse } = CssFunctions;

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
    block: style => {
      if (style.display === "none") return "$displayNone";
      if (style.display !== "block" || style.display === undefined) return;
      const rev = LogicalFourReverse("padding", "padding", ValueReverse)(style);
      const args = [rev].filter(Boolean);
      const unsets = [
        ...Object.keys(DefaultBlock),
        ...Object.keys(paddingProps)
      ].filter(k => style[k] === "unset" || style[k] === "initial").length;
      // if (!unsets) return;
      const name = style.display === "block" && args.length + unsets >= 1 ? "$Block" : "$block";
      return `${name}(${args.join(",")})`;
    }
  }
};
