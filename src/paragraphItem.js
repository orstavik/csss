import { CsssFunctions } from "./func.js";
import { CssFunctions } from "./funcReverse.js";
const { TypeBasedFunction, CssValuesToCsssTable, SingleTable } = CsssFunctions;
const { SingleTableReverse } = CssFunctions;

const verticalAlign = CssValuesToCsssTable("baseline|sub|super|text-top|text-bottom|middle|top|bottom");
const verticalAlignReverse = SingleTableReverse("verticalAlign", verticalAlign);

const paragraphItem = TypeBasedFunction(SingleTable("verticalAlign", verticalAlign));

export default {
  csss: { paragraphItem, },
  props: { verticalAlign: undefined, },
  css: {
    paragraphItem: style => {
      const x = verticalAlignReverse(style);
      return x && `$paragraphItem(${x})`;
    }
  }
};