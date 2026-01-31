**csss:** $flex(column,gap(0.5rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $Flex(column,gap(0.5rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$Flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(rowReverse,gap(0.5rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
    flex-direction: row-reverse;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(wrap,gap(0.5rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap\,gap\(0\.5rem\)\,padding\(1rem\)\) {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(contentStart,itemsStart,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentStart\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: start;
    align-items: start;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```


**csss:** $flex(contentStartEnd,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentStartEnd\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: start end;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(contentStretchNormal,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentStretchNormal\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: stretch normal;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(contentNormalBetween,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentNormalBetween\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: normal space-between;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(contentCenter,itemsStretch,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentCenter\,itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: center;
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(contentBetweenStretch,itemsStart,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(contentBetweenStretch\,itemsStart\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    place-content: space-between stretch;
    align-items: start;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(itemsStretch,gap(1rem),padding(1rem),wrap)
**css:**
```css
@layer containerDefault {
  .\$flex\(itemsStretch\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
    align-items: stretch;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
```

**csss:** $flex(gap(2rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(2rem\)\,padding\(1rem\)\) {
    gap: 2rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(overflowScroll,padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(overflowScroll\,padding\(1rem\)\) {
    overflow: scroll;
    padding: 1rem;
  }
}
```

**csss:** $flex(gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\,padding\(1rem\)\) {
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\) {
    gap: 1rem;
  }
}
```

**csss:** $flex(row,gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(row\,gap\(1rem\)\,padding\(1rem\)\) {
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $flex(gap(0.5rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(0\.5rem\)\) {
    gap: 0.5rem;
  }
}
```


**csss:** |:nth-child(1)$FlexItem(grow(1))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$FlexItem\(grow\(1\)\)>:where(:nth-child(1)) {
    inline-size: unset;
    block-size: unset;
    margin-block: unset;
    margin-inline: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
    flex-grow: 1;
  }
}
```

**csss:** |:nth-child(1)$flexItem(grow(1))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
    flex-grow: 1;
  }
}
```

**csss:** |:nth-child(2)$flexItem(grow(2))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
    flex-grow: 2;
  }
}
```

**csss:** |:nth-child(3)$flexItem(shrink(0.5))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$flexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
    flex-shrink: 0.5;
  }
}
```

**csss:** |:nth-child(4)$flexItem(basis(100px))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$flexItem\(basis\(100px\)\)>:where(:nth-child(4)) {
    flex-basis: 100px;
  }
}
```

**csss:** |:nth-child(1)$flexItem(selfStart)
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$flexItem\(selfStart\)>:where(:nth-child(1)) {
    align-self: start;
  }
}
```

**csss:** |:nth-child(2)$flexItem(selfCenter)
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$flexItem\(selfCenter\)>:where(:nth-child(2)) {
    align-self: center;
  }
}
```

**csss:** |:nth-child(3)$flexItem(selfEnd)
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$flexItem\(selfEnd\)>:where(:nth-child(3)) {
    align-self: end;
  }
}
```

**csss:** |:nth-child(4)$flexItem(selfStretch)
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$flexItem\(selfStretch\)>:where(:nth-child(4)) {
    align-self: stretch;
  }
}
```

**csss:** |*$flexItem(margin(5px),size(150px,120px),scrollMargin(10px))
**css:**
```css
@layer items {
  .\|\*\$flexItem\(margin\(5px\)\,size\(150px\,120px\)\,scrollMargin\(10px\)\)>* {
    margin: 5px;
    inline-size: 150px;
    block-size: 120px;
    scroll-margin: 10px;
  }
}
```

**csss:** |*$flexItem(basis(100px))
**css:**
```css
@layer items {
  .\|\*\$flexItem\(basis\(100px\)\)>* {
    flex-basis: 100px;
  }
}
```

**csss:** |.item1$flexItem(grow(1))
**css:**
```css
@layer items {
  .\|\.item1\$flexItem\(grow\(1\)\)>:where(.item1) {
    flex-grow: 1;
  }
}
```

**csss:** |.two$flexItem(order(1),selfCenter)
**css:**
```css
@layer items {
  .\|\.two\$flexItem\(order\(1\)\,selfCenter\)>:where(.two) {
    order: 1;
    align-self: center;
  }
}
```

**csss:** |.three$flexItem(order(2),selfEnd)
**css:**
```css
@layer items {
  .\|\.three\$flexItem\(order\(2\)\,selfEnd\)>:where(.three) {
    order: 2;
    align-self: end;
  }
}
```

**csss:** |.four$flexItem(selfStretch)
**css:**
```css
@layer items {
  .\|\.four\$flexItem\(selfStretch\)>:where(.four) {
    align-self: stretch;
  }
}
```

**csss:** |.one$flexItem(order(3),selfStart,margin(1rem))
**css:**
```css
@layer items {
  .\|\.one\$flexItem\(order\(3\)\,selfStart\,margin\(1rem\)\)>:where(.one) {
    order: 3;
    align-self: start;
    margin: 1rem;
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
