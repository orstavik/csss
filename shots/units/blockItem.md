**csss:** $block(textJustify)
**css:**
```css
@layer containerDefault {
  .\$block\(textJustify\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
  }
}
```

**csss:** |*$_block(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$_block\(margin\(1rem\,0\,0\.5rem\)\)>* {
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$_block(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$_block\(margin\(0\,0\,1rem\)\)>* {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** $margin(2rem,0,0,0)
**css:**
```css
@layer containerDefault {
  .\$margin\(2rem\,0\,0\,0\) {
    margin-block: 2rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |*$_block(indent(2rem))
**css:**
```css
@layer items {
  .\|\*\$_block\(indent\(2rem\)\)>* {
    text-indent: 2rem;
  }
}
```

**csss:** |.negative$_block(indent(-1em))
**css:**
```css
@layer items {
  .\|\.negative\$_block\(indent\(-1em\)\)> :where(.negative) {
    text-indent: -1em;
  }
}
```

**csss:** |.start$_block(floatStart,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.start\$_block\(floatStart\,margin\(0\.5rem\,0\,0\,0\)\)> :where(.start) {
    float: inline-start;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |.end$_block(floatEnd,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.end\$_block\(floatEnd\,margin\(0\.5rem\,0\,0\,0\)\)> :where(.end) {
    float: inline-end;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** $w(100px)
**css:**
```css
@layer containerDefault {
  .\$w\(100px\) {
    inline-size: 100px;
  }
}
```

**csss:** $h(60px)
**css:**
```css
@layer containerDefault {
  .\$h\(60px\) {
    block-size: 60px;
  }
}
```

