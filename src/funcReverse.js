import { WebColors } from "./Color.js";
import { cssPhysicalToLogical as normalizeToLogical } from "./cssPhysicalToLogical.js";

// function spacelessCssTokens(str) {
//   // a) Replace spaces inside quotes with '+', ignoring escaped quotes
//   str = str.trim().replaceAll(/(["'])(?:\\.|(?!\1)[^\\])*\1/g, m => m.replaceAll(' ', '+'));
//   let now = "", res = [];
//   for (let i = 0, d = 0; i < str.length; i++) {
//     const c = str[i];
//     if (c === "(") d++;
//     else if (c === ")") d--;

//     if (c !== " " || d) now += c;
//     else if (now) { res.push(now); (now = ""); }
//   }
//   now && res.push(now);
//   return res;
// }

const Word = a => a.kind === "WORD" ? a.text : undefined;
const toCamelCase = s => s.replace(/[^a-z]./ig, m => m[1].toUpperCase());

const CssFunctions = {
  SingleArgumentFunctionReverse: (CsssFnName, CssProp, INTERPRETER, DEFAULT = "_") => style => {
    let arg = INTERPRETER(style[CssProp] == "unset" ? undefined : style[CssProp]) ?? DEFAULT;
    if (arg !== DEFAULT) return `${CsssFnName}(${arg})`;
  },
  normalizeToLogical,
  LogicalFourReverse: (CssPrefix, CsssName, INTERPRETER, DEFAULT = "_") => {
    const PROPS = ["-block-start", "-inline-start", "-block-end", "-inline-end"].map(s => toCamelCase(CssPrefix + s));
    return style => {
      let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
      if (args.every(a => a === DEFAULT)) return undefined;
      if (args[1] === args[3] && (args.pop() || true))
        if (args[0] === args[2] && (args.pop() || true))
          if (args[0] === args[1] && (args.pop() || true))
            ;
      return `${CsssName}(${args.join(",")})`;
    }
  },
  SingleTableReverse: (CssProp, Table) => {
    Table = Object.fromEntries(Object.entries(Table).map(([k, v]) => [v.toLowerCase(), k]));
    return style => style[CssProp] && Table[style[CssProp].toLowerCase()];
  },
  SingleTableReverseObject: Table => style => {
    main: for (let short in Table) {
      const preset = Table[short];
      if (!Object.keys(preset).length) continue;
      for (let p in preset) {
        if (style[p]?.toLowerCase() !== preset[p]?.toLowerCase()) {
          continue main;
        }
      }
      return short;
    }
  },
  SequentialFunctionReverse: (CsssFnName, PROPS, INTERPRETER, DEFAULT = "_") => style => {
    let args = PROPS.map(p => INTERPRETER(style[p]) ?? DEFAULT);
    while (args.length && args.at(-1) === DEFAULT)
      args.pop();
    return args.length ? `${CsssFnName}(${args.join(",")})` : undefined;
  },
  Optional: (short, long, defs, ...fns) => style => {
    const isReset = typeof long === "string"; // If long name is a string, enable reset detection logic
    const items = isReset ? fns : [long, defs, ...fns].filter(f => f); // Normalize items based on signature
    let args = [], covered = new Set(), isR = v => /^(unset|initial|0(px)?|none)$/.test(v);
    const normalized = items.map(f => (typeof f === "function") ? { prop: [], rev: f } : { prop: [f.prop].flat(), rev: f.rev });
    let allP = normalized.flatMap(f => { // 1. Coverage Phase
      let v = f.rev(style);
      if (v != null) { args.push(v); f.prop.map(covered.add, covered); }
      return f.prop;
    });
    if (!args.length) return;
    if (isReset) { // 2. Reset Detection Phase (only if long name and defs provided)
      let props = Array.isArray(defs) ? defs : Object.keys(defs);
      let reset = allP.some(p => !covered.has(p) && p in style && /^(unset|initial)$/.test(style[p])) ||
        props.some(p => !covered.has(p) && isR(style[p]));
      return `${(reset || props.every(p => covered.has(p))) ? long : short}(${args.join(",")})`;
    }
    return `${short}(${args.join(",")})`; // Standard additive output
  },
  CalcReverse: val => {
    if (typeof val !== "string") return undefined;
    if (val.startsWith("calc(") && val.endsWith(")")) {
      return val.slice(5, -1).replace(/\s+/g, "");
    }
    if (/^(min|max|clamp|round|mod|rem|sin|cos|tan|asin|acos|atan|atan2|sqrt|hypot|log|exp|abs|sign)\(/.test(val)) {
      return val.replace(/\s+/g, "");
    }
    return undefined;
  },
  TableReverse: Table => Object.fromEntries(Object.entries(Table).map(([k, v]) => [v.toLowerCase(), k])),
  ColorReverse: val => {
    if (!val || val === "none" || val === "unset" || val === "transparent" || val === "currentColor" || val === "currentcolor")
      return undefined;
    const m = val.match(/^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/);
    if (m) {
      const [r, g, b] = [+m[1], +m[2], +m[3]];
      const a = m[4] != null ? parseFloat(m[4]) : 1;
      if (a === 0) return undefined;
      const hex = [r, g, b].map(c => c.toString(16).padStart(2, "0")).join("");
      if (a < 1) return `#${hex}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
      return `#${hex}`;
    }
    if (val.startsWith("#")) return val;
    if (/^[a-z]+$/i.test(val) && val.toLowerCase() in WebColors) return `#${val}`;
    return undefined;
  },
  ValueReverse: val => (val === "unset" || val === "initial") ? undefined : (val === "auto" ? "_" : (CssFunctions.CalcReverse(val) ?? CssFunctions.ColorReverse(val) ?? (val === "0px" ? "0" : val))),
  DisplayMode: (style, displayValue, LowerName, UpperName) => {
    return style.display === displayValue
      ? UpperName
      : (!style.display || style.display === "unset")
        ? LowerName
        : undefined;
  },
  ShorthandPairReverse: (Table, Prop1, Prop2) => {
    const revTable = Object.fromEntries(Object.entries(Table).map(([k, v]) => [v.toLowerCase(), k]));
    return style => {
      const v1 = style[Prop1], v2 = style[Prop2];
      if ((!v1 || v1 === "unset") && (!v2 || v2 === "unset")) return;
      const a = v1?.toLowerCase() ?? "unset", j = v2?.toLowerCase() ?? "unset";
      if (j === "unset" || a === j) return revTable[a];
      return revTable[`${a} ${j}`] ?? revTable[a];
    };
  }
};

const CssPrimitives = {
  // spacelessCssTokens,
  // splitOnComma,
  Word
}

export { CssFunctions, CssPrimitives };
