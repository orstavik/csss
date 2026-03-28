import { ValueTypes, FunctionTypes, BadArgument } from "./func.js";
const { LogicalFour, FunctionBasedOnValueTypes, FunctionWithDefaultValues, SequentialFunction, SingleArgumentFunction, ParseFirstThenRest, TypeBasedFunction } = FunctionTypes;
const { Angle, Color, Length, Name, NumberInterpreter, Fraction, Integer, Quote, Percent, Time, Unset, Url, Word, Basic, Radian, Repeat, Span, AnglePercent, LengthUnset, LengthPercent, LengthPercentUnset, LengthPercentNumber, NameUnset, NumberPercent, UrlUnset, ColorUrl, ColorPrimitive, RepeatBasic, SpanBasic, AbsoluteUrl, CamelWords, WordToValue, } = ValueTypes;


// const DEFAULTS = {
//   ...scrollSnapAlign.DEFAULTS,
//   ...scrollMargin.DEFAULTS,
//   ...scrollSnapStop.DEFAULTS,
// };
// //reverse need all the properties and then all the functions to reverse them. and each of the inner functions, they require the properties for that inner function.
// // const boxItem = TypeBasedFunction2(scrollMargin, scrollSnapAlign, scrollSnapStop);
// const BoxItem = FunctionWithDefaultValues2(DEFAULTS, boxItem);
// const boxItemReverse = Optional(scrollSnapStop, scrollSnapAlign, scrollMargin,
//   args => `$boxItem(${args.join(",")})`);

// export default {
//   DEFAULTS:
//     box,
//   boxItem,
//   Box: FunctionWithDefaultValues(DefaultBox, box),
//   BoxItem: FunctionWithDefaultValues(DefaultBoxItem, boxItem),
// };

// const DIR = ["BlockStart", "InlineStart", "BlockEnd", "InlineEnd"];
// const kebabCase = s => s.replaceAll(/([A-Z])/g, "-$1").toLowerCase();

// // const padding = DIR.map(s => kebabCase("padding" + s));
// // const borderColor = DIR.map(s => kebabCase("border" + s + "Color"));

// // const inlineSize = ["minInlineSize", "inlineSize", "maxInlineSize"].map(kebabCase);
// // const blockSize = ["minBlockSize", "blockSize", "maxBlockSize"].map(kebabCase);

// // const SequenceToShort = (NAME, INTERPRETER) => (style, PROPS) =>
// //   `${NAME}(${PROPS.map(p => style[p]).filter(v => v == null).map(INTERPRETER).join(",")})`;

// // const PropsToOneThree = (NAME, INTERPRETER) => (style, PROPS) => {
// //   if (PROPS.every(p => style[p] === undefined))
// //     return;
// //   const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
// //   return `${NAME}(${args[0] === "_" && args[2] === "_" ? args[1] : args.join(",")})`;
// // }

// const WordsInReverse = (DICT, INTERPRETER) => {
//   const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
//   return (style, [prop]) => _DICT[style[prop]] ?? INTERPRETER(style[prop]);
// }

// const WordsInReverseSpaceMerge = (DICT, INTERPRETER) => {
//   const _DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));
//   return (style, PROPS) => _DICT[PROPS.map(p => INTERPRETER(style[p])).join(" ")];
// }

// const _box = Optional([
//   [["scroll-snap-type"], WordsInReverse(BOX.scrollSnapType, TmpInterpreter)],
//   [["overflow-inline", "overflow-block"], WordsInReverseSpaceMerge(BOX.overflow, TmpInterpreter)],
//   [["minInlineSize", "inlineSize", "maxInlineSize"], PropsToOneThree("inline", TmpInterpreter)],
//   [["minBlockSize", "blockSize", "maxBlockSize"], PropsToOneThree("block", TmpInterpreter)],
//   [DIR.map(s => kebabCase("scrollPadding" + s)), LogicalFourToShort("scrollPadding", TmpInterpreter)],
// ],
//   args => `$box(${args.join(",")})`);

// // const reversals = {
// //   box: _box,
// // }

// // function reverse(style, reversals) {
// //   const shorts = Object.values(reversals).map(rev => rev(style)).filter(Boolean);
// // }

// // const tst = {
// //   "scroll-snap-type": "both mandatory",
// //   "scroll-padding-block-start": "1em",
// //   "scroll-padding-block-end": "1em",
// //   "scroll-padding-inline-start": "2em",
// //   "scroll-padding-inline-end": "2em"
// // };

// // reverse(tst, reversals);

// const boxItem = {
//   csss: TypeBasedFunction2,
//   css: Optional(scrollSnapStop, scrollSnapAlign, scrollMargin,
//     args => `$boxItem(${args.join(",")})`),
//   ARGS: { scrollSnapAlign, scrollMargin, scrollSnapStop },
// }


function extractCsssSpec(specs) {
  const Functions = [], Words = {};
  for (let { csssName, csss } of specs) {
    if (typeof csss === "function")
      Functions.push([csssName, csss]);
    else
      for (let [word, value] of Object.entries(csss))
        Words[word] = { [csssName]: value };
  }
  return { Functions, Words };
}
const TypeBasedFunction2 = Spec => {
  const { Functions, Words } = extractCsssSpec(Spec.ARGS);
  return ({ args, name }) => {
    const res = {};
    main: for (let i = 0; i < args.length; i++) {
      if (args[i].text in Words) {
        Object.assign(res, Words[args[i].text]);
        continue;
      }
      for (let [prop, fn] of Functions) {
        const v = fn(args[i]);
        if (v === undefined) continue;
        typeof v === "string" ? res[prop] = v : Object.assign(res, v);
        continue main;
      }
      throw BadArgument(name, args, i);
    }
    return res;
  };
};

