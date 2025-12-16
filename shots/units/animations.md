
**csss:** $translateY(20px,infiniteAlternate,from(-20px))
**css:**
```css
@keyframes anim-translateY-20px-infiniteAlternate-from\(-20px\) {
  0% {
    transform: translateY(-20px);
  }
}

@layer containerDefault {
  .\$translateY\(20px\,infiniteAlternate\,from\(-20px\)\) {
    transform: translateY(20px);
    animation: anim-translateY-20px-infiniteAlternate-from\(-20px\) 1s infinite alternate;
  }
}
```

**csss:** $opacity(0.3,from(1))
**css:**
```css
@keyframes anim-opacity-0\.3-from\(1\) {
  0% {
    opacity: 1;
  }
}

@layer containerDefault {
  .\$opacity\(0\.3\,from\(1\)\) {
    opacity: 0.3;
    animation: anim-opacity-0\.3-from\(1\) 1s;
  }
}
```

**csss:** $scale(1.5,from(1))
**css:**
```css
@keyframes anim-scale-1\.5-from\(1\) {
  0% {
    transform: scale(1);
  }
}

@layer containerDefault {
  .\$scale\(1\.5\,from\(1\)\) {
    transform: scale(1.5);
    animation: anim-scale-1\.5-from\(1\) 1s;
  }
}
```

**csss:** $translateX(100px,from(0px))
**css:**
```css
@keyframes anim-translateX-100px-from\(0px\) {
  0% {
    transform: translateX(0px);
  }
}

@layer containerDefault {
  .\$translateX\(100px\,from\(0px\)\) {
    transform: translateX(100px);
    animation: anim-translateX-100px-from\(0px\) 1s;
  }
}
```

**csss:** $rotate(180deg,from(0deg))
**css:**
```css
@keyframes anim-rotate-180deg-from\(0deg\) {
  0% {
    transform: rotate(0deg);
  }
}

@layer containerDefault {
  .\$rotate\(180deg\,from\(0deg\)\) {
    transform: rotate(180deg);
    animation: anim-rotate-180deg-from\(0deg\) 1s;
  }
}
```

**csss:** $opacity(1,from(0.3))$scale(1.2,from(0.8))$translateY(0px,from(30px))
**css:**
```css
@keyframes anim-opacity-1-from\(0\.3\) {
  0% {
    opacity: 0.3;
  }
}

@keyframes anim-scale-1\.2-from\(0\.8\) {
  0% {
    transform: scale(0.8);
  }
}

@keyframes anim-translateY-0px-from\(30px\) {
  0% {
    transform: translateY(30px);
  }
}

@layer containerDefault {
  .\$opacity\(1\,from\(0\.3\)\)\$scale\(1\.2\,from\(0\.8\)\)\$translateY\(0px\,from\(30px\)\) {
    opacity: 1;
    transform: scale(1.2) translateY(0px);
    animation: anim-opacity-1-from\(0\.3\) 1s, anim-scale-1\.2-from\(0\.8\) 1s, anim-translateY-0px-from\(30px\) 1s;
  }
}
```
