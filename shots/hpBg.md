**csss:** $w(100vh)
**css:**
```css
@layer container {
  .\$w\(100vh\) {
    inline-size: 100vh;
  }
}
```

**csss:** $h(100vh)
**css:**
```css
@layer container {
  .\$h\(100vh\) {
    block-size: 100vh;
  }
}
```

**csss:** $linear(0.25turn,#3f87a6,#ebf8e1,#f69d3c)
**css:**
```css
@layer container {
  .\$linear\(0\.25turn\,\#3f87a6\,\#ebf8e1\,\#f69d3c\) {
    background-image: linear-gradient(0.25turn, #3f87a6, rgb(235, 248, 225), rgb(246, 157, 60));
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $repeatingLinear(0.25turn,#3f87a6,#ebf8e1,#f69d3c,stops(10%,67%))
**css:**
```css
@layer container {
  .\$repeatingLinear\(0\.25turn\,\#3f87a6\,\#ebf8e1\,\#f69d3c\,stops\(10\%\,67\%\)\) {
    background-image: repeating-linear-gradient(0.25turn, rgb(63, 135, 166) 10%, rgb(235, 248, 225) 67%, rgb(246, 157, 60));
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $linear(0.25turn,#3f87a6,#ebf8e1,#f69d3c,stops(10%,25%,35%))
**css:**
```css
@layer container {
  .\$linear\(0\.25turn\,\#3f87a6\,\#ebf8e1\,\#f69d3c\,stops\(10\%\,25\%\,35\%\)\) {
    background-image: linear-gradient(0.25turn, rgb(63, 135, 166) 10%, rgb(235, 248, 225) 25%, rgb(246, 157, 60) 35%);
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $bg(--picjpg,size(30%),noRepeat,center,luminosity)$bg(--picjpg,size(30%),noRepeat,left,overlay)$linear(0.25turn,#3f87a6,#ebf8e1,#f69d3c,topRight,size(70%,70%))
**css:**
```css
@layer container {
  .\$bg\(--picjpg\,size\(30\%\)\,noRepeat\,center\,luminosity\)\$bg\(--picjpg\,size\(30\%\)\,noRepeat\,left\,overlay\)\$linear\(0\.25turn\,\#3f87a6\,\#ebf8e1\,\#f69d3c\,topRight\,size\(70\%\,70\%\)\) {
    background-image: var(--picjpg), var(--picjpg), linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
    background-position: center center, left center, right top;
    background-repeat: no-repeat, no-repeat, repeat;
    background-size: 30%, 30%, 70% 70%;
    background-origin: padding-box, padding-box, padding-box;
    background-clip: border-box, border-box, border-box;
    background-blend-mode: luminosity, overlay, normal;
    background-attachment: scroll, scroll, scroll;
  }
}
```