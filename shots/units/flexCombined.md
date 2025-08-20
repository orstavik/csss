**csss:** $flex(row,gap(1rem),p(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(row\,gap\(1rem\)\,p\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-items: unset;
    place-content: unset;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** |*$_flex(basis(100px))
**css:**
```css
@layer items {
  .\|\*\$_flex\(basis\(100px\)\)>* {
    flex-basis: 100px;
  }
}
```

**csss:** |.item1$_flex(grow(1))
**css:**
```css
@layer items {
  .\|\.item1\$_flex\(grow\(1\)\)> :where(.item1) {
    flex-grow: 1;
  }
}
```

**csss:** $flex(gap(0.5rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(0\.5rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-items: unset;
    place-content: unset;
    gap: 0.5rem;
  }
}
```



**csss:** |.one$_flex(order(3),start,m(1rem))
**css:**
```css
@layer items {
  .\|\.one\$_flex\(order\(3\)\,start\,m\(1rem\)\)> :where(.one) {
    order: 3;
    align-self: start;
    text-align: start;
    margin: 1rem;
  }
}
```

**csss:** |.two$_flex(order(1),selfCenter)
**css:**
```css
@layer items {
  .\|\.two\$_flex\(order\(1\)\,selfCenter\)> :where(.two) {
    order: 1;
    align-self: center;
  }
}
```

**csss:** |.three$_flex(order(2),end)
**css:**
```css
@layer items {
  .\|\.three\$_flex\(order\(2\)\,end\)> :where(.three) {
    order: 2;
    align-self: end;
    text-align: end;
  }
}
```

**csss:** |.four$_flex(stretch)
**css:**
```css
@layer items {
  .\|\.four\$_flex\(stretch\)> :where(.four) {
    align-self: stretch;
    text-align: justify;
  }
}
```