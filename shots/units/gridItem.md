**csss:** $grid(cols(repeat(3,1fr)),rows(100px,100px),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,rows\(100px\,100px\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 100px;
    gap: 1rem;
  }
}
```

**csss:** |:nth-child(1)$_grid(column(1,span(3)))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$_grid\(column\(1\,span\(3\)\)\)> :where(:nth-child(1)) {
    grid-column: 1 / span 3;
  }
}
```

**csss:** |:nth-child(2)$_grid(row(4,4))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_grid\(row\(4\,4\)\)> :where(:nth-child(2)) {
    grid-row: 4 / 4;
  }
}
```

**csss:** |:nth-child(3)$_grid(column(1,1))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_grid\(column\(1\,1\)\)> :where(:nth-child(3)) {
    grid-column: 1 / 1;
  }
}
```

**csss:** |:nth-child(4)$_grid(row(1,2),column(2,3))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$_grid\(row\(1\,2\)\,column\(2\,3\)\)> :where(:nth-child(4)) {
    grid-area: 1 / 2 / 2 / 3;
  }
}
```

**csss:** |:nth-child(1)$_grid(align(c))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$_grid\(align\(c\)\)> :where(:nth-child(1)) {
    text-align: center;
    place-self: center;
  }
}
```

**csss:** |:nth-child(2)$_grid(align(cs))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_grid\(align\(cs\)\)> :where(:nth-child(2)) {
    text-align: justify;
    place-self: center stretch;
  }
}
```

**csss:** |:nth-child(3)$_grid(align(ab))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_grid\(align\(ab\)\)> :where(:nth-child(3)) {
    text-align: end;
    place-self: start end;
  }
}
```