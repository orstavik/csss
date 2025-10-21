//ease is defined in native css as accelerating and decelerating.
//crisp means that it starts or ends quickly, but not both.
//harsh means that it starts or ends very quickly, but not both.
//playful means that it overshoots either coming in, going out, or both.
//bounce means that it overshoots more than playful, either coming in, going out, or both.
//hesitate means that it goes forward, then pauses, then forward again. 
//wiggle means that it goes forward, then backtracks a little, then forward again.
//wobble means that it goes forward, then backtracks a fully, then forward again, then backtracks a little, then forward again.

import { isNumber, extractTime, interpretName } from "./func.js";

function transition(timing, args) {
  const dur = extractTime(args);
  const delay = extractTime(args);
  const settings = [dur, delay].filter(Boolean);
  const props = [];
  let a2;
  for (let a of args)
    if (a.text == "allowDiscrete") settings.push("allow-discrete");
    else if (a2 = interpretName(a)) props.push(a.text);
    else throw new SyntaxError(`Not a valid $transition property: ${a.text}.`);
  const _var = props.length > 1 ? timing : undefined;
  settings.push(props.length > 1 ? "var(--t)" : timing);
  let transition = settings.join(" ");
  if (props.length)
    transition = props.map(p => `${p} ${transition}`).join(", ");
  return { "--t": _var, transition };
}

function jump(type, args) {
  const steps = isNumber(args[0])?.num;
  if (steps > 0)
    return transition(`steps(${steps}, ${type})`, args.slice(1));
  throw new SyntaxError(`$jump requires a positive integer argument first.`);
}

function cube(cube, args) { return transition(`cubic-bezier(${cube})`, args); }

import * as Transitions from "./Curves.js";

const backInEaseOut = transition.bind(null, Transitions.backInEaseOut);
const easeInBackOut = transition.bind(null, Transitions.easeInBackOut);
const backInOut = transition.bind(null, Transitions.backInOut);
const easeInBounceOut = transition.bind(null, Transitions.easeInBounceOut);
const bounceInEaseOut = transition.bind(null, Transitions.bounceInEaseOut);
const bounceInOut = transition.bind(null, Transitions.bounceInOut);
const easeInSpringOut = transition.bind(null, Transitions.easeInSpringOut);
const springInEaseOut = transition.bind(null, Transitions.springInEaseOut);
const springInOut = transition.bind(null, Transitions.springInOut);
const wobble = transition.bind(null, Transitions.wobble);

export default {

  ...Transitions.WAVE_STRINGS,

  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,

  slide: transition.bind(null, "linear"), //this can be empty?
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

  backInEaseOut,
  easeInBackOut,
  backInOut,
  easeInBounceOut,
  bounceInEaseOut,
  bounceInOut,
  easeInSpringOut,
  springInEaseOut,
  springInOut,
  wobble,

  transition: ([x1, y1, x2, y2, ...args]) => {
    x1 = extractNumber(x1);
    y1 = extractNumber(y1);
    x2 = extractNumber(x2);
    y2 = extractNumber(y2);
    if (!x1 || !y1 || !x2 || !y2)
      throw new SyntaxError(`$transition (cubic-bezier) requires four number arguments first.`);
    return transition(`cubic-bezier(${x1},${y1},${x2},${y2})`, args.slice(4))
  },
  jump: jump.bind(null, ""), //jumpEnd is default.
  jumpEnd: jump.bind(null, "jump-end"),
  jumpStart: jump.bind(null, "jump-start"),
  jumpNone: jump.bind(null, "jump-none"),
  jumpBoth: jump.bind(null, "jump-both"),
};