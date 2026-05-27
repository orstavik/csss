import { CsssFunctions, CsssPrimitives } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { LogicalFour, FunctionWithDefaultValues } = CsssFunctions;
const { LogicalFourReverse, ValueReverse } = CssFunctions;
const { LengthPercentAuto } = CsssPrimitives;

const CssPositions = {
  absolute: LogicalFourReverse("inset", "$absolute", ValueReverse),
  relative: LogicalFourReverse("inset", "$relative", ValueReverse),
  fixed: LogicalFourReverse("inset", "$fixed", ValueReverse),
  sticky: LogicalFourReverse("inset", "$sticky", ValueReverse),
};

/** When inset longhands are all default, still emit `$relative` / `$absolute` / … (matches `$Block…$relative`). */
const barePositionCsss = {
  relative: "$relative",
  absolute: "$absolute",
  fixed: "$fixed",
  sticky: "$sticky",
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
    position: style => {
      const insetPart = CssPositions[style.position]?.(style);
      if (insetPart != null) return insetPart;
      return barePositionCsss[style.position];
    },
    /** Native `z-index` is registered in SHORTS so the generic REVERSES skip does not run. */
    zIndex: style => {
      const zr = ValueReverse(style.zIndex);
      if (!zr || zr === "auto") return;
      return `$zIndex(${zr})`;
    },
  },
};
