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
(npx http-server -p 3066 --cors -s & HTTP_PID=$!; trap "kill -- -$HTTP_PID 2>/dev/null" EXIT; while ! curl -s http://127.0.0.1:3066 > /dev/null; do sleep 1; done; npx --no -p puppeteer node test/puppeteer.js 3066 "/test/index.html")
```

* ✅ test passed
* 🟦 test passed, but with whitespace differences
* ❌ test failed

## What does a good pull request look like?

1. Good, thought through, sensible, small, and incremental changes that tightly follow the structure and style of the exisiting codebase, if not otherwise planned in the roadmap. (No slop. No npm modules. No unnecessary dependencies. No temporary scripts.)
2. If you need to update a /shots/units/filename.md file, then make a copy of the old test filename_backup.md file with the old tests, and then update the tests in the .md file with the new expected output. 
3. If you are making many changes to a src.js file, then make a src_backup.js file with the old code, and then update the src.js file with the new code.
4. Make sure all tests pass before committing your changes. The automated tests should be "all green" before you commit. If no other tests are explicitly required, then this is enough testing.