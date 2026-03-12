# Position & Layout System

## Relative Positioning

**description:** Sets position to relative without any offset.
**csss:** $relative
**css:**
```css
.\$relative {
  position: relative;
}
```

**description:** Offsets a relative element using logical inline/block start with calc expression.
**csss:** $relative(start,10px+2em,5%)
**css:**
```css
.\$relative\(start\,10px\+2em\,5\%\) {
  position: relative;
  inset-inline-start: calc(10px + 2em);
  inset-block-start: 5%;
}
```

## Absolute Positioning

**description:** Positions element absolutely anchored to top at 40%.
**csss:** $absolute(top,40%)
**css:**
```css
.\$absolute\(top\,40\%\) {
  position: absolute;
  top: 40%;
}
```

**description:** Positions element absolutely at left:0 top:0.
**csss:** $absolute(0,0)
**css:**
```css
.\$absolute\(0\,0\) {
  position: absolute;
  left: 0;
  top: 0;
}
```

## Fixed Positioning

**description:** Fixes element to the bottom-right corner of the viewport.
**csss:** $fixed(rightBottom,0,0)
**css:**
```css
.\$fixed\(rightBottom\,0\,0\) {
  position: fixed;
  right: 0;
  bottom: 0;
}
```

## Z-Index & Stacking

**description:** Sets the stacking order z-index to 10.
**csss:** $zIndex(10)
**css:**
```css
.\$zIndex\(10\) {
  z-index: 10;
}
```

**description:** Absolute positioned element with transform and high z-index.
**csss:** $absolute(50%,50%)$translate(-50%,-50%)$zIndex(100)
**css:**
```css
.\$absolute\(50\%\,50\%\)\$translate\(-50\%\,-50\%\)\$zIndex\(100\) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
```

**description:** Fixed positioning with backdrop effects and layering.
**csss:** $fixed(rightBottom,0,0)$zIndex(50)
**css:**
```css
.\$fixed\(rightBottom\,0\,0\)\$zIndex\(50\) {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 50;
}
```

**description:** Relative with offset calculations and overflow control.
**csss:** $relative(1rem,2rem)$block(overflowHidden)
**css:**
```css
.\$relative\(1rem\,2rem\)\$block\(overflowHidden\) {
  position: relative;
  left: 1rem;
  top: 2rem;
  overflow: hidden;
}
```
