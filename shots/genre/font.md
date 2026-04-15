**description:** Sets font-family, weight, size-adjust, style, width and size directly.
**userInstruction:** Greenfield Addition: Give the newly added disclaimer text its initial styling, setting it to a small, condensed, italic system font.
**before:**
```html
<p class="disclaimer">Terms and conditions apply.</p>
```
**after:**
```html
<p class="disclaimer $font(system-ui,sans-serif,400,adjust(0.5),italic,condensed,12px)">Terms and conditions apply.</p>
```
**css:**
```css
.\$font\(system-ui\,sans-serif\,400\,adjust\(0\.5\)\,italic\,condensed\,12px\) {
  font-family: system-ui, sans-serif;
  font-weight: 400;
  font-size-adjust: 0.5;
  font-style: italic;
  font-stretch: condensed;
  font-size: 12px;
}
```

**description:** Sets font-family to "body" font.
**userInstruction:** Theme Adjustments: Update the article content to use the generic theme-mapped "body" font instead of a hardcoded specific font stack.
**before:**
```html
<article class="content $font(Helvetica,Arial)">
  Lorem ipsum...
</article>
```
**after:**
```html
<article class="content $font(body)">
  Lorem ipsum...
</article>
```
**css:**
```css
.\$font\(body\) {
  font-family: body;
}
```

**description:** Sets serif font family.
**userInstruction:** Feature Requests/Tweaks: The editorial team wants the pull quotes to feel more classical and authoritative; switch the font family specifically to a generic serif.
**before:**
```html
<blockquote class="pull-quote">
  This is a significant statement.
</blockquote>
```
**after:**
```html
<blockquote class="pull-quote $font(serif)">
  This is a significant statement.
</blockquote>
```
**css:**
```css
.\$font\(serif\) {
  font-family: serif;
}
```

**description:** Resets all font properties and overrides family, size and weight.
**userInstruction:** Fixing CSSS Semantic Errors: The previous styling used individual font properties that unintentionally inherited bad letter spacing and line heights; replace it with the uppercase Umbrella $Font to reset the inheritance before applying the new Arial font stack.
**before:**
```html
<h1 class="main-heading $font(Arial) $font(16px) $font(bold)">Welcome</h1>
```
**after:**
```html
<h1 class="main-heading $Font(_,Arial,16px,bold)">Welcome</h1>
```
**css:**
```css
.\$Font\(_\,Arial\,16px\,bold\) {
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  font-style: unset;
  font-size-adjust: unset;
  letter-spacing: unset;
  text-transform: unset;
  font-stretch: unset;
  font-variant-caps: unset;
  font-synthesis: unset;
  font-feature-settings: unset;
  font-variation-settings: unset;
  font-kerning: unset;
}
```

**description:** Transforms text to uppercase.
**userInstruction:** Accessibility Improvements: The small labels in the form are a bit hard to read; convert them to uppercase to improve visual clarity and stand out against the input fields.
**before:**
```html
<label class="input-label">First Name</label>
```
**after:**
```html
<label class="input-label $font(uppercase)">First Name</label>
```
**css:**
```css
.\$font\(uppercase\) {
  text-transform: uppercase;
}
```

**description:** Removes any text transformation.
**userInstruction:** Contextual Overrides: The global CSS forces all table headers into uppercase, but this specific data table needs its headers preserved in their original casing to avoid misinterpreting acronyms.
**before:**
```html
<th class="data-header">NaCl</th>
```
**after:**
```html
<th class="data-header $font(transformNone)">NaCl</th>
```
**css:**
```css
.\$font\(transformNone\) {
  text-transform: none;
}
```

**description:**
Inherits the operating system's default personality. It feels native, fast, frictionless, and completely invisible to the user, building immediate familiarity and trust without drawing attention to itself.
**userInstruction:** The app root has an outdated, complex custom font stack that slows down rendering. Strip it back and use the system-ui typeface definition for a frictionless, native feel.
**before:**
```html
…<body class="$Font(Arial,Helvetica,sans-serif)">…</body>…
```
**after:**
```html
…<body class="$Typeface(systemUI,system-ui,sans-serif)">…</body>…
```
**css:**
```css
.\$Typeface\(systemUI\,system-ui\,sans-serif\) {
  --systemUIFontFamily: system-ui, sans-serif;
}
```

