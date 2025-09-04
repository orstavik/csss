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

**csss:** |*$blockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$blockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(0\,0\,1rem\)\)>* {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** $blockItem(margin(2rem,0,0,0))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(margin\(2rem\,0\,0\,0\)\) {
    margin-block: 2rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |*$blockItem(indent(2rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(indent\(2rem\)\)>* {
    text-indent: 2rem;
  }
}
```

**csss:** |.negative$blockItem(indent(-1em))
**css:**
```css
@layer items {
  .\|\.negative\$blockItem\(indent\(-1em\)\)>:where(.negative) {
    text-indent: -1em;
  }
}
```

**csss:** |.start$blockItem(floatStart,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.start\$blockItem\(floatStart\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.start) {
    float: inline-start;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** |.end$blockItem(floatEnd,margin(0.5rem,0,0,0))
**css:**
```css
@layer items {
  .\|\.end\$blockItem\(floatEnd\,margin\(0\.5rem\,0\,0\,0\)\)>:where(.end) {
    float: inline-end;
    margin-block: 0.5rem 0;
    margin-inline: 0;
  }
}
```

**csss:** $blockItem(size(60px,100px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(size\(60px\,100px\)\) {
    inline-size: 60px;
    block-size: 100px;
  }
}
```