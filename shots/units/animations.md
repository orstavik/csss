**description:** Animates translate y from -20px to 20px in infinite alternate loop.
**csss:** $translate(0,20px,infiniteAlternate,from(0,-20px))
**css:**
```css
@keyframes translate-infiniteAlternate-from0\,-20px {
  0% {
    translate: 0 -20px;
  }
}

.\$translate\(0\,20px\,infiniteAlternate\,from\(0\,-20px\)\) {
  translate: 0 20px;
  animation: translate-infiniteAlternate-from0\,-20px 2s infinite alternate;
}
```

**description:** Animates translate x from 0px to 100px over 2 seconds.
**csss:** $translate(100px,from(0px))
**css:**
```css
@keyframes translate-from0px {
  0% {
    translate: 0px;
  }
}

.\$translate\(100px\,from\(0px\)\) {
  translate: 100px;
  animation: translate-from0px 2s;
}
```

**description:** Animates opacity from 1 down to 0.3 over 2 seconds.
**csss:** $opacity(0.3,from(1))
**css:**
```css
@keyframes opacity-from1 {
  0% {
    opacity: 1;
  }
}

.\$opacity\(0\.3\,from\(1\)\) {
  opacity: 0.3;
  animation: opacity-from1 2s;
}
```

transform + animation — scale

**description:** Animates scale from 1 up to 1.5 over 2 seconds.
**csss:** $scale(1.5,from(1))
**css:**
```css
@keyframes scale-from1 {
  0% {
    scale: 1;
  }
}

.\$scale\(1\.5\,from\(1\)\) {
  scale: 1.5;
  animation: scale-from1 2s;
}
```

transform + animation — rotate

**description:** Animates rotation from 0deg to 180deg over 2 seconds.
**csss:** $rotate(180deg,from(0deg))
**css:**
```css
@keyframes rotate-from0deg {
  0% {
    rotate: 0deg;
  }
}

.\$rotate\(180deg\,from\(0deg\)\) {
  rotate: 180deg;
  animation: rotate-from0deg 2s;
}
```

combined animations — opacity, scale & translate

**description:** Runs three simultaneous animations: fade in, scale up and slide up.
**csss:** $opacity(1,from(0.3))$scale(1.2,from(0.8))$translate(0px,from(0,30px))
**css:**
```css
@keyframes opacity-from0\.3 {
  0% {
    opacity: 0.3;
  }
}

@keyframes scale-from0\.8 {
  0% {
    scale: 0.8;
  }
}

@keyframes translate-from0\,30px {
  0% {
    translate: 0 30px;
  }
}

.\$opacity\(1\,from\(0\.3\)\)\$scale\(1\.2\,from\(0\.8\)\)\$translate\(0px\,from\(0\,30px\)\) {
  opacity: 1;
  animation: opacity-from0\.3 2s, scale-from0\.8 2s, translate-from0\,30px 2s;
  scale: 1.2;
  translate: 0px;
}
```
