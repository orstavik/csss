**description:** Default Block with padding and a gap after each item.
**userInstruction:** Refactor this layout to use a wildcard umbrella class for the child gaps instead of repeating $blockItem on every child.
**before:**
```html
…<div class="$Block(padding(1.5rem))">
  <div class="$blockItem(margin(0,0,1rem))">…</div>
  <div class="$blockItem(margin(0,0,1rem))">…</div>
  <div class="$blockItem(margin(0,0,1rem))">…</div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1rem))">
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** Default Block layout for book-styled text with indented paragraphs, title has 0 indentation, subtitle 50% indentation.
**userInstruction:** The book text uses hardcoded 32px indents. Change the paragraph indent to 2em for better responsiveness, and adjust the title to have no indent and the subtitle to have a 1em indent.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1rem))$Paragraph(_,indent(32px))">
  …
  <h2 class="title">…</h2>
  …
  <h3 class="subtitle">…</h3>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1rem))$Paragraph(_,indent(2em))
  |.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
  |.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))">
  …
  <h2 class="title">…</h2>
  …
  <h3 class="subtitle">…</h3>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)\$Paragraph\(_\,indent\(2em\)\)>* {
  float: unset;
  clear: unset;
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

**description:** A Block layout for a blog post with upto 600px wide, a gap between items, and a floating note on the right side.
**userInstruction:** The blog layout is mostly there, but the box and note elements are just sitting inline. Make the .box float to the start with appropriate margins, make the .note float to the end, and ensure .intro clears the start float.
**before:**
```html
…<article class="
  $Block$Box(_<_<600px)
  |*$BlockItem(margin(0.5rem,1rem))
  |p$blockItem(margin(0,0,1rem))
  |h4$blockItem(margin(0,0,0.5rem))
  |.content$blockItem(margin(0,0,1rem))">
  <div class="box">…</div>
  <p>…</p>
  <h4>…</h4>
  <div class="intro">…</div>
  <div class="content">…</div>
  <div class="note">…</div>
</article>…
```
**after:**
```html
…<article class="
  $Block$Box(_<_<600px) 
  |*$BlockItem(margin(0.5rem,1rem)) 
  |.box$blockItem(floatStart,margin(0,1rem,1rem,0)) 
  |p$blockItem(margin(0,0,1rem)) 
  |h4$blockItem(margin(0,0,0.5rem)) 
  |.intro$blockItem(clearStart,margin(0,0,2rem)) 
  |.content$blockItem(margin(0,0,1rem)) 
  |.note$blockItem(floatEnd,margin(0,0,1rem,1rem))">
  <div class="box">…</div>
  <p>…</p>
  <h4>…</h4>
  <div class="intro">…</div>
  <div class="content">…</div>
  <div class="note">…</div>
</article>…
```
**css:**
```css
.\$Block\$Box\(_\<_\<600px\) {
  display: block;
  padding: unset;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 600px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\.5rem\,1rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
}

.\|\.box\$blockItem\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(.box) {
  margin-block: 0 1rem;
  margin-inline: 1rem 0;
  float: inline-start;
}

.\|p\$blockItem\(margin\(0\,0\,1rem\)\)>:where(p) {
  margin-block: 0 1rem;
  margin-inline: 0;
}

.\|h4\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
}

.\|\.intro\$blockItem\(clearStart\,margin\(0\,0\,2rem\)\)>:where(.intro) {
  margin-block: 0 2rem;
  margin-inline: 0;
  clear: inline-start;
}

.\|\.content\$blockItem\(margin\(0\,0\,1rem\)\)>:where(.content) {
  margin-block: 0 1rem;
  margin-inline: 0;
}

.\|\.note\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
  margin-block: 0 1rem;
  margin-inline: 0 1rem;
  float: inline-end;
}
```

**description:** A Block layout for a centered card upto 300px wide and no gap between items.
**userInstruction:** The card container uses a fixed 80px inline padding. Change this to 10vh so the padding scales better with screen height.
**before:**
```html
…<div class="$Block(padding(0,80px)) |*$BlockItem(margin(_,0))$Box(_<_<300px)">…</div>…
```
**after:**
```html
…<div class="$Block(padding(0,10vh)) |*$BlockItem(margin(_,0))$Box(_<_<300px)">…</div>…
```
**css:**
```css
.\$Block\(padding\(0\,10vh\)\) {
  display: block;
  padding-block: 0;
  padding-inline: 10vh;
}

