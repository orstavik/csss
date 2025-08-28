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
  if (media) cssText = `@media ${media} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;
  cssText = `@layer ${layer} {\n${cssText.replaceAll(/^|\n/g, "$&  ")}\n}`;

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

function reduceTriplets(arr, cb) {
  const res = arr.slice(0, 1);
  for (let i = 1; i < arr.length - 1; i++) {
    const a = res.at(-1);
    const b = arr[i];
    const c = arr[i + 1];
    const r = cb(a, b, c);
    if (r === undefined) res.push(b, c);
    else res[res.length - 1] = r;
  }
  return res;
}
const OPS = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => { if (!b) throw new SyntaxError("Division by zero"); return a / b },
}
const FACTORS = {
  // Times
  s_ms: 1000,
  // Length
  in_cm: 2.54,
  in_mm: 25.4,
  in_pt: 72,
  in_pc: 6,
  cm_mm: 10,
  pc_mm: 25.4 / 6,
  pc_pt: 12,
  cm_Q: 40,
  mm_Q: 4,
  in_Q: 25.4 / 0.25,
  pt_Q: (25.4 / 72) / 0.25,
  // Frequency
  kHz_Hz: 1000,
  // Angles
  turn_deg: 360,
  turn_rad: 2 * Math.PI,
  turn_grad: 400,
  rad_deg: 180 / Math.PI,
  rad_grad: 200 / Math.PI,
  deg_grad: 400 / 360,
  // Resolution
  dppx_dpi: 96,
  dppx_dpcm: 96 / 2.54,
  dpcm_dpi: 2.54,
};

function computeNumbers(a, b, c) {
  if (a.type && c.type && a.type != c.type)
    throw new SyntaxError(`Incompatible types: ${a.text}<${a.type}> ${b.text} ${c.text}<${c.type}>`);
  const calc = OPS[b.text];
  if (!calc)
    throw new SyntaxError("Unknown operator: " + b.text);
  const factor = !a.type || !c.type || a.unit == c.unit ? 1 : FACTORS[a.type + "_" + c.type] ?? (1 / FACTORS[c.type + "_" + a.type]);
  if (factor == undefined) //different types of lengths
    return;
  const num = calc(a.num, c.num * factor);
  const base = a.type ? a : c;
  const text = num + (base.unit || "");
  return { ...base, text, num };
}

class MathExpression extends Expression {
  constructor(args) {
    super("$math", args);
  }

  interpret(scope) {
    //1. default type and nested parens ()
    const defaultType = scope?.$math ?? 0;
    let args = this.args.map(x =>
      x instanceof Expression ? x.interpret(scope) :
        x.text == "." ? defaultType :
          x);
    //2. check the last argument and convert it to text
    const lastI = args.length - 1;
    const last = args[lastI];
    if (last.kind == "VAR")
      `var(${last.text})`;
    else if (last.kind != "NUMBER")
      throw new SyntaxError("math expressions must end with either a number or a variable, not with +-/* or similar operators.");

    //3. if we only have one argument, return it
    if (args.length === 1)
      return args[0].text ?? args[0]; //number or var

    //4. --var and ??, in reverse
    args = reduceTriplets(args, (a, b, c) => {
      if (b.kind == "COALESCE" && a.kind == "VAR")
        return `var(${a.text}, ${c?.text || c})`;
      if (b.kind == "COALESCE")
        throw new SyntaxError("?? must have a variable on the left hand side.");
      if (b.kind === "VAR")
        return `var(${b.text})`;
    });

    //5. implied default first argument
    if (args[0].kind == "PLUSMINUS" || args[0].kind == "MULTIDIVIDE")
      args.unshift(defaultType);

    //5. */
    args = reduceTriplets(args, (a, b, c) =>
      b.kind === "MULTIDIVIDE" && a.kind === "NUMBER" && c.kind === "NUMBER" ? computeNumbers(a, b, c) : undefined);
    //6. +-
    args = reduceTriplets(args, (a, b, c) =>
      b.kind === "PLUSMINUS" && a.kind === "NUMBER" && c.kind === "NUMBER" ? computeNumbers(a, b, c) : undefined);
    //7. toString
    if (args.length === 1)
      return args[0]?.text ?? args[0];
    args = reduceTriplets(args, (a, b, c) => (a?.text ?? a) + " " + b.text + " " + (c?.text ?? c));
    return `calc(${args[0]})`;
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

function diveDeep(tokens) {
  const res = [];
  while (tokens.length) {
    let a = tokens.shift();
    if (a == undefined)
      throw new SyntaxError("Missing end parenthesis");
    else if (a.text == ")")
      return res;
    else if (a.text == ",") {
      res.push(undefined);  // throw "empty argument not allowed";
      continue;
    } else if (a.kind === "COLOR") { //color grab
      const colors = [a];
      while (tokens[0]?.kind === "COLOR")
        colors.push(tokens.shift());
      a = new Expression("_hash", colors); //ColorExpression??
    } else if (a.kind === "NUMBER" || a.kind === "VAR" || a.kind === "PLUSMINUS" || a.kind === "MULTIDIVIDE" || a.kind === "COALESCE" || a.kind === "ARROW") {
      const math = [a];
      while (true) {
        if (tokens[0]?.kind === "NUMBER" || tokens[0]?.kind === "VAR" || tokens[0]?.kind === "PLUSMINUS" || tokens[0]?.kind === "MULTIDIVIDE" || tokens[0]?.kind === "COALESCE" || tokens[0]?.kind === "ARROW") {
          math.push(tokens.shift());
        } else if (tokens[0]?.text === "(") {
          tokens.shift();
          const x = new MathExpression(diveDeep(tokens)); //todo recursive
          if (x.args.length != 1 && !(x.args[0] instanceof Expression && x.args[0].name === "_math"))
            throw new SyntaxError("Parenthesis in math must return exactly one math expression.");
          math.push(x);
        } else
          break;
      }
      a = new MathExpression(math);
    }

    let b = tokens.shift();
    if (a.kind === "WORD" && b.text === "(") {
      a = new Expression(a.text, diveDeep(tokens));
      b = tokens.shift();
    }
    if (b.text != ")" && b.text != ",")
      throw "syntax error";
    res.push((a instanceof Expression || typeof a === "string") ? a : a.text);
    if (b.text === ")")
      return res;
  }
  throw "missing ')'";
}

//todo this is the function we are working on
function parseNestedExpression(short) {
  const newTokens = tokenize(short);
  if (newTokens[0].kind !== "WORD")
    throw new SyntaxError("Short must start with a name of a short function: " + newTokens[0].text);
  if (newTokens.length === 1)
    return new Expression(newTokens[0].text, []);
  if (newTokens[1].text !== "(")
    throw new SyntaxError("missing start parenthesis: " + short);
  if (newTokens.at(-1).text !== ")")
    throw new SyntaxError("missing end parenthesis: " + short);
  const name = newTokens[0].text;
  const tokens = newTokens.slice(2);
  const args = diveDeep(tokens);
  if (tokens.length)
    throw new SyntaxError("too many tokens after end parenthesis: " + tokens.map(t => t.text).join(""));
  return new Expression(name, args);
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

export const TYPES = {
  COLOR_NAMES: "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|transparent|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen",
  COLOR_FUNCTIONS: "rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch",
  MATH: "min|max|clamp|round|ceil|floor|abs|sin|cos|tan|asin|acos|atan|atan2|sqrt|log2|log10|exp|pow",
  FR: "fr",
  PERCENT: "%",
  LENGTHS: "px|em|rem|vw|vh|vmin|vmax|cm|mm|Q|in|pt|pc|ch|ex",
  ANGLES: "deg|grad|rad|turn",
  TIMES: "s|ms",
  // OTHER_FUNCTIONS: "url|attr|var|env|counter|counters|rect|repeat|minmax",
};

const tokenize = (_ => {
  const QUOTE = /([`'"])(\\.|(?!\2).)*?\2/.source;
  const NUMBER = `(-?[0-9]*\\.?[0-9]+(?:[eE][+-]?[0-9]+)?)(?:(${TYPES.LENGTHS})|(${TYPES.ANGLES})|(${TYPES.TIMES})|(${TYPES.PERCENT})|(${TYPES.FR}))?`;
  const VAR = /--[a-zA-Z][a-zA-Z0-9_]*/.source;
  const WORD = /[._a-zA-Z][._%a-zA-Z0-9+<-]*/.source;
  const COLOR_WORD = /#(?:rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch)/.source;
  const COLOR = `#(?:(a)(\\d\\d)|([0-9a-fA-F]{6})([0-9a-fA-F]{2})?|([0-9a-fA-F]{3})([0-9a-fA-F])?|(${TYPES.COLOR_NAMES}|([a-zA-Z_]+|))(\\d\\d)?)`;
  const COALESCE = /\?\?/.source;
  const MULTIDIVIDE = /[*/]/.source;
  const PLUSMINUS = /[+-]/.source;
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
    CPP,
    ".+"
  ].map(x => `(${x})`)
    .join("|"),
    "gi");

  return function tokenize(input) {
    const out = [];
    for (let m; (m = TOKENS.exec(input));) {
      const [text, _, q, quote, ws, n, num, length, angle, time, percent, fr, vari, word, colorWord, c, c0, p0, c1, p1, c2, p2, c3, c4, p3, coalesce, multdiv, plusminus, /*arrow,*/ cpp] = m;
      if (ws) continue;
      else if (num) {
        const type = length ? "length" : angle ? "angle" : time ? "time" : percent ? "percent" : fr ? "fr" : undefined;
        const unit = length ?? angle ?? time ?? percent ?? undefined;
        out.push({ text, kind: "NUMBER", pri: 0, num: Number(num), unit, type });
      }
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
      else if (cpp) out.push({ text, kind: "CPP", pri: 6 });
      else throw new SyntaxError(`Unknown token: ${text} in ${input}`);
    }
    return out;
  }
})();