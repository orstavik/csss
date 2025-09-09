**csss:** $palette(warm,#red,#brown)
**css:**
```css
@layer containerDefault {
  .\$palette\(warm\,\#red\,\#brown\) {
    --color-warm: red;
    --color-warmPop: #ffa67d;
    --color-warmAccent: #ff9f6c;
    --color-warmBland: #f3c3b9;
    --color-warmNeutral: #d0d0d0;
    --color-warm1: brown;
    --color-warmPop1: #ff8b6a;
    --color-warmAccent1: #ff7f4d;
    --color-warmBland1: #d3afa9;
    --color-warmNeutral1: #b8b8b8;
  }
}
```

**csss:** $palette(primary,#royalblue,#skyblue)
**css:**
```css
@layer containerDefault {
  .\$palette\(primary\,\#royalblue\,\#skyblue\) {
    --color-primary: royalblue;
    --color-primaryPop: #87c8ff;
    --color-primaryAccent: #77c9ff;
    --color-primaryBland: #b7c6e2;
    --color-primaryNeutral: #c5c5c5;
    --color-primary1: skyblue;
    --color-primaryPop1: #8bfbff;
    --color-primaryAccent1: #57ffff;
    --color-primaryBland1: #dfecf1;
    --color-primaryNeutral1: #e9e9e9;
  }
}
```


**csss:** $bg(#primary)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\) {
    background-image: linear-gradient(var(--color-primary));
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
**csss:** $color(#primary#50)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#50\) {
    color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%);
  }
}
```

**csss:** $color(#primary)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\) {
    color: var(--color-primary);
  }
}
```

**csss:** $bg(#primary#50)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\#50\) {
    background-image: linear-gradient(color-mix(in oklab, var(--color-primary), var(--color-primary1) 50%));
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

**csss:** $color(#neutral#99)
**css:**
```css
@layer containerDefault {
  .\$color\(\#neutral\#99\) {
    color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 99%);
  }
}
```

**csss:** $bg(#primary#20#a50)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\#20\#a50\) {
    background-image: linear-gradient(color-mix(in oklab, color-mix(in oklab, var(--color-primary), var(--color-primary1) 20%), transparent 50%));
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

**csss:** $color(#primary#80)
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#80\) {
    color: color-mix(in oklab, var(--color-primary), var(--color-primary1) 80%);
  }
}
```

**csss:** $border(#neutral#40)
**css:**
```css
@layer containerDefault {
  .\$border\(\#neutral\#40\) {
    border-style: solid;
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 40%);
  }
}
```

**csss:** $border(#neutral#60)
**css:**
```css
@layer containerDefault {
  .\$border\(\#neutral\#60\) {
    border-style: solid;
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 60%);
  }
}
```