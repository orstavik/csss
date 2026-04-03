//todo isImage, interpretImage,
import { Color } from "./funcColor.js";
import { CsssFunctions, CsssPrimitives, BadArgument } from "./func2.js";
const { LengthPercent, Url, LengthPercentAuto } = CsssPrimitives;
const { SF2, CssValuesToCsssTable, FunctionPropertyType, FunctionWithDefaultValues } = CsssFunctions;
import gradients from "./funcGradients.js";
const { linear, ellipse, circle, conic, } = gradients.csss;

const DEFAULTS = {
  background: "unset",
  backgroundImage: "unset",
  backgroundPosition: "unset",
  backgroundRepeat: "unset",
  backgroundSize: "unset",
  backgroundOrigin: "unset",
  backgroundClip: "unset",
  backgroundBlendMode: "unset",
  backgroundAttachment: "unset",
};

const Repeats = CssValuesToCsssTable("repeat|repeat-x|repeat-y|space|round|no-repeat");
const Sizes = CssValuesToCsssTable("cover|contain");
const Origins = { originBorderBox: "border-box", originPaddingBox: "padding-box", originContentBox: "content-box" };
const Clips = CssValuesToCsssTable("border-box|padding-box|content-box|text|border-area");
const Attachments = CssValuesToCsssTable("fixed|scroll|local");
const BlendModes = CssValuesToCsssTable("multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity");
const PositionsX = CssValuesToCsssTable("left|center|right");
const PositionsY = CssValuesToCsssTable("top|center|bottom");

const size = SF2("size/1-2", [LengthPercentAuto], (name, ar) => ar.join(" "));

const bg = ({ name, args }) => {
  if (name !== "bg") return;

  let backgroundColor, backgroundImage, x, xl, y, yl, backgroundRepeat, backgroundSize, backgroundOrigin, backgroundClip, backgroundAttachment, backgroundBlendMode;

  if (args.length === 1) if (backgroundColor = Color(args[0])) return { backgroundColor };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!backgroundImage) if (backgroundImage = Url(arg)) continue;
    if (!backgroundImage && args.length) if (backgroundImage = linear(arg) ?? ellipse(arg) ?? circle(arg) ?? conic(arg)) continue;
    if (!backgroundImage) if (backgroundImage = Color(arg)) if (backgroundImage = `linear-gradient(${backgroundImage})`) continue;
    if (!xl && !y) if (xl = LengthPercent(arg)) continue;
    if (!yl && !y) if (yl = LengthPercent(arg)) continue;
    if (!backgroundSize) if (backgroundSize = size(arg)) continue;

    if (arg.kind === "WORD") {
      if (!x) if (x = PositionsX[arg.text]) continue;
      if (!y) if (y = PositionsY[arg.text]) continue;
      if (!backgroundRepeat) if (backgroundRepeat = Repeats[arg.text]) continue;
      if (!backgroundSize) if (backgroundSize = Sizes[arg.text]) continue;
      if (!backgroundOrigin) if (backgroundOrigin = Origins[arg.text]) continue;
      if (!backgroundClip) if (backgroundClip = Clips[arg.text]) continue;
      if (!backgroundAttachment) if (backgroundAttachment = Attachments[arg.text]) continue;
      if (!backgroundBlendMode) if (backgroundBlendMode = BlendModes[arg.text]) continue;
    }
    throw BadArgument(name, args, i);
  }
  const backgroundPosition = (x || xl || y || yl) ? [x, xl, y, yl].filter(Boolean).join(" ") : undefined;

  return {
    backgroundImage,
    backgroundPosition,
    backgroundRepeat,
    backgroundSize,
    backgroundOrigin,
    backgroundClip,
    backgroundAttachment,
    backgroundBlendMode,
  };
}
// FunctionBasedOnValueTypes({
// }, {
// }, {
//   Color, Url, positions: BgPositions, positionValues: LengthPercent
// },
//   res => {
//     if (res.positionValues?.length > 2)
//       throw new SyntaxError(`background-position has max 2 values: ${res.positionValues}`);
//     if (res.positions?.length > 2)
//       throw new SyntaxError(`background-position has max 2 directions: ${res.positions}`);
//     if (res.positions || res.positionValues) {
//       const [a, c] = res.positions ?? [];
//       const [b, d] = res.positionValues ?? [];
//       res.backgroundPosition = [a, b, c, d].filter(Boolean).join(" ");
//       delete res.positions;
//       delete res.positionValues;
//     }
//     if (res.linear) {
//       res.backgroundImage = res.linear;//`linear-gradient(${res.linear})`;
//       delete res.linear;
//     }
//     if (res.ellipse) {
//       res.backgroundImage = res.ellipse;
//       delete res.ellipse;
//     }
//     if (res.radial) {
//       res.backgroundImage = res.radial;
//       delete res.radial;
//     }
//     if (res.circle) {
//       res.backgroundImage = res.circle;
//       delete res.circle;
//     }
//     if (res.conic) {
//       res.backgroundImage = res.conic;
//       delete res.conic;
//     }
//     if (res.repeatingLinear) {
//       res.backgroundImage = res.repeatingLinear;
//       delete res.repeatingLinear;
//     }
//     if (res.repeatingEllipse) {
//       res.backgroundImage = res.repeatingEllipse;
//       delete res.repeatingEllipse;
//     }
//     if (res.repeatingRadial) {
//       res.backgroundImage = res.repeatingRadial;
//       delete res.repeatingRadial;
//     }
//     if (res.repeatingCircle) {
//       res.backgroundImage = res.repeatingCircle;
//       delete res.repeatingCircle;
//     }
//     if (res.repeatingConic) {
//       res.backgroundImage = res.repeatingConic;
//       delete res.repeatingConic;
//     }
//     if (res.size) {
//       res.backgroundSize = res.size;
//       delete res.size;
//     }
//     if (res.Color) {
//       if (res.Color.length == 1)
//         res.backgroundColor = res.Color[0];
//       else
//         res.backgroundImage = `linear-gradient(${res.Color.join(", ")})`;
//       delete res.Color;
//     }
//     //todo check that we only get one url //todo this should be isImage
//     if (res.Url) {
//       res.backgroundImage = res.Url[0];
//       delete res.Url;
//     }
//     //todo check that we only define backgroundImage once, and all the other properties just once
//     return res;
//   }
// );

export default {
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
  csss: {
    //todo I think that these should be $Bg() and $BgColor()
    //todo the reason being that they set the full background always.
    //todo we could have a $bg() that sets only a few properties. We should probably have that.
    bgColor: FunctionPropertyType("bgColor", "backgroundColor", Color), //to make it animatable..
    //todo this hack should now be manageable from the animation point of view..
    bg: FunctionWithDefaultValues(DEFAULTS, bg),
  }, css: {}
};