import { CsssPrimitives, CsssFunctions} from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, Repeat } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, TableReverse, ValueReverse } = CssFunctions;

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
const gapReverse = style => {
  const { rowGap, columnGap, gap } = style;
  const r = ValueReverse(rowGap ?? gap);
  const c = ValueReverse(columnGap ?? gap);
  if (!r && !c) return undefined;
  if (r === c) return `gap(${r})`;
  return `gap(${r},${c})`;
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
const gridAutoFlowReverse = TableReverse(gridAutoFlow);
const placeContentReverse = TableReverse(placeContent);

function gridTemplateReverse(val, type) {
  if (!val || val === "unset" || val === "initial") return;
  const parts = val.includes("(")
    ? [val]
    : val.split(" ");
  const reversed = parts.filter(Boolean);
  if (!reversed.length) return;
  return `${type}(${reversed.join(",")})`;
}
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
    grid: style => {
      if (style.display !== "grid") return;
      const paddingRev = LogicalFourReverse("padding", "padding", ValueReverse)(style);
      let { placeContent: pc, gridTemplateColumns: cols, gridTemplateRows: rows,
        gridTemplateAreas: areas, gridAutoFlow: autoFlow, alignContent, justifyContent } = style;
      const [ac, jc] = [alignContent, justifyContent].map(ValueReverse);
      pc ||= ac && (ac === jc ? ac : [ac, jc].filter(Boolean).join(" "));
      pc &&= placeContentReverse[pc];
      cols &&= gridTemplateReverse(cols, "cols");
      rows &&= gridTemplateReverse(rows, "rows");
      areas &&= gridTemplateReverse(areas, "areas");
      const gapRev = (style.gap || style.rowGap || style.columnGap) && gapReverse(style);
      autoFlow &&= gridAutoFlowReverse[autoFlow];
      const args = [paddingRev, pc, cols, rows, areas, gapRev, autoFlow].filter(Boolean);
      const unsets = Object.keys(DefaultGrid).filter(k => style[k] === "unset" || style[k] === "initial").length;
      if (!args.length && !unsets) return;
      const name = style.display === "grid" && args.length + unsets >= 4 ? "$Grid" : "$grid";
      return `${name}(${args.join(",")})`;
    }
  }
};
