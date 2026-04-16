**description:** Full lifecycle example combining $Typeface setup, $Font inheritance reset, and $font individual overrides for the system-ui stack.
**userInstruction:**
We want a native app feel. Set up the `systemUI` typeface at the body level, enforce it securely on main content, and tweak a specific button to be bold.
**before:**
```html
…<body …>…
  <main …>…
    <button …>Submit</button>
  …</main>
…</body>…
```
**after:**
```html
…<body class="$Typeface(systemUI,system-ui,sans-serif)" …>…
  <main class="$Font(systemUI)" …>…
    <button class="$font(bold)">Submit</button>
  …</main>
…</body>…
```
**css:**
```css
.\$Typeface\(systemUI\,system-ui\,sans-serif\) {
  --systemUIFontFamily: system-ui, sans-serif;
}

.\$Font\(systemUI\) {
  font-family: var(--systemUIFontFamily, unset);
  font-size: var(--systemUIFontSize, unset);
  font-style: var(--systemUIFontStyle, unset);
  font-weight: var(--systemUIFontWeight, unset);
  font-size-adjust: var(--systemUIFontSizeAdjust, unset);
  letter-spacing: var(--systemUILetterSpacing, unset);
  text-transform: var(--systemUITextTransform, unset);
  font-stretch: var(--systemUIFontStretch, unset);
  font-variant-caps: var(--systemUIFontVariantCaps, unset);
  font-synthesis: var(--systemUIFontSynthesis, unset);
  font-feature-settings: var(--systemUIFontFeatureSettings, unset);
  font-variation-settings: var(--systemUIFontVariationSettings, unset);
  font-kerning: var(--systemUIFontKerning, unset);
}

.\$font\(bold\) {
  font-weight: bold;
}
```


**description:** Full lifecycle example using transitional typeface for a classical digital reading experience, complete with $Font application and local $font tweaks.
**userInstruction:**
Syntax Optimization/Refactoring: Standardize the long-form article by defining the `transitional` preset at the root, applying its baseline umbrella on the article. Keep the intro text italic.
**before:**
```html
…<div class="reading-root …" …>…
  <article class="long-form $font(Charter,'Bitstream+Charter','Sitka+Text',Cambria,serif) …" …>…
    <p class="intro $font(italic) …" …>Welcome to the first chapter.</p>
  …</article>
…</div>…
```
**after:**
```html
…<div class="reading-root $Typeface(transitional,Charter,'Bitstream+Charter','Sitka+Text',Cambria,serif) …" …>…
  <article class="long-form $Font(transitional) …" …>…
    <p class="intro $font(italic) …" …>Welcome to the first chapter.</p>
  …</article>
…</div>…
```
**css:**
```css
.\$Typeface\(transitional\,Charter\,\'Bitstream\+Charter\'\,\'Sitka\+Text\'\,Cambria\,serif\) {
  --transitionalFontFamily: Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;
}

.\$Font\(transitional\) {
  font-family: var(--transitionalFontFamily, unset);
  font-size: var(--transitionalFontSize, unset);
  font-style: var(--transitionalFontStyle, unset);
  font-weight: var(--transitionalFontWeight, unset);
  font-size-adjust: var(--transitionalFontSizeAdjust, unset);
  letter-spacing: var(--transitionalLetterSpacing, unset);
  text-transform: var(--transitionalTextTransform, unset);
  font-stretch: var(--transitionalFontStretch, unset);
  font-variant-caps: var(--transitionalFontVariantCaps, unset);
  font-synthesis: var(--transitionalFontSynthesis, unset);
  font-feature-settings: var(--transitionalFontFeatureSettings, unset);
  font-variation-settings: var(--transitionalFontVariationSettings, unset);
  font-kerning: var(--transitionalFontKerning, unset);
}

.\$font\(italic\) {
  font-style: italic;
}
```


