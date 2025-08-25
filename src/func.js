//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//mdn specifies more lengths, but we don't support them yet.
export const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%/.source;
export const ANGLES = /deg|grad|rad|turn/.source;
export const TIMES = /s|ms/.source;
export const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
export const NUM = `(${N})(?:\\/(${N}))?`; //num frac allows for -.5e+0/-122.5e-12

function isNumberUnit(UNIT) {
  return function (x) {
    if (!x || x === "0") return x;
    const m = x.match?.(new RegExp(`^(${NUM})(${UNIT})$`));
    if (!m) return;
    let [, , n, frac, unit] = m;
    return frac ? (Number(n) / Number(frac)) + unit :
      x;
  }
}
export const isLength = isNumberUnit(LENGTHS_PER);
export const isAngle = isNumberUnit(ANGLES);
const innerTime = isNumberUnit(TIMES);
export const isTime = x => x == "0" ? "0s" : innerTime(x);

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
  return ar.length === 1 ? { [NAME]: ar[0] } :
    {
      [NAME + "Block"]: ar[2] != null && ar[2] != ar[0] ? ar[0] + " " + ar[2] : ar[0],
      [NAME + "Inline"]: ar[3] != null && ar[3] != ar[1] ? (ar[1] ?? ar[0]) + " " + ar[3] : ar[1] ?? ar[0],
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

//scope functions start
const NativeCssScopeMath = {
  min: (...args) => `min(${args.join(",")})`,
  max: (...args) => `max(${args.join(",")})`,
  clamp: (...args) => `clamp(${args.join(",")})`,
  minmax: (...args) => `minmax(${args.join(",")})`,  //only used in grid, but native valid property+value check captures wrong use
};
for (const v of Object.values(NativeCssScopeMath))
  v.scope = NativeCssScopeMath;

const NativeCssScopeRepeat = (i, ...args) => `repeat(${i}, ${args.join(" ")})`;
NativeCssScopeRepeat.scope = NativeCssScopeMath;
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
    if (args.length === 3)
      return `${name}(${args.join(" ")})`;
    if (args.length === 5)
      return `${name}(from ${args.slice(0, 4).join(" ")} / ${args[4]})`;
    if (CSS.supports("color", args[0]))
      return `${name}(from ${args.join(" ")})`;
    const a = name.match(/^(rgb|hsl)$/) ? "a" : "";
    return `${name}${a}(${args.slice(0, 3).join(" ")} / ${args[3]})`;
  }
  //todo untested!!
  function nativeCssColorSpaceFunction(space, ...args) {
    if (args.length < 3 || args.length > 5)
      throw new SyntaxError(`color() accepts only 3 to 5 arguments: ${args}`);
    const from = CSS.supports("color", args[0]) && args.shift();
    if (args.length == 4) args.splice(-1, 0, "/");
    args.unshift(space);
    if (from) args.unshift("from", from);
    return `color(${args.join(" ")})`;
  }
  function nativeCssColorMixFunction(cSpace, ...args) {
    cSpace = "in " + cSpace.replaceAll("_", " "); //we don't support '_' in --var-names
    if (args[0]?.match(/^(shorter|longer|increasing|decreasing)$/))
      cSpace += ` ${args.shift()} hue`;
    args = args.map(a => (a.match(/^\d?\d%$/i) ? " " : ", ") + a);
    return `color-mix(${cSpace}${args.join("")})`;
  }
  //#123 => hash(123) => #123
  //#primary#30 => hash(primary,30)
  //#primary#30#a80 => hash(primary,30,a80)

  const ColorNames = new Set(["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"]);

  //To get the transparent last number in hex colors to work, it is simply turned into a mix percentage. Works as if transparent)
  function parseSecondColor(c, i, vectorName, first) {
    const [, h3, p3, h6, p6] = c.match(/^(?:([0-9a-f]{3}([0-9a-e]))|([0-9a-f]{6}([0-9a-e]{2})))/i) ?? [];
    if (h3)
      return `#${h3} ${Math.round(parseInt(p3, 16) / 15) * 100}%`;
    if (h6)
      return `#${h6} ${Math.round(parseInt(p6, 16) / 255) * 100}%`;
    let [, name, percent] = c.match(/(.*?)(100|\d\d?)$/);  //#blue100  //#primary399
    if (!percent)
      throw new SyntaxError(
        `Illegal #colormix#${c}: Missing percent postfix.
Did you mean to mix half'n'half, ie. #${c}5 or #${c}50?`
      );
    if (!name && !vectorName)
      throw new SyntaxError(
        `Illegal #colormix#${c}. "#${first}" is not a color vector. Did you forget to use or define a color vector such as #primary or #accent?`);
    if (percent.length === 1)
      percent = percent + "0";
    return !name ? `var(${vectorName + ++i}) ${percent}%` :
      name == "a" ? `transparent ${100 - parseInt(percent)}%` :
        ColorNames.has(name.toLowerCase()) ? `${name} ${percent}%` :
          `var(--color-${name}) ${percent}%`;
  }

  function _hash(first, ...colors) {
    let vector, res;
    res = ColorNames.has(first.toLowerCase()) ? first :
      first.match(/^([a-f0-9]{3,4}|[a-f0-9]{6}|[a-f0-9]{8})$/i) ? "#" + first :
        undefined;
    if (!res && first.match(/^[a-z][a-z0-9_-]*/i))
      res = `var(${vector = `--color-${first}`})`;
    else if (!res)
      throw new SyntaxError(`Invalid #color name: ${first}`);
    return colors.reduce((res, c, i) =>
      `color-mix(in oklab, ${res}, ${parseSecondColor(c, i, vector, first)})`, res);
  }

  const res = {
    _hash,
    rgb: (...rgb) => "#" + rgb.map(c => Number(c).toString(16).padStart(2, '0')).join(''),
    rgba: (r, g, b, a = 1) => "#" + [r, g, b, Math.round(a * 255)].map(c => Number(c).toString(16).padStart(2, '0')).join(''),
    hsl: (...args) => nativeCssColorFunction("hsl", ...args),
    hsla: (...args) => nativeCssColorFunction("hsla", ...args),
    hwb: (...args) => nativeCssColorFunction("hwb", ...args),
    lab: (...args) => nativeCssColorFunction("lab", ...args),
    lch: (...args) => nativeCssColorFunction("lch", ...args),
    oklab: (...args) => nativeCssColorFunction("oklab", ...args),
    oklch: (...args) => nativeCssColorFunction("oklch", ...args),
    srgb: (...args) => nativeCssColorSpaceFunction("srgb", ...args),
    srgbLinear: (...args) => nativeCssColorSpaceFunction("srgb-linear", ...args),
    displayP3: (...args) => nativeCssColorSpaceFunction("display-p3", ...args),
    a98Rgb: (...args) => nativeCssColorSpaceFunction("a98-rgb", ...args),
    prophotoRgb: (...args) => nativeCssColorSpaceFunction("prophoto-rgb", ...args),
    rec2020: (...args) => nativeCssColorSpaceFunction("rec2020", ...args),
    xyz: (...args) => nativeCssColorSpaceFunction("xyz", ...args),
    xyzD50: (...args) => nativeCssColorSpaceFunction("xyz-d50", ...args),
    xyzD65: (...args) => nativeCssColorSpaceFunction("xyz-d65", ...args),
    color: (...args) => nativeCssColorSpaceFunction("srgb", ...args),
    colorMix: nativeCssColorMixFunction,
  };
  for (const cb of Object.values(res))
    cb.scope = { ...NativeCssScopeMath };
  return res;
})();

