import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SequentialFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const ALIGNMENTS = (_ => {
  const POSITIONS = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const SPACE = "|Around|Between|Evenly";
  const BASELINE = "|Baseline|First|Last";
  const LEFTRIGHT = "|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight";
  const SELFSTARTEND = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";
  const LEGACY = "|Legacy|LegacyLeft|LegacyRight|LegacyCenter";

  const AlignContent = "Normal|Stretch" + POSITIONS + SPACE + BASELINE;
  const JustifyContent = "Normal|Stretch" + POSITIONS + SPACE + LEFTRIGHT;
  const AlignItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;

  function lowSpaceKebab(str) {
    return str
      .replace(/Around|Between|Evenly/g, "space-$&")
      .replace(/(Unsafe|Safe|Legacy)(?!$)/g, "$& ")
      .replace(/(Self|Flex|Anchor)(?!$)/g, "$&-")
      .replace(/First|Last/g, "$& baseline")
      .toLowerCase();
  }

  function makePlaceAligns(prop, name, one, two) {

    const res = {};
    for (let a of one.split("|")) {
      res[name + a] = lowSpaceKebab(a);
      if (two)
        for (let b of two.split("|"))
          if (a != b)
            res[name + a + b] = lowSpaceKebab(a) + " " + lowSpaceKebab(b);
    }
    return res;
  }

  return {
    placeContent: makePlaceAligns("placeContent", "content", AlignContent, JustifyContent),
    alignItems: makePlaceAligns("alignItems", "items", AlignItems),
  }
})();

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
  SingleTable("placeContent", ALIGNMENTS.placeContent),
  SingleTable("alignItems", ALIGNMENTS.alignItems),
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
      SingleTableReverse("placeContent", ALIGNMENTS.placeContent),
      SingleTableReverse("alignItems", ALIGNMENTS.alignItems),
      SequentialFunctionReverse("gap", ["rowGap", "columnGap"], v => v, "_") // This mapping is slightly lossy because `gap` maps into `gap` not row/column in original sometimes but good enough, will tweak if we can
    ),
  }
};
