import { CsssFunctions, CsssPrimitives } from "./func2.js";
const { LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercentAuto } = CsssPrimitives;

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
  css: {},
};