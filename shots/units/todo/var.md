**description:** Border width using calc subtraction with a CSS variable.
**csss:** $border(3px---bob)
**css:**
```css
.\$border\(3px---bob\) {
  border-width: calc(3px - var(--bob));
}
```

**description:** Border width using CSS variable with 2px fallback.
**csss:** $border(--bob??2px)
**css:**
```css
.\$border\(--bob\?\?2px\) {
  border-width: var(--bob,2px);
}
```

**description:** Border width using calc addition with a CSS variable.
**csss:** $border(2px+--bob)
**css:**
```css
.\$border\(2px\+--bob\) {
  border-width: calc(2px + var(--bob));
}
```

**description:** Border width using var + calc addition.
**csss:** $border(--bob+2px)
**css:**
```css
.\$border\(--bob\+2px\) {
  border-width: calc(var(--bob) + 2px);
}
```

**description:** Uses CSS variable with a computed 6px fallback (3px * 2).
**csss:** $border(--bob??3px*2)
**css:**
```css
.\$border\(--bob\?\?3px\*2\) {
  border-width: var(--bob,6px);
}
```

**description:** Uses CSS round() function with a var expression and step.
**csss:** $border(round(1.5px+--bob,3vw))
**css:**
```css
.\$border\(round\(1\.5px\+--bob\,3vw\)\) {
  border-width: round(1.5px + var(--bob), 3vw);
}
```