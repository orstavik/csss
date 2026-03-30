import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SequentialFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto, SpanBasic } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

const ALIGNMENTS = (_ => {
  const POSITIONS = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const BASELINE = "|Baseline|First|Last";
  const LEFTRIGHT = "|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight";
  const SELFSTARTEND = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";

  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifySelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT;

  function lowSpaceKebab(str) {
    return str
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
    placeSelf: makePlaceAligns("placeSelf", "self", AlignSelf, JustifySelf),
  }
})();


const DefaultGridItem = {
  margin: "unset",
  float: "unset",
  clear: "unset",
  verticalAlign: "unset",
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
  SingleTable("placeSelf", ALIGNMENTS.placeSelf),
  SequentialFunction("column/1-2", [SpanBasic], (n, ar) => ({ gridColumn: ar.join(" / ") })),
  SequentialFunction("row/1-2", [SpanBasic], (n, ar) => ({ gridRow: ar.join(" / ") }))
);

const GridItem = FunctionWithDefaultValues(DefaultGridItem, gridItem);

export default {
  csss: {
    gridItem,
    GridItem
  },
  props: {
    ...marginProps,
    placeSelf: undefined,
    gridColumn: undefined,
    gridRow: undefined,
  },
  css: {
    gridItem: Optional("gridItem",
      LogicalFourReverse("margin", "margin", v => v, "_"),
      SingleTableReverse("placeSelf", ALIGNMENTS.placeSelf),
      SequentialFunctionReverse("column", ["gridColumn"], v => v, "_"),
      SequentialFunctionReverse("row", ["gridRow"], v => v, "_")
    ),
  }
};
