import { CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, CssValuesToCsssTable, SingleTable } = CsssFunctions;
const { Optional, SingleTableReverse, DisplayMode, normalizeToLogical } = CssFunctions;

const verticalAlign = CssValuesToCsssTable("baseline|sub|super|text-top|text-bottom|middle|top|bottom");

const paragraphItem = TypeBasedFunction(SingleTable("verticalAlign", verticalAlign));

export default {
  csss: { paragraphItem, },
  props: { display: undefined, verticalAlign: undefined, },
  css: {
    paragraphItem: style => {
      const rev = SingleTableReverse("verticalAlign", verticalAlign)(style);
      return rev ? `$paragraphItem(${rev})` : undefined;
    },
  }
};
