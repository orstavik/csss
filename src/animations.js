import { matchArgsWithInterpreters, CsssFunctions, CsssPrimitives, flatVector, BadArgument } from "./func.js";
const { CssValuesToCsssTable } = CsssFunctions;
const { MsOrNumber, PositiveInteger } = CsssPrimitives;
const IterationCount = a => a.text === 'infinite' ? 'infinite' : PositiveInteger(a);
import Easing from "./funcEasing.js";

const EasingFunction = Easing.csss.easingFunction;
const BehaviorWords = CssValuesToCsssTable("alternate|reverse|alternate-reverse");
const Behavior = a => BehaviorWords[a.text];
const FillModeWords = CssValuesToCsssTable("forwards|backwards|both");
const FillMode = a => FillModeWords[a.text];
const TimeVector = x => (x = flatVector(">", MsOrNumber, x))?.length === 1 ? [0, x[0]] : x;

function extract(x, i) {
  if (x.name === ">" && !x.flat) x.flat = flattenVector(x);
  if (x.flat) return extract(x.flat[i % x.flat.length], i);
  if (x.name == null) return x;
  return { ...x, args: x.args?.map(a => extract(a, i)) };
}

function makeName(obj) {
  let res = ["a"];
  for (let [k, v] of Object.entries(obj)) {
    res.push(k.replaceAll(".", "-").replaceAll(/[^\d-]+/ig, "_"));
    for (let [kk, vv] of Object.entries(v))
      res.push(kk, vv.replaceAll?.(/[^a-z0-9_-]/ig, m => !m.trim() ? "_" : "\\" + m) ?? vv);
  }
  return res.join("");
}

function flattenVector(a) {
  const res = [a.args[1]];
  while (a.args[0]?.name === ">") {
    a = a.args[0];
    res.unshift(a.args[1]);
  }
  res.unshift(a.args[0]);
  return res;
}

//ctx is the existing results, CB is the next $short, X is the full expr for that short.
function animationHof({ animation, keyFrames }, CB, X) {
  const flatArgs = keyFrames.map((_, i) => extract(X, i));
  const resAr = flatArgs.map(CB);
  const base = resAr.slice(1).reduce((acc, obj) => { for (let k in acc) if (acc[k] !== obj[k]) delete acc[k]; return acc; }, { ...resAr[0] });
  const keyFrameBodies = resAr.map(obj => { obj = { ...obj }; for (let k in base) delete obj[k]; return obj; });
  const keyFrameBodiesStrings = keyFrameBodies.map(JSON.stringify);
  const done = new Set();
  const res = {};
  for (let i = 0; i < keyFrames.length; i++) {
    if (done.has(i)) continue;
    done.add(i);
    let key = keyFrames[i] + "%";
    for (let j = i + 1; j < keyFrames.length; j++) {
      if (keyFrameBodiesStrings[i] === keyFrameBodiesStrings[j]) {
        key += ", " + keyFrames[j] + "%";
        done.add(j);
      }
    }
    res[key] = keyFrameBodies[i];
  }
  const name = makeName(res);
  return { ...resAr[0], ["@keyFrames " + name]: res, animation: animation + " " + name };
}

function interpretTimeVector(times) {
  if (times.length < 2) times.unshift(0);
  const duration = times.slice(1).reduce((a, b) => a + b, 0);
  if (!duration) return {};
  const delay = times[0] ? times[0] + "ms" : 0;
  const keyFrames = [0];
  for (let i = 1; i < times.length - 1; i++)
    keyFrames[i] = Math.round(times[i] * 100 / duration) + keyFrames[i - 1];
  keyFrames.push(100);
  return { keyFrames, delay, duration: duration + "ms" };
}

function animate({ name, args }) {
  const [ease, behavior, fillMode, count, times = [0, 300]] =
    matchArgsWithInterpreters("animate", 0, args, [EasingFunction, Behavior, FillMode, IterationCount, TimeVector]);
  if (times.length < 2) times.unshift(0);
  const { keyFrames, duration, delay } = interpretTimeVector(times);
  if (!duration) throw BadArgument("animate", args, args.length, "duration must be greater than 0.");
  return {
    $: animationHof.bind(null, {
      animation: [ease?.[0], behavior, duration, delay, fillMode, count].filter(Boolean).join(" "),
      keyFrames,
    }),
    ...(ease?.[1] ?? {}),
  };
}

const props = {
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

export default {
  csss: {
    animate,
  },
  props,
  css: {
    animate: style => {
      // Reversing animation involves checking multiple properties
      if (!style.animation) return undefined;
      // Because `animate` in csss creates @keyFrames, it's very hard to perfectly reverse it just from the `animation` property.
      // We will provide a best effort fallback for the animation property if it doesn't contain generated names, or just ignore.
      return undefined; // actually, we should return undefined if we can't reliably reverse.
    }
  }
};