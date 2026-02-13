
import { ValueTypes, FunctionTypes } from "./func.js";
const { TYPB, Umbrella } = FunctionTypes;
const { WordToValue, LengthPercent } = ValueTypes;
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

function processPosition({ origin = ["left", "top"], one = 0, two = 0 }) {
  return (origin.length == 1) ?
    { [origin[0]]: one } :
    { [origin[0]]: one, [origin[1]]: two };
}

const Position = TYPB({}, {
  origin: WordToValue(ORIGINS),
  one: LengthPercent,
  two: LengthPercent,
}, {}, processPosition);

export default {
  absolute: Umbrella({ position: "absolute" }, Position),
  relative: Umbrella({ position: "relative" }, Position),
  fixed: Umbrella({ position: "fixed" }, Position),
  sticky: Umbrella({ position: "sticky" }, Position),
};