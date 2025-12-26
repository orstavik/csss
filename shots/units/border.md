**csss:** $Border(1px,solid)
**css:**
```css
@layer containerDefault {
  .\$Border\(1px\,solid\) {
    border: 1px solid;
    border-radius: 0;
  }
}
```

**csss:** $Border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))
**css:**
```css
@layer containerDefault {
  .\$Border\(2px\,4px\,dotted\,\#red\,\#blue\,radius\(0\,5px\,3\%\,1rem\)\) {
    border-inline-width: 2px;
    border-block-width: 4px;
    border-style: dotted;
    border-inline-color: red;
    border-block-color: blue;
    border-start-start-radius: 5px 0;
    border-start-end-radius: 5px 3%;
    border-end-start-radius: 1rem 0;
    border-end-end-radius: 1rem 3%;
  }
}
```

**csss:** $border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,4px\,dotted\,\#red\,\#blue\,radius\(0\,5px\,3\%\,1rem\)\) {
    border-inline-width: 2px;
    border-block-width: 4px;
    border-style: dotted;
    border-inline-color: red;
    border-block-color: blue;
    border-start-start-radius: 5px 0;
    border-start-end-radius: 5px 3%;
    border-end-start-radius: 1rem 0;
    border-end-end-radius: 1rem 3%;
  }
}
```

**csss:** $Border(2px,solid,#red,r(2px,4px))
**css:**
```css
@layer containerDefault {
  .\$Border\(2px\,solid\,\#red\,r\(2px\,4px\)\) {
    border: 2px solid red;
    border-start-start-radius: 4px 2px;
    border-start-end-radius: 4px 2px;
    border-end-end-radius: 4px 2px;
    border-end-start-radius: 4px 2px;
  }
}
```

**csss:** $border(2px,solid,#red,r(2px,4px))
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,solid\,\#red\,r\(2px\,4px\)\) {
    border-width: 2px;
    border-style: solid;
    border-color: red;
    border-start-start-radius: 4px 2px;
    border-start-end-radius: 4px 2px;
    border-end-end-radius: 4px 2px;
    border-end-start-radius: 4px 2px;
  }
}
```

**csss:** $border(2px,dotted,dashed,#red,#blue,#white,r(0,1px,2px,3px,4px,5px,6px))
**css:**
```css
@layer containerDefault {
  .\$border\(2px\,dotted\,dashed\,\#red\,\#blue\,\#white\,r\(0\,1px\,2px\,3px\,4px\,5px\,6px\)\) {
    border-width: 2px;
    border-inline-style: dotted;
    border-block-style: dashed;
    border-inline-color: red white;
    border-block-color: blue;
    border-start-start-radius: 1px 0;
    border-start-end-radius: 5px 2px;
    border-end-start-radius: 3px 4px;
    border-end-end-radius: 3px 6px;
  }
}
```

**csss:** $Border(r(20px))
**css:**
```css
@layer containerDefault {
  .\$Border\(r\(20px\)\) {
    border: none;
    border-radius: 20px;
  }
}
```

**csss:** $noBorder
**css:**
```css
@layer containerDefault {
  .\$noBorder {
    border: none;
  }
}
```