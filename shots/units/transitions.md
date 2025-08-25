**csss:** $easeIn(2s)
**css:**
```css
@layer containerDefault {
  .\$easeIn\(2s\) {
    transition: all 2s ease-in;
  }
}
```

**csss:** $easeInBounceOut(2s,0,margin,color)
**css:**
```css
@layer containerDefault {
  .\$easeInBounceOut\(2s\,0\,margin\,color\) {
    transition: margin 2s 0s cubic-bezier(.42,0,.64,1), color 2s 0s cubic-bezier(.42,0,.64,1);
  }
}
```