import { interpretColor, interpretLength } from "./func.js";

function _boxShadow(ar) {
  let color, a2;
  const res = [];
  for (let a of ar) {
    if (a.text == "none")
      res.push("none");
    else if (a2 = interpretColor(a))
      color = a2.text;
    else if (a2 = interpretLength(a))
      res.push(a2.text);
    else
      throw new SyntaxError(`Could not interpret $boxShadow argument: ${a.text}.`);
  }
  if (res.length < 2 || res.length > 4)
    throw new SyntaxError(`$boxShadow requires two, three, or four length arguments.`);
  color && res.push(color);
  return res.join(" ");
}

function boxShadow(ar) {
  return { boxShadow: _boxShadow(ar) };
}

function boxShadowInset(ar) {
  return { boxShadow: "inset " + _boxShadow(ar) };
}

export default {
  boxShadow,
  boxShadowInset,
}