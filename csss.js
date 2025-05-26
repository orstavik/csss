// src/Parser.js
var Rule = class {
  static interpret(exp, registries, renames) {
    const { shorts: scope, medias: MEDIA_WORDS2 } = registries;
    const clazz2 = "." + exp.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
    const { str, media } = parseMediaQuery(exp, MEDIA_WORDS2);
    exp = str;
    let [sel, ...exprList] = exp?.split("$");
    exprList = exprList.map((s) => parseNestedExpression(s));
    exprList = exprList.map((s) => s.interpret(scope));
    exprList &&= clashOrStack(exprList);
    let { selector, item } = parseSelectorPipe(sel);
    selector = clazz2 + selector;
    const body = Object.entries(exprList).map(([k, v]) => {
      k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
      if (CSS.supports(k, "inherit")) {
        if (!CSS.supports(k, v) && !CSS.supports(k = renames[k] ?? k, v))
          throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
      }
      return `  ${k}: ${v};`;
    }).join("\n");
    let rule = `${selector} {
${body}
}`;
    let key = selector;
    if (media) {
      rule = `${media} { ${rule} }`;
      key = `${media} { ${selector}`;
    }
    return { rule, key, item };
  }
};
var Expression = class _Expression {
  constructor(name, args) {
    this.args = args;
    this.name = name;
  }
  interpret(scope) {
    const cb = scope?.[this.name];
    if (!cb)
      throw new ReferenceError(this.name);
    try {
      const args = this.args.map((x) => x instanceof _Expression ? x.interpret(cb.scope) : x === "." ? "unset" : (
        //todo move this into the parser??
        cb.scope?.[x] instanceof Function ? cb.scope[x].call(cb.scope) : cb.scope?.[x] ? cb.scope[x] : x
      ));
      return cb.call(scope, ...args);
    } catch (e) {
      if (e instanceof ReferenceError)
        e.message = this.name + "." + e.message;
      throw e;
    }
  }
};
var clashOrStack = /* @__PURE__ */ function() {
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
    fontVariant: " "
  };
  return function clashOrStack2(shortsI) {
    const res = {};
    for (const obj of shortsI) {
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        if (!(k in res))
          res[k] = v;
        else if (k in STACKABLE_PROPERTIES)
          res[k] += STACKABLE_PROPERTIES[k] + v;
        else
          throw new SyntaxError(`CSS$ clash: ${k} = ${res[k]}  AND = ${v}.`);
      }
    }
    return res;
  };
}();
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
var WORD = /^\$?[a-zA-Z_][a-zA-Z0-9_]*$/;
var CPP = /[,()$=;{}]/.source;
var nCPP = /[^,()$=;{}]+/.source;
var QUOTE = /([`'"])(?:\\.|(?!\2).)*?\2/.source;
var TOKENS = new RegExp(`(${QUOTE})|(\\s+)|(${CPP})|(${nCPP})`, "g");
function processToken([m, , , space]) {
  return space ? void 0 : m;
}
function eatTokens(tokens) {
  for (let res = [], depth = 0; tokens.length; ) {
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
  while (tokens.length) {
    let a = tokens[0].match(/^\($|^(?!["']).*[+/*]|(?<![a-z])-|-(?![a-z])/) ? parseVarCalc(eatTokens(tokens)) : tokens.shift();
    if (a[0] === "#")
      a = new Expression("_hash", [a.slice(1)]);
    if (top && a === ",") throw "can't start with ','";
    if (top && a === ")") throw "can't start with ')'";
    if (a === "," || a === ")") {
      res.push(void 0);
      if (a === ")" && !res.length)
        throw new SyntaxError("empty function not allowed in CSSs");
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
    if (b === ")" && top && tokens.length)
      throw "too many ')'";
    if (b === ")" || top && b === void 0)
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
    return new Expression(tokensOG[0], []);
  const tokens = tokensOG.slice();
  try {
    return diveDeep(tokens, true)[0];
  } catch (e) {
    const i = tokensOG.length - tokens.length;
    tokensOG.splice(i, 0, `{{{${e}}}}`);
    const msg = tokensOG.join("");
    throw new SyntaxError("Invalid short: " + msg);
  }
}
var pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
var at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
var tag = /[a-zA-Z][a-zA-Z0-9-]*/.source;
var clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source;
var op = />>|[>+~&,!]/.source;
var selectorTokens = new RegExp(`(\\s+)|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");
function parseSelectorPipe(str) {
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
var Selector = class _Selector {
  static findTail(body) {
    const j = body.findIndex((s) => s === ">" || s === "+" || s === "~" || s === " ");
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
      return [null, ..._Selector.findTail(select)];
    if (i > 0)
      return [select.slice(0, i), ..._Selector.findTail(select.slice(i + 1))];
    const first = select[0].match(/^[>+~]$/);
    const last = select.at(-1).match(/^[>+~]$/);
    if (first && last)
      throw `Relationship selector both front and back: ${select.join("")}`;
    return last ? [select] : [null, ..._Selector.findTail(select)];
  }
  static superAndNots(select) {
    return select?.map((el, i, ar) => ar[i - 1] === "!" ? `:not(${el})` : el).filter((el) => el !== "!").join("");
  }
  static interpret(select) {
    if (!select.length || select.length === 1 && select[0] === "*")
      return;
    select = select.map((s) => s == ">>" ? " " : s);
    let [head, body, tail] = _Selector.whereIsStar(select).map(_Selector.superAndNots);
    tail &&= `:has(${tail})`;
    head &&= `:where(${head})`;
    const selector = [head, body, tail].filter(Boolean).join("");
    return selector ? `:where(${selector})` : selector;
  }
};
function mediaComparator(str) {
  const rx = new RegExp(
    "^(?:(width|height|aspectRatio|resolution|color|monochrome|colorIndex)(<=|>=|==|<|>)(\\d+(?:\\.\\d+)?)(?:(px|em|rem|in|cm|mm|pt|pc)|(dpi|dpcm|dppx)|(\\/\\d+(?:\\.\\d+)?))?)$"
  );
  const m = str.match(rx);
  if (!m)
    return;
  let [, name, op2, num, length, res, frac] = m;
  const type = length ?? res ?? frac ?? "";
  if (name.match(/width|height/) && !length || name == "aspectRatio" && (length || res) || name == "resolution" && !res || name.match(/color|monochrome|colorIndex/) && type)
    throw new SyntaxError(`Invalid ${name}: ${num}${type}`);
  let snake = name.replace(/[A-Z]/g, "-$&").toLowerCase();
  if (op2 == "<")
    num = parseFloat(num) - 0.01;
  else if (op2 == ">")
    num = parseFloat(num) + 0.01;
  if (op2.includes("<"))
    snake = `max-${snake}`;
  else if (op2.includes(">"))
    snake = `min-${snake}`;
  return `${snake}: ${num}${type}`;
}
function parseMediaQuery(str, register) {
  if (str[0] !== "@")
    return { str };
  if (str[1] !== "(") {
    const m = str.slice(1).match(/^[a-z][a-z0-9_]*/i);
    if (!m)
      throw new SyntaxError(`Invalid media query: "${str}".`);
    const word = m[0];
    const t = register[word];
    if (!t)
      throw new ReferenceError("@" + word);
    return { str: str.slice(1 + word.length), media: `@media (${t})` };
  }
  let i = 2, tokens = [], level = 1;
  for (; i < str.length; i++) {
    if (str[i] == ",") tokens.push(str[i]);
    else if (str[i] == "(") level++, tokens.push(str[i]);
    else if (str[i] == ")") {
      if (!--level) {
        i++;
        break;
      }
      tokens.push(str[i]);
    } else if (str[i] === "!") tokens.push("not");
    else if (str[i] === "&") tokens.push("and");
    else if (str[i] === "|") tokens.push("or");
    else {
      let start = i;
      while (i < str.length && /[^,()&|!]/.test(str[i]))
        i++;
      const word = str.slice(start, i--);
      const t = mediaComparator(word) ?? register[word];
      if (!t)
        throw word.match(/^[a-z][a-z_0-9]*$/i) ? new ReferenceError("@" + word) : new SyntaxError(`Invalid media query: "${word}" in "${str}".`);
      tokens.push(
        t == "all" || t == "print" || t == "screen" ? t : `(${t})`
      );
    }
  }
  return { str: str.slice(i), media: `@media ${tokens.join(" ")}` };
}

// src/func.js
var LENGTHS_PER = /px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%/.source;
var N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
var NUM = `(${N})(?:\\/(${N}))?`;
function toRadiusFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  return {
    [NAME + "StartStart"]: ar[0],
    [NAME + "EndEnd"]: ar[2] ?? ar[0],
    [NAME + "StartEnd"]: ar[1],
    [NAME + "EndStart"]: ar[3] ?? ar[1]
  };
}
function toLogicalFour(NAME, ...ar) {
  if (!(ar instanceof Array))
    return { [NAME]: ar };
  if (ar.length === 1)
    return { [NAME]: ar[0] };
  if (ar.length === 2)
    return {
      [NAME + "Block"]: ar[0],
      [NAME + "Inline"]: ar[1]
    };
  if (ar.length === 3)
    return {
      [NAME + "BlockStart"]: ar[0],
      [NAME + "Inline"]: ar[1],
      [NAME + "BlockEnd"]: ar[2]
    };
  return {
    [NAME + "BlockStart"]: ar[0],
    [NAME + "InlineStart"]: ar[1],
    [NAME + "BlockEnd"]: ar[2],
    [NAME + "InlineEnd"]: ar[3]
  };
}
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
function isLength(x) {
  if (x === "0") return x;
  const m = x.match?.(new RegExp(`^(${NUM})(${LENGTHS_PER})$`));
  if (!m) return;
  let [, , n, frac, unit] = m;
  return frac ? Number(n) / Number(frac) + unit : x;
}
var NativeCssScopeMath = {
  min: (...args) => `min(${args.join(",")})`,
  max: (...args) => `max(${args.join(",")})`,
  clamp: (...args) => `clamp(${args.join(",")})`,
  minmax: (...args) => `minmax(${args.join(",")})`
  //only used in grid, but native valid property+value check captures wrong use
};
for (const v of Object.values(NativeCssScopeMath))
  v.scope = NativeCssScopeMath;
var NativeCssScopeRepeat = (i, ...args) => `repeat(${i}, ${args.join(" ")})`;
NativeCssScopeRepeat.scope = NativeCssScopeMath;
var NativeCssScopeUrl = (...args) => `url(${args.join(" ")})`;
var NativeCssScopeAttrCounter = {
  counter: (...args) => `counter(${args.join(",")})`,
  counters: (...args) => `counters(${args.join(",")})`,
  attr: (...args) => {
    args[0] = args[0].replace(":", " ");
    return `attr(${args.join(",")})`;
  }
};
var NativeColorsFunctions = function() {
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
    cSpace = "in " + cSpace.replaceAll("_", " ");
    if (args[0]?.match(/^(shorter|longer|increasing|decreasing)$/))
      cSpace += ` ${args.shift()} hue`;
    args = args.map((a) => (a.match(/^\d?\d%$/i) ? " " : ", ") + a);
    return `color-mix(${cSpace}${args.join("")})`;
  }
  function _hash(a, ...others) {
    if (others.length) throw "hash(can only have 1 argument)";
    if (a.match(/^[a-f0-9]{3,8}$/) && a.length != 5 && a.length != 7)
      return `#${a}`;
    return `var(--color_${a})`;
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
    colorMix: nativeCssColorMixFunction
  };
  for (const cb of Object.values(res))
    cb.scope = { ...NativeCssScopeMath };
  return res;
}();
var ColorNames = /^(aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen)$/i.source;
var ColorFunctionStart = /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|colorMix)\(/.source;
var ColorVar = /^var\(--color_/.source;
var ColorHash = /^#[a-fA-F0-9]{3,8}$/.source;
var ColorString = new RegExp(`${ColorNames}|${ColorFunctionStart}|${ColorVar}|${ColorHash}`);
function isColor(x) {
  return ColorString.test(x) && x;
}
var transitionFunctionSet = /* @__PURE__ */ function() {
  function transition(props, dur, type, delay = "") {
    return { transition: `${props} ${dur} ${type} ${delay}` };
  }
  return function transitionFunctionSet2(...props) {
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
      cubicBezier: (dur, x1, y1, x2, y2, delay) => transition(props, dur, `cubic-bezier(${x1},${y1},${x2},${y2})`, delay)
    };
  };
}();
var NativeCssProperties = function() {
  const style = document.createElement("div").style;
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
  res.content.scope = Object.assign(res.content.scope ?? {}, NativeCssScopeAttrCounter);
  return res;
}();
var NativeCssFilterFunctions = {
  blur: (...args) => ({ filter: `blur(${args.join(" ")})` }),
  brightness: (...args) => ({ filter: `brightness(${args.join(" ")})` }),
  contrast: (...args) => ({ filter: `contrast(${args.join(" ")})` }),
  grayscale: (...args) => ({ filter: `grayscale(${args.join(" ")})` }),
  invert: (...args) => ({ filter: `invert(${args.join(" ")})` }),
  opacity: (...args) => ({ filter: `opacity(${args.join(" ")})` }),
  saturate: (...args) => ({ filter: `saturate(${args.join(" ")})` }),
  sepia: (...args) => ({ filter: `sepia(${args.join(" ")})` }),
  dropShadow: (...args) => ({ filter: `drop-shadow(${args.join(" ")})` }),
  hueRotate: (...args) => ({ filter: `hue-rotate(${args.join(" ")})` })
};
for (const cb of Object.values(NativeCssFilterFunctions))
  cb.scope = { ...NativeCssScopeMath };
NativeCssFilterFunctions.filterUrl = (...args) => ({ filter: `url(${args.join(" ")})` });
var NativeCssTransformFunctions = {
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
  skewY: (...args) => ({ transform: `skewY(${args.join(",")})` })
};
for (const cb of Object.values(NativeCssTransformFunctions))
  cb.scope = { ...NativeCssScopeMath };
var ANIMATION_FUNCTIONS = {
  linear: (...args) => `linear(${args[0]},${args.length > 2 ? args.slice(1, -1).join(" ") + "," : ""}${args[args.length - 1]})`,
  ease: (...args) => `ease(${args.join(",")})`,
  steps: (...args) => `steps(${args.join(",")})`,
  cubicBezier: (...args) => `cubic-bezier(${args.join(",")})`
};
NativeCssProperties.animation.scope = ANIMATION_FUNCTIONS;
var UnpackedNativeCssProperties = {
  ...NativeCssProperties,
  transform: void 0,
  ...NativeCssTransformFunctions,
  filter: void 0,
  ...NativeCssFilterFunctions
};
function bgImpl(...args) {
  const res = {
    backgroundImage: void 0,
    backgroundPosition: "0% 0%",
    backgroundRepeat: "repeat",
    backgroundSize: "auto auto",
    backgroundOrigin: "padding-box",
    backgroundClip: "border-box",
    backgroundBlendMode: "normal",
    backgroundAttachment: "scroll"
  };
  const colors = [], args2 = [];
  for (const a of args)
    a && typeof a === "object" ? Object.assign(res, a) : isColor(a) ? colors.push(a) : args2.push(a.replaceAll(/[A-Z]/g, " $&").toLowerCase());
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
var BackgroundFunctions = {
  linear: (...args) => doGradient("linear", ...args),
  radial: (...args) => doGradient("radial", ...args),
  conic: (...args) => doGradient("conic", ...args),
  repeatingLinear: (...args) => doGradient("repeating-linear", ...args),
  repeatingRadial: (...args) => doGradient("repeating-radial", ...args),
  repeatingConic: (...args) => doGradient("repeating-conic", ...args),
  bg,
  background: bg
};
for (const k in BackgroundFunctions)
  BackgroundFunctions[k].scope = {
    stops: (...args) => ({ stops: args }),
    ...NativeCssProperties.background.scope,
    ...NativeCssScopeMath,
    //todo do we need this, or is it covered by background above?
    pos: (block2 = "0", inline = "0") => ({ backgroundPosition: `${block2[0] === "-" ? `bottom ${block2.slice(1)}` : block2} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
    position: (block2 = "0", inline = "0") => ({ backgroundPosition: `${block2[0] === "-" ? `bottom ${block2.slice(1)}` : block2} ${inline[0] === "-" ? `right ${inline.slice(1)}` : inline}` }),
    size: (inline, block2 = "auto") => ({ backgroundSize: `${inline} ${block2}` }),
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
    local: { backgroundAttachment: "local" }
  };
function border(...args) {
  args = args.map((a) => {
    if (!(typeof a === "string")) return a;
    if (isColor(a))
      return { Color: a };
    if (isLength(a) || a.match(/(^(min|max|clamp)\()/))
      return { Width: a };
    return a;
  });
  return borderSwitch(Object.assign({ Style: "solid" }, ...args));
}
var borderColor = toLogicalFour.bind(null, "Color");
borderColor.scope = NativeCssProperties.borderColor.scope;
var borderWidth = toLogicalFour.bind(null, "Width");
borderWidth.scope = NativeCssProperties.borderWidth.scope;
var borderRadius = toRadiusFour.bind(null, "Radius");
borderRadius.scope = NativeCssProperties.borderRadius.scope;
var borderRadius8 = toLogicalEight.bind(null, "Radius", 0);
borderRadius8.scope = NativeCssProperties.borderRadius.scope;
var borderStyle = toLogicalFour.bind(null, "Style");
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
  thick: { Width: "thick" }
};
function toSize(NAME, ...args) {
  args = args.map((a) => a?.replace(/^(min|max)$/, "$&-content"));
  if (args.length === 1)
    return { [NAME]: args[0] };
  if (args.length === 3) {
    const NAME2 = NAME.replace(/^./, (c) => c.toUpperCase());
    return {
      [`min${NAME2}`]: args[0],
      [NAME]: args[1],
      [`max${NAME2}`]: args[2]
    };
  }
  throw new SyntaxError(`$${NAME} accepts only 1 or 3 arguments: ${args}`);
}
var width = (...args) => toSize("inlineSize", ...args);
var height = (...args) => toSize("blockSize", ...args);
width.scope = NativeCssProperties.width.scope;
height.scope = NativeCssProperties.height.scope;
function textDecoration(textDecorationLine = "underline", textDecorationStyle = "unset", textDecorationThickness = "unset", textDecorationColor = "var(--color_textdecorationcolor, currentcolor)") {
  return { textDecorationLine, textDecorationThickness, textDecorationStyle, textDecorationColor };
}
textDecoration.scope = {
  ...NativeCssProperties.textDecorationThickness.scope,
  ...NativeCssProperties.textDecorationColor.scope
};
var textDecorations = {
  dashedOverLine: function(...args) {
    return textDecoration.call(this, "overline", "dashed", ...args);
  },
  dashedOverLineThrough: function(...args) {
    return textDecoration.call(this, "overline line-through", "dashed", ...args);
  },
  dashedOverUnderLine: function(...args) {
    return textDecoration.call(this, "overline underline", "dashed", ...args);
  },
  dashedOverUnderLineThrough: function(...args) {
    return textDecoration.call(this, "overline underline line-through", "dashed", ...args);
  },
  dashedLineThrough: function(...args) {
    return textDecoration.call(this, "line-through", "dashed", ...args);
  },
  dashedUnderLine: function(...args) {
    return textDecoration.call(this, "underline", "dashed", ...args);
  },
  dashedUnderLineThrough: function(...args) {
    return textDecoration.call(this, "underline line-through", "dashed", ...args);
  },
  dottedOverLine: function(...args) {
    return textDecoration.call(this, "overline", "dotted", ...args);
  },
  dottedOverLineThrough: function(...args) {
    return textDecoration.call(this, "overline line-through", "dotted", ...args);
  },
  dottedOverUnderLine: function(...args) {
    return textDecoration.call(this, "overline underline", "dotted", ...args);
  },
  dottedOverUnderLineThrough: function(...args) {
    return textDecoration.call(this, "overline underline line-through", "dotted", ...args);
  },
  dottedLineThrough: function(...args) {
    return textDecoration.call(this, "line-through", "dotted", ...args);
  },
  dottedUnderLine: function(...args) {
    return textDecoration.call(this, "underline", "dotted", ...args);
  },
  dottedUnderLineThrough: function(...args) {
    return textDecoration.call(this, "underline line-through", "dotted", ...args);
  },
  doubleOverLine: function(...args) {
    return textDecoration.call(this, "overline", "double", ...args);
  },
  doubleOverLineThrough: function(...args) {
    return textDecoration.call(this, "overline line-through", "double", ...args);
  },
  doubleOverUnderLine: function(...args) {
    return textDecoration.call(this, "overline underline", "double", ...args);
  },
  doubleOverUnderLineThrough: function(...args) {
    return textDecoration.call(this, "overline underline line-through", "double", ...args);
  },
  doubleLineThrough: function(...args) {
    return textDecoration.call(this, "line-through", "double", ...args);
  },
  doubleUnderLine: function(...args) {
    return textDecoration.call(this, "underline", "double", ...args);
  },
  doubleUnderLineThrough: function(...args) {
    return textDecoration.call(this, "underline line-through", "double", ...args);
  },
  wavyOverLine: function(...args) {
    return textDecoration.call(this, "overline", "wavy", ...args);
  },
  wavyOverLineThrough: function(...args) {
    return textDecoration.call(this, "overline line-through", "wavy", ...args);
  },
  wavyOverUnderLine: function(...args) {
    return textDecoration.call(this, "overline underline", "wavy", ...args);
  },
  wavyOverUnderLineThrough: function(...args) {
    return textDecoration.call(this, "overline underline line-through", "wavy", ...args);
  },
  wavyLineThrough: function(...args) {
    return textDecoration.call(this, "line-through", "wavy", ...args);
  },
  wavyUnderLine: function(...args) {
    return textDecoration.call(this, "underline", "wavy", ...args);
  },
  wavyUnderLineThrough: function(...args) {
    return textDecoration.call(this, "underline line-through", "wavy", ...args);
  },
  overLine: function(...args) {
    return textDecoration.call(this, "overline", "solid", ...args);
  },
  overLineThrough: function(...args) {
    return textDecoration.call(this, "overline line-through", "solid", ...args);
  },
  overUnderLine: function(...args) {
    return textDecoration.call(this, "overline underline", "solid", ...args);
  },
  overUnderLineThrough: function(...args) {
    return textDecoration.call(this, "overline underline line-through", "solid", ...args);
  },
  lineThrough: function(...args) {
    return textDecoration.call(this, "line-through", "solid", ...args);
  },
  underLine: function(...args) {
    return textDecoration.call(this, "underline", "solid", ...args);
  },
  underLineThrough: function(...args) {
    return textDecoration.call(this, "underline line-through", "solid", ...args);
  },
  blink: function(...args) {
    return textDecoration.call(this, "blink", null, ...args);
  },
  grammarError: function(...args) {
    return textDecoration.call(this, "grammar-error", null, ...args);
  },
  spellingError: function(...args) {
    return textDecoration.call(this, "spelling-error", null, ...args);
  }
};
for (let func of Object.values(textDecorations))
  func.scope = textDecoration.scope;
var func_default = {
  ...UnpackedNativeCssProperties,
  border,
  borderWidth: void 0,
  borderStyle: void 0,
  borderRadius: void 0,
  // borderColor: undefined,
  em: NativeCssProperties.fontSize,
  ...BackgroundFunctions,
  w: width,
  h: height,
  width,
  height,
  textDecoration,
  ...textDecorations
};

// src/font.js
function font(...args) {
  const res = {
    fontStyle: "unset",
    fontWeight: "unset",
    fontVariantCaps: "unset",
    fontStretch: "unset",
    textTransform: "unset",
    letterSpacing: "unset"
  };
  args = args.map((a) => {
    if (a instanceof Object) return a;
    if (a.match(/^[1-9]00$/)) return { fontWeight: a };
    if (isLength(a)) return { letterSpacing: a };
    if (a[0] === "'" || a[0] === '"') return { fontFamily: a.replaceAll("+", " ") };
    if (a.startsWith("url(")) return { fontFamily: a };
    throw `Unrecognized font property: ${a}`;
  });
  Object.assign(res, ...args);
  res.fontFamily = args.map((a) => a.fontFamily).filter(Boolean).join(", ");
  return res;
}
font.scope = {
  url: (...args) => `url(${args.join(" ")})`,
  weight: (a) => ({ fontWeight: a }),
  style: (a) => ({ fontStyle: a }),
  variant: (a) => ({ fontVariant: a }),
  stretch: (a) => ({ fontStretch: a }),
  transform: (a) => ({ textTransform: a }),
  letterSpacing: (a) => ({ letterSpacing: a })
};
var WORDS = {
  font: {
    Family: {
      serif: "serif",
      monospace: "monospace",
      cursive: "cursive",
      fantasy: "fantasy",
      emoji: "emoji",
      math: "math",
      fangsong: "fangsong",
      ui: "ui",
      //Pascal no translate
      Arial: "Arial",
      Calibri: "Calibri",
      Cambria: "Cambria",
      Candara: "Candara",
      Consolas: "Consolas",
      Constantia: "Constantia",
      Corbel: "Corbel",
      Georgia: "Georgia",
      Impact: "Impact",
      Tahoma: "Tahoma",
      Verdana: "Verdana",
      Garamond: "Garamond",
      Helvetica: "Helvetica",
      Geneva: "Geneva",
      Didot: "Didot",
      Optima: "Optima",
      Futura: "Futura",
      Baskerville: "Baskerville",
      Copperplate: "Copperplate",
      Menlo: "Menlo",
      Monaco: "Monaco",
      Chalkboard: "Chalkboard",
      Wingdings: "Wingdings",
      Webdings: "Webdings",
      Symbol: "Symbol",
      BlinkMacSystemFont: "BlinkMacSystemFont",
      Roboto: "Roboto",
      //Pascal add spaces
      ArialBlack: "Arial Black",
      AndaleMono: "Andale Mono",
      PalatinoTimes: "Palatino Times",
      DejaVuSans: "DejaVu Sans",
      DejaVuSerif: "DejaVu Serif",
      DejaVuSansMono: "DejaVu Sans Mono",
      LiberationSans: "Liberation Sans",
      LiberationSerif: "Liberation Serif",
      LiberationMono: "Liberation Mono",
      NimbusRomanNo9L: "Nimbus Roman No9 L",
      NimbusSansL: "Nimbus Sans L",
      NimbusMonoL: "Nimbus Mono L",
      CenturySchoolbookL: "Century Schoolbook L",
      URWChanceryL: "URW Chancery L",
      URWGothicL: "URW Gothic L",
      URWBookmanL: "URW Bookman L",
      ComicSansMS: "Comic Sans MS",
      AppleChancery: "Apple Chancery",
      MarkerFelt: "Marker Felt",
      LucidaConsole: "Lucida Console",
      LucidaSansUnicode: "Lucida Sans Unicode",
      PalatinoLinotype: "Palatino Linotype",
      SegoeUI: "Segoe UI",
      TimesNewRoman: "Times New Roman",
      TrebuchetMS: "Trebuchet MS",
      LucidaGrande: "Lucida Grande",
      HoeflerText: "Hoefler Text",
      AmericanTypewriter: "American Typewriter",
      GillSans: "Gill Sans",
      BookAntiqua: "Book Antiqua",
      CenturyGothic: "Century Gothic",
      FranklinGothicMedium: "Franklin Gothic Medium",
      BookmanOldStyle: "Bookman Old Style",
      BrushScriptMT: "Brush Script MT",
      HelveticaNeue: "Helvetica Neue",
      CourierMonaco: "Courier Monaco",
      //Pascal to kebab
      uiSerif: "ui-serif",
      uiSansSerif: "ui-sans-serif",
      uiMonospace: "ui-monospace",
      uiRounded: "ui-rounded",
      uiEmoji: "ui-emoji",
      uiFangsong: "ui-fangsong",
      sansSerif: "sans-serif",
      systemUi: "system-ui",
      AppleSystem: "-apple-system",
      //added
      CourierNew: "Courier New",
      Palatino: "Palatino",
      // Palatino: "Palatino Linotype",
      Bookman: "Bookman",
      GoudyOldStyle: "Goudy Old Style",
      AvantGarde: "Avant Garde",
      ArialNarrow: "Arial Narrow",
      ArialRoundedMTB: "Arial Rounded MT Bold",
      MSSansSerif: "MS Sans Serif",
      Ubuntu: "Ubuntu",
      Cantarell: "Cantarell",
      DroidSans: "Droid Sans",
      DroidSerif: "Droid Serif",
      DroidSansMono: "Droid Sans Mono",
      //KNOWN BAD FONTS
      Comic: "Comic Sans MS",
      Times: "Times New Roman",
      Courier: "Courier New",
      Lucida: "Lucida Sans Unicode"
    },
    Weight: {
      bold: "bold",
      bolder: "bolder",
      lighter: "lighter"
    },
    Style: {
      italic: "italic",
      oblique: "oblique"
    },
    Variants: {
      smallCaps: "small-caps",
      allSmallCaps: "all-small-caps",
      petiteCaps: "petite-caps",
      allPetiteCaps: "all-petite-caps",
      unicase: "unicase",
      titlingCaps: "titling-caps"
    },
    Stretch: {
      ultraCondensed: "ultra-condensed",
      extraCondensed: "extra-condensed",
      condensed: "condensed",
      semiCondensed: "semi-condensed",
      semiExpanded: "semi-expanded",
      expanded: "expanded",
      extraExpanded: "extra-expanded",
      ultraExpanded: "ultra-expanded"
    }
    //  stretch(.) => { fontStretch: "normal" },
    //  style(.)=> { fontStyle: "unset" },
    //  variant(.) => { fontVariant: "unset" },
    //  transform(.) => { textTransform: "unset" },
    //  letterSpacing(.) => { letterSpacing: "unset" },
  },
  text: {
    Transform: {
      capitalize: "capitalize",
      allcaps: "uppercase",
      smallcaps: "lowercase",
      uppercase: "uppercase",
      lowercase: "lowercase",
      "full-width": "full-width",
      "full-size-kana": "full-size-kana",
      "math-auto": "math-auto"
    }
  }
};
function* fontWords() {
  for (let [main, one] of Object.entries(WORDS))
    for (let [prop, two] of Object.entries(one))
      for (let [short, value] of Object.entries(two))
        yield { prop: main + prop, short, value };
}
for (let short in WORDS.font.Family)
  WORDS.font.Family[short[0].toLowerCase() + short.slice(1)] = WORDS.font.Family[short];
for (let { short, prop, value } of fontWords())
  font.scope[short] = font.scope[short[0].toLowerCase() + short.slice()] = { [prop]: value };
var SHORTS = { font };
for (let { short, prop, value } of fontWords()) {
  SHORTS[short] = function() {
    return { [prop]: value };
  };
  Object.defineProperty(SHORTS[short], "name", { value: short });
  SHORTS[short];
}
var font_default = SHORTS;

// src/layout.js
function defaultLayout(display, ...args) {
  const containerDefaults = {
    wordSpacing: "unset",
    lineHeight: "unset",
    whiteSpace: "unset",
    hyphens: "unset",
    textAlign: "unset",
    textIndent: "unset"
  };
  return Object.assign({ display }, containerDefaults, ...args);
}
var O2 = "(?:(visible|hidden|clip)|(auto|scroll)(?:-snap(?:-mandatory)?)?)";
var OVERFLOW2 = new RegExp(`^${O2}(?::${O2})?$`);
function overflow(a) {
  const m = a.match(OVERFLOW2);
  if (!m) return;
  let [_, vhc, overflowInline = vhc, snap, man, vhc2, overflowBlock = vhc2, snap2, man2] = m;
  const res = overflowBlock && (overflowBlock !== overflowInline && snap2 !== snap && man !== man2) ? { overflowX: overflowInline, overflowY: overflowBlock } : { overflow: overflowInline };
  if (snap || snap2) {
    res.scrollSnapType = snap && snap2 ? "both" : snap ? "x" : "y";
    if (man || man2) res.scrollSnapType += " mandatory";
  }
  return res;
}
function checkNoArgs(args) {
  if (args.some((a) => a != null)) throw `This $short takes no arguments: ${args.join(", ")}")}`;
}
function lineClamp(num) {
  return {
    "display": "-webkit-box",
    WebkitLineClamp: num,
    WebkitBoxOrient: "vertical",
    overflowBlock: "hidden"
  };
}
var TextAlignAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "justify",
  u: "unset",
  v: "unset",
  w: "unset",
  _: "unset",
  ".": "unset"
};
var AlignAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "stretch",
  u: "space-around",
  //narrow stretch
  v: "space-evenly",
  //medium stretch
  w: "space-between",
  //wide stretch
  _: "baseline",
  //todo what about "(first|last) baseline"
  ".": "unset"
};
var AlignItemsFlexAliases = {
  a: "start",
  b: "end",
  c: "center",
  s: "stretch",
  u: "stretch",
  v: "stretch",
  w: "stretch",
  _: "start",
  ".": "unset"
};
var LAYOUT = {
  padding: toLogicalFour.bind(null, "padding"),
  p: toLogicalFour.bind(null, "padding"),
  scrollPadding: toLogicalFour.bind(null, "scroll-padding"),
  textAlign: func_default.textAlign,
  shy: { hyphens: "manual" },
  hyphens: { hyphens: "auto" },
  "break-word": { overflowWrap: "break-word" },
  "break-anywhere": { overflowWrap: "anywhere" },
  "nowrap": { whiteSpace: "nowrap" },
  "pre-wrap": { whiteSpace: "pre-wrap" },
  "pre-line": { whiteSpace: "pre-line" },
  "pre": { whiteSpace: "pre" },
  "break-spaces": { whiteSpace: "break-spaces" },
  "ellipsis": { whiteSpace: "nowrap", textOverflow: "ellipsis" },
  "break-all": { wordBreak: "break-all" },
  "keep-all": { wordBreak: "keep-all" }
};
var _LAYOUT = {
  margin: toLogicalFour.bind(null, "margin"),
  m: toLogicalFour.bind(null, "margin"),
  scrollMargin: toLogicalFour.bind(null, "scroll-margin"),
  textAlign: func_default.textAlign,
  w: func_default.width,
  h: func_default.height,
  width: func_default.width,
  height: func_default.height
  // verticalAlign: AllFunctions.verticalAlign, //todo is this allowed for grid and flex?
};
function toGap(...args) {
  if (args.length === 1)
    return { gap: args[0] };
  if (args.length === 2)
    return { columnGap: args[0], rowGap: args[1] };
  throw new SyntaxError("gap only accepts 1 or 2 arguments");
}
var GAP = { gap: toGap, g: toGap };
function blockGap(wordSpacing, lineHeight) {
  return { wordSpacing, lineHeight };
}
function block(...args) {
  args = args.map((a) => {
    if (typeof a !== "string") return a;
    let m;
    if (m = overflow(a))
      return m;
    if (m = a.match(/^[abcs]$/))
      return { textAlign: TextAlignAliases[a[0]] };
  });
  return defaultLayout("block", ...args);
}
block.scope = {
  ...LAYOUT,
  lineClamp,
  clamp: lineClamp,
  gap: blockGap,
  g: blockGap
};
function _block(...args) {
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}
_block.scope = {
  ..._LAYOUT,
  "float-start": { float: "inline-start" },
  "float-end": { float: "inline-end" },
  textIndent: func_default.textIndent,
  indent: func_default.textIndent
};
function grid(...args) {
  args = args.map((a) => {
    if (!(typeof a === "string")) return a;
    let m;
    if (m = overflow(a))
      return m;
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_.]?[abcs]?$/)) {
      const [b, i = b, b2 = ".", i2 = b2] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        alignContent: AlignAliases[b],
        justifyContent: AlignAliases[i],
        alignItems: AlignAliases[b2],
        justifyItems: AlignAliases[i2]
      };
    }
    throw new ReferenceError(a);
  });
  return defaultLayout("grid", ...args);
}
var nativeGrid = Object.fromEntries(Object.entries(func_default).filter(
  ([k]) => k.match(/^grid[A-Z]/)
));
grid.scope = {
  placeContent: func_default.placeContent,
  justifyContent: func_default.justifyContent,
  alignContent: func_default.alignContent,
  placeItems: func_default.placeItems,
  justifyItems: func_default.justifyItems,
  alignItems: func_default.alignItems,
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
  denseRow: { gridAutoFlow: "dense row" }
};
var column = (start, end = start) => ({ gridColumn: `${start} / ${end}` });
var row = (start, end = start) => ({ gridRow: `${start} / ${end}` });
var span = (arg) => `span ${arg}`;
column.scope = { span };
row.scope = { span };
function _grid(...args) {
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}
_grid.scope = {
  ..._LAYOUT,
  column,
  row,
  placeSelf: func_default.placeSelf,
  justifySelf: func_default.justifySelf,
  alignSelf: func_default.alignSelf,
  // area: (...args) => ({ ["grid-area"]: args.join(" ") }),
  align: (a) => {
    const m = a.match(/^[abcs_.][abcs_.]?$/)?.[0];
    if (!m)
      throw `$_grid|$align(${a}): "${a}" doesn't match /^[abcs_.][abcs_.]?$/`;
    const [b, i = b] = m[0];
    return {
      textAlign: TextAlignAliases[i],
      alignSelf: AlignAliases[b],
      justifySelf: AlignAliases[i]
    };
  }
};
function flex(...args) {
  args = args.map((a) => {
    if (!(typeof a === "string")) return a;
    let m = overflow(a);
    if (m) return m;
    if (m = a.match(/^[abcsuvw.][abcsuvw.]?[abcs_]?$/)) {
      const [b, i = b, i2 = "."] = m[0];
      return {
        textAlign: TextAlignAliases[i2],
        alignContent: AlignAliases[b],
        justifyContent: AlignAliases[i],
        alignItems: AlignItemsFlexAliases[i2]
      };
    }
    throw new ReferenceError(a);
  });
  return defaultLayout("flex", ...args);
}
flex.scope = {
  "column": { flexDirection: "column" },
  "column-reverse": { flexDirection: "column-reverse" },
  "row-reverse": { flexDirection: "row-reverse" },
  "row": { flexDirection: "row" },
  "wrap": { flexWrap: "wrap" },
  "wrap-reverse": { flexWrap: "wrap-reverse" },
  "no-wrap": { flexWrap: "nowrap" },
  placeContent: func_default.placeContent,
  justifyContent: func_default.justifyContent,
  alignContent: func_default.alignContent,
  alignItems: func_default.alignItems,
  ...LAYOUT,
  ...GAP
};
function _flex(...args) {
  for (const a of args)
    if (!(a instanceof Object))
      throw new ReferenceError(a);
  return Object.assign(...args);
}
_flex.scope = {
  ..._LAYOUT,
  basis: (a) => ({ flexBasis: a }),
  grow: (a) => ({ flexGrow: a }),
  g: (a) => ({ flexGrow: a }),
  shrink: (a) => ({ flexShrink: a }),
  s: (a) => ({ flexShrink: a }),
  order: (a) => ({ order: a }),
  o: (a) => ({ order: a }),
  //todo safe
  center: (...args) => (checkNoArgs(args), { alignSelf: "center", textAlign: "center" }),
  end: (...args) => (checkNoArgs(args), { alignSelf: "end", textAlign: "end" }),
  start: (...args) => (checkNoArgs(args), { alignSelf: "start", textAlign: "start" }),
  stretch: (...args) => (checkNoArgs(args), { alignSelf: "stretch", textAlign: "stretch" }),
  baseline: (...args) => (checkNoArgs(args), { alignSelf: "baseline", textAlign: "unset" }),
  alignSelf: func_default.alignSelf,
  textAlign: func_default.textAlign
};
var layout_default = {
  block,
  _block,
  grid,
  _grid,
  flex,
  _flex
};

