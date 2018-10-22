<template>
  <div class="indexNav">
    <div ref="wrapper" class="indexNavWrapper">
      <mt-tabbar v-model="selected" class="border-bottom indexNavTabBar" :fixed="tabbarIsFixed">
        <mt-tab-item id="recommond">星品推荐</mt-tab-item>
        <mt-tab-item id="supplies">酒店用品</mt-tab-item>
        <mt-tab-item id="products">居家优品</mt-tab-item>
        <mt-tab-item id="buy">限时购</mt-tab-item>
      </mt-tabbar>
    </div>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected">
      <!-- 星品推荐 -->
      <mt-tab-container-item id="recommond">
        <div class="indexNavItem">
          <index-nav-swiper
            :swiperData="indexRecomondData.popularActivitys"
            :showContent="true"
            v-if="recommendFlag"/>
        </div>
         <div class="indexNavItem">
          <index-nav-swiper
            :swiperData="indexRecomondData.newProducts"
            v-if="recommendFlag"
            :showContent="true"/>
        </div>
        <div class="indexNavItem">
          <index-nav-banner
            :bannerData="indexRecomondData.newInfo"
            :showMore="true"
            :showContent="true"
            v-if="recommendFlag"/>
        </div>
        <div class="indexNavItem">
          <index-nav-banner
            :bannerData="indexRecomondData.bestChoice"
            :showMore="false"
            :showContent="false"
            v-if="recommendFlag"/>
          <div class="goodsContainer">
            <common-img-prices
              class="goodsItem"
              v-for="item in bestChoiceGoods"
              :key="item.id"
              :pricesData="item"
              v-if="recommendFlag"/>
            <div class="emptyBox"></div>
            <!-- <div class="moreGoods">
              <a href="#">查看<br>更多</a>
            </div> -->
          </div>
          <divider>哎呀！底线到了</divider>
        </div>

      </mt-tab-container-item>
      <mt-tab-container-item id="supplies">
        <index-nav-banner
          :bannerData="indexSuppliesData.fiveStarQuality"
          :showMore="false"
          :showContent="true"
          v-if="suppliesFlag"/>
        <index-nav-banner
          :bannerData="indexSuppliesData.fiveStarHotel"
          :showMore="false"
          :showContent="false"
          :showItems="true"
          v-if="suppliesFlag"/>
          <divider>哎呀！底线到了</divider>
      </mt-tab-container-item>
      <mt-tab-container-item id="products">
        <div class="indexNavItem">
          <index-nav-swiper
          :swiperData="indexProductsData.homeSelection"
          :showContent="false"
          :isShowImgTitle="true"
          v-if="productsFlag"/>
        </div>
        <div class="goodsContainer">
          <common-img-prices
            class="goodsItem"
            v-for="(item,index) in homeSelection"
            :key="item.id"
            :pricesData="item"
            v-if="productsFlag&&index<3"/>
          <div class="emptyBox"></div>
          <div class="moreGoods">
            <a href="#">查看<br>更多</a>
          </div>
        </div>
        <div class="indexNavItem">
          <index-nav-swiper
          :swiperData="indexProductsData.customized"
          :showContent="false"
          :isShowImgTitle="true"
          v-if="productsFlag"/>
        </div>

        <div class="goodsContainer">
            <common-img-prices
              class="goodsItem"
              v-for="(item,index) in customized"
              :key="item.id"
              :pricesData="item"
              v-if="productsFlag&&index<3"/>
            <div class="moreGoods">
              <a href="#">查看<br>更多</a>
            </div>
        </div>
         <div class="indexNavItem">
          <index-nav-banner
            :bannerData="indexProductsData.hotSale"
            :showMore="false"
            :showContent="false"
            v-if="productsFlag"/>
        </div>
         <div class="goodsContainer">
          <common-img-prices
            class="goodsItem"
            v-for="item in hotSale"
            :key="item.id"
            :pricesData="item"
            v-if="productsFlag"/>
          <div class="emptyBox"></div>
        </div>
        <divider>哎呀！底线到了</divider>
      </mt-tab-container-item>
      <mt-tab-container-item id="buy">
        限时购
      </mt-tab-container-item>

    </mt-tab-container>
  </div>
