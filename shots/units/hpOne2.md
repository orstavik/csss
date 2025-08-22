**csss:** $flex(ellipsis)
**css:**
```css
@layer containerDefault {
  .\$flex\(ellipsis\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: nowrap;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    text-overflow: ellipsis;
  }
}
```

**csss:** $flex(gap(1rem),overflowVisibleAuto,padding(1rem))$w(80%)
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\,overflowVisibleAuto\,padding\(1rem\)\)\$w\(80\%\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    gap: 1rem;
    overflow-inline: visible;
    overflow-block: auto;
    padding: 1rem;
    inline-size: 80%;
  }
}
```

**csss:** |*$_flex(shrink(0),center,w(7rem),h(3rem))
**css:**
```css
@layer items {
  .\|\*\$_flex\(shrink\(0\)\,center\,w\(7rem\)\,h\(3rem\)\)>* {
    flex-shrink: 0;
    align-self: center;
    text-align: center;
    inline-size: 7rem;
    block-size: 3rem;
  }
}
```

**csss:** $cursor(pointer)
**css:**
```css
@layer containerDefault {
  .\$cursor\(pointer\) {
    cursor: pointer;
  }
}
```

**csss:** $cursor(ew-resize)
**css:**
```css
@layer containerDefault {
  .\$cursor\(ew-resize\) {
    cursor: ew-resize;
  }
}
```

**csss:** $translate(10px)$rotate(45deg)
**css:**
```css
@layer containerDefault {
  .\$translate\(10px\)\$rotate\(45deg\) {
    transform: translate(10px) rotate(45deg);
  }
}
```

**csss:** $w(100%)
**css:**
```css
@layer containerDefault {
  .\$w\(100\%\) {
    inline-size: 100%;
  }
}
```

**csss:** $em(15px)
**css:**
```css
@layer containerDefault {
  .\$em\(15px\) {
    font-size: 15px;
  }
}
```

**csss:** $block(s,gap(0.3em,1em))
**css:**
```css
@layer containerDefault {
  .\$block\(s\,gap\(0\.3em\,1em\)\) {
    display: block;
    word-spacing: 0.3em;
    line-height: 1em;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
  }
}
```

**csss:** |$_block(indent(15%))
**css:**
```css
@layer itemsDefault {
  .\|\$_block\(indent\(15\%\)\)>* {
    text-indent: 15%;
  }
}
```

**csss:** |.head$_block(indent(-5%))
**css:**
```css
@layer items {
  .\|\.head\$_block\(indent\(-5\%\)\)> :where(.head) {
    text-indent: -5%;
  }
}
```

**csss:** |.subheading$_block(indent(0))
**css:**
```css
@layer items {
  .\|\.subheading\$_block\(indent\(0\)\)> :where(.subheading) {
    text-indent: 0px;
  }
}
```

**csss:** @(print,screen):hover$border(solid,2px)
**css:**
```css
@layer container {
  @media print,
  screen {
    .\@\(print\,screen\)\:hover\$border\(solid\,2px\):where(:hover) {
      border-style: solid;
      border-width: 2px;
    }
  }
}
```

**csss:** @(print,screen):hover|:valid$border(dotted,2px)
**css:**
```css
@layer items {
  @media print,
  screen {
    .\@\(print\,screen\)\:hover\|\:valid\$border\(dotted\,2px\):where(:hover)> :where(:valid) {
      border-style: dotted;
      border-width: 2px;
    }
  }
}
```

**csss:** @(print,screen):hover|.first$border(dashed,2px)
**css:**
```css
@layer items {
  @media print,
  screen {
    .\@\(print\,screen\)\:hover\|\.first\$border\(dashed\,2px\):where(:hover)> :where(.first) {
      border-style: dashed;
      border-width: 2px;
    }
  }
}
```

**csss:** $grid(cols(1fr,1fr),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
```

**csss:** $border(solid,w(1px+1em))
**css:**
```css
@layer containerDefault {
  .\$border\(solid\,w\(1px\+1em\)\) {
    border-style: solid;
    border-width: calc(1em + 1px);
  }
}
```

**csss:** $padding(1rem)
**css:**
```css
@layer containerDefault {
  .\$padding\(1rem\) {
    padding: 1rem;
  }
}
```

**csss:** $border(solid,w(--border-width))
**css:**
```css
@layer containerDefault {
  .\$border\(solid\,w\(--border-width\)\) {
    border-style: solid;
    border-width: var(--border-width);
  }
}
```

**csss:** $border(solid,w(1px+2px))
**css:**
```css
@layer containerDefault {
  .\$border\(solid\,w\(1px\+2px\)\) {
    border-style: solid;
    border-width: calc(3px);
  }
}
```