// src/gradient.js
function gradient(role, color, onColor, steps = 10) {
  if (!role || !color || !onColor)
    throw "Missing parameters";
  const alpha = new Array(10).fill(0).map((_, i) => (i + 1) * steps);
  steps = new Array(10).fill(0).map((_, i) => (i + 1) * steps);
  let res = { [`--color_${role}`]: color };
  const res2 = Object.fromEntries(steps.map((i) => [`--color_${role}${i}`, `color-mix(in oklch, ${color} ${100 - i}%, ${onColor} ${i}%)`]));
  res = Object.assign(res, res2);
  const alphaColors = Object.fromEntries(Object.entries(res).map(
    ([name, color2]) => alpha.map((a) => [`${name}_a${a}`, `oklch(from ${color2} l c h / ${a}%)`])
  ).flat());
  return { ...res, ...alphaColors };
}
gradient.scope = {
  ...func_default.color.scope
};
function popGradient(name, color, onColor) {
  const chromas = {
    "b3": `calc(c * .25)`,
    "b2": `calc(c * .5)`,
    "b1": `calc(c * .75)`,
    "b": `calc(c * .9)`,
    "p": `calc(c * 1.1)`,
    "p1": `calc(c * 1.25)`,
    "p2": `calc(c * 1.5)`,
    "p3": `calc(c * 2)`
  };
  let res = gradient(name, color, onColor);
  return Object.fromEntries(Object.entries(res).map(
    ([name2, c]) => chromas.entries().map(([p, pV]) => [`${name2}_${p}`, `oklch(from var(--${c}) l ${pV} h)`])
  ).flat());
}
var gradient_default = {
  gradient,
  popGradient
};

