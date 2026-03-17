**description:** A vertical Flex settings panel with shared item basis.
**csss:**
$Flex(column,gap(0.5rem),padding(1rem))
|*$flexItem(basis(100px))
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

.\|\*\$flexItem\(basis\(100px\)\)>* {
  flex-basis: 100px;
}
```

**description:** A reversed Flex action bar with mixed growth.
**csss:**
$flex(rowReverse,gap(0.5rem),padding(1rem))
|:nth-child(1)$FlexItem(grow(1))
|:nth-child(2)$flexItem(grow(2))
**css:**
```css
.\$flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  flex-direction: row-reverse;
  gap: 0.5rem;
  padding: 1rem;
}

.\|\:nth-child\(1\)\$FlexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-grow: 1;
}

.\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
  flex-grow: 2;
}
```

**description:** A wrapping Flex card grid with fixed tile sizing.
**csss:**
$flex(wrap,gap(1rem,2rem))
|*$FlexItem(margin(5px,1rem),size(150px,120px),scrollMargin(10px))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\|\*\$FlexItem\(margin\(5px\,1rem\)\,size\(150px\,120px\)\,scrollMargin\(10px\)\)>* {
  inline-size: 150px;
  block-size: 120px;
  margin-block: 5px;
  margin-inline: 1rem;
  scroll-margin: 10px;
  scroll-snap-align: unset;
}
```

**description:** A wrapping Flex toolbar where key actions are reordered and aligned differently once the row starts to fill up.
**csss:**
$Flex(contentStart,itemsStart,gap(1rem),padding(1rem),wrap)
|.two$flexItem(order(1),selfCenter)
|.three$flexItem(order(2),selfEnd)
|.one$flexItem(order(3),selfStart,margin(1rem))
**css:**
```css
.\$Flex\(contentStart\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  align-items: start;
  place-content: start;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

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
```

**description:** A centered Flex row with a stretched featured item.
**csss:**
$Flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
|.four$flexItem(selfStretch)
**css:**
```css
.\$Flex\(contentCenter\,itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  align-items: stretch;
  place-content: center;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\|\.four\$flexItem\(selfStretch\)>:where(.four) {
  align-self: stretch;
}
```

**description:** A scrollable Flex control strip with mixed item sizing.
**csss:**
$Flex(overflowScroll,gap(1rem),padding(1rem))
|:nth-child(1)$FlexItem(grow(1))
|:nth-child(2)$flexItem(selfCenter)
|:nth-child(3)$flexItem(shrink(0.5))
**css:**
```css
.\$Flex\(overflowScroll\,gap\(1rem\)\,padding\(1rem\)\) {
  display: flex;
  align-items: unset;
  place-content: unset;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem;
}

.\|\:nth-child\(1\)\$FlexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-grow: 1;
}

.\|\:nth-child\(2\)\$flexItem\(selfCenter\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
  flex-shrink: 0.5;
}
```

**description:** A Flex comparison row with a flexible lead item, supporting items aligned independently, and a note moved later in the visual order.
**csss:**
$Flex(row,gap(1rem),padding(1rem),wrap)
|:nth-child(1)$FlexItem(basis(200px),grow(1))
|:nth-child(2)$flexItem(selfCenter)
|:nth-child(3)$flexItem(selfEnd)
|.note$flexItem(order(4),margin(1rem))
**css:**
```css
.\$Flex\(row\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\|\:nth-child\(1\)\$FlexItem\(basis\(200px\)\,grow\(1\)\)>:where(:nth-child(1)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-basis: 200px;
  flex-grow: 1;
}

.\|\:nth-child\(2\)\$flexItem\(selfCenter\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(selfEnd\)>:where(:nth-child(3)) {
  align-self: end;
}

.\|\.note\$flexItem\(order\(4\)\,margin\(1rem\)\)>:where(.note) {
  order: 4;
  margin: 1rem;
}
```
