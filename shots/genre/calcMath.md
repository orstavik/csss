**description:** Statically evaluates 2px - 2px to 0px at compile time.
**csss:** $border(2px-2px)
**css:**
```css
.\$border\(2px-2px\) {
  border-width: 0px;
}
```

**description:** Statically evaluates 2px + 2px * 4 to 10px at compile time.
**csss:** $border(2px+2px*4)
**css:**
```css
.\$border\(2px\+2px\*4\) {
  border-width: 10px;
}
```

**description:** Rounds 1.5px to nearest integer pixel (2px).
**csss:** $border(round(1.5px))
**css:**
```css
.\$border\(round\(1\.5px\)\) {
  border-width: 2px;
}
```

**description:** Statically evaluates 2px + 2px * 4 - 5px / 2 to 7.5px at compile time.
**csss:** $border(2px+2px*4-5px/2)
**css:**
```css
.\$border\(2px\+2px\*4-5px\/2\) {
  border-width: 7.5px;
}
```
