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
  let [sel, ...exprList] = exp?.split("$");
  exprList = exprList.map(parseNestedExpression);
  exprList = exprList.map(s => s.interpret(SHORTS));
  exprList &&= clashOrStack(exprList);
  let { selector, item } = parseSelectorPipe(sel, clazz);
  const layer = (item ? "items" : "container") + (short.match(/^(\$|\|\$)/) ? "Default" : "");
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
  while (tokens.length) {
    let a;
    if (tokens[0].kind === "COLOR")
      a = new Expression("_hash", tokens.splice(0, tokens.findIndex(t => t.kind !== "COLOR")));

    if (!a)
      a = tokens[0].match(/^(?!["'])(?:\($|.*[+/*]|(?<![a-z])-|-(?![a-z]))/i) ?
        parseVarCalc(eatTokens(tokens)) :
        tokens.shift();
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

//todo this is the function we are working on
function parseNestedExpression(short) {
  const newTokens = tokenize(short);
  if (newTokens.length === 1)
    return new Expression(newTokens[0].text, []); //todo no calc top level

  const news = [];
  let last;
  for (let t of newTokens) {
    const { kind, text } = t;
    if (kind == "QUOTE" || kind == "CPP" || kind == "COLOR") {
      if (last) {
        news.push(last);
        last = null;
      }
      news.push(
        kind == "COLOR" ? t :
          t.text
      );
    } else {
      last = (last || "") + text;
    }
  }
  if (last)
    news.push(last);
  // const tokens = news.slice();

  try {
    return diveDeep(news, true)[0];
  } catch (e) {
    debugger
    //todo add the error string to the e.message
    // const i = tokensOG.length - tokens.length;
    // tokensOG.splice(i, 0, `{{{${e}}}}`);
    // const msg = tokensOG.join("");
    // throw new SyntaxError("Invalid short: " + msg);
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

const tokenize = (_ => {
  const WEB_COLORS = "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen";

  const QUOTE = /([`'"])(\\.|(?!\2).)*?\2/.source;

  const LENGTHS = "px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex|%";
  const ANGLES = "deg|grad|rad|turn";
  const TIMES = "s|ms";
  const NUMBER = `(-?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(?:(${LENGTHS})|(${ANGLES})|(${TIMES}))?`;

  const VAR = /--[a-zA-Z][a-zA-Z0-9_]*/.source;
  const WORD = /[._a-zA-Z][._%a-zA-Z0-9+-]*/.source;
  const COLOR_WORD = /#(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)/.source;
  const COLOR = `#(?:(a)(\\d\\d)|([0-9a-fA-F]{6})([0-9a-fA-F]{2})?|([0-9a-fA-F]{3})([0-9a-fA-F])?|(${WEB_COLORS}|([a-zA-Z_]+|))(\\d\\d)?)`;
  const COALESCE = /\?\?/.source;
  const MULTIDIVIDE = /[*/]/.source;
  const PLUSMINUS = /[+-]/.source;
  const ARROW = /[<>]/.source;
  const CPP = /[,()]/.source;

  const TOKENS = new RegExp([
    QUOTE,
    "\\s+",
    NUMBER,
    VAR,
    WORD,
    COLOR_WORD,
    COLOR,
    COALESCE,
    MULTIDIVIDE,
    PLUSMINUS,
    ARROW,
    CPP,
    ".+"
  ].map(x => `(${x})`)
    .join("|"),
    "gi");

  return function tokenize(input) {
    const out = [];
    for (let m; (m = TOKENS.exec(input));) {
      const [text, _, q, quote, ws, n, num, length, angle, time, vari, word, colorWord, c, c0, p0, c1, p1, c2, p2, c3, c4, p3, coalesce, multdiv, plusminus, arrow, cpp] = m;
      if (ws) continue;
      else if (num) out.push({ text, kind: "NUMBER", pri: 0, num, length, angle, time });
      else if (c) {
        const percent =
          p0 ? 100 - Number(p0) :
            p1 ? (parseInt(p1, 16) / 15) * 100 :
              p2 ? (parseInt(p2, 16) / 255) * 100 :
                p3 ? Number(p3) :
                  undefined;
        const c = c0 ? "transparent" : c1 ?? c2 ?? c3;
        out.push({ text, kind: "COLOR", pri: 0, c, percent, primitive: c4 == null, hex: (c1 || c2) && text });
      }
      else if (quote) out.push({ text, kind: "QUOTE", quote, pri: 0 });
      else if (vari) out.push({ text, kind: "VAR", pri: 0 });
      else if (word) out.push({ text, kind: "WORD", pri: 0 });
      else if (colorWord) out.push({ text, kind: "COLORWORD", pri: 0 });
      else if (coalesce) out.push({ text, kind: "COALESCE", pri: 1 });
      else if (multdiv) out.push({ text, kind: "MULTIDIVIDE", pri: 2 });
      else if (plusminus) out.push({ text, kind: "PLUSMINUS", pri: 3 });
      else if (arrow) out.push({ text, kind: "ARROW", pri: 4 });
      else if (cpp) out.push({ text, kind: "CPP", pri: 6 });
      else throw new SyntaxError(`Unknown token: ${text} in ${input}`);
    }
    return out;
  }
})();