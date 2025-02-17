export const tests = [[
  ` $flex(row, gap(4px), padding(22px,33px,44px))
      |$flex(margin(,0.1px,,20%))`,
  /*css*/`/*container 0*/
/*$flex(row,gap(4px),padding(22px,33px,44px))|$flex(margin(,0.1px,,20%))*/
:where(.\\$flex\\(row\\,gap\\(4px\\)\\,padding\\(22px\\,33px\\,44px\\)\\)\\|\\$flex\\(margin\\(\\,0\\.1px\\,\\,20\\%\\)\\)) {
  display: flex;
  gap: 4px;
  padding: 22px 33px 44px;
  padding-block: 22px 44px;
  padding-inline: 33px;
}
/*item 0*/
/*$flex(row,gap(4px),padding(22px,33px,44px))|$flex(margin(,0.1px,,20%))*/
:where(.\\$flex\\(row\\,gap\\(4px\\)\\,padding\\(22px\\,33px\\,44px\\)\\)\\|\\$flex\\(margin\\(\\,0\\.1px\\,\\,20\\%\\)\\)) >
:where(*) {
  margin-right: 20%;
  margin-left: 0.1px;
  margin-inline-start: 0.1px;
  margin-inline-end: 20%;
}`

], [

  `$flex(align(center,center))|*$flex(margin(10px))`,
  /*css*/`/*container 0*/
/*$flex(align(center,center))|*$flex(margin(10px))*/
:where(.\\$flex\\(align\\(center\\,center\\)\\)\\|\\*\\$flex\\(margin\\(10px\\)\\)) {
  display: flex;
  place-content: center center;
}
/*item 0*/
/*$flex(align(center,center))|*$flex(margin(10px))*/
:where(.\\$flex\\(align\\(center\\,center\\)\\)\\|\\*\\$flex\\(margin\\(10px\\)\\)) >
:where(*) {
  margin: 10px;
}`

], [

  `$flex(wrap(ellipsis))`,
  /*css*/`/*container 0*/
/*$flex(wrap(ellipsis))*/
:where(.\\$flex\\(wrap\\(ellipsis\\)\\)) {
  display: flex;
  overflow-y: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`
], [
  `$flex(gap(1rem),wrap(,auto),padding(1rem))
   $size(,80%)
  |* 
    $flex(0shrink,align(center))
    $size(3rem,7rem)`,
  /*css*/`/*container 0*/
/*$flex(gap(1rem),wrap(,auto),padding(1rem))$size(,80%)|*$flex(0shrink,align(center))$size(3rem,7rem)*/
:where(.\\$flex\\(gap\\(1rem\\)\\,wrap\\(\\,auto\\)\\,padding\\(1rem\\)\\)\\$size\\(\\,80\\%\\)\\|\\*\\$flex\\(0shrink\\,align\\(center\\)\\)\\$size\\(3rem\\,7rem\\)) {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem;
  width: 80%;
  inline-size: 80%;
}
/*item 0*/
/*$flex(gap(1rem),wrap(,auto),padding(1rem))$size(,80%)|*$flex(0shrink,align(center))$size(3rem,7rem)*/
:where(.\\$flex\\(gap\\(1rem\\)\\,wrap\\(\\,auto\\)\\,padding\\(1rem\\)\\)\\$size\\(\\,80\\%\\)\\|\\*\\$flex\\(0shrink\\,align\\(center\\)\\)\\$size\\(3rem\\,7rem\\)) >
:where(*) {
  flex-shrink: 0;
  place-self: center;
  height: 3rem;
  block-size: 3rem;
  width: 7rem;
  inline-size: 7rem;
}`
  // <div class="$flex-carousel-container">
  //   <p>THUMBNAIL</p>
  //   <p>THUMBNAIL</p>
  //   <p>THUMBNAIL</p>
  //   <p>THUMBNAIL</p>
  // </div>
]];