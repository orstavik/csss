**csss:** $absolute(0,0)
**css:**
```css
@layer containerDefault {
  .\$absolute\(0\,0\) {
    position: absolute;
    left: 0;
    top: 0;
  }
}
```

**csss:** $fixed(rightBottom,0,0)
**css:**
```css
@layer containerDefault {
  .\$fixed\(rightBottom\,0\,0\) {
    position: fixed;
    right: 0;
    bottom: 0;
  }
}
```

**csss:** $relative(start,10px+2em,5%)
**css:**
```css
@layer containerDefault {
  .\$relative\(start\,10px\+2em\,5\%\) {
    position: relative;
    inset-inline-start: calc(10px + 2em);
    inset-block-start: 5%;
  }
}
```
