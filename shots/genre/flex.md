**description:** A vertical Flex settings panel with shared item basis.
**userInstruction:** The settings panel needs to be a column layout with gaps, and all child settings items should share a 100px flex basis.
**before:**
```html
…<div class="settings $Flex">
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(column,gap(0.5rem),padding(1rem))
  |$FlexItem(100px)">
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Flex\(column\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: column;
  flex-wrap: unset;
  gap: 0.5rem;
}

.\|\$FlexItem\(100px\)>* {
  margin: unset;
  flex: 100px;
  align-self: unset;
  order: unset;
}
```

**description:** A reversed Flex action bar with mixed growth.
**userInstruction:**
The action bar is currently left-to-right. Reverse the row direction and make the second button grow twice as fast as the first button.
**before:**
```html
…<div class="$Flex(row,gap(0.5rem),padding(1rem))">
  <button>…</button>
  <button>…</button>
</div>…
```
**after:**
```html
…<div class="
  $Flex(rowReverse,gap(0.5rem),padding(1rem))
  |:nth-child(1)$flexItem(1)
  |:nth-child(2)$flexItem(2)">
  <button>…</button>
  <button>…</button>
</div>…
```
**css:**
```css
.\$Flex\(rowReverse\,gap\(0\.5rem\)\,padding\(1rem\)\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row-reverse;
  flex-wrap: unset;
  gap: 0.5rem;
}

.\|\:nth-child\(1\)\$flexItem\(1\)>:where(:nth-child(1)) {
  flex: 1;
}

.\|\:nth-child\(2\)\$flexItem\(2\)>:where(:nth-child(2)) {
  flex: 2;
}
```

**description:** A wrapping Flex card grid with fixed tile sizing.
**userInstruction:**
The flex cards aren't wrapping to the next line when the screen is too small, and they need fixed width/height (150px/120px).
**before:**
```html
…<div class="$Flex(gap(1rem,2rem))">
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(wrap,gap(1rem,2rem))
  |$FlexItem(margin(5px,1rem))$Box(150px,120px)$BoxItem(scrollMargin(10px))">
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Flex\(wrap\,gap\(1rem\,2rem\)\) {
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem 2rem;
}

.\|\$FlexItem\(margin\(5px\,1rem\)\)\$Box\(150px\,120px\)\$BoxItem\(scrollMargin\(10px\)\)>* {
  flex: unset;
  align-self: unset;
  order: unset;
  margin-block: 5px;
  margin-inline: 1rem;
  block-size: 120px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 150px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  scroll-margin: 10px;
  scroll-snap-align: unset;
  scroll-snap-stop: unset;
}
```

**description:** A wrapping Flex toolbar where key actions are reordered and aligned differently once the row starts to fill up.
**userInstruction:**
The visual order of the toolbar items needs to be rearranged. Set a default order of 3 for all items, but move .two to the front (order 1) and .three to the middle (order 2), adjusting their individual alignments as well.
**before:**
```html
…<div class="$Flex(start,gap(1rem),padding(1rem),wrap)">
  <button class="one">…</button>
  <button class="two">…</button>
  <button class="three">…</button>
</div>…
```
**after:**
```html
…<div class="
  $Flex(start,gap(1rem),padding(1rem),wrap)
  |$FlexItem(order(3),start,margin(1rem))
  |.two$flexItem(order(1),center)
  |.three$flexItem(order(2),end)">
  <button class="one">…</button>
  <button class="two">…</button>
  <button class="three">…</button>
</div>…
```
**css:**
```css
.\$Flex\(start\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: start;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\$FlexItem\(order\(3\)\,start\,margin\(1rem\)\)>* {
  margin: 1rem;
  flex: unset;
  align-self: start;
  order: 3;
}

.\|\.two\$flexItem\(order\(1\)\,center\)>:where(.two) {
  order: 1;
  align-self: center;
}

.\|\.three\$flexItem\(order\(2\)\,end\)>:where(.three) {
  order: 2;
  align-self: end;
}
```

