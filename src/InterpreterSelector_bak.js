/**
 * $short specificity
 */

//dynamic element
const elUix = /hover|active|focus|focus-visible|focus-within/.source;
const elMedia = /playing|paused|current|past|future/.source;
const elMediaSafari = /buffering|muted|seeking|stalled/.source;
const elForm = /default|autofill|checked|indeterminate|blank|valid|invalid|in-range|out-of-range|required|optional|user-valid|user-invalid/.source;
const elLink = /link|visited/.source;
const elModal = /fullscreen|modal|picture-in-picture/.source;
//actionable element
//These properties are structural, but they communicate to user about interaction. 
//Thus interactional/dynamic oriented.
const elForm2 = /enabled|disabled|read-only|read-write|placeholder-shown/.source;
const elLink2 = /any-link|local-link|target|target-within|scope/.source;

//dynamic window
const winDark = /dark|light/.source;
const winLang = /lang\([a-zA-Z0-9,-]+\)/.source;
const winDir = /dir\((?:rtl|ltr)\)/.source;

//static dom structure
const staticTree = /root|empty|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type/.source;
const staticTreeFunctions = /(?:nth-of-type|nth-of-last-type|nth-of-child|nth-of-last-child)/.source;
const AnPlusB = /\((?:odd|even|-?\d+(?:[+-]\d+)?)\)/.source;


let PSEUDO_EL = `:(?:${elUix}|${elMedia}|${elMediaSafari}|${elForm}|${elLink}|${elModal}|${elForm2}|${elLink2})`;
let PSEUDO_WIN = `:(?:${winDark}|${winLang}|${winDir})`;
let PSEUDO_STATIC = `:(?:${staticTree}|${staticTreeFunctions + AnPlusB})`;

const ATTR_OP = /[$*~|^]?=/.source;
const STRING = /"(?:\\.|[^"\\])*"/.source;
const ATTR = new RegExp(`\\[[^"\\]]+(?:${ATTR_OP + STRING})?\\]`).source;

const CLASS = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.source;
const TAG = /[a-z][a-z0-9-]*/.source;
//we use &=>and !=>not
const MEDIA = /@media\([a-z0-9:><=&!,-]+\)/.source;

