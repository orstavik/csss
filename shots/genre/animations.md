**description:** Cycles through three different scales using mismatched time/value vectors, creating a complex heartbeat.
**userInstruction:**
Removing Obsolete Styles: The 'Live' indicator has leftover complex separate keyframes for scaling. Clean it up into a single looping vector that scales up and back down.
**before:**
```html
…<span class="live-dot pulse-anim scale-reset"></span>…
```
**after:**
```html
…<span class="live-dot $animate(infinite,0s>1s>1s)$scale(1>1.2>1)"></span>…
```
**css:**
```css
@keyFrames a_0_scale_1 {
  0%, 50%, 100% {
    scale: 1;
  }
}

.\$animate\(infinite\,0s\>1s\>1s\)\$scale\(1\>1\.2\>1\) {
  animation: 2000ms 0ms infinite a_0_scale_1;
}
```

**description:** Shakes an input field exactly 3 times when a validation error occurs, starting with a backwards fill mode.
**userInstruction:**
Interaction Update: When the input fails validation, apply a quick horizontal shake animation that repeats exactly 3 times and returns to its original position.
**before:**
```html
…<input type="text" class="error-shake" />…
```
**after:**
```html
…<input type="text" class="$animate(backwards,3,0s>100ms>200ms>300ms)$translate(0px>10px>-10px>0px)" />…
```
**css:**
```css
@keyFrames a_0_translate_0px {
  0%, 17%, 50%, 100% {
    translate: 0px;
  }
}

.\$animate\(backwards\,3\,0s\>100ms\>200ms\>300ms\)\$translate\(0px\>10px\>-10px\>0px\) {
  animation: 600ms 0ms backwards 3 a_0_translate_0px;
}
```

**description:** Creates a spinning loading indicator that rotates indefinitely.
**userInstruction:**
Syntax Optimization/Refactoring: The developer wrote custom keyframes in a separate stylesheet for a spinning loader. Refactor this to use CSSS for better maintainability.
**before:**
```html
…<div class="spinner-legacy"></div>…
```
**after:**
```html
…<div class="spinner $animate(linear,infinite,0s>1s)$rotate(0deg>360deg)"></div>…
```
**css:**
```css
@keyFrames a_0_rotate_0deg_100_rotate_360deg {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

.\$animate\(linear\,infinite\,0s\>1s\)\$rotate\(0deg\>360deg\) {
  animation: linear 1000ms 0ms infinite a_0_rotate_0deg_100_rotate_360deg;
}
```

**description:** Animates a bouncing notification badge that hops up and down.
**userInstruction:** Feature Requests: Make the static notification badge bounce to attract attention.
**before:**
```html
…<div class="badge"></div>…
```
**after:**
```html
…<div class="badge $animate(alternate,infinite,0s>0.5s)$translate(0px,0px>-10px)"></div>…
```
**css:**
```css
@keyFrames a_0_translate_0px_0px_100_translate_0px_-10px {
  0% {
    translate: 0px 0px;
  }
  100% {
    translate: 0px -10px;
  }
}

.\$animate\(alternate\,infinite\,0s\>0\.5s\)\$translate\(0px\,0px\>-10px\) {
  animation: alternate 500ms 0ms infinite a_0_translate_0px_0px_100_translate_0px_-10px;
}
```

**description:** Fades in a modal dialog gracefully over 300 milliseconds.
**userInstruction:**
Syntax Optimization/Refactoring: The modal has a CSS transition but requires JS to toggle a class for it to fade in. Change it to an animation so it plays automatically on mount.
**before:**
```html
…<dialog class="$transition(fadeIn,1s,1s,transform,opacity)" open>…</dialog>…
```
**after:**
```html
…<dialog class="$animate(0s>300ms)$opacity(0>1)" open>…</dialog>…
```
**css:**
```css
@keyFrames a_0_opacity_0_100_opacity_1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.\$animate\(0s\>300ms\)\$opacity\(0\>1\) {
  animation: 300ms 0ms a_0_opacity_0_100_opacity_1;
}
```

