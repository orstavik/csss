**description:** Wrapping flex with 1rem row gap and 2rem column gap.
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

**description:** 2-column grid with 1rem row gap and 0.5rem column gap.
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
