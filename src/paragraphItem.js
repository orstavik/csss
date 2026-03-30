import { CsssPrimitives, CsssFunctions, CssFunctions } from "./func2.js";
const { LengthPercent, LengthPercentNumber } = CsssPrimitives;
const { TypeBasedFunction, SingleArgumentFunction, FunctionWithDefaultValues, ParseFirstThenRest, CssValuesToCsssTable, SingleTable } = CsssFunctions;
const { SingleArgumentFunctionReverse, Optional, SingleTableReverse, SingleTableReverseObject } = CssFunctions;

const verticalAlign = CssValuesToCsssTable("baseline|sub|super|text-top|text-bottom|middle|top|bottom");

const paragraphItem = TypeBasedFunction(SingleTable("verticalAlign", verticalAlign));

export default {
  csss: { paragraphItem, },
  props: { verticalAlign: undefined, },
  css: { paragraphItem: Optional("paragraphItem", SingleTableReverse("verticalAlign", verticalAlign)), }
};
