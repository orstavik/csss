import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, Repeat } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional, ValueReverse, normalizeToLogical, ShorthandPairReverse } = CssFunctions;

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

/** Split a CSS grid track list (space-separated at top level) into comma-joined CSSS args. */
function cssTrackToArgs(value) {
  if (!value || value === "unset" || value === "none") return undefined;
  const parts = [];
  let depth = 0, cur = "";
  for (const c of value) {
    if (c === "(") { depth++; cur += c; }
    else if (c === ")") { depth--; cur += c; }
    else if (c === " " && depth === 0) {
      if (cur) parts.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  if (cur) parts.push(cur);
  return parts.length ? parts.map(p => p.replace(/,\s*/g, ",")).join(",") : undefined;
}

const reverseTrack = (fnName, prop) => style => {
  const args = cssTrackToArgs(style[prop]);
  return args ? `${fnName}(${args})` : undefined;
};

const reversePlaceContent = ShorthandPairReverse(placeContent, "alignContent", "justifyContent");

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
      if (style.display && style.display !== "grid" && style.display !== "unset") return;
      return Optional("$grid", "$Grid", DefaultGrid,
        { prop: Object.keys(paddingProps), rev: LogicalFourReverse("padding", "padding", ValueReverse, "_") },
        { prop: ["alignContent", "justifyContent"], rev: reversePlaceContent },
        { prop: "gridTemplateColumns", rev: reverseTrack("cols", "gridTemplateColumns") },
        { prop: "gridTemplateRows", rev: reverseTrack("rows", "gridTemplateRows") },
        { prop: "gridTemplateAreas", rev: reverseTrack("areas", "gridTemplateAreas") },
        { prop: ["rowGap", "columnGap"], rev: SequentialFunctionReverse("gap", ["rowGap", "columnGap"], ValueReverse, "_") },
        { prop: "gridAutoFlow", rev: SingleTableReverse("gridAutoFlow", gridAutoFlow) }
      )(normalizeToLogical(style)) || (style.display && "$Grid")
    },
  }
};
