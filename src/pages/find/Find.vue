<template>
<div class="index" :class="{searchTop:searchActive,swipperTop:tabbarIsFixed}" ref="index">
  <div class="scrollTopTop" v-show="showScrollToTop" @click="scrollToTop">返回顶部</div>
    <common-header/>
     <h2 class="indexHeader" ref="indexHeader">
        五星生活在等你哦~
    </h2>
    <common-search ref="commonSearchDom"/>
    <keep-alive include="IndexSwiper">
      <index-swiper ref="indexSwiper" v-if="IndexSwiperShow"/>
    </keep-alive>
  <div class="indexTabbar" >
    <!-- tab-container -->
    <div ref="wrapper" class="wrapper">
      <keep-alive>
        <index-nav/>
      </keep-alive>
    </div>

  </div>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
// import BScroll from 'better-scroll'
import CommonSearch from 'common/commonSearch/CommonSearch'
import CommonHeader from 'common/commonHeader/CommonHeader'
import IndexSwiper from './components/IndexSwiper'
import IndexNav from './components/IndexNav'
import Brand from '@/pages/brand/Brand'
export default {
  name: 'Find',
  components: {
    IndexNav,
    CommonHeader,
    CommonSearch,
    IndexSwiper,
    Brand
  },
  data () {
    return {
      showScrollToTop: false,
      IndexSwiperShow: true
    }
  },
  computed: {
    isShowScrollToTop: {
      get () {
        return this.showScrollToTop
      },
      set (v) {
        this.showScrollToTop = v
      }
    },
    ...mapState({
      searchActive: state => state.home.searchActive,
      tabbarIsFixed: state => state.home.tabbarIsFixed
    })
  },
  methods: {
    ...mapMutations(['changeSearchActive', 'changeTabbarFixed']),
    scrollToTop () {
      this.$refs.indexHeader.scrollIntoView()
    }
  },
  mounted () {
    const searchTop = this.$refs.commonSearchDom.$el.offsetTop - this.$refs.commonSearchDom.$el.style.height
    const swiperTop = this.$refs.indexSwiper.$el.offsetTop
    let _this = this
    window.addEventListener('scroll', function () {
      const documentScrollTop = document.documentElement.scrollTop
      // alert(documentScrollTop)
      const searchActive = !(searchTop > documentScrollTop)
      _this.changeSearchActive(searchActive)
      const tabbarIsFixed = !(swiperTop > documentScrollTop)
      _this.isShowScrollToTop = documentScrollTop > 800
      _this.changeTabbarFixed(tabbarIsFixed)
    })
  }
}
</script>
<style lang="stylus" scoped>
.searchTop.index
  padding-top 266px
 .swipperTop.index
  padding-top 355px
.index
  padding-top  136px
.indexHeader
  color #333
  font-size 86px
  height 168px
  line-height 168px
  padding 0 50px
.scrollTopTop
  height 80px
  line-height 80px
  width 260px
  text-align center
  border-radius 40px
  position fixed
  top 380px
  left 50%
  transform  translateX(-50%)
  z-index 10000
  color #EFEFEF
  font-size 36px
  background rgba(0,0,0,1)
  opacity 0.5
</style>

<style lang="stylus" >
.indexTabbar
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
