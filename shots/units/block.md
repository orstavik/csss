**description:** A clipped Block card stack with padding and even item spacing.
**csss:**
$Block(padding(1rem))$Box(overflowHidden)
|$BlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$Block\(padding\(1rem\)\)\$Box\(overflowHidden\) {
  display: block;
  padding: 1rem;
  inline-size: unset;
  block-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: hidden;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\$BlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:** A scrolling Block media list with fixed-size items.
**csss:**
$block(padding(1.5rem))$Box(overflowScroll)
|$Box(inline(60px),block(100px))
**css:**
```css
.\$block\(padding\(1\.5rem\)\)\$Box\(overflowScroll\) {
  padding: 1.5rem;
  inline-size: unset;
  block-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: scroll;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\$Box\(inline\(60px\)\,block\(100px\)\)>* {
  inline-size: 60px;
  block-size: 100px;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:** A scrollable Block note rail with clean word breaks.
**csss:**
$Box(overflowHiddenScroll)$paragraph(breakWord)
|$BlockItem(margin(0.5rem,1rem))
**css:**
```css
.\$Box\(overflowHiddenScroll\)\$paragraph\(breakWord\) {
  inline-size: unset;
  block-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: hidden scroll;
  scroll-padding: unset;
  scroll-snap-type: unset;
  word-break: normal;
  overflow-wrap: break-word;
}

.\|\$BlockItem\(margin\(0\.5rem\,1rem\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
}
```

**description:** A centered Block reading panel with capped line length.
**csss:**
$Block$box(overflowAuto)$Paragraph(_,center)
|$Box(inline(_,_,600px))
**css:**
```css
.\$Block\$box\(overflowAuto\)\$Paragraph\(_\,center\) {
  display: block;
  padding: unset;
  overflow: auto;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: center;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\$Box\(inline\(_\,_\,600px\)\)>* {
  inline-size: unset;
  block-size: unset;
  min-inline-size: unset;
  max-inline-size: 600px;
  min-block-size: unset;
  max-block-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:** A 3-line clamp for teaser text and previews.
**csss:** $lineClamp(3)$paragraph(breakAll)
**css:**
```css
.\$lineClamp\(3\)\$paragraph\(breakAll\) {
  display: -webkit-box;
  padding: unset;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-block: hidden;
  word-break: break-all;
  overflow-wrap: normal;
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
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** Default Block layout for book-styled text with indented paragraphs, plus title and subtitle overrides that soften the rhythm at the top.
**csss:**
$Block(padding(1.5rem))
|$BlockItem(margin(0,0,1rem))$Paragraph(_,indent(2em))
|.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
|.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\$BlockItem\(margin\(0\,0\,1rem\)\)\$Paragraph\(_\,indent\(2em\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
  line-height: unset;
  text-indent: 2em;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
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
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
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
