import { ValueTypes, FunctionTypes } from "./func.js";
const { LogicalFour: y, FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, TypeBasedFunction: x } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;

const SingleTable = (CssProp, Table) => ({ text }) => ({ [CssProp]: Table[text] });

const TypeBasedFunction = (...FUNCTIONS) => {
  return ({ args, name }) => {
    const res = {};
    main: for (let i = 0; i < args.length; i++) {
      for (let fn of FUNCTIONS) {
        const v = fn(args[i]);
        if (v != null) {
          Object.assign(res, v);
          continue main;
        }
      }
      throw BadArgument(name, args, i);
    }
    return res;
  };
};

const LogicalFour = (CsssName, CssName, INTERPRETER) => ({ args, name }) => {
  if (CsssName != name) return;
  if (args.length > 4)
    throw new SyntaxError(`${CsssName}() takes max 4 arguments, got ${args.length}.`);
  if (!args.length)
    return { [CsssName]: "none" };
  args = args.map((a, i) => {
    if (a = INTERPRETER(a))
      return a;
    throw BadArgument(CsssName, args, i, INTERPRETER.name);
  });
  return args.length === 1 ? { [CssName]: args[0] } :
    {
      [CssName + "-block"]: args[2] != null && args[2] != args[0] ? args[0] + " " + args[2] : args[0],
      [CssName + "-inline"]: args[3] != null && args[3] != args[1] ? (args[1] ?? args[0]) + " " + args[3] : args[1] ?? args[0],
    };
}

const scrollSnapAlign = {
  snapStart: "start",
  snapStartCenter: "start center",
  snapStartEnd: "start end",
  snapCenter: "center",
  snapCenterStart: "center start",
  snapCenterEnd: "center end",
  snapEnd: "end",
  snapEndStart: "end start",
  snapEndCenter: "end center",
  snapNone: "none",
};
const scrollSnapStop = {
  snapAlways: "always",
  snapNormal: "normal",
};
const DefaultBoxItem = {
  scrollMargin: "unset",
  scrollSnapAlign: "unset",
  scrollSnapStop: "unset",
};
const scrollMarginProps = {
  scrollMargin: undefined,
  scrollMarginBlock: undefined,
  scrollMarginInline: undefined,
  scrollMarginBlockStart: undefined,
  scrollMarginInlineStart: undefined,
  scrollMarginBlockEnd: undefined,
  scrollMarginInlineEnd: undefined,
  scrollMarginTop: undefined,
  scrollMarginRight: undefined,
  scrollMarginBottom: undefined,
  scrollMarginLeft: undefined,
};
const BoxItemProps = {
  ...scrollMarginProps,
  scrollSnapAlign: undefined,
  scrollSnapStop: undefined,
};

const boxItem = TypeBasedFunction(
  LogicalFour("scrollMargin", "scroll-margin", LengthPercent),
  SingleTable("scroll-snap-align", scrollSnapAlign),
  SingleTable("scroll-snap-stop", scrollSnapStop)
);
const BoxItem = FunctionWithDefaultValues(DefaultBoxItem, boxItem);

export const csss = { ...BoxItemProps, boxItem, BoxItem };

const LogicalFourReverse = (CssPrevix, CsssFnName, INTERPRETER, DEFAULT = "_") => {
  const PROPS = ["-block-start", "-inline-start", "-block-end", "-inline-end"].map(s => CssPrevix + s);
  return style => {
    let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
    if (args[1] === args[3] && (args.pop() || true))
      if (args[0] === args[2] && (args.pop() || true))
        if (args[0] === args[1] && (args.pop() || true))
          ;
    return `${CsssFnName}(${args.join(",")})`;
  }
};

const SingleTableReverse = (CssProp, Table) => {
  Table = Object.fromEntries(Object.entries(Table).map(([k, v]) => [v, k]));
  return style => Table[style[CssProp]];
};

const Optional = (CsssName, ...Fns) => style => {
  let args;
  for (let fn of Fns)
    if ((fn = fn(style)) !== undefined)
      (args ??= []).push(fn);
  return args && `${CsssName}(${args.join(",")})`;
}