**description:** Creates a pulsing heartbeat effect on a call-to-action button to encourage clicks.
**userInstruction:** Feature Requests: Add a subtle pulsing scale animation to the CTA button to draw user focus.
**before:**
```html
…<button>Subscribe</button>…
```
**after:**
```html
…<button class="$animate(easeInOut,alternate,infinite,0s>1s)$scale(1>1.05)">Subscribe</button>…
```
**css:**
```css
@keyFrames a_0_scale_1_100_scale_1\.05 {
  0% {
    scale: 1;
  }
  100% {
    scale: 1.05;
  }
}

.\$animate\(easeInOut\,alternate\,infinite\,0s\>1s\)\$scale\(1\>1\.05\) {
  animation: ease-in-out alternate 1000ms 0ms infinite a_0_scale_1_100_scale_1\.05;
}
```

**description:** Slides a side menu in from off-screen left over half a second.
**userInstruction:**
Layout Bug Fixes: The sidebar slide-in animation is using negative margins which is causing layout reflows. Refactor it to use translate.
**before:**
```html
…<nav class="sidebar" style="animation: slideMargin 0.5s ease-out forwards;">…</nav>…
```
**after:**
```html
…<nav class="sidebar $animate(easeOut,0s>0.5s)$translate(-100%>0%)">…</nav>…
```
**css:**
```css
@keyFrames a_0_translate_-100\%_100_translate_0\% {
  0% {
    translate: -100%;
  }
  100% {
    translate: 0%;
  }
}

.\$animate\(easeOut\,0s\>0\.5s\)\$translate\(-100\%\>0\%\) {
  animation: ease-out 500ms 0ms a_0_translate_-100\%_100_translate_0\%;
}
```

**description:** Flashes a warning alert background color between yellow and transparent to signal an error.
**userInstruction:**
Syntax Optimization/Refactoring: The alert is flashing because JS is toggling a background class every second. Move this to a pure CSSS animation.
**before:**
```html
…<div class="alert js-flash-interval">Warning: Disk space low</div>…
```
**after:**
```html
…<div class="alert $animate(alternate,infinite,0s>1s)$Bg(#yellow>#transparent)">Warning: Disk space low</div>…
```
**css:**
```css
@keyFrames a_0_backgroundColor_yellow_background_none_backgroundBlendMode_normal_100_backgroundColor_transparent_background_none_backgroundBlendMode_normal {
  0% {
    background-color: yellow;
    background: none;
    background-blend-mode: normal;
  }
  100% {
    background-color: transparent;
    background: none;
    background-blend-mode: normal;
  }
}

.\$animate\(alternate\,infinite\,0s\>1s\)\$Bg\(\#yellow\>\#transparent\) {
  animation: alternate 1000ms 0ms infinite a_0_backgroundColor_yellow_background_none_backgroundBlendMode_normal_100_backgroundColor_transparent_background_none_backgroundBlendMode_normal;
}
```

**description:** Combines fade in and slide up to create a dramatic entrance for a hero text element.
**userInstruction:**
Syntax Optimization/Refactoring: Consolidate the two separate animations (fade-in and slide-up) into a single `$animate` declaration to apply them synchronously to the hero text.
**before:**
```html
…<h1 class="$animate(0s>1s)$opacity(0>1) $animate(0s>1s)$translate(0px,20px>0px)">Welcome to the App</h1>…
```
**after:**
```html
…<h1 class="$animate(0s>1s)$opacity(0>1)$translate(0px,20px>0px)">Welcome to the App</h1>…
```
**css:**
```css
@keyFrames a_0_opacity_0_100_opacity_1 {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyFrames a_0_translate_0px_20px_100_translate_0px_0px {
  0% {
    translate: 0px 20px;
  }
  100% {
    translate: 0px 0px;
  }
}

.\$animate\(0s\>1s\)\$opacity\(0\>1\)\$translate\(0px\,20px\>0px\) {
  animation: 1000ms 0ms a_0_opacity_0_100_opacity_1, 1000ms 0ms a_0_translate_0px_20px_100_translate_0px_0px;
}
```

