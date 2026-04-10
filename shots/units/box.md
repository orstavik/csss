**description:**
A horizontal scrolling container with snapping and custom inline sizing constraints, along with items that center-snap and have scroll margins.
**csss:**
 $Box(100px<100%<800px,scroll,snapInlineMandatory,scrollPadding(0,1rem))
|$BoxItem(snapCenter,scrollMargin(0,1rem))
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
**csss:**
 $Box(100%,300px,hiddenScroll,snapBlockMandatory)
|$BoxItem(snapStart,snapAlways)
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
**csss:**
 $Box(_,_<90vh,auto,scrollPadding(2rem))
**css:**
```css
.\$Box\(_\,_\<90vh\,auto\,scrollPadding\(2rem\)\) {
  block-size: 90vh;
  min-block-size: unset;
  max-block-size: unset;
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
**csss:**
 $Flex(row,gap(10px))$Box(100%,autoHidden,snapInline)
|$BoxItem(snapEnd,scrollMargin(0,20px,0,0))
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

.\|\$BoxItem\(snapEnd\,scrollMargin\(0\,20px\,0\,0\)\)>* {
  scroll-snap-align: end;
  scroll-snap-stop: unset;
  scroll-margin-block: 0;
  scroll-margin-inline: 20px 0;
}
```

**description:**
A side navigation bar with fixed block bounds, visible overflow, and auto inline.
**csss:**
 $Box(250px,100vh,visibleAuto)
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
**csss:**
 $Box(200px<80%<1000px,100px<50%<500px,clip)
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
**csss:**
 $Flex(row)$Box(auto,snap)
|$BoxItem(snapStartEnd,snapNormal)
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
**csss:**
 $Box(hiddenScroll,scrollPadding(2rem,0))
|$BoxItem(scrollMargin(1rem,0))
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
**csss:**
 $Box(100%,100%,clip)
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
**csss:**
 $Box(scrollPadding(10px,20px,30px,40px))
**css:**
```css
.\$Box\(scrollPadding\(10px\,20px\,30px\,40px\)\) {
  block-size: unset;
  min-block-size: unset;
  max-block-size: unset;
  inline-size: unset;
  min-inline-size: unset;
  max-inline-size: unset;
  overflow: unset;
  scroll-snap-type: unset;
  scroll-padding-block: 10px 30px;
  scroll-padding-inline: 20px 40px;
}
```

**description:**
An item designed to snap in the center of the block axis and the start of the inline axis, with specific margin constraints.
**csss:**
 $BoxItem(snapCenterStart,scrollMargin(5px,10px,15px,20px))
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
**csss:**
 $BoxItem(snapEndCenter,snapAlways)
**css:**
```css
.\$BoxItem\(snapEndCenter\,snapAlways\) {
  scroll-margin: unset;
  scroll-snap-align: end center;
  scroll-snap-stop: always;
}
```