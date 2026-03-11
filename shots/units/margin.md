**description:** Sets 1rem block margin and zero inline margin on all children.
**csss:** |*$blockItem(margin(1rem,0))
**css:**
```css
.\|\*\$blockItem\(margin\(1rem\,0\)\)>* {
  margin-block: 1rem;
  margin-inline: 0;
}
```

**description:** Applies uniform 1rem margin on all flex children.
**csss:** |*$flexItem(margin(1rem))
**css:**
```css
.\|\*\$flexItem\(margin\(1rem\)\)>* {
  margin: 1rem;
}
```

**description:** Applies 2rem bottom margin on .a flex child.
**csss:** |.a$flexItem(margin(0,0,2rem))
**css:**
```css
.\|\.a\$flexItem\(margin\(0\,0\,2rem\)\)>:where(.a) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```
