import { interpretColor } from "./func.js";
import { fromLCH, fromHex6 } from "./Color.js";

function round(num, places = 3) {
  const m = 10 ** places;
  return Math.round(num * m) / m;
}

function makeColors(name, color) {
  if (!color) throw `"${color.text}" is not a color.`;
  if (!color.hex) throw `"${color.text}" is not a primitive color.`;
  if (color.percent != 100) throw `"${color.text}" is not a primitive, fully opaque color.`;
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

function palette([name, main, on]) {
  if (!name || !main || !on)
    throw "$palette(name,bgColor,fgColor) requires three parameters";
  if (name.kind !== "WORD")
    throw "First parameter must be a simple word";
  const mainName = `--color-${name.text}`;
  const onName = `--color-on${name.text[0].toUpperCase() + name.text.slice(1)}`;
  return {
    ...makeColors(mainName, interpretColor(main)),
    ...makeColors(onName, interpretColor(on))
  };
}

export default {
  palette
};