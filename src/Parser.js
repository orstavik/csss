export class ShortBlock {

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
    return Object.entries(this.shorts)
      .map(([k, v]) => `${k.replaceAll(/[A-Z]/g, c => '-' + c.toLowerCase())}: ${v};`).join(" ");
  }
  get rule() {
    return this.media ?
      `${this.media} { ${this.selector} { ${this.body} } }` :
      `${this.selector} { ${this.body} }`;
  }
}
//calc(var(--background-size,var(--fallback, fallback)) * 2)

//(--background-size,--fallback,fallback)*2
//--background-size:--fallback:fallback*2

//(--background-size)*2
//--background-size*2

//--background-size*2
//(--background-size,--fallback,fallback)*2

class Expression {

  static makeCalc(name, args) {
    if (!name) {
      if (!args.length)
        throw "empty parentheses";
      if (!args[0].startsWith("var(--")) {
        if (args.length === 1)
          return "calc(" + args[0] + ")";
        throw "calc parentheses cannot contain ','";
      }
      while (args.length > 1) {
        const fallback = args.pop();
        if (!args[args.length - 1].match(/^var\(.+\)$/))
          throw "comma only allowed in calc var expressions.";
        args[args.length - 1] = args[args.length - 1].slice(0, -1) + ", " + fallback + ")";
      }
      return args[0];
    }

    const segs = name
      .split(/(--[a-z][a-z0-9_-]*)/g)
      .map((s, i) => i % 2 ? `var(${s})` : s.replaceAll(/(?<!^|[+*/-^])-|[+*/]/g, " $& "));
    const expr = segs.join("");
    if (expr.match(/(min|max|clamp)$/))
      return expr + "(" + args.join(",") + ")";
    if (!args.length)
      return expr.match(/^(calc|var)\(/) ? expr : `calc(${expr})`;
    if (args.length > 1)
      throw "calc parentheses cannot contain ','";
    if(!expr.endsWith(" "))
      throw `calc missing operator in front of parentheses. Did you mean: '${expr} * ('?`;   
    return `calc(${expr}${args[0]})`;
  }

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
    const cb =
      // NativeCssFunctions[this.name] ??
      scope?.[this.name] ?? scope?.[supers["$" + this.name]?.func];
    if (!cb)
      throw new SyntaxError(`Unknown short function: ${this.name}`);
    // const innerScope = !cb.scope ? scope : Object.assign({}, scope, cb.scope);
    const args = this.args.map(x =>
      x instanceof Expression ? x.interpret(cb.scope, supers) :
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

class Short {
  constructor(selectorList, exprList) {
    this.selectorList = selectorList;
    this.exprList = exprList;
  }
  interpret(SHORTS, supers) {
    const shorts = this.exprList && clashOrStack(this.exprList.map(s => s.interpret(SHORTS, supers)));
    let selector = this.selectorList && this.selectorList.map(s => s.interpret(supers)).join(", ");
    selector &&= `:where(${selector})`;
    return { selector, shorts };
  }
}

const WORD = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
const CPP = /[,()|$=;{}]/.source;
const nCPP = /[^,()|$=;{}]+/.source;
const QUOTE = /([`'"])(?:\\.|(?!\2).)*?\2/.source;
const TOKENS = new RegExp(`(${QUOTE})|(\\s+)|(${CPP})|(${nCPP})`, "g");

function processToken([m, , , space]) {
  return space ? undefined : m;
}

function diveDeep(tokens, top) {
  const res = [];
  while (tokens.length) {
    let a = tokens.shift();
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
    //LAE
    if (a === "(")
      a = Expression.makeCalc("", diveDeep(tokens));
    let b = tokens.shift();
    while (b.match(/^[+/*<>-]/)) {
      //process b, but include b inside the calc of a, or wrap it in 
      a = `calc(${a.slice(a.indexOf("(")) + b})`;   //(1em+20px)*20+40px (2+3) - 4 * (5+6)) calc(calc(calc(2+3) - 4) * (5+6))
      b = tokens.shift();
    }
    if (top && b === ",") throw "top level can't list using ','";
    if (top && b === ")") throw "top level can't use ')'";
    if (b === "(") {
      a = a.match(WORD) ?
        new Expression(a, diveDeep(tokens)) :
        Expression.makeCalc(a, diveDeep(tokens)); //2px+5px*(3px+2px)
      b = tokens.shift();
    }
    //LAE handle -!!
    if (typeof a === "string" && !a.match(/^("|'|calc\(|var\().*\)/) && a.match(/^--|(?<!^|[+*/-^])-|[+*/]/))
      a = Expression.makeCalc(a, []); //2px+5em
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
  const parsed = new ShortBlock(body);
  const { media, selector, shorts } = checkSuperBody(name, parsed.interpret(SHORTS, {}));
  return selector || (media ? media.slice(7) : { shorts, func: parsed.shorts[0].exprList[0].name });
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