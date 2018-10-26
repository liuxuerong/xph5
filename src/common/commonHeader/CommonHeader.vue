<template>
  <div class="header border-bottom">
    <div class="scan" v-if="isScan">
    </div>
    <router-link to="/search"  v-else>
    <div class="search ">
    </div>
    </router-link>
    <slot></slot>
    <div class="car">
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonHeader',
  props: {
    isScan: {
      type: Boolean,
      default: true
    }
  }
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
  display flex
  justify-content space-between
  .scan
    width 83px
    height 83px
    bgImage("/static/icons/scan")
    margin-right 40px
    vertical-align middle
    margin-top 10px
  .search
    width 60px
    height 60px
    bgImage("/static/icons/search_black")
    margin-right 40px
    vertical-align middle
    margin-top 20px
  .car
    width 83px
    height 83px
    bgImage("/static/icons/car")
    margin-top 13px
</style>
