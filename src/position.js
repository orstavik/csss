import { LengthPercent, WORD_IN_TABLE, TYPB } from "./func.js";

const ORIGIN = {
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

function processPosition({ origin = ["left", "top"], one = 0, two = 0 }) {
  return (origin.length == 1) ?
    { [origin[0]]: one } :
    { [origin[0]]: one, [origin[1]]: two };
}

const Position = TYPB({}, {
  origin: WORD_IN_TABLE(ORIGIN),
  one: LengthPercent,
  two: LengthPercent,
}, {}, processPosition);

const CanBeEmpty = (BASE, CB) => exp => exp.args?.length ? { ...BASE, ...CB(exp) } : { ...BASE };


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

// function positionAnchor(ar) {
//   const name = extractName(ar);
//   if (!name) throw new SyntaxError(`$positionAnchor argument must always begin with a valid identifier name.`);
//   if (!ar.length) //sideways umbrella 
//     return { "position-anchor": `--${name}` };
//   //i think that we need special rules to tackle "0" and turn into top/bottom or left/right
// }


export default {
  absolute: CanBeEmpty({ position: "absolute" }, Position),
  relative: CanBeEmpty({ position: "relative" }, Position),
  fixed: CanBeEmpty({ position: "fixed" }, Position),
  sticky: CanBeEmpty({ position: "sticky" }, Position),

  // positionAnchor,
};