**description:** Basic container explicit grid definitions with columns, rows, auto-flow, gaps and padding.
**csss:**
$grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
$grid(cols(repeat(3,1fr)),rows(100px,100px),gap(1rem))
$grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
$Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  gap: 1rem;
  padding: 1rem;
}

.\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(100px\,100px\)\,gap\(1rem\)\) {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 1rem;
}

.\$grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 0.5rem;
  padding: 1rem;
}

.\$Grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  place-items: unset;
  place-content: unset;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Grid container content and item alignment variants.
**csss:**
$grid(contentCenter,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
$grid(contentStartBetween,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
$grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem),contentStartCenter)
$grid(contentCenter,itemsStretch,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
$grid(contentStartEnd,itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
$grid(itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(contentCenter\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\$grid\(contentStartBetween\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: start space-between;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\,contentStartCenter\) {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 1rem;
  padding: 1rem;
  place-content: start center;
}

.\$grid\(contentCenter\,itemsStretch\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: center;
  place-items: stretch;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\$grid\(contentStartEnd\,itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: start end;
  place-items: stretch start;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\$grid\(itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-items: stretch start;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Grid container overflow variants.
**csss:**
$grid(cols(repeat(4,1fr)),overflowScrollHidden,gap(1rem))
**css:**
```css
.\$grid\(cols\(repeat\(4\,1fr\)\)\,overflowScrollHidden\,gap\(1rem\)\) {
  grid-template-columns: repeat(4, 1fr);
  overflow-block: scroll;
  overflow-inline: hidden;
  gap: 1rem;
}
```

**description:** Grid child properties for placing, spanning, and complete resets.
**csss:**
|:nth-child(1)$GridItem(column(1,span(3)))
|:nth-child(1)$gridItem(column(1,span(3)))
|:nth-child(2)$gridItem(row(4,4))
|:nth-child(3)$gridItem(column(1,1))
|:nth-child(4)$gridItem(row(1,2),column(2,3))
|.a$gridItem(column(1,span(2)),margin(1rem))
|.b$gridItem(row(1,span(2)),column(3))
**css:**
```css
.\|\:nth-child\(1\)\$GridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  grid-column: 1 / span 3;
}

.\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
  grid-column: 1 / span 3;
}

.\|\:nth-child\(2\)\$gridItem\(row\(4\,4\)\)>:where(:nth-child(2)) {
  grid-row: 4 / 4;
}

.\|\:nth-child\(3\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(3)) {
  grid-column: 1 / 1;
}

.\|\:nth-child\(4\)\$gridItem\(row\(1\,2\)\,column\(2\,3\)\)>:where(:nth-child(4)) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

.\|\.a\$gridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.a) {
  grid-column: 1 / span 2;
  margin: 1rem;
}

.\|\.b\$gridItem\(row\(1\,span\(2\)\)\,column\(3\)\)>:where(.b) {
  grid-row: 1 / span 2;
  grid-column: 3;
}
```

**description:** Grid child element self-alignment combinations.
**csss:**
|.c$gridItem(selfStretchStart,column(1),row(2,span(2)))
|.d$gridItem(selfCenter,column(2),row(3))
|:nth-child(1)$gridItem(selfCenter)
|:nth-child(2)$gridItem(selfCenterStretch)
|:nth-child(3)$gridItem(selfStartEnd)
**css:**
```css
.\|\.c\$gridItem\(selfStretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
  place-self: stretch start;
  grid-column: 1;
  grid-row: 2 / span 2;
}

.\|\.d\$gridItem\(selfCenter\,column\(2\)\,row\(3\)\)>:where(.d) {
  place-self: center;
  grid-column: 2;
  grid-row: 3;
}

.\|\:nth-child\(1\)\$gridItem\(selfCenter\)>:where(:nth-child(1)) {
  place-self: center;
}

.\|\:nth-child\(2\)\$gridItem\(selfCenterStretch\)>:where(:nth-child(2)) {
  place-self: center stretch;
}

.\|\:nth-child\(3\)\$gridItem\(selfStartEnd\)>:where(:nth-child(3)) {
  place-self: start end;
}
```

**description:** Mixed layout configurations with specific row/column gaps.
**csss:**
$flex(wrap,gap(1rem,2rem))
$grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```
