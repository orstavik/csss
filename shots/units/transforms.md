**description:**
An example demonstrating rotates the element 45 degrees clockwise.
**csss:**
```csss
$rotate(45deg)
```
**css:**
```css
.\$rotate\(45deg\) {
  rotate: 45deg;
}
```
**description:**
An example demonstrating scales the element to 30% width and 15% height.
**csss:**
```csss
$scale(30%,15%)
```
**css:**
```css
.\$scale\(30\%\,15\%\) {
  scale: 30% 15%;
}
```
**description:**
An example demonstrating scales the element uniformly to 30%.
**csss:**
```csss
$scale(30%)
```
**css:**
```css
.\$scale\(30\%\) {
  scale: 30%;
}
```
**description:**
An example demonstrating translates and rotates the element in a single transform.
**csss:**
```csss
$translate(10px,5%)$rotate(15deg)
```
**css:**
```css
.\$translate\(10px\,5\%\)\$rotate\(15deg\) {
  translate: 10px 5%;
  rotate: 15deg;
}
```
**description:**
A use case that chains translate, rotate and matrix transforms together.
**csss:**
```csss
$translate(10px,5%)$rotate(15deg)$transform(matrix(1,2,3,4,5,6.6))
```
**css:**
```css
.\$translate\(10px\,5\%\)\$rotate\(15deg\)\$transform\(matrix\(1\,2\,3\,4\,5\,6\.6\)\) {
  translate: 10px 5%;
  rotate: 15deg;
  transform: matrix(1, 2, 3, 4, 5, 6.6);
}
```
**description:**
A use case that chains 3d scale, rotate and translate transforms together.
**csss:**
```csss
$scale(1,2,3)$rotate(1,2,3,15deg)$translate(10px,5%,10px)
```
**css:**
```css
.\$scale\(1\,2\,3\)\$rotate\(1\,2\,3\,15deg\)\$translate\(10px\,5\%\,10px\) {
  scale: 1 2 3;
  rotate: 1 2 3 15deg;
  translate: 10px 5% 10px;
}
```
