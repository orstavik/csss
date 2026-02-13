/**
 * Animation shorts:
 * - Turn expressions like $animation(1s, easeIn, infinite) into
 *   CSS `animation` values plus generated `@keyframes`.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses typed argument blocks into objects.
 * - SingleArgumentFunction (SIN): single-argument helpers (duration, steps, etc).
 * - ValueTypes: NumberInterpreter, Time and friends (validate/interpret values).
 *
 * This module exports:
 * - `wrapWithAnimationSupport(cb)`: higher-order wrapper that adds animation
 *   argument handling and @keyframes generation to any property short.
 * - default export: placeholder animation-related properties so other shorts
 *   can't override them.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";

const {
  NumberInterpreter,
  Time,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
} = FunctionTypes;

import * as CURVES from "./Curves.js";

const DirectionWords = {
  normal: "normal",
  reverse: "reverse",
  alternate: "alternate",
  alternateReverse: "alternate-reverse",
};

const FillModeWords = {
  forwards: "forwards",
  backwards: "backwards",
  both: "both",
  none: "none",
};

const PlayStateWords = {
  running: "running",
  paused: "paused",
};

const EasingWords = {
  ease: "ease",
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  ...CURVES,
};

const AnimationHandlers = {
  animation: FunctionBasedOnValueTypes({
    infinite: "infinite",
    ...EasingWords,
    ...DirectionWords,
    ...FillModeWords,
    ...PlayStateWords,
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
    for (let key in DirectionWords) {
      if (res[key]) {
        settings.direction = DirectionWords[key];
        break;
      }
    }
    // Handle fillMode
    for (let key in FillModeWords) {
      if (res[key]) {
        settings.fillMode = FillModeWords[key];
        break;
      }
    }

    // Handle playState
    for (let key in PlayStateWords) {
      if (res[key]) {
        settings.playState = PlayStateWords[key];
        break;
      }
    }

    // Handle easing
    for (let key in EasingWords) {
      if (res[key]) {
        settings.easing = EasingWords[key];
        break;
      }
    }
    if (res.cubicBezier) {
      settings.easing = { name: "cubicBezier", args: res.cubicBezier };
    }
    if (res.steps) {
      settings.easing = { name: "steps", args: res.steps };
    }
    return { settings };
  }),
  to: function ({ args }) {
    return { settings: {}, stepKey: "100%", nextArgs: args };
  },
  from: function ({ args }) {
    return { settings: {}, stepKey: "0%", nextArgs: args };
  },
  go: function ({ args }) {
    // go(50%) means keyframe at 50%
    const percent = args[0]?.text || "50%";
    return { settings: {}, stepKey: percent, nextArgs: args.slice(1) };
  },
  infiniteAlternate: { settings: { iterationCount: "infinite", direction: "alternate" } },
  infinite: { settings: { iterationCount: "infinite" } },
  alternate: { settings: { direction: "alternate" } },
  reverse: { settings: { direction: "reverse" } },
  forwards: { settings: { fillMode: "forwards" } },
  backwards: { settings: { fillMode: "backwards" } },
  both: { settings: { fillMode: "both" } },
};

//TODO not implemented/supported, neither here nor in the Parser.js
// **csssx:** $translateX(100px,to(*3))
// **cssx:**
// ```css
// @keyframes translateX-to-\*3 {
//   100% {
//     transform: translateX(300px);
//   }
// }

// @layer containerDefault {
//   .\$translateX\(100px\,to\(\*3\)\) {
//     transform: translateX(100px);
//     animation: translateX-to-\*3 1s;
//   }
// }
// ```
// function isRelativeCalc(arg) {
//   return arg?.kind === "EXP" && arg.name in Maths && arg.args?.length > 0;
// }
// function processRelCalc(relCalcs, argsIn) {
//  for each relCalc in relCalcs
//  find out if relCalc is a relative calc
//  if(!(relCalc.kind == "EXP" && relCalc.args.length > 1 && relCalc.args[0] == null))
//    return undefined;
//  run the relCalc against all the incoming argsIn
//  here we can either fail if not all argsIn are computable, 
//  or we can just filter away the argsIn that are not computable.
//  const argsOut = argsIn.map(a => /*compute(relCalc.name, a, relCalc.args[1])?.text*/);
//  then return the resulting argsIn.map(arg => arg.text);
//         if (nextArgs && isRelativeCalc(nextArgs[0]))
//         nextArgs = args2.map(baseArg => {
//           const relCalc = nextArgs.find(na => isRelativeCalc(na));
//           return relCalc ? processRelCalc(relCalc, baseArg) : baseArg;
//         });
// }

export function wrapWithAnimationSupport(cb) {
  return ({ name, args }) => {
    // Find where animation functions start (check both .name for EXP and .text for WORD)
    const i = args.findIndex(a => (a.name in AnimationHandlers) || (a.text in AnimationHandlers));
    if (i === -1)
      return cb({ name, args });

    const propertyArgs = args.slice(0, i);
    const animationArgs = args.slice(i);

    // Generate unique animation name based on property name and content
    //todo we need to have the expression get the .text property too..
    const animContent = [name, ...animationArgs.map(({ text, name, args }) => text ?? (name + args.map(a => a.text).join(",")))].join("-");
    const animName = animContent.replaceAll(/[^a-zA-Z0-9-_]/g, "\\$&").substring(0, 50);

    const result = cb({ name, args: propertyArgs });
    const settings = {};
    const keyframes = {};
    // Process each animation step
    for (let anim of animationArgs) {
      let extraSettings, stepKey, nextArgs;
      if (anim.text in AnimationHandlers)
        ({ settings: extraSettings, stepKey, nextArgs } = AnimationHandlers[anim.text]);
      else if (anim.name in AnimationHandlers)
        ({ settings: extraSettings, stepKey, nextArgs } = AnimationHandlers[anim.name](anim));
      else
        throw new SyntaxError(`Not a valid animation argument: ${animName}. Remember, all animation arguments must come after other arguments for every property.`);

      // nextArgs = processRelCalc(nextArgs[0], nextArgs);
      if (nextArgs)
        keyframes[stepKey] = cb({ name, args: nextArgs });
      if (extraSettings)
        Object.assign(settings, extraSettings);
    }

    // Build animation CSS property
    const animationParts = [animName];
    // Add default duration if not specified
    animationParts.push(settings.duration || "2s");
    if (settings.easing) {
      if (typeof settings.easing === "string") {
        animationParts.push(settings.easing);
      } else if (settings.easing.name === "cubicBezier") {
        animationParts.push(`cubic-bezier(${settings.easing.args.map(NumberInterpreter).join(",")})`);
      } else if (settings.easing.name === "steps") {
        animationParts.push(`steps(${settings.easing.args.map(NumberInterpreter).join(",")})`);
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

/**
 * Export map:
 * - `wrapWithAnimationSupport(cb)`: higher-order wrapper that adds animation support.
 * - default export: placeholder longhands for animation-related properties.
 */
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
