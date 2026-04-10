**description:**
A wrapping flex container representing a card layout with wider horizontal spacing.
**csss:**
```csss
$flex(wrap,gap(1rem,2rem))
```
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```
**description:**
A grid listing where rows are visually more separated than columns.
**csss:**
```csss
$grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
```
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```
