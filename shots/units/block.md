**description:** A clipped Block card stack with padding and even item spacing.
**csss:**
$Block(overflowHidden,padding(1rem))
|$BlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$Block\(overflowHidden\,padding\(1rem\)\) {
  display: block;
  overflow: hidden;
  padding: 1rem;
}

.\|\$BlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** A scrolling Block media list with fixed-size items.
**csss:**
$block(overflowScroll,padding(1.5rem))
|$BlockItem(size(60px,100px))
**css:**
```css
.\$block\(overflowScroll\,padding\(1\.5rem\)\) {
  overflow: scroll;
  padding: 1.5rem;
}

.\|\$BlockItem\(size\(60px\,100px\)\)>* {
  inline-size: 60px;
  block-size: 100px;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** A scrollable Block note rail with clean word breaks.
**csss:**
$block(overflowHiddenScroll,breakWord)
|$BlockItem(margin(0.5rem,1rem))
**css:**
```css
.\$block\(overflowHiddenScroll\,breakWord\) {
  overflow-block: hidden;
  overflow-inline: scroll;
  overflow-wrap: break-word;
}

.\|\$BlockItem\(margin\(0\.5rem\,1rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** A centered Block reading panel with capped line length.
**csss:**
$Block(overflowAuto)$paragraph(center)
|$BlockItem(inlineSize(_,_,600px))
**css:**
```css
.\$Block\(overflowAuto\)\$paragraph\(center\) {
  display: block;
  overflow: auto;
  text-align: center;
}

.\|\$BlockItem\(inlineSize\(_\,_\,600px\)\)>* {
  min-inline-size: unset;
  inline-size: unset;
  max-inline-size: 600px;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** A 3-line clamp for teaser text and previews.
**csss:** $lineClamp(3,breakAll)
**css:**
```css
.\$lineClamp\(3\,breakAll\) {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-block: hidden;
  word-break: break-all;
}
```

**description:** Default Block with padding and a gap after each item.
**csss:**
$Block(padding(1.5rem))
|$BlockItem(margin(0,0,1rem))
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** Default Block layout for book-styled text with indented paragraphs, plus title and subtitle overrides that soften the rhythm at the top.
**csss:**
$Block(padding(1.5rem))
|$BlockItem(margin(0,0,1rem))$Paragraph(indent(2em))
|.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
|.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\$BlockItem\(margin\(0\,0\,1rem\)\)\$Paragraph\(indent\(2em\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
  line-height: unset;
  text-indent: 2em;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\.title\$blockItem\(margin\(0\,0\,2rem\)\)\$paragraph\(indent\(0\)\)>:where(.title) {
  margin-block: 0 2rem;
  margin-inline: 0;
  text-indent: 0;
}

.\|\.subtitle\$blockItem\(margin\(0\,0\,1\.5rem\)\)\$paragraph\(indent\(1em\)\)>:where(.subtitle) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
  text-indent: 1em;
}
```

**description:** A Block blog post layout with stacked paragraphs, tighter heading spacing, and a floated note that sits beside the main reading flow.
**csss:**
$Block(padding(1rem))
|$BlockItem(margin(0,0,1rem))
|h4$blockItem(margin(0,0,0.5rem))
|.start$blockItem(floatStart,margin(0.5rem,0,0,0))
|.note$blockItem(floatEnd,margin(0,0,1rem,1rem))
**css:**
```css
.\$Block\(padding\(1rem\)\) {
  display: block;
  padding: 1rem;
}

.\|\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}

.\|h4\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
}

.\|\.start\$blockItem\(floatStart\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.start) {
  float: inline-start;
  margin-block: 0.5rem 0;
  margin-inline: 0;
}

.\|\.note\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
  float: inline-end;
  margin-block: 0 1rem;
  margin-inline: 0 1rem;
}
```
