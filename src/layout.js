import { isRepeat, isSpan, isBasic, toLogicalFour, isLength, TYPB, Number as NumberInterpreter, Umbrella } from "./func.js";

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

//todo turn this into memory thing. same with O2
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
    textAlign: makePlaceAligns("textAlign", "text", "Normal|Start|End|Center|Justify|Left|Right"),
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

function checkUndefined(funcName, argsIn, argsOut) {
  for (let i = 0; i < argsIn.length; i++)
    if (argsOut[i] === undefined)
      throw new ReferenceError(`$${funcName}() cannot process ${argsIn[i].name}.`);
}

//todo rename this to container() and then do block, grid, flex as the two options.
//todo the question is if this will be recognized by the llm..
//they put lineHeight with font. This is wrong.. It will influence layout and doesn't influence font.
//so it should be with layout.
//todo rename the text block layout unit to $page
function defaultContainer(obj, argsIn, argsOut) {
  const containerDefaults = {
    wordSpacing: "unset",
    lineHeight: "unset",
    textAlign: "unset",
    textIndent: "unset",
  };
  checkUndefined(obj.display, argsIn, argsOut);
  return Object.assign(obj, containerDefaults, ...argsOut);
}

function defaultItem(name, argsIn, argsOut) {
  checkUndefined(name, argsIn, argsOut);
  return Object.assign({}, ...argsOut);
}

const LAYOUT = {
  padding: ({ args }) => toLogicalFour("padding", args),
  scrollPadding: ({ args }) => toLogicalFour("scroll-padding", args),
  ...ALIGNMENTS.textAlign,
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
};

