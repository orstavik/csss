**csss:** $border(3px---bob)
**css:**
```css
@layer containerDefault {
  .\$border\(3px---bob\) {
    border-width: calc(3px - var(--bob));
  }
}
```

**csss:** $border(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?2px\) {
    border-width: var(--bob,2px);
  }
}
```

**csss:** $border(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+--bob\) {
    border-width: calc(2px + var(--bob));
  }
}
```

**csss:** $border(2px-2px)
**css:**
```css
@layer containerDefault {
  .\$border\(2px-2px\) {
    border-width: 0px;
  }
}
```
**csss:** $border(2px+2px*4)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+2px\*4\) {
    border-width: 10px;
  }
}
```

**csss:** $border(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+2px\) {
    border-width: calc(var(--bob) + 2px);
  }
}
```

**csss:** $border(--bob??3px*2)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?3px\*2\) {
    border-width: var(--bob,6px);
  }
}
```

**csss:** $border(round(1.5px))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\)\) {
    border-width: 2px;
  }
}
```

**csss:** $border(round(1.5px+--bob,3vw))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\+--bob\,3vw\)\) {
    border-width: round(1.5px + var(--bob), 3vw);
  }
}
```