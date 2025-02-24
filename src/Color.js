export class Color {

  constructor(colorStr) {
    const [R, G, B, A] = Color.cssomColor(colorStr);
    this.alpha = A;
    this.hex = Color.rgbToHex(R, G, B);
    const rgb = Color.linearizeRgb(R, G, B);
    const xyz = Color.linearRgbToXyz(rgb);
    const lab = Color.xyzToOKLab(xyz);
    const lch = Color.oklabToOklch(lab);
    Object.assign(this, rgb, xyz, lab, lch);
  }

  static #canvas = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  static cssomColor(colorStr) {
    this.#canvas.fillStyle = colorStr;
    this.#canvas.fillRect(0, 0, 1, 1);
    return this.#canvas.getImageData(0, 0, 1, 1).data;
  }

  static linearizeRgb(R, G, B) {
    const linearize = c => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return { R: linearize(R), G: linearize(G), B: linearize(B) };
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

  static rgbToHex(R, G, B) {
    const toHex = (value) => value.toString(16).padStart(2, "0").toLowerCase();
    return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
  };
}  