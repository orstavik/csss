**csss:** $dottedOverUnderLineThrough(#green,2px,noSkipInk)
**css:**
```css
@layer containerDefault {
  .\$dottedOverUnderLineThrough\(\#green\,2px\,noSkipInk\) {
    text-decoration: overline underline line-through dotted green 2px;
    text-decoration-skip-ink: none;
  }
}
```

**csss:** $dashedOverLine(#red)
**css:**
```css
@layer containerDefault {
  .\$dashedOverLine\(\#red\) {
    text-decoration: overline dashed red;
  }
}
```

**csss:** $noTextDecoration
**css:**
```css
@layer containerDefault {
  .\$noTextDecoration {
    text-decoration: none;
    text-decoration-skip-ink: none;
  }
}
```