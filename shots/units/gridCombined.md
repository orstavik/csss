**csss:** $grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem),contentStartCenter)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\,contentStartCenter\) {
    display: grid;
    place-items: unset;
    place-content: start center;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 1rem;
    padding: 1rem;
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