const EL = `${PSEUDO_EL}|${ATTR}`;
const WIN = `${PSEUDO_WIN}|${MEDIA}`;
const DOM = `${PSEUDO_STATIC}|${CLASS}|${TAG}`;
const DIVIDER = />>|[\s>+~]/.source;
const NOT_START = /:not\(/.source;
const HAS_START = /:has\(/.source;
const END = /\)/.source;
let SELECTOR_TOKENS = `(${EL})|(${WIN})|(${DOM})|(${DIVIDER})|(${NOT_START})|(${HAS_START})|(${END})|(%)|(.)`;
SELECTOR_TOKENS = new RegExp(SELECTOR_TOKENS, "g");

function countSpecificity(tokens, res, depth = 0, isHas = false) {
  for (let [, el, win, dom, divider, not, has, end, percent, any] of tokens) {
    if (divider)
      (res[1] += res[0]), (res[0] = 0);
    else if (el)
      res[isHas ? 1 : 0]++;
    else if (win)
      res[2]++;
    else if (dom)
      res[3]++;
    else if (not)
      countSpecificity(tokens, res, depth + 1, isHas);
    else if (has)
      countSpecificity(tokens, res, depth + 1, true);
    else if (end) {
      if (depth) return res;
      throw new SyntaxError("Missing parenthesis start '('.");
    }
    // else if(percent) ; //do nothing
  }
  if (!depth) return res;
  throw new SyntaxError("Missing parenthesis start ')'.");
}

export function selector$specificity(selector) {
  const res = countSpecificity(selector.matchAll(SELECTOR_TOKENS), [0, 0, 0, 0]);
  return res[0] * 1000 + res[1] * 100 + res[2] * 10 + res[3];
}

/**
 * $SHORT_ABBREVIATIONS
 */
const SHORT_ABBREVIATIONS = {
  ">>": " ", //todo this is syntactic
  "@sm": "@media(min-width:640px)",
  "@md": "@media(min-width:768px)",
  "@lg": "@media(min-width:1024px)",
  "@xl": "@media(min-width:1280px)",
  "@2xl": "@media(min-width:1536px)",
  "@dark": "@media(prefers-color-scheme:dark)",
  ":first": ":first-child",
  ":last": ":last-child",
  ":edge": ":is(:first-child,:last-child)",
};
//todo this is superSelectors

const ABBREVIATIONS = new RegExp(Object.keys(SHORT_ABBREVIATIONS).join("|"), "g");
function selector$abbrivations(selector) {
  return selector.replaceAll(ABBREVIATIONS, t => SHORT_ABBREVIATIONS[t]);
}

/**
 * $short SELECTOR
 * 
 * NO-SPACE-PERCENT-selector
 * 1. ">>" is the descendant space selector.
 * 2. "%" is a placeholder for implied selector. 
 *
 * TODO not supported
 *  :where(), :state(), :has-slotted, :host, :host-context(), :slotted()   
 */

const testSelector = (function () {
  const styleSheet = new CSSStyleSheet();
  return function testSelector(selector, txt = selector) {
    try {
      selector = selector.replaceAll("%", ".HELLO-SUNSHINE");
      styleSheet.insertRule(selector + " { border-width: 2px; }");
      styleSheet.deleteRule(0);
    } catch (err) {
      throw new SyntaxError("Illegal no-space-percent selector: " + txt);
    }
  };
})();

//todo do we need to parse mediaB body? no. I think we can do a _=>" " replace?
//todo do we need to parse pseudo args? if we do, we can pass it into the parseSelect again
//todo but we don't manage to parse the body of the pseudo, as it can nest.
//todo right now, we don't support nested :not(:has(...)), which is not wrong.

//todo we don't do @support. This should be done in a different process on the <style> element.

const media = /@(?:\([^)]+\)|[a-z][a-z0-9_-]*)/.source;
const pseudo = /:[a-z][a-z0-9_-]*\([^)]+\)/.source;
const at = /\[[a-z][a-z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
const tag = /\[a-z][a-z0-9-]*/.source; //tag
const clazz = /\.[a-z][a-z0-9_-]*/.source; //class
const mop = /[,!]/.source;
const op = />>|[>+~&]/.source;
const selectorTokens = new RegExp(
  `(${mop})|(${media})|(${op})|(${pseudo})|(${at})|(${tag})|(${clazz})|(\*)|(\s+)|(.))`, "g");

function parseSelector(str) {
  const tokens = [...str.matchAll(selectorTokens)];
  let medias = [], selects = [], nowSelect = [], priority = "", trueMedia;
  for (const T of tokens) {
    const [t, mop, media, op, pseudo, at, tag, clazz, star, ws, error] = T;
    if (error) throw `Bad selector token: ${error}`;
    if (ws) continue;

    priority += media ? "@" : pseudo ? ":" : at ? "[" : clazz ? "." : tag ? "<" : "";

    //media-state
    if (selects.length && media)
      throw `media queries must precede selectors: ${selects.join("")} => ${t}`;
    if (media)
      trueMedia = medias.push(media.slice(1)) //remove @
    if (mop)
      selects.length ? selects.push(mop) : medias.push(mop);

    //selector state
    if (op === ",")
      selects.push(nowSelect), nowSelect = [];
    else if (op)
      nowSelect.push(op ? { op } : t); //keep the operator for now
  }

  if (!trueMedia && medias.length)
    selects = [...medias, ...selects];
  medias = medias.map(m => m === "!" ? "not" : m);

  selects = selects.map(select =>
    !select.length ? ["&"] :
      select.some(t => t.op === "&") ? select :
        select.length === 1 ? ["&", ...select] :
          select[0].op && select.at(-1).op ? ["&", ...select, "*"] :
            select.op ? ["&", ...select] :
              [...select, "&"]);
  selects = selects.map(select => select.map(t => t.op || t));
  return { medias, selects, priority };
}

function makeSelector(selects) {
  return selects.map(select => {
    const i = select.indexOf("&");
    const has = i > 0 ? `:has(${select.slice(0, i).join()})` : "";
    select = select.slice(i + 1).join() + has;
    if (!CSS.supports("selector", select))
      throw `Invalid selector: ${select}`;
    return select;
  }).join(", ");
}

function makeMedia(medias) {
  for (const media of medias)
    if (!(window.matchMedia(`${media} or not ${media}`)))
      throw `Invalid @media: ${media}`;
  return "@media " + medias.join(" and ").replaceAll(" and , and ", " , ");
}

function interpretSelector(str) {
  let { medias, selects, priority } = parseSelector(str);
  selects = makeSelector(selects)
  medias = makeMedia(medias);
  return { medias, selects, priority };
}

//todo to test the selector, use .hello instead of &.
function parse$Selector(txt) {
  txt = txt.trim();
  const cssSelector = selector$abbrivations(txt);
  //todo extract media queries!!
  testSelector(cssSelector, txt);
  const specificity = selector$specificity(cssSelector);
  return cssSelector + "$$" + specificity;
}

export function parse$ContainerSelector(txt) {
  txt = txt.split(",").map(txt => txt.includes("%") ? txt : "%" + txt).join(",");
  return parse$Selector(txt);
}

export function parse$ItemSelector(txt) {
  if (txt.includes("%"))
    throw new SyntaxError("$short item selector cannot contain %: " + txt);
  return "|" + (parse$Selector(txt.slice(1) || "*"));
}