**description:** Full lifecycle example combining $Typeface setup, $Font inheritance reset, and $font sizing for a vintage book reader.
**userInstruction:**
Theme Adjustments: To fully support the 'vintage reading' theme, set up the `oldStyle` typeface globally, secure inheritance on the text view, and increase the drop-cap size using $font.
**before:**
```html
…<div class="theme-vintage …" …>…
  <div class="novel-view …" …>…
    <span class="drop-cap …" …>O</span>nce upon a time...
  …</div>
…</div>…
```
**after:**
```html
…<div class="theme-vintage $Typeface(oldStyle,'Iowan+Old+Style','Palatino+Linotype','URW+Palladio+L',Pica,'Book+Antiqua',serif) …" …>…
  <div class="novel-view $Font(oldStyle) …" …>…
    <span class="drop-cap $font(xLarge) …" …>O</span>nce upon a time...
  …</div>
…</div>…
```
**css:**
```css
.\$Typeface\(oldStyle\,\'Iowan\+Old\+Style\'\,\'Palatino\+Linotype\'\,\'URW\+Palladio\+L\'\,Pica\,\'Book\+Antiqua\'\,serif\) {
  --oldStyleFontFamily: 'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', Pica, 'Book Antiqua', serif;
}

.\$Font\(oldStyle\) {
  font-family: var(--oldStyleFontFamily, unset);
  font-size: var(--oldStyleFontSize, unset);
  font-style: var(--oldStyleFontStyle, unset);
  font-weight: var(--oldStyleFontWeight, unset);
  font-size-adjust: var(--oldStyleFontSizeAdjust, unset);
  letter-spacing: var(--oldStyleLetterSpacing, unset);
  text-transform: var(--oldStyleTextTransform, unset);
  font-stretch: var(--oldStyleFontStretch, unset);
  font-variant-caps: var(--oldStyleFontVariantCaps, unset);
  font-synthesis: var(--oldStyleFontSynthesis, unset);
  font-feature-settings: var(--oldStyleFontFeatureSettings, unset);
  font-variation-settings: var(--oldStyleFontVariationSettings, unset);
  font-kerning: var(--oldStyleFontKerning, unset);
}

.\$font\(xLarge\) {
  font-size: x-large;
}
```


**description:**
Highly legible with a friendly, approachable voice. The open counters and organic strokes make digital interfaces feel less robotic, highly conversational, and effortlessly accessible.
**userInstruction:**
The current UI feels too robotic. We need a friendly, conversational tone. Apply the humanist typeface stack to the app root.
**before:**
```html
…<body class="app-root …" …>…</body>…
```
**after:**
```html
…<body class="app-root $Typeface(humanist,Seravek,'Gill+Sans+Nova',Ubuntu,Calibri,'DejaVu+Sans',source-sans-pro,sans-serif) …" …>…</body>…
```
**css:**
```css
.\$Typeface\(humanist\,Seravek\,\'Gill\+Sans\+Nova\'\,Ubuntu\,Calibri\,\'DejaVu\+Sans\'\,source-sans-pro\,sans-serif\) {
  --humanistFontFamily: Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif;
}
```


**description:**
Clean, architectural, and thoroughly modern. It provides a crisp, contemporary aesthetic that feels inherently forward-thinking, making it excellent for tech-focused, minimalist user journeys.
**userInstruction:**
The modern theme relies on an older, less crisp geometric font setup. Upgrade it to the architectural geometricHumanist preset.
**before:**
```html
…<div class="theme-modern …" …>…</div>…
```
**after:**
```html
…<div class="theme-modern $Typeface(geometricHumanist,Avenir,Montserrat,Corbel,'URW+Gothic',source-sans-pro,sans-serif) …" …>…</div>…
```
**css:**
```css
.\$Typeface\(geometricHumanist\,Avenir\,Montserrat\,Corbel\,\'URW\+Gothic\'\,source-sans-pro\,sans-serif\) {
  --geometricHumanistFontFamily: Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;
}
```


**description:**
Graceful and gently sophisticated. It brings a touch of subtle elegance to the interface, offering a refined, premium user experience without demanding too much visual attention.
**userInstruction:**
The premium content section inherits a standard sans-serif font from its parent, but it needs a subtle elegance. Override it with the classical humanist typeface.
**before:**
```html
…<section class="premium-content …" …>…</section>…
```
**after:**
```html
…<section class="premium-content $Typeface(classicalHumanist,Optima,Candara,'Noto+Sans',source-sans-pro,sans-serif) …" …>…</section>…
```
**css:**
```css
.\$Typeface\(classicalHumanist\,Optima\,Candara\,\'Noto\+Sans\'\,source-sans-pro\,sans-serif\) {
  --classicalHumanistFontFamily: Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif;
}
```


