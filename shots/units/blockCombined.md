**csss:** $block(textJustify,gap(0.3em,1.6))
**css:**
```css
@layer containerDefault {
  .\$block\(textJustify\,gap\(0\.3em\,1\.6\)\) {
    display: block;
    word-spacing: 0.3em;
    line-height: 1.6;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
  }
}
```

**csss:** |*$_block(indent(2em),margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\*\$_block\(indent\(2em\)\,margin\(0\,0\,1rem\)\)>* {
    text-indent: 2em;
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |.title$_block(indent(0),margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.title\$_block\(indent\(0\)\,margin\(0\,0\,2rem\)\)>:where(.title) {
    text-indent: 0;
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```

**csss:** |.subtitle$_block(indent(1em),margin(0,0,1.5rem))
**css:**
```css
@layer items {
  .\|\.subtitle\$_block\(indent\(1em\)\,margin\(0\,0\,1\.5rem\)\)>:where(.subtitle) {
    text-indent: 1em;
    margin-block: 0 1.5rem;
    margin-inline: 0;
  }
}
```

**csss:** $w(.<.<600px)
**css:**
```css
@layer containerDefault {
  .\$w\(\.\<\.\<600px\) {
    max-inline-size: 600px;
  }
}
```

**csss:** $block(breakWord,gap(0.2em,1.4))
**css:**
```css
@layer containerDefault {
  .\$block\(breakWord\,gap\(0\.2em\,1\.4\)\) {
    display: block;
    word-spacing: 0.2em;
    line-height: 1.4;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-wrap: break-word;
  }
}
```

**csss:** |*$_block(margin(0.5rem,1rem))
**css:**
```css
@layer items {
  .\|\*\$_block\(margin\(0\.5rem\,1rem\)\)>* {
    margin-block: 0.5rem;
    margin-inline: 1rem;
  }
}
```

**csss:** |.highlight$_block(indent(0))
**css:**
```css
@layer items {
  .\|\.highlight\$_block\(indent\(0\)\)>:where(.highlight) {
    text-indent: 0;
  }
}
```

**csss:** $block(overflowAuto,textCenter)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowAuto\,textCenter\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: center;
    text-indent: unset;
    overflow: auto;
  }
}
```

**csss:** |.box$_block(floatStart,margin(0,1rem,1rem,0))
**css:**
```css
@layer items {
  .\|\.box\$_block\(floatStart\,margin\(0\,1rem\,1rem\,0\)\)>:where(.box) {
    float: inline-start;
    margin-block: 0 1rem;
    margin-inline: 1rem 0;
  }
}
```

**csss:** |p$_block(margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|p\$_block\(margin\(0\,0\,1rem\)\)>:where(p) {
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** $block(padding(1.5rem))
**css:**
```css
@layer containerDefault {
  .\$block\(padding\(1\.5rem\)\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    padding: 1.5rem;
  }
}
```

**csss:** |h4$_block(margin(0,0,0.5rem))
**css:**
```css
@layer items {
  .\|h4\$_block\(margin\(0\,0\,0\.5rem\)\)>:where(h4) {
    margin-block: 0 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |.intro$_block(indent(0),margin(0,0,2rem))
**css:**
```css
@layer items {
  .\|\.intro\$_block\(indent\(0\)\,margin\(0\,0\,2rem\)\)>:where(.intro) {
    text-indent: 0;
    margin-block: 0 2rem;
    margin-inline: 0;
  }
}
```

**csss:** |.content$_block(indent(1.5rem),margin(0,0,1rem))
**css:**
```css
@layer items {
  .\|\.content\$_block\(indent\(1\.5rem\)\,margin\(0\,0\,1rem\)\)>:where(.content) {
    text-indent: 1.5rem;
    margin-block: 0 1rem;
    margin-inline: 0;
  }
}
```

**csss:** |.note$_block(floatEnd,margin(0,0,1rem,1rem))
**css:**
```css
@layer items {
  .\|\.note\$_block\(floatEnd\,margin\(0\,0\,1rem\,1rem\)\)>:where(.note) {
    float: inline-end;
    margin-block: 0 1rem;
    margin-inline: 0 1rem;
  }
}
```