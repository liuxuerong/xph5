<template>
  <div class="wrapper">
    <div class="centerTitle">
    <h3 class="bgFontTitle">个人中心</h3>
  </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .centerTitle
    width 100%
    height 160px
    line-height 160px
  .bgFontTitle
    float left
    width auto
    font-size 56px
    font-weight bold
    color #fff
  .seeMore
    float right
    width auto
    font-size 36px
    font-weight normal
    color #fff
    .moreIcon
      display inline-block
      width 24px
      height 45px
      bgImage('/static/icons/enterNextGray')
      margin-left 18px
      vertical-align middle
      position relative
      top -4px
</style>
