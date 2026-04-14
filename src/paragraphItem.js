import { CsssFunctions, CssFunctions } from "./func.js";
const { TypeBasedFunction, CssValuesToCsssTable, SingleTable } = CsssFunctions;
const { Optional, SingleTableReverse } = CssFunctions;

const verticalAlign = CssValuesToCsssTable("baseline|sub|super|text-top|text-bottom|middle|top|bottom");

const paragraphItem = TypeBasedFunction(SingleTable("verticalAlign", verticalAlign));

export default {
  csss: { paragraphItem, },
  props: { verticalAlign: undefined, },
  css: { paragraphItem: Optional("paragraphItem", SingleTableReverse("verticalAlign", verticalAlign)), }
};
