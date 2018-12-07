<template>
  <div class="activitysTitle">
    <h3>{{activitysTitle.title}}</h3>
    <span>{{activitysTitle.subTitle}}</span>
  </div>
</template>
<script>
export default {
  props: {
    activitysTitle: Object
  }
}
</script>
<style lang="stylus" scoped>
  .activitysTitle
    width 100%
    box-sizing border-box
    padding 0 50px
    height 160px
    h3
      display inline-block
      width auto
      height 160px
      line-height 160px
      margin-right 54px
      font-size 60px
      font-weight 600
      color #333
    span
      display inline-block
      font-size 40px
      color #999999
</style>
