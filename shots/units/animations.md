**description:**
Animates translate y from -20px to 20px in infinite alternate loop.
**csss:**
 $animate(alternate,infinite,0s>10s)$translate(0px,-20px>20px)
**css:**
```css
@keyFrames a0_translate_0px_-20px_100_translate_0px_20px {
  0% {
    translate: 0px -20px;
  }
  100% {
    translate: 0px 20px;
  }
}

.\$animate\(alternate\,infinite\,0s\>10s\)\$translate\(0px\,-20px\>20px\) {
  animation: alternate 10000 infinite a0_translate_0px_-20px_100_translate_0px_20px;
}
```

**description:**
Animates translate x from 0px to 100px over 2000 milliseconds.
**csss:**
 $animate(0s>2000ms)$translate(0px>100px)
**css:**
```css
@keyFrames a0_translate_0px_100_translate_100px {
  0% {
    translate: 0px;
  }
  100% {
    translate: 100px;
  }
}

.\$animate\(0s\>2000ms\)\$translate\(0px\>100px\) {
  animation: 2000 a0_translate_0px_100_translate_100px;
}
```

**description:**
Animates opacity from 1 down to 0.3 over 3 seconds.
**csss:**
 $animate(0s>3s)$opacity(1>0.3)
**css:**
```css
@keyFrames a0_opacity_1_100_opacity_0\.3 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}

.\$animate\(0s\>3s\)\$opacity\(1\>0\.3\) {
  animation: 3000 a0_opacity_1_100_opacity_0\.3;
}
```

**description:**
Animates scale from 1 up to 1.5 over 4000 milliseconds.
**csss:**
 $animate(0s>4000ms)$scale(1>1.5)
**css:**
```css
@keyFrames a0_scale_1_100_scale_1\.5 {
  0% {
    scale: 1;
  }
  100% {
    scale: 1.5;
  }
}

.\$animate\(0s\>4000ms\)\$scale\(1\>1\.5\) {
  animation: 4000 a0_scale_1_100_scale_1\.5;
}
```

**description:**
Animates rotation from 0deg to 180deg over 5 seconds.
**csss:**
 $animate(0s>5s)$rotate(0deg>180deg)
**css:**
```css
@keyFrames a0_rotate_0deg_100_rotate_180deg {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 180deg;
  }
}

.\$animate\(0s\>5s\)\$rotate\(0deg\>180deg\) {
  animation: 5000 a0_rotate_0deg_100_rotate_180deg;
}
```

**description:**
Runs three simultaneous animations: fade in, scale up and slide up.
**csss:**
 $animate(0s>6s)$opacity(0.3>1)$scale(0.8>1.2)$translate(0px,30px>0px)
**css:**
```css
@keyFrames a0_opacity_0\.3_100_opacity_1 {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}

@keyFrames a0_scale_0\.8_100_scale_1\.2 {
  0% {
    scale: 0.8;
  }
  100% {
    scale: 1.2;
  }
}

@keyFrames a0_translate_0px_30px_100_translate_0px_0px {
  0% {
    translate: 0px 30px;
  }
  100% {
    translate: 0px 0px;
  }
}

.\$animate\(0s\>6s\)\$opacity\(0\.3\>1\)\$scale\(0\.8\>1\.2\)\$translate\(0px\,30px\>0px\) {
  animation: 6000 a0_opacity_0\.3_100_opacity_1, 6000 a0_scale_0\.8_100_scale_1\.2, 6000 a0_translate_0px_30px_100_translate_0px_0px;
}
```

**description:**
Animates translate x from 0px+1px to 30px*2 over 2 seconds.
**csss:**
 $animate(0>2s)$translate(0px+1px>30px*2)
**css:**
```css
@keyFrames a0_translate_1px_100_translate_60px {
  0% {
    translate: 1px;
  }
  100% {
    translate: 60px;
  }
}

.\$animate\(0\>2s\)\$translate\(0px\+1px\>30px\*2\) {
  animation: 2000 a0_translate_1px_100_translate_60px;
}
```

**description:**
Animates translate y while leaving x unchanged.
**csss:**
 $animate(0>2s)$translate(4px,0px+1px>30px*2)
