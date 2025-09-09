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
  repeat: "repeat(2, 1fr)",
  url: "url('link')",
  counter: "counter(my-counter)",
  counters: "counters(my-counter, '.')",
  span: "span 2",
  filter: "blur()",
  transform: "translateX(0)",
  gradient: "linear-gradient(white, black)",
  // attr: "attr(data-foo)", //this is for some reason always valid, so it makes no sense to test it.
}

function isSupported(k) {
  return CSS.supports(k, "unset") &&
    Object.entries(TYPES).map(([type, tst]) => CSS.supports(k, tst) && type).filter(Boolean);
}

function longhands(obj) {
  const keys = Object.keys(obj).sort((a, b) => b.length - a.length);
  const longs = keys.filter((k, i) => keys.findIndex(x => x.startsWith(k)) === i);
  longs.push("color");//todo this doesn't work with this filter.
  return longs.sort();
}

async function analyzeNativeCssProps() {
  const SPEC = await (await fetch("https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data")).json();
  const supported = {};
  const unsupported = {};
  for (let k of longhands(SPEC.css.properties)) {
    const types = isSupported(k);
    types ?
      supported[k] = types : //mergeTypes(types)
      unsupported[k] = SPEC.css.properties[k];
  }
  return { supported, unsupported };
}
const NativeCss = await analyzeNativeCssProps();
export default NativeCss;