function textIndent({ args }) {
  const l = isLength(args[0]);
  if (l)
    return { "textIndent": l.text };
  throw new SyntaxError("indent needs a length");
}
const _LAYOUT = {
  margin: ({ args }) => toLogicalFour("margin", args),
  scrollMargin: ({ args }) => toLogicalFour("scroll-margin", args),
  //this is now on the item. But that is inconsitent, as the gap in block controls the lineHeight etc for the text in the container.
  //todo i think that textIndent should be moved to the container again.
  textIndent: textIndent,
  indent: textIndent,
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

function gap({ args }) {
  if (!args.length || args.length > 2)
    throw new SyntaxError("gap only accepts 1 or 2 arguments");
  args = args.map(isBasic).map(a => a.text);
  if (args.length == 1 || args[0] == args[1])
    return { gap: args[0] };
  args = args.map(a => a == "unset" ? "normal" : a);
  return { gap: args[0] + " " + args[1] };
}

//todo rename this to space() and then do block, inline as the two options.
//todo the question is if this will be recognized by the llm..
//they put lineHeight with font. This is wrong.. It will influence layout and doesn't influence font.
//so it should be with layout.
function blockGap({ args }) {
  const [wordSpacing, lineHeight] = args.map(isBasic).map(a => a.text);
  return { wordSpacing, lineHeight };
}

const IBLOCK = {
  ...LAYOUT,
  ...OVERFLOWS,
  gap: blockGap,
};

const IBlockItem = {
  ..._LAYOUT,
  alignTop: { verticalAlign: "top" },
  alignMiddle: { verticalAlign: "middle" },
  alignBottom: { verticalAlign: "bottom" },
  alignBaseline: { verticalAlign: "baseline" },
  alignTextTop: { verticalAlign: "text-top" },
  alignTextBottom: { verticalAlign: "text-bottom" },
  alignSuper: { verticalAlign: "super" },
  alignSub: { verticalAlign: "sub" },
};

function iBlock({ args }) {
  const args2 = args.map(a => IBLOCK[a.name]?.(a) ?? IBLOCK[a.text]);
  return defaultContainer({ display: "inline-block" }, args, args2);
}

function iBlockItem({ args }) {
  const argsOut = args.map(a => IBlockItem[a.name]?.(a) ?? IBlockItem[a.text]);
  return defaultItem("iBlockItem", args, argsOut);
}

// function lineClamp({ args: [lines, ...args] }) {
//   lines = isBasic(lines);
//   if (lines.type != "number")
//     throw new SyntaxError(`$lineClamp() first argument must be a simple number, got ${lines}.`);
//   return Object.assign(block({ args }), {
//     display: "-webkit-box",
//     WebkitLineClamp: lines.num,
//     WebkitBoxOrient: "vertical",
//     overflowBlock: "hidden"
//   });
// }

const GRID = {
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
  cols: ({ args }) => ({ gridTemplateColumns: args.map(a => isRepeat(a) ?? isBasic(a)).map(a => a.text).join(" ") }),
  columns: ({ args }) => ({ gridTemplateColumns: args.map(a => isRepeat(a) ?? isBasic(a)).map(a => a.text).join(" ") }),
  rows: ({ args }) => ({ gridTemplateRows: args.map(a => isRepeat(a) ?? isBasic(a)).map(a => a.text).join(" ") }),
  areas: ({ args }) => ({ gridTemplateAreas: args.map(a => isRepeat(a) ?? isBasic(a)).map(a => a.text).join(" ") }),
  ...LAYOUT,
  gap,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

function grid({ args }) {
  const argsOut = args.map(a => GRID[a.name]?.(a) ?? GRID[a.text]);
  return defaultContainer({ display: "grid", placeItems: "unset", placeContent: "unset" }, args, argsOut);
}

//       1  2345   6789
// $grid(col(1,span(3))) => "{ gridColumn: 1 / span 3 }"
//
// $grid(colStartEnd(1,3)) => "{ gridColumn: 1 / 3 }"
// $grid(colSpan(1,3)) => "{ gridColumn: 1 / span 3 }"
//       1     2345   6
// $grid(column_1_span3) => "{ gridColumn: 1 / span 3 }"

// $flex

// $grid(col(1,4))
// $grid(col_1_4)
const column = ({ args }) => {
  const [start, end] = args.map(a => isSpan(a) ?? isBasic(a)).map(a => a.text);
  return { gridColumn: end ? `${start} / ${end}` : start };
};
const row = ({ args }) => {
  const [start, end] = args.map(a => isSpan(a) ?? isBasic(a)).map(a => a.text);
  return { gridRow: end ? `${start} / ${end}` : start };
};

const GridItem = {
  ...ALIGNMENTS.placeSelf,
  ..._LAYOUT,
  column,
  row,
};
function gridItem({ args }) {
  const argsOut = args.map(a => GridItem[a.name]?.(a) ?? GridItem[a.text]);
  return defaultItem("gridItem", args, argsOut);
}

const FLEX = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...LAYOUT,
  gap,
};

function flex({ args }) {
  const argsOut = args.map(a => FLEX[a.name]?.(a) ?? FLEX[a.text]);
  return defaultContainer({ display: "flex", alignItems: "unset", placeContent: "unset" }, args, argsOut);
}
const FlexItem = {
  ..._LAYOUT,
  ...ALIGNMENTS.alignSelf,
  basis: ({ args }) => ({ flexBasis: args.map(isBasic).map(a => a.text).join(" ") }),
  grow: ({ args }) => ({ flexGrow: args.map(isBasic).map(a => a.text).join(" ") }),
  shrink: ({ args }) => ({ flexShrink: args.map(isBasic).map(a => a.text).join(" ") }),
  order: ({ args }) => ({ order: args.map(isBasic).map(a => a.text).join(" ") }),
  //todo safe
};

function flexItem({ args }) {
  const argsOut = args.map(a => FlexItem[a.name]?.(a) ?? FlexItem[a.text]);
  return defaultItem("flexItem", args, argsOut);
}

//NEW SYSTEM STARTS HERE
const DEFAULTS = {
  Block: {
    display: "block",
    wordSpacing: "unset",
    lineHeight: "unset",
    textAlign: "unset",
    textIndent: "unset",        //as textIndent inherits, we need to unset on both container and item 
    //todo this is NOT as easy as I thought..
    //">* /*blockItem*/": BlockItemDefaults,    //the BlockItem defaults are always set by the Block.
  },
  BlockItem: {
    inlineSize: "unset",
    blockSize: "unset",
    marginBlock: "unset",
    marginInline: "unset",
    textIndent: "unset",        //as textIndent inherits, we need to unset on both container and item
    scrollMargin: "unset",
    scrollSnapAlign: "unset",
  },
  LineClamp: {
    display: "-webkit-box",
    WebkitLineClamp: 3, //this is always overwritten
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden",
  },
};

//todo this is a generic hoFunction that will extract the first argument and then run the rest inside. Same as we do in $Font().
const lineClampHO = cb => ({ name, args }) => {
  const WebkitLineClamp = NumberInterpreter(args[0]);
  if (WebkitLineClamp == null)
    throw new SyntaxError(`${name}() first argument must be a simple number, got ${args[0].text}.`);
  const inner = args.length > 1 ? cb({ name, args: args.slice(1) }) : {};
  return { WebkitLineClamp, ...inner };
};
const block = TYPB({
  ...LAYOUT,
  ...OVERFLOWS,
  gap: blockGap,
}, {}, {}, res => Object.assign({}, ...Object.values(res)));

const blockItem = TYPB({
  ..._LAYOUT,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
}, {}, {}, res => Object.assign({}, ...Object.values(res)));

const Block = Umbrella(DEFAULTS.Block, block);
const BlockItem = Umbrella(DEFAULTS.BlockItem, blockItem);
const lineClamp = Umbrella(DEFAULTS.LineClamp, lineClampHO(block));
const LineClamp = Umbrella(DEFAULTS.Block, lineClamp);

//NEW SYSTEM ENDS HERE

export default {
  Block,
  block,
  LineClamp,
  lineClamp,
  blockItem,
  BlockItem,
  iBlock,
  iBlockItem,
  grid,
  gridItem,
  flex,
  flexItem,
  hide: _ => ({ display: "none" }),

  order: undefined,
  float: undefined,
  gap: undefined,
  margin: undefined, //_LAYOUT.margin, 
  padding: undefined,// LAYOUT.padding,
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
  textAlign: undefined,
};