import { Color } from "./Color.js";

function toPalette(_,
  primary,
  secondary = `oklch(from ${primary} 50 c calc(h - 60))`,
  tertiary = `oklch(from ${primary} 50 c calc(h + 60))`,
  neutral = `oklch(from ${primary} 50 0.02 h)`
) {
  const res = {
    //color roles
    primary, secondary, tertiary, neutral,
    //relieffs
    "bw-fg": 0, "bw-bg": 1,
    "text-fg": .23, "text-bg": .99,
    "box-fg": .23, "box-bg": .92,
    "flip-fg": .99, "flip-bg": .66,
    "darkflip-fg": .90, "darkflip-bg": .33,
    //chromas
    chroma: new Color(primary).C,
    pop: "calc(c * 2)"
  };
  return Object.fromEntries(Object.entries(res).map(
    ([k, v]) => [`--palette-${k}`, v]));
}

const relieff = name => c => ({
  color:
    `oklch(from ${c} var(--palette-${name}-fg) calc(c - (c * max(var(--palette-${name}-fg) - .8, 0) * 5)) h)`,
  "--background-color":
    `oklch(from ${c} var(--palette-${name}-bg) calc(c - (c * max(var(--palette-${name}-bg) - .8, 0) * 5)) h)`
});

const border = num => {
  num = Math.round(Math.pow(num / 9, 1.5) * 100);
  return function border(o) {
    o["border-color"] = `color-mix(in oklch, ${o["--background-color"]}, ${o.color} ${num}%)`;
    return o;
  }
}

const ColorFuncs = {
  bw: relieff("bw"),
  text: relieff("text"),
  box: relieff("box"),
  flip: relieff("flip"),
  darkflip: relieff("darkflip"),
  pop: c => `oklch(from ${c} l var(--palette-pop) h)`,
  blend: c => `oklch(from ${c} l var(--palette-chroma) h)`,
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

function validColor(str) {
  str = str.replaceAll(";", " ");
  return CSS.supports("color", str) ? str : undefined;
};

function toColor(name) {
  const segs = name.split("-");
  let output = segs.reduce((res, a) => {
    res.unshift(ColorFuncs[a]?.(...res) ?? validColor(a) ?? `var(--palette-${a})`);
    return res;
  },
    []).shift();
  if (typeof output == "string")
    output = ColorFuncs.text(output);
  if (!("border-color" in output))
    output = ColorFuncs.b(output);
  //todo disperse backgrounds
  return output;
}

import { Word, ListOf, Merge } from "./func.js";

export default {
  palette: Merge(ListOf(null, Word(/(\#[0-9a-f]{3,6})/, toPalette))),
  color: Merge(ListOf(null, Word(/([a-z0-9-]+)/, toColor)))
};