**description:**
A layout container with dotted overline, underline and line-through in green with no skip-ink.
**csss:**
```csss
$textDecoration(dotted,over,under,through,#green,2px,noSkipInk)
```
**css:**
```css
.\$textDecoration\(dotted\,over\,under\,through\,\#green\,2px\,noSkipInk\) {
  text-decoration: dotted overline underline line-through green 2px;
  text-decoration-skip-ink: none;
}
```
**description:**
A layout container with dashed red overline with auto skip-ink.
**csss:**
```csss
$textDecoration(dashed,over,#red)
```
**css:**
```css
.\$textDecoration\(dashed\,over\,\#red\) {
  text-decoration: dashed overline red;
  text-decoration-skip-ink: auto;
}
```
**description:**
An example demonstrating removes all text decoration from the element.
**csss:**
```csss
$textDecorationNone
```
**css:**
```css
.\$textDecorationNone {
  text-decoration: none;
  text-decoration-skip-ink: auto;
}
```
