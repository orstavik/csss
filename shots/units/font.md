**description:** Defines a "comic" typeface with web font URL, size, stretch, style and weight.
**csss:** $Typeface(comic,"MS+Comic+Sans","https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2",xxSmall,semiExpanded,italic,bolder)
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/ {
  font-family: ComicNeue;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/
local("ComicNeue"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

.\$Typeface\(comic\,\"MS\+Comic\+Sans\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\,xxSmall\,semiExpanded\,italic\,bolder\) {
  --comicFontFamily: "MS Comic Sans", ComicNeue;
  --comicFontSize: xx-small;
  --comicFontStyle: italic;
  --comicFontWeight: bolder;
  --comicFontWidth: semi-expanded;
}
```

**description:** Defines a "body" typeface using system fonts with full style overrides.
**csss:** $Typeface(body,system-ui,sans-serif,0.5,bold,italic,condensed,12px,uppercase)
**css:**
```css
.\$Typeface\(body\,system-ui\,sans-serif\,0\.5\,bold\,italic\,condensed\,12px\,uppercase\) {
  --bodyFontFamily: system-ui, sans-serif;
  --bodyFontSize: 12px;
  --bodyFontStyle: italic;
  --bodyFontWeight: bold;
  --bodyFontSizeAdjust: 0.5;
  --bodyTextTransform: uppercase;
  --bodyFontWidth: condensed;
}
```

**description:** Sets font-family, weight, size-adjust, style, width and size directly.
**csss:** $font(system-ui,sans-serif,400,0.5,italic,condensed,12px)
**css:**
```css
.\$font\(system-ui\,sans-serif\,400\,0\.5\,italic\,condensed\,12px\) {
  font-family: system-ui, sans-serif;
  font-weight: 400;
  font-size-adjust: 0.5;
  font-style: italic;
  font-width: condensed;
  font-size: 12px;
}
```

**description:** Sets font-family to a named "body" font.
**csss:** $font(body)
**css:**
```css
.\$font\(body\) {
  font-family: body;
}
```

**description:** Sets serif font family with auto hyphenation.
**csss:** $font(serif,hyphens)
**css:**
```css
.\$font\(serif\,hyphens\) {
  font-family: serif;
  hyphens: auto;
}
```

**description:** Applies all "body" typeface variables to font properties.
**csss:** $Font(body)
**css:**
```css
.\$Font\(body\) {
  font-family: var(--bodyFontFamily, unset);
  font-size: var(--bodyFontSize, unset);
  font-style: var(--bodyFontStyle, unset);
  font-weight: var(--bodyFontWeight, unset);
  font-size-adjust: var(--bodyFontSizeAdjust, unset);
  letter-spacing: var(--bodyLetterSpacing, unset);
  text-transform: var(--bodyTextTransform, unset);
  font-width: var(--bodyFontWidth, unset);
  font-stretch: var(--bodyFontStretch, unset);
  font-variant-caps: var(--bodyFontVariantCaps, unset);
  font-synthesis: var(--bodyFontSynthesis, unset);
  font-feature-settings: var(--bodyFontFeatureSettings, unset);
  font-variation-settings: var(--bodyFontVariationSettings, unset);
  -webkit-font-smoothing: var(--bodyWebkitFontSmoothing, unset);
  -moz-osx-font-smoothing: var(--bodyMozOsxFontSmoothing, unset);
  font-kerning: var(--bodyFontKerning, unset);
  hyphens: var(--bodyHyphens, unset);
}
```

**description:** Resets all font properties and overrides family, size and weight.
**csss:** $Font(_,Arial,16px,bold)
**css:**
```css
.\$Font\(_\,Arial\,16px\,bold\) {
  font-family: Arial;
  font-size: 16px;
  font-style: unset;
  font-weight: bold;
  font-size-adjust: unset;
  letter-spacing: unset;
  text-transform: unset;
  font-width: unset;
  font-stretch: unset;
  font-variant-caps: unset;
  font-synthesis: unset;
  font-feature-settings: unset;
  font-variation-settings: unset;
  -webkit-font-smoothing: unset;
  -moz-osx-font-smoothing: unset;
  font-kerning: unset;
  hyphens: unset;
}
```

**description:** Enables manual hyphenation (soft hyphens only).
**csss:** $font(hyphensManual)
**css:**
```css
.\$font\(hyphensManual\) {
  hyphens: manual;
}
```

**description:** Disables all hyphenation.
**csss:** $font(hyphensNone)
**css:**
```css
.\$font\(hyphensNone\) {
  hyphens: none;
}
```

**description:** Enables automatic hyphenation via font.
**csss:** $font(hyphens)
**css:**
```css
.\$font\(hyphens\) {
  hyphens: auto;
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
