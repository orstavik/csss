**description:** A two-column Grid shell with a spanning lead item.
**csss:**
$Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
|:nth-child(1)$gridItem(column(1,span(2)))
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

.\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(2\)\)\)>:where(:nth-child(1)) {
  grid-column: 1 / span 2;
}
```

**description:** A column-flow Grid board with a tall spanning item.
**csss:**
$grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
|:nth-child(2)$GridItem(row(1,span(2)))
**css:**
```css
.\$grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  grid-template-rows: repeat(3, 1fr);
  grid-auto-flow: column;
  gap: 0.5rem;
  padding: 1rem;
}

.\|\:nth-child\(2\)\$GridItem\(row\(1\,span\(2\)\)\)>:where(:nth-child(2)) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  grid-row: 1 / span 2;
}
```

**description:** A feature Grid with a spanning hero and a side card that can be aligned independently for contrast.
**csss:**
$Grid(contentCenter,itemsStretch,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
|.hero$GridItem(column(1,span(2)),margin(1rem))
|.aside$gridItem(selfStartEnd,row(2))
**css:**
```css
.\$Grid\(contentCenter\,itemsStretch\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  place-items: stretch;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\|\.hero\$GridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.hero) {
  inline-size: unset;
  block-size: unset;
  margin: 1rem;
  scroll-margin: unset;
  scroll-snap-align: unset;
  grid-column: 1 / span 2;
}

.\|\.aside\$gridItem\(selfStartEnd\,row\(2\)\)>:where(.aside) {
  place-self: start end;
  grid-row: 2;
}
```

**description:** A two-column Grid editorial layout with placed items.
**csss:**
$grid(contentStartEnd,itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
|:nth-child(1)$gridItem(column(1,1))
|:nth-child(2)$gridItem(row(2,span(2)),column(2))
**css:**
```css
.\$grid\(contentStartEnd\,itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  place-content: start end;
  place-items: stretch start;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1rem;
}

.\|\:nth-child\(1\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(1)) {
  grid-column: 1 / 1;
}

.\|\:nth-child\(2\)\$gridItem\(row\(2\,span\(2\)\)\,column\(2\)\)>:where(:nth-child(2)) {
  grid-row: 2 / span 2;
  grid-column: 2;
}
```

**description:** A collage Grid with a wide featured panel, a centered highlight tile, and a tall supporting column.
**csss:**
$Grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem))
|.a$GridItem(column(1,span(2)),row(1))
|.b$gridItem(selfCenter,column(3),row(2))
|.c$gridItem(selfStretchStart,column(1),row(2,span(2)))
**css:**
```css
.\$Grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  place-items: unset;
  place-content: unset;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  gap: 1rem;
  padding: 1rem;
}

.\|\.a\$GridItem\(column\(1\,span\(2\)\)\,row\(1\)\)>:where(.a) {
  inline-size: unset;
  block-size: unset;
  margin-block: unset;
  margin-inline: unset;
  scroll-margin: unset;
  scroll-snap-align: unset;
  grid-column: 1 / span 2;
  grid-row: 1;
}

.\|\.b\$gridItem\(selfCenter\,column\(3\)\,row\(2\)\)>:where(.b) {
  place-self: center;
  grid-column: 3;
  grid-row: 2;
}

.\|\.c\$gridItem\(selfStretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
  place-self: stretch start;
  grid-column: 1;
  grid-row: 2 / span 2;
}
```

**description:** A scrollable Grid gallery with a wide first item.
**csss:**
$grid(cols(repeat(4,1fr)),overflowScrollHidden,gap(1rem))
|:nth-child(1)$GridItem(column(1,span(3)))
**css:**
```css
.\$grid\(cols\(repeat\(4\,1fr\)\)\,overflowScrollHidden\,gap\(1rem\)\) {
  grid-template-columns: repeat(4, 1fr);
  overflow-block: scroll;
  overflow-inline: hidden;
  gap: 1rem;
}

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
