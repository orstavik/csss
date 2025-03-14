export const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ch|ex|%/.source;
export const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
export const NUM = `(${N})(?:\\/(${N}))?`; //num frac allows for -.5e+0/-122.5e-12

export function toRadiusFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  return {
    [NAME + "-start-start"]: ar[0],
    [NAME + "-end-end"]: ar[2] ?? ar[0],
    [NAME + "-start-end"]: ar[1],
    [NAME + "-end-start"]: ar[3] ?? ar[1],
  };
}
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

function colonSplit2(NAME, SEP, x) {
  if (x == null) return x;
  const res = x.split(":");
  return res.length == 1 ? res[0] :
    `${NAME}(${res.join(SEP)})`;
}

//todo remove mergy. It is now mostly done manually or elsewhere i think.
export function mergy(...res) {
  res = res.filter(a => a != null);
  if (!res.length) return {};
  for (const value of res)
    if (typeof value !== "object")
      throw new SyntaxError("unrecognized value: " + value);
  // for (const obj of res) {
  //   for (const key in obj) {
  //     const kebab = key.replace(/[A-Z]/g, "-$&").toLowerCase();
  //     if (kebab !== key) {
  //       obj[kebab] = obj[key];
  //       delete obj[key];
  //     }
  //   }
  // }
  //todo not sure that we need this now??
  const keys = res.map(o => Object.keys(o).map(k => k.split("-")[0]));
  const test = new Set(keys.shift());
  for (const ks of keys)
    for (const k of ks)
      if (test.has(k))
        throw new SyntaxError(`Property crash: ${k}`);
  return Object.assign(...res);
}

//enables us to write a min and max eiter as 2px:5px or max(2px,5px)
//$w(50%)
//$w(1,2) not allowed, only 1 or 3 arguments.
//$w(30em:35%,50%,60cm:80vw:100%)
//$w(max(30em,35%),50%,min(60cm,80vw,100%))
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
  return borderSwitch(mergy(...args));
}

border.scope = {
  width: toLogicalFour.bind(null, "width"),
  w: toLogicalFour.bind(null, "width"),
  style: toLogicalFour.bind(null, "style"),
  s: toLogicalFour.bind(null, "style"),
  radius: toRadiusFour.bind(null, "radius"),
  r: toRadiusFour.bind(null, "radius"),
  r4: toRadiusFour.bind(null, "radius"),
  r8: toLogicalEight.bind(null, "radius", 0),
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

const KNOWN_BAD_FONT_NAMES = {
  "comic": "Comic Sans MS",
  "comic+sans": "Comic Sans MS",
  "times": "Times New Roman",
  "courier": "Courier New",
  "palatino": "Palatino Linotype",
  "helvetica": "Helvetica Neue",
  "lucida": "Lucida Sans Unicode",
}
//$font("Arial+Black",serif,bold,small-caps,ultra-condensed,capitalize,sans-serif,oblique(-10deg),ui-sans-serif)
//$font("Arial+Black",sans-serif,ui-sans-serif,900,small-caps,ultra-condensed,capitalize,oblique(10deg))
const FONT = [
  ["font-family", /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|emoji|math|fangsong|Arial|Arial\+Black|Calibri|Cambria|Candara|Comic\+Sans\+MS|Consolas|Constantia|Corbel|Courier\+New|Georgia|Impact|Lucida\+Console|Lucida\+Sans\+Unicode|Palatino\+Linotype|Segoe\+UI|Tahoma|Times\+New\+Roman|Trebuchet\+MS|Verdana|Book\+Antiqua|Century\+Gothic|Franklin\+Gothic\+Medium|Garamond|Bookman\+Old\+Style|Brush\+Script\+MT|Helvetica|Helvetica\+Neue|Courier\+Monaco|Geneva|Lucida\+Grande|Didot|Hoefler\+Text|American\+Typewriter|Gill\+Sans|Optima|Futura|Baskerville|Copperplate|Menlo|Monaco|Apple\+Chancery|Marker\+Felt|Chalkboard|Andale\+Mono|Palatino\+Times|DejaVu\+Sans|DejaVu\+Serif|DejaVu\+Sans\+Mono|Liberation\+Sans|Liberation\+Serif|Liberation\+Mono|Nimbus\+Roman\+No9\+L|Nimbus\+Sans\+L|Nimbus\+Mono\+L|Century\+Schoolbook\+L|URW\+Chancery\+L|URW\+Gothic\+L|URW\+Bookman\+L|Wingdings|Webdings|Symbol|Zapf\+Dingbats|-apple-system|BlinkMacSystemFont|Roboto)$/i],
  ["font-family", /^["']/i],
  ["font-style", /^(italic|oblique)$/i],
  ["font-weight", /^(bold|bolder|lighter|[1-9]00)$/i],
  ["font-variant-caps", /^(small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps)$/i],
  ["font-stretch", /^(ultra-condensed|extra-condensed|condensed|semi-condensed|normal|semi-expanded|expanded|extra-expanded|ultra-expanded)$/i],
  ["text-transform", /^(capitalize|uppercase|lowercase|full-width|full-size-kana|math-auto)$/i],
  ["letter-spacing", /^-?[0-9]*\.?[0-9]+([a-z]+|%)$/i],
];

function font(...args) {
  const res = {};
  main: for (const a of args) {
    const badFont = KNOWN_BAD_FONT_NAMES[a.toLowerCase()];
    if (badFont) {
      (res["font-family"] ??= []).push(badFont);
      continue main;
    }
    for (const [TYPE, WORD] of FONT) {
      if (a.match(WORD)) {
        TYPE === "font-family" ? (res[TYPE] ??= []).push(a) : res[TYPE] = a;
        continue main;
      }
    }
    throw `Unrecognized font property: ${a}`;
  }
  res["font-family"] = res["font-family"].join(", ").replaceAll("+", " ");
  return res;
}
font.scope = {
  oblique: (...args) => ["oblique", ...args].join(" "),
}

const bg = (...args) => ({ background: args.join(" ") || "var(--background-color)" });

export default {
  ...NativeCssProperties,
  ...NativeCssFunctions,
  ...NativeColorsFunctions,
  ...NativeCssTransformFunctions,
  ...NativeCssFilterFunctions,
  ...NativeCssGradientFunctions,
  border,
  font,
  bg,
  background: bg,
  em: NativeCssProperties["font-size"],
  w: (...args) => toSize("inline-size", ...args),
  h: (...args) => toSize("block-size", ...args),
}