const ColorNames = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i.source;
const ColorFunctionStart = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix|colorMix)\(/.source;
const ColorVar = /^var\(--color-/.source;
const ColorHash = /^#[a-fA-F0-9]{3,8}$/.source;
const ColorString = new RegExp(`${ColorNames}|${ColorFunctionStart}|${ColorVar}|${ColorHash}`);

export function isColor(x) {
  return ColorString.test(x) && x;
}

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   //todo handle as css vars.
//    path: (...args) => `path(${args.join(",")})`,
//    imageSet: (...args) => `image-set(${args.join(",")})`,
// };

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
    if (CSS.supports(name, "#123456") || CSS.supports(name, "#123 1px 1px"))
      Object.assign(res[camel].scope, NativeColorsFunctions);
    if (camel.match(/^(gridTemplateColumns|gridTemplateRows|gridTemplateAreas|gridTemplate|grid)$/))
      res[camel].scope.repeat = NativeCssScopeRepeat;
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
};
// margin: toLogicalFour.bind(null, "margin"),
// scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
// padding: toLogicalFour.bind(null, "padding"),
// scrollPadding: toLogicalFour.bind(null, "scroll-padding"),

//todo and radius toLogicalEight.. maybe


//$bg
function formatCssString(str) {
  const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%|deg|grad|rad|turn/.source;
  return str
    .replaceAll(new RegExp(`(${LENGTHS_PER})([a-zA-Z])`, 'g'), '$1 $2')
    .replaceAll(/([a-zA-Z])(\d)/g, '$1 $2')
    .replaceAll(/([a-z])([A-Z])/g, '$1 $2')
    .replaceAll(new RegExp(`(${LENGTHS_PER})(-?\\d)`, 'g'), '$1 $2')
    .replaceAll(/\b(closest|farthest) (side|corner)\b/gi, '$1-$2')
    .toLowerCase();
}

function bgImpl(...args) {
  const res = {
    backgroundImage: undefined,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "repeat",
    backgroundSize: "auto auto",
    backgroundOrigin: "padding-box",
    backgroundClip: "border-box",
    backgroundBlendMode: "normal",
    backgroundAttachment: "scroll",
  };
  const colors = [], args2 = [];
  for (const a of args)
    (a && typeof a === 'object') ? Object.assign(res, a) :
      isColor(a) ? colors.push(a) :
        args2.push(formatCssString(a));
  return { res, colors, args2 };
}

//process arguments sequentially, separating geometry from color stops.
function doGradient(name, ...args) {
  const { res } = bgImpl(); // Get default background properties
  const geometry = [];
  const colorStops = [];
  let inColorStops = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg && typeof arg === 'object') {
      Object.assign(res, arg);
      continue;
    }

    if (isColor(arg)) {
      inColorStops = true;
      let colorStop = arg;

      let positionsCollected = 0;
      while (i + 1 < args.length && positionsCollected < 2) {
        const nextArg = args[i + 1];
        if (isLength(nextArg) || (name.includes('conic') && isAngle(nextArg))) {
          colorStop += ` ${nextArg}`;
          i++;
          positionsCollected++;
        } else break;
      }

      colorStops.push(colorStop);
    } else if (!inColorStops) {
      const processed = formatCssString(arg);

      if (name === 'conic' && isAngle(processed))
        geometry.push(`from ${processed}`);
      else
        geometry.push(processed);
    }
  }

  const geometryString = geometry.filter(Boolean).join(" ");
  const allParams = [geometryString, ...colorStops].filter(Boolean).join(", ");
  res.backgroundImage = `${name}-gradient(${allParams})`;
  return res;
}

