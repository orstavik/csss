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
- Chromas (color intensity)

Example:
```css
$palette(#ec1221) /* Sets up a color system with #ec1221 as primary */
```

### `$color()`
Takes three parameters: `$color(text, background, border)`. Can use:
- Named colors (red, blue, etc.)
- Hex values (#00ff00)
- RGBA values (rgba(128,0,128,0.5))
- Palette variables (primary, secondary, etc.)
- Relief functions (bw, text, box, flip, darkflip)

Example:
```css
$color(primary) /* Uses primary color from palette */
$color(,,red) /* Sets only border color to red */
```

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

### $transform() - Transformations
- `$transform(translateY(-50%))` - Transform translateY
- `$transform(rotate(45deg))` - Transform rotate

## Special Features

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
- `$smallCaps` → `$fontVariant(small-caps)`
- `$capitalize` → `$textTransform(capitalize)`
- `$uppercase` → `$textTransform(uppercase)`
- `$lowercase` → `$textTransform(lowercase)`
- `$underline` → `$textDecoration(underline)`
- `$overline` → `$textDecoration(overline)`
- `$lineThrough` → `$textDecoration(line-through)`
- `$serif` → `$fontFamily(serif)`
- `$sansSerif` → `$fontFamily(sans-serif)`
- `$monospace` → `$fontFamily(monospace)`

### Media Query Aliases
- `@sm` → `@(min-width:640px)`
- `@md` → `@(min-width:768px)`
- `@lg` → `@(min-width:1024px)`
- `@xl` → `@(min-width:1280px)`
- `@2xl` → `@(min-width:1536px)`
- `@dark` → `@(prefers-color-scheme:dark)`

### Selector Aliases
- `:first` → `:first-child`
- `:last` → `:last-child`
- `:edge` → `:first-child,:last-child`

## Technical Implementation Details

### Implementation of Super Shorts (`$name`)

Super shorts are reusable CSS property bundles prefixed with `$` that expand to one or more CSS properties.

#### Implementation:
- Super shorts are defined in `BuiltinSupers.js` with the format: `$name = $function(value)$function2(value2)...;`
- For example: `$bold = $fontWeight(bold);` defines a super short named `$bold` that sets font-weight to bold
- More complex example: `$block = $display(block)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);`

#### How They Work:
1. The `extractSuperShorts()` function in `Parser.js` uses regex to find and extract super short definitions
2. The `SUPER_HEAD`, `SUPER_LINE`, and `SUPER_BODY` regex patterns match the super short syntax
3. Super shorts are parsed into a `ShortBlock` object
4. When used in HTML, each super short expands to its defined CSS properties
5. The dot notation `.` is used to represent `unset` value

#### Storage and Registration:
- Built-in super shorts are defined in `BuiltinSupers.js`
- They're loaded during initialization by the `SheetWrapper` constructor
- Custom super shorts can be added at runtime via the `readSupers()` method

### Implementation of Super Selectors (`:name`)

Super selectors are reusable CSS selectors prefixed with `:` that expand to one or more CSS pseudo-classes or complex selectors.

#### Implementation:
- Super selectors are defined in `BuiltinSupers.js` with the format: `:name = :selector1,:selector2,...;`
- For example: `:first = :first-child;` creates an alias for the `:first-child` pseudo-class
- Multiple selectors: `:edge = :first-child,:last-child;` creates a selector that matches both first and last children

#### How They Work:
1. Super selectors are extracted using the same mechanism as super shorts in `extractSuperShorts()`
2. They're validated by `checkSuperBody()` to ensure they have the correct prefix and structure
3. Super selectors are processed by the `Selector` class, which interprets them when building CSS rules
4. When used in HTML, they expand to the full CSS selector

### Implementation of Media Queries (`@name`)

Media query supers are reusable media query definitions prefixed with `@` that expand to full media query expressions.

#### Implementation:
- Media query supers are defined in `BuiltinSupers.js` with format: `@name = @(media-query);`
- For example: `@sm = @(min-width:640px);` defines a breakpoint for small screens
- Special case: `@dark = @(prefers-color-scheme:dark);` for dark mode detection

#### How They Work:
1. Media query supers are extracted with the same mechanism as other supers
2. The `ShortBlock.interpret()` method processes media queries by:
   - Replacing supers with their values using the supers object
   - Stripping the `@` prefix
   - Handling special syntax like `!` for negation
   - Joining conditions with "and"
   - Prepending `@media` to create a complete media query
3. The `Rule` class uses these media queries when generating CSS rules

### Combining These Features

The real power of the system comes from combining these features:

1. **Nested Expressions**: 
   ```html
   <div class="$grid(cols(1fr,1fr),gap(1rem))">...</div>
   ```

2. **Media + Selectors + Shorts**:
   ```html
   <div class="@sm:hover$color(red)">Red on hover on small screens</div>
   ```

3. **Multiple Declarations** using pipe syntax:
   ```html
   <div class="$border|@md$w(500px)|:hover$color(blue)">...</div>
   ```

The parser first identifies media queries, then selectors, and finally shorts. Each component is processed by its corresponding interpreter, and the results are combined to generate the final CSS rules. These rules are then added to the appropriate CSS layer ("container" or "items") based on whether they target container elements or their children. 