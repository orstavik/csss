import {
  Color,
  LengthPercent,
  Url,
  //todo isImage
  // interpretImage,
  TYPB,
  SIN,
  SINmax,
  WORD_IN_TABLE,
  CHECKNAME,
  CamelWords,
  Angle,
  AnglePercent,
  SEQOPT,
} from "./func.js";

const BackgroundDefaults = {
  background: "none",
  backgroundImage: undefined,
  backgroundPosition: "0% 0%",
  backgroundRepeat: "repeat",
  backgroundSize: "auto",
  backgroundOrigin: "padding-box",
  backgroundClip: "border-box",
  backgroundBlendMode: "normal",
  backgroundAttachment: "scroll",
};

const ColorSpace = WORD_IN_TABLE({
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
});

const LinearDirections = WORD_IN_TABLE({
  left: "to left",
  right: "to right",
  up: "to top",
  down: "to bottom",
  upLeft: "to top left",
  upRight: "to top right",
  downLeft: "to bottom left",
  downRight: "to bottom right",
});
const ColorStopAnglePercent = CHECKNAME("(", SEQOPT([Color, AnglePercent, AnglePercent], (_, res) => res.join(" ")));
const ColorStopLengthPercent = CHECKNAME("(", SEQOPT([Color, LengthPercent, LengthPercent], (_, res) => res.join(" ")));
const AtPosition = CamelWords("top|bottom|left|right|center|xStart|xEnd|yStart|yEnd|blockStart|blockEnd|inlineStart|inlineEnd");
const FarthestClosest = CamelWords("farthestCorner|farthestSide|closestCorner|closestSide");

const POSITION_WORDS = {};
const POSITIONS_FUNCS = {
  position: SINmax(2, LengthPercent, (name, ar) => ({ backgroundPosition: ar.join(" ") })),
};

const AT_POSITION_WORDS = {};
const AT_POSITION_FUNCS = {
  at: SINmax(2, LengthPercent, (name, ar) => "at " + ar.join(" ")),
};

for (let Inline of ["Left", "Right", "Center", ""]) {
  const inline = Inline.toLowerCase();
  for (let Block of ["Top", "Bottom", "Center", ""]) {
    const block = Block.toLowerCase();
    if (block === inline) continue;
    //todo center center is not accepted? what does a single Center mean?
    //todo with nothing, then we have position: ... and `at ...`
    const name = inline + Block;
    if (name in POSITION_WORDS) continue;
    const atName = "at" + Inline + Block;
    const dims = [inline, block].filter(Boolean);
    POSITION_WORDS[name] = dims.join(" ");
    AT_POSITION_WORDS[atName] = "at " + POSITION_WORDS[name];

    POSITIONS_FUNCS[name] = SINmax(dims.length, LengthPercent,
      (name, ar) => ({ backgroundPosition: [inline, ar[0], block, ar[1]].filter(Boolean).join(" ") }));
    AT_POSITION_FUNCS[atName] = SINmax(dims.length, LengthPercent,
      (name, ar) => "at " + [inline, ar[0], block, ar[1]].filter(Boolean).join(" "));
  }
}

