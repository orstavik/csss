import { Number as NumberInterpreter, Time, Name, isNumber, isBasic, TYPB, CUSTOM_WORD } from "./func.js";
import * as CURVES from "./Curves.js";
import Maths from "./funcMath.js";

const DIRECTION_WORDS = {
  normal: "normal",
  reverse: "reverse",
  alternate: "alternate",
  alternateReverse: "alternate-reverse",
};

const FILL_MODE_WORDS = {
  forwards: "forwards",
  backwards: "backwards",
  both: "both",
  none: "none",
};

const PLAY_STATE_WORDS = {
  running: "running",
  paused: "paused",
};

const EASING_WORDS = {
  ease: "ease",
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  ...CURVES,
};

const ANIMS = {
  animation: TYPB({
    infinite: "infinite",
    ...EASING_WORDS,
    ...DIRECTION_WORDS,
    ...FILL_MODE_WORDS,
    ...PLAY_STATE_WORDS,
  }, {
    duration: Time,
    delay: Time,
    iterationCount: NumberInterpreter,
  }, {
    cubicBezier: NumberInterpreter,
    steps: NumberInterpreter,
  }, (res) => {
    const settings = {};
    if (res.duration) settings.duration = res.duration;
    if (res.delay) settings.delay = res.delay;
    if (res.iterationCount) settings.iterationCount = res.iterationCount;
    if (res.infinite) settings.iterationCount = "infinite";

    // Handle direction
    for (let key in DIRECTION_WORDS) {
      if (res[key]) {
        settings.direction = DIRECTION_WORDS[key];
        break;
      }
    }

    // Handle fillMode
    for (let key in FILL_MODE_WORDS) {
      if (res[key]) {
        settings.fillMode = FILL_MODE_WORDS[key];
        break;
      }
    }

    // Handle playState
    for (let key in PLAY_STATE_WORDS) {
      if (res[key]) {
        settings.playState = PLAY_STATE_WORDS[key];
        break;
      }
    }

    // Handle easing
    for (let key in EASING_WORDS) {
      if (res[key]) {
        settings.easing = EASING_WORDS[key];
        break;
      }
    }

    if (res.cubicBezier) {
      settings.easing = { name: "cubicBezier", args: res.cubicBezier };
    }
    if (res.steps) {
      settings.easing = { name: "steps", args: res.steps };
    }

    return { settings, stepKey: undefined, nextArgs: [] };
  }),
  to: function (args) {
    return { settings: {}, stepKey: "100%", nextArgs: args };
  },
  from: function (args) {
    return { settings: {}, stepKey: "0%", nextArgs: args };
  },
  go: function (args) {
    // go(50%) means keyframe at 50%
    const percent = args[0]?.text || "50%";
    return { settings: {}, stepKey: percent, nextArgs: args.slice(1) };
  },
  infiniteAlternate: function () {
    return {
      settings: { iterationCount: "infinite", direction: "alternate" },
    };
  },
  infinite: function () {
    return { settings: { iterationCount: "infinite" }, };
  },
  alternate: function () {
    return { settings: { direction: "alternate" }, };
  },
  reverse: function () {
    return { settings: { direction: "reverse" }, };
  },
  forwards: function () {
    return { settings: { fillMode: "forwards" }, };
  },
  backwards: function () {
    return { settings: { fillMode: "backwards" }, };
  },
  both: function () {
    return { settings: { fillMode: "both" }, };
  },
};

function isRelativeCalc(arg) {
  return arg?.kind === "EXP" && arg.name in Maths && arg.args?.length > 0;
}

function processRelCalc(relCalc, baseArg) {
  //todo this is not correct i think, we need to use the computable() function in funcMath.js.
  //todo the relCalc expressions doesn't work now, so we either need to remove this ability from animations, 
  // or fix the relCalc expressions in Parser.js.
  //   const args3 = computableNumbers(args2);
  // debugger


  // Process relative calculations like calc(+ 10px) applied to a base value
  const baseVal = isBasic(baseArg);
  if (!baseVal) return baseArg;

  // Use the math function from funcMath.js
  const mathResult = Maths[relCalc.name](relCalc.name, [baseVal, ...relCalc.args.map(isBasic)]);
  return mathResult || baseArg;
}

export function animationHo(cb) {
  return ({ name, args }) => {
    // Find where animation functions start (check both .name for EXP and .text for WORD)
    const i = args.findIndex(a => (a.name in ANIMS) || (a.text in ANIMS));
    if (i === -1)
      return cb({ name, args });

    const args2 = args.slice(0, i);
    const anims = args.slice(i);

    // Generate unique animation name based on property name and content
    //todo we need to have the expression get the .text property too..
    const animContent = [name, ...anims.map(({ text, name, args }) => text ?? (name + args.map(a => a.text).join(",")))].join("-");
    const animName = animContent.replaceAll(/[^a-zA-Z0-9-_]/g, "\\$&").substring(0, 50);

    // Check if first anim is the animation() settings function
    let settings = {};
    if (anims[0].name === "animation") {
      const anim = anims.shift();
      const animSettings = ANIMS.animation({ name: anim.name, args: anim.args });
      settings = animSettings.settings;
    }

    // Process the main/initial state
    const result = cb({ name, args: args2 });
    const keyframes = {};
    // Process each animation step
    for (let anim of anims) {
      const animName = anim.name || anim.text;
      if (!(animName in ANIMS))
        throw new SyntaxError(`Not a valid animation argument: ${animName}. Remember, all animation arguments must come after other arguments for every property.`);

      let { settings: extraSettings, stepKey, nextArgs } = ANIMS[animName](anim.args || []);
      if (nextArgs && isRelativeCalc(nextArgs[0]))
        nextArgs = args2.map(baseArg => {
          const relCalc = nextArgs.find(na => isRelativeCalc(na));
          return relCalc ? processRelCalc(relCalc, baseArg) : baseArg;
        });
      if (nextArgs)
        keyframes[stepKey] = cb({ name, args: nextArgs });
      if (extraSettings) {
        Object.assign(settings, extraSettings);
      }
    }

    // Build animation CSS property
    const animationParts = [animName];
    // Add default duration if not specified
    animationParts.push(settings.duration || "1s");
    if (settings.easing) {
      if (typeof settings.easing === "string") {
        animationParts.push(settings.easing);
      } else if (settings.easing.name === "cubicBezier") {
        animationParts.push(`cubic-bezier(${settings.easing.args.map(a => isBasic(a).text).join(",")})`);
      } else if (settings.easing.name === "steps") {
        animationParts.push(`steps(${settings.easing.args.map(a => isBasic(a).text).join(",")})`);
      }
    }
    if (settings.delay) animationParts.push(settings.delay);
    if (settings.iterationCount) animationParts.push(settings.iterationCount);
    if (settings.direction) animationParts.push(settings.direction);
    if (settings.fillMode) animationParts.push(settings.fillMode);
    if (settings.playState) animationParts.push(settings.playState);

    result.animation = animationParts.join(" ");
    result[`@keyframes ${animName}`] = keyframes;
    return result;
  };
}

export default {
  animation: undefined,
  animationName: undefined,
  animationDuration: undefined,
  animationTimingFunction: undefined,
  animationDelay: undefined,
  animationIterationCount: undefined,
  animationDirection: undefined,
  animationFillMode: undefined,
  animationPlayState: undefined,
};