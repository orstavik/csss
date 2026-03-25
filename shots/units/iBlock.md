**description:** An IBlock badge row with centered text, padding, and even spacing.
**csss:**
$IBlock(padding(0.5rem))$paragraph(center)
|$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.5rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:** An IBlock stat row with hidden overflow, padding, and shared spacing.
**csss:**
$IBlock(padding(0.5rem))$box(hidden)
|$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$box\(hidden\) {
  display: inline-block;
  padding: 0.5rem;
  overflow: hidden;
}

.\|\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```

**description:** An IBlock card row with padding, fixed width, and mixed alignment, where edge items can opt into top alignment.
**csss:**
$IBlock(padding(1rem))$paragraph(center)
|$IBlockItem(alignMiddle)$Box(inline(200px))
|.edge$iBlockItem(alignTop)
**css:**
```css
.\$IBlock\(padding\(1rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 1rem;
  text-align: center;
}

.\|\$IBlockItem\(alignMiddle\)\$Box\(inline\(200px\)\)>* {
  margin: unset;
  float: unset;
  clear: unset;
  vertical-align: middle;
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

.\|\.edge\$iBlockItem\(alignTop\)>:where(.edge) {
  vertical-align: top;
}
```

**description:** An inline media row with centered text and mixed top and middle alignment.
**csss:**
$IBlock(padding(0.5rem))$paragraph(center)
|.lead$iBlockItem(alignTop,margin(0,1rem,1rem,0))
|.cta$iBlockItem(alignMiddle)
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.5rem;
  text-align: center;
}

.\|\.lead\$iBlockItem\(alignTop\,margin\(0\,1rem\,1rem\,0\)\)>:where(.lead) {
  vertical-align: top;
  margin-block: 0 1rem;
  margin-inline: 1rem 0;
}

.\|\.cta\$iBlockItem\(alignMiddle\)>:where(.cta) {
  vertical-align: middle;
}
```

**description:** An IBlock metadata row with padding, shared spacing, plus width and alignment overrides on selected items.
**csss:**
$IBlock(padding(0.75rem))$paragraph(center)
|$IBlockItem(margin(0.5rem,1rem),alignMiddle)
|.card$box(inline(240px))
|.meta$iBlockItem(alignTop)$box(inline(120px))
**css:**
```css
.\$IBlock\(padding\(0\.75rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.75rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(0\.5rem\,1rem\)\,alignMiddle\)>* {
  float: unset;
  clear: unset;
  vertical-align: middle;
  margin-block: 0.5rem;
  margin-inline: 1rem;
}

.\|\.card\$box\(inline\(240px\)\)>:where(.card) {
  inline-size: 240px;
}

.\|\.meta\$iBlockItem\(alignTop\)\$box\(inline\(120px\)\)>:where(.meta) {
  vertical-align: top;
  inline-size: 120px;
}
```
