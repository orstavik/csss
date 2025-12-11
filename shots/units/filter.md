**csss:** $filter(blur(5px),brightness(0.5),contrast(200%),grayscale(50%))$filter(invert(100%),opacity(0.5),saturate(200%),sepia(100%),hueRotate(90deg))
**css:**
```css
@layer containerDefault {
  .\$filter\(blur\(5px\)\,brightness\(0\.5\)\,contrast\(200\%\)\,grayscale\(50\%\)\)\$filter\(invert\(100\%\)\,opacity\(0\.5\)\,saturate\(200\%\)\,sepia\(100\%\)\,hueRotate\(90deg\)\) {
    filter: blur(5px) brightness(0.5) contrast(200%) grayscale(50%) invert(100%) opacity(0.5) saturate(200%) sepia(100%) hue-rotate(90deg);
  }
}
```

**csss:** $filter(dropShadow(#red,5px,5px,5px))
**css:**
```css
@layer containerDefault {
  .\$filter\(dropShadow\(\#red\,5px\,5px\,5px\)\) {
    filter: drop-shadow(red 5px 5px 5px);
  }
}
```

**csss:** $backdrop(blur(10px))
**css:**
```css
@layer containerDefault {
  .\$backdrop\(blur\(10px\)\) {
    backdrop-filter: blur(10px);
  }
}
```