**description:**
Acts as the ultimate neutral canvas. It feels objective and universally legible, ensuring the user's emotional focus remains entirely on the content itself rather than the styling.
**userInstruction:**
The dashboard is cluttered with specific font overrides. Simplify it by applying the ultimate neutral canvas: the neoGrotesque typeface.
**before:**
```html
…<main class="dashboard …" …>…</main>…
```
**after:**
```html
…<main class="dashboard $Typeface(neoGrotesque,Inter,Roboto,'Helvetica+Neue','Arial+Nova','Nimbus+Sans',Arial,sans-serif) …" …>…</main>…
```
**css:**
```css
.\$Typeface\(neoGrotesque\,Inter\,Roboto\,\'Helvetica\+Neue\'\,\'Arial\+Nova\'\,\'Nimbus\+Sans\'\,Arial\,sans-serif\) {
  --neoGrotesqueFontFamily: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
}
```


**description:**
Brings a tactile, typewriter-like nostalgia to the screen. It feels deliberate and a bit charmingly bureaucratic, slowing down the user slightly to encourage focus on individual details.
**userInstruction:** The quote block blends in too much with the surrounding text. Give it a typewriter-like nostalgia to make it stand out.
**before:**
```html
…<blockquote class="quote-block …" …>…</blockquote>…
```
**after:**
```html
…<blockquote class="quote-block $Typeface(monospaceSlab,'Nimbus+Mono+PS','Courier+New',monospace) …" …>…</blockquote>…
```
**css:**
```css
.\$Typeface\(monospaceSlab\,\'Nimbus\+Mono\+PS\'\,\'Courier\+New\'\,monospace\) {
  --monospaceSlabFontFamily: 'Nimbus Mono PS', 'Courier New', monospace;
}
```


**description:**
Feels precise, technical, and strictly organized. It immediately signals a highly structured environment, giving users a sense of control, accuracy, and rigorous alignment.
**userInstruction:**
The code snippets are using proportional fonts which makes them hard to read. Ensure they are perfectly legible by applying the monospace code typeface.
**before:**
```html
…<pre class="code-snippet …" …>…</pre>…
```
**after:**
```html
…<pre class="code-snippet $Typeface(monospaceCode,ui-monospace,'Cascadia+Code','Source+Code+Pro',Menlo,Consolas,'DejaVu+Sans+Mono',monospace) …" …>…</pre>…
```
**css:**
```css
.\$Typeface\(monospaceCode\,ui-monospace\,\'Cascadia\+Code\'\,\'Source\+Code\+Pro\'\,Menlo\,Consolas\,\'DejaVu\+Sans\+Mono\'\,monospace\) {
  --monospaceCodeFontFamily: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
}
```


**description:**
Bold, utilitarian, and distinctly no-nonsense. It delivers information with visual urgency and confidence, making it ideal for impactful messaging where clarity and space efficiency are paramount.
**userInstruction:**
The warning label was accidentally using a font droplet instead of defining the typeface umbrella correctly. Fix the semantics to use the industrial typeface definition.
**before:**
```html
…<div class="warning-label …" …>…</div>…
```
**after:**
```html
…<div class="warning-label $Typeface(industrial,Bahnschrift,'DIN+Alternate','Franklin+Gothic+Medium','Nimbus+Sans+Narrow',sans-serif-condensed,sans-serif) …" …>…</div>…
```
**css:**
```css
.\$Typeface\(industrial\,Bahnschrift\,\'DIN\+Alternate\'\,\'Franklin\+Gothic\+Medium\'\,\'Nimbus\+Sans\+Narrow\'\,sans-serif-condensed\,sans-serif\) {
  --industrialFontFamily: Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif;
}
```


**description:**
Feels casual, deeply personal, and delightfully imperfect. It breaks the digital barrier, injecting the interface with a sense of human touch, spontaneity, and creative whimsy.
**userInstruction:**
The postcard element needs to break the digital barrier. Override the global font with a deeply personal, handwritten typeface.
**before:**
```html
…<div class="postcard …" …>…</div>…
```
**after:**
```html
…<div class="postcard $Typeface(handwritten,'Segoe+Print','Bradley+Hand',Chilanka,Kavivanar,'Comic+Sans+MS','Chalkboard+SE','Comic+Neue',cursive) …" …>…</div>…
```
**css:**
```css
.\$Typeface\(handwritten\,\'Segoe\+Print\'\,\'Bradley\+Hand\'\,Chilanka\,Kavivanar\,\'Comic\+Sans\+MS\'\,\'Chalkboard\+SE\'\,\'Comic\+Neue\'\,cursive\) {
  --handwrittenFontFamily: 'Segoe Print', 'Bradley Hand', Chilanka, Kavivanar, 'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', cursive;
}
```


