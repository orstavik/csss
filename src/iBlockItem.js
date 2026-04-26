import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional, ValueReverse, normalizeToLogical } = CssFunctions;

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

const DefaultIBlockItem = {
  margin: "unset",
  float: "unset",
  clear: "unset",
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

const iBlockItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("float", float),
  SingleTable("clear", clear)
);

const IBlockItem = FunctionWithDefaultValues(DefaultIBlockItem, iBlockItem);

export default {
  csss: {
    iBlockItem,
    IBlockItem
  },
  props: {
    display: undefined,
    ...marginProps,
    float: undefined,
    clear: undefined,
    verticalAlign: undefined,
  },
  css: {
    iBlockItem: style => Optional("$iBlockItem", "$IBlockItem", DefaultIBlockItem,
        { prop: "margin", rev: LogicalFourReverse("margin", "margin", ValueReverse, "_") },
        { prop: "float", rev: SingleTableReverse("float", float) },
        { prop: "clear", rev: SingleTableReverse("clear", clear) }
      )(normalizeToLogical(style))
  }
};