export const css = {
  boxItem: Optional("boxItem",
    LogicalFourReverse("scroll-margin", "scrollMargin", v => v, "_"),
    SingleTableReverse("scroll-snap-align", scrollSnapAlign),
    SingleTableReverse("scroll-snap-stop", scrollSnapStop),
  ),
}

// const DIR = ["BlockStart", "InlineStart", "BlockEnd", "InlineEnd"];
// const kebabCase = s => s.replaceAll(/([A-Z])/g, "-$1").toLowerCase();

// const padding = DIR.map(s => kebabCase("padding" + s));
// const borderColor = DIR.map(s => kebabCase("border" + s + "Color"));

// const inlineSize = ["minInlineSize", "inlineSize", "maxInlineSize"].map(kebabCase);
// const blockSize = ["minBlockSize", "blockSize", "maxBlockSize"].map(kebabCase);

// const SequenceToShort = (NAME, INTERPRETER) => (style, PROPS) =>
//   `${NAME}(${PROPS.map(p => style[p]).filter(v => v == null).map(INTERPRETER).join(",")})`;

// const PropsToOneThree = (NAME, INTERPRETER) => (style, PROPS) => {
//   if (PROPS.every(p => style[p] === undefined))
//     return;
//   const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
//   return `${NAME}(${args[0] === "_" && args[2] === "_" ? args[1] : args.join(",")})`;
// }

// const TmpInterpreter = v => v;

// const WordsInReverse = (DICT, INTERPRETER) => {
//   const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
//   return (style, [prop]) => _DICT[style[prop]] ?? INTERPRETER(style[prop]);
// }

// const WordsInReverseSpaceMerge = (DICT, INTERPRETER) => {
//   const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
//   return (style, PROPS) => _DICT[PROPS.map(p => INTERPRETER(style[p])).join(" ")];
// }

// const LogicalFourToShort = (NAME, INTERPRETER) => {
//   return (style, PROPS) => {
//     if (PROPS.every(p => style[p] === undefined))
//       return;
//     const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
//     if (args[1] !== args[3])
//       return `${NAME}(${args.join(",")})`;
//     args.pop();
//     if (args[0] !== args[2])
//       return `${NAME}(${args.join(",")})`;
//     args.pop();
//     if (args[0] !== args[1])
//       return `${NAME}(${args.join(",")})`;
//     args.pop();
//     return `${NAME}(${args[0]})`;
//   }
// };

// const Optional = (ARGS, POST) => style => {
//   let args;
//   for (let [props, fn] of ARGS)
//     if (props.some(p => style[p] !== undefined))
//       (args ??= []).push(fn(style, props));
//   return args && POST(args);
// }

// const _box = Optional([
//   [["scroll-snap-type"], WordsInReverse(BOX.scrollSnapType, TmpInterpreter)],
//   [["overflow-inline", "overflow-block"], WordsInReverseSpaceMerge(BOX.overflow, TmpInterpreter)],
//   [["minInlineSize", "inlineSize", "maxInlineSize"], PropsToOneThree("inline", TmpInterpreter)],
//   [["minBlockSize", "blockSize", "maxBlockSize"], PropsToOneThree("block", TmpInterpreter)],
//   [DIR.map(s => kebabCase("scrollPadding" + s)), LogicalFourToShort("scrollPadding", TmpInterpreter)],
// ],
//   args => `$box(${args.join(",")})`);

// const reversals = {
//   box: _box,
// }

// function reverse(style, reversals) {
//   debugger
//   const shorts = Object.values(reversals).map(rev => rev(style)).filter(Boolean);
// }

// const tst = {
//   "scroll-snap-type": "both mandatory",
//   "scroll-padding-block-start": "1em",
//   "scroll-padding-block-end": "1em",
//   "scroll-padding-inline-start": "2em",
//   "scroll-padding-inline-end": "2em"
// };

// reverse(tst, reversals);
