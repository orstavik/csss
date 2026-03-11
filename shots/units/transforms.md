**description:** Rotates the element 45 degrees clockwise.
**csss:** $rotate(45deg)
**css:**
```css
.\$rotate\(45deg\) {
  transform: rotate(45deg);
}
```

**description:** Scales the element to 30% width and 15% height.
**csss:** $scale(30%,15%)
**css:**
```css
.\$scale\(30\%\,15\%\) {
  transform: scale(30%, 15%);
}
```

**description:** Scales the element uniformly to 30%.
**csss:** $scale(30%)
**css:**
```css
.\$scale\(30\%\) {
  transform: scale(30%);
}
```

**description:** Translates and rotates the element in a single transform.
**csss:** $translate(10px,5%)$rotate(15deg)
**css:**
```css
.\$translate\(10px\,5\%\)\$rotate\(15deg\) {
  transform: translate(10px, 5%) rotate(15deg);
}
```

**description:** Chains translate, rotate and matrix transforms together.
**csss:** $translate(10px,5%)$rotate(15deg)$matrix(1,2,3,4,5,6.6)
**css:**
```css
.\$translate\(10px\,5\%\)\$rotate\(15deg\)\$matrix\(1\,2\,3\,4\,5\,6\.6\) {
  transform: translate(10px, 5%) rotate(15deg) matrix(1, 2, 3, 4, 5, 6.6);
}
```

**description:** Chains 3D scale, rotate and translate transforms together.
**csss:** $scale3d(1,2,3)$rotate3d(1,2,3,15deg)$translate3d(10px,5%,10px)
**css:**
```css
.\$scale3d\(1\,2\,3\)\$rotate3d\(1\,2\,3\,15deg\)\$translate3d\(10px\,5\%\,10px\) {
  transform: scale3d(1, 2, 3) rotate3d(1, 2, 3, 15deg) translate3d(10px, 5%, 10px);
}
```
