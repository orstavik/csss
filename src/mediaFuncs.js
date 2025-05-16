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
}

function isComparator(str) {
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

const WORD = /^[a-zA-Z][a-zA-Z_0-9]*$/;

export function parseMediaQuery(str) {
  if (str[0] !== "@")
    return { str };
  if (str[1] !== "(")
    debugger
  let i = 2, tokens = [], level = 1;
  for (; i < str.length; i++) {
    if (str[i] == ",") tokens.push(str[i]);
    else if (str[i] == "(") level++, tokens.push(str[i]);
    else if (str[i] == ")") {
      level--;
      if (level === 0)
        break;
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
      const t = isComparator(word) ?? MEDIA_WORDS[word];
      if (!t)
        throw word.match(WORD) ?
          new ReferenceError(word) :
          new SyntaxError(`Invalid media query: "${word}" in "${str}".`);
      tokens.push(`(${t})`);
    }
  }
  return { str: str.slice(i), media: `@media ${tokens.join(" ")}` };
}