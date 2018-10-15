<template>
  <div class="indexNav">
    <div ref="wrapper" class="wrapper">
        <mt-navbar v-model="selected" class="border-bottom">
        <mt-tab-item id="recommond">星品推荐</mt-tab-item>
        <mt-tab-item id="supplies">酒店用品</mt-tab-item>
        <mt-tab-item id="products">居家优品</mt-tab-item>
        <mt-tab-item id="buy">限时购</mt-tab-item>
      </mt-navbar>
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
            v-if="recommendFlag"/>
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
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="supplies">
         <div class="indexNavItem">
          <index-nav-swiper
          :swiperData="indexProductsData.homeSelection"
          :showContent="false"
          v-if="productsFlag"/>
        </div>
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
      </mt-tab-container-item>
      <mt-tab-container-item id="products">
        <div class="indexNavItem">
          <index-nav-swiper
          :swiperData="indexProductsData.homeSelection"
          :showContent="false"
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
      </mt-tab-container-item>
      <mt-tab-container-item id="buy">
        限时购
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
import BScroll from 'better-scroll'
import IndexNavSwiper from './IndexNavSwiper'
import IndexNavBanner from './IndexNavBanner'
import IndexContent from './IndexContent'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import { recommend, hotel, houseGoods, timeLimit } from 'util/netApi'
// import { recommend } from 'util/netApi'
import { http } from 'util/request'
import { config } from 'util/config.js'
export default {
  name: 'IndexNav',
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
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      bounce: {
        left: true,
        right: true
      },
      scrollX: true,
      click: true
    })
    this.getFindData()
  },
  methods: {
    getFindData () {
      // let url = recommend
      http(recommend)
        .then(res => {
          for (let key in res.data.body) {
            this.indexRecomondData[key] = res.data.body[key]
          }
          this.bestChoiceGoods = this.indexRecomondData.bestChoice.articles[0].goodsItems
          this.recommendFlag = true
        })
        .catch(err => {
          console.log(err)
        })
      http(hotel)
        .then(res => {
          for (let key in res.data.body) {
            this.indexSuppliesData[key] = res.data.body[key]
          }
          this.suppliesFlag = true
        })
        .catch(err => {
          console.log(err)
        })
      http(houseGoods)
        .then(res => {
          console.log(res)
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
      http(timeLimit)
        .then(res => {
          console.log(res)
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
  },
  components: {
    'mt-navbar': Navbar,
    'mt-tab-item': TabItem,
    'mt-tab-container': TabContainer,
    'mt-tab-container-item': TabContainerItem,
    IndexNavSwiper,
    CommonImgPrices,
    IndexNavBanner,
    IndexContent
  }
}
</script>
<style lang="stylus" >
.indexNav
  padding 0 50px
  .wrapper
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
  .mint-navbar
    height 219px
    line-height 219px
    text-align left
    justify-content space-between
    width 1100px
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
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
</style>
<style lang="stylus" scoped>
.indexNav
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
    width 1100px
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
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
</style>
