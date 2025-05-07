//func is the basic of native css. And it shouldn't be altered. Only fixed.
// border and font should be outside this file.

export const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ch|ex|%/.source;
export const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
export const NUM = `(${N})(?:\\/(${N}))?`; //num frac allows for -.5e+0/-122.5e-12

export function toRadiusFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  return {
    [NAME + "StartStart"]: ar[0],
    [NAME + "EndEnd"]: ar[2] ?? ar[0],
    [NAME + "StartEnd"]: ar[1],
    [NAME + "EndStart"]: ar[3] ?? ar[1],
  };
}
export function toLogicalFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  if (ar.length === 2)
    return {
      [NAME + "Block"]: ar[0],
      [NAME + "Inline"]: ar[1],
    };
  if (ar.length === 3)
    return {
      [NAME + "BlockStart"]: ar[0],
      [NAME + "Inline"]: ar[1],
      [NAME + "BlockEnd"]: ar[2],
    };
  return {
    [NAME + "BlockStart"]: ar[0],
    [NAME + "InlineStart"]: ar[1],
    [NAME + "BlockEnd"]: ar[2],
    [NAME + "InlineEnd"]: ar[3]
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
  if (bss || iss) res[NAME + "TopLeft"] = `${bss ?? DEFAULT} ${iss ?? DEFAULT}`;
  if (bse || ies) res[NAME + "TopRight"] = `${bse ?? DEFAULT} ${ies ?? DEFAULT}`;
  if (bes || ise) res[NAME + "BottomLeft"] = `${bes ?? DEFAULT} ${ise ?? DEFAULT}`;
  if (bee || iee) res[NAME + "BottomRight"] = `${bee ?? DEFAULT} ${iee ?? DEFAULT}`;
  return res;
}

export function borderSwitch(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => {
    if (k === "transition") return [k, v];
    const [wsr, ...dirs] = k.split(/(?=[A-Z])/);
    return [["border", ...dirs, wsr].join(""), v];
  }));
}

export function isLength(x) {
  if (x === "0") return x;
  const m = x.match?.(new RegExp(`^(${NUM})(${LENGTHS_PER})$`));
  if (!m) return;
  let [, , n, frac, unit] = m;
  return frac ? (Number(n) / Number(frac)) + unit :
    x;
}

//scope functions start
const NativeCssScopeMath = {
  min: (...args) => `min(${args.join(",")})`,
  max: (...args) => `max(${args.join(",")})`,
  clamp: (...args) => `clamp(${args.join(",")})`,
};
for (const v of Object.values(NativeCssScopeMath))
  v.scope = NativeCssScopeMath;

const NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;

const NativeCssScopeAttrCounter = {
  counter: (...args) => `counter(${args.join(",")})`,
  counters: (...args) => `counters(${args.join(",")})`,
  attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
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
  function nativeCssColorMixFunction(cSpace, ...args) {
    cSpace = "in " + cSpace.replaceAll("_", " "); //we don't support '_' in --var-names
    if (args[0]?.match(/^(shorter|longer|increasing|decreasing)$/))
      cSpace += ` ${args.shift()} hue`;
    args = args.map(a => (a.match(/^\d?\d%$/i) ? " " : ", ") + a);
    return `color-mix(${cSpace}${args.join("")})`;
  }

  const res = {
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
    colorMix: nativeCssColorMixFunction,
  };
  for (const cb of Object.values(res))
    cb.scope = { ...NativeCssScopeMath };
  return res;
})();

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   
//    path: (...args) => `path(${args.join(",")})`,
//    imageSet: (...args) => `image-set(${args.join(",")})`,
// };

