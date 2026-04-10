**description:**
A UI component with 1rem gap and padding on a flex container.
**csss:**
```csss
$flex(gap(1rem),padding(1rem))
```
**css:**
```css
.\$flex\(gap\(1rem\)\,padding\(1rem\)\) {
  padding: 1rem;
  gap: 1rem;
}
```
**description:**
An example demonstrating adds 0.5rem margin on all direct flex children.
**csss:**
```csss
|*$flexItem(margin(0.5rem))
```
**css:**
```css
.\|\*\$flexItem\(margin\(0\.5rem\)\)>* {
  margin: 0.5rem;
}
```
**description:**
An example demonstrating adds 1rem margin on all grandchildren (children of children).
**csss:**
```csss
|*|*$blockItem(margin(1rem))
```
**css:**
```css
.\|\*\|\*\$blockItem\(margin\(1rem\)\)>*>* {
  margin: 1rem;
}
```
**description:**
An example demonstrating targets .child grandchild inside .item child with empty block item.
**csss:**
```csss
|.item|.child$blockItem()
```
**css:**
```css
.\|\.item\|\.child\$blockItem\(\)>:where(.item)>:where(.child) {

}
```
**description:**
An example demonstrating adds 2rem margin on all grandchildren via default grand items layer.
**csss:**
```csss
||$blockItem(margin(2rem))
```
**css:**
```css
.\|\|\$blockItem\(margin\(2rem\)\)>*>* {
  margin: 2rem;
}
```
**description:**
An example demonstrating creates 2-column grid with 1rem gap.
**csss:**
```csss
$grid(cols(repeat(2,1fr)),gap(1rem))
```
**css:**
```css
.\$grid\(cols\(repeat\(2\,1fr\)\)\,gap\(1rem\)\) {
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
```
**description:**
A UI component with 50x50px size on all grid grandchildren.
**csss:**
```csss
|*|*$box(50px,50px)
```
**css:**
```css
.\|\*\|\*\$box\(50px\,50px\)>*>* {
  inline-size: 50px;
  block-size: 50px;
}
```
