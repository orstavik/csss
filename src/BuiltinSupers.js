export const BuiltinSupers = `
@sm = @(min-width:640px);
@md = @(min-width:768px);
@lg = @(min-width:1024px);
@xl = @(min-width:1280px);
@2xl = @(min-width:1536px);
@dark = @(prefers-color-scheme:dark);


:first = :first-child;
:last = :last-child;
:edge = :first-child,:last-child;



$bold = $font-weight(bold);
$italic = $font-style(italic);
$oblique = $font-style(oblique);

$small-caps = $font-variant(small-caps);
$all-small-caps = $font-variant(all-small-caps);
$petite-caps = $font-variant(petite-caps);
$all-petite-caps = $font-variant(all-petite-caps);
$unicase = $font-variant(unicase);
$titling-caps = $font-variant(titling-caps);

$capitalize = $text-transform(capitalize);
$uppercase = $text-transform(uppercase);
$lowercase = $text-transform(lowercase);
$math-auto = $text-transform(math-auto);

$underline = $text-decoration(underline);
$overline = $text-decoration(overline);
$line-through = $text-decoration(line-through);

$ultra-condensed = $font-stretch(ultra-condensed);
$extra-condensed = $font-stretch(extra-condensed);
$condensed = $font-stretch(condensed);
$semi-condensed = $font-stretch(semi-condensed);
$semi-expanded = $font-stretch(semi-expanded);
$expanded = $font-stretch(expanded);
$extra-expanded = $font-stretch(extra-expanded);
$ultra-expanded = $font-stretch(ultra-expanded);

$serif = $font-family(serif);
$sans-serif = $font-family(sans-serif);
$monospace = $font-family(monospace);
$cursive = $font-family(cursive);
$fantasy = $font-family(fantasy);
$system-ui = $font-family(system-ui);
$ui-serif = $font-family(ui-serif);
$ui-sans-serif = $font-family(ui-sans-serif);

$border = $border(solid, medium);
$block = $display(block)$word-spacing(.)$line-height(.)$white-space(.)$hyphens(.)$text-align(.)$text-indent(.);
$grid = $display(grid)$word-spacing(.)$line-height(.)$white-space(.)$hyphens(.)$text-align(.)$text-indent(.);
$flex = $display(flex)$word-spacing(.)$line-height(.)$white-space(.)$hyphens(.)$text-align(.)$text-indent(.);
//font that breaks inheritance chain
$font = $font-family(initial)$font-style(initial)$font-weight(initial)$font-variant(initial)$font-stretch(initial)$text-transform(initial)$letter-spacing(initial);
$font-inherit = $font-family(inherit)$font-style(inherit)$font-weight(inherit)$font-variant(inherit)$font-stretch(inherit)$text-transform(inherit)$letter-spacing(inherit);
`;
//$full-width = $text-transform(full-width);
//$full-size-kana = $text-transform(full-size-kana);
