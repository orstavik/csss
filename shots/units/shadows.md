**csss:** $boxShadow(0,2px,4px,#rgba(0,0,0,0.1))
**css:**
```css
@layer containerDefault {
  .\$boxShadow\(0\,2px\,4px\,\#rgba\(0\,0\,0\,0\.1\)\) {
    box-shadow: 0 2px 4px #0000001a;
  }
}
```

**csss:** $boxShadow(0,1rem,.25rem,#3f51b5)$boxShadow(0,.5rem,.5rem,#blue)
**css:**
```css
@layer containerDefault {
  .\$boxShadow\(0\,1rem\,\.25rem\,\#3f51b5\)\$boxShadow\(0\,\.5rem\,\.5rem\,\#blue\) {
    box-shadow: 0 1rem .25rem #3f51b5, 0 .5rem .5rem blue;
  }
}
```

**csss:** $boxShadowInset(0,2px,4px,0,#rgba(0,0,0,0.6))
**css:**
```css
@layer containerDefault {
  .\$boxShadowInset\(0\,2px\,4px\,0\,\#rgba\(0\,0\,0\,0\.6\)\) {
    box-shadow: inset 0 2px 4px 0 #00000099;
  }
}
```

**csss:** $boxShadow(ambient,10px,#efa4)
**css:**
```css
@layer containerDefault {
  .\$boxShadow\(ambient\,10px\,\#efa4\) {
    box-shadow: 0px 0px 15px 12.5px #eeffaa44;
  }
}
```

**csss:** $textShadow(0,4px,8px,#rgba(0,0,0,0.3))
**css:**
```css
@layer containerDefault {
  .\$textShadow\(0\,4px\,8px\,\#rgba\(0\,0\,0\,0\.3\)\) {
    text-shadow: 0 4px 8px #0000004d;
  }
}
```

**csss:** $textShadow(2px,2px,4px,#000000)
**css:**
```css
@layer containerDefault {
  .\$textShadow\(2px\,2px\,4px\,\#000000\) {
    text-shadow: 2px 2px 4px #000000;
  }
}
```
