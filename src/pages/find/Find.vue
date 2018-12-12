<template>
  <div class="xpGoods">
    <keep-alive>
      <div class="xpGoodsWrap">
        <div class="xpGoodsTop" ref="xpGoodsTop" v-show="isFixed">
          <div class="xpGoodsTopContent">
            <tab v-if="tabbar.length">
              <tab-item :selected="index===pageIndex" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.categoryId" :id="item.categoryId" ref="tabItem">{{item.customName}}</tab-item>
            </tab>
          </div>
        </div>
        <div class="index searchActive" ref="index">
          <div class="scrollTopTop" v-show="showScrollToTop" @click="scrollToTop"></div>
          <common-header ref="commonHeader" />
          <!-- <h2 class="indexHeader" ref="indexHeader">
                五星生活在等你哦~
              </h2> -->
          <common-search ref="commonSearchDom" class="searchActive" />
          <div ref="topScroll" style="opacity:0;width:0;heigth:0"></div>
          <index-swiper ref="indexSwiper" v-if="IndexSwiperShow" />
          <div class="navBox">
            <div class="item wrap left" @click="touristToolCenter">
              <h2>会员福利</h2>
              <h4>material comforts</h4>
            </div>
            <div class="right wrap">
              <router-link to="/activitysList" class="item top">
                <h2>活动精选</h2>
                <h4>Featured</h4>
              </router-link>
              <router-link to="/hotel" class="item bottom">
                <h2>酒店用品</h2>
                <h4>hotel supplies</h4>
              </router-link>
            </div>
          </div>
          <!-- IndexStoreActivity -->
          <index-store-activity :swiperData="franchiseeActivitys" v-if="franchiseeActivitys.length" />
          <index-new-products :swiperData="newProducts" v-if="newProducts.length" />
          <index-goods-label :goodsLabel="goodsLabel" v-if="goodsLabel" />
          <h6 class="className">热门品类</h6>
        </div>
        <div ref="xpStoryContent" class="xpStoryContent" :class="{fixed:isFixed}">
          <div class="xpStoryContentChild">
            <div class="xpGoodsTop" ref="xpGoodsTop" v-show="!isFixed">
              <div class="xpGoodsTopContent">
                <tab v-if="tabbar.length">
                  <tab-item :selected="index===pageIndex" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.categoryId" :id="item.categoryId" ref="tabItem">{{item.customName}}</tab-item>
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
// import IndexLimit from './components/IndexLimit'
import IndexStoreActivity from './components/IndexStoreActivity'
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
  // category,
  goodsList,
  findData
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import {
  storage
} from 'util/storage'
import {
  accessToken
} from 'util/const'
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
    IndexStoreActivity,
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
      commonHeader: null,
      index: null,
      goodsItemH: 0,
      classfiyBannerH: 0,
      showScrollToTop: false,
      IndexSwiperShow: true,
      searchActive: false,
      franchiseeActivitys: [],
      newProducts: [],
      goodsLabel: null,
      timer: '',
      emptyObj: {
        emptyImg: '/static/images/commentEmptyGoods.png',
        emptyBold: '暂无商品',
        emptyP: '此类商品暂未上架，星品君正在努力挖掘中..',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  created () {
    let _this = this
    window.addEventListener('scroll', _this.getTop)
  },
  methods: {
    scrollToTop () {
      this.$refs.topScroll.scrollIntoView()
    },
    getFindData () {
      http(findData).then(res => {
        this.franchiseeActivitys = res.data.body.franchiseeActivitys
        console.log(res)
        this.newProducts = res.data.body.newProducts
        this.goodsLabel = res.data.body.goodsLabel
        let allCategoryMenu = res.data.body.allCategoryMenu
        for (let i = 0; i < allCategoryMenu.length; i++) {
          this.tabbar.push(allCategoryMenu[i])
          this.categoryId = this.tabbar[0].categoryId
        }
        this.getGoodsList(this.categoryId, this.page)
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
          this.goodsListData = this.goodsListData.concat(res.data.body.list)
          this.$nextTick(function () {
            this.timer = setTimeout(() => {
              this.commonHeader = this.$refs.commonHeader.$el.offsetHeight
              this.index = this.$refs.index
              if (this.$refs.goodsItem.length) {
                this.goodsItemH = this.$refs.goodsItem[0].offsetHeight
                this.classfiyBannerH = this.$refs.classfiyBanner.offsetHeight
              }
              this.changeStatus()
            }, 20)
          })
        })
      }
    },
    changeStatus () {
      const _this = this
      window.addEventListener('scroll', _this.getTop)
    },
    getTop () {
      const goodsTop = this.index.offsetHeight
      const documentScrollTop = window.pageYOffset || document.documentElement.scrollTop
      this.isFixed = documentScrollTop + this.commonHeader > goodsTop
      // this.searchActive = !(searchTop > documentScrollTop)
      this.showScrollToTop = documentScrollTop + this.commonHeader > goodsTop + this.goodsItemH * 3 + this.classfiyBannerH
      if (document.documentElement.scrollHeight - documentScrollTop - 20 < document.documentElement.clientHeight) {
        if (!this.noMore && this.goodsListData.length) {
          this.page++
          this.getGoodsList(this.categoryId, this.page)
        }
      }
    },
    // 会员福利
    touristToolCenter () {
      if (storage.getLocalStorage(accessToken)) {
        this.$router.push('/toolCenter')
      } else {
        this.$router.push('/touristToolCenter')
      }
    }
  },
  mounted () {
    // this.getTabbar()
    this.getFindData()
  },
  destroyed () {
    this.timer = null
    const _this = this
    window.removeEventListener('scroll', _this.getTop)
  }
}
</script>

<style lang="stylus" scoped>
.xpStoryContentChild
  min-height 100%
  position relative
.className
  padding-left 50px
  color #333333
  font-size 66px
  margin-bottom 20px
  font-weight: 600;
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
  font-weight 600
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
      font-weight 600
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

<style lang="stylus">
.xpStoryContentChild
  .vux-divider
    position absolute
    bottom 148px
</style>