**css:**
```css
@keyFrames a0_translate_4px_1px_100_translate_4px_60px {
  0% {
    translate: 4px 1px;
  }
  100% {
    translate: 4px 60px;
  }
}

.\$animate\(0\>2s\)\$translate\(4px\,0px\+1px\>30px\*2\) {
  animation: 2000 a0_translate_4px_1px_100_translate_4px_60px;
}
```

**description:** Animates opacity with 'forwards' fill mode so the final state is retained.
**csss:**  $animate(forwards,0s>2s)$opacity(0>1)
**css:**
```css
@keyFrames a0_opacity_0_100_opacity_1_ {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.\$animate\(forwards\,0s\>2s\)\$opacity\(0\>1\) {
  animation: 2000 forwards a0_opacity_0_100_opacity_1_;
}
```

**description:** Animates opacity with 'backwards' fill mode so the initial state is applied before the animation starts.
**csss:**  $animate(backwards,0s>2s)$opacity(0>1)
**css:**
```css
@keyFrames a0_opacity_0_100_opacity_1_ {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.\$animate\(backwards\,0s\>2s\)\$opacity\(0\>1\) {
  animation: 2000 backwards a0_opacity_0_100_opacity_1_;
}
```

**description:** Animates opacity with 'both' fill mode combining forwards and backwards behavior.
**csss:**  $animate(both,0s>2s)$opacity(0>1)
**css:**
```css
@keyFrames a0_opacity_0_100_opacity_1_ {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.\$animate\(both\,0s\>2s\)\$opacity\(0\>1\) {
  animation: 2000 both a0_opacity_0_100_opacity_1_;
}
```

**description:** Animates rotation in 'reverse' direction.
**csss:**  $animate(reverse,0s>2s)$rotate(0deg>90deg)
**css:**
```css
@keyFrames a0_rotate_0deg_100_rotate_90deg_ {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 90deg;
  }
}

.\$animate\(reverse\,0s\>2s\)\$rotate\(0deg\>90deg\) {
  animation: reverse 2000 a0_rotate_0deg_100_rotate_90deg_;
}
```

**description:** Animates rotation in 'alternate-reverse' direction.
**csss:**  $animate(alternate-reverse,0s>2s)$rotate(0deg>90deg)
**css:** ```css

```

**description:** Animates scale exactly 3 times.
**csss:**  $animate(3,0s>1s)$scale(1>2)
**css:**
```css
@keyFrames a0_scale_1_100_scale_2_ {
  0% {
    scale: 1;
  }
  100% {
    scale: 2;
  }
}

.\$animate\(3\,0s\>1s\)\$scale\(1\>2\) {
  animation: 1000 3 a0_scale_1_100_scale_2_;
}
```

**description:** Animates translation using the native ease-in-out timing function.
**csss:**  $animate(easeInOut,0s>1s)$translate(0px>10px)
**css:**
```css
@keyFrames a0_translate_0px_100_translate_10px_ {
  0% {
    translate: 0px;
  }
  100% {
    translate: 10px;
  }
}

.\$animate\(easeInOut\,0s\>1s\)\$translate\(0px\>10px\) {
  animation: ease-in-out 1000 a0_translate_0px_100_translate_10px_;
}
```

**description:** Animates translation using a custom 'steps' timing function.
**csss:**  $animate(steps(4,end),0s>1s)$translate(0px>10px)
**css:**
```css
@keyFrames a0_translate_0px_100_translate_10px_ {
  0% {
    translate: 0px;
  }
  100% {
    translate: 10px;
  }
}

.\$animate\(steps\(4\,end\)\,0s\>1s\)\$translate\(0px\>10px\) {
  animation: steps(4, end) 1000 a0_translate_0px_100_translate_10px_;
}
```

**description:** Animates translation using a custom 'cubic-bezier' timing function.
**csss:**  $animate(cubicBezier(0.1,0.7,1.0,0.1),0s>1s)$translate(0px>10px)
**css:**
```css
@keyFrames a0_translate_0px_100_translate_10px {
  0% {
    translate: 0px;
  }
  100% {
    translate: 10px;
  }
}

.\$animate\(cubicBezier\(0\.1\,0\.7\,1\.0\,0\.1\)\,0s\>1s\)\$translate\(0px\>10px\) {
  animation: cubic-bezier(0.1,0.7,1,0.1) 1000 a0_translate_0px_100_translate_10px;
}
```

