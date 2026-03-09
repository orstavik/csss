$IBlock — reset defaults

**description:** Full display:inline-block reset with centered text.
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

$iBlock — container

**description:** Sets centered text on an inline-block container.
**csss:** $iBlock()$paragraph(center)
**css:**
```css
@layer containerDefault {
  .\$iBlock\(\)\$paragraph\(center\) {
    text-align: center;
  }
}
```

**description:** Hides overflow on an inline-block container.
**csss:** $iBlock(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$iBlock\(overflowHidden\) {
    overflow: hidden;
  }
}
```

$iBlockItem — margin

**description:** Sets block margin on all inline-block children.
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

$IBlockItem — reset defaults

**description:** Resets all IBlockItem defaults and sets margin on all children.
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

$iBlockItem — vertical alignment

**description:** Vertically aligns all children to middle.
**csss:** |*$iBlockItem(alignMiddle)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignMiddle\)>* {
    vertical-align: middle;
  }
}
```

**description:** Vertically aligns all children to top.
**csss:** |*$iBlockItem(alignTop)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignTop\)>* {
    vertical-align: top;
  }
}
```

$iBlockItem — size

**description:** Sets inline-size to 200px on all inline-block children.
**csss:** |*$iBlockItem(inlineSize(200px))
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(inlineSize\(200px\)\)>* {
    inline-size: 200px;
  }
}
```
