const TYPES = {
  number: "1",
  zero: "0",
  length: "1px",
  percent: "1%",
  angle: "1deg",
  time: "1s",
  resolution: "1dppx",
  frequency: "1Hz",
  color: "#123",
  fr: "1fr",  // always correlate with minmax
  repeat: "repeat(2,1fr)",
  url: "url('link')",
  counter: "counter(my-counter)",
  counters: "counters(my-counter, '.')",
  span: "span 2",
  filter: "blur()",
  transform: "translateX(0)",
  gradient: "linear-gradient(white, black)",
  //attr: "attr(data-my-attr)", //is supported for all props, for some reason, but only works in content.
};

function longhands(obj) {
  const keys = Object.keys(obj).sort((a, b) => b.length - a.length);
  const longs = keys.filter((k, i) => keys.findIndex(x => x.startsWith(k)) === i);
  longs.push("color", "content");//todo patches for the long hand filter
  return longs.sort();
}

async function analyzeNativeCssProps() {
  const SPEC = await (await fetch("https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data")).json();
  const supported = {};
  const unsupported = {};
  const all = {
    ...SPEC.css.properties,
    ...SPEC.css["at-rules"]["font-face"]
  };
  all["-webkit-line-clamp"] = all["line-clamp"];
  all["-webkit-box-orient"] = all["box-orient"];
  const longs = longhands(all);
  for (let k of longs) {
    const types = CSS.supports(k, "unset") &&
      Object.entries(TYPES).map(([type, tst]) => CSS.supports(k, tst) && type).filter(Boolean);;
    types ?
      supported[k] = types : //mergeTypes(types)
      unsupported[k] = all[k];
  }
  supported.content.push("attr");
  return { supported, unsupported, all };
}
const NativeCss = await analyzeNativeCssProps();
export default NativeCss;