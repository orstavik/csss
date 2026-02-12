/**
 * Auto module:
 * - Automatically scans the DOM for elements with `$`-prefixed class names,
 *   parses them through CSSS, and injects the resulting CSS rules into a
 *   `<style>` element. Runs in a continuous polling loop.
 *
 * Dependencies:
 * - csss.js: provides `parse`, `memoize`, and `extractShort` helpers.
 *
 * Usage: import this module via `<script type="module">` or `import` to
 * enable automatic CSSS short processing on the page.
 */
import * as CSSS from "./csss.js";

const defaultStyleEl = `
<style id="csss">
  @layer container, containerDefault, items, itemsDefault, grandItems, grandItemsDefault;
</style>`;

const parse = CSSS.memoize(CSSS.parse, 333);

function allDollars() {
  const res = [];
  for (let el of document.querySelectorAll('[class*="$"]'))
    for (let clazz of el.classList)
      if (clazz.includes("$"))
        res.push(clazz);
  return res;
}

function updateDoc(style, dollars) {
  for (let clazz of dollars)
    try {
      const res = parse(clazz);
      const i = style.sheet.cssRules.length;
      for (let { cssText, rule, short } of res) {
        if (rule && style.shorts.has(rule)) continue;
        style.sheet.insertRule(cssText, i);
        rule && style.shorts.add(rule);
      }
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
    const dollars = allDollars().filter(clazz => !style.shorts.has(clazz));
    if (!dollars.length) continue;
    dollars.forEach(d => style.shorts.add(d));
    updateDoc(style, dollars);
  }
})();