**description:**
Bridges the gap between classic print and modern digital. It provides a crisp, authoritative reading experience that feels academic and reliable, making it perfect for holding a user's focus during long-form articles.
**userInstruction:** The developer hardcoded a long list of serif fonts directly on the article. Refactor this suboptimal code by using the centralized transitional typeface preset.
**before:**
```html
…<article class="long-form $Font(Charter,'Bitstream+Charter','Sitka+Text',Cambria,serif)">…</article>…
```
**after:**
```html
…<article class="long-form $Typeface(transitional,Charter,'Bitstream+Charter','Sitka+Text',Cambria,serif)">…</article>…
```
**css:**
```css
.\$Typeface\(transitional\,Charter\,\"Bitstream\+Charter\"\,\"Sitka\+Text\"\,Cambria\,serif\) {
  --transitionalFontFamily: Charter, "Bitstream Charter", "Sitka Text", Cambria, serif;
}
```

**description:**
Evokes the cozy familiarity of a well-worn, comfortable hardcover book. It offers a warm, inviting, and deeply human aesthetic that naturally lowers reading fatigue on screens.
**userInstruction:** To support the new 'vintage reading' mode, replace the default fonts with an old-style typeface to evoke the cozy familiarity of a hardcover book.
**before:**
```html
…<div class="novel-view">…</div>…
```
**after:**
```html
…<div class="novel-view $Typeface(oldStyle,'Iowan+Old+Style','Palatino+Linotype','URW+Palladio+L',Pica,'Book+Antiqua',serif)">…</div>…
```
**css:**
```css
.\$Typeface\(oldStyle\,\"Iowan\+Old\+Style\"\,\"Palatino\+Linotype\"\,\"URW\+Palladio\+L\"\,Pica\,\"Book\+Antiqua\"\,serif\) {
  --oldStyleFontFamily: "Iowan Old Style", "Palatino Linotype", "URW Palladio L", Pica, "Book Antiqua", serif;
}
```

**description:**
Highly legible with a friendly, approachable voice. The open counters and organic strokes make digital interfaces feel less robotic, highly conversational, and effortlessly accessible.
**userInstruction:** The current UI feels too robotic. We need a friendly, conversational tone. Apply the humanist typeface stack to the app root.
**before:**
```html
…<body class="app-root $Typeface(industrial)">…</body>…
```
**after:**
```html
…<body class="app-root $Typeface(humanist,Seravek,'Gill+Sans+Nova',Ubuntu,Calibri,'DejaVu+Sans',source-sans-pro,sans-serif)">…</body>…
```
**css:**
```css
.\$Typeface\(humanist\,Seravek\,\"Gill\+Sans\+Nova\"\,Ubuntu\,Calibri\,\"DejaVu\+Sans\"\,source-sans-pro\,sans-serif\) {
  --humanistFontFamily: Seravek, "Gill Sans Nova", Ubuntu, Calibri, "DejaVu Sans", source-sans-pro, sans-serif;
}
```

**description:**
Clean, architectural, and thoroughly modern. It provides a crisp, contemporary aesthetic that feels inherently forward-thinking, making it excellent for tech-focused, minimalist user journeys.
**userInstruction:** The modern theme relies on an older, less crisp geometric font setup. Upgrade it to the architectural geometricHumanist preset.
**before:**
```html
…<div class="theme-modern $Font(Avenir,sans-serif)">…</div>…
```
**after:**
```html
…<div class="theme-modern $Typeface(geometricHumanist,Avenir,Montserrat,Corbel,'URW+Gothic',source-sans-pro,sans-serif)">…</div>…
```
**css:**
```css
.\$Typeface\(geometricHumanist\,Avenir\,Montserrat\,Corbel\,\"URW\+Gothic\"\,source-sans-pro\,sans-serif\) {
  --geometricHumanistFontFamily: Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif;
}
```

**description:**
Graceful and gently sophisticated. It brings a touch of subtle elegance to the interface, offering a refined, premium user experience without demanding too much visual attention.
**userInstruction:** The premium content section inherits a standard sans-serif font from its parent, but it needs a subtle elegance. Override it with the classical humanist typeface.
**before:**
```html
…<section class="premium-content">…</section>…
```
**after:**
```html
…<section class="premium-content $Typeface(classicalHumanist,Optima,Candara,'Noto+Sans',source-sans-pro,sans-serif)">…</section>…
```
**css:**
```css
.\$Typeface\(classicalHumanist\,Optima\,Candara\,\"Noto\+Sans\"\,source-sans-pro\,sans-serif\) {
  --classicalHumanistFontFamily: Optima, Candara, "Noto Sans", source-sans-pro, sans-serif;
}
```