function bg(...args) {
  const { res, colors, args2 } = bgImpl(...args);
  if (!colors.length && !args2.length)
    throw new SyntaxError(`$bg(${args.join(",")}) is missing a color or url argument.`);
  if (colors.length > 1)
    throw new SyntaxError(`use $bg(color1,left)$bg(color2,right) for layered backgrounds, not $bg(${colors.join(",")}).`);
  if (args2.length > 1)
    throw new SyntaxError(`use $bg(url1)$bg(url2) for layered backgrounds, not $bg(${args2.join(",")}).`);
  if (colors.length && args2.length)
    throw new SyntaxError(`use $bg(color)$bg(url) for layered backgrounds, not $bg(${colors.join(",")},${args2.join(",")}).`);
  res.backgroundImage = colors.length ? `linear-gradient(${colors[0]})` : args2[0];
  return res;
}

const BackgroundFunctions = {
  linear: (...args) => doGradient("linear", ...args),
  radial: (...args) => doGradient("radial", ...args),
  conic: (...args) => doGradient("conic", ...args),
  repeatingLinear: (...args) => doGradient("repeating-linear", ...args),
  repeatingRadial: (...args) => doGradient("repeating-radial", ...args),
  repeatingConic: (...args) => doGradient("repeating-conic", ...args),
  bg,
  background: bg,
};

