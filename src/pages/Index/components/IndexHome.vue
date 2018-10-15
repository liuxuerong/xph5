<template>
  <div class="home" >
    <div class="scrollTopTop" v-show="showScrollToTop">返回顶部</div>
    <common-header/>
     <h2 class="indexHeader">
      五星生活在等你哦~
    </h2>
    <common-search/>
    <keep-alive include="IndexSwiper">
      <index-swiper/>
    </keep-alive>
    <index-nav/>
  </div>
</template>
<script>
import CommonSearch from 'common/commonSearch/CommonSearch'
import CommonHeader from 'common/commonHeader/CommonHeader'
import IndexHeader from './IndexHeader'
import IndexSwiper from './IndexSwiper'
import IndexNav from './IndexNav'

export default {
  name: 'IndexBottomTabbar',
  data () {
    return {
      showScrollToTop: false
    }
  },
  props: {
    scroll: Object
  },
  mounted () {
    console.log(this.scroll)
  },
  methods: {},
  components: {
    CommonHeader,
    CommonSearch,
    IndexHeader,
    IndexSwiper,
    IndexNav
  }
}
</script>
<style lang="stylus" scoped>
.home
  padding-top 100px
.indexHeader
    color #333
    font-size 86px
    height 168px
    line-height 168px
    padding 0 50px
.indexTabbar
  padding 0 50px
  .goodsContainer
    display flex
    justify-content space-around
    flex-wrap wrap
    .goodsItem
      margin-bottom 140px
    .moreGoods
      width 382px
      a
        display block
        width 252px
        height 252px
        border 4px solid #808080
        font-size 40px
        color #808080
        line-height 56px
        text-align center
        margin 0 auto
        margin-top 157px
        padding-top 76px
  .mint-navbar
    height 219px
    line-height 219px
    text-align left
    justify-content space-between
  .mint-navbar .mint-tab-item
    padding 0
    padding-top 45px
    flex none
    .mint-tab-item-label
      height 130px
      line-height 130px
      font-size 46px
      color #333
      font-weight 600
      vertical-align top
  .mint-navbar .mint-tab-item.is-selected
    border 0
    .mint-tab-item-label
      display inline-block
      position relative
      font-size 76px
    .mint-tab-item-label::before
      content ''
      position absolute
      width 70%
      height 8px
      background-color #333
      left 50%
      transform translateX(-50%)
      bottom 0
  .mint-tabbar
    height 148px
    line-height 148px
    font-size 30px
    color #CCCCCC
    background-color #fff
    z-index 9999
  .mint-tab-item
    padding-top 35px
  .mint-tab-item:nth-child(3)
    .mint-tab-item-icon
      width 114px
      height 127px
      margin-top -25px
  .mint-tab-item-icon
    width 60px
    height 60px
    margin-bottom 17px
  .mint-tabbar > .mint-tab-item.is-selected
    color #BA825A
  .mint-tabbar > .mint-tab-item.is-selected
    background-color #fff
</style>
