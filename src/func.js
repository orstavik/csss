export const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ch|ex|%/.source;
export const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
export const NUM = `(${N})(?:\\/(${N}))?`; //num frac allows for -.5e+0/-122.5e-12

export function toLogicalFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  if (ar.length === 2)
    return {
      [NAME + "-block"]: ar[0],
      [NAME + "-inline"]: ar[1],
    };
  if (ar.length === 3)
    return {
      [NAME + "-block-start"]: ar[0],
      [NAME + "-inline"]: ar[1],
      [NAME + "-block-end"]: ar[2],
    };
  return {
    [NAME + "-block-start"]: ar[0],
    [NAME + "-inline-start"]: ar[1],
    [NAME + "-block-end"]: ar[2],
    [NAME + "-inline-end"]: ar[3]
  };
}
//todo there are different ways to do the logic here..
//todo length == 2, I think that we could have top/bottom too
//todo length == 3, then the third becomes all the inline ones
//todo length === 4, then forth is the inline on the end side
function toLogicalEight(NAME, DEFAULT, ...args) {
  if (!(args instanceof Array))
    return { [NAME]: args };
  if (args.length === 1)
    return { [NAME]: args[0] };
  let [bss, iss, bes, ies, bse, ise, bee, iee] = args;
  if (args.length === 2) ise = ies = iee = iss, bse = bes = bee = bss;
  if (args.length === 3) ise = ies = iee = iss, bse = bss, bee = bes;
  if (args.length === 4) ise = iss, iee = ies, bse = bss, bee = bes;
  if (args.length === 5) ise = iss, iee = ies, bee = bes;
  if (args.length === 6) iee = ies, bee = bes;
  if (args.length === 7) iee = ies;
  const res = {};
  if (bss || iss) res[NAME + "-top-left"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
  if (bse || ies) res[NAME + "-top-right"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
  if (bes || ise) res[NAME + "-bottom-left"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
  if (bee || iee) res[NAME + "-bottom-right"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
  return res;
}

function borderSwitch(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => {
    const [wsr, ...dirs] = k.split("-");
    return [["border", ...dirs, wsr].join("-"), v];
  }));
}

//enables us to write a min and max eiter as 2px:5px or max(2px,5px)
//$w(50%)
//$w(1,2) not allowed, only 1 or 3 arguments.
//$w(30em:35%,50%,60cm:80vw:100%)
//$w(max(30em,35%),50%,min(60cm,80vw,100%))
// const Size1 = NAME => P(NAME, ListOf(null, PositiveSize));
// const Size3 = NAME => Merge(ListOf(null,
//   P(`min-${NAME}`, ColonFunction("max", ",", PositiveSize)),
//   P(NAME, PositiveSize),
//   P(`max-${NAME}`, ColonFunction("min", ",", PositiveSize))
// ));
// const Size = NAME => Either(Size1(NAME), Size3(NAME));
// const w = Size("inline-size");
// const h = Size("block-size");

function colonSplit2(NAME, SEP, x) {
  if (x == null) return x;
  const res = x.split(":");
  return res.length == 1 ? res[0] :
    `${NAME}(${res.join(SEP)})`;
}

export function mergy(...res) {
  res = res.filter(a => a != null);
  for (const value of res)
    if (typeof value !== "object")
      throw new SyntaxError("unrecognized value: " + value);
  const keys = res.map(o => Object.keys(o).map(k => k.split("-")[0]));
  const test = new Set(keys.shift());
  for (const ks of keys)
    for (const k of ks)
      if (test.has(k))
        throw new SyntaxError(`Property crash: ${k}`);
  return Object.assign(...res);
}

export function defaultValues(Defaults, res) {
  for (let k in Defaults)
    if (k in res || Object.keys(res).some(k2 => k2.startsWith(k + "-")))
      delete Defaults[k];
  return Object.assign(Defaults, res);
}

function toSize(NAME, ...args) {
  args = args.map(a => a?.replace(/^(min|max)$/, "$&-content"));
  if (args.length === 1)
    return { [NAME]: args[0] };
  if (args.length === 3)
    return {
      [`min-${NAME}`]: colonSplit2("max", ",", args[0]),
      [NAME]: args[1],
      [`max-${NAME}`]: colonSplit2("min", ",", args[2])
    };
  throw new SyntaxError(`$${NAME} accepts only 1 or 3 arguments: ${args}`);
}

function isLength(x) {
  if (x === "0") return x;
  const m = x.match?.(new RegExp(`^(${NUM})(${LENGTHS_PER})$`));
  if (!m) return;
  let [, , n, frac, unit] = m;
  return frac ? (Number(n) / Number(frac)) + unit :
    x;
}

function border(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    if (a.match(/thin|medium|thick/)) return { width: a };
    const width = isLength(a);
    if (width != null) return ({ width });
    if (a.match(/solid|dotted|dashed|double|none/)) return { style: a };
    return a;
  });
  let res = mergy(...args);
  res = defaultValues({ style: "solid" }, res)
  return borderSwitch(res);
}

