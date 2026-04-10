# CSSS (CSS Shorts)

CSSS is a lightweight CSS preprocessor that parses Dollar Shorts ($) shorthand syntax in functional form from HTML classes to dynamically generate CSS, and vice versa.
The generated CSS rules are injected into a `<style csss>` element.

The names in csss and css should overlap a lot, so that the llm can easily predict the appropriate csss name based on its knowledge of CSS. However, the names should strive to be shorter, and use shorthands where possible.

## Rules for the repository

1. No npm modules, no package.json.
2. Use bash scripts to run automated tests directly against `google-chrome --headless=new`.

## Testing

Prefer fewer, dense, comprehensive, and use-case-oriented tests rather than many over simplified tests. Tests should be realistic, full pieces of code that can act as copy-pasteable inspiration for LLMs.

The tests are located in the /shots/units/ directory. Each .md file contains tests with expected input/output in csss/css.

Run `test/test.sh` from the repository root directory: 
```bash
test/test.sh
```

* ✅ test passed
* 🟦 test passed, but with whitespace differences
* ❌ test failed

### Testing for humans only (not agents)

Start a local server in the repository root directory: 
```bash
python3 -m http.server 3003
```
To view the test in a browser: [http://127.0.0.1:3003/test](http://127.0.0.1:3003/test)

## What does a good pull request look like?

Make sure `test/test.sh` pass before committing changes.
1. Sensible and small changes that tightly follow the structure and style of the existing codebase.
2. Avoid npm/package.json. Avoid external dependencies except the github actions runtime environment. Remove temporary scripts.
3. If you update files in /shots/units/ or /src/, then make a copy of the old file width .backup added at the end.