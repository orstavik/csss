import { isNumber, isTime, isName, SEQ, TYPA } from "./func.js";
import * as CURVES from "./Curves.js";

function cubicBezierFunction(ar) {
  if (ar.length != 4) throw new SyntaxError(`cubic-bezier timing function requires 4 numbers, got ${ar.length}`);
  return `cubic-bezier(${ar.join(",")})`;
}

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
  cubicBezier: isNumber,
  properties: isName,
},
  ({ properties, durationAndDelay, allowDiscrete, ...timers }) => {
    if (Object.keys(timers).length > 1) throw new SyntaxError(`more than one transition timing function: ${Object.keys(timers).join(" AND ")}`);
    timers.cubicBezier &&= cubicBezierFunction(timers.cubicBezier);
    let [timerName, timerValue] = Object.entries(timers)[0] ?? [];
    const res = {};
    if (timerName in CURVES) {
      res[":root"] = { [`--transition-${timerName}`]: timerValue };
      timerValue = `var(--transition-${timerName})`;
    }
    if (durationAndDelay && durationAndDelay.length > 2)
      throw new SyntaxError(`more than two duration and delay arguments`);
    const tail = [timerValue, durationAndDelay?.map(a => a.text).join(" "), allowDiscrete].filter(Boolean).join(" ");
    res.transition = !properties ? tail : properties.map(p => `${p.text} ${tail}`).join(", ");
    return res;
  });

export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  transitionSkipInk: undefined,
  transition,
};