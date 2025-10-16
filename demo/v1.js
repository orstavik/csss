import * as CSSS from "../../csss.js";

const styleEl = document.querySelector('style[csss]');
const addedClasses = new Set();

if (!styleEl) {
  console.error('<style csss> tag not found. CSSS cannot inject styles.');
}

export class Class extends AttrCustom {

  upgrade() {
    // Process the classes that are already on the element when it first loads.
    this.value = this.ownerElement.className;
  }

  set value(v) {
    super.value = v;
    if (!styleEl) return;

    for (let clz of this.ownerElement.classList) {
      if (clz.includes("$") && !addedClasses.has(clz)) {
        try {
          const output = CSSS.parse(clz);
          if (output && typeof output.cssText === 'string' && output.cssText.trim()) {
            styleEl.textContent += output.cssText + '\n';
            addedClasses.add(clz);
          }
        } catch (e) {
          console.warn(`[CSSS] Failed to parse "${clz}":`, e);
        }
      }
    }
  }

  get value() { return super.value; }
}

