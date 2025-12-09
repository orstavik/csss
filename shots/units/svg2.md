**csss:** $noStroke
**css:**
```css
@layer containerDefault {
  .\$noStroke {
    stroke: none;
    stroke-width: unset;
    stroke-opacity: unset;
    stroke-linecap: unset;
    stroke-linejoin: unset;
    stroke-dasharray: unset;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $stroke(3px,round,miterlimit(4))
**css:**
```css
@layer containerDefault {
  .\$stroke\(3px\,round\,miterlimit\(4\)\) {
    stroke: unset;
    stroke-width: 3px;
    stroke-opacity: unset;
    stroke-linecap: round;
    stroke-linejoin: unset;
    stroke-dasharray: unset;
    stroke-dashoffset: unset;
    stroke-miterlimit: 4;
  }
}
```

**csss:** $stroke(#deepskyblue,3px,.5,bevel,butt,dasharray(5px,5%))
**css:**
```css
@layer containerDefault {
  .\$stroke\(\#deepskyblue\,3px\,\.5\,bevel\,butt\,dasharray\(5px\,5\%\)\) {
    stroke: deepskyblue;
    stroke-width: 3px;
    stroke-opacity: .5;
    stroke-linecap: butt;
    stroke-linejoin: bevel;
    stroke-dasharray: 5px, 5%;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $stroke(0.8)
**css:**
```css
@layer containerDefault {
  .\$stroke\(0\.8\) {
    stroke: unset;
    stroke-width: unset;
    stroke-opacity: 0.8;
    stroke-linecap: unset;
    stroke-linejoin: unset;
    stroke-dasharray: unset;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $stopColor(#blue)
**css:**
```css
@layer containerDefault {
  .\$stopColor\(\#blue\) {
    stop-color: blue;
  }
}
```

**csss:** $stroke(round)
**css:**
```css
@layer containerDefault {
  .\$stroke\(round\) {
    stroke: unset;
    stroke-width: unset;
    stroke-opacity: unset;
    stroke-linecap: round;
    stroke-linejoin: unset;
    stroke-dasharray: unset;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $stroke(bevel)
**css:**
```css
@layer containerDefault {
  .\$stroke\(bevel\) {
    stroke: unset;
    stroke-width: unset;
    stroke-opacity: unset;
    stroke-linecap: unset;
    stroke-linejoin: bevel;
    stroke-dasharray: unset;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $stroke(dasharray(5,5))
**css:**
```css
@layer containerDefault {
  .\$stroke\(dasharray\(5\,5\)\) {
    stroke: unset;
    stroke-width: unset;
    stroke-opacity: unset;
    stroke-linecap: unset;
    stroke-linejoin: unset;
    stroke-dasharray: 5, 5;
    stroke-dashoffset: unset;
    stroke-miterlimit: unset;
  }
}
```

**csss:** $fill(#azure,.5,evenodd)
**css:**
```css
@layer containerDefault {
  .\$fill\(\#azure\,\.5\,evenodd\) {
    fill: azure;
    fill-opacity: .5;
    fill-rule: evenodd;
  }
}
```

**csss:** $fill(0.5)
**css:**
```css
@layer containerDefault {
  .\$fill\(0\.5\) {
    fill: unset;
    fill-opacity: 0.5;
    fill-rule: unset;
  }
}
```

**csss:** $noFill
**css:**
```css
@layer containerDefault {
  .\$noFill {
    fill: none;
    fill-opacity: unset;
    fill-rule: unset;
  }
}
```


**csss:** $svgText(middle)
**css:**
```css
@layer containerDefault {
  .\$svgText\(middle\) {
    text-anchor: middle;
    dominant-baseline: unset;
    alignment-baseline: unset;
    baseline-shift: unset;
  }
}
```

**csss:** $svgText(baseline(middle,textAfterEdge))
**css:**
```css
@layer containerDefault {
  .\$svgText\(baseline\(middle\,textAfterEdge\)\) {
    text-anchor: unset;
    dominant-baseline: middle;
    alignment-baseline: text-after-edge;
    baseline-shift: unset;
  }
}
```

**csss:** $shapeRendering(crispEdges)
**css:**
```css
@layer containerDefault {
  .\$shapeRendering\(crispEdges\) {
    shape-rendering: crispEdges;
  }
}
```

**csss:** $vectorEffect(nonScalingStroke)
**css:**
```css
@layer containerDefault {
  .\$vectorEffect\(nonScalingStroke\) {
    vector-effect: non-scaling-stroke;
  }
}
```


**csss:** $paintOrder(stroke,fill)
**css:**
```css
@layer containerDefault {
  .\$paintOrder\(stroke\,fill\) {
    paint-order: stroke fill;
  }
}
```