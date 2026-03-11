**description:** Applies bounceInOut easing to margin and color transitions over 2s.
**csss:** $transition(bounceInOut,2s,margin,color)
**css:**
```css
:root /*--transition-bounceInOut*/ {
  --transition-bounceInOut: linear(0,.033,.062,.085,.101,.108,.101,.085,.062,.033,0,0,.047,.088,.123,.152,.172,.18,.172,.152,.123,.088,.047,0,0,.053,.102,.146,.187,.223,.253,.277,.294,.3,.294,.277,.253,.223,.187,.146,.102,.053,0,0,.073,.141,.204,.263,.317,.366,.409,.445,.474,.493,.526,.555,.591,.634,.683,.737,.796,.859,.927,1,1,.947,.898,.854,.813,.777,.747,.723,.706,.7,.706,.723,.747,.777,.813,.854,.898,.947,1,1,.953,.912,.877,.848,.828,.82,.828,.848,.877,.912,.953,1,1,.967,.938,.915,.899,.892,.899,.915,.938,.967,1);
}

.\$transition\(bounceInOut\,2s\,margin\,color\) {
  transition: margin var(--transition-bounceInOut) 2s, color var(--transition-bounceInOut) 2s;
}
```

**description:** Applies backInOut easing to transform and opacity with 1s duration and 1s delay.
**csss:** $transition(backInOut,1s,1s,transform,opacity)
**css:**
```css
:root /*--transition-backInOut*/ {
  --transition-backInOut: linear(0,.007,.02,.036,.052,.063,.067,.061,.043,.016,-.018,-.054,-.088,-.114,-.129,-.129,-.114,-.085,-.045,0,.053,.105,.158,.211,.263,.316,.368,.421,.474,.526,.579,.632,.684,.737,.789,.842,.895,.947,1,1.045,1.085,1.114,1.129,1.129,1.114,1.088,1.054,1.018,.984,.957,.939,.933,.937,.948,.964,.98,.993,1);
}

.\$transition\(backInOut\,1s\,1s\,transform\,opacity\) {
  transition: transform var(--transition-backInOut) 1s 1s, opacity var(--transition-backInOut) 1s 1s;
}
```

**description:** Applies ease-in timing function with 2s duration.
**csss:** $transition(easeIn,2s)
**css:**
```css
.\$transition\(easeIn\,2s\) {
  transition: ease-in 2s;
}
```

**description:** Creates a 5-step transition (default jump-end).
**csss:** $transition(steps(5))
**css:**
```css
.\$transition\(steps\(5\)\) {
  transition: steps(5);
}
```

**description:** Creates a 5-step transition with jump-end timing.
**csss:** $transition(stepsEnd(5))
**css:**
```css
.\$transition\(stepsEnd\(5\)\) {
  transition: steps(5);
}
```

**description:** Creates a 5-step transition with jump-both timing.
**csss:** $transition(stepsBoth(5))
**css:**
```css
.\$transition\(stepsBoth\(5\)\) {
  transition: steps(5, jump-both);
}
```

**description:** Combines two custom easing functions for different properties in one rule.
**csss:** $transition(backInOut,1s,1s,transform,opacity)$transition(bounceInOut,2s,margin,color)
**css:**
```css
:root /*--transition-backInOut*/ {
  --transition-backInOut: linear(0,.007,.02,.036,.052,.063,.067,.061,.043,.016,-.018,-.054,-.088,-.114,-.129,-.129,-.114,-.085,-.045,0,.053,.105,.158,.211,.263,.316,.368,.421,.474,.526,.579,.632,.684,.737,.789,.842,.895,.947,1,1.045,1.085,1.114,1.129,1.129,1.114,1.088,1.054,1.018,.984,.957,.939,.933,.937,.948,.964,.98,.993,1);
}

:root /*--transition-bounceInOut*/ {
  --transition-bounceInOut: linear(0,.033,.062,.085,.101,.108,.101,.085,.062,.033,0,0,.047,.088,.123,.152,.172,.18,.172,.152,.123,.088,.047,0,0,.053,.102,.146,.187,.223,.253,.277,.294,.3,.294,.277,.253,.223,.187,.146,.102,.053,0,0,.073,.141,.204,.263,.317,.366,.409,.445,.474,.493,.526,.555,.591,.634,.683,.737,.796,.859,.927,1,1,.947,.898,.854,.813,.777,.747,.723,.706,.7,.706,.723,.747,.777,.813,.854,.898,.947,1,1,.953,.912,.877,.848,.828,.82,.828,.848,.877,.912,.953,1,1,.967,.938,.915,.899,.892,.899,.915,.938,.967,1);
}

.\$transition\(backInOut\,1s\,1s\,transform\,opacity\)\$transition\(bounceInOut\,2s\,margin\,color\) {
  transition: transform var(--transition-backInOut) 1s 1s, opacity var(--transition-backInOut) 1s 1s, margin var(--transition-bounceInOut) 2s, color var(--transition-bounceInOut) 2s;
}
```
