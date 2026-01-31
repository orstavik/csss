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
    animation: translateY-infiniteAlternate-from-20px 2s infinite alternate;
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
    animation: opacity-from1 2s;
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
    animation: scale-from1 2s;
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
    animation: translateX-from0px 2s;
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
    animation: rotate-from0deg 2s;
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
    animation: opacity-from0\.3 2s, scale-from0\.8 2s, translateY-from30px 2s;
    transform: scale(1.2) translateY(0px);
  }
}
```

**csss:** $transition(bounceInOut,2s,margin,color)
**css:**
```css
:root /*--transition-bounceInOut*/ {
  --transition-bounceInOut: linear(0,.033,.062,.085,.101,.108,.101,.085,.062,.033,0,0,.047,.088,.123,.152,.172,.18,.172,.152,.123,.088,.047,0,0,.053,.102,.146,.187,.223,.253,.277,.294,.3,.294,.277,.253,.223,.187,.146,.102,.053,0,0,.073,.141,.204,.263,.317,.366,.409,.445,.474,.493,.526,.555,.591,.634,.683,.737,.796,.859,.927,1,1,.947,.898,.854,.813,.777,.747,.723,.706,.7,.706,.723,.747,.777,.813,.854,.898,.947,1,1,.953,.912,.877,.848,.828,.82,.828,.848,.877,.912,.953,1,1,.967,.938,.915,.899,.892,.899,.915,.938,.967,1);
}

@layer containerDefault {
  .\$transition\(bounceInOut\,2s\,margin\,color\) {
    transition: margin var(--transition-bounceInOut) 2s, color var(--transition-bounceInOut) 2s;
  }
}
```

**csss:** $transition(easeIn,2s)
**css:**
```css
@layer containerDefault {
  .\$transition\(easeIn\,2s\) {
    transition: ease-in 2s;
  }
}
```

**csss:** $transition(steps(5))
**css:**
```css
@layer containerDefault {
  .\$transition\(steps\(5\)\) {
    transition: steps(5);
  }
}
```

**csss:** $transition(stepsEnd(5))
**css:**
```css
@layer containerDefault {
  .\$transition\(stepsEnd\(5\)\) {
    transition: steps(5);
  }
}
```

**csss:** $transition(stepsBoth(5))
**css:**
```css
@layer containerDefault {
  .\$transition\(stepsBoth\(5\)\) {
    transition: steps(5, jump-both);
  }
}
```

**csss:** $transition(backInOut,1s,1s,transform,opacity)
**css:**
```css
:root /*--transition-backInOut*/ {
  --transition-backInOut: linear(0,.007,.02,.036,.052,.063,.067,.061,.043,.016,-.018,-.054,-.088,-.114,-.129,-.129,-.114,-.085,-.045,0,.053,.105,.158,.211,.263,.316,.368,.421,.474,.526,.579,.632,.684,.737,.789,.842,.895,.947,1,1.045,1.085,1.114,1.129,1.129,1.114,1.088,1.054,1.018,.984,.957,.939,.933,.937,.948,.964,.98,.993,1);
}

@layer containerDefault {
  .\$transition\(backInOut\,1s\,1s\,transform\,opacity\) {
    transition: transform var(--transition-backInOut) 1s 1s, opacity var(--transition-backInOut) 1s 1s;
  }
}
```

**csss:** $transition(backInOut,1s,1s,transform,opacity)$transition(bounceInOut,2s,margin,color)
**css:**
```css
:root /*--transition-bounceInOut*/ {
  --transition-bounceInOut: linear(0,.033,.062,.085,.101,.108,.101,.085,.062,.033,0,0,.047,.088,.123,.152,.172,.18,.172,.152,.123,.088,.047,0,0,.053,.102,.146,.187,.223,.253,.277,.294,.3,.294,.277,.253,.223,.187,.146,.102,.053,0,0,.073,.141,.204,.263,.317,.366,.409,.445,.474,.493,.526,.555,.591,.634,.683,.737,.796,.859,.927,1,1,.947,.898,.854,.813,.777,.747,.723,.706,.7,.706,.723,.747,.777,.813,.854,.898,.947,1,1,.953,.912,.877,.848,.828,.82,.828,.848,.877,.912,.953,1,1,.967,.938,.915,.899,.892,.899,.915,.938,.967,1);
}

:root /*--transition-backInOut*/ {
  --transition-backInOut: linear(0,.007,.02,.036,.052,.063,.067,.061,.043,.016,-.018,-.054,-.088,-.114,-.129,-.129,-.114,-.085,-.045,0,.053,.105,.158,.211,.263,.316,.368,.421,.474,.526,.579,.632,.684,.737,.789,.842,.895,.947,1,1.045,1.085,1.114,1.129,1.129,1.114,1.088,1.054,1.018,.984,.957,.939,.933,.937,.948,.964,.98,.993,1);
}

@layer containerDefault {
  .\$transition\(backInOut\,1s\,1s\,transform\,opacity\)\$transition\(bounceInOut\,2s\,margin\,color\) {
    transition: transform var(--transition-backInOut) 1s 1s, opacity var(--transition-backInOut) 1s 1s, margin var(--transition-bounceInOut) 2s, color var(--transition-bounceInOut) 2s;
  }
}
```