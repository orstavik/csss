
**description:** Enables automatic hyphenation for paragraph text.
**csss:** $paragraph(hyphens)
**css:**
```css
.\$paragraph\(hyphens\) {
  hyphens: auto;
}
```

**description:** Sets line-height, manual hyphens, indent and word spacing.
**csss:** $paragraph(12px,shy,indent(2em),spacing(1em))
**css:**
```css
.\$paragraph\(12px\,shy\,indent\(2em\)\,spacing\(1em\)\) {
  line-height: 12px;
  hyphens: manual;
  text-indent: 2em;
  word-spacing: 1em;
}
```

**description:** Enables word breaking with spacing and 1.4 line-height.
**csss:** $paragraph(breakWord,spacing(0.2em),1.4)
**css:**
```css
.\$paragraph\(breakWord\,spacing\(0\.2em\)\,1\.4\) {
  word-break: break-all;
  overflow-wrap: break-word;
  word-spacing: 0.2em;
  line-height: 1.4;
}
```

**description:** Enables word breaking at overflow boundaries.
**csss:** $paragraph(breakWord)
**css:**
```css
.\$paragraph\(breakWord\) {
  word-break: break-all;
  overflow-wrap: break-word;
}
```

**description:** Breaks words at any character to prevent overflow.
**csss:** $paragraph(breakAll)
**css:**
```css
.\$paragraph\(breakAll\) {
  word-break: break-all;
}
```


**description:** Prevents paragraph text from wrapping.
**csss:** $paragraph(nowrap)
**css:**
```css
.\$paragraph\(nowrap\) {
  white-space: nowrap;
}
```

**description:** Preserves whitespace with wrapping in paragraph.
**csss:** $paragraph(preWrap)
**css:**
```css
.\$paragraph\(preWrap\) {
  white-space: pre-wrap;
}
```

**description:** Collapses spaces but preserves newlines in paragraph.
**csss:** $paragraph(preLine)
**css:**
```css
.\$paragraph\(preLine\) {
  white-space: pre-line;
}
```

**description:** Preserves all whitespace exactly in paragraph.
**csss:** $paragraph(pre)
**css:**
```css
.\$paragraph\(pre\) {
  white-space: pre;
}
```

**description:** Enables break-spaces whitespace mode in paragraph.
**csss:** $paragraph(breakSpaces)
**css:**
```css
.\$paragraph\(breakSpaces\) {
  white-space: break-spaces;
}
```

**description:** Resets paragraph whitespace to normal.
**csss:** $paragraph(whiteSpaceNormal)
**css:**
```css
.\$paragraph\(whiteSpaceNormal\) {
  white-space: normal;
}
```


**description:** Justifies paragraph text across the full width.
**csss:** $paragraph(justify)
**css:**
```css
.\$paragraph\(justify\) {
  text-align: justify;
}
```

**description:** Centers paragraph text horizontally.
**csss:** $paragraph(center)
**css:**
```css
.\$paragraph\(center\) {
  text-align: center;
}
```

**description:** Aligns paragraph text to the start (LTR-aware).
**csss:** $paragraph(start)
**css:**
```css
.\$paragraph\(start\) {
  text-align: start;
}
```

**description:** Aligns paragraph text to the end (LTR-aware).
**csss:** $paragraph(end)
**css:**
```css
.\$paragraph\(end\) {
  text-align: end;
}
```


**description:** Justifies text with 0.3em word spacing and 1.6 line-height.
**csss:** $paragraph(justify,spacing(0.3em),1.6)
**css:**
```css
.\$paragraph\(justify\,spacing\(0\.3em\)\,1\.6\) {
  text-align: justify;
  word-spacing: 0.3em;
  line-height: 1.6;
}
```

**description:** Sets 1.8 line-height with 0.5rem word spacing.
**csss:** $paragraph(1.8,spacing(0.5rem))
**css:**
```css
.\$paragraph\(1\.8\,spacing\(0\.5rem\)\) {
  line-height: 1.8;
  word-spacing: 0.5rem;
}
```

**description:** Sets tight 1.2 line-height with zero word spacing.
**csss:** $paragraph(1.2,spacing(0))
**css:**
```css
.\$paragraph\(1\.2\,spacing\(0\)\) {
  line-height: 1.2;
  word-spacing: 0;
}
```

**description:** Sets 1.5 line-height on paragraph.
**csss:** $paragraph(1.5)
**css:**
```css
.\$paragraph\(1\.5\) {
  line-height: 1.5;
}
```

**description:** Removes text indent on .highlight children.
**csss:** |.highlight$paragraph(indent(0))
**css:**
```css
.\|\.highlight\$paragraph\(indent\(0\)\)>:where(.highlight) {
  text-indent: 0;
}
```

**description:** Sets negative 1em text indent on .negative children.
**csss:** |.negative$paragraph(indent(-1em))
**css:**
```css
.\|\.negative\$paragraph\(indent\(-1em\)\)>:where(.negative) {
  text-indent: -1em;
}
```

**description:** Resets all Paragraph properties and sets 2rem indent on all children.
**csss:** |*$Paragraph(_,indent(2rem))
**css:**
```css
.\|\*\$Paragraph\(_\,indent\(2rem\)\)>* {
  line-height: unset;
  text-indent: 2rem;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```
