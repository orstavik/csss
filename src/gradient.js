// import { Color } from "./Color.js";
import Natives from "./func.js";

function gradient(role, color, onColor, steps = 10) {
  if (!role || !color || !onColor)
    throw "Missing parameters";

  const alpha = new Array(10).fill(0).map((_, i) => (i + 1) * steps);
  steps = new Array(10).fill(0).map((_, i) => (i + 1) * steps);

  let res = { [`--color_${role}`]: color };
  const res2 = Object.fromEntries(steps.map(i =>
    [`--color_${role}${i}`, `color-mix(in oklch, ${color} ${100 - i}%, ${onColor} ${i}%)`]));
  res = Object.assign(res, res2);

  const alphaColors = Object.fromEntries(Object.entries(res).map(([name, color]) =>
    alpha.map(a => [`${name}_a${a}`, `oklch(from ${color} l c h / ${a}%)`])
  ).flat());
  return { ...res, ...alphaColors };
}
gradient.scope = {
  ...Natives.color.scope
};

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
    Object.entries(chromas).map(([p, pV]) =>
      [`${name}_${p}`, `oklch(from ${c} l ${pV} h)`])
  ).flat());
}
popGradient.scope = { ...gradient.scope };

export default {
  gradient,
  popGradient,
};
