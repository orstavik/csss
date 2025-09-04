**csss:** $block(gap(0.5rem,1.8))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\.5rem\,1\.8\)\) {
    display: block;
    word-spacing: 0.5rem;
    line-height: 1.8;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap\,gap\(1rem\,2rem\)\) {
    display: flex;
    align-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }
}
```

**csss:** $grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
    display: grid;
    place-items: unset;
    place-content: unset;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.5rem;
  }
}
```