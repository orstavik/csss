import { SEQ, Name, ColorPrimitive } from "./func.js";
import { fromLCH, fromHex6 } from "./Color.js";

function makeColors(name, color) {
  const round = (num, places = 3) => Math.round(num * 10 ** places) / (10 ** places);
  let { L, C, H } = fromHex6(color.hex);
  if (C == 0)
    return { [name]: color.text };
  L = round(L);
  H = Math.round(H);
  const pop = fromLCH(L, round((.5 - C) * .5 + C), H);
  const accent = fromLCH(L, round((.5 - C) * .7 + C), H);
  const bland = fromLCH(L, round(C * .5), H);
  const neutral = fromLCH(L, 0, H);
  return {
    [name]: color.text,
    [name + "Pop"]: "#" + pop.hex6,
    [name + "Accent"]: "#" + accent.hex6,
    [name + "Bland"]: "#" + bland.hex6,
    [name + "Neutral"]: "#" + neutral.hex6,
  };
}

const Palette = SEQ([Name, ColorPrimitive, ColorPrimitive], (n, [name, main, on]) => ({
  ...makeColors(`--color-${name}`, main),
  ...makeColors(`--color-on${name[0].toUpperCase() + name.slice(1)}`, on)
}));

export default {
  Palette,

};