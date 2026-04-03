//todo isImage, interpretImage,
import { CsssFunctions, CsssPrimitives, BadArgument } from "./func2.js";
const { LengthPercent, Url, LengthPercentAuto } = CsssPrimitives;
const { SF2, CssValuesToCsssTable, FunctionPropertyType, FunctionWithDefaultValues } = CsssFunctions;
import { Color } from "./funcColor.js";
import gradients from "./funcGradients.js";
const { linear, ellipse, circle, conic, } = gradients.csss;

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
  if (name.toLowerCase() !== "bg") return;

  const res = {};

  if (args.length === 1) if (res.backgroundColor = Color(args[0])) return res;

  let colors = [], x, xl, y, yl, backgroundRepeat, backgroundSize, backgroundOrigin, backgroundClip, backgroundAttachment, backgroundBlendMode;
  for (let i = 0, v; i < args.length; i++) {
    const arg = args[i];
    if (!res.backgroundImage) if (res.backgroundImage = Url(arg)) continue;
    if (!res.backgroundImage && args.length) if (res.backgroundImage = linear(arg) ?? ellipse(arg) ?? circle(arg) ?? conic(arg)) continue;
    if (!res.backgroundImage) if (v = Color(arg)) if (colors.push(v)) continue;
    if (!xl && !y) if (xl = LengthPercent(arg)) continue;
    if (!yl) if (yl = LengthPercent(arg)) continue;
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
  if (colors.length && !res.backgroundImage)
    res.backgroundImage = `linear-gradient(${colors.join(", ")})`;
  if (x || xl || y || yl) res.backgroundPosition = [x, xl, y, yl].filter(Boolean).join(" ");
  if (backgroundRepeat) res.backgroundRepeat = backgroundRepeat;
  if (backgroundSize) res.backgroundSize = backgroundSize;
  if (backgroundOrigin) res.backgroundOrigin = backgroundOrigin;
  if (backgroundClip) res.backgroundClip = backgroundClip;
  if (backgroundAttachment) res.backgroundAttachment = backgroundAttachment;
  if (backgroundBlendMode) res.backgroundBlendMode = backgroundBlendMode;
  return res;
}

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
    bgColor: FunctionPropertyType("bgColor", "backgroundColor", Color), //animatable property..
    bg,
    Bg: FunctionWithDefaultValues(DEFAULTS, bg),
  }, css: {}
};