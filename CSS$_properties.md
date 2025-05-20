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
- Example using `|` syntax (preferred): `class="$block(...)|*$margin(0)"` (Applies margin to first child).

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
- Example using `|` syntax (preferred): `class="$flex(...)|.item$grow(1)$shrink(0)"`.
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
- Example using `|` syntax (preferred): `class="$grid(...)|*$column(1,4)"`.
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

### `$gradient()` - Color Scheme Generation

Generates a series of related colors as CSS custom properties based on a primary color and an "on" color (typically a light or dark contrasting color).

- **Syntax**: `$gradient(role, color, onColor, steps?)`
  - `role`: A name for this color set (e.g., `primary`, `accent`, `neutral`). This becomes part of the CSS variable name.
  - `color`: The base color for the role (e.g., `red`, `'''#ff0000'''`, `oklch(0.5 0.2 25)`).
  - `onColor`: The color to mix with the base color (e.g., `white`, `black`).
  - `steps?`: Optional. The number of mixture steps to generate (defaults to 10, creating 10%, 20%...100% mixes).

- **Output**: Creates CSS custom properties on the element where `$gradient` is applied.
  - `--color_ROLE`: The original base `color`. (e.g., `--color_primary`)
  - `--color_ROLE{percentage}`: Colors mixed from `color` and `onColor`. (e.g., `--color_primary10`, `--color_primary20`, ..., `--color_primary100`)
  - `--color_ROLE_a{alphaPercentage}`: Alpha (transparency) versions of the base color. (e.g., `--color_primary_a10`, ..., `--color_primary_a100`)
  - `--color_ROLE{percentage}_a{alphaPercentage}`: Alpha versions of the mixed colors. (e.g., `--color_primary50_a30`)

- **Example**:
  ```html
  <div class="$gradient(brand, #d41c84, white)">
    <!-- CSS variables like --color_brand, --color_brand10, --color_brand10_a50 etc. are now available to children -->
    <button class="$bg(#brand60) $color(#brand)">Action</button>
  </div>
  ```

### `$popGradient()` - Extended Color Scheme Generation with Chroma Variants

Builds upon `$gradient()` by adding further variations through chroma manipulation.

- **Syntax**: `$popGradient(role, color, onColor, steps?)`
  - Parameters are the same as `$gradient()`.

- **Output**: Generates all variables that `$gradient()` produces, plus additional chroma-modified versions.
  - Chroma modifiers include `_b3` (blend*0.25), `_b2` (blend*0.5), `_b1` (blend*0.75), `_b` (blend*0.9), `_p` (pop*1.1), `_p1` (pop*1.25), `_p2` (pop*1.5), `_p3` (pop*2.0).
  - Examples of generated variables:
    - `--color_ROLE{percentage}_p1` (e.g., `--color_primary50_p1`)
    - `--color_ROLE{percentage}_a{alphaPercentage}_b2` (e.g., `--color_accent30_a80_b2`)

- **Example**:
  ```html
  <div class="$popGradient(main, oklch(70% 0.15 230), black)">
    <h1 class="$color(#main_p2)">Popped Title</h1>
    <p class="$color(#main70_a90_b1)">Subtle blended text</p>
  </div>
  ```

### Using Generated Colors

To use the colors generated by `$gradient` or `$popGradient`, you refer to the CSS custom property name prefixed with a `#`. CSSS will convert this to the correct `var(--color_...)` syntax.

Example: `$bg(#primary50_a80)` will be translated to `background-color: var(--color_primary50_a80);`

### `$color()` - Text Color

Sets the `color` CSS property.

- **Syntax**: `$color(value)`
  - `value`: A color value. This can be a standard CSS color name (e.g., `red`), a hex code (e.g., `'''#333'''`), an `rgb/hsl/oklch` value, or a CSSS variable (e.g., `#primary`, `#accent80_a50`).

- **Example**:
  ```html
  <div class="$gradient(text, black, white)">
    <p class="$color(#text)">Regular text</p>
    <p class="$color(#text70)">Lighter text</p>
  </div>
  ```

### `$bg()` - Background Properties

Sets background properties. Primarily used for `background-color` with the new color system.

- **Syntax**: `$bg(value)`
  - `value`: A color value (e.g., `red`, `#blue50_a20`, `transparent`) or a gradient function.

