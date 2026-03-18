**description:** A vertical Flex settings panel with shared item basis.
**csss:**
$Flex(column,gap(0.5rem),padding(1rem))
|$FlexItem(basis(100px))
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

.\|\$FlexItem\(basis\(100px\)\)>* {
  flex-basis: 100px;
}
```

**description:** A reversed Flex action bar with mixed growth.
**csss:**
$flex(rowReverse,gap(0.5rem),padding(1rem))
|:nth-child(1)$FlexItem(grow(1))
|:nth-child(2)$FlexItem(grow(2))
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

.\|\:nth-child\(2\)\$FlexItem\(grow\(2\)\)>:where(:nth-child(2)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-grow: 2;
}
```

**description:** A wrapping Flex card grid with fixed tile sizing.
**csss:**
$flex(wrap,gap(1rem,2rem))
|$FlexItem(margin(5px,1rem),size(150px,120px),scrollMargin(10px))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\|\$FlexItem\(margin\(5px\,1rem\)\,size\(150px\,120px\)\,scrollMargin\(10px\)\)>* {
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
|.two$FlexItem(order(1),selfCenter)
|.three$FlexItem(order(2),selfEnd)
|.one$FlexItem(order(3),selfStart,margin(1rem))
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

.\|\.two\$FlexItem\(order\(1\)\,selfCenter\)>:where(.two) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  order: 1;
  align-self: center;
}

.\|\.three\$FlexItem\(order\(2\)\,selfEnd\)>:where(.three) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  order: 2;
  align-self: end;
}

.\|\.one\$FlexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>:where(.one) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  order: 3;
  align-self: start;
  margin: 1rem;
}
```

**description:** A centered Flex row with a stretched featured item.
**csss:**
$Flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
|.four$FlexItem(selfStretch)
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

.\|\.four\$FlexItem\(selfStretch\)>:where(.four) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  align-self: stretch;
}
```

**description:** A scrollable Flex control strip with mixed item sizing.
**csss:**
$Flex(overflowScroll,gap(1rem),padding(1rem))
|:nth-child(1)$FlexItem(grow(1))
|:nth-child(2)$FlexItem(selfCenter)
|:nth-child(3)$FlexItem(shrink(0.5))
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

.\|\:nth-child\(2\)\$FlexItem\(selfCenter\)>:where(:nth-child(2)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  align-self: center;
}

.\|\:nth-child\(3\)\$FlexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-shrink: 0.5;
}
```

**description:** A Flex comparison row with a flexible lead item, supporting items aligned independently, and a note moved later in the visual order.
**csss:**
$Flex(row,gap(1rem),padding(1rem),wrap)
|:nth-child(1)$FlexItem(basis(200px),grow(1))
|:nth-child(2)$FlexItem(selfCenter)
|:nth-child(3)$FlexItem(selfEnd)
|.note$FlexItem(order(4),margin(1rem))
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

.\|\:nth-child\(2\)\$FlexItem\(selfCenter\)>:where(:nth-child(2)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  align-self: center;
}

.\|\:nth-child\(3\)\$FlexItem\(selfEnd\)>:where(:nth-child(3)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  align-self: end;
}

.\|\.note\$FlexItem\(order\(4\)\,margin\(1rem\)\)>:where(.note) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  order: 4;
  margin: 1rem;
}
```

**description:** A Flex inheritance example with parent item defaults and targeted child overrides.
**csss:**
$Flex(gap(1rem),padding(1rem),wrap)
|$FlexItem(basis(180px),grow(1),margin(0.5rem))
|.wide$flexItem(basis(280px),grow(2))
|.pin$flexItem(order(5),selfEnd)
**css:**
```css
.\$Flex\(gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  align-items: unset;
  place-content: unset;
  gap: 1rem;
  padding: 1rem;
  flex-wrap: wrap;
}

.\|\$FlexItem\(basis\(180px\)\,grow\(1\)\,margin\(0\.5rem\)\)>* {
  inline-size: unset;
  block-size: unset;
  margin-block: 0.5rem;
  margin-inline: 0.5rem;
  scroll-margin: unset;
  scroll-snap-align: unset;
  flex-basis: 180px;
  flex-grow: 1;
}

.\|\.wide\$flexItem\(basis\(280px\)\,grow\(2\)\)>:where(.wide) {
  flex-basis: 280px;
  flex-grow: 2;
}

.\|\.pin\$flexItem\(order\(5\)\,selfEnd\)>:where(.pin) {
  order: 5;
  align-self: end;
}
```
