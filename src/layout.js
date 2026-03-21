import { ValueTypes, FunctionTypes } from "./func.js";
import { ReverseFunctionTypes, createWes } from "./reverse.js";
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, LogicalFour } = FunctionTypes;
const { ReverseFunctionBasedOnValueTypes, ReverseLogicalFour, ReverseFunctionWithDefaultValues } = ReverseFunctionTypes;
const { NumberInterpreter, Basic, LengthPercent, LengthPercentUnset, RepeatBasic, SpanBasic } = ValueTypes;

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

const REVERSE_CONTAINER = {
  padding: ReverseLogicalFour("padding"),
};

const REVERSE_ITEM = {
  margin: ReverseLogicalFour("margin"),
};

// We also need to map the objects like ALIGNMENTS and static values to reverse map for wes
function createWes(sources) {
  let wes = {};
  for (let src of sources) {
    for (let [k, v] of Object.entries(src)) {
      if (typeof v === "function") continue;
      if (v?.args) continue; // forward functions
      wes[k] = v;
    }
  }
  return wes;
}

const CONTAINER = {
  padding: LogicalFour("padding", LengthPercent),
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

const reverseGap = (style) => {
  if (style && "gap" in style) {
    const val = style.gap;
    delete style.gap;
    return typeof val === "string" ? val.split(" ") : [val];
  }
  if (style && "rowGap" in style && !("columnGap" in style)) {
    const val = style.rowGap;
    delete style.rowGap;
    return [val, "_"];
  }
  if (style && "columnGap" in style && !("rowGap" in style)) {
    const val = style.columnGap;
    delete style.columnGap;
    return ["_", val];
  }
  if (style && "rowGap" in style && "columnGap" in style) {
    const r = style.rowGap;
    const c = style.columnGap;
    delete style.rowGap;
    delete style.columnGap;
    return [r, c];
  }
  return undefined;
};

export const DEFAULTS = {
  Block: {
    display: "block",
    padding: "unset",
    //todo this is NOT as easy as I thought..
    //">* /*blockItem*/": BlockItemDefaults,    //the BlockItem defaults should always be set by the Block.
  },
  BlockItem: {
    margin: "unset",
    float: "unset",
    clear: "unset",
    verticalAlign: "unset",
  },
  LineClamp: {
    display: "-webkit-box",
    padding: "unset",
    WebkitLineClamp: 3, //3 is always set/overwritten
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden",
  },
  IBlock: {
    display: "inline-block",
    padding: "unset",
  },
  Flex: {
    display: "flex",
    padding: "unset",
    alignItems: "unset",
    placeContent: "unset",
    flexDirection: "unset",
    flexWrap: "unset",
    gap: "unset",
  },
  Grid: {
    display: "grid",
    padding: "unset",
    placeItems: "unset",
    placeContent: "unset",
    gridTemplateColumns: "unset",
    gridTemplateRows: "unset",
    gridTemplateAreas: "unset",
    gap: "unset",
    gridAutoFlow: "unset",
  },
};

DEFAULTS.FlexItem = {
  ...DEFAULTS.BlockItem,
  flexBasis: "unset",
  flexGrow: "unset",
  flexShrink: "unset",
  alignSelf: "unset",
  order: "unset",
};

DEFAULTS.GridItem = {
  ...DEFAULTS.BlockItem,
  gridColumn: "unset",
  gridRow: "unset",
  placeSelf: "unset",
};

const IBLOCK = {
  ...CONTAINER,
};

const GRID = {
  ...CONTAINER,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
  //todo what is the bertScore distance from cols to columns?
  cols: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  columns: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateColumns: ar.join(" ") })),
  rows: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateRows: ar.join(" ") })),
  areas: SequentialFunction("/1-", [RepeatBasic], (n, ar) => ({ gridTemplateAreas: ar.join(" ") })),
  gap,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

const _GridItem = {
  ...ALIGNMENTS.placeSelf,
  ...ITEM,
  column: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridColumn: ar.join(" / ") })), //todo test how `_` works as first or second argument.
  row: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridRow: ar.join(" / ") })),       //todo test how `_` works as first or second argument.
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
  //todo safe
};

const BlockItem = {
  ...ITEM,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
  clearStart: { clear: "inline-start" },
  clearEnd: { clear: "inline-end" },
  clear: { clear: "both" },
  clearNone: { clear: "none" },
  alignTop: { verticalAlign: "top" },
  alignMiddle: { verticalAlign: "middle" },
  alignBottom: { verticalAlign: "bottom" },
  alignBaseline: { verticalAlign: "baseline" },
  alignTextTop: { verticalAlign: "text-top" },
  alignTextBottom: { verticalAlign: "text-bottom" },
  alignSuper: { verticalAlign: "super" },
  alignSub: { verticalAlign: "sub" },
}

const _IBlockItem = {
  ...BlockItem,
};

const wesContainer = createWes([CONTAINER]);
const wesItem = createWes([ITEM]);
const wesBlockItem = createWes([BlockItem]);
const wesGrid = createWes([GRID]);
const wesGridItem = createWes([_GridItem]);
const wesFlex = createWes([FLEX]);
const wesFlexItem = createWes([_FlexItem]);

