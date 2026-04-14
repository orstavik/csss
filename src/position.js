import { CsssFunctions, CsssPrimitives, CssFunctions } from "./func.js";
const { LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LogicalFourReverse } = CssFunctions;
const { LengthPercentAuto } = CsssPrimitives;

const CssPositions = {
  absolute: LogicalFourReverse("inset", "absolute", v => v),
  relative: LogicalFourReverse("inset", "relative", v => v),
  fixed: LogicalFourReverse("inset", "fixed", v => v),
  sticky: LogicalFourReverse("inset", "sticky", v => v),
};

export default {
  csss: {
    absolute: FunctionWithDefaultValues({ position: "absolute" }, LogicalFour("absolute", "inset", LengthPercentAuto)),
    relative: FunctionWithDefaultValues({ position: "relative" }, LogicalFour("relative", "inset", LengthPercentAuto)),
    fixed: FunctionWithDefaultValues({ position: "fixed" }, LogicalFour("fixed", "inset", LengthPercentAuto)),
    sticky: FunctionWithDefaultValues({ position: "sticky" }, LogicalFour("sticky", "inset", LengthPercentAuto)),
  },
  props: {
    position: undefined,
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
  },
};