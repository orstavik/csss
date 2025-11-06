**csss:** $border(3px---bob)
**css:**
```css
@layer containerDefault {
  .\$border\(3px---bob\) {
    border: calc(3px - var(--bob)) solid;
  }
}
```

**csss:** $border(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?2px\) {
    border: var(--bob,2px) solid;
  }
}
```

**csss:** $border(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+--bob\) {
    border: calc(2px + var(--bob)) solid;
  }
}
```

**csss:** $border(2px-2px)
**css:**
```css
@layer containerDefault {
  .\$border\(2px-2px\) {
    border: 0px solid;
  }
}
```
**csss:** $border(2px+2px*4)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+2px\*4\) {
    border: 10px solid;
  }
}
```

**csss:** $border(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+2px\) {
    border: calc(var(--bob) + 2px) solid;
  }
}
```

**csss:** $border(--bob??3px*2)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?3px\*2\) {
    border: var(--bob,6px) solid;
  }
}
```

**csss:** $border(round(1.5px))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\)\) {
    border: 2px solid;
  }
}
```

**csss:** $border(round(1.5px+--bob,3vw))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\+--bob\,3vw\)\) {
    border: round(1.5px + var(--bob), 3vw) solid;
  }
}
```