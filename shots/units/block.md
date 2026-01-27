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

**csss:** $block(padding(1.5rem))
**css:**
```css
@layer containerDefault {
  .\$block\(padding\(1\.5rem\)\) {
    padding: 1.5rem;
  }
}
```