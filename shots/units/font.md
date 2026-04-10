**description:** Sets font-family, weight, size-adjust, style, width and size directly.
**csss:** $font(system-ui,sans-serif,400,adjust(0.5),italic,condensed,12px)
**css:**
```css
.\$font\(system-ui\,sans-serif\,400\,adjust\(0\.5\)\,italic\,condensed\,12px\) {
  font-family: system-ui, sans-serif;
  font-weight: 400;
  font-size-adjust: 0.5;
  font-style: italic;
  font-stretch: condensed;
  font-size: 12px;
}
```

**description:** Sets font-family to "body" font.
**csss:** $font(body)
**css:**
```css
.\$font\(body\) {
  font-family: body;
}
```

**description:** Sets serif font family.
**csss:** $font(serif)
**css:**
```css
.\$font\(serif\) {
  font-family: serif;
}
```

**description:** Resets all font properties and overrides family, size and weight.
**csss:** $Font(_,Arial,16px,bold)
**css:**
```css
.\$Font\(_\,Arial\,16px\,bold\) {
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  font-style: unset;
  font-size-adjust: unset;
  letter-spacing: unset;
  text-transform: unset;
  font-stretch: unset;
  font-variant-caps: unset;
  font-synthesis: unset;
  font-feature-settings: unset;
  font-variation-settings: unset;
  font-kerning: unset;
}
```

**description:** Transforms text to uppercase.
**csss:** $font(uppercase)
**css:**
```css
.\$font\(uppercase\) {
  text-transform: uppercase;
}
```

**description:** Removes any text transformation.
**csss:** $font(transformNone)
**css:**
```css
.\$font\(transformNone\) {
  text-transform: none;
}
```
