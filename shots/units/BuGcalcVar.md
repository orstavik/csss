**csss:** $border(2px-2px)
**css:**
```css
@layer containerDefault {
  .\$border\(2px-2px\) {
    border-style: solid;
    border-width: 0px;
  }
}
```
**csss:** $border(2px+2px*4)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+2px\*4\) {
    border-style: solid;
    border-width: 10px;
  }
}
```

**csss:** $border(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+--bob\) {
    inline-size: calc(2px + var(--bob));
  }
}
```

**csss:** $border(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+2px\) {
    inline-size: calc(var(--bob) + 2px);
  }
}
```

**csss:** $border(--bob+--alice)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+--alice\) {
    inline-size: calc(var(--bob) + var(--alice));
  }
}
```

**csss:** $border(--bob??3px*2)
**css:**
```css
@layer containerDefault {
  .\$w\(--bob\?\?3px\*2\) {
    inline-size: calc(var(--bob,3px) * 2);
  }
}
```

**csss:** $w(3px---bob)
**css:**
```css
@layer containerDefault {
  .\$w\(3px---bob\) {
    inline-size: calc(3px - var(--bob));
  }
}
```

**csss:** $border(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?2px\) {
    inline-size: var(--bob,2px);
  }
}
```