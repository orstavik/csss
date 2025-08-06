**csss:** $textShadow(2px,4px,6px,rgba(0,0,0,0.5))
**css:**
```css
@layer containerDefault {
  .\$textShadow\(2px\,4px\,6px\,rgba\(0\,0\,0\,0\.5\)\) {
    text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  }
}
```

**csss:** $dropShadow(0,0,0.75rem,crimson)
**css:**
```css
@layer containerDefault {
  .\$dropShadow\(0\,0\,0\.75rem\,crimson\) {
    filter: drop-shadow(0 0 0.75rem crimson);
  }
}
```

**csss:** $textShadow(0,0,10px,blue)
**css:**
```css
@layer containerDefault {
  .\$textShadow\(0\,0\,10px\,blue\) {
    text-shadow: 0 0 10px blue;
  }
}
```

**csss:** $boxShadow(2px,4px,6px,rgba(0,0,0,0.5))
**css:**
```css
@layer containerDefault {
  .\$boxShadow\(2px\,4px\,6px\,rgba\(0\,0\,0\,0\.5\)\) {
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  }
}
```

**csss:** $palette(variations,yellow,blue)
**css:**
```css
@layer containerDefault {
  .\$palette\(variations\,yellow\,blue\) {
    --color-variations: yellow;
    --color-variations-pop: oklch(0.968, 0.110, 110);
    --color-variations-accent: oklch(0.968, 0.196, 110);
    --color-variations-bland: oklch(0.968, 0.105, 110);
    --color-variations1: blue;
    --color-variations-pop1: oklch(0.968, 0.110, 110);
    --color-variations-accent1: oklch(0.968, 0.196, 110);
    --color-variations-bland1: oklch(0.968, 0.105, 110);
  }
}
```

**csss:** $bg(#variations-bland#50)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#variations-bland\#50\) {
    background-image: linear-gradient(color-mix(in oklab, var(--color-variations-bland), var(--color-variations-bland1) 50%));
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

**csss:** $color(#variations-pop#a60)
**css:**
```css
@layer containerDefault {
  .\$color\(\#variations-pop\#a60\) {
    color: color-mix(in oklab, var(--color-variations-pop), transparent 40%);
  }
}
```

**csss:** $bg(#variations-accent)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#variations-accent\) {
    background-image: linear-gradient(var(--color-variations-accent));
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

**csss:** $color(#variations-accent)
**css:**
```css
@layer containerDefault {
  .\$color\(\#variations-accent\) {
    color: var(--color-variations-accent);
  }
}
```

**csss:** $bg(#variations#20#a30)
**css:**
```css
@layer containerDefault {
  .\$bg\(\#variations\#20\#a30\) {
    background-image: linear-gradient(color-mix(in oklab, color-mix(in oklab, var(--color-variations), var(--color-variations1) 20%), transparent 70%));
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

**csss:** $color(#variations-pop#20#a40)
**css:**
```css
@layer containerDefault {
  .\$color\(\#variations-pop\#20\#a40\) {
    color: color-mix(in oklab, color-mix(in oklab, var(--color-variations-pop), var(--color-variations-pop1) 20%), transparent 60%);
  }
}
```
