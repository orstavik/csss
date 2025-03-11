export class Shorts {

  constructor(exp) {
    this.exp = exp;
    this.clazz = "." + exp.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
    this.units = parse$Expression(exp);
  }

  interpret(SHORTS, supers) {
    return this.units.map(unit => unit.interpret(SHORTS, supers));
  }

  *rules(SHORTS, supers) {
    const [container, ...items] = this.interpret(SHORTS, supers);
    const cRule = new Rule(container.medias, this.clazz + container.selector, container.shorts);
    if (!cRule.isEmpty)
      yield cRule;
    for (const item of items)
      if (Object.keys(item.shorts).length)
        yield new Rule(
          [item.medias, cRule.medias].filter(Boolean).join(" and "),
          cRule.selector + ">*" + item.selector,
          item.shorts,
          true);
  }
}

class Rule {
  constructor(medias, selector, shorts, item) {
    this.medias = medias;
    this.selector = selector;
    this.shorts = shorts;
    this.item = item;
  }
  get isEmpty() {
    return !Object.keys(this.shorts).length;
  }
  get body() {
    return Object.entries(this.shorts).map(([k, v]) => `${k}: ${v};`).join(" ");
  }
  get rule() {
    return this.medias ?
      `@media ${this.medias} { ${this.selector} { ${this.body} } }` :
      `${this.selector} { ${this.body} }`;
  }
}

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
  interpret(scope) {
    const cb = scope[this.name];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${this.name}`);
    const innerScope = !cb.scope ? scope : Object.assign({}, scope, cb.scope);
    const args = this.args.map(x => x instanceof Expression ? x.interpret(innerScope) : x);
    return cb.call(this, ...args);
  }
}
const mergeOrStack = (function () {
  const STACKABLE_PROPERTIES = {
    background: ",",
    transition: ",",
    "font-family": ",",
    "voice-family": ",",
    "text-shadow": ",",
    "box-shadow": ",",
    animation: ",",
    mask: ",",
    "font-feature-settings": ",",
    "will-change": ",",

    transform: " ",
    filter: " ",
    "counter-reset": " ",
    "counter-increment": " ",
    "font-variant": " ",
  };

  return function mergeOrStack(shortsI) {
    const res = {};
    for (const obj of shortsI) {
      for (let [k, v] of Object.entries(obj)) {
        if (v == null) continue;
        k = k.replace(/[A-Z]/g, "-$&").toLowerCase();
        if (CSS.supports(k, "inherit"))
          if (!CSS.supports(k, v))
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

class ShortGroup {
  constructor(shorts) {
    this.shorts = shorts;
  }

  interpret(SHORTS, supers) {
    const shortsI = this.shorts.map(s => s.interpret(SHORTS));
    const res = mergeOrStack(shortsI);
    return res;
  }
}

class Short {
  constructor(selectorGroup, shortGroup) {
    this.selectorGroup = selectorGroup;
    this.shortGroup = shortGroup;
  }
  interpret(SHORTS, supers) {
    const shorts = this.shortGroup.interpret(SHORTS, supers);
    const { selector, medias } = this.selectorGroup.interpret(supers);
    return { selector, medias, shorts };
  }
}

const WORD = /[-a-zA-Z][a-zA-Z0-9-]*/;
const CPP = /[,()|$=;{}]/.source;
const nCPP = /[^,()|$=;{}]+/.source;
const QUOTE = /([`'"])(?:\\.|(?!\2).)*?\2/.source;
const TOKENS = new RegExp(`(${QUOTE})|(\\s+)|(${CPP})|(${nCPP})`, "g");

function processToken([m, , , space]) {
  return space ? undefined : m;
}

const S = "(", E = ")";
function diveDeep(tokens, top) {
  const res = [];
  while (tokens.length) {
    let a = tokens.shift();
    if (top && a === ",") throw "can't start with ','";
    if (top && a === E) throw "can't start with ')'";
    if (a === "," || a === E) {         //empty
      res.push(undefined);
      if (a === E && !res.length)
        throw new SyntaxError("empty function not allowed in CSSs");
      if (a === E)
        return res;
      continue;
    }
    let b;
    if (a === S) {
      a = new Expression("", diveDeep(tokens));
      b = tokens.shift();
    } else {
      b = tokens.shift(); if (top && b === ",") throw "top level can't list using ','";
      if (top && b === undefined) return [new Expression(a, [])];
      if (top && b === E) throw "top level can't use ')'";
      if (b === S && !a.match(WORD)) throw "invalid function name";
      if (b === S) {
        a = new Expression(a, diveDeep(tokens));
        b = tokens.shift();
      }
    }
    if (b === E || (top && b === undefined))
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
    return tokensOG[0];
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

function parse$Expression(exp) {
  return exp.split("|").map(seg => seg.split("$"))
    .map(([sel, ...shorts]) => new Short(
      new SelectorGroup(parseSelectorBody(sel)),
      new ShortGroup(shorts.map(parseNestedExpression)),
    ));
}

const SUPER_HEAD = /([$:@][a-z_][a-z0-9_-]*)\s*=/.source; // (name)
const SUPER_LINE = /((["'`])(?:\\.|(?!\3).)*?\3|\/\*[\s\S]*?\*\/|[^;]+);/.source; // (body1, quoteSign)
const SUPER_BODY = /{((["'`])(?:\\.|(?!\5).)*?\5|\/\*[\s\S]*?\*\/|[^}]+)}/.source;// (body2, quoteSign)
const SUPER = new RegExp(`${SUPER_HEAD}(?:${SUPER_LINE}|${SUPER_BODY})`, "g");

export function* findStatements(txt) {
  for (let [, name, _body, , body = _body] of txt.matchAll(SUPER))
    yield { name, body };
}

//todo we don't support nested :not(:has(...))
//todo we don't do @support/scope/container. 
//todo @support should be done in a transpile process on the <style> element.
const media = /@(?:\([^)]+\)|[a-zA-Z][a-zA-Z0-9_-]*)/.source;
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /\[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
const clazz = /\.[a-zA-Z][a-zA-Z0-9_-]*/.source; //class
const mop = /[,!]/.source;
const op = />>|[>+~&]/.source;
const selectorTokens = new RegExp(
  `(\\s+)|(${media})|(${mop})|(${op}|${pseudo}|${at}|${tag}|${clazz}|\\*)|(.)`, "g");

function parseSelectorBody(str) {
  let tokens = [...str.matchAll(selectorTokens)];
  const badToken = tokens.find(([t, ws, media, mop, select, error]) => error);
  if (badToken)
    throw `Bad selector token: ${badToken[0]}`;
  tokens = tokens.filter(([t, ws]) => !ws);
  const lastMedia = tokens.findLastIndex(([, , media]) => media) + 1;
  const firstSelector = (tokens.findIndex(([, , media, mop]) => !(media || mop)) + 1) || tokens.length;

  tokens = tokens.map(([t]) => t);
  if (firstSelector < lastMedia)
    throw `media queries must come before selectors: 
  ...${tokens.slice(firstSelector, lastMedia).join("")}...`;

  const medias = tokens.slice(0, lastMedia);
  const selects = [[]];
  for (const t of tokens.slice(lastMedia))
    t === "," ? selects.push([]) : selects.at(-1).push(t);

  return { selects, medias };
}


class SelectorGroup {
  constructor({ selects, medias }) {
    this.selectors = selects.map(s => new Selector(s));
    this.medias = medias;
  }

  interpret(supers) {
    let selector = this.selectors.map(s => s.interpret(supers)).join(", ");
    if (selector)
      selector = `:where(\n${selector}\n)`;
    const medias = this.medias
      .map(s => supers[s] ?? s)
      .map(m => m.replace(/^@/, ""))
      .join(" and ").replaceAll("and , and", ",");
    //todo fix ! not in medias
    return { selector, medias };
  }
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

  interpret(supers) {
    let head = Selector.superAndNots(this.head, supers);
    let body = Selector.superAndNots(this.body, supers);
    let tail = Selector.superAndNots(this.tail, supers);
    tail &&= `:has(${tail})`;
    head &&= `:where(${head})`;
    return [head, body, tail].filter(Boolean).join("");
  }
}