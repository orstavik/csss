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
    font-family: var(--system-uiFontFamily, system-ui, sans-serif);
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
    --fontFontFamily: var(--system-uiFontFamily, system-ui, sans-serif);
    --fontFontSize: 12px;
    --fontFontStyle: italic;
    --fontFontWeight: bold;
    --fontFontSizeAdjust: 0.5;
    --fontLetterSpacing: var(--system-uiLetterSpacing, unset);
    --fontTextTransform: var(--system-uiTextTransform, unset);
    --fontFontWidth: condensed;
    --fontFontVariantCaps: var(--system-uiFontVariantCaps, unset);
    --fontFontSynthesis: var(--system-uiFontSynthesis, unset);
    --fontFontFeatureSettings: var(--system-uiFontFeatureSettings, unset);
    --fontFontVariationSettings: var(--system-uiFontVariationSettings, unset);
    --fontWebkitFontSmoothing: var(--system-uiWebkitFontSmoothing, unset);
    --fontMozOsxFontSmoothing: var(--system-uiMozOsxFontSmoothing, unset);
    --fontFontKerning: var(--system-uiFontKerning, unset);
  }
}
```

**csss:** $font(body)
**css:**
```css
@layer containerDefault {
  .\$font\(body\) {
    font-family: var(--bodyFontFamily, body);
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
    --fontFontFamily: var(--bodyFontFamily, body);
    --fontFontSize: var(--bodyFontSize, unset);
    --fontFontStyle: var(--bodyFontStyle, unset);
    --fontFontWeight: var(--bodyFontWeight, unset);
    --fontFontSizeAdjust: var(--bodyFontSizeAdjust, unset);
    --fontLetterSpacing: var(--bodyLetterSpacing, unset);
    --fontTextTransform: var(--bodyTextTransform, unset);
    --fontFontWidth: var(--bodyFontWidth, unset);
    --fontFontVariantCaps: var(--bodyFontVariantCaps, unset);
    --fontFontSynthesis: var(--bodyFontSynthesis, unset);
    --fontFontFeatureSettings: var(--bodyFontFeatureSettings, unset);
    --fontFontVariationSettings: var(--bodyFontVariationSettings, unset);
    --fontWebkitFontSmoothing: var(--bodyWebkitFontSmoothing, unset);
    --fontMozOsxFontSmoothing: var(--bodyMozOsxFontSmoothing, unset);
    --fontFontKerning: var(--bodyFontKerning, unset);
  }
}
```