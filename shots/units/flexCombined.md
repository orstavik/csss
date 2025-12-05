**csss:** $flex(row,gap(1rem),padding(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(row\,gap\(1rem\)\,padding\(1rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
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

**csss:** $flex(gap(0.5rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(0\.5rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    gap: 0.5rem;
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