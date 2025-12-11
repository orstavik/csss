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

**csss:** $uppercase
**css:**
```css
@layer containerDefault {
  .\$uppercase {
    text-transform: uppercase;
  }
}
```

**csss:** $noTextTransform
**css:**
```css
@layer containerDefault {
  .\$noTextTransform {
    text-transform: none;
  }
}
```