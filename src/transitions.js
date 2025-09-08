import { extractNumber, extractTime, interpretName } from "./func.js";

function transition(timing, args) {
  const dur = args.length && extractTime(args);
  const delay = args.length && extractTime(args);
  if (args.text == "allowDiscrete")
    timing += " allow-discrete";
  const tail = [dur, delay, timing].filter(Boolean).join(" ");
  args = !args.length ? ["all"] :
    args.map(a => {
      a = interpretName(a);
      if (a) return a.text;
      throw new SyntaxError(`Not a valid $transition property: ${a.text}.`);
    });
  return { transition: args.map(p => `${p} ${tail}`).join(", ") };
}

function jump(type, args) {
  const steps = extractNumber(args);
  if (!steps || steps.num <= 0 || steps.unit != "")
    throw new SyntaxError(`$jump requires a positive integer argument first.`);
  return transition(`steps(${steps.num}${type})`, args)
}

export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  
  ease: args => transition("ease", args),
  slide: args => transition("linear", args),
  easeIn: args => transition("ease-in", args),
  easeOut: args => transition("ease-out", args),
  easeInOut: args => transition("ease-in-out", args),

  crispIn: args => transition("cubic-bezier(0,.55,.2,1)", args),
  crispOut: args => transition("cubic-bezier(.8,0,1,.45)", args),
  crispInOut: args => transition("cubic-bezier(.8,0,.2,1)", args),
  harshOut: args => transition("cubic-bezier(.95,0,1,.2)", args),
  harshIn: args => transition("cubic-bezier(0,.8,.15,1)", args),
  harshInOut: args => transition("cubic-bezier(.9,0,.1,1)", args),
  playfulIn: args => transition("cubic-bezier(.6,0,1,.2)", args),
  playfulOut: args => transition("cubic-bezier(0,.35,.1,1)", args),
  playfulInOut: args => transition("cubic-bezier(.65,0,.35,1)", args),
  bounceIn: args => transition("cubic-bezier(.36,0,.66,-.56)", args),
  bounceOut: args => transition("cubic-bezier(.34,1.56,.64,1)", args),
  bounceInOut: args => transition("cubic-bezier(.68,-.6,.32,1.6)", args),
  easeInCrispOut: args => transition("cubic-bezier(.42,0,.2,1)", args),
  easeInHarshOut: args => transition("cubic-bezier(.42,0,.15,1)", args),
  easeInPlayfulOut: args => transition("cubic-bezier(.42,0,.1,1)", args),
  easeInBounceOut: args => transition("cubic-bezier(.42,0,.64,1)", args),
  crispInEaseOut: args => transition("cubic-bezier(.8,0,.58,1)", args),
  crispInHarshOut: args => transition("cubic-bezier(.8,0,.15,1)", args),
  crispInPlayfulOut: args => transition("cubic-bezier(.8,0,.1,1)", args),
  crispInBounceOut: args => transition("cubic-bezier(.8,0,.64,1)", args),
  harshInEaseOut: args => transition("cubic-bezier(.95,0,.58,1)", args),
  harshInCrispOut: args => transition("cubic-bezier(.95,0,.2,1)", args),
  harshInPlayfulOut: args => transition("cubic-bezier(.95,0,.1,1)", args),
  harshInBounceOut: args => transition("cubic-bezier(.95,0,.64,1)", args),
  playfulInEaseOut: args => transition("cubic-bezier(.6,0,.58,1)", args),
  playfulInCrispOut: args => transition("cubic-bezier(.6,0,.2,1)", args),
  playfulInHarshOut: args => transition("cubic-bezier(.6,0,.15,1)", args),
  playfulInBounceOut: args => transition("cubic-bezier(.6,0,.64,1)", args),
  bounceInEaseOut: args => transition("cubic-bezier(.36,0,.58,1)", args),
  bounceInCrispOut: args => transition("cubic-bezier(.36,0,.2,1)", args),
  bounceInHarshOut: args => transition("cubic-bezier(.36,0,.15,1)", args),
  bounceInPlayfulOut: args => transition("cubic-bezier(.36,0,.1,1)", args),

  //hesitate: (args) => native(`cubic-bezier(.5,0,.5,1)`, args),
  //wobble: (args) => native(`cubic-bezier(.5,-.5,.5,1.5)`, args),
  //0.29, 1.01, 1, -0.68

  transition: args => {
    const x1 = extractNumber(x1);
    const y1 = extractNumber(y1);
    const x2 = extractNumber(x2);
    const y2 = extractNumber(y2);
    if (!x1 || !y1 || !x2 || !y2)
      throw new SyntaxError(`$transition (cubic-bezier) requires four number arguments first.`);
    return transition(`cubic-bezier(${x1},${y1},${x2},${y2})`, args)
  },
  jump: args => jump("", args), //jumpEnd is default.
  jumpEnd: args => jump("jump-end", args),
  jumpStart: args => jump("jump-start", args),
  jumpNone: args => jump("jump-none", args),
  jumpBoth: args => jump("jump-both", args),
};