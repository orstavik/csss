import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, FunctionPropertyType, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, NumberInterpreter } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SingleArgumentFunctionReverse, Optional } = CssFunctions;

const alignSelf = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline"
);

const DefaultFlexItem = {
  margin: "unset",
  flexBasis: "unset",
  flexGrow: "unset",
  flexShrink: "unset",
  alignSelf: "unset",
  order: "unset",
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

const flexItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("alignSelf", alignSelf),
  FunctionPropertyType("basis", "flexBasis", LengthPercentAuto),
  FunctionPropertyType("grow", "flexGrow", NumberInterpreter),
  FunctionPropertyType("shrink", "flexShrink", NumberInterpreter),
  FunctionPropertyType("order", "order", NumberInterpreter)
);

const FlexItem = FunctionWithDefaultValues(DefaultFlexItem, flexItem);

export default {
  csss: {
    flexItem,
    FlexItem,
  },
  props: {
    ...marginProps,
    alignSelf: undefined,
    flexBasis: undefined,
    flexGrow: undefined,
    flexShrink: undefined,
    order: undefined,
  },
  css: {
    flexItem: Optional("flexItem",
      LogicalFourReverse("margin", "margin", v => v, "_"),
      SingleTableReverse("alignSelf", alignSelf),
      SingleArgumentFunctionReverse("basis", "flexBasis", v => v, "_"),
      SingleArgumentFunctionReverse("grow", "flexGrow", v => v, "_"),
      SingleArgumentFunctionReverse("shrink", "flexShrink", v => v, "_"),
      SingleArgumentFunctionReverse("order", "order", v => v, "_")
    ),
  }
};
