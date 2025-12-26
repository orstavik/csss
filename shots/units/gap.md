**csss:** $block(gap(0.5rem,1.8))
**css:**
```css
@layer containerDefault {
  .\$block\(gap\(0\.5rem\,1\.8\)\) {
    word-spacing: 0.5rem;
    line-height: 1.8;
  }
}
```

**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap\,gap\(1rem\,2rem\)\) {
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
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem 0.5rem;
  }
}
```
