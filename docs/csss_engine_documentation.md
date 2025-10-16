# CSSS Engine Documentation

## Quick Start

```bash
npx http-server -p 3003 --cors
```

Then go to: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]

## Project Structure

```
src/
├── auto.js
├── bg.js
├── border.js
├── Color.js
├── csss.js
├── filterTransform.js
├── font.js
├── func.js
├── funcMath.js
├── layout.js
├── nativeCss.js
├── palette.js
├── Parser.js
├── textDecorations.js
├── transitions.js
└── vocabulary.js
```

## CSSS Syntax and Usage

This section provides a practical reference for all syntax, functions ("Dollar Shorts"), and features in the CSSS Engine.

### Core Syntax

The fundamental building block of CSSS is the "Dollar Short." It's a concise, function-like syntax used directly in HTML `class` attributes.

-   **Basic Structure**: `$shortName(argument1,argument2,...)`
-   **No Arguments**: `$shortName`
-   **Item-Container Relation**: Item Shorts are linked to container shorts using the `|` character: `$flex()|$flexItem()` indicating `$flex()` as the container and `|$flexItem()` as the properties for the items inside the container. Selectors can also be used to target specific children e.g. `|div$flexItem(...)`.

This syntax is processed by the CSSS engine to generate standard CSS.

### Function Reference

This section provides a comprehensive list of all available Dollar Shorts, grouped by the module they come from.

#### Backgrounds (`bg.js`)

This module provides functions for controlling background properties, including colors, images, and complex gradients.

##### `$bg()` - Sets background properties

-   `$bg(color)` - Sets a solid background color.
    -   Example: `$bg(#yellow)`
    -   Example with a CSS variable: `$bg(#primary)`
-   `$bg(url(path/to/image.jpg))` - Sets a background image.
-   `$bg()` can be combined with other background keywords and functions to create complex backgrounds.
    -   Example: `$bg(url(...),size(cover),noRepeat,center)`
-   Multiple `$bg` or gradient calls can be used to layer backgrounds.
    -   Example: `$bg(url(a.jpg),size(30%),noRepeat,center)$bg(url(b.jpg),size(cover))$linear(red,blue)`

##### Gradient Functions

CSSS provides a powerful set of functions for creating gradients. The arguments can be a mix of angles, directions, color spaces, and color stops.

-   `$linear(...)` - Creates a linear gradient.
    -   Example: `$linear(90deg,#red,#green)`
    -   Example with color stops: `$linear(45deg,#red,0%,#blue,100%)`
-   **Directional Shortcuts**:
    -   `$linearLeft()`, `$linearRight()`, `$linearUp()`, `$linearDown()`
    -   `$linearUpLeft()`, `$linearUpRight()`, `$linearDownLeft()`, `$linearDownRight()`
-   `$repeatingLinear(...)` - Creates a repeating linear gradient.
    -   Example: `$repeatingLinear(45deg,#red,10%,#blue,20%)`
-   `$radial(...)` / `$ellipse()` - Creates a radial gradient. You can specify shape, size, position, and color stops.
    -   Example: `$ellipse(atCenter,#orange,#cyan)`
    -   Example: `$circle(10px,atLeftTop,#blue,45%,#pink,90%)`
-   **Radial Shortcuts**:
    -   `$circle()`, `$ellipse()`, `$ellipseClosestSide()`, `$circleClosestCorner()` and more.
-   `$repeatingRadial(...)` - Creates a repeating radial gradient.
    -   Example: `$repeatingCircle(#green,5%,#yellow,15%)`
-   `$conic(...)` - Creates a conic gradient.
    -   Example: `$conic(45deg,oklab,#red,#blue)`
    -   Example: `$conic(at(50%,50%),#red,#blue)`
-   `$repeatingConic(...)` - Creates a repeating conic gradient.
    -   Example: `$repeatingConic(#purple,0deg,#orange,45deg)`

#### Borders (`border.js`)

This module controls border properties.

##### `$border()` - Sets border properties

The `$border()` function is a versatile shorthand for setting border-style, border-width, border-color, and border-radius.

-   `$border(style)` - Sets the border style.
    -   Example: `$border(dashed)`