**description:**
FinePrint. Intentionally exhausting yet technically compliant. It maximizes character density to fulfill legal obligations while presenting a monotonous, tightly packed texture that subtly discourages the user from actually reading it. Keywords: Dense, Bureaucratic, Compliance, EULA, Friction. Best for: Terms of Service, Disclaimers, Legal Footnotes, Copyright Notices.
**userInstruction:**
The legal footnotes must fulfill compliance while discouraging reading through a monotonous, dense texture. Apply the FinePrint typeface.
**before:**
```html
…<footer class="legal-footer …" …>…</footer>…
```
**after:**
```html
…<footer class="legal-footer $Typeface(FinePrint,'Arial+Narrow','Helvetica+Neue+Condensed',sans-serif-condensed,sans-serif,11px) …" …>…</footer>…
```
**css:**
```css
.\$Typeface\(FinePrint\,\'Arial\+Narrow\'\,\'Helvetica\+Neue\+Condensed\'\,sans-serif-condensed\,sans-serif\,11px\) {
  --FinePrintFontFamily: 'Arial Narrow', 'Helvetica Neue Condensed', sans-serif-condensed, sans-serif;
  --FinePrintFontSize: 11px;
}
```


**description:** Defines a "comic" typeface with web font URL, size, stretch, style and weight.
**userInstruction:**
Refactor the hardcoded remote font-face import and individual font styling into a reusable comic typeface definition with exact sizes and weights.
**before:**
```html
…<div class="fun-text …" …>…</div>…
```
**after:**
```html
…<div class="fun-text $Typeface(comic,'MS+Comic+Sans','https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2',xxSmall,semiExpanded,italic,bolder) …" …>…</div>…
```
**css:**
```css
@font-face /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/ {
  font-family: ComicNeue;
  src: /*https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2*/
local("ComicNeue"),
url("https://cdn.jsdelivr.net/npm/@openfonts/comic-neue_latin@latest/files/ComicNeue-Regular.woff2");
}

.\$Typeface\(comic\,\'MS\+Comic\+Sans\'\,\'https\:\/\/cdn\.jsdelivr\.net\/npm\/\@openfonts\/comic-neue_latin\@latest\/files\/ComicNeue-Regular\.woff2\'\,xxSmall\,semiExpanded\,italic\,bolder\) {
  --comicFontFamily: 'MS Comic Sans', ComicNeue;
  --comicFontSize: xx-small;
  --comicFontStyle: italic;
  --comicFontWeight: bolder;
  --comicFontStretch: semi-expanded;
}
```


**description:**
Soft, playful, and entirely unthreatening. Set up the `roundedSans` typeface and immediately apply it.
**userInstruction:** We want the kids zone to feel soft and playful. Define and apply the rounded sans-serif typeface to it to secure inheritance.
**before:**
```html
…<div class="container …" …>…
  <section class="kids-zone …" …>…</section>
…</div>…
```
**after:**
```html
…<div class="container $Typeface(roundedSans,ui-rounded,'Hiragino+Maru+Gothic+ProN',Quicksand,Comfortaa,Manjari,'Arial+Rounded+MT','Arial+Rounded+MT+Bold',Calibri,source-sans-pro,sans-serif) …" …>…
  <section class="kids-zone $Font(roundedSans) …" …>…</section>
…</div>…
```
**css:**
```css
.\$Typeface\(roundedSans\,ui-rounded\,\'Hiragino\+Maru\+Gothic\+ProN\'\,Quicksand\,Comfortaa\,Manjari\,\'Arial\+Rounded\+MT\'\,\'Arial\+Rounded\+MT\+Bold\'\,Calibri\,source-sans-pro\,sans-serif\) {
  --roundedSansFontFamily: ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif;
}

.\$Font\(roundedSans\) {
  font-family: var(--roundedSansFontFamily, unset);
  font-size: var(--roundedSansFontSize, unset);
  font-style: var(--roundedSansFontStyle, unset);
  font-weight: var(--roundedSansFontWeight, unset);
  font-size-adjust: var(--roundedSansFontSizeAdjust, unset);
  letter-spacing: var(--roundedSansLetterSpacing, unset);
  text-transform: var(--roundedSansTextTransform, unset);
  font-stretch: var(--roundedSansFontStretch, unset);
  font-variant-caps: var(--roundedSansFontVariantCaps, unset);
  font-synthesis: var(--roundedSansFontSynthesis, unset);
  font-feature-settings: var(--roundedSansFontFeatureSettings, unset);
  font-variation-settings: var(--roundedSansFontVariationSettings, unset);
  font-kerning: var(--roundedSansFontKerning, unset);
}
```


