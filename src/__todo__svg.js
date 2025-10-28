// 🖌️ Paint & Stroke
// fill	Color/pattern inside shapes
// fill-opacity	Opacity of fill only
// stroke	Color/pattern of outlines
// stroke-width	Outline thickness
// stroke-opacity	Opacity of stroke only
// stroke-linecap	End shape of strokes (butt, round, square)
// stroke-linejoin	Corner shape (miter, round, bevel)
// stroke-miterlimit	Limit for miter joins
// stroke-dasharray	Dash pattern
// stroke-dashoffset	Dash offset
// paint-order	Render order of fill/stroke/markers
// vector-effect	E.g. non-scaling-stroke
// marker-start, marker-mid, marker-end	Arrowheads/markers on paths

// 🧭 Geometry & Coordinate System
// dominant-baseline	Align text vertically relative to baseline
// alignment-baseline	Similar to CSS vertical-align, for SVG
// baseline-shift	Offset text baseline
// shape-rendering	Hint how shapes should be rendered (auto, crispEdges, geometricPrecision)
// text-anchor	Align text horizontally (start, middle, end)
// clip-rule, fill-rule	Winding rule for fills (nonzero, evenodd)
// stop-color, stop-opacity	For gradients (<stop>)
// lighting-color	For filter effects
// color-interpolation, color-rendering, image-rendering	Rendering hints
// mask-type	For masks (luminance vs alpha)

//todo 1. find out which of these properties are essentially selectors for a specific set of words.
//todo 1. make a demo/svg.html that illustrates the most important of these properties visually and in html/svg.
//todo 2. implement those as semantic props in the svg component.
//todo 3. then implement some as simple rules. Don't do all, just the most common first. 

//todo 4. This gives us the first draft. But. We have multiple methods to implement similar shorts in different domains. MO.
//        We need to map which of these MOs, give them names.
//todo 5. Then, we need to reduce the set. We prune the bonsai tree. Remove the MO that is worst first. reduce the set with one. 
//        See if we can reduce it still. We are not to end up with 1 or go from 9 to 3. But maybe from 9 to 6-7?
//todo 6. Then, use 1-2 of these MO to implement the svg properties above.
//todo 7. add svg.md that tests the functions in units/shots.
