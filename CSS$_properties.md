# CSSS Properties Reference

This document serves as a comprehensive reference for all implemented properties and syntax patterns in the CSSS engine.

## Core Layout and Formatting Properties

### $block() - Block-level formatting

- `$block(g(0,1.5rem))` - Sets word-spacing and line-height
- `$block(hidden)` - Sets overflow: hidden
- `$block(s)` - Sets text-align: justify (s = justify)
- `$block(hyphens)` - Sets hyphens: auto
- `$block(lineClamp(3))` - Clamps text to 3 lines
- `$block(preWrap)` - Sets whiteSpace
- `$block(breakWord)` - Sets overflowWrap
- `$block(breakAll)` - Sets wordBreak

### $_block() - Item-level block properties

- `$_block(margin(0,0,1.5rem))` - Sets margin logical properties
- `$_block(indent(1em))` - Sets text indent: 1em
- `$_block(floatStart)` - Sets float: inline-start

### $flex() - Flexbox container

- `$flex(column)` - Sets flex-direction (column, column-reverse, row-reverse, row)
- `$flex(wrap)` - Sets flex-wrap (wrap, wrap-reverse, no-wrap)
- `$flex(cc)` - Sets align/justify content (center, center)
- `$flex(gap(1rem))` - Sets flex gap

### $_flex() - Flex item properties

- `$_flex(1grow)` - Sets flex-grow: 1
- `$_flex(2shrink)` - Sets flex-shrink: 2
- `$_flex(basis(200px))` - Sets flex-basis
- `$_flex(1order)` - Sets order

### $grid() - Grid container

- `$grid(cols(1fr,2fr))` - Sets grid-template-columns
- `$grid(rows(auto,1fr))` - Sets grid-template-rows
- `$grid(gap(1rem))` - Sets grid gap
- `$grid(dense-column)` - Sets grid-auto-flow

### $_grid() - Grid item properties

- Extends item properties for grid context

## Spacing Properties

### $padding() / $p() - Padding

- `$padding(1rem)` - All sides
- `$padding(1rem,2rem)` - Block and inline
- `$padding(0,1rem,0)` - Top, sides, bottom
- `$padding(0,1rem,0,2rem)` - Top, right, bottom, left (block-start, inline-start, block-end, inline-end)

### $margin() / $m() - Margin

- Same pattern as padding

### $gap() / $g() - Gap (in grid/flex contexts)

- `$gap(1rem)` - Equal gap
- `$gap(1rem,2rem)` - Column-gap and row-gap

## Color System Functions

### `$palette()`

Sets up a color system with primary, secondary, tertiary, and neutral colors. Creates CSS custom properties for:

- Color roles (primary, secondary, tertiary, neutral)
- Reliefs (bw, text, box, flip, darkflip)
- Mode (blend and pop)

Example:

```css
$palette(#ec1221) /* Creates a palette with #ec1221 as primary color */
$palette(#ec1221, darkorange) /* Creates a palette with #ec1221 as primary and darkorange as secondary */
$palette(#ec1221, darkorange, lightblue) /* Adds tertiary color */
$palette(#ec1221, darkorange, lightblue, gray) /* Adds neutral color */
```

When parameters are omitted, they're automatically derived from the primary color:

- Secondary color: `oklch(from ${primary} 50 c calc(h - 60))` (60° hue shift)
- Tertiary color: `oklch(from ${primary} 50 c calc(h + 60))` (60° hue shift)
- Neutral color: `oklch(from ${primary} 50 0.02 h)` (low chroma version)

### Reliefs

Reliefs define foreground/background color pairings with different contrast levels:

| Relief   | Description      | Light Mode (fg/bg) | Dark Mode (fg/bg) |
| -------- | ---------------- | ------------------ | ----------------- |
| bw       | Black/White      | 0% / 100%          | 100% / 0%         |
| text     | Text optimal     | 23% / 99%          | 99% / 23%         |
| box      | Box optimal      | 23% / 92%          | 92% / 23%         |
| flip     | Flipped contrast | 99% / 66%          | 66% / 99%         |
| darkflip | Extreme contrast | 90% / 33%          | 33% / 90%         |

