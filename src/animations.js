import { matchArgsWithInterpreters, CsssFunctions, CsssPrimitives, flatVector } from "./func.js";
const { CssValuesToCsssTable } = CsssFunctions;
const { MsOrNumber, Time, PositiveInteger } = CsssPrimitives;
const IterationCount = a => a.text === 'infinite' ? 'infinite' : PositiveInteger(a);
import Easing from "./funcEasing.js";

const EasingFunction = Easing.csss.easingFunction;
const BehaviorWords = CssValuesToCsssTable("alternate|reverse|alternate-reverse");
const Behavior = a => BehaviorWords[a.text];
const FillModeWords = CssValuesToCsssTable("forwards|backwards|both");
const FillMode = a => FillModeWords[a.text];
const TimeVector = x => (x = flatVector(">", MsOrNumber, x))?.length === 1 ? [0, x[0]] : x;

function extract(x, i) {
  if (x.name === ">") return extract(x.args[i % x.args.length], i);
  const args = x.args?.map(a => extract(a, i));
  if (typeof x === "string") return x; //todo this is a hack.. i don't know why the colors here are not good.
  return { ...x, args };
}

function makeName(obj) {
  let res = ["a"];
  for (let [k, v] of Object.entries(obj)) {
    res.push(parseFloat(k));
    for (let [kk, vv] of Object.entries(v)) {
      res.push(kk);
      res.push(vv.replaceAll?.(/[^a-z0-9_-]/ig, m => !m.trim() ? "_" : "\\" + m) ?? vv);
    }
  }
  return res.join("_");
}

//ctx is the existing results, CB is the next $short, X is the full expr for that short.
function animationHof({ animation, keyFrames }, CB, X) {
  const flatArgs = keyFrames.map((num, i) => extract(X, i));
  const resAr = flatArgs.map(CB);
  const base = resAr.reduce((acc, obj) => { for (let k in acc) if (acc[k] !== obj[k]) delete acc[k]; return acc; }, {});
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
  return { ...base, ["@keyFrames " + name]: res, animation: animation + " " + name };
}

function animate({ name, args }) {
  let [ease, behavior, fillMode, count, delay, times] = matchArgsWithInterpreters("animate", 0, args, [EasingFunction, Behavior, FillMode, IterationCount, Time, TimeVector]);
  if (delay == null && times == null)
    times = [0, 300]; //todo here we are adding a default animation length.
  if (delay != null && times == null) {
    times = [0, delay];
    delay = undefined;
  }
  if (delay != null) delay += "ms";
  const duration = times.reduce((a, b) => a + b, 0);
  return {
    $: animationHof.bind(null, {
      animation: [ease?.[0], behavior, duration + "ms", delay, fillMode, count].filter(Boolean).join(" "),
      keyFrames: times.map(a => Math.floor(a * 100 / duration)),
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