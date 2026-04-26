import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, Span } = CsssPrimitives;
const { LogicalFourReverse, Optional, ValueReverse, normalizeToLogical, ShorthandPairReverse } = CssFunctions;

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
const reversePlaceSelf = ShorthandPairReverse(placeSelf, "alignSelf", "justifySelf");

const reverseGridPlacement = (fnName, startProp, endProp) => style => {
  const start = style[startProp];
  const end = style[endProp];
  const s = start && start !== "unset" ? start : null;
  const e = end && end !== "unset" && end !== "auto" ? end : null;
  if (!s && !e) return undefined;
  const fmt = v => {
    if (!v) return "_";
    const m = v.match(/^span\s+(.+)$/);
    return m ? `span(${m[1]})` : v;
  };
  return e ? `${fnName}(${fmt(s)},${fmt(e)})` : `${fnName}(${fmt(s)})`;
};

export default {
  csss: {
    gridItem,
    GridItem,
  },
  props: {
    display: undefined,
    ...marginProps,
    placeSelf: undefined,
    alignSelf: undefined,
    justifySelf: undefined,
    gridColumn: undefined,
    gridColumnStart: undefined,
    gridColumnEnd: undefined,
    gridRow: undefined,
    gridRowStart: undefined,
    gridRowEnd: undefined,
  },
  css: {
    gridItem: style => {
      const isSet = v => v && v !== "unset" && v !== "auto";
      if (!(isSet(style.gridColumnStart) || isSet(style.gridColumnEnd) || isSet(style.gridRowStart) || isSet(style.gridRowEnd) || isSet(style.gridColumn) || isSet(style.gridRow) || isSet(style.justifySelf))) return;
      return Optional("$gridItem", "$GridItem", DefaultGridItem,
        { prop: Object.keys(marginProps), rev: LogicalFourReverse("margin", "margin", ValueReverse, "_") },
        { prop: ["placeSelf", "alignSelf", "justifySelf"], rev: reversePlaceSelf },
        { prop: ["gridColumn", "gridColumnStart", "gridColumnEnd"], rev: reverseGridPlacement("column", "gridColumnStart", "gridColumnEnd") },
        { prop: ["gridRow", "gridRowStart", "gridRowEnd"], rev: reverseGridPlacement("row", "gridRowStart", "gridRowEnd") }
      )(normalizeToLogical(style));
    },
  }
};