.\|\*\$BlockItem\(margin\(_\,0\)\)\$Box\(_\<_\<300px\)>* {
  float: unset;
  clear: unset;
  margin-block: auto;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 300px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:** A Block layout for a narrow centered reading column with a max-width of 65ch, comfortable vertical spacing between paragraphs, and extra bottom margin on headings to reinforce visual hierarchy for long-form articles or essays.
**userInstruction:** The reading column has uniform 1.5rem spacing everywhere. To improve visual hierarchy, give the h1, h2, and h3 headings larger bottom margins (2.5rem, 2rem, and 1.75rem respectively).
**before:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<65ch)">
  <h1>…</h1>
  <h2>…</h2>
  <h3>…</h3>
  <p>…</p>
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<65ch)
  |h1$blockItem(margin(0,0,2.5rem))
  |h2$blockItem(margin(0,0,2rem))
  |h3$blockItem(margin(0,0,1.75rem))
  |p$blockItem(margin(0,0,1.5rem))">
  <h1>…</h1>
  <h2>…</h2>
  <h3>…</h3>
  <p>…</p>
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)\$Box\(_\<_\<65ch\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 65ch;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|h1\$blockItem\(margin\(0\,0\,2\.5rem\)\)>:where(h1) {
  margin-block: 0 2.5rem;
  margin-inline: 0;
}

.\|h2\$blockItem\(margin\(0\,0\,2rem\)\)>:where(h2) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|h3\$blockItem\(margin\(0\,0\,1\.75rem\)\)>:where(h3) {
  margin-block: 0 1.75rem;
  margin-inline: 0;
}

.\|p\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(p) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a documentation page with wide outer padding, generous bottom margins on section-level elements, and tighter margins on paragraphs and code blocks to group related content visually within each section.
**userInstruction:** The documentation page layout is causing horizontal scrolling due to long text strings. Add break-word wrapping to fix the overflow, while keeping the existing padding and margin structure.
**before:**
```html
…<article class="
  $Block(padding(2rem))
  |*$BlockItem(margin(0,0,1.5rem))
  |h1$blockItem(margin(0,0,3rem))
  |h2$blockItem(margin(0,0,2rem))
  |h3$blockItem(margin(0,0,1.5rem))
  |p$blockItem(margin(0,0,1rem))
  |pre$blockItem(margin(0,0,1rem))">
  <h1>…</h1>
  <h2>…</h2>
  <h3>…</h3>
  <p>…</p>
  <pre>…</pre>
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(2rem))$Paragraph(_,breakWord)
  |*$BlockItem(margin(0,0,1.5rem))
  |h1$blockItem(margin(0,0,3rem))
  |h2$blockItem(margin(0,0,2rem))
  |h3$blockItem(margin(0,0,1.5rem))
  |p$blockItem(margin(0,0,1rem))
  |pre$blockItem(margin(0,0,1rem))">
  <h1>…</h1>
  <h2>…</h2>
  <h3>…</h3>
  <p>…</p>
  <pre>…</pre>
</article>…
```
**css:**
```css
.\$Block\(padding\(2rem\)\)\$Paragraph\(_\,breakWord\) {
  display: block;
  padding: 2rem;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|h1\$blockItem\(margin\(0\,0\,3rem\)\)>:where(h1) {
  margin-block: 0 3rem;
  margin-inline: 0;
}

.\|h2\$blockItem\(margin\(0\,0\,2rem\)\)>:where(h2) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|h3\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(h3) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|p\$blockItem\(margin\(0\,0\,1rem\)\)>:where(p) {
  margin-block: 0 1rem;
  margin-inline: 0;
}

.\|pre\$blockItem\(margin\(0\,0\,1rem\)\)>:where(pre) {
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a product detail page with a constrained max-width of 800px, a full-bleed hero image block at the top with no bottom margin, and evenly spaced descriptive sections stacked below it, with overflow clipped so hero images never bleed outside the container.
**userInstruction:** The hero image in the product detail section is bleeding outside the container's rounded corners and has an unwanted bottom margin. Clip the container's overflow and remove the hero's bottom margin.
**before:**
```html
…<section class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<800px)
  |.description$blockItem(margin(0,0,1.5rem))
  |.specs$blockItem(margin(0,0,1.5rem))">
  <div class="hero">…</div>
  <div class="description">…</div>
  <div class="specs">…</div>
</section>…
```
**after:**
```html
…<section class="
  $Block(padding(1.5rem))$Box(clip)
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<800px)
  |.hero$blockItem(margin(0,0,0))
  |.description$blockItem(margin(0,0,1.5rem))
  |.specs$blockItem(margin(0,0,1.5rem))">
  <div class="hero">…</div>
  <div class="description">…</div>
  <div class="specs">…</div>
