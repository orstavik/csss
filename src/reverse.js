export const ReverseCamelWords = WORDS => {
  const lookupTable = Object.fromEntries(WORDS.split("|").map(w => [w.replaceAll(/[A-Z]/g, c => "-" + c.toLowerCase()), w]));
  return a => lookupTable[a] ?? undefined;
};

export const ReverseWordToValue = TABLE => {
  const reverseTable = {};
  for (let [k, v] of Object.entries(TABLE)) {
    if (Array.isArray(v)) {
      reverseTable[v.join(" ")] = k;
    } else {
      reverseTable[typeof v === 'object' ? JSON.stringify(v) : v] = k;
    }
  }
  return a => {
    let key = typeof a === 'object' ? JSON.stringify(a) : a;
    return reverseTable[key] ?? undefined;
  };
};

export const ReverseValueTypes = {
  ReverseCamelWords,
  ReverseWordToValue,
};

export const ReverseLogicalFour = (NAME) => (style) => {
  const base = style[NAME];
  const block = style[NAME + "Block"];
  const inline = style[NAME + "Inline"];

  if (base === undefined && block === undefined && inline === undefined) return undefined;

  let args = [];
  if (block !== undefined && inline !== undefined) {
    const [bStart, bEnd] = block.split(" ");
    const [iStart, iEnd] = inline.split(" ");
    args = [bStart, iStart, bEnd ?? bStart, iEnd ?? iStart];
    delete style[NAME + "Block"];
    delete style[NAME + "Inline"];
  } else if (block !== undefined) {
    const [bStart, bEnd] = block.split(" ");
    args = [bStart, "unset", bEnd ?? bStart];
    delete style[NAME + "Block"];
  } else if (inline !== undefined) {
    const [iStart, iEnd] = inline.split(" ");
    args = ["unset", iStart, "unset", iEnd ?? iStart];
    delete style[NAME + "Inline"];
  } else if (base !== undefined) {
    if (base === "none") {
      delete style[NAME];
      return [];
    }
    args = [base];
    delete style[NAME];
  }

  while (args.length > 0 && args[args.length - 1] === "unset") args.pop();
  return args.map(a => a === "unset" ? "_" : a);
};

export const ReverseSingleArgumentFunction = (name, REVERSE_INTERPRETER) => (style) => {
  if (!(name in style)) return undefined;
  let val = style[name];
  if (REVERSE_INTERPRETER) {
    val = REVERSE_INTERPRETER(val);
  }
  if (val !== undefined) {
    delete style[name];
    return [val];
  }
  return undefined;
};

export const ReverseFunctionBasedOnValueTypes = (wes = {}, singlePrimes = {}, primes = {}, REVERSE_POST) => (style) => {
  if (REVERSE_POST) {
    REVERSE_POST(style);
  }

  let args = [];

  for (let [csssArg, expectedCss] of Object.entries(wes)) {
    if (typeof expectedCss === 'object' && expectedCss !== null) {
      let matches = true;
      for (let [k, v] of Object.entries(expectedCss)) {
        if (style[k] !== v) {
          matches = false;
          break;
        }
      }
      if (matches) {
        for (let k of Object.keys(expectedCss)) delete style[k];
        args.push(csssArg);
      }
    }
  }

  for (let [propName, reverseCb] of Object.entries(singlePrimes)) {
    if (propName in style) {
      let val = style[propName];
      let arg = reverseCb(val);
      if (arg !== undefined) {
        delete style[propName];
        args.push(arg);
      }
    }
  }

  for (let [propName, reverseCb] of Object.entries(primes)) {
    if (propName in style && Array.isArray(style[propName])) {
      let vals = style[propName];
      for (let v of vals) {
        let arg = reverseCb(v);
        if (arg !== undefined) args.push(arg);
      }
      delete style[propName];
    } else {
      let valOrArgs = reverseCb(style);
      if (valOrArgs !== undefined) {
        if (Array.isArray(valOrArgs)) args.push(...valOrArgs);
        else args.push(valOrArgs);
      }
    }
  }

  return args;
};

function hasDefaultsMatch(style, defaults) {
  let hasMatch = false;
  let hasNonDefault = false;
  let hasUnset = false;
  let matchCount = 0;

  for (let [k, v] of Object.entries(defaults)) {
    if (k in style) {
      if (style[k] === v) {
        hasMatch = true;
        matchCount++;
      } else if (style[k] === "unset" || style[k] === "initial") {
        hasUnset = true;
        hasMatch = true;
        matchCount++;
      } else {
        return { hasMatch: false, hasNonDefault: false, hasUnset: false, matchCount: 0 };
      }
    }
  }
  return { hasMatch, hasNonDefault, hasUnset, matchCount };
}

export const ReverseFunctionWithDefaultValues = (BASE, ReverseINNER, NameLower, NameUpper) => (style) => {
  const { hasMatch, hasUnset, matchCount } = hasDefaultsMatch(style, BASE);

  if (!hasMatch) return undefined;

  let args = ReverseINNER(style);
  if (args === undefined) args = [];

  for (let k in BASE) {
    if (style[k] === BASE[k] || style[k] === "unset" || style[k] === "initial") {
      delete style[k];
    }
  }

  const name = hasUnset ? NameUpper : NameLower;
  if (args.length === 0) return `$${name}()`;
  return `$${name}(${args.join(", ")})`;
};

export const ReverseFunctionTypes = {
  ReverseLogicalFour,
  ReverseSingleArgumentFunction,
  ReverseFunctionBasedOnValueTypes,
  ReverseFunctionWithDefaultValues,
};

export function createWes(sources) {
  let wes = {};
  for (let src of sources) {
    for (let [k, v] of Object.entries(src)) {
      if (typeof v === "function") continue;
      if (v?.args) continue;
      wes[k] = v;
    }
  }
  return wes;
}

// Importing the reverse definitions from individual files
import layout from "./layout.js";
import position from "./position.js";
import box from "./box.js";
import bg from "./bg.js";
import textDecorations from "./textDecorations.js";
// Add other modules as needed

// A compiled list of reverse handlers
const allReverseHandlers = [
  ...Object.values(layout._reverse || {}),
  ...Object.values(position._reverse || {}),
  ...Object.values(box._reverse || {}),
  ...Object.values(bg._reverse || {}),
  ...Object.values(textDecorations._reverse || {}),
];

export function reverse(originalStyle) {
  let style = { ...originalStyle };
  let results = [];

  // Sort handlers if needed by complexity/size of defaults, for now we run them sequentially
  for (let handler of allReverseHandlers) {
    // If the handler returns a string, it means it matched and parsed properties out of style
    const res = handler(style);
    if (res) {
      results.push(res);
    }
  }

  // Any leftover styles could remain in style if they don't map to a known short.
  // The caller can inspect `style` to see what wasn't converted.

  return { shorts: results, remaining: style };
}
