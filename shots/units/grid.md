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