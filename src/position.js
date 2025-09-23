import { extractName, extractLengthPercent } from "./func.js";

const origin = {
  left: ["left"],
  right: ["right"],
  top: ["top"],
  bottom: ["bottom"],
  leftTop: ["left", "top"],
  rightTop: ["right", "top"],
  leftBottom: ["left", "bottom"],
  rightBottom: ["right", "bottom"],
  start: ["insetInlineStart", "insetBlockStart"],
  end: ["insetInlineEnd", "insetBlockEnd"],
  startEnd: ["insetInlineStart", "insetBlockEnd"],
  endStart: ["insetInlineEnd", "insetBlockStart"],
  startTop: ["insetInlineStart", "top"],
  endTop: ["insetInlineEnd", "top"],
  startBottom: ["insetInlineStart", "bottom"],
  endBottom: ["insetInlineEnd", "bottom"],
  leftStart: ["left", "insetBlockStart"],
  rightStart: ["right", "insetBlockStart"],
  leftEnd: ["left", "insetBlockEnd"],
  rightEnd: ["right", "insetBlockEnd"],
};

function position(position, ar) {
  const res = { position };
  const [pl1, pl2] = origin[extractName(ar)] || ["left", "top"];
  res[pl1] = extractLengthPercent(ar);
  res[pl2] = extractLengthPercent(ar);
  if (ar.length)
    throw new SyntaxError(`unknown argument: $position(${ar[0].text}).`);
  return res;
}

const absolute = position.bind(null, "absolute");
const relative = position.bind(null, "relative");
const fixed = position.bind(null, "fixed");
const sticky = position.bind(null, "sticky");


// container {
//   anchor-name: --some-name-never-declared;
// }


// item {
//   position-anchor: --some-name-never-declared;
//   position: absolute;
//   left: anchor(right);
//   bottom: anchor(top);
// }

// implementation
// This is essentially a sideways umbrella. $positionAnchor(some-name-never-declared)
// Then, $position(absolute,anchor(some-name-never-declared,top,left,bottom,right) || leftTop(l,t),etc.) 

function positionAnchor(ar) {
  const name = extractName(ar);
  if (!name) throw new SyntaxError(`$positionAnchor argument must always begin with a valid identifier name.`);
  if (!ar.length) //sideways umbrella 
    return { "position-anchor": `--${name}` };
  //i think that we need special rules to tackle "0" and turn into top/bottom or left/right
}


export default {
  absolute,
  relative,
  fixed,
  sticky,

  // positionAnchor,
};