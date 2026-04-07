**description:**
Sets 1px solid border with radius reset to 0.
**csss:**
$Border(1px,solid)
**css:**
```css
.\$Border\(1px\,solid\) {
  border: 1px solid;
  border-radius: 0;
}
```

**description:**
Sets asymmetric widths, dotted style, dual colors and 4-corner radius.
**csss:**
$Border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))
**css:**
```css
.\$Border\(2px\,4px\,dotted\,\#red\,\#blue\,radius\(0\,5px\,3\%\,1rem\)\) {
  border-block-width: 2px;
  border-inline-width: 4px;
  border-style: dotted;
  border-block-color: red;
  border-inline-color: blue;
  border-start-start-radius: 5px 0;
  border-start-end-radius: 5px 3%;
  border-end-start-radius: 1rem 0;
  border-end-end-radius: 1rem 3%;
}
```

**description:**
Sets 2px solid red border with simple 2-value radius.
**csss:**
$Border(2px,solid,#red,radius(2px,4px))
**css:**
```css
.\$Border\(2px\,solid\,\#red\,radius\(2px\,4px\)\) {
  border: 2px solid red;
  border-start-start-radius: 4px 2px;
  border-start-end-radius: 4px 2px;
  border-end-end-radius: 4px 2px;
  border-end-start-radius: 4px 2px;
}
```

**description:**
Sets border to none with 20px uniform radius.
**csss:**
$Border(radius(20px))
**css:**
```css
.\$Border\(radius\(20px\)\) {
  border: none;
  border-radius: 20px;
}
```

**description:**
Sets asymmetric widths, dotted style, dual colors and 4-corner radius.
**csss:**
$border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))
**css:**
```css
.\$border\(2px\,4px\,dotted\,\#red\,\#blue\,radius\(0\,5px\,3\%\,1rem\)\) {
  border-block-width: 2px;
  border-inline-width: 4px;
  border-style: dotted;
  border-block-color: red;
  border-inline-color: blue;
  border-start-start-radius: 5px 0;
  border-start-end-radius: 5px 3%;
  border-end-start-radius: 1rem 0;
  border-end-end-radius: 1rem 3%;
}
```

**description:**
Sets 2px solid red border with 2-value radius without reset.
**csss:**
$border(2px,solid,#red,radius(2px,4px))
**css:**
```css
.\$border\(2px\,solid\,\#red\,radius\(2px\,4px\)\) {
  border-width: 2px;
  border-style: solid;
  border-color: red;
  border-start-start-radius: 4px 2px;
  border-start-end-radius: 4px 2px;
  border-end-end-radius: 4px 2px;
  border-end-start-radius: 4px 2px;
}
```

**description:**
Sets complex border with split styles, 3 colors and 7-value radius.
**csss:**
$border(2px,dotted,dashed,#red,#blue,#white,radius(0,1px,2px,3px,4px,5px,6px))
**css:**
```css
.\$border\(2px\,dotted\,dashed\,\#red\,\#blue\,\#white\,radius\(0\,1px\,2px\,3px\,4px\,5px\,6px\)\) {
  border-width: 2px;
  border-block-style: dotted;
  border-inline-style: dashed;
  border-block-color: red white;
  border-inline-color: blue;
  border-start-start-radius: 1px 0;
  border-start-end-radius: 5px 2px;
  border-end-start-radius: 3px 4px;
  border-end-end-radius: 3px 6px;
}
```

**description:**
Removes all borders from the element.
**csss:**
$noBorder
**css:**
```css
.\$noBorder {
  border: none;
}
```