import { CsssPrimitives, CsssFunctions } from "./func2.js";

const { TypeBasedFunction, FunctionWithDefaultValues, FunctionPropertyType, SingleTable, SF2 } = CsssFunctions;
const { LengthPercent, Url, Color, Angle } = CsssPrimitives;

const LengthPercentAuto = e => e.text === "auto" ? "auto" : LengthPercent(e);

const DEFAULTS = {
  background: "none",
  backgroundImage: "unset",
  backgroundPosition: "0% 0%",
  backgroundRepeat: "repeat",
  backgroundSize: "auto",
  backgroundOrigin: "padding-box",
  backgroundClip: "border-box",
  backgroundBlendMode: "normal",
  backgroundAttachment: "scroll",
};

const ColorSpaceTable = {
  hslLonger: "in hsl longer hue",
  hslShorter: "in hsl shorter hue",
  hslIncreasing: "in hsl increasing hue",
  hslDecreasing: "in hsl decreasing hue",
  hwbLonger: "in hwb longer hue",
  hwbShorter: "in hwb shorter hue",
  hwbIncreasing: "in hwb increasing hue",
  hwbDecreasing: "in hwb decreasing hue",
  lchLonger: "in lch longer hue",
  lchShorter: "in lch shorter hue",
  lchIncreasing: "in lch increasing hue",
  lchDecreasing: "in lch decreasing hue",
  oklchLonger: "in oklch longer hue",
  oklchShorter: "in oklch shorter hue",
  oklchIncreasing: "in oklch increasing hue",
  oklchDecreasing: "in oklch decreasing hue",
  oklab: "in oklab",
  lab: "in lab",
  lch: "in lch",
  srgb: "in srgb",
  srgbLinear: "in srgb-linear",
  displayP3: "in display-p3",
  a98Rgb: "in a98-rgb",
  prophotoRgb: "in prophoto-rgb",
  rec2020: "in rec2020",
  xyz: "in xyz",
  xyzD50: "in xyz-d50",
  xyzD65: "in xyz-d65",
};

const ColorSpace = a => a.kind === "WORD" && ColorSpaceTable[a.text];

const LinearDirectionsTable = {
  left: "to left",
  right: "to right",
  up: "to top",
  down: "to bottom",
  upLeft: "to top left",
  upRight: "to top right",
  downLeft: "to bottom left",
  downRight: "to bottom right",
};

const AngleOrLinearDirection = a => Angle(a) ?? (a.kind === "WORD" && LinearDirectionsTable[a.text]);
const AnglePercent = a => Angle(a) ?? (a.type === "percent" ? a.text : undefined);

const ColorStopAnglePercentTuple = SF2("(/1-3", [Color, AnglePercent], (_, res) => res.join(" "));
const ColorStopAnglePercent = e => {
  const color = Color(e);
  if (color) return color;
  if (e.name === "") return ColorStopAnglePercentTuple(e);
};

const ColorStopLengthPercentTuple = SF2("(/1-3", [Color, LengthPercent], (_, res) => res.join(" "));
const ColorStopLengthPercent = e => {
  const color = Color(e);
  if (color) return color;
  if (e.name === "") return ColorStopLengthPercentTuple(e);
};

const AtPositionTable = {
  top: "top", bottom: "bottom", left: "left", right: "right", center: "center",
  xStart: "x-start", xEnd: "x-end", yStart: "y-start", yEnd: "y-end",
  blockStart: "block-start", blockEnd: "block-end", inlineStart: "inline-start", inlineEnd: "inline-end",
};

const AtPosition = a => a.kind === "WORD" && AtPositionTable[a.text];
const LengthPercentAtPosition = e => LengthPercent(e) ?? AtPosition(e);

const FarthestClosestTable = {
  farthestCorner: "farthest-corner", farthestSide: "farthest-side",
  closestCorner: "closest-corner", closestSide: "closest-side",
};

const FarthestClosest = a => a.kind === "WORD" && FarthestClosestTable[a.text];
const LengthPercentOrFarthestClosest = e => LengthPercent(e) ?? FarthestClosest(e);

const BgPositions = AtPosition;
const At = SF2("at/1-2", [LengthPercentAtPosition], (n, res) => "at " + res.join(" "));

