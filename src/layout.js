import { mergy, defaultValues, toLogicalFour } from "./func.js";

const O2 = "(?:(visible|hidden|clip)|(auto|scroll)(?:-snap(?:-mandatory)?)?)$"; 
const OVERFLOW2 = new RegExp(`^${O2}(?:\:${O2})?$`); //$block(hidden:scroll-snap-mandatory,...)

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
  if (m?.[0] === "ellipsis") return { "white-space": "nowrap", "text-overflow": m[0] };
  if (m) return { "white-space": m[0] };
}

function overflowWrap(a) { //$block(break-word,...)
  const m = a.match(/^(break-word|anywhere)$/);
  if (m) return { "overflow-wrap": m[0] };
}

function wordBreak(a) { //$block(break-all,...)
  const m = a.match(/^(break-all|keep-all|break-word)$/);
  if (m) return { "word-break": m[0] };
}

function wrap(a) {
  return wordBreak(a) ?? overflow(a) ?? whiteSpace(a) ?? hyphens(a) ?? overflowWrap(a);
}

function toLineClamp(num, ...ignored) {
  return {
    "display": "-webkit-box",
    "-webkit-line-clamp": num,
    "-webkit-box-orient": "vertical",
    "overflow-block": "hidden",
  }
}

const LineClamp = { //$block(line-clamp(3),...)
  "line-clamp": toLineClamp,
  clamp: toLineClamp,
}

const BLOCK_RESET = {
  "word-spacing": "initial",
  "line-height": "initial",
  "white-space": "initial",
  hyphens: "initial",
  "text-align": "initial",
  "text-indent": "initial",
  "text-transform": "none",
  // "text-decoration": "none", already doesn't inherit.
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
  ".": undefined,
};

function doAlign(_, b, i, b2, i2) {
  return {
    "text-align": TextAlignAliases[i] ?? "initial",
    "align-content": AlignAliases[b],
    "justify-content": AlignAliases[i],
    "align-items": AlignAliases[b2],
    "justify-items": AlignAliases[i2],
  };
}
function doAlignSelf(_, b, i) {
  return {
    "text-align": TextAlignAliases[i] ?? "initial",
    "align-self": AlignAliases[b],
    "justify-self": AlignAliases[i],
  };
}

const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  p: toLogicalFour.bind(null, "padding"),
  "scroll-padding": toLogicalFour.bind(null, "scroll-padding"),
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  m: toLogicalFour.bind(null, "margin"),
  "scroll-margin": toLogicalFour.bind(null, "scroll-margin")
};

function toGap(...args) {
  if (args.length === 1)
    return { gap: args[0] };
  if (args.length === 2)
    return { "column-gap": args[0], "row-gap": args[1] };
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
  args = args.map(a => typeof a === "string" ?  wrap(a) ?? textAlign(a) : a);
  return defaultValues({ display: "block", ...BLOCK_RESET }, mergy(...args));
}
block.scope = {
  ...LAYOUT,
  ...LineClamp,
  gap: toBlockGap,
  g: toBlockGap,
};

function _block(...args) {
  args = args.map(a => typeof a === "string" ? doFloat(a) : a);
  return mergy(...args);
}
_block.scope = {   //$_block(indent(1em),...)
  ..._LAYOUT,
  "text-indent": (...args) => ({ "text-indent": args.join(" ") }),
  indent: (...args) => ({ "text-indent": args.join(" ") }),
};

const GRID_ALIGN = /^([abcsuvw.])([abcsuvw.])([abcs_.])([abcs])$/;
const _GRID_ALIGN = /([abcs_.])([abcs])/;

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m = wrap(a);
    if (m) return m;
    if (m = a.match(/(dense)-?(column)/))
      return { ["grid-auto-flow"]: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(GRID_ALIGN)) return doAlign(...m);
    return a;
  });
  return defaultValues({ display: "grid", ...BLOCK_RESET }, mergy(...args));
}
grid.scope = {
  ["grid-auto-rows"]: (...args) => ({ ["grid-auto-rows"]: args.join(" ") }),
  ["grid-auto-columns"]: (...args) => ({ ["grid-auto-columns"]: args.join(" ") }),
  ["grid-template-rows"]: (...args) => ({ ["grid-template-rows"]: args.join(" ") }),
  ["grid-template-columns"]: (...args) => ({ ["grid-template-columns"]: args.join(" ") }),
  cols: (...args) => ({ ["grid-template-columns"]: args.join(" ") }),
  rows: (...args) => ({ ["grid-template-rows"]: args.join(" ") }),
  ["grid-template-areas"]: (...args) => ({ ["grid-template-areas"]: args.join(" ") }),
  areas: (...args) => ({ ["grid-template-areas"]: args.join(" ") }),
  ...LAYOUT,
  ...GAP
};

function _grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = a.match(_GRID_ALIGN)) return doAlignSelf(...m);
    return a;
  });
  return mergy(...args);
}
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
    if (m = a.match(/^([abcsuvw.])([abcsuvw.])?([abcs_])?$/)) return doAlign(...m);
    if (m = wrap(a)) return m;
    return a;
  });
  return defaultValues({ display: "flex", ...BLOCK_RESET }, mergy(...args));
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
  return mergy(...args);
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