// src/engine.js
var MEDIA_WORDS = {
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
  p3: "color-gamut: p3",
  srgb: "color-gamut: srgb",
  rec2020: "color-gamut: rec2020",
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
  all: "all"
};
var RENAME = {
  "overflow-block": "overflow-y",
  "overflow-inline": "overflow-x"
};
var UpgradeRegistry = class {
  #register = {};
  #shorts = {};
  constructor(dict) {
    for (const [k, short] of Object.entries(dict))
      this.registerShort(k, short);
  }
  waitFor(name, element, clazz2) {
    (this.#register[name] ??= []).push({ clazz: clazz2, element: new WeakRef(element) });
  }
  enoughWaiting(name) {
    let undone = this.#register[name];
    if (!undone) return;
    delete this.#register[name];
    undone = undone.reduce((res, { clazz: clazz2, element }) => {
      element = element.deref();
      element?.classList.contains(clazz2) && res.push({ clazz: clazz2, element });
      return res;
    }, []);
    return undone.length ? undone : void 0;
  }
  registerShort(name, func) {
    const [main, name2 = main] = name.split(".");
    const table = name2 != main ? this.#shorts[main].scope ??= {} : this.#shorts;
    if (name2 in table)
      throw new Error(`Short name ${name} already exists`);
    table[name2] = func;
    this.rerun(name);
  }
  get shorts() {
    return this.#shorts;
  }
  get medias() {
    return MEDIA_WORDS;
  }
  registerMedia(name, txt) {
    if (name in MEDIA_WORDS)
      throw new Error(`Media name ${name} already exists`);
    MEDIA_WORDS[name] = txt;
    this.rerun(`@${name}`);
  }
  rerun(name) {
    const todos = this.enoughWaiting(name);
    if (!todos)
      return;
    const style = document.querySelector("style");
    const csss = new SheetWrapper(style.sheet);
    for (const { clazz: clazz2, element } of todos)
      csss.addRule(clazz2, element);
  }
};
var upgrades = new UpgradeRegistry({
  ...func_default,
  ...font_default,
  ...gradient_default,
  // ...colorPalette,
  ...layout_default
});
var parseCssShorts = (str) => Rule.interpret(str, upgrades, RENAME);
var registerShort = (name, func) => upgrades.registerShort(name, func);
var registerMedia = (name, txt) => upgrades.registerMedia(name, txt);
registerMedia("sm", "min-width:640px");
registerMedia("md", "min-width:768px");
registerMedia("lg", "min-width:1024px");
registerMedia("xl", "min-width:1280px");
registerMedia("xxl", "min-width:1536px");
var SheetWrapper = class _SheetWrapper {
  rules = {};
  static getKey(r) {
    return [r.parentRule?.media?.mediaText, r.selectorText].filter(Boolean).join(" { ");
  }
  static layerMediaRules(layer) {
    const res = /* @__PURE__ */ new Map();
    for (const a of layer.cssRules) {
      if (a instanceof CSSMediaRule) {
        for (const b of a.cssRules)
          if (b instanceof CSSStyleRule)
            res.set(_SheetWrapper.getKey(b), b);
      } else if (a instanceof CSSStyleRule)
        res.set(_SheetWrapper.getKey(a), a);
    }
    return res;
  }
  constructor(sheet) {
    this.styleEl = sheet.ownerNode;
    this.sheet = sheet;
    this.items = this.setupLayer("items", sheet);
    this.container = this.setupLayer("container", sheet);
    this.setupStatement();
  }
  setupStatement() {
    for (const r of this.sheet.cssRules)
      if (r instanceof CSSLayerStatementRule && "@layer container, items;" === r.cssText.replaceAll(/\s+/g, " "))
        return;
    this.sheet.insertRule("@layer container, items;", 0);
  }
  setupLayer(name) {
    for (const layer of this.sheet.cssRules)
      if (layer instanceof CSSLayerBlockRule && layer.name === name)
        return { layer, registry: _SheetWrapper.layerMediaRules(layer) };
    this.sheet.insertRule(`@layer ${name} {}`, 0);
    return { layer: this.sheet.cssRules[0], registry: /* @__PURE__ */ new Map() };
  }
  addRule(str, el) {
    try {
      const rule = Rule.interpret(str, upgrades, RENAME);
      if (!rule) return;
      const { layer, registry } = rule.item ? this.items : this.container;
      const key = rule.key;
      let ruleAndPos = registry.get(key);
      if (!ruleAndPos) {
        layer.insertRule(rule.rule, layer.cssRules.length);
        ruleAndPos = { rule, css: layer.cssRules[layer.cssRules.length - 1], pos: layer.cssRules.length - 1 };
        registry.set(key, ruleAndPos);
      }
      return ruleAndPos;
    } catch (err) {
      if (err instanceof ReferenceError)
        return upgrades.waitFor(err.message, el, str);
      throw err;
    }
  }
  #isInUse(r) {
    if (r instanceof CSSMediaRule) r = r.cssRules[0];
    if (!(r instanceof CSSStyleRule)) return false;
    const className = r.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/)?.[1].replaceAll(/\\(.)/g, "$1");
    return className && this.styleEl.getRootNode().querySelector(`[class~="${className}"]`);
  }
  #removeUnused(layer) {
    for (let i = layer.cssRules.length - 1; i >= 0; i--)
      if (!this.#isInUse(layer.cssRules[i]))
        layer.deleteRule(i);
  }
  #cleanTask;
  cleanup() {
    this.#cleanTask ??= requestAnimationFrame((_) => {
      this.#cleanTask = null;
      this.#removeUnused(this.container.layer);
      this.#removeUnused(this.items.layer);
      this.sheet.ownerNode.textContent = [...this.sheet.cssRules].map((r) => r.cssText).join("\n\n");
      this.sheet = this.styleEl.sheet;
      this.items = this.setupLayer("items", this.sheet);
      this.container = this.setupLayer("container", this.sheet);
    });
  }
};
export {
  SheetWrapper
};
//# sourceMappingURL=csss.js.map
