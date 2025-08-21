import { toLogicalFour, default as AllFunctions } from "./func.js";

const PLACECONTENT = /^content(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|Stretch|Around|Between|Evenly|Baseline|First|Last)(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|Stretch|Around|Between|Evenly|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight)?$/;
const PLACEITEMS = /^items(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight|Baseline|First|Last|Stretch|AnchorCenter|Legacy|LegacyLeft|LegacyRight|LegacyCenter)?$/;
const PLACESELF = /^self(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight|Baseline|First|Last|Stretch|AnchorCenter)?$/;
const ALIGNITEMS = /^items(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)$/;
const ALIGNSELF = /^self(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)$/;
const TEXTALIGN = /^text(Normal|Start|End|Center|Justify|Left|Right)$/;

function placeAlign(prop, regex, str) {
  const m = str.match(regex);
  if (!m) return;
  let [_, a, b] = m;
  if (b && b != a) a += " " + b;
  return { [prop]: lowSpaceKebab(a) };
}

function lowSpaceKebab(str) {
  return str
    .replace(/Around|Between|Evenly/g, "space-$&")
    .replace(/(Unsafe|Safe|Legacy)(?!$)/g, "$& ")
    .replace(/(Self|Flex|Anchor)(?!$)/g, "$&-")
    .replaceAll(/First|Last/g, "$& baseline")
    .toLowerCase();
}

const placeContent = str => placeAlign("placeContent", PLACECONTENT, str);
const placeItems = str => placeAlign("placeItems", PLACEITEMS, str);
const placeSelf = str => placeAlign("placeSelf", PLACESELF, str);
const alignItems = str => placeAlign("alignItems", ALIGNITEMS, str);
const alignSelf = str => placeAlign("alignSelf", ALIGNSELF, str);
const textAlign = str => placeAlign("textAlign", TEXTALIGN, str);