**description:** A centered Flex row with a stretched featured item.
**userInstruction:** The items are centered, but the featured item should stretch vertically to fill the height of the row.
**before:**
```html
…<div class="$Flex(center,gap(1rem),padding(1rem),wrap)">
  <div>…</div>
  <div class="featured">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(center,gap(1rem),padding(1rem),wrap)
  |.featured$FlexItem(stretch)">
  <div>…</div>
  <div class="featured">…</div>
</div>…
```
**css:**
```css
.\$Flex\(center\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: center;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\.featured\$FlexItem\(stretch\)>:where(.featured) {
  margin: unset;
  flex: unset;
  align-self: stretch;
  order: unset;
}
```

**description:** A scrollable Flex control strip with mixed item sizing.
**userInstruction:**
The control strip is overflowing its container. Add a scroll box to it, and adjust the flex-grow and flex-shrink properties of the children so they respond correctly when space is tight.
**before:**
```html
…<div class="$Flex(gap(1rem),padding(1rem))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(gap(1rem),padding(1rem))$box(scroll)
  |:nth-child(1)$flexItem(1)
  |:nth-child(2)$flexItem(center)
  |:nth-child(3)$flexItem(1,0.5)">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Flex\(gap\(1rem\)\,padding\(1rem\)\)\$box\(scroll\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: unset;
  gap: 1rem;
  overflow: scroll;
}

.\|\:nth-child\(1\)\$flexItem\(1\)>:where(:nth-child(1)) {
  flex: 1;
}

.\|\:nth-child\(2\)\$flexItem\(center\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(1\,0\.5\)>:where(:nth-child(3)) {
  flex: 1 0.5;
}
```

**description:**
A Flex comparison row with a flexible lead item, supporting items aligned independently, and a note moved later in the visual order.
**userInstruction:**
The row needs more complex alignment. The first item should grow with a 200px basis, the middle items should align to center and end, and the note item should be pushed to the very end of the flex order.
**before:**
```html
…<div class="$Flex(row,gap(1rem),padding(1rem),wrap)">
  <div>…</div>
  <div>…</div>
  <div>…</div>
  <div class="note">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(row,gap(1rem),padding(1rem),wrap)
  |:nth-child(1)$flexItem(1,200px)
  |:nth-child(2)$flexItem(center)
  |:nth-child(3)$flexItem(end)
  |.note$flexItem(order(4),margin(1rem))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
  <div class="note">…</div>
</div>…
```
**css:**
```css
.\$Flex\(row\,gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\:nth-child\(1\)\$flexItem\(1\,200px\)>:where(:nth-child(1)) {
  flex: 1 200px;
}

.\|\:nth-child\(2\)\$flexItem\(center\)>:where(:nth-child(2)) {
  align-self: center;
}

.\|\:nth-child\(3\)\$flexItem\(end\)>:where(:nth-child(3)) {
  align-self: end;
}

.\|\.note\$flexItem\(order\(4\)\,margin\(1rem\)\)>:where(.note) {
  order: 4;
  margin: 1rem;
}
```

**description:** A Flex inheritance example with parent item defaults and targeted child overrides.
**userInstruction:**
Apply a default flex grow of 1 and basis of 180px to all items. Then, make the .wide element grow twice as fast with a 280px basis, and pin the pinned element to the end.
**before:**
```html
…<div class="$Flex(gap(1rem),padding(1rem),wrap)">
  <div>…</div>
  <div class="wide">…</div>
  <div class="pin">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(gap(1rem),padding(1rem),wrap)
  |$FlexItem(1,180px,margin(0.5rem))
  |.wide$flexItem(2,280px)
  |.pin$flexItem(order(5),end)">
  <div>…</div>
  <div class="wide">…</div>
  <div class="pin">…</div>
</div>…
```
**css:**
```css
.\$Flex\(gap\(1rem\)\,padding\(1rem\)\,wrap\) {
  display: flex;
  padding: 1rem;
  align-items: unset;
  place-content: unset;
  flex-direction: unset;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\$FlexItem\(1\,180px\,margin\(0\.5rem\)\)>* {
  margin: 0.5rem;
  flex: 1 180px;
  align-self: unset;
  order: unset;
}

.\|\.wide\$flexItem\(2\,280px\)>:where(.wide) {
  flex: 2 280px;
}

.\|\.pin\$flexItem\(order\(5\)\,end\)>:where(.pin) {
  order: 5;
  align-self: end;
}
```

