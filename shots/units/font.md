**csss:** $Typeface(comic,"MS+Comic+Sans","https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2",xxs,semiExpanded,italic,bolder)
**css:**
```css
@font-face /*"https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"*/ {
  font-family: ComicNeue;
  src: local("ComicNeue"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

@layer containerDefault {
  .\$Typeface\(comic\,\"MS\+Comic\+Sans\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\,xxs\,semiExpanded\,italic\,bolder\) {
    --comicFontFamily: "MS Comic Sans", ComicNeue;
    --comicFontSize: xx-small;
    --comicFontStyle: italic;
    --comicFontWeight: bolder;
    --comicFontWidth: semi-expanded;
  }
}
```


**csss:** $Typeface(body,system-ui,sans-serif,400,0.5,bold,i,condensed,12px,uppercase)
**css:**
```css
@layer containerDefault {
  .\$Typeface\(body\,system-ui\,sans-serif\,400\,0\.5\,bold\,i\,condensed\,12px\,uppercase\) {
    --bodyFontFamily: system-ui, sans-serif;
    --bodyFontSize: 12px;
    --bodyFontStyle: italic;
    --bodyFontWeight: bold;
    --bodyFontSizeAdjust: 0.5;
    --bodyTextTransform: uppercase;
    --bodyFontWidth: condensed;
  }
}
```

**csss:** $font(system-ui,sans-serif,400,0.5,bold,i,condensed,12px)
**css:**
```css
@layer containerDefault {
  .\$font\(system-ui\,sans-serif\,400\,0\.5\,bold\,i\,condensed\,12px\) {
    font-family: system-ui, sans-serif;
    font-weight: bold;
    font-size-adjust: 0.5;
    font-style: italic;
    font-width: condensed;
    font-size: 12px;
  }
}
```

**csss:** $font(body)
**css:**
```css
@layer containerDefault {
  .\$font\(body\) {
    font-family: body;
  }
}
```

**csss:** $Font(body)
**css:**
```css
@layer containerDefault {
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
}
```

**csss:** $Font(_,Arial,16px,bold)
**css:**
```css
@layer containerDefault {
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
}
```

**csss:** $font(serif,hyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(serif\,hyphens\) {
    font-family: serif;
    hyphens: auto;
  }
}
```

**csss:** $font(shy)
**css:**
```css
@layer containerDefault {
  .\$font\(shy\) {
    hyphens: manual;
  }
}
```

**csss:** $font(noHyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(noHyphens\) {
    hyphens: none;
  }
}
```

**csss:** $font(hyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(hyphens\) {
    hyphens: auto;
  }
}
```

**csss:** $font(uppercase)
**css:**
```css
@layer containerDefault {
  .\$font\(uppercase\) {
    text-transform: uppercase;
  }
}
```

**csss:** $font(noTransform)
**css:**
```css
@layer containerDefault {
  .\$font\(noTransform\) {
    text-transform: none;
  }
}
```