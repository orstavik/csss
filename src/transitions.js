import { CsssPrimitives, BadArgument } from "./func2.js";
const { Name, Time } = CsssPrimitives;
import Easing from "./funcEasing.js";
const { easingFunction } = Easing.csss;

const AllowDiscrete = a => a.text === "allowDiscrete" ? "allow-discrete" : undefined;
const TransitionProperty = a => Name(a)?.replaceAll(/[A-Z]/g, m => `-${m.toLowerCase()}`);

const transition = ({ args }) => {
  let i = 0;
  const ease = easingFunction(args[i]);
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

  const res = ease?.[1] ?? {};
  const tail = [ease?.[0], duration, delay, allowDiscrete].filter(Boolean).join(" ");
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
  css: {
    transition: style => {
      if (!style.transition) return undefined;
      // transitions are tricky to reverse correctly because properties could be grouped or not.
      // let's do a basic reverse by joining the commas as separate transition() calls,
      // or try to recreate transition(ease, dur, delay, prop).
      // actually, just putting it as transition(prop, dur, ease) is not perfectly matching original csss
      // csss signature is ease, dur, delay, allowDiscrete, props...
      // CSS output is `prop ease dur delay` comma separated.
      // Let's implement a simple reverse by comma replacing.
      let transitions = style.transition.split(/,(?![^(]*\))/);
      transitions = transitions.map(t => t.trim().split(/\s+/).join(","));
      return `transition(${transitions.join("), transition(")})`;
    }
  }
};