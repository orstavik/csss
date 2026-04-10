**csss:**
```csss
$palette(primary,#ec1221,white)
```
**css:**
```css
@layer containerDefault {
  .\$palette\(primary\,\#ec1221\,white\) { 
    --color-primary: #ec1221; 
    --color-primary-pop: oklch(0.597, 0.067, 27); 
    --color-primary-accent: oklch(0.597, 0.093, 27); 
    --color-primary-bland: oklch(0.597, 0.119, 27); 
    --color-primary1: white; 
    --color-primary-pop1: oklch(0.597, 0.067, 27); 
    --color-primary-accent1: oklch(0.597, 0.093, 27); 
    --color-primary-bland1: oklch(0.597, 0.119, 27); 
  }
}
```

**csss:**
```csss
$color(#primary)
```
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\) {
    color: var(--color-primary);
  }
}
```

**csss:**
```csss
$border(solid,2px)
```
**css:**
```css
@layer containerDefault {
  .\$border\(solid\,2px\) {
    border-style: solid;
    border-width: 2px;
  }
}
```

**csss:**
```csss
$color(#primary#a20)
```
**css:**
```css
@layer containerDefault {
  .\$color\(\#primary\#a20\) {
    color: color-mix(in oklab, var(--color-primary), transparent 80%);
  }
}
```

**csss:**
```csss
$h(300px)
```
**css:**
```css
@layer containerDefault {
  .\$h\(300px\) {
    block-size: 300px;
  }
}
```

**csss:**
```csss
$w(600px)
```
**css:**
```css
@layer containerDefault {
  .\$w\(600px\) {
    inline-size: 600px;
  }
}
```

**csss:**
```csss
$border(r(10px,30px,60px))
```
**css:**
```css
@layer containerDefault {
  .\$border\(r\(10px\,30px\,60px\)\) {
    border-style: solid;
    border-start-start-radius: 10px;
    border-end-end-radius: 60px;
    border-start-end-radius: 30px;
    border-end-start-radius: 30px;
  }
}
```

**csss:**
```csss
|*$border(double,2px,radius(0.25rem))
```
**css:**
```css
@layer items {
  .\|\*\$border\(double\,2px\,radius\(0\.25rem\)\) > * {
    border-style: double;
    border-width: 2px;
    border-radius: 0.25rem;
  }
}
```

**csss:**
```csss
|.new$border(solid,4px,radius(1rem))
```
**css:**
```css
@layer items {
  .\|\.new\$border\(solid\,4px\,radius\(1rem\)\)>:where(.new) {
    border-style: solid;
    border-width: 4px;
    border-radius: 1rem;
  }
}
```

**csss:**
```csss
|.sale$border(dashed,3px,radius(0.5rem))
```
**css:**
```css
@layer items {
  .\|\.sale\$border\(dashed\,3px\,radius\(0\.5rem\)\)>:where(.sale) {
    border-style: dashed;
    border-width: 3px;
    border-radius: 0.5rem;
  }
}
```

**csss:**
```csss
$border(0,radius(1rem))
```
**css:**
```css
@layer containerDefault {
  .\$border\(0\,radius\(1rem\)\) {
    border-style: solid;
    border-width: 0px;
    border-radius: 1rem;
  }
}
```

**csss:**
```csss
$border(w(0,1px,2px,),s(.,.,solid,dashed))
```
**css:**
```css
@layer containerDefault {
  .\$border\(w\(0\,1px\,2px\,\)\,s\(\.\,\.\,solid\,dashed\)\) {
    border-style: solid;
    border-block-width: 0px 2px;
    border-inline-start-width: 1px;
    border-block-start-style: unset;
    border-inline-start-style: unset;
    border-block-end-style: solid;
    border-inline-end-style: dashed;
  }
}
```

**csss:**
```csss
$border(thin)
```
**css:**
```css
@layer containerDefault {
  .\$border\(thin\) {
    border-style: solid;
    border-width: thin;
  }
}
```

**csss:**
```csss
$palette(primary,blue,green)
```
**css:**
```css
@layer containerDefault {
  .\$palette\(primary\,blue\,green\) { 
    --color-primary: blue; 
    --color-primary-pop: oklch(0.452, 0.250, 264); 
    --color-primary-accent: oklch(0.452, 0.224, 264); 
    --color-primary-bland: oklch(0.452, 0.157, 264); 
    --color-primary1: green; 
    --color-primary-pop1: oklch(0.452, 0.250, 264); 
    --color-primary-accent1: oklch(0.452, 0.224, 264); 
    --color-primary-bland1: oklch(0.452, 0.157, 264); 
  }
}
```

**csss:**
```csss
$bg(#primary#90)
```
**css:**
```css
@layer containerDefault {
  .\$bg\(\#primary\#90\) {
    background-image: linear-gradient(color-mix(in oklab, var(--color-primary), var(--color-primary1) 90%));
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

**csss:**
```csss
$palette(primary,blue,yellow)
```
**css:**
```css
 @layer containerDefault {
  .\$palette\(primary\,blue\,yellow\) { 
    --color-primary: blue; 
    --color-primary-pop: oklch(0.452, 0.250, 264); 
    --color-primary-accent: oklch(0.452, 0.224, 264); 
    --color-primary-bland: oklch(0.452, 0.157, 264); 
    --color-primary1: yellow; 
    --color-primary-pop1: oklch(0.452, 0.250, 264); 
    --color-primary-accent1: oklch(0.452, 0.224, 264); 
    --color-primary-bland1: oklch(0.452, 0.157, 264); 
  }
}
```

**csss:**
```csss
$color(rgb(0,12,255,0.6))
```
**css:**
```css
@layer containerDefault {
  .\$color\(rgb\(0\,12\,255\,0\.6\)\) {
    color: rgba(0, 12, 255, 0.6);
  }
}
```

**csss:**
```csss
$w(min-content)
```
**css:**
```css
@layer containerDefault {
  .\$w\(min-content\) {
    inline-size: min-content;
  }
}
```

**csss:**
```csss
$w(min-content,2px,max-content)
```
**css:**
```css
@layer containerDefault {
  .\$w\(min-content\,2px\,max-content\) {
    min-inline-size: min-content;
    inline-size: 2px;
    max-inline-size: max-content;
  }
}
```

**csss:**
```csss
$w(1px,2px,)
```
**css:**
```css
@layer containerDefault {
  .\$w\(1px\,2px\,\) {
    min-inline-size: 1px;
    inline-size: 2px;
  }
}
```

**csss:**
```csss
$h(,2px,)
```
**css:**
```css
@layer containerDefault {
  .\$h\(\,2px\,\) {
    block-size: 2px;
  }
}
```

**csss:**
```csss
$flex(rowReverse,padding(1%,,3%),gap(,3rem))
```
**css:**
```css
@layer containerDefault {
  .\$flex\(rowReverse\,padding\(1\%\,\,3\%\)\,gap\(\,3rem\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    flex-direction: row-reverse;
    padding-block: 1% 3%;
    row-gap: 3rem;
  }
}
```

**csss:**
```csss
$flex(gap(4px),padding(22px,33px,44px))
```
**css:**
```css
@layer containerDefault {
  .\$flex\(gap\(4px\)\,padding\(22px\,33px\,44px\)\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    gap: 4px;
    padding-block: 22px 44px;
    padding-inline: 33px;
  }
}
```
**csss:**
```csss
|$flexItem(margin(,0.1px,,20%))
```
**css:**
```css
@layer itemsDefault {
  .\|\$flexItem\(margin\(\,0\.1px\,\,20\%\)\)>* {
    margin-inline: 0.1px 20%;
  }
}
```

**csss:**
```csss
$flex(cc)
```
**css:**
```css
@layer containerDefault {
  .\$flex\(cc\) {
    display: flex;
    word-spacing: unset;
    line-height: unset;
    white-space: unset;
    hyphens: unset;
    text-align: unset;
    text-indent: unset;
    place-content: center;
    align-items: unset;
  }
}
```
**csss:**
```csss
|*$flexItem(margin(10px))
```
**css:**
```css
@layer items {
  .\|\*\$flexItem\(margin\(10px\)\)>* {
    margin: 10px;
  }
}
```
