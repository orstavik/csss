import { CsssPrimitives, BadArgument } from "./func.js";
const { Name, Time } = CsssPrimitives;
import Easing from "./funcEasing.js";
const { easingFunction } = Easing.csss;
import { CssFunctions } from "./funcReverse.js";
const { commaArray, parseCssValue, ValueReverse2 } = CssFunctions;

const AllowDiscrete = a => (a.text === "allowDiscrete" || a.text === "normal") ? a.text : undefined;
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
      if (!style.transitionProperty || !style.transitionDuration)
        return;
      let {
        transitionProperty,
        transitionDuration,
        transitionTimingFunction,
        transitionDelay,
        transitionBehavior,
      } = style;
      transitionProperty &&= commaArray(parseCssValue(transitionProperty)).map(ValueReverse2);
      transitionDuration &&= commaArray(parseCssValue(transitionDuration)).map(ValueReverse2);
      transitionTimingFunction &&= commaArray(parseCssValue(transitionTimingFunction)).map(Easing.css.reverseEasingFunction);
      transitionDelay &&= commaArray(parseCssValue(transitionDelay)).map(ValueReverse2);
      transitionBehavior &&= commaArray(parseCssValue(transitionBehavior)).map(ValueReverse2);

      const getTransitionValue = (i, ar) => ar[i] ?? ar[i % ar.length];
      const tailsToProp = {};
      for (let i = 0; i < transitionProperty.length; i++) {
        const p = transitionProperty[i];
        let tail = getTransitionValue(i, transitionDuration);
        if (transitionDelay) tail += `,${getTransitionValue(i, transitionDelay)}`;
        if (transitionTimingFunction) tail = `${getTransitionValue(i, transitionTimingFunction)},` + tail;
        if (transitionBehavior) tail += `,${getTransitionValue(i, transitionBehavior)}`;
        if (tail in tailsToProp)
          tailsToProp[tail] += "," + p;
        else
          tailsToProp[tail] = p;
      }
      return Object.entries(tailsToProp).map(([a, b]) => `$transition(${a},${b})`).join("");
    }
  }
};