import { mergy, toLogicalFour } from "./func.js";

// inline wrapping: 
// block wrapping .../line-clamp-3

function lineClamp(num) {
  return {
    "display": "-webkit-box",
    "-webkit-line-clamp": num,
    "-webkit-box-orient": "vertical",
    "overflow": "hidden",
  }
}

// inline wrapping
const TextWrappingProperties = {
  "overflow-x": "visible scroll auto hidden",
  "text-overflow": "clip ellipsis",
  "white-space": "normal nowrap pre pre-wrap pre-line break-spaces ellipsis",
  "overflow-wrap": "normal break-word anywhere",
  "word-break": "normal break-all keep-all break-word",
  "hyphens": "none manual auto",
};

/break-all|keep-all|break-word|normal/;
/nowrap|pre|pre-wrap|pre-line|break-spaces|ellipsis/; //ellipsis will set both white-space: 
/hyphens|shy/;


const nowrapping = {
  nowrap: { "white-space": "nowrap" },
  ellipsis: { "white-space": "nowrap", "text-overflow": "ellipsis" },
  clip: { "white-space": "nowrap", "text-overflow": "clip" },
  pre: { "white-space": "pre" },
}

const wrapping = {
  anywhere: { "overflow-wrap": "anywhere", "word-break": "normal" }, //break-word is covered
  ""
}

const O2 = "(visible|hidden|clip)|(?:(auto|scroll)(-snap(-mandatory)?)?"; //vhc, as, snap, manda
const OVERFLOW2 = new RegExp(`^${O2}(?:\:${O2})?$`);

// /visible|hidden|clip|scroll|auto/; + snap mandatory
function overflowWrap(a) {
  const m = a.match(OVERFLOW2);
  if (!m) return;
  let [_, vhc, overflowInline = vhc, snap, man, vhc2, overflowBlock = vhc2, snap2, man2] = m;
  if (overflowBlock === overflowInline && snap2 === snap && man === man2)
    overflowBlock = snap2 = man2 = undefined;
  let scrollSnapType = snap && snap2 ? "both" : snap ? "x" : snap2 ? "y" : undefined;
  if (man || man2) scrollSnapType += " mandatory";
  if (!overflowBlock) return { overflow: overflowInline, scrollSnapType };
  return { overflow: overflowInline, overflowBlock, scrollSnapType };
}

function hyphens(a) {
  const m = a.match(/^(hyphens|shy)$/);
  if (m) return { hyphens: m[0] === "shy" ? "manual" : "auto" };
}

function whiteSpace(a) {
  const m = a.match(/^(nowrap|pre|pre-wrap|pre-line|break-spaces|ellipsis)$/);
  if (!m) return;
  if (m[0] === "ellipsis") return { "white-space": "nowrap", "text-overflow": m[0] };
  return { "white-space": m[0] };
}

function overflowWrap(a) {
  const m = a.match(/^(break-word|anywhere)$/);
  if (m) return { "overflow-wrap": m[0] };
}

function wordBreak(a){
  const m = a.match(/^(break-all|keep-all|break-word)$/);
  if (m) return { "word-break": m[0] };
}

//wrap alternatives (normal = onspace)

//ellipsis ? => hidden+hidden, hidden+auto? hidden+visible

const wordToSetting = {
  ellipsis: { "overflow-inline": "hidden", "white-space": "nowrap", "text-overflow": "ellipsis" }, //"word-break": "normal", "hyphens": "none", "overflow-wrap": "normal"
  clip: { "overflow-inline": "hidden", "white-space": "nowrap", "text-overflow": "clip" }, //"word-break": "normal", "hyphens": "none", "overflow-wrap": "normal"
  hidden: { "overflow-inline": "hidden", "white-space": "nowrap" }, //"text-overflow": "clip", "word-break": "normal", "hyphens": "none", "overflow-wrap": "normal"
  "-hyphens": { "hyphens": "auto" },
  "-shy/-wbr": { "hyphens": "manual" },

  "hyphens-manual": { "overflow-inline": "visible", "hyphens": "manual" },
}



