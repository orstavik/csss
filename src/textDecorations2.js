import { isColor, isLength } from "./func.js";

export const TYP = (singles, sets, post) => {
  singles = Object.entries(singles);
  sets = Object.entries(sets);
  return ({args, name}) => {
    const resOnes = {}, resMany = {};
    main: for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (singles)
        for (let [k, v] of singles) {
          if (k in resOnes)
            continue;
          const a2 = v(a);
          if (a2) {
            resOnes[k] = a2;
            continue main;
          }
        }
      if (sets)
        for (let [k, v] of sets) {
          const a2 = v(a);
          if (a2) {
            (resMany[k] ??= []).push(a2);
            continue main;
          }
        }
      throw new SyntaxError(`Bad argument ${name}/${i + 1}.
${name}(${args.slice(0, i).map(a => a.text).join(",")}, => ${args[i].text} <=, ${args.slice(i + 1).map(a => a.text).join(",")}).`);
    }
    return post(resOnes, resMany);
  };
};

const TextDecorationSingles = {
  color: isColor,
  thick: isLength,
  style: a => /^(solid|dashed|dotted|double|wavy|blink|grammarError|spellingError)$/.test(a.text) && a,
  textDecorationSkipInk: a => a.text === "noSkipInk" && { text: "none" },
};
const TextDecorationLines = {
  lines: a => ({
    over: { text: "overline" },
    under: { text: "underline" },
    through: { text: "line-through" }
  }[a.text]),
};

const textDecorationUmbrella = (singles, lists) => {
  let { style, color, thick, textDecorationSkipInk } = singles;
  textDecorationSkipInk = textDecorationSkipInk?.text ?? "auto";
  const lines = lists.lines && new Set(lists.lines);
  const textDecoration = [style, ...lines, color, thick].filter(Boolean).map(a => a.text).join(" ") ?? "solid";
  return { textDecoration, textDecorationSkipInk };
};

export default {
  textDecorationColor: undefined,
  textDecorationLine: undefined,
  textDecorationSkip: undefined,
  textDecorationSkipInk: undefined,
  textDecorationStyle: undefined,
  textDecorationThickness: undefined,
  textDecoration: TYP(TextDecorationSingles, TextDecorationLines, textDecorationUmbrella),
  noTextDecoration: { textDecoration: "none", textDecorationSkipInk: "auto" },
  textDecorationNone: { textDecoration: "none", textDecorationSkipInk: "auto" },
}