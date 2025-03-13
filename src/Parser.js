export class Shorts {

  constructor(exp) {
    this.exp = exp;
    this.clazz = "." + exp.replaceAll(/[^a-zA-Z0-9_-]/g, "\\$&");
    const { medias, shorts } = parse$Expression(exp);
    this.medias = medias;
    this.shorts = shorts;
  }

  interpret(SHORTS, supers) {
    let media = this.medias?.map(m => supers[m] ?? m)
      .map(m => m.replace(/^@/, ""))
      .map(m => m === "!" ? "not" : m)
      .join(" and ").replaceAll("and , and", ",").replaceAll("not and ", "not ");
    if (media)
      media = `@media ${media}`;
    const shorts = this.shorts?.map(short => short.interpret(SHORTS, supers));
    return { media, shorts };
  }

  *rules(SHORTS, supers) {
    let { media, shorts } = this.interpret(SHORTS, supers);
    if (!shorts) return;
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
    return Object.entries(this.shorts).map(([k, v]) => `${k}: ${v};`).join(" ");
  }
  get rule() {
    return this.media ?
      `${this.media} { ${this.selector} { ${this.body} } }` :
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
  interpret(scope, supers) {
    const cb = scope[this.name] ?? scope[supers["$" + this.name]?.func];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${this.name}`);
    const innerScope = !cb.scope ? scope : Object.assign({}, scope, cb.scope);
    const args = this.args.map(x =>
      x instanceof Expression ? x.interpret(innerScope, supers) :
        x === "." ? "unset" :
          x);
    const res = cb.call(this, ...args);
    const supersObj = supers["$" + this.name]?.shorts;
    return supersObj ? Object.assign({}, supersObj, res) : res;
  }
}
const clashOrStack = (function () {
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

  return function clashOrStack(shortsI) {
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

// class ShortGroup {
//   constructor(shorts) {
//     this.shorts = shorts;
//   }

//   interpret(SHORTS, supers) {
//     if (!this.shorts.length)
//       return null;
//     const shortsI = this.shorts.map(s => s.interpret(SHORTS, supers));
//     return clashOrStack(shortsI);
//   }
// }

class Short {
  constructor(selectorGroup, shorts) {
    this.selectorGroup = selectorGroup;
    this.shorts = shorts;
  }
  interpret(SHORTS, supers) {
    const shorts = this.shorts && clashOrStack(this.shorts.map(s => s.interpret(SHORTS, supers)));
    const selector = this.selectorGroup && this.selectorGroup.interpret(supers);
    return { selector, shorts };
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
    return new Expression(tokensOG[0], []);
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
      sel && new SelectorGroup(parseSelectorBody(sel)),
      shorts.length && shorts.map(parseNestedExpression)
    ));
  return { shorts, medias };
}

const SUPER_HEAD = /([$:@][a-z_][a-z0-9_-]*)\s*=/.source; // (name)
const SUPER_LINE = /((["'`])(?:\\.|(?!\3).)*?\3|\/\*[\s\S]*?\*\/|[^;]+);/.source; // (body1, quoteSign)
const SUPER_BODY = /{((["'`])(?:\\.|(?!\5).)*?\5|\/\*[\s\S]*?\*\/|[^}]+)}/.source;// (body2, quoteSign)
const SUPER = new RegExp(`${SUPER_HEAD}(?:${SUPER_LINE}|${SUPER_BODY})`, "g");

function checkSuperBody(name, { media, shorts: selectorShorts }) {
  const type = name[0];
  if (!media && !selectorShorts) throw `is empty`;
  if (media && selectorShorts) throw `contains both media and selector/shorts`;
  if (media && type !== "@") throw `type error: did you mean "${type}${name.slice(1)}"?`;
  if (media) return { media };
  const [{ selector, shorts }, tooManyItems] = selectorShorts;
  if (selector && shorts) throw `contains both selector and shorts`;
  if (tooManyItems) throw `contains too many items`;
  if (selector && type !== ":") throw `type error: did you mean "${type}${name.slice(1)}"?`;
  if (selector) return { selector };
  if (shorts && type !== "$") throw `type error: did you mean "${type}${name.slice(1)}"?`;
  return { shorts };
}

function interpretSuper(name, body, SHORTS) {
  const parsed = new Shorts(body);
  const { media, selector, shorts } = checkSuperBody(name, parsed.interpret(SHORTS, {}));
  return selector || (media ? media.slice(7) : { shorts, func: parsed.shorts[0].shorts[0].name });
}

export function extractSuperShorts(txt, SHORTS) {
  return Object.fromEntries(
    [...txt.matchAll(SUPER)]
      .map(([, name, b, , body = b]) => [name, interpretSuper(name, body, SHORTS)]));
}

//todo we don't support nested :not(:has(...))
const pseudo = /:[a-zA-Z][a-zA-Z0-9_-]*(?:\([^)]+\))?/.source;
const at = /\[[a-zA-Z][a-zA-Z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /\[a-zA-Z][a-zA-Z0-9-]*/.source; //tag
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


class SelectorGroup {
  constructor(selects) {
    this.selectors = selects.map(s => new Selector(s));
  }

  interpret(supers) {
    let selector = this.selectors.map(s => s.interpret(supers)).join(", ");
    if (selector)
      selector = `:where(${selector})`;
    return selector;
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