import { Color } from "./Color.js";
import { borderSwitch, default as NativeFunctions, toLogicalFour } from "./func.js";

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
const Relieffs = ["text", "bw", "box", "flip", "darkflip"];
const lightRelieffs = {
  "--palette-bw-fg": 0,
  "--palette-text-fg": .23,
  "--palette-box-fg": .23,
  "--palette-flip-fg": .99,
  "--palette-darkflip-fg": .90,
  "--palette-bw-bg": 1,
  "--palette-text-bg": .99,
  "--palette-box-bg": .92,
  "--palette-flip-bg": .66,
  "--palette-darkflip-bg": .33,
};
const darkRelieffs = {
  "--palette-bw-fg": 1,
  "--palette-text-fg": .99,
  "--palette-box-fg": .92,
  "--palette-flip-fg": .66,
  "--palette-darkflip-fg": .33,
  "--palette-bw-bg": 0,
  "--palette-text-bg": .23,
  "--palette-box-bg": .23,
  "--palette-flip-bg": .99,
  "--palette-darkflip-bg": .90,
};

function paletteGenerator(relieffs) {
  function palette(primary, secondary, tertiary, neutral) {
    return {
      "--primary": primary,
      "--secondary": secondary ?? `oklch(from ${primary} 50 c calc(h - 60))`,
      "--tertiary": tertiary ?? `oklch(from ${primary} 50 c calc(h + 60))`,
      "--neutral": neutral ?? `oklch(from ${primary} 50 0.02 h)`,
      "--primary-chroma": new Color(primary).C,
      ...relieffs
    };
  }
  palette.scope = NativeFunctions.color.scope;
  return palette;
}
const palette = paletteGenerator(lightRelieffs);
const darkPalette = paletteGenerator(darkRelieffs);

//$color(--primary,text,4,pop(--secondary),blend(blue))
//$color(black,green,darkblue)

//<div class="$color(black,green,red) @dark$color(white,black,red)"></div>

//<body class="$palette(blue,darkorange) @dark$palette-dark(lightblue,orange)"></body>
//  <div class="$color(flip,--primary,--secondary,--neutral)">...</div>
//  <div class="$color(text,--primary,--secondary,--neutral)">...</div>
//
function color(...args) {

  const fg = (name, c) => `oklch(from ${c} var(--palette-${name}-fg) calc(c - (c * max(var(--palette-${name}-fg) - .8, 0) * 5)) h)`;
  const bg = (name, c) => `oklch(from ${c} var(--palette-${name}-bg) calc(c - (c * max(var(--palette-${name}-bg) - .8, 0) * 5)) h)`;

  function border(num, color, bgColor) {
    num = Math.round(Math.pow(num / 9, 1.5) * 100);
    return `color-mix(in oklch, ${bgColor}, ${color} ${num}%)`;
  }

  let borderFunc, bgFunc, colors = [];
  const res = {};
  for (const a of args)
    a instanceof Object ? Object.assign(res, a) :
      Relieffs.includes(a) ? bgFunc = a :
        Number.isInteger(a) ? borderFunc = a :
          colors.push(a);

  res.color = colors[0];

  if (colors[1] == undefined && !bgFunc)
    bgFunc = Relieffs[0];
  res["--background-color"] = colors[1] ?? colors[0];

  if (bgFunc) {
    res.color = fg(bgFunc, res.color);
    res["--background-color"] = bg(bgFunc, res["--background-color"]);
  }
  res.borderColor = colors[2] ?? colors[0];
  if (borderFunc)
    res.borderColor = border(borderFunc, res.borderColor, res["--background-color"]);
  //todo multiply the backgroundColors.
  return res;
}
const ColorScope = {
  ...NativeFunctions.color.scope,
  pop: c => `oklch(from ${c} l calc(c * 2) h)`,
  blend: c => `oklch(from ${c} l var(--primary-chroma) h)`,
};

const funcs = {
  caret: a => ({ "caret-color": a }),
  accent: a => ({ "accent-color": a }),
  emphasis: a => ({ "text-emphasis-color": a }),
  decoration: a => ({ "text-decoration-color": a }),
  column: a => ({ "column-rule-color": a }),
  outline: a => ({ "outline-color": a }),
  border: (...args) => borderSwitch(toLogicalFour("border-color", ...args)),
  shadow: (box, text = box, drop = box) => ({
    "--box-shadow-color": box,
    "--text-shadow-color": text,
    "--drop-shadow-color": drop,
  }),
};
for (const fn of Object.values(funcs))
  fn.scope = ColorScope;

color.scope = { ...ColorScope, ...funcs };




function boxShadow(...args) {
  if (args.every(a => isLength(a) || a === "inset"))
    args.push(`var(--box-shadow-color, oklch(from currentcolor l 0 h))`);
  return NativeCssProperties.boxShadow(...args);
};
function textShadow(...args) {
  if (args.every(a => isLength(a)))
    args.push(`var(--text-shadow-color, oklch(from currentcolor l 0 h))`);
  return NativeCssProperties.boxShadow(...args);
}
function dropShadow(...args) {
  if (args.every(a => isLength(a)))
    args.push(`var(--drop-shadow-color, oklch(from currentcolor l 0 h))`);
  return NativeCssProperties.boxShadow(...args);
}

boxShadow.scope = ColorScope;
textShadow.scope = ColorScope;
dropShadow.scope = ColorScope;


const colorfulShorts = {
  palette,
  darkPalette,
  color,
  boxShadow,
  textShadow,
  dropShadow,
};

export default colorfulShorts;