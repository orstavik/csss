**csss:** $translateY(20px,infiniteAlternate,from(-20px))
**css:**
```css
@keyframes translateY-infiniteAlternate-from-20px {
  0% {
    transform: translateY(-20px);
  }
}

@layer containerDefault {
  .\$translateY\(20px\,infiniteAlternate\,from\(-20px\)\) {
    transform: translateY(20px);
    animation: translateY-infiniteAlternate-from-20px 1s infinite alternate;
  }
}
```

**csss:** $opacity(0.3,from(1))
**css:**
```css
@keyframes opacity-from1 {
  0% {
    opacity: 1;
  }
}

@layer containerDefault {
  .\$opacity\(0\.3\,from\(1\)\) {
    opacity: 0.3;
    animation: opacity-from1 1s;
  }
}
```

**csss:** $scale(1.5,from(1))
**css:**
```css
@keyframes scale-from1 {
  0% {
    transform: scale(1);
  }
}

@layer containerDefault {
  .\$scale\(1\.5\,from\(1\)\) {
    transform: scale(1.5);
    animation: scale-from1 1s;
  }
}
```

**csss:** $translateX(100px,from(0px))
**css:**
```css
@keyframes translateX-from0px {
  0% {
    transform: translateX(0px);
  }
}

@layer containerDefault {
  .\$translateX\(100px\,from\(0px\)\) {
    transform: translateX(100px);
    animation: translateX-from0px 1s;
  }
}
```

**csss:** $rotate(180deg,from(0deg))
**css:**
```css
@keyframes rotate-from0deg {
  0% {
    transform: rotate(0deg);
  }
}

@layer containerDefault {
  .\$rotate\(180deg\,from\(0deg\)\) {
    transform: rotate(180deg);
    animation: rotate-from0deg 1s;
  }
}
```

**csss:** $opacity(1,from(0.3))$scale(1.2,from(0.8))$translateY(0px,from(30px))
**css:**
```css
@keyframes translateY-from30px {
  0% {
    transform: translateY(30px);
  }
}

@keyframes scale-from0\.8 {
  0% {
    transform: scale(0.8);
  }
}

@keyframes opacity-from0\.3 {
  0% {
    opacity: 0.3;
  }
}

@layer containerDefault {
  .\$opacity\(1\,from\(0\.3\)\)\$scale\(1\.2\,from\(0\.8\)\)\$translateY\(0px\,from\(30px\)\) {
    opacity: 1;
    animation: opacity-from0\.3 1s, scale-from0\.8 1s, translateY-from30px 1s;
    transform: scale(1.2) translateY(0px);
  }
}
```

**csssx:** $translateX(100px,to(*3))
**cssx:**
```css
@keyframes translateX-to-\*3 {
  100% {
    transform: translateX(300px);
  }
}

@layer containerDefault {
  .\$translateX\(100px\,to\(\*3\)\) {
    transform: translateX(100px);
    animation: translateX-to-\*3 1s;
  }
}
```
