/**
 * Layout shorts for block / flex / grid / inline-block containers and items.
 *
 * Responsibilities:
 * - Map container-level utilities ($Block, $Flex, $Grid, $IBlock, etc.)
 *   to logical padding/overflow/snap/align properties.
 * - Map item-level utilities ($blockItem, $flexItem, $gridItem, $iBlockItem)
 *   to margin/size/order/alignment properties.
 *
 * Helpers from func.js:
 * - LogicalFour: logical padding/margin helpers.
 * - FunctionBasedOnValueTypes (TYPB), FunctionWithDefaultValues (Umbrella),
 *   SequentialFunction (Sequence), SingleArgumentFunction (SIN), FIRST.
 * - ValueTypes: RepeatBasic, SpanBasic, LengthPercent*, Basic, NumberInterpreter.
 *
 * Export map:
 * - Parsers: block, blockItem, lineClamp, flex, flexItem, grid, gridItem,
 *   iBlock, iBlockItem.
 * - Umbrellas: Block, BlockItem, LineClamp, Grid, GridItem, Flex, FlexItem,
 *   IBlock, IBlockItem (using Defaults).
 * - Single-property helpers: lineHeight, wordSpacing, hide.
 * - Reserved layout-related longhand properties.
 */
import {
  FunctionTypes,
  ValueTypes,
  LogicalFour,
  isBasic,
} from "./func.js";

const {
  RepeatBasic,
  SpanBasic,
  Basic,
  LengthPercent,
  NumberInterpreter,
  Length,
  LengthPercentNumber,
  LengthPercentUnset,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  Umbrella: FunctionWithDefaultValues,
  Sequence: SequentialFunction,
  SIN: SingleArgumentFunction,
  FIRST: ParseFirstThenRest,
} = FunctionTypes;

function parseSize(NAME, { args }) {
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
    return parseSize("inlineSize", { args });
  if (args.length == 2)
    return {
      ...parseSize("inlineSize", { args: [args[0]] }),
      ...parseSize("blockSize", { args: [args[1]] })
    };
  if (args.length == 6)
    return {
      ...parseSize("inlineSize", { args: args.slice(0, 3) }),
      ...parseSize("blockSize", { args: args.slice(3) })
    };
  throw new SyntaxError(`$size() accepts only 1, 2 or 4 arguments, got ${args.length}.`);
}

