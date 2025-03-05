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

export function borderSwitch(obj) {
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

const NativeCssFunctions = {
  var: (...args) => `var(${args.join(",")})`,
  url: (...args) => `url(${args.join(",")})`,
  calc: (...args) => `calc(${args.join(" ")})`,
  min: (...args) => `min(${args.join(" ")})`,
  max: (...args) => `max(${args.join(" ")})`,
  clamp: (...args) => `clamp(${args.join(" ")})`,
  counter: (...args) => `counter(${args.join(",")})`,
  counters: (...args) => `counters(${args.join(",")})`,
  element: (...args) => `element(${args.join(",")})`,
  paint: (...args) => `paint(${args.join(",")})`,
  env: (...args) => `env(${args.join(",")})`,
  path: (...args) => `path(${args.join(",")})`,
  //todo
  // attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
  // "image-set": (...args) => `image-set(${args.join(",")})`,
};

const NativeCssTransformFunctions = {
  matrix: (...args) => ({ transform: `matrix(${args.join(",")})` }),
  matrix3d: (...args) => ({ transform: `matrix3d(${args.join(",")})` }),
  translate: (...args) => ({ transform: `translate(${args.join(",")})` }),
  translate3d: (...args) => ({ transform: `translate3d(${args.join(",")})` }),
  scale: (...args) => ({ transform: `scale(${args.join(",")})` }),
  scale3d: (...args) => ({ transform: `scale3d(${args.join(",")})` }),
  rotate: (...args) => ({ transform: `rotate(${args.join(",")})` }),
  rotate3d: (...args) => ({ transform: `rotate3d(${args.join(",")})` }),
  skew: (...args) => ({ transform: `skew(${args.join(",")})` }),
  translateX: (...args) => ({ transform: `translateX(${args.join(",")})` }),
  translateY: (...args) => ({ transform: `translateY(${args.join(",")})` }),
  translateZ: (...args) => ({ transform: `translateZ(${args.join(",")})` }),
  scaleX: (...args) => ({ transform: `scaleX(${args.join(",")})` }),
  scaleY: (...args) => ({ transform: `scaleY(${args.join(",")})` }),
  scaleZ: (...args) => ({ transform: `scaleZ(${args.join(",")})` }),
  rotateX: (...args) => ({ transform: `rotateX(${args.join(",")})` }),
  rotateY: (...args) => ({ transform: `rotateY(${args.join(",")})` }),
  rotateZ: (...args) => ({ transform: `rotateZ(${args.join(",")})` }),
  skewX: (...args) => ({ transform: `skewX(${args.join(",")})` }),
  skewY: (...args) => ({ transform: `skewY(${args.join(",")})` }),
  "translate-x": (...args) => ({ transform: `translateX(${args.join(",")})` }),
  "translate-y": (...args) => ({ transform: `translateY(${args.join(",")})` }),
  "translate-z": (...args) => ({ transform: `translateZ(${args.join(",")})` }),
  "scale-x": (...args) => ({ transform: `scaleX(${args.join(",")})` }),
  "scale-y": (...args) => ({ transform: `scaleY(${args.join(",")})` }),
  "scale-z": (...args) => ({ transform: `scaleZ(${args.join(",")})` }),
  "rotate-x": (...args) => ({ transform: `rotateX(${args.join(",")})` }),
  "rotate-y": (...args) => ({ transform: `rotateY(${args.join(",")})` }),
  "rotate-z": (...args) => ({ transform: `rotateZ(${args.join(",")})` }),
  "skew-x": (...args) => ({ transform: `skewX(${args.join(",")})` }),
  "skew-y": (...args) => ({ transform: `skewY(${args.join(",")})` }),
};

const NativeCssFilterFunctions = {
  blur: (...args) => ({ filter: `blur(${args.join(" ")})` }),
  brightness: (...args) => ({ filter: `brightness(${args.join(" ")})` }),
  contrast: (...args) => ({ filter: `contrast(${args.join(" ")})` }),
  grayscale: (...args) => ({ filter: `grayscale(${args.join(" ")})` }),
  invert: (...args) => ({ filter: `invert(${args.join(" ")})` }),
  opacity: (...args) => ({ filter: `opacity(${args.join(" ")})` }),
  saturate: (...args) => ({ filter: `saturate(${args.join(" ")})` }),
  sepia: (...args) => ({ filter: `sepia(${args.join(" ")})` }),
  "drop-shadow": (...args) => ({ filter: `drop-shadow(${args.join(" ")})` }),
  "hue-rotate": (...args) => ({ filter: `hue-rotate(${args.join(" ")})` }),
};

const NativeCssGradientFunctions = {
  "linear-gradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "radial-gradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "conic-gradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "repeating-linear-gradient": (...args) => ({ background: `repeating-linear-gradient(${args.join(",")})` }),
  "repeating-radial-gradient": (...args) => ({ background: `repeating-radial-gradient(${args.join(",")})` }),
  "repeating-conic-gradient": (...args) => ({ background: `repeating-conic-gradient(${args.join(",")})` }),
  "radial": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "conic": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "repeating-linear": (...args) => ({ background: `repeating-linear-gradient(${args.join(",")})` }),
  "repeating-radial": (...args) => ({ background: `repeating-radial-gradient(${args.join(",")})` }),
  "repeating-conic": (...args) => ({ background: `repeating-conic-gradient(${args.join(",")})` }),
  //collides with <transition: linear()>, but <transition: linear()> is limited to transition and animation scope. 
  "linear": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
};

const NativeColorsFunctions = (function () {
  function nativeCssColorFunction(name, ...args) {
    if (args.length < 3 || args.length > 5)
      throw new SyntaxError(`${name} accepts 3 to 5 arguments: ${args}`);
    const SEP = name.match(/^(rgba?|hsla?)$/) ? " " : " ";
    if (args.length === 3)
      return `${name}(${args.join(SEP)})`;
    if (args.length === 5)
      return `${name}(from ${args.slice(0, 4).join(" ")} / ${args[4]})`;
    if (CSS.supports("color", args[0]))
      return `${name}(from ${args.join(" ")})`;
    const a = name.match(/^(rgb|hsl)$/) ? "a" : "";
    return `${name}${a}(${args.slice(0, 3).join(SEP)} / ${args[3]})`;
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

  return {
    rgb: (...args) => nativeCssColorFunction("rgb", ...args),
    rgba: (...args) => nativeCssColorFunction("rgba", ...args),
    hsl: (...args) => nativeCssColorFunction("hsl", ...args),
    hsla: (...args) => nativeCssColorFunction("hsla", ...args),
    hwb: (...args) => nativeCssColorFunction("hwb", ...args),
    lab: (...args) => nativeCssColorFunction("lab", ...args),
    lch: (...args) => nativeCssColorFunction("lch", ...args),
    oklab: (...args) => nativeCssColorFunction("oklab", ...args),
    oklch: (...args) => nativeCssColorFunction("oklch", ...args),
    color: nativeCssColorSpaceFunction,
    "color-mix": nativeCssColorMixFunction,
  };
})();

const NativeCssProperties = (function () {
  const style = document.createElement('div').style;
  const nativeProps = Object.getOwnPropertyNames(style)
    .map(p => p.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^ms-/, '-ms-'))
    .map(k => [k, (...args) => ({ [k]: args.join(" ") })]);
  return Object.fromEntries(nativeProps);
})();

const EASING_FUNCTIONS = {
  linear: (...args) => `linear(${args[0]},${args.length > 2 ? args.slice(1, -1).join(" ") + "," : ""}${args[args.length - 1]})`,
  ease: (...args) => `ease(${args.join(",")})`,
  steps: (...args) => `steps(${args.join(",")})`,
  "cubic-bezier": (...args) => `cubic-bezier(${args.join(",")})`,
};

NativeCssProperties.transition.scope = EASING_FUNCTIONS;
NativeCssProperties.animation.scope = EASING_FUNCTIONS;

const bg = (...args) => ({ background: args.join(" ") || "var(--background-color)" });

export default {
  ...NativeCssProperties,
  ...NativeCssFunctions,
  ...NativeColorsFunctions,
  ...NativeCssTransformFunctions,
  ...NativeCssFilterFunctions,
  ...NativeCssGradientFunctions,
  border,
  bg,
  background: bg,
  em: NativeCssProperties["font-size"],
  w: (...args) => toSize("inline-size", ...args),
  h: (...args) => toSize("block-size", ...args),
}