</section>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Box\(clip\) {
  display: block;
  padding: 1.5rem;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: clip;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)\$Box\(_\<_\<800px\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 800px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.hero\$blockItem\(margin\(0\,0\,0\)\)>:where(.hero) {
  margin-block: 0;
  margin-inline: 0;
}

.\|\.description\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.description) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.specs\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.specs) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a sidebar navigation panel with no inline padding, compact vertical spacing between nav items, and extra top margin on group headings to create clear visual clusters without decorative separators.
**userInstruction:** This sidebar uses inline $blockItem classes for every item. Refactor it to use umbrella classes on the parent for the 0.25rem spacing, and use an umbrella selector for the .nav-group headers' top margin.
**before:**
```html
…<nav class="$Block(padding(1.5rem,0))$Box(auto)">
  …
  <div class="$blockItem(margin(1.5rem,0,0)) nav-group">…</div>
  <div class="$blockItem(margin(0.25rem,0))">…</div>
  <div class="$blockItem(margin(0.25rem,0))">…</div>
  …
</nav>…
```
**after:**
```html
…<nav class="
  $Block(padding(1.5rem,0))$Box(auto) 
  |*$BlockItem(margin(0.25rem,0)) 
  |.nav-group$blockItem(margin(1.5rem,0,0))">
  …
  <div class="nav-group">…</div>
  …
</nav>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\,0\)\)\$Box\(auto\) {
  display: block;
  padding-block: 1.5rem;
  padding-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\.25rem\,0\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.25rem;
  margin-inline: 0;
}

.\|\.nav-group\$blockItem\(margin\(1\.5rem\,0\,0\)\)>:where(.nav-group) {
  margin-block: 1.5rem 0;
  margin-inline: 0;
}
```

**description:** A Block layout for a card list where each card is horizontally centered with a max-width of 400px, receives equal top and bottom margins, and section headings above groups of cards get double the bottom margin for clear grouping.
**userInstruction:** The cards in this list are left-aligned and too wide on large screens. Center them horizontally and restrict their max-width to 400px.
**before:**
```html
…<section class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(1rem,0))
  |.section-title$blockItem(margin(0,0,2rem))">
  …
  <h2 class="section-title">…</h2>
  …
</section>…
```
**after:**
```html
…<section class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(1rem,_))$Box(_<_<400px) 
  |.section-title$blockItem(margin(0,0,2rem))">
  …
  <h2 class="section-title">…</h2>
  …
</section>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(1rem\,_\)\)\$Box\(_\<_\<400px\)>* {
  float: unset;
  clear: unset;
  margin-block: 1rem;
  margin-inline: auto;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 400px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.section-title\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.section-title) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a FAQ page with an accordion-style structure where question blocks carry a larger bottom margin than their associated answer blocks, and the container itself has generous top and bottom padding to frame the content.
**userInstruction:** The FAQ items all have uniform 1.5rem spacing. To make the accordion pairs clearer, increase the margin below questions to 2rem and decrease the margin below answers to 1rem.
**before:**
```html
…<section class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))">
  …
  <div class="question">…</div>
  …
  <div class="answer">…</div>
  …
</section>…
```
**after:**
```html
…<section class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(0,0,1.5rem)) 
  |.question$blockItem(margin(0,0,2rem)) 
  |.answer$blockItem(margin(0,0,1rem))">
  …
  <div class="question">…</div>
  …
  <div class="answer">…</div>
  …
