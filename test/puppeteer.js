const ms = require('ms');
const puppeteer = require('puppeteer');

(async () => {

  const port = process.argv[2] || '3003';
  const file = process.argv[3] || '/test/index.html';
  const url = `http://127.0.0.1:${port}${file}`;
  console.log(`******* Testing: ${url}  *******`);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const passes = [], errors = [];
  page.on('console', msg => (msg.type() === 'error' ? errors : passes).push(msg.text()));

  await page.goto(url, { waitUntil: 'networkidle0' });
  await browser.close();


  const passed = passes.filter(str => str.startsWith("✅"));
  const whitespaceDiff = passes.filter(str => str.startsWith("🟦"));

  if (passed.length)
    console.log(`✅ Passed tests: ${passed.length}`);
  if (whitespaceDiff.length)
    console.log(`🟦 Passed, but with whitespace differences: ${whitespaceDiff.length}`);
  if (errors.length) {
    console.log(`❌ Failed tests: ${errors.filter(str => str.startsWith("❌")).length}`);
    for (let err of errors.filter(str => !str.startsWith("%c%s")))
      console.log(err);
  }
  process.exit(errors.length ? 1 : 0);
})();