-   `$border(width)` - Sets the border width.
    -   Example: `$border(2px)`
    -   Keywords can also be used: `$border(thin)`, `$border(medium)`, `$border(thick)`
-   `$border(style,width)` - Sets both style and width.
    -   Example: `$border(solid,2px)`
-   `$border(color)` - Sets the border color.
    -   Example: `$border(#ff0000)`
-   `$border(radius(value))` or `$border(r(value))` - Sets the border radius for all corners.
    -   Example: `$border(radius(1rem))`
    -   Example: `$border(solid,2px,r(10px))`
-   To set values for different sides (logical properties), use the `w()`, `c()`, `s()`, and `r()` functions within `$border`.
    -   `$border(w(1px,2px,3px,4px))` - Sets top, right, bottom, and left border widths.
    -   `$border(r(10px,20px,30px,40px))` - Sets top-left, top-right, bottom-right, and bottom-left radius.

##### `$borderColor()` - Sets the color of the four borders

-   `$borderColor(color)` - Sets a single color for all four borders.
-   Accepts 1, 2, 3, or 4 color values, following standard CSS shorthand rules for logical properties (block-start, inline-start, block-end, inline-end).
-   Example: `$borderColor(red,blue)`

#### Shadows

You can apply shadows using shorts that map directly to their CSS counterparts.

-   `$boxShadow(offsetX,offsetY,blur,spread,color)` - Applies a shadow to the element's box.
    -   Example: `$boxShadow(2px,4px,6px,rgba(0,0,0,0.5))`
-   `$textShadow(offsetX,offsetY,blur,color)` - Applies a shadow to the text.
    -   Example: `$textShadow(2px,4px,6px,rgba(0,0,0,0.5))`

#### Color Palette (`palette.js`)

This module provides a powerful system for creating and using inheritable, themeable color palettes, conceptually referred to as the "Wooden Palette." Similar to the typography system, you define a palette on a parent element, and its values are automatically made available to all children.

##### The Wooden Palette Short: `$palette()`

The `$palette()` short is used on a container element to define a named set of colors. For each base color you provide, the engine uses color science to automatically generate a range of variants (more vibrant, more muted, etc.).

-   **Syntax**: `$palette(roleName,color1,color2,...)`
    -   `roleName`: A custom name for this palette (e.g., `primary`, `accent`).
    -   `color1`, `color2`, etc.: At least two base colors that will form the palette.
-   **What it does**: This creates a set of inheritable CSS variables. For each base color, it generates five variants:
    -   **Base**: The original color.
    -   **Pop**: A more saturated, vibrant version.
    -   **Accent**: A slightly more saturated version.
    -   **Bland**: A less saturated, muted version.
    -   **Neutral**: A grayscale version with the same lightness.
-   **Example**: `$palette(brand, #e11d48, #db2777)`
    -   This creates variables like `--color-brand0`, `--color-brandPop0`, `--color-brandAccent0`, and also `--color-brand1`, `--color-brandPop1`, etc.

##### Using the Palette

To use a color from a defined palette, you reference its generated variable name using a `#` prefix within any short that accepts a color (like `$bg`, `$color`, or `$borderColor`).

-   **Syntax**: `$color(#roleName<Variant><Index>)`
    -   `roleName`: The name of the palette.
    -   `Variant` (Optional): `Pop`, `Accent`, `Bland`, or `Neutral`. If omitted, it uses the base color.
    -   `Index` (Optional): The index of the base color in the palette (0, 1, 2, ...). If omitted, it defaults to `0`.

-   **Example Usage**:

    ```html
    <body class="$palette(primary,#007bff,#28a745)">
      <!-- Uses the base version of the first color (#007bff) -->
      <h1 class="$color(#primary)">This is the main headline.</h1>

      <!-- Uses the "Pop" version of the second color (#28a745) -->
      <p class="$color(#primaryPop1)">This is an important paragraph.</p>

      <!-- Uses the "Neutral" (grayscale) version of the first color -->
      <div class="$bg(#primaryNeutral)">This container has a neutral background.</div>
    </body>
    ```

##### Advanced Color Mixing

