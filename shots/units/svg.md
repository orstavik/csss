**description:**
A UI component with stroke width, round linecap and miterlimit.
**csss:**
```csss
$stroke(3px,round,miterlimit(4))
```
**css:**
```css
.\$stroke\(3px\,round\,miterlimit\(4\)\) {
  stroke-width: 3px;
  stroke-linecap: round;
  stroke-miterlimit: 4;
}
```
**description:**
A UI component with stroke opacity to 0.8.
**csss:**
```csss
$stroke(0.8)
```
**css:**
```css
.\$stroke\(0\.8\) {
  stroke-opacity: 0.8;
}
```
**description:**
A UI component with round linecap on stroke.
**csss:**
```csss
$stroke(round)
```
**css:**
```css
.\$stroke\(round\) {
  stroke-linecap: round;
}
```
**description:**
A UI component with bevel linejoin on stroke.
**csss:**
```csss
$stroke(bevel)
```
**css:**
```css
.\$stroke\(bevel\) {
  stroke-linejoin: bevel;
}
```
**description:**
A UI component with a 5,5 dash pattern on stroke.
**csss:**
```csss
$stroke(dasharray(5,5))
```
**css:**
```css
.\$stroke\(dasharray\(5\,5\)\) {
  stroke-dasharray: 5, 5;
}
```
**description:**
A UI component with stroke color, width, opacity, linejoin, linecap and dash pattern.
**csss:**
```csss
$stroke(#deepskyblue,3px,.5,bevel,butt,dasharray(5px,5%))
```
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
An example demonstrating resets all stroke properties then sets width, linecap and miterlimit.
**csss:**
```csss
$Stroke(3px,round,miterlimit(4))
```
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
An example demonstrating removes stroke and resets all stroke properties.
**csss:**
```csss
$strokeNone
```
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
A UI component with fill color, opacity and fill rule.
**csss:**
```csss
$fill(#azure,.5,evenodd)
```
**css:**
```css
.\$fill\(\#azure\,\.5\,evenodd\) {
  fill: azure;
  fill-opacity: 0.5;
  fill-rule: evenodd;
}
```
**description:**
A UI component with fill opacity to 0.5.
**csss:**
```csss
$fill(0.5)
```
**css:**
```css
.\$fill\(0\.5\) {
  fill-opacity: 0.5;
}
```
**description:**
A UI component with fill color, opacity and rule (uppercase resets all fill props).
**csss:**
```csss
$Fill(#azure,.5,evenodd)
```
**css:**
```css
.\$Fill\(\#azure\,\.5\,evenodd\) {
  fill: azure;
  fill-opacity: 0.5;
  fill-rule: evenodd;
}
```
**description:**
An example demonstrating removes fill and resets fill properties.
**csss:**
```csss
$fillNone
```
**css:**
```css
.\$fillNone {
  fill: none;
  fill-opacity: unset;
  fill-rule: unset;
}
```
**description:**
A UI component with gradient stop color to blue.
**csss:**
```csss
$stopColor(#blue)
```
**css:**
```css
.\$stopColor\(\#blue\) {
  stop-color: blue;
}
```
**description:**
A UI component with text-anchor to middle.
**csss:**
```csss
$svgText(middle)
```
**css:**
```css
.\$svgText\(middle\) {
  text-anchor: middle;
}
```
**description:**
A UI component with text-anchor, dominant-baseline and alignment-baseline.
**csss:**
```csss
$svgText(start,middle,textAfterEdge)
```
**css:**
```css
.\$svgText\(start\,middle\,textAfterEdge\) {
  text-anchor: start;
  dominant-baseline: middle;
  alignment-baseline: text-after-edge;
}
```
**description:**
A UI component with text-anchor, baselines with baseline-shift reset.
**csss:**
```csss
$SvgText(middle,alphabetic,textBeforeEdge)
```
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
A UI component with shape rendering to crisp edges for sharp svg paths.
**csss:**
```csss
$shapeRendering(crispEdges)
```
**css:**
```css
.\$shapeRendering\(crispEdges\) {
  shape-rendering: crispEdges;
}
```
**description:**
A layout container with non-scaling-stroke so stroke width stays constant on zoom.
**csss:**
```csss
$vectorEffect(nonScalingStroke)
```
**css:**
```css
.\$vectorEffect\(nonScalingStroke\) {
  vector-effect: non-scaling-stroke;
}
```
**description:**
A UI component with paint order to render stroke before fill.
**csss:**
```csss
$paintOrder(stroke,fill)
```
**css:**
```css
.\$paintOrder\(stroke\,fill\) {
  paint-order: stroke fill;
}
```
