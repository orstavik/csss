import { Color } from "./Color.js";
import { toLogicalFour, borderSwitch } from "./func.js";

/**

:where(*) { 
  border-color: inherit;
  border-block-color: inherit;
  border-inline-color: inherit;
  border-block-start-color: inherit;
  border-block-end-color: inherit;
  border-inline-start-color: inherit;
  border-inline-end-color: inherit;
  border-top-color: inherit; 
  border-right-color: inherit;
  border-bottom-color: inherit;
  border-left-color: inherit;
  text-decoration-color: inherit;
  caret-color: inherit;
  accent-color: inherit;
  text-emphasis-color: inherit;
  text-decoration-color: inherit;
  column-rule-color: inherit;
  outline-color: inherit;
}

*/

function palette(
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

function color(name) {
  const segs = name.split("-");
  let output = segs.reduce((res, a) => {
    res.unshift(
      a in ColorFuncs ? ColorFuncs[a](...res) :
        CSS.supports("color", a) ? a :
          a.match(/^[a-z0-9_-]+$/) ? `var(--palette-${a})` :
            a); //here there is a SyntaxError
    return res;
  }, []).shift();
  if (typeof output == "string")
    output = ColorFuncs.text(output);
  if (!("border-color" in output))
    output = ColorFuncs.b(output);

  //TODO disperse backgrounds

  return output;
}

const colorShadow = toLogicalFour.bind(null, "--box-shadow-color");
const colorBorder = (...args) => borderSwitch(toLogicalFour("border-color", ...args));


export default {
  palette,
  color,
  "color-border": colorBorder,
  "color-shadow": colorShadow
};