const transitionFunctionSet = (function () {

  function transition(props, dur, type, delay = "") {
    return { transition: `${props} ${dur} ${type} ${delay}` };
  }

  return function transitionFunctionSet(...props) {
    props = props.join(" ");
    return {
      ease: (dur, delay) => transition(props, dur, "ease", delay),
      easeIn: (dur, delay) => transition(props, dur, "ease-in", delay),
      easeOut: (dur, delay) => transition(props, dur, "ease-out", delay),
      easeInOut: (dur, delay) => transition(props, dur, "ease-in-out", delay),
      linear: (dur, delay) => transition(props, dur, "linear", delay),
      jumpStart: (dur, steps = 1, delay) => transition(props, dur, `jump-start(${steps})`, delay),
      jumpEnd: (dur, steps = 1, delay) => transition(props, dur, `jump-end(${steps})`, delay),
      jumpNone: (dur, steps = 1, delay) => transition(props, dur, `jump-none(${steps})`, delay),
      jumpBoth: (dur, steps = 1, delay) => transition(props, dur, `jump-both(${steps})`, delay),
      cubicBezier: (dur, x1, y1, x2, y2, delay) => transition(props, dur, `cubic-bezier(${x1},${y1},${x2},${y2})`, delay),
    };
  }
})();
//scope functions end


//no shorts before this point
const NativeCssProperties = (function () {
  const style = document.createElement('div').style;
  const res = {};
  for (const camel of Object.getOwnPropertyNames(style)) {
    res[camel] = (...args) => ({ [camel]: args.join(" ") });
    Object.defineProperty(res[camel], "name", { value: camel });
    res[camel].scope = {};
    const name = camel.replace(/([A-Z])/g, "-$1").toLowerCase();
    if (CSS.supports(name, "min(0,1)") || CSS.supports(name, "min(0px,1px)"))
      Object.assign(res[camel].scope, NativeCssScopeMath);
    if (CSS.supports(name, "url(http://example.com)"))
      res[camel].scope.url = NativeCssScopeUrl;
    if (CSS.supports(name, "#123456")) // CSS.supports(name,"1px solid #123456") || CSS.supports(name,"underline #123456") || CSS.supports(name,"dot #123456") ||    
      Object.assign(res[camel].scope, NativeColorsFunctions);
    if (CSS.supports("transition", name + " 1s linear"))
      Object.assign(res[camel].scope, transitionFunctionSet(name));
  }
  //if name == "content"
  res.content.scope = Object.assign(res.content.scope ?? {}, NativeCssScopeAttrCounter);
  return res;
})();

//UNPACKED $filter scope functions
const NativeCssFilterFunctions = {
  blur: (...args) => ({ filter: `blur(${args.join(" ")})` }),
  brightness: (...args) => ({ filter: `brightness(${args.join(" ")})` }),
  contrast: (...args) => ({ filter: `contrast(${args.join(" ")})` }),
  grayscale: (...args) => ({ filter: `grayscale(${args.join(" ")})` }),
  invert: (...args) => ({ filter: `invert(${args.join(" ")})` }),
  opacity: (...args) => ({ filter: `opacity(${args.join(" ")})` }),
  saturate: (...args) => ({ filter: `saturate(${args.join(" ")})` }),
  sepia: (...args) => ({ filter: `sepia(${args.join(" ")})` }),
  dropShadow: (...args) => ({ filter: `drop-shadow(${args.join(" ")})` }),
  hueRotate: (...args) => ({ filter: `hue-rotate(${args.join(" ")})` }),
};
for (const cb of Object.values(NativeCssFilterFunctions))
  cb.scope = { ...NativeCssScopeMath };
NativeCssFilterFunctions.filterUrl = (...args) => ({ filter: `url(${args.join(" ")})` });

//UNPACKED $transform scope functions
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
};
for (const cb of Object.values(NativeCssTransformFunctions))
  cb.scope = { ...NativeCssScopeMath };

