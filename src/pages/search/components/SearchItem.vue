<template>
  <div class="searchItem" ref="searchItem">
    <div>
      <ul class="goodsContainer" v-if="goodsList.length">
      <li v-for="item in goodsList" v-if="goodsList.length" :key="item.id">
        <common-img-prices :pricesData="item" />
      </li>
      <li class="emptyBox"></li>
    </ul>
    <common-empty v-else :emptyObj="emptyObj" class="commonEmpty" />
    <divider v-if="noMore">哎呀！底线到了</divider>
    </div>
  </div>
</template>

<script>
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import BScroll from 'better-scroll'
import {
  http
} from 'util/request'
import {
  goodsList
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import {
  Divider
} from 'vux'
export default {
  name: 'Story',
  components: {
    CommonImgPrices,
    CommonEmpty,
    Divider
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      goodsList: [],
      page: 1,
      noMore: false,
      emptyObj: {
        emptyImg: '/static/images/commentEmptySearch.png',
        emptyBold: '没有找到相关产品',
        emptyP: '没有找到关键字为“飞机大炮”的产品',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  props: {
    searchHistoryStorage: Array,
    searchVal: ''
  },
  watch: {
    searchHistoryStorage: {
      handler (val) {
        console.log(888)
        console.log(val)
        let searchVal = val[val.length - 1]
        console.log(searchVal !== val[val.length - 2])
        if (searchVal !== val[val.length - 2]) {
          this.getGoodsList(searchVal, 1)
        }
      },
      deep: true
    }
  },
  methods: {
    getGoodsList (searchName, page) {
      const param = {
        page: page,
        rows: 20,
        searchName: searchName
      }
      if (!this.noMore) {
        http(goodsList, param).then(res => {
          if (this.page !== 1 && res.data.body.list.length === 0) {
            this.scroll.finishPullUp()
            this.noMore = true
          }
          if (page === 1) {
            this.goodsList = res.data.body.list
          } else {
            this.goodsList = [...this.goodsList, ...res.data.body.list]
          }

          this.scrollInit()
          this.emptyObj.emptyP = '没有找到关键字为“' + searchName + '”的产品'
        })
      }
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.searchItem, {
          scrollY: true,
          click: true,
          bounce: {
            top: true,
            bottom: true
          },
          pullUpLoad: {
            threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
          }
        })
        let _this = this
        this.scroll.on('pullingUp', function () {
          _this.page++
          let searchName = _this.searchHistoryStorage[_this.searchHistoryStorage.length - 1]
          _this.getGoodsList(searchName, _this.page)
        })
      } else {
        this.scroll.refresh()
      }
    }
  },
  mounted () {
    let searchName = this.searchHistoryStorage[this.searchHistoryStorage.length - 1]
    console.log(this.searchHistoryStorage)
    this.getGoodsList(searchName, 1)
  }
}
</script>

<style lang="stylus" scoped>
  .xpGoodsTop>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
    font-weight: 600;
.xpGoodsTop>>>.vux-tab-ink-bar
    background transparent
.xpGoodsTop>>>.vux-tab-ink-bar::before
  content ""
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 100%
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
    height calc(100% )
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
.commonEmpty
  background-color #fff!important
.emptyBox
  margin 0 !important
  width 3.9rem
.searchItem
  height 100%
</style>
