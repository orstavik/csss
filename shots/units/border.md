**csss:** $border(1px,solid)
**css:**
```css
@layer containerDefault {
  .\$border\(1px\,solid\) {
    border: 1px solid;
  }
}
```

**csss:** $border(2px,4px,dotted,red,blue,radius(0,5px,3%,1rem))
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,4px\,dotted\,red\,blue\,radius\(0\,5px\,3\%\,1rem\)\) {
    border: 2px 4px solid red blue;
    border-radius: 0 5px 3% 1rem;
  }
}
```

**csss:** $border(2px,solid,red)
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,solid\,red\) {
    border-width: 2px;
    border-style: solid;
    border-color: red;
  }
}
```