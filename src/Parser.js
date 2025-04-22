function interpretMedias(medias, supers) {
  return medias?.map(m => supers[m] ?? m)
    .map(m => m.replace(/^@/, ""))
    .map(m => m === "!" ? "not" : m)
    .join(" and ").replaceAll("and , and", ",").replaceAll("not and ", "not ");
}

export class ShortBlock {

  constructor(exp) {
    this.exp = exp;
    this.clazz = "." + exp.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
    const { medias, shorts } = parse$Expression(exp);
    this.medias = medias;
    this.shorts = shorts;
  }

  interpret(SHORTS, supers) {
    let media = interpretMedias(this.medias, supers);
    if (media) media = `@media ${media}`;
    const owner = this.shorts?.[0]?.exprList?.[0]?.name;
    const ownerMain = supers["$" + owner]?.exprList?.[0]?.name ?? owner;
    const itemScope = SHORTS[ownerMain]?.itemScope ?? SHORTS;
    const shorts = this.shorts?.map((short, i) => short.interpret(i ? itemScope : SHORTS, supers, i ? owner : ""));
    return { media, shorts };
  }

  static #rename(shorts, renameMap) {
    return shorts && Object.fromEntries(Object.entries(shorts).map(([k, v]) => [renameMap[k] ?? k, v]));
  }

  *rules(SHORTS, supers, renameMap) {
    let { media, shorts } = this.interpret(SHORTS, supers);
    if (!shorts) return;
    shorts = shorts.map(({ shorts, selector }) => ({ selector, shorts: ShortBlock.#rename(shorts, renameMap) }));
    let [container, ...items] = shorts;
    items = items.filter(item => item.shorts);
    const cRule = new Rule(media, this.clazz + container.selector, container.shorts);
    if (cRule.shorts) //todo this we can't do, because we need the sequence data for the empty rules too.
      yield cRule;
    for (const item of items)
      yield new Rule(media, cRule.selector + ">*" + item.selector, item.shorts, true);
  }
}

class Rule {
  constructor(media, selector, shorts, item) {
    this.media = media;
    this.selector = selector;
    this.shorts = shorts;
    this.item = item;
  }
  get body() {
    return this.shorts && Object.entries(this.shorts).map(([k, v]) => {
      k = k.replaceAll(/[A-Z]/g, c => '-' + c.toLowerCase());
      if (!CSS.supports(k, v))
        throw new SyntaxError(`Invalid CSS value: ${k} = ${v}`);
      return `  ${k}: ${v};`;
    }).join("\n");
  }
  get rule() {
    return this.media ?
      `${this.media} { ${this.selector} {\n${this.body}\n} }` :
      `${this.selector} {\n${this.body}\n}`;
  }
}

const NativeCssFunctions = {
  var: (...args) => `var(${args.join(",")})`,
  url: (...args) => `url(${args.join(",")})`,    //this one goes to "" quotes when custom

  // calc: (...args) => `calc(${args.join(" ")})`,    //2px**2 => calc(2px * 2px)
  min: (...args) => `min(${args.join(",")})`,
  max: (...args) => `max(${args.join(",")})`,
  clamp: (...args) => `clamp(${args.join(",")})`,

  counter: (...args) => `counter(${args.join(",")})`,
  counters: (...args) => `counters(${args.join(",")})`,
  element: (...args) => `element(${args.join(",")})`,
  paint: (...args) => `paint(${args.join(",")})`,
  env: (...args) => `env(${args.join(",")})`,
  path: (...args) => `path(${args.join(",")})`,
  //todo
  // attr: (...args) => { args[0] = args[0].replace(":", " "); return `attr(${args.join(",")})` },
  // "image-set": (...args) => `image-set(${args.join(",")})`,
};

class Expression {

  constructor(name, args) {
    this.args = args;
    this.name = name;
  }
  toString() {
    return `${this.name}(${this.args.join(",")})`;
  }
  get signature() {
    return this.name + "/" + this.args.length;
  }
  interpret(scope, supers) {
    const cb = scope?.[this.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${this.name}`);
    const args = this.args.map(x =>
      x instanceof Expression ? x.interpret(cb.scope ?? NativeCssFunctions, supers) :
        x === "." ? "unset" :
          x);
    return cb.call(this, ...args);
  }
}
const clashOrStack = (function () {
  const STACKABLE_PROPERTIES = {
    background: ",",
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
        const k2 = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k2, "inherit"))
          if (!CSS.supports(k2, v))
            throw new SyntaxError(`Invalid CSS$ value: ${k} = ${v}`);
        //else, the browser doesn't support the property, because the property is too modern.
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


function cloneAndReplaceExpr(argMap, { name, args }) {
  args = args.map(arg => arg instanceof Expression ? cloneAndReplaceExpr(argMap, arg) : argMap[arg] ?? arg);
  return new Expression(name, args);
}

class Short {
  constructor(selectorList, exprList) {
    this.selectorList = selectorList;
    this.exprList = exprList || undefined;
  }

  interpret(scope, supers, owner) {
    const unSuperExprList = this.exprList?.map(s => {
      const sup = supers["$" + (owner ? owner + "." : "") + s.name];
      if (!sup)
        return s;
      const { name, argNames, exprList } = sup;
      if (argNames.length > s.args.length)
        throw `missing argument: ${name}(...${argNames[s.args.length]})`;
      const argMap = argNames.reduce((res, n) => ((res[n] = s.args.shift()), res), {});
      return exprList.map(expr => cloneAndReplaceExpr(argMap, expr));
    }).flat();
    const shorts = unSuperExprList && clashOrStack(unSuperExprList.map(s => s.interpret(scope, supers)));
    let selector = this.selectorList && this.selectorList.map(s => s.interpret(supers)).join(", ");
    return { selector, shorts };
  }
}

function varAndSpaceOperators(tokens) {
  const res = tokens.join("").split(/(--[a-z][a-z0-9_-]*)/g);
  for (let i = res.length - 1; i >= 0; i--) {
    if (!res[i])
      res.splice(i, 1);
    else if (i % 2 && res[i + 1] == "," && i + 2 < res.length)
      res.splice(i, 3, `var(${res[i] + res[i + 1] + res[i + 2]})`);
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
  //wrap in calc() if needed
  const str = t3.join("");
  return str.includes(" ") ? `calc(${str})` : str;
}

const WORD = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const CPP = /[,()|$=;{}]/.source;
const nCPP = /[^,()|$=;{}]+/.source;
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
    let a = tokens[0].match(/^\($|[+/*]|(?<![a-z])-|-(?![a-z])/) ?
      parseVarCalc(eatTokens(tokens)) :
      tokens.shift();
    if (top && a === ",") throw "can't start with ','";
    if (top && a === ")") throw "can't start with ')'";
    if (a === "," || a === ")") {         //empty
      res.push(undefined);
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
    if (a.match?.(WORD))
      a = a.replaceAll(/[A-Z]/g, c => '-' + c.toLowerCase());
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
    const res = diveDeep(tokens, true);
    if (tokens.length)
      throw "too many ')'";
    return res[0];
  } catch (e) {
    const i = tokensOG.length - tokens.length;
    tokensOG.splice(i, 0, `{{{${e}}}}`);
    const msg = tokensOG.join("");
    throw new SyntaxError("Invalid short: " + msg);
  }
}

function parseMediaHead(str) {
  let medias;
  for (const m of str.matchAll(/(@(?:\([^)]+\)|[a-zA-Z][a-zA-Z0-9_-]*))|([,!])|\s|(.)/g)) {
    if (m[3])
      return { medias, rest: str.slice(m.index) || undefined };
    if (m[1] ?? m[2])
      (medias ??= []).push(m[1] ?? m[2]);
  }
  return { medias };
}

function parse$Expression(exp) {
  const { medias, rest } = parseMediaHead(exp);
  const shorts = rest?.split("|").map(seg => seg.split("$"))
    .map(([sel, ...shorts]) => new Short(
      sel && parseSelectorBody(sel)?.map(s => new Selector(s)),
      shorts.length && shorts.map(parseNestedExpression)
    ));
  return { shorts, medias };
}
const ARG = /[a-zA-Z_][a-zA-Z0-9_-]*/.source;
const ARGLIST = new RegExp(`\\(${ARG}(?:,\\s*${ARG})*\\)`).source;
const SUPER_NAME = /[a-zA-Z_][a-zA-Z0-9_-]*/.source;
const SUPER_LINE = /((["'`])(?:\\.|(?!\3).)*?\3|\/\*[\s\S]*?\*\/|[^;]+)(?:;|$)/.source; // (body1, quoteSign)
const SUPER_BODY = /{((["'`])(?:\\.|(?!\5).)*?\5|\/\*[\s\S]*?\*\/|[^}]+)}/.source;// (body2, quoteSign)
const SUPER = new RegExp(
  `([$:@])(${SUPER_NAME}\\.)?(${SUPER_NAME})(${ARGLIST})?\\s*=\\s*(?:${SUPER_LINE}|${SUPER_BODY})`, "g");

function checkSuperBody(type, name, { medias, shorts }) {
  if (!medias && !shorts) throw `is empty`;
  if (medias && shorts) throw `contains both medias and selector/shorts`;
  if (medias && type !== "@") throw `type error: did you mean "@${name}"?`;
  if (medias) return { medias };
  if (shorts.length > 1) throw `item selector not allowed in superShorts.`;
  const { selectorList, exprList } = shorts[0];
  if (selectorList && exprList) throw `contains both selector and shorts`;
  if (selectorList && type !== ":") throw `type error: did you mean ":${name}"?`;
  if (exprList && type !== "$") throw `type error: did you mean "$${name}"?`;
  return { exprList, selectorList };
}

function interpretSuper(type, head, body) {
  const parsed = new ShortBlock(body);
  const { name, args: argNames } = new ShortBlock("$" + head).shorts[0].exprList[0];
  const { medias, selectorList, exprList } = checkSuperBody(type, name, parsed);
  if (medias) return interpretMedias(medias, {});
  if (selectorList) return selectorList.map(s => s.interpret({})).join(", ");
  return { name, argNames, exprList };
}

export function extractSuperShorts(txt) {
  const res = {};
  for (let [, type, owner = "", name, args = "", b, , body = b] of txt.matchAll(SUPER)) 
    res[type + owner + name] = interpretSuper(type, name + args, body);
  return res;
}

//todo we don't support nested :not(:has(...))
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
const clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source; //class
const op = />>|[>+~&,!]/.source;
const selectorTokens = new RegExp(`(\\s+)|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");

function parseSelectorBody(str) {
  let tokens = [...str.matchAll(selectorTokens)];
  const badToken = tokens.find(([t, ws, select, error]) => error);
  if (badToken)
    throw `Bad selector token: ${badToken[0]}`;
  tokens = tokens.filter(([t, ws]) => !ws);
  const selects = [[]];
  for (const [t] of tokens)
    t === "," ? selects.push([]) : selects.at(-1).push(t);
  return selects;
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

  static superAndNots(select, supers) {
    return select?.map(s => supers[s] ?? s)
      .map((el, i, ar) => ar[i - 1] === "!" ? `:not(${el})` : el)
      .filter(el => el !== "!")
      .join("");
  }

  constructor(select) {
    select = select.map(s => s == ">>" ? " " : s);
    if (!select.length || select.length === 1 && select[0] === "*")
      return;
    let [head, body, tail] = Selector.whereIsStar(select);
    this.head = head;
    this.body = body;
    this.tail = tail;
  }

  whereWrap(selector) {
    if (!selector)
      return selector;
    if (!selector.startsWith(":where("))
      return `:where(${selector})`;
    for (let depth = 1, i = 7; i < selector.length; i++) {
      if (selector[i] === "(") depth++;
      if (selector[i] === ")") depth--;
      if (!depth)
        return i === selector.length - 1 ? selector : `:where(${selector})`;
    }
    throw "missing ')'";
  }

  interpret(supers) {
    let head = Selector.superAndNots(this.head, supers);
    let body = Selector.superAndNots(this.body, supers);
    let tail = Selector.superAndNots(this.tail, supers);
    tail &&= `:has(${tail})`;
    head &&= `:where(${head})`;
    let selector = [head, body, tail].filter(Boolean).join("");
    if (selector) selector = this.whereWrap(selector);
    return selector;
  }
}


// --var-value123-123_123.... recognize this first. and extract them.
//
// -after:  + ( 1230 .123 1e123 var(something)..
// before-: + ) 1230 .123 1e123 var(something)..
//
// not calc [a-z]-1|1-[a-z]
// space-between = [a-z]-[a-z], and this cannot be calc()
// if the last character is an operator /[+/*<>]/, then we need to eat all tokens
// until we find the matching closing bracket.
//
// --var-bob+---var-alice*(--var-joe+--var-jane);
//if we stumble upon a [+/*<>], in a, then we need to step into a
//calc expression style
//or, if name is empty. and we cannot be on the top level.
//  --klaj-ldkjf /[+/*<>]/ (