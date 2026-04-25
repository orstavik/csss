import { CsssPrimitives, CsssFunctions, CssFunctions, BadArgument } from "./func.js";
const { SF2, TypeBasedFunction, LogicalFour, FunctionPropertyType, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, NumberInterpreter, SingleTableRaw, } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SingleArgumentFunctionReverse, Optional, OptionalReset, DisplayMode, ValueReverse, normalizeToLogical} = CssFunctions;

const AlignSelf = CssValuesToCsssTable(
  "normal|stretch|start|end|center|safe start|safe end|safe center|space-around|space-between|space-evenly|baseline|first baseline|last baseline"
);

const DefaultFlexItem = {
  margin: "unset",
  flex: "unset",
  alignSelf: "unset",
  order: "unset",
};

const marginProps = {
  margin: undefined,
  marginBlock: undefined,
  marginInline: undefined,
  marginBlockStart: undefined,
  marginInlineStart: undefined,
  marginBlockEnd: undefined,
  marginInlineEnd: undefined,
  marginTop: undefined,
  marginRight: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
};

const alignSelf = SingleTableRaw(AlignSelf);
const orderFn = SF2("order", [NumberInterpreter]);

const flexItem = ({ name, args }) => {
  if (name.toLowerCase() !== "flexitem") return;
  let flexGrow, flexShrink, flexBasis, order, align, margin;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (flexGrow == null) if ((flexGrow = NumberInterpreter(arg)) != null) continue;
    if (flexShrink == null) if ((flexShrink = NumberInterpreter(arg)) != null) continue;
    if (flexBasis == null) if ((flexBasis = LengthPercentAuto(arg)) != null) continue;
    if (align == null && arg.kind === "WORD") if ((align = alignSelf(arg)) != null) continue;
    if (margin == null) if ((margin = LogicalFour("margin", "margin", LengthPercentAuto)(arg)) != null) continue;
    if (order == null) if ((order = orderFn(arg)?.[0]) != null) continue;
    throw BadArgument(name, args, i);
  }
  const flex = [flexGrow, flexShrink, flexBasis].filter(v => v != null);
  const res = {};
  if (flex.length) res.flex = flex.join(" ");
  if (order) res.order = order;
  if (align) res.alignSelf = align;
  if (margin) Object.assign(res, margin);
  return res;
};

const FlexItem = FunctionWithDefaultValues(DefaultFlexItem, flexItem);

export default {
  csss: {
    flexItem,
    FlexItem,
  },
  props: {
    display: undefined,
    flex: undefined,
    ...marginProps,
    alignSelf: undefined,
    flexBasis: undefined,
    flexGrow: undefined,
    flexShrink: undefined,
    order: undefined,
  },
  css: {
    flexItem: style => {
      const isGridPlacement = v => v && v !== "unset" && v !== "auto";
      if (isGridPlacement(style.gridColumnStart) || isGridPlacement(style.gridColumnEnd) ||
          isGridPlacement(style.gridRowStart) || isGridPlacement(style.gridRowEnd) ||
          isGridPlacement(style.gridColumn) || isGridPlacement(style.gridRow) ||
          isGridPlacement(style.justifySelf)) return;
      const normalized = normalizeToLogical(style);
      return OptionalReset("$flexItem", "$FlexItem", DefaultFlexItem,
        { prop: ["flex", "flexGrow"], rev: s => ValueReverse(s.flexGrow) },
        { prop: ["flex", "flexShrink"], rev: s => ValueReverse(s.flexShrink) },
        { prop: ["flex", "flexBasis"], rev: s => ValueReverse(s.flexBasis) },
        { prop: "alignSelf", rev: SingleTableReverse("alignSelf", AlignSelf) },
        { prop: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginBlockStart", "marginInlineStart", "marginBlockEnd", "marginInlineEnd"], rev: LogicalFourReverse("margin", "margin", ValueReverse, "_") },
        {
          prop: "order", rev: s => s.order && s.order !== "unset"
            ? `order(${s.order})`
            : undefined
        }
      )(normalized);
    }
  }
};