</section>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.question\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.question) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|\.answer\$blockItem\(margin\(0\,0\,1rem\)\)>:where(.answer) {
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a legal or terms-of-service document with a tight reading width of 700px, major numbered sections receiving extra top margin for separation, and nested sub-items indented with a left margin to indicate hierarchy.
**userInstruction:** The legal document is hard to read because everything is flush left. Add a 1.5rem top margin to the .section dividers and indent the .sub-item elements by 1.5rem.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))$Paragraph(_,breakWord)
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<700px)">
  …
  <div class="section">…</div>
  …
  <div class="sub-item">…</div>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem))$Paragraph(_,breakWord) 
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<700px) 
  |.section$blockItem(margin(1.5rem,0,0)) 
  |.sub-item$blockItem(margin(0,0,0,1.5rem))">
  …
  <div class="section">…</div>
  …
  <div class="sub-item">…</div>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Paragraph\(_\,breakWord\) {
  display: block;
  padding: 1.5rem;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)\$Box\(_\<_\<700px\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 700px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.section\$blockItem\(margin\(1\.5rem\,0\,0\)\)>:where(.section) {
  margin-block: 1.5rem 0;
  margin-inline: 0;
}

.\|\.sub-item\$blockItem\(margin\(0\,0\,0\,1\.5rem\)\)>:where(.sub-item) {
  margin-block: 0;
  margin-inline: 0 1.5rem;
}
```

**description:** A Block layout for a resume or CV with a full-width container, section headings getting a large bottom margin to anchor each section, individual entries with moderate vertical spacing, and fine-detail sub-lines with tight margins.
**userInstruction:** The resume layout is too sparse because every element gets 1.5rem bottom margin. Tighten up the .entry margin to 1rem and the .sub-line margin to 0.5rem, while giving .section-heading a 2rem margin.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))$Paragraph(_,breakWord)
  |*$BlockItem(margin(0,0,1.5rem))">
  …
  <h2 class="section-heading">…</h2>
  …
  <div class="entry">…</div>
  …
  <div class="sub-line">…</div>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem))$Paragraph(_,breakWord) 
  |*$BlockItem(margin(0,0,1.5rem)) 
  |.section-heading$blockItem(margin(0,0,2rem)) 
  |.entry$blockItem(margin(0,0,1rem)) 
  |.sub-line$blockItem(margin(0,0,0.5rem))">
  …
  <h2 class="section-heading">…</h2>
  …
  <div class="entry">…</div>
  …
  <div class="sub-line">…</div>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Paragraph\(_\,breakWord\) {
  display: block;
  padding: 1.5rem;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.section-heading\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.section-heading) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|\.entry\$blockItem\(margin\(0\,0\,1rem\)\)>:where(.entry) {
  margin-block: 0 1rem;
  margin-inline: 0;
}

.\|\.sub-line\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(.sub-line) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a news article with a 600px centered content column, a flush top header with no leading margin, inline pullquotes floating to the end side with a left margin, and paragraphs clearing the end-side float so they always sit below pulled quotes.
**userInstruction:** The layout is mostly complete, but the pullquote is breaking the flow. Make the pullquote float to the end with a 1.5rem margin, and ensure the paragraphs clear the end float so they drop below it properly.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<600px)
  |.header$blockItem(margin(0,0,0))">
  …
  <div class="header">…</div>
  …
  <blockquote class="pullquote">…</blockquote>
  …
  <p class="paragraph">…</p>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(0,0,1.5rem))$Box(_<_<600px) 
  |.header$blockItem(margin(0,0,0)) 
  |.pullquote$blockItem(floatEnd,margin(0,0,1.5rem,1.5rem)) 
  |.paragraph$blockItem(clearEnd,margin(0,0,1.5rem))">
  …
  <div class="header">…</div>
  …
  <blockquote class="pullquote">…</blockquote>
  …
  <p class="paragraph">…</p>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)\$Box\(_\<_\<600px\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 600px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.header\$blockItem\(margin\(0\,0\,0\)\)>:where(.header) {
  margin-block: 0;
  margin-inline: 0;
}

.\|\.pullquote\$blockItem\(floatEnd\,margin\(0\,0\,1\.5rem\,1\.5rem\)\)>:where(.pullquote) {
  margin-block: 0 1.5rem;
  margin-inline: 0 1.5rem;
  float: inline-end;
}

.\|\.paragraph\$blockItem\(clearEnd\,margin\(0\,0\,1\.5rem\)\)>:where(.paragraph) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
  clear: inline-end;
}
```

**description:** A Block layout for a settings or preferences panel with form groups separated by visible top margins, items stacked flush to the container edges with zero inline padding, and the last item in each group carrying no trailing margin.
**userInstruction:** The settings panel forms have too much space after each item, making the groups look disconnected. Remove the margin from the .form-item elements, and separate the .form-group elements with a 1.5rem top margin.
**before:**
```html
…<section class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))">
  …
  <fieldset class="form-group">…</fieldset>
  …
  <div class="form-item">…</div>
  …
</section>…
```
**after:**
```html
…<section class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(0,0,1.5rem)) 
  |.form-group$blockItem(margin(1.5rem,0,0)) 
  |.form-item$blockItem(margin(0,0,0))">
  …
  <fieldset class="form-group">…</fieldset>
  …
  <div class="form-item">…</div>
  …
</section>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.form-group\$blockItem\(margin\(1\.5rem\,0\,0\)\)>:where(.form-group) {
  margin-block: 1.5rem 0;
  margin-inline: 0;
}

.\|\.form-item\$blockItem\(margin\(0\,0\,0\)\)>:where(.form-item) {
  margin-block: 0;
  margin-inline: 0;
}
```

**description:** A Block layout for a user profile page with a centered column up to 500px wide, a top avatar block that has no bottom gap and bleeds into the bio section, followed by stats and action blocks with a consistent small vertical rhythm.
**userInstruction:** The user profile is rendering at full width on large screens. Constrain the children to a max-width of 500px and center them. Also, remove the margin from the avatar so it sits flush against the bio.
**before:**
```html
…<section class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))">
  …
  <div class="avatar">…</div>
  …
  <div class="bio">…</div>
  …
  <div class="stats">…</div>
  …
  <div class="actions">…</div>
  …
</section>…
```
**after:**
```html
…<section class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(0,_))$Box(_<_<500px) 
  |.avatar$blockItem(margin(0)) 
  |.bio$blockItem(margin(0,0,1.5rem)) 
  |.stats$blockItem(margin(0,0,1.5rem)) 
  |.actions$blockItem(margin(0,0,1.5rem))">
  …
  <div class="avatar">…</div>
  …
  <div class="bio">…</div>
  …
  <div class="stats">…</div>
  …
  <div class="actions">…</div>
  …
</section>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,_\)\)\$Box\(_\<_\<500px\)>* {
  float: unset;
  clear: unset;
  margin-block: 0;
  margin-inline: auto;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 500px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.avatar\$blockItem\(margin\(0\)\)>:where(.avatar) {
  margin: 0;
}

.\|\.bio\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.bio) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.stats\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.stats) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.actions\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.actions) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a mobile-first stacked content view where all items are full-width with small vertical margins, the outer container adds horizontal padding that scales with viewport width, and headings receive proportionally larger bottom margins.
**userInstruction:** The current layout uses fixed pixel padding (24px). Change the padding to use responsive 5vw inline padding, and increase the bottom margins for h1, h2, and h3 to improve the visual rhythm on mobile devices.
**before:**
```html
…<main class="
  $Block(padding(1.5rem,24px))
  |*$BlockItem(margin(0,0,1.5rem))">
  …
  <h1>…</h1>
  …
  <h2>…</h2>
  …
  <h3>…</h3>
  …
  <p>…</p>
  …
</main>…
```
**after:**
```html
…<main class="
  $Block(padding(1.5rem,5vw))
  |*$BlockItem(margin(0,0,1.5rem))
  |h1$blockItem(margin(0,0,2.5rem))
  |h2$blockItem(margin(0,0,2rem))
  |h3$blockItem(margin(0,0,1.75rem))
  |p$blockItem(margin(0,0,1.5rem))">
  …
  <h1>…</h1>
  …
  <h2>…</h2>
  …
  <h3>…</h3>
  …
  <p>…</p>
  …
</main>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\,5vw\)\) {
  display: block;
  padding-block: 1.5rem;
  padding-inline: 5vw;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|h1\$blockItem\(margin\(0\,0\,2\.5rem\)\)>:where(h1) {
  margin-block: 0 2.5rem;
  margin-inline: 0;
}

.\|h2\$blockItem\(margin\(0\,0\,2rem\)\)>:where(h2) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|h3\$blockItem\(margin\(0\,0\,1\.75rem\)\)>:where(h3) {
  margin-block: 0 1.75rem;
  margin-inline: 0;
}

.\|p\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(p) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for a recipe page with a large title block carrying extra bottom margin, an ingredients list and step-by-step blocks with tight uniform gaps, and a floating metadata summary anchored to the start side beside the first body paragraph.
**userInstruction:** The metadata aside is taking up too much vertical space. Make it float to the start with some right margin, and ensure the ingredients section clears this float so it drops below properly.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.5rem))
  |.title$blockItem(margin(0,0,2rem))">
  …
  <h1 class="title">…</h1>
  …
  <aside class="metadata">…</aside>
  …
  <ul class="ingredients">…</ul>
  …
  <ol class="steps">…</ol>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem)) 
  |*$BlockItem(margin(0,0,1.5rem)) 
  |.title$blockItem(margin(0,0,2rem)) 
  |.metadata$blockItem(floatStart,margin(0,1.5rem,1rem,0)) 
  |.ingredients$blockItem(clearStart,margin(0,0,1.5rem)) 
  |.steps$blockItem(margin(0,0,1.5rem))">
  …
  <h1 class="title">…</h1>
  …
  <aside class="metadata">…</aside>
  …
  <ul class="ingredients">…</ul>
  …
  <ol class="steps">…</ol>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.title\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.title) {
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|\.metadata\$blockItem\(floatStart\,margin\(0\,1\.5rem\,1rem\,0\)\)>:where(.metadata) {
  margin-block: 0 1rem;
  margin-inline: 1.5rem 0;
  float: inline-start;
}

.\|\.ingredients\$blockItem\(clearStart\,margin\(0\,0\,1\.5rem\)\)>:where(.ingredients) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
  clear: inline-start;
}

