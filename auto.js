import { SheetWrapper } from "./src/engine.js";

function initCssShorts(style, interval = 500) {
  style || document.head.appendChild(style = document.createElement("style"));
  const sheetWrapper = new SheetWrapper(style.sheet);

  function update() {
    for (let el of document.body.querySelectorAll('[csss]'))
      try { sheetWrapper.readSupers(el.getAttribute("csss")); } catch (er) { console.error(er); }
    for (let el of document.body.querySelectorAll('[class*="$"]'))
      for (let clazz of el.classList)
        if (clazz.includes("$"))
          try { sheetWrapper.addRule(clazz, el); } catch (er) { console.error(er); }
    sheetWrapper.cleanup();
  }
  if (interval < 0)
    return requestAnimationFrame(update);
  return setInterval(update, interval);
}
let style, interval;
if (import.meta.url) {
  const sp = new URL(import.meta.url).searchParams;
  interval = sp.get("interval");
  let style = sp.get("style");
  if (style) style = document.querySelector(style);
}
initCssShorts(style, interval);
