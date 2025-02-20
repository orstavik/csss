class ColorAnalyzer {
  static hexToLinearRgb(hex) {
    hex = hex.slice(1);
    let bigint;
    if (hex.length === 3) {
      bigint = parseInt(hex.split('').map(char => char + char).join(''), 16);
    } else if (hex.length === 6) {
      bigint = parseInt(hex, 16);
    } else {
      throw new Error('Invalid HEX color.');
    }
    const r = ((bigint >> 16) & 255) / 255;
    const g = ((bigint >> 8) & 255) / 255;
    const b = (bigint & 255) / 255;

    const linearize = c => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return {
      R: linearize(r),
      G: linearize(g),
      B: linearize(b)
    };
  }

  static linearRgbToXyz({ R, G, B }) {
    const X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
    const Y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
    const Z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B;
    return { X, Y, Z };
  }

  static xyzToOKLab({ X, Y, Z }) {
    const l = 0.8189330101 * X + 0.3618667424 * Y - 0.1288597137 * Z;
    const m = 0.0329845436 * X + 0.9293118715 * Y + 0.0361456387 * Z;
    const s = 0.0482003018 * X + 0.2643662691 * Y + 0.6338517070 * Z;

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

  static oklchToOklab({ L, C, H }) {
    const hRad = (H * Math.PI) / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);
    return { L, a, b };
  }

  static oklabToXyz({ L, a, b }) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    const X = (1.2270138511 * l - 0.5577999807 * m + 0.2812561490 * s);
    const Y = (-0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s);
    const Z = (-0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s);
    return { X, Y, Z };
  }

  static xyzToRgb({ X, Y, Z }) {
    let R = 3.2406 * X + (-1.5372) * Y + (-0.4986) * Z;
    let G = -0.9689 * X + 1.8758 * Y + 0.0415 * Z;
    let B = 0.0557 * X + (-0.2040) * Y + 1.0570 * Z;

    const gammaCorrect = (channel) =>
      channel <= 0.0031308
        ? 12.92 * channel
        : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;

    R = Math.round(Math.min(Math.max(0, gammaCorrect(R)), 1) * 255);
    G = Math.round(Math.min(Math.max(0, gammaCorrect(G)), 1) * 255);
    B = Math.round(Math.min(Math.max(0, gammaCorrect(B)), 1) * 255);
    return { R, G, B };
  }

  static rgbToHex({ R, G, B }) {
    const toHex = (value) => value.toString(16).padStart(2, "0");
    return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
  };

  static analyzeHex(hex) {
    const rgb = this.hexToLinearRgb(hex);
    const xyz = this.linearRgbToXyz(rgb);
    const lab = this.xyzToOKLab(xyz);
    const lch = this.oklabToOklch(lab);
    return { hex, ...rgb, ...xyz, ...lab, ...lch };
  }

  static analyzeLch(lch) {
    const lab = this.oklchToOklab(lch);
    const xyz = this.oklabToXyz(lab);
    const rgb = this.xyzToRgb(xyz);
    const hex = this.rgbToHex(rgb);
    return { ...lch, ...lab, ...xyz, ...rgb, hex };
  }

  static analyzeColors(colorMap) {
    const res = { ...colorMap };
    for (let name in colorMap)
      for (let [shade, hex] of Object.entries(colorMap[name]))
        res[name][shade] = this.analyzeHex(hex);
    return res;
  }
}

const contrastMap = {
  flip: [1, 98, 66],
  darkflip: [1, 90, 33],
  box: [1, 23, 92],
  text: [1, 23, 98],
  pop: [2, 98, 66],
  pp: [2, 90, 33]
}

function makeName(name, contrast) {
  let [pop, shadeA, shadeB] = contrastMap[contrast];
  const cName = pop == 1 ? name : name + "-pop" + pop;
  return [`--${cName}-${shadeA}`, `--${cName}-${shadeB}`];
}

function makePalette(hex) {
  const primary = ColorAnalyzer.analyzeHex(hex);
  const { L, C, H } = primary
  const map = {
    primary,
    secondary: { C, H: H + 60 },
    tertiary: { C, H: H - 60 },
    neutral: { C: 0.02, H },
    grey: { C: 0, H: 0 },
    error: { C, H: 30 },
    info: { C, H: 228 },
    warning: { C, H: 64 },
    success: { C, H: 164 }
  }
  const lightMode = {};
  for (const [color, { C, H }] of Object.entries(map)) {
    for (let [type, [pop, shadeA, shadeB]] of Object.entries(contrastMap)) {
      const [a, b] = makeName(color, type);
      lightMode[a] = `oklch(${shadeA / 100} ${C * pop} ${H})`;
      lightMode[b] = `oklch(${shadeB / 100} ${C * pop} ${H})`;
    }
  }
  return lightMode;
}

function toColor(_, name, contrast = "text") {
  const [a, b] = makeName(name, contrast);
  const color = `var(${a})`;
  const bgColor = `var(${b})`;
  return { color, "--background-color": bgColor };
}

import { Word, ListOf, Merge } from "./func.js";

export const palette = Merge(ListOf(null, Word(/(\#[0-9a-f]{3,6})/, makePalette)));
export const color = Merge(ListOf(null, Word(/([a-z]+)(?:-(flip|box|darkflip|pop|pp))?/, toColor)));