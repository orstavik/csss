import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional, DisplayMode, ValueReverse, normalizeToLogical, ShorthandPairReverse } = CssFunctions;

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

const reversePlaceContent = ShorthandPairReverse(placeContent, "alignContent", "justifyContent");
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
    flex: style => {
      if (style.display && style.display !== "flex" && style.display !== "unset") return;
      return Optional("$flex", "$Flex", DefaultFlex,
        { prop: "flexDirection", rev: SingleTableReverse("flexDirection", flexDirection) },
        { prop: "flexWrap", rev: SingleTableReverse("flexWrap", flexWrap) },
        { prop: ["alignContent", "justifyContent"], rev: reversePlaceContent },
        { prop: ["rowGap", "columnGap"], rev: s => {
          const r = ValueReverse(s.rowGap) ?? "_", c = ValueReverse(s.columnGap) ?? "_";
          return (r !== "_" || c !== "_") ? (r === c ? `gap(${r})` : `gap(${r},${c})`) : undefined;
        }},
        { prop: "paddingBlockStart", rev: LogicalFourReverse("padding", "padding", ValueReverse, "_") }
      )(normalizeToLogical(style));
    },
  }
};
