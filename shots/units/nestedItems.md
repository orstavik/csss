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

---

**csss:**
$Grid(cols(repeat(3,1fr)),gap(1rem))
|$flex(column,gap(0.5rem))
||*$blockItem(margin(0,0,0.5rem))
**css:**
```css
@layer containerDefault {
  .\$Grid\(cols\(repeat\(3\,1fr\)\)\,gap\(1rem\)\) {
    display: grid;
    place-items: unset;
    place-content: unset;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@layer itemsDefault {
  .\|\$flex\(column\,gap\(0\.5rem\)\)>* {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@layer grandItems {
  .\|\|\*\$blockItem\(margin\(0\,0\,0\.5rem\)\)>*>* {
    margin-block: 0 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:**
$Flex(wrap,gap(1rem),padding(1rem))
|*$flex(column,gap(0.5rem))
||*$blockItem(margin(0,0,0.25rem))
**css:**
```css
@layer containerDefault {
  .\$Flex\(wrap\,gap\(1rem\)\,padding\(1rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
  }
}

@layer items {
  .\|\*\$flex\(column\,gap\(0\.5rem\)\)>* {
    flex-direction: column;
    gap: 0.5rem;
  }
}

@layer grandItems {
  .\|\|\*\$blockItem\(margin\(0\,0\,0\.25rem\)\)>*>* {
    margin-block: 0 0.25rem;
    margin-inline: 0;
  }
}
```
