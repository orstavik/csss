//(npx http-server -p 3066 --cors -s & HTTP_PID=$!; 
// trap "kill -- -$HTTP_PID 2>/dev/null" EXIT; while ! curl -s http://127.0.0.1:3066 > /dev/null; do sleep 1; done;
// npx --no -p puppeteer node test/puppeteer.js 3066 "/test/index.html")

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
