

//    TODO NOT IMPLEMENTED!!




import { SIN } from "./func";

// ~sibling container~ {
//   anchor-name: --some-name-never-declared;
// }
// item {
//   position-anchor: --some-name-never-declared;
//   position: absolute;
//   left: anchor(right);
//   bottom: anchor(top);
// }

// implementation
// This is essentially a ~sideways umbrella~. Not sure it is a good pattern..
// $positionAnchor(some-name-never-declared)
// Then, 
// $position(absolute,anchor(some-name-never-declared,top,left,bottom,right) || leftTop(l,t),etc.) 

export default {
  //i think that we need special rules to tackle "0" and turn into top/bottom or left/right
  positionAnchor: SIN(Name, (p, v) => ({ [p]: `--${v}` }))
};