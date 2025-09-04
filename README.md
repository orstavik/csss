# CSSS (CSS Shorts)

A lightweight CSS preprocessor that enables writing concise, expressive CSS directly in your HTML using shorthand syntax.

## Quick Start

```bash
npx http-server -p 3003 --cors
```

Then go to: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]

## About CSSS

CSSS (CSS Shorts) is a CSS preprocessor engine that introduces two main concepts for simplified CSS authoring:

1. **Dollar Shorts**: Shorthand syntax patterns that start with `$`. These provide concise, expressive ways to write common CSS patterns.
   
2. **Supershorts**: An even more concise way to combine multiple dollar shorts together, creating reusable style combinations.

## Core Features

### Dollar Shorts ($)

Write CSS properties directly in HTML using simple function-like syntax:

```html
<div class="$border(dotted,2px,radius(1px))">
  Border with radius
</div>
```

### Nested Selectors (|)

Target child elements without writing separate CSS rules:

```html
<div class="$block(s,gap(0.3em,1em)) |*$blockItem(indent(15%))">
  <p>This paragraph will have 15% text indentation</p>
</div>
```

### Color System

Define and use color palettes with intelligent color relationships:

```html
<div class="$palette(#14a69b) $color(primary) $border(solid,2px)">
  <div class="$color(secondary)">Secondary color text</div>
</div>
```

### Layout Utilities

Simplified layout controls for common patterns:

```html
<div class="$grid(cols(1fr,1fr,1fr),gap(1rem))">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
</div>
```

### Media Queries and States

Responsive design with built-in media query shortcuts:

```html
<div class="@sm$w(100%) @md$w(50%) @lg$w(33%)">
  Responsive element
</div>
```

### Custom Super Shorts

Define your own reusable combinations of styles:

```css
$myButton = $padding(1rem,2rem) $border(solid,2px) $flex(cc)
```

```html
<button class="$myButton">Styled Button</button>
```

## Project Structure

```
csss/
├── src/
│   ├── Parser.js         # Main parser
│   ├── func.js           # Core functions
│   ├── BuiltinSupers.js  # Predefined supershorts
│   ├── engine.js         # Processing engine
│   ├── layout.js         # Layout utilities
│   ├── palette.js        # Color palette tools
│   └── Color.js          # Color utilities
├── test/
│   └── HappyPath*.html   # Feature tests
└── color_analysis/       # Color tools
```

## Development

CSSS is composed of several components:

- **Parser System**: Interprets the CSSS syntax
- **Function System**: Provides core CSS function implementations
- **Color System**: Handles color manipulation and palette generation
- **Engine**: Converts CSSS to standard CSS

## Browser Support

CSSS works in modern browsers that support CSS Custom Properties and other modern CSS features.

## Documentation

For a comprehensive reference of all properties and syntax patterns, see the CSS$ Properties Reference.
