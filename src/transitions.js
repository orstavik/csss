import { CsssPrimitives, BadArgument } from "./func.js";
const { Name, Time } = CsssPrimitives;
import Easing from "./funcEasing.js";
const { easingFunction } = Easing.csss;

const AllowDiscrete = a => a.text === "allowDiscrete" ? "allow-discrete" : undefined;
const TransitionProperty = a => Name(a)?.replaceAll(/[A-Z]/g, m => `-${m.toLowerCase()}`);

const transition = ({ args }) => {
  let i = 0;
  let ease = easingFunction(args[i]);
  if (ease) i++;
  let duration = (i < args.length) && Time(args[i]);
  if (duration) i++;
  let delay = (i < args.length) && Time(args[i]);
  if (delay) i++;
  let allowDiscrete = (i < args.length) && AllowDiscrete(args[i]);
  if (allowDiscrete) i++;

  let properties = args.slice(i).map(TransitionProperty);
  for (let j = 0; j < properties.length; j++)
    if (properties[j] == null)
      throw BadArgument("transition", args, i + j);
  if (!properties.length || properties.includes("all"))
    properties = ["all"];

  const res = ease?.[1] || {};
  ease = ease?.[0] || "ease";
  duration ||= "0s";
  delay ||= "0s";
  allowDiscrete ||= "normal";
  Object.assign(res, {
    transitionTimingFunction: "",
    transitionDuration: "",
    transitionDelay: "",
    transitionBehavior: "",
    transitionProperty: "",
  });
  for (let i = 0; i < properties.length; i++) {
    const p = properties[i];
    res.transitionTimingFunction += (i ? ", " : "") + ease;
    res.transitionDuration += (i ? ", " : "") + duration;
    res.transitionDelay += (i ? ", " : "") + delay;
    res.transitionBehavior += (i ? ", " : "") + allowDiscrete;
    res.transitionProperty += (i ? ", " : "") + p;
  }
  return res;
};
import { CssFunctions } from "./funcReverse.js";

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

      const toCamelCase = s => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

      let {
        transitionProperty,
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
        transitionBehavior,
      } = style;
      if (!transitionProperty && !transitionDuration && !transitionTimingFunction && !transitionDelay && !transitionBehavior)
        return;
      debugger

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