.\|\.steps\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.steps) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}
```

**description:** A Block layout for an email newsletter column capped at 600px with centered alignment, alternating section blocks that use top margin to space content rhythmically, and a footer block whose inner content floats to the end side.
**userInstruction:** The newsletter footer content is left-aligned. We need it to float to the end side. Use the double-pipe syntax `||` to apply a floatEnd blockItem to the footer-content class.
**before:**
```html
…<div class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,_))$Box(_<_<600px)
  |.section$blockItem(margin(0,0,1.5rem))
  |.footer$blockItem(margin(0,0,0))">
  …
  <div class="section">…</div>
  …
  <div class="footer">
    …
    <div class="footer-content">…</div>
    …
  </div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,_))$Box(_<_<600px)
  |.section$blockItem(margin(0,0,1.5rem))
  |.footer$blockItem(margin(0,0,0))
  ||.footer-content$blockItem(floatEnd,margin(0))">
  …
  <div class="section">…</div>
  …
  <div class="footer">
    …
    <div class="footer-content">…</div>
    …
  </div>
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\) {
  display: block;
  padding: 1.5rem;
}

.\|\*\$BlockItem\(margin\(0\,_\)\)\$Box\(_\<_\<600px\)>* {
  float: unset;
  clear: unset;
  margin-block: 0;
  margin-inline: auto;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: 600px;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.section\$blockItem\(margin\(0\,0\,1\.5rem\)\)>:where(.section) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
}

