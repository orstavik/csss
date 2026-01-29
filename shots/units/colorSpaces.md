**csss:** $color(#orange)
**css:**
```css
@layer containerDefault {
  .\$color\(\#orange\) {
    color: orange;
  }
}
```

**csss:** $color(#orange#purple75)
**css:**
```css
@layer containerDefault {
  .\$color\(\#orange\#purple75\) {
    color: color-mix(in oklab, orange, purple 75%);
  }
}
```

**csss:** $color(#orange#purple75#3338)
**css:**
```css
@layer containerDefault {
  .\$color\(\#orange\#purple75\#3338\) {
    color: color-mix(in oklab, color-mix(in oklab, orange, purple 75%), #333333 53.33%);
  }
}
```

**csss:** $color(#rgb(255,0,0))
**css:**
```css
@layer containerDefault {
  .\$color\(\#rgb\(255\,0\,0\)\) {
    color: #ff0000;
  }
}
```

**csss:** $color(#rgb(255,0,0)#orange33)
**css:**
```css
@layer containerDefault {
  .\$color\(\#rgb\(255\,0\,0\)\#orange33\) {
    color: color-mix(in oklab, #ff0000, orange 33%);
  }
}
```

**csss:** $color(#rgba(0,255,0,0.5))
**css:**
```css
@layer containerDefault {
  .\$color\(\#rgba\(0\,255\,0\,0\.5\)\) {
    color: #00ff0080;
  }
}
```

**csss:** $color(#hsl(240,100%,50%))
**css:**
```css
@layer containerDefault {
  .\$color\(\#hsl\(240\,100\%\,50\%\)\) {
    color: hsl(240 100% 50%);
  }
}
```

**csss:** $color(#hsla(60,100%,50%,0.8))
**css:**
```css
@layer containerDefault {
  .\$color\(\#hsla\(60\,100\%\,50\%\,0\.8\)\) {
    color: hsla(60 100% 50% / 0.8);
  }
}
```

**csss:** $color(#hwb(180,20%,20%))
**css:**
```css
@layer containerDefault {
  .\$color\(\#hwb\(180\,20\%\,20\%\)\) {
    color: hwb(180 20% 20%);
  }
}
```

**csss:** $color(#lab(50%,20,-30))
**css:**
```css
@layer containerDefault {
  .\$color\(\#lab\(50\%\,20\,-30\)\) {
    color: lab(50% 20 -30);
  }
}
```

**csss:** $color(#lch(70%,45,120))
**css:**
```css
@layer containerDefault {
  .\$color\(\#lch\(70\%\,45\,120\)\) {
    color: lch(70% 45 120);
  }
}
```

**csss:** $color(#oklab(0.7,0.1,-0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#oklab\(0\.7\,0\.1\,-0\.1\)\) {
    color: oklab(0.7 0.1 -0.1);
  }
}
```

**csss:** $color(#oklch(0.8,0.15,180))
**css:**
```css
@layer containerDefault {
  .\$color\(\#oklch\(0\.8\,0\.15\,180\)\) {
    color: oklch(0.8 0.15 180);
  }
}
```

**csss:** $color(#srgb(1,0,0))
**css:**
```css
@layer containerDefault {
  .\$color\(\#srgb\(1\,0\,0\)\) {
    color: color(srgb 1 0 0);
  }
}
```

**csss:** $color(#srgbLinear(0.8,0.2,0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#srgbLinear\(0\.8\,0\.2\,0\.1\)\) {
    color: color(srgb-linear 0.8 0.2 0.1);
  }
}
```

**csss:** $color(#displayP3(1,0.5,0))
**css:**
```css
@layer containerDefault {
  .\$color\(\#displayP3\(1\,0\.5\,0\)\) {
    color: color(display-p3 1 0.5 0);
  }
}
```

**csss:** $color(#a98Rgb(0.9,0.3,0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#a98Rgb\(0\.9\,0\.3\,0\.1\)\) {
    color: color(a98-rgb 0.9 0.3 0.1);
  }
}
```

**csss:** $color(#prophotoRgb(0.8,0.4,0.2))
**css:**
```css
@layer containerDefault {
  .\$color\(\#prophotoRgb\(0\.8\,0\.4\,0\.2\)\) {
    color: color(prophoto-rgb 0.8 0.4 0.2);
  }
}
```

**csss:** $color(#rec2020(0.7,0.6,0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#rec2020\(0\.7\,0\.6\,0\.1\)\) {
    color: color(rec2020 0.7 0.6 0.1);
  }
}
```

**csss:** $color(#xyz(0.5,0.3,0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#xyz\(0\.5\,0\.3\,0\.1\)\) {
    color: color(xyz 0.5 0.3 0.1);
  }
}
```

**csss:** $color(#xyzD50(0.4,0.3,0.2))
**css:**
```css
@layer containerDefault {
  .\$color\(\#xyzD50\(0\.4\,0\.3\,0\.2\)\) {
    color: color(xyz-d50 0.4 0.3 0.2);
  }
}
```

**csss:** $color(#xyzD65(0.6,0.4,0.1))
**css:**
```css
@layer containerDefault {
  .\$color\(\#xyzD65\(0\.6\,0\.4\,0\.1\)\) {
    color: color(xyz-d65 0.6 0.4 0.1);
  }
}
```

**csss:** $bg(#oklch(70%,0.15,180+30))
**css:**
```css
@layer containerDefault {
  .\$bg\(\#oklch\(70\%\,0\.15\,180\+30\)\) {
    background: none;
    background-image: unset;
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
    background-color: oklch(70% 0.15 210);
  }
}
```

**csss:** $bg(#lab(50%*1.5,10,-20))
**css:**
```css
@layer containerDefault {
  .\$bg\(\#lab\(50\%\*1\.5\,10\,-20\)\) {
    background: none;
    background-image: unset;
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
    background-color: lab(75% 10 -20);
  }
}
```

**csss:** $color(#mix(oklch,#red,#blue,50%))
**css:**
```css
@layer containerDefault {
  .\$color\(\#mix\(oklch\,\#red\,\#blue\,50\%\)\) {
    color: color-mix(in oklch, red, blue 50%);
  }
}
```

**csss:** $color(#mixHslLonger(#orange,#purple,75%))
**css:**
```css
@layer containerDefault {
  .\$color\(\#mixHslLonger\(\#orange\,\#purple\,75\%\)\) {
    color: color-mix(in hsl longer hue, orange, purple 75%);
  }
}
```