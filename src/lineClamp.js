import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { TypeBasedFunction, LogicalFour, ParseFirstThenRest, FunctionWithDefaultValues } = CsssFunctions;
const { NumberInterpreter, LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional } = CssFunctions;

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
    lineClamp: Optional("lineClamp",
      style => style.WebkitLineClamp === undefined ? undefined : style.WebkitLineClamp,
      LogicalFourReverse("padding", "padding", v => v, "_")
    ),
  }
};
