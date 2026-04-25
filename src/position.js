import { CsssFunctions, CsssPrimitives, CssFunctions } from "./func.js";
const { LogicalFour, FunctionWithDefaultValues, SF2 } = CsssFunctions;
const { LogicalFourReverse, ValueReverse } = CssFunctions;
const { LengthPercentAuto, NumberInterpreter } = CsssPrimitives;

const makePositionReverse = (fnName, cssPosition) => style => {
  if (style.position !== cssPosition) return;
  const inner = LogicalFourReverse("inset", fnName, ValueReverse)(style);
  if (inner) return "$" + inner;
  return "$" + fnName;
};

const CssPositions = {
  absolute: makePositionReverse("absolute", "absolute"),
  relative: makePositionReverse("relative", "relative"),
  fixed: makePositionReverse("fixed", "fixed"),
  sticky: makePositionReverse("sticky", "sticky"),
};

const zIndexFn = SF2("zIndex/1", [NumberInterpreter], (_, [n]) => ({ zIndex: String(n) }));

export default {
  csss: {
    absolute: FunctionWithDefaultValues({ position: "absolute" }, LogicalFour("absolute", "inset", LengthPercentAuto)),
    relative: FunctionWithDefaultValues({ position: "relative" }, LogicalFour("relative", "inset", LengthPercentAuto)),
    fixed: FunctionWithDefaultValues({ position: "fixed" }, LogicalFour("fixed", "inset", LengthPercentAuto)),
    sticky: FunctionWithDefaultValues({ position: "sticky" }, LogicalFour("sticky", "inset", LengthPercentAuto)),
    zIndex: zIndexFn,
  },
  props: {
    position: undefined,
    zIndex: undefined,
    inset: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
    insetInline: undefined,
    insetBlock: undefined,
    insetInlineStart: undefined,
    insetBlockStart: undefined,
    insetInlineEnd: undefined,
    insetBlockEnd: undefined,
  },
  css: {
    position: style => CssPositions[style.position]?.(style),
    zIndex: style => {
      const v = style.zIndex;
      if (!v || v === "auto" || v === "unset") return undefined;
      return `$zIndex(${v})`;
    },
  },
};
