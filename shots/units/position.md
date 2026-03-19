**description:** A relative Block card with a badge and close button pinned into opposite top corners.
**csss:**
$Block(padding(1.5rem))$relative
|.badge$absolute(endTop,1rem,1rem)$zIndex(2)
|.close$absolute(startTop,1rem,1rem)
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$relative {
  display: block;
  padding: 1.5rem;
  position: relative;
}

.\|\.badge\$absolute\(endTop\,1rem\,1rem\)\$zIndex\(2\)>:where(.badge) {
  position: absolute;
  inset-inline-end: 1rem;
  top: 1rem;
  z-index: 2;
}

.\|\.close\$absolute\(startTop\,1rem\,1rem\)>:where(.close) {
  position: absolute;
  inset-inline-start: 1rem;
  top: 1rem;
}
```

**description:** A relative Flex toolbar with a dropdown anchored below the row and a help action fixed to the viewport corner.
**csss:**
$Flex(row,gap(1rem),padding(1rem))$relative
|.menu$absolute(endTop,1rem,100%)$zIndex(4)
|.help$fixed(endBottom,1rem,1rem)$zIndex(10)
**css:**
```css
.\$Flex\(row\,gap\(1rem\)\,padding\(1rem\)\)\$relative {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  gap: 1rem;
  position: relative;
}

.\|\.menu\$absolute\(endTop\,1rem\,100\%\)\$zIndex\(4\)>:where(.menu) {
  position: absolute;
  inset-inline-end: 1rem;
  top: 100%;
  z-index: 4;
}

.\|\.help\$fixed\(endBottom\,1rem\,1rem\)\$zIndex\(10\)>:where(.help) {
  position: fixed;
  inset-inline-end: 1rem;
  bottom: 1rem;
  z-index: 10;
}
```

**description:** A Grid docs layout with a sticky sidebar that stays pinned while the main content remains in its own column.
**csss:**
$Grid(cols(240px,1fr),gap(2rem),padding(1rem))
|.sidebar$GridItem(column(1),row(1))$sticky(top,1rem)$zIndex(2)
|.content$GridItem(column(2),row(1))
**css:**
```css
.\$Grid\(cols\(240px\,1fr\)\,gap\(2rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: unset;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
}

.\|\.sidebar\$GridItem\(column\(1\)\,row\(1\)\)\$sticky\(top\,1rem\)\$zIndex\(2\)>:where(.sidebar) {
  margin: unset;
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  top: 1rem;
  z-index: 2;
}

.\|\.content\$GridItem\(column\(2\)\,row\(1\)\)>:where(.content) {
  margin: unset;
  grid-column: 2;
  grid-row: 1;
}
```

**description:** A relative Block panel with bottom-anchored utility items placed on opposite inline sides.
**csss:**
$Block(padding(2rem))$relative
|.note$absolute(startBottom,1rem,1rem)
|.toast$absolute(endBottom,1rem,1rem)$zIndex(3)
**css:**
```css
.\$Block\(padding\(2rem\)\)\$relative {
  display: block;
  padding: 2rem;
  position: relative;
}

.\|\.note\$absolute\(startBottom\,1rem\,1rem\)>:where(.note) {
  position: absolute;
  inset-inline-start: 1rem;
  bottom: 1rem;
}

.\|\.toast\$absolute\(endBottom\,1rem\,1rem\)\$zIndex\(3\)>:where(.toast) {
  position: absolute;
  inset-inline-end: 1rem;
  bottom: 1rem;
  z-index: 3;
}
```

**description:** A relative Block callout with one child placed by calc from logical start and another snapped to the origin corner.
**csss:**
$Block(padding(1rem))$box(overflowHidden)$relative
|.callout$absolute(start,10px+2em,5%)$zIndex(2)
|.origin$absolute(0,0)
**css:**
```css
.\$Block\(padding\(1rem\)\)\$box\(overflowHidden\)\$relative {
  display: block;
  padding: 1rem;
  overflow: hidden;
  position: relative;
}

.\|\.callout\$absolute\(start\,10px\+2em\,5\%\)\$zIndex\(2\)>:where(.callout) {
  position: absolute;
  inset-inline-start: calc(10px + 2em);
  inset-block-start: 5%;
  z-index: 2;
}

.\|\.origin\$absolute\(0\,0\)>:where(.origin) {
  position: absolute;
  left: 0;
  top: 0;
}
```
