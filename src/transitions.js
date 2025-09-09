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

function cube(cube, args) { return transition(`cubic-bezier(${cube})`, args); }

export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,

  ease: transition.bind(null, "ease"),
  slide: transition.bind(null, "linear"),
  easeIn: transition.bind(null, "ease-in"),
  easeOut: transition.bind(null, "ease-out"),
  easeInOut: transition.bind(null, "ease-in-out"),

  easeInCrispOut: cube.bind(null, "0.42,0,0.80,1"),
  easeInHarshOut: cube.bind(null, "0.42,0,0.90,1"),
  easeInPlayfulOut: cube.bind(null, "0.42,0,0.75,1.40"),
  easeInBounceOut: cube.bind(null, "0.42,0,0.70,1.30"),
  crisp: cube.bind(null, "0.20,0,0.80,1"),
  crispIn: cube.bind(null, "0.20,0,0.66,1"),
  crispOut: cube.bind(null, "0.35,0,0.80,1"),
  crispInOut: cube.bind(null, "0.20,0,0.80,1"),
  crispInEaseOut: cube.bind(null, "0.20,0,0.58,1"),
  crispInHarshOut: cube.bind(null, "0.20,0,0.90,1"),
  crispInPlayfulOut: cube.bind(null, "0.20,0,0.75,1.40"),
  crispInBounceOut: cube.bind(null, "0.20,0,0.70,1.30"),
  harsh: cube.bind(null, "0.05,0,0.90,1"),
  harshIn: cube.bind(null, "0.05,0,0.66,1"),
  harshOut: cube.bind(null, "0.35,0,0.90,1"),
  harshInOut: cube.bind(null, "0.05,0,0.90,1"),
  harshInEaseOut: cube.bind(null, "0.05,0,0.58,1"),
  harshInCrispOut: cube.bind(null, "0.05,0,0.80,1"),
  harshInPlayfulOut: cube.bind(null, "0.05,0,0.75,1.40"),
  harshInBounceOut: cube.bind(null, "0.05,0,0.70,1.30"),
  playful: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  playfulIn: cube.bind(null, "0.20,-0.40,0.66,1"),
  playfulOut: cube.bind(null, "0.35,0,0.75,1.40"),
  playfulInOut: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  playfulInEaseOut: cube.bind(null, "0.20,-0.40,0.58,1"),
  playfulInCrispOut: cube.bind(null, "0.20,-0.40,0.80,1"),
  playfulInHarshOut: cube.bind(null, "0.20,-0.40,0.90,1"),
  playfulInBounceOut: cube.bind(null, "0.20,-0.40,0.70,1.30"),
  bounce: cube.bind(null, "0.25,-0.30,0.70,1.30"),
  bounceIn: cube.bind(null, "0.25,-0.30,0.66,1"),
  bounceOut: cube.bind(null, "0.35,0,0.70,1.30"),
  bounceInOut: cube.bind(null, "0.25,-0.30,0.70,1.30"),
  bounceInEaseOut: cube.bind(null, "0.25,-0.30,0.58,1"),
  bounceInCrispOut: cube.bind(null, "0.25,-0.30,0.80,1"),
  bounceInHarshOut: cube.bind(null, "0.25,-0.30,0.90,1"),
  bounceInPlayfulOut: cube.bind(null, "0.25,-0.30,0.75,1.2"),

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