Example:
```css
$bg(#myGradientColorVar) /* Sets backgroundColor: var(--color_myGradientColorVar) */
$bg(linear-gradient(to right, #startColorVar, #endColorVar)) /* Sets gradient background using variables */
$bg(red) /* Sets backgroundColor: red */
```
The `$bg` short also supports native CSS gradient functions:
  - `linear-gradient` / `linear`
  - `radial-gradient` / `radial`
  - `conic-gradient` / `conic`
  - `repeating-linear-gradient` / `repeating-linear`
  - `repeating-radial-gradient` / `repeating-radial`
  - `repeating-conic-gradient` / `repeating-conic`

Note: The following background properties are planned for future implementation and might require dedicated shorts or syntax extensions:
- `backgroundImage` (beyond gradients)
- `backgroundSize`
- `backgroundPosition`
- `backgroundRepeat`
- `backgroundAttachment`
- `backgroundClip`
- `backgroundOrigin`

### Other Color Property Shorts

These shorts apply to specific CSS color properties and accept a single color value (which can be a direct color or a CSSS variable like `#myRole20`):

- **`$borderColor(...)`**: Sets border colors. Used in conjunction with `$border()` for style and width. Can take 1 to 4 color values for different sides (see `$border()` for full property syntax; `$borderColor` focuses only on the color aspect).
  - Example: `$border(solid,1px) $borderColor(#primary70)` or `$border(solid,1px) $borderColor(#topBottom, #leftRight)`
- **`$caretColor(value)`** or **`$caret(value)`**: Sets `caret-color`.
  - Example: `$caretColor(#accent50)`
- **`$accentColor(value)`** or **`$accent(value)`**: Sets `accent-color`.
  - Example: `$accent(#brand30_a80)`
- **`$textEmphasisColor(value)`** or **`$emphasis(value)`**: Sets `text-emphasis-color`.
  - Example: `$emphasis(#highlight)`
- **`$textDecorationColor(value)`** or **`$decoration(value)`**: Sets `text-decoration-color` by updating the `--text-decoration-color` CSS variable, which is then used by text decoration utilities.
  - Example: `$textDecoration(underline) $decoration(#linkHover)`
- **`$columnRuleColor(value)`** or **`$column(value)`**: Sets `column-rule-color`.
  - Example: `$column(#separator20)`
- **`$outlineColor(value)`** or **`$outline(value)`**: Sets `outline-color`.
  - Example: `$outline(solid, 1px) $outlineColor(#focusRing)` (Note: `$outline` itself may also take a color)

### Modern Color Spaces

CSSS supports all modern CSS color spaces by passing them through. You can use functions like `oklch()`, `lab()`, `color-mix()`, etc., directly within your CSSS values where colors are expected, including within the `$gradient` definitions.

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

## Typography Properties

### $font() - Font properties

- `$font(1.2rem)` - Font size
- `$font(bold)` - Font weight
- `$font(serif)` - Font family
- `$font(1.2rem,bold,serif)` - Combined properties
- `$font(var(--font-dynamic))` - Using CSS Variables for font properties

### Text decoration and transformation

- `$textDecoration(underline,wavy,2px)` - Text decoration
- `$textTransform(uppercase)` - Text transformation

## Border Properties

### $border() - Border properties

- `$border(solid)` - Border style
- `$border(2px)` - Border width
- `$border(solid,2px)` - Style and width. Use `$borderColor(#colorVar)` to set the color.
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

- `:hover$color(#red)` - Applies color red on hover
- `:hover$border(solid,2px)` - Applies a solid 2px border on hover

### Focus State

- `:focus$color(#blue)` - Applies color blue on focus
- `:focus$border(solid,2px)` - Applies a solid 2px border on focus

### Other State Selectors

- Standard CSS pseudo-classes (`:active`, `:visited`, `:checked`, etc.) can be used with the same pattern
- `:first` - Alias for `:first-child`
- `:last` - Alias for `:last-child`
- `:edge` - Alias for `:first-child,:last-child`

### Media Queries

- `@dark:hover$color(#white)` - Applies white color on hover in dark mode
- `@sm:hover$color(#red)` - Applies red color on hover on small screens
- Complex combinations: `@print,@screen:hover$border(solid,2px)` - Multiple media queries with hover

### Multiple States/Selectors

You can combine multiple state selectors by chaining pipe syntax:

- `:hover$color(#red)|:focus$color(#blue)` - Red on hover, blue on focus
- `:hover$color(#red)|.active$color(#green)` - Red on hover, green for active class

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
- `$extraExpanded` → `$fontStretch(extraExpanded)`

## Custom Style Groups & Legacy Supershorts

CSSS provides a powerful way to define reusable groups of styles. The primary and recommended method is through JavaScript registration. A legacy method using `=` syntax also exists.

