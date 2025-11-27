# CSSS (CSS Shorts)

A lightweight CSS preprocessor that enables writing concise, expressive CSS directly in your HTML using shorthand syntax.

## Quick Start

```bash
npx http-server -p 3003 --cors
```

Then go to: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]

## About CSSS

CSSS (CSS Shorts) is a preprocessor engine that simplifies CSS authoring using **Dollar Shorts** ($): concise, expressive shorthand patterns for common CSS properties.

## Core Features

### Dollar Shorts ($)

Apply CSS properties in HTML via function-like syntax:

```html
<div class="$border(dotted,2px,radius(1px))">
  Border with radius
</div>
```

### Nested Selectors (|)

Style children without separate rules:

```html
<div class="$block(s,gap(0.3em,1em)) |*$blockItem(indent(15%))">
  <p>This paragraph will have 15% text indentation</p>
</div>
```

### Color System

Intelligent color palette generation:

```html
<div class="$palette(#14a69b) $color(primary) $border(solid,2px)">
  <div class="$color(secondary)">Secondary color text</div>
</div>
```

### Layout Utilities

Simplified common layout patterns:

```html
<div class="$grid(cols(1fr,1fr,1fr),gap(1rem))">
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
</div>
```

### Media Queries and States

Built-in media query shortcuts:

```html
<div class="@sm$w(100%) @md$w(50%) @lg$w(33%)">
  Responsive element
</div>
```

## Project Structure

```
csss/
├── src/
│   ├── Parser.js         # Main parser
│   ├── func.js           # Core functions
│   ├── engine.js         # Processing engine
│   ├── layout.js         # Layout utilities
│   ├── palette.js        # Color palette tools
│   └── Color.js          # Color utilities
├── test/
│   └── HappyPath*.html   # Feature tests
└── color_analysis/       # Color tools
```

## Components

- **Parser System**: Interprets CSSS syntax
- **Function System**: Core CSS function implementations
- **Color System**: Color manipulation and palette generation
- **Engine**: Converts CSSS to standard CSS

## Browser Support

CSSS works in modern browsers that support CSS Custom Properties and other modern CSS features.

## Documentation

For a comprehensive reference of all properties and syntax patterns, see the CSS$ Properties Reference.
