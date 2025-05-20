# CSSS (CSS Shorts)

A lightweight CSS preprocessor that enables writing concise, expressive CSS directly in your HTML using shorthand syntax.

## Quick Start

```bash
npx http-server -p 3003 --cors
```

Then go to: (http://127.0.0.1:3003/test)[http://127.0.0.1:3003/test]

## About CSSS

CSSS (CSS Shorts) is a CSS preprocessor engine that introduces two main concepts for simplified CSS authoring:

1. **Dollar Shorts**: Shorthand syntax patterns that start with `$`. These provide concise, expressive ways to write common CSS patterns, either built-in or custom-defined in JavaScript.
   
2. **Custom Style Groups (JS Registered)**: Define reusable sets of styles in JavaScript using `registerShort()`. This is the modern way to create components or complex aliases (effectively replacing legacy "Supershorts").

(A legacy "Supershorts" system using `=` in CSSS to define aliases also existed but is now deprecated.)

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
<div class="$block(s,gap(0.3em,1em)) |*$_block(indent(15%))">
  <p>This paragraph will have 15% text indentation</p>
</div>
```

### Color System

Define and use color schemes by generating CSS custom properties with `$gradient` or `$popGradient`, then apply them using shorts like `$color`, `$bg`, etc.

```html
<body class="$gradient(theme, #14a69b, white)">
  <div class="$bg(#theme10) $color(#theme90) $border(solid,2px,#theme50)">
    <div class="$color(#theme70)">Text using a theme color variant.</div>
  </div>
</body>
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

### Custom Style Groups (JavaScript Registration)

Define your own reusable combinations of styles in JavaScript for more power and flexibility.

```javascript
// Example: Registering a custom button style in your project's JS
// import { registerShort } from '/src/engine.js'; 
// registerShort('myButton', () => ({
//   padding: '1rem 2rem',
//   border: 'solid 2px blue',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center'
// }));
```

Usage in HTML:
```html
<button class="$myButton">Styled Button</button>
```

(Previously, a CSS-based syntax with `=` was used for "Supershorts", but the JavaScript approach is now recommended.)

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
