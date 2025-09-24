**csss:** $backdropBlur(5px)
**css:**
```css
@layer containerDefault {
  .\$backdropBlur\(5px\) {
    backdrop-filter: blur(5px);
  }
}
```

**csss:** $backdropBrightness(0.5)$backdropFilter("common-filters.svg#filter")
**css:**
```css
@layer containerDefault {
  .\$backdropBrightness\(0\.5\)\$backdropFilter\(\"common-filters\.svg\#filter\"\) {
    backdrop-filter: brightness(0.5) url("common-filters.svg#filter");
  }
}
```