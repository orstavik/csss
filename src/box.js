import { CsssPrimitives, CsssFunctions, CssFunctions, BadArgument } from "./func.js";
const { SingleTable, TypeBasedFunction, LogicalFour, SizeFunction, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercent, LengthPercentUnset, NumberInterpreter } = CsssPrimitives;
const { LogicalFourReverse, Optional, OptionalReset, DisplayMode, ValueReverse, normalizeToLogical } = CssFunctions;

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

/** $box / $Box reverse: valid on block-level and flex/grid containers, not e.g. inline. */
const BOX_REVERSE_DISPLAYS = new Set(["block", "inline-block", "flex", "inline-flex", "grid", "inline-grid"]);

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
  objectPosition: "unset"
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
const scrollPadding = LogicalFourReverse("scroll-padding", "scrollPadding", ValueReverse, "_");
const ReverseSizeFunction = prefix => {
  const capPrefix = prefix[0].toUpperCase() + prefix.slice(1);
  const min = `min${capPrefix}Size`, normal = `${prefix}Size`, max = `max${capPrefix}Size`;
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
  if (objectFit === "unset") objectFit = undefined;
  if (aspectRatio === "unset") aspectRatio = undefined;
  if (objectPosition === "unset") objectPosition = undefined;
  if (!aspectRatio && !objectPosition && !objectFit) return;
  if (!aspectRatio && !objectPosition) return objectFitReverses[objectFit];
  objectFit ||= "fill";
  aspectRatio &&= aspectRatio.replace(/\s*\/\s*/g, "/");
  if (objectPosition) {
    // use comma as separator — space breaks csss parser
    objectPosition = objectPosition.split(" ").join(",");
  }
  return `${objectFitReverses[objectFit] ?? objectFit}(${[aspectRatio, objectPosition].filter(Boolean).join(",")})`;
}

export default {
  csss: {
    box,
    Box
  },
  props,
  css: {
    box: style => {
      const d = style.display;
      if (d && d !== "unset" && !BOX_REVERSE_DISPLAYS.has(d)) return;
      const normalized = normalizeToLogical(style);
      if (style.objectPosition && style.objectPosition !== normalized.objectPosition) normalized.objectPosition = style.objectPosition;
      return OptionalReset("$box", "$Box", DefaultBox,
        { prop: ["minInlineSize", "inlineSize", "maxInlineSize"], rev: inlineSizeReverse },
        { prop: ["minBlockSize", "blockSize", "maxBlockSize"], rev: blockSizeReverse },
        {
          prop: ["overflowX", "overflowY", "overflow"], rev: s => {
            const ox = s.overflowX, oy = s.overflowY, o = s.overflow;
            if (ox === "unset" && oy === "unset" && (!o || o === "unset")) return undefined;
            return overflowReverse[o] ?? overflowReverse[ox === oy ? ox : `${ox} ${oy}`];
          }
        },
        { prop: "scrollSnapType", rev: s => scrollSnapTypeReverse[s.scrollSnapType] },
        { prop: ["scrollPadding", "scrollPaddingTop", "scrollPaddingRight", "scrollPaddingBottom", "scrollPaddingLeft", "scrollPaddingBlockStart", "scrollPaddingInlineStart", "scrollPaddingBlockEnd", "scrollPaddingInlineEnd"], rev: scrollPadding },

        { prop: ["aspectRatio", "objectFit", "objectPosition"], rev: objectFitReverse }
      )(normalized);
    }
  }
};
