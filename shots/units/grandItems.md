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

**csss:** |.item|.child$blockItem()
**css:**
```css
@layer grandItems {
  .\|\.item\|\.child\$blockItem\(\)>:where(.item)>:where(.child) {
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
