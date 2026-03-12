# Gap & Spacing System

## Flex Container Gaps

**description:** Wrapping flex with 1rem row gap and 2rem column gap.
**csss:** $flex(wrap,gap(1rem,2rem))
**css:**
```css
.\$flex\(wrap\,gap\(1rem\,2rem\)\) {
  flex-wrap: wrap;
  gap: 1rem 2rem;
}
```

## Grid Container Gaps

**description:** 2-column grid with 1rem row gap and 0.5rem column gap.
**csss:** $grid(cols(repeat(2,1fr)),gap(1rem,0.5rem))
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\,0\.5rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 0.5rem;
}
```

**description:** 3-column grid with asymmetric gaps, overflow scroll and content centering.
**csss:** $grid(cols(repeat(3,1fr)),gap(2rem,0.75rem),overflowAuto,contentCenter,padding(1rem))
**css:**
```css
.\$grid\(cols\(repeat\(3\,1fr\)\)\,gap\(2rem\,0\.75rem\)\,overflowAuto\,contentCenter\,padding\(1rem\)\) {
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem 0.75rem;
  overflow: auto;
  place-content: center;
  padding: 1rem;
}
```

**description:** Auto-fit grid with regular gaps and item stretching.
**csss:** $grid(cols(repeat(3,1fr)),gap(1rem),itemsStretch,padding(1.5rem))
**css:**
```css
.\$grid\(cols\(repeat\(3\,1fr\)\)\,gap\(1rem\)\,itemsStretch\,padding\(1\.5rem\)\) {
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  place-items: stretch;
  padding: 1.5rem;
}
```
