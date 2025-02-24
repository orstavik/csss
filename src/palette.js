function toPalette(_,
  primary,
  secondary = `oklch(from ${primary} 50 c calc(h - 60))`,
  tertiary = `oklch(from ${primary} 50 c calc(h + 60))`,
  neutral = `oklch(from ${primary} 50 0.02 h)`
  // ,
  // error = `oklch(from ${primary} 50 c 30)`,
  // warning = `oklch(from ${primary} 50 c 64)`,
  // success = `oklch(from ${primary} 50 c 164)`,
  // info = `oklch(from ${primary} 50 c 228)`,
  // grey = `oklch(50 0 0)`
) {
  const res = {
    //colors
    primary, secondary, tertiary,
    // error, warning, success, info, grey, //  red, green, blue, orange, grey
    neutral,
    //shades
    "bw-fg": 0, "bw-bg": 1,
    "text-fg": .23, "text-bg": .99,
    "box-fg": .23, "box-bg": .92,
    "flip-fg": .99, "flip-bg": .66,
    "darkflip-fg": .90, "darkflip-bg": .33,
    //chromas
    pop: 2
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
  pop: c => `oklch(from ${c} l calc(c * var(--palette-pop)) h)`,
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

const WWW = /azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen/;

function toColor(name) {
  const segs = name.split("-");
  let output = segs.reduce((res, a) => {
    res.unshift(
      ColorFuncs[a]?.(...res) ?? 
      a.match(WWW)?.[0] ?? 
      `var(--palette-${a})`);
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