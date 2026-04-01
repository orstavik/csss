import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, Span } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const placeSelf = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline",
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly"
);

const DefaultGridItem = {
  margin: "unset",
  gridColumn: "unset",
  gridRow: "unset",
  placeSelf: "unset",
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

const gridItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("placeSelf", placeSelf),
  SF2("column/1-2", [Span], (n, ar) => ({ gridColumn: ar.join(" / ") })),
  SF2("row/1-2", [Span], (n, ar) => ({ gridRow: ar.join(" / ") }))
);

const GridItem = FunctionWithDefaultValues(DefaultGridItem, gridItem);

export default {
  csss: {
    gridItem,
    GridItem,
  },
  props: {
    ...marginProps,
    placeSelf: undefined,
    gridColumn: undefined,
    gridRow: undefined,
  },
  css: {
    gridItem: Optional("gridItem",
      LogicalFourReverse("margin", "margin", v => v, "_"),
      SingleTableReverse("placeSelf", placeSelf),
      SequentialFunctionReverse("column", ["gridColumn"], v => v, "_"),
      SequentialFunctionReverse("row", ["gridRow"], v => v, "_")
    ),
  }
};
