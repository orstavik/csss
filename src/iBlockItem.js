import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, TableReverse, ValueReverse } = CssFunctions;

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
const floatReverse = TableReverse(float);
const clearReverse = TableReverse(clear);
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
    iBlockItem: (style, parentStyle) => {
      if (parentStyle?.display !== "inline-block") return;
      const rev = LogicalFourReverse("margin", "margin", ValueReverse)(style);
      let { float: floatVal, clear: clearVal } = style;
      floatVal &&= floatReverse[floatVal];
      clearVal &&= clearReverse[clearVal];
      const args = [rev, floatVal, clearVal].filter(Boolean);
      if (!args.length) return;
      const unsets = Object.keys(DefaultIBlockItem).filter(k => style[k] === "unset" || style[k] === "initial").length;
      const name = args.length + unsets >= 3 ? "$IBlockItem" : "$iBlockItem";
      return `${name}(${args.join(",")})`;
    }
  }
};
