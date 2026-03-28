# CSSS (CSS Shorts)

A lightweight CSS preprocessor that enables writing concise, expressive CSS directly in your HTML using shorthand syntax.

## Testing

1. start a local server in the repository root directory: 
```bash
npx http-server -p 3003 --cors
```
To view the test in a browser: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]

2. run automated tests in the repository root directory: 
```bash
TEST_FILE="test/tests.html"; PORT=3060;
npx http-server -p $PORT --cors -s & \
HTTP_PID=$!; \
while ! curl -s http://127.0.0.1:$PORT > /dev/null; do sleep 1; done; \
google-chrome --headless=new --user-data-dir=$PWD/temp-profile --enable-logging --v=1 \
  --log-file=$PWD/temp-profile/chrome.log --virtual-time-budget=5000 \
  "http://127.0.0.1:$PORT/$TEST_FILE" > /dev/null 2>&1; \
touch "$TEST_FILE.actual"; \
grep -E -o '(❌|✅|🟦).*' temp-profile/chrome.log > "$TEST_FILE.actual"; \
diff "$TEST_FILE.actual" ${TEST_FILE}.log && echo "✅AS EXPECTED"; \
rm -f "$TEST_FILE.actual"; \
kill -9 $HTTP_PID; \
rm -rf temp-profile
```

* ✅ test passed
* 🟦 test passed, but with whitespace differences
* ❌ test failed

## What does a good pull request look like?

1. Good, thought through, sensible, small, and incremental changes that tightly follow the structure and style of the exisiting codebase, if not otherwise planned in the roadmap. (No slop. No npm modules. No unnecessary dependencies. No temporary scripts.)
2. If you need to update a /shots/units/filename.md file, then make a copy of the old test filename_backup.md file with the old tests, and then update the tests in the .md file with the new expected output. 
3. If you are making many changes to a src.js file, then make a src_backup.js file with the old code, and then update the src.js file with the new code.
4. Make sure all tests pass before committing your changes. The automated tests should be "all green" before you commit. If no other tests are explicitly required, then this is enough testing.