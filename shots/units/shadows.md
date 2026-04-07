**description:**
Adds a subtle box shadow with 2px blur and semi-transparent black.
**csss:**
$boxShadow(0,2px,4px,#rgba(0,0,0,0.1))
**css:**
```css
.\$boxShadow\(0\,2px\,4px\,\#rgba\(0\,0\,0\,0\.1\)\) {
  box-shadow: 0 2px 4px rgba(0 0 0 / 0.1);
}
```

**description:**
Stacks two box shadows with different colors and offsets.
**csss:**
$boxShadow(0,1rem,.25rem,#3f51b5)$boxShadow(0,.5rem,.5rem,#blue)
**css:**
```css
.\$boxShadow\(0\,1rem\,\.25rem\,\#3f51b5\)\$boxShadow\(0\,\.5rem\,\.5rem\,\#blue\) {
  box-shadow: 0 1rem .25rem #3f51b5, 0 .5rem .5rem blue;
}
```

**description:**
Adds an inset box shadow with 4px blur and 60% opacity black.
**csss:**
$boxShadow(inset,0,2px,4px,0,#rgba(0,0,0,0.6))
**css:**
```css
.\$boxShadow\(inset\,0\,2px\,4px\,0\,\#rgba\(0\,0\,0\,0\.6\)\) {
  box-shadow: inset 0 2px 4px 0 rgba(0 0 0 / 0.6);
}
```

**description:**
Creates an ambient glow shadow at default 45° angle.
**csss:**
$boxShadow(ambient,10px,#efa4)
**css:**
```css
.\$boxShadow\(ambient\,10px\,\#efa4\) {
  box-shadow: 7.07px 7.07px 15px 12.5px #eeffaa44;
}
```

**description:**
Creates an ambient glow shadow at 90° angle.
**csss:**
$boxShadow(ambient,10px,90deg,#efa4)
**css:**
```css
.\$boxShadow\(ambient\,10px\,90deg\,\#efa4\) {
  box-shadow: 0px 10px 15px 12.5px #eeffaa44;
}
```

**description:**
Adds a text shadow with 8px blur and semi-transparent black.
**csss:**
$textShadow(0,4px,8px,#rgba(0,0,0,0.3))
**css:**
```css
.\$textShadow\(0\,4px\,8px\,\#rgba\(0\,0\,0\,0\.3\)\) {
  text-shadow: 0 4px 8px rgba(0 0 0 / 0.3);
}
```

**description:**
Adds a sharp 2px text shadow in solid black.
**csss:**
$textShadow(2px,2px,4px,#000000)
**css:**
```css
.\$textShadow\(2px\,2px\,4px\,\#000000\) {
  text-shadow: 2px 2px 4px #000000;
}
```