**csss:** $ultraCondensed
**css:**
```css
@layer containerDefault {
  .\$ultraCondensed {
    font-stretch: ultra-condensed;
  }
}
```

**csss:** $lineThrough(3px)
**css:**
```css
@layer containerDefault {
  .\$lineThrough\(3px\) {
    text-decoration-line: line-through;
    text-decoration-thickness: 3px;
    text-decoration-style: solid;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $overLine(2px,#myblue)
**css:**
```css
@layer containerDefault {
  .\$overLine\(2px\,\#myblue\) {
    text-decoration-line: overline;
    text-decoration-thickness: 2px;
    text-decoration-style: solid;
    text-decoration-color: var(--color-myblue);
  }
}
```

**csss:** $grammarError(2px)
**css:**
```css
@layer containerDefault {
  .\$grammarError\(2px\) {
    text-decoration-line: grammar-error;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $overUnderLineThrough(2px)
**css:**
```css
@layer containerDefault {
  .\$overUnderLineThrough\(2px\) {
    text-decoration-line: underline overline line-through;
    text-decoration-thickness: 2px;
    text-decoration-style: solid;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $wavyOverUnderLineThrough(2px)
**css:**
```css
@layer containerDefault {
  .\$wavyOverUnderLineThrough\(2px\) {
    text-decoration-line: underline overline line-through;
    text-decoration-thickness: 2px;
    text-decoration-style: wavy;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $dottedUnderLine(2px)
**css:**
```css
@layer containerDefault {
  .\$dottedUnderLine\(2px\) {
    text-decoration-line: underline;
    text-decoration-thickness: 2px;
    text-decoration-style: dotted;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $dashedOverUnderLineThrough(2px)
**css:**
```css
@layer containerDefault {
  .\$dashedOverUnderLineThrough\(2px\) {
    text-decoration-line: underline overline line-through;
    text-decoration-thickness: 2px;
    text-decoration-style: dashed;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $doubleOverLine(2px)
**css:**
```css
@layer containerDefault {
  .\$doubleOverLine\(2px\) {
    text-decoration-line: overline;
    text-decoration-thickness: 2px;
    text-decoration-style: double;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $textDecoration(none)
**css:**
```css
@layer containerDefault {
  .\$textDecoration\(none\) {
    text-decoration-line: none;
    text-decoration-thickness: unset;
    text-decoration-style: unset;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $textDecoration(.)
**css:**
```css
@layer containerDefault {
  .\$textDecoration\(\.\) {
    text-decoration-line: unset;
    text-decoration-thickness: unset;
    text-decoration-style: unset;
    text-decoration-color: var(--color-textdecorationcolor, currentcolor);
  }
}
```

**csss:** $lowercase
**css:**
```css
@layer containerDefault {
  .\$lowercase {
    text-transform: lowercase;
  }
}
```

**csss:** $uppercase
**css:**
```css
@layer containerDefault {
  .\$uppercase {
    text-transform: uppercase;
  }
}
```

**csss:** $lineClamp(2)
**css:**
```css
@layer containerDefault {
  .\$lineClamp\(2\) {
    display: -webkit-box;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow-block: hidden;
  }
}
```

**csss:** $color(#fg)
**css:**
```css
@layer containerDefault {
  .\$color\(\#fg\) {
    color: var(--color-fg);
  }
}
```

**csss:** $bg(yellow)
**css:**
```css
@layer containerDefault {
  .\$bg\(yellow\) {
    background-image: linear-gradient(yellow);
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $textCenter
**css:**
```css
@layer containerDefault {
  .\$textCenter {
    text-align: center;
  }
}
```

**csss:** $bg(blue)
**css:**
```css
@layer containerDefault {
  .\$bg\(blue\) {
    background-image: linear-gradient(blue);
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $color(white)
**css:**
```css
@layer containerDefault {
  .\$color\(white\) {
    color: white;
  }
}
```

**csss:** $bg(red)
**css:**
```css
@layer containerDefault {
  .\$bg\(red\) {
    background-image: linear-gradient(red);
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $bg(green)
**css:**
```css
@layer containerDefault {
  .\$bg\(green\) {
    background-image: linear-gradient(green);
    background-position: 0% 0%;
    background-repeat: repeat;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-blend-mode: normal;
    background-attachment: scroll;
  }
}
```

**csss:** $block
**css:**
```css
@layer containerDefault {
  .\$block {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $border
**css:**
```css
@layer containerDefault {
  .\$border {
    border-style: solid;
  }
}
```

**csss:** $border(dotted,50px,easeIn(10s))
**css:**
```css
@layer containerDefault {
  .\$border\(dotted\,50px\,easeIn\(10s\)\) {
    border-style: dotted;
    border-width: 50px;
    transition: border-width 10s ease-in;
  }
}
```
