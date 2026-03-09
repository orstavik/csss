**description:** Sets 1rem gap and padding on a flex container.
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

**description:** Adds 0.5rem margin on all direct flex children.
**csss:** |*$flexItem(margin(0.5rem))
**css:**
```css
@layer items {
  .\|\*\$flexItem\(margin\(0\.5rem\)\)>* {
    margin: 0.5rem;
  }
}
```

**description:** Adds 1rem margin on all grandchildren (children of children).
**csss:** |*|*$blockItem(margin(1rem))
**css:**
```css
@layer grandItems {
  .\|\*\|\*\$blockItem\(margin\(1rem\)\)>*>* {
    margin: 1rem;
  }
}
```

**description:** Targets .child grandchild inside .item child with empty block item.
**csss:** |.item|.child$blockItem()
**css:**
```css
@layer grandItems {
  .\|\.item\|\.child\$blockItem\(\)>:where(.item)>:where(.child) {
  }
}
```

**description:** Adds 2rem margin on all grandchildren via default grand items layer.
**csss:** ||$blockItem(margin(2rem))
**css:**
```css
@layer grandItemsDefault {
  .\|\|\$blockItem\(margin\(2rem\)\)>*>* {
    margin: 2rem;
  }
}
```

**description:** Creates 2-column grid with 1rem gap.
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

**description:** Sets 50x50px size on all grid grandchildren.
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