**description:** Animates background color with a 1s delay and 2s duration.
**csss:**  $animate(1s,0s>2s)$bg(#red>#blue)
**css:**
```css
@keyFrames a0_backgroundColor_red_100_backgroundColor_blue_ {
  0% {
    background-color: red;
  }
  100% {
    background-color: blue;
  }
}

.\$animate\(1s\,0s\>2s\)\$bg\(\#red\>\#blue\) {
  animation: 2000 a0_backgroundColor_red_100_backgroundColor_blue_;
}
```

**description:**
Tests mismatched vectors: 3 time slots (0s, 1s, 2s) but 2 value slots (1, 2) in scale. The values should cycle (1, 2, 1).
**csss:**  $animate(0s>1s>2s)$scale(1>2)
**css:**
```css
@keyFrames a0_scale_1_33_scale_2_ {
  0%, 66% {
    scale: 1;
  }
  33% {
    scale: 2;
  }
}

.\$animate\(0s\>1s\>2s\)\$scale\(1\>2\) {
  animation: 3000 a0_scale_1_33_scale_2_;
}
```

**description:** Tests mismatched vectors: 2 time slots (0s, 1s) but 3 value slots (1, 2, 3) in scale. The extra value is ignored (1, 2).
**csss:**  $animate(0s>1s)$scale(1>2>3)
**css:**
```css
@keyFrames a0_scale_1_100_scale_3_ {
  0% {
    scale: 1;
  }
  100% {
    scale: 3;
  }
}

.\$animate\(0s\>1s\)\$scale\(1\>2\>3\) {
  animation: 1000 a0_scale_1_100_scale_3_;
}
```

**description:** Tests multiple mismatched vectors: 4 time slots, cycling opacity (2 values) and scale (3 values).
**csss:**  $animate(0s>1s>2s>3s)$opacity(0>1)$scale(1>2>3)
**css:**
```css
@keyFrames a0_opacity_0_16_opacity_1_ {
  0%, 33% {
    opacity: 0;
  }
  16%, 50% {
    opacity: 1;
  }
}

@keyFrames a0_scale_1_16_scale_3_ {
  0%, 33% {
    scale: 1;
  }
  16%, 50% {
    scale: 3;
  }
}

.\$animate\(0s\>1s\>2s\>3s\)\$opacity\(0\>1\)\$scale\(1\>2\>3\) {
  animation: 6000 a0_opacity_0_16_opacity_1_, 6000 a0_scale_1_16_scale_3_;
}
```

**description:** Animates a translation where X changes while Y remains static, over 3 time slots.
**csss:**  $animate(0s>1s>2s)$translate(0px>10px,50px)
**css:**
```css
@keyFrames a0_translate_0px_50px_33_translate_10px_50px_ {
  0%, 66% {
    translate: 0px 50px;
  }
  33% {
    translate: 10px 50px;
  }
}

.\$animate\(0s\>1s\>2s\)\$translate\(0px\>10px\,50px\) {
  animation: 3000 a0_translate_0px_50px_33_translate_10px_50px_;
}
```

**description:**
Complex combination of parameters: alternate behavior, forwards fill mode, infinite count, 500ms delay, over a 2s duration.
**csss:**  $animate(alternate,forwards,infinite,500ms,0s>2s)$opacity(0>1)
**css:**
```css
@keyFrames a0_opacity_0_100_opacity_1_ {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.\$animate\(alternate\,forwards\,infinite\,500ms\,0s\>2s\)\$opacity\(0\>1\) {
  animation: alternate 2000 forwards infinite a0_opacity_0_100_opacity_1_;
}
```

**description:** Tests mismatched vectors: 4 time slots and 2 value slots for translation. The translation cycles back and forth.
**csss:**  $animate(0s>1s>2s>3s)$translate(0px>100px)
**css:**
```css
@keyFrames a0_translate_0px_16_translate_100px_ {
  0%, 33% {
    translate: 0px;
  }
  16%, 50% {
    translate: 100px;
  }
}

.\$animate\(0s\>1s\>2s\>3s\)\$translate\(0px\>100px\) {
  animation: 6000 a0_translate_0px_16_translate_100px_;
}
```