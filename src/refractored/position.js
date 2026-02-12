/**
 * Position shorts:
 * - Map expressions like $absolute(leftTop, 10px, 20px) into
 *   CSS positioning properties (position + inset/top/left/etc.).
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses origin + offset values.
 * - FunctionWithDefaultValues (Umbrella): wraps parsed props with position defaults.
 * - WordInTable: maps direction keywords to logical/physical property names.
 * - LengthPercent: validates length/percentage values for offsets.
 *
 * Export map:
 * - `absolute`, `relative`, `fixed`, `sticky`: umbrella shorts that set
 *   `position` and optional origin + offsets.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  LengthPercent,
  WORD_IN_TABLE: WordInTable,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
  Umbrella: FunctionWithDefaultValues,
} = FunctionTypes;

// --- Origin keyword mappings ---

/** Maps direction keywords to arrays of CSS property names for positioning. */
const ORIGINS = {
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

// --- Position parser ---

/** Converts parsed origin + offsets into CSS property object. */
function processPosition({ origin = ["left", "top"], one = 0, two = 0 }) {
  return (origin.length == 1) ?
    { [origin[0]]: one } :
    { [origin[0]]: one, [origin[1]]: two };
}

const Position = FunctionBasedOnValueTypes({}, {
  origin: WordInTable(ORIGINS),
  one: LengthPercent,
  two: LengthPercent,
}, {}, processPosition);

/**
 * Export map:
 * - `absolute`, `relative`, `fixed`, `sticky`: umbrella shorts
 *   combining position type with optional origin and offsets.
 */
export default {
  absolute: FunctionWithDefaultValues({ position: "absolute" }, Position),
  relative: FunctionWithDefaultValues({ position: "relative" }, Position),
  fixed: FunctionWithDefaultValues({ position: "fixed" }, Position),
  sticky: FunctionWithDefaultValues({ position: "sticky" }, Position),
};
