**csss:** $opacity(.95)
**css:**
```css
@layer containerDefault {
  .\$opacity\(\.95\) {
    filter: opacity(.95);
  }
}
```

**csss:** $circle(at(50%,50%),#ff0000,#transparent)
**css:**
```css
@layer containerDefault {
  .\$circle\(at\(50\%\,50\%\)\,\#ff0000\,\#transparent\) {
    background: none;
    background-image: radial-gradient(circle at 50% 50%, #ff0000, transparent);
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

**csss:** $circle(at(20%,30%),#rgba(255,255,255,0.1),#transparent)
**css:**
```css
@layer containerDefault {
  .\$circle\(at\(20\%\,30\%\)\,\#rgba\(255\,255\,255\,0\.1\)\,\#transparent\) {
    background: none;
    background-image: radial-gradient(circle at 20% 30%, #ffffff1a, transparent);
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

**csss:** $textShadow(0,4px,8px,#rgba(0,0,0,0.3))
**css:**
```css
@layer containerDefault {
  .\$textShadow\(0\,4px\,8px\,\#rgba\(0\,0\,0\,0\.3\)\) {
    text-shadow: 0 4px 8px #0000004d;
  }
}
```

**csss:** $textShadow(2px,2px,4px,#000000)
**css:**
```css
@layer containerDefault {
  .\$textShadow\(2px\,2px\,4px\,\#000000\) {
    text-shadow: 2px 2px 4px #000000;
  }
}
```

**csss:** $lineHeight(1.5)
**css:**
```css
@layer containerDefault {
  .\$lineHeight\(1\.5\) {
    line-height: 1.5;
  }
}
```

**csss:** $border(2px,solid,#white,radius(50px))
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,solid\,\#white\,radius\(50px\)\) {
    border: 2px solid white;
    border-radius: 50px;
  }
}
```

**csss:** $border(radius(70px,70px,20px,20px))
**css:**
```css
@layer containerDefault {
  .\$border\(radius\(70px\,70px\,20px\,20px\)\) {
    border: none;
    border-start-start-radius: 70px;
    border-start-end-radius: 70px 20px;
    border-end-start-radius: 20px 70px;
    border-end-end-radius: 20px;
  }
}
```

**csss:** $border(radius(50%))
**css:**
```css
@layer containerDefault {
  .\$border\(radius\(50\%\)\) {
    border: none;
    border-radius: 50%;
  }
}
```

**csss:** $border(12px,solid,#ffaac2)
**css:**
```css
@layer containerDefault {
  .\$border\(12px\,solid\,\#ffaac2\) {
    border: 12px solid #ffaac2;
  }
}
```

**csss:** $border(10px,solid,#d0e8f0,radius(50%))
**css:**
```css
@layer containerDefault {
  .\$border\(10px\,solid\,\#d0e8f0\,radius\(50\%\)\) {
    border: 10px solid #d0e8f0;
    border-radius: 50%;
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

**csss:** $cursor(default)
**css:**
```css
@layer containerDefault {
  .\$cursor\(default\) {
    cursor: default;
  }
}
```

**csss:** $cursor(not-allowed)
**css:**
```css
@layer containerDefault {
  .\$cursor\(not-allowed\) {
    cursor: not-allowed;
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

**csss:** $noTextTransform
**css:**
```css
@layer containerDefault {
  .\$noTextTransform {
    text-transform: none;
  }
}
```

**csss:** $zIndex(10)
**css:**
```css
@layer containerDefault {
  .\$zIndex\(10\) {
    z-index: 10;
  }
}
```

**csss:** $palette(primary,#ff5470,#ffffff)
**css:**
```css
@layer containerDefault {
  .\$palette\(primary\,\#ff5470\,\#ffffff\) {
    --color-primary: #ff5470;
    --color-primaryPop: #ffafb5;
    --color-primaryAccent: #ffa7ae;
    --color-primaryBland: #f4cdce;
    --color-primaryNeutral: #d8d8d8;
    --color-onPrimary: #ffffff;
    --color-onPrimaryPop: #e0ffff;
    --color-onPrimaryAccent: #d2ffff;
    --color-onPrimaryBland: #ffffff;
    --color-onPrimaryNeutral: #ffffff;
  }
}
```