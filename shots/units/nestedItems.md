**csss:** $grid(cols(repeat(3,1fr)),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,1fr\)\)\,gap\(1rem\)\) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}
```

**csss:** |$flex(column,gap(0.5rem))
**css:**
```css
@layer itemsDefault {
  .\|\$flex\(column\,gap\(0\.5rem\)\)>* {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

**csss:** ||$blockItem(margin(0.5rem))
**css:**
```css
@layer grandItemsDefault {
  .\|\|\$blockItem\(margin\(0\.5rem\)\)>*>* {
    margin: 0.5rem;
  }
}
```

**csss:** |*$flex(row,gap(0.5rem))
**css:**
```css
@layer items {
  .\|\*\$flex\(row\,gap\(0\.5rem\)\)>* {
    flex-direction: row;
    gap: 0.5rem;
  }
}
```

**csss:** ||*$blockItem(margin(1rem))
**css:**
```css
@layer grandItems {
  .\|\|\*\$blockItem\(margin\(1rem\)\)>*>* {
    margin: 1rem;
  }
}
```