**description:**
Sturdy, grounded, and highly confident. Define the `slabSerif` and secure it on the article header.
**userInstruction:** Define a sturdy slab serif typeface at the app level, and enforce it on the headlines to give a confident, grounded voice.
**before:**
```html
…<main …>…
  <header class="article-header …" …>…</header>
…</main>…
```
**after:**
```html
…<main class="$Typeface(slabSerif,Rockwell,'Rockwell+Nova','Roboto+Slab','DejaVu+Serif','Sitka+Small',serif)" …>…
  <header class="article-header $Font(slabSerif) …" …>…</header>
…</main>…
```
**css:**
```css
.\$Typeface\(slabSerif\,Rockwell\,\'Rockwell\+Nova\'\,\'Roboto\+Slab\'\,\'DejaVu\+Serif\'\,\'Sitka\+Small\'\,serif\) {
  --slabSerifFontFamily: Rockwell, 'Rockwell Nova', 'Roboto Slab', 'DejaVu Serif', 'Sitka Small', serif;
}

.\$Font\(slabSerif\) {
  font-family: var(--slabSerifFontFamily, unset);
  font-size: var(--slabSerifFontSize, unset);
  font-style: var(--slabSerifFontStyle, unset);
  font-weight: var(--slabSerifFontWeight, unset);
  font-size-adjust: var(--slabSerifFontSizeAdjust, unset);
  letter-spacing: var(--slabSerifLetterSpacing, unset);
  text-transform: var(--slabSerifTextTransform, unset);
  font-stretch: var(--slabSerifFontStretch, unset);
  font-variant-caps: var(--slabSerifFontVariantCaps, unset);
  font-synthesis: var(--slabSerifFontSynthesis, unset);
  font-feature-settings: var(--slabSerifFontFeatureSettings, unset);
  font-variation-settings: var(--slabSerifFontVariationSettings, unset);
  font-kerning: var(--slabSerifFontKerning, unset);
}
```


**description:**
Defines a standard "body" (brødtekst) typeface using system fonts, ensuring high readability with normalized style overrides via a child selector.
**userInstruction:**
The global document was defining the body font individually, but we need it to use the proper Typeface umbrella along with its child selector override to apply it properly.
**before:**
```html
…<html class="root-doc …" …>…</html>…
```
**after:**
```html
…<html class="root-doc $Typeface(body,system-ui,sans-serif,1rem)
|body$Font(body) …" …>…</html>…
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


**description:** Resets all font properties and overrides family, size and weight.
**userInstruction:**
Fixing CSSS Semantic Errors: The previous styling used individual font properties that unintentionally inherited bad letter spacing and line heights; replace it with the uppercase Umbrella $Font to reset the inheritance before applying the new Arial font stack.
**before:**
```html
…<h1 class="main-heading …" …>Welcome</h1>…
```
**after:**
```html
…<h1 class="main-heading $Font(_,Arial,16px,bold) …" …>Welcome</h1>…
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


**description:** Applies a generic typeface reset.
**userInstruction:**
Feature Requests/Tweaks: The editorial team wants the pull quotes to feel more classical and authoritative; reset and switch the font family specifically to a generic serif.
**before:**
```html
…<blockquote class="pull-quote …" …>
  This is a significant statement.
</blockquote>…
```
**after:**
```html
…<blockquote class="pull-quote $Font(_,serif) …" …>
  This is a significant statement.
</blockquote>…
```
**css:**
```css
.\$Font\(_\,serif\) {
  font-family: serif;
  font-size: unset;
  font-style: unset;
  font-weight: unset;
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


**description:** Sets font-family, weight, size-adjust, style, width and size directly.
**userInstruction:**
Greenfield Addition: Give the newly added disclaimer text its initial styling, setting it to a small, condensed, italic system font.
**before:**
```html
…<p class="disclaimer …" …>Terms and conditions apply.</p>…
```
**after:**
```html
…<p class="disclaimer $font(system-ui,sans-serif,400,adjust(0.5),italic,condensed,12px) …" …>Terms and conditions apply.</p>…
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


