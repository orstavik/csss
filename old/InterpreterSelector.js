// //todo we don't support nested :not(:has(...))
// //todo we don't do @support/scope/container. 
// //todo @support should be done in a transpile process on the <style> element.
// const media = /@(?:\([^)]+\)|[a-z][a-z0-9_-]*)/.source;
// const pseudo = /:[a-z][a-z0-9_-]*\([^)]+\)/.source;
// const at = /\[[a-z][a-z0-9_-]*(?:[$*~|^]?=(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"))?\]/.source;
// const tag = /\[a-z][a-z0-9-]*/.source; //tag
// const clazz = /\.[a-z][a-z0-9_-]*/.source; //class
// const mop = /[,!]/.source;
// const op = />>|[>+~&]/.source;
// const selectorTokens = new RegExp(
//   `(${mop})|(${media})|(${op})|(${pseudo})|(${at})|(${tag})|(${clazz})|(\*)|(\s+)|(.))`, "g");

// function parseSelector(str) {
//   const tokens = [...str.matchAll(selectorTokens)];
//   let medias = [], selects = [], nowSelect = [], priority = "", trueMedia;
//   for (const T of tokens) {
//     const [t, mop, media, op, pseudo, at, tag, clazz, star, ws, error] = T;
//     if (error) throw `Bad selector token: ${error}`;
//     if (ws) continue;

//     priority += media ? "@" : pseudo ? ":" : at ? "[" : clazz ? "." : tag ? "<" : "";

//     //media-state
//     if (selects.length && media)
//       throw `media queries must precede selectors: ${selects.join("")} => ${t}`;
//     if (media)
//       trueMedia = medias.push(media);
//     if (mop)
//       selects.length ? selects.push(mop) : medias.push(mop);

//     //selector state
//     if (op === ",")
//       selects.push(nowSelect), nowSelect = [];
//     else
//       nowSelect.push(t); //keep the operator for now
//   }
//   if (!trueMedia && medias.length)
//     selects = [...medias, ...selects];
//   return { medias, selects, priority };
// }

function selectorAndContainer(select) {
  if (!select.length)
    return ["&"];
  if (select.some(t => t === "&"))
    return select;
  const first = select[0]?.[0].match(/[>+~]/);
  const last = select.at(-1)?.[0].match(/[>+~]/);
  if (first && last)
    throw `Relationship selector both front and back: ${select.join("")}`;
  if (last)
    return [...select, "&"];
  return ["&", ...select];  //append at the beginning is the default.
}

//in the item selector, we add the & in the same way,
//but in the item, we replace & with the .class>*, and in container 
function selectorAndItem(select) {
  if (!select.length)
    return ["&"];
  if (select.some(t => t === "&"))
    return select;
  const last = select.at(-1)?.[0].match(/[>+~]/);
  if (last)
    throw `Item selector cannot use parent selector: ${select.join("")}`;
  return ["&", ...select];
}

function testSelector(selector) {
  const tst = selector.map(s => s === "&" ? ".test" : s).join("");
  if (!CSS.supports("selector", tst))
    throw `Invalid selector: ${tst}`;
}

function testMedia(medias) {
  for (const media of medias)
    if (!(window.matchMedia(`${media} or not ${media}`)))
      throw `Invalid @media: ${media}`;
}

function replaceSuper(supers, is, s) {
  return s.map(t => (is && t in supers) ? `:is(${supers[t]})` : supers[t] ?? t);
}

function interpretSuperSelector(name, value, supers) {
  const { medias, selects, selects2, medias2, priority } = interpretSelector(value, supers);
  if (name[0] === ":" && medias.length)
    throw `SuperPseudos cannot have media queries: ${name}`;
  if (name[0] === ":" && !selects.length)
    throw `Empty SuperPseudo: ${name} = ${value}`;
  if (name[0] === "@" && selects.length)
    throw `SuperMedia cannot have selectors: ${name}`;
  if (name[0] === "@" && !medias.length)
    throw `Empty SuperMedia: ${name} = ${value}`;

  let body;
  if (name[0] === ":")
    body = selects2.length === 1 ? selects2[0] : `:is(${selects2.join(", ")})`;
  if (name[0] === "@")
    body = medias2.join(" and ").replaceAll(" and , and ", " , ");
  return { name, body, selects, selects2, priority };
}


/**
 * toCssText
 */
function ruleToString(selector, props) {
  let str = selector + " {";
  for (let [k, v] of Object.entries(props))
    str += `\n  ${k}: ${v};`;
  return str + "\n}";
}

