import { extractColor, extractLength } from "./func.js";

function _boxShadow(ar) {
  const color = extractColor(args);
  const res = ar.map(a => {
    const l = extractLength(a) ?? a.text == "none" ? "none" : null;
    if (l)
      return l;
    throw new SyntaxError(`Could not interpret $boxShadow argument: ${a.text}.`);
  });
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