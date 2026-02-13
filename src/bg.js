import { ValueTypes, FunctionTypes } from "./func.js";
const { Angle, Color, LengthPercent, Url, CamelWords, WordToValue, AnglePercent } = ValueTypes;
const { FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction } = FunctionTypes;
//todo isImage, interpretImage,

const BackgroundDefaults = {
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

const ColorSpace = WordToValue({
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

const LinearDirections = WordToValue({
  left: "to left",
  right: "to right",
  up: "to top",
  down: "to bottom",
  upLeft: "to top left",
  upRight: "to top right",
  downLeft: "to bottom left",
  downRight: "to bottom right",
});
const AngleOrLinearDirection = e => Angle(e) ?? LinearDirections(e);
const ColorStopAnglePercentTuple = SequentialFunction("(/1-3", [Color, AnglePercent], (_, res) => res.join(" "));
const ColorStopAnglePercent = e => Color(e) ?? ColorStopAnglePercentTuple(e);

const ColorStopLengthPercentTuple = SequentialFunction("(/1-3", [Color, LengthPercent], (_, res) => res.join(" "));
const ColorStopLengthPercent = e => Color(e) ?? ColorStopLengthPercentTuple(e);
const AtPosition = CamelWords("top|bottom|left|right|center|xStart|xEnd|yStart|yEnd|blockStart|blockEnd|inlineStart|inlineEnd");
const LengthPercentAtPosition = e => LengthPercent(e) ?? AtPosition(e);
const LengthPercentAuto = e => e.text === "auto" ? "auto" : LengthPercent(e);

const FarthestClosest = CamelWords("farthestCorner|farthestSide|closestCorner|closestSide");
const LengthPercentOrFarthestClosest = e => LengthPercent(e) ?? FarthestClosest(e);
const BgPositions = CamelWords("left|center|right|top|bottom|xStart|xEnd|yStart|yEnd|blockStart|blockEnd|inlineStart|inlineEnd");
const At = SequentialFunction("at/1-2", [LengthPercentAtPosition], (n, res) => "at " + res.join(" "));

const conic = FunctionBasedOnValueTypes({}, {
  At,
  Angle,
  ColorSpace,
}, {
  colorStops: ColorStopAnglePercent,
}, ({ Angle, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`conic() must have at least one color stop`);
  Angle &&= "from " + Angle;
  const first = [Angle, At, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
})

const linear = FunctionBasedOnValueTypes({}, {
  AngleOrLinearDirection,
  ColorSpace,
}, {
  colorStops: ColorStopLengthPercent,
}, ({ AngleOrLinearDirection, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`linear() must have at least one color stop`);
  const first = [AngleOrLinearDirection, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});


const radial = FunctionBasedOnValueTypes({}, {
  At,
  ColorSpace,
  FarthestClosest,
}, {
  colorStops: ColorStopLengthPercent,
  size: LengthPercent,
}, ({ size, FarthestClosest, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`radial() must have at least one color stop`);
  if (size?.length > 2)
    throw new SyntaxError(`radial() size cannot be more than two values: ${size}`);
  size &&= size.join(" ");
  if (size && FarthestClosest)
    throw new SyntaxError(`radial() size specified twice: ${size} AND ${FarthestClosest}`);
  const first = [size, FarthestClosest, At, ColorSpace].filter(Boolean).join(" ");
  return [first, ...colorStops].filter(Boolean).join(", ")
});

const circle = FunctionBasedOnValueTypes({}, {
  At,
  ColorSpace,
  size: LengthPercentOrFarthestClosest,
}, {
  colorStops: ColorStopLengthPercent,
}, ({ size, At, ColorSpace, colorStops }) => {
  if (!colorStops)
    throw new SyntaxError(`circle() must have at least one color stop`);
  return ["circle", size, At, ColorSpace].filter(Boolean).join(" ") + ", " + colorStops.join(", ")
});

const bg = FunctionBasedOnValueTypes({
  size: SequentialFunction("size/1-2", [LengthPercentAuto], (name, ar) => ar.join(" ")),
  linear,
  ellipse: radial,
  radial,
  circle,
  conic,
  repeatingLinear: linear,
  repeatingEllipse: radial,
  repeatingRadial: radial,

  repeatingCircle: circle,
  repeatingConic: conic,
}, {
  backgroundRepeat: CamelWords("repeat|repeatX|repeatY|space|round|noRepeat"),
  backgroundSize: CamelWords("cover|contain"),
  backgroundOrigin: WordToValue({ originBorderBox: "borderBox", originPaddingBox: "paddingBox", originContentBox: "contentBox" }),
  backgroundClip: CamelWords("borderBox|paddingBox|contentBox|text|borderArea"),
  backgroundAttachment: CamelWords("fixed|scroll|local"),
  backgroundBlendMode: CamelWords("multiply|screen|overlay|darken|lighten|colorDodge|colorBurn|hardLight|softLight|difference|exclusion|hue|saturation|color|luminosity"),
}, {
  Color, Url, positions: BgPositions, positionValues: LengthPercent
},
  res => {
    if (res.positionValues?.length > 2)
      throw new SyntaxError(`background-position has max 2 values: ${res.positionValues}`);
    if (res.positions?.length > 2)
      throw new SyntaxError(`background-position has max 2 directions: ${res.positions}`);
    if (res.positions || res.positionValues) {
      const [a, c] = res.positions ?? [];
      const [b, d] = res.positionValues ?? [];
      res.backgroundPosition = [a, b, c, d].filter(Boolean).join(" ");
      delete res.positions;
      delete res.positionValues;
    }
    if (res.linear) {
      res.backgroundImage = `linear-gradient(${res.linear})`;
      delete res.linear;
    }
    if (res.ellipse) {
      res.backgroundImage = `radial-gradient(${res.ellipse})`;
      delete res.ellipse;
    }
    if (res.radial) {
      res.backgroundImage = `radial-gradient(${res.radial})`;
      delete res.radial;
    }
    if (res.circle) {
      res.backgroundImage = `radial-gradient(${res.circle})`;
      delete res.circle;
    }
    if (res.conic) {
      res.backgroundImage = `conic-gradient(${res.conic})`;
      delete res.conic;
    }
    if (res.repeatingLinear) {
      res.backgroundImage = `repeating-linear-gradient(${res.repeatingLinear})`;
      delete res.repeatingLinear;
    }
    if (res.repeatingEllipse) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingEllipse})`;
      delete res.repeatingEllipse;
    }
    if (res.repeatingRadial) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingRadial})`;
      delete res.repeatingRadial;
    }
    if (res.repeatingCircle) {
      res.backgroundImage = `repeating-radial-gradient(${res.repeatingCircle})`;
      delete res.repeatingCircle;
    }
    if (res.repeatingConic) {
      res.backgroundImage = `repeating-conic-gradient(${res.repeatingConic})`;
      delete res.repeatingConic;
    }
    if (res.size) {
      res.backgroundSize = res.size;
      delete res.size;
    }
    if (res.Color) {
      if (res.Color.length == 1)
        res.backgroundColor = res.Color[0];
      else
        res.backgroundImage = `linear-gradient(${res.Color.join(", ")})`;
      delete res.Color;
    }
    //todo check that we only get one url //todo this should be isImage
    if (res.Url) {
      res.backgroundImage = res.Url[0];
      delete res.Url;
    }
    //todo check that we only define backgroundImage once, and all the other properties just once
    return res;
  }
);

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
  bgColor: SingleArgumentFunction(Color, (n, v) => ({ backgroundColor: v })),
  //todo this hack should now be manageable from the animation point of view..
  bg: FunctionWithDefaultValues(BackgroundDefaults, bg),
};