The palette system also includes powerful on-the-fly color mixing and tinting capabilities, allowing you to create variations and gradients between your defined palette colors.

###### 1. Tinting (Mixing with Transparent)

You can create lighter tints of any palette color by mixing it with transparent.

-   **Syntax**: `#[colorName]#a<strength_percentage>`
-   **How it Works**: The number after `#a` represents the final strength of the color. For example, `#a80` mixes the color with 20% transparent, resulting in an 80% strength tint.
-   **Example**:
    -   `$bg(#primary#a80)` produces a light tint of the first primary color.
    -   `$bg(#primary1#a50)` produces a 50% strength tint of the second primary color.
    -   `$bg(#primaryPop2#a25)` produces a 25% strength tint of the "Pop" variant of the third palette color.

###### 2. Sequential Mixing

You can mix multiple colors from a palette in a sequence. The operations are chained from left to right.

-   **Syntax for Adjacent Colors**: `#[paletteName]#[percentage]`
    -   **How it Works**: This syntax mixes the first color of your palette (index 0) with the specified percentage of the second color (index 1).
    -   **Example**: Given `$palette(sunset,#orange,#red)`, the short `$bg(#sunset#30)` creates a color that is a mix of 70% orange and 30% red.

-   **Syntax for Non-Adjacent Colors**: To mix color `N` with color `N+1`, you must add `N` placeholders (`#_`) to the expression.
    -   **How it Works**: Each `#_` placeholder tells the engine to skip one color in the sequence.
    -   **Example**: Given `$palette(brand,#red,#green,#blue)`
        -   `$bg(#brand#30)` mixes `brand0` (red) with 30% of `brand1` (green).
        -   `$bg(#brand##30)` mixes `brand1` (green) with 30% of `brand2` (blue).

-   **Chaining Mixes**: You can chain multiple mixes together.
    -   **Syntax**: `#[paletteName]#[mix1]#[mix2]...`
    -   **How it Works**: This creates a sequential mix.
    -   **Example**: Given `$palette(brand,#red,#green,#blue)`, the short `$bg(#brand#20#30)` would be interpreted as:
        1.  First, mix `brand0` (red) with 20% of `brand1` (green).
        2.  Then, take that resulting color and mix it with 30% of `brand2` (blue).

###### 3. Chaining Tints and Mixes

You can chain any of these operations together. The chain is always processed from left to right.

-   **Example**: `$bg(#brand#20#a50)`
-   **Interpretation**:
    1.  First, mix `brand0` with 20% of `brand1`.
    2.  Then, take the resulting color and create a 50% tint of it.

#### Typography (`font.js`)

This module provides comprehensive control over font properties. It is built around a powerful "Umbrella and Droplet" system that uses CSS inheritance to let you define reusable font configurations on parent elements and then apply or modify them on children.

##### The Umbrella Short: `$typeface()`

The `$typeface()` short is the "umbrella." You apply it to a container element to define a complete, reusable font configuration. It works by creating a set of inheritable CSS custom properties (variables) based on a name you provide.

-   **Syntax**: `$typeface(typeName, properties...)`
    -   `typeName`: A custom name for this configuration (e.g., `bodyText`).
    -   `properties...`: A list of font properties, such as font family, size, weight, and style.
-   **What it does**: This creates inheritable CSS variables like `--bodyText-FontFamily`, `--bodyText-FontSize`, etc., on the element where it's applied.
-   **Example**: `<div class="$typeface(bodyText, 'Helvetica Neue', 16px, 400)">...</div>`

##### Applying the Umbrella with Droplet Overrides: `$font()`

The `$font()` short is used on child elements to consume the inherited properties from a parent's `$typeface`. It can also accept "droplet" shorts—additional arguments that override specific properties of the inherited umbrella for that element only.

-   **Syntax**: `$font(typeName, ...droplets)`
    -   `typeName`: The name of the inherited `$typeface` to apply.
    -   `droplets...` (Optional): Keywords or values that break the inheritance chain and override parts of the typeface.

-   **Applying an Inherited Umbrella**:
    -   `<p class="$font(bodyText)">...</p>` - This paragraph will inherit and apply the full `bodyText` typeface from its parent.

