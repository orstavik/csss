**description:**
A layout container with a 5px backdrop blur effect.
**csss:**
```csss
$backdrop(blur(5px))
```
**css:**
```css
.\$backdrop\(blur\(5px\)\) {
  backdrop-filter: blur(5px);
}
```
**description:**
A layout container with backdrop brightness reduction with an svg filter reference.
**csss:**
```csss
$backdrop(brightness(0.5),"common-filters.svg#filter")
```
**css:**
```css
.\$backdrop\(brightness\(0\.5\)\,\"common-filters\.svg\#filter\"\) {
  backdrop-filter: brightness(0.5) url("common-filters.svg#filter");
}
```
