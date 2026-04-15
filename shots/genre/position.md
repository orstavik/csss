**description:** A relative Block card with a badge and close button pinned into opposite top corners.
**userInstruction:** Make the card relative and pin the badge and close button to opposite top corners.
**before:**
```html
…<div>
  <div class="badge">…</div>
  <button class="close">…</button>
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1.5rem))$relative
  |.badge$absolute(1rem,1rem,_,_)$zIndex(2)
  |.close$absolute(1rem,_,_,1rem)">
  <div class="badge">…</div>
  <button class="close">…</button>
</div>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$relative {
  display: block;
  padding: 1.5rem;
  position: relative;
}

.\|\.badge\$absolute\(1rem\,1rem\,_\,_\)\$zIndex\(2\)>:where(.badge) {
  position: absolute;
  inset-block: 1rem auto;
  inset-inline: 1rem auto;
  z-index: 2;
}

.\|\.close\$absolute\(1rem\,_\,_\,1rem\)>:where(.close) {
  position: absolute;
  inset-block: 1rem auto;
  inset-inline: auto 1rem;
}
```

**description:** A relative Flex toolbar with a dropdown anchored below the row and a help action fixed to the viewport corner.
**userInstruction:** The toolbar needs a dropdown menu that overlays the content below it, and a fixed help button that stays on screen. Update the container and children positions to support this.
**before:**
```html
…<div class="
  $Flex(row,gap(1rem),padding(1rem))">
  <div class="menu">…</div>
  <button class="help">…</button>
</div>…
```
**after:**
```html
…<div class="
  $Flex(row,gap(1rem),padding(1rem))$relative
  |.menu$absolute(100%,1rem,_,_)$zIndex(4)
  |.help$fixed(_,1rem,1rem,_)$zIndex(10)">
  <div class="menu">…</div>
  <button class="help">…</button>
</div>…
```
**css:**
```css
.\$Flex\(row\,gap\(1rem\)\,padding\(1rem\)\)\$relative {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: unset;
  gap: 1rem;
  position: relative;
}

.\|\.menu\$absolute\(100\%\,1rem\,_\,_\)\$zIndex\(4\)>:where(.menu) {
  position: absolute;
  inset-block: 100% auto;
  inset-inline: 1rem auto;
  z-index: 4;
}

.\|\.help\$fixed\(_\,1rem\,1rem\,_\)\$zIndex\(10\)>:where(.help) {
  position: fixed;
  inset-block: auto 1rem;
  inset-inline: 1rem auto;
  z-index: 10;
}
```

**description:** A Grid docs layout with a sticky sidebar that stays pinned while the main content remains in its own column.
**userInstruction:** The sidebar scrolls out of view on long pages. Make it sticky so it stays visible while reading the content.
**before:**
```html
…<div class="
  $Grid(cols(240px,1fr),gap(2rem),padding(1rem))
  |.sidebar$GridItem(column(1),row(1))
  |.content$GridItem(column(2),row(1))">
  <aside class="sidebar">…</aside>
  <main class="content">…</main>
</div>…
```
**after:**
```html
…<div class="
  $Grid(cols(240px,1fr),gap(2rem),padding(1rem))
  |.sidebar$GridItem(column(1),row(1))$sticky(1rem,_,_)$zIndex(2)
  |.content$GridItem(column(2),row(1))">
  <aside class="sidebar">…</aside>
  <main class="content">…</main>
</div>…
```
**css:**
```css
.\$Grid\(cols\(240px\,1fr\)\,gap\(2rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: unset;
  grid-template-columns: 240px 1fr;
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 2rem;
  grid-auto-flow: unset;
}

.\|\.sidebar\$GridItem\(column\(1\)\,row\(1\)\)\$sticky\(1rem\,_\,_\)\$zIndex\(2\)>:where(.sidebar) {
  margin: unset;
  grid-column: 1;
  grid-row: 1;
  place-self: unset;
  position: sticky;
  inset-block: 1rem auto;
  inset-inline: auto;
  z-index: 2;
}

.\|\.content\$GridItem\(column\(2\)\,row\(1\)\)>:where(.content) {
  margin: unset;
  grid-column: 2;
  grid-row: 1;
  place-self: unset;
}
```

**description:** A relative Block panel with bottom-anchored utility items placed on opposite inline sides.
**userInstruction:** The panel needs a floating note on the left and a toast on the right, anchored to the bottom corners. Update the panel positioning to contain them.
**before:**
```html
…<div class="$Block(padding(2rem))">
  <div class="note">…</div>
  <div class="toast">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(2rem))$relative
  |.note$absolute(_,1rem,1rem,_)
  |.toast$absolute(_,_,1rem,1rem)$zIndex(3)">
  <div class="note">…</div>
  <div class="toast">…</div>
</div>…
```
**css:**
```css
.\$Block\(padding\(2rem\)\)\$relative {
  display: block;
  padding: 2rem;
  position: relative;
}

.\|\.note\$absolute\(_\,1rem\,1rem\,_\)>:where(.note) {
  position: absolute;
  inset-block: auto 1rem;
  inset-inline: 1rem auto;
}

.\|\.toast\$absolute\(_\,_\,1rem\,1rem\)\$zIndex\(3\)>:where(.toast) {
  position: absolute;
  inset-block: auto 1rem;
  inset-inline: auto 1rem;
  z-index: 3;
}
```

**description:** A relative Block callout with one child placed by calc from logical start and another snapped to the origin corner.
**userInstruction:** Make the callout relative, position one child using calc from the logical start, and snap another to the origin corner.
**before:**
```html
…<div>
  <div class="callout">…</div>
  <div class="origin">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1rem))$box(hidden)$relative
  |.callout$absolute(5%,10px+2em,_,_)$zIndex(2)
  |.origin$absolute(0,0,_,_)">
  <div class="callout">…</div>
  <div class="origin">…</div>
</div>…
```
**css:**
```css
.\$Block\(padding\(1rem\)\)\$box\(hidden\)\$relative {
  display: block;
  padding: 1rem;
  overflow: hidden;
  position: relative;
}

.\|\.callout\$absolute\(5\%\,10px\+2em\,_\,_\)\$zIndex\(2\)>:where(.callout) {
  position: absolute;
  inset-block: 5% auto;
  inset-inline: calc(10px + 2em) auto;
  z-index: 2;
}

.\|\.origin\$absolute\(0\,0\,_\,_\)>:where(.origin) {
  position: absolute;
  inset-block: 0 auto;
  inset-inline: 0 auto;
}
```