const conic = (exp) => {
  const { args } = exp;
  let AngleRes, AtRes, ColorSpaceRes;
  const colorStops = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    let v;
    if ((v = ColorSpace(a))) ColorSpaceRes = v;
    else if ((v = At(a))) AtRes = v;
    else if ((v = Angle(a))) AngleRes = v;
    else if ((v = ColorStopAnglePercent(a))) colorStops.push(v);
    else throw new SyntaxError(\`conic(): unknown argument: \${a.text || a.name}\`);
  }
  if (!colorStops.length) throw new SyntaxError(`conic() must have at least one color stop`);
  AngleRes &&= "from " + AngleRes;
  const first = [AngleRes, AtRes, ColorSpaceRes].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ");
};

const linear = (exp) => {
  const { args } = exp;
  let AngleOrLinearDirectionRes, ColorSpaceRes;
  const colorStops = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    let v;
    if ((v = ColorSpace(a))) ColorSpaceRes = v;
    else if ((v = AngleOrLinearDirection(a))) AngleOrLinearDirectionRes = v;
    else if ((v = ColorStopLengthPercent(a))) colorStops.push(v);
    else throw new SyntaxError(`linear(): unknown argument: ${a.text || a.name}`);
  }
  if (!colorStops.length) throw new SyntaxError(`linear() must have at least one color stop`);
  const first = [AngleOrLinearDirectionRes, ColorSpaceRes].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ");
};

const radial = (exp) => {
  const { args } = exp;
  let FarthestClosestRes, AtRes, ColorSpaceRes;
  const colorStops = [];
  const sizeArgs = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    let v;
    if ((v = ColorSpace(a))) ColorSpaceRes = v;
    else if ((v = At(a))) AtRes = v;
    else if ((v = FarthestClosest(a))) FarthestClosestRes = v;
    else if ((v = ColorStopLengthPercent(a))) colorStops.push(v);
    else if ((v = LengthPercent(a))) sizeArgs.push(v);
    else throw new SyntaxError(`radial(): unknown argument: ${a.text || a.name}`);
  }
  if (!colorStops.length) throw new SyntaxError(`radial() must have at least one color stop`);
  if (sizeArgs.length > 2) throw new SyntaxError(`radial() size cannot be more than two values: ${sizeArgs}`);
  let size = sizeArgs.length ? sizeArgs.join(" ") : undefined;
  if (size && FarthestClosestRes) throw new SyntaxError(`radial() size specified twice: ${size} AND ${FarthestClosestRes}`);
  const first = [size, FarthestClosestRes, AtRes, ColorSpaceRes].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ");
};

const circle = (exp) => {
  const { args } = exp;
  let size, AtRes, ColorSpaceRes;
  const colorStops = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    let v;
    if ((v = ColorSpace(a))) ColorSpaceRes = v;
    else if ((v = At(a))) AtRes = v;
    else if ((v = LengthPercentOrFarthestClosest(a))) size = v;
    else if ((v = ColorStopLengthPercent(a))) colorStops.push(v);
    else throw new SyntaxError(`circle(): unknown argument: ${a.text || a.name}`);
  }
  if (!colorStops.length) throw new SyntaxError(`circle() must have at least one color stop`);
  return ["circle", size, AtRes, ColorSpaceRes].filter(Boolean).join(" ") + ", " + colorStops.join(", ");
};

const backgroundRepeatTable = {
  repeat: "repeat", repeatX: "repeat-x", repeatY: "repeat-y",
  space: "space", round: "round", noRepeat: "no-repeat",
};
const backgroundSizeTable = { cover: "cover", contain: "contain" };
const backgroundOriginTable = { originBorderBox: "border-box", originPaddingBox: "padding-box", originContentBox: "content-box" };
const backgroundClipTable = {
  borderBox: "border-box", paddingBox: "padding-box", contentBox: "content-box",
  text: "text", borderArea: "border-area",
};
const backgroundAttachmentTable = { fixed: "fixed", scroll: "scroll", local: "local" };
const backgroundBlendModeTable = {
  multiply: "multiply", screen: "screen", overlay: "overlay", darken: "darken", lighten: "lighten",
  colorDodge: "color-dodge", colorBurn: "color-burn", hardLight: "hard-light", softLight: "soft-light",
  difference: "difference", exclusion: "exclusion", hue: "hue", saturation: "saturation",
  color: "color", luminosity: "luminosity",
};

const bgInner = TypeBasedFunction(
  SingleTable("backgroundRepeat", backgroundRepeatTable),
  SingleTable("backgroundSize", backgroundSizeTable),
  SingleTable("backgroundOrigin", backgroundOriginTable),
  SingleTable("backgroundClip", backgroundClipTable),
  SingleTable("backgroundAttachment", backgroundAttachmentTable),
  SingleTable("backgroundBlendMode", backgroundBlendModeTable),

  (a) => {
    if (a.name === "size") {
      const ar = a.args.map(x => LengthPercentAuto(x));
      if (ar.some(x => !x)) return undefined;
      return { backgroundSize: ar.join(" ") };
    }
  },

  (a) => {
    let name = a.name;
    if (name === "linear") return { backgroundImage: `linear-gradient(${linear(a)})` };
    if (name === "ellipse") return { backgroundImage: `radial-gradient(${radial(a)})` };
    if (name === "radial") return { backgroundImage: `radial-gradient(${radial(a)})` };
    if (name === "circle") return { backgroundImage: `radial-gradient(${circle(a)})` };
    if (name === "conic") return { backgroundImage: `conic-gradient(${conic(a)})` };
    if (name === "repeatingLinear") return { backgroundImage: `repeating-linear-gradient(${linear(a)})` };
    if (name === "repeatingEllipse") return { backgroundImage: `repeating-radial-gradient(${radial(a)})` };
    if (name === "repeatingRadial") return { backgroundImage: `repeating-radial-gradient(${radial(a)})` };
    if (name === "repeatingCircle") return { backgroundImage: `repeating-radial-gradient(${circle(a)})` };
    if (name === "repeatingConic") return { backgroundImage: `repeating-conic-gradient(${conic(a)})` };
  },

  a => {
    const c = Color(a);
    if (c) return { Color: [c] };
    const u = Url(a);
    if (u) return { Url: [u] };
    const pos = BgPositions(a);
    if (pos) return { positions: [pos] };
    const pv = LengthPercent(a);
    if (pv) return { positionValues: [pv] };
  }
);

const bg = (exp) => {
  const res = {};
  const inners = [];
  const { args } = exp;
  for (let i = 0; i < args.length; i++) {
    inners.push(bgInner({ args: [args[i]], name: "bgInner" }));
  }

  const Colors = [];
  const Urls = [];
  const positions = [];
  const positionValues = [];

  for (let obj of inners) {
    if (obj.Color) Colors.push(obj.Color[0]);
    if (obj.Url) Urls.push(obj.Url[0]);
    if (obj.positions) positions.push(obj.positions[0]);
    if (obj.positionValues) positionValues.push(obj.positionValues[0]);

    for (let k in obj) {
      if (k !== "Color" && k !== "Url" && k !== "positions" && k !== "positionValues") {
        res[k] = obj[k];
      }
    }
  }

  if (positionValues.length > 2) throw new SyntaxError(`background-position has max 2 values: ${positionValues}`);
  if (positions.length > 2) throw new SyntaxError(`background-position has max 2 directions: ${positions}`);

  if (positions.length || positionValues.length) {
    const [a, c] = positions;
    const [b, d] = positionValues;
    res.backgroundPosition = [a, b, c, d].filter(Boolean).join(" ");
  }

  if (Colors.length) {
    if (Colors.length === 1 && !res.backgroundImage) {
      res.backgroundColor = Colors[0];
    } else {
      res.backgroundImage = `linear-gradient(${Colors.join(", ")})`;
    }
  }

  if (Urls.length) {
    res.backgroundImage = Urls[0];
  }

  return res;
};

export default {
  csss: {
    bg: FunctionWithDefaultValues(DEFAULTS, bg),
    bgColor: FunctionPropertyType("bgColor", "backgroundColor", Color),
  },
  props: {
    background: undefined,
    backgroundImage: undefined,
    backgroundPosition: undefined,
    backgroundRepeat: undefined,
    backgroundSize: undefined,
    backgroundOrigin: undefined,
    backgroundClip: undefined,
    backgroundBlendMode: undefined,
    backgroundAttachment: undefined,
    backgroundColor: undefined,
  },
  css: {}
};