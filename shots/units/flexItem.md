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