-   **Applying with Droplets**:
    -   `<h1 class="$font(bodyText, bold)">...</h1>` - This heading inherits the `bodyText` typeface but overrides the `fontWeight` to be `bold`.
    -   `<em class="$font(bodyText, italic, 1.2rem)">...</em>` - This text inherits `bodyText` but overrides the `fontStyle` and `fontSize`.

##### Inheritable Font Properties

The following properties are part of the typeface system and can be set in `$typeface` and overridden in `$font`:

-   `fontFamily`
-   `fontSize`
-   `fontStyle`
-   `fontWeight`
-   `fontSizeAdjust`
-   `letterSpacing`
-   `fontStretch`
-   `fontVariantCaps`
-   `fontSynthesis`
-   `fontFeatureSettings`
-   `fontVariationSettings`
-   `WebkitFontSmoothing`
-   `MozOsxFontSmoothing`
-   `fontKerning`

##### Keywords and additional functions

-   **Weight**: `bold`, `bolder`, `lighter`, or a number from 1-1000.
-   **Style**: `italic`, `oblique`. To specify an angle for `oblique`, provide it as a separate argument (e.g., `$font(...,oblique,10deg)`).
-   **Size**: `larger`, `smaller`, `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`, `xxxl`, or a length value.
-   **Variant**: `smallCaps`, `allSmallCaps`, `petiteCaps`, `unicase`, `titlingCaps`.
-   **Stretch**: `condensed`, `expanded`, `semiCondensed`, `extraExpanded`, etc.
-   **Synthesis**: Control how browsers handle fake bold or italics with shorts like `$noStyleSynthesis`, `$noWeightSynthesis`, and `$noSynthesis`.
-   **Spacing**: `$font(spacing(value))` sets `letter-spacing`.

*A note on variable fonts: While CSSS doesn't have specific shorthands for variable font axes like `wght`, you can use the native CSS syntax: `$fontVariationSettings(wght,400)`. `wght` is a standard axis for font weight.*

#### Layout (`layout.js`)

This module is the core of CSSS's layout capabilities, providing powerful and concise shorthands for modern CSS layout systems like Flexbox and Grid, as well as traditional block layout.

##### Container and Item Syntax

A key concept in CSSS layout is the `container | item` syntax. The `|` character separates properties for a layout container (like `$flex` or `$grid`) from properties for its direct children. The item properties are defined with `$blockItem`, `$flexItem`, and `$gridItem`.

-   Example: `$flex(gap(1rem))|$flexItem(grow(1))`

##### Block Layout

-   `$block()` - Establishes a block formatting context.
    -   `$block(hyphens)` - Enables automatic hyphenation.
    -   `$block(nowrap)` - Prevents text wrapping.
    -   `$block(ellipsis)` - Truncates text with an ellipsis.
    -   `$block(clamp(3))` - Clamps text to a specific number of lines.
-   `$blockItem()` - Applies properties to children of a `$block` container.
    -   `$blockItem(margin(1rem,0))`
    -   `$blockItem(indent(1em))`

##### Flexbox Layout

-   `$flex()` - Creates a flex container.
    -   `$flex(column)` - Sets `flex-direction`. Also `row`, `rowReverse`, `columnReverse`.
    -   `$flex(wrap)` - Sets `flex-wrap`. Also `noWrap`, `wrapReverse`.
    -   `$flex(gap(1rem))` - Sets the gap between items.
-   `$flexItem()` - Applies properties to children of a `$flex` container.
    -   `$flexItem(grow(1))` - Sets `flex-grow`.
    -   `$flexItem(shrink(2))` - Sets `flex-shrink`.
    -   `$flexItem(basis(200px))` - Sets `flex-basis`.
    -   `$flexItem(order(1))` - Sets the `order`.

##### Grid Layout

-   `$grid()` - Creates a grid container.
    -   `$grid(cols(1fr,2fr))` - Defines grid columns. `rows()` is also available.
    -   `$grid(gap(1rem))` - Sets the gap.
    -   `$grid(dense)` - Sets `grid-auto-flow` to `dense`.
-   `$gridItem()` - Applies properties to children of a `$grid` container.
    -   `$gridItem(column(1,3))` - Places the item from column line 1 to 3.
    -   `$gridItem(row(span(2)))` - Makes the item span two rows.

