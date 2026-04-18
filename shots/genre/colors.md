**description:** Styling a plain SVG icon with fill and color for better visibility.
**userInstruction:**
The checkmark icon currently has no styling and inherits default colors. Apply a green body color with a thin white edge stroke to make it look like a success checkmark.
**before:**
```html
…<svg viewBox="0 0 24 24" width="24" height="24" class="$stroke(#green,2px,round,round) $fillNone">
  <path d="M5 13l4 4L19 7" />
</svg>…
```
**after:**
```html
…<svg viewBox="0 0 24 24" width="24" height="24" class="$Stroke(#green#white10,1px,round,round) $Fill(#green)">
  <path d="M5 13l4 4L19 7" />
</svg>…
```
**css:**
```css
.\$Stroke\(\#green\#white10\,1px\,round\,round\) {
  stroke: color-mix(in oklab, green, white 10%);
  stroke-width: 1px;
  stroke-opacity: unset;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: unset;
  stroke-dashoffset: unset;
  stroke-miterlimit: unset;
}

.\$Fill\(\#green\) {
  fill: green;
  fill-opacity: unset;
  fill-rule: unset;
}
```

**description:** Sets text color to orange.
**userInstruction:** Change the text color to orange.
**before:**
```html
…<p class="$color(#yellow)">This text should be orange.</p>…
```
**after:**
```html
…<p class="$color(#orange)">This text should be orange.</p>…
```
**css:**
```css
.\$color\(\#orange\) {
  color: orange;
}
```

**description:**
Establish a color palette "primary" with a foreground and background color. Set text color of a paragraph to be 85% primary foreground and 15% primary background, and background color to be 25% primary foreground and 75% primary background.
**userInstruction:**
Define a color palette named "primary" with a foreground color of #darkblue and a background color of #skyblue. Then, set the text color of the paragraph to be a mix of 92% primary foreground and 8% primary background, and the background color to be a mix of 25% primary foreground and 75% primary background.
**before:**
```html
…<p class="$color(#black)$Bg(#white)">This text should be a mix of primary and its secondary variant.</p>…
```
**after:**
```html
…<p class="$color(#primary#08)$Bg(#primary#75)">This text should be a mix of primary and its secondary variant.</p>…
```
**css:**
```css
.\$color\(\#primary\#08\)\$Bg\(\#primary\#75\) {
  color: color-mix(in oklab, var(--color-primary), var(--color-primary-1, var(--color-primary)) 8%);
  background-color: color-mix(in oklab, var(--color-primary), var(--color-primary-1, var(--color-primary)) 75%);
  background: none;
  background-blend-mode: normal;
}
```

**description:** Left border with green color for all children elements. The child with important color is overridden to red.
**userInstruction:** Keep the green border for the items under the container, but make sure the important element has a red border instead.
**before:**
```html
…<div class="|$Border(#green,solid,0,4px,0,0)">
  …
  <div class="…">this is more important</div>
  …
</div>…
```
**after:**
```html
…<div class="|$Border(#green,solid,0,4px,0,0)">
  …
  <div class="… $border(#red#yellow23)">this is more important</div>
  …
</div>…
```
**css:**
```css
.\|\$Border\(\#green\,solid\,0\,4px\,0\,0\)>* {
  border-block-width: 0;
  border-inline-width: 4px 0;
  border-style: solid;
  border-color: green;
  border-radius: 0;
}

.\$border\(\#red\#yellow23\) {
  border-color: color-mix(in oklab, red, yellow 23%);
}
```

**description:** Left border with blend orange color. Pops with higher saturation when the element is hovered.
**userInstruction:**
Use border-width 0 instead of none to adjust border visibility, and make a border pop when the element is hovered by upping the saturation of the border color to 150%.
**before:**
```html
…<div class="$Border(#orange#grey,solid,0,1.5em,0,0) :hover$border(#red)">…</div>…
```
**after:**
```html
…<div class="$Border(#orange#C*.7,solid,0,1.5em,0,0) :hover$border(#orange#C*1.5)">…</div>…
```
**css:**
```css
.\$Border\(\#orange\#C\*\.7\,solid\,0\,1\.5em\,0\,0\) {
  border-block-width: 0;
  border-inline-width: 1.5em 0;
  border-style: solid;
  border-color: oklch(from orange l min(c * 0.7, c - 0.01) h / alpha);
  border-radius: 0;
}

.\:hover\$border\(\#orange\#C\*1\.5\):where(:hover) {
  border-color: oklch(from orange l max(c * 1.5, c + 0.01) h / alpha);
}
```


**description:**
Sets text color to a hue-shifted version of the primary color.
**userInstruction:**
Define a color palette named "primary" with a foreground color of #darkblue and a background color of #skyblue. Then, set the text color of the paragraph to be a hue-shifted version of the primary color by #45 degrees.
**before:**
```html
…<html class="$Palette(primary,#darkblue#skyblue)">
  …<p class="$color(#primary)">This text should be a hue-shifted version of the primary color.</p>…
</html>…
```
**after:**
```html
…<html class="$Palette(primary,#darkblue#skyblue)">
  …<p class="$color(#primary#H+45)">This text should be a hue-shifted version of the primary color.</p>…
</html>…
```
**css:**
```css
.\$Palette\(primary\,\#darkblue\#skyblue\) {
  --color-primary: darkblue;
  --color-primary-1: skyblue;
}

.\$color\(\#primary\#H\+45\) {
  color: oklch(from var(--color-primary) l c calc(h + 45) / alpha);
}
```
