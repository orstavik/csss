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
    place-items: unset;
    place-content: unset;
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
  .\|\:nth-child\(1\)\$_grid\(column\(1\,span\(3\)\)\)>:where(:nth-child(1)) {
    grid-column: 1 / span 3;
  }
}
```

**csss:** |:nth-child(2)$_grid(row(4,4))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_grid\(row\(4\,4\)\)>:where(:nth-child(2)) {
    grid-row: 4 / 4;
  }
}
```

**csss:** |:nth-child(3)$_grid(column(1,1))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_grid\(column\(1\,1\)\)>:where(:nth-child(3)) {
    grid-column: 1 / 1;
  }
}
```

**csss:** |:nth-child(4)$_grid(row(1,2),column(2,3))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$_grid\(row\(1\,2\)\,column\(2\,3\)\)>:where(:nth-child(4)) {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
  }
}
```

**csss:** |:nth-child(1)$_grid(selfCenter)
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$_grid\(selfCenter\)>:where(:nth-child(1)) {
    place-self: center;
  }
}
```

**csss:** |:nth-child(2)$_grid(selfCenterStretch)
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_grid\(selfCenterStretch\)>:where(:nth-child(2)) {
    place-self: center stretch;
  }
}
```

**csss:** |:nth-child(3)$_grid(selfStartEnd)
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_grid\(selfStartEnd\)>:where(:nth-child(3)) {
    place-self: start end;
  }
}
```