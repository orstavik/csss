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
  inline-size: unset;
  block-size: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** An IBlock stat row with hidden overflow, padding, and shared spacing.
**csss:**
$IBlock(overflowHidden,padding(0.5rem))
|$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
.\$IBlock\(overflowHidden\,padding\(0\.5rem\)\) {
  display: inline-block;
  overflow: hidden;
  padding: 0.5rem;
}

.\|\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
  scroll-margin: unset;
  scroll-snap-align: unset;
}
```

**description:** An IBlock card row with padding, fixed width, and mixed alignment, where edge items can opt into top alignment.
**csss:**
$IBlock(padding(1rem))$paragraph(center)
|$IBlockItem(inlineSize(200px),alignMiddle)
|.edge$iBlockItem(alignTop)
**css:**
```css
.\$IBlock\(padding\(1rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 1rem;
  text-align: center;
}

.\|\$IBlockItem\(inlineSize\(200px\)\,alignMiddle\)>* {
  inline-size: 200px;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  vertical-align: middle;
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
|.card$iBlockItem(inlineSize(240px))
|.meta$iBlockItem(inlineSize(120px),alignTop)
**css:**
```css
.\$IBlock\(padding\(0\.75rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.75rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(0\.5rem\,1rem\)\,alignMiddle\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
  scroll-margin: unset;
  scroll-snap-align: unset;
  vertical-align: middle;
}

.\|\.card\$iBlockItem\(inlineSize\(240px\)\)>:where(.card) {
  inline-size: 240px;
}

.\|\.meta\$iBlockItem\(inlineSize\(120px\)\,alignTop\)>:where(.meta) {
  inline-size: 120px;
  vertical-align: top;
}
```
