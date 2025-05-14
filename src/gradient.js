// import { Color } from "./Color.js";

function gradient(name, color, onColor, steps = 10) {
  if (!role || !color || !onColor)
    throw "Missing parameters";

  const steps = new Array(10).fill(0).map((_, i) => (i + 1) * steps);
  const alpha = new Array(10).fill(0).map((_, i) => (i + 1) * steps);

  let res = { [`--${name}`]: color };
  const res2 = Object.fromEntries(steps.map(i =>
    [`--${name}${i}`, `color-mix(in oklch, ${color} ${100 - i}%, ${onColor} ${i}%)`]));
  res = Object.assign(res, res2);

  return Object.fromEntries(Object.entries(res).map(([name, color]) =>
    alpha.map(a => [`${name}_a${a}`, `oklch(from var(--${color}) l c h / ${a}%)`])
  ).flat());
}

function popGradient(name, color, onColor) {
  const chromas = {
    "b3": `calc(c * .25)`,
    "b2": `calc(c * .5)`,
    "b1": `calc(c * .75)`,
    "b": `calc(c * .9)`,
    "p": `calc(c * 1.1)`,
    "p1": `calc(c * 1.25)`,
    "p2": `calc(c * 1.5)`,
    "p3": `calc(c * 2)`,
  };
  let res = gradient(name, color, onColor);
  return Object.fromEntries(Object.entries(res).map(([name, c]) =>
    chromas.entries().map(([p, pV]) =>
      [`${name}_${p}`, `oklch(from var(--${c}) l ${pV} h)`])
  ).flat());
}


(function () {
  debugger
  gradient("red", 100, 15);
})();

export default {
  gradient,
};
