import { ValueTypes, FunctionTypes, isBasic } from "./func.js";
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest: FIRST, LogicalFour } = FunctionTypes;
const { Length, NumberInterpreter, Basic, LengthPercent, LengthPercentUnset, LengthPercentNumber, RepeatBasic, SpanBasic } = ValueTypes;

function toSize(NAME, { args }) {
  if (args.length != 1 && args.length != 3)
    throw new SyntaxError(`$${NAME}() accepts only 1 or 3 arguments, got ${args.length}.`);
  args = args.map(a =>
    a.text == "_" ? "unset" :
      isBasic(a).text
  );
  if (args.length === 1)
    return { [NAME]: args[0] };
  const NAME2 = NAME[0].toUpperCase() + NAME.slice(1);
  return {
    ["min" + NAME2]: args[0],
    [NAME]: args[1],
    ["max" + NAME2]: args[2]
  };
}

function size({ args }) {
  if (args.length == 1)
    return toSize("inlineSize", { args });
  if (args.length == 2)
    return {
      ...toSize("inlineSize", { args: [args[0]] }),
      ...toSize("blockSize", { args: [args[1]] })
    };
  if (args.length == 6)
    return {
      ...toSize("inlineSize", { args: args.slice(0, 3) }),
      ...toSize("blockSize", { args: args.slice(3) })
    };
  throw new SyntaxError(`$size() accepts only 1, 2 or 4 arguments, got ${args.length}.`);
}

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

//todo overflows
const OVERFLOWS = (_ => {
  const SETTINGS = {
    Visible: { overflow: "visible" },
    Hidden: { overflow: "hidden" },
    Clip: { overflow: "clip" },
    Auto: { overflow: "auto" },
    Scroll: { overflow: "scroll" },
    Snap: { overflow: "auto", scrollSnapType: "both" },
    SnapMandatory: { overflow: "auto", scrollSnapType: "both mandatory" },
    ScrollSnap: { overflow: "scroll", scrollSnapType: "both" },
    ScrollSnapMandatory: { overflow: "scroll", scrollSnapType: "both mandatory" },
  };
  const res = {};
  for (let [A, a] of Object.entries(SETTINGS)) {
    res["overflow" + A] = a;
    for (let [B, b] of Object.entries(SETTINGS)) {
      if (A == B) continue;
      res["overflow" + A + B] = {
        overflowBlock: a.overflow,
        overflowInline: b.overflow,
      };
      if (a.scrollSnapType && b.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = "both" + (A.endsWith("Mandatory") || B.endsWith("Mandatory") ? " mandatory" : "");
      else if (a.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = a.scrollSnapType.replace("both", "block")
      else if (B.scrollSnapType)
        res["overflow" + A + B].scrollSnapType = a.scrollSnapType.replace("both", "inline");
    }
  }
  return res;
})();

const CONTAINER = {
  padding: LogicalFour("padding", LengthPercent),
  scrollPadding: LogicalFour("scroll-padding", LengthPercent),
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
  ...OVERFLOWS,
};

const ITEM = {
  margin: LogicalFour("margin", LengthPercent),
  scrollMargin: LogicalFour("scroll-margin", LengthPercent),
  inlineSize: toSize.bind(null, "inlineSize"), //todo should we block this? is size(10px) enough?
  blockSize: toSize.bind(null, "blockSize"),   //todo should we block this? is size(_,10px) enough?
  size,
  // w: AllFunctions.width,
  // h: AllFunctions.height,
  // width: AllFunctions.width,
  // height: AllFunctions.height,
  snapStart: { scrollSnapAlign: "start" },
  snapStartCenter: { scrollSnapAlign: "start center" },
  snapStartEnd: { scrollSnapAlign: "start end" },
  snapCenter: { scrollSnapAlign: "center" },
  snapCenterStart: { scrollSnapAlign: "center start" },
  snapCenterEnd: { scrollSnapAlign: "center end" },
  snapEnd: { scrollSnapAlign: "end" },
  snapEndStart: { scrollSnapAlign: "end start" },
  snapEndCenter: { scrollSnapAlign: "end center" },
  noSnap: { scrollSnapAlign: "none" },
  // verticalAlign: AllFunctions.verticalAlign, //todo is this allowed for grid and flex?
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
    //todo this is NOT as easy as I thought..
    //">* /*blockItem*/": BlockItemDefaults,    //the BlockItem defaults are always set by the Block.
  },
  BlockItem: {
    inlineSize: "unset",
    blockSize: "unset",
    marginBlock: "unset",
    marginInline: "unset",
    scrollMargin: "unset",
    scrollSnapAlign: "unset",
  },
  LineClamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3, //this is always overwritten
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
}

const block = FunctionBasedOnValueTypes(CONTAINER, {}, {}, res => Object.assign({}, ...Object.values(res)));
const blockItem = FunctionBasedOnValueTypes(BlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const lineClamp = FIRST(NumberInterpreter, block, (n, a, b) => ({ ...DEFAULTS.LineClamp, WebkitLineClamp: a, ...b }));
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
  width: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  height: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  inlineSize: undefined,
  minInlineSize: undefined,
  maxInlineSize: undefined,
  blockSize: undefined,
  minBlockSize: undefined,
  maxBlockSize: undefined,
  overflow: undefined,
  overflowX: undefined,
  overflowY: undefined,
  overflowBlock: undefined,
  overflowInline: undefined,
  scrollSnapType: undefined,
  scrollSnapAlign: undefined,
  scrollSnapStop: undefined,
  scrollPadding: undefined,
  scrollMargin: undefined,

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