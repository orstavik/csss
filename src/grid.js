import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, Repeat } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const gridAutoFlow = {
  column: "column",
  dense: "dense row",
  denseColumn: "dense column",
  denseRow: "dense row",
};

const DefaultGrid = {
  display: "grid",
  padding: "unset",
  placeItems: "unset",
  placeContent: "unset",
  gridTemplateColumns: "unset",
  gridTemplateRows: "unset",
  gridTemplateAreas: "unset",
  gap: "unset",
  gridAutoFlow: "unset",
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

const alignBlock = "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline";
const alignInline = "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly";
const placeContent = CssValuesToCsssTable(alignBlock, alignInline);

const grid = TypeBasedFunction(
  LogicalFour("padding", "padding", LengthPercent),
  SingleTable("placeContent", placeContent),
  SF2("cols/1-", [Repeat], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  SF2("columns/1-", [Repeat], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  SF2("rows/1-", [Repeat], (n, ar) => ({ gridTemplateRows: ar.join(" ") })),
  SF2("areas/1-", [Repeat], (n, ar) => ({ gridTemplateAreas: ar.join(" ") })),
  SF2("gap/1-2", [LengthPercentUnset], (n, ar) => ({ gap: ar.map(a => a ?? 0).join(" ") })),
  SingleTable("gridAutoFlow", gridAutoFlow)
);

const Grid = FunctionWithDefaultValues(DefaultGrid, grid);

export default {
  csss: {
    grid,
    Grid
  },
  props: {
    display: undefined,
    ...paddingProps,
    placeContent: undefined,
    placeItems: undefined,
    gridTemplateColumns: undefined,
    gridTemplateRows: undefined,
    gridTemplateAreas: undefined,
    gap: undefined,
    rowGap: undefined,
    columnGap: undefined,
    gridAutoFlow: undefined,
  },
  css: {
    grid: Optional("grid",
      LogicalFourReverse("padding", "padding", v => v, "_"),
      SingleTableReverse("placeContent", placeContent),
      SequentialFunctionReverse("columns", ["gridTemplateColumns"], v => v, "_"), // can't reliably output cols/columns
      SequentialFunctionReverse("rows", ["gridTemplateRows"], v => v, "_"),
      SequentialFunctionReverse("areas", ["gridTemplateAreas"], v => v, "_"),
      SequentialFunctionReverse("gap", ["rowGap", "columnGap"], v => v, "_"),
      SingleTableReverse("gridAutoFlow", gridAutoFlow)
    ),
  }
};
