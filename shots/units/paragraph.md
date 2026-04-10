**description:**
An example demonstrating creates a highly legible blog paragraph using a preset. resets all inherited styles and applies full justification, a comfortable line-height, hyphenation, and a slight indent for new paragraphs.
**csss:**
```csss
$Paragraph(_,1.6,justify,indent(1.5em),hyphens)
```
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
**description:**
An example demonstrating formats user-generated comments or markdown blocks by targeting a specific class. additively applies whitespace preservation, safe wrapping for long urls, and custom line-height.
**csss:**
```csss
.comment$paragraph(preWrap,breakWord,spacing(0.1em),1.5)
```
**css:**
```css
.\.comment\$paragraph\(preWrap\,breakWord\,spacing\(0\.1em\)\,1\.5\):where(.comment) {
  line-height: 1.5;
  white-space: pre-wrap;
  word-spacing: 0.1em;
  word-break: normal;
  overflow-wrap: break-word;
}
```
**description:**
A UI component with strict typographic rules for formal, mixed-language documents (like legal text with cjk). resets all paragraph defaults, preventing word breaks within cjk text but allowing long strings to break, while controlling line-breaking and punctuation.
**csss:**
```csss
$Paragraph(_,breakLongWords,lineBreakStrict,hangingPunctuationFirst,1.8)
```
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
**description:**
An example demonstrating styles the first child in a container (like a terminal output or hash dump block). additively forces aggressive word-breaking at the box edge, tight line height, and zero spacing.
**csss:**
```csss
|:first-child$paragraph(breakAll,spacing(0),1.2)
```
**css:**
```css
.\|\:first-child\$paragraph\(breakAll\,spacing\(0\)\,1\.2\)>:where(:first-child) {
  line-height: 1.2;
  word-spacing: 0;
  word-break: break-all;
  overflow-wrap: normal;
}
```
**description:**
An example demonstrating resets paragraph inheritance defaults for nested elements using a universal child selector. forces a left-aligned, nowrap block with strict line-breaking rules and absolutely no indent.
**csss:**
```csss
|*$Paragraph(_,left,nowrap,indent(0),lineBreakNormal)
```
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
**description:**
An example demonstrating styles a journal document preset. sets specific paragraph alignment defaults with a predefined style `journal`. resets inherited line height, white space and more.
**csss:**
```csss
$Paragraph(journal,1.7,shy,hangingPunctuationAllowEnd)
```
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
  hanging-punctuation: allow-end;
}
```
**description:**
A UI component with typography for poetry or lyrics block. keeps spaces and lines as authored by preserving formatting and breaks. it uses a specific selector to target the poetry class.
**csss:**
```csss
.poetry$paragraph(preserve,1.4,center)
```
**css:**
```css
.\.poetry\$paragraph\(preserve\,1\.4\,center\):where(.poetry) {
  line-height: 1.4;
  white-space: preserve;
  text-align: center;
}
```
**description:**
An example demonstrating renders a classic prose format using a novel preset, with smaller line-height, text alignment justified, and hanging punctuation on both start and end.
**csss:**
```csss
$Paragraph(novel,1.3,lastCenter,hangingPunctuationForceEnd,indent(1rem))
```
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
  hanging-punctuation: force-end;
}
```
**description:**
An example demonstrating renders hover styles for a summary card description, where text might overflow and should break appropriately, slightly tightening word spacing.
**csss:**
```csss
:hover$paragraph(breakSpaces,spacing(-0.05em),1.5)
```
**css:**
```css
.\:hover\$paragraph\(breakSpaces\,spacing\(-0\.05em\)\,1\.5\):where(:hover) {
  line-height: 1.5;
  white-space: break-spaces;
  word-spacing: -0.05em;
}
```
**description:**
A dense code block reset. Disables hyphens, enforces pre formatting, preserves spaces and breaks, and ensures normal word breaking. Resets all the defaults.
**csss:**
```csss
$Paragraph(_,pre,breakNormal,indent(0),shy)
```
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
**description:**
An example demonstrating styles standard web copy using the body baseline. ensures safe word breaks and automatic hyphenation for clean reading, with no additional tweaks.
**csss:**
```csss
$Paragraph(body)
```
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
  hanging-punctuation: unset;
}
```
**description:**
A UI component with up a high-legibility text block for accessibility, but adds a tweak to fully justify the text and strictly control line breaks.
**csss:**
```csss
$Paragraph(legible,justify,lineBreakStrict)
```
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
  hanging-punctuation: unset;
}
```
**description:**
A layout container with the dense journal format for formal text, overriding the default strict line breaking to normal to accommodate specific language requirements.
**csss:**
```csss
$Paragraph(journal,lineBreakNormal)
```
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
  hanging-punctuation: unset;
}
```
**description:**
An example demonstrating styles classic prose layout with an indent, using the novel baseline without any additional overrides.
**csss:**
```csss
$Paragraph(novel)
```
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
  hanging-punctuation: last;
}
```
**description:**
A UI component with up a hero display text block. uses the display baseline but explicitly centers the text and removes the hanging punctuation on the first line.
**csss:**
```csss
$Paragraph(display,center,hangingPunctuationNone)
```
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
  hanging-punctuation: none;
}
```
**description:**
An example demonstrating formats a short image caption centrally aligned without any hyphens using the caption baseline.
**csss:**
```csss
$Paragraph(caption)
```
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
  hanging-punctuation: unset;
}
```
**description:**
An example demonstrating ensures numbers align to the end edge and never wrap, using the tabular baseline without any tweaks.
**csss:**
```csss
$Paragraph(tabular)
```
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
  hanging-punctuation: unset;
}
```
**description:**
An example demonstrating formats a button label using the interactive baseline. adds a slight word-spacing increase for button legibility and forces it to start-align instead of center.
**csss:**
```csss
$Paragraph(interactive,spacing(0.02em),start)
```
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
  hanging-punctuation: unset;
}
```
**description:**
An example demonstrating styles a terminal log block using the terminal baseline. adjusts the white-space rule from pre-wrap to pre to ensure strict formatting preservation on massive logs.
**csss:**
```csss
$Paragraph(terminal,pre)
```
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
  hanging-punctuation: unset;
}
```
**description:**
An example demonstrating prepares a text block for aggressive breaking on long compound words, using the compound baseline.
**csss:**
```csss
$Paragraph(compound)
```
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
  hanging-punctuation: unset;
}
```
