**description:** Applies dotted overline, underline and line-through in green with no skip-ink.
**csss:** $textDecoration(dotted,over,under,through,#green,2px,noSkipInk)
**css:**
```css
@layer containerDefault {
  .\$textDecoration\(dotted\,over\,under\,through\,\#green\,2px\,noSkipInk\) {
    text-decoration: dotted overline underline line-through green 2px;
    text-decoration-skip-ink: none;
  }
}
```

**description:** Applies dashed red overline with auto skip-ink.
**csss:** $textDecoration(dashed,over,#red)
**css:**
```css
@layer containerDefault {
  .\$textDecoration\(dashed\,over\,\#red\) {
    text-decoration: dashed overline red;
    text-decoration-skip-ink: auto;
  }
}
```

**description:** Removes all text decoration from the element.
**csss:** $textDecorationNone
**css:**
```css
@layer containerDefault {
  .\$textDecorationNone {
    text-decoration: none;
    text-decoration-skip-ink: auto;
  }
}
```
