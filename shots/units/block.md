**description:** Hides overflowing content on a block container.
**csss:** $block()$box(overflowHidden)
**css:**
```css
.\$block\(overflowHidden\) {
  overflow: hidden;
}
```

**description:** Enables scrolling for overflowing block content.
**csss:** $block()$box(overflowScroll)
**css:**
```css
.\$block\(overflowScroll\) {
  overflow: scroll;
}
```

**description:** Hides block overflow but allows inline scrolling.
**csss:** $block()$box(overflowHiddenScroll)
**css:**
```css
.\$block\(overflowHiddenScroll\) {
  overflow-block: hidden;
  overflow-inline: scroll;
}
```

**description:** Sets auto overflow with centered text alignment.
**csss:** $block()$box(overflowAuto)$paragraph(center)
**css:**
```css
.\$block\(overflowAuto\)\$paragraph\(center\) {
  overflow: auto;
  text-align: center;
}
```

**description:** Enables word breaking at overflow boundaries.
**csss:** $block(breakWord)
**css:**
```css
.\$block\(breakWord\) {
  overflow-wrap: break-word;
}
```

**description:** Breaks words at any character to prevent overflow.
**csss:** $block(breakAll)
**css:**
```css
.\$block\(breakAll\) {
  word-break: break-all;
}
```

**description:** Clamps text to 3 visible lines with overflow hidden (uppercase variant).
**csss:** $LineClamp(3)
**css:**
```css
.\$LineClamp\(3\) {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-block: hidden;
}
```

**description:** Clamps text to 3 visible lines with overflow hidden.
**csss:** $lineClamp(3)
**css:**
```css
.\$lineClamp\(3\) {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow-block: hidden;
}
```

**description:** Adds 1.5rem padding to a block container.
**csss:** 
$block(padding(1.5rem))
|*$blockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$block\(padding\(1\.5rem\)\) {
  padding: 1.5rem;
}

.\|\*\$blockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:** Sets inline-size to 200px on a block item.
**csss:** $blockItem()$boxItem(inlineSize(200px))
**css:**
```css
.\$blockItem\(inlineSize\(200px\)\) {
  inline-size: 200px;
}
```

**description:** Sets block-size to 50px on a block item.
**csss:** $blockItem()$boxItem(blockSize(50px))
**css:**
```css
.\$blockItem\(blockSize\(50px\)\) {
  block-size: 50px;
}
```

**description:** Sets explicit inline-size and block-size on a block item.
**csss:** $blockItem()$boxItem(size(60px,100px))
**css:**
```css
.\$blockItem\(size\(60px\,100px\)\) {
  inline-size: 60px;
  block-size: 100px;
}
```

**description:** Caps max inline-size at 600px with unset min and default.
**csss:** $blockItem()$boxItem(inlineSize(_,_,600px))
**css:**
```css
.\$blockItem\(inlineSize\(_\,_\,600px\)\) {
  min-inline-size: unset;
  inline-size: unset;
  max-inline-size: 600px;
}
```

**description:** Resets all BlockItem defaults and sets margin on all children.
**csss:** |*$BlockItem(margin(0,0,1rem))
**css:**
```css
.\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0 1rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** Sets block-start margin to 2rem with zero elsewhere.
**csss:** $blockItem(margin(2rem,0,0,0))
**css:**
```css
.\$blockItem\(margin\(2rem\,0\,0\,0\)\) {
  margin-block: 2rem 0;
  margin-inline: 0;
}
```

**description:** Sets 0.5rem block and 1rem inline margins on all children.
**csss:** |*$blockItem(margin(0.5rem,1rem))
**css:**
```css
.\|\*\$blockItem\(margin\(0\.5rem\,1rem\)\)>* {
  margin-block: 0.5rem;
  margin-inline: 1rem;
}
```

**description:** Adds 1rem bottom margin on all children with 2em text indent.
**csss:** |*$blockItem(margin(0,0,1rem))$paragraph(indent(2em))
**css:**
```css
.\|\*\$blockItem\(margin\(0\,0\,1rem\)\)\$paragraph\(indent\(2em\)\)>* {
  margin-block: 0 1rem;
  margin-inline: 0;
  text-indent: 2em;
}
```

**description:** Sets bottom margin on .title children with no text indent.
**csss:** |.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
**css:**
```css
.\|\.title\$blockItem\(margin\(0\,0\,2rem\)\)\$paragraph\(indent\(0\)\)>:where(.title) {
  margin-block: 0 2rem;
  margin-inline: 0;
  text-indent: 0;
}
```

**description:** Sets bottom margin on .subtitle children with 1em indent.
**csss:** |.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))
**css:**
```css
.\|\.subtitle\$blockItem\(margin\(0\,0\,1\.5rem\)\)\$paragraph\(indent\(1em\)\)>:where(.subtitle) {
  margin-block: 0 1.5rem;
  margin-inline: 0;
  text-indent: 1em;
}
```

**description:** Adds 1rem bottom margin to paragraph children.
**csss:** |p$blockItem(margin(0,0,1rem))
**css:**
```css
.\|p\$blockItem\(margin\(0\,0\,1rem\)\)>:where(p) {
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** Adds 0.5rem bottom margin to h4 children.
**csss:** |h4$blockItem(margin(0,0,0.5rem))
**css:**
```css
.\|h4\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
  margin-block: 0 0.5rem;
  margin-inline: 0;
}
```

**description:** Adds 2rem bottom margin to .intro children.
**csss:** |.intro$blockItem(margin(0,0,2rem))
**css:**
```css
.\|\.intro\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.intro) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```

**description:** Adds 1rem bottom margin to .content children.
**csss:** |.content$blockItem(margin(0,0,1rem))
**css:**
```css
.\|\.content\$blockItem\(margin\(0\,0\,1rem\)\)>:where(.content) {
  margin-block: 0 1rem;
  margin-inline: 0;
}
```

**description:** Floats .start child to inline-start with margin.
**csss:** |.start$blockItem(floatStart,margin(0.5rem,0,0,0))
**css:**
```css
.\|\.start\$blockItem\(floatStart\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.start) {
  float: inline-start;
  margin-block: 0.5rem 0;
  margin-inline: 0;
}
```

**description:** Floats .end child to inline-end with margin.
**csss:** |.end$blockItem(floatEnd,margin(0.5rem,0,0,0))
**css:**
```css
.\|\.end\$blockItem\(floatEnd\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.end) {
  float: inline-end;
  margin-block: 0.5rem 0;
  margin-inline: 0;
}
```

**description:** Floats .box child to inline-start with asymmetric margins.
**csss:** |.box$blockItem(floatStart,margin(0,1rem,1rem,0))
**css:**
```css
.\|\.box\$blockItem\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(.box) {
  float: inline-start;
  margin-block: 0 1rem;
  margin-inline: 1rem 0;
}
```

**description:** Floats .note child to inline-end with surrounding margins.
**csss:** |.note$blockItem(floatEnd,margin(0,0,1rem,1rem))
**css:**
```css
.\|\.note\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
  float: inline-end;
  margin-block: 0 1rem;
  margin-inline: 0 1rem;
}
```
