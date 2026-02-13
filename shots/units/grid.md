**csss:** $grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $Grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$Grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
    display: grid;
    place-items: unset;
    place-content: unset;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(contentCenter,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(contentCenter\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    place-content: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(contentStartBetween,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(contentStartBetween\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    place-content: start space-between;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(contentCenter,itemsStretch,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(contentCenter\,itemsStretch\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    place-content: center;
    place-items: stretch;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(contentStartEnd,itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(contentStartEnd\,itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    place-content: start end;
    place-items: stretch start;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(itemsStretchStart,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(itemsStretchStart\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    place-items: stretch start;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(rows(repeat(3,1fr)),column,gap(0.5rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(cols(repeat(4,1fr)),overflowScrollHidden,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(4\,1fr\)\)\,overflowScrollHidden\,gap\(1rem\)\) {
    grid-template-columns: repeat(4, 1fr);
    overflow-block: scroll;
    overflow-inline: hidden;
    gap: 1rem;
  }
}
```

**csss:** $grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem),contentStartCenter)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\,contentStartCenter\) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 1rem;
    padding: 1rem;
    place-content: start center;
  }
}
```

**csss:** $grid(cols(repeat(3,1fr)),rows(100px,100px),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(100px\,100px\)\,gap\(1rem\)\) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 100px;
    gap: 1rem;
  }
}
```

**csss:** |:nth-child(1)$GridItem(column(1,span(3)))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$GridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
    inline-size: unset;
    block-size: unset;
    margin-block: unset;
    margin-inline: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
    grid-column: 1 / span 3;
  }
}
```

**csss:** |:nth-child(1)$gridItem(column(1,span(3)))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$gridItem\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
    grid-column: 1 / span 3;
  }
}
```

**csss:** |:nth-child(2)$gridItem(row(4,4))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$gridItem\(row\(4\,4\)\)>:where(:nth-child(2)) {
    grid-row: 4 / 4;
  }
}
```

**csss:** |:nth-child(3)$gridItem(column(1,1))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(3)) {
    grid-column: 1 / 1;
  }
}
```

**csss:** |:nth-child(4)$gridItem(row(1,2),column(2,3))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$gridItem\(row\(1\,2\)\,column\(2\,3\)\)>:where(:nth-child(4)) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}
```

**csss:** |:nth-child(1)$gridItem(selfCenter)
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$gridItem\(selfCenter\)>:where(:nth-child(1)) {
    place-self: center;
  }
}
```

**csss:** |:nth-child(2)$gridItem(selfCenterStretch)
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$gridItem\(selfCenterStretch\)>:where(:nth-child(2)) {
    place-self: center stretch;
  }
}
```

**csss:** |:nth-child(3)$gridItem(selfStartEnd)
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$gridItem\(selfStartEnd\)>:where(:nth-child(3)) {
    place-self: start end;
  }
}
```

**csss:** |.a$gridItem(column(1,span(2)),margin(1rem))
**css:**
```css
@layer items {
  .\|\.a\$gridItem\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.a) {
    grid-column: 1 / span 2;
    margin: 1rem;
  }
}
```

**csss:** |.b$gridItem(row(1,span(2)),column(3))
**css:**
```css
@layer items {
  .\|\.b\$gridItem\(row\(1\,span\(2\)\)\,column\(3\)\)>:where(.b) {
    grid-row: 1 / span 2;
    grid-column: 3;
  }
}
```

**csss:** |.c$gridItem(selfStretchStart,column(1),row(2,span(2)))
**css:**
```css
@layer items {
  .\|\.c\$gridItem\(selfStretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
    place-self: stretch start;
    grid-column: 1;
    grid-row: 2 / span 2;
  }
}
```

**csss:** |.d$gridItem(selfCenter,column(2),row(3))
**css:**
```css
@layer items {
  .\|\.d\$gridItem\(selfCenter\,column\(2\)\,row\(3\)\)>:where(.d) {
    place-self: center;
    grid-column: 2;
    grid-row: 3;
  }
}
```



**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap\,gap\(1rem\,2rem\)\) {
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }
}
```

**csss:** $grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.5rem;
  }
}
```