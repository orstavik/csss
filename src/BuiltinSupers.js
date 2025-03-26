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

$underline = $textDecoration(underline);
$overline = $textDecoration(overline);
$lineThrough = $textDecoration(lineThrough);

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

$color = $color(black,white,colorMix(oklch,currentcolor,--background-color,33%));
$border = $border(solid, medium);
$block = $display(block)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
$grid = $display(grid)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
$flex = $display(flex)$wordSpacing(.)$lineHeight(.)$whiteSpace(.)$hyphens(.)$textAlign(.)$textIndent(.);
//font that breaks inheritance chain
$font = $fontFamily(initial)$fontStyle(initial)$fontWeight(initial)$fontVariant(initial)$fontStretch(initial)$textTransform(initial)$letterSpacing(initial);
$fontInherit = $fontFamily(inherit)$fontStyle(inherit)$fontWeight(inherit)$fontVariant(inherit)$fontStretch(inherit)$textTransform(inherit)$letterSpacing(inherit);

$holygrail = $display(grid)$gridTemplateRows(auto 1fr auto)$gridTemplateColumns(auto 1fr 1fr auto)$gap(1rem);
$holygrailheader = $gridColumn("1/4")$padding(1rem);
$holygrailfooter = $gridColumn("1/4")$padding(1rem);
$holygrailsidebarleft = $gridColumn("1/2")$padding(1rem);
$holygrailsidebarright = $gridColumn("3/4")$padding(1rem);
$holygrailmain = $gridColumn("2/3")$padding(1rem);
`;
//$full-width = $text-transform(full-width);
//$full-size-kana = $text-transform(full-size-kana);