##### Layout Alignment

CSSS uses a descriptive keyword-based system for controlling alignment within `$flex()` and `$grid()` containers and their respective item shorts (`$flexItem`, `$gridItem`). These keywords are passed as arguments to the layout functions.

###### Alignment Value Keywords

The alignment keywords are derived from standard CSS values, but are written in CamelCase and sometimes shortened for brevity.

-   `start` -> `Start`
-   `end` -> `End`
-   `center` -> `Center`
-   `stretch` -> `Stretch`
-   `space-around` -> `Around`
-   `space-evenly` -> `Evenly`
-   `space-between` -> `Between`
-   `baseline` -> `Baseline`
-   `unset` -> `Unset`

###### Container Alignment (`$flex` and `$grid`)

-   **`content<AlignValue><JustifyValue>`**: Sets `align-content` and `justify-content` together (using the `place-content` shorthand). **Note the order: `align` comes before `justify`.**
    -   Example: `$flex(contentStretchBetween)` sets `place-content: stretch space-between`.
    -   To set only one property, use `Normal` for the other. `Normal` is the default value.
    -   Example (sets only `justify-content: center`): `$flex(contentNormalCenter)`
    -   Example (sets only `align-content: center`): `$flex(contentCenterNormal)`
-   **`items<AlignItemsValue>`**: Sets `align-items`.
    -   Example: `$flex(itemsStart)` sets `align-items: start`.
-   **`justifyItems<JustifyItemsValue>`** (For `$grid` only): Sets `justify-items`.
    -   Example: `$grid(justifyItemsStretch)` sets `justify-items: stretch`.

###### Overflow and Scroll Snapping

Overflow and scroll snapping are controlled by keywords passed as arguments to a layout container (`$flex`, `$grid`, or `$block`).

-   **Container Overflow Keywords**: These keywords control the container's overflow behavior and can enable scroll snapping.

-   `overflowVisible`: sets `overflow: visible;`
-   `overflowHidden`: sets `overflow: hidden;`
-   `overflowClip`: sets `overflow: clip;`
-   `overflowAuto`: sets `overflow: auto;`
-   `overflowScroll`: sets `overflow: scroll;`
-   `overflowSnap`: sets `overflow: auto;` and `scroll-snap-type: both;`
-   `overflowSnapMandatory`: sets `overflow: auto;` and `scroll-snap-type: both mandatory;`
-   `overflowScrollSnap`: sets `overflow: scroll;` and `scroll-snap-type: both;`
-   `overflowScrollSnapMandatory`: sets `overflow: scroll;` and `scroll-snap-type: both mandatory;`

-   **Per-Axis Overflow**: You can set `overflow-block` (vertical) and `overflow-inline` (horizontal) independently by combining two keywords. The first keyword applies to `block` and the second to `inline`.
    -   Example: `$flex(overflowScrollHidden)` sets `overflow-block: scroll; overflow-inline: hidden;`

-   **Item Snap Alignment**: To control how children align within a snap container, use the following keywords inside an item short (`$flexItem`, `$gridItem`).
    -   `snapStart`: Aligns the item to the start of the snap area.
    -   `snapCenter`: Aligns the item to the center.
    -   `snapEnd`: Aligns the item to the end.
    -   `noSnap`: Prevents the item from snapping.

-   **Example**:
    ```html
    <div class="$flex(overflowSnapMandatory,gap(1rem))">
      <div class="$flexItem(size(100%),snapStart)">Item 1</div>
      <div class="$flexItem(size(100%),snapStart)">Item 2</div>
    </div>
    ```

###### Item Alignment (`$flexItem` and `$gridItem`)

-   **`self<AlignSelfValue>`**: Sets `align-self` for an individual item.
    -   Example: `$flexItem(selfEnd)` sets `align-self: end`.
-   **`justifySelf<JustifySelfValue>`** (For `$gridItem` only): Sets `justify-self`.
    -   Example: `$gridItem(justifySelfStretch)` sets `justify-self: stretch`.

###### Example

You can combine these alignment keywords with other layout properties in a single declaration:

