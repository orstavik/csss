import { ValueTypes, FunctionTypes } from "./func.js";
const { LogicalFour, FunctionBasedOnValueTypes, FunctionWithDefaultValues } = FunctionTypes;
const { WordToValue, LengthPercent } = ValueTypes;

const PROPS = {
  position: undefined,
  inset: undefined,
  top: undefined,
  right: undefined,
  bottom: undefined,
  left: undefined,
  insetInlineStart: undefined,
  insetBlockStart: undefined,
  insetInlineEnd: undefined,
  insetBlockEnd: undefined,
};

const LengthPercentAuto = a => a.text === "_" ? "auto" : LengthPercent(a);
const LogicalFourAuto = LogicalFour("inset", LengthPercentAuto);

export default {
  ...PROPS,
  absolute: FunctionWithDefaultValues({ position: "absolute" }, LogicalFourAuto),
  relative: FunctionWithDefaultValues({ position: "relative" }, LogicalFourAuto),
  fixed: FunctionWithDefaultValues({ position: "fixed" }, LogicalFourAuto),
  sticky: FunctionWithDefaultValues({ position: "sticky" }, LogicalFourAuto),
};