**description:**
A fade-in that stays visible after completing — useful for elements that appear on page load and should not revert to invisible.
**csss:** $animate(forwards,0s>2s)$opacity(0>1)
**css:**
```css

```

**description:**
A fade-in where the element starts invisible even before the animation begins — useful when an animation has a delay and the element should not flash its default state first.
**csss:** $animate(backwards,0s>2s)$opacity(0>1)
**css:**
```css

```

**description:**
A fade-in that both starts from the initial keyframe state and retains the final keyframe state — the safest fill mode for delayed animations that should persist.
**csss:** $animate(both,0s>2s)$opacity(0>1)
**css:**
```css

```

**description:**
A panel that rotates closed by playing the open animation in reverse — useful for toggling between open/close states with a single keyframe definition.
**csss:** $animate(reverse,0s>2s)$rotate(0deg>90deg)
**css:**
```css
@keyFrames a0_rotate_0deg_100_rotate_90deg {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 90deg;
  }
}

.\$animate\(reverse\,0s\>2s\)\$rotate\(0deg\>90deg\) {
  animation: reverse 2000 a0_rotate_0deg_100_rotate_90deg;
}
```

**description:**
A pendulum-style swing that plays forwards then backwards in reverse — useful for decorative oscillating motion that starts from the end state.
**csss:** $animate(alternate-reverse,0s>2s)$rotate(0deg>90deg)
**css:**
```css

```

**description:**
A heartbeat effect that pulses exactly 3 times — useful for drawing attention to a notification badge or alert icon.
**csss:** $animate(3,0s>1s)$scale(1>2)
**css:**
```css
@keyFrames a0_scale_1_100_scale_2 {
  0% {
    scale: 1;
  }
  100% {
    scale: 2;
  }
}

.\$animate\(3\,0s\>1s\)\$scale\(1\>2\) {
  animation: 1000 3 a0_scale_1_100_scale_2;
}
```

**description:**
A smooth slide-in with ease-in-out timing — useful for elements entering the viewport with natural acceleration and deceleration.
**csss:** $animate(ease-in-out,0s>1s)$translate(0px>10px)
**css:**
```css

```

**description:**
A carousel slide that moves in discrete steps rather than smoothly — useful for typewriter effects or frame-by-frame sprite animations.
**csss:** $animate(steps(4,end),0s>1s)$translate(0px>10px)
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

.\$animate\(steps\(4\,end\)\,0s\>1s\)\$translate\(0px\>10px\) {
  animation: steps(4, end) 1000 a0_translate_0px_100_translate_10px;
}
```

**description:**
A slide with a custom cubic-bezier curve for a snappy overshoot feel — useful for playful UI transitions like modal pop-ins.
**csss:** $animate(cubic-bezier(0.1,0.7,1.0,0.1),0s>1s)$translate(0px>10px)
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

.\$animate\(cubic-bezier\(0\.1\,0\.7\,1\.0\,0\.1\)\,0s\>1s\)\$translate\(0px\>10px\) {
  animation: cubic-bezier(0.1,0.7,1,0.1) 1000 a0_translate_0px_100_translate_10px;
}
```

**description:**
A background color shift from red to blue that waits 1 second before starting — useful for delayed visual feedback after a user action completes.
**csss:** $animate(1s,0s>2s)$bg(red>blue)
**css:**
```css

```

**description:**
A bounce-back scale using 3 time slots with 2 values — the values cycle (1→2→1) creating a grow-then-shrink pulse effect useful for "pop" micro-interactions.
**csss:** $animate(0s>1s>2s)$scale(1>2)
**css:**
```css
@keyFrames a0_scale_1_33_scale_2 {
  0%, 66% {
    scale: 1;
  }
  33% {
    scale: 2;
  }
}

.\$animate\(0s\>1s\>2s\)\$scale\(1\>2\) {
  animation: 3000 a0_scale_1_33_scale_2;
}
```

**description:**
A quick scale-up where extra value slots are spread across the available time slots — 2 time slots with 3 values means only the first and last values are used at keyframes 0% and 100%.
**csss:** $animate(0s>1s)$scale(1>2>3)
**css:**
```css
@keyFrames a0_scale_1_100_scale_3 {
  0% {
    scale: 1;
  }
  100% {
    scale: 3;
  }
}

.\$animate\(0s\>1s\)\$scale\(1\>2\>3\) {
  animation: 1000 a0_scale_1_100_scale_3;
}
```

**description:**
A combined fade-and-scale with cycling values across 4 time slots — opacity alternates (0→1→0→1) while scale cycles (1→2→3→1), creating a complex pulsing entrance effect.
**csss:** $animate(0s>1s>2s>3s)$opacity(0>1)$scale(1>2>3)
**css:**
```css

```

**description:**
A horizontal slide where only the X axis animates while Y stays fixed — useful for tab-switching or drawer animations that move sideways at a constant vertical position.
**csss:** $animate(0s>1s>2s)$translate(0px>10px,50px)
**css:**
```css
@keyFrames a0_translate_0px_50px_33_translate_10px_50px {
  0%, 66% {
    translate: 0px 50px;
  }
  33% {
    translate: 10px 50px;
  }
}

.\$animate\(0s\>1s\>2s\)\$translate\(0px\>10px\,50px\) {
  animation: 3000 a0_translate_0px_50px_33_translate_10px_50px;
}
```

**description:**
A breathing glow effect: alternating direction, retained end state, infinite loop, 500ms startup delay, over 2 seconds — useful for a pulsing "live" indicator or loading state.
**csss:** $animate(alternate,forwards,infinite,500ms,0s>2s)$opacity(0>1)
**css:**
```css

```

**description:**
A back-and-forth shuttle animation cycling a translate across 4 time slots — useful for an attention-grabbing horizontal shake or scanning motion.
**csss:** $animate(0s>1s>2s>3s)$translate(0px>100px)
**css:**
```css
@keyFrames a0_translate_0px_16_translate_100px {
  0%, 33% {
    translate: 0px;
  }
  16%, 50% {
    translate: 100px;
  }
}

.\$animate\(0s\>1s\>2s\>3s\)\$translate\(0px\>100px\) {
  animation: 6000 a0_translate_0px_16_translate_100px;
}
```