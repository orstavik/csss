**csss:** $backdrop(blur(5px))
**css:**
```css
@layer containerDefault {
  .\$backdrop\(blur\(5px\)\) {
    backdrop-filter: blur(5px);
  }
}
```

**csss:** $backdrop(brightness(0.5),"common-filters.svg#filter")
**css:**
```css
@layer containerDefault {
  .\$backdrop\(brightness\(0\.5\)\,\"common-filters\.svg\#filter\"\) {
    backdrop-filter: brightness(0.5) url("common-filters.svg#filter");
  }
}
```