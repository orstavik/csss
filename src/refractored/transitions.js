/**
 * Transition shorts:
 * - Turn expressions like $transition(opacity, 200ms, easeIn) into
 *   CSS `transition` values, with optional named timing curves from Curves.js.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses typed argument blocks into one object.
 * - SingleArgumentFunction (SIN): single-argument helpers for steps(), etc.
 * - ValueTypes: NumberInterpreter, Time, Name.
 *
 * This module exports:
 * - `transition` short: builds `transition` string and (optionally) stores
 *   custom curves on `:root` CSS variables.
 * - default export: marks individual transition-related properties as reserved.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

import * as CURVES from "./Curves.js";

const {
  NumberInterpreter,
  Time,
  Name,
} = ValueTypes;

const {
  SIN: SingleArgumentFunction,
  TYPB: FunctionBasedOnValueTypes,
} = FunctionTypes;

function cubicBezierFunction(ar) {
  if (ar.length != 4) throw new SyntaxError(`cubic-bezier timing function requires 4 numbers, got ${ar.length}`);
  return `cubic-bezier(${ar.join(",")})`;
}

const transition = FunctionBasedOnValueTypes({
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  linear: "linear",
  ...CURVES,
  steps: SingleArgumentFunction(NumberInterpreter, (n, v) => `steps(${v})`),
  stepsEnd: SingleArgumentFunction(NumberInterpreter, (n, v) => `steps(${v})`),
  stepsStart: SingleArgumentFunction(NumberInterpreter, (n, v) => `steps(${v}, start)`),
  stepsBoth: SingleArgumentFunction(NumberInterpreter, (n, v) => `steps(${v}, jump-both)`),
  stepsNone: SingleArgumentFunction(NumberInterpreter, (n, v) => `steps(${v}, jump-none)`),
  allowDiscrete: "allow-discrete",
}, {
  duration: Time,
  delay: Time,
}, {
  cubicBezier: NumberInterpreter,
  properties: Name,
},
  ({ properties, duration, delay, allowDiscrete, ...timers }) => {
    if (Object.keys(timers).length > 1) throw new SyntaxError(`more than one transition timing function: ${Object.keys(timers).join(" AND ")}`);
    timers.cubicBezier &&= cubicBezierFunction(timers.cubicBezier);
    let [timerName, timerValue] = Object.entries(timers)[0] ?? [];
    const res = {};
    if (timerName in CURVES) {
      res[`:root /*--transition-${timerName}*/`] = { [`--transition-${timerName}`]: timerValue };
      timerValue = `var(--transition-${timerName})`;
    }
    const tail = [timerValue, duration, delay, allowDiscrete].filter(Boolean).join(" ");
    res.transition = !properties ? tail : properties.map(p => `${p} ${tail}`).join(", ");
    return res;
  });

/**
 * Export map:
 * - `transition`: main short that builds the CSS `transition` value.
 * - default export: reserves transition-related longhands.
 */
export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  transitionSkipInk: undefined,
  transition,
};