**description:** Rotates the element 45 degrees clockwise.
**userInstruction:** The design team requested a tweak to make the status badge angled; add a 45-degree rotation to the existing styling.
**before:**
```html
<span>New</span>
```
**after:**
```html
<span class="$rotate(45deg)">New</span>
```
**css:**
```css
.\$rotate\(45deg\) {
  rotate: 45deg;
}
```

**description:** Scales the element to 30% width and 15% height.
**userInstruction:** The globally inherited logo styling makes it appear too large in the footer context; override it by explicitly squashing this instance down to 30% width and 15% height.
**before:**
```html
<div class="footer">
  <img src="logo.png" class="logo $scale(100%,100%)" alt="Logo">
</div>
```
**after:**
```html
<div class="footer">
  <img src="logo.png" class="logo $scale(30%,15%)" alt="Logo">
</div>
```
**css:**
```css
.\$scale\(30\%\,15\%\) {
  scale: 30% 15%;
}
```

**description:** Scales the element uniformly to 30%.
**userInstruction:** Simplify the overloaded hero graphic styling by removing the unnecessary translation and rotation offsets, stripping it back to just the 30% uniform scale.
**before:**
```html
<div class="$scale(30%) $translate(50px) $rotate(10deg)"></div>
```
**after:**
```html
<div class="$scale(30%)"></div>
```
**css:**
```css
.\$scale\(30\%\) {
  scale: 30%;
}
```

**description:** Translates and rotates the element in a single transform for the active photo.
**userInstruction:** Eliminate the hardcoded vertical pixel translation on the polaroid to improve responsiveness, replacing the 25px magic number with a 5% relative unit while maintaining the horizontal nudge and rotation.
**before:**
```html
<div class=".active$translate(10px,25px) $rotate(15deg)">
  <img src="photo.jpg" alt="Photo">
</div>
```
**after:**
```html
<div class=".active$translate(10px,5%)$rotate(15deg)">
  <img src="photo.jpg" alt="Photo">
</div>
```
**css:**
```css
.\.active\$translate\(10px\,5\%\)\$rotate\(15deg\):where(.active) {
  translate: 10px 5%;
  rotate: 15deg;
}
```

**description:** Chained translate, rotate and matrix transforms together.
**userInstruction:** Layout bug fix. The decorative graphic is breaking the layout because it lacks a necessary structural matrix transformation; append the matrix transform to fix the alignment while preserving the existing translate and rotate.
**before:**
```html
<div class="decorative-container">
  <div class="$translate(10px,5%)$rotate(15deg)"></div>
</div>
```
**after:**
```html
<div class="decorative-container">
  <div class="$translate(10px,5%)$rotate(15deg)$transform(matrix(1,2,3,4,5,6.6))"></div>
</div>
```
**css:**
```css
.\$translate\(10px\,5\%\)\$rotate\(15deg\)\$transform\(matrix\(1\,2\,3\,4\,5\,6\.6\)\) {
  translate: 10px 5%;
  rotate: 15deg;
  transform: matrix(1, 2, 3, 4, 5, 6.6);
}
```

**description:** Chains 3D scale, rotate and translate transforms together.
**userInstruction:** Optimize the developer's functional but suboptimal syntax by replacing the verbose raw `$transform` string with dedicated, chained 3D scale, rotate, and translate CSSS functions.
**before:**
```html
<div class="scene">
  <div class="object-3d $transform(scale3d(1,2,3) rotate3d(1,2,3,15deg) translate3d(10px,5%,10px))"></div>
</div>
```
**after:**
```html
<div class="scene">
  <div class="object-3d $scale(1,2,3)$rotate(1,2,3,15deg)$translate(10px,5%,10px)"></div>
</div>
```
**css:**
```css
.\$scale\(1\,2\,3\)\$rotate\(1\,2\,3\,15deg\)\$translate\(10px\,5\%\,10px\) {
  scale: 1 2 3;
  rotate: 1 2 3 15deg;
  translate: 10px 5% 10px;
}
```