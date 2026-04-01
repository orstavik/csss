const FACTORS = {
  // Times
  s_ms: 1000,
  ms_s: 1 / 1000,
  // Length
  in_cm: 2.54,       // in
  in_mm: 25.4,
  in_pt: 72,
  in_pc: 6,
  in_Q: 101.6,
  cm_in: 1 / 2.54,
  mm_in: 1 / 25.4,
  pt_in: 1 / 72,
  pc_in: 1 / 6,
  Q_in: 1 / 101.6,
  cm_mm: 10,         // cm
  cm_pt: 72 / 2.54,
  cm_pc: 6 / 2.54,
  cm_Q: 40,
  mm_cm: 1 / 10,
  pt_cm: 2.54 / 72,
  pc_cm: 2.54 / 6,
  Q_cm: 1 / 40,
  mm_pt: 72 / 25.4,  // mm
  mm_pc: 6 / 25.4,
  mm_Q: 4,
  pt_mm: 25.4 / 72,
  pc_mm: 25.4 / 6,
  Q_mm: 1 / 4,
  pt_pc: 1 / 12,     // pt
  pt_Q: 101.6 / 72,
  pc_pt: 12,         // pc
  Q_pt: 72 / 101.6,
  pc_Q: 101.6 / 6,   // pc,Q
  Q_pc: 6 / 101.6,
  // Angles
  turn_deg: 360,         // turn
  turn_rad: 2 * Math.PI,
  turn_grad: 400,
  deg_turn: 1 / 360,
  rad_turn: 1 / (2 * Math.PI),
  grad_turn: 1 / 400,
  rad_deg: 180 / Math.PI, // rad
  rad_grad: 200 / Math.PI,
  grad_rad: Math.PI / 200,
  deg_rad: Math.PI / 180,
  deg_grad: 400 / 360,    // deg,grad
  grad_deg: 360 / 400,
  // Resolution (CSS)
  dppx_dpi: 96,       // dppx
  dppx_dpcm: 96 / 2.54,
  dpcm_dppx: 2.54 / 96,
  dpi_dppx: 1 / 96,
  dpcm_dpi: 2.54,     // dpcm,dpi
  dpi_dpcm: 1 / 2.54,
};

//computable: number is number or of a single type that can be factorized
//incalculable: if missing .num or units cannot be converted to first common unit
function computableNumbers(args) {
  let nums = [], firstUnit;
  for (let a of args) {
    if (a.num == null)
      return; //incomputable
    if (a.type == "number")
      nums.push(a.num);
    else if (a.unit == (firstUnit ??= a.unit))
      nums.push(a.num);
    else if (FACTORS[firstUnit + "_" + a.type])
      nums.push(a.num * FACTORS[firstUnit + "_" + a.type]);
    else
      return; //incomputable
  }
  return nums;
}

function angleToRad({ unit, num }) {
  return unit == "deg" ? num * Math.PI / 180 :
    unit == "grad" ? num * Math.PI / 200 :
      unit == "turn" ? num * 2 * Math.PI :
        num;
}

const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const multi = (a, b) => a * b;
const divide = (a, b) => a / b;
const mod = (a, b) => a - b * Math.floor(a / b);
const rem = (a, b) => a - b * Math.trunc(a / b);
const clamp = (a, b, c) => Math.min(Math.max(a, b), c);
const sin = (a) => Math.sin(angleToRad(a));
const cos = (a) => Math.cos(angleToRad(a));
const tan = (a) => Math.tan(angleToRad(a));
const log = (a, b = Math.E) => Math.log(a) / Math.log(b);
const { pow, min, max, round, asin, acos, atan, atan2, sqrt, hypot, exp, abs, sign } = Math;

//CHECKS
//returns [inputUnit, outputUnit].
//if undefined, [arg[0].unit, arg[0].unit]
//if incompatible units, throws SyntaxError
function sameType(args) {
  args.reduce((t, a) => {
    if (t && a.type && t.type != a.type)
      throw new SyntaxError(`Incompatible type differences: ${t.text} vs ${a.text}`);
    return a.type ? a : t;
  }, null);
}
function illegalDividend(a, b) {
  if (b.type != "number") throw "Divisor must be a plain number.";
  if (b.num == 0) throw "Divide by zero.";
}
function singleArgumentOnly(args) {
  if (args.length != 1) throw "This function only takes a single argument.";
}
function singlePositiveArgumentOnly(args) {
  singleArgumentOnly(args);
  if (args[0].num <= 0) throw "Argument must be positive.";
}
function singleAngleOnly(args) {
  singleArgumentOnly(args);
  if (args[0].type != "angle") throw "Argument must be angle.";
}
function singleNumberOnly(args) {
  singleArgumentOnly(args);
  if (args[0].type != "number") throw "Argument must be number.";
}
function twoSameType(args) {
  if (args.length != 2) throw "requires two arguments.";
  sameType(args);
}
function secondArgumentIsNumber(args) {
  if (args.length != 2) throw "requires two arguments.";
  if (args[1].type != "number") throw "second argument must be a plain number.";
}
function optionalSecondNumber(args) {
  if (args.length == 1) return;
  secondArgumentIsNumber(args);
  if (args[1] <= 0) throw "second argument must be positive.";
}
function onlyOneArgWithUnit(args) {
  if (args.filter(a => a.unit).length > 1) throw "Only one argument can have a unit.";
}
//POSTS
function toNumber(num, a) { return { type: "number", unit: "", num, text: num }; }
function toAngle(num, a) { return { type: "angle", unit: "rad", num, text: num }; }
function updateFirst(num, a) { return { ...a, num, text: num + a.unit }; }
//TEXTERS
function texter(name, args) { return `${name}(${args.join(", ")})`; }
function stripCalc(name, args) {
  return `${name}(${args.map(a => a.replaceAll(/^calc\((.*)\)$/g, (_, a) => a)).join(", ")})`;
}