//todo rename the text block layout unit to $page
function defaultLayout(display, ...args) {
  const containerDefaults = {
    wordSpacing: "unset",
    lineHeight: "unset",
    whiteSpace: "unset",
    hyphens: "unset",
    textAlign: "unset",
    textIndent: "unset",
  };
  return Object.assign({ display }, containerDefaults, ...args);
}
function checkReferenceError(args) {
  for (let a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
}
// const O2 = /^(|inline|block)(visible|hidden|clip)|(auto|scroll)(-snap(-mandatory)?)?$/

const O2 = /^(visible|hidden|clip)|(auto|scroll)(-snap(-mandatory)?)?$/
function overflow(a) {
  let [inline, block] = a.split(":");
  const mI = inline.match(O2);
  if (!mI) return;
  const [, vhcI, overflowInline = vhcI, snapI, manI] = mI;
  const mB = block?.match(O2);
  let vhcB, overflowBlock, snapB, manB;
  if (mB)
    ([, vhcB, overflowBlock = vhcB, snapB, manB] = mB);
  const res = (!overflowBlock || overflowBlock == overflowInline) ?
    { overflow: overflowInline } :
    { overflowInline, overflowBlock };
  if (!snapI && !snapB) return res;
  res.scrollSnapType = snapI && snapB ? "both" : snapI ? "inline" : "block";
  if (manI || manB) res.scrollSnapType += " mandatory";
  return res;
}

function lineClamp(lines, ...args) {
  return Object.assign(block(...args), {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden"
    // overflowY: "hidden"
  });
}

// function checkNoArgs(args) {
//   if (args.some(a => a != null)) throw `This $short takes no arguments: ${args.join(", ")}")}`;
// }
// const TextAlignAliases = {
//   a: "start",
//   b: "end",
//   c: "center",
//   s: "justify",
//   u: "unset",
//   v: "unset",
//   w: "unset",
//   _: "unset",
//   ".": "unset",
// };
// const AlignAliases = {
//   a: "start",
//   b: "end",
//   c: "center",
//   s: "stretch",
//   u: "space-around", //narrow stretch
//   v: "space-evenly", //medium stretch
//   w: "space-between",//wide stretch
//   _: "baseline",     //todo what about "(first|last) baseline"
//   ".": "unset",
// };

// const AlignItemsFlexAliases = {
//   a: "start",
//   b: "end",
//   c: "center",
//   s: "stretch",
//   u: "stretch",
//   v: "stretch",
//   w: "stretch",
//   _: "start",
//   ".": "unset",
// };

// todo this doesn't need to be in the scope here.
//todo because we only 
//todo move this into the NativeCssPropertis in func.js
const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  // p: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
  textAlign: AllFunctions.textAlign,
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  nowrap: { whiteSpace: "nowrap" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  pre: { whiteSpace: "pre" },
  breakSpaces: { whiteSpace: "break-spaces" },
  ellipsis: { whiteSpace: "nowrap", textOverflow: "ellipsis" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  // m: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textIndent: AllFunctions.textIndent,
  indent: AllFunctions.textIndent,
  w: AllFunctions.width,
  h: AllFunctions.height,
  width: AllFunctions.width,
  height: AllFunctions.height,
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

function toGap(...args) {
  if (!args.length || args.length > 2)
    throw new SyntaxError("gap only accepts 1 or 2 arguments");
  if (args.length == 1 || args.length == 2 && args[0] == args[1])
    return { gap: args[0] };
  args = args.map(a => a == "unset" ? "normal" : a);
  return { gap: args[0] + " " + args[1] };
}
const GAP = { gap: toGap, g: toGap };

function blockGap(wordSpacing, lineHeight) {
  return { wordSpacing, lineHeight };
}

function block(...args) {
  args = args.map(a => typeof a !== "string" ? a : textAlign(a) ?? overflow(a) ?? a);
  checkReferenceError(args);
  return defaultLayout("block", ...args);
}
block.scope = {
  ...LAYOUT,
  lineClamp,
  clamp: lineClamp,
  gap: blockGap,
  g: blockGap,
};
function _block(...args) {
  checkReferenceError(args);
  return Object.assign(...args);
}
_block.scope = {
  ..._LAYOUT,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
};

function grid(...args) {
  args = args.map(a =>
    typeof a != "string" ? a :
      textAlign(a) ??
      placeContent(a) ??
      placeItems(a) ??
      overflow(a) ??
      a);
  checkReferenceError(args);
  return defaultLayout("grid", { placeItems: "unset", placeContent: "unset" }, ...args);
}
const nativeGrid = Object.fromEntries(Object.entries(AllFunctions).filter(([k]) => k.match(/^grid[A-Z]/)));
grid.scope = {
  ...nativeGrid,
  cols: nativeGrid.gridTemplateColumns,
  columns: nativeGrid.gridTemplateColumns,
  rows: nativeGrid.gridTemplateRows,
  areas: nativeGrid.gridTemplateAreas,
  ...LAYOUT,
  ...GAP,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
}
grid.regex = new Map([[
  /one/, function () { },
  /two/, function () { },
]])
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
const column = (start, end) => ({ gridColumn: end ? `${start} / ${end}` : start });
const row = (start, end) => ({ gridRow: end ? `${start} / ${end}` : start });
const span = arg => `span ${arg}`;
column.scope = { span };
row.scope = { span };

function _grid(...args) {
  args = args.map(a => typeof a == "string" ? placeSelf(a) ?? a : a);
  checkReferenceError(args);
  return Object.assign(...args);
}
_grid.scope = {
  ..._LAYOUT,
  column,
  row,
};




function flex(...args) {
  args = args.map(a => typeof a != "string" ? a : overflow(a) ?? placeContent(a) ?? alignItems(a) ?? textAlign(a) ?? a);
  checkReferenceError(args);
  return defaultLayout("flex", { alignItems: "unset", placeContent: "unset" }, ...args);
}
flex.scope = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...LAYOUT,
  ...GAP
};
function _flex(...args) {
  args = args.map(a => typeof a == "string" ? alignSelf(a) ?? a : a);
  checkReferenceError(args);
  return Object.assign(...args);
}

_flex.scope = {
  ..._LAYOUT,
  basis: a => ({ flexBasis: a }),
  grow: a => ({ flexGrow: a }),
  // g: a => ({ flexGrow: a }),
  shrink: a => ({ flexShrink: a }),
  // s: a => ({ flexShrink: a }),
  order: a => ({ order: a }),
  // o: a => ({ order: a }),
  //todo safe
};

const startsWithGridUndefined = Object.fromEntries(Object.entries(AllFunctions).filter(([k]) => k.match(/^grid[A-Z]/)).map(([k]) => [k]));
const startsWithFlexUndefined = Object.fromEntries(Object.entries(AllFunctions).filter(([k]) => k.match(/^flex[A-Z]/)).map(([k]) => [k]));

//todo undefining!!
//todo just run through all the functions inside the scope of the layout functions, get their keys, and then add a second entry with `flex` and `grid` as prefix
//todo and then make a new object with those values set to undefined. and then remove those from the default below.
//todo will not work, i think we must do it manually.

export default {
  ...startsWithFlexUndefined,
  ...startsWithGridUndefined,
  order: undefined,
  float: undefined,
  gap: undefined,
  //are there other layout functions that we really want to block? yes.. All the ones that has to do with grid and flex and float.  
  margin: _LAYOUT.margin, //undefined,
  padding: LAYOUT.padding,//undefined,

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

  block,
  _block,
  grid,
  _grid,
  flex,
  _flex,
  lineClamp,
};