border.scope = {
  width: toLogicalFour.bind(null, "width"),
  w: toLogicalFour.bind(null, "width"),
  style: toLogicalFour.bind(null, "style"),
  s: toLogicalFour.bind(null, "style"),
  radius: toLogicalEight.bind(null, "radius", 0),
  r: toLogicalEight.bind(null, "radius", 0),
};

const NativeCssFunctions = (function () {
  function nativeCssFunction(...args) {
    args = args.map(a => a.replaceAll?.("_", " ") ?? a);
    return `${this.name}(${args.join(",")})`;
  }
  return Object.fromEntries([
    "attr", "url", "image-set", "env", "path",
    "calc", "min", "max", "clamp",
    "linear-gradient", "repeating-linear-gradient", "radial-gradient", "repeating-radial-gradient", "conic-gradient", "repeating-conic-gradient",
    "matrix", "matrix3d", "translate", "translate3d", "scale", "scale3d", "rotate", "rotate3d", "skew",
    "blur", "brightness", "contrast", "drop-shadow", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia",
    "translate-x", "translate-y", "translate-z", "scale-x", "scale-y", "scale-z", "rotate-x", "rotate-y", "rotate-z", "skew-x", "skew-y",
  ].map(k => [k, nativeCssFunction]));
})();

const NativeColorsFunctions = (function () {
  function nativeCssColorFunction(...args) {
    if (args.length < 3 || args.length > 5)
      throw new SyntaxError(`rgb accepts 3 to 5 arguments: ${args}`);
    let name = this.name;
    const SEP = name.match(/^(rgba?|hsla?)$/) ? "," : " ";
    if (args.length === 3 && name === "rgb" || name === "hsl")
      return `${name}(${args.join(SEP)})`;
    if (args.length === 5)
      return `${name}(from ${args.slice(0, 4).join(" ")} / ${args[4]})`;
    if (CSS.supports("color", args[0]))
      return `${name}(from ${args[0]} ${args.slice(1).join(" ")})`;
    name = name.replace(/^(rgb|hsl)(?!a)$/, '$1a');
    return `${name}(${args.slice(0, 3).join(SEP)} / ${args[3]})`;
  }
  function nativeCssColorSpaceFunction(...args) {
    if (args.length < 3 || args.length > 5)
      throw new SyntaxError(`color() accepts only 3 to 5 arguments: ${args}`);
    const from_ = CSS.supports("color", args[0]) ? `from ${args.shift()}` : "";
    const _alpha = args.length == 4 ? ` / ${args.pop()}` : "";
    return `${this.name}(${from_}${args.join(" ")}${_alpha})`;
  }
  function nativeCssColorMixFunction(method, ...args) {
    method = "in " + method.replaceAll("_", " "); //we don't support _ in --var-names
    let res = args.shift();
    while (args.length)
      res += (CSS.supports("color", a) ? ", " : " ") + args.shift();
    return `color-mix(in ${method}, ${res})`;
  }

  const res = Object.fromEntries([
    "rgb", "hsl", "rgba", "hsla", "hwb", "lab", "lch", "oklab", "oklch"
  ].map(k => [k, nativeCssColorFunction]));
  res.color = nativeCssColorSpaceFunction;
  res["color-mix"] = nativeCssColorMixFunction;
  return res;
})();

const NativeCssFunctionsIdentity = (function () {
  function nativeCssFunctionIdent(x) {
    const args = x.args.map((a, i) => (typeof a == "string" && i) ? a.replaceAll("_", " ") : a);
    return `${x.name}(${args.join(",")})`;
  }
  return Object.fromEntries([
    "var", "counter", "counters", "element", "paint"
  ].map(k => [k, nativeCssFunctionIdent]));
})();

const NativeCssProperties = (function () {
  const style = document.createElement('div').style;
  const nativeProps = Object.getOwnPropertyNames(style)
    .map(p => p.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^ms-/, '-ms-'))
    .map(k => [k, x => ({ [k]: x })]);
  return Object.fromEntries(nativeProps);
})();

export default {
  ...NativeCssProperties,
  ...NativeCssFunctions,
  ...NativeColorsFunctions,
  ...NativeCssFunctionsIdentity,
  border,
  w: (...args) => toSize("inline-size", ...args),
  h: (...args) => toSize("block-size", ...args),
}