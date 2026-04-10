**description:**
An example demonstrating border width using calc subtraction with a css variable.
**csss:**
```csss
$border(3px---bob)
```
**css:**
```css
.\$border\(3px---bob\) {
  border-width: calc(3px - var(--bob));
}
```
**description:**
An example demonstrating border width using css variable with 2px fallback.
**csss:**
```csss
$border(--bob??2px)
```
**css:**
```css
.\$border\(--bob\?\?2px\) {
  border-width: var(--bob,2px);
}
```
**description:**
An example demonstrating border width using calc addition with a css variable.
**csss:**
```csss
$border(2px+--bob)
```
**css:**
```css
.\$border\(2px\+--bob\) {
  border-width: calc(2px + var(--bob));
}
```
**description:**
An example demonstrating border width using var + calc addition.
**csss:**
```csss
$border(--bob+2px)
```
**css:**
```css
.\$border\(--bob\+2px\) {
  border-width: calc(var(--bob) + 2px);
}
```
**description:**
An example demonstrating uses css variable with a computed 6px fallback (3px * 2).
**csss:**
```csss
$border(--bob??3px*2)
```
**css:**
```css
.\$border\(--bob\?\?3px\*2\) {
  border-width: var(--bob,6px);
}
```
**description:**
An example demonstrating uses css round() function with a var expression and step.
**csss:**
```csss
$border(round(1.5px+--bob,3vw))
```
**css:**
```css
.\$border\(round\(1\.5px\+--bob\,3vw\)\) {
  border-width: round(1.5px + var(--bob), 3vw);
}
```
