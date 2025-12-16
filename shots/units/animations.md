
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
