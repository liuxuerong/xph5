<template>
  <div class="header clearfix">
    <div class="scan fl">
    </div>
    <div class="car fr">
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonHeader'
}
</script>
<style lang="stylus" scoped>
@import '~styles/mixins.styl'
.header
  height 136px
  padding 18px 50px
  position fixed
  width 100%
  background-color #fff
  z-index 9999
  top 0
  .scan
    width 83px
    height 83px
    bgImage("/static/icons/scan")
    margin-right 40px
    vertical-align middle
    margin-top 10px
  .car
    width 83px
    height 83px
    bgImage("/static/icons/car")
    margin-top 13px
</style>
