const scrollSnapAlign = new CsssSinglePropertyWord({
  property: "scrollSnapAlign",
  csssToCss: {
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
});

const scrollSnapStop = new CsssSinglePropertyWord({
  property: "scrollSnapStop",
  csssToCss: {
    snapAlways: "always",
    snapNormal: "normal",
  },
});

const LogicalFour3 = prefix => ({ csssName, ARGS }) => 1;//then it makes the interpreter and then returns a x => fnuction {
import { FunctionTypes } from "./func.js";
const { LogicalFour } = FunctionTypes;

const scrollMargin2 = CsssWrapper({
  csssSig: "scrollMargin/0-4",
  csss: LogicalFour("scrollMargin", "0", [None, Length, Percent]),
  csssDefault: { scrollMargin: "unset" },
});
const scrollMargin = new CsssFunction({
  csssSig: "scrollMargin/0-4",
  csss: LogicalFour("scrollMargin", "0", [None, Length, Percent]),
  csssDefault: { scrollMargin: "unset" },

  css: LogicalFourToShort,    //style => args
  cssPost: FunctionString,    //args => string
  PROPS: {
    scrollMargin: "unset",
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
  },
  ARGS: [LengthPercent2],
});

export const boxItem = new CsssFunction({
  csssName: "boxItem",
  csss: TypeBasedFunction2,
  css: Optional,
  cssPost: FunctionString,
  ARGS: [scrollSnapAlign, scrollMargin, scrollSnapStop],
});