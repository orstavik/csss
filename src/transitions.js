import { isTime } from "./func.js";

function transition(timing, dur, ...props) {
  const delay = isTime(props[0]);
  if (delay) props.shift();
  const tail = dur + (delay ? ` ${delay} ` : " ") + timing;
  if (!props.length) props = ["all"];
  return { transition: props.map(p => `${p} ${tail}`).join(", ") };
}

export default {
  transition: (x1, y1, x2, y2, dur, delay, ...props) => transition(`cubic-bezier(${x1},${y1},${x2},${y2})`, dur, delay, ...props),

  ease: (...args) => transition("ease", ...args),
  slide: (...args) => transition("linear", ...args),
  easeIn: (...args) => transition("ease-in", ...args),
  easeOut: (...args) => transition("ease-out", ...args),
  easeInOut: (...args) => transition("ease-in-out", ...args),

  crispIn: (...args) => transition("cubic-bezier(0,.55,.2,1)", ...args),
  crispOut: (...args) => transition("cubic-bezier(.8,0,1,.45)", ...args),
  crispInOut: (...args) => transition("cubic-bezier(.8,0,.2,1)", ...args),
  harshOut: (...args) => transition("cubic-bezier(.95,0,1,.2)", ...args),
  harshIn: (...args) => transition("cubic-bezier(0,.8,.15,1)", ...args),
  harshInOut: (...args) => transition("cubic-bezier(.9,0,.1,1)", ...args),
  playfulIn: (...args) => transition("cubic-bezier(.6,0,1,.2)", ...args),
  playfulOut: (...args) => transition("cubic-bezier(0,.35,.1,1)", ...args),
  playfulInOut: (...args) => transition("cubic-bezier(.65,0,.35,1)", ...args),
  bounceIn: (...args) => transition("cubic-bezier(.36,0,.66,-.56)", ...args),
  bounceOut: (...args) => transition("cubic-bezier(.34,1.56,.64,1)", ...args),
  bounceInOut: (...args) => transition("cubic-bezier(.68,-.6,.32,1.6)", ...args),
  easeInCrispOut: (...args) => transition("cubic-bezier(.42,0,.2,1)", ...args),
  easeInHarshOut: (...args) => transition("cubic-bezier(.42,0,.15,1)", ...args),
  easeInPlayfulOut: (...args) => transition("cubic-bezier(.42,0,.1,1)", ...args),
  easeInBounceOut: (...args) => transition("cubic-bezier(.42,0,.64,1)", ...args),
  crispInEaseOut: (...args) => transition("cubic-bezier(.8,0,.58,1)", ...args),
  crispInHarshOut: (...args) => transition("cubic-bezier(.8,0,.15,1)", ...args),
  crispInPlayfulOut: (...args) => transition("cubic-bezier(.8,0,.1,1)", ...args),
  crispInBounceOut: (...args) => transition("cubic-bezier(.8,0,.64,1)", ...args),
  harshInEaseOut: (...args) => transition("cubic-bezier(.95,0,.58,1)", ...args),
  harshInCrispOut: (...args) => transition("cubic-bezier(.95,0,.2,1)", ...args),
  harshInPlayfulOut: (...args) => transition("cubic-bezier(.95,0,.1,1)", ...args),
  harshInBounceOut: (...args) => transition("cubic-bezier(.95,0,.64,1)", ...args),
  playfulInEaseOut: (...args) => transition("cubic-bezier(.6,0,.58,1)", ...args),
  playfulInCrispOut: (...args) => transition("cubic-bezier(.6,0,.2,1)", ...args),
  playfulInHarshOut: (...args) => transition("cubic-bezier(.6,0,.15,1)", ...args),
  playfulInBounceOut: (...args) => transition("cubic-bezier(.6,0,.64,1)", ...args),
  bounceInEaseOut: (...args) => transition("cubic-bezier(.36,0,.58,1)", ...args),
  bounceInCrispOut: (...args) => transition("cubic-bezier(.36,0,.2,1)", ...args),
  bounceInHarshOut: (...args) => transition("cubic-bezier(.36,0,.15,1)", ...args),
  bounceInPlayfulOut: (...args) => transition("cubic-bezier(.36,0,.1,1)", ...args),

  //hesitate: (dur, delay, ...props) => native(`cubic-bezier(.5,0,.5,1)`, dur, delay, ...props),
  //wobble: (dur, delay, ...props) => native(`cubic-bezier(.5,-.5,.5,1.5)`, dur, delay, ...props),
  //0.29, 1.01, 1, -0.68

  // steps: (steps, dur, delay, ...props) => native(`steps(${steps})`, dur, delay, ...props),
  jump: (steps, dur, delay, ...props) => transition(`steps(${steps})`, dur, delay, ...props), //jumpEnd is default for steps().
  // jumpEnd: (steps, dur, delay, ...props) => native(`steps(${steps},jump-end)`, dur, delay, ...props),
  jumpStart: (steps, dur, delay, ...props) => transition(`steps(${steps},jump-start)`, dur, delay, ...props),
  jumpNone: (steps, dur, delay, ...props) => transition(`steps(${steps},jump-none)`, dur, delay, ...props),
  jumpBoth: (steps, dur, delay, ...props) => transition(`steps(${steps},jump-both)`, dur, delay, ...props),
};