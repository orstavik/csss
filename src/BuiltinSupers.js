export const BuiltinSupers = `
@sm = @(min-width:640px);
@md = @(min-width:768px);
@lg = @(min-width:1024px);
@xl = @(min-width:1280px);
@2xl = @(min-width:1536px);
@dark = @(prefers-color-scheme:dark);


:first = :first-child;
:second = :nth-child(2);
:third = :nth-child(3);
:fourth = :nth-child(4);
:fifth = :nth-child(5);
:sixth = :nth-child(6);
:seventh = :nth-child(7);
:eighth = :nth-child(8);
:ninth = :nth-child(9);
:tenth = :nth-child(10);
:last = :last-child;
:edge = :first-child,:last-child;



$bold = $fontWeight(bold);
$italic = $fontStyle(italic);
$oblique = $fontStyle(oblique);

$smallCaps = $fontVariant(smallCaps);
$allSmallCaps = $fontVariant(allSmallCaps);
$petiteCaps = $fontVariant(petiteCaps);
$allPetiteCaps = $fontVariant(allPetiteCaps);
$unicase = $fontVariant(unicase);
$titlingCaps = $fontVariant(titlingCaps);

$capitalize = $textTransform(capitalize);
$uppercase = $textTransform(uppercase);
$lowercase = $textTransform(lowercase);
$mathAuto = $textTransform(mathAuto);

$ultraCondensed = $fontStretch(ultraCondensed);
$extraCondensed = $fontStretch(extraCondensed);
$condensed = $fontStretch(condensed);
$semiCondensed = $fontStretch(semiCondensed);
$semiExpanded = $fontStretch(semiExpanded);
$expanded = $fontStretch(expanded);
$extraExpanded = $fontStretch(extraExpanded);
$ultraExpanded = $fontStretch(ultraExpanded);

$serif = $fontFamily(serif);
$sansSerif = $fontFamily(sansSerif);
$monospace = $fontFamily(monospace);
$cursive = $fontFamily(cursive);
$fantasy = $fontFamily(fantasy);
$systemUi = $fontFamily(systemUi);
$uiSerif = $fontFamily(uiSerif);
$uiSansSerif = $fontFamily(uiSansSerif);

`;
//$full-width = $text-transform(full-width);
//$full-size-kana = $text-transform(full-size-kana);


// $color = $color(black,white,colorMix(oklch,currentcolor,--background-color,33%));
// $border = $border(solid, medium);
// $block = $display(block)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
// $grid = $display(grid)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
// $flex = $display(flex)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
// //font that breaks inheritance chain
// $font = $fontFamily(.)$fontStyle(.)$fontWeight(.)$fontVariant(.)$fontStretch(.)$textTransform(.)$letterSpacing(.);
// $fontInherit = $fontFamily(inherit)$fontStyle(inherit)$fontWeight(inherit)$fontVariant(inherit)$fontStretch(inherit)$textTransform(inherit)$letterSpacing(inherit);
// fontInherit is like an umbrella with holes in it.
