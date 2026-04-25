//todo isImage, interpretImage,
import { CsssFunctions, CsssPrimitives, BadArgument } from "./func.js";
const { LengthPercent, Url, LengthPercentAuto } = CsssPrimitives;
const { SF2, CssValuesToCsssTable } = CsssFunctions;
import { Color } from "./funcColor.js";
import gradients from "./funcGradients.js";
const { linear, ellipse, circle, conic, } = gradients.csss;

const Repeats = CssValuesToCsssTable("repeat|repeat-x|repeat-y|space|round|no-repeat");
const Sizes = CssValuesToCsssTable("cover|contain");
const Origins = { originBorderBox: "border-box", originPaddingBox: "padding-box", originContentBox: "content-box" };
const Clips = CssValuesToCsssTable("border-box|padding-box|content-box|text|border-area");
const Attachments = CssValuesToCsssTable("fixed|scroll|local");
const BlendModes = CssValuesToCsssTable("multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity");
const PositionsX = CssValuesToCsssTable("left|center|right");
const PositionsY = CssValuesToCsssTable("top|center|bottom");

const size = SF2("size/1-2", [LengthPercentAuto], (name, ar) => ar.join(" "));

const Bg = ({ name, args }) => {
  if (name.toLowerCase() !== "bg") return;

  let colors = [], x, xl, y, yl, image, repeat, bSize, origin, clip, attach, blendMode;
  for (let i = 0, v; i < args.length; i++) {
    const arg = args[i];
    if (!image && !colors.length) if (arg.text === "none") { image = "none"; continue; }
    if (!image && !colors.length) if (image = Url(arg)) continue;
    if (!image && !colors.length && args.length) if (image = linear(arg) ?? ellipse(arg) ?? circle(arg) ?? conic(arg)) continue;
    if (!image) if (v = Color(arg)) if (colors.push(v)) continue;
    if (!xl && !y) if (xl = LengthPercent(arg)) continue;
    if (!yl) if (yl = LengthPercent(arg)) continue;
    if (!bSize) if (bSize = size(arg)) continue;

    if (arg.kind === "WORD") {
      if (!x) if (x = PositionsX[arg.text]) continue;
      if (!y) if (y = PositionsY[arg.text]) continue;
      if (!repeat) if (repeat = Repeats[arg.text]) continue;
      if (!bSize) if (bSize = Sizes[arg.text]) continue;
      if (!origin) if (origin = Origins[arg.text]) continue;
      if (!clip) if (clip = Clips[arg.text]) continue;
      if (!attach) if (attach = Attachments[arg.text]) continue;
      if (!blendMode) if (blendMode = BlendModes[arg.text]) continue;
    }
    throw BadArgument(name, args, i);
  }
  if (colors.length && args.length === 1)
    return {
      background: "none",
      backgroundColor: colors[0],
      backgroundBlendMode: "normal"
    };
  if (colors.length) image = `linear-gradient(${colors.join(", ")})`;
  if (!image) throw BadArgument(name, args, args.length, "Bg() requires a color, image, gradient, or none.");
  const pos = [x, xl, y, yl].filter(Boolean).join(" ");
  const posSize = !bSize ? pos : (pos || "0% 0%") + "/" + bSize;
  return {
    background: [image, posSize, repeat, attach, clip, origin].filter(Boolean).join(" "),
    backgroundBlendMode: blendMode || "normal"
  };
}

export default {
  props: {
    background: undefined, // "none"
    backgroundImage: undefined, // "unset"
    backgroundPosition: undefined, // "0% 0%"
    backgroundRepeat: undefined, // "repeat"
    backgroundSize: undefined, // "auto"
    backgroundOrigin: undefined, // "padding-box"
    backgroundClip: undefined, // "border-box"
    backgroundBlendMode: undefined, // "normal"
    backgroundAttachment: undefined, // "scroll"
    backgroundColor: undefined, // "transparent"
  },
  csss: {
    Bg,
  },
  css: {
    bg: style => {
      let args = [];
      const hasRealImage = style.backgroundImage && style.backgroundImage !== "none" && style.backgroundImage !== "unset";
      const bgColor = style.backgroundColor;
      const bgColorIsDefault = !bgColor || bgColor === "none" || bgColor === "unset" || bgColor === "transparent" || bgColor === "initial";
      if (!hasRealImage && !bgColorIsDefault) {
        args.push(bgColor.replace(/^var\(--color-([^)]+)\)$/, '#$1'));
      } else if (!hasRealImage && style.backgroundImage === "none") {
        args.push("none");
      }
      if (style.backgroundImage && style.backgroundImage !== "none" && style.backgroundImage !== "unset") {
        let bi = style.backgroundImage;
        if (bi.startsWith("linear-gradient(") || bi.startsWith("radial-gradient(") || bi.startsWith("conic-gradient(")) {
          // just pass it back? in csss gradient functions are like linear(...). Just push it as is, or reconstruct.
          // Reconstructing gradients could be complex, we just dump the bg string.
          // Let's replace the -gradient part.
          bi = bi.replace(/-gradient\(/g, "(");
          // And spaces inside the paren with commas
          bi = bi.replace(/\(([^)]+)\)/g, (_, m) => "(" + m.replace(/,\s*/g, ",").replace(/\s+(?![^(]*\))/g, ",") + ")");
        }
        args.push(bi);
      }
      const notDefault = (v, def) => v && v !== def && v !== "initial" && v !== "unset";
      if (notDefault(style.backgroundPosition, "0% 0%")) args.push(style.backgroundPosition.replace(/\s+/g, ","));
      if (notDefault(style.backgroundRepeat, "repeat")) args.push(style.backgroundRepeat);
      if (notDefault(style.backgroundSize, "auto")) args.push(style.backgroundSize.replace(/\s+/g, ","));
      if (notDefault(style.backgroundOrigin, "padding-box")) args.push(style.backgroundOrigin);
      if (notDefault(style.backgroundClip, "border-box")) args.push(style.backgroundClip);
      if (notDefault(style.backgroundAttachment, "scroll")) args.push(style.backgroundAttachment);
      if (notDefault(style.backgroundBlendMode, "normal")) args.push(style.backgroundBlendMode);

      return args.length ? `$Bg(${args.join(",")})` : undefined;
    }
  }
};
