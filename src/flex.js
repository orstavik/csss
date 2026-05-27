import { CsssPrimitives, CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SF2: SF2, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional, TableReverse, ValueReverse, ShorthandPairReverse } = CssFunctions;

const placeContent = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline",
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly"
);
const flexDirection = CssValuesToCsssTable("column|column-reverse|row-reverse|row");
const flexWrap = CssValuesToCsssTable("wrap|wrap-reverse|nowrap");
const flexDirectionReverse = TableReverse(flexDirection);
const flexWrapReverse = TableReverse(flexWrap);
const reversePlaceContent = ShorthandPairReverse(placeContent, "alignContent", "justifyContent");

const gapReverse = style => {
  const { rowGap, columnGap, gap } = style;
  const r = ValueReverse(rowGap ?? gap);
  const c = ValueReverse(columnGap ?? gap);
  if (!r && !c) return undefined;
  if (r === c) return `gap(${r})`;
  return `gap(${r},${c})`;
};
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
    flex: style => {
      if (style.display !== "flex" || style.display === undefined) return;
      let {
        flexDirection: fd, flexWrap: fw, placeContent: pc, alignItems, gap, rowGap, columnGap
      } = style;
      fd &&= flexDirectionReverse[fd];
      fw &&= flexWrapReverse[fw];
      pc = reversePlaceContent(style) ?? pc;
      const gapArgs = (gap || rowGap || columnGap) && gapReverse({ gap, rowGap, columnGap });
      const paddings = LogicalFourReverse("padding", "padding", ValueReverse)(style);
      const args = [paddings, fd, fw, pc, alignItems, gapArgs]
        .filter(v => v && v !== "unset");
      const unsets = Object.keys(DefaultFlex).filter(k => style[k] ===  "unset" || style[k] === "initial").length;
      if (!args.length && !unsets) return;
      const name = args.length + unsets >= 3 ? "$Flex" : "$flex";
      return `${name}(${args.join(",")})`;
    }
  }
};