for (const k in BackgroundFunctions)
  BackgroundFunctions[k].scope = {
    // stops: (...args) => ({ stops: args }),
    ...NativeCssProperties.background.scope,
    ...NativeCssScopeMath, //todo do we need this, or is it covered by background above?
    pos: (block = "0", inline = "0") => ({ backgroundPosition: `${block[0] === "-" ? `bottom ${block.slice(1)}` : block} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
    position: (block = "0", inline = "0") => ({ backgroundPosition: `${block[0] === "-" ? `bottom ${block.slice(1)}` : block} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
    size: (inline, block = "auto") => ({ backgroundSize: `${inline} ${block}` }),
    top: { backgroundPosition: "top" },
    bottom: { backgroundPosition: "bottom" },
    left: { backgroundPosition: "left" },
    right: { backgroundPosition: "right" },
    center: { backgroundPosition: "center" },
    topLeft: { backgroundPosition: "top left" },
    topRight: { backgroundPosition: "top right" },
    bottomLeft: { backgroundPosition: "bottom left" },
    bottomRight: { backgroundPosition: "bottom right" },
    topCenter: { backgroundPosition: "top center" },
    bottomCenter: { backgroundPosition: "bottom center" },
    leftCenter: { backgroundPosition: "left center" },
    rightCenter: { backgroundPosition: "right center" },
    repeatX: { backgroundRepeat: "repeat-x" },
    repeatY: { backgroundRepeat: "repeat-y" },
    space: { backgroundRepeat: "space" },
    round: { backgroundRepeat: "round" },
    noRepeat: { backgroundRepeat: "no-repeat" },
    cover: { backgroundSize: "cover" },
    contain: { backgroundSize: "contain" },
    contentBox: { backgroundOrigin: "content-box" },
    borderBox: { backgroundOrigin: "border-box" },
    clipPaddingBox: { backgroundClip: "padding-box" },
    clipContentBox: { backgroundClip: "content-box" },
    clipText: { backgroundClip: "text" },
    clipBorderArea: { backgroundClip: "border-area" },
    multiply: { backgroundBlendMode: "multiply" },
    screen: { backgroundBlendMode: "screen" },
    overlay: { backgroundBlendMode: "overlay" },
    darken: { backgroundBlendMode: "darken" },
    lighten: { backgroundBlendMode: "lighten" },
    colorDodge: { backgroundBlendMode: "color-dodge" },
    colorBurn: { backgroundBlendMode: "color-burn" },
    hardLight: { backgroundBlendMode: "hard-light" },
    softLight: { backgroundBlendMode: "soft-light" },
    difference: { backgroundBlendMode: "difference" },
    exclusion: { backgroundBlendMode: "exclusion" },
    hue: { backgroundBlendMode: "hue" },
    saturation: { backgroundBlendMode: "saturation" },
    color: { backgroundBlendMode: "color" },
    luminosity: { backgroundBlendMode: "luminosity" },
    scroll: { backgroundAttachment: "scroll" },
    fixed: { backgroundAttachment: "fixed" },
    local: { backgroundAttachment: "local" },
  };

//border: 2px 4px solid red blue;
//$border(w(2px,4px),solid,c(red,blue))
//$border(2px,solid,red)
function border(...args) {
  args = args.map(a => {
    if (!(typeof a === "string")) return a;
    if (isColor(a))
      return { Color: a };
    if (isLength(a) || a.match(/(^(min|max|clamp)\()/))
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
const borderStyle = toLogicalFour.bind(null, "Style");
borderStyle.scope = NativeCssProperties.borderStyle.scope;

border.scope = {
  width: borderWidth,
  w: borderWidth,
  style: borderStyle,
  s: borderStyle,
  radius: borderRadius,
  r: borderRadius,
  r4: borderRadius,
  r8: borderRadius8,
  color: borderColor,
  c: borderColor,
  solid: { Style: "solid" },
  dotted: { Style: "dotted" },
  dashed: { Style: "dashed" },
  double: { Style: "double" },
  groove: { Style: "groove" },
  ridge: { Style: "ridge" },
  inset: { Style: "inset" },
  outset: { Style: "outset" },
  hidden: { Style: "hidden" },
  none: { Style: "none" },
  thin: { Width: "thin" },
  medium: { Width: "medium" },
  thick: { Width: "thick" },
};

// NativeCssProperties.borderColor = (...args) => borderSwitch(toLogicalFour("Color", ...args));
// NativeCssProperties.borderColor.scope = NativeCssProperties.color.scope;

//$w(12px<.<.)
//$w(.<.<12rem)
//$w(12px<.<12rem)
//$w(12%<20px<22%)
//$w(12px)
//$w(12px<.<max)
//$w(min<.<12rem)
function toSize(NAME, a, ...args) {
  if (args.length)
    throw new SyntaxError(`${NAME} accepts only 1 argument: ${JSON.stringify([a, ...args])}`);
  if (!a.includes("<"))
    return { [NAME]: a };
  const [min = ".", normal = ".", max = "."] = a.split("<");
  const res = {};
  if (min !== ".") res["min" + NAME[0].toUpperCase() + NAME.slice(1)] = min;
  if (normal !== ".") res[NAME] = normal;
  if (max !== ".") res["max" + NAME[0].toUpperCase() + NAME.slice(1)] = max;
  return res;
}
const width = (...args) => toSize("inlineSize", ...args);
const height = (...args) => toSize("blockSize", ...args);
width.scope = NativeCssProperties.width.scope;
height.scope = NativeCssProperties.height.scope;


//text decorations
//sequence based
//color defaults to --color_textdecorationcolor, then currentcolor
//todo work with color inheritance happening here..
function textDecoration(
  textDecorationLine = "underline",
  textDecorationStyle = "unset",
  textDecorationThickness = "unset",
  textDecorationColor = "var(--color-textdecorationcolor, currentcolor)") {
  return { textDecorationLine, textDecorationThickness, textDecorationStyle, textDecorationColor };
}
textDecoration.scope = {
  ...NativeCssProperties.textDecorationThickness.scope,
  ...NativeCssProperties.textDecorationColor.scope,
}
const textDecorations = {
  dashedOverLine: function (...args) { return textDecoration.call(this, "overline", "dashed", ...args); },
  dashedOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "dashed", ...args); },
  dashedOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "dashed", ...args); },
  dashedOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "dashed", ...args); },
  dashedLineThrough: function (...args) { return textDecoration.call(this, "line-through", "dashed", ...args); },
  dashedUnderLine: function (...args) { return textDecoration.call(this, "underline", "dashed", ...args); },
  dashedUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "dashed", ...args); },
  dottedOverLine: function (...args) { return textDecoration.call(this, "overline", "dotted", ...args); },
  dottedOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "dotted", ...args); },
  dottedOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "dotted", ...args); },
  dottedOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "dotted", ...args); },
  dottedLineThrough: function (...args) { return textDecoration.call(this, "line-through", "dotted", ...args); },
  dottedUnderLine: function (...args) { return textDecoration.call(this, "underline", "dotted", ...args); },
  dottedUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "dotted", ...args); },
  doubleOverLine: function (...args) { return textDecoration.call(this, "overline", "double", ...args); },
  doubleOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "double", ...args); },
  doubleOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "double", ...args); },
  doubleOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "double", ...args); },
  doubleLineThrough: function (...args) { return textDecoration.call(this, "line-through", "double", ...args); },
  doubleUnderLine: function (...args) { return textDecoration.call(this, "underline", "double", ...args); },
  doubleUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "double", ...args); },
  wavyOverLine: function (...args) { return textDecoration.call(this, "overline", "wavy", ...args); },
  wavyOverLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "wavy", ...args); },
  wavyOverUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "wavy", ...args); },
  wavyOverUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "wavy", ...args); },
  wavyLineThrough: function (...args) { return textDecoration.call(this, "line-through", "wavy", ...args); },
  wavyUnderLine: function (...args) { return textDecoration.call(this, "underline", "wavy", ...args); },
  wavyUnderLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "wavy", ...args); },
  overLine: function (...args) { return textDecoration.call(this, "overline", "solid", ...args); },
  overLineThrough: function (...args) { return textDecoration.call(this, "overline line-through", "solid", ...args); },
  overUnderLine: function (...args) { return textDecoration.call(this, "overline underline", "solid", ...args); },
  overUnderLineThrough: function (...args) { return textDecoration.call(this, "overline underline line-through", "solid", ...args); },
  lineThrough: function (...args) { return textDecoration.call(this, "line-through", "solid", ...args); },
  underLine: function (...args) { return textDecoration.call(this, "underline", "solid", ...args); },
  underLineThrough: function (...args) { return textDecoration.call(this, "underline line-through", "solid", ...args); },
  blink: function (...args) { return textDecoration.call(this, "blink", null, ...args); },
  grammarError: function (...args) { return textDecoration.call(this, "grammar-error", null, ...args); },
  spellingError: function (...args) { return textDecoration.call(this, "spelling-error", null, ...args); },
}
for (let func of Object.values(textDecorations))
  func.scope = textDecoration.scope;

export default {
  ...UnpackedNativeCssProperties,

  border,
  borderWidth: undefined,
  borderStyle: undefined,
  borderRadius: undefined,
  // borderColor: undefined,

  em: NativeCssProperties.fontSize,
  ...BackgroundFunctions,
  w: width,
  h: height,
  width,
  height,

  textDecoration,
  ...textDecorations,
};
