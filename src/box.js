import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SizeFunction, FunctionWithDefaultValues } = CsssFunctions;
const { LengthPercent, LengthPercentUnset } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SequentialFunctionReverse, Optional } = CssFunctions;

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
  inlineSize: "unset",
  blockSize: "unset",
  minInlineSize: "unset",
  maxInlineSize: "unset",
  minBlockSize: "unset",
  maxBlockSize: "unset",
  overflow: "unset",
  scrollPadding: "unset",
  scrollSnapType: "unset",
};

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

const box = TypeBasedFunction(
  SizeFunction("inline", ["minInlineSize", "inlineSize", "maxInlineSize"], LengthPercentUnset),
  SizeFunction("block", ["minBlockSize", "blockSize", "maxBlockSize"], LengthPercentUnset),
  SingleTable("overflow", overflow),
  LogicalFour("scrollPadding", "scrollPadding", LengthPercent),
  SingleTable("scrollSnapType", scrollSnapType)
);

const Box = FunctionWithDefaultValues(DefaultBox, box);

export default {
  csss: {
    box,
    Box
  },
  props: {
    inlineSize: undefined,
    blockSize: undefined,
    minInlineSize: undefined,
    maxInlineSize: undefined,
    minBlockSize: undefined,
    maxBlockSize: undefined,
    overflow: undefined,
    ...scrollPaddingProps,
    scrollSnapType: undefined,
  },
  css: {
    box: Optional("box",
      SequentialFunctionReverse("inline", ["minInlineSize", "inlineSize", "maxInlineSize"], v => v, "_"),
      SequentialFunctionReverse("block", ["minBlockSize", "blockSize", "maxBlockSize"], v => v, "_"),
      SingleTableReverse("overflow", overflow),
      LogicalFourReverse("scrollPadding", "scrollPadding", v => v, "_"),
      SingleTableReverse("scrollSnapType", scrollSnapType)
    ),
  }
};