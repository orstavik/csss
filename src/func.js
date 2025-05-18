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
  function _hash(a, ...others) {
    if (others.length) throw "hash(can only have 1 argument)";
    //#123 => hash(123) => #123
    //#primary_a80 => hash(primary) => var(--color_primary_a80)
    return !a.match(/^[a-f0-9]{3,8}$/) || a.length == 5 || a.length == 7 ?
      `var(--color_${a})` : `#${a}`;
  }

  const res = {
    _hash,
    rgb: (...args) => nativeCssColorFunction("rgb", ...args),
    rgba: (...args) => nativeCssColorFunction("rgba", ...args),
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
const ColorFunctionStart = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|colorMix)\(/.source;
const ColorVar = /^var\(--color_/.source;
const ColorHash = /^#[a-fA-F0-9]{3,8}$/.source;
const ColorString = new RegExp(`${ColorNames}|${ColorFunctionStart}|${ColorVar}|${ColorHash}`);

export function isColor(x) {
  return ColorString.test(x) && x;
}

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



//$bg
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
        args2.push(a.replaceAll(/[A-Z]/g, ' $&').toLowerCase());
  return { res, colors, args2 };
}

function doGradient(name, ...args) {
  const { res, colors, args2 } = bgImpl(...args);
  if (res.stops) {
    for (let i = 0; i < res.stops?.length && i < colors.length; i++)
      colors[i] += " " + res.stops[i];
    delete res.stops;
  }
  res.backgroundImage = `${name}-gradient(${[...args2, ...colors].join(",")})`;
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
    stops: (...args) => ({ stops: args }),
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
};

// NativeCssProperties.borderColor = (...args) => borderSwitch(toLogicalFour("Color", ...args));
// NativeCssProperties.borderColor.scope = NativeCssProperties.color.scope;


function isFontFamily(x) {
  //"Zapf Dingbats"|"Arial Black"|"Andale Mono"|"Palatino Times"|"DejaVu Sans"|"DejaVu Serif"|"DejaVu Sans Mono"|"Liberation Sans"|"Liberation Serif"|"Liberation Mono"|"Nimbus Roman No9 L"|"Nimbus Sans L"|"Nimbus Mono L"|"Century Schoolbook L"|"URW Chancery L"|"URW Gothic L"|"URW Bookman L"|"Comic Sans MS"|"Apple Chancery"|"Marker Felt"|"Lucida Console"|"Lucida Sans Unicode"|"Palatino Linotype"|"Segoe UI"|"Times New Roman"|"Trebuchet MS"|"Lucida Grande"|"Hoefler Text"|"American Typewriter"|"Gill Sans"|"Book Antiqua"|"Century Gothic"|"Franklin Gothic Medium"|"Bookman Old Style"|"Brush Script MT"|"Helvetica Neue"|"Courier Monaco"|"sans-serif"|"system-ui"|"ui-serif"|"ui-sans-serif"|"ui-monospace"|"ui-rounded"|"-apple-system"
  if (x.match?.(/^(serif|monospace|cursive|fantasy|emoji|math|fangsong|Arial|Calibri|Cambria|Candara|Consolas|Constantia|Corbel|Georgia|Impact|Tahoma|Verdana|Garamond|Helvetica|Geneva|Didot|Optima|Futura|Baskerville|Copperplate|Menlo|Monaco|Chalkboard|Wingdings|Webdings|Symbol|BlinkMacSystemFont|Roboto)$/i))
    return x;
  if (x[0] === "'" || x[0] === '"')
    return x.replaceAll("+", " ");
  if (x.match(/^url\(/))
    return x;
  const KNOWN_BAD_FONT_NAMES = {
    "comic": "Comic Sans MS",
    "comic sans": "Comic Sans MS",
    "times": "Times New Roman",
    "courier": "Courier New",
    "palatino": "Palatino Linotype",
    "helvetica": "Helvetica Neue",
    "lucida": "Lucida Sans Unicode",
  };
  return KNOWN_BAD_FONT_NAMES[x];
}
//$font("Arial+Black",serif,bold,small-caps,ultra-condensed,capitalize,sans-serif,oblique(-10deg),ui-sans-serif)
//$font("Arial+Black",sans-serif,ui-sans-serif,900,small-caps,ultra-condensed,capitalize,oblique(10deg))
const FONT = {
  fontStyle: x => x.match(/^(italic|oblique)$/i),
  fontWeight: x => x.match(/^(bold|bolder|lighter|[1-9]00)$/i),
  fontVariantCaps: x => x.match(/^(smallCaps|allSmallCaps|petiteCaps|allPetiteCaps|unicase|titlingCaps)$/i),
  fontStretch: x => x.match(/^(ultraCondensed|extraCondensed|condensed|semiCondensed|normal|semiExpanded|expanded|extraExpanded|ultraExpanded)$/i),
  textTransform: x => x.match(/^(capitalize|uppercase|lowercase|fullWidth|fullSizeKana|mathAuto)$/i),
  letterSpacing: x => x.match(/^-?[0-9]*\.?[0-9]+([a-z]+|%)$/i),
  // fontSize: x => x.match(/^(xxSmall|xSmall|small|medium|large|x-large|xx-large|smaller|larger)$/i),
  // fontSizeAdjust: x => x.match(/^[0-9]*\.?[0-9]+$/),
  // color: isColor,
};
function matchFontProperty(a) {
  for (const type in FONT)
    if (FONT[type](a))
      return type;
}

function font(...args) {
  const res = Object.entries(FONT).reduce((acc, [k, v]) => ((acc[k] = "unset"), acc), {});
  let v;
  for (const a of args) {
    const type = matchFontProperty(a);
    if (type)
      res[type] = a;
    else if (v = isFontFamily(a))
      (res.fontFamily ??= []).push(v);
    else
      throw `Unrecognized font property: ${a}`;
  }
  return res;
}
font.scope = {
  oblique: (...args) => ["oblique", ...args].join(" "),
  url: (...args) => `url(${args.join(" ")})`,
}

/**
 * 
$capitalize = $textTransform(capitalize);
$uppercase = $textTransform(uppercase);
$lowercase = $textTransform(lowercase);
$mathAuto = $textTransform(mathAuto);
 
 */
const fontShorts = {
  bold: function (...args) { return this.fontStyle("bold", ...args); },
  italic: function (...args) { return this.fontStyle("italic", ...args); },
  oblique: function (...args) { return this.fontStyle("oblique", ...args); },
  smallCaps: function (...args) { return this.fontVariantCaps("smallCaps", ...args); },
  allSmallCaps: function (...args) { return this.fontVariantCaps("allSmallCaps", ...args); },
  petiteCaps: function (...args) { return this.fontVariantCaps("petiteCaps", ...args); },
  allPetiteCaps: function (...args) { return this.fontVariantCaps("allPetiteCaps", ...args); },
  unicase: function (...args) { return this.fontVariantCaps("unicase", ...args); },
  titlingCaps: function (...args) { return this.fontVariantCaps("titlingCaps", ...args); },
  ultraCondensed: function (...args) { return this.fontStretch("ultraCondensed", ...args); },
  extraCondensed: function (...args) { return this.fontStretch("extraCondensed", ...args); },
  condensed: function (...args) { return this.fontStretch("condensed", ...args); },
  semiCondensed: function (...args) { return this.fontStretch("semiCondensed", ...args); },
  semiExpanded: function (...args) { return this.fontStretch("semiExpanded", ...args); },
  expanded: function (...args) { return this.fontStretch("expanded", ...args); },
  extraExpanded: function (...args) { return this.fontStretch("extraExpanded", ...args); },
  ultraExpanded: function (...args) { return this.fontStretch("ultraExpanded", ...args); },
  serif: function (...args) { return this.fontFamily("serif", ...args); },
  monospace: function (...args) { return this.fontFamily("monospace", ...args); },
  cursive: function (...args) { return this.fontFamily("cursive", ...args); },
  fantasy: function (...args) { return this.fontFamily("fantasy", ...args); },
  sansSerif: function (...args) { return this.fontFamily("sansSerif", ...args); },
  systemUi: function (...args) { return this.fontFamily("systemUi", ...args); },
  uiSerif: function (...args) { return this.fontFamily("uiSerif", ...args); },
  uiSansSerif: function (...args) { return this.fontFamily("uiSansSerif", ...args); },
}

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
  ...fontShorts,
  em: NativeCssProperties.fontSize,
  ...BackgroundFunctions,
  w: width,
  h: height,
  width,
  height,
};
