<template>
  <div class="xpGoods">
    <keep-alive>
      <div class="xpGoodsWrap">
        <div class="xpGoodsTop border-bottom" ref="xpGoodsTop" v-show="isFixed">
          <div class="xpGoodsTopContent">
            <tab v-if="tabbar.length">
              <tab-item :selected="index===pageIndex" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.id" :id="item.id" ref="tabItem">{{item.catName}}</tab-item>
            </tab>
          </div>
        </div>
        <div class="index" :class="{searchTop:searchActive}" ref="index">
          <div class="scrollTopTop" v-show="showScrollToTop" @click="scrollToTop"></div>
          <common-header ref="commonHeader" />
          <h2 class="indexHeader" ref="indexHeader">
            五星生活在等你哦~
          </h2>
          <common-search ref="commonSearchDom" :class="{searchActive:searchActive}" />
          <index-swiper ref="indexSwiper" v-if="IndexSwiperShow" />
          <div class="navBox">
            <router-link to="/touristToolCenter" class="item wrap left">
              <h2>会员福利</h2>
              <h4>material comforts</h4>
            </router-link>
            <div class="right wrap">
              <router-link to="/activitysList/0" class="item top">
                <h2>活动精选</h2>
                <h4>Featured</h4>
              </router-link>
              <router-link to="/hotel" class="item bottom">
                <h2>酒店用品</h2>
                <h4>hotel supplies</h4>
              </router-link>
            </div>
          </div>
          <index-limit :swiperData="timeLimitShoppings" v-if="timeLimitShoppings.length" />
          <index-new-products :swiperData="newProducts" v-if="newProducts.length" />
          <index-goods-label :goodsLabel="goodsLabel" v-if="goodsLabel" />
          <!-- <index-nav  :timeLimitShoppings="timeLimitShoppings" :newProducts="newProducts"/> -->
        </div>
        <h6 class="className">全品目录</h6>

        <div ref="xpStoryContent" class="xpStoryContent" :class="{fixed:isFixed}">
          <div>
            <div class="xpGoodsTop border-bottom" ref="xpGoodsTop" v-show="!isFixed">
              <div class="xpGoodsTopContent">
                <tab v-if="tabbar.length">
                  <tab-item :selected="index===pageIndex" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.id" :id="item.id" ref="tabItem">{{item.catName}}</tab-item>
                </tab>
              </div>
            </div>
            <ul class="goodsContainer" v-if="goodsListData.length">
              <div class="classfiyBanner" ref="classfiyBanner">
                <img src="/static/images/classfiyBanner.png" alt="">
              </div>
              <li v-for="item in goodsListData" v-if="goodsListData.length" :key="item.id" ref="goodsItem">
                <common-img-prices :pricesData="item" />
              </li>
              <li v-if="(noMore&&goodsListData.length%2!==0)||(goodsListData.length<20&&goodsListData.length>0&&goodsListData.length%2!==0)">
                <div class="moreTip">
                  更多新品<br>正在研发中...
                </div>
              </li>
            </ul>
            <divider v-if="noMore">已经到达最底部</divider>
            <common-empty v-if="!noMore&&!goodsListData.length" :emptyObj="emptyObj" />
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
// import PullTo from 'vue-pull-to'
import CommonNavSearch from 'common/commonHeader/CommonNavSearch'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import CommonSearch from 'common/commonSearch/CommonSearch'
import CommonHeader from 'common/commonHeader/CommonHeader'
import IndexSwiper from './components/IndexSwiper'
import IndexGoodsLabel from './components/IndexGoodsLabel'
import IndexLimit from './components/IndexLimit'
import IndexNewProducts from './components/IndexNewProducts'
import {
  Tab,
  TabItem,
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  category,
  goodsList,
  findData
} from 'util/netApi'
import {
  config
} from 'util/config.js'
export default {
  name: 'Find',
  components: {
    CommonNavSearch,
    CommonImgPrices,
    CommonEmpty,
    Tab,
    TabItem,
    Divider,
    IndexGoodsLabel,
    CommonHeader,
    CommonSearch,
    IndexSwiper,
    // PullTo,
    IndexLimit,
    IndexNewProducts
  },
  props: {},
  data () {
    return {
      imageUrl: config.imageUrl,
      goodsCategoryList: [],
      tabbar: [],
      goodsListData: [],
      page: 1,
      pageIndex: 0,
      categoryId: '',
      isFixed: false,
      noMore: false,
      searchTop: null,
      commonHeader: null,
      index: null,
      goodsItemH: 0,
      classfiyBannerH: 0,
      showScrollToTop: false,
      IndexSwiperShow: true,
      searchActive: false,
      timeLimitShoppings: [],
      newProducts: [],
      goodsLabel: null,
      emptyObj: {
        emptyImg: '/static/images/commentEmptyGoods.png',
        emptyBold: '暂无商品',
        emptyP: '此类商品暂未上架，星品君正在努力挖掘中..',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  computed: {},
  methods: {
    scrollToTop () {
      this.$refs.indexHeader.scrollIntoView()
    },
    getTabbar () {
      http(category).then(res => {
        for (let i = 0; i < res.data.body.length; i++) {
          this.tabbar.push(res.data.body[i])
          this.categoryId = this.tabbar[0].id
        }
        this.getGoodsList(this.categoryId, this.page)
      })
    },
    getFindData () {
      http(findData).then(res => {
        this.timeLimitShoppings = res.data.body.timeLimitShoppings
        this.newProducts = res.data.body.newProducts
        this.goodsLabel = res.data.body.goodsLabel
      }).catch(err => {
        console.log(err)
      })
    },
    onItemClick (index) {
      this.categoryId = this.$refs.tabItem[index].$el.id
      this.page = 1
      this.pageIndex = index
      this.goodsListData = []
      this.noMore = false
      this.getGoodsList(this.categoryId, this.page)
    },
    getGoodsList (categoryId, page) {
      const param = {
        page: page,
        rows: 20,
        categoryId: categoryId
      }
      if (!this.noMore) {
        http(goodsList, param).then(res => {
          if (this.page !== 1 && res.data.body.list.length === 0) {
            this.noMore = true
          }
          console.log(res)
          this.goodsListData = this.goodsListData.concat(res.data.body.list)
          this.$nextTick(function () {
            setTimeout(() => {
              this.searchTop = this.$refs.commonSearchDom.$el.offsetTop - this.$refs.commonSearchDom.$el.style.height
              this.commonHeader = this.$refs.commonHeader.$el.offsetHeight
              this.index = this.$refs.index
              if (this.$refs.goodsItem.length) {
                this.goodsItemH = this.$refs.goodsItem[0].offsetHeight
                this.classfiyBannerH = this.$refs.classfiyBanner.offsetHeight
              }
              this.getTop(this.searchTop, this.commonHeader, this.index, this.goodsItemH)
              this.changeStatus(this.searchTop, this.commonHeader, this.index, this.goodsItemH)
            }, 20)
          })
        })
      }
    },
    changeStatus (searchTop, commonHeader, index, goodsItem) {
      const _this = this
      window.addEventListener('scroll', function () {
        _this.getTop(searchTop, commonHeader, index, goodsItem)
      })
    },
    getTop (searchTop, commonHeader, index, goodsItem) {
      const goodsTop = index.offsetHeight
      const documentScrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.isFixed = documentScrollTop + commonHeader > goodsTop
      this.searchActive = !(searchTop > documentScrollTop)
      this.showScrollToTop = documentScrollTop + commonHeader > goodsTop + goodsItem * 3 + this.classfiyBannerH
      if (document.documentElement.scrollHeight - documentScrollTop - 20 < document.documentElement.clientHeight) {
        if (!this.noMore && this.goodsListData.length) {
          this.page++
          this.getGoodsList(this.categoryId, this.page)
        }
      }
    }
  },
  mounted () {
    this.getTabbar()
    this.getFindData()
  }
}
</script>

<style lang="stylus" scoped>
.className
  padding-left 50px
  color #333333
  font-size 66px
  margin-bottom 20px
  font-weight: 600;
.searchTop.index
  padding-top 266px
 .swipperTop.index
  padding-top 355px
.index
  padding-top 136px
  overflow hidden
  // position absolute
  width 100%
.indexHeader
  color #333
  font-size 86px
  height 168px
  line-height 168px
  padding 0 50px
.scrollTopTop
  width 110px
  height 110px
  border-radius 55px
  position fixed
  bottom 296px
  right 45px
  z-index 9999999
  background url(/static/icons/scrollTop.png) no-repeat center center/50% 50%
  background-color rgba(0,0,0,0.3)
.xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected
  color #333333
  border-bottom 8px solid #262626
  font-weight 600
  position relative
.xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected::before
  content ''
  position absolute
  bottom 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 8px
.xpGoodsTop>>>.vux-tab-ink-bar
  display none !important
.xpGoodsTop>>>.vux-tab-container
  height 106px
.xpGoodsTop>>>.vux-tab
  height 106px
.xpGoodsTop>>>.vux-tab .vux-tab-item
  height 106px
  line-height 106px
  font-size 42px
  margin-right 60px
.xpGoods
  height 100%
  background-color #fff
  .xpGoodsWrap
    height 100%
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 130px
    z-index 99999
    padding 0 50px
    background-color #fff
  .isFixed
    position relative !important
  .xpStoryContent
    height 100%
  .xpStoryContent>div
    padding-bottom 148px
  .xpStoryContent.fixed
    padding-top 108px
  .xpStoryContent.auto
    height auto
  h1.title
    font-size 56px
  .topBgImg
    width 100%
    height 400px
    img
      width 100%
      height 100%
.goodsContainer
  display flex
  flex-wrap wrap
  justify-content space-around
  background-color #fff
  padding-top 50px
  li
    padding-bottom 250px
  .emptyBox
    width 3.395556rem
  .moreTip
    padding-left 100px !important
  .moreTip::after
    left:104px
.border-bottom::before
  z-index 9999
.xpGoods .xpStoryContent .xpGoodsTop
  position relative
  top 0
  .swiper-slide
    width 100% !important
.navBox
  height 570px
  margin-bottom 120px
  display flex
  padding 0 50px
  .wrap
    flex 1
  .item
    padding 50px 0 0 50px
    h2
      color #333333
      font-size 46px
    h4
      color #333333
      font-size 24px
  .left
    background url("/static/images/recommond_bg.png") no-repeat center center/100% 100%
    margin-right 10px
  .right
    display flex
    flex-direction column
    .top
      background url("/static/images/goods_bg.png") no-repeat center center/100% 100%
      margin-bottom 10px
      flex 1
    .bottom
      background url("/static/images/hotel_bg.png") no-repeat center center/100% 100%
      flex 1
.classfiyBanner
  width 100%
  padding 0 50px 100px
  img
    width 100%
    height 360px
</style>
