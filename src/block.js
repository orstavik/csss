import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, OptionalReset, ValueReverse, normalizeToLogical, DisplayMode } = CssFunctions;

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
        const normalized = normalizeToLogical(style);
        if (style.display === "none") return "$displayNone";
        if (style.display && style.display !== "block" && style.display !== "unset") return undefined;
        
        const isBlock = style.display === "block";
        const paddingRev = LogicalFourReverse("padding", "padding", ValueReverse, "_")(normalized);
        
        if (paddingRev) {
           const name = isBlock ? "$Block" : "$block";
           return `${name}(${paddingRev})`;
        }
        
        const hasExplicitUnset = Object.keys(paddingProps).some(p => style.hasOwnProperty(p) && (style[p] === "unset" || style[p] === "initial"));
        if (!hasExplicitUnset) return undefined;

        return isBlock ? "$Block" : "$block";
    }
  }
};
