import { CsssPrimitives } from "./func.js";
import { AbsoluteColorVector } from "./funcColor.js";
const { Name } = CsssPrimitives;

function Palette({ name, args }) {
  if (name !== "Palette") return;
  if (args.length !== 2) throw new SyntaxError(`Palette() takes exactly 2 arguments, got ${args.length}.`);
  const n = Name(args[0]);
  if (!n) throw new SyntaxError("First argument of Palette() must be a name.");
  const vector = AbsoluteColorVector(args[1]);
  if (!vector) throw new SyntaxError("Second argument of Palette() must be an AbsoluteColor vector.");
  return Object.fromEntries(vector.map((color, i) =>
    [i ? `--color-${n}-${i}` : `--color-${n}`, color]));
}

export default {
  Palette,
};