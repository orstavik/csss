import { CssFunctions } from "./funcReverse.js";
import { CsssPrimitives, CsssFunctions } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional, ValueReverse, normalizeToLogical, DisplayMode } = CssFunctions;

const float = {
  floatStart: "inline-start",
  floatEnd: "inline-end",
};

const clear = {
  clearStart: "inline-start",
  clearEnd: "inline-end",
  clear: "both",
  clearNone: "none",
};

const DefaultBlockItem = {
  margin: "unset",
  float: "unset",
  clear: "unset"
};

const marginProps = {
  margin: undefined,
  marginBlock: undefined,
  marginInline: undefined,
  marginBlockStart: undefined,
  marginInlineStart: undefined,
  marginBlockEnd: undefined,
  marginInlineEnd: undefined,
  marginTop: undefined,
  marginRight: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
};

const blockItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("float", float),
  SingleTable("clear", clear),
);

const BlockItem = FunctionWithDefaultValues(DefaultBlockItem, blockItem);

export default {
  csss: {
    blockItem,
    BlockItem
  },
  props: {
    display: undefined,
    ...marginProps,
    float: undefined,
    clear: undefined,
    verticalAlign: undefined,
  },
  css: {
    blockItem: style => Optional("$blockItem", "$BlockItem", DefaultBlockItem,
        { prop: Object.keys(marginProps), rev: LogicalFourReverse("margin", "margin", ValueReverse, "_") },
        { prop: "float", rev: SingleTableReverse("float", float) },
        { prop: "clear", rev: SingleTableReverse("clear", clear) }
      )(normalizeToLogical(style)),
  }
};
