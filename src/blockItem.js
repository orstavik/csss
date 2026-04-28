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

const DefaultBlockItem = {
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

const blockItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("float", float),
  SingleTable("clear", clear),
);

const BlockItem = FunctionWithDefaultValues(DefaultBlockItem, blockItem);
const floatReverse = CssFunctions.TableReverse(float);
const clearReverse = CssFunctions.TableReverse(clear);
export default {
  csss: {
    blockItem,
    BlockItem
  },
  props: {
    ...marginProps,
    float: undefined,
    clear: undefined,
    verticalAlign: undefined,
  },
  css: {
    blockItem: style => {
      const rev = LogicalFourReverse("margin", "margin", ValueReverse)(style);
      let { float: floatVal, clear: clearVal } = style;
      floatVal &&= floatReverse[floatVal];
      clearVal &&= clearReverse[clearVal];
      const args = [rev, floatVal, clearVal].filter(Boolean);
      if (!args.length) return;
      const unsets = Object.entries(style).filter(([k, v]) => v === "unset" || v === "initial").length;
      const name = args.length + unsets >= 3 ? "$BlockItem" : "$blockItem";
      return `${name}(${args.join(",")})`;
    }
  }
};
