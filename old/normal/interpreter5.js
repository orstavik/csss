import { parse$Expression } from "./parser4.js";
import { flex, _flex, flexWrap, flexItemAlign, gap, logicalFour, align, wrap, snapType } from "./Flex4.js";

const LENGTHS = /px|em|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|ch|ex|%/;

const FLEX_FUNCS = /gap|padding|align|wrap|scroll-padding/;
const FLEX_ITEM_FUNCS = /margin|align|grow|shrink|order|basis/;

const ALIGN_WORDS = /start|center|end|space-around|space-between|space-evenly/;

const LENGTHS2 = LENGTHS.source.split("|").map(k => [new RegExp(`\\(${k}$`),
(name, args) => args[0] + name]
);

//todo add rename value p => padding border(w( => border-width border(s|style => border-style
function numberPositive(name, args) {
  if (args.length !== 1)
    throw new SyntaxError("Must have one argument.");
  if (args[0] < 0)
    throw new SyntaxError("Must be positive number.");
  return args[0] + name;
}

function size(name, args) { }
function fitContent(name, args) {
  if (args.length !== 1)
    throw new SyntaxError("Must have one argument.");
  if (parseFloat(args[0]) < 0)
    throw new SyntaxError("Must be positive number.");
  return args[0] + name;
}

function keyToRegEx(key) {
  const replacers = {
    "(": "\\(",
    "layout": "(flex|grid|block)",
    "*": "(-[a-z0-9-]+)?",
  };
  for (let [w, w2] of Object.entries(replacers))
    key = key.replace(w, w2);
  return new RegExp(`${key}`);
}

const CONTAINER = {

  "^layout*_gap": ARG(2),
  "^layout*_padding": LogicalFour,
  "^layout*_wrap": 0,
  "^layout*_align": 0,
  "^layout*_scroll-padding": LogicalFour,
  "^layout*_snap": 0,
  "^flex*_align-items": 0,
  "^flex*:(reverse|row|column)": 1,

  "^_layout(margin": LogicalFour,
  "^_layout(scroll-margin": LogicalFour,

  "^_flex*(grow": PropObj(1),
  "^_flex*(shrink": PropObj(1),
  "^_flex*(basis": 1,
  "^_flex*(order": PropObj(1),
  "^_flex*(align-self": 1,
  "^_flex*:safe": FlexSafe,

  "(gap": 
  "(snap:": SnapType,
  "(grow": PosFloat,
  "(shrink": PosFloat,
  "(order": PosInt,

  "^size(pos_len_per": 1,
  "^size:(min-content|max-content)": 1,
  "^size(fit-content": +1,
  
  "fit-content(pos_len_per": 1,

  "pos_len_per:+float": 1,
};

const SHORTS = [
  [/size$/, size, new RegExp(LENGTHS.source + "|fit-content"), /min-content|max-content/],
  [/\(fit-content$/, numberPositive, "fit-content"],
  //$containers  //how to allow superShorts?
  [/^flex(-[^(]+)?$/, flex, FLEX_FUNCS, /reverse|row|column/],

  //$items
  [/^_flex$/, _flex, FLEX_ITEM_FUNCS, /safe/],

  //container functions
  [/^[^_].*?\(gap$/, gap, LENGTHS],
  [/^[^_].*?\(padding$/, logicalFour, LENGTHS],
  [/^[^_].*?\(align$/, align, , ALIGN_WORDS],
  [/^[^_].*?\(wrap$/, wrap, , /auto|scroll|clip|ellipsis/],
  //scrolls
  [/^[^_].*?\(scroll-padding$/, logicalFour, LENGTHS],
  [/^[^_].*?\(snap$/, snapType, , /(block-|inline-)?(mandatory-proximity)/],

  //special container rules
  [/^flex(-[^(]+)?\(wrap/, flexWrap, , ALIGN_WORDS],

  //item functions
  [/^_.*?\(margin$/, logicalFour, LENGTHS],
  [/^_.*?\(scroll-margin$/, logicalFour, LENGTHS],

  //special item rules
  [/^_flex(-[^(]+)?\(align/, flexItemAlign, , ALIGN_WORDS],

  ...LENGTHS2,
];


function cleanResult(obj) {
  for (let key in obj) {
    if (obj[key] == null)
      delete obj[key];
    const kebab = key.replace(/[A-Z]/g, "-$&").toLowerCase();
    if (key !== kebab) {
      obj[kebab] = obj[key];
      delete obj[key];
    }
  }
  return obj;
}

function engine(exp, path = "") {
  if (!(exp instanceof Object))
    return exp;
  path += exp.camelName;
  const [regEx, func, filterA, filterB] = SHORTS.find(([k, v]) => path.match(k) && v);

  for (let a of exp.args)
    if (a?.name && (!filterA || !a.name.match(filterA)))
      throw new SyntaxError(`Invalid argument "${a.name}()" for ${path}`);
  for (let a of exp.args)
    if (typeof a === "string" && (!filterB || !a.match(filterB)))
      throw new SyntaxError(`Invalid argument "${a}" for ${path}`);
  const args = exp.args.map(a => engine(a, path + "("));

  const obj = func(exp.name, exp.args, args);
  return cleanResult(obj);
}

export function interpretClass(txt) {
  const { container, items } = parse$Expression(txt);
  container.results = container.shorts.map(exp => engine(exp));
  container.merged = Object.assign({}, ...container.results);
  const res = { [container.selector]: container.merged };
  for (let item of items) {
    item.results = item.shorts.map(exp => engine(exp));
    item.merged = Object.assign({}, ...item.results);
    res[item.selector] = item.merged;
  }
  return res;
  // const superShorts = container.shorts.map(s => superShorts[s.name]).filter(Boolean);
  //merge the superShorts objects with the .results objects from container and items
  // return { container, items };
}