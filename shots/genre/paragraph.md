**description:**
Creates a highly legible blog paragraph using a preset. Resets all inherited styles and applies full justification, a comfortable line-height, hyphenation, and a slight indent for new paragraphs.
**userInstruction:** Make the paragraph highly legible with full justification, hyphenation, and a slight indent.
**before:**
```html
…<p>…</p>…
```
**after:**
```html
…<p class="$Paragraph(_,1.6,justify,indent(1.5em),hyphens)">…</p>…
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
Formats user-generated comments or markdown blocks by targeting a specific class. Additively applies whitespace preservation, safe wrapping for long URLs, and custom line-height.
**userInstruction:** Format the comment text to preserve whitespace, safely wrap long URLs, and increase line height.
**before:**
```html
…<div class="comment">…</div>…
```
**after:**
```html
…<div class="comment $Paragraph(_,preWrap,breakWord,spacing(0.1em),1.5)">…</div>…
```
**css:**
```css
.\$Paragraph\(_\,preWrap\,breakWord\,spacing\(0\.1em\)\,1\.5\) {
  line-height: 1.5;
  text-indent: unset;
  word-spacing: 0.1em;
  hyphens: unset;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```

**description:**
Sets strict typographic rules for formal, mixed-language documents (like legal text with CJK). Resets all paragraph defaults, preventing word breaks within CJK text but allowing long strings to break, while controlling line-breaking and punctuation.
**userInstruction:**
Apply strict typographic rules for formal mixed-language documents, preventing word breaks in CJK text but allowing long strings to break.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Paragraph(_,breakLongWords,lineBreakStrict,hangingPunctuationFirst,1.8)">…</div>…
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
Styles the first child in a container (like a terminal output or hash dump block). Additively forces aggressive word-breaking at the box edge, tight line height, and zero spacing.
**userInstruction:** Force aggressive word-breaking at the box edge, tight line height, and zero spacing for the first child element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|:first-child$paragraph(breakAll,spacing(0),1.2)">…</div>…
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
Resets paragraph inheritance defaults for nested elements using a universal child selector. Forces a start-aligned, nowrap block with strict line-breaking rules and absolutely no indent.
**userInstruction:**
Reset paragraph defaults for all nested elements, forcing a start-aligned, nowrap block with strict line-breaking rules and no indent.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|$Paragraph(start,nowrap,indent(0),lineBreakNormal)">…</div>…
```
**css:**
```css
.\|\$Paragraph\(start\,nowrap\,indent\(0\)\,lineBreakNormal\)>* {
  line-height: unset;
  text-indent: 0;
  word-spacing: unset;
  hyphens: unset;
  white-space: nowrap;
  overflow-wrap: unset;
  word-break: unset;
  line-break: normal;
  text-align: start;
  text-align-last: unset;
  hanging-punctuation: unset;
}
```

**description:**
Styles a journal document preset. Sets specific paragraph alignment defaults with a predefined style `journal`. Resets inherited line height, white space and more.
**userInstruction:** Apply the journal preset with custom line height, manual hyphens, and hanging punctuation at the end.
**before:**
```html
…<article class="$Paragraph(journal)">…</article>…
```
**after:**
```html
…<article class="$Paragraph(journal,1.7,shy,hangingPunctuationAllowEnd)">…</article>…
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
Sets typography for poetry or lyrics block. Keeps spaces and lines as authored by preserving formatting and breaks. It uses a specific selector to target the poetry class.
**userInstruction:** Format the poetry block to preserve authored spaces and line breaks, centrally aligned.
**before:**
```html
…<div class="poetry">…</div>…
```
**after:**
```html
…<div class="poetry $paragraph(preserve,1.4,center)">…</div>…
```
**css:**
```css
.\$paragraph\(preserve\,1\.4\,center\) {
  line-height: 1.4;
  white-space: preserve;
  text-align: center;
}
```

**description:**
Renders a classic prose format using a novel preset, with smaller line-height, text alignment justified, and hanging punctuation on both start and end.
**userInstruction:** Render classic prose with a novel preset, justified text, and centered last line.
**before:**
```html
…<p>…</p>…
```
**after:**
```html
…<p class="$Paragraph(novel,1.3,lastCenter,hangingPunctuationForceEnd,indent(1rem))">…</p>…
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
Renders hover styles for a summary card description, where text might overflow and should break appropriately, slightly tightening word spacing.
**userInstruction:** Add a hover state to the summary card description that tightens word spacing and breaks spaces appropriately.
**before:**
```html
…<p class="summary-card">…</p>…
```
**after:**
```html
…<p class="summary-card :hover$paragraph(breakSpaces,spacing(-0.05em),1.5)">…</p>…
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
**userInstruction:** Reset the dense code block to preserve spaces and breaks while ensuring normal word breaking.
**before:**
```html
…<pre class="code-block">…</pre>…
```
**after:**
```html
…<pre class="code-block $Paragraph(_,pre,breakNormal,indent(0),shy)">…</pre>…
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
Styles standard web copy using the body baseline. Ensures safe word breaks and automatic hyphenation for clean reading, with no additional tweaks.
**userInstruction:** Style standard web copy using the body baseline for clean reading.
**before:**
```html
…<body>…</body>…
```
**after:**
```html
…<body class="$Paragraph(body)">…</body>…
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
Sets up a high-legibility text block for accessibility, but adds a tweak to fully justify the text and strictly control line breaks.
**userInstruction:** Make the text more legible.
**before:**
```html
…<p class="$paragraph(justify,lineBreakStrict)">…</p>…
```
**after:**
```html
…<p class="$Paragraph(legible,justify,lineBreakStrict)">…</p>…
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
Applies the dense journal format for formal text, overriding the default strict line breaking to normal to accommodate specific language requirements.
**userInstruction:** Override the strict line breaking to normal for the formal journal text to accommodate specific language requirements.
**before:**
```html
…<article class="$Paragraph(journal)">…</article>…
```
**after:**
```html
…<article class="$Paragraph(journal,lineBreakNormal)">…</article>…
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

**description:** Styles classic prose layout with an indent, using the novel baseline without any additional overrides.
**userInstruction:** Style classic prose layout with an indent using the novel baseline.
**before:**
```html
…<p>…</p>…
```
**after:**
```html
…<p class="$Paragraph(novel)">…</p>…
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
Sets up a hero display text block. Uses the display baseline but explicitly centers the text and removes the hanging punctuation on the first line.
**userInstruction:** Set up a hero display text block, explicitly centered and with no hanging punctuation.
**before:**
```html
…<h1 class="$Paragraph(display)">…</h1>…
```
**after:**
```html
…<h1 class="$Paragraph(display,center,hangingPunctuationNone)">…</h1>…
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

**description:** Formats a short image caption centrally aligned without any hyphens using the caption baseline.
**userInstruction:** Format a short image caption centrally aligned without hyphens using the caption baseline.
**before:**
```html
…<figcaption>…</figcaption>…
```
**after:**
```html
…<figcaption class="$Paragraph(caption)">…</figcaption>…
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

**description:** Ensures numbers align to the end edge and never wrap, using the tabular baseline without any tweaks.
**userInstruction:** Ensure numbers align to the end edge and never wrap using the tabular baseline.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Paragraph(tabular)">…</div>…
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
Formats a button label using the interactive baseline. Adds a slight word-spacing increase for button legibility and forces it to start-align instead of center.
**userInstruction:** Format the button label with the interactive baseline, increasing word spacing slightly and start-aligning.
**before:**
```html
…<button class="$Paragraph(interactive)">…</button>…
```
**after:**
```html
…<button class="$Paragraph(interactive,spacing(0.02em),start)">…</button>…
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
Styles a terminal log block using the terminal baseline. Adjusts the white-space rule from pre-wrap to pre to ensure strict formatting preservation on massive logs.
**userInstruction:** Make the text look more technical.
**before:**
```html
…<div class="$paragraph(pre)">…</div>…
```
**after:**
```html
…<div class="$Paragraph(terminal,pre)">…</div>…
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

**description:** Prepares a text block for aggressive breaking on long compound words, using the compound baseline.
**userInstruction:** Prepare the text block for aggressive breaking on long compound words using the compound baseline.
**before:**
```html
…<p>…</p>…
```
**after:**
```html
…<p class="$Paragraph(compound)">…</p>…
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