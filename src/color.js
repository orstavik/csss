export class Color {

  static fromHex(hex6, alpha = 1) {
    this.hex6 = hex6;
    this.alpha = alpha;
    const rgb = Color.hex6ToRgb(hex6);
    const RGB = Color.linearizeRgb(rgb);
    const xyz = Color.linearRgbToXyz(RGB);
    const Lab = Color.xyzToOKLab(xyz);
    const LCH = Color.oklabToOklch(Lab);
    const hex8 = Color.hex6AlphaToHex8(hex6, alpha);
    return { hex6, alpha, hex8, ...rgb, ...RGB, ...xyz, ...Lab, ...LCH };
  }

  static linearizeRgb({ r, g, b }) {
    const linearize = c => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return { R: linearize(r), G: linearize(g), B: linearize(b) };
  }

  static linearRgbToXyz({ R, G, B }) {
    const x = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
    const y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
    const z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B;
    return { x, y, z };
  }

  static xyzToOKLab({ x, y, z }) {
    const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
    const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
    const s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

    const lCube = Math.cbrt(l);
    const mCube = Math.cbrt(m);
    const sCube = Math.cbrt(s);

    const L = 0.2104542553 * lCube + 0.7936177850 * mCube - 0.0040720468 * sCube;
    const a = 1.9779984951 * lCube - 2.4285922050 * mCube + 0.4505937099 * sCube;
    const b = 0.0259040371 * lCube + 0.7827717662 * mCube - 0.8086757660 * sCube;

    return { L, a, b };
  }

  static oklabToOklch({ L, a, b }) {
    const C = Math.sqrt(a * a + b * b);
    let H = Math.atan2(b, a) * (180 / Math.PI);
    if (H < 0) H += 360;
    return { L, C, H };
  }

  static hex6ToRgb(hex) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  static hex6AlphaToHex8(hex6, alpha) {
    return alpha == 1 ? hex6 :
      hex6 + Math.round(alpha * 255).toString(16).padStart(2, "0");
  }

  static fromLCH(L, C, H, alpha = 1) {
    const Lab = Color.oklchToOklab({ L, C, H });
    const xyz = Color.oklabToXyz(Lab);
    const RGB = Color.xyzToLinearRgb(xyz);
    const { r, g, b } = Color.delinearizeRgb(RGB);
    const hex6 = [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("");
    const hex8 = Color.hex6AlphaToHex8(hex6, alpha);
    return { hex6, alpha, hex8, r, g, b, ...RGB, ...xyz, ...Lab, L, C, H };
  }

  static oklchToOklab({ L, C, H }) {
    const hRad = H * (Math.PI / 180);
    const a = Math.cos(hRad) * C;
    const b = Math.sin(hRad) * C;
    return { L, a, b };
  }

  static oklabToXyz({ L, a, b }) {
    const lCube = Math.cbrt((L + 0.3963377774 * a + 0.2158037573 * b) ** 3);
    const mCube = Math.cbrt((L - 0.1055613458 * a - 0.0638541728 * b) ** 3);
    const sCube = Math.cbrt((L - 0.0894841775 * a - 1.2914855480 * b) ** 3);

    const x = +1.2270138511 * lCube - 0.5577999807 * mCube + 0.2812561490 * sCube;
    const y = -0.0405801784 * lCube + 1.1122568696 * mCube - 0.0716766787 * sCube;
    const z = -0.0763812845 * lCube - 0.4214819784 * mCube + 1.5861632204 * sCube;

    return { x, y, z };
  }

  static xyzToLinearRgb({ x, y, z }) {
    const R = +3.2404541621 * x - 1.5371385120 * y - 0.4985314096 * z;
    const G = -0.9692660304 * x + 1.8760108452 * y + 0.0415560175 * z;
    const B = +0.0556434309 * x - 0.2040259134 * y + 1.0572251880 * z;
    return { R, G, B };
  }

  static delinearizeRgb({ R, G, B }) {
    const delinearize = c => c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return {
      r: Math.min(255, Math.max(0, delinearize(R) * 255)),
      g: Math.min(255, Math.max(0, delinearize(G) * 255)),
      b: Math.min(255, Math.max(0, delinearize(B) * 255)),
    };
  }
  static rgbToHex6({ r, g, b }) {
    return [r, g, b].map(c => Math.round(c).toString(16).padStart(2, "0")).join("");
  }
}

import { interpretColor } from "./func.js";

function round(num, places = 2) {
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
    let { L, C, H } = Color.fromHex(color.hex, color.percent);
    L = round(L, 3);
    H = Math.round(H);
    const pop = Color.fromLCH(L, round((.5 - C) * .5 + C, 3), H);
    const accent = Color.fromLCH(L, round((.5 - C) * .7 + C, 3), H);
    const bland = Color.fromLCH(L, round(C * .5, 3), H);
    return {
      [role + i]: color.text,
      [role + "Pop" + i]: "#" + pop.hex8,
      [role + "Accent" + i]: "#" + accent.hex8,
      [role + "Bland" + i]: "#" + bland.hex8,
    };
  });
  return Object.assign({}, ...colors);
}

export default {
  palette
};