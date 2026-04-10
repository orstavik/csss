import { CsssPrimitives, CsssFunctions } from "./func2.js";
const { NumberPercent, Length, Angle, LengthPercent, AnglePercent, NumberInterpreter, SingleFunctionFunction } = CsssPrimitives;
const { SF2 } = CsssFunctions;

const Scale = ({ name, args }) => {
  if (name !== "scale") return;
  if (!args.length || args.length > 3) throw new SyntaxError(`scale() takes 1-3 arguments, got ${args.length}.`);
  if (args.length === 1 && args[0].text === "none") return "none";
  return args.map((a, i) => {
    const v = NumberPercent(a);
    if (v != null) return v;
    throw BadArgument("scale", i, args);
  });
}

const Rotate = ({ name, args }) => {
  if (name !== "rotate") return;
  if (!args.length || args.length > 4) throw new SyntaxError(`rotate() takes 1-4 arguments, got ${args.length}.`);
  if (args.length === 1 && args[0].text === "none") return "none";
  return args.map((a, i) => {
    const Interpreter = i === args.length - 1 ? Angle : NumberInterpreter;
    const v = Interpreter(a);
    if (v != null) return v;
    throw BadArgument("rotate", i, args, "Expected " + Interpreter.name);
  });
}

const Translate = ({ name, args }) => {
  if (name !== "translate") return;
  if (!args.length || args.length > 3) throw new SyntaxError(`translate() takes 1-3 arguments, got ${args.length}.`);
  if (args.length === 1 && args[0].text === "none") return "none";
  return args.map((a, i) => {
    const v = LengthPercent(a);
    if (v != null) return v;
    throw BadArgument("translate", i, args, "Expected length or percentage");
  });
}

const Matrix = ({ name, args }) => {
  if (name !== "matrix") return;
  if (args.length !== 6 && args.length !== 16)
    throw new SyntaxError(`matrix() takes exactly 6 or 16 arguments, got ${args.length}.`);
  const CssName = args.length === 6 ? "matrix" : "matrix3d";
  return `${CssName}(${args.map((a, i) => {
    const v = NumberInterpreter(a);
    if (v != null) return v;
    throw BadArgument("matrix", i, args, "Expected a number.");
  }).join(", ")})`;
}

const Perspective = SingleFunctionFunction("perspective", Length);
const Skew = SF2("skew/1-2", [AnglePercent]);

const transform = ({ name, args }) => {
  if (name !== "transform") return;
  if (!args.length) return { transform: "none" };
  const Interpreters = [Matrix, Skew, Perspective, Translate, Scale, Rotate];
  const ar = args.map((a, i) => {
    for (const cb of Interpreters) {
      const v = cb(a);
      if (v != null) {
        return v;
      }
    }
    throw BadArgument("transform", i, args, "Expected a transform function.");
  });
  return { transform: ar.join(" ") };
};

export default {
  props: { transform: undefined, translate: undefined, scale: undefined, rotate: undefined },
  csss: {
    transform,
    translate: a => (a = Translate(a)) && { translate: a.join(" ") },
    scale: a => (a = Scale(a)) && { scale: a.join(" ") },
    rotate: a => (a = Rotate(a)) && { rotate: a.join(" ") },
  },
  css: {
    transform: style => {
      if (!style.transform) return undefined;
      if (style.transform === "none") return "transform()";
      let val = style.transform.replace(/\) /g, "),");
      val = val.replace(/([a-zA-Z]+\()([^)]+)(\))/g, (_, start, inner, end) => start + inner.replace(/,\s*/g, ",").replace(/\s+/g, ",") + end);
      return `transform(${val})`;
    },
    translate: style => style.translate ? `translate(${style.translate.replace(/\s+/g, ",")})` : undefined,
    scale: style => style.scale ? `scale(${style.scale.replace(/\s+/g, ",")})` : undefined,
    rotate: style => style.rotate ? `rotate(${style.rotate.replace(/\s+/g, ",")})` : undefined,
  },
};