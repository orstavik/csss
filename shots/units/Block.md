**description:** Default Block with padding and a gap after each item.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1rem))
 
**description:** Default Block layout for book-styled text with indented paragraphs, title has 0 indentation, subtitle 50% indentation.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1rem))$Paragraph(indent(2em))
|.title$blockItem(margin(0,0,2rem))$paragraph(indent(0))
|.subtitle$blockItem(margin(0,0,1.5rem))$paragraph(indent(1em))

**description:** A Block layout for a blog post with upto 600px wide, a gap between items, and a floating note on the right side.
**csss:**
$BlockItem(inlineSize(_,_,600px))
|*$BlockItem(margin(0.5rem,1rem))
|.box$blockItem(floatStart,margin(0,1rem,1rem,0))
|p$blockItem(margin(0,0,1rem))
|h4$blockItem(margin(0,0,0.5rem))
|.intro$blockItem(clearStart,margin(0,0,2rem))
|.content$blockItem(margin(0,0,1rem))
|.note$blockItem(floatEnd,margin(0,0,1rem,1rem))

**description:** A Block layout for a centered card upto 300px wide and no gap between items.
**csss:**
$Block(padding(0,10vh))
|*$BlockItem(margin(auto,0),inlineSize(_,_,300px))
 
**description:** A Block layout for a narrow centered reading column with a max-width of 65ch, comfortable vertical spacing between paragraphs, and extra bottom margin on headings to reinforce visual hierarchy for long-form articles or essays.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem),inlineSize(_,_,65ch))
|h1$blockItem(margin(0,0,2.5rem))
|h2$blockItem(margin(0,0,2rem))
|h3$blockItem(margin(0,0,1.75rem))
|p$blockItem(margin(0,0,1.5rem))

**description:** A Block layout for a documentation page with wide outer padding, generous bottom margins on section-level elements, and tighter margins on paragraphs and code blocks to group related content visually within each section.
**csss:**
$Block(padding(2rem),breakWord)
|*$BlockItem(margin(0,0,1.5rem))
|h1$blockItem(margin(0,0,3rem))
|h2$blockItem(margin(0,0,2rem))
|h3$blockItem(margin(0,0,1.5rem))
|p$blockItem(margin(0,0,1rem))
|pre$blockItem(margin(0,0,1rem))

**description:** A Block layout for a product detail page with a constrained max-width of 800px, a full-bleed hero image block at the top with no bottom margin, and evenly spaced descriptive sections stacked below it, with overflow clipped so hero images never bleed outside the container.
**csss:**
$Block(padding(1.5rem),overflowClip)
|*$BlockItem(margin(0,0,1.5rem),inlineSize(_,_,800px))
|.hero$blockItem(margin(0,0,0))
|.description$blockItem(margin(0,0,1.5rem))
|.specs$blockItem(margin(0,0,1.5rem))

**description:** A Block layout for a sidebar navigation panel with no inline padding, compact vertical spacing between nav items, and extra top margin on group headings to create clear visual clusters without decorative separators.
**csss:**
$Block(padding(1.5rem,0),overflowAuto)
|*$BlockItem(margin(0.25rem,0))
|.nav-group$blockItem(margin(1.5rem,0,0))

**description:** A Block layout for a card list where each card is horizontally centered with a max-width of 400px, receives equal top and bottom margins, and section headings above groups of cards get double the bottom margin for clear grouping.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(1rem,auto),inlineSize(_,_,400px))
|.section-title$blockItem(margin(0,0,2rem))

**description:** A Block layout for a FAQ page with an accordion-style structure where question blocks carry a larger bottom margin than their associated answer blocks, and the container itself has generous top and bottom padding to frame the content.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem))
|.question$blockItem(margin(0,0,2rem))
|.answer$blockItem(margin(0,0,1rem))

**description:** A Block layout for a legal or terms-of-service document with a tight reading width of 700px, major numbered sections receiving extra top margin for separation, and nested sub-items indented with a left margin to indicate hierarchy.
**csss:**
$Block(padding(1.5rem),breakWord)
|*$BlockItem(margin(0,0,1.5rem),inlineSize(_,_,700px))
|.section$blockItem(margin(1.5rem,0,0))
|.sub-item$blockItem(margin(0,0,0,1.5rem))

**description:** A Block layout for a resume or CV with a full-width container, section headings getting a large bottom margin to anchor each section, individual entries with moderate vertical spacing, and fine-detail sub-lines with tight margins.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem))
|.section-heading$blockItem(margin(0,0,2rem))
|.entry$blockItem(margin(0,0,1rem))
|.sub-line$blockItem(margin(0,0,0.5rem))

**description:** A Block layout for a news article with a 600px centered content column, a flush top header with no leading margin, inline pullquotes floating to the end side with a left margin, and paragraphs clearing the end-side float so they always sit below pulled quotes.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem),inlineSize(_,_,600px))
|.header$blockItem(margin(0,0,0))
|.pullquote$blockItem(floatEnd,margin(0,0,1.5rem,1.5rem))
|.paragraph$blockItem(clearEnd,margin(0,0,1.5rem))

**description:** A Block layout for a settings or preferences panel with form groups separated by visible top margins, items stacked flush to the container edges with zero inline padding, and the last item in each group carrying no trailing margin.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem))
|.form-group$blockItem(margin(1.5rem,0,0))
|.form-item$blockItem(margin(0,0,0))