//UNPACKED $gradient scope functions
const NativeCssGradientFunctions = {
  "linearGradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "radialGradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "conicGradient": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "repeatingLinearGradient": (...args) => ({ background: `repeating-linear-gradient(${args.join(",")})` }),
  "repeatingRadialGradient": (...args) => ({ background: `repeating-radial-gradient(${args.join(",")})` }),
  "repeatingConicGradient": (...args) => ({ background: `repeating-conic-gradient(${args.join(",")})` }),
  "radial": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "conic": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
  "repeatingLinear": (...args) => ({ background: `repeating-linear-gradient(${args.join(",")})` }),
  "repeatingRadial": (...args) => ({ background: `repeating-radial-gradient(${args.join(",")})` }),
  "repeatingConic": (...args) => ({ background: `repeating-conic-gradient(${args.join(",")})` }),
  //collides with {transition: linear()}, but is done as a scope function now, so no problem
  "linear": (...args) => ({ background: `linear-gradient(${args.join(",")})` }),
};
for (const k in NativeCssGradientFunctions)
  NativeCssGradientFunctions[k].scope = { ...NativeCssScopeMath, ...NativeColorsFunctions };


const ANIMATION_FUNCTIONS = {
  linear: (...args) => `linear(${args[0]},${args.length > 2 ? args.slice(1, -1).join(" ") + "," : ""}${args[args.length - 1]})`,
  ease: (...args) => `ease(${args.join(",")})`,
  steps: (...args) => `steps(${args.join(",")})`,
  cubicBezier: (...args) => `cubic-bezier(${args.join(",")})`,
};

NativeCssProperties.animation.scope = ANIMATION_FUNCTIONS;

const UnpackedNativeCssProperties = {
  ...NativeCssProperties,
  transform: undefined,
  ...NativeCssTransformFunctions,
  filter: undefined,
  ...NativeCssFilterFunctions,
  ...NativeCssGradientFunctions,
};





function border(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    if (a.match(/solid|dotted|dashed|double|none|groove|ridge|inset|outset|hidden/))
      return { Style: a };
    if (isLength(a) || a.match(/(^(min|max|clamp)\()/) || a.match(/^(thin|medium|thick)$/))
      return { Width: a };
    return a; //todo this throws, right?
  });
  return borderSwitch(Object.assign({ Style: "solid" }, ...args));
}

const borderColor = toLogicalFour.bind(null, "Color");
borderColor.scope = NativeCssProperties.borderColor.scope;
const borderWidth = toLogicalFour.bind(null, "Width");
borderWidth.scope = NativeCssProperties.borderWidth.scope;
const borderRadius = toRadiusFour.bind(null, "Radius");
borderRadius.scope = NativeCssProperties.borderRadius.scope;
const borderRadius8 = toLogicalEight.bind(null, "Radius", 0);
borderRadius8.scope = NativeCssProperties.borderRadius.scope;

border.scope = {
  width: borderWidth,
  w: borderWidth,
  style: toLogicalFour.bind(null, "Style"),
  s: toLogicalFour.bind(null, "Style"),
  radius: borderRadius,
  r: borderRadius,
  r4: borderRadius,
  r8: borderRadius8,
  color: borderColor,
  c: borderColor,
  ...transitionFunctionSet("border-width"),
};

