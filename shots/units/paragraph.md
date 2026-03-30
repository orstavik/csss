**description:**
Creates a highly legible blog paragraph using a preset. Resets all inherited styles and applies full justification, a comfortable line-height, hyphenation, and a slight indent for new paragraphs.
**csss:**
$Paragraph(_,1.6,justify,indent(1.5em),hyphens)
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
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Formats user-generated comments or markdown blocks by targeting a specific class. Additively applies whitespace preservation, safe wrapping for long URLs, and custom line-height.
**csss:**
.comment$paragraph(preWrap,breakWord,spacing(0.1em),1.5)
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

**description:**
Sets strict typographic rules for formal, mixed-language documents (like legal text with CJK). Resets all paragraph defaults, preventing word breaks within CJK text but allowing long strings to break, while controlling line-breaking and punctuation.
**csss:**
$Paragraph(_,breakLongWords,lineBreakStrict,hangingPunctuationFirst,1.8)
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
  vertical-align: unset;
  hanging-punctuation: first;
}
```

**description:**
Styles the first child in a container (like a terminal output or hash dump block). Additively forces aggressive word-breaking at the box edge, tight line height, and zero spacing.
**csss:**
|:first-child$paragraph(breakAll,spacing(0),1.2)
**css:**
```css
.\|\:first-child\$paragraph\(breakAll\,spacing\(0\)\,1\.2\)>:where(:first-child) {
  word-break: break-all;
  overflow-wrap: normal;
  word-spacing: 0;
  line-height: 1.2;
}
```

**description:**
Resets paragraph inheritance defaults for nested elements using a universal child selector. Forces a left-aligned, nowrap block with strict line-breaking rules and absolutely no indent.
**csss:**
|*$Paragraph(_,left,nowrap,indent(0),lineBreakNormal)
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
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Styles a journal document preset. Sets specific paragraph alignment defaults with a predefined style `journal`. Resets inherited line height, white space and more.
**csss:**
$Paragraph(journal,1.7,shy,hangingPunctuationAllowEnd)
**css:**
```css
.\$Paragraph\(journal\,1\.7\,shy\,hangingPunctuationAllowEnd\) {
  line-height: 1.7;
  text-indent: unset;
  word-spacing: unset;
  hyphens: manual;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: strict;
  text-align: justify;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: allow-end;
}
```

**description:**
Sets typography for poetry or lyrics block. Keeps spaces and lines as authored by preserving formatting and breaks. It uses a specific selector to target the poetry class.
**csss:**
.poetry$paragraph(preserve,1.4,center)
**css:**
```css
.\.poetry\$paragraph\(preserve\,1\.4\,center\):where(.poetry) {
  white-space: preserve;
  line-height: 1.4;
  text-align: center;
  vertical-align: unset;
}
```

**description:**
Renders a classic prose format using a novel preset, with smaller line-height, text alignment justified, and hanging punctuation on both start and end.
**csss:**
$Paragraph(novel,1.3,lastCenter,hangingPunctuationForceEnd,indent(1rem))
**css:**
```css
.\$Paragraph\(novel\,1\.3\,lastCenter\,hangingPunctuationForceEnd\,indent\(1rem\)\) {
  line-height: 1.3;
  text-indent: 1rem;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: justify;
  text-align-last: center;
  vertical-align: unset;
  hanging-punctuation: force-end;
}
```

**description:**
Renders hover styles for a summary card description, where text might overflow and should break appropriately, slightly tightening word spacing.
**csss:**
:hover$paragraph(breakSpaces,spacing(-0.05em),1.5)
**css:**
```css
.\:hover\$paragraph\(breakSpaces\,spacing\(-0\.05em\)\,1\.5\):where(:hover) {
  white-space: break-spaces;
  word-spacing: -0.05em;
  line-height: 1.5;
}
```

**description:**
A dense code block reset. Disables hyphens, enforces pre formatting, preserves spaces and breaks, and ensures normal word breaking. Resets all the defaults.
**csss:**
$Paragraph(_,pre,breakNormal,indent(0),shy)
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
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Styles standard web copy using the body baseline. Ensures safe word breaks and automatic hyphenation for clean reading, with no additional tweaks.
**csss:**
$Paragraph(body)
**css:**
```css
.\$Paragraph\(body\) {
  line-height: 1.5;
  text-indent: unset;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: unset;
  line-break: unset;
  text-align: start;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Sets up a high-legibility text block for accessibility, but adds a tweak to fully justify the text and strictly control line breaks.
**csss:**
$Paragraph(legible,justify,lineBreakStrict)
**css:**
```css
.\$Paragraph\(legible\,justify\,lineBreakStrict\) {
  line-height: 1.6;
  text-indent: unset;
  word-spacing: 0.05em;
  hyphens: none;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: unset;
  line-break: strict;
  text-align: justify;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Applies the dense journal format for formal text, overriding the default strict line breaking to normal to accommodate specific language requirements.
**csss:**
$Paragraph(journal,lineBreakNormal)
**css:**
```css
.\$Paragraph\(journal\,lineBreakNormal\) {
  line-height: 1.5;
  text-indent: unset;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: normal;
  text-align: justify;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Styles classic prose layout with an indent, using the novel baseline without any additional overrides.
**csss:**
$Paragraph(novel)
**css:**
```css
.\$Paragraph\(novel\) {
  line-height: 1.5;
  text-indent: 1.5em;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: justify;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: last;
}
```

**description:**
Sets up a hero display text block. Uses the display baseline but explicitly centers the text and removes the hanging punctuation on the first line.
**csss:**
$Paragraph(display,center,hangingPunctuationNone)
**css:**
```css
.\$Paragraph\(display\,center\,hangingPunctuationNone\) {
  line-height: 1.1;
  text-indent: unset;
  word-spacing: unset;
  hyphens: none;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: unset;
  line-break: unset;
  text-align: center;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: none;
}
```

**description:**
Formats a short image caption centrally aligned without any hyphens using the caption baseline.
**csss:**
$Paragraph(caption)
**css:**
```css
.\$Paragraph\(caption\) {
  line-height: 1.3;
  text-indent: unset;
  word-spacing: unset;
  hyphens: none;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: unset;
  line-break: unset;
  text-align: center;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Ensures numbers align to the end edge and never wrap, using the tabular baseline without any tweaks.
**csss:**
$Paragraph(tabular)
**css:**
```css
.\$Paragraph\(tabular\) {
  line-height: 1.3;
  text-indent: unset;
  word-spacing: unset;
  hyphens: none;
  white-space: nowrap;
  overflow-wrap: unset;
  word-break: normal;
  line-break: unset;
  text-align: end;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Formats a button label using the interactive baseline. Adds a slight word-spacing increase for button legibility and forces it to start-align instead of center.
**csss:**
$Paragraph(interactive,spacing(0.02em),start)
**css:**
```css
.\$Paragraph\(interactive\,spacing\(0\.02em\)\,start\) {
  line-height: 1;
  text-indent: unset;
  word-spacing: 0.02em;
  hyphens: none;
  white-space: nowrap;
  overflow-wrap: unset;
  word-break: unset;
  line-break: unset;
  text-align: start;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Styles a terminal log block using the terminal baseline. Adjusts the white-space rule from pre-wrap to pre to ensure strict formatting preservation on massive logs.
**csss:**
$Paragraph(terminal,pre)
**css:**
```css
.\$Paragraph\(terminal\,pre\) {
  line-height: 1.4;
  text-indent: unset;
  word-spacing: unset;
  hyphens: none;
  white-space: pre;
  overflow-wrap: anywhere;
  word-break: break-all;
  line-break: unset;
  text-align: start;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```

**description:**
Prepares a text block for aggressive breaking on long compound words, using the compound baseline.
**csss:**
$Paragraph(compound)
**css:**
```css
.\$Paragraph\(compound\) {
  line-height: 1.5;
  text-indent: unset;
  word-spacing: unset;
  hyphens: auto;
  white-space: unset;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-break: unset;
  text-align: start;
  text-align-last: unset;
  vertical-align: unset;
  hanging-punctuation: unset;
}
```