The percentages represent the lightness value in the OKLCH color space, preserving color hue.

### Dark Mode Support

A special dark mode palette is available with `$palette-dark()` with reversed lightness values for reliefs.

### `$color()`

The `$color()` function is highly versatile and takes multiple parameters in different forms:

```css
$color(foreground, background, border)
```

Parameters can be:

- Named colors (red, blue, etc.)
- Hex values (#00ff00)
- RGBA values (rgba(128,0,128,0.5))
- CSS variables (--primary, --secondary, etc.)
- Relief names (text, bw, box, flip, darkflip)
- Integer values (1-9) for border strength
- Object modifiers (pop, blend)

#### Color Modes

Two special color modes are available:

1. `pop(color)` - Amplifies the color's chroma: `oklch(from ${color} l calc(c * 2) h)`
2. `blend(color)` - Uses the primary color's chroma: `oklch(from ${color} l var(--primary-chroma) h)`

Example usage:

```css
$color(primary) /* Foreground: primary color, Background: derived from primary */
$color(primary, secondary) /* Foreground: primary, Background: secondary */
$color(primary, secondary, tertiary) /* Adds tertiary as border color */
$color(primary, text) /* Uses 'text' relief for contrast */
$color(primary, text, 4) /* Adds border strength 4 (medium) */
$color(pop(--secondary)) /* Amplifies secondary color's chroma */
$color(blend(blue)) /* Blue with primary color's chroma */
```

#### Extended Color Properties

The `$color` function provides scoped properties:

- `caret(color)` - Sets caret-color
- `accent(color)` - Sets accent-color
- `emphasis(color)` - Sets text-emphasis-color
- `decoration(color)` - Sets text-decoration-color
- `column(color)` - Sets column-rule-color
- `outline(color)` - Sets outline-color
- `border(color)` - Sets all border colors
- `shadow(box, text, drop)` - Sets shadow colors

Example:

```css
$color(primary, secondary, border(tertiary))
$color(primary, secondary, shadow(black, gray))
```

### Modern Color Spaces

CSSS supports all modern CSS color spaces:

- OKLCH: `oklch(lightness chroma hue)`
- LAB: `lab(lightness a b)`
- LCH: `lch(lightness chroma hue)`
- HWB: `hwb(hue whiteness blackness)`
- RGB/RGBA: `rgb(red green blue)` / `rgba(red green blue alpha)`
- HSL/HSLA: `hsl(hue saturation lightness)` / `hsla(hue saturation lightness alpha)`

Color transformations:

- `color-mix(in space, color1, color2, percentage)`
- Relative color syntax: `oklch(from color l c h)`
- Color calculations: `calc(h + 30)`

### `$bg()`

Sets background properties. Currently supports:

- Basic background color setting
- Gradient backgrounds:
  - `linear-gradient`
  - `radial-gradient`
  - `conic-gradient`
  - `repeating-linear-gradient`
  - `repeating-radial-gradient`
  - `repeating-conic-gradient`
  - Shorthand aliases: `linear`, `radial`, `conic`, `repeating-linear`, `repeating-radial`, `repeating-conic`

Example:

```css
$bg(red) /* Sets backgroundColor: red */
$bg(linear-gradient(to right, red, blue)) /* Sets gradient background */
```

Note: The following background properties are planned for future implementation:

- `backgroundImage`
- `backgroundSize`
- `backgroundPosition`
- `backgroundRepeat`
- `backgroundAttachment`
- `backgroundClip`
- `backgroundOrigin`

## Typography Properties

### $font() - Font properties

- `$font(1.2rem)` - Font size
- `$font(bold)` - Font weight
- `$font(serif)` - Font family
- `$font(1.2rem,bold,serif)` - Combined properties

### Text decoration and transformation

- `$textDecoration(underline,wavy,2px)` - Text decoration
- `$textTransform(uppercase)` - Text transformation

## Border Properties

### $border() - Border properties

- `$border(solid)` - Border style
- `$border(2px)` - Border width
- `$border(solid,2px)` - Style and width
- `$border(radius(8px))` or `$border(r(8px))` - Border radius

## Dimensional Properties

### $w() - Width (inline-size)

- `$w(100%)` - Width
- `$w(min-content,50%,max-content)` - Min, normal, max widths

### $h() - Height (block-size)

- `$h(100%)` - Height
- `$h(min-content,50%,max-content)` - Min, normal, max heights

### Transform Functions ($translateX, $scale, etc.)

Applies CSS transforms using specific function shorts. The generic `$transform()` short is **not** available. Use the individual function shorts instead:

- `$translateX(10px)` - Translates horizontally.
- `$translateY(-50%)` - Translates vertically.
- `$scale(1.5)` - Scales the element.
- `$rotate(45deg)` - Rotates the element.
- `$skewX(10deg)` - Skews horizontally.
- (Other transform functions like `translate`, `scaleX`, `rotateZ`, etc., follow the same pattern)

### Position controls

- Position syntax with coordinates (not fully implemented)

### Native CSS Functions

- `$calc()`, `$min()`, `$max()`, etc.

### Text Alignment Shortcuts

- `a` - start
- `b` - end
- `c` - center
- `s` - justify

### Alignment Properties (Flex/Grid)

- `a` - start
- `b` - end
- `c` - center
- `s` - stretch
- `u` - space-around
- `v` - space-evenly
- `w` - space-between
- `_` - baseline
- `.` - unset

## State Selectors and Pseudo-Classes

CSSS supports state selectors using the colon prefix before the dollar short:

### Hover State

- `:hover$color(red)` - Applies color red on hover
- `:hover$border(solid,2px)` - Applies a solid 2px border on hover

### Focus State

- `:focus$color(blue)` - Applies color blue on focus
- `:focus$border(solid,2px)` - Applies a solid 2px border on focus

### Other State Selectors

- Standard CSS pseudo-classes (`:active`, `:visited`, `:checked`, etc.) can be used with the same pattern
- `:first` - Alias for `:first-child`
- `:last` - Alias for `:last-child`
- `:edge` - Alias for `:first-child,:last-child`

### Media Queries

- `@dark:hover$color(white)` - Applies white color on hover in dark mode
- `@sm:hover$color(red)` - Applies red color on hover on small screens
- Complex combinations: `@print,@screen:hover$border(solid,2px)` - Multiple media queries with hover

### Multiple States/Selectors

You can combine multiple state selectors by chaining pipe syntax:

- `:hover$color(red)|:focus$color(blue)` - Red on hover, blue on focus
- `:hover$color(red)|.active$color(green)` - Red on hover, green for active class

## Custom Aliases/Shorthands (from BuiltinSupers.js)

### Font Properties

- `$bold` → `$fontWeight(bold)`
- `$italic` → `$fontStyle(italic)`
- `$oblique` → `$fontStyle(oblique)`
- `$smallCaps` → `$fontVariant(smallCaps)`
- `$allSmallCaps` → `$fontVariant(allSmallCaps)`
- `$petiteCaps` → `$fontVariant(petiteCaps)`
- `$allPetiteCaps` → `$fontVariant(allPetiteCaps)`
- `$unicase` → `$fontVariant(unicase)`
- `$titlingCaps` → `$fontVariant(titlingCaps)`
- `$capitalize` → `$textTransform(capitalize)`
- `$uppercase` → `$textTransform(uppercase)`
- `$lowercase` → `$textTransform(lowercase)`
- `$mathAuto` → `$textTransform(mathAuto)`
- `$underline` → `$textDecoration(underline)`
- `$overline` → `$textDecoration(overline)`
- `$lineThrough` → `$textDecoration(lineThrough)`

### Font Stretch Properties

- `$ultraCondensed` → `$fontStretch(ultraCondensed)`
- `$extraCondensed` → `$fontStretch(extraCondensed)`
- `$condensed` → `$fontStretch(condensed)`
- `$semiCondensed` → `$fontStretch(semiCondensed)`
- `$semiExpanded` → `$fontStretch(semiExpanded)`
- `$expanded` → `$fontStretch(expanded)`
- `$extraExpanded` → `