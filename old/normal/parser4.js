import { parse$ContainerSelector, parse$ItemSelector } from "./parseSelector.js";
export { toCssText } from "./parseSelector.js";

class Expression {
  constructor(name, args) {
    this.name = name;
    this.args = args;
    this.item = "";
  }

  get camelName() {
    return this.item + this.name.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
  }
}

const N = /-?[0-9]*\.?[0-9]+(?:e[+-]?[0-9]+)?/.source;
const UNIT = /[a-z]+|%/.source;
const NUM = `(${N})(?:\\/(${N}))?(${UNIT})?`; //num, int, unit
const HEX = /#[0-9a-f]{3,6}/.source;
const WORD = /[-]*[a-z][a-z0-9-]*/.source; //word allows for --var syntax
const CPP = /[,()]/.source;
const nCPP = /[^,()]+/.source;
const QUOTE = /([`'"])(?:\\.|(?!\3).)*?\3/.source;
const TOKENS = new RegExp(
  `(${QUOTE})|(\\s+)|(${CPP})|(${HEX})|(${NUM})|(${WORD})|(${nCPP})`, "g");
const SUPERSHORT = new RegExp(
  `\\s*(${WORD})\\s*\\{((?:(["'])(?:\\\\.|(?!\\3).)*?\\3|[^}])+?)\\}`, "g");

function processNumber(num, frac, unit) {
  num = Number(num);
  if (frac) // /0 is just ignored as if /1
    num /= Number(frac);
  unit ||= (!frac && Number.isInteger(num)) ? "int" : "float";
  return new Expression(unit, [num]);
}

function processToken([, quote,, space, cpp, hex, N, num, frac, unit, word, expr]) {
  return N ? processNumber(num, frac, unit) :
    hex ? new Expression("#", [hex]) :
      quote ? new Expression('"', [quote.slice(1, -1)]) :
        space ? undefined : cpp ? cpp :
          word ? word :
            new Expression(undefined, [expr]);
}

function diveDeep(tokens) {
  const args = [];
  while (tokens.length) {
    const a = tokens.shift();
    if (a === "," || a === ")") {
      args.push(undefined);//empty 
      if (a === ")")
        return args;
      continue;
    }
    const b = tokens.shift();
    if (b === "(") {
      if (typeof a !== "string") {
        tokens.unshift(b);
        throw "is not a word";
      }
      args.push(new Expression(a, diveDeep(tokens)));
      const c = tokens.shift();
      if(c === ")")
        return args;
      if(c === ",")
        continue;
      tokens.unshift(c);
      throw "syntax error";
    } else if (b === "," || b === ")") {
      args.push(a);
      if (b === ")")
        return args;
    } else {
      tokens.unshift(b);
      throw "syntax error";
    }
  }
  throw "missing ')'";
}

function parseNestedExpression(short) {
  const rawTokens = [...short.matchAll(TOKENS)];
  const tokens = rawTokens.map(processToken).filter(Boolean);
  if (tokens.length === 1)
    return strs[0];
  const [word , pStart, ...rest] = tokens;
  if (typeof word === "string" && pStart === "(") {
    try {
      const args = diveDeep(rest);
      if (rest.length)
        throw "too many ')'";
      return new Expression(word, args);
    } catch (e) {
      const strs = rawTokens.map(([str, ws]) => ws ? 0 : str).filter(Boolean);
      const i = strs.length - rest.length;
      strs.splice(i, 0, `{{{${e}}}}`);
      const msg = strs.join("");
      throw new SyntaxError("Invalid short: " + msg);
    }
  }
  throw new SyntaxError("Invalid start of short: " + short);
}

export function parse$Expression(txt) {
  let [container, ...items] = txt.split("|").map(seg => seg.split("$"));
  const [cSelect, ...cShorts] = container;
  container = {
    selector: parse$ContainerSelector(cSelect),
    shorts: cShorts.map(parseNestedExpression)
  };
  items = items.map(([iSelect, ...iShorts]) => ({
    selector: parse$ItemSelector(iSelect),
    shorts: iShorts.map(parseNestedExpression)
  }));
  for (let { shorts } of items)
    for (let s of shorts)
      s.item = "_";
  return { container, items };
}

export function* parseSuperShorts(txt) {
  txt = txt.replace(/\/\*[\s\S]*?\*\//g, ""); //remove comments
  for (let [, name, body] of txt.matchAll(SUPERSHORT))
    yield { [name]: parse$Expression(body) };
}

export function cssClassName(shortName) {
  return "." + shortName.replaceAll(/[^a-z0-9_-]/g, "\\$&");;
}