.\|\.footer\$blockItem\(margin\(0\,0\,0\)\)>:where(.footer) {
  margin-block: 0;
  margin-inline: 0;
}

.\|\|\.footer-content\$blockItem\(floatEnd\,margin\(0\)\)>:where(.footer-content) {
  margin: 0;
  float: inline-end;
}
```

**description:** A Block layout for a compact dashboard widget with no outer padding, tightly packed rows with only 0.25rem vertical gaps, widget header blocks with a slightly larger bottom margin to separate them from their data rows, and a permanent scrollbar so the layout never shifts when content changes.
**userInstruction:** The widget layout shifts horizontally when the content gets too long and a scrollbar appears. Force the scrollbar to be permanently visible using $Box(scroll) so the layout stays stable, and set a fixed height of 2.5rem for the data rows.
**before:**
```html
…<div class="
  $Block(padding(0))
  |*$BlockItem(margin(0.25rem,0))
  |.widget-header$blockItem(margin(0,0,0.5rem))
  |.data-row$blockItem(margin(0,0,0))">
  …
  <div class="widget-header">…</div>
  …
  <div class="data-row">…</div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(0))$Box(scroll)
  |*$BlockItem(margin(0.25rem,0))
  |.widget-header$blockItem(margin(0,0,0.5rem))
  |.data-row$blockItem(margin(0,0,0))$Box(_,2.5rem)">
  …
  <div class="widget-header">…</div>
  …
  <div class="data-row">…</div>
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(0\)\)\$Box\(scroll\) {
  display: block;
  padding: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: scroll;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\.25rem\,0\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.25rem;
  margin-inline: 0;
}

.\|\.widget-header\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(.widget-header) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
}

