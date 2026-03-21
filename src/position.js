
import { ValueTypes, FunctionTypes } from "./func.js";
import { ReverseFunctionTypes, ReverseValueTypes } from "./reverse.js";
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues } = FunctionTypes;
const { ReverseWordToValue } = ReverseValueTypes;
const { ReverseFunctionWithDefaultValues } = ReverseFunctionTypes;
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

const Position = FunctionBasedOnValueTypes({}, {
  origin: WordToValue(ORIGINS),
  one: LengthPercent,
  two: LengthPercent,
}, {}, processPosition);

const reverseOrigin = ReverseWordToValue(ORIGINS);

const reversePositionInner = (style) => {
  // Determine origin by finding matching keys in style
  // We need to find the longest matching origin from the keys present.
  let bestOriginKey = null;
  let bestOriginLen = 0;

  for (const [k, v] of Object.entries(ORIGINS)) {
    const allPresent = v.every(prop => prop in style);
    if (allPresent && v.length > bestOriginLen) {
      bestOriginKey = k;
      bestOriginLen = v.length;
    }
  }

  if (bestOriginKey) {
    const originArr = ORIGINS[bestOriginKey];
    const args = [bestOriginKey];
    for (const prop of originArr) {
      if (style[prop] !== 0 && style[prop] !== "0" && style[prop] !== "0px") { // "0" is default
        args.push(style[prop]);
      }
      delete style[prop];
    }
    // If we only have the origin, and origin is default, it can be empty
    if (args.length === 1 && args[0] === "leftTop") {
      return [];
    }
    return args;
  }
  return undefined;
};

export const _reverse = {
  Absolute: ReverseFunctionWithDefaultValues({ position: "absolute" }, reversePositionInner, "absolute", "Absolute"),
  Relative: ReverseFunctionWithDefaultValues({ position: "relative" }, reversePositionInner, "relative", "Relative"),
  Fixed: ReverseFunctionWithDefaultValues({ position: "fixed" }, reversePositionInner, "fixed", "Fixed"),
  Sticky: ReverseFunctionWithDefaultValues({ position: "sticky" }, reversePositionInner, "sticky", "Sticky"),
};

export default {
  _reverse,
  absolute: FunctionWithDefaultValues({ position: "absolute" }, Position),
  relative: FunctionWithDefaultValues({ position: "relative" }, Position),
  fixed: FunctionWithDefaultValues({ position: "fixed" }, Position),
  sticky: FunctionWithDefaultValues({ position: "sticky" }, Position),
};