function toPalette(_,
  primary,
  secondary = `oklch(from ${primary} 50 c calc(h - 60))`,
  tertiary = `oklch(from ${primary} 50 c calc(h + 60))`,
  error = `oklch(from ${primary} 50 c 30)`,
  warning = `oklch(from ${primary} 50 c 64)`,
  success = `oklch(from ${primary} 50 c 164)`,
  info = `oklch(from ${primary} 50 c 228)`,
  neutral = `oklch(from ${primary} 50 0.02 h)`,
  grey = `oklch(50 0 0)`
) {
  const colors = { primary, secondary, tertiary, error, warning, success, info, neutral, grey };

  const res = Object.fromEntries(Object.entries(colors).map(
    ([k, v]) => [`--color-${k}`, v]));

  const shades = {
    "text-fg": .23, "text-bg": .98,
    "box-fg": .23, "box-bg": .92,
    "flip-fg": .98, "flip-bg": .66,
    "darkflip-fg": .90, "darkflip-bg": .33,
  };
  for (let [k, v] of Object.entries(shades))
    res[`--palette-shade-${k}`] = v;
  const pops = {
    "pop": 2
  };
  for (let [k, v] of Object.entries(pops))
    res[`--palette-chromas-${k}`] = v;
  return res;
}

function relieff(name, color) {
  const main = `oklch(from ${color} var(--palette-shade-${name}-fg) c h)`;
  const bg = `oklch(from ${color} var(--palette-shade-${name}-bg) c h)`;
  const border = `color-mix(in oklch, ${main}, ${bg} 66%)`;
  // const softBorder = `color-mix(in oklch, ${main}, ${bg} 66%)`;
  return {
    color: main,
    "--background-color": bg,
    "border-color": border
  };
}

const ColorFuncs = {
  text: relieff,
  box: relieff,
  flip: relieff,
  darkflip: relieff,
  pop: (name, c) => `oklch(from ${c} l calc(c * var(--palette-chromas-${name})) h)`,
};

function toColor(name) {
  const segs = name.split("-");
  const output = segs.reduce((res, a) => {
    res.unshift(a in ColorFuncs ? ColorFuncs[a](a, ...res) :
      `var(--color-${a})`);
    return res;
  }, []).shift();
  if (typeof output == "string")
    return relieff("text", output);
  return output;
}

import { Word, ListOf, Merge } from "./func.js";

export default {
  palette: Merge(ListOf(null, Word(/(\#[0-9a-f]{3,6})/, toPalette))),
  color: Merge(ListOf(null, Word(/([a-z0-9-]+)/, toColor)))
};
