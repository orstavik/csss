**csss:** $typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
**css:**
```css
@font-face /*comic normal*/ {
  font-family: comic;
  font-style: normal;
  src: local(comic), url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

@layer containerDefault {
  .\$typeface\(comic\,\"MS\+Comic\+Sans\"\,face\(\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\)\,xxs\,semiExpanded\,italic\,bolder\) {
    --comicFontFamily: "MS Comic Sans", comic;
    --comicFontSize: xx-small;
    --comicFontStyle: italic;
    --comicFontWeight: bolder;
    --comicFontWidth: semi-expanded;
  }
}
```


**csss:** $typeface(body,system-ui,sans-serif,400,0.5,bold,i,condensed,12px,uppercase)
**css:**
```css
@layer containerDefault {
  .\$typeface\(body\,system-ui\,sans-serif\,400\,0\.5\,bold\,i\,condensed\,12px\,uppercase\) {
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
    font-family: system-ui, sans-serif, var(--system-uiFontFamily, unset);
    font-size: 12px;
    font-style: italic;
    font-weight: bold;
    font-size-adjust: 0.5;
    letter-spacing: var(--system-uiLetterSpacing, unset);
    text-transform: var(--system-uiTextTransform, unset);
    font-width: condensed;
    font-variant-caps: var(--system-uiFontVariantCaps, unset);
    font-synthesis: var(--system-uiFontSynthesis, unset);
    font-feature-settings: var(--system-uiFontFeatureSettings, unset);
    font-variation-settings: var(--system-uiFontVariationSettings, unset);
    -webkit-font-smoothing: var(--system-uiWebkitFontSmoothing, unset);
    -moz-osx-font-smoothing: var(--system-uiMozOsxFontSmoothing, unset);
    font-kerning: var(--system-uiFontKerning, unset);
    font-stretch: condensed;
  }
}
```

**csss:** $font(body)
**css:**
```css
@layer containerDefault {
  .\$font\(body\) {
    font-family: body, var(--bodyFontFamily, unset);
    font-size: var(--bodyFontSize, unset);
    font-style: var(--bodyFontStyle, unset);
    font-weight: var(--bodyFontWeight, unset);
    font-size-adjust: var(--bodyFontSizeAdjust, unset);
    letter-spacing: var(--bodyLetterSpacing, unset);
    text-transform: var(--bodyTextTransform, unset);
    font-width: var(--bodyFontWidth, unset);
    font-variant-caps: var(--bodyFontVariantCaps, unset);
    font-synthesis: var(--bodyFontSynthesis, unset);
    font-feature-settings: var(--bodyFontFeatureSettings, unset);
    font-variation-settings: var(--bodyFontVariationSettings, unset);
    -webkit-font-smoothing: var(--bodyWebkitFontSmoothing, unset);
    -moz-osx-font-smoothing: var(--bodyMozOsxFontSmoothing, unset);
    font-kerning: var(--bodyFontKerning, unset);
    font-stretch: var(--bodyFontWidth, unset);
  }
}
```