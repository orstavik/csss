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
  const res = Object.fromEntries(Object.entries({ primary, secondary, tertiary, neutral })
    .map(([name, value]) => [`--${name}`, value]));
  res["--primary-chroma"] = new Color(primary).C;
  return res;
}
palette.scope = NativeFunctions.color.scope;


const Relieffs = {
  bw: [0, 1],
  text: [.23, .99],
  box: [.23, .92],
  flip: [.99, .66],
  darkflip: [.90, .33],
};

function border(num, color, bgColor) {
  num = Math.round(Math.pow(num / 9, 1.5) * 100);
  return `color-mix(in oklch, ${bgColor}, ${color} ${num}%)`;
}

//$colorText(pop(--primary),b4)
//$color(--primary,text,4,--secondary,blue)
//$color(red,blue,green)
function color(c, bgFunc = "text", bFunc = 4) {
  const [fg, bg] = Relieffs[bgFunc];
  let output = {
    color:
      `oklch(from ${c} ${fg} calc(c - c * ${Math.max(fg - .8, 0) * 5}) h)`,
    "--background-color":
      `oklch(from ${c} ${bg} calc(c - c * ${Math.max(bg - .8, 0) * 5}) h)`
  }
  output.borderColor = border(bFunc, output.color, output["--background-color"]);
  return output;
}

color.scope = {
  ...NativeFunctions.color.scope,
  pop: c => `oklch(from ${c} l calc(c * 2) h)`,
  blend: c => `oklch(from ${c} l var(--primary-chroma) h)`
};

const colorFunctions = {
  palette,
  color,
};

export default colorFunctions;