**description:** Transforms text to uppercase.
**userInstruction:**
Accessibility Improvements: The small labels in the form are a bit hard to read; convert them to uppercase to improve visual clarity and stand out against the input fields.
**before:**
```html
…<label class="input-label …" …>First Name</label>…
```
**after:**
```html
…<label class="input-label $font(uppercase) …" …>First Name</label>…
```
**css:**
```css
.\$font\(uppercase\) {
  text-transform: uppercase;
}
```


**description:** Removes any text transformation.
**userInstruction:**
Contextual Overrides: The global CSS forces all table headers into uppercase, but this specific data table needs its headers preserved in their original casing to avoid misinterpreting acronyms.
**before:**
```html
…<div class="data-header …" …>NaCl</div>…
```
**after:**
```html
…<div class="data-header $font(transformNone) …" …>NaCl</div>…
```
**css:**
```css
.\$font\(transformNone\) {
  text-transform: none;
}
```


**description:**
Exudes high fashion, luxury, and strict elegance. Override a specific element with didone font umbrella and a heavy font weight droplet.
**userInstruction:** The luxury landing page needs to exude high fashion and dramatic contrast. Secure didone inheritance and make the specific highlight bold.
**before:**
```html
…<div class="hero-wrapper …" …>…
  <div class="luxury-hero …" …>Exclusive</div>
…</div>…
```
**after:**
```html
…<div class="hero-wrapper $Typeface(didone,Didot,'Bodoni+MT','Noto+Serif+Display','URW+Palladio+L',Pica,serif) …" …>…
  <div class="luxury-hero $Font(didone) $font(bold) …" …>Exclusive</div>
…</div>…
```
**css:**
```css
.\$Typeface\(didone\,Didot\,\'Bodoni\+MT\'\,\'Noto\+Serif\+Display\'\,\'URW\+Palladio\+L\'\,Pica\,serif\) {
  --didoneFontFamily: Didot, 'Bodoni MT', 'Noto Serif Display', 'URW Palladio L', Pica, serif;
}

.\$Font\(didone\) {
  font-family: var(--didoneFontFamily, unset);
  font-size: var(--didoneFontSize, unset);
  font-style: var(--didoneFontStyle, unset);
  font-weight: var(--didoneFontWeight, unset);
  font-size-adjust: var(--didoneFontSizeAdjust, unset);
  letter-spacing: var(--didoneLetterSpacing, unset);
  text-transform: var(--didoneTextTransform, unset);
  font-stretch: var(--didoneFontStretch, unset);
  font-variant-caps: var(--didoneFontVariantCaps, unset);
  font-synthesis: var(--didoneFontSynthesis, unset);
  font-feature-settings: var(--didoneFontFeatureSettings, unset);
  font-variation-settings: var(--didoneFontVariationSettings, unset);
  font-kerning: var(--didoneFontKerning, unset);
}

.\$font\(bold\) {
  font-weight: bold;
}
```


