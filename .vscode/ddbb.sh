#!/bin/bash
# npx esbuild src/dd/dd.js src/dd/ddStrict.js --format=iife --target=es2018 --outdir=. --bundle --sourcemap --minify
# npx esbuild x/ddx.js --bundle --format=esm --outdir=. --tree-shaking=false --sourcemap --minify

# npx esbuild x/ddx.js --bundle --format=esm --outdir=. --sourcemap --tree-shaking=false 

# npx esbuild src/csss.js \
#   --bundle \
#   --format=esm \
#   --outdir=. \
#   --sourcemap \
#   --target=es2024 \
#   --legal-comments=none \
#   --tree-shaking=false

npx rollup --input src/csss.js --file csss.js --format=esm --sourcemap --no-treeshake --preserveEntrySignature=strict
output_files=$(find . -maxdepth 1 -type f -name "*.js" -o -name "*.js.map")
git add $output_files

# collate all the /test/*.html files into all.html
find test -name "*.html" ! -name "index.html" ! -name "all.html" -exec cat {} + > test/all.html
git add test/all.html