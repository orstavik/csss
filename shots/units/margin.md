**csss:** |*$margin(1rem,0)
**css:**
```css
@layer items {
  .\|\*\$margin\(1rem\,0\)>* {
    margin: 1rem 0px;
  }
}
```

**csss:** |*$_flex(m(1rem))
**css:**
```css
@layer items {
  .\|\*\$_flex\(m\(1rem\)\)>* {
    margin: 1rem;
  }
}
```

**csss:** |.a$_flex(m(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.a\$_flex\(m\(0\,0\,2rem\)\)> :where(.a) {
    margin-block: 0px 2rem;
    margin-inline: 0px;
  }
}
```