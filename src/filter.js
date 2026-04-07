import shadow from "./shadows.js";
import { ValueTypes, FunctionTypes } from "./func.js";
const { FunctionBasedOnValueTypes, SequentialFunction, SingleArgumentFunction } = FunctionTypes;
// const { Angle, Length, NumberInterpreter, Url, AnglePercent, LengthPercent, NumberPercent } = ValueTypes;
import { CsssPrimitives, CsssFunctions, matchArgsWithInterpreters } from "./func2.js";
const { NumberPercent, Length, Angle, LengthPercent, Url, AnglePercent, NumberInterpreter, SingleFunctionFunction } = CsssPrimitives;
const textDropShadow = shadow.raw.textDropShadow;
const { SF2, FunctionFunctionPropertyType, TypeBasedFunction } = CsssFunctions;

const FILTER_FUNCS = {
  blur: SingleFunctionFunction("blur", Length),
  brightness: SingleFunctionFunction("brightness", NumberPercent),
  contrast: SingleFunctionFunction("contrast", NumberPercent),
  grayscale: SingleFunctionFunction("grayscale", NumberPercent),
  invert: SingleFunctionFunction("invert", NumberPercent),
  opacity: SingleFunctionFunction("opacity", NumberPercent),
  saturate: SingleFunctionFunction("saturate", NumberPercent),
  sepia: SingleFunctionFunction("sepia", NumberPercent),
  hueRotate: SingleFunctionFunction("hue-rotate", Angle),
  dropShadow: a => `drop-shadow(${textDropShadow(a)})`,
};

export default {
  props: { filter: undefined, backdrop: undefined, backdropFilter: undefined },
  csss: {
    filter: FunctionBasedOnValueTypes(FILTER_FUNCS, {}, { Url }, obj => ({ filter: Object.values(obj).flat().join(" ") })),
    backdrop: FunctionBasedOnValueTypes(FILTER_FUNCS, {}, { Url }, obj => ({ backdropFilter: Object.values(obj).flat().join(" ") })),
  },
  css: {},
};