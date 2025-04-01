import { toLogicalFour, default as AllFunctions } from "./func.js";

const O2 = "(?:(visible|hidden|clip)|(auto|scroll)(?:-snap(?:-mandatory)?)?)";
const OVERFLOW2 = new RegExp(`^${O2}(?::${O2})?$`); //$block(hidden:scroll-snap-mandatory,...)

//todo rename the text block layout unit to $page

function overflow(a) {
  const m = a.match(OVERFLOW2);
  if (!m) return;
  let [_, vhc, overflowInline = vhc, snap, man, vhc2, overflowBlock = vhc2, snap2, man2] = m;
  const res = (overflowBlock && (overflowBlock !== overflowInline && snap2 !== snap && man !== man2)) ?
    { overflowX: overflowInline, overflowY: overflowBlock } :
    { overflow: overflowInline };
  if (snap || snap2) {
    res.scrollSnapType = snap && snap2 ? "both" : snap ? "x" : "y";
    if (man || man2) res.scrollSnapType += " mandatory";
  }
  return res;
}

function hyphens(a) { //$block(shy,...)
  const m = a.match(/^(hyphens|shy)$/);
  if (m) return { hyphens: m[0] === "shy" ? "manual" : "auto" };
}

function whiteSpace(a) { //$block(pre-wrap,...)
  const m = a.match(/^(nowrap|pre|pre-wrap|pre-line|break-spaces|ellipsis)$/);
  if (m?.[0] === "ellipsis") return { whiteSpace: "nowrap", textOverflow: m[0] };
  if (m) return { whiteSpace: m[0] };
}

function overflowWrap(a) { //$block(break-word,...)
  const m = a.match(/^(break-word|anywhere)$/);
  if (m) return { overflowWrap: m[0] };
}

function wordBreak(a) { //$block(break-all,...)
  const m = a.match(/^(break-all|keep-all)$/);
  if (m) return { wordBreak: m[0] };
}

function wrap(a) {
  return wordBreak(a) ?? overflow(a) ?? whiteSpace(a) ?? hyphens(a) ?? overflowWrap(a);
}

function toLineClamp(num, ...ignored) {
  return {
    "display": "-webkit-box",
    WebkitLineClamp: num,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden",
  }
}

const TextAlignAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "justify",
  u: "unset",
  v: "unset",
  w: "unset",
  _: "unset",
  ".": "unset",
};
const AlignAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "stretch",
  u: "space-around", //narrow stretch
  v: "space-evenly", //medium stretch
  w: "space-between",//wide stretch
  _: "baseline",     //todo what about "(first|last) baseline"
  ".": "unset",
};

const AlignItemsFlexAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "stretch",
  u: "stretch",
  v: "stretch",
  w: "stretch",
  _: "start",
  ".": "unset",
};

// todo this doesn't need to be in the scope here.
//todo because we only 
//todo move this into the NativeCssPropertis in func.js
const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  p: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
  textAlign: AllFunctions.textAlign,
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  m: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textAlign: AllFunctions.textAlign,
  // verticalAlign: AllFunctions.verticalAlign, //todo is this allowed for grid and flex?
};

function toGap(...args) {
  if (args.length === 1)
    return { gap: args[0] };
  if (args.length === 2)
    return { columnGap: args[0], rowGap: args[1] };
  throw new SyntaxError("gap only accepts 1 or 2 arguments");
}
const GAP = { gap: toGap, g: toGap };

function doFloat(a) {
  const m = a.match(/^float-(start|end)$/);
  if (m) return { float: "inline-" + m[1] };
}

function blockGap(wordSpacing, lineHeight) {
  return { wordSpacing, lineHeight };
}

function block(...args) {
  args = args.map(a => {
    if (typeof a !== "string") return a;
    let m;
    if (m = wrap(a))
      return m;
    if (m = a.match(/^[abcs]$/))
      return ({ textAlign: TextAlignAliases[a[0]] });
  });
  return Object.assign(...args);
}
block.scope = {
  ...LAYOUT,
  lineClamp,
  clamp: lineClamp,
  gap: blockGap,
  g: blockGap,
};

