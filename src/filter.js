import shadow from "./shadows.js";
import { ValueTypes, FunctionTypes } from "./func.js";
const { FunctionBasedOnValueTypes, SequentialFunction, SingleArgumentFunction } = FunctionTypes;
// const { Angle, Length, NumberInterpreter, Url, AnglePercent, LengthPercent, NumberPercent } = ValueTypes;
import { CsssPrimitives, CsssFunctions, matchArgsWithInterpreters, BadArgument } from "./func2.js";
const { NumberPercent, Length, Angle, LengthPercent, Url, AnglePercent, NumberInterpreter, SingleFunctionFunction } = CsssPrimitives;
const textDropShadowRaw = shadow.raw.textDropShadowRaw;
const { SF2, FunctionFunctionPropertyType, TypeBasedFunction } = CsssFunctions;

const FILTER_FUNCS = [
  SingleFunctionFunction("blur", Length),
  SingleFunctionFunction("brightness", NumberPercent),
  SingleFunctionFunction("contrast", NumberPercent),
  SingleFunctionFunction("grayscale", NumberPercent),
  SingleFunctionFunction("invert", NumberPercent),
  SingleFunctionFunction("opacity", NumberPercent),
  SingleFunctionFunction("saturate", NumberPercent),
  SingleFunctionFunction("sepia", NumberPercent),
  SingleFunctionFunction("hue-rotate", Angle),
  a => a.name === "dropShadow" && `drop-shadow(${textDropShadowRaw(a)})`,
  Url,
];

const filterRaw = ({ name, args }) => args.map((a, i) => {
  for (let cb of FILTER_FUNCS)
    if (cb = cb(a))
      return cb;
  throw BadArgument(name, i, args, `Expected one of: ${FILTER_FUNCS.map(f => f.name).join(",")}`);
}).join(" ");

export default {
  props: { filter: undefined, backdrop: undefined, backdropFilter: undefined },
  csss: {
    filter: x => ({ filter: filterRaw(x) }),
    backdrop: x => ({ backdropFilter: filterRaw(x) }),
  },
  css: {},
};