**description:** Prevents text from wrapping to the next line.
**csss:** $nowrap
**css:**
```css
@layer containerDefault {
  .\$nowrap {
    white-space: nowrap;
  }
}
```

**description:** Preserves whitespace and allows wrapping at line breaks.
**csss:** $preWrap
**css:**
```css
@layer containerDefault {
  .\$preWrap {
    white-space: pre-wrap;
  }
}
```

**description:** Collapses whitespace but preserves line breaks.
**csss:** $preLine
**css:**
```css
@layer containerDefault {
  .\$preLine {
    white-space: pre-line;
  }
}
```

**description:** Preserves all whitespace and line breaks exactly as authored.
**csss:** $pre
**css:**
```css
@layer containerDefault {
  .\$pre {
    white-space: pre;
  }
}
```

**description:** Preserves whitespace sequences and breaks at spaces when needed.
**csss:** $breakSpaces
**css:**
```css
@layer containerDefault {
  .\$breakSpaces {
    white-space: break-spaces;
  }
}
```

**description:** Resets whitespace handling to default browser behavior.
**csss:** $normal
**css:**
```css
@layer containerDefault {
  .\$normal {
    white-space: normal;
  }
}
```
