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

**csss:** $textShadow(0,4px,8px,#rgba(0,0,0,0.3))
**css:**
```css
@layer containerDefault {
  .\$textShadow\(0\,4px\,8px\,\#rgba\(0\,0\,0\,0\.3\)\) {
    text-shadow: 0 4px 8px #0000004d;
  }
}
```

**csss:** $textShadow(2px,2px,4px,#000000)
**css:**
```css
@layer containerDefault {
  .\$textShadow\(2px\,2px\,4px\,\#000000\) {
    text-shadow: 2px 2px 4px #000000;
  }
}
```

**csss:** $uppercase
**css:**
```css
@layer containerDefault {
  .\$uppercase {
    text-transform: uppercase;
  }
}
```

**csss:** $noTextTransform
**css:**
```css
@layer containerDefault {
  .\$noTextTransform {
    text-transform: none;
  }
}
```