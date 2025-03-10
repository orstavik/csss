export class Expression {

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

export function parse$Expression(exp) {
  return exp.split("|").map(seg => seg.split("$"))
    .map(([sel, ...shorts], i) => ({
      selector: parseSelectorBody(sel),
      shorts: shorts.map(parseNestedExpression),
      item: !!i,
    }));
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

  return new SelectorGroup(selects, medias);
  // return { medias, selects, selectorGroup };
}


class SelectorGroup {
  constructor(selectors, medias) {
    this.selectors = selectors.map(s => new Selector(s));
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

  static selectorNot(select) {
    if (select.at(-1) === "!")
      throw `Invalid selector, not at the end: ${select.join("")}`;
    const res = [];
    for (let i = 0; i < select.length; i++)
      res.push(select[i] === "!" ? `:not(${select[++i]})` : select[i]);
    return res;
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
    let head = this.head?.map(s => supers[s] ?? s);
    let body = this.body?.map(s => supers[s] ?? s);
    let tail = this.tail?.map(s => supers[s] ?? s);
    head &&= Selector.selectorNot(head).join("");
    body &&= Selector.selectorNot(body).join("");
    tail &&= Selector.selectorNot(tail).join("");
    tail &&= `:has(${tail})`;
    head &&= `:where(${head})`;
    return [head, body, tail].filter(Boolean).join("");
  }
}