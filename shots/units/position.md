
**csss:** $relative
**css:**
```css
@layer containerDefault {
  .\$relative {
    position: relative;
  }
}
```

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

**csss:** $zIndex(10)
**css:**
```css
@layer containerDefault {
  .\$zIndex\(10\) {
    z-index: 10;
  }
}
```

---

**csss:**
$relative
|.badge$absolute(rightTop,0,0)$zIndex(10)
**css:**
```css
@layer containerDefault {
  .\$relative {
    position: relative;
  }
}
@layer items {
  .\|\.badge\$absolute\(rightTop\,0\,0\)\$zIndex\(10\)>:where(.badge) {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
  }
}
```

**csss:**
$Block(padding(1rem))$relative
|.overlay$absolute(0,0)$zIndex(5)
|.content$absolute(top,50%)$zIndex(10)
**css:**
```css
@layer containerDefault {
  .\$Block\(padding\(1rem\)\)\$relative {
    display: block;
    padding: 1rem;
    position: relative;
  }
}

@layer items {
  .\|\.overlay\$absolute\(0\,0\)\$zIndex\(5\)>:where(.overlay) {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5;
  }
}

@layer items {
  .\|\.content\$absolute\(top\,50\%\)\$zIndex\(10\)>:where(.content) {
    position: absolute;
    top: 50%;
    z-index: 10;
  }
}
```