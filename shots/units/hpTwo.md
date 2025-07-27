**csss:** $color(#primary#80#a25)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#80\#a25\) {
    color: color-mix(in oklab, color-mix(in oklab, var(--color-primary) 20%, var(--color-primary1) 80%) 25%, transparent 75%);
  }
}
```

**csss:** @xxl$w(20px)
**css:**
```css
@layer container {
  @media (min-width:1536px) {
    .\@xxl\$w\(20px\) {
      inline-size: 20px;
    }
  }
}
```

**csss:** @xxxl$w(20px)
**css:**
```css
@layer container {
  @media (min-width:1920px) {
    .\@xxxl\$w\(20px\) {
      inline-size: 20px;
    }
  }
}
```
