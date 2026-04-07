import { CsssPrimitives, CsssFunctions, BadArgument } from "./func2.js";
const { Name, NumberInterpreter, Time } = CsssPrimitives;
const { CssValuesToCsssTable, SF2 } = CsssFunctions;
import * as CURVES from "./Curves.js";

const NativeEaseFunctions = CssValuesToCsssTable("ease|ease-in|ease-out|ease-in-out|linear");
const cubicBezier = SF2("cubic-bezier/4", Array(4).fill(NumberInterpreter), (_, ar) => `cubic-bezier(${ar.join(",")})`);
const Step = SF2("steps/1-2", [NumberInterpreter, a => StepFunctions[a.text]], (_, ar) => `steps(${ar.join(", ")})`);
const StepFunctions = CssValuesToCsssTable("start|end|jump-start|jump-end|jump-both|jump-none");
const NativeEasingFunction = a => NativeEaseFunctions[a.text] ?? cubicBezier(a) ?? Step(a);

const AllowDiscrete = a => a.text === "allowDiscrete" ? "allow-discrete" : undefined;
const TransitionProperty = a => Name(a)?.replaceAll(/[A-Z]/g, m => `-${m.toLowerCase()}`);

const transition = ({ args }) => {
  let i = 0, curve;
  let ease = NativeEasingFunction(args[i]);
  ease ??= (args[i].text in CURVES) ? `var(--transition-${curve = args[i].text})` : undefined;
  if (ease) i++;
  const duration = (i < args.length) && Time(args[i]);
  if (duration) i++;
  const delay = (i < args.length) && Time(args[i]);
  if (delay) i++;
  const allowDiscrete = (i < args.length) && AllowDiscrete(args[i]);
  if (allowDiscrete) i++;

  const properties = args.slice(i).map(TransitionProperty);
  for (let j = 0; j < properties.length; j++)
    if (properties[j] == null)
      throw BadArgument("transition", args, i + j);
  if (properties.includes("all"))
    properties.length = 0;

  const res = {};
  if (curve)
    res[`:root /*--transition-${curve}*/`] = { [`--transition-${curve}`]: CURVES[curve] };
  const tail = [ease, duration, delay, allowDiscrete].filter(Boolean).join(" ");
  res.transition = !properties.length ? tail : properties.map(p => `${p} ${tail}`).join(", ");
  return res;
};

export default {
  props: {
    transitionProperty: undefined,
    transitionDuration: undefined,
    transitionTimingFunction: undefined,
    transitionDelay: undefined,
    transitionSkipInk: undefined,
  },
  csss: {
    transition,
  },
};