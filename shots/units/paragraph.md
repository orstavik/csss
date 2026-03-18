**description:** Creates a highly legible blog paragraph using a preset. Resets all inherited styles and applies full justification, a comfortable line-height, hyphenation, and a slight indent for new paragraphs.
**csss:** $Paragraph(_,1.6,justify,indent(1.5em),hyphens)
**css:**
```css
.\$Paragraph\(_\,1\.6\,justify\,indent\(1\.5em\)\,hyphens\) {
  line-height: 1.6;
  text-indent: 1.5em;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: justify;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```

**description:** Formats user-generated comments or markdown blocks by targeting a specific class. Additively applies whitespace preservation, safe wrapping for long URLs, and custom line-height.
**csss:** .comment$paragraph(preWrap,breakWord,spacing(0.1em),1.5)
**css:**
```css
.\.comment\$paragraph\(preWrap\,breakWord\,spacing\(0\.1em\)\,1\.5\):where(.comment) {
  white-space: pre-wrap;
  word-break: normal;
  overflow-wrap: break-word;
  word-spacing: 0.1em;
  line-height: 1.5;
}
```

**description:** Sets strict typographic rules for formal, mixed-language documents (like legal text with CJK). Resets all paragraph defaults, preventing word breaks within CJK text but allowing long strings to break, while controlling line-breaking and punctuation.
**csss:** $Paragraph(_,breakLongWords,lineBreakStrict,hangingPunctuationFirst,1.8)
**css:**
```css
.\$Paragraph\(_\,breakLongWords\,lineBreakStrict\,hangingPunctuationFirst\,1\.8\) {
  line-height: 1.8;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: keep-all;
  line-break: strict;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: first;
}
```

**description:** Styles the first child in a container (like a terminal output or hash dump block). Additively forces aggressive word-breaking at the box edge, tight line height, and zero spacing.
**csss:** |:first-child$paragraph(breakAll,spacing(0),1.2)
**css:**
```css
.\|\:first-child\$paragraph\(breakAll\,spacing\(0\)\,1\.2\)>:where(:first-child) {
  word-break: break-all;
  overflow-wrap: normal;
  word-spacing: 0;
  line-height: 1.2;
}
```

**description:** Resets paragraph inheritance defaults for nested elements using a universal child selector. Forces a left-aligned, nowrap block with strict line-breaking rules and absolutely no indent.
**csss:** |*$Paragraph(_,left,nowrap,indent(0),lineBreakNormal)
**css:**
```css
.\|\*\$Paragraph\(_\,left\,nowrap\,indent\(0\)\,lineBreakNormal\)>* {
  line-height: unset;
  text-indent: 0;
  word-spacing: unset;
  hyphens: unset;
  white-space: nowrap;
  overflow-wrap: unset;
  word-break: unset;
  line-break: normal;
  text-align: left;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```

**description:** Styles a scientific document preset. Sets specific paragraph alignment defaults with a predefined style `scientific`. Resets inherited line height, white space and more.
**csss:** $Paragraph(scientific,1.7,shy,hangingPunctuationAllowEnd)
**css:**
```css
.\$Paragraph\(scientific\,1\.7\,shy\,hangingPunctuationAllowEnd\) {
  line-height: 1.7;
  text-indent: unset;
  word-spacing: unset;
  hyphens: manual;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: justify;
  text-align-last: justify;
  hanging-punctuation: allow-end;
}
```

**description:** Sets typography for poetry or lyrics block. Keeps spaces and lines as authored by preserving formatting and breaks. It uses a specific selector to target the poetry class.
**csss:** .poetry$paragraph(preserveSpaces,1.4,center)
**css:**
```css
.\.poetry\$paragraph\(preserveSpaces\,1\.4\,center\):where(.poetry) {
  white-space: preserve;
  line-height: 1.4;
  text-align: center;
}
```

**description:** Renders a caption underneath an image or table. Uses an old book preset, with smaller line-height, text alignment justified, and hanging punctuation on both start and end.
**csss:** $Paragraph(oldBook,1.3,lastCenter,hangingPunctuationForceEnd,indent(1rem))
**css:**
```css
.\$Paragraph\(oldBook\,1\.3\,lastCenter\,hangingPunctuationForceEnd\,indent\(1rem\)\) {
  line-height: 1.3;
  text-indent: 1rem;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: justify;
  text-align-last: center;
  hanging-punctuation: force-end;
}
```

**description:** Renders hover styles for a summary card description, where text might overflow and should break appropriately, slightly tightening word spacing.
**csss:** :hover$paragraph(breakSpaces,spacing(-0.05em),1.5)
**css:**
```css
.\:hover\$paragraph\(breakSpaces\,spacing\(-0\.05em\)\,1\.5\):hover {
  white-space: break-spaces;
  word-spacing: -0.05em;
  line-height: 1.5;
}
```

**description:** A dense code block reset. Disables hyphens, enforces pre formatting, preserves spaces and breaks, and ensures normal word breaking. Resets all the defaults.
**csss:** $Paragraph(_,pre,breakNormal,indent(0),shy)
**css:**
```css
.\$Paragraph\(_\,pre\,breakNormal\,indent\(0\)\,shy\) {
  line-height: unset;
  text-indent: 0;
  word-spacing: unset;
  hyphens: manual;
  white-space: pre;
  overflow-wrap: normal;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```