const LogicalFour2Post = NAME => ar => ar.length === 1 ? { [NAME]: ar[0] } :
  {
    [NAME + "Block"]: ar[2] != null && ar[2] != ar[0] ? ar[0] + " " + ar[2] : ar[0],
    [NAME + "Inline"]: ar[3] != null && ar[3] != ar[1] ? (ar[1] ?? ar[0]) + " " + ar[3] : ar[1] ?? ar[0],
  };

const LogicalFour2 = ({ csssName, ARGS }) => {
  const Interpreters = Object.values(ARGS).map(s => s.csss);
  const INTERPRETER = Interpreters.length === 1 ? Interpreters[0] :
    x => Interpreters.find(i => i(x)); //todo might return nullish? that is bad..
  return ({ args }) => {
    if (args.length > 4)
      throw new SyntaxError(`${csssName}() takes max 4 arguments, got ${args.length}.`);
    if (!args.length)
      return ["none"];
    return args.map((a, i) => {
      if (a = INTERPRETER(a))
        return a;
      throw BadArgument(csssName, args, i, INTERPRETER.name);
    });
  }
};

const LogicalFourToShort = ({ ARGS, PROPS }) => {
  PROPS = Object.keys(PROPS).filter(p => p.includes("Start") || p.includes("End"));
  const Interpreters = Object.values(ARGS).map(s => s.css);
  const INTERPRETER = Interpreters.length === 1 ? Interpreters[0] :
    x => Interpreters.find(i => i(x)); //todo might return nullish? that is bad..
  return style => {
    const args = PROPS.map(p => style[p] ? INTERPRETER(style[p]) : "_");
    if (args[1] !== args[3])
      return args;
    args.pop();
    if (args[0] !== args[2])
      return args;
    args.pop();
    if (args[0] !== args[1])
      return args;
    args.pop();
    return args;
  }
};

const Optional = (ARGS, POST) => style => {
  let args;
  for (let [props, fn] of ARGS)
    if (props.some(p => style[p] !== undefined))
      (args ??= []).push(fn(style, props));
  return args && POST(args);
}


class Spec {
  constructor({ csssName, ARGS, PROPS, DEFAULT, csss, css, csssPost, cssPost }) {
    if (!csssName) throw new Error("Spec must have a name");
    if (!csss || (typeof csss !== "function" && typeof csss !== "object"))
      throw new Error("Spec must have a csss function or dictionary");
    if (!css && typeof csss !== "function")
      css = Object.fromEntries(Object.entries(csss).map(([k, v]) => [v, k]));
    if (!css) throw new Error("Spec must have a css function or a csss dictionary to derive it from");
    if (csssPost && typeof csssPost !== "function") throw new Error("csssPost must be undefined or a function");
    if (cssPost && typeof cssPost !== "function") throw new Error("cssPost must be undefined or a function");
    if (!ARGS) ARGS = {};
    if (PROPS && typeof PROPS !== "object") throw new Error("PROPS must be undefined or an object");
    if (DEFAULT && typeof DEFAULT !== "object") throw new Error("DEFAULT must be undefined or an object");
    this.csssName = csssName;
    this.ARGS = Object.entries(ARGS)?.map(([key, value]) => new Spec({ csssName: key, ...value })) ?? {};
    this.PROPS = PROPS ?? this.ARGS.reduce((acc, v) => ({ ...acc, ...v.PROPS }), {});
    this.DEFAULT = DEFAULT ?? Object.fromEntries(Object.entries(this.PROPS).filter(([_, v]) => v !== undefined));
    csss = typeof csss === "function" ? csss(this) : csss; //i need to convert the thing on setup so that it will 
    css = typeof css === "function" ? css(this) : css;
    this.csss = csssPost ? x => csssPost(csss(x)) : csss;
    this.css = cssPost ? style => cssPost(css(style)) : css;
    Object.freeze(this);
  }
}
const FunctionString = (name, args) => `${name}(${args.join(",")})`;

const scrollSnapAlign = {
  csss: {
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
  },
  PROPS: {
    scrollSnapAlign: "unset",
  },
};
const scrollMargin = {
  csssName: "scrollMargin",
  csss: LogicalFour2,
  csssPost: LogicalFour2Post,  // csss = csss(ARGS) , post = post(csssName), => post(csss(x))
  css: LogicalFourToShort,  //gets the (PROPS, ARGS) => style =>
  cssPost: FunctionString,
  PROPS: {
    scrollMargin: "unset",
    scrollMarginBlock: "unset",
    scrollMarginInline: "unset",
    scrollMarginBlockStart: "unset",
    scrollMarginInlineStart: "unset",
    scrollMarginBlockEnd: "unset",
    scrollMarginInlineEnd: "unset",
    scrollMarginTop: undefined,
    scrollMarginRight: undefined,
    scrollMarginBottom: undefined,
    scrollMarginLeft: undefined,
  },
  ARGS: {
    LengthPercent: {
      csss: () => LengthPercent,
      css: () => v => v, //tmp
    }
  },
};
const scrollSnapStop = {
  csss: {
    snapAlways: "always",
    snapNormal: "normal",
  },
  PROPS: {
    scrollSnapStop: "unset",
  },
};

const boxItem2 = {
  csssName: "boxItem",
  csss: TypeBasedFunction2,
  css: Optional,
  cssPost: FunctionString,
  ARGS: { scrollSnapAlign, scrollMargin, scrollSnapStop },
};

export const boxItem = new Spec(boxItem2); 