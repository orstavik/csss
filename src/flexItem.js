import { CsssPrimitives, CsssFunctions, BadArgument } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { SF2, TypeBasedFunction, LogicalFour, FunctionPropertyType, FunctionWithDefaultValues, CssValuesToCsssTable } = CsssFunctions;
const { LengthPercentAuto, NumberInterpreter, SingleTableRaw, } = CsssPrimitives;
const { LogicalFourReverse, SingleTableReverse, SingleArgumentFunctionReverse, Optional, ValueReverse } = CssFunctions;

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
    flex: undefined,
    ...marginProps,
    alignSelf: undefined,
    flexBasis: undefined,
    flexGrow: undefined,
    flexShrink: undefined,
    order: undefined,
  },
  css: {
    flexItem: (style, parentStyle) => {
      if (parentStyle?.display !== "flex") return;
      let { flex, flexGrow, flexShrink, flexBasis, alignSelf, order } = style;
      flexGrow = ValueReverse(flexGrow ?? (flex ? flex.split(" ")[0] : undefined));
      flexShrink = ValueReverse(flexShrink ?? (flex ? flex.split(" ")[1] : undefined));
      flexBasis = ValueReverse(flexBasis ?? (flex ? flex.split(" ")[2] : undefined));
      alignSelf = ValueReverse(alignSelf);
      order = ValueReverse(order);
      order &&= `order(${order})`;
      const margin = LogicalFourReverse("margin", "margin", ValueReverse)(style);
      const args = [flexGrow, flexShrink, flexBasis, alignSelf, order, margin]
        .filter(v => v && v !== "unset");
      const unsets = [
        ...Object.keys(DefaultFlexItem),
        ...Object.keys(marginProps),
        "flexGrow", "flexShrink", "flexBasis"  
      ].filter(k => style[k] === "unset" || style[k] === "initial").length;
      if (!args.length && !unsets) return;
      const name = args.length + unsets >= 4 ? "$FlexItem" : "$flexItem";
      return `${name}(${args.join(",")})`;
    }
  }
};
