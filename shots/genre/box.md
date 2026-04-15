**description:**
A horizontal scrolling container with snapping and custom inline sizing constraints, along with items that center-snap and have scroll margins.
**userInstruction:** The horizontal list currently scrolls freely and allows content to stretch infinitely. Constrain its width between 100px and 800px, and implement mandatory inline scroll snapping so items lock into the center.
**before:**
```html
…<div class="$Box(100%,scroll)">
  <div>…</div>
  <div>…</div>
</div>…
```
**after:**
```html
…<div class="
  $Box(100px<100%<800px,scroll,snapInlineMandatory,scrollPadding(0,1rem))
  |$BoxItem(snapCenter,scrollMargin(0,1rem))">
  <div>…</div>
  <div>…</div>
</div>…
```
**css:**
```css
.\$Box\(100px\<100\%\<800px\,scroll\,snapInlineMandatory\,scrollPadding\(0\,1rem\)\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: 100px;
  max-inline-size: 800px;
  overflow: scroll;
  scroll-snap-type: inline mandatory;
  scroll-padding-block: 0;
  scroll-padding-inline: 1rem;
}

.\|\$BoxItem\(snapCenter\,scrollMargin\(0\,1rem\)\)>* {
  scroll-snap-align: center;
  scroll-snap-stop: unset;
  scroll-margin-block: 0;
  scroll-margin-inline: 1rem;
}
```

**description:**
A fixed-size vertical scrolling block container with hidden overflow on the inline axis and mandatory block snapping. Items align to start and stop always.
**userInstruction:** Users are scrolling past items too quickly in the vertical feed. Enforce mandatory block snapping so the scroll always stops at the start of an item.
**before:**
```html
…<div class="$Box(100%,300px,hiddenScroll)">
  …
  <div>…</div>
  …
</div>…
```
**after:**
```html
…<div class="
  $Box(100%,300px,hiddenScroll,snapBlockMandatory)
  |$BoxItem(snapStart,snapAlways)">
  …
  <div>…</div>
  …
</div>…
```
**css:**
```css
.\$Box\(100\%\,300px\,hiddenScroll\,snapBlockMandatory\) {
  block-size: 300px;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: hidden scroll;
  scroll-padding: unset;
  scroll-snap-type: block mandatory;
}

.\|\$BoxItem\(snapStart\,snapAlways\)>* {
  scroll-margin: unset;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}
```

**description:**
A standard modal layout using a Box with auto overflow, max block constraints to ensure it scrolls if content is too long, and scroll paddings to ensure content isn't flush with the viewport.
**userInstruction:** The modal is overflowing the screen vertically on small devices. Limit its maximum block size to 90vh and allow it to scroll automatically, adding some scroll padding so content isn't flush with the edges.
**before:**
```html
…<dialog class="$Box(visible)">
  <div class="content">…</div>
</dialog>…
```
**after:**
```html
…<dialog class="$Box(_,_<_<90vh,auto,scrollPadding(2rem))">
  <div class="content">…</div>
</dialog>…
```
**css:**
```css
.\$Box\(_\,_\<_\<90vh\,auto\,scrollPadding\(2rem\)\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: 90vh;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-padding: 2rem;
  scroll-snap-type: unset;
}
```

**description:**
A gallery container where elements scroll automatically on the inline axis, snapping at the end of each item with scroll margin inline ends.
**userInstruction:** The flex gallery doesn't have scroll snapping, making it hard to align images. Add inline snapping to the container, and make the children snap to their end edge with a 20px inline margin.
**before:**
```html
…<div class="$Flex(row,gap(10px))$Box(100%,autoHidden)">
  <img src="…" />
  <img src="…" />
</div>…
```
**after:**
```html
…<div class="
  $Flex(row,gap(10px))$Box(100%,autoHidden,snapInline)
  |img$BoxItem(snapEnd,scrollMargin(0,20px,0,0))">
  <img src="…" />
  <img src="…" />
</div>…
```
**css:**
```css
.\$Flex\(row\,gap\(10px\)\)\$Box\(100\%\,autoHidden\,snapInline\) {
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: unset;
  gap: 10px;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto hidden;
  scroll-padding: unset;
  scroll-snap-type: inline;
}

.\|img\$BoxItem\(snapEnd\,scrollMargin\(0\,20px\,0\,0\)\)>:where(img) {
  scroll-snap-align: end;
  scroll-snap-stop: unset;
  scroll-margin-block: 0;
  scroll-margin-inline: 20px 0;
}
```

**description:**
A side navigation bar with fixed block bounds, visible overflow, and auto inline.
**userInstruction:** The sidebar is taking up the full height but cuts off long content vertically. Make the block overflow visible and the inline overflow auto, while keeping the 250px inline size and 100vh block size.
**before:**
```html
…<aside class="$Box(250px,100vh,hidden)">
  <nav>…</nav>
</aside>…
```
**after:**
```html
…<aside class="$Box(250px,100vh,visibleAuto)">
  <nav>…</nav>
</aside>…
```
**css:**
```css
.\$Box\(250px\,100vh\,visibleAuto\) {
  block-size: 100vh;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 250px;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: visible auto;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:**
A box utilizing both block and inline sizing with minimums and maximums, testing the complex sizing function, along with clip overflow.
**userInstruction:** This generic box stretches too much on large screens and shrinks too much on mobile. Constrain its inline size to 80% (between 200px and 1000px) and its block size to 50% (between 100px and 500px), while keeping the overflow clipped.
**before:**
```html
…<div class="$Box(80%,50%,clip)">
  …
</div>…
```
**after:**
```html
…<div class="$Box(200px<80%<1000px,100px<50%<500px,clip)">
  …
