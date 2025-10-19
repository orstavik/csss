import { interpretColor } from "./func.js";
import { fromLCH, fromHex6 } from "./Color.js";

function round(num, places = 3) {
  const m = 10 ** places;
  return Math.round(num * m) / m;
}

function palette([role, ...colors]) {
  if (!role || colors.length < 2)
    throw "palette() requires role and at least two colors as parameters";
  if (role.kind !== "WORD")
    throw "First parameter must be a simple word";
  role = `--color-${role.text}`;

  colors = colors.map((color, i) => {
    color = interpretColor(color);
    if (!color) throw `Parameter ${i + 2} is not a valid color`;
    if (!color.hex) throw `Parameter ${i + 2} is not a primitive color`;
    i ||= "";
    let { L, C, H } = fromHex6(color.hex, color.percent);
    if (C == 0)
      throw new SyntaxError(`Cannot create palette from achromatic color: ${color.text}`);
    L = round(L);
    H = Math.round(H);
    const pop = fromLCH(L, round((.5 - C) * .5 + C), H);
    const accent = fromLCH(L, round((.5 - C) * .7 + C), H);
    const bland = fromLCH(L, round(C * .5), H);
    const neutral = fromLCH(L, 0, H);
    return {            //how to do the i here? 
      [role + i]: color.text,
      [role + "Pop" + i]: "#" + pop.hex6,
      [role + "Accent" + i]: "#" + accent.hex6,
      [role + "Bland" + i]: "#" + bland.hex6,
      [role + "Neutral" + i]: "#" + neutral.hex6,
    };
  });
  return Object.assign({}, ...colors);
}

export default {
  palette
};