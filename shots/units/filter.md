**description:** Applies a 10px backdrop blur filter.
**csss:** $backdrop(blur(10px))
**css:**
```css
@layer containerDefault {
  .\$backdrop\(blur\(10px\)\) {
    backdrop-filter: blur(10px);
  }
}
```

**description:** Applies a 5px backdrop blur filter.
**csss:** $backdrop(blur(5px))
**css:**
```css
@layer containerDefault {
  .\$backdrop\(blur\(5px\)\) {
    backdrop-filter: blur(5px);
  }
}
```

**description:** Applies backdrop brightness with an SVG filter reference.
**csss:** $backdrop(brightness(0.5),"common-filters.svg#filter")
**css:**
```css
@layer containerDefault {
  .\$backdrop\(brightness\(0\.5\)\,\"common-filters\.svg\#filter\"\) {
    backdrop-filter: brightness(0.5) url("common-filters.svg#filter");
  }
}
```

**description:** Applies a red drop-shadow filter with URL and ID-based SVG filters.
**csss:** $filter(dropShadow(#red,5px,5px,5px),url("https://example.com/filter"),"#anotherFilter")
**css:**
```css
@layer containerDefault {
  .\$filter\(dropShadow\(\#red\,5px\,5px\,5px\)\,url\(\"https\:\/\/example\.com\/filter\"\)\,\"\#anotherFilter\"\) {
    filter: drop-shadow(5px 5px 5px red) url("https://example.com/filter") url("#anotherFilter");
  }
}
```

**description:** Chains 9 filter functions: blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia and hue-rotate.
**csss:** $filter(blur(5px),brightness(0.5),contrast(200%),grayscale(50%))$filter(invert(100%),opacity(0.5),saturate(200%),sepia(100%),hueRotate(90deg))
**css:**
```css
@layer containerDefault {
  .\$filter\(blur\(5px\)\,brightness\(0\.5\)\,contrast\(200\%\)\,grayscale\(50\%\)\)\$filter\(invert\(100\%\)\,opacity\(0\.5\)\,saturate\(200\%\)\,sepia\(100\%\)\,hueRotate\(90deg\)\) {
    filter: blur(5px) brightness(0.5) contrast(200%) grayscale(50%) invert(100%) opacity(0.5) saturate(200%) sepia(100%) hue-rotate(90deg);
  }
}
```
