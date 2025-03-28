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
    overflow: "hidden",
  }
}

const LineClamp = { //$block(lineClamp(3),...)
  lineClamp: toLineClamp,
  clamp: toLineClamp,
}

const TextAlignAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "justify",
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

function doAlign(_, b, i, b2, i2) {
  return {
    textAlign: TextAlignAliases[i] ?? "unset",
    alignContent: AlignAliases[b],
    justifyContent: AlignAliases[i],
    alignItems: AlignAliases[b2],
    justifyItems: AlignAliases[i2],
  };
}
function doAlignSelf(_, b, i) {
  return {
    textAlign: TextAlignAliases[i] ?? "unset",
    alignSelf: AlignAliases[b],
    justifySelf: AlignAliases[i],
  };
}
// todo this doesn't need to be in the scope here.
//todo because we only 
const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  p: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  m: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin")
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

function textAlign(a) {
  if (a = a.match(/^[abcs]$/))
    return ({ textAlign: TextAlignAliases[a[0]] });
}

function toBlockGap(wordSpacing, lineHeight) {
  return { wordSpacing, lineHeight };
}

function block(...args) {
  args = args.map(a => typeof a === "string" ? wrap(a) ?? textAlign(a) : a);
  return Object.assign(...args);
}
block.scope = {
  ...LAYOUT,
  ...LineClamp,
  gap: toBlockGap,
  g: toBlockGap,
};

function _block(...args) {
  args = args.map(a => typeof a === "string" ? doFloat(a) : a);
  return Object.assign(...args);
}
_block.scope = {   //$_block(indent(1em),...)
  ..._LAYOUT,
  //todo these are not necessary. they are native functions?
  //todo the thing we need instead is a filter that says which properties are valid when we mergy the different layout 
  // textIndent: (...args) => ({ textIndent: args.join(" ") }), 
  indent: (...args) => ({ textIndent: args.join(" ") }),
};

const GRID_ALIGN = /^([abcsuvw.])([abcsuvw.])([abcs_.])([abcs])$/;
const _GRID_ALIGN = /^([abcs_.])([abcs_.])?$/;

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m = wrap(a);
    if (m) return m;
    if (m = a.match(/(dense)-?(column)/))
      return { gridAutoFlow: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(GRID_ALIGN)) return doAlign(...m);
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
    if (!(typeof a === "string")) return a;
    let m;
    // Handle alignment values with pattern similar to flex container
    if (m = a.match(_GRID_ALIGN)) {
      const [_, alignChar, justifyChar = alignChar] = m;
      
      // If both are the same and not "." (unset), use place-self shorthand
      if (alignChar === justifyChar && alignChar !== '.') {
        return { placeSelf: AlignAliases[alignChar] };
      }
      
      // Otherwise set them individually, but only if not "."
      const result = {};
      if (alignChar !== '.') result.alignSelf = AlignAliases[alignChar];
      if (justifyChar !== '.') result.justifySelf = AlignAliases[justifyChar];
      return result;
    }
    return a;
  });
  return Object.assign(...args);
}
_grid.scope = {
  ..._LAYOUT,
  column: (...args) => {
    if (args.length === 1) return { ["grid-column"]: args[0] };
    if (args.length === 2) {
      if (args[0] === "") return { ["grid-column-end"]: args[1] };
      if (args[1] === "") return { ["grid-column-start"]: args[0] };
      return { ["grid-column"]: `${args[0]} / ${args[1]}` };
    }
    throw new SyntaxError("column accepts only 1 or 2 arguments");
  },
  row: (...args) => {
    if (args.length === 1) return { ["grid-row"]: args[0] };
    if (args.length === 2) {
      if (args[0] === "") return { ["grid-row-end"]: args[1] };
      if (args[1] === "") return { ["grid-row-start"]: args[0] };
      return { ["grid-row"]: `${args[0]} / ${args[1]}` };
    }
    throw new SyntaxError("row accepts only 1 or 2 arguments");
  },
  // area: (...args) => ({ ["grid-area"]: args.join(" ") }),
  columnSpan: (span) => ({ ["grid-column"]: `span ${span}` }),
  rowSpan: (span) => ({ ["grid-row"]: `span ${span}` })
};




function flex(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m = wrap(a);
    if (m) return m;
    if (m = a.match(/^(column|column-reverse|row-reverse|row)$/)) return { ["flex-direction"]: a };
    if (m = a.match(/^(wrap|wrap-reverse|no-wrap)$/)) return { ["flex-wrap"]: a };
    if (m = a.match(/^([abcsuvw.])([abcsuvw.])?([abcs_])?$/)) return doAlign(...m);
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
    if (m = a.match(GROW)) return { ["flex-grow"]: m[1] };
    if (m = a.match(SHRINK)) return { ["flex-shrink"]: m[1] };
    if (m = a.match(ORDER)) return { ["order"]: m[1] };
    if (m = a.match(/([abcs_])/)) return doAlignSelf(...m);
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