<template>
  <div class="xpGoods">
    <keep-alive>
      <div class="xpGoodsWrap">
        <common-nav-search :showCart="showCart">
          {{title}}
        </common-nav-search>
        <div class="xpGoodsTop" ref="xpGoodsTop">
          <div class="xpGoodsTopContent">
            <tab v-if="tabbar.length" :scroll-threshold="2">
              <tab-item :selected="index==currentIndex" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="item.id" :id="item.id" ref="tabItem">{{item.catName}}</tab-item>
            </tab>
          </div>
        </div>
        <div ref="xpStoryContent" class="xpStoryContent">
          <div>
            <ul class="goodsContainer" v-if="goodsListData.length">
                <li v-for="item in goodsListData" v-if="goodsListData.length" :key="item.id">
                <common-img-prices :pricesData="item" :left="true"/>
              </li>
               <li v-if="(noMore&&goodsListData.length%2!==0)||(goodsListData.length<20&&goodsListData.length>0&&goodsListData.length%2!==0)">
                <div class="moreTip">
                  更多新品<br>正在研发中...
                </div>
              </li>
            </ul>
            <common-empty v-if="!noMore&&!goodsListData.length" :emptyObj="emptyObj" />
            <divider v-if="noMore">已经到达最底部</divider>
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
import emptyImg from '../../images/commentEmptyGoods.png'
import {
  storage
} from 'util/storage'
import {
  goodsListData
} from 'util/const'
import {
  Tab,
  TabItem,
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  goodsList
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  components: {
    CommonNavSearch,
    CommonImgPrices,
    CommonEmpty,
    Tab,
    TabItem,
    Divider
  },
  data () {
    return {
      tabbar: [],
      title: '',
      goodsListData: [],
      currentList: [],
      page: 1,
      categoryId: '',
      noMore: false,
      showCart: false,
      currentIndex: 1,
      emptyObj: {
        emptyImg,
        emptyBold: '暂无商品',
        emptyP: '此类商品暂未上架，星品君正在努力挖掘中..',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  methods: {

    onItemClick (index) {
      this.categoryId = this.$refs.tabItem[index].$el.id
      this.page = 1
      this.goodsListData = []
      this.noMore = false
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
        this.goodsListData = this.goodsListData.concat(res.data.body.list)
        this.scrollInit()
        if (this.page !== 1 && res.data.body.list.length === 0) {
          this.scroll.finishPullUp()
          this.noMore = true
        }
      })
    },

    scrollInit () {
      if (!this.scroll) {
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
          this.page++
          this.getGoodsList(this.categoryId, this.page)
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    },
    initData () {
      let data = storage.getLocalStorage(goodsListData)
      let index = this.$route.params.index
      let innerIndex = this.$route.params.innerIndex
      let all = data[index].children[innerIndex]
      this.title = all.catName
      all.catName = '全部'
      this.tabbar.push(all)
      this.currentList = data[index].children[innerIndex].children
      for (let i = 0; i < this.currentList.length; i++) {
        this.tabbar.push(this.currentList[i])
      }
      this.categoryId = this.tabbar[this.currentIndex].id
      this.getGoodsList(this.categoryId, this.page)
    }

  },
  mounted () {
    this.initData()
  }
}
</script>

<style lang="stylus" scoped>
  .xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
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
.xpGoodsTop>>>.scrollable .vux-tab-item
  flex 0 0 30%
.xpGoodsTop>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 42px
    margin-right 40px
    font-weight 600
    width auto
.xpGoods
  height 100%
  padding-top 202px
  background #f5f5f5
  .xpGoodsWrap
    height 100%
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 96px
    z-index 999999
    padding 0 50px
    background-color #fff
  .xpStoryContent
    height 100%
    background-color #fff
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
  border-top 1px solid #e6e6e6
  li
    padding 100px 0
    flex 1
    text-align center
    border-bottom 1px solid #e6e6e6
  li:nth-child(2n)
    border-left 1px solid #e6e6e6
  .emptyBox
    width 3.395556rem
.border-bottom::before
  z-index 9999
</style>
