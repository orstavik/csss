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



$bold = $fontWeight(bold);
$italic = $fontStyle(italic);
$oblique = $fontStyle(oblique);

$smallCaps = $fontVariant(small-caps);
$allSmallCaps = $fontVariant(all-small-caps);
$petiteCaps = $fontVariant(petite-caps);
$allPetiteCaps = $fontVariant(all-petite-caps);
$unicase = $fontVariant(unicase);
$titlingCaps = $fontVariant(titling-caps);

$capitalize = $textTransform(capitalize);
$uppercase = $textTransform(uppercase);
$lowercase = $textTransform(lowercase);
$mathAuto = $textTransform(math-auto);

$underline = $textDecoration(underline);
$overline = $textDecoration(overline);
$lineThrough = $textDecoration(line-through);

$ultraCondensed = $fontStretch(ultra-condensed);
$extraCondensed = $fontStretch(extra-condensed);
$condensed = $fontStretch(condensed);
$semiCondensed = $fontStretch(semi-condensed);
$semiExpanded = $fontStretch(semi-expanded);
$expanded = $fontStretch(expanded);
$extraExpanded = $fontStretch(extra-expanded);
$ultraExpanded = $fontStretch(ultra-expanded);

$serif = $fontFamily(serif);
$sansSerif = $fontFamily(sans-serif);
$monospace = $fontFamily(monospace);
$cursive = $fontFamily(cursive);
$fantasy = $fontFamily(fantasy);
$systemUi = $fontFamily(system-ui);
$uiSerif = $fontFamily(ui-serif);
$uiSansSerif = $fontFamily(ui-sans-serif);

$color = $color(black,white,colorMix(oklch,currentcolor,--background-color,33%));
$border = $border(solid, medium);
$block = $display(block)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
$grid = $display(grid)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
$flex = $display(flex)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
//font that breaks inheritance chain
$font = $fontFamily(initial)$fontStyle(initial)$fontWeight(initial)$fontVariant(initial)$fontStretch(initial)$textTransform(initial)$letterSpacing(initial);
$fontInherit = $fontFamily(inherit)$fontStyle(inherit)$fontWeight(inherit)$fontVariant(inherit)$fontStretch(inherit)$textTransform(inherit)$letterSpacing(inherit);
`;
//$full-width = $text-transform(full-width);
//$full-size-kana = $text-transform(full-size-kana);
