# Flex Layout System

## Flex Container - Basic Setup

**description:** Sets flex column direction with gap and padding.
**csss:** $flex(column,gap(0.5rem),padding(1rem))
**css:**
```css
.\$flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Reverses row direction with gap and padding.
**csss:** $flex(rowReverse,gap(0.5rem),padding(1rem))
**css:**
```css
.\$flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: row-reverse;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Sets explicit row direction with gap and padding.
**csss:** $flex(row,gap(1rem),padding(1rem))
**css:**
```css
.\$flex\(row\,gap\(1rem\)\,padding\(1rem\)\) {
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Full display:flex reset with column direction, gap and padding.
**csss:** $Flex(column,gap(0.5rem),padding(1rem))
**css:**
```css
.\$Flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  align-items: unset;
  place-content: unset;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Enables flex wrapping with gap and padding.
**csss:** $flex(wrap,gap(0.5rem),padding(1rem))
**css:**
```css
.\$flex\(wrap\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Wraps flex items with separate row and column gap.
**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```

## Flex Container - Content & Item Alignment

**description:** Aligns content and items to start with wrap, gap and padding.
**csss:** $flex(contentStart,itemsStart,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentStart\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: start;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Places content start on block axis, end on inline axis.
**csss:** $flex(contentStartEnd,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentStartEnd\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: start end;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Stretches content on block axis, normal on inline axis.
**csss:** $flex(contentStretchNormal,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentStretchNormal\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: stretch normal;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Normal block content with space-between inline distribution.
**csss:** $flex(contentNormalBetween,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentNormalBetween\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: normal space-between;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Centers content and stretches items with wrap.
**csss:** $flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentCenter\,itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: center;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Distributes content with space-between/stretch and aligns items to start.
**csss:** $flex(contentBetweenStretch,itemsStart,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentBetweenStretch\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: space-between stretch;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Stretches all flex items with wrap, gap and padding.
**csss:** $flex(itemsStretch,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

## Flex Container - Gap & Spacing

**description:** Sets 2rem gap with 1rem padding on flex container.
**csss:** $flex(gap(2rem),padding(1rem))
**css:**
```css
.\$flex\(gap\(2rem\)\,padding\(1rem\)\) {
  gap: 2rem;
  padding: 1rem;
}
```

**description:** Sets 1rem gap with 1rem padding on flex container.
**csss:** $flex(gap(1rem),padding(1rem))
**css:**
```css
.\$flex\(gap\(1rem\)\,padding\(1rem\)\) {
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Sets 1rem gap only on flex container.
**csss:** $flex(gap(1rem))
**css:**
```css
.\$flex\(gap\(1rem\)\) {
  gap: 1rem;
}
```

**description:** Sets 0.5rem gap on flex container.
**csss:** $flex(gap(0.5rem))
**css:**
```css
.\$flex\(gap\(0\.5rem\)\) {
  gap: 0.5rem;
}
```

**description:** Enables scrolling on a flex container with padding.
**csss:** $flex(overflowScroll,padding(1rem))
**css:**
```css
.\$flex\(overflowScroll\,padding\(1rem\)\) {
  overflow: scroll;
  padding: 1rem;
}
```

**description:** Column flex with overflow control, asymmetric gaps and padding.
**csss:** $flex(column,overflowHidden,gap(1.5rem,0.5rem),padding(1rem))
**css:**
```css
.\$flex\(column\,overflowHidden\,gap\(1\.5rem\,0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: column;
  overflow: hidden;
  gap: 1.5rem 0.5rem;
  padding: 1rem;
}
```

**description:** Row-reverse flex with scroll overflow and content distribution.
**csss:** $flex(rowReverse,overflowAuto,contentNormalBetween,gap(1rem),padding(1rem))
**css:**
```css
.\$flex\(rowReverse\,overflowAuto\,contentNormalBetween\,gap\(1rem\)\,padding\(1rem\)\) {
  flex-direction: row-reverse;
  overflow: auto;
  place-content: normal space-between;
  gap: 1rem;
  padding: 1rem;
}
```

## Flex Items - Reset & Structure

**description:** Resets all FlexItem defaults and sets flex-grow on 1st child.
**csss:** |:nth-child(1)$FlexItem(grow(1))
**css:**
```css
.\|\:nth-child\(1\)\$FlexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-grow: 1;
}
```

**description:** Sets flex-grow to 1 on the 1st child.
**csss:** |:nth-child(1)$flexItem(grow(1))
**css:**
```css
.\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  flex-grow: 1;
}
```

**description:** Sets flex-grow to 2 on the 2nd child.
**csss:** |:nth-child(2)$flexItem(grow(2))
**css:**
```css
.\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
  flex-grow: 2;
}
```

**description:** Sets flex-shrink to 0.5 on the 3rd child.
**csss:** |:nth-child(3)$flexItem(shrink(0.5))
**css:**
```css
.\|\:nth-child\(3\)\$flexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
  flex-shrink: 0.5;
}
```

**description:** Sets flex-basis to 100px on the 4th child.
**csss:** |:nth-child(4)$flexItem(basis(100px))
**css:**
```css
.\|\:nth-child\(4\)\$flexItem\(basis\(100px\)\)>:where(:nth-child(4)) {
  flex-basis: 100px;
}
```

**description:** Sets flex-basis to 100px on all children.
**csss:** |*$flexItem(basis(100px))
**css:**
```css
.\|\*\$flexItem\(basis\(100px\)\)>* {
  flex-basis: 100px;
}
```

**description:** Sets flex-grow to 1 on .item1 child.
**csss:** |.item1$flexItem(grow(1))
**css:**
```css
.\|\.item1\$flexItem\(grow\(1\)\)>:where(.item1) {
  flex-grow: 1;
}
```
## Flex Items - Self-Alignment
**description:** Aligns 1st child to start.
**csss:** |:nth-child(1)$flexItem(selfStart)
**css:**
```css
.\|\:nth-child\(1\)\$flexItem\(selfStart\)>:where(:nth-child(1)) {
  align-self: start;
}
```

**description:** Aligns 2nd child to center.
**csss:** |:nth-child(2)$flexItem(selfCenter)
**css:**
```css
.\|\:nth-child\(2\)\$flexItem\(selfCenter\)>:where(:nth-child(2)) {
  align-self: center;
}
```

**description:** Aligns 3rd child to end.
**csss:** |:nth-child(3)$flexItem(selfEnd)
**css:**
```css
.\|\:nth-child\(3\)\$flexItem\(selfEnd\)>:where(:nth-child(3)) {
  align-self: end;
}
```

**description:** Stretches 4th child to fill cross axis.
**csss:** |:nth-child(4)$flexItem(selfStretch)
**css:**
```css
.\|\:nth-child\(4\)\$flexItem\(selfStretch\)>:where(:nth-child(4)) {
  align-self: stretch;
}
```

**description:** Stretches .four child across the cross axis.
**csss:** |.four$flexItem(selfStretch)
**css:**
```css
.\|\.four\$flexItem\(selfStretch\)>:where(.four) {
  align-self: stretch;
}
```

**description:** Reorders .two to position 1 and centers it.
**csss:** |.two$flexItem(order(1),selfCenter)
**css:**
```css
.\|\.two\$flexItem\(order\(1\)\,selfCenter\)>:where(.two) {
  order: 1;
  align-self: center;
}
```

**description:** Reorders .three to position 2 and aligns to end.
**csss:** |.three$flexItem(order(2),selfEnd)
**css:**
```css
.\|\.three\$flexItem\(order\(2\)\,selfEnd\)>:where(.three) {
  order: 2;
  align-self: end;
}
```

**description:** Reorders .one to position 3, aligns to start, and adds 1rem margin.
**csss:** |.one$flexItem(order(3),selfStart,margin(1rem))
**css:**
```css
.\|\.one\$flexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>:where(.one) {
  order: 3;
  align-self: start;
  margin: 1rem;
}
```

**description:** Sets margin, fixed size and scroll-margin on all flex children.
**csss:** |*$flexItem(margin(5px),size(150px,120px),scrollMargin(10px))
**css:**
```css
.\|\*\$flexItem\(margin\(5px\)\,size\(150px\,120px\)\,scrollMargin\(10px\)\)>* {
  margin: 5px;
  inline-size: 150px;
  block-size: 120px;
  scroll-margin: 10px;
}
```

## Cross-Reference Examples

**description:** Grid with 2-column layout and asymmetric row/column gap.
**csss:** $grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```
