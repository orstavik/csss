## Each test should look like:

**description:** A brief explanation of what the CSSS transformation does.
**userInstruction:** A natural language instruction that motivates the transformation from the before state to the after state.
**before:** An HTML snippet showing the state of the code before the CSSS transformation.
**after:** An HTML snippet showing the state of the code after the CSSS transformation, with the CSSS string applied in the appropriate place.
**css:** A CSS snippet showing the compiled CSS that corresponds to the CSSS string used in the after HTML snippet.

## Background for the change from before to after:

The following list illustrates the rationale behind the transformation from the before state to the after state, which can be used as a reference for understanding the intent of the change:

1. Greenfield Addition: Starting from raw HTML and applying initial CSSS styling (e.g. `…<section>…</section>…` -> `…<section class="$Border(2px,solid,#green)">…</section>…`).
2. Syntax Optimization/Refactoring: The developer wrote functional but suboptimal code (e.g., combining multiple $border droplets into a single $Border umbrella, or changing none to 0 for border widths).
3. Fixing CSSS Semantic Errors: Correcting the misuse of tools, such as accidentally using an umbrella class ($Border) inside a state modifier like :hover or .active, and replacing it with a droplet ($border) to avoid resetting other properties.
4. Feature Requests/Tweaks: Modifying existing styles based on a new requirement (e.g., removing a border but keeping/adding a radius).
5. Adding Interactive States: Extending an already-styled element with new interactions (e.g., adding :focus or :disabled states to an element that already has base styling).
6. Contextual Overrides: Realizing an inherited or global style needs an exception (e.g., adding a specific $border to a child element to override the parent's |$Border).
7. Design Tweaks/Magic Number Elimination: Changing hardcoded pixel values to relative units (e.g., changing px to rem or vh for better responsiveness).
8. Adding Responsive/Media States: Adding a state for a different screen size (if applicable in CSSS, e.g., changing a layout on mobile vs desktop).
9. Theme Adjustments: Adding dark mode or specific theme overrides (e.g., changing a color for .dark-theme).
10. Removing Obsolete Styles: A before state that has too much styling, where the instruction is to strip it back or simplify it.
11. Layout Bug Fixes: A before state where a float or clear is missing, causing a layout break, and the instruction is to fix the layout issue.
12. Accessibility Improvements: Ensuring better contrast or clearer focus states.


## Font

I need you to update shots/genre/font.md

1. read the shots/genre/AGENTS.md for a description of the output format.

The examples of $font/$Font/$Typeface are not realistic now. The idea is that:

1. we set a series of $Typeface(...) in the <body element class. These entities essentially establishes a set of $font variables. The $Typeface() can also be used to load @font-face definitions. We might for example set a typeface for body copy text, legal print, headers, buttons/uix etc.
2. Then, on branches of DOM, we apply those $Typefaces. These then rain down into the branches. The $Font sets all the $font properties, so we don't have to worry about leaking inheritance from above. Commonly, the $Font(body) is set on the <body, and this is the default font in the document. But it doesn't have to be like that.
3. If we need a new $Font on an element, such as a header or note inside the branch, we can either use a new $Font on a sub branch. Or just override individual properties using $font(..)