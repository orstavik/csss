import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SequentialFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, RepeatBasic } = CsssPrimitives;
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
  const JustifyItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT + LEGACY;

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
    placeItems: makePlaceAligns("placeItems", "items", AlignItems, JustifyItems),
  }
})();

const gap = SequentialFunction("gap/1-2", [LengthPercentUnset], (n, ar) => {
  if (ar[0] == ar[1] || ar.length == 1) return { gap: ar[0] };
  if (ar[1] == "unset") return { rowGap: ar[0] };
  if (ar[0] == "unset") return { columnGap: ar[1] };
  return { gap: ar.join(" ") };
});

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

const grid = TypeBasedFunction(
  LogicalFour("padding", "padding", LengthPercent),
  SingleTable("placeContent", ALIGNMENTS.placeContent),
  SingleTable("placeItems", ALIGNMENTS.placeItems),
  SequentialFunction("cols/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  SequentialFunction("columns/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  SequentialFunction("rows/1-", [RepeatBasic], (n, ar) => ({ gridTemplateRows: ar.join(" ") })),
  SequentialFunction("areas/1-", [RepeatBasic], (n, ar) => ({ gridTemplateAreas: ar.join(" ") })),
  gap,
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
      SingleTableReverse("placeContent", ALIGNMENTS.placeContent),
      SingleTableReverse("placeItems", ALIGNMENTS.placeItems),
      SequentialFunctionReverse("columns", ["gridTemplateColumns"], v => v, "_"), // can't reliably output cols/columns
      SequentialFunctionReverse("rows", ["gridTemplateRows"], v => v, "_"),
      SequentialFunctionReverse("areas", ["gridTemplateAreas"], v => v, "_"),
      SequentialFunctionReverse("gap", ["rowGap", "columnGap"], v => v, "_"),
      SingleTableReverse("gridAutoFlow", gridAutoFlow)
    ),
  }
};
