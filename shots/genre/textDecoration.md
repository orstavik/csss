**description:** Applies dotted overline, underline and line-through in green with no skip-ink.
**userInstruction:** Apply a green dotted overline, underline, and line-through with no ink skipping to highlight this specific text.
**before:**
```html
…<span>…</span>…
```
**after:**
```html
…<span class="$textDecoration(dotted,over,under,through,#green,2px,noSkipInk)">…</span>…
```
**css:**
```css
.\$textDecoration\(dotted\,over\,under\,through\,\#green\,2px\,noSkipInk\) {
  text-decoration: dotted overline underline line-through green 2px;
  text-decoration-skip-ink: none;
}
```

**description:** Applies dashed red overline with auto skip-ink.
**userInstruction:** Change the existing solid border top into a dashed red overline to match the new alert design.
**before:**
```html
…<span class="$Border(1px,solid,#black,0,0,0,1px)">…</span>…
```
**after:**
```html
…<span class="$textDecoration(dashed,over,#red)">…</span>…
```
**css:**
```css
.\$textDecoration\(dashed\,over\,\#red\) {
  text-decoration: dashed overline red;
  text-decoration-skip-ink: auto;
}
```

**description:** Removes all text decoration from the element.
**userInstruction:** The link inside the navigation bar shouldn't have the default browser underline. Override it to remove the text decoration.
**before:**
```html
…<a href="...">…</a>…
```
**after:**
```html
…<a href="..." class="$textDecorationNone">…</a>…
```
**css:**
```css
.\$textDecorationNone {
  text-decoration: none;
  text-decoration-skip-ink: auto;
}
```
