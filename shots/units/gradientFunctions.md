**description:** Sets positioned background with green color, color-burn blend and local attachment.
**csss:** $bg(size(10%,20%),10%,11%,#green,local,colorBurn)
**css:**
```css
.\$bg\(size\(10\%\,20\%\)\,10\%\,11\%\,\#green\,local\,colorBurn\) {
  background: none;
  background-image: unset;
  background-position: 10% 11%;
  background-repeat: repeat;
  background-size: 10% 20%;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: color-burn;
  background-attachment: local;
  background-color: green;
}
```

**description:** Applies a 90deg linear gradient from red to green with repeat-x.
**csss:** $bg(repeatX,linear(90deg,(#red),#green))
**css:**
```css
.\$bg\(repeatX\,linear\(90deg\,\(\#red\)\,\#green\)\) {
  background: none;
  background-image: linear-gradient(90deg, red, green);
  background-position: 0% 0%;
  background-repeat: repeat-x;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a rightward linear gradient from blue to yellow.
**csss:** $bg(linear(right,#blue,#yellow))
**css:**
```css
.\$bg\(linear\(right\,\#blue\,\#yellow\)\) {
  background: none;
  background-image: linear-gradient(to right, blue, yellow);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a 135deg diagonal gradient from purple to orange.
**csss:** $bg(linear(135deg,#purple,#orange))
**css:**
```css
.\$bg\(linear\(135deg\,\#purple\,\#orange\)\) {
  background: none;
  background-image: linear-gradient(135deg, purple, orange);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a diagonal gradient toward bottom-right with 3 color stops.
**csss:** $bg(linear(downRight,#cyan,#magenta,#yellow))
**css:**
```css
.\$bg\(linear\(downRight\,\#cyan\,\#magenta\,\#yellow\)\) {
  background: none;
  background-image: linear-gradient(to bottom right, cyan, magenta, yellow);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a 45deg linear gradient with explicit color stop positions.
**csss:** $bg(linear(45deg,(#red,0%),(#blue,100%)))
**css:**
```css
.\$bg\(linear\(45deg\,\(\#red\,0\%\)\,\(\#blue\,100\%\)\)\) {
  background: none;
  background-image: linear-gradient(45deg, red 0%, blue 100%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a 135deg dark gradient using hex colors.
**csss:** $bg(linear(135deg,#1a2b3c,#2d3748))
**css:**
```css
.\$bg\(linear\(135deg\,\#1a2b3c\,\#2d3748\)\) {
  background: none;
  background-image: linear-gradient(135deg, #1a2b3c, #2d3748);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a circular radial gradient from red to blue.
**csss:** $bg(circle(#red,#blue))
**css:**
```css
.\$bg\(circle\(\#red\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(circle, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Applies a circular gradient with 3 color stops.
**csss:** $bg(circle(#yellow,#red,#blue))
**css:**
```css
.\$bg\(circle\(\#yellow\,\#red\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(circle, yellow, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Circular gradient from transparent to black for vignette effect.
**csss:** $bg(circle(#transparent,#000000))
**css:**
```css
.\$bg\(circle\(\#transparent\,\#000000\)\) {
  background: none;
  background-image: radial-gradient(circle, transparent, #000000);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Circular gradient with closest-corner sizing at top-left.
**csss:** $bg(circle(closestCorner,at(left,top),#red,#blue))
**css:**
```css
.\$bg\(circle\(closestCorner\,at\(left\,top\)\,\#red\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(circle closest-corner at left top, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Circle with 10px radius at top-left with colored stops.
**csss:** $bg(circle(10px,at(left,top),(#blue,45%),(#pink,90%)))
**css:**
```css
.\$bg\(circle\(10px\,at\(left\,top\)\,\(\#blue\,45\%\)\,\(\#pink\,90\%\)\)\) {
  background: none;
  background-image: radial-gradient(circle 10px at left top, blue 45%, pink 90%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Circle positioned at 20em/30% with yellow to green gradient.
**csss:** $bg(circle(at(20em,30%),#yellow,#green))
**css:**
```css
.\$bg\(circle\(at\(20em\,30\%\)\,\#yellow\,\#green\)\) {
  background: none;
  background-image: radial-gradient(circle at 20em 30%, yellow, green);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Circle centered at 50%/50% with red to transparent gradient.
**csss:** $bg(circle(at(50%,50%),#ff0000,#transparent))
**css:**
```css
.\$bg\(circle\(at\(50\%\,50\%\)\,\#ff0000\,\#transparent\)\) {
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
```

**description:** Circle at 20%/30% with semi-transparent white to transparent.
**csss:** $bg(circle(at(20%,30%),#rgba(255,255,255,0.1),#transparent))
**css:**
```css
.\$bg\(circle\(at\(20\%\,30\%\)\,\#rgba\(255\,255\,255\,0\.1\)\,\#transparent\)\) {
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
```

**description:** Applies an ellipse radial gradient with cover sizing.
**csss:** $bg(cover,ellipse(#green,#purple))
**css:**
```css
.\$bg\(cover\,ellipse\(\#green\,\#purple\)\) {
  background: none;
  background-image: radial-gradient(green, purple);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: cover;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Ellipse gradient centered with orange to cyan colors.
**csss:** $bg(ellipse(at(center),#orange,#cyan))
**css:**
```css
.\$bg\(ellipse\(at\(center\)\,\#orange\,\#cyan\)\) {
  background: none;
  background-image: radial-gradient(at center, orange, cyan);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Ellipse with explicit 10em/40% radii centered.
**csss:** $bg(ellipse(10em,40%,at(center),#red,#blue))
**css:**
```css
.\$bg\(ellipse\(10em\,40\%\,at\(center\)\,\#red\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(10em 40% at center, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Ellipse with closest-side sizing and positioned color stops.
**csss:** $bg(ellipse(closestSide,(#red,20%),#blue))
**css:**
```css
.\$bg\(ellipse\(closestSide\,\(\#red\,20\%\)\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(closest-side, red 20%, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Ellipse with 50%/30% radii at 25%/75% with positioned stops.
**csss:** $bg(ellipse(50%,30%,at(25%,75%),(#green,30%),(#red,80%)))
**css:**
```css
.\$bg\(ellipse\(50\%\,30\%\,at\(25\%\,75\%\)\,\(\#green\,30\%\)\,\(\#red\,80\%\)\)\) {
  background: none;
  background-image: radial-gradient(50% 30% at 25% 75%, green 30%, red 80%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Generic radial gradient at top-center with 3 color stops.
**csss:** $bg(radial(at(50%,0),#yellow,#blue,#white))
**css:**
```css
.\$bg\(radial\(at\(50\%\,0\)\,\#yellow\,\#blue\,\#white\)\) {
  background: none;
  background-image: radial-gradient(at 50% 0, yellow, blue, white);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Generic radial gradient centered from blue to green.
**csss:** $bg(radial(at(center),#blue,#green))
**css:**
```css
.\$bg\(radial\(at\(center\)\,\#blue\,\#green\)\) {
  background: none;
  background-image: radial-gradient(at center, blue, green);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Ellipse gradient with background-position offset from left/top.
**csss:** $bg(left,top,20px,10px,ellipse(10em,40%,#red,#blue))
**css:**
```css
.\$bg\(left\,top\,20px\,10px\,ellipse\(10em\,40\%\,\#red\,\#blue\)\) {
  background: none;
  background-image: radial-gradient(10em 40%, red, blue);
  background-position: left 20px top 10px;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient cycling through red, yellow, green, blue.
**csss:** $bg(conic(#red,#yellow,#green,#blue))
**css:**
```css
.\$bg\(conic\(\#red\,\#yellow\,\#green\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(red, yellow, green, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient from 45deg in oklab color space.
**csss:** $bg(conic(45deg,oklab,#red,#blue))
**css:**
```css
.\$bg\(conic\(45deg\,oklab\,\#red\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(from 45deg in oklab, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient centered at 50%/50%.
**csss:** $bg(conic(at(50%,50%),#red,#blue))
**css:**
```css
.\$bg\(conic\(at\(50\%\,50\%\)\,\#red\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(at 50% 50%, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient from 90deg at offset position 30%/80%.
**csss:** $bg(conic(90deg,at(30%,80%),#red,#blue))
**css:**
```css
.\$bg\(conic\(90deg\,at\(30\%\,80\%\)\,\#red\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(from 90deg at 30% 80%, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient from 45deg at left/top.
**csss:** $bg(conic(45deg,at(left,top),#red,#blue))
**css:**
```css
.\$bg\(conic\(45deg\,at\(left\,top\)\,\#red\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(from 45deg at left top, red, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient from 0.2turn at 30%/80% with positioned stops.
**csss:** $bg(conic(0.2turn,at(30%,80%),(#yellow,10%,20%),(#pink,50%,95%)))
**css:**
```css
.\$bg\(conic\(0\.2turn\,at\(30\%\,80\%\)\,\(\#yellow\,10\%\,20\%\)\,\(\#pink\,50\%\,95\%\)\)\) {
  background: none;
  background-image: conic-gradient(from 0.2turn at 30% 80%, yellow 10% 20%, pink 50% 95%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient from 15 radians with 3 colors.
**csss:** $bg(conic(15rad,#blue,#yellow,#green))
**css:**
```css
.\$bg\(conic\(15rad\,\#blue\,\#yellow\,\#green\)\) {
  background: none;
  background-image: conic-gradient(from 15rad, blue, yellow, green);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Conic gradient at 30%/80% from purple to blue.
**csss:** $bg(conic(at(30%,80%),#purple,#blue))
**css:**
```css
.\$bg\(conic\(at\(30\%\,80\%\)\,\#purple\,\#blue\)\) {
  background: none;
  background-image: conic-gradient(at 30% 80%, purple, blue);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Repeating 45deg linear gradient with positioned stops.
**csss:** $bg(repeatingLinear(45deg,(#red,10%),(#blue,20%)))
**css:**
```css
.\$bg\(repeatingLinear\(45deg\,\(\#red\,10\%\)\,\(\#blue\,20\%\)\)\) {
  background: none;
  background-image: repeating-linear-gradient(45deg, red 10%, blue 20%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Repeating circular radial gradient with positioned stops.
**csss:** $bg(repeatingCircle((#green,5%),(#yellow,15%)))
**css:**
```css
.\$bg\(repeatingCircle\(\(\#green\,5\%\)\,\(\#yellow\,15\%\)\)\) {
  background: none;
  background-image: repeating-radial-gradient(circle, green 5%, yellow 15%);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```

**description:** Repeating conic gradient with degree-positioned stops.
**csss:** $bg(repeatingConic((#purple,0deg),(#orange,45deg)))
**css:**
```css
.\$bg\(repeatingConic\(\(\#purple\,0deg\)\,\(\#orange\,45deg\)\)\) {
  background: none;
  background-image: repeating-conic-gradient(purple 0deg, orange 45deg);
  background-position: 0% 0%;
  background-repeat: repeat;
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-blend-mode: normal;
  background-attachment: scroll;
}
```
