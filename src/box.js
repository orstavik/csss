import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SizeFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
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
};

const box = TypeBasedFunction(
  SizeFunction("inline", "<", LengthPercentUnset),
  SizeFunction("block", "<", LengthPercentUnset),
  SingleTable("overflow", overflow),
  LogicalFour("scrollPadding", "scrollPadding", LengthPercent),
  SingleTable("scrollSnapType", scrollSnapType)
);

const Box = FunctionWithDefaultValues(DefaultBox, box);

const overflowReverse = Object.fromEntries(Object.entries(overflow).map(([k, v]) => [v, k]));
const scrollSnapTypeReverse = Object.fromEntries(Object.entries(scrollSnapType).map(([k, v]) => [v, k]));
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
      const bigB = o && inline && block && snapType && padding;
      if (block === "_<_<_") block = undefined;
      if (inline === "_<_<_") inline = block && "_";
      const res = [inline, block, o, snapType, padding].filter(Boolean);
      return !res.length ? undefined : `$${bigB ? "B" : "b"}ox(${res.join(",")})`;
    },
  }
};