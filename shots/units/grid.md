**description:** A two-column Grid shell with a spanning lead item.
**csss:**
$Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
|:nth-child(1)$gridItem(column(1,span(2)))
**css:**
```css
.\$Grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: unset;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
}

.\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(2\)\)\)>:where(:nth-child(1)) {
  grid-column: 1 / span 2;
}
```

**description:** A column-flow Grid board with a tall spanning item.
**csss:**
$Grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
|:nth-child(2)$gridItem(row(1,span(2)))
**css:**
```css
.\$Grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: unset;
  grid-template-columns: unset;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: unset;
  gap: 0.5rem;
  grid-auto-flow: column;
}

.\|\:nth-child\(2\)\$gridItem\(row\(1\,span\(2\)\)\)>:where(:nth-child(2)) {
  grid-row: 1 / span 2;
}
```

**description:** A feature Grid with a spanning hero and a side card that can be aligned independently for contrast.
**csss:**
$Grid(contentCenter,itemsStretch,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
|.hero$GridItem(column(1,span(2)),margin(1rem))
|.aside$GridItem(selfStartEnd,row(2))
**css:**
```css
.\$Grid\(contentCenter\,itemsStretch\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: stretch;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
}

.\|\.hero\$GridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.hero) {
  margin: 1rem;
  float: unset;
  clear: unset;
  vertical-align: unset;
  grid-column: 1 / span 2;
  grid-row: unset;
  place-self: unset;
}

.\|\.aside\$GridItem\(selfStartEnd\,row\(2\)\)>:where(.aside) {
  margin: unset;
  float: unset;
  clear: unset;
  vertical-align: unset;
  grid-column: unset;
  grid-row: 2;
  place-self: start end;
}
```

**description:** A two-column Grid editorial layout with placed items.
**csss:**
$Grid(contentStartEnd,itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
|:nth-child(1)$gridItem(column(1,1))
|:nth-child(2)$gridItem(row(2,span(2)),column(2))
**css:**
```css
.\$Grid\(contentStartEnd\,itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: stretch start;
  place-content: start end;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
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
|.a$gridItem(column(1,span(2)),row(1))
|.b$gridItem(selfCenter,column(3),row(2))
|.c$gridItem(selfStretchStart,column(1),row(2,span(2)))
**css:**
```css
.\$Grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: unset;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 80px);
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
}

.\|\.a\$gridItem\(column\(1\,span\(2\)\)\,row\(1\)\)>:where(.a) {
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
$Grid(cols(repeat(4,1fr)),gap(1rem))$box(scrollHidden)
|:nth-child(1)$gridItem(column(1,span(3)))
**css:**
```css
.\$Grid\(cols\(repeat\(4\,1fr\)\)\,gap\(1rem\)\)\$box\(scrollHidden\) {
  display: grid;
  padding: unset;
  place-items: unset;
  place-content: unset;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
  overflow: scroll hidden;
}

.\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
  grid-column: 1 / span 3;
}
```
