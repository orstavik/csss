//ease is defined in native css as accelerating and decelerating.
//crisp means that it starts or ends quickly, but not both.
//harsh means that it starts or ends very quickly, but not both.
//playful means that it overshoots either coming in, going out, or both.
//bounce means that it overshoots more than playful, either coming in, going out, or both.
//hesitate means that it goes forward, then pauses, then forward again. 
//wiggle means that it goes forward, then backtracks a little, then forward again.
//wobble means that it goes forward, then backtracks a fully, then forward again, then backtracks a little, then forward again.


import { extractNumber, extractTime, interpretName } from "./func.js";

function transition(timing, args) {
  const dur = args.length && extractTime(args);
  const delay = args.length && extractTime(args);
  if (args.text == "allowDiscrete")
    timing += " allow-discrete";
  const tail = [dur, delay, timing].filter(Boolean).join(" ");
  args = !args.length ? ["all"] :
    args.map(a => {   //todo this could be an extractAll() method!
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
  wiggle: cube.bind(null, ".5,1.25,.5,-.25"),//wiggle is the same as hesitate, only that it backtracks too. 
  wiggleIn: cube.bind(null, ".30,1.30,.40,-.35"),
  wiggleOut: cube.bind(null, ".65,1.25,.85,-.35"),
  wiggleInOut: cube.bind(null, ".5,1.25,.5,-.25"),

  xbounce: cube.bind(null, ".34,1.56,.64,1"),   //overshoots either coming in, going out, or both.
  xbounceIn: cube.bind(null, ".36,0,.66,-.56"),
  xbounceOut: cube.bind(null, ".34,1.56,.64,1"),
  xbounceInOut: cube.bind(null, ".68,-.6,.32,1.6"),
  xplayful: cube.bind(null, "0,.35,.1,1"),//overshoots same as bounce, but slightly more
  xplayfulIn: cube.bind(null, ".6,0,1,.2"),
  xplayfulOut: cube.bind(null, "0,.35,.1,1"),
  xplayfulInOut: cube.bind(null, ".65,0,.35,1"),
  xcrisp: cube.bind(null, "0,.55,.2,1"),//starts or ends crisply
  xcrispIn: cube.bind(null, ".8,0,1,.45"),
  xcrispOut: cube.bind(null, "0,.55,.2,1"),
  xcrispInOut: cube.bind(null, ".8,0,.2,1"),
  xharsh: cube.bind(null, "0,.8,.15,1"),//starts or ends harshly
  xharshIn: cube.bind(null, ".95,0,1,.2"),
  xharshOut: cube.bind(null, "0,.8,.15,1"),
  xharshInOut: cube.bind(null, ".9,0,.1,1"),
  xhesitate: cube.bind(null, ".5,1.05,.5,-.10"),   //hesitate is to go forward, then pauses, then forward again. 
  xhesitateIn: cube.bind(null, ".25,1.10,.35,-.15"),   //hesitateIn does so at the beginning of the transition.
  xhesitateOut: cube.bind(null, ".65,1.10,.85,-.15"),   //hesitateOut does so at the end of the transition.
  xhesitateInOut: cube.bind(null, ".5,1.15,.5,-.15"),   //hesitateInOut and hesitate does so in the middle.

  transition: args => {
    const x1 = extractNumber(x1);
    const y1 = extractNumber(y1);
    const x2 = extractNumber(x2);
    const y2 = extractNumber(y2);
    if (!x1 || !y1 || !x2 || !y2)
      throw new SyntaxError(`$transition (cubic-bezier) requires four number arguments first.`);
    return transition(`cubic-bezier(${x1},${y1},${x2},${y2})`, args)
  },
  jump: jump.bind(null, ""), //jumpEnd is default.
  jumpEnd: jump.bind(null, "jump-end"),
  jumpStart: jump.bind(null, "jump-start"),
  jumpNone: jump.bind(null, "jump-none"),
  jumpBoth: jump.bind(null, "jump-both"),
};