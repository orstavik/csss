import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, LogicalFour, ParseFirstThenRest, FunctionWithDefaultValues } = CsssFunctions;
const { NumberInterpreter, LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, ValueReverse } = CssFunctions;

const DefaultLineClamp = {
  display: "-webkit-box",
  padding: "unset",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflowBlock: "hidden",
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

const lineClamp = ParseFirstThenRest(NumberInterpreter, block, (a, b) => {
  return { ...DefaultLineClamp, WebkitLineClamp: a, ...(b ?? {}) };
});

const LineClamp = FunctionWithDefaultValues(DefaultLineClamp, lineClamp);

export default {
  csss: {
    lineClamp,
    LineClamp
  },
  props: {
    display: undefined,
    ...paddingProps,
    WebkitLineClamp: undefined,
    WebkitBoxOrient: undefined,
    overflowBlock: undefined,
  },
  css: {
    lineClamp: style => {
      let count = style.WebkitLineClamp;
      if (count === undefined || count === "unset") return;
      let rev = LogicalFourReverse("padding", "padding", ValueReverse, "_")(style);
      return `$lineClamp(${count}${rev ? "," + rev : ""})`;
    },
  }
};
