**csss:** $grid(cols(1fr,1fr,1fr),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\,1fr\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
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

**csss:** $padding(1rem)
**css:**
```css
@layer containerDefault {
  .\$padding\(1rem\) {
    padding: 1rem;
  }
}
```

**csss:** $grid(cols(100px,auto,1fr),rows(50px,100px,auto),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(100px\,auto\,1fr\)\,rows\(50px\,100px\,auto\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 100px auto 1fr;
    grid-template-rows: 50px 100px auto;
    gap: 1rem;
  }
}
```

**csss:** $padding(0.5rem)
**css:**
```css
@layer containerDefault {
  .\$padding\(0\.5rem\) {
    padding: 0.5rem;
  }
}
```

**csss:** $grid(cols(1fr,1fr),rows(100px,100px),gap(1rem),ccss)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\)\,rows\(100px\,100px\)\,gap\(1rem\)\,ccss\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 100px;
    gap: 1rem;
    place-content: center;
    place-items: stretch;
  }
}
```

**csss:** $h(300px)
**css:**
```css
@layer containerDefault {
  .\$h\(300px\) {
    block-size: 300px;
  }
}
```

**csss:** $grid(cols(1fr,1fr),rows(100px,100px),gap(1rem),abab)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\)\,rows\(100px\,100px\)\,gap\(1rem\)\,abab\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: end;
    text-indent: unset;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 100px 100px;
    gap: 1rem;
    place-content: start end;
    place-items: start end;
  }
}
```

**csss:** $grid(cols(1fr,1fr),rows(50px,50px),gap(1rem),wucs)
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\)\,rows\(50px\,50px\)\,gap\(1rem\)\,wucs\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 50px 50px;
    gap: 1rem;
    place-content: space-between space-around;
    place-items: center stretch;
  }
}
```

