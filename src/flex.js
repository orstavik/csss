import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const placeContent = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline",
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly"
);
const flexDirection = CssValuesToCsssTable("column|column-reverse|row-reverse|row");
const flexWrap = CssValuesToCsssTable("wrap|wrap-reverse|nowrap");

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
  SF2("gap/1-2", [LengthPercentUnset], (n, ar) => ({ gap: ar.join(" ") }))
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
      SingleTableReverse("flexDirection", flexDirection),
      SequentialFunctionReverse("gap", ["gap"], v => v ? v.replace(/\s+/g, ",") : v, "_"), // gap parses row and column directly via `gap` property mapping in tests
      LogicalFourReverse("padding", "padding", v => v, "_"),
      SingleTableReverse("flexWrap", flexWrap),
      SingleTableReverse("placeContent", placeContent)
    ),
  }
};
