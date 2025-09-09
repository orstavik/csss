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
    transition: margin 2s 0s cubic-bezier(0.42,0,0.70,1.30), color 2s 0s cubic-bezier(0.42,0,0.70,1.30);
  }
}
```

**xcsss:** $block((--transitionDuration,2s+0.3s))
**xcss:**
```css
@layer containerDefault {
  .\$block\(\(--transitionDuration\,2s\+0\.3s\)\) {
    --transition-duration: calc(2s + 0.3s);
  }
}
```