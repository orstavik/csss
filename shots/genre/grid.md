**description:** A two-column Grid shell with a spanning lead item.
**userInstruction:**
The grid currently has equally sized columns, but the second column should be twice as wide as the first. Also, make the first child span across both columns to act as a header.
**before:**
```html
…<div class="$Grid(cols(1fr,1fr),gap(1rem),padding(1rem))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
  |:nth-child(1)$gridItem(column(1,span(2)))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
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
**userInstruction:**
The grid flows in rows by default. Change it to flow in columns with 3 equal rows, and make the second item span across the first two rows.
**before:**
```html
…<div class="$Grid(gap(0.5rem),padding(1rem))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
  |:nth-child(2)$gridItem(row(1,span(2)))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
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
**userInstruction:**
Set the grid to stretch all items by default. Then, make the hero item span two columns with a 1rem margin, and align the aside to the start and end of row 2.
**before:**
```html
…<div class="$Grid(center,cols(repeat(2,1fr)),gap(1rem),padding(1rem))">
  <div class="hero">…</div>
  <div class="aside">…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(center,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
  |$gridItem(stretch)
  |.hero$GridItem(column(1,span(2)),margin(1rem))
  |.aside$GridItem(startEnd,row(2))">
  <div class="hero">…</div>
  <div class="aside">…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Grid\(center\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
}

.\|\$gridItem\(stretch\)>* {
  place-self: stretch;
}

.\|\.hero\$GridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.hero) {
  margin: 1rem;
  grid-column: 1 / span 2;
  grid-row: unset;
  place-self: unset;
}

.\|\.aside\$GridItem\(startEnd\,row\(2\)\)>:where(.aside) {
  margin: unset;
  grid-column: unset;
  grid-row: 2;
  place-self: start end;
}
```

**description:** A two-column Grid editorial layout with placed items.
**userInstruction:**
The editorial layout needs precise placement. Default all items to stretch and align start. Put the first child in column 1, and make the second child span two rows in column 2.
**before:**
```html
…<div class="$Grid(startEnd,cols(repeat(2,1fr)),gap(1rem),padding(1rem))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(startEnd,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
  |$gridItem(stretchStart)
  |:nth-child(1)$gridItem(column(1,1))
  |:nth-child(2)$gridItem(row(2,span(2)),column(2))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Grid\(startEnd\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
  display: grid;
  padding: 1rem;
  place-items: unset;
  place-content: start end;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: 1rem;
  grid-auto-flow: unset;
}

.\|\$gridItem\(stretchStart\)>* {
  place-self: stretch start;
}

.\|\:nth-child\(1\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(1)) {
  grid-column: 1 / 1;
}

.\|\:nth-child\(2\)\$gridItem\(row\(2\,span\(2\)\)\,column\(2\)\)>:where(:nth-child(2)) {
  grid-column: 2;
  grid-row: 2 / span 2;
}
```

**description:** A collage Grid with a wide featured panel, a centered highlight tile, and a tall supporting column.
**userInstruction:**
The grid cells are flowing automatically, but we need a specific collage layout. Manually position .a to span 2 columns in row 1, .b to center in column 3 of row 2, and .c to span 2 rows starting in column 1.
**before:**
```html
…<div class="$Grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem))">
  <div class="a">…</div>
  <div class="b">…</div>
  <div class="c">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem))
  |.a$gridItem(column(1,span(2)),row(1))
  |.b$gridItem(center,column(3),row(2))
  |.c$gridItem(stretchStart,column(1),row(2,span(2)))">
  <div class="a">…</div>
  <div class="b">…</div>
  <div class="c">…</div>
</div>…
```
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

.\|\.b\$gridItem\(center\,column\(3\)\,row\(2\)\)>:where(.b) {
  place-self: center;
  grid-column: 3;
  grid-row: 2;
}

.\|\.c\$gridItem\(stretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
  place-self: stretch start;
  grid-column: 1;
  grid-row: 2 / span 2;
}
```

**description:** A scrollable Grid gallery with a wide first item.
**userInstruction:**
The 4-column gallery overflows its container horizontally. Add a scroll box to allow horizontal scrolling but hide vertical overflow, and make the first child prominently span 3 columns.
**before:**
```html
…<div class="$Grid(cols(repeat(4,1fr)),gap(1rem))">
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Grid(cols(repeat(4,1fr)),gap(1rem))$box(scrollHidden)
  |:nth-child(1)$gridItem(column(1,span(3)))">
  <div>…</div>
  <div>…</div>
</div>…
```
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

**description:**
A chessboard layout using Grid, where the board is a fixed-size Box with a background, and all grandchild elements (the squares) are explicitly sized to 50x50px using the double-pipe grandchild selector.
**userInstruction:**
The chessboard squares are collapsing because they lack explicit dimensions. Target the grandchildren (.square) to have a fixed 50x50px size, apply a background to the main container, and ensure the .row children clear their margins.
**before:**
```html
…<div class="$Box(400px,400px)$Grid()$Bg(#board)">
  <div class="row">
    <div class="square"></div>
    <div class="square"></div>
    …
  </div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Box(400px,400px)$Grid()$Bg(#board)
  |.row$BlockItem(margin(0))
  ||.square$Box(50px,50px)">
  <div class="row">
    <div class="square"></div>
    <div class="square"></div>
    …
  </div>
  …
</div>…
```
**css:**
```css
.\$Box\(400px\,400px\)\$Grid\(\)\$Bg\(\#board\) {
  block-size: 400px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 400px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  display: grid;
  padding: unset;
  place-items: unset;
  place-content: unset;
  grid-template-columns: unset;
  grid-template-rows: unset;
  grid-template-areas: unset;
  gap: unset;
  grid-auto-flow: unset;
  background-color: var(--color-board);
  background: none;
  background-blend-mode: normal;
}

.\|\.row\$BlockItem\(margin\(0\)\)>:where(.row) {
  margin: 0;
  float: unset;
  clear: unset;
}

.\|\|\.square\$Box\(50px\,50px\)>*>:where(.square) {
  block-size: 50px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 50px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```