import { toLogicalFour, default as AllFunctions } from "./func.js";

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

function lineClamp(lines, ...args) {
  return Object.assign(block(...args), {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden"
  });
}

const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
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
  ...ALIGNMENTS.textAlign,
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
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
  checkReferenceError(args);
  return defaultLayout("block", ...args);
}
block.scope = {
  ...LAYOUT,
  ...OVERFLOWS,
  lineClamp,
  clamp: lineClamp,
  gap: blockGap,
  g: blockGap,
};
function _block(...args) {
  checkReferenceError(args);
  return Object.assign({}, ...args);
}
_block.scope = {
  ..._LAYOUT,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
};

function grid(...args) {
  checkReferenceError(args);
  return defaultLayout("grid", { placeItems: "unset", placeContent: "unset" }, ...args);
}
const nativeGrid = Object.fromEntries(Object.entries(AllFunctions).filter(([k]) => k.match(/^grid[A-Z]/)));
grid.scope = {
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.placeItems,
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
  checkReferenceError(args);
  return Object.assign({}, ...args);
}
_grid.scope = {
  ...ALIGNMENTS.placeSelf,
  ..._LAYOUT,
  column,
  row,
};




function flex(...args) {
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
  ...OVERFLOWS,
  ...ALIGNMENTS.placeContent,
  ...ALIGNMENTS.alignItems,
  ...LAYOUT,
  ...GAP
};
function _flex(...args) {
  checkReferenceError(args);
  return Object.assign({}, ...args);
}

_flex.scope = {
  ..._LAYOUT,
  ...ALIGNMENTS.alignSelf,
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