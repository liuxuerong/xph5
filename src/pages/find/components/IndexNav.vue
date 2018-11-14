<template>
  <div class="indexNav">

    <div class="indexNavItem">
      <index-nav-swiper :swiperData="indexRecomondData.popularActivitys" :showContent="false" v-if="indexRecomondData.popularActivitys" :swiperOption='swiperOption'/>
    </div>
    <div class="indexNavItem">
      <index-nav-swiper :swiperData="indexRecomondData.newProducts" v-if="indexRecomondData.newProducts" :showContent="true" />
    </div>
    <div class="indexNavItem">
      <index-nav-banner :bannerData="indexRecomondData.newInfo" :showMore="true" :showContent="true" v-if="indexRecomondData.newInfo" />
    </div>
    <div class="indexNavItem">
      <index-nav-banner :bannerData="indexRecomondData.bestChoice" :showMore="false" :showContent="false" v-if="indexRecomondData.bestChoice" />
      <div class="goodsContainer">
        <common-img-prices class="goodsItem" v-for="item in bestChoiceGoods" :key="item.id" :pricesData="item" v-if="bestChoiceGoods.length" />
        <div class="moreGoods">
          <router-link to="/goods" v-if="bestChoiceGoods.length">查看<br>更多</router-link>
        </div>
        <div class="emptyBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexNavSwiper from './IndexNavSwiper'
import IndexNavBanner from './IndexNavBanner'
import IndexContent from './IndexContent'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import {
  recommend,
  timeLimit
} from 'util/netApi'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config.js'
export default {
  name: 'IndexNav',
  components: {
    IndexNavSwiper,
    CommonImgPrices,
    IndexNavBanner,
    IndexContent,
    CommonEmpty
  },
  data () {
    return {
      indexRecomondData: {},
      imageUrl: config.imageUrl,
      bestChoiceGoods: [],
      hotelDetails: '/hotelDetails/',
      swiperOption: {
        spaceBetween: 15,
        slidesPerView: 1.4,
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        }
      },
      emptyObj: {
        emptyImg: '/static/images/commentEmptyGoods.png',
        emptyBold: '暂无抢购商品',
        emptyP: '先去别的地方逛逛吧~',
        buttonText: null,
        buttonRouter: null
      }
    }
  },

  methods: {
    getRecommendData () {
      http(recommend)
        .then(res => {
          for (let key in res.data.body) {
            this.indexRecomondData[key] = res.data.body[key]
          }
          this.bestChoiceGoods = this.indexRecomondData.bestChoice.articles[0].goodsItems
        })
        .catch(err => {
          console.log(err)
        })
        // this.scrollInit()
    },
    getTimeLimitData () {
      http(timeLimit).then(res => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.getRecommendData()
    this.getTimeLimitData()
  }

}
</script>

<style lang="stylus">
.mint-tabbar.is-fixed.indexNavTabBar
  top 136px
  padding 0 50px
  width 16rem
</style>

<style lang="stylus" scoped>
.indexNav >>> .mint-tab-container
  margin-bottom 1.315556rem
.tabberItemCont>>>.mint-tab-item
  display inline-block
.tabberItemCont
  height: 1.946667rem;
  line-height: 1.946667rem;
  text-align: left;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 9.777778rem;
  display flex
.indexNav
  width 100%
  padding 0 50px
  overflow hidden
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
  .commonEmpty
    padding-top 100px
    padding-bottom 100px
.indexNavItem
  border-bottom 10px solid #F5F5F5
.indexNavItem:last-child
  border-bottom none
.emptyBox
  width 3.395556rem !important
</style>

<style lang="stylus">
.indexNav
  .mint-tabbar
    height 219px
    line-height 219px
    // text-align left
    // justify-content space-between
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
