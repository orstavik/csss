import { mergy, toLogicalFour } from "./func.js";

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

//wrap is a single word. ellipsis-scroll => block: ellipsis, inline: scroll
const OVERFLOW = /^(?:(ellipsis|clip)|(auto|scroll|visible)(?:-(auto|scroll|hidden|visible))?)$/;
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
  ["grid-auto-columns"]: (...args) => ({ ["grid-auto-columns"]: args.join(" ") }),
  ["grid-auto-rows"]: (...args) => ({ ["grid-auto-rows"]: args.join(" ") }),
  ["grid-template-areas"]: (...args) => ({ ["grid-template-areas"]: args.join(" ") }),
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