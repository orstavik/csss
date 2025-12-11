import { Number, Time, Name, SIN, TYPB } from "./func.js";
import * as CURVES from "./Curves.js";

function cubicBezierFunction(ar) {
  if (ar.length != 4) throw new SyntaxError(`cubic-bezier timing function requires 4 numbers, got ${ar.length}`);
  return `cubic-bezier(${ar.join(",")})`;
}

const transition = TYPB({
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  linear: "linear",
  ...CURVES,
  steps: SIN(null, Number, (n, v) => `steps(${v})`),
  stepsEnd: SIN(null, Number, (n, v) => `steps(${v})`),
  stepsStart: SIN(null, Number, (n, v) => `steps(${v}, start)`),
  stepsBoth: SIN(null, Number, (n, v) => `steps(${v}, jump-both)`),
  stepsNone: SIN(null, Number, (n, v) => `steps(${v}, jump-none)`),
  allowDiscrete: "allow-discrete",
}, {
  duration: Time,
  delay: Time,
}, {
  cubicBezier: Number,
  properties: Name,
},
  ({ properties, duration, delay, allowDiscrete, ...timers }) => {
    if (Object.keys(timers).length > 1) throw new SyntaxError(`more than one transition timing function: ${Object.keys(timers).join(" AND ")}`);
    timers.cubicBezier &&= cubicBezierFunction(timers.cubicBezier);
    let [timerName, timerValue] = Object.entries(timers)[0] ?? [];
    const res = {};
    if (timerName in CURVES) {
      res[":root"] = { [`--transition-${timerName}`]: timerValue };
      timerValue = `var(--transition-${timerName})`;
    }
    const tail = [timerValue, duration, delay, allowDiscrete].filter(Boolean).join(" ");
    res.transition = !properties ? tail : properties.map(p => `${p} ${tail}`).join(", ");
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