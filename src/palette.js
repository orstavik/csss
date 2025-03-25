import { Color } from "./Color.js";
import { default as NativeFunctions } from "./func.js";

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
  let roles = { primary, secondary, tertiary, neutral };
  roles = Object.fromEntries(Object.entries(roles).map(([k, v]) => [`--${k}`, v]));
  const funcs = {
    //relieffs
    "--palette-bw-fg": 0, "--palette-bw-bg": 1,
    "--palette-text-fg": .23, "--palette-text-bg": .99,
    "--palette-box-fg": .23, "--palette-box-bg": .92,
    "--palette-flip-fg": .99, "--palette-flip-bg": .66,
    "--palette-darkflip-fg": .90, "--palette-darkflip-bg": .33,
    //chromas
    "--palette-chroma": new Color(primary).C,
    "--palette-pop": "calc(c * 2)"
  };
  // const funcs = Object.fromEntries(Object.entries(res).map(
  //   ([k, v]) => [`--palette-${k}`, v]));
  return { ...roles, ...funcs };
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
    o.borderColor = `color-mix(in oklch, ${o["--background-color"]}, ${o.color} ${num}%)`;
    return o;
  }
}

const ColorFuncs = {
  pop: c => `oklch(from ${c} l var(--palette-pop) h)`,
  blend: c => `oklch(from ${c} l var(--palette-chroma) h)`,

  bw: relieff("bw"),
  text: relieff("text"),
  box: relieff("box"),
  flip: relieff("flip"),
  darkflip: relieff("darkflip"),

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

//$palette(--primary-pop,text, borderNumber)
//, bg = "text", border = "b"
function color(name) {
  const segs = name.split("-");
  let output = segs.reduce((res, a) => {
    res.unshift(
      a in ColorFuncs ? ColorFuncs[a](...res) :
        CSS.supports("color", a) ? a :
          a.match(/^[a-z0-9_-]+$/) ? `var(--${a})` :
            a); //here there is a SyntaxError
    return res;
  }, []).shift();
  if (typeof output == "string")
    output = ColorFuncs.text(output);
  if (!("borderColor" in output))
    output = ColorFuncs.b(output);

  //TODO disperse backgrounds

  return output;
}

const colorFunctions = {
  palette,
  color,
};
for (const name in colorFunctions)
  colorFunctions[name].scope = NativeFunctions.color.scope;
export default colorFunctions;