**description:**
Acts as the ultimate neutral canvas. It feels objective and universally legible, ensuring the user's emotional focus remains entirely on the content itself rather than the styling.
**userInstruction:** The dashboard is cluttered with specific font overrides. Simplify it by applying the ultimate neutral canvas: the neoGrotesque typeface.
**before:**
```html
…<main class="dashboard $Font(Inter) $Font(Roboto)">…</main>…
```
**after:**
```html
…<main class="dashboard $Typeface(neoGrotesque,Inter,Roboto,'Helvetica+Neue','Arial+Nova','Nimbus+Sans',Arial,sans-serif)">…</main>…
```
**css:**
```css
.\$Typeface\(neoGrotesque\,Inter\,Roboto\,\"Helvetica\+Neue\"\,\"Arial\+Nova\"\,\"Nimbus\+Sans\"\,Arial\,sans-serif\) {
  --neoGrotesqueFontFamily: Inter, Roboto, "Helvetica Neue", "Arial Nova", "Nimbus Sans", Arial, sans-serif;
}
```

**description:**
Brings a tactile, typewriter-like nostalgia to the screen. It feels deliberate and a bit charmingly bureaucratic, slowing down the user slightly to encourage focus on individual details.
**userInstruction:** The quote block blends in too much with the surrounding text. Give it a typewriter-like nostalgia to make it stand out.
**before:**
```html
…<blockquote class="quote-block">…</blockquote>…
```
**after:**
```html
…<blockquote class="quote-block $Typeface(monospaceSlab,'Nimbus+Mono+PS','Courier+New',monospace)">…</blockquote>…
```
**css:**
```css
.\$Typeface\(monospaceSlab\,\"Nimbus\+Mono\+PS\"\,\"Courier\+New\"\,monospace\) {
  --monospaceSlabFontFamily: "Nimbus Mono PS", "Courier New", monospace;
}
```

**description:**
Feels precise, technical, and strictly organized. It immediately signals a highly structured environment, giving users a sense of control, accuracy, and rigorous alignment.
**userInstruction:** The code snippets are using proportional fonts which makes them hard to read. Ensure they are perfectly legible by applying the monospace code typeface.
**before:**
```html
…<pre class="code-snippet">…</pre>…
```
**after:**
```html
…<pre class="code-snippet $Typeface(monospaceCode,ui-monospace,'Cascadia+Code','Source+Code+Pro',Menlo,Consolas,'DejaVu+Sans+Mono',monospace)">…</pre>…
```
**css:**
```css
.\$Typeface\(monospaceCode\,ui-monospace\,\"Cascadia\+Code\"\,\"Source\+Code\+Pro\"\,Menlo\,Consolas\,\"DejaVu\+Sans\+Mono\"\,monospace\) {
  --monospaceCodeFontFamily: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, "DejaVu Sans Mono", monospace;
}
```

**description:**
Bold, utilitarian, and distinctly no-nonsense. It delivers information with visual urgency and confidence, making it ideal for impactful messaging where clarity and space efficiency are paramount.
**userInstruction:** The warning label was accidentally using a font droplet instead of defining the typeface umbrella correctly. Fix the semantics to use the industrial typeface definition.
**before:**
```html
…<div class="warning-label $font(Bahnschrift,'DIN+Alternate')">…</div>…
```
**after:**
```html
…<div class="warning-label $Typeface(industrial,Bahnschrift,'DIN+Alternate','Franklin+Gothic+Medium','Nimbus+Sans+Narrow',sans-serif-condensed,sans-serif)">…</div>…
```
**css:**
```css
.\$Typeface\(industrial\,Bahnschrift\,\"DIN\+Alternate\"\,\"Franklin\+Gothic\+Medium\"\,\"Nimbus\+Sans\+Narrow\"\,sans-serif-condensed\,sans-serif\) {
  --industrialFontFamily: Bahnschrift, "DIN Alternate", "Franklin Gothic Medium", "Nimbus Sans Narrow", sans-serif-condensed, sans-serif;
}
```

