**description:** Sets uniform block/inline margins on flex or block children.
**csss:**
|*$blockItem(margin(1rem,0))
|*$flexItem(margin(1rem))
|.a$flexItem(margin(0,0,2rem))
**css:**
```css
.\|\*\$blockItem\(margin\(1rem\,0\)\)>* {
  margin-block: 1rem;
  margin-inline: 0;
}

.\|\*\$flexItem\(margin\(1rem\)\)>* {
  margin: 1rem;
}

.\|\.a\$flexItem\(margin\(0\,0\,2rem\)\)>:where(.a) {
  margin-block: 0 2rem;
  margin-inline: 0;
}
```