const TextInitials = {
  "word-spacing": "initial", //gap
  "line-height": "initial",  //gap

  "text-align": "initial",  //align

  "white-space": "initial",        //wrap inline
  "overflow-wrap": "initial",      //wrap inline
  "word-break": "initial",         //wrap inline
  hyphens: "initial",              //wrap inline
  "text-overflow": "initial",      //wrap inline
  "overflow-x": "initial",         //wrap inline 

  "-webkit-line-clamp": "initial", //wrap block //wrap both??
}

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
    "align-content": AlignAliases[b],
    "justify-content": AlignAliases[i],
    "align-items": AlignAliases[b2],
    "justify-items": AlignAliases[i2],
  };
}
function doAlignSelf(_, b, i) {
  return {
    "align-self": AlignAliases[b],
    "justify-self": AlignAliases[i],
  };
}

//overflow-x:overflow-y
//overflow-inline(auto)wrap(no-wrap)snap-style-xyz(x mandatory):overflow-block
//snap-auto:
//

//wrap is a single word. ellipsis-scroll => block: ellipsis, inline: scroll
// ellipsis means wrap: nowrap, overflow: hidden
// clip means wrap: nowrap, overflow: hidden
// auto means wrap: normal, overflow: auto
// const OVERFLOW = /^(?:(ellipsis|clip)|(wrap|wrap-reverse|auto|scroll|visible)(?:-(auto|scroll|hidden|visible))?)$/;

//inline:
//  snap|auto|scroll|scroll-snap|hidden|clip|visible|ellipsis|wrap|wrap-reverse|wrap-scroll|wrap-auto|wrap-snap|wrap-scroll-snap
//  (ellipsis|clip|hidden)|(wrap-|wrap-reverse-)((auto|scroll)(-snap))(visible)(new)
//block:
// auto-snap|auto|scroll|scroll-snap|hidden|visible

//added for text
//inline:
//  
//block:
//  |line-clamp-3

const OVERFLOW = /^(?:(ellipsis|clip)|(auto|scroll|visible)(?:-(auto|scroll|hidden|visible))?)$/; //wrapInline-wrapBlock (auto-snap|auto|scroll|scroll-snap|hidden|visible|line-clamp-3)
//ellipsis/clip => hidden, //single setting means both
function doOverflow(_, t, b = "hidden", i = b) {
  return {
    "overflow-x": i,
    "overflow-inline": i,
    "overflow-y": b,
    "overflow-block": b,
    "text-overflow": t,
    "white-space": t ? "nowrap" : undefined
  };
};

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


function block(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = a.match(/^float-(start|end)$/)) return { float: "inline-" + m[1] };
    if (m = a.match(OVERFLOW)) return doOverflow(...m);
    if (m = a.match(/snap(?:-(block|inline))?(?:-(mandatory))?/)) return { "scroll-snap-type": `${m[1] ?? "both"} ${m[2] ?? "proximity"}` };
    return a;
  });
  return mergy({ display: "block" }, ...args);
}
block.scope = {
  ...LAYOUT,
};

function _block(...args) {
  return mergy(...args);
}
_block.scope = { ..._LAYOUT };

const GRID_ALIGN = /^([abcsuvw.])([abcsuvw.])([abcs_.])([abcs])$/;
const _GRID_ALIGN = /([abcs_.])([abcs])/;

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = a.match(/(dense)-?(column)/))
      return { ["grid-auto-flow"]: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(GRID_ALIGN)) return doAlign(...m);
    if (m = a.match(OVERFLOW)) return doOverflow(...m);
    if (m = a.match(/snap(?:-(block|inline))?(?:-(mandatory))?/))
      return { "scroll-snap-type": `${m[1] ?? "both"} ${m[2] ?? "proximity"}` };
    return a;
  });
  return mergy({ display: "grid" }, ...args);
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
    let m;
    if (m = a.match(/^(column|column-reverse|row-reverse|row)$/)) return { ["flex-direction"]: a };
    if (m = a.match(/^(wrap|wrap-reverse|no-wrap)$/)) return { ["flex-wrap"]: a };
    if (m = a.match(/^([abcsuvw.])([abcsuvw.])?([abcs_])?$/)) return doAlign(...m);
    if (m = a.match(OVERFLOW)) return doOverflow(...m);
    if (m = a.match(/snap(?:-(block|inline))?(?:-(mandatory))?/))
      return { "scroll-snap-type": `${m[1] ?? "both"} ${m[2] ?? "proximity"}` };
    return a;
  });
  return mergy({ display: "flex" }, ...args);
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