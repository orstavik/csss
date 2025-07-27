import { diff } from "https://cdn.jsdelivr.net/gh/orstavik/making-a@25.07.20.08/difference.js";

function splitMd(txt) {
  const entry = txt.split(/(?:^|\n)\*\*([a-z]+):\*\*/i).slice(1);
  const res = [];
  for (let i = 0, j = 1, now; j < entry.length; i += 2, j += 2) {
    const key = entry[i];
    const body = entry[j].trim();
    if (!now || key in now)
      res.push(now = {});
    const [, type, value] = body.match(/^```([a-z]+)\s*(.*?)\s*```$/mis) ?? [, "txt", body];
    now[key] = { type, value };
  }
  return res;
}

function printDiff({ key, actual, expected }) {
  if (actual == expected)
    return //console.log(`✅ ${key}`);
  const d = diff(expected, actual);
  const noMatch = d.find(({ type, a, b }) => type != "match" && (a.trim() || b.trim()))
  if (!noMatch)
    return console.log(`🟦 ${key}`);
  console.log(`❌ ${key}`);
  console.log("expected:", expected);
  console.log("actual:", actual);
  console.log(`noMatch:`, noMatch);
  console.log("diff:", d);
}

export default async function runTests(paths, test) {
  if (!location.hash) location.hash = paths;
  const tests = location.hash.slice(1).split(",").map(p => p + ".md");
  for (let file of tests) {
    console.info(`Testing ${file}`);
    const txt = await (await fetch(file)).text();
    for (let { csss, css } of splitMd(txt))
      printDiff(test(csss.value, css.value));
  }
}