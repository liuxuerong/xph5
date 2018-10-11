<template>
  <div class="indexNav">
    <div ref="wrapper">
        <mt-navbar v-model="selected" class="border-bottom">
        <mt-tab-item id="1">星品推荐</mt-tab-item>
        <mt-tab-item id="2">酒店用品</mt-tab-item>
        <mt-tab-item id="3">居家优品</mt-tab-item>
        <mt-tab-item id="4">限时购</mt-tab-item>
      </mt-navbar>
    </div>

    <!-- tab-container -->
    <mt-tab-container  v-model="selected">
      <mt-tab-container-item id="1">
      <div class="indexNavItem">
        <index-nav-swiper/>
      <div class="goodsContainer">
        <common-img-prices class="goodsItem"/>
        <common-img-prices class="goodsItem"/>
        <common-img-prices class="goodsItem"/>
        <div class="moreGoods">
            <a href="#">
              更多<br>
              商品
            </a>
        </div>
      </div>
      </div>
      <div class="indexNavItem">
        <index-nav-banner/>
        <div class="goodsContainer">
          <common-img-prices class="goodsItem"/>
          <common-img-prices class="goodsItem"/>
          <common-img-prices class="goodsItem"/>
          <div class="moreGoods">
          </div>
        </div>
      </div>
      <div class="indexNavItem">
        <index-nav-banner/>
        <index-content/>
      </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        2
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        3
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
import { recommend } from 'util/netApi'
import { http } from 'util/request'
export default {
  name: 'IndexNav',
  data () {
    return {
      selected: '1'
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
      // const url = utilConfig.baseUrl + '/v1/article/api/find/recommend'
      // axios.get(url).then((res) => {
      //   console.log(res)
      // })
      async function test () {
        this.provinces = await http(recommend)
      }
      test().then((res) => {
        console.log(res)
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