.\|\.data-row\$blockItem\(margin\(0\,0\,0\)\)\$Box\(_\,2\.5rem\)>:where(.data-row) {
  margin-block: 0;
  margin-inline: 0;
  block-size: 2.5rem;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:** A full-screen vertical slideshow where each slide fills the viewport height and snaps mandatorily into place, with scroll padding and scroll margin offsetting a fixed 3.5rem top navigation bar, and an intro spacer that is explicitly opted out of snapping.
**userInstruction:** The vertical slideshow is working, but it's snapping to the top of the viewport and hiding behind the 3.5rem fixed navigation bar. Add scrollPadding to the container and scrollMargin to the slides to offset this, and disable snapping entirely on the intro section.
**before:**
```html
…<div class="
  $Block(padding(0))$Box(auto,snapMandatory)
  |*$BlockItem(margin(0))$Box(_,100vh)$BoxItem(snapStart)">
  …
  <div class="intro">…</div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(0))$Box(auto,snapMandatory,scrollPadding(3.5rem,0))
  |*$BlockItem(margin(0))$Box(_,100vh)$BoxItem(snapStart,scrollMargin(3.5rem,0,0))
  |.intro$boxItem(snapNone)">
  …
  <div class="intro">…</div>
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(0\)\)\$Box\(auto\,snapMandatory\,scrollPadding\(3\.5rem\,0\)\) {
  display: block;
  padding: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-snap-type: both mandatory;
  scroll-padding-block: 3.5rem;
  scroll-padding-inline: 0;
}

.\|\*\$BlockItem\(margin\(0\)\)\$Box\(_\,100vh\)\$BoxItem\(snapStart\,scrollMargin\(3\.5rem\,0\,0\)\)>* {
  margin: 0;
  float: unset;
  clear: unset;
  block-size: 100vh;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  scroll-snap-align: start;
  scroll-snap-stop: unset;
  scroll-margin-block: 3.5rem 0;
  scroll-margin-inline: 0;
}

.\|\.intro\$boxItem\(snapNone\)>:where(.intro) {
  scroll-snap-align: none;
}
```

**description:** A long-form article where major section headings softly snap into view when scrolling stops, using scroll margin to keep each section from hiding behind a sticky header, and snapAlways ensures the scroll always comes to rest exactly on a heading.
**userInstruction:** The article scroll snapping isn't strict enough; sometimes users scroll past the h2 or h3 headings without stopping. Add snapAlways to the h2 and h3 headings so the browser is forced to stop at them.
**before:**
```html
…<article class="
  $Block(padding(2rem))$Box(auto,snap,scrollPadding(2rem,0))
  |*$BlockItem(margin(0,0,2rem))
  |h2$boxItem(snapStart,scrollMargin(2rem,0,0))
  |h3$boxItem(snapStart,scrollMargin(2rem,0,0))">
  …
  <h2>…</h2>
  …
  <h3>…</h3>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(2rem))$Box(auto,snap,scrollPadding(2rem,0))
  |*$BlockItem(margin(0,0,2rem))
  |h2$boxItem(snapStart,snapAlways,scrollMargin(2rem,0,0))
  |h3$boxItem(snapStart,snapAlways,scrollMargin(2rem,0,0))">
  …
  <h2>…</h2>
  …
  <h3>…</h3>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(2rem\)\)\$Box\(auto\,snap\,scrollPadding\(2rem\,0\)\) {
  display: block;
  padding: 2rem;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-snap-type: both;
  scroll-padding-block: 2rem;
  scroll-padding-inline: 0;
}

.\|\*\$BlockItem\(margin\(0\,0\,2rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 2rem;
  margin-inline: 0;
}

.\|h2\$boxItem\(snapStart\,snapAlways\,scrollMargin\(2rem\,0\,0\)\)>:where(h2) {
  scroll-margin-block: 2rem 0;
  scroll-margin-inline: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.\|h3\$boxItem\(snapStart\,snapAlways\,scrollMargin\(2rem\,0\,0\)\)>:where(h3) {
  scroll-margin-block: 2rem 0;
  scroll-margin-inline: 0;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

**description:** A tall sidebar panel that scrolls vertically when content overflows but clips any content that spills horizontally, keeping the layout clean without a horizontal scrollbar.
**userInstruction:** The sidebar is displaying a horizontal scrollbar because some text is slightly too wide. Change the overflow from 'auto' to 'autoHidden' so it scrolls vertically but clips horizontally.
**before:**
```html
…<aside class="
  $Block(padding(1rem))$Box(auto)
  |*$BlockItem(margin(0,0,0.5rem))
  |.group-header$blockItem(margin(1.5rem,0,0.5rem))">
  …
  <h3 class="group-header">…</h3>
  …
</aside>…
```
**after:**
```html
…<aside class="
  $Block(padding(1rem))$Box(autoHidden)
  |*$BlockItem(margin(0,0,0.5rem))
  |.group-header$blockItem(margin(1.5rem,0,0.5rem))">
  …
  <h3 class="group-header">…</h3>
  …
</aside>…
```
**css:**
```css
.\$Block\(padding\(1rem\)\)\$Box\(autoHidden\) {
  display: block;
  padding: 1rem;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto hidden;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 0.5rem;
  margin-inline: 0;
}

.\|\.group-header\$blockItem\(margin\(1\.5rem\,0\,0\.5rem\)\)>:where(.group-header) {
  margin-block: 1.5rem 0.5rem;
  margin-inline: 0;
}
```

**description:** A block layout with a start-side figure and an end-side aside that float beside the body text, and a footer that clears both floats to always sit below all floated content.
**userInstruction:** The figure and aside are just full-width blocks right now. Float the figure to the start (40% width) and the aside to the end (30% width). Also, make sure the footer clears both floats so it drops beneath them.
**before:**
```html
…<article class="
  $Block(padding(1.5rem))$Box(hidden)
  |*$BlockItem(margin(0,0,1rem))
  |.footer$blockItem(margin(2rem,0,0))">
  …
  <figure class="figure">…</figure>
  …
  <aside class="aside">…</aside>
  …
  <footer class="footer">…</footer>
  …
</article>…
```
**after:**
```html
…<article class="
  $Block(padding(1.5rem))$Box(hidden)
  |*$BlockItem(margin(0,0,1rem))
  |.figure$blockItem(floatStart,margin(0,1.5rem,1rem,0))$Box(40%)
  |.aside$blockItem(floatEnd,margin(0,0,1rem,1.5rem))$Box(30%)
  |.footer$blockItem(clear,margin(2rem,0,0))">
  …
  <figure class="figure">…</figure>
  …
  <aside class="aside">…</aside>
  …
  <footer class="footer">…</footer>
  …
</article>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Box\(hidden\) {
  display: block;
  padding: 1.5rem;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: hidden;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
}

.\|\.figure\$blockItem\(floatStart\,margin\(0\,1\.5rem\,1rem\,0\)\)\$Box\(40\%\)>:where(.figure) {
  margin-block: 0 1rem;
  margin-inline: 1.5rem 0;
  float: inline-start;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 40%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.aside\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1\.5rem\)\)\$Box\(30\%\)>:where(.aside) {
  margin-block: 0 1rem;
  margin-inline: 0 1.5rem;
  float: inline-end;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 30%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.footer\$blockItem\(clear\,margin\(2rem\,0\,0\)\)>:where(.footer) {
  margin-block: 2rem 0;
  margin-inline: 0;
  clear: both;
}
```

**description:** A content block for East Asian text where words must never be broken mid-word at line ends, giving natural CJK line-breaking with generous paragraph spacing.
**userInstruction:** This CJK text is breaking in the middle of words. Apply the breakLongWords modifier to the $Paragraph umbrella to enforce keep-all word breaking.
**before:**
```html
…<div class="
  $Block(padding(1.5rem))
  |*$BlockItem(margin(0,0,1.25rem))
  |h2$blockItem(margin(0,0,1.75rem))">
  …
  <h2>…</h2>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1.5rem))$Paragraph(_,breakLongWords)
  |*$BlockItem(margin(0,0,1.25rem))
  |h2$blockItem(margin(0,0,1.75rem))">
  …
  <h2>…</h2>
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Paragraph\(_\,breakLongWords\) {
  display: block;
  padding: 1.5rem;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: break-word;
  word-break: keep-all;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,1\.25rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 1.25rem;
  margin-inline: 0;
}

