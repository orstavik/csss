**csss:** $grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),padding(1rem),contentStartCenter)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,padding\(1rem\)\,contentStartCenter\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-items: unset;
    place-content: start center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** |.a$_grid(column(1,span(2)),margin(1rem))
**css:**
```css
@layer items {
  .\|\.a\$_grid\(column\(1\,span\(2\)\)\,margin\(1rem\)\)>:where(.a) {
    grid-column: 1 / span 2;
    margin: 1rem;
  }
}
```

**csss:** |.b$_grid(row(1,span(2)),column(3))
**css:**
```css
@layer items {
  .\|\.b\$_grid\(row\(1\,span\(2\)\)\,column\(3\)\)>:where(.b) {
    grid-row: 1 / span 2;
    grid-column: 3;
  }
}
```

**csss:** |.c$_grid(selfStretchStart,column(1),row(2,span(2)))
**css:**
```css
@layer items {
  .\|\.c\$_grid\(selfStretchStart\,column\(1\)\,row\(2\,span\(2\)\)\)>:where(.c) {
    place-self: stretch start;
    grid-column: 1;
    grid-row: 2 / span 2;
  }
}
```

**csss:** |.d$_grid(selfCenter,column(2),row(3))
**css:**
```css
@layer items {
  .\|\.d\$_grid\(selfCenter\,column\(2\)\,row\(3\)\)>:where(.d) {
    place-self: center;
    grid-column: 2;
    grid-row: 3;
  }
}
```