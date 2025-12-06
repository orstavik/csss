import { diff } from "https://cdn.jsdelivr.net/gh/orstavik/making-a@25.08.27/difference.js";

function splitMd(txt) {
  const entry = txt.split(/(?:^|\n)\*\*([a-z0-9_-]+):\*\*/i).slice(1);
  const res = [];
  for (let i = 0, j = 1, now; j < entry.length; i += 2, j += 2) {
    const key = entry[i];
    const body = entry[j].trim();
    if (!now || key in now)
      res.push(now = {});
    const [, type, value] = body.match(/^```([^\s]+)\s*(.*?)\s*```$/mis) ?? [, "txt", body];
    now[key] = { type, value };
  }
  return res;
}

function printDiff({ key, actual, expected, type }) {
  if (actual == expected)
    return console.log(`✅ ${key}`);
  const d =
    //diffHtml? //diffCss? //diffJson?
    // type == "html" ? FlatHtml.fromString(actual).diff(expected) :
    diff(expected, actual);
  const noMatch = d.find(({ type, a, b }) => type != "match" && (a.trim() || b.trim()))
  const logger = noMatch ? console.error : console.log;
  logger(`${noMatch ? "❌" : "🟦"} ${key}`);
  for (let { a, b, type } of d)
    type == "ins" ? logger("%c%s", "background-color:green", b) :
      type == "del" ? logger("%c%s", "background-color:red", a) :
        logger("%c%s", "color:grey", a);
  logger(actual);
}

export default async function runTests(paths, test) {
  if (!location.hash) location.hash = paths;
  const tests = location.hash.slice(1).split(",").map(p => p + ".md");
  for (let file of tests) {
    console.warn(`Testing ${file}`);
    const txt = await (await fetch(file)).text();
    for (let shot of splitMd(txt))
      printDiff(await test(shot));
  }
}