**description:** A Block layout for a user profile page with a centered column up to 500px wide, a top avatar block that has no bottom gap and bleeds into the bio section, followed by stats and action blocks with a consistent small vertical rhythm.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,auto),inlineSize(_,_,500px))
|.avatar$blockItem(margin(0))
|.bio$blockItem(margin(0,0,1.5rem))
|.stats$blockItem(margin(0,0,1.5rem))
|.actions$blockItem(margin(0,0,1.5rem))

**description:** A Block layout for a mobile-first stacked content view where all items are full-width with small vertical margins, the outer container adds horizontal padding that scales with viewport width, and headings receive proportionally larger bottom margins.
**csss:**
$Block(padding(1.5rem,5vw))
|*$BlockItem(margin(0,0,1.5rem))
|h1$blockItem(margin(0,0,2.5rem))
|h2$blockItem(margin(0,0,2rem))
|h3$blockItem(margin(0,0,1.75rem))
|p$blockItem(margin(0,0,1.5rem))

**description:** A Block layout for a recipe page with a large title block carrying extra bottom margin, an ingredients list and step-by-step blocks with tight uniform gaps, and a floating metadata summary anchored to the start side beside the first body paragraph.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,0,1.5rem))
|.title$blockItem(margin(0,0,2rem))
|.metadata$blockItem(floatStart,margin(0,1.5rem,1rem,0))
|.ingredients$blockItem(clearStart,margin(0,0,1.5rem))
|.steps$blockItem(margin(0,0,1.5rem))

**description:** A Block layout for an email newsletter column capped at 600px with centered alignment, alternating section blocks that use top margin to space content rhythmically, and a footer block whose inner content floats to the end side.
**csss:**
$Block(padding(1.5rem))
|*$BlockItem(margin(0,auto),inlineSize(_,_,600px))
|.section$blockItem(margin(0,0,1.5rem))
|.footer$blockItem(margin(0,0,0))
|.footer-content$blockItem(floatEnd,margin(0))

**description:** A Block layout for a compact dashboard widget with no outer padding, tightly packed rows with only 0.25rem vertical gaps, widget header blocks with a slightly larger bottom margin to separate them from their data rows, and a permanent scrollbar so the layout never shifts when content changes.
**csss:**
$Block(padding(0),overflowScroll)
|*$BlockItem(margin(0.25rem,0))
|.widget-header$blockItem(margin(0,0,0.5rem))
|.data-row$boxItem(blockSize(2.5rem),margin(0,0,0))

**description:** A full-screen vertical slideshow where each slide fills the viewport height and snaps mandatorily into place, with scroll padding and scroll margin offsetting a fixed 3.5rem top navigation bar, and an intro spacer that is explicitly opted out of snapping.
**csss:**
$Block(padding(0))$Box(overflowSnapMandatory,scrollPadding(3.5rem,0))
|*$BlockItem(margin(0))$BoxItem(blockSize(100vh),snapStart,scrollMargin(3.5rem,0,0))
|.intro$blockItem()$boxItem(noSnap)

**description:** A long-form article where major section headings softly snap into view when scrolling stops, using scroll margin to keep each section from hiding behind a sticky header, and snapStop ensures the scroll always comes to rest exactly on a heading.
**csss:**
$Block(padding(2rem))$Box(overflowSnap,scrollPadding(2rem,0))
|*$BlockItem(margin(0,0,2rem))
|h2$blockItem()$boxItem(snapStart,snapStop,scrollMargin(2rem,0,0))
|h3$blockItem()$boxItem(snapStart,snapStop,scrollMargin(2rem,0,0))

**description:** A tall sidebar panel that scrolls vertically when content overflows but clips any content that spills horizontally, keeping the layout clean without a horizontal scrollbar.
**csss:**
$Block(padding(1rem),overflowAutoHidden)
|*$BlockItem(margin(0,0,0.5rem))
|.group-header$blockItem(margin(1.5rem,0,0.5rem))

**description:** A block layout with a start-side figure and an end-side aside that float beside the body text, and a footer that clears both floats to always sit below all floated content.
**csss:**
$Block(padding(1.5rem),overflowHidden)
|*$BlockItem(margin(0,0,1rem))
|.figure$blockItem(floatStart,inlineSize(40%),margin(0,1.5rem,1rem,0))
|.aside$blockItem(floatEnd,inlineSize(30%),margin(0,0,1rem,1.5rem))
|.footer$blockItem(clear,margin(2rem,0,0))

**description:** A content block for East Asian text where words must never be broken mid-word at line ends, giving natural CJK line-breaking with generous paragraph spacing.
**csss:**
$Block(padding(1.5rem),keepAll)
|*$BlockItem(margin(0,0,1.25rem))
|h2$blockItem(margin(0,0,1.75rem))

**description:** A debug log or hash-display panel where every character is an eligible break point so that long unbreakable strings like SHA hashes or minified code never overflow their container.
**csss:**
$Block(padding(1rem),breakAnywhere)
|*$BlockItem(margin(0,0,0.25rem))
|.log-entry$boxItem(inlineSize(100%),margin(0,0,0.5rem))

**description:** A square thumbnail gallery where each item is a fixed 10rem by 10rem block centered horizontally with auto inline margins, and each thumbnail snaps to center as the user scrolls through the stack.
**csss:**
$Block(padding(1.5rem),overflowSnap)
|*$BlockItem(margin(0.5rem,auto))$BoxItem(size(10rem,10rem),snapCenter)