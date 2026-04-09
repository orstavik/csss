import { BadArgument, matchArgsWithInterpreters, CsssFunctions, CsssPrimitives } from "./func2.js";
const { CssValuesToCsssTable } = CsssFunctions;
const { MsOrNumber, Time, PositiveInteger } = CsssPrimitives;
import Easing from "./funcEasing.js";
const EasingFunction = Easing.csss.easingFunction;
const EasingFunction2 = x => {
  const xx = EasingFunction(x);
  return xx.length ? xx : undefined;
}

function flattenTheRootVectorExpr(x) {
  const parts = [];
  for (; x.name === ">"; x = x.args[0])
    parts.unshift(x.args[1]);
  parts.unshift(x);
  return parts;
}

const BehaviorWords = CssValuesToCsssTable("alternate|reverse|alternate-reverse");
const Behavior = a => BehaviorWords[a.text];
const FillModeWords = CssValuesToCsssTable("forwards|backwards|both");
const FillMode = a => FillModeWords[a.text];
const TimeVector = x => {
  const ms = MsOrNumber(x);
  if (ms != null)
    return [0, ms];
  if (x.name !== ">")
    return;
  const flat = flattenTheRootVectorExpr(x);
  const mss = flat.map((a, i) => {
    const ms = MsOrNumber(a);
    if (ms != null) return ms;
    throw BadArgument(">", flat, i, `Expected <time|number>, got ${flat[i]}.`);
  });
  return mss;
}

function extract(x, i) {
  if (x.name === ">") return extract(x.args[i % x.args.length], i);
  const args = x.args?.map(a => extract(a, i));
  return { ...x, args };
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
  const name = "a" + Object.entries(res).map(([k, v]) => `${parseFloat(k)}_${Object.entries(v).map(([kk, vv]) => `${kk}_${vv.replaceAll(/[^a-z0-9_-]/ig, m => !m.trim() ? "_" : "\\" + m)}`).join("_")}`).join("_");
  return { ...base, ["@keyFrames " + name]: res, animation: animation + " " + name };
}

function animate({ name, args }) {
  let [ease, behavior, fillMode, count, delay, times] = matchArgsWithInterpreters("animate", 0, args, [EasingFunction2, Behavior, FillMode, PositiveInteger, Time, TimeVector]);
  if (delay == null && times == null)
    times = [0, 300]; //todo here we are adding a default animation length.
  if (delay != null && times == null) {
    times = [0, delay];
    delay = undefined;
  }
  const duration = times.reduce((a, b) => a + b, 0);
  return {
    $: animationHof.bind(null, {
      animation: [ease?.[0], behavior, duration, fillMode, count].filter(Boolean).join(" "),
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
};