**csss:** $flex(gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-items: unset;
    place-content: unset;
    gap: 1rem;
  }
}
```

**csss:** |:nth-child(1)$_flex(grow(1))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$_flex\(grow\(1\)\)> :where(:nth-child(1)) {
    flex-grow: 1;
  }
}
```

**csss:** |:nth-child(2)$_flex(grow(2))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_flex\(grow\(2\)\)> :where(:nth-child(2)) {
    flex-grow: 2;
  }
}
```

**csss:** |:nth-child(3)$_flex(shrink(0.5))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_flex\(shrink\(0\.5\)\)> :where(:nth-child(3)) {
    flex-shrink: 0.5;
  }
}
```

**csss:** |:nth-child(4)$_flex(basis(100px))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$_flex\(basis\(100px\)\)> :where(:nth-child(4)) {
    flex-basis: 100px;
  }
}
```

**csss:** |:nth-child(1)$_flex(start)
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$_flex\(start\)> :where(:nth-child(1)) {
    align-self: start;
    text-align: start;
  }
}
```

**csss:** |:nth-child(2)$_flex(center)
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$_flex\(center\)> :where(:nth-child(2)) {
    align-self: center;
    text-align: center;
  }
}
```

**csss:** |:nth-child(3)$_flex(end)
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$_flex\(end\)> :where(:nth-child(3)) {
    align-self: end;
    text-align: end;
  }
}
```

**csss:** |:nth-child(4)$_flex(stretch)
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$_flex\(stretch\)> :where(:nth-child(4)) {
    align-self: stretch;
    text-align: justify;
  }
}
```

**csss:** $flex(gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\,p\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-items: unset;
    place-content: unset;
    gap: 1rem;
    padding: 1rem;
}
}
```

**csss:** |*$_flex(m(5px),h(120px),w(150px),scrollMargin(10px))
**css:**
```css
@layer items {
  .\|\*\$_flex\(m\(5px\)\,h\(120px\)\,w\(150px\)\,scrollMargin\(10px\)\)>* {
    margin: 5px;
    block-size: 120px;
    inline-size: 150px;
    scroll-margin: 10px;
}
}
```