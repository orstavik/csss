**csss:** $grid(cols(1fr,2fr),rows(auto),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,padding\(1rem\)\) {
    display: grid;
    place-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: grid;
    place-items: unset;
    place-content: center;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: grid;
    place-items: unset;
    place-content: start space-between;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(contentCenter,itemsStretch,textJustify,cols(repeat(2,1fr)),gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(contentCenter\,itemsStretch\,textJustify\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,padding\(1rem\)\) {
    display: grid;
    place-items: stretch;
    place-content: center;
    word-spacing: unset;
    line-height: unset;
    text-align: justify;
    text-indent: unset;
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
    display: grid;
    place-items: stretch start;
    place-content: start end;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: grid;
    place-items: stretch start;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: grid;
    place-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
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
    display: grid;
    place-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(4, 1fr);
    overflow-block: scroll;
    overflow-inline: hidden;
    gap: 1rem;
  }
}
```