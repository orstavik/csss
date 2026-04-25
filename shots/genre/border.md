**description:** Sets 1px solid border with radius reset to 0.
**userInstruction:** Add a thin, but visible border to the section element.
**before:**
```html
…<section>…</section>…
```
**after:**
```html
…<section class="$Border(1px,solid)">…</section>…
```
**css:**
```css
.\$Border\(1px\,solid\) {
  border: 1px solid;
  border-radius: 0;
}
```

**description:** Sets asymmetric widths, dotted style, dual colors and 4-corner radius.
**userInstruction:** Fix the border: it should use the $Border umbrella, not separate border properties.
**before:**
```html
…<div class="$border(2px,4px,dotted,#red,#blue) $border(radius(0,5px,3%,1rem))">…</div>…
```
**after:**
```html
…<div class="$Border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))">…</div>…
```
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
  border-image-outset: initial;
  border-image-repeat: initial;
  border-image-slice: initial;
  border-image-source: initial;
  border-image-width: initial;
}
```

**description:** Sets 2px solid red border with simple 2-value radius.
**userInstruction:** The border definition is complete, use the $Border umbrella instead of lowercase $border.
**before:**
```html
…<div class="$border(2px,solid,#red,radius(2px,4px))">…</div>…
```
**after:**
```html
…<div class="$Border(2px,solid,#red,radius(2px,4px))">…</div>…
```
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

**description:** Sets border to none with 20px uniform radius.
**userInstruction:** Remove the border from the button and give it a 20px radius.
**before:**
```html
…<button class="$Border(1px,solid,#ccc)">…</button>…
```
**after:**
```html
…<button class="$Border(radius(20px))">…</button>…
```
**css:**
```css
.\$Border\(radius\(20px\)\) {
  border: none;
  border-radius: 20px;
}
```

**description:** On hover, overrides to asymmetric widths, dotted style, dual colors and 4-corner radius.
**userInstruction:** The hover border should use the $border droplet, not $Border.
**before:**
```html
…<div class="$Border(1px,solid,#333) :hover$Border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))">…</div>…
```
**after:**
```html
…<div class="$Border(1px,solid,#333) :hover$border(2px,4px,dotted,#red,#blue,radius(0,5px,3%,1rem))">…</div>…
```
**css:**
```css
.\$Border\(1px\,solid\,\#333\) {
  border: 1px solid #333333;
  border-radius: 0;
}

.\:hover\$border\(2px\,4px\,dotted\,\#red\,\#blue\,radius\(0\,5px\,3\%\,1rem\)\):where(:hover) {
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

**description:** On focus, overrides to 2px solid red border with 2-value radius without reset.
**userInstruction:** Add a focus state to attract more attention.
**before:**
```html
…<input class="$Border(1px,solid,#ccc,radius(4px))">…
```
**after:**
```html
…<input class="$Border(1px,solid,#ccc,radius(4px)) :focus$border(2px,#red,radius(2px,4px))">…
```
**css:**
```css
.\$Border\(1px\,solid\,\#ccc\,radius\(4px\)\) {
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.\:focus\$border\(2px\,\#red\,radius\(2px\,4px\)\):where(:focus) {
  border-width: 2px;
  border-color: red;
  border-start-start-radius: 4px 2px;
  border-start-end-radius: 4px 2px;
  border-end-end-radius: 4px 2px;
  border-end-start-radius: 4px 2px;
}
```

**description:** When .active, overrides to complex border with split styles, 3 colors and 7-value radius.
**userInstruction:** The active border wrongly uses the $Border umbrella. Change it to a $border droplet.
**before:**
```html
…<div class="$Border(1px,solid,#ddd) .active$Border(2px,dotted,dashed,#red,#blue,#white,radius(0,1px,2px,3px,4px,5px,6px))">…</div>…
```
**after:**
```html
…<div class="$Border(1px,solid,#ddd) .active$border(2px,dotted,dashed,#red,#blue,#white,radius(0,1px,2px,3px,4px,5px,6px))">…</div>…
```
**css:**
```css
.\$Border\(1px\,solid\,\#ddd\) {
  border: 1px solid #dddddd;
  border-radius: 0;
}

.\.active\$border\(2px\,dotted\,dashed\,\#red\,\#blue\,\#white\,radius\(0\,1px\,2px\,3px\,4px\,5px\,6px\)\):where(.active) {
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

**description:** When :disabled, removes all borders from the element.
**userInstruction:** Add a disabled state that removes the border entirely.
**before:**
```html
…<button class="$Border(1px,solid,#999)">…</button>…
```
**after:**
```html
…<button class="$Border(1px,solid,#999) :disabled$noBorder">…</button>…
```
**css:**
```css
.\$Border\(1px\,solid\,\#999\) {
  border: 1px solid #999999;
  border-radius: 0;
}

.\:disabled\$noBorder:where(:disabled) {
  border: none;
}
```

**description:** Inline-start green color for all children elements. The child with important color is overridden to red.
**userInstruction:** Keep the green border for the items under the container, but make sure the important element has a red border instead.
**before:**
```html
…<div class="|$Border(#green,solid,0,4px,0,0)">
  …
  <div class="…">this is more important</div>
  …
</div>…
```
**after:**
```html
…<div class="|$Border(#green,solid,0,4px,0,0)">
  …
  <div class="… $border(#red)">this is more important</div>
  …
</div>…
```
**css:**
```css
.\|\$Border\(\#green\,solid\,0\,4px\,0\,0\)>* {
  border-block-width: 0;
  border-inline-width: 4px 0;
  border-style: solid;
  border-color: green;
  border-radius: 0;
  border-image-outset: initial;
  border-image-repeat: initial;
  border-image-slice: initial;
  border-image-source: initial;
  border-image-width: initial;
}

.\$border\(\#red\) {
  border-color: red;
}
```

**description:** Left border with grey color to mark text as a comment. Left border with a 1/3 font size width.
**userInstruction:** Use border-width 0 instead of none to adjust border visibility.
**before:**
```html
…<div class="|$Border(#darkgrey,1em/3,none,solid,none,none)">…</div>…
```
**after:**
```html
…<div class="|$Border(#darkgrey,solid,0,1em/3,0,0)">…</div>…
```
**css:**
```css
.\|\$Border\(\#darkgrey\,solid\,0\,1em\/3\,0\,0\)>* {
  border-block-width: 0;
  border-inline-width: 0.3333333333333333em 0;
  border-style: solid;
  border-color: darkgrey;
  border-radius: 0;
  border-image-outset: initial;
  border-image-repeat: initial;
  border-image-slice: initial;
  border-image-source: initial;
  border-image-width: initial;
}
```

**description:** Uses clamp to create a responsive border width that scales between 1px and 4px based on viewport width.
**userInstruction:** The card border looks too thin on large screens and too thick on small screens. Use a clamp calculation to make the border width responsive.
**before:**
```html
…<div class="card $Border(2px,solid,#333,radius(8px))">…</div>…
```
**after:**
```html
…<div class="card $Border(clamp(1px,0.3vw,4px),solid,#333,radius(8px))">…</div>…
```
**css:**
```css
.\$Border\(clamp\(1px\,0\.3vw\,4px\)\,solid\,\#333\,radius\(8px\)\) {
  border: clamp(1px, 0.3vw, 4px) solid #333333;
  border-radius: 8px;
}
```