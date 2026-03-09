**description:** Border width using calc subtraction with a CSS variable.
**csss:** $border(3px---bob)
**css:**
```css
@layer containerDefault {
  .\$border\(3px---bob\) {
    border-width: calc(3px - var(--bob));
  }
}
```

**description:** Border width using CSS variable with 2px fallback.
**csss:** $border(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?2px\) {
    border-width: var(--bob,2px);
  }
}
```

**description:** Border width using calc addition with a CSS variable.
**csss:** $border(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+--bob\) {
    border-width: calc(2px + var(--bob));
  }
}
```

**description:** Border width using var + calc addition.
**csss:** $border(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\+2px\) {
    border-width: calc(var(--bob) + 2px);
  }
}
```

**description:** Statically evaluates 2px - 2px to 0px at compile time.
**csss:** $border(2px-2px)
**css:**
```css
@layer containerDefault {
  .\$border\(2px-2px\) {
    border-width: 0px;
  }
}
```
**description:** Statically evaluates 2px + 2px * 4 to 10px at compile time.
**csss:** $border(2px+2px*4)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\+2px\*4\) {
    border-width: 10px;
  }
}
```

**description:** Uses CSS variable with a computed 6px fallback (3px * 2).
**csss:** $border(--bob??3px*2)
**css:**
```css
@layer containerDefault {
  .\$border\(--bob\?\?3px\*2\) {
    border-width: var(--bob,6px);
  }
}
```

**description:** Rounds 1.5px to nearest integer pixel (2px).
**csss:** $border(round(1.5px))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\)\) {
    border-width: 2px;
  }
}
```

**description:** Uses CSS round() function with a var expression and step.
**csss:** $border(round(1.5px+--bob,3vw))
**css:**
```css
@layer containerDefault {
  .\$border\(round\(1\.5px\+--bob\,3vw\)\) {
    border-width: round(1.5px + var(--bob), 3vw);
  }
}
```
