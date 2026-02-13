/**
 * Palette shorts:
 * - Generate a family of related color CSS custom properties from a single
 *   base color, including Pop, Accent, Bland, and Neutral variants.
 *
 * Helpers from func.js:
 * - FunctionBasedOnValueTypes (TYPB): parses named slots (name, main, on)
 *   into a palette object.
 * - ValueTypes: Name (word interpreter), ColorPrimitive (hex color with vector).
 *
 * Color science from Color.js:
 * - fromHex6, fromLCH: convert between hex and LCH color space to compute
 *   perceptual color variants.
 *
 * Export map:
 * - `Palette`: main short that generates CSS custom properties for a named
 *   color palette with chromatic variants.
 */
import {
  FunctionTypes,
  ValueTypes,
} from "./func.js";
import { fromLCH, fromHex6 } from "./Color.js";

const {
  Name,
  ColorPrimitive,
} = ValueTypes;

const {
  TYPB: FunctionBasedOnValueTypes,
} = FunctionTypes;

// --- Color variant generation ---

/** Generates a family of LCH color variants (Pop, Accent, Bland, Neutral) from a base color. */
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

// --- Main palette short ---

/** Parses $Palette(name, main, on) into CSS custom properties with chromatic variants. */
const Palette = FunctionBasedOnValueTypes({}, {
  name: Name,
  main: ColorPrimitive,
  on: ColorPrimitive,
}, {}, ({ name, main, on }) => ({
  ...makeColors(`--color-${name}`, main),
  ...makeColors(`--color-on${name[0].toUpperCase() + name.slice(1)}`, on)
}));

export default {
  Palette,
};
