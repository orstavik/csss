import { isNumber, isTime, isName, SEQ } from "./func.js";
import * as CURVES from "./Curves.js";

export const TYP = (singles, sets, post) => {
  singles = Object.entries(singles);
  sets = Object.entries(sets);
  return ({ args, name }) => {
    const res = {};
    main: for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (singles)
        for (let [k, v] of singles) {
          if (k in res)
            continue;
          const a2 = v(a);
          if (a2) {
            res[k] = a2;
            continue main;
          }
        }
      if (sets)
        for (let [k, v] of sets) {
          const a2 = v(a);
          if (a2) {
            (res[k] ??= []).push(a2);
            continue main;
          }
        }
      throw new SyntaxError(`Bad argument ${name}/${i + 1}.
${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
    }
    return post(res);
  };
};

const singles = {
  allowDiscrete: a => a.text == "allowDiscrete" && ({ text: "allow-discrete" }),
  steps: ({ name, args }) => {
    if (!/^(steps(|End|Start|Both|None))$/.test(name))
      return;
    const v = SEQ([isNumber], ar => ar[0])({ name, args });
    if (name == "steps" || name == "stepsEnd") return { text: `steps(${v})` };
    if (name == "stepsStart") return { text: `steps(${v}, start)` };
    if (name == "stepsBoth") return { text: `steps(${v}, jump-both)` };
    if (name == "stepsNone") return { text: `steps(${v}, jump-none)` };
  },
  ease: a => /^(?:ease(In|Out|InOut)?|linear)$/.test(a.text) && { text: a.text.replace(/[A-Z]/g, "-$&").toLowerCase() },
  curve: a => a.text in CURVES && a,
};
const lists = {
  durDelay: isTime,
  cubicBezier: isNumber,
  props: isName,
};
function transitionPost({ allowDiscrete, steps, ease, curve, durDelay = [], cubicBezier, props = [] }) {
  if (durDelay.length > 2) throw new SyntaxError(`more than two duration and delay arguments`);
  if (!!steps + !!ease + !!curve > 1) throw new SyntaxError(`more than one timing functions`);
  if (cubicBezier && cubicBezier.length != 4) throw new SyntaxError(`cubic-bezier requires four number arguments`);

  if (cubicBezier) cubicBezier = cubicBezier.map(a => a.text).join(",");
  if (!props.length) props = [""];
  const settings = [...durDelay, allowDiscrete].filter(Boolean).map(a => a.text);
  if (curve)
    return {
      [`--transition-${curve.text}`]: CURVES[curve.text],
      transition: props.map(p => [p?.text, `var(--transition-${curve.text})`, ...settings].filter(Boolean).join(" ")).join(", "),
    }
  const timing = (cubicBezier ?? ease ?? steps)?.text;
  return {
    transition: props.map(p => [p?.text, timing, ...settings].filter(Boolean).join(" ")).join(", ")
  };
}

export default {
  transitionProperty: undefined,
  transitionDuration: undefined,
  transitionTimingFunction: undefined,
  transitionDelay: undefined,
  transitionSkipInk: undefined,
  transition: TYP(singles, lists, transitionPost),
};