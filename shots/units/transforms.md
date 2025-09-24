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
    transform: scale(0.3, 0.15);
  }
}
```

**csss:** $scale(30%)
**css:**
```css
@layer containerDefault {
  .\$scale\(30\%\) {
    transform: scale(0.3);
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