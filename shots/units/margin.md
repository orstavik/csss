**description:**
A vertical stack of articles with consistent spacing.
**csss:**
```csss
|*$blockItem(margin(1rem,0))
```
**css:**
```css
.\|\*\$blockItem\(margin\(1rem\,0\)\)>* {
  margin-block: 1rem;
  margin-inline: 0;
}
```
**description:**
A row of action buttons evenly spaced.
**csss:**
```csss
|*$flexItem(margin(1rem))
```
**css:**
```css
.\|\*\$flexItem\(margin\(1rem\)\)>* {
  margin: 1rem;
}
```
**description:**
A featured item in a list with extra breathing room below.
**csss:**
```csss
|.a$flexItem(margin(0,0,2rem))
```
**css:**
```css
.\|\.a\$flexItem\(margin\(0\,0\,2rem\)\)>:where(.a) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```
