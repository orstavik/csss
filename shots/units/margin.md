**csss:** |*$blockItem(margin(1rem,0))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(1rem\,0\)\)>* {
    margin-block: 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$flexItem(margin(1rem))
**css:**
```css
@layer items {
  .\|\*\$flexItem\(margin\(1rem\)\)>* {
    margin: 1rem;
  }
}
```

**csss:** |.a$flexItem(margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.a\$flexItem\(margin\(0\,0\,2rem\)\)>:where(.a) {
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```