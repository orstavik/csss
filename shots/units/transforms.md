**csss:** $rotate(45deg)
**css:**
```css
@layer containerDefault {
  .\$rotate\(45deg\) {
    transform: rotate(45deg);
  }
}
```

**csss:** $scale(30%,15%)
**css:**
```css
@layer containerDefault {
  .\$scale\(30\%\,15\%\) {
    transform: scale(30%, 15%);
  }
}
```

**csss:** $scale(30%)
**css:**
```css
@layer containerDefault {
  .\$scale\(30\%\) {
    transform: scale(30%);
  }
}
```

**csss:** $translate(10px,5%)$rotate(15deg)
**css:**
```css
@layer containerDefault {
  .\$translate\(10px\,5\%\)\$rotate\(15deg\) {
    transform: translate(10px, 5%) rotate(15deg);
  }
}
```

**csss:** $translate(10px,5%)$rotate(15deg)$matrix(1,2,3,4,5,6.6)
**css:**
```css
@layer containerDefault {
  .\$translate\(10px\,5\%\)\$rotate\(15deg\)\$matrix\(1\,2\,3\,4\,5\,6\.6\) {
    transform: translate(10px, 5%) rotate(15deg) matrix(1, 2, 3, 4, 5, 6.6);
  }
}
```

**csss:** $scale3d(1,2,3)$rotate3d(1,2,3,15deg)$translate3d(10px,5%,10px)
**css:**
```css
@layer containerDefault {
  .\$scale3d\(1\,2\,3\)\$rotate3d\(1\,2\,3\,15deg\)\$translate3d\(10px\,5\%\,10px\) {
    transform: scale3d(1, 2, 3) rotate3d(1, 2, 3, 15deg) translate3d(10px, 5%, 10px);
  }
}
```