</template>
<script>
import { TabItem, TabContainer, TabContainerItem, Tabbar } from 'mint-ui'
import BScroll from 'better-scroll'
import IndexNavSwiper from './IndexNavSwiper'
import IndexNavBanner from './IndexNavBanner'
import IndexContent from './IndexContent'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import { recommend, hotel, houseGoods, timeLimit } from 'util/netApi'
import { http } from 'util/request'
import { config } from 'util/config.js'
import { mapState } from 'vuex'
import { Divider } from 'vux'
export default {
  name: 'IndexNav',
  components: {
    'mt-tabbar': Tabbar,
    'mt-tab-item': TabItem,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
    IndexNavSwiper,
    CommonImgPrices,
    IndexNavBanner,
    IndexContent,
    Divider
  },
  data () {
    return {
      selected: 'recommond',
      indexRecomondData: {},
      indexSuppliesData: {},
      indexProductsData: {},
      buyData: {},
      recommendFlag: false,
      suppliesFlag: false,
      productsFlag: false,
      buyFlag: false,
      bestChoiceGoods: [],
      homeSelection: [],
      customized: [],
      hotSale: [],
      imageUrl: config.imageUrl
    }
  },
  computed: mapState({
    tabbarIsFixed: state => state.home.tabbarIsFixed
  }),
  watch: {
    selected (val) {
      switch (val) {
        case 'supplies':
          this.getHotelData()
          break
        case 'products':
          this.getHouseGoodsData()
          break
        case 'buy':
          this.gettimeLimitData()
          break
        default:
          break
      }
    }
  },
  mounted () {
    // this.$vux.loading.show({
    //   // text: 'Loading'
    // })
    this.scroll = new BScroll(this.$refs.wrapper, {
      bounce: {
        left: true,
        right: true
      },
      scrollX: true,
      click: true
    })
    this.getRecommendData()
  },
  methods: {
    getRecommendData () {
      if (!this.recommendFlag) {
        http(recommend)
          .then(res => {
            if (res.data.code === 0) {
              this.$vux.loading.hide()
            }
            for (let key in res.data.body) {
              this.indexRecomondData[key] = res.data.body[key]
            }
            this.bestChoiceGoods = this.indexRecomondData.bestChoice.articles[0].goodsItems
            this.recommendFlag = true
            this.$vux.loading.hide()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getHotelData () {
      if (!this.suppliesFlag) {
        http(hotel)
          .then(res => {
            if (res.data.code === 0) {
              this.$vux.loading.hide()
            }
            for (let key in res.data.body) {
              this.indexSuppliesData[key] = res.data.body[key]
            }
            this.suppliesFlag = true
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    getHouseGoodsData () {
      if (!this.productsFlag) {
        http(houseGoods)
          .then(res => {
            if (res.data.code === 0) {
              this.$vux.loading.hide()
            }
            for (let key in res.data.body) {
              this.indexProductsData[key] = res.data.body[key]
            }
            this.productsFlag = true
            this.homeSelection = this.indexProductsData.homeSelection.articles[0].goodsItems
            this.customized = this.indexProductsData.customized.articles[0].goodsItems
            this.hotSale = this.indexProductsData.hotSale.articles[0].goodsItems
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    gettimeLimitData () {
      if (!this.buyFlag) {
        http(timeLimit)
          .then(res => {
            if (res.data.code === 0) {
              this.$vux.loading.hide()
            }
            for (let key in res.data.body) {
              this.buyData[key] = res.data.body[key]
            }
            this.buyFlag = true
          // this.homeSelection = this.indexProductsData.homeSelection.articles[0].goodsItems
          // this.customized = this.indexProductsData.customized.articles[0].goodsItems
          // this.hotSale = this.indexProductsData.hotSale.articles[0].goodsItems
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

}
</script>
<style lang="stylus">
.mint-tabbar.is-fixed.indexNavTabBar
  top 136px
  // padding 0 50px
  // width 10.9rem
</style>

<style lang="stylus" scoped>
.indexNav >>> .mint-tab-container
  margin-bottom 1.315556rem
.indexNav
  padding 0 50px
  .indexNavWrapper
    overflow hidden
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
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
</style>
<style lang="stylus">
.indexNav
  .mint-tabbar
    height 219px
    line-height 219px
    text-align left
    justify-content space-between
    width 1100px
  .mint-tabbar .mint-tab-item
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
  .mint-tabbar .mint-tab-item.is-selected
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
</style>
