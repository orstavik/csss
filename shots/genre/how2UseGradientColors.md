**description:**
Generates warm palette with red foreground and brown contrast.
**csss:**
 $Palette(warm,#red,#brown)
**css:**
```css
.\$Palette\(warm\,\#red\,\#brown\) {
  --color-warm: red;
  --color-warm-1: brown;
}
```

**description:**
Generates primary palette with royalblue foreground and skyblue contrast.
**csss:**
 $Palette(primary,#royalblue,#skyblue)
**css:**
```css
.\$Palette\(primary\,\#royalblue\,\#skyblue\) {
  --color-primary: royalblue;
  --color-primary-1: skyblue;
}
```

**description:**
Uses primary palette variable for text color.
**csss:**
 $color(#primary)
**css:**
```css
.\$color\(\#primary\) {
  color: var(--color-primary);
}
```

**description:**
Mixes primary with 50% of its secondary variant.
**csss:**
 $color(#primary#50)
**css:**
```css
.\$color\(\#primary\#50\) {
  color: color-mix(in oklab, var(--color-primary), var(--color-primary-1) 50%);
}
```

**description:**
Mixes primary with 80% of its secondary variant.
**csss:**
 $color(#primary#80)
**css:**
```css
.\$color\(\#primary\#80\) {
  color: color-mix(in oklab, var(--color-primary), var(--color-primary-1) 80%);
}
```

**description:**
Mixes neutral with 100% of its secondary variant.
**csss:**
 $color(#neutral#100)
**css:**
```css
.\$color\(\#neutral\#100\) {
  color: color-mix(in oklab, var(--color-neutral), var(--color-neutral-1) 100%);
}
```

**description:**
Sets background using primary palette variable.
**csss:**
 $bg(#primary)
**css:**
```css
.\$bg\(\#primary\) {
  background-color: var(--color-primary);
}
```

**description:**
Sets background to 50% primary palette mix.
**csss:**
 $bg(#primary#50)
**css:**
```css
.\$bg\(\#primary\#50\) {
  background-color: color-mix(in oklab, var(--color-primary), var(--color-primary-1) 50%);
}
```

**description:**
Sets background to 20% primary mix with 50% transparency.
**csss:**
 $bg(#primary#20#A50)
**css:**
```css
.\$bg\(\#primary\#20\#A50\) {
  background-color: color-mix(in oklab, color-mix(in oklab, var(--color-primary), var(--color-primary-1) 20%), transparent 50%);
}
```
