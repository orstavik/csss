**description:**
A UI component with text color to orange.
**csss:**
```csss
$color(#orange)
```
**css:**
```css
.\$color\(\#orange\) {
  color: orange;
}
```
**description:**
An example demonstrating mixes orange with 75% purple in oklab color space.
**csss:**
```csss
$color(#orange#purple75)
```
**css:**
```css
.\$color\(\#orange\#purple75\) {
  color: color-mix(in oklab, orange, purple 75%);
}
```
**description:**
An example demonstrating triple color mix: orange→75% purple→53% dark gray.
**csss:**
```csss
$color(#orange#purple75#3338)
```
**css:**
```css
.\$color\(\#orange\#purple75\#3338\) {
  color: color-mix(in oklab, color-mix(in oklab, orange, purple 75%), #333333 53.33%);
}
```
**description:**
A UI component with text color using rgb function notation.
**csss:**
```csss
$color(#rgb(255,0,0))
```
**css:**
```css
.\$color\(\#rgb\(255\,0\,0\)\) {
  color: rgb(255 0 0);
}
```
**description:**
An example demonstrating mixes rgb red with 33% orange in oklab.
**csss:**
```csss
$color(#rgb(255,0,0)#orange33)
```
**css:**
```css
.\$color\(\#rgb\(255\,0\,0\)\#orange33\) {
  color: color-mix(in oklab, rgb(255 0 0), orange 33%);
}
```
**description:**
A UI component with text color using rgba with 50% opacity.
**csss:**
```csss
$color(#rgba(0,255,0,0.5))
```
**css:**
```css
.\$color\(\#rgba\(0\,255\,0\,0\.5\)\) {
  color: rgba(0 255 0 / 0.5);
}
```
**description:**
A UI component with text color using hsl function (blue).
**csss:**
```csss
$color(#hsl(240,100%,50%))
```
**css:**
```css
.\$color\(\#hsl\(240\,100\%\,50\%\)\) {
  color: hsl(240 100% 50%);
}
```
**description:**
A UI component with text color using hsla with 80% opacity.
**csss:**
```csss
$color(#hsla(60,100%,50%,0.8))
```
**css:**
```css
.\$color\(\#hsla\(60\,100\%\,50\%\,0\.8\)\) {
  color: hsla(60 100% 50% / 0.8);
}
```
**description:**
A UI component with text color using hwb function (teal-ish).
**csss:**
```csss
$color(#hwb(180,20%,20%))
```
**css:**
```css
.\$color\(\#hwb\(180\,20\%\,20\%\)\) {
  color: hwb(180 20% 20%);
}
```
**description:**
A UI component with text color using cie lab values.
**csss:**
```csss
$color(#lab(50%,20,-30))
```
**css:**
```css
.\$color\(\#lab\(50\%\,20\,-30\)\) {
  color: lab(50% 20 -30);
}
```
**description:**
A UI component with text color using cie lch values.
**csss:**
```csss
$color(#lch(70%,45,120))
```
**css:**
```css
.\$color\(\#lch\(70\%\,45\,120\)\) {
  color: lch(70% 45 120);
}
```
**description:**
A UI component with text color using oklab perceptual values.
**csss:**
```csss
$color(#oklab(0.7,0.1,-0.1))
```
**css:**
```css
.\$color\(\#oklab\(0\.7\,0\.1\,-0\.1\)\) {
  color: oklab(0.7 0.1 -0.1);
}
```
**description:**
A UI component with text color using oklch perceptual values.
**csss:**
```csss
$color(#oklch(0.8,0.15,180))
```
**css:**
```css
.\$color\(\#oklch\(0\.8\,0\.15\,180\)\) {
  color: oklch(0.8 0.15 180);
}
```
**description:**
A UI component with text color using srgb color function.
**csss:**
```csss
$color(#srgb(1,0,0))
```
**css:**
```css
.\$color\(\#srgb\(1\,0\,0\)\) {
  color: color(srgb 1 0 0);
}
```
**description:**
A UI component with text color using linear srgb color space.
**csss:**
```csss
$color(#srgbLinear(0.8,0.2,0.1))
```
**css:**
```css
.\$color\(\#srgbLinear\(0\.8\,0\.2\,0\.1\)\) {
  color: color(srgb-linear 0.8 0.2 0.1);
}
```
**description:**
A UI component with text color using display p3 wide-gamut color space.
**csss:**
```csss
$color(#displayP3(1,0.5,0))
```
**css:**
```css
.\$color\(\#displayP3\(1\,0\.5\,0\)\) {
  color: color(display-p3 1 0.5 0);
}
```
**description:**
A UI component with text color using a98-rgb color space.
**csss:**
```csss
$color(#a98Rgb(0.9,0.3,0.1))
```
**css:**
```css
.\$color\(\#a98Rgb\(0\.9\,0\.3\,0\.1\)\) {
  color: color(a98-rgb 0.9 0.3 0.1);
}
```
**description:**
A UI component with text color using prophoto rgb color space.
**csss:**
```csss
$color(#prophotoRgb(0.8,0.4,0.2))
```
**css:**
```css
.\$color\(\#prophotoRgb\(0\.8\,0\.4\,0\.2\)\) {
  color: color(prophoto-rgb 0.8 0.4 0.2);
}
```
**description:**
A UI component with text color using rec. 2020 color space.
**csss:**
```csss
$color(#rec2020(0.7,0.6,0.1))
```
**css:**
```css
.\$color\(\#rec2020\(0\.7\,0\.6\,0\.1\)\) {
  color: color(rec2020 0.7 0.6 0.1);
}
```
**description:**
A UI component with text color using xyz color space.
**csss:**
```csss
$color(#xyz(0.5,0.3,0.1))
```
**css:**
```css
.\$color\(\#xyz\(0\.5\,0\.3\,0\.1\)\) {
  color: color(xyz 0.5 0.3 0.1);
}
```
**description:**
A UI component with text color using xyz-d50 illuminant color space.
**csss:**
```csss
$color(#xyzD50(0.4,0.3,0.2))
```
**css:**
```css
.\$color\(\#xyzD50\(0\.4\,0\.3\,0\.2\)\) {
  color: color(xyz-d50 0.4 0.3 0.2);
}
```
**description:**
A UI component with text color using xyz-d65 illuminant color space.
**csss:**
```csss
$color(#xyzD65(0.6,0.4,0.1))
```
**css:**
```css
.\$color\(\#xyzD65\(0\.6\,0\.4\,0\.1\)\) {
  color: color(xyz-d65 0.6 0.4 0.1);
}
```
**description:**
An example demonstrating mixes red and blue 50/50 in oklch color space.
**csss:**
```csss
$color(#mix(oklch,#red,50%,#blue,50%))
```
**css:**
```css
.\$color\(\#mix\(oklch\,\#red\,50\%\,\#blue\,50\%\)\) {
  color: color-mix(in oklch, red 50%, blue 50%);
}
```
**description:**
An example demonstrating mixes orange and purple 75% using hsl longer hue interpolation.
**csss:**
```csss
$color(#mix(hslLongerHue,#orange,25%,#purple,75%))
```
**css:**
```css
.\$color\(\#mix\(hslLongerHue\,\#orange\,25\%\,\#purple\,75\%\)\) {
  color: color-mix(in hsl longer hue, orange 25%, purple 75%);
}
```
**description:**
A UI component with background using oklch with computed hue (180+30=210).
**csss:**
```csss
$bg(#oklch(70%,0.15,180+30))
```
**css:**
```css
.\$bg\(\#oklch\(70\%\,0\.15\,180\+30\)\) {
  background-color: oklch(70% 0.15 210);
}
```
**description:**
A UI component with background using lab with computed lightness (50%*1.5=75%).
**csss:**
```csss
$bg(#lab(50%*1.5,10,-20))
```
**css:**
```css
.\$bg\(\#lab\(50\%\*1\.5\,10\,-20\)\) {
  background-color: lab(75% 10 -20);
}
```
**description:**
An example demonstrating generates primary palette from coral with white contrast color.
**csss:**
```csss
$Palette(primary,#ff5470,#ffffff)
```
**css:**
```css
.\$Palette\(primary\,\#ff5470\,\#ffffff\) {
  --color-primary: #ff5470;
  --color-primaryPop: #ffafb5;
  --color-primaryAccent: #ffa7ae;
  --color-primaryBland: #f4cdce;
  --color-primaryNeutral: #d8d8d8;
  --color-onPrimary: #ffffff;
  --color-onPrimaryPop: #e0ffff;
  --color-onPrimaryAccent: #d2ffff;
  --color-onPrimaryBland: #ffffff;
  --color-onPrimaryNeutral: #ffffff;
}
```
**description:**
An example demonstrating generates warm palette from red with brown contrast color.
**csss:**
```csss
$Palette(warm,#red,#brown)
```
**css:**
```css
.\$Palette\(warm\,\#red\,\#brown\) {
  --color-warm: red;
  --color-warmPop: #ffa67d;
  --color-warmAccent: #ff9f6c;
  --color-warmBland: #f3c3b9;
  --color-warmNeutral: #d0d0d0;
  --color-onWarm: brown;
  --color-onWarmPop: #ff8b6a;
  --color-onWarmAccent: #ff7f4d;
  --color-onWarmBland: #d3afa9;
  --color-onWarmNeutral: #b8b8b8;
}
```
**description:**
An example demonstrating generates primary palette from royalblue with skyblue contrast.
**csss:**
```csss
$Palette(primary,#royalblue,#skyblue)
```
**css:**
```css
.\$Palette\(primary\,\#royalblue\,\#skyblue\) {
  --color-primary: royalblue;
  --color-primaryPop: #87c8ff;
  --color-primaryAccent: #77c9ff;
  --color-primaryBland: #b7c6e2;
  --color-primaryNeutral: #c5c5c5;
  --color-onPrimary: skyblue;
  --color-onPrimaryPop: #8bfbff;
  --color-onPrimaryAccent: #57ffff;
  --color-onPrimaryBland: #dfecf1;
  --color-onPrimaryNeutral: #e9e9e9;
}
```
**description:**
An example demonstrating uses the primary palette variable for text color.
**csss:**
```csss
$color(#primary)
```
**css:**
```css
.\$color\(\#primary\) {
  color: var(--color-primary);
}
```
**description:**
An example demonstrating mixes primary with 50% of its secondary variant.
**csss:**
```csss
$color(#primary#50)
```
**css:**
```css
.\$color\(\#primary\#50\) {
  color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%);
}
```
**description:**
An example demonstrating mixes primary with 80% of its secondary variant.
**csss:**
```csss
$color(#primary#80)
```
**css:**
```css
.\$color\(\#primary\#80\) {
  color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 80%);
}
```
**description:**
An example demonstrating mixes neutral with 99% of its secondary variant.
**csss:**
```csss
$color(#neutral#99)
```
**css:**
```css
.\$color\(\#neutral\#99\) {
  color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 99%);
}
```
**description:**
A UI component with background to primary palette color.
**csss:**
```csss
$bg(#primary)
```
**css:**
```css
.\$bg\(\#primary\) {
  background-color: var(--color-primary);
}
```
**description:**
A UI component with background to 50% mix of primary palette.
**csss:**
```csss
$bg(#primary#50)
```
**css:**
```css
.\$bg\(\#primary\#50\) {
  background-color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%);
}
```
**description:**
A UI component with background to 20% primary mix with 50% transparency.
**csss:**
```csss
$bg(#primary#20#a50)
```
**css:**
```css
.\$bg\(\#primary\#20\#a50\) {
  background-color: color-mix(in oklab, color-mix(in oklab, var(--color-primary), var(--color-primary1) 20%), transparent 50%);
}
```
**description:**
A UI component with border color to 40% neutral palette mix.
**csss:**
```csss
$border(#neutral#40)
```
**css:**
```css
.\$border\(\#neutral\#40\) {
  border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 40%);
}
```
**description:**
A UI component with border color to 60% neutral palette mix.
**csss:**
```csss
$border(#neutral#60)
```
**css:**
```css
.\$border\(\#neutral\#60\) {
  border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 60%);
}
```
