import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, Span } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, ValueReverse, TableReverse } = CssFunctions;

const placeSelf = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline",
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly"
);
const placeSelfReverse = TableReverse(placeSelf);

const DefaultGridItem = {
  margin: "unset",
  gridColumn: "unset",
  gridRow: "unset",
  placeSelf: "unset"
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

/** Keys to count toward umbrella `$GridItem` vs `$gridItem`; browsers expose longhands (`gridRowStart`) not always `gridRow` / `placeSelf`. */
const gridItemUnsetKeys = [...new Set([
  ...Object.keys(DefaultGridItem),
  ...Object.keys(marginProps),
  "alignSelf",
  "justifySelf",
  "gridColumnStart",
  "gridColumnEnd",
  "gridRowStart",
  "gridRowEnd",
])];

function spanReverse(val) {
  if (!val) return;
  return val.replace(/span (\S+)/, (_, n) => `span(${n})`);
}

/** Like ValueReverse but keeps `auto` as `auto` (not `_`) and drops unset/initial. */
function lineRev(val) {
  if (val == null || /^(unset|initial)$/i.test(String(val))) return;
  return String(val).toLowerCase() === "auto" ? "auto" : ValueReverse(val);
}

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
    gridItem: (style, parentStyle) => {
      if (parentStyle?.display !== "grid") return;
      const marginRev = LogicalFourReverse("margin", "margin", ValueReverse)(style);
      let { placeSelf: ps, gridColumnStart, gridColumnEnd, gridRowStart, gridRowEnd, alignSelf, justifySelf } = style;
      let gc = [gridColumnStart, gridColumnEnd].map(lineRev).filter(Boolean).map(spanReverse).join(",") || undefined;
      let gr = [gridRowStart, gridRowEnd].map(lineRev).filter(Boolean).map(spanReverse).join(",") || undefined;
      const [as, js] = [alignSelf, justifySelf].map(ValueReverse);
      ps ||= as && (as === js ? as : [as, js].filter(Boolean).join(" "));
      ps &&= placeSelfReverse[ps];
      gc &&= `column(${(gc)})`;
      gr &&= `row(${(gr)})`;
      const args = [marginRev, ps, gc, gr].filter(Boolean);
      const unsets = gridItemUnsetKeys.filter(
        k => style[k] === "unset" || style[k] === "initial"
      ).length;
      if (!args.length && !unsets) return;
      const name = args.length + unsets >= 4 ? "$GridItem" : "$gridItem";
      return `${name}(${args.join(",")})`;
    }
  }
};
