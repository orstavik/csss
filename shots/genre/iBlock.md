**description:**
An IBlock badge row with centered text, padding, and even spacing.
**userInstruction:** The badges are packed too tightly and have no internal padding. Add 0.5rem padding, center the text, and separate the items with an inline-block spacing.
**before:**
```html
…<div class="$IBlock">
  <span>…</span>
  <span>…</span>
</div>…
```
**after:**
```html
…<div class="
  $IBlock(padding(0.5rem))$paragraph(center)
  |$IBlockItem(margin(1rem,0,0.5rem))">
  <span>…</span>
  <span>…</span>
</div>…
```
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.5rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:**
An IBlock stat row with hidden overflow, padding, and shared spacing.
**userInstruction:** Long stat numbers are pushing the bounds of the container. Hide the overflow and ensure the child items have consistent margin spacing.
**before:**
```html
…<div class="$IBlock(padding(0.5rem))">
  <div class="stat">…</div>
  <div class="stat">…</div>
</div>…
```
**after:**
```html
…<div class="
  $IBlock(padding(0.5rem))$box(hidden)
  |$IBlockItem(margin(1rem,0,0.5rem))">
  <div class="stat">…</div>
  <div class="stat">…</div>
</div>…
```
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$box\(hidden\) {
  display: inline-block;
  padding: 0.5rem;
  overflow: hidden;
}

.\|\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:**
An IBlock card row with padding, fixed width, and mixed alignment, where edge items can opt into top alignment.
**userInstruction:** The cards are varying in width and aligning unpredictably. Set a fixed 200px width and middle alignment for all children, but allow the .edge card to align to the top.
**before:**
```html
…<div class="$IBlock(padding(1rem))$paragraph(center)">
  <div>…</div>
  <div class="edge">…</div>
</div>…
```
**after:**
```html
…<div class="
  $IBlock(padding(1rem))$paragraph(center)
  |$paragraphItem(middle)$Box(200px)
  |.edge$paragraphItem(top)">
  <div>…</div>
  <div class="edge">…</div>
</div>…
```
**css:**
```css
.\$IBlock\(padding\(1rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 1rem;
  text-align: center;
}

.\|\$paragraphItem\(middle\)\$Box\(200px\)>* {
  vertical-align: middle;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 200px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.edge\$paragraphItem\(top\)>:where(.edge) {
  vertical-align: top;
}
```

**description:**
An inline media row with centered text and mixed top and middle alignment.
**userInstruction:** The .lead and .cta elements are sitting on the same baseline. Refactor this to align the .lead to the top with some margin, and align the .cta to the middle.
**before:**
```html
…<div class="$IBlock(padding(0.5rem))$paragraph(center)">
  <div class="lead">…</div>
  <div class="cta">…</div>
</div>…
```
**after:**
```html
…<div class="
  $IBlock(padding(0.5rem))$paragraph(center)
  |.lead$iBlockItem(margin(0,1rem,1rem,0))$paragraphItem(top)
  |.cta$paragraphItem(middle)">
  <div class="lead">…</div>
  <div class="cta">…</div>
</div>…
```
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.5rem;
  text-align: center;
}

.\|\.lead\$iBlockItem\(margin\(0\,1rem\,1rem\,0\)\)\$paragraphItem\(top\)>:where(.lead) {
  margin-block: 0 1rem;
  margin-inline: 1rem 0;
  vertical-align: top;
}

.\|\.cta\$paragraphItem\(middle\)>:where(.cta) {
  vertical-align: middle;
}
```

**description:**
An IBlock metadata row with padding, shared spacing, plus width and alignment overrides on selected items.
**userInstruction:** The metadata elements are squished. Give all children a 0.5rem block / 1rem inline margin, set a 240px width for .card, and a 120px width and top alignment for .meta.
**before:**
```html
…<div class="$IBlock(padding(0.75rem))$paragraph(center)">
  <div class="card">…</div>
  <div class="meta">…</div>
</div>…
```
**after:**
```html
…<div class="
  $IBlock(padding(0.75rem))$paragraph(center)
  |$IBlockItem(margin(0.5rem,1rem))$paragraphItem(middle)
  |.card$box(240px)
  |.meta$box(120px)$paragraphItem(top)">
  <div class="card">…</div>
  <div class="meta">…</div>
</div>…
```
**css:**
```css
.\$IBlock\(padding\(0\.75rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.75rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(0\.5rem\,1rem\)\)\$paragraphItem\(middle\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
  vertical-align: middle;
}

.\|\.card\$box\(240px\)>:where(.card) {
  inline-size: 240px;
}

.\|\.meta\$box\(120px\)\$paragraphItem\(top\)>:where(.meta) {
  inline-size: 120px;
  vertical-align: top;
}
```