**description:** Applies uniform 1rem margin on all flex children.
**userInstruction:** Change the wildcard |*$ to just the generic child selector |$ to apply margins to flex items.
**before:**
```html
…<div class="|*$flexItem(margin(1rem))">
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="|$flexItem(margin(1rem))">
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\|\$flexItem\(margin\(1rem\)\)>* {
  margin: 1rem;
}
```

**description:** Applies 2rem bottom margin on .a flex child.
**userInstruction:** Add a 2rem bottom margin specifically to the child with class .a.
**before:**
```html
…<div class="|$flexItem(margin(1rem))">
  <div class="a">…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  |$flexItem(margin(1rem)) 
  |.a$flexItem(margin(0,0,2rem))">
  <div class="a">…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\|\$flexItem\(margin\(1rem\)\)>* {
  margin: 1rem;
}

.\|\.a\$flexItem\(margin\(0\,0\,2rem\)\)>:where(.a) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```


**description:**
A horizontal photo album gallery using Flex layout, where child albums grow to fill available space, and grandchild photos are strictly constrained to 100x100px squares.
**userInstruction:**
The albums are stacking vertically and the photos are rendering at their native unpredictable sizes. Set the container to a flex row with a background, ensure child albums flex properly, and force grandchild photos into strict 100x100px boxes with neutral backgrounds.
**before:**
```html
…<div class="$Box(100%,auto)">
  <div class="album">
    <img class="photo" src="…" />
    <img class="photo" src="…" />
  </div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Box(100%,auto)$Flex(row)$Bg(#dark)
  |.album$FlexItem(1)
  ||.photo$Box(100px,100px)$Bg(#neutral)">
  <div class="album">
    <img class="photo" src="…" />
    <img class="photo" src="…" />
  </div>
  …
</div>…
```
**css:**
```css
.\$Box\(100\%\,auto\)\$Flex\(row\)\$Bg\(\#dark\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-padding: unset;
  scroll-snap-type: unset;
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: unset;
  gap: unset;
  background-color: var(--color-dark);
  background: none;
  background-blend-mode: normal;
}

.\|\.album\$FlexItem\(1\)>:where(.album) {
  margin: unset;
  flex: 1;
  align-self: unset;
  order: unset;
}

.\|\|\.photo\$Box\(100px\,100px\)\$Bg\(\#neutral\)>*>:where(.photo) {
  block-size: 100px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-padding: unset;
  scroll-snap-type: unset;
  background-color: var(--color-neutral);
  background: none;
  background-blend-mode: normal;
}
```


**description:** A Flex card layout with a clamp-based responsive flex-basis for smooth scaling.
**userInstruction:** The cards use a fixed 250px basis which doesn't scale well. Use clamp so each card scales between 200px and 350px based on the viewport.
**before:**
```html
…<div class="
  $Flex(row,wrap,gap(1rem))
  |*$FlexItem(0,1,250px)">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(row,wrap,gap(1rem))
  |*$FlexItem(0,1,clamp(200px,30vw,350px))">
  <div>…</div>
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Flex\(row\,wrap\,gap\(1rem\)\) {
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}

.\|\*\$FlexItem\(0\,1\,clamp\(200px\,30vw\,350px\)\)>* {
  margin: unset;
  flex: 0 1 clamp(200px, 30vw, 350px);
  align-self: unset;
  order: unset;
}
```
