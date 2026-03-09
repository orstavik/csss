**description:** Generates warm palette with red foreground and brown contrast.
**csss:** $Palette(warm,#red,#brown)
**css:**
```css
@layer containerDefault {
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
}
```

**description:** Generates primary palette with royalblue foreground and skyblue contrast.
**csss:** $Palette(primary,#royalblue,#skyblue)
**css:**
```css
@layer containerDefault {
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
}
```

**description:** Uses primary palette variable for text color.
**csss:** $color(#primary)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\) {
    color: var(--color-primary);
  }
}
```

**description:** Mixes primary with 50% of its secondary variant.
**csss:** $color(#primary#50)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#50\) {
    color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%);
  }
}
```

**description:** Mixes primary with 80% of its secondary variant.
**csss:** $color(#primary#80)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#80\) {
    color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 80%);
  }
}
```

**description:** Mixes neutral with 99% of its secondary variant.
**csss:** $color(#neutral#99)
**css:**
```css
@layer containerDefault {
  .\$color\(\#neutral\#99\) {
    color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 99%);
  }
}
```

**description:** Sets background using primary palette variable.
**csss:** $bg(#primary)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\) {
    background: none;
    background-image: unset;
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
    background-color: var(--color-primary);
  }
}
```

**description:** Sets background to 50% primary palette mix.
**csss:** $bg(#primary#50)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\#50\) {
    background: none;
    background-image: unset;
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
    background-color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%);
  }
}
```

**description:** Sets background to 20% primary mix with 50% transparency.
**csss:** $bg(#primary#20#a50)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\#20\#a50\) {
    background: none;
    background-image: unset;
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
    background-color:color-mix(in oklab, color-mix(in oklab, var(--color-primary), var(--color-primary1) 20%), transparent 50%);

  }
}
```

**description:** Sets border color to 40% neutral palette mix.
**csss:** $border(#neutral#40)
**css:**
```css
@layer containerDefault {
  .\$border\(\#neutral\#40\) {
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 40%);
  }
}
```

**description:** Sets border color to 60% neutral palette mix.
**csss:** $border(#neutral#60)
**css:**
```css
@layer containerDefault {
  .\$border\(\#neutral\#60\) {
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 60%);
  }
}
```
