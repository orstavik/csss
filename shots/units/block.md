**csss:** $block(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHidden\) {
    overflow: hidden;
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

---

**csss:**
$Block(padding(1.5rem))
|$BlockItem(margin(0,0,1rem))
**css:**
```css
@layer containerDefault {
  .\$Block\(padding\(1\.5rem\)\) {
    display: block;
    padding: 1.5rem;
  }
}

@layer itemsDefault {
  .\|\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}
```

**csss:**
$Block(padding(2rem),breakWord)
|*$BlockItem(margin(0,0,1.5rem))
|img$BlockItem(floatStart,margin(0,1rem,1rem,0))
**css:**
```css
@layer containerDefault {
  .\$Block\(padding\(2rem\)\,breakWord\) {
    display: block;
    padding: 2rem;
    overflow-wrap: break-word;
  }
}

@layer items {
  .\|\*\$BlockItem\(margin\(0\,0\,1\.5rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1.5rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}

@layer items {
  .\|img\$BlockItem\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(img) {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1rem;
    margin-inline: 1rem 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
    float: inline-start;
  }
}
```

**csss:**
$Block(padding(1rem),overflowHidden)
|.note$BlockItem(floatEnd,margin(0,0,1rem,1.5rem))
|p$BlockItem(margin(0,0,0.75rem))
**css:**
```css
@layer containerDefault {
  .\$Block\(padding\(1rem\)\,overflowHidden\) {
    display: block;
    padding: 1rem;
    overflow: hidden;
  }
}

@layer items {
  .\|\.note\$BlockItem\(floatEnd\,margin\(0\,0\,1rem\,1\.5rem\)\)>:where(.note) {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1rem;
    margin-inline: 0 1.5rem;
    scroll-margin: unset;
    scroll-snap-align: unset;
    float: inline-end;
  }
}

@layer items {
  .\|p\$BlockItem\(margin\(0\,0\,0\.75rem\)\)>:where(p) {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 0.75rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}
```
