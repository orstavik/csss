import { CsssPrimitives, CsssFunctions, BadArgument } from "./func.js";
const { NumberPercent, Length, Angle, Url } = CsssPrimitives;
const { CssValuesToCsssTable } = CsssFunctions;
import shadow from "./shadows.js";
const textDropShadowRaw = shadow.raw.textDropShadowRaw;

const CsssToCss = CssValuesToCsssTable("blur|brightness|contrast|grayscale|invert|opacity|saturate|sepia|hue-rotate");
const FunctionToType = {
  blur: Length,
  brightness: NumberPercent,
  contrast: NumberPercent,
  grayscale: NumberPercent,
  invert: NumberPercent,
  opacity: NumberPercent,
  saturate: NumberPercent,
  sepia: NumberPercent,
  hueRotate: Angle,
};

const filterRaw = ({ name: filterName, args }) => args.map((a, i) => {
  let v;
  if ((v = FunctionToType[a.name]?.(a.args[0])) != null)
    return `${CsssToCss[a.name]}(${v})`;
  if ((v = Url(a)) != null)
    return v;
  if ((v = textDropShadowRaw(a)) != null)
    return `drop-shadow(${v})`;
  throw BadArgument(filterName, args, i, `Expected ${Object.keys(FunctionToType).join(", ")}, or a url.`);
}).join(" ");

const reverseFilter = val => {
  if (!val) return undefined;
  if (val === "none") return "none";
  // The value is something like `blur(5px) brightness(0.5) url(test.svg) drop-shadow(1px 1px 1px black)`
  // For drop-shadow we need to convert it back to `shadow(normal, ...)` but wait, in csss.js it's probably better to just pass the raw css function name if it matches, and url as url('...').
  // Let's implement a simple reverse that converts space separated functions into comma separated ones.
  // Wait, filter in Csss: filter(blur(5px), brightness(0.5))
  // We can just replace ") " with "), " and then wrap in filter().
  // However drop-shadow(1px 1px 1px black) -> if they just passed dropShadow(1px, 1px, 1px, black) that's not natively parsed by filterRaw. filterRaw expects textDropShadowRaw which takes ShadeType or Lengths. 
  // Let's just output `filter(${val.replace(/\) /g, "),")})` as a best-effort. Actually, csss spaces inside drop-shadow need comma replacement? No, CSS might have spaces.
  // We can split by regex that finds functions.
  return undefined; // A more robust parser would be needed. I will implement this next.
};

export default {
  props: { filter: undefined, backdrop: undefined, backdropFilter: undefined },
  csss: {
    filter: x => ({ filter: filterRaw(x) }),
    backdrop: x => ({ backdropFilter: filterRaw(x) }),
  },
  css: {
    filter: style => {
      if (!style.filter || style.filter === "none") return undefined;
      let val = style.filter.replace(/\) /g, "),");
      // convert kebab-case to camelCase for function names
      val = val.replace(/([a-z-]+)\(/g, (_, m) => m.replace(/-([a-z])/g, g => g[1].toUpperCase()) + "(");
      // internal spaces in dropShadow(1px 1px) -> dropShadow(1px,1px)
      val = val.replace(/([a-zA-Z]+\()([^)]+)(\))/g, (_, start, inner, end) => start + inner.replace(/,\s*/g, ",").replace(/\s+/g, ",") + end);
      val = val.replace(/dropShadow\(([^)]+)\)/g, (_, inner) => {
        const parts = inner.split(",").map(p => {
          p = p.trim();
          return /^[a-zA-Z]+$/.test(p) ? "#" + p : p;
        });
        return `dropShadow(${parts.join(",")})`;
      });
      return `$filter(${val})`;
    },
    backdrop: style => {
      if (!style.backdropFilter || style.backdropFilter === "none") return undefined;
      let val = style.backdropFilter.replace(/\) /g, "),");
      val = val.replace(/([a-z-]+)\(/g, (_, m) => m.replace(/-([a-z])/g, g => g[1].toUpperCase()) + "(");
      val = val.replace(/([a-zA-Z]+\()([^)]+)(\))/g, (_, start, inner, end) => start + inner.replace(/,\s*/g, ",").replace(/\s+/g, ",") + end);
      return `$backdrop(${val})`;
    }
  },
};
