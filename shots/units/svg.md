**description:**
Sets stroke width, round linecap and miterlimit.
**csss:**
 $stroke(3px,round,miterlimit(4))
**css:**
```css
.\$stroke\(3px\,round\,miterlimit\(4\)\) {
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-miterlimit: 4;
}
```

**description:**
Sets stroke opacity to 0.8.
**csss:**
 $stroke(0.8)
**css:**
```css
.\$stroke\(0\.8\) {
  stroke-opacity: 0.8;
}
```

**description:**
Sets round linecap on stroke.
**csss:**
 $stroke(round)
**css:**
```css
.\$stroke\(round\) {
  stroke-linecap: round;
}
```

**description:**
Sets bevel linejoin on stroke.
**csss:**
 $stroke(bevel)
**css:**
```css
.\$stroke\(bevel\) {
  stroke-linejoin: bevel;
}
```

**description:**
Sets a 5,5 dash pattern on stroke.
**csss:**
 $stroke(dasharray(5,5))
**css:**
```css
.\$stroke\(dasharray\(5\,5\)\) {
  stroke-dasharray: 5, 5;
}
```

**description:**
Sets stroke color, width, opacity, linejoin, linecap and dash pattern.
**csss:**
 $stroke(#deepskyblue,3px,.5,bevel,butt,dasharray(5px,5%))
**css:**
```css
.\$stroke\(\#deepskyblue\,3px\,\.5\,bevel\,butt\,dasharray\(5px\,5\%\)\) {
  stroke: deepskyblue;
  stroke-width: 3px;
  stroke-opacity: 0.5;
  stroke-linecap: butt;
  stroke-linejoin: bevel;
  stroke-dasharray: 5px, 5%;
}
```

**description:**
Resets all stroke properties then sets width, linecap and miterlimit.
**csss:**
 $Stroke(3px,round,miterlimit(4))
**css:**
```css
.\$Stroke\(3px\,round\,miterlimit\(4\)\) {
  stroke: unset;
  stroke-width: 3px;
  stroke-opacity: unset;
  stroke-linecap: round;
  stroke-linejoin: unset;
  stroke-dasharray: unset;
  stroke-dashoffset: unset;
  stroke-miterlimit: 4;
}
```

**description:**
Removes stroke and resets all stroke properties.
**csss:**
 $strokeNone
**css:**
```css
.\$strokeNone {
  stroke: none;
  stroke-width: unset;
  stroke-opacity: unset;
  stroke-linecap: unset;
  stroke-linejoin: unset;
  stroke-dasharray: unset;
  stroke-dashoffset: unset;
  stroke-miterlimit: unset;
}
```

**description:**
Sets fill color, opacity and fill rule.
**csss:**
 $fill(#azure,.5,evenodd)
**css:**
```css
.\$fill\(\#azure\,\.5\,evenodd\) {
  fill: azure;
  fill-opacity: 0.5;
  fill-rule: evenodd;
}
```

**description:**
Sets fill opacity to 0.5.
**csss:**
 $fill(0.5)
**css:**
```css
.\$fill\(0\.5\) {
  fill-opacity: 0.5;
}
```

**description:**
Sets fill color, opacity and rule (uppercase resets all fill props).
**csss:**
 $Fill(#azure,.5,evenodd)
**css:**
```css
.\$Fill\(\#azure\,\.5\,evenodd\) {
  fill: azure;
  fill-opacity: 0.5;
  fill-rule: evenodd;
}
```

**description:**
Removes fill and resets fill properties.
**csss:**
 $fillNone
**css:**
```css
.\$fillNone {
  fill: none;
  fill-opacity: unset;
  fill-rule: unset;
}
```

**description:**
Sets gradient stop color to blue.
**csss:**
 $stopColor(#blue)
**css:**
```css
.\$stopColor\(\#blue\) {
  stop-color: blue;
}
```

**description:**
Sets text-anchor to middle.
**csss:**
 $svgText(middle)
**css:**
```css
.\$svgText\(middle\) {
  text-anchor: middle;
}
```

**description:**
Sets text-anchor, dominant-baseline and alignment-baseline.
**csss:**
 $svgText(start,middle,textAfterEdge)
**css:**
```css
.\$svgText\(start\,middle\,textAfterEdge\) {
  text-anchor: start;
  dominant-baseline: middle;
  alignment-baseline: text-after-edge;
}
```

**description:**
Sets text-anchor, baselines with baseline-shift reset.
**csss:**
 $SvgText(middle,alphabetic,textBeforeEdge)
**css:**
```css
.\$SvgText\(middle\,alphabetic\,textBeforeEdge\) {
  text-anchor: middle;
  dominant-baseline: alphabetic;
  alignment-baseline: text-before-edge;
  baseline-shift: unset;
}
```

**description:**
Sets shape rendering to crisp edges for sharp SVG paths.
**csss:**
 $shapeRendering(crispEdges)
**css:**
```css
.\$shapeRendering\(crispEdges\) {
  shape-rendering: crispEdges;
}
```

**description:**
Applies non-scaling-stroke so stroke width stays constant on zoom.
**csss:**
 $vectorEffect(nonScalingStroke)
**css:**
```css
.\$vectorEffect\(nonScalingStroke\) {
  vector-effect: non-scaling-stroke;
}
```

**description:**
Sets paint order to render stroke before fill.
**csss:**
 $paintOrder(stroke,fill)
**css:**
```css
.\$paintOrder\(stroke\,fill\) {
  paint-order: stroke fill;
}
```