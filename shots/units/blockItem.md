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

**csss:** |*$BlockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$BlockItem\(margin\(0\,0\,1rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 0 1rem;
    margin-inline: 0;
    text-indent: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
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

**csss:** |*$BlockItem(indent(2rem))
**css:**
```css
@layer items {
  .\|\*\$BlockItem\(indent\(2rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: unset;
    margin-inline: unset;
    text-indent: 2rem;
    scroll-margin: unset;
    scroll-snap-align: unset;
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

**csss:** |*$blockItem(indent(2em),margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(indent\(2em\)\,margin\(0\,0\,1rem\)\)>* {
    text-indent: 2em;
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |.title$blockItem(indent(0),margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.title\$blockItem\(indent\(0\)\,margin\(0\,0\,2rem\)\)>:where(.title) {
    text-indent: 0;
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```

**csss:** |.subtitle$blockItem(indent(1em),margin(0,0,1.5rem))
**css:**
```css
@layer items {
  .\|\.subtitle\$blockItem\(indent\(1em\)\,margin\(0\,0\,1\.5rem\)\)>:where(.subtitle) {
    text-indent: 1em;
    margin-block: 0 1.5rem;
    margin-inline: 0;
  }
}
```

**csss:** $blockItem(inlineSize(_,_,600px))
**css:**
```css
@layer containerDefault {
  .\$blockItem\(inlineSize\(_\,_\,600px\)\) {
    min-inline-size: unset;
    inline-size: unset;
    max-inline-size: 600px;
  }
}
```

**csss:** |*$blockItem(margin(0.5rem,1rem))
**css:**
```css
@layer items {
  .\|\*\$blockItem\(margin\(0\.5rem\,1rem\)\)>* {
    margin-block: 0.5rem;
    margin-inline: 1rem;
  }
}
```

**csss:** |.highlight$blockItem(indent(0))
**css:**
```css
@layer items {
  .\|\.highlight\$blockItem\(indent\(0\)\)>:where(.highlight) {
    text-indent: 0;
  }
}
```

**csss:** |.box$blockItem(floatStart,margin(0,1rem,1rem,0))
**css:**
```css
@layer items {
  .\|\.box\$blockItem\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(.box) {
    float: inline-start;
    margin-block: 0 1rem;
    margin-inline: 1rem 0;
  }
}
```

**csss:** |p$blockItem(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|p\$blockItem\(margin\(0\,0\,1rem\)\)>:where(p) {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |h4$blockItem(margin(0,0,0.5rem))
**css:**
```css
@layer items {
  .\|h4\$blockItem\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
    margin-block: 0 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |.intro$blockItem(indent(0),margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.intro\$blockItem\(indent\(0\)\,margin\(0\,0\,2rem\)\)>:where(.intro) {
    text-indent: 0;
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```

**csss:** |.content$blockItem(indent(1.5rem),margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\.content\$blockItem\(indent\(1\.5rem\)\,margin\(0\,0\,1rem\)\)>:where(.content) {
    text-indent: 1.5rem;
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |.note$blockItem(floatEnd,margin(0,0,1rem,1rem))
**css:**
```css
@layer items {
  .\|\.note\$blockItem\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
    float: inline-end;
    margin-block: 0 1rem;
    margin-inline: 0 1rem;
  }
}
```