**description:** Animates an element filling with color permanently by using the forwards fill mode.
**userInstruction:**
Syntax Optimization/Refactoring: We use a JS timeout to append an 'is-green' class after 2 seconds. Replace it by using the 'forwards' mode to fill the state natively with CSS.
**before:**
```html
…<div class="success-msg">Action completed!</div>…
```
**after:**
```html
…<div class="success-msg $animate(forwards,0s>2s)$Bg(#transparent>#lightgreen)">Action completed!</div>…
```
**css:**
```css
@keyFrames a_0_backgroundColor_transparent_background_none_backgroundBlendMode_normal_100_backgroundColor_lightgreen_background_none_backgroundBlendMode_normal {
  0% {
    background-color: transparent;
    background: none;
    background-blend-mode: normal;
  }
  100% {
    background-color: lightgreen;
    background: none;
    background-blend-mode: normal;
  }
}

.\$animate\(forwards\,0s\>2s\)\$Bg\(\#transparent\>\#lightgreen\) {
  animation: 2000ms 0ms forwards a_0_backgroundColor_transparent_background_none_backgroundBlendMode_normal_100_backgroundColor_lightgreen_background_none_backgroundBlendMode_normal;
}
```

**description:** Animates an image translating diagonally across multiple keyframes.
**userInstruction:**
Syntax Optimization/Refactoring: The cloud icon is moved using JS updating `style="transform: translate(...)"` in steps. Turn this into a CSSS animation spanning 4 seconds.
**before:**
```html
…<img src="cloud.svg" style="transform: translate(50px, 20px);">…
```
**after:**
```html
…<img src="cloud.svg" class="$animate(0s>2s>4s)$translate(0px>40px,0px>50px,20px>100px)">…
```
**css:**
```css
@keyFrames a_0_translate_0px_0px_20px_33_translate_40px_50px_100px {
  0%, 100% {
    translate: 0px 0px 20px;
  }
  33% {
    translate: 40px 50px 100px;
  }
}

.\$animate\(0s\>2s\>4s\)\$translate\(0px\>40px\,0px\>50px\,20px\>100px\) {
  animation: 6000ms 0ms a_0_translate_0px_0px_20px_33_translate_40px_50px_100px;
}
```

**description:** Creates a custom stepped rotation for a cogwheel icon, rotating backwards.
**userInstruction:**
Feature Requests: Make the cog icon spin in a reverse direction using discrete steps to look like a mechanical clockwork gear.
**before:**
```html
…<div class="cog"></div>…
```
**after:**
```html
…<div class="cog $animate(reverse,steps(8,end),infinite,0s>2s)$rotate(0deg>360deg)"></div>…
```
**css:**
```css
@keyFrames a_0_rotate_0deg_100_rotate_360deg {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

.\$animate\(reverse\,steps\(8\,end\)\,infinite\,0s\>2s\)\$rotate\(0deg\>360deg\) {
  animation: steps(8, end) reverse 2000ms 0ms infinite a_0_rotate_0deg_100_rotate_360deg;
}
```

**description:**
An elaborate loading sequence combining mismatched vectors, math expressions in transforms, and a custom cubic-bezier timing.
**userInstruction:**
Contextual Overrides: The skeleton loader needs an intricate shimmer and scale effect. Combine a delayed opacity pulse with a scaling animation that uses math to offset the size, and a highly custom timing curve to make it look organic. Let's make it repeat infinitely in alternate-reverse.
**before:**
```html
…<div class="skeleton-card"></div>…
```
**after:**
```html
…<div class="skeleton-card $animate(alternateReverse,both,infinite,cubicBezier(0.25,0.1,0.25,1),500ms>1s>1s>1s)$opacity(0.3>1)$scale(1>1+0.05>1.1)"></div>…
```
**css:**
```css
@keyFrames a_0_opacity_0.3_33_opacity_1 {
  0%, 66% {
    opacity: 0.3;
  }
  33%, 100% {
    opacity: 1;
  }
}

@keyFrames a_0_scale_1_33_scale_1\.1 {
  0%, 66% {
    scale: 1;
  }
  33%, 100% {
    scale: 1.1;
  }
}

.\$animate\(alternateReverse\,both\,infinite\,cubicBezier\(0\.25\,0\.1\,0\.25\,1\)\,500ms\>1s\>1s\>1s\)\$opacity\(0\.3\>1\)\$scale\(1\>1\+0\.05\>1\.1\) {
  animation: cubic-bezier(0.25,0.1,0.25,1) alternate-reverse 3000ms 500ms both infinite a_0_opacity_0.3_33_opacity_1, cubic-bezier(0.25,0.1,0.25,1) alternate-reverse 3000ms 500ms both infinite a_0_scale_1_33_scale_1\.1;
}
```