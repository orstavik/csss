**description:** Sets position to relative without any offset.
**csss:** $relative
**css:**
```css
@layer containerDefault {
  .\$relative {
    position: relative;
  }
}
```

**description:** Offsets a relative element using logical inline/block start with calc expression.
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

**description:** Positions element absolutely anchored to top at 40%.
**csss:** $absolute(top,40%)
**css:**
```css
@layer containerDefault {
  .\$absolute\(top\,40\%\) {
    position: absolute;
    top: 40%;
  }
}
```

**description:** Positions element absolutely at left:0 top:0.
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

**description:** Fixes element to the bottom-right corner of the viewport.
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

**description:** Sets the stacking order z-index to 10.
**csss:** $zIndex(10)
**css:**
```css
@layer containerDefault {
  .\$zIndex\(10\) {
    z-index: 10;
  }
}
```
