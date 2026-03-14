**description:** Wrapping flex with multiple gap variants.
**csss:**
$flex(wrap,gap(1rem,2rem))
$grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```
