**csss:** $block(textJustify,gap(0.3em,1.6))
**css:**
```css
@layer containerDefault {
  .\$block\(textJustify\,gap\(0\.3em\,1\.6\)\) {
    display: block;
    word-spacing: 0.3em;
    line-height: 1.6;
    text-align: justify;
    text-indent: unset;
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

**csss:** $block(breakWord,gap(0.2em,1.4))
**css:**
```css
@layer containerDefault {
  .\$block\(breakWord\,gap\(0\.2em\,1\.4\)\) {
    display: block;
    word-spacing: 0.2em;
    line-height: 1.4;
    text-align: unset;
    text-indent: unset;
    overflow-wrap: break-word;
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

**csss:** $block(overflowAuto,textCenter)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowAuto\,textCenter\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: center;
    text-indent: unset;
    overflow: auto;
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

**csss:** $block(padding(1.5rem))
**css:**
```css
@layer containerDefault {
  .\$block\(padding\(1\.5rem\)\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    text-align: unset;
    text-indent: unset;
    padding: 1.5rem;
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