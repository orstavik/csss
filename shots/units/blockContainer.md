**csss:** $block(textJustify)
**css:**
```css
@layer containerDefault {
  .\$block\(textJustify\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: justify;
    text-indent: unset;
  }
}
```

**csss:** $block(textCenter)
**css:**
```css
@layer containerDefault {
  .\$block\(textCenter\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: center;
    text-indent: unset;
  }
}
```

**csss:** $block(textStart)
**css:**
```css
@layer containerDefault {
  .\$block\(textStart\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: start;
    text-indent: unset;
  }
}
```

**csss:** $block(textEnd)
**css:**
```css
@layer containerDefault {
  .\$block\(textEnd\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: end;
    text-indent: unset;
  }
}
```

**csss:** $block(gap(0.5rem,1.8))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\.5rem\,1\.8\)\) {
    display: block;
    word-spacing: 0.5rem;
    line-height: 1.8;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(gap(0,1.2))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\,1\.2\)\) {
    display: block;
    word-spacing: 0;
    line-height: 1.2;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHidden\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    overflow: scroll;
  }
}
```

**csss:** $block(overflowHiddenScroll)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHiddenScroll\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    overflow-block: hidden;
    overflow-inline: scroll;
  }
}
```

**csss:** $font(hyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(hyphens\) {
    font-family: hyphens, var(--hyphensFontFamily, unset);
    font-size: var(--hyphensFontSize, unset);
    font-style: var(--hyphensFontStyle, unset);
    font-weight: var(--hyphensFontWeight, unset);
    font-size-adjust: var(--hyphensFontSizeAdjust, unset);
    letter-spacing: var(--hyphensLetterSpacing, unset);
    text-transform: var(--hyphensTextTransform, unset);
    font-width: var(--hyphensFontWidth, unset);
    font-variant-caps: var(--hyphensFontVariantCaps, unset);
    font-synthesis: var(--hyphensFontSynthesis, unset);
    font-feature-settings: var(--hyphensFontFeatureSettings, unset);
    font-variation-settings: var(--hyphensFontVariationSettings, unset);
    -webkit-font-smoothing: var(--hyphensWebkitFontSmoothing, unset);
    -moz-osx-font-smoothing: var(--hyphensMozOsxFontSmoothing, unset);
    font-kerning: var(--hyphensFontKerning, unset);
    hyphens: var(--hyphensHyphens, unset);
    font-stretch: var(--hyphensFontWidth, unset);
  }
}
```

**csss:** $block(breakWord)
**css:**
```css
@layer containerDefault {
  .\$block\(breakWord\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    overflow-wrap: break-word;
  }
}
```

**csss:** $block(breakAll)
**css:**
```css
@layer containerDefault {
  .\$block\(breakAll\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    word-break: break-all;
  }
}
```

**csss:** $lineClamp(3)
**css:**
```css
@layer containerDefault {
  .\$lineClamp\(3\) {
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