import { CsssPrimitives, BadArgument } from "./func.js";
const { Name, Time } = CsssPrimitives;
import Easing from "./funcEasing.js";
const { easingFunction } = Easing.csss;

const AllowDiscrete = a => a.text === "allowDiscrete" ? "allow-discrete" : undefined;
const TransitionProperty = a => Name(a)?.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);

const transition = ({ args }) => {
  let i = 0;
  const ease = easingFunction(args[i]);
  if (ease) i++;
  const duration = (i < args.length) && Time(args[i]);
  if (duration) i++;
  const delay = (i < args.length) && Time(args[i]);
  if (delay) i++;
  const allowDiscrete = (i < args.length) && AllowDiscrete(args[i]);
  if (allowDiscrete) i++;

  const properties = args.slice(i).map(TransitionProperty);
  for (let j = 0; j < properties.length; j++)
    if (properties[j] == null)
      throw BadArgument("transition", args, i + j);
  if (properties.includes("all"))
    properties.length = 0;

  // Only output standard CSS properties, not custom easing property outputs
  const res = ease?.[1] ?? {};
  const tail = [ease?.[0], duration, delay, allowDiscrete].filter(Boolean).join(" ");
  res.transition = !properties.length ? tail : properties.map(p => `${p} ${tail}`).join(", ");
  return res;
};
function reverseEasing(token) {
  if (!token) return null;
  const varMatch = token.match(/^var\(--transition-(.+)\)$/);
  if (varMatch) return varMatch[1];
  const stepsMatch = token.match(/^steps\((\d+)(?:,\s*([\w-]+))?\)$/);
  if (stepsMatch) {
    const n = stepsMatch[1];
    const keyword = stepsMatch[2];
    if (!keyword || keyword === "end" || keyword === "jump-end") return `steps(${n})`;
    const csss = keyword.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return `steps(${n},${csss})`;
  }
  if (token === "ease") return null; // default, omit
  // native ease names: ease-in → easeIn
  const native = token.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return native;
}

const parseSingleTransition = t => {
  const tokens = t.match(/[^\s(]+(?:\([^)]*\))?/g) ?? [];
  let duration = "0s", delay = "0s", easing = "ease", prop = "all";
  const times = [];
  for (const tok of tokens) {
    if (/^[\d.]+(s|ms)$/.test(tok)) {
      times.push(tok);
    } else if (tok === "allow-discrete") {
      // 
    } else if (/^(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(tok) ||
      tok.startsWith("cubic-bezier(") || tok.startsWith("steps(") || tok.startsWith("var(")) {
      easing = tok;
    } else if (tok !== "all") {
      prop = tok;
    }
  }
  if (times.length) duration = times[0];
  if (times.length > 1) delay = times[1];
  return { prop, duration, delay, easing };
};

export default {
  props: {
    transitionProperty: undefined,
    transitionDuration: undefined,
    transitionTimingFunction: undefined,
    transitionDelay: undefined,
    transitionSkipInk: undefined,
  },
  csss: {
    transition,
  },
  css: {
    transition: style => {
      let props, durations, delays, easings;
      if (style.transitionProperty) {
        props = style.transitionProperty.split(",").map(s => s.trim());
        durations = (style.transitionDuration ?? "0s").split(",").map(s => s.trim());
        delays = (style.transitionDelay ?? "0s").split(",").map(s => s.trim());
        easings = (style.transitionTimingFunction ?? "ease").split(/,(?![^(]*\))/).map(s => s.trim());
      } else if (style.transition) {
        const parsed = style.transition.split(/,(?![^(]*\))/).map(t => parseSingleTransition(t.trim()));
        props = parsed.map(p => p.prop);
        durations = parsed.map(p => p.duration);
        delays = parsed.map(p => p.delay);
        easings = parsed.map(p => p.easing);
      } else return;

      return props.map((p, i) => {
        const prop = p === "all" ? [] : [p.replace(/-([a-z])/g, (_, c) => c.toUpperCase())];
        const args = [
          reverseEasing(easings[i % easings.length]),
          durations[i % durations.length],
          delays[i % delays.length],
          ...prop,
        ].map(v => (v === "0s" || v === "_" || !v) ? null : v).filter(Boolean);
        return `$transition(${args.join(",")})`;
      }).join("");
    }
  }
};
