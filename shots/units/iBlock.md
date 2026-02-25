**csss:** $IBlock()$paragraph(center)
**css:**
```css
@layer containerDefault {
  .\$IBlock\(\)\$paragraph\(center\) {
    display: inline-block;
    text-align: center;
  }
}
```

**csss:** $iBlock()$paragraph(center)
**css:**
```css
@layer containerDefault {
  .\$iBlock\(\)\$paragraph\(center\) {
    text-align: center;
  }
}
```

**csss:** $iBlock(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$iBlock\(overflowHidden\) {
    overflow: hidden;
  }
}
```

**csss:** |*$iBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}
```

**csss:** |*$iBlockItem(alignMiddle)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignMiddle\)>* {
    vertical-align: middle;
  }
}
```

**csss:** |*$iBlockItem(alignTop)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignTop\)>* {
    vertical-align: top;
  }
}
```

**csss:** |*$iBlockItem(inlineSize(200px))
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(inlineSize\(200px\)\)>* {
    inline-size: 200px;
  }
}
```

---

**csss:**
$IBlock()$paragraph(center)
|*$IBlockItem(margin(0,0,0.5rem),alignMiddle)
**css:**
```css
@layer containerDefault {
  .\$IBlock\(\)\$paragraph\(center\) {
    display: inline-block;
    text-align: center;
  }
}

@layer items {
  .\|\*\$IBlockItem\(margin\(0\,0\,0\.5rem\)\,alignMiddle\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 0.5rem;
    margin-inline: 0;
    scroll-margin: unset;
    scroll-snap-align: unset;
    vertical-align: middle;
  }
}
```

**csss:**
$IBlock(overflowHidden)
|*$IBlockItem(inlineSize(200px),alignTop)
|img:first-of-type$IBlockItem(inlineSize(100%),alignMiddle)
**css:**
```css
@layer containerDefault {
  .\$IBlock\(overflowHidden\) {
    display: inline-block;
    overflow: hidden;
  }
}

@layer items {
  .\|\*\$IBlockItem\(inlineSize\(200px\)\,alignTop\)>* {
    inline-size: 200px;
    block-size: unset;
    margin-block: unset;
    margin-inline: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
    vertical-align: top;
  }
}

@layer items {
  .\|img\:first-of-type\$IBlockItem\(inlineSize\(100\%\)\,alignMiddle\)>:where(img:first-of-type) {
    inline-size: 100%;
    block-size: unset;
    margin-block: unset;
    margin-inline: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
    vertical-align: middle;
  }
}
```