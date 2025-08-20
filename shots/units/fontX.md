**csss:** $typeface(comic,"MS+Comic+Sans",face("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2"),xxs,semiExpanded,italic,bolder)
**css:**
```css
@font-face /*comic normal*/ {
  font-family: comic;
  src: local('comic'), url(https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2);
  font-style: normal;
}

@layer containerDefault {
.\$typeface\(comic\,\"MS\+Comic\+Sans\"\,face\(\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\)\,xxs\,semiExpanded\,italic\,bolder\) {
  --comicFontFamily: "MS Comic Sans", comic;
  --comicFontSize: xx-small;
  --comicFontStyle: italic;
  --comicFontWeight: bolder;
  --comicFontSizeAdjust: unset;
  --comicLetterSpacing: unset;
  --comicFontStretch: semi-expanded;
  --comicFontVariantCaps: unset;
  --comicFontSynthesis: unset;
  --comicFontFeatureSettings: unset;
  --comicFontVariationSettings: unset;
  --comicWebkitFontSmoothing: unset;
  --comicMozOsxFontSmoothing: unset;
  --comicFontKerning: unset;
}
}
```


**csss:** $typeface(body,system-ui,sans-serif,400,0.5,bold,i,condensed,12px)
**css:**
```css
@layer containerDefault {
.\$typeface\(body\,system-ui\,sans-serif\,400\,0\.5\,bold\,i\,condensed\,12px\) {
  --bodyFontFamily: system-ui, sans-serif;
  --bodyFontSize: 12px;
  --bodyFontStyle: italic;
  --bodyFontWeight: bold;
  --bodyFontSizeAdjust: 0.5;
  --bodyLetterSpacing: unset;
  --bodyFontStretch: condensed;
  --bodyFontVariantCaps: unset;
  --bodyFontSynthesis: unset;
  --bodyFontFeatureSettings: unset;
  --bodyFontVariationSettings: unset;
  --bodyWebkitFontSmoothing: unset;
  --bodyMozOsxFontSmoothing: unset;
  --bodyFontKerning: unset;
}
}
```

**csss:** $font(system-ui,sans-serif,400,0.5,bold,i,condensed,12px)
**css:**
```css
@layer containerDefault {
.\$font\(system-ui\,sans-serif\,400\,0\.5\,bold\,i\,condensed\,12px\) {
  font-family: system-ui, sans-serif;
  font-size: 12px;
  font-style: italic;
  font-weight: bold;
  font-size-adjust: 0.5;
  letter-spacing: var(--systemUiLetterSpacing, unset);
  font-stretch: condensed;
  font-variant-caps: var(--systemUiFontVariantCaps, unset);
  font-synthesis: var(--systemUiFontSynthesis, unset);
  font-feature-settings: var(--systemUiFontFeatureSettings, unset);
  font-variation-settings: var(--systemUiFontVariationSettings, unset);
  -webkit-font-smoothing: var(--systemUiWebkitFontSmoothing, unset);
  -moz-osx-font-smoothing: var(--systemUiMozOsxFontSmoothing, unset);
  font-kerning: var(--systemUiFontKerning, unset);
  --fontFontFamily: system-ui, sans-serif;
  --fontFontSize: 12px;
  --fontFontStyle: italic;
  --fontFontWeight: bold;
  --fontFontSizeAdjust: 0.5;
  --fontLetterSpacing: var(--systemUiLetterSpacing, unset);
  --fontFontStretch: condensed;
  --fontFontVariantCaps: var(--systemUiFontVariantCaps, unset);
  --fontFontSynthesis: var(--systemUiFontSynthesis, unset);
  --fontFontFeatureSettings: var(--systemUiFontFeatureSettings, unset);
  --fontFontVariationSettings: var(--systemUiFontVariationSettings, unset);
  --fontWebkitFontSmoothing: var(--systemUiWebkitFontSmoothing, unset);
  --fontMozOsxFontSmoothing: var(--systemUiMozOsxFontSmoothing, unset);
  --fontFontKerning: var(--systemUiFontKerning, unset);
}
}
```

**csss:** $font(body)
**css:**
```css
@layer containerDefault {
.\$font\(body\) {
  font-family: body;
  font-size: var(--bodyFontSize, unset);
  font-style: var(--bodyFontStyle, unset);
  font-weight: var(--bodyFontWeight, unset);
  font-size-adjust: var(--bodyFontSizeAdjust, unset);
  letter-spacing: var(--bodyLetterSpacing, unset);
  font-stretch: var(--bodyFontStretch, unset);
  font-variant-caps: var(--bodyFontVariantCaps, unset);
  font-synthesis: var(--bodyFontSynthesis, unset);
  font-feature-settings: var(--bodyFontFeatureSettings, unset);
  font-variation-settings: var(--bodyFontVariationSettings, unset);
  -webkit-font-smoothing: var(--bodyWebkitFontSmoothing, unset);
  -moz-osx-font-smoothing: var(--bodyMozOsxFontSmoothing, unset);
  font-kerning: var(--bodyFontKerning, unset);
  --fontFontFamily: body;
  --fontFontSize: var(--bodyFontSize, unset);
  --fontFontStyle: var(--bodyFontStyle, unset);
  --fontFontWeight: var(--bodyFontWeight, unset);
  --fontFontSizeAdjust: var(--bodyFontSizeAdjust, unset);
  --fontLetterSpacing: var(--bodyLetterSpacing, unset);
  --fontFontStretch: var(--bodyFontStretch, unset);
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