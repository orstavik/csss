**description:**
An example demonstrating creates 3-column grid with 1rem gap as outer container.
**csss:**
```csss
$grid(cols(repeat(3,1fr)),gap(1rem))
```
**css:**
```css
.\$grid\(cols\(repeat\(3\,1fr\)\)\,gap\(1rem\)\) {
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```
**description:**
A layout container with flex column with 0.5rem gap to all default children.
**csss:**
```csss
|$flex(column,gap(0.5rem))
```
**css:**
```css
.\|\$flex\(column\,gap\(0\.5rem\)\)>* {
  flex-direction: column;
  gap: 0.5rem;
}
```
**description:**
An example demonstrating adds 0.5rem margin on all grandchildren via default layer.
**csss:**
```csss
||$blockItem(margin(0.5rem))
```
**css:**
```css
.\|\|\$blockItem\(margin\(0\.5rem\)\)>*>* {
  margin: 0.5rem;
}
```
**description:**
A layout container with flex row with 0.5rem gap to all direct children.
**csss:**
```csss
|*$flex(row,gap(0.5rem))
```
**css:**
```css
.\|\*\$flex\(row\,gap\(0\.5rem\)\)>* {
  flex-direction: row;
  gap: 0.5rem;
}
```
**description:**
An example demonstrating adds 1rem margin on all grandchildren (wildcard default).
**csss:**
```csss
||*$blockItem(margin(1rem))
```
**css:**
```css
.\|\|\*\$blockItem\(margin\(1rem\)\)>*>* {
  margin: 1rem;
}
```
