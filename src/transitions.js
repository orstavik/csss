//ease is defined in native css as accelerating and decelerating.
//crisp means that it starts or ends quickly, but not both.
//harsh means that it starts or ends very quickly, but not both.
//playful means that it overshoots either coming in, going out, or both.
//bounce means that it overshoots more than playful, either coming in, going out, or both.
//hesitate means that it goes forward, then pauses, then forward again. 
//wiggle means that it goes forward, then backtracks a little, then forward again.
//wobble means that it goes forward, then backtracks a fully, then forward again, then backtracks a little, then forward again.

export class Transitions {

  static cubicBezier([x1, y1, x2, y2], sampleSize = 240, precision = 5) {
    if (![x1, y1, x2, y2].every(Number.isFinite))
      throw new TypeError("Control points must be finite numbers.");
    if (precision < 3)
      throw new RangeError("precision must be ≥ 2 (recommend ≥ 3).");

    const xInc = 1 / sampleSize;
    const tInc = xInc / precision;
    const res = new Array(sampleSize + 1);
    res[0] = 0;
    for (let xStep = xInc, prevX = 0, prevY = 0, t = 0, n = 1; t < 1; t += tInc) {
      const u = 1 - t;
      const tt = t * t;
      const ttt = tt * t;
      const uut3 = 3 * u * u * t, utt3 = 3 * u * tt;
      const x = uut3 * x1 + utt3 * x2 + ttt;
      const y = uut3 * y1 + utt3 * y2 + ttt;
      if (x >= xStep) {
        res[n++] = prevY + (y - prevY) * ((xStep - prevX) / (x - prevX));
        xStep += xInc;
      }
      prevX = x, prevY = y;
    }
    if (res.length < sampleSize)
      return this.cubicBezier([x1, y1, x2, y2], sampleSize, precision * 2);
    res[res.length - 1] = 1; //x=1, y=1
    return res;
  }

  static computeDecay(count, height, hDecay) {
    const timeDecay = Math.sqrt(hDecay);
    let time = 1 / ((1 - Math.pow(timeDecay, count)) / (1 - timeDecay));
    const res = [];
    for (let i = 0; i < count; i++, height *= hDecay, time *= timeDecay)
      res.push({ height, time });
    return res;
  }

  static bounce(count, firstHeight, decay = 0.7, width = 120) {
    if (count % .5 != 0)
      throw new RangeError("count must be whole or half numbers.");
    const overshoot = count % 1;
    const steps = this.computeDecay(Math.ceil(count), firstHeight, decay);
    const overshootScale = 1 + (steps[0].time / 2);

    const pointSet = steps.flatMap(({ time, height }) => {
      const halfSize = Math.round(time * .5 * width * overshootScale);
      const half = this.cubicBezier([0, 0, .58, 1], halfSize).map(y => y * height);
      return [half, half.slice().reverse().slice(1)];
    });
    overshoot && pointSet.shift();
    return pointSet.flat();
  }

  static sineWave(count, height, width = 120) {
    return Array.from({ length: width + 1 }, (_, i) =>
      -Math.sin((i / width) * Math.PI * 2 * count) * height *
      Math.cos((Math.PI / 2) * (i / width))
    );
  }

  static CURVE = {
    slowIn: [.3, 0, 1, 1],   // gentle "ease-in"
    easeIn: [.42, 0, 1, 1],
    quickIn: [.55, 0, 1, 1], // stronger "ease-in"
    slowOut: [0, 0, .7, 1],  // gentle "ease-out"
    easeOut: [0, 0, .58, 1],
    quickOut: [0, 0, .45, 1],// stronger "ease-out"
  };

  static WAVES = {
    easeIn: this.cubicBezier(this.CURVE.easeIn, 50),
    easeOut: this.cubicBezier(this.CURVE.easeOut, 50),
    easeInOut: this.cubicBezier([.42, 0, .58, 1], 50),
    easeInStrong: this.cubicBezier([.55, 0, 1, 1], 50),
    easeOutStrong: this.cubicBezier([0, 0, .45, 1], 50),
    easeInOutStrong: this.cubicBezier([.55, 0, .45, 1], 50),
    easeInSpringOut: [
      ...this.cubicBezier(this.CURVE.easeIn, 70),
      ...this.sineWave(2, .1, 40).map(y => 1 - y).slice(1)
    ],
    bounce: this.bounce(3.5, 1, 0.4).map(y => 1 - y),
    easeInBounceOut: [
      ...this.cubicBezier(this.CURVE.easeIn, 100),
      ...this.bounce(3, .2, 0.7, 50).map(y => 1 - y)
    ],
    easeInBackOut: [
      ...this.cubicBezier(this.CURVE.easeIn, 70),
      ...this.sineWave(1, .1, 40).map(y => y - 1).slice(1)
    ],
    fastInBumpOut: [
      ...this.cubicBezier(this.CURVE.slowIn, 90),
      ...this.bounce(1, .1, 0.5, 20).map(y => 1 - y)
    ],
  }
  static cssLinear(nums) {
    const str = nums.map(v => (Math.round(v * 1000) / 1000).toString().replace("0.", ".")).join(",");
    return `linear(${str})`;
  }

