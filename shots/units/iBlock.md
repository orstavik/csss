$IBlock — reset defaults

**description:** Full display:inline-block reset with centered text.
**csss:** $IBlock$paragraph(center)
**css:**
```css
.\$IBlock\$paragraph\(center\) {
  display: inline-block;
  text-align: center;
}
```

$iBlock — container

**description:** Sets centered text on an inline-block container.
**csss:** $paragraph(center)
**css:**
```css
.\$paragraph\(center\) {
  text-align: center;
}
```

**description:** Hides overflow on an inline-block container.
**csss:** $box(overflowHidden)
**css:**
```css
.\$box\(overflowHidden\) {
  overflow: hidden;
}
```

$iBlockItem — margin

**description:** Sets block margin on all inline-block children.
**csss:** |*$iBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\|\*\$iBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

$IBlockItem — reset defaults

**description:** Resets all IBlockItem defaults and sets margin on all children.
**csss:** |*$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\|\*\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

$iBlockItem — vertical alignment

**description:** Vertically aligns all children to middle.
**csss:** |*$iBlockItem(alignMiddle)
**css:**
```css
.\|\*\$iBlockItem\(alignMiddle\)>* {
  vertical-align: middle;
}
```

**description:** Vertically aligns all children to top.
**csss:** |*$iBlockItem(alignTop)
**css:**
```css
.\|\*\$iBlockItem\(alignTop\)>* {
  vertical-align: top;
}
```

$iBlockItem — size

**description:** Sets inline-size to 200px on all inline-block children.
**csss:** |*$Box(size(200px))
**css:**
```css
.\|\*\$Box\(size\(200px\)\)>* {
  inline-size: 200px;
  block-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```