`$flex(contentBetweenStretch,itemsStart,gap(1rem),padding(1rem),wrap)`

##### Object Fit

This module provides keyword-based shorthands for the `object-fit` property, which controls how an `<img>` or `<video>` fits into its container.

-   `$fitFill` sets `object-fit: fill;`
-   `$fitContain` sets `object-fit: contain;`
-   `$fitCover` sets `object-fit: cover;`
-   `$fitScaleDown` sets `object-fit: scale-down;`
-   `$noObjectFit` sets `object-fit: none;`

-   Example: `<img src="..." class="$fitCover">`

##### Positioning (`position.js`)

This module provides functions for controlling the CSS `position` property and its associated offsets (`top`, `left`, `bottom`, `right`, and their logical equivalents).

-   **Functions**: `$absolute()`, `$relative()`, `$fixed()`, `$sticky()`
-   **Syntax**: `$<position_type>(<origin_keyword>, <value1>, <value2>)`

###### Default Behavior

If the first argument is a length or number (not a keyword), the function defaults to setting the `left` and `top` properties.

-   Example: `$absolute(10px, 20px)` sets `position: absolute; left: 10px; top: 20px;`

###### Origin Keywords

You can specify the offset edge or corner by providing an `origin_keyword` as the first argument.

-   `top`, `bottom`, `left`, `right`: Sets the single corresponding property.
-   `leftTop`, `rightTop`: Sets `left`/`right` and `top`.
-   `leftBottom`, `rightBottom`: Sets `left`/`right` and `bottom`.
-   `start`, `end`: Sets logical properties (e.g., `inset-inline-start`).

-   **Single-direction example**: `$absolute(top, 50%)` sets `position: absolute; top: 50%;`
-   **Corner example**: `$fixed(rightBottom, 0, 0)` sets `position: fixed; right: 0; bottom: 0;`

##### Spacing and Sizing (within Layout Shorts)

The following properties can be used as arguments inside layout shorts. **These properties cannot be used as standalone shorts.**

-   **For Container Shorts (`$flex`, `$grid`, `$block`):**
    -   `padding(...)` or `p(...)`
    -   `gap(...)` or `g(...)`
    -   Example: `$flex(padding(0,1rem,0,2rem),gap(1rem))` top, right, bottom, left (block-start, inline-start, block-end, inline-end)
-   **For Item Shorts (`$flexItem`, `$gridItem`, `$blockItem`):**
    -   `margin(...)` or `m(...)`
    -   `size(...)`: A shorthand for setting logical dimensions (width and height).
        -   `size(width)`: Sets the `inline-size` (logical width).
        -   `size(width,height)`: Sets both `inline-size` and `block-size`.
        -   `size(min-width,ideal-width,max-width)`: Sets a range for `inline-size`.
    -   `inlineSize(...)`: Sets only the `inline-size` (logical width). Can also set a min/ideal/max range.
    -   `blockSize(...)`: Sets only the `block-size` (logical height). Can also set a min/ideal/max range.
    -   **Note on Ranges**: To skip a `min` or `max` value when defining a range, use an underscore (`_`) as a placeholder.
    -   Example: `$flexItem(margin(1rem),size(50%))`
    -   Example (height and max-height): `$gridItem(blockSize(_,100px,200px))`
    -   Example (width and max-width): `$flexItem(inlineSize(_,150px,300px))`
    -   Example (min-width and width): `$flexItem(inlineSize(100px,150px,_))`

#### Other Utilities

-   `$hide()` - Sets `display: none` to hide an element.
-   `$cursor(value)` - Sets the CSS `cursor` property.
    -   Example: `$cursor(pointer)`

#### Filters and Transforms (`filterTransform.js`)

This module provides functions for applying graphical effects like blurs, color shifts, and transformations.

##### Filter Functions

-   `$blur(radius)` - Applies a Gaussian blur.
-   `$brightness(amount)` - Adjusts the brightness. `1` is original, `0.5` is half, `2` is double.
-   `$contrast(amount)` - Adjusts the contrast.
-   `$grayscale(amount)` - Converts the image to grayscale. `1` is completely grayscale.
-   `$invert(amount)`