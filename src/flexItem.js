import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SingleArgumentFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto, Basic } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SingleArgumentFunctionReverse, Optional } = CssFunctions;

const ALIGNMENTS = (_ => {
  const POSITIONS = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const BASELINE = "|Baseline|First|Last";
  const SELFSTARTEND = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";

  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;

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
    alignSelf: makePlaceAligns("alignSelf", "self", AlignSelf),
  }
})();

const DefaultFlexItem = {
  margin: "unset",
  float: "unset",
  clear: "unset",
  verticalAlign: "unset",
  flexBasis: "unset",
  flexGrow: "unset",
  flexShrink: "unset",
  alignSelf: "unset",
  order: "unset",
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

const flexItem = TypeBasedFunction(
  LogicalFour("margin", "margin", LengthPercentAuto),
  SingleTable("alignSelf", ALIGNMENTS.alignSelf),
  SingleArgumentFunction("basis", Basic, (n, v) => ({ flexBasis: v })),
  SingleArgumentFunction("grow", Basic, (n, v) => ({ flexGrow: v })),
  SingleArgumentFunction("shrink", Basic, (n, v) => ({ flexShrink: v })),
  SingleArgumentFunction("order", Basic, (n, v) => ({ [n]: v }))
);

const FlexItem = FunctionWithDefaultValues(DefaultFlexItem, flexItem);

export default {
  csss: {
    flexItem,
    FlexItem
  },
  props: {
    ...marginProps,
    alignSelf: undefined,
    flexBasis: undefined,
    flexGrow: undefined,
    flexShrink: undefined,
    order: undefined,
  },
  css: {
    flexItem: Optional("flexItem",
      LogicalFourReverse("margin", "margin", v => v, "_"),
      SingleTableReverse("alignSelf", ALIGNMENTS.alignSelf),
      SingleArgumentFunctionReverse("basis", "flexBasis", v => v, "_"),
      SingleArgumentFunctionReverse("grow", "flexGrow", v => v, "_"),
      SingleArgumentFunctionReverse("shrink", "flexShrink", v => v, "_"),
      SingleArgumentFunctionReverse("order", "order", v => v, "_")
    ),
  }
};