function _block(...args) {
  args = args.map(a => typeof a === "string" ? doFloat(a) : a);
  return Object.assign(...args);
}
_block.scope = {   //$_block(indent(1em),...)
  ..._LAYOUT,
  textIndent: AllFunctions.textIndent,
  indent: AllFunctions.textIndent,
};

const GRID_ALIGN = /^([abcsuvw.])([abcsuvw.])([abcs_.])([abcs])$/;
const _GRID_ALIGN = /([abcs_.])([abcs])/;

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = wrap(a))
      return m;
    if (m = a.match(/(dense)-?(column)/))
      return { gridAutoFlow: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_.]?[abcs]?$/)) {
      const [b, i = b, b2 = ".", i2 = b2] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        placeContent: [AlignAliases[b], AlignAliases[i]].join(" "),
        placeItems: [AlignAliases[b2], AlignAliases[i2]].join(" "),
      };
    }
    return a;
  });
  
  // Always include 'display: grid' in the result
  return Object.assign({ display: "grid" }, ...args);
}
const nativeGrid = Object.fromEntries(Object.entries(AllFunctions).filter(
  ([k]) => k.match(/^grid[A-Z]/)));
grid.scope = {
  ...nativeGrid,
  cols: nativeGrid.gridTemplateColumns,
  rows: nativeGrid.gridTemplateRows,
  areas: nativeGrid.gridTemplateAreas,
  ...LAYOUT,
  ...GAP
};

function _grid(...args) {
  args = args.map(a => {
    if (typeof a !== "string") return a;
    let m;
    if (m = a.match(/^[abcs_.][abcs_.]?$/)) {
      const [b, i = b] = m[0];
      return {
        textAlign: TextAlignAliases[i],
        placeSelf: [AlignAliases[b], AlignAliases[i]].join(" "),
      };
    }
    return a;
  });
  return Object.assign(...args);
}

const column = (start, end = start) => ({ ["grid-column"]: `${start} / ${end}` });
const row = (start, end = start) => ({ ["grid-row"]: `${start} / ${end}` });
const span = arg => `span ${arg}`;
column.scope = { span };
row.scope = { span };

_grid.scope = {
  ..._LAYOUT,
};




function flex(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m = wrap(a);
    if (m) return m;
    if (m = a.match(/^(column|column-reverse|row-reverse|row)$/)) return { ["flex-direction"]: a };
    if (m = a.match(/^(wrap|wrap-reverse|no-wrap)$/)) return { ["flex-wrap"]: a };
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_]?$/)) {
      const [b, i = b, i2 = "."] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        placeContent: [AlignAliases[b], AlignAliases[i]].join(" "),
        alignItems: AlignItemsFlexAliases[i2],
      };
    }
    if (m = wrap(a)) return m;
    return a;
  });
  return Object.assign(...args);
}
flex.scope = {
  ...LAYOUT,
  ...GAP
};

const GROW = /^([0-9.]+)(grow|g)$/;
const SHRINK = /^([0-9.]+)(shrink|s)$/;
const ORDER = /^(-?\d+)(order|o)$/;

function _flex(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = a.match(GROW)) return { flexGrow: m[1] };
    if (m = a.match(SHRINK)) return { flexShrink: m[1] };
    if (m = a.match(ORDER)) return { order: m[1] };
    if (m = a.match(/^[abcs_]$/))
      return {
        alignItems: AlignAliases[m[0]],
        textAlign: TextAlignAliases[m[0]]
      };
    //todo safe
    return a;
  });
  return Object.assign(...args);
}

_flex.scope = {
  ..._LAYOUT,
  basis: a => ({ ["flex-basis"]: a })
};

export default {
  block,
  _block,
  grid,
  _grid,
  flex,
  _flex
};