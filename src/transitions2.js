import { isNumber, isTime, isName, SEQ, TYPA } from "./func.js";
import * as CURVES from "./Curves.js";

const transition = TYPA({
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  linear: "linear",
  ...CURVES,
  steps: SEQ([isNumber], ar => `steps(${ar[0]})`),
  stepsEnd: SEQ([isNumber], ar => `steps(${ar[0]})`),
  stepsStart: SEQ([isNumber], ar => `steps(${ar[0]}, start)`),
  stepsBoth: SEQ([isNumber], ar => `steps(${ar[0]}, jump-both)`),
  stepsNone: SEQ([isNumber], ar => `steps(${ar[0]}, jump-none)`),
  allowDiscrete: "allow-discrete",
}, {
  durationAndDelay: isTime,
  cubicBezierFunction: isNumber,
  properties: isName
},
  ({ durationAndDelay, cubicBezierFunction, properties, allowDiscrete, ...timers }) => {
    if (cubicBezierFunction) {
      if (cubicBezierFunction.length != 4) throw new SyntaxError(`cubic-bezier transition timing function requires 4 numbers, got ${cubicBezierFunction.length}`);
      const cube = cubicBezierFunction.join(",");
      timers[`cubic-bezier(${cube})`] = `cubic-bezier(${cube})`;
    }
    if (Object.keys(timers).length > 1) throw new SyntaxError(`more than one transition timing function: ${Object.keys(timers).join(" AND ")}`);
    if (durationAndDelay && durationAndDelay.length > 2) throw new SyntaxError(`more than two duration and delay arguments`);
    const [timerName, timerValue] = Object.entries(timers)[0];
    let settings = durationAndDelay?.map(a => a.text).join(" ") ?? "";
    if (allowDiscrete) settings += " " + allowDiscrete;
    properties = properties ? properties.map(a => a.text) : [""];
    if (timerName in CURVES)
      return {
        [`--transition-${timerName}`]: timerValue,
        transition: properties.map(p => `${p} var(--transition-${timerName}) ${settings}`.trim()).join(", "),
      }
    return {
      transition: properties.map(p => `${p} ${timerValue} ${settings}`.trim()).join(", ")
    };
  });

export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  transitionSkipInk: undefined,
  transition,
};