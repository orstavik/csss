**csss:** $grid(cols(1fr,2fr),rows(auto),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,2fr\)\,rows\(auto\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(c,cols(repeat(2,1fr)),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(c\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: center;
    place-items: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(aw,cols(repeat(2,1fr)),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(aw\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: start space-between;
    place-items: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(ccs,cols(repeat(2,1fr)),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(ccs\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
    place-content: center;
    place-items: stretch;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(acsa,cols(repeat(2,1fr)),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(acsa\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: start;
    text-indent: unset;
    place-content: start center;
    place-items: stretch start;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(..sa,cols(repeat(2,1fr)),gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(\.\.sa\,cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: start;
    text-indent: unset;
    place-content: unset;
    place-items: stretch start;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(rows(repeat(3,1fr)),column,gap(0.5rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(rows\(repeat\(3\,1fr\)\)\,column\,gap\(0\.5rem\)\,p\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-rows: repeat(3, 1fr);
    grid-auto-flow: column;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $grid(cols(repeat(4,1fr)),scroll:hidden,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(4\,1fr\)\)\,scroll\:hidden\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(4, 1fr);
    overflow-inline: scroll;
    overflow-block: hidden;
    gap: 1rem;
  }
}
```