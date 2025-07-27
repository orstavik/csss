# Instructions for Converting HTML Test Files to Markdown

## Goal
Convert HTML test files (like `hpBorder.html`) into markdown files (like `hpBorder.md`) with **csss:** and **css:** sections, extracting CSS rules while removing all HTML structure.

## Conversion Steps

### 1. Split Grouped Rules and Add Comments
- Split grouped CSS rules within single `@layer container` blocks into individual `@layer container` blocks
- Split grouped CSS rules within single `@layer items` blocks into individual `@layer items` blocks
- Each CSS rule should get its own separate `@layer` block
- Add a comment above each `@layer` declaration showing the original class name (without escaping)
- Comment format: `/*className*/` using the original unescaped class name

### 2. Extract CSS Rules
- Extract all CSS rules from within `<style>` tags
- Remove the `<style>` and `</style>` wrapper tags
- Keep all `@layer` declarations and their contents
- Preserve all CSS comments, selectors, and properties exactly as they are

### 3. Remove HTML Structure
- Remove all `<test-html>` tags and their attributes
- Remove all HTML content inside test sections (`<main>`, `<div>`, `<button>`, text content, etc.)
- Remove all inline `style` attributes
- Keep only the `<style>` tag contents

### 4. Clean Up and Format
- Remove the global `@layer items, container;` declarations (keep only the individual `@layer container` and `@layer items` blocks)
- Remove empty `@layer items {}` blocks if they contain no rules
- Ensure each CSS rule block is properly separated
- Maintain the existing indentation and formatting

### 5. Convert to Markdown Format
- Transform each CSS rule into a **csss:**/**css:** pair
- Extract the class name from HTML elements (e.g., `class="$border"`) for the **csss:** section
- Format each rule as:
  ```
  **csss:** $className
  **css:**
  ```css
  @layer container {
    .\$className {
      /* CSS properties */
    }
  }
  ```
  ```
- Ensure proper spacing between each **csss:**/**css:** pair

### 6. File Structure
The resulting markdown file should contain:
- **csss:** sections with the original class names (unescaped)
- **css:** sections with individual `@layer container` blocks wrapped in ```css code fences
- Individual `@layer items` blocks (if they contain rules)
- No HTML elements or attributes
- No `<style>` tag wrappers
- No className comments (these are replaced by **csss:** sections)

## Example Transformation

**Before (HTML):**
```html
<test-html title="$border">
  <div class="$border">Solid Border</div>
  <style>
    @layer items, container;

    /*$border*/
    @layer container {
      .\$border {
        border-style: solid;
      }
    }

    @layer items {}
  </style>
</test-html>
```

**After (Markdown):**
```markdown
**csss:** $border
**css:**
```css
@layer container {
  .\$border {
    border-style: solid;
  }
}
```
```

## Key Rules
1. **Preserve all CSS rules exactly** - don't modify selectors, properties, or values
2. **Remove all HTML** - no HTML elements should remain
3. **Keep CSS structure** - maintain `@layer` organization within code fences
4. **Remove empty blocks** - eliminate empty `@layer items {}` blocks
5. **Clean formatting** - ensure consistent indentation and spacing
6. **Markdown structure** - use **csss:** and **css:** headers with proper code fencing
7. **Code fences** - wrap all CSS content in ```css blocks