const ALIGNMENTS = (_ => {
  const Positions = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const Space = "|Around|Between|Evenly";
  const Baseline = "|Baseline|First|Last";
  const LeftRight = "|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight";
  const SelfStartEnd = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";
  const Legacy = "|Legacy|LegacyLeft|LegacyRight|LegacyCenter";

  const AlignContent = "Normal|Stretch" + Positions + Space + Baseline;
  const JustifyContent = "Normal|Stretch" + Positions + Space + LeftRight;
  const AlignItems = "Normal|Stretch|AnchorCenter" + Positions + Baseline + SelfStartEnd;
  const JustifyItems = "Normal|Stretch|AnchorCenter" + Positions + Baseline + SelfStartEnd + LeftRight + Legacy;
  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + Positions + Baseline + SelfStartEnd;
  const JustifySelf = "Auto|Normal|Stretch|AnchorCenter" + Positions + Baseline + SelfStartEnd + LeftRight;

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
const Overflows = (_ => {
  const Settings = {
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
  for (let [A, a] of Object.entries(Settings)) {
    res["overflow" + A] = a;
    for (let [B, b] of Object.entries(Settings)) {
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

const ContainerWords = {
  padding: LogicalFour("padding", LengthPercent),
  scrollPadding: LogicalFour("scroll-padding", LengthPercent),
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
  ...Overflows,
};

const ItemWords = {
  margin: LogicalFour("margin", LengthPercent),
  scrollMargin: LogicalFour("scroll-margin", LengthPercent),
  inlineSize: parseSize.bind(null, "inlineSize"), //todo should we block this? is size(10px) enough?
  blockSize: parseSize.bind(null, "blockSize"),   //todo should we block this? is size(_,10px) enough?
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

export const Defaults = {
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

const IblockWords = {
  ...ContainerWords,
};

const IblockItemWords = {
  ...ItemWords,
  alignTop: { verticalAlign: "top" },
  alignMiddle: { verticalAlign: "middle" },
  alignBottom: { verticalAlign: "bottom" },
  alignBaseline: { verticalAlign: "baseline" },
  alignTextTop: { verticalAlign: "text-top" },
  alignTextBottom: { verticalAlign: "text-bottom" },
  alignSuper: { verticalAlign: "super" },
  alignSub: { verticalAlign: "sub" },
};

const GridWords = {
  ...ContainerWords,
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

const GridItemWords = {
  ...ALIGNMENTS.placeSelf,
  ...ItemWords,
  column: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridColumn: ar.join(" / ") })), //todo test how `_` works as first or second argument.
  row: SequentialFunction("/1-2", [SpanBasic], (n, ar) => ({ gridRow: ar.join(" / ") })),       //todo test how `_` works as first or second argument.
};

const FlexWords = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...ContainerWords,
  gap,
};

const FlexItemWords = {
  ...ItemWords,
  ...ALIGNMENTS.alignSelf,
  basis: SingleArgumentFunction(Basic, (n, v) => ({ flexBasis: v })),
  grow: SingleArgumentFunction(Basic, (n, v) => ({ flexGrow: v })),
  shrink: SingleArgumentFunction(Basic, (n, v) => ({ flexShrink: v })),
  order: SingleArgumentFunction(Basic, (n, v) => ({ [n]: v })),
  //todo safe
};

const BlockItem = {
  ...ItemWords,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
}

const block = FunctionBasedOnValueTypes(ContainerWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const blockItem = FunctionBasedOnValueTypes(BlockItem, {}, {}, res => Object.assign({}, ...Object.values(res)));
const lineClamp = ParseFirstThenRest(NumberInterpreter, block, (n, a, b) => ({ ...Defaults.LineClamp, WebkitLineClamp: a, ...b }));
const grid = FunctionBasedOnValueTypes(GridWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const gridItem = FunctionBasedOnValueTypes(GridItemWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flex = FunctionBasedOnValueTypes(FlexWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const flexItem = FunctionBasedOnValueTypes(FlexItemWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlock = FunctionBasedOnValueTypes(IblockWords, {}, {}, res => Object.assign({}, ...Object.values(res)));
const iBlockItem = FunctionBasedOnValueTypes(IblockItemWords, {}, {}, res => Object.assign({}, ...Object.values(res)));

/**
 * Export map:
 * - Parsers: `block`, `blockItem`, `lineClamp`, `flex`, `flexItem`,
 *   `grid`, `gridItem`, `iBlock`, `iBlockItem`.
 * - Umbrellas: `Block`, `BlockItem`, `LineClamp`, `Grid`, `GridItem`,
 *   `Flex`, `FlexItem`, `IBlock`, `IBlockItem`.
 * - Single-property helpers: `lineHeight`, `wordSpacing`, `hide`.
 * - default export also reserves a wide set of layout-related longhands.
 */
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

  Block: FunctionWithDefaultValues(Defaults.Block, block),
  BlockItem: FunctionWithDefaultValues(Defaults.BlockItem, blockItem),
  LineClamp: FunctionWithDefaultValues(Defaults.Block, lineClamp),
  IBlock: FunctionWithDefaultValues(Defaults.IBlock, iBlock),
  IBlockItem: FunctionWithDefaultValues(Defaults.BlockItem, iBlockItem),
  Grid: FunctionWithDefaultValues(Defaults.Grid, grid),
  GridItem: FunctionWithDefaultValues(Defaults.BlockItem, gridItem),
  Flex: FunctionWithDefaultValues(Defaults.Flex, flex),
  FlexItem: FunctionWithDefaultValues(Defaults.BlockItem, flexItem),

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
