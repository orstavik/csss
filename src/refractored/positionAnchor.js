/**
 * Position anchor shorts (NOT YET IMPLEMENTED):
 * - Will map expressions like $positionAnchor(my-anchor) into
 *   CSS anchor positioning properties.
 *
 * Helpers from func.js:
 * - SingleArgumentFunction (SIN): single-argument helper for anchor name.
 * - ValueTypes: Name (word interpreter for anchor identifiers).
 *
 * Export map:
 * - `positionAnchor`: sets `position-anchor` to a CSS custom ident.
 */

//    TODO NOT IMPLEMENTED!!

import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  Name,
} = ValueTypes;

const {
  SIN: SingleArgumentFunction,
} = FunctionTypes;

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
  positionAnchor: SingleArgumentFunction(Name, (p, v) => ({ [p]: `--${v}` }))
};
