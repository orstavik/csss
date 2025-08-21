import { default as NativeCssProperties, isLength, isColor, toLogicalFour, toRadiusFour, toLogicalEight, borderSwitch } from "./func.js";

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
  //it should default to borderWidth handling of the arguments.
  ...NativeCssProperties.borderWidth.scope, //we want the min/max/clamp and transition properties.
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

export default {
  border,
  borderWidth: undefined,
  borderStyle: undefined,
  borderRadius: undefined,
  // borderColor: undefined,
  ...BackgroundFunctions,
};