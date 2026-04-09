**description:**
test.
**csss:**
$animate(0>2s)$translate(0px+1px>30px*2)
**css:**
```css
@keyFrames a0_translate_1px_100_translate_60px {
  0% {
    translate: 1px;
  }
  100% {
    translate: 60px;
  }
}

.\$animate\(0\>2s\)\$translate\(0px\+1px\>30px\*2\) {
  animation: 2000 a0_translate_1px_100_translate_60px;
}
```

**description:**
test.
**csss:**
$animate(0>2s)$translate(4px,0px+1px>30px*2)
**css:**
```css
@keyFrames a0_translate_4px_1px_100_translate_4px_60px {
  0% {
    translate: 4px 1px;
  }
  100% {
    translate: 4px 60px;
  }
}

.\$animate\(0\>2s\)\$translate\(4px\,0px\+1px\>30px\*2\) {
  animation: 2000 a0_translate_4px_1px_100_translate_4px_60px;
}
```