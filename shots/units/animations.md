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