### Defining Custom Style Groups with JavaScript (Recommended)

You can define complex, reusable style components using the `registerShort(name, func)` JavaScript function, typically imported from `/src/engine.js`.

- **Syntax**: `registerShort(name, callbackFunction)`
  - `name` (String): The name of the short. You can use a dot (`.`) for namespacing (e.g., `grid.holyGrail`, `_grid.hgHeader`).
  - `callbackFunction` (Function): A function that returns an object of CSS properties and values.

- **Behavior**:
  - **Global Shorts**: If `name` is simple (e.g., `myButton`), the short is registered globally (e.g., `$myButton`).
  - **Namespaced/Scoped Shorts**: If `name` contains a dot (e.g., `grid.card` or `_flex.itemSetup`):
    - The part before the dot becomes the main short name (e.g., `$grid(...)` or `$_flex(...)`).
    - The part after the dot becomes a "sub-short" or a named configuration available as an argument to the main short, or as a method within its scope.
    - For example, `registerShort("grid.card", () => ({ display: "grid", gap: "1rem" }))` allows you to use `$grid(card)`.
  - **Item-Specific Shorts (within itemScopes)**: When registering shorts intended for item scopes (e.g., for `$_grid` or `$_flex`), like `_grid.hgMain`:
    - The `callbackFunction` can use `this` to access utility functions of that item scope (e.g., `this.column(2,3)` inside a `$_grid` item short).

- **Example** (conceptual, based on `test/hpSupers.html`):
  ```javascript
  // In your JavaScript module:
  import { registerShort } from '/src/engine.js';

  // Register a namespaced short for a grid container layout
  registerShort('grid.holyGrail', () => ({
    gridTemplateRows: "auto 1fr auto",
    gridTemplateColumns: "auto 1fr auto",
    gap: "1rem",
    blockSize: "100vh"
  }));

  // Register an item-specific short for the main content area within the $_grid scope
  registerShort('_grid.hgMain', function() { 
    // 'this' refers to the $_grid scope, providing access to .column(), .row(), etc.
    return this.column(2, 3); 
  });
  ```
  Usage in HTML:
  ```html
  <div class="$grid(holyGrail) |main$_grid(hgMain)">
    <main>Main content</main>
    <!-- other areas -->
  </div>
  ```

### Legacy Supershorts (`=` Definitions - Deprecated)

Previously, CSSS allowed defining aliases or groups of shorts directly within `<style csss="...">` tags or `csss="..."` attributes using an `=` syntax. While this mechanism may still partially function due to legacy parser code, **it is considered deprecated and is not the recommended way to create reusable styles.** Use the JavaScript `registerShort()` method for new development.

These definitions were processed by the `extractSuperShorts` parser function and resulted in new entries being added to the engine's registries at runtime if encountered.

There were three types of such definitions:

1.  **Media Aliases (`@name = @media ...;`)**: Defined a reusable name for a media query condition.
    *Example (Legacy)*:
    ```csss
    @tablet = @(min-width: 768px);
    /* Usage: @tablet$padding(2rem) */
    ```

2.  **Selector Aliases (`:name = :pseudo...;`)**: Defined a reusable name for a selector or pseudo-class.
    *Example (Legacy)*:
    ```csss
    :interactive = :hover, :focus;
    /* Usage: :interactive$color(#blue) */
    ```

3.  **Dollar Supershorts (`$name = ...;` or `$name(args) = ...;`)**: Defined a new dollar short, which created a function wrapper via `makeSuperShort`.
    *   *Simple Alias (Legacy)*: `$cardBase = $border(solid,1px)$padding(1rem);` - Created a function `cardBase`. When `$cardBase` was used, it executed the original sequence.
    *   *Parameterized Function (Legacy)*: `$rounded(r) = $border(radius(r));` - Created a function `rounded` that accepted arguments.

**Important Note on Legacy `=` Supershorts:** Due to how these definitions were processed, you could not reliably use one `=` defined supershort within the definition of another `=` defined supershort. Core dollar short functions (like `$border`, `$padding`) could be used within these legacy definitions.

### Legacy `BuiltinSupers.js` (Deprecated)

The `BuiltinSupers.js` file contains a set of predefined simple aliases using the legacy `=` syntax (e.g., `$bold = $fontWeight(bold);`). This file is **no longer automatically processed by the engine at startup.** While the definitions might still work if manually included in a parsed CSSS block, they should be considered deprecated. For equivalent functionality, prefer defining them via JavaScript `registerShort()` or using the direct dollar shorts.

*(The list of specific built-ins from this file is omitted here as they are deprecated)*