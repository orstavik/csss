const puppeteer = require('puppeteer');

console.log("***** Testing with Puppeteer *****");

(async () => {

  const port = process.argv[2] || '3003';
  const file = process.argv[3] || '/test/index.html';
  const url = `http://127.0.0.1:${port}${file}`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const actualLogs = [];

  page.on('console', msg => actualLogs.push(msg.text()));

  console.log(`Testing: ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await browser.close();

  const errors = actualLogs.filter(str => str.startsWith("❌"));
  const passed = actualLogs.filter(str => str.startsWith("✅"));
  const whitespaceDiff = actualLogs.filter(str => str.startsWith("🟦"));

  passed.length && console.log(`✅ Passed tests: ${passed.length}`);
  whitespaceDiff.length && console.log(`🟦 Passed if we ignore whitespace: ${whitespaceDiff.length}`);
  errors.length && console.error(`❌ Failed logs: ${errors.length}`);
  process.exit(errors.length ? 1 : 0);
})();
