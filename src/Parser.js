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
}

const WORD = /[-a-z][a-z0-9-]*/;
const CPP = /[,()]/.source;
const nCPP = /[^,()]+/.source;
const QUOTE = /([`'"])(?:\\.|(?!\3).)*?\3/.source;
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
    let b = tokens.shift();
    if (top && b === ",") throw "top level can't list using ','";
    if (top && b === E) throw "top level can't use ')'";
    if (b === S && !a.match(WORD)) throw "invalid function name";
    if (b === S) {
      a = new Expression(a, diveDeep(tokens));
      b = tokens.shift();
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

export function parse$Expression(txt) {
  return Object.fromEntries(txt.split("|")
    .map(seg => seg.split("$"))
    .map(([sel, ...shorts], i) =>
      ([i ? "|" + sel : sel, shorts.map(parseNestedExpression)])));
}

const SUPER_HEAD = /([$:])([a-b0-9_-]+)\s*=/.source; // (type, name)
const SUPER_LINE = /((["'`])(?:\\.|(?!\4).)*?\4|[^;]+);/.source; // (body1)
const SUPER_BODY = /{((["'`])(?:\\.|(?!\6).)*?\6|[^}]+)}/.source;
const SUPER = new RegExp(`${SUPER_HEAD}(?:${SUPER_LINE}|${SUPER_BODY})`);

export function parse$SuperExpressions(txt) {
  txt = txt.replace(/\/\*[\s\S]*?\*\//g, ""); // remove comments
  const supers = { "$": {}, ":": {} };
  for (let [, type, name, statement, , body = statement] of txt.matchAll(SUPER))
    supers[type][name] = body.trim();
  supers["$"] = Object2.mapValue(supers[$], parse$Expression);
}