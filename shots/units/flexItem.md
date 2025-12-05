**csss:** $flex(gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    gap: 1rem;
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

**csss:** $flex(gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\,padding\(1rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    gap: 1rem;
    padding: 1rem;
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