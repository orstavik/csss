**description:**
An IBlock badge row with centered text, padding, and even spacing.
**csss:**
```csss
$IBlock(padding(0.5rem))$paragraph(center)
|$IBlockItem(margin(1rem,0,0.5rem))
```
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
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```
**description:**
An IBlock stat row with hidden overflow, padding, and shared spacing.
**csss:**
```csss
$IBlock(padding(0.5rem))$box(hidden)
|$IBlockItem(margin(1rem,0,0.5rem))
```
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
  margin-block: 1rem 0.5rem;
  margin-inline: 0;
}
```
**description:**
An IBlock card row with padding, fixed width, and mixed alignment, where edge items can opt into top alignment.
**csss:**
```csss
$IBlock(padding(1rem))$paragraph(center)
|$paragraphItem(middle)$Box(200px)
|.edge$paragraphItem(top)
```
**css:**
```css
.\$IBlock\(padding\(1rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 1rem;
  text-align: center;
}

.\|\$paragraphItem\(middle\)\$Box\(200px\)>* {
  vertical-align: middle;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 200px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}

.\|\.edge\$paragraphItem\(top\)>:where(.edge) {
  vertical-align: top;
}
```
**description:**
An inline media row with centered text and mixed top and middle alignment.
**csss:**
```csss
$IBlock(padding(0.5rem))$paragraph(center)
|.lead$iBlockItem(margin(0,1rem,1rem,0))$paragraphItem(top)
|.cta$paragraphItem(middle)
```
**css:**
```css
.\$IBlock\(padding\(0\.5rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.5rem;
  text-align: center;
}

.\|\.lead\$iBlockItem\(margin\(0\,1rem\,1rem\,0\)\)\$paragraphItem\(top\)>:where(.lead) {
  margin-block: 0 1rem;
  margin-inline: 1rem 0;
  vertical-align: top;
}

.\|\.cta\$paragraphItem\(middle\)>:where(.cta) {
  vertical-align: middle;
}
```
**description:**
An IBlock metadata row with padding, shared spacing, plus width and alignment overrides on selected items.
**csss:**
```csss
$IBlock(padding(0.75rem))$paragraph(center)
|$IBlockItem(margin(0.5rem,1rem))$paragraphItem(middle)
|.card$box(240px)
|.meta$box(120px)$paragraphItem(top)
```
**css:**
```css
.\$IBlock\(padding\(0\.75rem\)\)\$paragraph\(center\) {
  display: inline-block;
  padding: 0.75rem;
  text-align: center;
}

.\|\$IBlockItem\(margin\(0\.5rem\,1rem\)\)\$paragraphItem\(middle\)>* {
  float: unset;
  clear: unset;
  margin-block: 0.5rem;
  margin-inline: 1rem;
  vertical-align: middle;
}

.\|\.card\$box\(240px\)>:where(.card) {
  inline-size: 240px;
}

.\|\.meta\$box\(120px\)\$paragraphItem\(top\)>:where(.meta) {
  inline-size: 120px;
  vertical-align: top;
}
```
