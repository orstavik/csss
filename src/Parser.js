import { SHORTS, MEDIA_WORDS } from "./vocabulary.js";

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
export function sequence(allShorts, classListShorts, parseFun) {
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

export function extractShortSelector(rule) {
  if (!(rule instanceof CSSLayerStatementRule && rule.cssRules?.length == 1)) return false;
  rule = rule.cssRules[0];
  if (rule instanceof CSSMediaRule && rule.cssRules.length == 1) rule = rule.cssRules[0];
  if (!(rule instanceof CSSStyleRule) || rule.cssRules.length != 1) return false;
  return rule.selectorText.match(/^\.((\\.|[a-zA-Z0-9_-])+)/g)?.[0] || false;
}
export function extractShort(rule) {
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

const MAGICWORD = `$"'$`;
export function parse(short) {
  const clazz = "." + short.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
  short = short.match(/(.*?)\!*$/)[1];
  const { exp, media } = parseMediaQuery(short, MEDIA_WORDS);
  let [sel, ...exprList] = exp.split(/\$(?=(?:[^"]*"[^"]*")*[^"]*$)(?=(?:[^']*'[^']*')*[^']*$)/);
  exprList = exprList.map(parseNestedExpression);
  exprList = exprList.map(exp => {
    const cb = SHORTS[exp.name] ?? SHORTS[exp.text];
    if (!cb) throw new ReferenceError(exp.name);
    return !(cb instanceof Function) ? cb : cb(exp.args);
    // cb({ todo: "here we need math and var and calc and env" }, exp.args);
  });
  exprList &&= clashOrStack(exprList);
  let { selector, item } = parseSelectorPipe(sel, clazz);
  const layer = (item ? "items" : "container") + (short.match(/^(\$|\|\$)/) ? "Default" : "");
  exprList = kebabcaseKeys(exprList);
  const { atRules, mainRule } = extractAtRules(exprList);
  checkProperty(mainRule);
  let cssText = bodyToTxt(selector, mainRule);
  if (media) cssText = `@media ${media} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;
  cssText = `@layer ${layer} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;

  for (let atRule in atRules)
    atRules[atRule] = kebabcaseKeys(atRules[atRule]);
  const atRuleText = Object.entries(atRules).map(([rule, body]) => bodyToTxt(rule, body)).join("\n\n");
  return { short, layer, media, selector, mainRule, cssText, atRules, atRuleText };
  // const miniCssRule = {cssText, name: layer, cssRules: [{ media, cssRules: [{ selectorText: selector, style: { cssText: body }, props }] }]};
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
    transition: ", ",
    fontFamily: ", ",
    voiceFamily: ", ",
    textShadow: ", ",
    boxShadow: ", ",
    animation: ", ",
    mask: ", ",
    fontFeatureSettings: ", ",
    willChange: ", ",

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

function goRightComma(tokens, divider) {
  const args = [];
  if (tokens[0] == ")" && tokens.shift())
    return args;
  while (tokens.length) {
    const a = goRightOperator(tokens)
    args.push(a);
    if (tokens[0].text === ")" && tokens.shift())
      return args;
    if (tokens[0].text === divider && tokens.shift())
      continue;
    throw new SyntaxError(`Expected ${[divider, ")"].filter(Boolean).join(" or ")}, got: ${tokens[0].text}`);
  }
  throw new SyntaxError("missing ')'");
}

function goRightOperator(tokens) {
  let a = goDeep(tokens);
  while (tokens.length) {
    const { kind, text } = tokens[0];
    if (kind === "OPERATOR")
      a = { kind: "EXP", name: tokens.shift().text, args: [a, goDeep(tokens)] };
    else if (kind === "NUMBER" && (text[0] == "-" || text[0] == "+"))
      a = { kind: "EXP", name: "+", args: [a, goDeep(tokens)] };
    else if (kind == "COLOR" && (a.type == "color" || a.kind == "COLOR"))
      a = { kind: "EXP", name: "#hash", type: "color", args: [a, goDeep(tokens)] };
    else
      break;
  }
  return a;
}


function goDeep(tokens) {
  if (tokens[0].text === "(")
    return { kind: "EXP", name: tokens.shift().text, args: goRightComma(tokens, ",") };
  if (tokens[0].kind === "SYN")
    throw new SyntaxError(`Expected expression, got: ${tokens[0].text}`);

  if (tokens[1].text === "(") {
    const { text: name, kind } = tokens.shift();
    tokens.shift();
    return kind == "COLOR" ?
      { kind: "EXP", type: "color", name, args: goRightComma(tokens, ",") } :
      { kind: "EXP", name, args: goRightComma(tokens, ",") };
  }
  //todo we must check here that the .kind is valid.
  return tokens.shift();
}

function parseNestedExpression(shortExp) {
  const newTokens = tokenize(shortExp);
  try {
    if (newTokens.length == 1) return newTokens[0];
    const short = goDeep(newTokens);
    if (newTokens.length) throw new SyntaxError("too many tokens.");
    if (short.kind !== "EXP") throw new SyntaxError("Short is not a valid expression.");
    return short;
  } catch (e) {
    e.message += `\n${shortExp}\n${" ".repeat(shortExp.length - newTokens.reduce(((acc, { text }) => acc + text.length), 0))}^`;
    console.error(e);
    debugger
    throw e;
  }
}

//todo we don't support nested :not(:has(...))
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
const clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source; //class
const op = />>|[>+~&,!]/.source;
const selectorTokens = new RegExp(`(\\s+)|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");

function parseSelectorPipe(str, clazz) {
  let [body1, body2] = str.split("|").map(parseSelectorComma);
  for (let i = 0; i < body1.length; i++)
    body1[i] = body1[i].replace(MAGICWORD, clazz);;

  if (!body2)
    return { selector: body1.join(", "), item: false };

  for (let i = 0; i < body2.length; i++) {
    const expr = body2[i];
    if (!expr.startsWith(MAGICWORD))
      throw new SyntaxError("Item selector can't have ancestor expression: " + expr);
    body2[i] = expr === MAGICWORD ? "*" : expr.slice(MAGICWORD.length);
  }

  let res = [];
  for (let con of body1)
    for (let item of body2)
      res.push(con + ">" + item);
  return { selector: res.join(","), item: true };
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

  static replaceNot(select) {
    const res = [];
    for (let i = 0; i < select.length; i++) {
      if (select[i] == "!" && select[i + 1]?.match(/^[^!>+~*\s]$/))
        res.push(`:not(${select[++i]})`);
      else if (select[i] == "!")
        throw new SyntaxError(`! can't come before ${select[i + 1] || "<endof selector>"}`);
      else
        res.push(select[i]);
    }
    return res;
  }

  static interpret(select) {
    if (!select.length)
      return MAGICWORD;
    select = select.map(s => s == ">>" ? " " : s);
    if (select[0].match(/^[>+~\s]$/))
      select.unshift("*");
    if (select.at(-1).match(/^[>+~\s]$/))
      select.push("*");
    let star = select.indexOf("*");
    if (star == -1) {
      select.unshift("*");
      star = 0;
    }
    if (star !== select.lastIndexOf("*"))
      throw `Only one '*' allowed per selector expression: ${select.join("")} `;
    select = Selector.replaceNot(select);

    let head = "";
    while (select.length) {
      let first = select.shift();
      if (first === "*") break;
      if (!first.match(/^[>+~\s]$/))
        first = `:where(${first})`;
      head += first;
    }
    let body = "";
    while (select.length) {
      if (select[0].match(/^[>+~\s]$/))
        break;
      body += select.shift();
    }
    let tail = select.join("");
    tail &&= `:has(${tail})`;
    body += tail;
    body &&= `:where(${body})`;
    return head + MAGICWORD + body;
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
    throw new SyntaxError(`Invalid ${name}: ${num}${type} `);
  let snake = name.replace(/[A-Z]/g, "-$&").toLowerCase();
  if (op == "<")
    num = parseFloat(num) - 0.01;
  else if (op == ">")
    num = parseFloat(num) + 0.01;
  if (op.includes("<"))
    snake = `max - ${snake} `;
  else if (op.includes(">"))
    snake = `min - ${snake} `;
  return `${snake}: ${num}${type} `;
}

function parseMediaQuery(str, register) {
  if (str[0] !== "@")
    return { exp: str };
  if (str[1] !== "(") {
    const m = str.slice(1).match(/^[a-z][a-z0-9_]*/i);
    if (!m)
      throw new SyntaxError(`Invalid media query: "${str}".`);
    const word = m[0]
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
  return { exp: str.slice(i), media: `${tokens.join(" ")} ` };
}

//https://developer.mozilla.org/en-US/docs/Web/CSS/length#browser_compatibility
//check if we support all lengths.
export const TYPES = {
  LENGTHS: "px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex",
  PERCENT: "%",
  ANGLES: "deg|grad|rad|turn",
  TIMES: "s|ms",
  FR: "fr",

  COLOR_NAMES: "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
  COLOR_FUNCTIONS: "rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch",
  MATH: "min|max|clamp|round|ceil|floor|abs|sin|cos|tan|asin|acos|atan|atan2|sqrt|log2|log10|exp|pow",
  // OTHER_FUNCTIONS: "url|attr|var|env|counter|counters|rect|repeat|minmax",
};

const NUMBER = `(-?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(?:(${TYPES.LENGTHS})|(${TYPES.ANGLES})|(${TYPES.TIMES})|(${TYPES.PERCENT})|(${TYPES.FR}))?`;
const MATH = new RegExp(`^(${TYPES.MATH})$`);


const tokenize = (_ => {
  const QUOTE = /([`'"])(\\.|(?!\2).)*?\2/.source;
  const VAR = /--[a-zA-Z][a-zA-Z0-9_]*/.source;
  const WORD = /[._a-zA-Z][._%a-zA-Z0-9+<-]*/.source;
  const NUMBER_WORDS = /e|pi|infinity|NaN/.source; //todo not added yet.
  const COLOR = `#[a-zA-Z0-9_]+`;
  const OPERATOR = /\?\?|\*\*|[*/+-]/.source;
  const CPP = /[,()]/.source;

  const TOKENS = new RegExp([
    QUOTE,
    "\\s+",
    NUMBER,
    VAR,
    WORD,
    COLOR,
    OPERATOR,
    CPP,
    ".+"
  ].map(x => `(${x})`)
    .join("|"),
    "gi");

  return function tokenize(input) {
    const out = [];
    for (let m; (m = TOKENS.exec(input));) {
      const [text, _, q, quote, ws, n, num, length, angle, time, percent, fr, vari, word, c, op, cpp] = m;
      if (ws) continue;
      else if (num) {
        const n = Number(num);
        const type = length ? "length" : angle ? "angle" : time ? "time" : percent ? "percent" : fr ? "fr" : "number";
        const unit = length ?? angle ?? time ?? percent ?? fr ?? "";
        out.push({ text, kind: "NUMBER", num: n, unit, type });
      }
      else if (c) out.push({ text, kind: "COLOR" });
      else if (quote) out.push({ text, kind: "QUOTE" });
      else if (vari) out.push({ text, kind: "VAR" });
      else if (word && text.match(MATH)) out.push({ text, kind: "MATH" });
      else if (word) out.push({ text, kind: "WORD" });
      else if (op) out.push({ text, kind: "OPERATOR" });
      else if (cpp) out.push({ text, kind: "SYN" });
      else throw new SyntaxError(`Unknown token: ${text} in ${input}`);
    }
    return out;
  }
})();