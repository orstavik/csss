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
…<svg viewBox="0 0 24 24" width="24" height="24" class="$Stroke(#green#white.1,1px,round,round) $Fill(#green)">
  <path d="M5 13l4 4L19 7" />
</svg>…
```
**css:**
```css
.\$Stroke\(\#green\#white\.1\,1px\,round\,round\) {
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
…<p class="$color(#primary08)$Bg(#primary75)">This text should be a mix of primary and its secondary variant.</p>…
```
**css:**
```css
.\$color\(\#primary08\)\$Bg\(\#primary75\) {
  color: color-mix(in oklab, var(--color-primary) 8%, var(--color-primary-1));
  background-color: color-mix(in oklab, var(--color-primary) 75%, var(--color-primary-1));
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
  <div class="… $border(#red#yellow.23)">this is more important</div>
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

.\$border\(\#red\#yellow\.23\) {
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


**description:**
Global palette definitions and usage on nested elements. This demonstrates the `primary` and `warm` palettes established on a parent element, with sub-elements inheriting those palettes and applying them via `$color`, `$Bg`, and `$border` using mixes and transparency.
**userInstruction:**
Set up two palettes on the body: a "primary" palette with royalblue/skyblue and a "warm" palette with red/brown. Inside the body, have several elements that use these palettes. Specifically: 
- Set text color to primary.
- Set a primary mix text color (50% primary secondary).
- Set another primary mix text color (80% primary secondary).
- Set a neutral text color (100% neutral secondary).
- Set background to primary.
- Set background to 50% primary mix.
- Set background to a 20% primary mix with 50% transparency.
- Set border colors using neutral 40% and 60% mixes.
**before:**
```html
<body class="">
  <p class="">Primary text</p>
  <p class="">Primary 50% mix</p>
  <p class="">Primary 80% mix</p>
  <p class="">Neutral 100% mix</p>
  <div class="">Primary bg</div>
  <div class="">Primary 50% mix bg</div>
  <div class="">Primary 20% mix with 50% transparency bg</div>
  <div class="">Neutral 40% border</div>
  <div class="">Neutral 60% border</div>
</body>
```
**after:**
```html
<body class="$Palette(primary,#royalblue#skyblue) $Palette(warm,#red#brown) $Palette(neutral,#black#white)">
  <p class="$color(#primary)">Primary text</p>
  <p class="$color(#primary50)">Primary 50% mix</p>
  <p class="$color(#primary80)">Primary 80% mix</p>
  <p class="$color(##neutral)">Neutral secondary 100% (ie. white here)</p>
  <div class="$Bg(#primary)">Primary bg</div>
  <div class="$Bg(#primary50)">Primary 50% mix bg</div>
  <div class="$Bg(#primary20/50)">Primary 20% mix with 50% transparency bg</div>
  <div class="$border(#neutral40)">Neutral 40% border</div>
  <div class="$border(#neutral60)">Neutral 60% border</div>
</body>
```
**css:**
```css
.\$Palette\(primary\,\#royalblue\#skyblue\) {
  --color-primary: royalblue;
  --color-primary-1: skyblue;
}

.\$Palette\(warm\,\#red\#brown\) {
  --color-warm: red;
  --color-warm-1: brown;
}

.\$Palette\(neutral\,\#black\#white\) {
  --color-neutral: black;
  --color-neutral-1: white;
}

.\$color\(\#primary\) {
  color: var(--color-primary);
}

.\$color\(\#primary50\) {
  color: color-mix(in oklab, var(--color-primary) 50%, var(--color-primary-1));
}

.\$color\(\#primary80\) {
  color: color-mix(in oklab, var(--color-primary) 80%, var(--color-primary-1));
}

.\$color\(\#\#neutral\) {
  color: var(--color-neutral);
}

.\$Bg\(\#primary\) {
  background-color: var(--color-primary);
  background: none;
  background-blend-mode: normal;
}

.\$Bg\(\#primary50\) {
  background-color: color-mix(in oklab, var(--color-primary) 50%, var(--color-primary-1));
  background: none;
  background-blend-mode: normal;
}

.\$Bg\(\#primary20\/50\) {
  background-color: rgb(from color-mix(in oklab, var(--color-primary) 20%, var(--color-primary-1)) r g b / 50%);
  background: none;
  background-blend-mode: normal;
}

.\$border\(\#neutral40\) {
  border-color: color-mix(in oklab, var(--color-neutral) 40%, var(--color-neutral-1));
}

.\$border\(\#neutral60\) {
  border-color: color-mix(in oklab, var(--color-neutral) 60%, var(--color-neutral-1));
}
```

**description:**
Demonstrate various origin colors using hex/web names and their modifiers (chroma adjustments, explicit mixes, alpha, hue, and math computations) instead of native color space functions.
**userInstruction:**
Consolidate various text and background color modifications into a single element test. We need to demonstrate:
- Mixing orange with 75% purple.
- A triple mix: orange with 75% purple, and then 53% dark gray (#333).
- Using alpha: red with 50% opacity (#ff0000a8 or using web name). Let's use red with 33% orange.
- Mixing red and blue 50/50 using explicitly specified oklch.
- Mixing orange and purple 75% using HSL longer hue interpolation.
- Background with hue math calculation (e.g. green with hue +30).
- Background with lightness math calculation (e.g. blue with chroma * 1.5).
**before:**
```html
<div>
  <p class="">Orange purple mix</p>
  <p class="">Triple mix</p>
  <p class="">Red orange mix</p>
  <p class="">Oklch mix</p>
  <p class="">Hsl mix</p>
  <div class="">Bg hue math</div>
  <div class="">Bg lightness math</div>
</div>
```
**after:**
```html
<div>
  <p class="$color(#orange#purple.75)">Orange purple mix</p>
  <p class="$color(#orange#purple.75#3338)">Triple mix</p>
  <p class="$color(#red#orange.33)">Red orange mix</p>
  <p class="$color(#oklch#red#blue)">Oklch mix</p>
  <p class="$color(#hslLongerHue#orange#purple.75)">Hsl mix</p>
  <div class="$Bg(#green#H+30)">Bg hue math</div>
  <div class="$Bg(#blue#C*1.5)">Bg lightness math</div>
</div>
```
**css:**
```css
.\$color\(\#orange\#purple\.75\) {
  color: color-mix(in oklab, orange, purple 75%);
}

.\$color\(\#orange\#purple\.75\#3338\) {
  color: color-mix(in oklab, color-mix(in oklab, orange, purple 75%), #333333 53.333333333333336%);
}

.\$color\(\#red\#orange\.33\) {
  color: color-mix(in oklab, red, orange 33%);
}

.\$color\(\#oklch\#red\#blue\) {
  color: color-mix(in oklch, red, blue 50%);
}

.\$color\(\#hslLongerHue\#orange\#purple\.75\) {
  color: color-mix(in hsl longer hue, orange, purple 75%);
}

.\$Bg\(\#green\#H\+30\) {
  background-color: oklch(from green l c calc(h + 30) / alpha);
  background: none;
  background-blend-mode: normal;
}

.\$Bg\(\#blue\#C\*1\.5\) {
  background-color: oklch(from blue l max(c * 1.5, c + 0.01) h / alpha);
  background: none;
  background-blend-mode: normal;
}
```
