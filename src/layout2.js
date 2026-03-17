import { ValueTypes, FunctionTypes, Interpreters } from "./func.js";
const { basic: isBasic } = Interpreters;
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, LogicalFour } = FunctionTypes;
const { Length, NumberInterpreter, Basic, LengthPercent, LengthPercentUnset, LengthPercentNumber, RepeatBasic, SpanBasic } = ValueTypes;

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
  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifySelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT;

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
      res[name + a] = { [prop]: lowSpaceKebab(a) };
      if (two)
        for (let b of two.split("|"))
          if (a != b)
            res[name + a + b] = { [prop]: lowSpaceKebab(a) + " " + lowSpaceKebab(b) };
    }
    return res;
  }

  return {
    placeContent: makePlaceAligns("placeContent", "content", AlignContent, JustifyContent),
    placeItems: makePlaceAligns("placeItems", "items", AlignItems, JustifyItems),
    placeSelf: makePlaceAligns("placeSelf", "self", AlignSelf, JustifySelf),
    alignItems: makePlaceAligns("alignItems", "items", AlignItems),
    alignSelf: makePlaceAligns("alignSelf", "self", AlignSelf),
  }
})();

const CONTAINER = {
  padding: LogicalFour("padding", LengthPercent),
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
};

const ITEM = {
  margin: LogicalFour("margin", LengthPercent),
};

const gap = SequentialFunction("/1-2", [LengthPercentUnset], (n, ar) => {
  if (ar[0] == ar[1] || ar.length == 1) return { gap: ar[0] };
  if (ar[1] == "unset") return { rowGap: ar[0] };
  if (ar[0] == "unset") return { columnGap: ar[1] };
  return { gap: ar.join(" ") };
});

export const DEFAULTS = {
  Block: {
    display: "block",
  },
  BlockItem: {
    marginBlock: "unset",
    marginInline: "unset",
  },
  LineClamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden",
  },
  Flex: {
    display: "flex",
    alignItems: "unset",
    placeContent: "unset",
  },
  Grid: {
    display: "grid",
    placeItems: "unset",
    placeContent: "unset",
  },
  IBlock: {
    display: "inline-block",
  },
};

const IBLOCK = {
  ...CONTAINER,
};

const _IBlockItem = {
  ...ITEM,
  alignTop: { verticalAlign: "top" },
  alignMiddle: { verticalAlign: "middle" },
  alignBottom: { verticalAlign: "bottom" },
  alignBaseline: { verticalAlign: "baseline" },
  alignTextTop: { verticalAlign: "text-top" },
  alignTextBottom: { verticalAlign: "text-bottom" },
  alignSuper: { verticalAlign: "super" },
  alignSub: { verticalAlign: "sub" },
};

const GRID = {
  ...CONTAINER,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
  cols: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  columns: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  rows: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateRows: ar.join(" ") })),
  areas: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateAreas: ar.join(" ") })),
  gap,
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

const _GridItem = {
  ...ALIGNMENTS.placeSelf,
  ...ITEM,
  column: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridColumn: ar.join(" / ") })),
  row: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridRow: ar.join(" / ") })),
};

const FLEX = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...CONTAINER,
  gap,
};

const _FlexItem = {
  ...ITEM,
  ...ALIGNMENTS.alignSelf,
  basis: SingleArgumentFunction(Basic, (n, v) => ({ flexBasis: v })),
  grow: SingleArgumentFunction(Basic, (n, v) => ({ flexGrow: v })),
  shrink: SingleArgumentFunction(Basic, (n, v) => ({ flexShrink: v })),
  order: SingleArgumentFunction(Basic, (n, v) => ({ [n]: v })),
};

const BlockItem = {
  ...ITEM,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
  clearStart: { clear: "inline-start" },
  clearEnd: { clear: "inline-end" },
  clear: { clear: "both" },
  clearNone: { clear: "none" },
}

const block = FunctionBasedOnValueTypes(CONTAINER, {}, {}, res => Object.assign({}, ...Object.values(res)));
const blockItem = FunctionBasedOnValueTypes(BlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const lineClamp = ParseFirstThenRest(NumberInterpreter, block, (n, a, b) => ({ ...DEFAULTS.LineClamp, WebkitLineClamp: a, ...b }));
const grid = FunctionBasedOnValueTypes(GRID, {}, {}, res => Object.assign({}, ...Object.values(res)));
const gridItem = FunctionBasedOnValueTypes(_GridItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flex = FunctionBasedOnValueTypes(FLEX, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flexItem = FunctionBasedOnValueTypes(_FlexItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlock = FunctionBasedOnValueTypes(IBLOCK, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlockItem = FunctionBasedOnValueTypes(_IBlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));

export default {
  block,
  blockItem,
  lineClamp,
  flex,
  flexItem,
  grid,
  gridItem,
  iBlock,
  iBlockItem,

  Block: FunctionWithDefaultValues(DEFAULTS.Block, block),
  BlockItem: FunctionWithDefaultValues(DEFAULTS.BlockItem, blockItem),
  LineClamp: FunctionWithDefaultValues(DEFAULTS.Block, lineClamp),
  IBlock: FunctionWithDefaultValues(DEFAULTS.IBlock, iBlock),
  IBlockItem: FunctionWithDefaultValues(DEFAULTS.BlockItem, iBlockItem),
  Grid: FunctionWithDefaultValues(DEFAULTS.Grid, grid),
  GridItem: FunctionWithDefaultValues(DEFAULTS.BlockItem, gridItem),
  Flex: FunctionWithDefaultValues(DEFAULTS.Flex, flex),
  FlexItem: FunctionWithDefaultValues(DEFAULTS.BlockItem, flexItem),

  lineHeight: SingleArgumentFunction(LengthPercentNumber, (n, v) => ({ lineHeight: v })),
  wordSpacing: SingleArgumentFunction(Length, (n, v) => ({ wordSpacing: v })),

  hide: _ => ({ display: "none" }),

  order: undefined,
  float: undefined,
  gap: undefined,
  margin: undefined,
  padding: undefined,

  placeContent: undefined,
  justifyContent: undefined,
  alignContent: undefined,
  placeItems: undefined,
  justifyItems: undefined,
  alignItems: undefined,
  placeSelf: undefined,
  justifySelf: undefined,
  alignSelf: undefined,
};