const conic2 = TYPB({}, {
  at: CHECKNAME("at", SINmax(2, e => LengthPercent(e) ?? AtPosition(e), (n, res) => "at " + res.join(" "))),
  angle: Angle,
  ColorSpace,
}, {
  colorStops: e => Color(e) ?? AnglePercent(e) ?? ColorStopAnglePercent(e),
}, ({ angle, at, ColorSpace, colorStops = [] }) => {
  angle &&= "from " + angle;
  const first = [angle, at, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
})

const linear = TYPB({}, {
  angle: e => Angle(e) ?? LinearDirections(e),
  ColorSpace,
}, {
  colorStops: e => Color(e) ?? ColorStopLengthPercent(e),
}, ({ angle, ColorSpace, colorStops = [] }) => {
  const first = [angle, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});


const radial = TYPB({}, {
  at: CHECKNAME("at", SINmax(2, e => LengthPercent(e) ?? AtPosition(e), (n, res) => "at " + res.join(" "))),
  ColorSpace,
  FarthestClosest,
}, {
  colorStops: e => Color(e) ?? ColorStopLengthPercent(e),
  size: LengthPercent,
}, ({ size, FarthestClosest, at, ColorSpace, colorStops = [] }) => {
  if (size?.length > 2)
    throw new SyntaxError(`radial() size cannot be more than two values: ${size}`);
  size &&= size.join(" ");
  if (size && FarthestClosest)
    throw new SyntaxError(`radial() size specified twice: ${size} AND ${FarthestClosest}`);
  const first = [size, FarthestClosest, at, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});

const circle = TYPB({}, {
  at: CHECKNAME("at", SINmax(2, e => LengthPercent(e) ?? AtPosition(e), (n, res) => "at " + res.join(" "))),
  ColorSpace,
  size: e => LengthPercent(e) ?? FarthestClosest(e),
}, {
  colorStops: e => Color(e) ?? ColorStopLengthPercent(e),
}, ({ size, at, ColorSpace, colorStops = [] }) =>
  [size, at, ColorSpace].filter(Boolean).join(" ") + ", " + colorStops.join(", "));


const GRADIENTS = {
  linear: e => ({ backgroundImage: `linear-gradient(${linear(e)})` }),
  ellipse: e => ({ backgroundImage: `radial-gradient(${radial(e)})` }),
  radial: e => ({ backgroundImage: `radial-gradient(${radial(e)})` }),
  repeatingLinear: e => ({ backgroundImage: `repeating-linear-gradient(${linear(e)})` }),
  repeatingEllipse: e => ({ backgroundImage: `repeating-radial-gradient(${radial(e)})` }),
  repeatingRadial: e => ({ backgroundImage: `repeating-radial-gradient(${radial(e)})` }),
  circle: e => ({ backgroundImage: `radial-gradient(circle ${circle(e)})` }),
  repeatingCircle: e => ({ backgroundImage: `repeating-radial-gradient(circle ${circle(e)})` }),

  conic: e => ({ backgroundImage: `conic-gradient(${conic2(e)})` }),
  repeatingConic: e => ({ backgroundImage: `repeating-conic-gradient(${conic2(e)})` }),
};


const BACKGROUND_WORDS = {
  ...POSITION_WORDS,
  repeat: { backgroundRepeat: "repeat" },
  repeatX: { backgroundRepeat: "repeat-x" },
  repeatY: { backgroundRepeat: "repeat-y" },
  space: { backgroundRepeat: "space" },
  round: { backgroundRepeat: "round" },
  noRepeat: { backgroundRepeat: "no-repeat" },

  cover: { backgroundSize: "cover" },
  contain: { backgroundSize: "contain" },

  contentBox: { backgroundOrigin: "content-box" },
  borderBox: { backgroundOrigin: "border-box" },

  clipPaddingBox: { backgroundClip: "padding-box" },
  clipContentBox: { backgroundClip: "content-box" },
  clipText: { backgroundClip: "text" },
  clipBorderArea: { backgroundClip: "border-area" },

  multiply: { backgroundBlendMode: "multiply" },
  screen: { backgroundBlendMode: "screen" },
  overlay: { backgroundBlendMode: "overlay" },
  darken: { backgroundBlendMode: "darken" },
  lighten: { backgroundBlendMode: "lighten" },
  colorDodge: { backgroundBlendMode: "color-dodge" },
  colorBurn: { backgroundBlendMode: "color-burn" },
  hardLight: { backgroundBlendMode: "hard-light" },
  softLight: { backgroundBlendMode: "soft-light" },
  difference: { backgroundBlendMode: "difference" },
  exclusion: { backgroundBlendMode: "exclusion" },
  hue: { backgroundBlendMode: "hue" },
  saturation: { backgroundBlendMode: "saturation" },
  color: { backgroundBlendMode: "color" },
  luminosity: { backgroundBlendMode: "luminosity" },

  fixed: { backgroundAttachment: "fixed" },
  scroll: { backgroundAttachment: "scroll" },
  local: { backgroundAttachment: "local" },
  scrollLocal: { backgroundAttachment: "scroll local" },
  localScroll: { backgroundAttachment: "local scroll" },
  fixedLocal: { backgroundAttachment: "fixed local" },
  scrollFixed: { backgroundAttachment: "scroll fixed" },
  fixedScroll: { backgroundAttachment: "fixed scroll" },
  localFixed: { backgroundAttachment: "local fixed" },
};

const BACKGROUND_FUNCS = {
  size: SINmax(2, LengthPercent, (name, ar) => ({ backgroundSize: ar.join(" ") })),
  ...POSITIONS_FUNCS,
  ...GRADIENTS,
};

const bg = TYPB({ ...BACKGROUND_WORDS, ...BACKGROUND_FUNCS }, {}, { Color, Url },

  res => {
    //todo check that we only get one color
    res.Color &&= { backgroundImage: `linear-gradient(${res.Color.join(", ")})` }
    //todo check that we only get one url //todo this should be isImage
    res.Url &&= { backgroundImage: res.Url[0] }
    //todo check that we only define backgroundImage once, and all the other properties just once
    return Object.assign({}, BackgroundDefaults, ...Object.values(res));
  }
);

// function bgColorOrImage(args) {
//   const img = interpretImage(args[0]);  //isColor => linear-gradient on top level
//isUrl => becomes a url() on top level
//   if (img)
//     return args.shift(), img.text;
//   const color = isColor(args[0]);
//   if (color)
//     return args.shift(), `linear-gradient(${color.text})`;
//   throw new SyntaxError(`$bg must include either a color or url: ${color.text}.`);
// }
// const bg = ({ name, args }) => initiateBackground(args);
// function bg({ args: argsIn }) {
//   const { res, args } = initiateBackground(argsIn);
//   if (!args.length)
//     throw new SyntaxError(`Missing background main argument: color, image, or gradient.`);
//   res.backgroundImage = cb(args);
//   if (args.length)
//     throw new SyntaxError(`Could not interpret $bg() argument: ${args[0].text}.`);
//   return res;
// }

export default {
  background: undefined,
  backgroundColor: undefined,
  backgroundImage: undefined,
  backgroundPosition: undefined,
  backgroundRepeat: undefined,
  backgroundSize: undefined,
  backgroundOrigin: undefined,
  backgroundClip: undefined,
  backgroundBlendMode: undefined,
  backgroundAttachment: undefined,
  bgColor: SIN(Color, (n, v) => ({ backgroundColor: v })),
  bg
};