const Maths = {
  "-": doMath.bind(null, sameType, minus, updateFirst, txts => `calc(${txts.join(" - ")})`),
  "+": doMath.bind(null, sameType, plus, updateFirst, txts => `calc(${txts.join(" + ")})`),
  "*": doMath.bind(null, onlyOneArgWithUnit, multi, updateFirst, txts => `calc(${txts.join(" * ")})`),
  "/": doMath.bind(null, illegalDividend, divide, updateFirst, txts => `calc(${txts.join(" / ")})`),
  "**": doMath.bind(null, secondArgumentIsNumber, pow, updateFirst, texter.bind(null, "pow")),
  mod: doMath.bind(null, illegalDividend, mod, updateFirst, texter.bind(null, "mod")),
  rem: doMath.bind(null, illegalDividend, rem, updateFirst, texter.bind(null, "rem")),
  clamp: doMath.bind(null, sameType, clamp, updateFirst, texter.bind(null, "clamp")),
  min: doMath.bind(null, sameType, min, updateFirst, texter.bind(null, "min")),
  max: doMath.bind(null, sameType, max, updateFirst, texter.bind(null, "max")),
  round: doMath.bind(null, sameType, round, updateFirst, stripCalc.bind(null, "round")),
  sin: doMath.bind(null, singleAngleOnly, sin, toNumber, texter.bind(null, "sin")),
  cos: doMath.bind(null, singleAngleOnly, cos, toNumber, texter.bind(null, "cos")),
  tan: doMath.bind(null, singleAngleOnly, tan, toNumber, texter.bind(null, "tan")),
  asin: doMath.bind(null, singleNumberOnly, asin, toAngle, texter.bind(null, "asin")),
  acos: doMath.bind(null, singleNumberOnly, acos, toAngle, texter.bind(null, "acos")),
  atan: doMath.bind(null, singleNumberOnly, atan, toAngle, texter.bind(null, "atan")),
  atan2: doMath.bind(null, twoSameType, atan2, toAngle, texter.bind(null, "atan2")),
  sqrt: doMath.bind(null, singlePositiveArgumentOnly, sqrt, updateFirst, texter.bind(null, "sqrt")),
  hypot: doMath.bind(null, sameType, hypot, updateFirst, texter.bind(null, "hypot")),
  log: doMath.bind(null, optionalSecondNumber, log, updateFirst, texter.bind(null, "log")),
  exp: doMath.bind(null, singleArgumentOnly, exp, updateFirst, texter.bind(null, "exp")),
  abs: doMath.bind(null, singleArgumentOnly, abs, updateFirst, texter.bind(null, "abs")),
  sign: doMath.bind(null, singleArgumentOnly, sign, toNumber, texter.bind(null, "sign")),
};

const Cache = new WeakMap();
const resolve = a => {
  let result = Cache.get(a);
  if (result === undefined)
    Cache.set(a, result = a.name in Maths ? Maths[a.name]?.(a.args) : a);
  return result;
};

function doMath(check, func, post, texter, args) {
  args = args.map(resolve);
  check(args);
  const nums = computableNumbers(args);
  return nums ?
    post(func(...nums), args[0]) :
    { type: args.find(a => a.type)?.type, text: texter(args.map(a => a.text)) };
}

const ResolveMath = CB => a => CB(resolve(a));

export default {
  csss: {
    Length: ResolveMath(a => (a.type === "length" || a.text === "0") ? a.text : undefined),
    LengthPercent: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0") ? a.text : undefined),
    LengthPercentUnset: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0" || a.text === "_") ? (a.text === "_" ? "unset" : a.text) : undefined),
    LengthPercentAuto: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.text === "0" || a.text === "_") ? (a.text === "_" ? "auto" : a.text) : undefined),
    Repeat: ResolveMath(a => a.name === "repeat" ? `repeat(${a.args.map(a => a.text).join(", ")})` : a.text),
    Span: ResolveMath(a => a.name === "span" ? `span ${a.args[0].text}` : a.text),
    NumberInterpreter: ResolveMath(a => (a.type === "number" && a.unit === "") ? a.num : undefined),
    LengthPercentNumber: ResolveMath(a => (a.type === "length" || a.type === "percent" || a.type === "number") ? a.text : undefined),
    LengthNumber: ResolveMath(a => (a.type === "length" || (a.type === "number" && a.unit === "")) ? a.text : undefined),
    Percent: ResolveMath(a => a.type === "percent" ? a.text : undefined),
    Time: ResolveMath(a => a.type === "time" ? a.text : undefined),
    Resolution: ResolveMath(a => a.type === "resolution" ? a.text : (a.type === "number" && a.num === 0) ? "0x" : undefined),
    MinMax: ResolveMath(a => a.name === "minmax" ? `minmax(${a.args.map(a => a.text).join(", ")})` : a.text),
    PercentNumber: ResolveMath(a => (a.type === "percent" || a.type === "number") ? a.text : undefined),
    Angle: ResolveMath(a => (a.type === "angle") ? a.text : undefined),
    AnglePercent: ResolveMath(a => (a.type === "angle" || a.type === "percent") ? a.text : undefined),
    AngleNumber: ResolveMath(a => (a.type === "angle" || (a.type === "number" && a.unit === "")) ? a.text : undefined),
    NumberPercent: ResolveMath(a => (a.type === "number" || a.type === "percent") ? a.text : undefined),
    Radian: ResolveMath(a => a.type === "angle" ? angleToRad(a) : a?.num == 0 && a.type === "number" ? 0 : undefined),
  },
};