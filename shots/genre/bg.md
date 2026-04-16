**description:** Sets background-color to green and applies a white-to-transparent gradient.
**userInstruction:** Add background styling to the element.
**before:**
```html
…<div …>…</div>…
```
**after:**
```html
…<div class="$Bg(#green)$Bg(linear(#white,#transparent))" …>…</div>…
```
**css:**
```css
.\$Bg\(\#green\)\$Bg\(linear\(\#white\,\#transparent\)\) {
  background-color: green;
  background: none, linear-gradient(white, transparent);
  background-blend-mode: normal;
}
```

**description:** A layered background with two images and a gradient, each with different positions, sizes, and blend modes
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(url('://images.net/pic2.jgp'),center,size(30%),noRepeat,luminosity)$Bg(url('://images.net/pic245.jgp'),left,size(30%),noRepeat,overlay)$Bg(linear((#3f87a6,25%),#ebf8e1,#f69d3c),right,top,size(70%,70%))">…</div>…
```
**css:**
```css
.\$Bg\(url\(\'\:\/\/images\.net\/pic2\.jgp\'\)\,center\,size\(30\%\)\,noRepeat\,luminosity\)\$Bg\(url\(\'\:\/\/images\.net\/pic245\.jgp\'\)\,left\,size\(30\%\)\,noRepeat\,overlay\)\$Bg\(linear\(\(\#3f87a6\,25\%\)\,\#ebf8e1\,\#f69d3c\)\,right\,top\,size\(70\%\,70\%\)\) {
  background: url('://images.net/pic2.jgp') center/30% no-repeat, url('://images.net/pic245.jgp') left/30% no-repeat, linear-gradient(#3f87a6 25%, #ebf8e1, #f69d3c) right top/70% 70%;
  background-blend-mode: luminosity, overlay, normal;
}
```

**description:** Sets positioned background with green color, color-burn blend and local attachment.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(#green,10%,11%,size(10%,20%),local,colorBurn)">…</div>…
```
**css:**
```css
.\$Bg\(\#green\,10\%\,11\%\,size\(10\%\,20\%\)\,local\,colorBurn\) {
  background: linear-gradient(green) 10% 11%/10% 20% local;
  background-blend-mode: color-burn;
}
```

**description:** Applies a 90deg linear gradient from red to green with repeat-x.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(90deg,(#red),#green),repeatX)">…</div>…
```
**css:**
```css
.\$Bg\(linear\(90deg\,\(\#red\)\,\#green\)\,repeatX\) {
  background: linear-gradient(90deg, red, green) repeat-x;
  background-blend-mode: normal;
}
```

**description:** Applies a rightward linear gradient from blue to yellow.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(toRight,#blue,#yellow))">…</div>…
```
**css:**
```css
.\$Bg\(linear\(toRight\,\#blue\,\#yellow\)\) {
  background: linear-gradient(to right, blue, yellow);
  background-blend-mode: normal;
}
```

**description:** Applies a 135deg diagonal gradient from purple to orange.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(135deg,#purple,#orange))">…</div>…
```
**css:**
```css
.\$Bg\(linear\(135deg\,\#purple\,\#orange\)\) {
  background: linear-gradient(135deg, purple, orange);
  background-blend-mode: normal;
}
```

**description:** Applies a diagonal gradient toward bottom-right with 3 color stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(toBottomRight,#cyan,#magenta,#yellow))">…</div>…
```
**css:**
```css
.\$Bg\(linear\(toBottomRight\,\#cyan\,\#magenta\,\#yellow\)\) {
  background: linear-gradient(to bottom right, cyan, magenta, yellow);
  background-blend-mode: normal;
}
```

**description:** Applies a 45deg linear gradient with explicit color stop positions.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(45deg,(#red,0%),(#blue,100%)))">…</div>…
```
**css:**
```css
.\$Bg\(linear\(45deg\,\(\#red\,0\%\)\,\(\#blue\,100\%\)\)\) {
  background: linear-gradient(45deg, red 0%, blue 100%);
  background-blend-mode: normal;
}
```

**description:** Applies a 135deg dark gradient using hex colors.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(linear(135deg,#1a2b3c,#2d3748))">…</div>…
```
**css:**
```css
.\$Bg\(linear\(135deg\,\#1a2b3c\,\#2d3748\)\) {
  background: linear-gradient(135deg, #1a2b3c, #2d3748);
  background-blend-mode: normal;
}
```

**description:** Applies a circular radial gradient from red to blue.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(\#red\,\#blue\)\) {
  background: radial-gradient(red, blue);
  background-blend-mode: normal;
}
```

**description:** Circular gradient from transparent to red to black for vignette effect with 3 color stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(#transparent,#red,#000000))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(\#transparent\,\#red\,\#000000\)\) {
  background: radial-gradient(transparent, red, #000000);
  background-blend-mode: normal;
}
```

**description:** Circle with closest-corner sizing at top-left with colored stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(closestCorner,at(left,top),(#blue,45%),(#pink,90%)))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(closestCorner\,at\(left\,top\)\,\(\#blue\,45\%\)\,\(\#pink\,90\%\)\)\) {
  background: radial-gradient(closest-corner, blue 45%, pink 90%);
  background-blend-mode: normal;
}
```

**description:** Circle positioned at 20em/30% with yellow to green gradient.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(at(20em,30%),#yellow,#green))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(at\(20em\,30\%\)\,\#yellow\,\#green\)\) {
  background: radial-gradient(at 20em 30%, yellow, green);
  background-blend-mode: normal;
}
```

**description:** Circle centered at 50%/50% with red to transparent gradient.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(at(50%,50%),#ff0000,#transparent))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(at\(50\%\,50\%\)\,\#ff0000\,\#transparent\)\) {
  background: radial-gradient(at 50% 50%, #ff0000, transparent);
  background-blend-mode: normal;
}
```

**description:** Circle at 20%/30% with semi-transparent white to transparent.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(at(20%,30%),#rgba(255,255,255,0.1),#transparent))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(at\(20\%\,30\%\)\,\#rgba\(255\,255\,255\,0\.1\)\,\#transparent\)\) {
  background: radial-gradient(at 20% 30%, rgba(255 255 255 / 0.1), transparent);
  background-blend-mode: normal;
}
```

**description:** Applies an ellipse radial gradient with cover sizing.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(cover,ellipse(#green,#purple))">…</div>…
```
**css:**
```css
.\$Bg\(cover\,ellipse\(\#green\,\#purple\)\) {
  background: radial-gradient(ellipse, green, purple) 0% 0%/cover;
  background-blend-mode: normal;
}
```

**description:** Ellipse with explicit 10em/40% radii centered with orange to cyan colors.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(ellipse(10em,40%,at(center),#orange,#cyan))">…</div>…
```
**css:**
```css
.\$Bg\(ellipse\(10em\,40\%\,at\(center\)\,\#orange\,\#cyan\)\) {
  background: radial-gradient(ellipse 10em 40% at center, orange, cyan);
  background-blend-mode: normal;
}
```

**description:** Ellipse with closest-side sizing and positioned color stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(ellipse(closestSide,(#red,20%),#blue))">…</div>…
```
**css:**
```css
.\$Bg\(ellipse\(closestSide\,\(\#red\,20\%\)\,\#blue\)\) {
  background: radial-gradient(ellipse closest-side, red 20%, blue);
  background-blend-mode: normal;
}
```

**description:** Ellipse with 50%/30% radii at 25%/75% with positioned stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(ellipse(50%,30%,at(25%,75%),(#green,30%),(#red,80%)))">…</div>…
```
**css:**
```css
.\$Bg\(ellipse\(50\%\,30\%\,at\(25\%\,75\%\)\,\(\#green\,30\%\)\,\(\#red\,80\%\)\)\) {
  background: radial-gradient(ellipse 50% 30% at 25% 75%, green 30%, red 80%);
  background-blend-mode: normal;
}
```

**description:** Generic radial gradient at top-center with 3 color stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(at(50%,0),#yellow,#blue,#white))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(at\(50\%\,0\)\,\#yellow\,\#blue\,\#white\)\) {
  background: radial-gradient(at 50% 0, yellow, blue, white);
  background-blend-mode: normal;
}
```

**description:** Generic radial gradient centered from blue to green.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(circle(at(center),#blue,#green))">…</div>…
```
**css:**
```css
.\$Bg\(circle\(at\(center\)\,\#blue\,\#green\)\) {
  background: radial-gradient(at center, blue, green);
  background-blend-mode: normal;
}
```

**description:** Ellipse gradient with background-position offset from left/top.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(left,20px,top,10px,ellipse(10em,40%,#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(left\,20px\,top\,10px\,ellipse\(10em\,40\%\,\#red\,\#blue\)\) {
  background: radial-gradient(ellipse 10em 40%, red, blue) left 20px top 10px;
  background-blend-mode: normal;
}
```

**description:** Conic gradient cycling through red, yellow, green, blue.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(#red,#yellow,#green,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(\#red\,\#yellow\,\#green\,\#blue\)\) {
  background: conic-gradient(red, yellow, green, blue);
  background-blend-mode: normal;
}
```

**description:** Conic gradient from 45deg in oklab color space.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(45deg,oklab,#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(45deg\,oklab\,\#red\,\#blue\)\) {
  background: conic-gradient(from 45deg in oklab, red, blue);
  background-blend-mode: normal;
}
```

**description:** Conic gradient centered at 50%/50%.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(at(50%,50%),#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(at\(50\%\,50\%\)\,\#red\,\#blue\)\) {
  background: conic-gradient(at 50% 50%, red, blue);
  background-blend-mode: normal;
}
```

**description:** Conic gradient from 90deg at offset position 30%/80%.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(90deg,at(30%,80%),#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(90deg\,at\(30\%\,80\%\)\,\#red\,\#blue\)\) {
  background: conic-gradient(from 90deg at 30% 80%, red, blue);
  background-blend-mode: normal;
}
```

**description:** Conic gradient from 45deg at left/top.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(45deg,at(left,top),#red,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(45deg\,at\(left\,top\)\,\#red\,\#blue\)\) {
  background: conic-gradient(from 45deg, red, blue);
  background-blend-mode: normal;
}
```

**description:** Conic gradient from 0.2turn at 30%/80% with positioned stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(0.2turn,at(30%,80%),(#yellow,10%,20%),(#pink,50%,95%)))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(0\.2turn\,at\(30\%\,80\%\)\,\(\#yellow\,10\%\,20\%\)\,\(\#pink\,50\%\,95\%\)\)\) {
  background: conic-gradient(from 0.2turn at 30% 80%, yellow 10% 20%, pink 50% 95%);
  background-blend-mode: normal;
}
```

**description:** Conic gradient from 15 radians with 3 colors.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(15rad,#blue,#yellow,#green))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(15rad\,\#blue\,\#yellow\,\#green\)\) {
  background: conic-gradient(from 15rad, blue, yellow, green);
  background-blend-mode: normal;
}
```

**description:** Conic gradient at 30%/80% from purple to blue.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(conic(at(30%,80%),#purple,#blue))">…</div>…
```
**css:**
```css
.\$Bg\(conic\(at\(30\%\,80\%\)\,\#purple\,\#blue\)\) {
  background: conic-gradient(at 30% 80%, purple, blue);
  background-blend-mode: normal;
}
```

**description:** Repeating 45deg linear gradient with positioned stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(repeatingLinear(45deg,(#red,10%),(#blue,20%)))">…</div>…
```
**css:**
```css
.\$Bg\(repeatingLinear\(45deg\,\(\#red\,10\%\)\,\(\#blue\,20\%\)\)\) {
  background: repeating-linear-gradient(45deg, red 10%, blue 20%);
  background-blend-mode: normal;
}
```

**description:** Repeating circular radial gradient with positioned stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(repeatingCircle((#green,5%),(#yellow,15%)))">…</div>…
```
**css:**
```css
.\$Bg\(repeatingCircle\(\(\#green\,5\%\)\,\(\#yellow\,15\%\)\)\) {
  background: repeating-radial-gradient(green 5%, yellow 15%);
  background-blend-mode: normal;
}
```

**description:** Repeating conic gradient with degree-positioned stops.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="$Bg(repeatingConic((#purple,0deg),(#orange,45deg)))">…</div>…
```
**css:**
```css
.\$Bg\(repeatingConic\(\(\#purple\,0deg\)\,\(\#orange\,45deg\)\)\) {
  background: repeating-conic-gradient(purple 0deg, orange 45deg);
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for even children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for odd children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a highlighted background when a card is hovered over.
**userInstruction:** Interactive States: Add a hover background color to indicate interactivity.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|:hover$Bg(#lightcoral)">…</div>…
```
**css:**
```css
.\|\:hover\$Bg\(\#lightcoral\)>:where(:hover) {
  background-color: lightcoral;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Change background of an input field when it receives focus.
**userInstruction:** Accessibility Improvements: Make the focused input more visible.
**before:**
```html
…<input type="text">…
```
**after:**
```html
…<input type="text" class="|:focus$Bg(#yellow)">…
```
**css:**
```css
.\|\:focus\$Bg\(\#yellow\)>:where(:focus) {
  background-color: yellow;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Highlight the active state of a button when clicked.
**userInstruction:** Interactive States: Add active state visual feedback.
**before:**
```html
…<button>Click</button>…
```
**after:**
```html
…<button class="|:active$Bg(#darkred)">Click</button>…
```
**css:**
```css
.\|\:active\$Bg\(\#darkred\)>:where(:active) {
  background-color: darkred;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a special background to the first item in a list for emphasis.
**userInstruction:** Contextual Overrides: Make the first list item stand out.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:first-child$Bg(#gold)">…</li>
  <li class="|:first-child$Bg(#gold)">…</li>
</ul>…
```
**css:**
```css
.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}

.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Display a placeholder striped background when a container is empty.
**userInstruction:** Layout Bug Fixes: Show an empty state pattern.
**before:**
```html
…<div></div>…
```
**after:**
```html
…<div class="|:empty$Bg(repeatingLinear(45deg,#ccc,(#ccc,10px),#eee,(#eee,20px)))"></div>…
```
**css:**
```css
.\|\:empty\$Bg\(repeatingLinear\(45deg\,\#ccc\,\(\#ccc\,10px\)\,\#eee\,\(\#eee\,20px\)\)\)>:where(:empty) {
  background: repeating-linear-gradient(45deg, #cccccc, #cccccc 10px, #eeeeee, #eeeeee 20px);
  background-blend-mode: normal;
}
```

**description:** Grayscale background for a disabled button.
**userInstruction:** Interactive States: Add a muted background for disabled items.
**before:**
```html
…<button disabled>Submit</button>…
```
**after:**
```html
…<button disabled class="|:disabled$Bg(#gray)">Submit</button>…
```
**css:**
```css
.\|\:disabled\$Bg\(\#gray\)>:where(:disabled) {
  background-color: gray;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for even children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for odd children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a highlighted background when a card is hovered over.
**userInstruction:** Interactive States: Add a hover background color to indicate interactivity.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|:hover$Bg(#lightcoral)">…</div>…
```
**css:**
```css
.\|\:hover\$Bg\(\#lightcoral\)>:where(:hover) {
  background-color: lightcoral;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Change background of an input field when it receives focus.
**userInstruction:** Accessibility Improvements: Make the focused input more visible.
**before:**
```html
…<input type="text">…
```
**after:**
```html
…<input type="text" class="|:focus$Bg(#yellow)">…
```
**css:**
```css
.\|\:focus\$Bg\(\#yellow\)>:where(:focus) {
  background-color: yellow;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Highlight the active state of a button when clicked.
**userInstruction:** Interactive States: Add active state visual feedback.
**before:**
```html
…<button>Click</button>…
```
**after:**
```html
…<button class="|:active$Bg(#darkred)">Click</button>…
```
**css:**
```css
.\|\:active\$Bg\(\#darkred\)>:where(:active) {
  background-color: darkred;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a special background to the first item in a list for emphasis.
**userInstruction:** Contextual Overrides: Make the first list item stand out.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:first-child$Bg(#gold)">…</li>
  <li class="|:first-child$Bg(#gold)">…</li>
</ul>…
```
**css:**
```css
.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}

.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Display a placeholder striped background when a container is empty.
**userInstruction:** Layout Bug Fixes: Show an empty state pattern.
**before:**
```html
…<div></div>…
```
**after:**
```html
…<div class="|:empty$Bg(repeatingLinear(45deg,#ccc,(#ccc,10px),#eee,(#eee,20px)))"></div>…
```
**css:**
```css
.\|\:empty\$Bg\(repeatingLinear\(45deg\,\#ccc\,\(\#ccc\,10px\)\,\#eee\,\(\#eee\,20px\)\)\)>:where(:empty) {
  background: repeating-linear-gradient(45deg, #cccccc, #cccccc 10px, #eeeeee, #eeeeee 20px);
  background-blend-mode: normal;
}
```

**description:** Grayscale background for a disabled button.
**userInstruction:** Interactive States: Add a muted background for disabled items.
**before:**
```html
…<button disabled>Submit</button>…
```
**after:**
```html
…<button disabled class="|:disabled$Bg(#gray)">Submit</button>…
```
**css:**
```css
.\|\:disabled\$Bg\(\#gray\)>:where(:disabled) {
  background-color: gray;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for even children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for odd children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a highlighted background when a card is hovered over.
**userInstruction:** Interactive States: Add a hover background color to indicate interactivity.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|:hover$Bg(#lightcoral)">…</div>…
```
**css:**
```css
.\|\:hover\$Bg\(\#lightcoral\)>:where(:hover) {
  background-color: lightcoral;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Change background of an input field when it receives focus.
**userInstruction:** Accessibility Improvements: Make the focused input more visible.
**before:**
```html
…<input type="text">…
```
**after:**
```html
…<input type="text" class="|:focus$Bg(#yellow)">…
```
**css:**
```css
.\|\:focus\$Bg\(\#yellow\)>:where(:focus) {
  background-color: yellow;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Highlight the active state of a button when clicked.
**userInstruction:** Interactive States: Add active state visual feedback.
**before:**
```html
…<button>Click</button>…
```
**after:**
```html
…<button class="|:active$Bg(#darkred)">Click</button>…
```
**css:**
```css
.\|\:active\$Bg\(\#darkred\)>:where(:active) {
  background-color: darkred;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a special background to the first item in a list for emphasis.
**userInstruction:** Contextual Overrides: Make the first list item stand out.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:first-child$Bg(#gold)">…</li>
  <li class="|:first-child$Bg(#gold)">…</li>
</ul>…
```
**css:**
```css
.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}

.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Display a placeholder striped background when a container is empty.
**userInstruction:** Layout Bug Fixes: Show an empty state pattern.
**before:**
```html
…<div></div>…
```
**after:**
```html
…<div class="|:empty$Bg(repeatingLinear(45deg,#ccc,(#ccc,10px),#eee,(#eee,20px)))"></div>…
```
**css:**
```css
.\|\:empty\$Bg\(repeatingLinear\(45deg\,\#ccc\,\(\#ccc\,10px\)\,\#eee\,\(\#eee\,20px\)\)\)>:where(:empty) {
  background: repeating-linear-gradient(45deg, #cccccc, #cccccc 10px, #eeeeee, #eeeeee 20px);
  background-blend-mode: normal;
}
```

**description:** Grayscale background for a disabled button.
**userInstruction:** Interactive States: Add a muted background for disabled items.
**before:**
```html
…<button disabled>Submit</button>…
```
**after:**
```html
…<button disabled class="|:disabled$Bg(#gray)">Submit</button>…
```
**css:**
```css
.\|\:disabled\$Bg\(\#gray\)>:where(:disabled) {
  background-color: gray;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for even children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
  <li class="|:nth-child(even)$Bg(#lightgreen)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(even\)\$Bg\(\#lightgreen\)>:where(:nth-child(even)) {
  background-color: lightgreen;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Stripe a list with an alternating background colors for odd children.
**userInstruction:** Greenfield Addition: Add background styling to the element.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
  <li class="|:nth-child(odd)$Bg(#lightblue)">…</li>
</ul>…
```
**css:**
```css
.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}

.\|\:nth-child\(odd\)\$Bg\(\#lightblue\)>:where(:nth-child(odd)) {
  background-color: lightblue;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a highlighted background when a card is hovered over.
**userInstruction:** Interactive States: Add a hover background color to indicate interactivity.
**before:**
```html
…<div>…</div>…
```
**after:**
```html
…<div class="|:hover$Bg(#lightcoral)">…</div>…
```
**css:**
```css
.\|\:hover\$Bg\(\#lightcoral\)>:where(:hover) {
  background-color: lightcoral;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Change background of an input field when it receives focus.
**userInstruction:** Accessibility Improvements: Make the focused input more visible.
**before:**
```html
…<input type="text">…
```
**after:**
```html
…<input type="text" class="|:focus$Bg(#yellow)">…
```
**css:**
```css
.\|\:focus\$Bg\(\#yellow\)>:where(:focus) {
  background-color: yellow;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Highlight the active state of a button when clicked.
**userInstruction:** Interactive States: Add active state visual feedback.
**before:**
```html
…<button>Click</button>…
```
**after:**
```html
…<button class="|:active$Bg(#darkred)">Click</button>…
```
**css:**
```css
.\|\:active\$Bg\(\#darkred\)>:where(:active) {
  background-color: darkred;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Apply a special background to the first item in a list for emphasis.
**userInstruction:** Contextual Overrides: Make the first list item stand out.
**before:**
```html
…<ul>
  <li>…</li>
  <li>…</li>
</ul>…
```
**after:**
```html
…<ul>
  <li class="|:first-child$Bg(#gold)">…</li>
  <li class="|:first-child$Bg(#gold)">…</li>
</ul>…
```
**css:**
```css
.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}

.\|\:first-child\$Bg\(\#gold\)>:where(:first-child) {
  background-color: gold;
  background: none;
  background-blend-mode: normal;
}
```

**description:** Display a placeholder striped background when a container is empty.
**userInstruction:** Layout Bug Fixes: Show an empty state pattern.
**before:**
```html
…<div></div>…
```
**after:**
```html
…<div class="|:empty$Bg(repeatingLinear(45deg,#ccc,(#ccc,10px),#eee,(#eee,20px)))"></div>…
```
**css:**
```css
.\|\:empty\$Bg\(repeatingLinear\(45deg\,\#ccc\,\(\#ccc\,10px\)\,\#eee\,\(\#eee\,20px\)\)\)>:where(:empty) {
  background: repeating-linear-gradient(45deg, #cccccc, #cccccc 10px, #eeeeee, #eeeeee 20px);
  background-blend-mode: normal;
}
```

**description:** Grayscale background for a disabled button.
**userInstruction:** Interactive States: Add a muted background for disabled items.
**before:**
```html
…<button disabled>Submit</button>…
```
**after:**
```html
…<button disabled class="|:disabled$Bg(#gray)">Submit</button>…
```
**css:**
```css
.\|\:disabled\$Bg\(\#gray\)>:where(:disabled) {
  background-color: gray;
  background: none;
  background-blend-mode: normal;
}
```