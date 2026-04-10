**description:**
A vertical Flex settings panel with shared item basis.
**csss:**
 $Flex(column,gap(0.5rem),padding(1rem))
|$FlexItem(100px)
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

.\|\$FlexItem\(100px\)>* {
  margin: unset;
  flex: 100px;
  align-self: unset;
  order: unset;
}
```

**description:**
A reversed Flex action bar with mixed growth.
**csss:**
 $Flex(rowReverse,gap(0.5rem),padding(1rem))
|:nth-child(1)$flexItem(1)
|:nth-child(2)$flexItem(2)
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

.\|\:nth-child\(1\)\$flexItem\(1\)>:where(:nth-child(1)) {
  flex: 1;
}

.\|\:nth-child\(2\)\$flexItem\(2\)>:where(:nth-child(2)) {
  flex: 2;
}
```

**description:**
A wrapping Flex card grid with fixed tile sizing.
**csss:**
 $Flex(wrap,gap(1rem,2rem))
|$FlexItem(margin(5px,1rem))$Box(150px,120px)$BoxItem(scrollMargin(10px))
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

.\|\$FlexItem\(margin\(5px\,1rem\)\)\$Box\(150px\,120px\)\$BoxItem\(scrollMargin\(10px\)\)>* {
  flex: unset;
  align-self: unset;
  order: unset;
  margin-block: 5px;
  margin-inline: 1rem;
  block-size: 120px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 150px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  scroll-margin: 10px;
  scroll-snap-align: unset;
  scroll-snap-stop: unset;
}
```

**description:**
A wrapping Flex toolbar where key actions are reordered and aligned differently once the row starts to fill up.
**csss:**
 $Flex(start,gap(1rem),padding(1rem),wrap)
|$FlexItem(order(3),start,margin(1rem))
|.two$flexItem(order(1),center)
|.three$flexItem(order(2),end)
**css:**
```css
.\$Flex\(start\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: start;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\$FlexItem\(order\(3\)\,start\,margin\(1rem\)\)>* {
  margin: 1rem;
  flex: unset;
  align-self: start;
  order: 3;
}

.\|\.two\$flexItem\(order\(1\)\,center\)>:where(.two) {
  order: 1;
  align-self: center;
}

.\|\.three\$flexItem\(order\(2\)\,end\)>:where(.three) {
  order: 2;
  align-self: end;
}
```

**description:**
A centered Flex row with a stretched featured item.
**csss:**
 $Flex(center,gap(1rem),padding(1rem),wrap)
|.featured$FlexItem(stretch)
**css:**
```css
.\$Flex\(center\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: center;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\.featured\$FlexItem\(stretch\)>:where(.featured) {
  margin: unset;
  flex: unset;
  align-self: stretch;
  order: unset;
}
```

**description:**
A scrollable Flex control strip with mixed item sizing.
**csss:**
 $Flex(gap(1rem),padding(1rem))$box(scroll)
|:nth-child(1)$flexItem(1)
|:nth-child(2)$flexItem(center)
|:nth-child(3)$flexItem(1,0.5)
**css:**
```css
.\$Flex\(gap\(1rem\)\,padding\(1rem\)\)\$box\(scroll\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: unset;
  gap: 1rem;
  overflow: scroll;
}

.\|\:nth-child\(1\)\$flexItem\(1\)>:where(:nth-child(1)) {
  flex: 1;
}

.\|\:nth-child\(2\)\$flexItem\(center\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(1\,0\.5\)>:where(:nth-child(3)) {
  flex: 1 0.5;
}
```

**description:**
A Flex comparison row with a flexible lead item, supporting items aligned independently, and a note moved later in the visual order.
**csss:**
 $Flex(row,gap(1rem),padding(1rem),wrap)
|:nth-child(1)$flexItem(1,200px)
|:nth-child(2)$flexItem(center)
|:nth-child(3)$flexItem(end)
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

.\|\:nth-child\(1\)\$flexItem\(1\,200px\)>:where(:nth-child(1)) {
  flex: 1 200px;
}

.\|\:nth-child\(2\)\$flexItem\(center\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(end\)>:where(:nth-child(3)) {
  align-self: end;
}

.\|\.note\$flexItem\(order\(4\)\,margin\(1rem\)\)>:where(.note) {
  order: 4;
  margin: 1rem;
}
```

**description:**
A Flex inheritance example with parent item defaults and targeted child overrides.
**csss:**
 $Flex(gap(1rem),padding(1rem),wrap)
|$FlexItem(1,180px,margin(0.5rem))
|.wide$flexItem(2,280px)
|.pin$flexItem(order(5),end)
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

.\|\$FlexItem\(1\,180px\,margin\(0\.5rem\)\)>* {
  margin: 0.5rem;
  flex: 1 180px;
  align-self: unset;
  order: unset;
}

.\|\.wide\$flexItem\(2\,280px\)>:where(.wide) {
  flex: 2 280px;
}

.\|\.pin\$flexItem\(order\(5\)\,end\)>:where(.pin) {
  order: 5;
  align-self: end;
}
```