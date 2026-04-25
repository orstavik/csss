import { CsssPrimitives, BadArgument } from "./func.js";
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

      const transitions = style.transition
        .split(/,(?![^(]*\))/)
        .map(t => t.trim())
        .filter(Boolean)
        .map(t => t.split(/\s+/).join(","));

      if (!transitions.length) return undefined;

      return `$transition(${transitions.join("), $transition(")})`;
    }
  }
};
