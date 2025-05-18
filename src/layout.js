import { toLogicalFour, default as AllFunctions } from "./func.js";

const O2 = "(?:(visible|hidden|clip)|(auto|scroll)(?:-snap(?:-mandatory)?)?)";
const OVERFLOW2 = new RegExp(`^${O2}(?::${O2})?$`); //$block(hidden:scroll-snap-mandatory,...)

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
  return wordBreak(a) ?? overflow(a) ?? whiteSpace(a) ?? overflowWrap(a); //?? hyphens(a) 
}

function checkNoArgs(args) {
  if (args.some(a => a != null)) throw `This $short takes no arguments: ${args.join(", ")}")}`;
}

function lineClamp(num) {
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
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  m: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textAlign: AllFunctions.textAlign,
  w: AllFunctions.width,
  h: AllFunctions.height,
  width: AllFunctions.width,
  height: AllFunctions.height,
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
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}
_block.scope = {
  ..._LAYOUT,
  float: a => ({ float: "inline-" + a }),
  textIndent: AllFunctions.textIndent,
  indent: AllFunctions.textIndent,
};

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = wrap(a))
      return m;
    // if (m = a.match(/(dense)-?(column|row|)/))
    //   return { gridAutoFlow: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_.]?[abcs]?$/)) {
      const [b, i = b, b2 = ".", i2 = b2] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        alignContent: AlignAliases[b],
        justifyContent: AlignAliases[i],
        alignItems: AlignAliases[b2],
        justifyItems: AlignAliases[i2],
      };
    }
    throw new ReferenceError(a);
  });
  return defaultLayout("grid", ...args);
}
const nativeGrid = Object.fromEntries(Object.entries(AllFunctions).filter(
  ([k]) => k.match(/^grid[A-Z]/)));
grid.scope = {
  placeContent: AllFunctions.placeContent,
  justifyContent: AllFunctions.justifyContent,
  alignContent: AllFunctions.alignContent,
  placeItems: AllFunctions.placeItems,
  justifyItems: AllFunctions.justifyItems,
  alignItems: AllFunctions.alignItems,
  ...nativeGrid,
  cols: nativeGrid.gridTemplateColumns,
  rows: nativeGrid.gridTemplateRows,
  areas: nativeGrid.gridTemplateAreas,
  ...LAYOUT,
  ...GAP,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

const column = (start, end = start) => ({ gridColumn: `${start} / ${end}` });
const row = (start, end = start) => ({ gridRow: `${start} / ${end}` });
const span = arg => `span ${arg}`;
column.scope = { span };
row.scope = { span };

function _grid(...args) {
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}
_grid.scope = {
  ..._LAYOUT,
  column,
  row,
  placeSelf: AllFunctions.placeSelf,
  justifySelf: AllFunctions.justifySelf,
  alignSelf: AllFunctions.alignSelf,
  // area: (...args) => ({ ["grid-area"]: args.join(" ") }),
  align: a => {
    const m = a.match(/^[abcs_.][abcs_.]?$/)?.[0];
    if (!m)
      throw `$_grid|$align(${a}): "${a}" doesn't match /^[abcs_.][abcs_.]?$/`;
    const [b, i = b] = m[0];
    return {
      textAlign: TextAlignAliases[i],
      alignSelf: AlignAliases[b],
      justifySelf: AlignAliases[i],
    };
  }
};




function flex(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m = wrap(a);
    if (m) return m;
    if (m = a.match(/^(column|column-reverse|row-reverse|row)$/)) return { flexDirection: a };
    if (m = a.match(/^(wrap|wrap-reverse|no-wrap)$/)) return { flexWrap: a };
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_]?$/)) {
      const [b, i = b, i2 = "."] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        alignContent: AlignAliases[b],
        justifyContent: AlignAliases[i],
        alignItems: AlignItemsFlexAliases[i2],
      };
    }
    if (m = wrap(a)) return m;
    throw new ReferenceError(a);
  });
  return defaultLayout("flex", ...args);
}
flex.scope = {
  placeContent: AllFunctions.placeContent,
  justifyContent: AllFunctions.justifyContent,
  alignContent: AllFunctions.alignContent,
  alignItems: AllFunctions.alignItems,
  ...LAYOUT,
  ...GAP
};
function _flex(...args) {
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}

_flex.scope = {
  ..._LAYOUT,
  basis: a => ({ flexBasis: a }),
  grow: a => ({ flexGrow: a }),
  g: a => ({ flexGrow: a }),
  shrink: a => ({ flexShrink: a }),
  s: a => ({ flexShrink: a }),
  order: a => ({ order: a }),
  o: a => ({ order: a }),
  //todo safe
  center: (...args) => (checkNoArgs(args), ({ alignSelf: "center", textAlign: "center" })),
  end: (...args) => (checkNoArgs(args), ({ alignSelf: "end", textAlign: "end" })),
  start: (...args) => (checkNoArgs(args), ({ alignSelf: "start", textAlign: "start" })),
  stretch: (...args) => (checkNoArgs(args), ({ alignSelf: "stretch", textAlign: "stretch" })),
  baseline: (...args) => (checkNoArgs(args), ({ alignSelf: "baseline", textAlign: "unset" })),
  alignSelf: AllFunctions.alignSelf,
  textAlign: AllFunctions.textAlign,
};

export default {
  block,
  _block,
  grid,
  _grid,
  flex,
  _flex,
};