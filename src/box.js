import { CsssPrimitives, CsssFunctions, CssFunctions, BadArgument } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SizeFunction, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, NumberInterpreter } = CsssPrimitives;
const { LogicalFourReverse } = CssFunctions;

const scrollPaddingProps = {
  scrollPadding: undefined,
  scrollPaddingBlock: undefined,
  scrollPaddingInline: undefined,
  scrollPaddingBlockStart: undefined,
  scrollPaddingInlineStart: undefined,
  scrollPaddingBlockEnd: undefined,
  scrollPaddingInlineEnd: undefined,
  scrollPaddingTop: undefined,
  scrollPaddingRight: undefined,
  scrollPaddingBottom: undefined,
  scrollPaddingLeft: undefined,
};

const props = {
  inlineSize: undefined,
  blockSize: undefined,
  minInlineSize: undefined,
  maxInlineSize: undefined,
  minBlockSize: undefined,
  maxBlockSize: undefined,
  overflow: undefined,
  overflowX: undefined,
  overflowY: undefined,
  ...scrollPaddingProps,
  scrollSnapType: undefined,
  aspectRatio: undefined,
  objectFit: undefined,
  objectPosition: undefined,
};

const overflow = {
  auto: "auto",
  clip: "clip",
  hidden: "hidden",
  scroll: "scroll",
  visible: "visible",
  autoClip: "auto clip",
  autoHidden: "auto hidden",
  autoScroll: "auto scroll",
  autoVisible: "auto visible",
  clipAuto: "clip auto",
  clipHidden: "clip hidden",
  clipScroll: "clip scroll",
  clipVisible: "clip visible",
  hiddenAuto: "hidden auto",
  hiddenClip: "hidden clip",
  hiddenScroll: "hidden scroll",
  hiddenVisible: "hidden visible",
  scrollAuto: "scroll auto",
  scrollClip: "scroll clip",
  scrollHidden: "scroll hidden",
  scrollVisible: "scroll visible",
  visibleAuto: "visible auto",
  visibleClip: "visible clip",
  visibleHidden: "visible hidden",
  visibleScroll: "visible scroll",
};

const scrollSnapType = {
  snap: "both",
  snapNone: "none",
  snapBlock: "block",
  snapInline: "inline",
  snapMandatory: "both mandatory",
  snapBlockMandatory: "block mandatory",
  snapInlineMandatory: "inline mandatory",
};

const PositionsHorizontal = CssValuesToCsssTable("left|center|right");
const PositionsVertical = CssValuesToCsssTable("top|center|bottom");
const ObjectFits = CssValuesToCsssTable("fill|contain|cover|none|scale-down");

function coverImage({ name, args, text }) {
  let objectFit = ObjectFits[text]
  if (objectFit) return { objectFit };
  objectFit = ObjectFits[name];
  if (!objectFit) return;
  let i = 0;
  const aspectRatio = NumberInterpreter(args[i]);
  if (aspectRatio) i++;
  let xA = args[i] != null && PositionsHorizontal[args[i]?.text];
  if (xA) i++;
  const xL = args[i] != null && LengthPercent(args[i]);
  if (xL) i++;
  let yA = args[i] != null && PositionsVertical[args[i]?.text];
  if (yA) i++;
  const yL = args[i] != null && LengthPercent(args[i]);
  if (yL) i++;
  if (args.length !== i) throw BadArgument("position", args, i);
  return {
    objectFit,
    aspectRatio,
    objectPosition: [xA, xL, yA, yL].filter(Boolean).join(" "),
  };
}

const DefaultBox = {
  blockSize: "unset",
  minBlockSize: "unset",
  maxBlockSize: "unset",
  inlineSize: "unset",
  minInlineSize: "unset",
  maxInlineSize: "unset",
  overflow: "unset",
  scrollPadding: "unset",
  scrollSnapType: "unset",
  aspectRatio: "unset",
  objectFit: "unset",
  objectPosition: "unset",
};

const box = TypeBasedFunction(
  SizeFunction("inline", "<", LengthPercentUnset),
  SizeFunction("block", "<", LengthPercentUnset),
  SingleTable("overflow", overflow),
  LogicalFour("scrollPadding", "scrollPadding", LengthPercent),
  SingleTable("scrollSnapType", scrollSnapType),
  coverImage
);

const Box = FunctionWithDefaultValues(DefaultBox, box);

const overflowReverse = Object.fromEntries(Object.entries(overflow).map(([k, v]) => [v, k]));
const scrollSnapTypeReverse = Object.fromEntries(Object.entries(scrollSnapType).map(([k, v]) => [v, k]));
const objectFitReverses = Object.fromEntries(Object.entries(ObjectFits).map(([k, v]) => [v, k]));
const scrollPadding = LogicalFourReverse("scroll-padding", "scrollPadding", v => v, "_");
const ReverseSizeFunction = prefix => {
  const min = `min-${prefix}-size`, normal = `${prefix}-size`, max = `max-${prefix}-size`;
  return ({ [min]: vMin, [normal]: vNormal, [max]: vMax }) => {
    if (vMax == "unset") vMax = "_";
    if (vMin == "unset") vMin = "_";
    if (vNormal == "unset") vNormal = "_";
    return vMax ? `${vMin ?? "_"}<${vNormal ?? "_"}<${vMax}` :
      vMin ? `${vMin}<${vNormal ?? "_"}` :
        vNormal;
  }
};
const blockSizeReverse = ReverseSizeFunction("block");
const inlineSizeReverse = ReverseSizeFunction("inline");

function objectFitReverse({ objectPosition, objectFit, aspectRatio }) {
  if (!aspectRatio && !objectPosition && !objectFit) return;
  if (!aspectRatio && !objectPosition) return objectFitReverses[objectFit];
  objectFit ||= "fill";
  aspectRatio &&= aspectRatio.replace(/\s/g, "");
  if (objectPosition) {
    const pos = objectPosition?.split(" ") || [];
    let x, y, x2, y2;
    for (let i = 0; i < pos.length; i++) {
      if (!x && (pos[i] === "left" || pos[i] === "right" || pos[i] === "center"))
        x = pos[i];
      else if (!y && (pos[i] === "top" || pos[i] === "bottom" || pos[i] === "center"))
        y = pos[i];
      else if (!y) x2 = pos[i];
      else y2 = pos[i];
    }
    objectPosition = [x, x2, y, y2].filter(Boolean).join(" "); //here we actually want to remove the 0 as it is the default value.
  }
  return `${objectFit}(${[aspectRatio, objectPosition].filter(Boolean).join(",")})`;
}

export default {
  csss: {
    box,
    Box
  },
  props,
  css: {
    box: style => {
      let x, y;
      let o = overflowReverse[(x = style["overflow-x"] ?? "auto") === (y = style["overflow-y"] ?? "auto") ? x : `${x} ${y}`];
      if (o === "auto") o = undefined;
      let inline = inlineSizeReverse(style);
      let block = blockSizeReverse(style);
      const snapType = scrollSnapTypeReverse[style["scroll-snap-type"]];
      const padding = scrollPadding(style);
      const coverStr = objectFitReverse(style);
      const bigB = o && inline && block && snapType && padding && coverStr;
      if (block === "_<_<_") block = undefined;
      if (inline === "_<_<_") inline = block && "_";
      const res = [inline, block, o, snapType, padding, coverStr].filter(Boolean);
      return !res.length ? undefined : `$${bigB ? "B" : "b"}ox(${res.join(",")})`;
    },
  }
};