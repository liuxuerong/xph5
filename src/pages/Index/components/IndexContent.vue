<template>
  <div class="indexContent">
    <h5 class="title">2018居家新风向</h5>
    <div class="content">
      文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说
    </div>
  </div>
</template>
<script>
export default {
  name: 'IndexContent'
}
</script>
<style lang="stylus" scoped>
@import "~styles/mixins.styl";
.indexContent
  margin-top -150px
  .title
    height 140px
    line-height 140px
    font-size 46px
    ellipsis()
  .content
    color #808080
    font-size 36px
    line-height 60px
    ellipsisM()
    -webkit-line-clamp 2
</style>
