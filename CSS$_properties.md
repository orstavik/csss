# CSSS Properties Reference

This document serves as a comprehensive reference for all implemented properties and syntax patterns in the CSSS engine.

## Core Layout and Formatting Properties

### $block() - Block-level formatting Function

- Sets `display: block` and resets `wordSpacing`, `lineHeight`, `whiteSpace`, `hyphens`, `textAlign`, `textIndent` to `unset`.
- Accepts arguments which are processed by its specific `scope` (defined in `layout.js`):
  - `$block(g(0,1.5rem))` - Calls the `g` function in its scope (defined as `blockGap`) to set word-spacing and line-height.
  - `$block(hidden)` - Calls internal `wrap` utility which processes `hidden` via `overflow()`, setting `overflow: hidden`.
  - `$block(s)` - Processes `s` via internal text alignment map, setting `textAlign: justify`.
  - `$block(hyphens)` - Calls `wrap` -> `hyphens()`, setting `hyphens: auto`.
  - `$block(lineClamp(3))` or `$block(clamp(3))` - Calls the `lineClamp` function in its scope, setting `-webkit-line-clamp: 3`, `-webkit-box-orient: vertical`, `display: -webkit-box`, `overflow-block: hidden`.
  - `$block(preWrap)` - Calls `wrap` -> `whiteSpace()`, setting `white-space: pre-wrap`.
  - `$block(breakWord)` - Calls `wrap` -> `overflowWrap()`, setting `overflow-wrap: break-word`.
  - `$block(breakAll)` - Calls `wrap` -> `wordBreak()`, setting `word-break: break-all`.

### $_block() - Item-level block properties Function

- Applies properties relevant to block items.
- Accepts arguments processed by its scope:
  - `$_block(margin(0,0,1.5rem))` or `$_block(m(...))` - Calls the `margin` function in its scope.
  - `$_block(indent(1em))` - Calls the `textIndent` function in its scope.
  - `$_block(floatStart)` or `$_block(floatEnd)` - Processes the argument via `doFloat()`, setting `float: inline-start` or `float: inline-end`.

### $flex() - Flexbox container Function

- Sets `display: flex` and resets common text properties (like `$block`).
- Accepts arguments processed by its scope or internal logic:
  - `$flex(column)` / `row` / `column-reverse` / `row-reverse` - Sets `flex-direction`.
  - `$flex(wrap)` / `no-wrap` / `wrap-reverse` - Sets `flex-wrap`.
  - `$flex(cc)` / `ab` / etc. - Uses alignment aliases (e.g., `c`='center', `a`='start') to set `align-content`, `justify-content`, and `align-items`.
  - `$flex(gap(1rem))` or `$flex(g(...))` - Calls the `gap` function in its scope.

### $_flex() - Flex item properties Function

- Applies properties relevant to flex items.
- Accepts arguments processed by its scope or internal logic:
  - `$_flex(1grow)` or `$_flex(1g)` - Sets `flex-grow: 1`.
  - `$_flex(2shrink)` or `$_flex(2s)` - Sets `flex-shrink: 2`.
  - `$_flex(basis(200px))` - Calls the `basis` function in its scope.
  - `$_flex(1order)` or `$_flex(1o)` - Sets `order: 1`.
  - `$_flex(ac)` / `sb` / etc. - Uses alignment aliases to set `align-self` and `textAlign`.
  - Also includes margin, padding, etc., via the inherited `_LAYOUT` scope.

### $grid() - Grid container Function

- Sets `display: grid` and resets common text properties (like `$block`).
- Accepts arguments processed by its scope or internal logic:
  - `$grid(cols(1fr,2fr))` - Calls `gridTemplateColumns` function in its scope.
  - `$grid(rows(auto,1fr))` - Calls `gridTemplateRows` function in its scope.
  - `$grid(gap(1rem))` or `$grid(g(...))` - Calls the `gap` function in its scope.
  - `$grid(dense-column)` / `dense-row` - Sets `grid-auto-flow`.
  - `$grid(cc)` / `ab` / etc. - Uses alignment aliases to set `align-content`, `justify-content`, `align-items`, `justify-items`, and `textAlign`.

### $_grid() - Grid item properties Function

- Applies properties relevant to grid items.
- Accepts arguments processed by its scope or internal logic:
  - `$_grid(column(1, 4))` or `$_grid(col(...))` - Calls `column` function in scope to set `grid-column`.
  - `$_grid(row(2, 3))` - Calls `row` function in scope to set `grid-row`.
  - `$_grid(ac)` / `sb` / etc. - Uses alignment aliases to set `align-self`, `justify-self`, and `textAlign`.
  - Also includes margin, padding, etc., via the inherited `_LAYOUT` scope.

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

## Supershorts (`=` Definitions)

Supershorts allow you to define custom shortcuts using the `=` syntax. They are processed by the `extractSuperShorts` parser function and result in new entries being added to the engine's registries.

There are three types of definitions:

1.  **Media Aliases (`@name = @media ...;`)**: Defines a reusable name for a media query condition. The alias name (e.g., `@sm`) can then be used in class definitions (e.g., `@sm$color(red)`).
    ```csss
    @tablet = @(min-width: 768px);
    /* Usage: @tablet$padding(2rem) */
    ```

2.  **Selector Aliases (`:name = :pseudo...;`)**: Defines a reusable name for a selector or pseudo-class.
    ```csss
    :interactive = :hover, :focus;
    /* Usage: :interactive$color(blue) */
    ```

3.  **Dollar Supershorts (`$name = ...;` or `$name(args) = ...;`)**: Defines a new dollar short, creating a function wrapper via `makeSuperShort`.
    *   **Simple Alias (`$cardBase = $border$padding(1rem);`)**: Creates a function named `cardBase`. When `$cardBase` is used in a class, this function executes the original sequence (`$border`, then `$padding(1rem)`) using the main engine functions.
    *   **Parameterized Function (`$rounded(r) = $border(radius(r));`)**: Creates a function named `rounded` that accepts arguments. When `$rounded(8px)` is used, the function substitutes `r` with `8px` and executes `$border(radius(8px))`.

**Important Note:** Due to how definitions are processed, you cannot currently use one `=` defined supershort within the definition of another `=` defined supershort. However, you *can* use the core dollar short functions (like `$border`, `$padding`) within your definitions.

## BuiltinSupers (`BuiltinSupers.js`)

The `BuiltinSupers.js` file provides a set of predefined **simple aliases** using the `=` syntax (e.g., `$bold = $fontWeight(bold);`). These are processed on initialization just like user-defined simple aliases, creating function wrappers.

Using `$bold` in a class will call the wrapper function, which in turn executes the `$fontWeight(bold)` function.

*(Remove or update the list of specific built-ins if it's inaccurate or too verbose)*