  static WAVE_STRINGS = Object.fromEntries(Object.entries(this.WAVES).map(
    ([k, v]) => [k, this.cssLinear(v)]));
}


import { interpretNumber, extractTime, interpretName } from "./func.js";

function transition(timing, args) {
  const dur = extractTime(args);
  const delay = extractTime(args);
  const settings = [dur, delay, timing].filter(Boolean);
  const props = [];
  let a2;
  for (let a of args)
    if (a.text == "allowDiscrete") settings.push("allow-discrete");
    else if (a2 = interpretName(a)) props.push(a.text);
    else throw new SyntaxError(`Not a valid $transition property: ${a.text}.`);
  let transition = settings.join(" ");
  if (props.length)
    transition = props.map(p => `${p} ${transition}`).join(", ");
  return { transition };
}

function jump(type, args) {
  const steps = interpretNumber(args[0])?.num;
  if (steps > 0)
    return transition(`steps(${steps}, ${type})`, args.slice(1));
  throw new SyntaxError(`$jump requires a positive integer argument first.`);
}

function cube(cube, args) { return transition(`cubic-bezier(${cube})`, args); }

const WAVES = {};

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
  // playful: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  // playfulIn: cube.bind(null, "0.20,-0.40,0.66,1"),
  // playfulOut: cube.bind(null, "0.35,0,0.75,1.40"),
  // playfulInOut: cube.bind(null, "0.20,-0.40,0.75,1.40"),
  // bounce: cube.bind(null, "0.25,-0.30,0.70,1.30"),
  // bounceIn: cube.bind(null, "0.25,-0.30,0.66,1"),
  // bounceOut: cube.bind(null, "0.35,0,0.70,1.30"),
  // bounceInOut: cube.bind(null, "0.25,-0.30,0.70,1.30"),
  // hesitate: cube.bind(null, ".38,1.55,.62,-0.55"),
  // hesitateIn: cube.bind(null, ".45,.64,.12,-0.55"),
  // hesitateOut: cube.bind(null, ".38,0,.62,-0.55"),
  // hesitateInOut: cube.bind(null, ".38,1.55,.62,-0.55"),
  // wiggle: cube.bind(null, ".5,1.25,.5,-.25"),//wiggle is the same as hesitate, only that it backtracks too. 
  // wiggleIn: cube.bind(null, ".30,1.30,.40,-.35"),
  // wiggleOut: cube.bind(null, ".65,1.25,.85,-.35"),
  // wiggleInOut: cube.bind(null, ".5,1.25,.5,-.25"),

  // xbounce: cube.bind(null, ".34,1.56,.64,1"),   //overshoots either coming in, going out, or both.
  // xbounceIn: cube.bind(null, ".36,0,.66,-.56"),
  // xbounceOut: cube.bind(null, ".34,1.56,.64,1"),
  // xbounceInOut: cube.bind(null, ".68,-.6,.32,1.6"),
  // xplayful: cube.bind(null, "0,.35,.1,1"),//overshoots same as bounce, but slightly more
  // xplayfulIn: cube.bind(null, ".6,0,1,.2"),
  // xplayfulOut: cube.bind(null, "0,.35,.1,1"),
  // xplayfulInOut: cube.bind(null, ".65,0,.35,1"),
  // xcrisp: cube.bind(null, "0,.55,.2,1"),//starts or ends crisply
  // xcrispIn: cube.bind(null, ".8,0,1,.45"),
  // xcrispOut: cube.bind(null, "0,.55,.2,1"),
  // xcrispInOut: cube.bind(null, ".8,0,.2,1"),
  // xharsh: cube.bind(null, "0,.8,.15,1"),//starts or ends harshly
  // xharshIn: cube.bind(null, ".95,0,1,.2"),
  // xharshOut: cube.bind(null, "0,.8,.15,1"),
  // xharshInOut: cube.bind(null, ".9,0,.1,1"),
  // xhesitate: cube.bind(null, ".5,1.05,.5,-.10"),   //hesitate is to go forward, then pauses, then forward again. 
  // xhesitateIn: cube.bind(null, ".25,1.10,.35,-.15"),   //hesitateIn does so at the beginning of the transition.
  // xhesitateOut: cube.bind(null, ".65,1.10,.85,-.15"),   //hesitateOut does so at the end of the transition.
  // xhesitateInOut: cube.bind(null, ".5,1.15,.5,-.15"),   //hesitateInOut and hesitate does so in the middle.

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