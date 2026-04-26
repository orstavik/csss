import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, LogicalFour, ParseFirstThenRest, FunctionWithDefaultValues } = CsssFunctions;
const { NumberInterpreter, LengthPercent } = CsssPrimitives;
const { LogicalFourReverse, Optional, ValueReverse, normalizeToLogical } = CssFunctions;

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
      if (style.display && style.display !== "-webkit-box" && style.display !== "unset") return;
      return Optional("$lineClamp", "$LineClamp", DefaultLineClamp,
        { prop: "WebkitLineClamp", rev: s => ValueReverse(s.WebkitLineClamp) },
        { prop: Object.keys(paddingProps), rev: LogicalFourReverse("padding", "padding", ValueReverse, "_") }
      )(normalizeToLogical(style));
    },
  }
};
