**csss:** |*$iBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
  }
}
```

**csss:** |*$IBlockItem(margin(1rem,0,0.5rem))
**css:**
```css
@layer items {
  .\|\*\$IBlockItem\(margin\(1rem\,0\,0\.5rem\)\)>* {
    inline-size: unset;
    block-size: unset;
    margin-block: 1rem 0.5rem;
    margin-inline: 0;
    text-indent: unset;
    scroll-margin: unset;
    scroll-snap-align: unset;
  }
}
```

**csss:** |*$iBlockItem(alignMiddle)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignMiddle\)>* {
    vertical-align: middle;
  }
}
```

**csss:** |*$iBlockItem(alignTop)
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(alignTop\)>* {
    vertical-align: top;
  }
}
```

**csss:** |*$iBlockItem(inlineSize(200px))
**css:**
```css
@layer items {
  .\|\*\$iBlockItem\(inlineSize\(200px\)\)>* {
    inline-size: 200px;
  }
}
```