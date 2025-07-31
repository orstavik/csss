import { Color } from "./Color.js";
import Natives from "./func.js";

function palette(role, color, onColor) {
  if (!role || !color || !onColor)
    throw "Missing parameters";

  const c = new Color(color);
  c.L = c.L.toFixed(3);
  c.H = Math.round(c.H);
  const C = c.C;
  const pop = ((.5 - C) * 50 % + C).toFixed(3);
  const accent = ((.5 - C) * 70 % + C).toFixed(3);
  const bland = (C * .5).toFixed(3);
  const onc = new Color(color);
  onc.L = onc.L.toFixed(3);
  onc.H = Math.round(onc.H);
  const onC = onc.C;
  const onPop = ((.5 - onC) * 50 % + onC).toFixed(3);
  const onAccent = ((.5 - onC) * 70 % + onC).toFixed(3);
  const onBland = (onC * .5).toFixed(3);

  return {
    [`--color-${role}`]: color,
    [`--color-${role}-pop`]: `oklch(${c.L}, ${pop}, ${c.H})`,
    [`--color-${role}-accent`]: `oklch(${c.L}, ${accent}, ${c.H})`,
    [`--color-${role}-bland`]: `oklch(${c.L}, ${bland}, ${c.H})`,

    [`--color-${role}1`]: onColor,
    [`--color-${role}-pop1`]: `oklch(${onc.L}, ${onPop}, ${onc.H})`,
    [`--color-${role}-accent1`]: `oklch(${onc.L}, ${onAccent}, ${onc.H})`,
    [`--color-${role}-bland1`]: `oklch(${onc.L}, ${onBland}, ${onc.H})`,
  }
}
palette.scope = {
  ...Natives.color.scope
};

export default {
  palette
};