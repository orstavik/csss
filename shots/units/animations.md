
**csss:** $translateY(20px,infiniteAlternate,from(-20px))
**css:**
```css
@keyframes anim-translate-y-20px-infinite-alternate-from\(-20px\) {
  0% {
    transform: translateY(-20px);  
  }
}

@layer containerDefault {
  .\$translateY\(20px\,infiniteAlternate\,from\(-20px\)\) {
    transform: translateY(20px);
    animation: anim-translate-y-20px-infinite-alternate-from\(-20px\) 2s infinite alternate;
  }
}
```