export function toCssText(dict) {
  const cssName = "." + shortName.replaceAll(/[^a-z0-9_-]/g, "\\$&");

  let specificity, sel, props, rule;
  //container
  [sel, props] = Object.entries(dict).find(([k]) => !k.startsWith("|"));
  debugger
  const bob = shortSelector.interpret(sel);
  sel = parse$ContainerSelector(sel);
  [sel, specificity] = sel.split(/\$\$(\d+$)/);
  const conSel = `:where(${sel.replaceAll("%", cssName)})`;
  if (Object.keys(props).length) {
    rule = ruleToString(conSel, props);
    return `/*container ${specificity}*/\n/*${shortName}*/\n${rule}`;
  }
  //items
  for ([sel, props] of Object.entries(dict)) {
    if (!sel.startsWith("|"))
      continue;
    sel = parse$ItemSelector(sel);
    [, sel, specificity] = sel.match(/\|(.*)\$\$(\d+)$/s);
    sel = `${conSel} >\n:where(${sel || "*"})`;
    rule = ruleToString(sel, props);
    return `/*item ${specificity}*/\n/*${shortName}*/\n${rule}`;
  }
}

// /**
//  * $short specificity
//  */

// //dynamic element
// const elUix = /hover|active|focus|focus-visible|focus-within/.source;
// const elMedia = /playing|paused|current|past|future/.source;
// const elMediaSafari = /buffering|muted|seeking|stalled/.source;
// const elForm = /default|autofill|checked|indeterminate|blank|valid|invalid|in-range|out-of-range|required|optional|user-valid|user-invalid/.source;
// const elLink = /link|visited/.source;
// const elModal = /fullscreen|modal|picture-in-picture/.source;
// //actionable element
// //These properties are structural, but they communicate to user about interaction. 
// //Thus interactional/dynamic oriented.
// const elForm2 = /enabled|disabled|read-only|read-write|placeholder-shown/.source;
// const elLink2 = /any-link|local-link|target|target-within|scope/.source;

// //dynamic window
// const winDark = /dark|light/.source;
// const winLang = /lang\([a-zA-Z0-9,-]+\)/.source;
// const winDir = /dir\((?:rtl|ltr)\)/.source;

// //static dom structure
// const staticTree = /root|empty|first-child|last-child|only-child|first-of-type|last-of-type|only-of-type/.source;
// const staticTreeFunctions = /(?:nth-of-type|nth-of-last-type|nth-of-child|nth-of-last-child)/.source;
// const AnPlusB = /\((?:odd|even|-?\d+(?:[+-]\d+)?)\)/.source;

// let PSEUDO_EL = `:(?:${elUix}|${elMedia}|${elMediaSafari}|${elForm}|${elLink}|${elModal}|${elForm2}|${elLink2})`;
// let PSEUDO_WIN = `:(?:${winDark}|${winLang}|${winDir})`;
// let PSEUDO_STATIC = `:(?:${staticTree}|${staticTreeFunctions + AnPlusB})`;

// const ATTR_OP = /[$*~|^]?=/.source;
// const STRING = /"(?:\\.|[^"\\])*"/.source;
// const ATTR = new RegExp(`\\[[^"\\]]+(?:${ATTR_OP + STRING})?\\]`).source;

// const CLASS = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/.source;
// const TAG = /[a-z][a-z0-9-]*/.source;
// //we use &=>and !=>not
// const MEDIA = /@media\([a-z0-9:><=&!,-]+\)/.source;

// const EL = `${PSEUDO_EL}|${ATTR}`;
// const WIN = `${PSEUDO_WIN}|${MEDIA}`;
// const DOM = `${PSEUDO_STATIC}|${CLASS}|${TAG}`;
// const DIVIDER = />>|[\s>+~]/.source;
// const NOT_START = /:not\(/.source;
// const HAS_START = /:has\(/.source;
// const END = /\)/.source;
// let SELECTOR_TOKENS = `(${EL})|(${WIN})|(${DOM})|(${DIVIDER})|(${NOT_START})|(${HAS_START})|(${END})|(%)|(.)`;
// SELECTOR_TOKENS = new RegExp(SELECTOR_TOKENS, "g");

// function countSpecificity(tokens, res, depth = 0, isHas = false) {
//   for (let [, el, win, dom, divider, not, has, end, percent, any] of tokens) {
//     if (divider)
//       (res[1] += res[0]), (res[0] = 0);
//     else if (el)
//       res[isHas ? 1 : 0]++;
//     else if (win)
//       res[2]++;
//     else if (dom)
//       res[3]++;
//     else if (not)
//       countSpecificity(tokens, res, depth + 1, isHas);
//     else if (has)
//       countSpecificity(tokens, res, depth + 1, true);
//     else if (end) {
//       if (depth) return res;
//       throw new SyntaxError("Missing parenthesis start '('.");
//     }
//     // else if(percent) ; //do nothing
//   }
//   if (!depth) return res;
//   throw new SyntaxError("Missing parenthesis start ')'.");
// }

// export function selector$specificity(selector) {
//   const res = countSpecificity(selector.matchAll(SELECTOR_TOKENS), [0, 0, 0, 0]);
//   return res[0] * 1000 + res[1] * 100 + res[2] * 10 + res[3];
// }