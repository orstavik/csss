**csss:** $paragraph(hyphens)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(hyphens\) {
    hyphens: auto;
  }
}
```

**csss:** $paragraph(12px,shy,indent(2em),spacing(1em))
**css:**
```css
@layer containerDefault {
  .\$paragraph\(12px\,shy\,indent\(2em\)\,spacing\(1em\)\) {
    line-height: 12px;
    hyphens: manual;
    text-indent: 2em;
    word-spacing: 1em;
  }
}
```

**csss:** $paragraph(nowrap)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(nowrap\) {
    white-space: nowrap;
  }
}
```

**csss:** $paragraph(preWrap)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(preWrap\) {
    white-space: pre-wrap;
  }
}
```

**csss:** $paragraph(preLine)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(preLine\) {
    white-space: pre-line;
  }
}
```

**csss:** $paragraph(pre)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(pre\) {
    white-space: pre;
  }
}
```

**csss:** $paragraph(breakSpaces)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(breakSpaces\) {
    white-space: break-spaces;
  }
}
```

**csss:** $paragraph(whiteSpaceNormal)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(whiteSpaceNormal\) {
    white-space: normal;
  }
}
```

**csss:** $paragraph(justify)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(justify\) {
    text-align: justify;
  }
}
```

**csss:** $paragraph(center)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(center\) {
    text-align: center;
  }
}
```

**csss:** $paragraph(start)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(start\) {
    text-align: start;
  }
}
```

**csss:** $paragraph(end)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(end\) {
    text-align: end;
  }
}
```


**csss:** $paragraph(justify,spacing(0.3em),1.6)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(justify\,spacing\(0\.3em\)\,1\.6\) {
    text-align: justify;
    word-spacing: 0.3em;
    line-height: 1.6;
  }
}
```

**csss:** $paragraph(breakWord,spacing(0.2em),1.4)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(breakWord\,spacing\(0\.2em\)\,1\.4\) {
    word-break: break-all;
    overflow-wrap: break-word;
    word-spacing: 0.2em;
    line-height: 1.4;
  }
}
```

**csss:** |.highlight$paragraph(indent(0))
**css:**
```css
@layer items {
  .\|\.highlight\$paragraph\(indent\(0\)\)>:where(.highlight) {
    text-indent: 0;
  }
}
```

**csss:** |*$Paragraph(_,indent(2rem))
**css:**
```css
@layer items {
  .\|\*\$Paragraph\(_\,indent\(2rem\)\)>* {
    line-height: unset;
    text-indent: 2rem;
    word-spacing: unset;
    hyphens: unset;
    white-space: unset;
    overflow-wrap: unset;
    word-break: unset;
    text-align: unset;
    text-align-last: unset;
    hanging-punctuation: unset;
  }
}
```

**csss:** |.negative$paragraph(indent(-1em))
**css:**
```css
@layer items {
  .\|\.negative\$paragraph\(indent\(-1em\)\)>:where(.negative) {
    text-indent: -1em;
  }
}
```

**csss:** $paragraph(1.8,spacing(0.5rem))
**css:**
```css
@layer containerDefault {
  .\$paragraph\(1\.8\,spacing\(0\.5rem\)\) {
    line-height: 1.8;
    word-spacing: 0.5rem;
  }
}
```

**csss:** $paragraph(1.2,spacing(0))
**css:**
```css
@layer containerDefault {
  .\$paragraph\(1\.2\,spacing\(0\)\) {
    line-height: 1.2;
    word-spacing: 0;
  }
}
```

**csss:** $paragraph(1.5)
**css:**
```css
@layer containerDefault {
  .\$paragraph\(1\.5\) {
    line-height: 1.5;
  }
}
```