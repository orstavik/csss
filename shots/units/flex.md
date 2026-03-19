**description:** A vertical Flex settings panel with shared item basis.
**csss:**
$Flex(column,gap(0.5rem),padding(1rem))
|$FlexItem(basis(100px))
**css:**
```css
.\$Flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: column;
  flex-wrap: unset;
  gap: 0.5rem;
}

.\|\$FlexItem\(basis\(100px\)\)>* {
  margin: unset;
  float: unset;
  clear: unset;
  vertical-align: unset;
  flex-basis: 100px;
  flex-grow: unset;
  flex-shrink: unset;
  align-self: unset;
  order: unset;
}
```

**description:** A reversed Flex action bar with mixed growth.
**csss:**
$Flex(rowReverse,gap(0.5rem),padding(1rem))
|:nth-child(1)$flexItem(grow(1))
|:nth-child(2)$flexItem(grow(2))
**css:**
```css
.\$Flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row-reverse;
  flex-wrap: unset;
  gap: 0.5rem;
}

.\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
  flex-grow: 1;
}

.\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
  flex-grow: 2;
}
```

**description:** A wrapping Flex card grid with fixed tile sizing.
**csss:**
$Flex(wrap,gap(1rem,2rem))
|$FlexItem(margin(5px,1rem))$Box(size(150px,120px))$BoxItem(scrollMargin(10px))
**css:**
```css
.\$Flex\(wrap\,gap\(1rem\,2rem\)\) {
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\|\$FlexItem\(margin\(5px\,1rem\)\)\$Box\(size\(150px\,120px\)\)\$BoxItem\(scrollMargin\(10px\)\)>* {
  float: unset;
  clear: unset;
  vertical-align: unset;
  flex-basis: unset;
  flex-grow: unset;
  flex-shrink: unset;
  align-self: unset;
  order: unset;
  margin-block: 5px;
  margin-inline: 1rem;
  inline-size: 150px;
  block-size: 120px;
  min-inline-size: unset;
  max-inline-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  scroll-margin: 10px;
  scroll-snap-align: unset;
  scroll-snap-stop: unset;
}
```

**description:** A wrapping Flex toolbar where key actions are reordered and aligned differently once the row starts to fill up.
**csss:**
$Flex(contentStart,itemsStart,gap(1rem),padding(1rem),wrap)
|$FlexItem(order(3),selfStart,margin(1rem))
|.one$flexItem(order(3),selfStart,margin(1rem))
|.two$flexItem(order(1),selfCenter)
|.three$flexItem(order(2),selfEnd)

**css:**
```css
.\$Flex\(contentStart\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: start;
  place-content: start;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\$FlexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>* {
  margin: 1rem;
  float: unset;
  clear: unset;
  vertical-align: unset;
  flex-basis: unset;
  flex-grow: unset;
  flex-shrink: unset;
  align-self: start;
  order: 3;
}

.\|\.one\$flexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>:where(.one) {
  order: 3;
  align-self: start;
  margin: 1rem;
}

.\|\.two\$flexItem\(order\(1\)\,selfCenter\)>:where(.two) {
  order: 1;
  align-self: center;
}

.\|\.three\$flexItem\(order\(2\)\,selfEnd\)>:where(.three) {
  order: 2;
  align-self: end;
}
```

**description:** A centered Flex row with a stretched featured item.
**csss:**
$Flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
|.featured$FlexItem(selfStretch)
**css:**
```css
.\$Flex\(contentCenter\,itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: stretch;
  place-content: center;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\.featured\$FlexItem\(selfStretch\)>:where(.featured) {
  margin: unset;
  float: unset;
  clear: unset;
  vertical-align: unset;
  flex-basis: unset;
  flex-grow: unset;
  flex-shrink: unset;
  align-self: stretch;
  order: unset;
}
```

**description:** A scrollable Flex control strip with mixed item sizing.
**csss:**
$Flex(gap(1rem),padding(1rem))$box(overflowScroll)
|:nth-child(1)$flexItem(grow(1))
|:nth-child(2)$flexItem(selfCenter)
|:nth-child(3)$flexItem(shrink(0.5))
**css:**
```css
.\$Flex\(gap\(1rem\)\,padding\(1rem\)\)\$box\(overflowScroll\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: unset;
  gap: 1rem;
  overflow: scroll;
}

.\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
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
|:nth-child(1)$flexItem(basis(200px),grow(1))
|:nth-child(2)$flexItem(selfCenter)
|:nth-child(3)$flexItem(selfEnd)
|.note$flexItem(order(4),margin(1rem))
**css:**
```css
.\$Flex\(row\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\:nth-child\(1\)\$flexItem\(basis\(200px\)\,grow\(1\)\)>:where(:nth-child(1)) {
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
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\$FlexItem\(basis\(180px\)\,grow\(1\)\,margin\(0\.5rem\)\)>* {
  margin: 0.5rem;
  float: unset;
  clear: unset;
  vertical-align: unset;
  flex-basis: 180px;
  flex-grow: 1;
  flex-shrink: unset;
  align-self: unset;
  order: unset;
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
