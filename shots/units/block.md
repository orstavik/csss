**csss:** $block(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHidden\) {
    overflow: hidden;
  }
}
```

**csss:** $blockItem(inlineSize(200px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(inlineSize\(200px\)\) {
    inline-size: 200px;
  }
}
```

**csss:** $blockItem(blockSize(50px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(blockSize\(50px\)\) {
    block-size: 50px;
  }
}
```

**csss:** $block(overflowScroll)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowScroll\) {
    overflow: scroll;
  }
}
```

**csss:** $block(overflowHiddenScroll)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHiddenScroll\) {
    overflow-block: hidden;
    overflow-inline: scroll;
  }
}
```

**csss:** $block(breakWord)
**css:**
```css
@layer containerDefault {
  .\$block\(breakWord\) {
    overflow-wrap: break-word;
  }
}
```

**csss:** $block(breakAll)
**css:**
```css
@layer containerDefault {
  .\$block\(breakAll\) {
    word-break: break-all;
  }
}
```

**csss:** $LineClamp(3)
**css:**
```css
@layer containerDefault {
  .\$LineClamp\(3\) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-block: hidden;
  }
}
```

**csss:** $lineClamp(3)
**css:**
```css
@layer containerDefault {
  .\$lineClamp\(3\) {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-block: hidden;
  }
}
```

**csss:** $block(overflowAuto)$paragraph(center)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowAuto\)\$paragraph\(center\) {
    overflow: auto;
    text-align: center;
  }
}
```

**csss:** 
$block(padding(1.5rem))
|*$blockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer containerDefault {
  .\$block\(padding\(1\.5rem\)\) {
    padding: 1.5rem;
  }
}
@layer items {
  .\|\*\$blockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$BlockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}
```

**csss:** $blockItem(margin(2rem,0,0,0))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(margin\(2rem\,0\,0\,0\)\) {
    margin-block: 2rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |.start$blockItem(floatStart,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.start\$blockItem\(floatStart\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.start) {
    float: inline-start;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |.end$blockItem(floatEnd,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.end\$blockItem\(floatEnd\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.end) {
    float: inline-end;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** $blockItem(size(60px,100px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(size\(60px\,100px\)\) {
    inline-size: 60px;
    block-size: 100px;
  }
}
```

**csss:** |*$blockItem(margin(0,0,1rem))$paragraph(indent(2em))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(0\,0\,1rem\)\)\$paragraph\(indent\(2em\)\)>* {
    margin-block: 0 1rem;
    margin-inline: 0;
    text-indent: 2em;
  }
}
```

**csss:** |.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
**css:**
```css
@layer items {
  .\|\.title\$blockItem\(margin\(0\,0\,2rem\)\)\$paragraph\(indent\(0\)\)>:where(.title) {
    margin-block: 0 2rem;
    margin-inline: 0;
    text-indent: 0;
  }
}
```

**csss:** |.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))
**css:**
```css
@layer items {
  .\|\.subtitle\$blockItem\(margin\(0\,0\,1\.5rem\)\)\$paragraph\(indent\(1em\)\)>:where(.subtitle) {
    margin-block: 0 1.5rem;
    margin-inline: 0;
    text-indent: 1em;
  }
}
```

**csss:** $blockItem(inlineSize(_,_,600px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(inlineSize\(_\,_\,600px\)\) {
    min-inline-size: unset;
    inline-size: unset;
    max-inline-size: 600px;
  }
}
```

**csss:** |*$blockItem(margin(0.5rem,1rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(0\.5rem\,1rem\)\)>* {
    margin-block: 0.5rem;
    margin-inline: 1rem;
  }
}
```

**csss:** |.box$blockItem(floatStart,margin(0,1rem,1rem,0))
**css:**
```css
@layer items {
  .\|\.box\$blockItem\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(.box) {
    float: inline-start;
    margin-block: 0 1rem;
    margin-inline: 1rem 0;
  }
}
```

**csss:** |p$blockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|p\$blockItem\(margin\(0\,0\,1rem\)\)>:where(p) {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |h4$blockItem(margin(0,0,0.5rem))
**css:**
```css
@layer items {
  .\|h4\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
    margin-block: 0 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |.intro$blockItem(margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.intro\$blockItem\(margin\(0\,0\,2rem\)\)>:where(.intro) {
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```

**csss:** |.content$blockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\.content\$blockItem\(margin\(0\,0\,1rem\)\)>:where(.content) {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |.note$blockItem(floatEnd,margin(0,0,1rem,1rem))
**css:**
```css
@layer items {
  .\|\.note\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
    float: inline-end;
    margin-block: 0 1rem;
    margin-inline: 0 1rem;
  }
}
```