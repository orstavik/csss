**description:** Relative positioning setup, resets and offsets.
**csss:**
$relative
$relative(start,10px+2em,5%)
**css:**
```css
.\$relative {
  position: relative;
}

.\$relative\(start\,10px\+2em\,5\%\) {
  position: relative;
  inset-inline-start: calc(10px + 2em);
  inset-block-start: 5%;
}
```

**description:** Absolute positioning specific anchors.
**csss:**
$absolute(top,40%)
$absolute(0,0)
**css:**
```css
.\$absolute\(top\,40\%\) {
  position: absolute;
  top: 40%;
}

.\$absolute\(0\,0\) {
  position: absolute;
  left: 0;
  top: 0;
}
```

**description:** Fixed positioning patterns.
**csss:**
$fixed(rightBottom,0,0)
**css:**
```css
.\$fixed\(rightBottom\,0\,0\) {
  position: fixed;
  right: 0;
  bottom: 0;
}
```

**description:** Layering context using z-index.
**csss:**
$zIndex(10)
**css:**
```css
.\$zIndex\(10\) {
  z-index: 10;
}
```