.\|h2\$blockItem\(margin\(0\,0\,1\.75rem\)\)>:where(h2) {
  margin-block: 0 1.75rem;
  margin-inline: 0;
}
```

**description:** A debug log or hash-display panel where every character is an eligible break point so that long unbreakable strings like SHA hashes or minified code never overflow their container.
**userInstruction:** Long SHA hashes are overflowing the debug panel horizontally. Use breakAnywhere on the $Paragraph umbrella to allow breaking at any character.
**before:**
```html
…<div class="
  $Block(padding(1rem))
  |*$BlockItem(margin(0,0,0.25rem))
  |.log-entry$blockItem(margin(0,0,0.5rem))$Box(100%)">
  …
  <div class="log-entry">…</div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1rem))$Paragraph(_,breakAnywhere)
  |*$BlockItem(margin(0,0,0.25rem))
  |.log-entry$blockItem(margin(0,0,0.5rem))$Box(100%)">
  …
  <div class="log-entry">…</div>
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(1rem\)\)\$Paragraph\(_\,breakAnywhere\) {
  display: block;
  padding: 1rem;
  line-height: unset;
  text-indent: unset;
  word-spacing: unset;
  hyphens: unset;
  white-space: unset;
  overflow-wrap: anywhere;
  word-break: normal;
  line-break: unset;
  text-align: unset;
  text-align-last: unset;
  hanging-punctuation: unset;
}

.\|\*\$BlockItem\(margin\(0\,0\,0\.25rem\)\)>* {
  float: unset;
  clear: unset;
  margin-block: 0 0.25rem;
  margin-inline: 0;
}

.\|\.log-entry\$blockItem\(margin\(0\,0\,0\.5rem\)\)\$Box\(100\%\)>:where(.log-entry) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:** A square thumbnail gallery where each item is a fixed 10rem by 10rem block centered horizontally with auto inline margins, and each thumbnail snaps to center as the user scrolls through the stack.
**userInstruction:** The thumbnail gallery is scrolling freely. Add snapping so it stops on each item, and configure the items to snap to the center of the viewport.
**before:**
```html
…<div class="
  $Block(padding(1.5rem))$Box(auto)
  |*$BlockItem(margin(0.5rem,_))$Box(10rem,10rem)">
  …
</div>…
```
**after:**
```html
…<div class="
  $Block(padding(1.5rem))$Box(auto,snap)
  |*$BlockItem(margin(0.5rem,_))$Box(10rem,10rem)$BoxItem(snapCenter)">
  …
</div>…
```
**css:**
```css
.\$Block\(padding\(1\.5rem\)\)\$Box\(auto\,snap\) {
  display: block;
  padding: 1.5rem;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-padding: unset;
  scroll-snap-type: both;
}

.\|\*\$BlockItem\(margin\(0\.5rem\,_\)\)\$Box\(10rem\,10rem\)\$BoxItem\(snapCenter\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.5rem;
  margin-inline: auto;
  block-size: 10rem;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 10rem;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  scroll-margin: unset;
  scroll-snap-align: center;
  scroll-snap-stop: unset;
}
```