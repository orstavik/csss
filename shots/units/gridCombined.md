**csss:** $grid(cols(repeat(3,1fr)),rows(repeat(3,80px)),gap(1rem),p(1rem),ac)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(repeat\(3\,80px\)\)\,gap\(1rem\)\,p\(1rem\)\,ac\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 80px);
    gap: 1rem;
    padding: 1rem;
    align-content: start;
    justify-content: center;
    align-items: unset;
    justify-items: unset;
  }
}
```

**csss:** |.a$_grid(column(1,span(2)),m(1rem))
**css:**
```css
@layer items {
  .\|\.a\$_grid\(column\(1\,span\(2\)\)\,m\(1rem\)\)> :where(.a) {
    grid-column: 1 / span 2;
    margin: 1rem;
  }
}
```

**csss:** |.b$_grid(row(1,span(2)),column(3))
**css:**
```css
@layer items {
  .\|\.b\$_grid\(row\(1\,span\(2\)\)\,column\(3\)\)> :where(.b) {
    grid-row: 1 / span 2;
    grid-column: 3;
  }
}
```

**csss:** |.c$_grid(align(sa),column(1),row(2,span(2)))
**css:**
```css
@layer items {
  .\|\.c\$_grid\(align\(sa\)\,column\(1\)\,row\(2\,span\(2\)\)\)> :where(.c) {
    text-align: start;
    align-self: stretch;
    justify-self: start;
    grid-column: 1;
    grid-row: 2 / span 2;
  }
}
```

**csss:** |.d$_grid(align(c),column(2),row(3))
**css:**
```css
@layer items {
  .\|\.d\$_grid\(align\(c\)\,column\(2\)\,row\(3\)\)> :where(.d) {
    text-align: center;
    place-self: center;
    grid-area: 3 / 2;
  }
}
```