**csss:** $w(--bob??2px)
**css:**
```css
@layer containerDefault {
  .\$w\(--bob\?\?2px\) {
    inline-size: var(--bob,2px);
  }
}
```

**csss:** $w(2px+2px)
**css:**
```css
@layer containerDefault {
  .\$w\(2px\+2px\) {
    inline-size: var(--bob,2px);
  }
}
```

**csss:** $w(2px+--bob)
**css:**
```css
@layer containerDefault {
  .\$w\(2px\+--bob\) {
    inline-size: calc(2px + var(--bob));
  }
}
```

**csss:** $w(--bob+2px)
**css:**
```css
@layer containerDefault {
  .\$w\(--bob\+2px\) {
    inline-size: calc(var(--bob) + 2px);
  }
}
```

**csss:** $w(--bob+--alice)
**css:**
```css
@layer containerDefault {
  .\$w\(--bob\+--alice\) {
    inline-size: calc(var(--bob) + var(--alice));
  }
}
```

**csss:** $w(--bob??3px*2)
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