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

  slide: transition.bind(null, "linear"),
  ease: transition.bind(null, "ease"),
  easeIn: transition.bind(null, "ease-in"),
  easeOut: transition.bind(null, "ease-out"),
  easeInOut: transition.bind(null, "ease-in-out"),
  crisp: cube.bind(null, "0.20,0,0.80,1"),
  crispIn: cube.bind(null, "0.20,0,0.66,1"),
  crispOut: cube.bind(null, "0.35,0,0.80,1"),
  crispInOut: cube.bind(null, "0.20,0,0.80,1"),
  harsh: cube.bind(null, "0.05,0,0.90,1"),
  harshIn: cube.bind(null, "0.05,0,0.66,1"),
  harshOut: cube.bind(null, "0.35,0,0.90,1"),
  harshInOut: cube.bind(null, "0.05,0,0.90,1"),
  playful: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  playfulIn: cube.bind(null, "0.20,-0.40,0.66,1"),
  playfulOut: cube.bind(null, "0.35,0,0.75,1.40"),
  playfulInOut: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  bounce: cube.bind(null, "0.25,-0.30,0.70,1.30"),
  bounceIn: cube.bind(null, "0.25,-0.30,0.66,1"),
  bounceOut: cube.bind(null, "0.35,0,0.70,1.30"),
  bounceInOut: cube.bind(null, "0.25,-0.30,0.70,1.30"),

  hesitate: cube.bind(null, ".38,1.55,.62,-0.55"),
  hesitateIn: cube.bind(null, ".45,.64,.12,-0.55"),
  hesitateOut: cube.bind(null, ".38,0,.62,-0.55"),
  hesitateInOut: cube.bind(null, ".38,1.55,.62,-0.55"),

  //wobble: (args) => native(`cubic-bezier(.5,-.5,.5,1.5)`, args),
  wobbleOut: cube.bind(null, "1,2.06,.52,.5"),

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