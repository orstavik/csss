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
const toCamelCase = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
export default {
  props: {
    transitionProperty: undefined,
    transitionDuration: undefined,
    transitionTimingFunction: undefined,
    transitionDelay: undefined,
    transitionBehavior: undefined,
  },

  csss: {
    transition,
  },

  css: {
    transition: style => {
      debugger
      let {
        transitionProperty,
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
        transitionBehavior,
      } = style;
      const easing =
        transitionTimingFunction?.match(/^var\(--transition-(.+)\)$/)?.[1]
        ?? transitionTimingFunction;
      const behavior =
        transitionBehavior === "allow-discrete"
          ? "allowDiscrete"
          : undefined;

      const properties =
        transitionProperty && transitionProperty !== "all"
          ? transitionProperty.split(",").map(toCamelCase)
          : undefined;

      const args = [];
      if (easing && easing !== "ease") args.push(toCamelCase(easing));
      if (transitionDuration && transitionDuration !== "0s") args.push(transitionDuration);
      if (transitionDelay && transitionDelay !== "0s") args.push(transitionDelay);
      if (behavior) args.push(behavior);
      if (properties?.length) args.push(...properties);

      return args.length
        ? `$transition(${args.join(",")})`
        : undefined;
    }
  }
};
