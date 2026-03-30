import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, Optional } = CssFunctions;

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
    ...marginProps,
    float: undefined,
    clear: undefined,
    verticalAlign: undefined,
  },
  css: {
    iBlockItem: Optional("iBlockItem",
      LogicalFourReverse("margin", "margin", v => v, "_"),
      SingleTableReverse("float", float),
      SingleTableReverse("clear", clear)
    ),
  }
};
