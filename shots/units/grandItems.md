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

**csss:** |*$flexItem(margin(0.5rem))
**css:**
```css
@layer items {
  .\|\*\$flexItem\(margin\(0\.5rem\)\)>* {
    margin: 0.5rem;
  }
}
```

**csss:** |*|*$blockItem(margin(1rem))
**css:**
```css
@layer grandItems {
  .\|\*\|\*\$blockItem\(margin\(1rem\)\)>*>* {
    margin: 1rem;
  }
}
```

**csss:** |.item|.child$blockItem(indent(1em))
**css:**
```css
@layer grandItems {
  .\|\.item\|\.child\$blockItem\(indent\(1em\)\)>:where(.item)>:where(.child) {
    text-indent: 1em;
  }
}
```

**csss:** ||$blockItem(margin(2rem))
**css:**
```css
@layer grandItemsDefault {
  .\|\|\$blockItem\(margin\(2rem\)\)>*>* {
    margin: 2rem;
  }
}
```

**csss:** $grid(cols(repeat(2,1fr)),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\) {
    display: grid;
    place-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}
```

**csss:** |*|*$gridItem(size(50px,50px))
**css:**
```css
@layer grandItems {
  .\|\*\|\*\$gridItem\(size\(50px\,50px\)\)>*>* {
    inline-size: 50px;
    block-size: 50px;
  }
}
```

