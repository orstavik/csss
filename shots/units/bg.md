**csss:** $bg(--picjpg,size(30%),noRepeat,center,luminosity)$bg(--picjpg,size(30%),noRepeat,left,overlay)$linear(0.25turn,#3f87a6,#ebf8e1,#f69d3c,topRight,size(70%,70%))
**css:**
```css
@layer containerDefault {
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