import * as CSSS from "../csss.js";

const defaultStyleEl = `
<style id="csss">
  @layer container, containerDefault, items, itemsDefault;
</style>`;

const parse = CSSS.memoize(CSSS.parse, 333);

function updateDoc(style) {
  for (let el of document.querySelectorAll('[class*="$"]'))
    for (let clazz of el.classList)
      if (clazz.includes("$") && !style.shorts.has(clazz))
        try {
          const res = parse(clazz);
          const i = style.sheet.cssRules.length;
          style.sheet.insertRule(res.cssText, i);
          style.shorts.add(clazz);
        } catch (er) {
          console.error(er);
        }
  const txt = [...style.sheet.cssRules].map(r => r.cssText).join("\n\n");
  if (txt != style.textContent)
    style.innerHTML = txt;
}

function sleep(interval) {
  const timer = interval < 0 ? requestAnimationFrame : setTimeout;
  return new Promise(r => timer(r, interval));
}

(async function () {
  let style, interval;
  if (import.meta.url) {
    const sp = new URL(import.meta.url).searchParams;
    interval = sp.get("interval") ?? 500;
    const styleParam = sp.get("style") ?? "style";
    style = document.querySelector(styleParam);
  }
  if (!style) {
    document.head.insertAdjacentHTML("beforeend", defaultStyleEl);
    style = document.head.lastElementChild;
  }
  style.shorts = new Set([...style.sheet.cssRules].map(rule => CSSS.extractShort(rule)).filter(Boolean));
  while (true) {
    await sleep(interval);
    updateDoc(style);
  }
})();