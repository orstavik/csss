**csss:** $palette(neutral,#gray,#black)
**css:**
```css
@layer containerDefault {
  .\$palette\(neutral\,\#gray\,\#black\) {
    --color-neutral: gray;
    --color-neutralPop: #cbcbcb;
    --color-neutralAccent: #cbcbcb;
    --color-neutralBland: #cbcbcb;
    --color-neutral1: black;
    --color-neutralPop1: #000000;
    --color-neutralAccent1: #000000;
    --color-neutralBland1: #000000;
  }
}
```

**csss:** $palette(primary,#royalblue,#white)
**css:**
```css
@layer containerDefault {
  .\$palette\(primary\,\#royalblue\,\#white\) {
    --color-primary: royalblue;
    --color-primaryPop: #afc6f0;
    --color-primaryAccent: #abc7f5;
    --color-primaryBland: #b7c6e2;
    --color-primary1: white;
    --color-primaryPop1: #ffffff;
    --color-primaryAccent1: #ffffff;
    --color-primaryBland1: #ffffff;
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
    background-size: auto auto;
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
    background-size: auto auto;
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
    background-size: auto auto;
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

**csss:** $borderColor(#neutral#40)
**css:**
```css
@layer containerDefault {
  .\$borderColor\(\#neutral\#40\) {
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 40%);
  }
}
```

**csss:** $borderColor(#neutral#60)
**css:**
```css
@layer containerDefault {
  .\$borderColor\(\#neutral\#60\) {
    border-color: color-mix(in oklab, var(--color-neutral), var(--color-neutral1) 60%);
  }
}
```