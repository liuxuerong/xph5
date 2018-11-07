<template>
  <div class="xpGoods">
    <keep-alive>
      <div>
        <common-nav-search />
        <div class="xpGoodsTop border-bottom" ref="xpGoodsTop">
          <div class="xpGoodsTopContent">
            <tab v-if="tabbar.length">
              <tab-item :selected="index===0" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.id" :id="item.id" ref="tabItem">{{item.catName}}</tab-item>
            </tab>
          </div>
        </div>
        <div ref="xpStoryContent" class="xpStoryContent">
          <div>
            <ul class="goodsContainer" v-if="goodsList.length">
              <li v-for="item in goodsList" v-if="goodsList.length" :key="item.id">
                <common-img-prices :pricesData="item" />
              </li>
            </ul>
            <common-empty v-else :emptyObj="emptyObj" />
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import CommonNavSearch from 'common/commonHeader/CommonNavSearch'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import {
  Tab,
  TabItem
} from 'vux'
import {
  http
} from 'util/request'
import {
  category,
  goodsList
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import BScroll from 'better-scroll'
export default {
  name: 'Story',
  components: {
    CommonNavSearch,
    CommonImgPrices,
    CommonEmpty,
    Tab,
    TabItem

  },
  data () {
    return {
      imageUrl: config.imageUrl,
      goodsCategoryList: [],
      tabbar: [],
      goodsList: [],
      page: 1,
      categoryId: '',
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
  // watch: {
  //   '$route' (to, from) {
  //     this.$router.go(0)
  //   }
  // },
  methods: {
    getTabbar () {
      http(category).then(res => {
        for (let i = 0; i < res.data.body.length; i++) {
          this.tabbar.push(res.data.body[i])
          this.categoryId = this.tabbar[0].id
        }
        this.getGoodsList(this.categoryId, this.page)
      })
    },
    onItemClick (index) {
      this.categoryId = this.$refs.tabItem[index].$el.id
      this.page = 1
      this.getGoodsList(this.categoryId, this.page)
      this.scroll.refresh()
    },
    getGoodsList (categoryId, page) {
      const param = {
        page: page,
        rows: 20,
        categoryId: categoryId
      }
      http(goodsList, param).then(res => {
        console.log(res)
        this.goodsList = res.data.body.list
        console.log()
        this.scrollInit()
      })
    },

    scrollInit () {
      this.scroll = new BScroll(this.$refs.xpStoryContent, {
        scrollY: true,
        click: true,
        pullUpLoad: {
          threshold: -50,
          moreTxt: '加载更多',
          noMoreTxt: '没有更多数据了'
        },
        bounce: {
          top: false,
          bottom: true
        }
      })
      this.scroll.on('pullingUp', () => {
        this.getGoodsList(this.categoryId, this.page++)
        this.scroll.refresh()
        // this.finishPullUp()
      })
      return this.scroll
    },
    scrollInitTopBar () {
      return (this.scrollTopBar = new BScroll(this.$refs.xpGoodsTop, {
        scrollX: true,
        scrollY: false,
        click: true,
        bounce: {
          left: true,
          right: true
        }
      }))
    }
  },
  mounted () {
    this.getTabbar()
  }
}
</script>

<style lang="stylus" scoped>
  .xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
    font-weight: 600;
    position relative
  .xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected::before
    content ""
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
    font-size 46px
.xpGoods
  height 100%
  padding-top 202px
  background #f5f5f5
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
    z-index 9999999
    padding 0 50px
    background-color #fff
  .xpStoryContent
    height 100%
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
  padding-top 150px
  background-color #fff
  li
    margin-bottom 250px
.border-bottom::before
  z-index 9999
</style>
