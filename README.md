# CSSS (CSS Shorts)

A lightweight CSS preprocessor that enables writing concise, expressive CSS directly in your HTML using shorthand syntax.

## Testing

1. start a local server in terminal A in the repository root directory: 
```bash
npx http-server -p 3003 --cors
```

2. run the automated tests in terminal B in the repository root directory: 
```bash
npx --no -p puppeteer node test/puppeteer.js 3069 "/test/index.html"`
```

3. To view the test in a browser: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]