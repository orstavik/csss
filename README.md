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