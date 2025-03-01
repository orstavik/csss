export function DictMap(dict, kCB, vCB) {
  const res = {};
  for (const [k, v] of Object.entries(dict))
    res[kCB ? kCB(k) : k] = vCB ? vCB(v) : v;
  return res;
}

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
  return Object.fromEntries(txt.split("|").map((s, i) => i ? "|" + s : s)
    .map(seg => seg.split("$"))
    .map(([sel, ...shorts]) =>
      ([sel, shorts.map(parseNestedExpression)])));
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

//todo we don't support nested :not(:has(...))
//todo we don't do @support/scope/container. 
//todo @support should be done in a transpile process on the <style> element.
const media = /@(?:\([^)]+\)|[a-z][a-z0-9_-]*)/.source;
const pseudo = /:[a-z][a-z0-9_-]*\([^)]+\)/.source;
const at = /\[[a-z][a-z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /\[a-z][a-z0-9-]*/.source; //tag
const clazz = /\.[a-z][a-z0-9_-]*/.source; //class
const mop = /[,!]/.source;
const op = />>|[>+~&]/.source;
const selectorTokens = new RegExp(
  `(${mop})|(${media})|(${op})|(${pseudo})|(${at})|(${tag})|(${clazz})|(\\*)|(\\s+)|(.)`, "g");

function parseSelector(str) {
  const tokens = [...str.matchAll(selectorTokens)];
  let medias = [], selects = [], nowSelect = [], priority = "", trueMedia;
  for (const T of tokens) {
    const [t, mop, media, op, pseudo, at, tag, clazz, star, ws, error] = T;
    if (error) throw `Bad selector token: ${error}`;
    if (ws) continue;

    priority += media ? "@" : pseudo ? ":" : at ? "[" : clazz ? "." : tag ? "<" : "";

    //media-state
    if (selects.length && media)
      throw `media queries must precede selectors: ${selects.join("")} => ${t}`;
    if (media)
      trueMedia = medias.push(media);
    if (mop)
      selects.length ? selects.push(mop) : medias.push(mop);

    //selector state
    if (op === ",")
      selects.push(nowSelect), nowSelect = [];
    else
      nowSelect.push(t); //keep the operator for now
  }
  if (!trueMedia && medias.length)
    selects = [...medias, ...selects];
  return { medias, selects, priority };
}