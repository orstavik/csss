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
  const res = {
    primary, secondary, tertiary,
    error, warning, success, info,
    neutral, grey,

    "text-fg": .23, "text-bg": .98,
    "box-fg": .23, "box-bg": .92,
    "flip-fg": .98, "flip-bg": .66,
    "darkflip-fg": .90, "darkflip-bg": .33,

    pop: 2
  };
  return Object.fromEntries(Object.entries(res).map(
    ([k, v]) => [`--palette-${k}`, v]));
}

function relieff(name, color) {
  const main = `oklch(from ${color} var(--palette-${name}-fg) c h)`;
  const bg = `oklch(from ${color} var(--palette-${name}-bg) c h)`;
  return {
    color: main,
    "--background-color": bg,
  };
}

function border(num) {
  num = Math.round(Math.pow(num / 9, 1.5) * 100);
  return function border(_, o) {
    o["border-color"] = `color-mix(in oklch, ${o["--background-color"]}, ${o.color} ${num}%)`;
    return o;
  }
}

const ColorFuncs = {
  text: relieff,
  box: relieff,
  flip: relieff,
  darkflip: relieff,
  pop: (name, c) => `oklch(from ${c} l calc(c * var(--palette-${name})) h)`,
  b: border(4),
  b0: border(0),
  b1: border(1),
  b2: border(2),
  b3: border(3),
  b4: border(4),
  b5: border(5),
  b6: border(6),
  b7: border(7),
  b8: border(8),
  b9: border(9),
};

function toColor(name) {
  const segs = name.split("-");
  let output = segs.reduce((res, a) =>
    (res.unshift(ColorFuncs[a]?.(a, ...res) ?? `var(--palette-${a})`), res),
    []).shift();
  if (typeof output == "string")
    output = ColorFuncs.text("text", output);
  if (!("border-color" in output))
    output = ColorFuncs.b("b", output);
  return output;
}

import { Word, ListOf, Merge } from "./func.js";

export default {
  palette: Merge(ListOf(null, Word(/(\#[0-9a-f]{3,6})/, toPalette))),
  color: Merge(ListOf(null, Word(/([a-z0-9-]+)/, toColor)))
};
