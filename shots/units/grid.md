**description:** Defines 2-column grid with auto rows, 1rem gap and padding.
**csss:** $grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  gap: 1rem;
  padding: 1rem;
}
```

**description:** 3-column grid with 2 explicit 100px rows and 1rem gap.
**csss:** $grid(cols(repeat(3,1fr)),rows(100px,100px),gap(1rem))
**css:**
```css
.\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(100px\,100px\)\,gap\(1rem\)\) {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px 100px;
  gap: 1rem;
}
```

**description:** 3-row grid with column auto-flow direction, 0.5rem gap and padding.
**csss:** $grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
**css:**
```css
.\$grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 0.5rem;
  padding: 1rem;
}
```

**description:** Full display:grid reset with 2-column layout, auto rows, gap and padding.
**csss:** $Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
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

**description:** Centers grid content with 2-column repeat, gap and padding.
**csss:** $grid(contentCenter,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(contentCenter\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Aligns content start on block axis, space-between on inline axis.
**csss:** $grid(contentStartBetween,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(contentStartBetween\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: start space-between;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** 3x3 grid with 80px rows, content aligned start/center.
**csss:** $grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem),contentStartCenter)
**css:**
```css
.\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\,contentStartCenter\) {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 1rem;
  padding: 1rem;
  place-content: start center;
}
```

**description:** Centers content and stretches items in a 2-column grid.
**csss:** $grid(contentCenter,itemsStretch,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(contentCenter\,itemsStretch\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: center;
  place-items: stretch;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Content start/end with items stretch/start in a 2-column grid.
**csss:** $grid(contentStartEnd,itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(contentStartEnd\,itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: start end;
  place-items: stretch start;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** Items stretch/start in a 2-column grid without content override.
**csss:** $grid(itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
.\$grid\(itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-items: stretch start;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}
```

**description:** 4-column grid with block-scroll and inline-hidden overflow.
**csss:** $grid(cols(repeat(4,1fr)),gap(1rem))$box(overflowScrollHidden)
**css:**
```css
.\$grid\(cols\(repeat\(4\,1fr\)\)\,gap\(1rem\)\)\$box\(overflowScrollHidden\) {
  grid-template-columns: repeat(4, 1fr);
  overflow-block: scroll;
  overflow-inline: hidden;
  gap: 1rem;
}
```

**description:** Resets all GridItem defaults and spans 1st child across 3 columns.
**csss:** |:nth-child(1)$GridItem(column(1,span(3)))
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
```

**description:** Spans 1st child across 3 columns starting at column 1.
**csss:** |:nth-child(1)$gridItem(column(1,span(3)))
**css:**
```css
.\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
  grid-column: 1 / span 3;
}
```

**description:** Places 2nd child at grid row 4/4.
**csss:** |:nth-child(2)$gridItem(row(4,4))
**css:**
```css
.\|\:nth-child\(2\)\$gridItem\(row\(4\,4\)\)>:where(:nth-child(2)) {
  grid-row: 4 / 4;
}
```

**description:** Places 3rd child at grid column 1/1.
**csss:** |:nth-child(3)$gridItem(column(1,1))
**css:**
```css
.\|\:nth-child\(3\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(3)) {
  grid-column: 1 / 1;
}
```

**description:** Places 4th child at row 1-2 and column 2-3.
**csss:** |:nth-child(4)$gridItem(row(1,2),column(2,3))
**css:**
```css
.\|\:nth-child\(4\)\$gridItem\(row\(1\,2\)\,column\(2\,3\)\)>:where(:nth-child(4)) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
```

**description:** Spans .a child across 2 columns with 1rem margin.
**csss:** |.a$gridItem(column(1,span(2)),margin(1rem))
**css:**
```css
.\|\.a\$gridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.a) {
  grid-column: 1 / span 2;
  margin: 1rem;
}
```

**description:** Spans .b child across 2 rows at column 3.
**csss:** |.b$gridItem(row(1,span(2)),column(3))
**css:**
```css
.\|\.b\$gridItem\(row\(1\,span\(2\)\)\,column\(3\)\)>:where(.b) {
  grid-row: 1 / span 2;
  grid-column: 3;
}
```

**description:** Stretches/starts .c child at column 1 spanning 2 rows from row 2.
**csss:** |.c$gridItem(selfStretchStart,column(1),row(2,span(2)))
**css:**
```css
.\|\.c\$gridItem\(selfStretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
  place-self: stretch start;
  grid-column: 1;
  grid-row: 2 / span 2;
}
```

**description:** Centers .d child at column 2, row 3.
**csss:** |.d$gridItem(selfCenter,column(2),row(3))
**css:**
```css
.\|\.d\$gridItem\(selfCenter\,column\(2\)\,row\(3\)\)>:where(.d) {
  place-self: center;
  grid-column: 2;
  grid-row: 3;
}
```

**description:** Centers 1st grid child on both axes.
**csss:** |:nth-child(1)$gridItem(selfCenter)
**css:**
```css
.\|\:nth-child\(1\)\$gridItem\(selfCenter\)>:where(:nth-child(1)) {
  place-self: center;
}
```

**description:** Centers 2nd child on block axis, stretches on inline axis.
**csss:** |:nth-child(2)$gridItem(selfCenterStretch)
**css:**
```css
.\|\:nth-child\(2\)\$gridItem\(selfCenterStretch\)>:where(:nth-child(2)) {
  place-self: center stretch;
}
```

**description:** Aligns 3rd child to block-start and inline-end.
**csss:** |:nth-child(3)$gridItem(selfStartEnd)
**css:**
```css
.\|\:nth-child\(3\)\$gridItem\(selfStartEnd\)>:where(:nth-child(3)) {
  place-self: start end;
}
```

**description:** Flex wrap with separate row and column gap values.
**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```

**description:** 2-column grid with asymmetric row/column gap.
**csss:** $grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```