**description:**
Soft, playful, and entirely unthreatening. It creates a joyful, relaxed user experience, often making interfaces feel welcoming, safe, and easily digestible.
**userInstruction:** We want the kids zone to feel soft and playful. Apply the rounded sans-serif typeface to it.
**before:**
```html
…<section class="kids-zone">…</section>…
```
**after:**
```html
…<section class="kids-zone $Typeface(roundedSans,ui-rounded,'Hiragino+Maru+Gothic+ProN',Quicksand,Comfortaa,Manjari,'Arial+Rounded+MT','Arial+Rounded+MT+Bold',Calibri,source-sans-pro,sans-serif)">…</section>…
```
**css:**
```css
.\$Typeface\(roundedSans\,ui-rounded\,\"Hiragino\+Maru\+Gothic\+ProN\"\,Quicksand\,Comfortaa\,Manjari\,\"Arial\+Rounded\+MT\"\,\"Arial\+Rounded\+MT\+Bold\"\,Calibri\,source-sans-pro\,sans-serif\) {
  --roundedSansFontFamily: ui-rounded, "Hiragino Maru Gothic ProN", Quicksand, Comfortaa, Manjari, "Arial Rounded MT", "Arial Rounded MT Bold", Calibri, source-sans-pro, sans-serif;
}
```

**description:**
Sturdy, grounded, and highly confident. It commands attention with a steady, reliable voice, making UI elements feel solidly built and deeply reassuring.
**userInstruction:** Define a sturdy slab serif typeface to give the headlines a confident, grounded voice.
**before:**
```html
…<header class="article-header">…</header>…
```
**after:**
```html
…<header class="article-header $Typeface(slabSerif,Rockwell,'Rockwell+Nova','Roboto+Slab','DejaVu+Serif','Sitka+Small',serif)">…</header>…
```
**css:**
```css
.\$Typeface\(slabSerif\,Rockwell\,\"Rockwell\+Nova\"\,\"Roboto\+Slab\"\,\"DejaVu\+Serif\"\,\"Sitka\+Small\"\,serif\) {
  --slabSerifFontFamily: Rockwell, "Rockwell Nova", "Roboto Slab", "DejaVu Serif", "Sitka Small", serif;
}
```

**description:**
Carries a warm, vintage charm that feels culturally established and rooted in history. It provides a cozy storytelling vibe that signals long-lasting value and craftsmanship.
**userInstruction:** Clean up the messy specific font overrides on the story container and replace them with the standard antique typeface preset for a warm vintage charm.
**before:**
```html
…<article class="story $Font('Superclarendon',Georgia)">…</article>…
```
**after:**
```html
…<article class="story $Typeface(antique,'Superclarendon','Bookman+Old+Style','URW+Bookman','URW+Bookman+L','Georgia+Pro',Georgia,serif)">…</article>…
```
**css:**
```css
.\$Typeface\(antique\,\"Superclarendon\"\,\"Bookman\+Old\+Style\"\,\"URW\+Bookman\"\,\"URW\+Bookman\+L\"\,\"Georgia\+Pro\"\,Georgia\,serif\) {
  --antiqueFontFamily: "Superclarendon", "Bookman Old Style", "URW Bookman", "URW Bookman L", "Georgia Pro", Georgia, serif;
}
```

**description:**
Exudes high fashion, luxury, and strict elegance. The extreme contrast between thick and thin strokes provides a dramatic, premium experience best suited for capturing attention on large displays.
**userInstruction:** The luxury landing page needs to exude high fashion and dramatic contrast. Apply the didone typeface.
**before:**
```html
…<div class="luxury-hero">…</div>…
```
**after:**
```html
…<div class="luxury-hero $Typeface(didone,Didot,'Bodoni+MT','Noto+Serif+Display','URW+Palladio+L',Pica,serif)">…</div>…
```
**css:**
```css
.\$Typeface\(didone\,Didot\,\"Bodoni\+MT\"\,\"Noto\+Serif\+Display\"\,\"URW\+Palladio\+L\"\,Pica\,serif\) {
  --didoneFontFamily: Didot, "Bodoni MT", "Noto Serif Display", "URW Palladio L", Pica, serif;
}
```