const block = FunctionBasedOnValueTypes(CONTAINER, {}, {}, res => Object.assign({}, ...Object.values(res)));
const blockItem = FunctionBasedOnValueTypes(BlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const lineClamp = ParseFirstThenRest(NumberInterpreter, block, (n, a, b) => ({ ...DEFAULTS.LineClamp, WebkitLineClamp: a, ...b }));
const grid = FunctionBasedOnValueTypes(GRID, {}, {}, res => Object.assign({}, ...Object.values(res)));
const gridItem = FunctionBasedOnValueTypes(_GridItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flex = FunctionBasedOnValueTypes(FLEX, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flexItem = FunctionBasedOnValueTypes(_FlexItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlock = FunctionBasedOnValueTypes(IBLOCK, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlockItem = FunctionBasedOnValueTypes(_IBlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));

const reverseBlockInner = ReverseFunctionBasedOnValueTypes(wesContainer, REVERSE_CONTAINER, {});
const reverseBlockItemInner = ReverseFunctionBasedOnValueTypes(wesBlockItem, REVERSE_ITEM, {});
const reverseIBlockInner = ReverseFunctionBasedOnValueTypes(wesContainer, REVERSE_CONTAINER, {});
const reverseIBlockItemInner = ReverseFunctionBasedOnValueTypes(wesBlockItem, REVERSE_ITEM, {});

const reverseGridInner = ReverseFunctionBasedOnValueTypes(wesGrid, {
  ...REVERSE_CONTAINER,
  gap: reverseGap,
  cols: (style) => { const v = style.gridTemplateColumns; if(v){delete style.gridTemplateColumns; return v;} },
  rows: (style) => { const v = style.gridTemplateRows; if(v){delete style.gridTemplateRows; return v;} },
  areas: (style) => { const v = style.gridTemplateAreas; if(v){delete style.gridTemplateAreas; return v;} }
}, {});

const reverseGridItemInner = ReverseFunctionBasedOnValueTypes(wesGridItem, {
  ...REVERSE_ITEM,
  column: (style) => { const v = style.gridColumn; if(v){delete style.gridColumn; return v;} },
  row: (style) => { const v = style.gridRow; if(v){delete style.gridRow; return v;} },
}, {});

const reverseFlexInner = ReverseFunctionBasedOnValueTypes(wesFlex, { ...REVERSE_CONTAINER, gap: reverseGap }, {});

const reverseFlexItemInner = ReverseFunctionBasedOnValueTypes(wesFlexItem, {
  ...REVERSE_ITEM,
  basis: (style) => { const v = style.flexBasis; if(v){delete style.flexBasis; return v;} },
  grow: (style) => { const v = style.flexGrow; if(v){delete style.flexGrow; return v;} },
  shrink: (style) => { const v = style.flexShrink; if(v){delete style.flexShrink; return v;} },
  order: (style) => { const v = style.order; if(v){delete style.order; return v;} },
}, {});

const reverseLineClampInner = (style) => {
  const clamp = style.WebkitLineClamp;
  delete style.WebkitLineClamp;
  const innerArgs = reverseBlockInner(style) ?? [];
  if (clamp !== undefined) {
    return [clamp, ...innerArgs];
  }
  return innerArgs;
};

export const _reverse = {
  Block: ReverseFunctionWithDefaultValues(DEFAULTS.Block, reverseBlockInner, "block", "Block"),
  IBlock: ReverseFunctionWithDefaultValues(DEFAULTS.IBlock, reverseIBlockInner, "iBlock", "IBlock"),
  Grid: ReverseFunctionWithDefaultValues(DEFAULTS.Grid, reverseGridInner, "grid", "Grid"),
  Flex: ReverseFunctionWithDefaultValues(DEFAULTS.Flex, reverseFlexInner, "flex", "Flex"),
  LineClamp: ReverseFunctionWithDefaultValues(DEFAULTS.LineClamp, reverseLineClampInner, "lineClamp", "LineClamp"),
  BlockItem: ReverseFunctionWithDefaultValues(DEFAULTS.BlockItem, reverseBlockItemInner, "blockItem", "BlockItem"),
  IBlockItem: ReverseFunctionWithDefaultValues(DEFAULTS.BlockItem, reverseIBlockItemInner, "iBlockItem", "IBlockItem"),
  GridItem: ReverseFunctionWithDefaultValues(DEFAULTS.GridItem, reverseGridItemInner, "gridItem", "GridItem"),
  FlexItem: ReverseFunctionWithDefaultValues(DEFAULTS.FlexItem, reverseFlexItemInner, "flexItem", "FlexItem"),
};

export default {
  _reverse,
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
  LineClamp: FunctionWithDefaultValues(DEFAULTS.LineClamp, lineClamp),
  IBlock: FunctionWithDefaultValues(DEFAULTS.IBlock, iBlock),
  IBlockItem: FunctionWithDefaultValues(DEFAULTS.BlockItem, iBlockItem),
  Grid: FunctionWithDefaultValues(DEFAULTS.Grid, grid),
  GridItem: FunctionWithDefaultValues(DEFAULTS.GridItem, gridItem),
  Flex: FunctionWithDefaultValues(DEFAULTS.Flex, flex),
  FlexItem: FunctionWithDefaultValues(DEFAULTS.FlexItem, flexItem),

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