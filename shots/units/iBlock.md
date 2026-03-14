$IBlock — reset defaults

**description:** Full display:inline-block reset with centered text.
**csss:** $IBlock()$paragraph(center)
**css:**
```css
.\$IBlock\(\)\$paragraph\(center\) {
  display: inline-block;
  text-align: center;
}
```

$iBlock — container

**description:** Sets centered text or hides overflow on an inline-block container.
**csss:**
$iBlock()$paragraph(center)
$iBlock(overflowHidden)
**css:**
```css
.\$iBlock\(\)\$paragraph\(center\) {
  text-align: center;
}

.\$iBlock\(overflowHidden\) {
  overflow: hidden;
}
```

$iBlockItem — margin

**description:** Resets defaults and sets margins on inline-block children.
**csss:**
|*$IBlockItem(margin(1rem,0,0.5rem))
|*$iBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\|\*\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}

.\|\*\$iBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

$iBlockItem — vertical alignment and size

**description:** Sets vertical alignment or specific sizing on inline-block children.
**csss:**
|*$iBlockItem(alignMiddle)
|*$iBlockItem(alignTop)
|*$iBlockItem(inlineSize(200px))
**css:**
```css
.\|\*\$iBlockItem\(alignMiddle\)>* {
  vertical-align: middle;
}

.\|\*\$iBlockItem\(alignTop\)>* {
  vertical-align: top;
}

.\|\*\$iBlockItem\(inlineSize\(200px\)\)>* {
  inline-size: 200px;
}
```
