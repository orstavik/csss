**csss:** $Typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
**css:**
```css
@font-face /*comic normal*/ {
  font-family: comic;
  font-style: normal;
  src: local(comic), url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

@layer containerDefault {
  .\$Typeface\(comic\,\"MS\+Comic\+Sans\"\,face\(\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\)\,xxs\,semiExpanded\,italic\,bolder\) {
    --comicFontFamily: "MS Comic Sans", comic;
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
    font-weight: bold;
    font-size-adjust: 0.5;
    font-style: italic;
    font-width: condensed;
    font-size: 12px;
    font-family: system-ui, sans-serif;
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

**csss:** $Font(body,16px,bold)
**css:**
```css
@layer containerDefault {
  .\$Font\(body\,16px\,bold\) {
    font-family: var(--bodyFontFamily, body);
    font-size: 16px;
    font-style: var(--bodyFontStyle, unset);
    font-weight: bold;
    font-size-adjust: var(--bodyFontSizeAdjust, unset);
    letter-spacing: var(--bodyLetterSpacing, unset);
    text-transform: var(--bodyTextTransform, unset);
    font-width: var(--bodyFontWidth, unset);
    font-stretch: var(--bodyFontWidth, unset);
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

**csss:** $lineHeight(1.5)
**css:**
```css
@layer containerDefault {
  .\$lineHeight\(1\.5\) {
    line-height: 1.5;
  }
}
```

**csss:** $font(serif,hyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(serif\,hyphens\) {
    font-family: serif, hyphens;
  }
}
```

**csss:** $shy
**css:**
```css
@layer containerDefault {
  .\$shy {
    hyphens: manual;
  }
}
```

**csss:** $noHyphens
**css:**
```css
@layer containerDefault {
  .\$noHyphens {
    hyphens: none;
  }
}
```

**comment:** $font(hyphens) should work, and $Font(hypens) is what we have below. 
**csss:** $font(hyphens)
**css:**
```css
@layer containerDefault {
  .\$font\(hyphens\) {
    font-family: hyphens;
  }
}
```