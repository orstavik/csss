**description:** Flex directions with full reset, gap and padding variations.
**csss:**
$flex(column,gap(0.5rem),padding(1rem))
$flex(rowReverse,gap(0.5rem),padding(1rem))
$flex(row,gap(1rem),padding(1rem))
$Flex(column,gap(0.5rem),padding(1rem))
**css:**
```css
.\$flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}

.\$flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: row-reverse;
  gap: 0.5rem;
  padding: 1rem;
}

.\$flex\(row\,gap\(1rem\)\,padding\(1rem\)\) {
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}

.\$Flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  align-items: unset;
  place-content: unset;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Flex wrapping with uniform or separate row/column gaps.
**csss:**
$flex(wrap,gap(0.5rem),padding(1rem))
$flex(wrap,gap(1rem,2rem))
**css:**
```css
.\$flex\(wrap\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
}

.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```

**description:** Content and item alignment variations in flex wrap containers.
**csss:**
$flex(contentStart,itemsStart,gap(1rem),padding(1rem),wrap)
$flex(contentStartEnd,gap(1rem),padding(1rem),wrap)
$flex(contentStretchNormal,gap(1rem),padding(1rem),wrap)
$flex(contentNormalBetween,gap(1rem),padding(1rem),wrap)
$flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
$flex(contentBetweenStretch,itemsStart,gap(1rem),padding(1rem),wrap)
$flex(itemsStretch,gap(1rem),padding(1rem),wrap)
**css:**
```css
.\$flex\(contentStart\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: start;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(contentStartEnd\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: start end;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(contentStretchNormal\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: stretch normal;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(contentNormalBetween\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: normal space-between;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(contentCenter\,itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: center;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(contentBetweenStretch\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  place-content: space-between stretch;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\$flex\(itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}
```

**description:** Flex containers with various gap, padding, and overflow configurations.
**csss:**
$flex(gap(2rem),padding(1rem))
$flex(gap(1rem),padding(1rem))
$flex(gap(1rem))
$flex(gap(0.5rem))
$flex(overflowScroll,padding(1rem))
**css:**
```css
.\$flex\(gap\(2rem\)\,padding\(1rem\)\) {
  gap: 2rem;
  padding: 1rem;
}

.\$flex\(gap\(1rem\)\,padding\(1rem\)\) {
  gap: 1rem;
  padding: 1rem;
}

.\$flex\(gap\(1rem\)\) {
  gap: 1rem;
}

.\$flex\(gap\(0\.5rem\)\) {
  gap: 0.5rem;
}

.\$flex\(overflowScroll\,padding\(1rem\)\) {
  overflow: scroll;
  padding: 1rem;
}
```

**description:** Sets flex-grow, flex-shrink, flex-basis on flex items with FlexItem reset.
**csss:**
|:nth-child(1)$FlexItem(grow(1))
|:nth-child(1)$flexItem(grow(1))
|:nth-child(2)$flexItem(grow(2))
|:nth-child(3)$flexItem(shrink(0.5))
|:nth-child(4)$flexItem(basis(100px))
|*$flexItem(basis(100px))
|.item1$flexItem(grow(1))
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

.\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  flex-grow: 1;
}

.\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
  flex-grow: 2;
}

.\|\:nth-child\(3\)\$flexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
  flex-shrink: 0.5;
}

.\|\:nth-child\(4\)\$flexItem\(basis\(100px\)\)>:where(:nth-child(4)) {
  flex-basis: 100px;
}

.\|\*\$flexItem\(basis\(100px\)\)>* {
  flex-basis: 100px;
}

.\|\.item1\$flexItem\(grow\(1\)\)>:where(.item1) {
  flex-grow: 1;
}
```

**description:** Self-alignments for individual flex children.
**csss:**
|:nth-child(1)$flexItem(selfStart)
|:nth-child(2)$flexItem(selfCenter)
|:nth-child(3)$flexItem(selfEnd)
|:nth-child(4)$flexItem(selfStretch)
|.four$flexItem(selfStretch)
**css:**
```css
.\|\:nth-child\(1\)\$flexItem\(selfStart\)>:where(:nth-child(1)) {
  align-self: start;
}

.\|\:nth-child\(2\)\$flexItem\(selfCenter\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(selfEnd\)>:where(:nth-child(3)) {
  align-self: end;
}

.\|\:nth-child\(4\)\$flexItem\(selfStretch\)>:where(:nth-child(4)) {
  align-self: stretch;
}

.\|\.four\$flexItem\(selfStretch\)>:where(.four) {
  align-self: stretch;
}
```

**description:** Ordering, self-alignment, margins, size, and scroll-margin on flex children.
**csss:**
|.two$flexItem(order(1),selfCenter)
|.three$flexItem(order(2),selfEnd)
|.one$flexItem(order(3),selfStart,margin(1rem))
|*$flexItem(margin(5px),size(150px,120px),scrollMargin(10px))
**css:**
```css
.\|\.two\$flexItem\(order\(1\)\,selfCenter\)>:where(.two) {
  order: 1;
  align-self: center;
}

.\|\.three\$flexItem\(order\(2\)\,selfEnd\)>:where(.three) {
  order: 2;
  align-self: end;
}

.\|\.one\$flexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>:where(.one) {
  order: 3;
  align-self: start;
  margin: 1rem;
}

.\|\*\$flexItem\(margin\(5px\)\,size\(150px\,120px\)\,scrollMargin\(10px\)\)>* {
  margin: 5px;
  inline-size: 150px;
  block-size: 120px;
  scroll-margin: 10px;
}
```

**description:** Grid with 2-column layout and asymmetric row/column gap.
**csss:**
$grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
$flex(wrap,gap(1rem,2rem))
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}

.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```
