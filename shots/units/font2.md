**csss:** $Typeface(display,"Display+Font","https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff2",lg,bold)
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff2*/ {
  font-family: roboto;
  src: /*https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff2*/
local("roboto"),
url("https://cdn.jsdelivr.net/npm/@fontsource/roboto@5.0.8/files/roboto-latin-400-normal.woff2");
}

@layer containerDefault {
  .\$Typeface\(display\,\"Display\+Font\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@fontsource\/roboto\@5\.0\.8\/files\/roboto-latin-400-normal\.woff2\"\,lg\,bold\) {
    --displayFontFamily: "Display Font", roboto;
    --displayFontSize: large;
    --displayFontWeight: bold;
  }
}
```


**csss:** $Typeface(title,"Title","https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicDisplay&weight=700&style=italic")
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicDisplay&weight=700&style=italic*/ {
  font-family: ComicDisplay;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicDisplay&weight=700&style=italic*/
local("ComicDisplay"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
  font-weight: 700;
  font-style: italic;
}

@layer containerDefault {
  .\$Typeface\(title\,\"Title\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\#family\=ComicDisplay\&weight\=700\&style\=italic\"\) {
    --titleFontFamily: "Title", ComicDisplay;
  }
}
```


**csss:** $Typeface(caption,"Caption","https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicCaption&stretch=condensed")
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicCaption&stretch=condensed*/ {
  font-family: ComicCaption;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicCaption&stretch=condensed*/
local("ComicCaption"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
  font-stretch: condensed;
}

@layer containerDefault {
  .\$Typeface\(caption\,\"Caption\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\#family\=ComicCaption\&stretch\=condensed\"\) {
    --captionFontFamily: "Caption", ComicCaption;
  }
}
```


**csss:** $Typeface(ui,"UI+Font","https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicUI&featureSettings=%22ss01%22+1")
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicUI&featureSettings=%22ss01%22+1*/ {
  font-family: ComicUI;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2#family=ComicUI&featureSettings=%22ss01%22+1*/
local("ComicUI"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
  font-feature-settings: "ss01" 1;
}

@layer containerDefault {
  .\$Typeface\(ui\,\"UI\+Font\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\#family\=ComicUI\&featureSettings\=\%22ss01\%22\+1\"\) {
    --uiFontFamily: "UI Font", ComicUI;
  }
}
```
