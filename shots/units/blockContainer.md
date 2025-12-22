**csss:** $block(textJustify)
**css:**
```css
@layer containerDefault {
  .\$block\(textJustify\) {
    text-align: justify;
  }
}
```

**csss:** $block(textCenter)
**css:**
```css
@layer containerDefault {
  .\$block\(textCenter\) {
    text-align: center;
  }
}
```

**csss:** $block(textStart)
**css:**
```css
@layer containerDefault {
  .\$block\(textStart\) {
    text-align: start;
  }
}
```

**csss:** $block(textEnd)
**css:**
```css
@layer containerDefault {
  .\$block\(textEnd\) {
    text-align: end;
  }
}
```

**csss:** $block(gap(0.5rem,1.8))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\.5rem\,1\.8\)\) {
    word-spacing: 0.5rem;
    line-height: 1.8;
  }
}
```

**csss:** $block(gap(0,1.2))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\,1\.2\)\) {
    word-spacing: 0;
    line-height: 1.2;
  }
}
```

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
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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