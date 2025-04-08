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

function lineClamp(num, ...ignored) {
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

function grid(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = wrap(a)) return m;
    if (m = a.match(/(dense)-?(column)/))
      return { gridAutoFlow: `${m[1]} ${m[2] || "row"}` };
    if (m = a.match(/^[abcsuvw._]{1,4}$/)) {
      const sh = m[0];
      let cont_v, cont_h, item_v, item_h;
      switch(sh.length) {
        case 1:
          cont_v = cont_h = item_v = item_h = sh[0];
          break;
        case 2:
          cont_v = sh[0];
          cont_h = sh[1];
          item_v = sh[0];
          item_h = sh[1];
          break;
        case 3:
          cont_v = sh[0];
          cont_h = sh[1];
          item_v = sh[2];
          item_h = sh[1];
          break;
        default:
          cont_v = sh[0];
          cont_h = sh[1];
          item_v = sh[2];
          item_h = sh[3];
          break;
      }
      const styles = {};
      if (cont_v !== '.' || cont_h !== '.') {
        const arr = [];
        if (cont_v !== '.') arr.push(AlignAliases[cont_v]);
        if (cont_h !== '.') arr.push(AlignAliases[cont_h]);
        if (arr.length) styles.placeContent = arr.join(' ');
      }
      if (item_v !== '.' || item_h !== '.') {
        const arr = [];
        if (item_v !== '.') arr.push(AlignAliases[item_v]);
        if (item_h !== '.') arr.push(AlignAliases[item_h]);
        if (arr.length) styles.placeItems = arr.join(' ');
      }
      if (item_h !== '.' && TextAlignAliases[item_h])
        styles.textAlign = TextAlignAliases[item_h];
      return styles;
    }
    return a;
  });
  return Object.assign({ display: 'grid' }, ...args);
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
    if (m = a.match(/^[abcsuvw._]{1,2}$/)) {
      const sh = m[0];
      let item_v, item_h;
      if (sh.length === 1) {
        item_v = item_h = sh[0];
      } else {
        item_v = sh[0];
        item_h = sh[1];
      }
      const styles = {
        placeSelf: [AlignAliases[item_v], AlignAliases[item_h]].join(' ')
      };
      if (item_h !== '.' && TextAlignAliases[item_h])
        styles.textAlign = TextAlignAliases[item_h];
      return styles;
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
  column, row,
  // area: (...args) => ({ ["grid-area"]: args.join(" ") }),

};




function flex(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = a.match(/^(column|column-reverse|row-reverse|row)$/)) return { ["flex-direction"]: a };
    if (m = a.match(/^(wrap|wrap-reverse|no-wrap)$/)) return { ["flex-wrap"]: a };
    // Original alignment logic commented out
    // if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_]?$/)) {
    //   const [b, i = b, i2 = "."] = m[0];
    //   return {
    //     textAlign: TextAlignAliases[i2],
    //     placeContent: [AlignAliases[b], AlignAliases[i]].join(" "),
    //     alignItems: AlignItemsFlexAliases[i2],
    //   };
    // }

    if (m = a.match(/^([abcsuvw._]{1,3})$/)) {
        const alignStr = m[1];
        const b = alignStr[0];
        const i = alignStr.length > 1 ? alignStr[1] : '.';
        const i2 = alignStr.length > 2 ? alignStr[2] : '.';
        const styles = {};

        const effective_i = alignStr.length === 1 ? b : i;
        if (TextAlignAliases[effective_i]) styles.textAlign = TextAlignAliases[effective_i];

        const justifyContentVal = effective_i !== '.' ? AlignAliases[effective_i] : null;

        const alignContentVal = b !== '.' ? AlignAliases[b] : null;

        if (alignContentVal && justifyContentVal) styles.placeContent = [alignContentVal, justifyContentVal].join(" ");
        else if (alignContentVal) styles.alignContent = alignContentVal;
        else if (justifyContentVal) styles.justifyContent = justifyContentVal;

        if (i2 !== '.' && 'abcs_'.includes(i2) && AlignAliases[i2]) styles.alignItems = AlignAliases[i2];

        if (Object.keys(styles).length > 0 || /^\.+$/.test(alignStr)) return styles;
    }

    if (m = wrap(a)) return m;
    return a;
  });
  return Object.assign({ display: 'flex' }, ...args);
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