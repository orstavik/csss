**csss:** $border(--bob??3px*2)
**css:**
```css
@layer containerDefault {
  .\$w\(--bob\?\?3px\*2\) {
    border-style: solid;
    border-width: calc(var(--bob,3px) * 2);
  }
}
```

**csss:** $w(3px---bob)
**css:**
```css
@layer containerDefault {
  .\$w\(3px---bob\) {
    border-style: solid;
    border-width: calc(3px - var(--bob));
  }
}
```

**csss:** $border(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?2px\) {
    border-style: solid;
    border-width: var(--bob,2px);
  }
}
```

**csss:** $border(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+--bob\) {
    border-style: solid;
    border-width: calc(2px + var(--bob));
  }
}
```

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

**csss:** $border(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+2px\) {
    border-style: solid;
    border-width: calc(var(--bob) + 2px);
  }
}
```