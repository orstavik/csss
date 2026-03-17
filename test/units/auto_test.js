const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const expectedPath = path.join(__dirname, 'expected.json');
  const expectedLogs = JSON.parse(fs.readFileSync(expectedPath, 'utf8'));

  const port = process.argv[2] || '3003';
  const url = `http://127.0.0.1:${port}/test/units/index.html`;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const actualLogs = [];

  page.on('console', msg => {
    const type = msg.type();
    // Capture log, warning, and error events
    if (['log', 'warning', 'error'].includes(type)) {
      actualLogs.push(msg.text());
    }
  });

  console.log(`Navigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle0' });
  await browser.close();

  // Compare actualLogs against expectedLogs
  let passed = true;

  if (actualLogs.length !== expectedLogs.length) {
    passed = false;
    console.error(`❌ Length mismatch: Expected ${expectedLogs.length} logs, but got ${actualLogs.length} logs.`);
  }

  const maxLen = Math.max(actualLogs.length, expectedLogs.length);
  for (let i = 0; i < maxLen; i++) {
    const actual = actualLogs[i];
    const expected = expectedLogs[i];
    if (actual !== expected) {
      passed = false;
      console.error(`\n❌ Mismatch at index ${i}:`);
      console.error(`   Expected: ${expected !== undefined ? expected : '<undefined>'}`);
      console.error(`   Actual:   ${actual !== undefined ? actual : '<undefined>'}`);
    }
  }

  if (!passed) {
    console.error("\n❌ Test failed: Console logs did not match test/units/expected.json");
    console.error("💡 Hint: If the actual logs are correct, you can temporarily write actual logs to a file to diff or copy into expected.json.");
    process.exit(1);
  } else {
    console.log("\n✅ Test passed: All console logs matched.");
    process.exit(0);
  }
})();
