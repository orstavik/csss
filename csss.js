//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//mdn specifies more lengths, but we don't support them yet.
const LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%/.source;
const ANGLES = /deg|grad|rad|turn/.source;
const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
const NUM = `(${N})(?:\\/(${N}))?`; //num frac allows for -.5e+0/-122.5e-12

function isNumberUnit(UNIT) {
  return function (x) {
    if (x === "0") return x;
    const m = x.match?.(new RegExp(`^(${NUM})(${UNIT})$`));
    if (!m) return;
    let [, , n, frac, unit] = m;
    return frac ? (Number(n) / Number(frac)) + unit :
      x;
  }
}
const isLength = isNumberUnit(LENGTHS_PER);
const isAngle = isNumberUnit(ANGLES);

function toRadiusFour(NAME, ...ar) {
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
function toLogicalFour(NAME, ...ar) {
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

function borderSwitch(obj) {
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

function isColor(x) {
  return ColorString.test(x) && x;
}

// const SpecializedNativeCssFunctions = {
//    element: (...args) => `element(${args.join(",")})`,
//    paint: (...args) => `paint(${args.join(",")})`,
//    env: (...args) => `env(${args.join(",")})`,   //todo handle as css vars.
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
    if (CSS.supports(name, "#123456") || CSS.supports(name, "#123 1px 1px"))
      Object.assign(res[camel].scope, NativeColorsFunctions);
    if (CSS.supports("transition", name + " 1s linear"))
      Object.assign(res[camel].scope, transitionFunctionSet(name));
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
  ...transitionFunctionSet("border-width"),
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
};
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
};
for (let func of Object.values(textDecorations))
  func.scope = textDecoration.scope;

var nativeAndMore = {
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

const FONT_DEFAULTS = Object.entries({
  fontFamily: "FontFamily",
  fontSize: "FontSize",
  fontStyle: "FontStyle",
  fontWeight: "FontWeight",
  fontSizeAdjust: "FontSizeAdjust",
  letterSpacing: "LetterSpacing",
  fontStretch: "FontStretch",
  fontVariantCaps: "FontVariantCaps",
  fontSynthesis: "FontSynthesis",
  fontFeatureSettings: "FontFeatureSettings",
  fontVariationSettings: "FontVariationSettings",
  WebkitFontSmoothing: "WebkitFontSmoothing",
  MozOsxFontSmoothing: "MozOsxFontSmoothing",
  fontKerning: "FontKerning",
});

const KEYWORDS = {
  bold: { fontWeight: "bold" },
  b: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  noWeight: { fontWeight: "normal" },

  italic: { fontStyle: "italic" },
  ital: { fontStyle: "italic" },
  i: { fontStyle: "italic" },
  noStyle: { fontStyle: "normal" },

  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  noVariant: { fontVariantCaps: "normal" },

  condensed: { fontStretch: "condensed" },
  expanded: { fontStretch: "expanded" },
  semiCondensed: { fontStretch: "semi-condensed" },
  semiExpanded: { fontStretch: "semi-expanded" },
  extraCondensed: { fontStretch: "extra-condensed" },
  extraExpanded: { fontStretch: "extra-expanded" },
  ultraCondensed: { fontStretch: "ultra-condensed" },
  ultraExpanded: { fontStretch: "ultra-expanded" },
  noStretch: { fontStretch: "normal" },

  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },

  normal: { fontStyle: "normal", fontWeight: "normal" },
  smooth: { WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" }, //todo this is wrong? should be "antialiased" for WebkitFontSmoothing and "grayscale" for MozOsxFontSmoothing??

  larger: { fontSize: "larger" },
  smaller: { fontSize: "smaller" },
  xxs: { fontSize: "xx-small" },
  xs: { fontSize: "x-small" },
  sm: { fontSize: "small" },
  md: { fontSize: "medium" },
  lg: { fontSize: "large" },
  xl: { fontSize: "x-large" },
  xxl: { fontSize: "xx-large" },
  xxxl: { fontSize: "xxx-large" },
};

function noSynthesis(a) {
  const args = a.match(/^no((Weight|Style|SmallCaps|Position)*)Synthesis$/)?.[1];
  if (args == null) return;
  if (!args) return "none";
  return ["Style", "Weight", "SmallCaps", "Position"]
    .filter(a => args.includes(a))
    .join(" ")
    .replace("Caps", "-caps")
    .toLowerCase();
}

function fontNumbers(a) {
  const aNum = parseFloat(a);
  if (a == aNum && Number.isInteger(aNum) && 1 <= aNum && aNum <= 1000)
    return { fontWeight: a };
  if (aNum == a && !Number.isInteger(aNum) && 1 > aNum && aNum > 0)
    return { fontSizeAdjust: aNum };
  if (aNum + "deg" == a)
    return { fontStyle: "oblique " + a };
}

//first have a function that extracts all the nonFamily 
function fontImpl(fontFaceName, ...args) {
  const res = {};
  let family = [];
  let b, emoji, faces = [];
  for (let a of args) {
    if (a == undefined)
      throw new SyntaxError(`Empty arguments in $font: ${a}`);
    else if (faces.length && a.face)
      faces.push(a.face);
    else if (a.face)
      family.push(fontFaceName ??= a.face.src), faces.push(a.face);
    else if (a instanceof Object)
      Object.assign(res, a);
    else if (isLength(a))
      res.fontSize = a;
    else if (b = noSynthesis(a))
      res.fontSynthesis = b;
    else if (b = fontNumbers(a))
      Object.assign(res, b);
    else if (a == "emoji")
      emoji = ['Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'];
    else if (typeof a == "string")
      family.push(a.replaceAll(/^['"]|['"]$/g, "").replaceAll("+", " "));
    else
      throw new SyntaxError(`Unrecognized $font argument: ${a}`);
  }
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    res[`@fontFace /*${fontFaceName} ${face.fontStyle}*/`] = {
      fontFamily: fontFaceName,
      ...face,
      src: `local('${fontFaceName}'), url(${face.src})`,
    };
  }
  if (emoji)
    family.push(...emoji);
  if (!family.length)
    throw new SyntaxError(`No font family specified in $font: ${args}`);
  res.fontFamily = family.map(s => s.match(/[^a-z0-9_-]/gi) ? `"${s}"` : s).join(", ");
  return res;
}

function face(src, ...args) {
  args = args.map(a => {
    if (a instanceof Object)
      return a;
    if (a === "i" || a === "italic" || a === "ital")
      return { fontStyle: "italic" };
    throw new SyntaxError(`Unrecognized font face argument: ${a}`);
  });
  return { face: { src: src.slice(1, -1), fontStyle: "normal", ...args } };
}
face.feature = (...args) => args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");
face.variation = (...args) => args.map(a => a.split("=")).map(([k, v = 1]) => `"${k}" ${v}`).join(", ");


function font(...args) {
  if (typeof args[0] != "string")
    throw new SyntaxError(`The first argument of $font must be a string type name, but got: ${JSON.stringify(args[0])}`);
  const typeName = args[0].replaceAll(/[^a-z0-9-]/g, "_").replaceAll(/-[a-z]/g, m => m[1].toUpperCase());
  const tmp = fontImpl(undefined, ...args);
  const vars = {}, res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    vars["--font" + varKey] = (res[k] = tmp[k] ?? `var(--${typeName + varKey}, unset)`);
  return { ...res, ...vars };
}
font.scope = {
  // ...NativeCssProperties.font.scope,
  ...KEYWORDS,
  face,

  size: a => ({ fontSize: a }),
  weight: a => ({ fontWeight: a }),
  style: a => ({ fontStyle: a }),
  variant: a => ({ fontVariant: a }),
  stretch: a => ({ fontStretch: a }),
  spacing: a => ({ letterSpacing: a }),
  adjust: a => ({ fontSizeAdjust: a }),
};


//100%lob
//$font("company orange",grotesque)
//  <h1 $bold>
//  <div $italic ...>
//    <p   
//    <p $font>  //resets to last known font

//lob -1, but with 4 token exact reference for portal. $type(name
//$typeface(flow,"company orange",grotesque,condensed,italic,-10deg,uppercase,spacing(-3),700)
//$typeface(flow)
//   $bold
//      $type

//$type(name,...args) => creates a type with the given name and properties.
//$type(name) => uses a type and sets the font properties to the type's properties.

const BUILTIN_TYPES = {
  transitional: { fontFamily: "Charter,'Bitstream Charter','Sitka Text',Cambria,serif" },
  oldStyle: { fontFamily: "'Iowan Old Style','Palatino Linotype','URW Palladio L',P052,serif" },
  humanist: { fontFamily: "Seravek,'Gill Sans Nova',Ubuntu,Calibri,'DejaVu Sans',source-sans-pro,sans-serif" },
  geometricHumanist: { fontFamily: "Avenir,Montserrat,Corbel,'URW Gothic',source-sans-pro,sans-serif" },
  classicalHumanist: { fontFamily: "Optima,Candara,'Noto Sans',sans-serif" },
  neoGrotesque: { fontFamily: "Inter,Roboto,'Helvetica Neue','Arial Nova','Nimbus Sans',Arial,sans-serif" },
  monospaceSlabSerif: { fontFamily: "'Nimbus Mono PS','Courier New',monospace,", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  monospaceCode: { fontFamily: "ui-monospace,'Cascadia Code','Source Code Pro',Menlo,Consolas,'DejaVu Sans Mono',monospace" },
  industrial: { fontFamily: "Bahnschrift,'DIN Alternate','Franklin Gothic Medium','Nimbus Sans Narrow',sans-serif-condensed,sans-serif" },
  roundedSans: { fontFamily: "ui-rounded,'Hiragino Maru Gothic ProN',Quicksand,Comfortaa,Manjari,'Arial Rounded MT','Arial Rounded MT Bold',Calibri,source-sans-pro,sans-serif" },
  slabSerif: {
    "@fontFace": { fontFamily: "Rockwell,", src: "local('Rockwell')", ascentOverride: "100%" },
    fontFamily: "Rockwell,'Rockwell Nova','Roboto Slab','DejaVu Serif','Sitka Small',serif",
  },
  antique: { fontFamily: "Superclarendon,'Bookman Old Style','URW Bookman','URW Bookman L','Georgia Pro',Georgia,serif" },
  didone: { fontFamily: "Didot,'Bodoni MT','Noto Serif Display','URW Palladio L',P052,Sylfaen,serif", WebkitFontSmoothing: "auto", MozOsxFontSmoothing: "auto" },
  handwritten: { fontFamily: "'Segoe Print','Bradley Hand',Chilanka,TSCu_Comic,casual,cursive" },
};

function type(name, ...args) {
  // if (typeof name != "string")
  //   throw new SyntaxError(`The typename in $type(typename,...args) is not interpreted as a string: "${JSON.stringify(name)}"`);
  // if (!name.match(/^[a-z][a-z0-9-]*$/))
  //   throw new SyntaxError(`The typename in $type(typename,...args) must be lowercase and match(/^[a-z][a-z0-9-]*$/): "${name}"`);
  if (!name || typeof name != "string")
    throw new SyntaxError("The $typeface(name) function must always include a string name as first argument.");
  const tmp = fontImpl(name, ...args);
  const res = {};
  for (let [k, varKey] of FONT_DEFAULTS)
    res[`--${name + varKey}`] = tmp[k] ?? "unset";
  for (let k in tmp)
    if (k.startsWith("@"))
      res[k] = tmp[k];
  return res;
}
type.scope = { ...font.scope };

var fonts = {
  font,
  typeface: type,

  //droplets
  fontFamily: a => ({ [p]: a == "unset" ? `var(--fontFamily, unset)` : a }),
  fontStyle: a => ({ [p]: a == "unset" ? `var(--fontStyle, unset)` : a }),
  fontWeight: a => ({ [p]: a == "unset" ? `var(--fontWeight, unset)` : a }),
  fontVariantCaps: a => ({ [p]: a == "unset" ? `var(--fontVariantCaps, unset)` : a }),
  fontStretch: a => ({ [p]: a == "unset" ? `var(--fontStretch, unset)` : a }),
  fontSynthesis: a => ({ [p]: a == "unset" ? `var(--fontSynthesis, unset)` : a }),
  fontSizeAdjust: a => ({ [p]: a == "unset" ? `var(--fontSizeAdjust, unset)` : a }),
  letterSpacing: a => ({ [p]: a == "unset" ? `var(--letterSpacing, unset)` : a }),

  //global font words
  bold: { fontWeight: "bold" },
  bolder: { fontWeight: "bolder" },
  lighter: { fontWeight: "lighter" },
  italic: { fontStyle: "italic" },
  smallCaps: { fontVariantCaps: "small-caps" },
  allSmallCaps: { fontVariantCaps: "all-small-caps" },
  petiteCaps: { fontVariantCaps: "petite-caps" },
  allPetiteCaps: { fontVariantCaps: "all-petite-caps" },
  unicase: { fontVariantCaps: "unicase" },
  titlingCaps: { fontVariantCaps: "titling-caps" },
  condensed: { Stretch: "condensed" },
  expanded: { Stretch: "expanded" },
  semiCondensed: { Stretch: "semi-condensed" },
  semiExpanded: { Stretch: "semi-expanded" },
  extraCondensed: { Stretch: "extra-condensed" },
  extraExpanded: { Stretch: "extra-expanded" },
  ultraCondensed: { Stretch: "ultra-condensed" },
  ultraExpanded: { Stretch: "ultra-expanded" },
  kerning: { fontKerning: "normal" },
  noKerning: { fontKerning: "none" },
};


const BUILTIN_TYPES2 = {
  transitional: {
    fontFamilyPlus: "Charter ~0.50 SafariOld, 'Bitstream Charter' ~0.50, 'Sitka Text' ~0.52, Cambria 0.466, serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
  },

  oldStyle: {
    fontFamilyPlus: "'Iowan Old Style' ~0.52 SafariOld, 'Palatino Linotype' ~0.47, 'URW Palladio L' ~0.47, P052 ~0.47, serif",
    fontSizeAdjust: 0.47,
    fontFamily: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
  },

  humanist: {
    fontFamilyPlus: "Seravek ~0.52 SafariOld, 'Gill Sans Nova' ~0.48, Ubuntu ~0.53, Calibri 0.466, 'DejaVu Sans' ~0.53, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.53,
    fontFamily: "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  },

  geometricHumanist: {
    fontFamilyPlus: "Avenir ~0.52 SafariOld, Montserrat ~0.52, Corbel ~0.47, 'URW Gothic' ~0.48, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  },

  classicalHumanist: {
    fontFamilyPlus: "Optima ~0.48 SafariOld, Candara 0.463, 'Noto Sans' ~0.53, sans-serif",
    fontSizeAdjust: 0.48,
    fontFamily: "Optima, Candara, 'Noto Sans', sans-serif",
  },

  neoGrotesque: {
    fontFamilyPlus: "Inter ~0.55, Roboto 0.528, 'Helvetica Neue' 0.523 SafariOld, 'Arial Nova' ~0.519, 'Nimbus Sans' ~0.523, Arial 0.519, sans-serif",
    fontSizeAdjust: 0.528,
    fontFamily: "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  },

  monospaceSlabSerif: {
    fontFamilyPlus: "'Nimbus Mono PS' 0.425, 'Courier New' 0.423, monospace",
    fontSizeAdjust: 0.425,
    fontFamily: "'Nimbus Mono PS', 'Courier New', monospace",
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },

  monospaceCode: {
    fontFamilyPlus: "ui-monospace, 'Cascadia Code' ~0.54, 'Source Code Pro' ~0.53, Menlo ~0.50 SafariOld, Consolas ~0.49, 'DejaVu Sans Mono' ~0.49, monospace",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  },

  industrial: {
    fontFamilyPlus: "Bahnschrift ~0.50, 'DIN Alternate' ~0.47 SafariOld, 'Franklin Gothic Medium' ~0.52, 'Nimbus Sans Narrow' ~0.523, sans-serif-condensed, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
  },

  roundedSans: {
    fontFamilyPlus: "ui-rounded, 'Hiragino Maru Gothic ProN' ~0.50 SafariOld, Quicksand ~0.53, Comfortaa ~0.50, Manjari ~0.52, 'Arial Rounded MT' ~0.519, 'Arial Rounded MT Bold' ~0.519, Calibri 0.466, source-sans-pro ~0.53, sans-serif",
    fontSizeAdjust: 0.5,
    fontFamily: "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
  },

  slabSerif: {
    fontFamilyPlus: "Rockwell ~0.46, 'Rockwell Nova' ~0.46, 'Roboto Slab' ~0.52, 'DejaVu Serif' ~0.46, 'Sitka Small' ~0.56, serif",
    fontSizeAdjust: 0.46,
    fontFamily: "Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif",
    "@fontFace": { fontFamily: "Rockwell", src: "local('Rockwell')", ascentOverride: "100%" },
  },

  antique: {
    fontFamilyPlus: "Superclarendon ~0.47 SafariOld, 'Bookman Old Style' ~0.50, 'URW Bookman' ~0.50, 'URW Bookman L' ~0.50, 'Georgia Pro' 0.481, Georgia 0.481, serif",
  },

  didone: {
    fontFamilyPlus: "Didot ~0.42 SafariOld, 'Bodoni MT' ~0.40, 'Noto Serif Display' ~0.45, 'URW Palladio L' ~0.47, P052 ~0.47, Sylfaen ~0.46, serif",
  },

  handwritten: {
    fontFamilyPlus: "'Segoe Print' ~0.53, 'Bradley Hand' ~0.53 SafariOld, Chilanka ~0.52, TSCu_Comic ~0.50, casual, cursive",
  },
};

//todo turn this into memory thing. same with O2
const ALIGNMENTS = (_ => {
  const POSITIONS = "|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd";
  const SPACE = "|Around|Between|Evenly";
  const BASELINE = "|Baseline|First|Last";
  const LEFTRIGHT = "|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight";
  const SELFSTARTEND = "|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd";
  const LEGACY = "|Legacy|LegacyLeft|LegacyRight|LegacyCenter";

  const AlignContent = "Normal|Stretch" + POSITIONS + SPACE + BASELINE;
  const JustifyContent = "Normal" + POSITIONS + SPACE + LEFTRIGHT;
  const AlignItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifyItems = "Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT + LEGACY;
  const AlignSelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND;
  const JustifySelf = "Auto|Normal|Stretch|AnchorCenter" + POSITIONS + BASELINE + SELFSTARTEND + LEFTRIGHT;

  function lowSpaceKebab(str) {
    return str
      .replace(/Around|Between|Evenly/g, "space-$&")
      .replace(/(Unsafe|Safe|Legacy)(?!$)/g, "$& ")
      .replace(/(Self|Flex|Anchor)(?!$)/g, "$&-")
      .replace(/First|Last/g, "$& baseline")
      .toLowerCase();
  }

  function makePlaceAligns(prop, name, one, two) {

    const res = {};
    for (let a of one.split("|")) {
      res[name + a] = { [prop]: lowSpaceKebab(a) };
      if (two)
        for (let b of two.split("|"))
          if (a != b)
            res[name + a + b] = { [prop]: lowSpaceKebab(a) + " " + lowSpaceKebab(b) };
    }
    return res;
  }

  return {
    placeContent: makePlaceAligns("placeContent", "content", AlignContent, JustifyContent),
    placeItems: makePlaceAligns("placeItems", "items", AlignItems, JustifyItems),
    placeSelf: makePlaceAligns("placeSelf", "self", AlignSelf, JustifySelf),
    alignItems: makePlaceAligns("alignItems", "items", AlignItems),
    alignSelf: makePlaceAligns("alignSelf", "self", AlignSelf),
    textAlign: makePlaceAligns("textAlign", "text", "Normal|Start|End|Center|Justify|Left|Right"),
  }
})();

// const PLACECONTENT = /^content(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|Stretch|Around|Between|Evenly|Baseline|First|Last)(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|Stretch|Around|Between|Evenly|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight)?$/;
// const PLACEITEMS = /^items(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight|Baseline|First|Last|Stretch|AnchorCenter|Legacy|LegacyLeft|LegacyRight|LegacyCenter)?$/;
// const PLACESELF = /^self(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Left|Right|SafeLeft|SafeRight|UnsafeLeft|UnsafeRight|Baseline|First|Last|Stretch|AnchorCenter)?$/;
// const ALIGNITEMS = /^items(Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)$/;
// const ALIGNSELF = /^self(Auto|Normal|Start|End|Center|SafeStart|SafeEnd|SafeCenter|UnsafeStart|UnsafeEnd|UnsafeCenter|FlexStart|FlexEnd|SafeFlexStart|SafeFlexEnd|UnsafeFlexStart|UnsafeFlexEnd|SelfStart|SelfEnd|SafeSelfStart|SafeSelfEnd|UnsafeSelfStart|UnsafeSelfEnd|Baseline|First|Last|Stretch|AnchorCenter)$/;
// const TEXTALIGN = /^text(Normal|Start|End|Center|Justify|Left|Right)$/;

// function placeAlign(prop, regex, str) {
//   const m = str.match(regex);
//   if (!m) return;
//   let [_, a, b] = m;
//   if (b && b != a) a += " " + b;
//   return { [prop]: lowSpaceKebab(a) };
// }

// function lowSpaceKebab(str) {
//   return str
//     .replace(/Around|Between|Evenly/g, "space-$&")
//     .replace(/(Unsafe|Safe|Legacy)(?!$)/g, "$& ")
//     .replace(/(Self|Flex|Anchor)(?!$)/g, "$&-")
//     .replaceAll(/First|Last/g, "$& baseline")
//     .toLowerCase();
// }

// const placeContent = str => placeAlign("placeContent", PLACECONTENT, str);
// const placeItems = str => placeAlign("placeItems", PLACEITEMS, str);
// const placeSelf = str => placeAlign("placeSelf", PLACESELF, str);
// const alignItems = str => placeAlign("alignItems", ALIGNITEMS, str);
// const alignSelf = str => placeAlign("alignSelf", ALIGNSELF, str);
// const textAlign = str => placeAlign("textAlign", TEXTALIGN, str);

//todo rename the text block layout unit to $page
function defaultLayout(display, ...args) {
  const containerDefaults = {
    wordSpacing: "unset",
    lineHeight: "unset",
    whiteSpace: "unset",
    hyphens: "unset",
    textAlign: "unset",
    textIndent: "unset",
  };
  return Object.assign({ display }, containerDefaults, ...args);
}
function checkReferenceError(args) {
  for (let a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
}
// const O2 = /^(|inline|block)(visible|hidden|clip)|(auto|scroll)(-snap(-mandatory)?)?$/

//overflowClipScroll
//overflowClipAuto
//overflowClip
//overflow
const O2 = /^(visible|hidden|clip)|(auto|scroll)(-snap(-mandatory)?)?$/;
function overflow(a) {
  let [inline, block] = a.split(":");
  const mI = inline.match(O2);
  if (!mI) return;
  const [, vhcI, overflowInline = vhcI, snapI, manI] = mI;
  const mB = block?.match(O2);
  let vhcB, overflowBlock, snapB, manB;
  if (mB)
    ([, vhcB, overflowBlock = vhcB, snapB, manB] = mB);
  const res = (!overflowBlock || overflowBlock == overflowInline) ?
    { overflow: overflowInline } :
    { overflowInline, overflowBlock };
  if (!snapI && !snapB) return res;
  res.scrollSnapType = snapI && snapB ? "both" : snapI ? "inline" : "block";
  if (manI || manB) res.scrollSnapType += " mandatory";
  return res;
}

function lineClamp(lines, ...args) {
  return Object.assign(block(...args), {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden"
  });
}

const LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
  textAlign: nativeAndMore.textAlign,
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
  breakWord: { overflowWrap: "break-word" },
  breakAnywhere: { overflowWrap: "anywhere" },
  nowrap: { whiteSpace: "nowrap" },
  preWrap: { whiteSpace: "pre-wrap" },
  preLine: { whiteSpace: "pre-line" },
  pre: { whiteSpace: "pre" },
  breakSpaces: { whiteSpace: "break-spaces" },
  ellipsis: { whiteSpace: "nowrap", textOverflow: "ellipsis" },
  breakAll: { wordBreak: "break-all" },
  keepAll: { wordBreak: "keep-all" },
  snapStop: { scrollSnapStop: "always" },
};

const _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textIndent: nativeAndMore.textIndent,
  indent: nativeAndMore.textIndent,
  w: nativeAndMore.width,
  h: nativeAndMore.height,
  width: nativeAndMore.width,
  height: nativeAndMore.height,
  snapStart: { scrollSnapAlign: "start" },
  snapStartCenter: { scrollSnapAlign: "start center" },
  snapStartEnd: { scrollSnapAlign: "start end" },
  snapCenter: { scrollSnapAlign: "center" },
  snapCenterStart: { scrollSnapAlign: "center start" },
  snapCenterEnd: { scrollSnapAlign: "center end" },
  snapEnd: { scrollSnapAlign: "end" },
  snapEndStart: { scrollSnapAlign: "end start" },
  snapEndCenter: { scrollSnapAlign: "end center" },
  noSnap: { scrollSnapAlign: "none" },
  // verticalAlign: AllFunctions.verticalAlign, //todo is this allowed for grid and flex?
};

function toGap(...args) {
  if (!args.length || args.length > 2)
    throw new SyntaxError("gap only accepts 1 or 2 arguments");
  if (args.length == 1 || args.length == 2 && args[0] == args[1])
    return { gap: args[0] };
  args = args.map(a => a == "unset" ? "normal" : a);
  return { gap: args[0] + " " + args[1] };
}
const GAP = { gap: toGap, g: toGap };

function blockGap(wordSpacing, lineHeight) {
  return { wordSpacing, lineHeight };
}

function block(...args) {
  args = args.map(a => typeof a !== "string" ? a : textAlign(a) ?? overflow(a) ?? a);
  checkReferenceError(args);
  return defaultLayout("block", ...args);
}
block.scope = {
  ...LAYOUT,
  lineClamp,
  clamp: lineClamp,
  gap: blockGap,
  g: blockGap,
};
function _block(...args) {
  checkReferenceError(args);
  return Object.assign(...args);
}
_block.scope = {
  ..._LAYOUT,
  floatStart: { float: "inline-start" },
  floatEnd: { float: "inline-end" },
};

function grid(...args) {
  args = args.map(a =>
    typeof a != "string" ? a :
      textAlign(a) ??
      placeContent(a) ??
      placeItems(a) ??
      overflow(a) ??
      a);
  checkReferenceError(args);
  return defaultLayout("grid", { placeItems: "unset", placeContent: "unset" }, ...args);
}
const nativeGrid = Object.fromEntries(Object.entries(nativeAndMore).filter(([k]) => k.match(/^grid[A-Z]/)));
grid.scope = {
  ...nativeGrid,
  cols: nativeGrid.gridTemplateColumns,
  columns: nativeGrid.gridTemplateColumns,
  rows: nativeGrid.gridTemplateRows,
  areas: nativeGrid.gridTemplateAreas,
  ...LAYOUT,
  ...GAP,
  //todo test this!!
  column: { gridAutoFlow: "column" },
  dense: { gridAutoFlow: "dense row" },
  denseColumn: { gridAutoFlow: "dense column" },
  denseRow: { gridAutoFlow: "dense row" },
};

//       1  2345   6789
// $grid(col(1,span(3))) => "{ gridColumn: 1 / span 3 }"
//
// $grid(colStartEnd(1,3)) => "{ gridColumn: 1 / 3 }"
// $grid(colSpan(1,3)) => "{ gridColumn: 1 / span 3 }"
//       1     2345   6
// $grid(column_1_span3) => "{ gridColumn: 1 / span 3 }"

// $flex

// $grid(col(1,4))
// $grid(col_1_4)
const column = (start, end) => ({ gridColumn: end ? `${start} / ${end}` : start });
const row = (start, end) => ({ gridRow: end ? `${start} / ${end}` : start });
const span = arg => `span ${arg}`;
column.scope = { span };
row.scope = { span };

function _grid(...args) {
  args = args.map(a => typeof a == "string" ? placeSelf(a) ?? a : a);
  checkReferenceError(args);
  return Object.assign(...args);
}
_grid.scope = {
  ..._LAYOUT,
  column,
  row,
};




function flex(...args) {
  args = args.map(a => typeof a != "string" ? a : overflow(a) ?? placeContent(a) ?? alignItems(a) ?? textAlign(a) ?? a);
  checkReferenceError(args);
  return defaultLayout("flex", { alignItems: "unset", placeContent: "unset" }, ...args);
}
flex.scope = {
  column: { flexDirection: "column" },
  columnReverse: { flexDirection: "column-reverse" },
  rowReverse: { flexDirection: "row-reverse" },
  row: { flexDirection: "row" },
  wrap: { flexWrap: "wrap" },
  wrapReverse: { flexWrap: "wrap-reverse" },
  noWrap: { flexWrap: "nowrap" },
  ...LAYOUT,
  ...GAP
};
function _flex(...args) {
  args = args.map(a => typeof a == "string" ? alignSelf(a) ?? a : a);
  checkReferenceError(args);
  return Object.assign(...args);
}

_flex.scope = {
  ..._LAYOUT,
  basis: a => ({ flexBasis: a }),
  grow: a => ({ flexGrow: a }),
  // g: a => ({ flexGrow: a }),
  shrink: a => ({ flexShrink: a }),
  // s: a => ({ flexShrink: a }),
  order: a => ({ order: a }),
  // o: a => ({ order: a }),
  //todo safe
};

const startsWithGridUndefined = Object.fromEntries(Object.entries(nativeAndMore).filter(([k]) => k.match(/^grid[A-Z]/)).map(([k]) => [k]));
const startsWithFlexUndefined = Object.fromEntries(Object.entries(nativeAndMore).filter(([k]) => k.match(/^flex[A-Z]/)).map(([k]) => [k]));

//todo undefining!!
//todo just run through all the functions inside the scope of the layout functions, get their keys, and then add a second entry with `flex` and `grid` as prefix
//todo and then make a new object with those values set to undefined. and then remove those from the default below.
//todo will not work, i think we must do it manually.

var layouts = {
  ...startsWithFlexUndefined,
  ...startsWithGridUndefined,
  order: undefined,
  float: undefined,
  gap: undefined,
  //are there other layout functions that we really want to block? yes.. All the ones that has to do with grid and flex and float.  
  margin: _LAYOUT.margin, //undefined,
  padding: LAYOUT.padding,//undefined,

  placeContent: undefined,
  justifyContent: undefined,
  alignContent: undefined,
  placeItems: undefined,
  justifyItems: undefined,
  alignItems: undefined,
  placeSelf: undefined,
  justifySelf: undefined,
  alignSelf: undefined,
  textAlign: undefined,

  block,
  _block,
  grid,
  _grid,
  flex,
  _flex,
  lineClamp,
};

class Color {

  constructor(colorStr) {
    const [R, G, B, A] = Color.cssomColor(colorStr);
    this.alpha = A;
    this.hex = Color.rgbToHex(R, G, B);
    const rgb = Color.linearizeRgb(R, G, B);
    const xyz = Color.linearRgbToXyz(rgb);
    const lab = Color.xyzToOKLab(xyz);
    const lch = Color.oklabToOklch(lab);
    Object.assign(this, rgb, xyz, lab, lch);
  }

  static #canvas = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  static cssomColor(colorStr) {
    this.#canvas.fillStyle = colorStr;
    this.#canvas.fillRect(0, 0, 1, 1);
    return this.#canvas.getImageData(0, 0, 1, 1).data;
  }

  static linearizeRgb(R, G, B) {
    const linearize = c => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return { R: linearize(R), G: linearize(G), B: linearize(B) };
  }

  static linearRgbToXyz({ R, G, B }) {
    const X = 0.4124564 * R + 0.3575761 * G + 0.1804375 * B;
    const Y = 0.2126729 * R + 0.7151522 * G + 0.0721750 * B;
    const Z = 0.0193339 * R + 0.1191920 * G + 0.9503041 * B;
    return { X, Y, Z };
  }

  static xyzToOKLab({ X, Y, Z }) {
    const l = 0.8189330101 * X + 0.3618667424 * Y - 0.1288597137 * Z;
    const m = 0.0329845436 * X + 0.9293118715 * Y + 0.0361456387 * Z;
    const s = 0.0482003018 * X + 0.2643662691 * Y + 0.6338517070 * Z;

    const lCube = Math.cbrt(l);
    const mCube = Math.cbrt(m);
    const sCube = Math.cbrt(s);

    const L = 0.2104542553 * lCube + 0.7936177850 * mCube - 0.0040720468 * sCube;
    const a = 1.9779984951 * lCube - 2.4285922050 * mCube + 0.4505937099 * sCube;
    const b = 0.0259040371 * lCube + 0.7827717662 * mCube - 0.8086757660 * sCube;

    return { L, a, b };
  }

  static oklabToOklch({ L, a, b }) {
    const C = Math.sqrt(a * a + b * b);
    let H = Math.atan2(b, a) * (180 / Math.PI);
    if (H < 0) H += 360;
    return { L, C, H };
  }

  static rgbToHex(R, G, B) {
    const toHex = (value) => value.toString(16).padStart(2, "0").toLowerCase();
    return `#${toHex(R)}${toHex(G)}${toHex(B)}`;
  };
}

function palette(role, color, onColor) {
  if (!role || !color || !onColor)
    throw "Missing parameters";

  const c = new Color(color);
  c.L = c.L.toFixed(3);
  c.H = Math.round(c.H);
  const C = c.C;
  const pop = ((.5 - C) * 50 % + C).toFixed(3);
  const accent = ((.5 - C) * 70 % + C).toFixed(3);
  const bland = (C * .5).toFixed(3);
  const onc = new Color(color);
  onc.L = onc.L.toFixed(3);
  onc.H = Math.round(onc.H);
  const onC = onc.C;
  const onPop = ((.5 - onC) * 50 % + onC).toFixed(3);
  const onAccent = ((.5 - onC) * 70 % + onC).toFixed(3);
  const onBland = (onC * .5).toFixed(3);

  return {
    [`--color-${role}`]: color,
    [`--color-${role}-pop`]: `oklch(${c.L}, ${pop}, ${c.H})`,
    [`--color-${role}-accent`]: `oklch(${c.L}, ${accent}, ${c.H})`,
    [`--color-${role}-bland`]: `oklch(${c.L}, ${bland}, ${c.H})`,

    [`--color-${role}1`]: onColor,
    [`--color-${role}-pop1`]: `oklch(${onc.L}, ${onPop}, ${onc.H})`,
    [`--color-${role}-accent1`]: `oklch(${onc.L}, ${onAccent}, ${onc.H})`,
    [`--color-${role}-bland1`]: `oklch(${onc.L}, ${onBland}, ${onc.H})`,
  }
}
palette.scope = {
  ...nativeAndMore.color.scope
};

var palette$1 = {
  palette
};

const SHORTS = {
  ...nativeAndMore,
  ...fonts,
  ...palette$1,
  ...layouts,
};

const MEDIA_WORDS = {
  progressive: "scan: progressive",
  interlace: "scan: interlace",
  dim: "light-level: dim",
  normalLight: "light-level: normal",
  washed: "light-level: washed",
  reducedData: "prefers-reduced-data: reduce",
  noReducedData: "prefers-reduced-data: no-preference",
  noScript: "scripting: none",
  initScript: "scripting: initial-only",
  reloadScript: "scripting: reload",
  stableScript: "scripting: stable",

  dark: "prefers-color-scheme: dark",
  light: "prefers-color-scheme: light",
  noColorScheme: "prefers-color-scheme: no-preference",
  portrait: "orientation: portrait",
  landscape: "orientation: landscape",
  highContrast: "prefers-contrast: high",
  lowContrast: "prefers-contrast: low",
  forcedContrast: "prefers-contrast: forced",
  reducedTransparency: "prefers-reduced-transparency: reduce",
  noReducedTransparency: "prefers-reduced-transparency: no-preference",
  forcedColors: "forced-colors: active",
  noForcedColors: "forced-colors: none",
  invertedColors: "inverted-colors: inverted",
  noInvertedColors: "inverted-colors: none",
  p3: 'color-gamut: p3',
  srgb: 'color-gamut: srgb',
  rec2020: 'color-gamut: rec2020',
  highDynamicRange: "dynamic-range: high",
  standardDynamicRange: "dynamic-range: standard",
  reducedMotion: "prefers-reduced-motion: reduce",
  noReducedMotion: "prefers-reduced-motion: no-preference",
  standalone: "display-mode: standalone",
  fullscreen: "display-mode: fullscreen",
  minimalUi: "display-mode: minimal-ui",
  browser: "display-mode: browser",
  windowControlsOverlay: "display-mode: window-controls-overlay",
  pip: "display-mode: picture-in-picture",
  slowUpdate: "update: slow",
  fastUpdate: "update: fast",
  noUpdate: "update: none",
  hover: "hover: hover",
  noHover: "hover: none",
  coarsePointer: "pointer: coarse",
  finePointer: "pointer: fine",
  noPointer: "pointer: none",
  grid: "grid: 1",
  bitmap: "grid: 0",
  anyHover: "any-hover: hover",
  anyNoHover: "any-hover: none",
  anyCoarsePointer: "any-pointer: coarse",
  anyFinePointer: "any-pointer: fine",
  anyNoPointer: "any-pointer: none",
  anyGrid: "any-grid: 1",
  anyBitmap: "any-grid: 0",
  screen: "screen",
  print: "print",
  all: "all",

  sm: "min-width:640px",
  md: "min-width:768px",
  lg: "min-width:1024px",
  xl: "min-width:1280px",
  xxl: "min-width:1536px",
  xxxl: "min-width:1920px",
  dark: "(prefers-color-scheme:dark)",
};


/*
todo not implemented. :edge should be included!
:first = :first-child;
:second = :nth-child(2);
:third = :nth-child(3);
:fourth = :nth-child(4);
:fifth = :nth-child(5);
:sixth = :nth-child(6);
:seventh = :nth-child(7);
:eighth = :nth-child(8);
:ninth = :nth-child(9);
:tenth = :nth-child(10);
:last = :last-child;
:edge = :first-child,:last-child;
:edge = :where(:first-child,:last-child); //this is correct
:edge = :is(:first,:last); //todo this is not correct, but it is a good start.
*/

/**
 * If you have a cssRules object, then you need to do:
 *   const extract = memoize(extractSelector, 333);
 *   const allShorts = [...cssRules].map(CSSS.extract);
 *   const parseFun = memoize(CSSS.parse, 333);
 *   sequence(allShorts, el.classList, parseFun);
 * 
 * @param {[string]} allShorts 
 * @param {[string]} classListShorts 
 * @param {Function} parseFun 
 * @returns {[string]} sequenced classListShorts
 */
function sequence(allShorts, classListShorts, parseFun) {
  const layerPosition = {};
  const res = [...classListShorts];
  for (let i = 0; i < res.length; i++) {
    const cls = res[i];
    const shortObj = parseFun(cls);
    if (!shortObj) continue; // not a short
    let pos = allShorts.indexOf(cls);
    if (pos == -1) pos = Infinity;
    if (pos >= layerPosition[shortObj.layer])
      layerPosition[shortObj.layer] = pos;
    else
      res[--i] = cls + "!"; // mark and redo!
  }
  return res;
}

//not useful, should be under interpret.
// function findLayerType(short) {
//   if (!short.includes("$")) return;
//   if (short[0] === "$") return "containerDefault";
//   if (short.startsWith("|$") return "itemDefault";
//   const shortWithoutQuote = short.replaceAll(/''/g, ""); // remove all text within quotes
//   const i = shortWithoutQuote.indexOf("$");
//   const j = shortWithoutQuote.indexOf("|");
//   if (j < 0 || i < j) return "container";
//   return "item";
// }

function extractShortSelector(rule) {
  if (!(rule instanceof CSSLayerStatementRule && rule.cssRules?.length == 1)) return false;
  rule = rule.cssRules[0];
  if (rule instanceof CSSMediaRule && rule.cssRules.length == 1) rule = rule.cssRules[0];
  if (!(rule instanceof CSSStyleRule) || rule.cssRules.length != 1) return false;
  return rule.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/g)?.[0] || false;
}
function extractShort(rule) {
  const className = extractShortSelector(rule);
  return className && className.slice(1).replaceAll("\\", "");
}

function extractAtRules(obj) {
  const atRules = {}, mainRule = {};
  for (let [k, v] of Object.entries(obj))
    (k.startsWith("@") ? atRules : mainRule)[k] = v;
  return { atRules, mainRule };
}

function kebabcaseKeys(obj) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) =>
    [k.startsWith("--") ? k : k.replace(/[A-Z]/g, "-$&").toLowerCase(), v]));
}

function checkProperty(obj) {
  for (let k in obj)
    if (CSS.supports(k, "inherit") && !CSS.supports(k, obj[k]))
      throw new SyntaxError(`Invalid CSS$ value: ${k} = ${obj[k]}`);
}

function bodyToTxt(rule, props) {
  const body = Object.entries(props).map(([k, v]) => `  ${k}: ${v};`).join("\n");
  return `${rule} {\n${body}\n}`;
}

function parse(short) {
  const clazz = "." + short.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
  short = short.match(/(.*?)\!*$/)[1];
  const { exp, media } = parseMediaQuery(short, MEDIA_WORDS);
  let [sel, ...exprList] = exp?.split("$");
  exprList = exprList.map(parseNestedExpression);
  exprList = exprList.map(s => s.interpret(SHORTS));
  exprList &&= clashOrStack(exprList);
  let { selector, item } = parseSelectorPipe(sel);
  const layer = (item ? "items" : "container") + (short.match(/^(\$|\|\$)/) ? "Default" : "");
  selector = clazz + selector; //todo, we always start with the class in the selector..
  exprList = kebabcaseKeys(exprList);
  const { atRules, mainRule } = extractAtRules(exprList);
  checkProperty(mainRule);
  let cssText = bodyToTxt(selector, mainRule);
  if (media) cssText = `@media ${media} {\n${cssText}\n}`;
  cssText = `@layer ${layer} {\n${cssText}\n}`;

  for (let atRule in atRules)
    atRules[atRule] = kebabcaseKeys(atRules[atRule]);
  const atRuleText = Object.entries(atRules).map(([rule, body]) => bodyToTxt(rule, body)).join("\n\n");
  return { short, layer, media, selector, mainRule, cssText, atRules, atRuleText };
  // const miniCssRule = {cssText, name: layer, cssRules: [{ media, cssRules: [{ selectorText: selector, style: { cssText: body }, props }] }]};
}

class Expression {

  constructor(name, args) {
    this.args = args;
    this.name = name;
  }

  interpret(scope) {
    const cb = scope?.[this.name];
    if (!cb)
      throw new ReferenceError(this.name);
    if (!(cb instanceof Function))
      return cb;
    try {
      const args = this.args.map(x =>
        x instanceof Expression ? x.interpret(cb.scope) :
          x === "." ? "unset" : //todo move this into the parser??
            cb.scope?.[x] instanceof Function ? cb.scope[x].call(cb.scope) :
              cb.scope?.[x] ? cb.scope[x] :
                x);
      return cb.call(scope, ...args);
    } catch (e) {
      if (e instanceof ReferenceError)
        e.message = this.name + "." + e.message;
      throw e;
    }
  }
}

const clashOrStack = (function () {
  const STACKABLE_PROPERTIES = {
    background: ", ",
    backgroundImage: ", ",
    backgroundPosition: ", ",
    backgroundRepeat: ", ",
    backgroundSize: ", ",
    backgroundOrigin: ", ",
    backgroundClip: ", ",
    backgroundBlendMode: ", ",
    backgroundAttachment: ", ",
    transition: ",",
    fontFamily: ",",
    voiceFamily: ",",
    textShadow: ",",
    boxShadow: ",",
    animation: ",",
    mask: ",",
    fontFeatureSettings: ",",
    willChange: ",",

    transform: " ",
    filter: " ",
    counterReset: " ",
    counterIncrement: " ",
    fontVariant: " ",
  };

  return function clashOrStack(shortsI) {
    const res = {};
    for (const obj of shortsI) {
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        if (!(k in res))
          res[k] = v;
        else if (k in STACKABLE_PROPERTIES)
          res[k] += (STACKABLE_PROPERTIES[k] + v);
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  }
})();

function varAndSpaceOperators(tokens) {
  const res = tokens.join("").split(/(---?[a-z][a-z0-9_-]*)/g);
  for (let i = res.length - 1; i >= 0; i--) {
    const env = res[i].startsWith("---");
    const comma = res[i + 1] == ",";
    const afterComma = res[i + 2];
    if (!res[i])
      res.splice(i, 1);
    else if (env && i % 2 && comma && afterComma)
      res.splice(i, 3, `env(${res[i].slice(3)}, ${res[i + 2]})`);
    else if (env && i % 2)
      res[i] = `env(${res[i].slice(3)})`;
    else if (i % 2 && comma && afterComma)
      res.splice(i, 3, `var(${res[i]}, ${res[i + 2]})`);
    else if (i % 2)
      res[i] = `var(${res[i]})`;
    else
      res[i] = res[i].replaceAll(/(?<!^|[+*/-])-|[+*/]/g, " $& ");
  }
  return res;
}

function impliedMultiplication(tokens) {
  for (let i = tokens.length - 2; i >= 1; i--) {
    if (tokens[i] === "(" && !tokens[i - 1].match(/(min|max|clamp|[+*/-])$/))
      tokens.splice(i, 0, "*");
    else if (tokens[i] === ")" && !tokens[i + 1].match(/^[+*/-]/))
      tokens.splice(i + 1, 0, "*");
  }
  return tokens;
}

function parseVarCalc(tokens) {
  const t2 = impliedMultiplication(tokens);
  const t3 = varAndSpaceOperators(t2);
  if (t3.length === 3 && t3[0] === "(" && t3[2] === ")")
    t3.shift(), t3.pop();
  if (t3.length === 1 && t3[0].startsWith("var(--"))
    return t3[0];
  const str = t3.join("");
  return str.includes(" ") ? `calc(${str})` : str;
}

const WORD = /^\$?[a-zA-Z_][a-zA-Z0-9_]*$/;
const CPP = /[,()$=;{}]/.source;
const nCPP = /[^,()$=;{}]+/.source;
const QUOTE = /([`'"])(?:\\.|(?!\2).)*?\2/.source;
const TOKENS = new RegExp(`(${QUOTE})|(\\s+)|(${CPP})|(${nCPP})`, "g");

function processToken([m, , , space]) {
  return space ? undefined : m;
}

function eatTokens(tokens) {
  for (let res = [], depth = 0; tokens.length;) {
    if (!depth && (tokens[0] === "," || tokens[0] === ")"))
      return res;
    if (tokens[0] === "(") depth++;
    if (tokens[0] === ")") depth--;
    res.push(tokens.shift());
  }
  throw "missing ')'";
}

function diveDeep(tokens, top) {
  const res = [];
  while (tokens.length) {                       //<
    let a = tokens[0].match(/^(?!["'])(?:\($|.*[+/*]|(?<![a-z])-|-(?![a-z]))/i) ?
      parseVarCalc(eatTokens(tokens)) :
      tokens.shift();
    if (a[0] === "#")
      a = new Expression("_hash", a.slice(1).split("#"));
    if (top && a === ",") throw "can't start with ','";
    if (top && a === ")") throw "can't start with ')'";
    if (a === ")" && !res.length) throw new SyntaxError("empty function not allowed in CSSs");
    if (a === "," || a === ")") {         //empty
      res.push(undefined);
      if (a === ")")
        return res;
      continue;
    }
    let b = tokens.shift();
    if (top && b === ",") throw "top level can't list using ','";
    if (top && b === ")") throw "top level can't use ')'";
    if (b === "(" && !a.match(WORD)) throw "invalid function name";
    if (b === "(") {
      a = new Expression(a, diveDeep(tokens));
      b = tokens.shift();
    }
    // if (a.match?.(WORD)) 
    //   a = a.replaceAll(/[A-Z]/g, c => '-' + c.toLowerCase());
    if (b === ")" && top && tokens.length)
      throw "too many ')'";
    if (b === ")" || (top && b === undefined))
      return res.push(a), res;
    if (b == ",")
      res.push(a);
    else
      throw "syntax error";
  }
  throw "missing ')'";
}

function parseNestedExpression(short) {
  const tokensOG = [...short.matchAll(TOKENS)].map(processToken).filter(Boolean);
  if (tokensOG.length === 1)
    return new Expression(tokensOG[0], []); //todo no calc top level
  const tokens = tokensOG.slice();
  try {
    return diveDeep(tokens, true)[0];
  } catch (e) {
    //todo add the error string to the e.message
    const i = tokensOG.length - tokens.length;
    tokensOG.splice(i, 0, `{{{${e}}}}`);
    const msg = tokensOG.join("");
    throw new SyntaxError("Invalid short: " + msg);
  }
}

//todo we don't support nested :not(:has(...))
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
const clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source; //class
const op = />>|[>+~&,!]/.source;
const selectorTokens = new RegExp(`(\\s+)|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");

function parseSelectorPipe(str) {
  //todo body1 must have star at the end. body2 must have star at the start. The where is star doesn't work with this.
  //todo also. I think that we should always have a star, and not end with empty. It is less confusing with ".something>*" than ".something>".
  //todo this will make the selector far more readable! also, it will make the parsing of body1 and body2 easier.

  let [body1, body2] = str.split("|").map(parseSelectorComma);
  body1 = body1?.join(", ");
  if (!body2)
    return { selector: body1 };
  body2 = body2?.join(", ");
  return { selector: body1 + ">" + (body2 || "*"), item: true };
}

function parseSelectorComma(str) {
  let tokens = [...str.matchAll(selectorTokens)];
  const badToken = tokens.find(([t, ws, select, error]) => error);
  if (badToken)
    throw `Bad selector token: ${badToken[0]}`;
  tokens = tokens.filter(([t, ws]) => !ws);
  const selects = [[]];
  for (const [t] of tokens)
    t === "," ? selects.push([]) : selects.at(-1).push(t);
  return selects.map(Selector.interpret);
}

class Selector {

  static findTail(body) {
    const j = body.findIndex(s => s === ">" || s === "+" || s === "~" || s === " ");
    if (j < 0)
      return [body];
    if (j === 0)
      return [null, body];
    const tail = body.slice(j);
    body = body.slice(0, j);
    return [body, tail];
  }

  static whereIsStar(select) {
    let i = select.indexOf("*");
    if (i === select.length - 1)
      return [select];
    if (i === 0)
      return [null, ...Selector.findTail(select)];
    if (i > 0)
      return [select.slice(0, i), ...Selector.findTail(select.slice(i + 1))];
    const first = select[0].match(/^[>+~]$/);
    const last = select.at(-1).match(/^[>+~]$/);
    if (first && last)
      throw `Relationship selector both front and back: ${select.join("")}`;
    return last ? [select] : [null, ...Selector.findTail(select)];
  }

  static superAndNots(select) {
    return select?.map((el, i, ar) => ar[i - 1] === "!" ? `:not(${el})` : el)
      .filter(el => el !== "!")
      .join("");
  }

  static interpret(select) {
    if (!select.length || select.length === 1 && select[0] === "*")
      return;
    select = select.map(s => s == ">>" ? " " : s);
    let [head, body, tail] = Selector.whereIsStar(select).map(Selector.superAndNots);
    tail &&= `:has(${tail})`;
    head &&= `:where(${head})`;
    const selector = [head, body, tail].filter(Boolean).join("");
    return selector ? `:where(${selector})` : selector;
  }
}

function mediaComparator(str) {
  const rx = new RegExp(
    "^(?:" +
    "(width|height|aspectRatio|resolution|color|monochrome|colorIndex)" +
    "(<=|>=|==|<|>)" +
    "(\\d+(?:\\.\\d+)?)" +
    "(?:" +
    "(px|em|rem|in|cm|mm|pt|pc)|" +
    "(dpi|dpcm|dppx)|" +
    "(\\/\\d+(?:\\.\\d+)?)" +
    ")?" +
    ")$");
  const m = str.match(rx);
  if (!m)
    return;
  let [, name, op, num, length, res, frac] = m;
  const type = length ?? res ?? frac ?? "";
  if (
    (name.match(/width|height/) && !length) ||
    (name == "aspectRatio" && (length || res)) ||
    (name == "resolution" && !res) ||
    (name.match(/color|monochrome|colorIndex/) && type)
  )
    throw new SyntaxError(`Invalid ${name}: ${num}${type}`);
  let snake = name.replace(/[A-Z]/g, "-$&").toLowerCase();
  if (op == "<")
    num = parseFloat(num) - 0.01;
  else if (op == ">")
    num = parseFloat(num) + 0.01;
  if (op.includes("<"))
    snake = `max-${snake}`;
  else if (op.includes(">"))
    snake = `min-${snake}`;
  return `${snake}: ${num}${type}`;
}

function parseMediaQuery(str, register) {
  if (str[0] !== "@")
    return { exp: str };
  if (str[1] !== "(") {
    const m = str.slice(1).match(/^[a-z][a-z0-9_]*/i);
    if (!m)
      throw new SyntaxError(`Invalid media query: "${str}".`);
    const word = m[0];
    const t = register[word];
    if (!t)
      throw new ReferenceError("@" + word);
    return { exp: str.slice(1 + word.length), media: `(${t})` };
  }
  let i = 2, tokens = [], level = 1;
  for (; i < str.length; i++) {
    if (str[i] == ",") tokens.push(str[i]);
    else if (str[i] == "(") level++, tokens.push(str[i]);
    else if (str[i] == ")") {
      if (!--level) { i++; break; }
      tokens.push(str[i]);
    }
    else if (str[i] === "!") tokens.push("not");
    else if (str[i] === "&") tokens.push("and");
    else if (str[i] === "|") tokens.push("or");
    else {
      let start = i;
      while (i < str.length && /[^,()&|!]/.test(str[i]))
        i++;
      const word = str.slice(start, i--);
      const t = mediaComparator(word) ?? register[word];
      if (!t)
        throw word.match(/^[a-z][a-z_0-9]*$/i) ?
          new ReferenceError("@" + word) :
          new SyntaxError(`Invalid media query: "${word}" in "${str}".`);
      tokens.push(
        t == "all" || t == "print" || t == "screen" ? t :
          `(${t})`
      );
    }
  }
  return { exp: str.slice(i), media: `${tokens.join(" ")}` };
}

/**
 * Use memoize to cache the results of this function.
 *    memoize(CSSS.parse, 333);
 * 
 * @param {String} short string to parse 
 * @returns {{ short: string, layer: string, media: string, selector: string, props: Object, cssText:string }}
 */
function memoize(fn, max = 333) {
  let young = new Map(), old = new Map();
  return function (arg) {
    if (young.size > max) { old = young; young = new Map(); }
    if (young.has(arg)) return young.get(arg);
    if (old.has(arg)) { const v = old.get(arg); young.set(arg, v); return v; }
    const v = fn(arg);
    young.set(arg, v);
    return v;
  };
}

function updateClassList(currentClassList, newClasses) {
  for (let i = 0; i < currentClassList.length; i++) {
    const cls = currentClassList[i];
    const sequencedCls = newClasses[i];
    if (cls !== sequencedCls)
      currentClassList.replace(cls, sequencedCls);
  }
}

/**
 * @param {Element} root from where to check for short occurrences 
 * @param {CSSStyleSheet} styleSheet with the shorts to check
 * @param {Function} reverseEngineer function to extract the class selector from a rule built by a csss short 
 * (the reverseEngineer function can be a memoized if needed) 
 */
function removeUnusedShorts(root, styleSheet, reverseEngineer = extractSelector) {
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    const rule = styleSheet.cssRules[i];
    const shortSelector = reverseEngineer(rule);
    if (shortSelector && !root.querySelector(shortSelector))
      styleSheet.deleteRule(i);
  }
}

function updateStyleText(styleEl) {
  styleEl.textContent = [...styleEl.sheet.cssRules].map(r => r.cssText).join('\n');
}

//DEMO FOR HOW TO PATCH FONT IMPORTS IN CSSS
// (function () {

//   //extracts only the first fontFamily if it is in a body.
//   function extractFontFamily(style) {
//     const fontFamily = style.fontFamily ??
//       Object.entries(style).find(([k]) => k.endsWith('FontFamily'))?.[1];
//     return fontFamily.split(',')[0].trim().replace(/['"]/g, '');
//   }

//   //adds a fonts.googleapis.com/css2 import to the styleSheet if needed for the fontFamily
//   async function patchFontFamilyIfNeeded(styleSheet, family) {
//     await document.fonts.ready();
//     if (document.fonts.check(family))
//       return;
//     family = `@import url('https://fonts.googleapis.com/css2?display=swap&family=${family.replace(/ /g, '+')}');`;
//     styleSheet.insertRule(familyImport, 1); //1 is the first @import; 0 is the @layer; rule
//   }


//   //ho function that returns undefined if the same result has already been given before
//   function onlyOnce(fn) {
//     const done = new Set();
//     return function onlyOnce(...args) {
//       const res = fn(...args);
//       if (done.has(res)) return undefined;
//       done.add(res);
//       return res;
//     };
//   }

//   let shorts;      //list of shorts to parse and check.
//   let styleSheet; // the stylesheet that is used to check for font patches.

//   const familyExtractor = onlyOnce(extractFontFamily);
//   for (let short of shorts) {
//     const { full, body } = CSSS.parser(short);
//     styleSheet.insertRule(full, styleSheet.cssRules.length);
//     //the rule is now added, and the browser will try to load the font. async.
//     const family = familyExtractor(body);
//     if (family) //first and only time we encounter a new fontFamily
//       patchFontImports(styleSheet, family);
//   }
// });

export { extractShort, extractShortSelector, memoize, parse, removeUnusedShorts, sequence, updateClassList, updateStyleText };
//# sourceMappingURL=csss.js.map