**description:**
Feels casual, deeply personal, and delightfully imperfect. It breaks the digital barrier, injecting the interface with a sense of human touch, spontaneity, and creative whimsy.
**userInstruction:** The postcard element needs to break the digital barrier. Override the global font with a deeply personal, handwritten typeface.
**before:**
```html
…<div class="postcard">…</div>…
```
**after:**
```html
…<div class="postcard $Typeface(handwritten,'Segoe+Print','Bradley+Hand',Chilanka,Kavivanar,'Comic+Sans+MS','Chalkboard+SE','Comic+Neue',cursive)">…</div>…
```
**css:**
```css
.\$Typeface\(handwritten\,\"Segoe\+Print\"\,\"Bradley\+Hand\"\,Chilanka\,Kavivanar\,\"Comic\+Sans\+MS\"\,\"Chalkboard\+SE\"\,\"Comic\+Neue\"\,cursive\) {
  --handwrittenFontFamily: "Segoe Print", "Bradley Hand", Chilanka, Kavivanar, "Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive;
}
```

**description:**
Defines a "comic" typeface with web font URL, size, stretch, style and weight.
**userInstruction:** Refactor the hardcoded remote font-face import and individual font styling into a reusable comic typeface definition with exact sizes and weights.
**before:**
```html
…<div class="fun-text $Font('MS+Comic+Sans') $FontSize(xx-small)">…</div>…
```
**after:**
```html
…<div class="fun-text $Typeface(comic,'MS+Comic+Sans','https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2',xxSmall,semiExpanded,italic,bolder)">…</div>…
```
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/ {
  font-family: ComicNeue;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/
local("ComicNeue"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

.\$Typeface\(comic\,\"MS\+Comic\+Sans\"\,\"https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\"\,xxSmall\,semiExpanded\,italic\,bolder\) {
  --comicFontFamily: "MS Comic Sans", ComicNeue;
  --comicFontSize: xx-small;
  --comicFontStyle: italic;
  --comicFontWeight: bolder;
  --comicFontStretch: semi-expanded;
}
```

**description:**
Defines a standard "body" (brødtekst) typeface using system fonts, ensuring high readability with normalized style overrides.
**userInstruction:** The global document was defining the body font individually, but we need it to use the proper Typeface umbrella along with its child selector override.
**before:**
```html
…<html class="root-doc $Font(system-ui,sans-serif)">…</html>…
```
**after:**
```html
…<html class="root-doc $Typeface(body,system-ui,sans-serif,1rem)
|body$Font(body)">…</html>…
```
**css:**
```css
.\$Typeface\(body\,system-ui\,sans-serif\,1rem\) {
  --bodyFontFamily: system-ui, sans-serif;
  --bodyFontSize: 1rem;
}

.\|body\$Font\(body\)>:where(body) {
  font-family: var(--bodyFontFamily, unset);
  font-size: var(--bodyFontSize, unset);
  font-style: var(--bodyFontStyle, unset);
  font-weight: var(--bodyFontWeight, unset);
  font-size-adjust: var(--bodyFontSizeAdjust, unset);
  letter-spacing: var(--bodyLetterSpacing, unset);
  text-transform: var(--bodyTextTransform, unset);
  font-stretch: var(--bodyFontStretch, unset);
  font-variant-caps: var(--bodyFontVariantCaps, unset);
  font-synthesis: var(--bodyFontSynthesis, unset);
  font-feature-settings: var(--bodyFontFeatureSettings, unset);
  font-variation-settings: var(--bodyFontVariationSettings, unset);
  font-kerning: var(--bodyFontKerning, unset);
}
```

**description:**
FinePrint. Intentionally exhausting yet technically compliant. It maximizes character density to fulfill legal obligations while presenting a monotonous, tightly packed texture that subtly discourages the user from actually reading it. Keywords: Dense, Bureaucratic, Compliance, EULA, Friction. Best for: Terms of Service, Disclaimers, Legal Footnotes, Copyright Notices.
**userInstruction:** The legal footnotes must fulfill compliance while discouraging reading through a monotonous, dense texture. Apply the FinePrint typeface.
**before:**
```html
…<footer class="legal-footer">…</footer>…
```
**after:**
```html
…<footer class="legal-footer $Typeface(FinePrint,'Arial+Narrow','Helvetica+Neue+Condensed',sans-serif-condensed,sans-serif,11px)">…</footer>…
```
**css:**
```css
.\$Typeface\(FinePrint\,\'Arial\+Narrow\'\,\'Helvetica\+Neue\+Condensed\'\,sans-serif-condensed\,sans-serif\,11px\) {
  --FinePrintFontFamily: "Arial Narrow", "Helvetica Neue Condensed", sans-serif-condensed, sans-serif;
  --FinePrintFontSize: 11px;
}
```