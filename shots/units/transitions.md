**csss:** $easeIn(2s)
**css:**
```css
@layer containerDefault {
  .\$easeIn\(2s\) {
    transition: 2s ease-in;
  }
}
```

**csss:** $bounceInOut(2s,0,margin,color)
**css:**
```css
@layer containerDefault {
  .\$bounceInOut\(2s\,0\,margin\,color\) {
    transition: margin 2s 0s cubic-bezier(0.25,-0.30,0.70,1.30), color 2s 0s cubic-bezier(0.25,-0.30,0.70,1.30);
  }
}
```

**csss:** $jumpEnd(5)
**css:**
```css
@layer containerDefault {
  .\$jumpEnd\(5\) {
    transition: steps(5, jump-end);
  }
}
```