</div>…
```
**css:**
```css
.\$Box\(200px\<80\%\<1000px\,100px\<50\%\<500px\,clip\) {
  block-size: 50%;
  min-block-size: 100px;
  max-block-size: 500px;
  inline-size: 80%;
  min-inline-size: 200px;
  max-inline-size: 1000px;
  overflow: clip;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:**
A carousel layout where the items stop normally and align at the start and end using $Flex and $BoxItem.
**userInstruction:** The flex carousel has snap enabled on the container, but the items don't know where to snap. Add a BoxItem rule to make the children align at the start and end, with normal snapping behavior.
**before:**
```html
…<div class="$Flex(row)$Box(auto,snap)">
  <div class="slide">…</div>
  <div class="slide">…</div>
</div>…
```
**after:**
```html
…<div class="
  $Flex(row)$Box(auto,snap)
  |$BoxItem(snapStartEnd,snapNormal)">
  <div class="slide">…</div>
  <div class="slide">…</div>
</div>…
```
**css:**
```css
.\$Flex\(row\)\$Box\(auto\,snap\) {
  display: flex;
  padding: unset;
  align-items: unset;
  place-content: unset;
  flex-direction: row;
  flex-wrap: unset;
  gap: unset;
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-padding: unset;
  scroll-snap-type: both;
}

.\|\$BoxItem\(snapStartEnd\,snapNormal\)>* {
  scroll-margin: unset;
  scroll-snap-align: start end;
  scroll-snap-stop: normal;
}
```

**description:**
A vertical content feed where the Box container masks overflow outside of the block, padding the scroll area at the top and bottom.
**userInstruction:** The vertical feed's first and last items touch the very edges of the scrollable area. Add 2rem of block scroll padding to the container, and give the children 1rem of block scroll margin so they don't sit flush against the scroll boundaries.
**before:**
```html
…<div class="$Box(hiddenScroll)">
  <article>…</article>
  <article>…</article>
</div>…
```
**after:**
```html
…<div class="
  $Box(hiddenScroll,scrollPadding(2rem,0))
  |$BoxItem(scrollMargin(1rem,0))">
  <article>…</article>
  <article>…</article>
</div>…
```
**css:**
```css
.\$Box\(hiddenScroll\,scrollPadding\(2rem\,0\)\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: hidden scroll;
  scroll-snap-type: unset;
  scroll-padding-block: 2rem;
  scroll-padding-inline: 0;
}

.\|\$BoxItem\(scrollMargin\(1rem\,0\)\)>* {
  scroll-snap-align: unset;
  scroll-snap-stop: unset;
  scroll-margin-block: 1rem;
  scroll-margin-inline: 0;
}
```

**description:**
A full-screen container with block and inline 100%, clipping all overflow, meant to serve as an application root.
**userInstruction:** The root app container uses 100vh for height, which causes issues on mobile browsers with dynamic toolbars. Change both block and inline sizes to 100% and ensure all overflow is clipped so child views handle their own scrolling.
**before:**
```html
…<main class="$Box(100vw,100vh)">
  <div class="app-view">…</div>
</main>…
```
**after:**
```html
…<main class="$Box(100%,100%,clip)">
  <div class="app-view">…</div>
</main>…
```
**css:**
```css
.\$Box\(100\%\,100\%\,clip\) {
  block-size: 100%;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: 100%;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: clip;
  scroll-padding: unset;
  scroll-snap-type: unset;
}
```

**description:**
Testing all box sizing defaults alongside explicit scrollPadding on all four sides.
**userInstruction:** The scroll area is flush with its boundaries. Add explicit 4-value scroll padding (10px top, 20px right, 30px bottom, 40px left) to ensure scrollable content has breathing room inside the box.
**before:**
```html
…<div class="$Box(auto)">
  …
</div>…
```
**after:**
```html
…<div class="$Box(auto,scrollPadding(10px,20px,30px,40px))">
  …
</div>…
```
**css:**
```css
.\$Box\(auto\,scrollPadding\(10px\,20px\,30px\,40px\)\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: auto;
  scroll-snap-type: unset;
  scroll-padding-block: 10px 30px;
  scroll-padding-inline: 20px 40px;
}
```

**description:**
An item designed to snap in the center of the block axis and the start of the inline axis, with specific margin constraints.
**userInstruction:** This item is currently snapping to the start on both axes. Change it to snap to the center on the block axis and start on the inline axis, and apply explicit 4-value scroll margins.
**before:**
```html
…<div class="$BoxItem(snapStart)">
  …
</div>…
```
**after:**
```html
…<div class="$BoxItem(snapCenterStart,scrollMargin(5px,10px,15px,20px))">
  …
</div>…
```
**css:**
```css
.\$BoxItem\(snapCenterStart\,scrollMargin\(5px\,10px\,15px\,20px\)\) {
  scroll-snap-align: center start;
  scroll-snap-stop: unset;
  scroll-margin-block: 5px 15px;
  scroll-margin-inline: 10px 20px;
}
```

**description:**
A highly constrained box item enforcing a stop always behavior with snapping end center.
**userInstruction:** Users are skipping over this crucial item when scrolling fast. Force the scroll to always stop here by adding snapAlways, and change the alignment to snap to the end on the block axis and center on the inline axis.
**before:**
```html
…<div class="$BoxItem(snapEnd)">
  …
</div>…
```
**after:**
```html
…<div class="$BoxItem(snapEndCenter,snapAlways)">
  …
</div>…
```
**css:**
```css
.\$BoxItem\(snapEndCenter\,snapAlways\) {
  scroll-margin: unset;
  scroll-snap-align: end center;
  scroll-snap-stop: always;
}
```