// NativeCssProperties.borderColor = (...args) => borderSwitch(toLogicalFour("Color", ...args));
// NativeCssProperties.borderColor.scope = NativeCssProperties.color.scope;

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
  ["fontFamily", /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-serif|ui-sans-serif|ui-monospace|ui-rounded|emoji|math|fangsong|Arial|Arial\+Black|Calibri|Cambria|Candara|Comic\+Sans\+MS|Consolas|Constantia|Corbel|Courier\+New|Georgia|Impact|Lucida\+Console|Lucida\+Sans\+Unicode|Palatino\+Linotype|Segoe\+UI|Tahoma|Times\+New\+Roman|Trebuchet\+MS|Verdana|Book\+Antiqua|Century\+Gothic|Franklin\+Gothic\+Medium|Garamond|Bookman\+Old\+Style|Brush\+Script\+MT|Helvetica|Helvetica\+Neue|Courier\+Monaco|Geneva|Lucida\+Grande|Didot|Hoefler\+Text|American\+Typewriter|Gill\+Sans|Optima|Futura|Baskerville|Copperplate|Menlo|Monaco|Apple\+Chancery|Marker\+Felt|Chalkboard|Andale\+Mono|Palatino\+Times|DejaVu\+Sans|DejaVu\+Serif|DejaVu\+Sans\+Mono|Liberation\+Sans|Liberation\+Serif|Liberation\+Mono|Nimbus\+Roman\+No9\+L|Nimbus\+Sans\+L|Nimbus\+Mono\+L|Century\+Schoolbook\+L|URW\+Chancery\+L|URW\+Gothic\+L|URW\+Bookman\+L|Wingdings|Webdings|Symbol|Zapf\+Dingbats|-apple-system|BlinkMacSystemFont|Roboto)$/i],
  ["fontFamily", /^["']/i],
  ["fontStyle", /^(italic|oblique)$/i],
  ["fontWeight", /^(bold|bolder|lighter|[1-9]00)$/i],
  ["fontVariantCaps", /^(small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps)$/i],
  ["fontStretch", /^(ultra-condensed|extra-condensed|condensed|semi-condensed|normal|semi-expanded|expanded|extra-expanded|ultra-expanded)$/i],
  ["textTransform", /^(capitalize|uppercase|lowercase|full-width|full-size-kana|math-auto)$/i],
  ["letterSpacing", /^-?[0-9]*\.?[0-9]+([a-z]+|%)$/i],
];

function font(...args) {
  const res = {};
  main: for (const a of args) {
    const badFont = KNOWN_BAD_FONT_NAMES[a.toLowerCase()];
    if (badFont) {
      (res.fontFamily ??= []).push(badFont);
      continue main;
    }
    for (const [TYPE, WORD] of FONT) {
      if (a.match(WORD)) {
        TYPE === "fontFamily" ? (res[TYPE] ??= []).push(a) : res[TYPE] = a;
        continue main;
      }
    }
    throw `Unrecognized font property: ${a}`; //todo this should happen with "url(..)"?
  }
  res.fontFamily ??= res.fontFamily.join(", ").replaceAll("+", " ");
  return res;
}
font.scope = {
  oblique: (...args) => ["oblique", ...args].join(" "),
  url: (...args) => `url(${args.join(" ")})`,
}

const bg = (...args) => ({ background: args.join(" ") || "var(--background-color)" });
bg.scope = NativeCssProperties.background.scope;

//todo do something like this instead:
//   12><--var
//   12<>--var
//   45>23>--var

//$w(50%)
//$w(1,2) not allowed, only 1 or 3 arguments.
//$w(max(30em,35%),50%,min(60cm,80vw,100%))
function toSize(NAME, ...args) {
  args = args.map(a => a?.replace(/^(min|max)$/, "$&-content"));
  if (args.length === 1)
    return { [NAME]: args[0] };
  if (args.length === 3) {
    const NAME2 = NAME.replace(/^./, c => c.toUpperCase());
    return {
      [`min${NAME2}`]: args[0],
      [NAME]: args[1],
      [`max${NAME2}`]: args[2]
    };
  } throw new SyntaxError(`$${NAME} accepts only 1 or 3 arguments: ${args}`);
}
const width = (...args) => toSize("inlineSize", ...args);
const height = (...args) => toSize("blockSize", ...args);
width.scope = NativeCssProperties.width.scope;
height.scope = NativeCssProperties.height.scope;

export default {
  ...UnpackedNativeCssProperties,

  border,
  borderWidth: undefined,
  borderStyle: undefined,
  borderRadius: undefined,
  // borderColor: undefined,

  font,
  em: NativeCssProperties.fontSize,
  bg,
  background: bg,
  w: width,
  h: height,
  width,
  height,
};
