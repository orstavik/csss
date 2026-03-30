import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SequentialFunction, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const alignBlock = "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline";
const alignInline = "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly";

const placeContent = CssValuesToCsssTable(alignBlock, alignInline);

const flexDirection = {
  column: "column",
  columnReverse: "column-reverse",
  rowReverse: "row-reverse",
  row: "row",
};

const flexWrap = {
  wrap: "wrap",
  wrapReverse: "wrap-reverse",
  noWrap: "nowrap",
};

const gap = SequentialFunction("gap/1-2", [LengthPercentUnset], (n, ar) => {
  if (ar[0] == ar[1] || ar.length == 1) return { gap: ar[0] };
  if (ar[1] == "unset") return { rowGap: ar[0] };
  if (ar[0] == "unset") return { columnGap: ar[1] };
  return { gap: ar.join(" ") };
});

const DefaultFlex = {
  display: "flex",
  padding: "unset",
  alignItems: "unset",
  placeContent: "unset",
  flexDirection: "unset",
  flexWrap: "unset",
  gap: "unset",
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

const flex = TypeBasedFunction(
  LogicalFour("padding", "padding", LengthPercent),
  SingleTable("flexDirection", flexDirection),
  SingleTable("flexWrap", flexWrap),
  SingleTable("placeContent", placeContent),
  gap
);

const Flex = FunctionWithDefaultValues(DefaultFlex, flex);

export default {
  csss: {
    flex,
    Flex
  },
  props: {
    display: undefined,
    ...paddingProps,
    flexDirection: undefined,
    flexWrap: undefined,
    placeContent: undefined,
    alignItems: undefined,
    gap: undefined,
    rowGap: undefined,
    columnGap: undefined,
  },
  css: {
    flex: Optional("flex",
      LogicalFourReverse("padding", "padding", v => v, "_"),
      SingleTableReverse("flexDirection", flexDirection),
      SingleTableReverse("flexWrap", flexWrap),
      SingleTableReverse("placeContent", placeContent),
      SequentialFunctionReverse("gap", ["rowGap", "columnGap"], v => v, "_") // This mapping is slightly lossy because `gap` maps into `gap` not row/column in original sometimes but good enough, will tweak if we can
    ),
  }
};
