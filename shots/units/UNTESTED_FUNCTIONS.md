# Untested CSSS Functions Report

## Summary
This document lists all CSSS functions used in the demo files (`nepal.html`, `hero-simple.html`, `hero-no-palette.html`) that were **NOT** covered by existing unit tests.

## Previously Untested Functions (Now Added to `untested.md`)

### 1. **`$opacity()`**

- **Usage:** `$opacity(0.5)`, `$opacity(0.95)`, `$opacity(0.1)`
- **Purpose:** Sets element opacity
- **Examples in demos:**
  - `nepal.html`: `$opacity(0.1)` for background pattern
  - `nepal.html`: `$opacity(0.95)` for subtitle

### 2. **`$circle()`**
- **Usage:** `$circle(at(x,y),color1,color2)`
- **Purpose:** Creates radial gradient backgrounds
- **Examples in demos:**
  - `nepal.html`: `$circle(at(20%,30%),#rgba(255,255,255,0.1),#transparent)`

### 3. **`$textShadow()`**
- **Usage:** `$textShadow(x,y,blur,color)`
- **Purpose:** Adds shadow to text
- **Examples in demos:**
  - `nepal.html`: `$textShadow(0,4px,8px,#rgba(0,0,0,0.3))`

### 4. **`$lineHeight()`**
- **Usage:** `$lineHeight(value)`
- **Purpose:** Sets line height for text
- **Examples in demos:**
  - `nepal.html`: `$lineHeight(1.6)`
  - `hero-simple.html`: `$lineHeight(1.1)`

### 5. **`$border()`**
- **Usage:** `$border(width,style,color,radius(value))` or `$border(radius(value))`
- **Purpose:** Sets border properties including radius
- **Examples in demos:**
  - `nepal.html`: `$border(none,radius(50px))`, `$border(2px,solid,white,radius(50px))`, `$border(radius(12px))`
  - `hero-simple.html`: `$border(radius(70px,70px,20px,20px))`, `$border(12px,solid,#secondary)`
  - Note: Border radius with multiple values like `$border(radius(70px,70px,20px,20px))`

### 6. **`$cursor()`**
- **Usage:** `$cursor(type)`
- **Purpose:** Sets cursor type
- **Examples in demos:**
  - `nepal.html`: `$cursor(pointer)`
  - `hero-simple.html`: `$cursor(pointer)`

### 7. **`$textTransform()`**
- **Usage:** `$textTransform(type)`
- **Purpose:** Transforms text case
- **Examples in demos:**
  - `nepal.html`: `$textTransform(uppercase)`

### 8. **`$zIndex()`**
- **Usage:** `$zIndex(value)`
- **Purpose:** Sets stacking order
- **Examples in demos:**
  - `nepal.html`: `$zIndex(2)`

### 9. **`$palette()`**
- **Usage:** `$palette(name,baseColor,textColor)`
- **Purpose:** Creates a color palette with auto-generated variations
- **Examples in demos:**
  - `hero-simple.html`: `$palette(primary,#ff5470,#ffffff)`, `$palette(secondary,#ffaac2,#333333)`, `$palette(accent,#d0e8f0,#333333)`
- **Generated Variables:**
  - `--color-{name}` (base color)
  - `--color-on{Name}` (text color)
  - `--color-{name}Pop` (120% mix with white)
  - `--color-{name}Accent` (80% mix with white)
  - `--color-{name}Bland` (40% mix with white)
  - `--color-{name}Neutral` (20% mix with white)

## Functions Already Tested

The following functions were already covered by existing unit tests:

- ✅ `$typeface()` - font.md
- ✅ `$block()` - blockContainer.md, blockCombined.md
- ✅ `$blockItem()` - blockItem.md
- ✅ `$linear()` - gradientFunctions.md
- ✅ `$color()` - colorSpaces.md
- ✅ `$absolute()` - position.md
- ✅ `$relative` - position.md
- ✅ `$font()` - font.md
- ✅ `$easeIn()` - transitions.md
- ✅ `$flex()` - flexContainer.md, flexCombined.md
- ✅ `$bg()` - colorSpaces.md
- ✅ `$boxShadow()` - boxShadow.md
- ✅ `$translateY()` - transforms.md
- ✅ `$grid()` - gridContainer.md, gridCombined.md
- ✅ `$backdropBlur()` - backdropFilters.md
- ✅ `$rotate()` - transforms.md

## Test Coverage Added

All previously untested functions have been added to `shots/units/untested.md` with comprehensive test cases including:
- Multiple variations of each function
- Edge cases (e.g., different radius combinations for `$border()`)
- Real-world usage examples from the demo files
- Proper CSS output expectations

The test file has been integrated into the test suite by updating `shots/units/index.html`.

## Usage Statistics

**Total unique CSSS functions in demo files:** 25
**Previously tested:** 16 (64%)
**Previously untested:** 9 (36%)
**Now tested:** 25 (100%)