**description:**
Carries a warm, vintage charm that feels culturally established. Secure the antique font on the story and apply an italic override.
**userInstruction:**
Clean up the messy specific font overrides on the story container, secure the standard antique typeface, and apply an italic override.
**before:**
```html
…<section class="container …" …>…
  <article class="story …" …>Once <span class="highlight …" …>again</span></article>
…</section>…
```
**after:**
```html
…<section class="container $Typeface(antique,'Superclarendon','Bookman+Old+Style','URW+Bookman','URW+Bookman+L','Georgia+Pro',Georgia,serif) …" …>…
  <article class="story $Font(antique) …" …>Once <span class="highlight $font(italic) …" …>again</span></article>
…</section>…
```
**css:**
```css
.\$Typeface\(antique\,\'Superclarendon\'\,\'Bookman\+Old\+Style\'\,\'URW\+Bookman\'\,\'URW\+Bookman\+L\'\,\'Georgia\+Pro\'\,Georgia\,serif\) {
  --antiqueFontFamily: 'Superclarendon', 'Bookman Old Style', 'URW Bookman', 'URW Bookman L', 'Georgia Pro', Georgia, serif;
}

.\$Font\(antique\) {
  font-family: var(--antiqueFontFamily, unset);
  font-size: var(--antiqueFontSize, unset);
  font-style: var(--antiqueFontStyle, unset);
  font-weight: var(--antiqueFontWeight, unset);
  font-size-adjust: var(--antiqueFontSizeAdjust, unset);
  letter-spacing: var(--antiqueLetterSpacing, unset);
  text-transform: var(--antiqueTextTransform, unset);
  font-stretch: var(--antiqueFontStretch, unset);
  font-variant-caps: var(--antiqueFontVariantCaps, unset);
  font-synthesis: var(--antiqueFontSynthesis, unset);
  font-feature-settings: var(--antiqueFontFeatureSettings, unset);
  font-variation-settings: var(--antiqueFontVariationSettings, unset);
  font-kerning: var(--antiqueFontKerning, unset);
}

.\$font\(italic\) {
  font-style: italic;
}
```


**description:**
Exudes high fashion, luxury, and strict elegance. Override a specific element with didone font umbrella and a heavy font weight droplet.
**userInstruction:** The luxury landing page needs to exude high fashion and dramatic contrast. Secure didone inheritance and make the specific highlight bold.
**before:**
```html
…<div class="hero-wrapper …" …>…
  <div class="luxury-hero $Font(didone) …" …>Exclusive</div>
…</div>…
```
**after:**
```html
…<div class="hero-wrapper …" …>…
  <div class="luxury-hero $Font(didone) $font(bold) …" …>Exclusive</div>
…</div>…
```
**css:**
```css
.\$Font\(didone\) {
  font-family: var(--didoneFontFamily, unset);
  font-size: var(--didoneFontSize, unset);
  font-style: var(--didoneFontStyle, unset);
  font-weight: var(--didoneFontWeight, unset);
  font-size-adjust: var(--didoneFontSizeAdjust, unset);
  letter-spacing: var(--didoneLetterSpacing, unset);
  text-transform: var(--didoneTextTransform, unset);
  font-stretch: var(--didoneFontStretch, unset);
  font-variant-caps: var(--didoneFontVariantCaps, unset);
  font-synthesis: var(--didoneFontSynthesis, unset);
  font-feature-settings: var(--didoneFontFeatureSettings, unset);
  font-variation-settings: var(--didoneFontVariationSettings, unset);
  font-kerning: var(--didoneFontKerning, unset);
}

.\$font\(bold\) {
  font-weight: bold;
}
```

**description:**
Carries a warm, vintage charm that feels culturally established. Secure the antique font on the story and apply an italic override.
**userInstruction:**
Clean up the messy specific font overrides on the story container, secure the standard antique typeface, and apply an italic override.
**before:**
```html
…<section class="container …" …>…
  <article class="story $Font(antique) …" …>Once <span class="highlight …" …>again</span></article>
…</section>…
```
**after:**
```html
…<section class="container …" …>…
  <article class="story $Font(antique) …" …>Once <span class="highlight $font(italic) …" …>again</span></article>
…</section>…
```
**css:**
```css
.\$Font\(antique\) {
  font-family: var(--antiqueFontFamily, unset);
  font-size: var(--antiqueFontSize, unset);
  font-style: var(--antiqueFontStyle, unset);
  font-weight: var(--antiqueFontWeight, unset);
  font-size-adjust: var(--antiqueFontSizeAdjust, unset);
  letter-spacing: var(--antiqueLetterSpacing, unset);
  text-transform: var(--antiqueTextTransform, unset);
  font-stretch: var(--antiqueFontStretch, unset);
  font-variant-caps: var(--antiqueFontVariantCaps, unset);
  font-synthesis: var(--antiqueFontSynthesis, unset);
  font-feature-settings: var(--antiqueFontFeatureSettings, unset);
  font-variation-settings: var(--antiqueFontVariationSettings, unset);
  font-kerning: var(--antiqueFontKerning, unset);
}

.\$font\(italic\) {
  font-style: italic;
}
```