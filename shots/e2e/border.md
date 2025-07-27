**htmlx:**
```html
  <div class="$border">Solid Border</div>
```

**html:**
```html
  <style>
    @layer container, containerDefault, items, itemsDefault;

    @layer containerDefault {
      .\$border {
        border-style: solid;
      }
    }
  </style>
  <div class="$border">Solid Border</div>
```