**csss:** $flex(gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(column,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(column\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-direction: column;
    gap: 1rem;
  }
}
```

**csss:** $flex(rowReverse,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(rowReverse\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-direction: row-reverse;
    gap: 1rem;
  }
}
```

**csss:** $flex(column-reverse,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(column-reverse\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-direction: column-reverse;
    gap: 1rem;
  }
}
```

**csss:** $flex(c,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(c\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: center;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $h(200px)
**css:**
```css
@layer containerDefault {
  .\$h\(200px\) {
    block-size: 200px;
  }
}
```

**csss:** $flex(ab,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(ab\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: start end;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(w,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(w\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-between;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(u,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(u\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-around;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(v,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(v\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-evenly;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(cc,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(cc\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: center;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(ww,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(ww\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-between;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(vu,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(vu\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-evenly space-around;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(s.,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(s\.\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-content: stretch;
    justify-content: unset;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(.w,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(\.w\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-content: unset;
    justify-content: space-between;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(ccs,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(ccs\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
    place-content: center;
    align-items: stretch;
    gap: 1rem;
  }
}
```

**csss:** $flex(ws_,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(ws_\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: space-between stretch;
    align-items: start;
    gap: 1rem;
  }
}
```

**csss:** $flex(..s,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(\.\.s\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: justify;
    text-indent: unset;
    place-content: unset;
    align-items: stretch;
    gap: 1rem;
  }
}
```

**csss:** $flex(a,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(a\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: start;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(.b,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(\.b\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-content: unset;
    justify-content: end;
    align-items: unset;
    gap: 1rem;
  }
}
```

**csss:** $flex(acb,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(acb\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: end;
    text-indent: unset;
    place-content: start center;
    align-items: end;
    gap: 1rem;
  }
}
```

**csss:** $flex(.c_,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(\.c_\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    align-content: unset;
    justify-content: center;
    align-items: start;
    gap: 1rem;
  }
}
```

**csss:** $flex(vvc,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(vvc\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: center;
    text-indent: unset;
    place-content: space-evenly;
    align-items: center;
    gap: 1rem;
  }
}
```

**csss:** $w(300px)
**css:**
```css
@layer containerDefault {
  .\$w\(300px\) {
    inline-size: 300px;
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

**csss:** $flex(wrap,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
```

**csss:** $flex(wrap-reverse,gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$flex\(wrap-reverse\,gap\(1rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-wrap: wrap-reverse;
    gap: 1rem;
  }
}
```

**csss:** $block(g(0.5em,1.5))
**css:**
```css
@layer containerDefault {
  .\$block\(g\(0\.5em\,1\.5\)\) {
    display: block;
    word-spacing: 0.5em;
    line-height: 1.5;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
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

**csss:** $block(a)
**css:**
```css
@layer containerDefault {
  .\$block\(a\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: start;
    text-indent: unset;
  }
}
```

**csss:** $block(c)
**css:**
```css
@layer containerDefault {
  .\$block\(c\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: center;
    text-indent: unset;
  }
}
```

**csss:** $block(b)
**css:**
```css
@layer containerDefault {
  .\$block\(b\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: end;
    text-indent: unset;
  }
}
```

**csss:** $block(s)
**css:**
```css
@layer containerDefault {
  .\$block\(s\) {
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

**csss:** $block(visible)
**css:**
```css
@layer containerDefault {
  .\$block\(visible\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow: visible;
  }
}
```

**csss:** $h(100px)
**css:**
```css
@layer containerDefault {
  .\$h\(100px\) {
    block-size: 100px;
  }
}
```

**csss:** $w(200px)
**css:**
```css
@layer containerDefault {
  .\$w\(200px\) {
    inline-size: 200px;
  }
}
```

**csss:** $block(overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHidden\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow: hidden;
  }
}
```

**csss:** $block(overflowScroll)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowScroll\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow: scroll;
  }
}
```

**csss:** $block(auto)
**css:**
```css
@layer containerDefault {
  .\$block\(auto\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow: auto;
  }
}
```

**csss:** $block(overflowHiddenScrollSnapMandatory,snap-stop)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHiddenScrollSnapMandatory\,snap-stop\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-inline: hidden;
    overflow-block: scroll;
    scroll-snap-type: block mandatory;
    scroll-snap-stop: always;
  }
}
```

**csss:** |$blockItem(snap-end)
**css:**
```css
@layer itemsDefault {
  .\|\$blockItem\(snap-end\) > * {
    scroll-snap-align: end;
  }
}
```

**csss:** |$blockItem(snap-center-start)
**css:**
```css
@layer itemsDefault {
  .\|\$blockItem\(snap-center-start\) > * {
    scroll-snap-align: center start;
  }
}
```

**csss:** $block(overflowScrollSnapHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowScrollSnapHidden\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-inline: scroll;
    overflow-block: hidden;
    scroll-snap-type: inline;
  }
}
```

**csss:** $block(nowrap)
**css:**
```css
@layer containerDefault {
  .\$block\(nowrap\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: nowrap;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(pre)
**css:**
```css
@layer containerDefault {
  .\$block\(pre\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: pre;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(pre-wrap)
**css:**
```css
@layer containerDefault {
  .\$block\(pre-wrap\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: pre-wrap;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(pre-line)
**css:**
```css
@layer containerDefault {
  .\$block\(pre-line\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: pre-line;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(break-spaces)
**css:**
```css
@layer containerDefault {
  .\$block\(break-spaces\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: break-spaces;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $block(break-word)
**css:**
```css
@layer containerDefault {
  .\$block\(break-word\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-wrap: break-word;
  }
}
```

**csss:** $block(break-all)
**css:**
```css
@layer containerDefault {
  .\$block\(break-all\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    word-break: break-all;
  }
}
```

**csss:** $block(keep-all)
**css:**
```css
@layer containerDefault {
  .\$block\(keep-all\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    word-break: keep-all;
  }
}
```

**csss:** $block(break-anywhere)
**css:**
```css
@layer containerDefault {
  .\$block\(break-anywhere\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-wrap: anywhere;
  }
}
```

**csss:** $block(ellipsis,overflowHidden)
**css:**
```css
@layer containerDefault {
  .\$block\(ellipsis\,overflowHidden\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: nowrap;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
```

**csss:** $w(150px)
**css:**
```css
@layer containerDefault {
  .\$w\(150px\) {
    inline-size: 150px;
  }
}
```

**csss:** $block(hyphens)
**css:**
```css
@layer containerDefault {
  .\$block\(hyphens\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: auto;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $w(80px)
**css:**
```css
@layer containerDefault {
  .\$w\(80px\) {
    inline-size: 80px;
  }
}
```

**csss:** $w(300px)
**css:**
```css
@layer containerDefault {
  .\$w\(300px\) {
    inline-size: 300px;
  }
}
```

**csss:** $block(clamp(2))
**css:**
```css
@layer containerDefault {
  .\$block\(clamp\(2\)\) {
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

**csss:** $height(2*1.2em)
**css:**
```css
@layer containerDefault {
  .\$height\(2\*1\.2em\) {
    block-size: calc(2.4em);
  }
}
```

**csss:** $block(clamp(3))
**css:**
```css
@layer containerDefault {
  .\$block\(clamp\(3\)\) {
    display: -webkit-box;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-block: hidden;
  }
}
```

**csss:** $height(3*(1.2em))
**css:**
```css
@layer containerDefault {
  .\$height\(3\*\(1\.2em\)\) {
    block-size: calc(3.6em);
  }
}
```

**csss:** $grid(cols(1fr,1fr,1fr),rows(100px,100px),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(1fr\,1fr\,1fr\)\,rows\(100px\,100px\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100px 100px;
    gap: 1rem;
  }
}
```

**csss:** $block(shy)
**css:**
```css
@layer containerDefault {
  .\$block\(shy\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: manual;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $flex(hyphens)
**css:**
```css
@layer containerDefault {
  .\$flex\(hyphens\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: auto;
    text-align: unset;
    text-indent: unset;
  }
}
```

**csss:** $grid(cols(repeat(3,minmax(100px,1fr))),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(3\,minmax\(100px\,1fr\)\)\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(3, minmax(100px, 1fr));
    gap: 1rem;
  }
}
```

**csss:** $grid(cols(repeat(auto-fill,minmax(100px,1fr))),gap(1rem))
**css:**
```css
@layer containerDefault {
  .\$grid\(cols\(repeat\(auto-fill\,minmax\(100px\,1fr\)\)\)\,gap\(1rem\)\) {
    display: grid;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
}
```

**csss:** |:nth-child(1)$flexItem(grow(1))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$flexItem\(grow\(1\)\)>:where(:nth-child(1)) {
    flex-grow: 1;
  }
}
```

**csss:** |:nth-child(2)$flexItem(grow(2))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$flexItem\(grow\(2\)\)>:where(:nth-child(2)) {
    flex-grow: 2;
  }
}
```

**csss:** |:nth-child(3)$flexItem(shrink(0.5))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$flexItem\(shrink\(0\.5\)\)>:where(:nth-child(3)) {
    flex-shrink: 0.5;
  }
}
```

**csss:** |:nth-child(4)$flexItem(basis(100px))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$flexItem\(basis\(100px\)\)>:where(:nth-child(4)) {
    flex-basis: 100px;
  }
}
```

**csss:** |:nth-child(1)$gridItem(column(1,3))
**css:**
```css
@layer items {
  .\|\:nth-child\(1\)\$gridItem\(column\(1\,3\)\)>:where(:nth-child(1)) {
    grid-column: 1 / 3;
  }
}
```

**csss:** |:nth-child(2)$gridItem(row(4,4))
**css:**
```css
@layer items {
  .\|\:nth-child\(2\)\$gridItem\(row\(4\,4\)\)>:where(:nth-child(2)) {
    grid-row: 4 / 4;
  }
}
```

**csss:** |:nth-child(3)$gridItem(column(1,1))
**css:**
```css
@layer items {
  .\|\:nth-child\(3\)\$gridItem\(column\(1\,1\)\)>:where(:nth-child(3)) {
    grid-column: 1 / 1;
  }
}
```

**csss:** |:nth-child(4)$gridItem(row(1,2),column(2,3))
**css:**
```css
@layer items {
  .\|\:nth-child\(4\)\$gridItem\(row\(1\,2\)\,column\(2\,3\)\)>:where(:nth-child(4)) {
    grid-area: 1 / 2 / 2 / 3;
  }
}
```

**csss:** |$border$padding(0.5rem)
**css:**
```css
@layer itemsDefault {
  .\|\$border\$padding\(0\.5rem\)>* {
    border-style: solid;
    padding: 0.5rem;
  }
}
```

**csss:** $block(overflowHiddenScroll)
**css:**
```css
@layer containerDefault {
  .\$block\(overflowHiddenScroll\) {
    display: block;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    overflow-inline: hidden;
    overflow-block: scroll;
  }
}
```