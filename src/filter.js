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
