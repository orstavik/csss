**description:**
A frosted glass overlay for a modal background.
**csss:**
```csss
$backdrop(blur(10px))
```
**css:**
```css
.\$backdrop\(blur\(10px\)\) {
  backdrop-filter: blur(10px);
}
```
**description:**
A softly blurred overlay behind a sticky navigation header.
**csss:**
```csss
$backdrop(blur(5px))
```
**css:**
```css
.\$backdrop\(blur\(5px\)\) {
  backdrop-filter: blur(5px);
}
```
**description:**
A custom dimming effect for a hero background image.
**csss:**
```csss
$backdrop(brightness(0.5),"common-filters.svg#filter")
```
**css:**
```css
.\$backdrop\(brightness\(0\.5\)\,\"common-filters\.svg\#filter\"\) {
  backdrop-filter: brightness(0.5) url("common-filters.svg#filter");
}
```
**description:**
A floating action button with a deep, realistic shadow.
**csss:**
```csss
$filter(dropShadow(#red,5px,5px,5px),url("https://example.com/filter"),"#anotherFilter")
```
**css:**
```css
.\$filter\(dropShadow\(\#red\,5px\,5px\,5px\)\,url\(\"https\:\/\/example\.com\/filter\"\)\,\"\#anotherFilter\"\) {
  filter: drop-shadow(5px 5px 5px red) url("https://example.com/filter") url("#anotherFilter");
}
```
**description:**
A complex photo filter combining color adjustments and inversion.
**csss:**
```csss
$filter(blur(5px),brightness(0.5),contrast(200%),grayscale(50%))$filter(invert(100%),opacity(0.5),saturate(200%),sepia(100%),hueRotate(90deg))
```
**css:**
```css
.\$filter\(blur\(5px\)\,brightness\(0\.5\)\,contrast\(200\%\)\,grayscale\(50\%\)\)\$filter\(invert\(100\%\)\,opacity\(0\.5\)\,saturate\(200\%\)\,sepia\(100\%\)\,hueRotate\(90deg\)\) {
  filter: blur(5px) brightness(0.5) contrast(200%) grayscale(50%) invert(100%) opacity(0.5) saturate(200%) sepia(100%) hue-rotate(90deg);
}
```
