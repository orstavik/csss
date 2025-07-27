**csss:** $grid(layout,gap(2rem))
**css:**
```css
@layer container {
  .\$grid\(layout\,gap\(2rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
}
```

**csss:** $flex2
**css:**
```css
@layer container {
  .\$flex2 {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: center;
    text-indent: unset;
    flex-direction: row;
    gap: 1rem;
    padding: 1rem;
  }
}
```

**csss:** $unknown(22px)
**css:**
```css
@layer container {
  .\$unknown\(22px\) {
    font-size: 22px;
  }
}
```

**csss:** $grid(unknown(22px))
**css:**
```css
@layer container {
  .\$grid\(unknown\(22px\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    min-width: 22px;
    max-width: 22px;
  }
}
```