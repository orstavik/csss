const TYPES = {
  unset: "unset",
  zero: "0",
  number: "1",
  length: "1px",
  percent: "1%",
  angle: "1deg",
  time: "1s",
  resolution: "1dppx",
  frequency: "1Hz",
  color: "#123",
  fr: "1fr",
  minmax: "minmax(1px, 100%)",
  repeat: "repeat(2, 1fr)",
  url: "url('link')",
  attr: "attr(data-foo)",
  counter: "counter(my-counter)",
  counters: "counters(my-counter, '.')",
  span: "span 2",
  filter: "blur()",
  transform: "translateX(0)",
  gradient: "linear-gradient(white, black)",
}

function isSupported(k) {
  return Object.entries(TYPES)
    .map(([type, tst]) => CSS.supports(k, tst) && type)
    .filter(Boolean);
}

function longhands(obj) {
  const keys = Object.keys(obj).sort((a, b) => b.length - a.length);
  const longs = keys.filter((k, i) => keys.findIndex(x => x.startsWith(k)) === i);
  return longs.sort();
}

export async function analyzeNativeCssProps() {
  const SPEC = await (await fetch("https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data")).json();
  const supportedProps = {};
  const otherProps = {};
  for (let k of longhands(SPEC.css.properties)) {
    const types = isSupported(k);
    types.length ?
      supportedProps[k] = types :
      otherProps[k] = SPEC.css.properties[k];
  }
  return { supportedProps, otherProps };
}
const nativeCss = await analyzeNativeCssProps();
export const NativeCssProps = nativeCss.supportedProps;
export const NativeCssPropsUnsupported = nativeCss.otherProps;