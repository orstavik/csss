**csss:** $bg(--color_my)
**css:**
```css
@layer containerDefault {
  .\$bg\(--color_my\) {
    background-image: linear-gradient(var(--color_my));
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

**csss:** $bg((--color_undefined,--color_primary))
**css:**
```css
@layer containerDefault {
  .\$bg\(\(--color_undefined\,--color_primary\)\) {
    background-image: linear-gradient(var(--color_undefined, var(--color_primary)));
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

**csss:** $width(100px+20px)
**css:**
```css
@layer containerDefault {
  .\$width\(100px\+20px\) {
    inline-size: calc(120px);
  }
}
```

**csss:** $width(100%-20px)
**css:**
```css
@layer containerDefault {
  .\$width\(100\%-20px\) {
    inline-size: calc(100% - 20px);
  }
}
```

**csss:** $height(2rem+1em)
**css:**
```css
@layer containerDefault {
  .\$height\(2rem\+1em\) {
    block-size: calc(1em + 2rem);
  }
}
```

**csss:** $margin(10px+5px*2)
**css:**
```css
@layer containerDefault {
  .\$margin\(10px\+5px\*2\) {
    margin: calc(20px);
  }
}
```

**csss:** $padding(1rem+2px/2)
**css:**
```css
@layer containerDefault {
  .\$padding\(1rem\+2px\/2\) {
    padding: calc(1px + 1rem);
  }
}
```

**csss:** $width((100px+5vw)*2)
**css:**
```css
@layer containerDefault {
  .\$width\(\(100px\+5vw\)\*2\) {
    inline-size: calc(200px + 10vw);
  }
}
```

**csss:** $height(3rem*(1+0.5))
**css:**
```css
@layer containerDefault {
  .\$height\(3rem\*\(1\+0\.5\)\) {
    block-size: calc(4.5rem);
  }
}
```

**csss:** $width(--base-size*2)
**css:**
```css
@layer containerDefault {
  .\$width\(--base-size\*2\) {
    inline-size: calc(var(--base-size) * 2);
  }
}
```

**csss:** $height(--base-size+10px)
**css:**
```css
@layer containerDefault {
  .\$height\(--base-size\+10px\) {
    block-size: calc(var(--base-size) + 10px);
  }
}
```

**csss:** $margin(-10px+20px)
**css:**
```css
@layer containerDefault {
  .\$margin\(-10px\+20px\) {
    margin: calc(10px);
  }
}
```

**csss:** $padding(1rem-5px)
**css:**
```css
@layer containerDefault {
  .\$padding\(1rem-5px\) {
    padding: calc(-5px + 1rem);
  }
}
```

**csss:** $width((100px+50px)*(2-0.5))
**css:**
```css
@layer containerDefault {
  .\$width\(\(100px\+50px\)\*\(2-0\.5\)\) {
    inline-size: calc(225px);
  }
}
```

**csss:** $bg((--color_undefined1,--color_primary,--color_secondary))
**css:**
```css
@layer containerDefault {
  .\$bg\(\(--color_undefined1\,--color_primary\,--color_secondary\)\) {
    background-image: linear-gradient(var(--color_undefined1, var(--color_primary, var(--color_secondary))));
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

**csss:** $width(1em/--var)
**css:**
```css
@layer containerDefault {
  .\$width\(1em\/--var\) {
    inline-size: calc(1em / var(--var));
  }
}
```

**csss:** $width((1em+20px)*20+40px)
**css:**
```css
@layer containerDefault {
  .\$width\(\(1em\+20px\)\*20\+40px\) {
    inline-size: calc(20em + 440px);
  }
}
```

**csss:** $bg(lightblue)
**css:**
```css
@layer containerDefault {
  .\$bg\(lightblue\) {
    background-image: linear-gradient(lightblue);
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

**csss:** $padding(1rem)
**css:**
```css
@layer containerDefault {
  .\$padding\(1rem\) {
    padding: 1rem;
  }
}
```

**csss:** $margin(2px+5px*(--var/3.5))
**css:**
```css
@layer containerDefault {
  .\$margin\(2px\+5px\*\(--var\/3\.5\)\) {
    margin: calc(2px + 5px * (var(--var) / 3.5));
  }
}
```

**csss:** $border(solid,1px)
**css:**
```css
@layer containerDefault {
  .\$border\(solid\,1px\) {
    border-style: solid;
    border-width: 1px;
  }
}
```

**csss:** $w(min(2px+1em,10%))
**css:**
```css
@layer containerDefault {
  .\$w\(min\(2px\+1em\,10\%\)\) {
    inline-size: min(1em + 2px, 10%);
  }
}
```

**csss:** $h(max(2px+1em,10%,3vw))
**css:**
```css
@layer containerDefault {
  .\$h\(max\(2px\+1em\,10\%\,3vw\)\) {
    block-size: max(1em + 2px, 10%, 3vw);
  }
}
```

**csss:** $em(clamp(10%,2px+1em,20%))
**css:**
```css
@layer containerDefault {
  .\$em\(clamp\(10\%\,2px\+1em\,20\%\)\) {
    font-size: clamp(10%, 1em + 2px, 20%);
  }
}
```

**csss:** $w(---safe-area-inset-top)
**css:**
```css
@layer containerDefault {
  .\$w\(---safe-area-inset-top\) {
    inline-size: env(safe-area-inset-top);
  }
}
```

**csss:** $h(---safe-area-inset-top*2)
**css:**
```css
@layer containerDefault {
  .\$h\(---safe-area-inset-top\*2\) {
    block-size: calc(env(safe-area-inset-top) * 2);
  }
}