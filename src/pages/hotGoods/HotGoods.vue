<template>
  <div class="xpGoods">
    <keep-alive>
      <div class="xpGoodsWrap">
        <common-nav-header :title="title" />
        <div ref="xpStoryContent" class="xpStoryContent">
          <div>
            <ul class="goodsContainer" v-if="goodsListData.length">
              <li v-for="item in goodsListData" v-if="goodsListData.length" :key="item.id">
                <common-img-prices :pricesData="item" :left="true"/>
              </li>
              <li v-if="(noMore||goodsListData.length<20)&&goodsListData.length%2!==0">
                <div class="moreTip">
                  更多新品<br>正在研发中...
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import {
  http
} from 'util/request'
import {
  hotGoods
} from 'util/netApi'
import {
  config
} from 'util/config.js'
import BScroll from 'better-scroll'
export default {
  name: 'HotGoods',
  components: {
    CommonNavHeader,
    CommonImgPrices
  },
  data () {
    return {
      imageUrl: config.imageUrl,
      title: '口碑爆款',
      goodsListData: [],
      page: 1,
      noMore: false,
      showCart: false
    }
  },
  computed: {

  },
  methods: {
    getGoodsList (page) {
      console.log(page)
      if (!this.noMore) {
        const param = {
          page: page,
          rows: 20
        }
        http(hotGoods, param).then(res => {
          console.log(res.data.body.list)
          this.goodsListData = this.goodsListData.concat(res.data.body.list)
          this.scrollInit()
          if (this.page !== 1 && res.data.body.list.length === 0) {
            this.scroll.finishPullUp()
            this.noMore = true
          }
        })
      }
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
          console.log(888)
          console.log(this.page)
          this.getGoodsList(this.page)
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    }
  },
  mounted () {
    this.getGoodsList(this.page)
  }
}
</script>

<style lang="stylus" scoped>
.xpGoods
  height 100%
  padding-top 118px
  .xpGoodsWrap
    height 100%
  .xpGoodsTop
    height 106px
    line-height 106px
    font-size 46px
    position fixed
    width 100%
    top 120px
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
  li
    padding 100px 0
    flex 1
    text-align center
    border-bottom 1px solid #e6e6e6
  li:nth-child(2n)
    border-left 1px solid #e6e6e6
  .emptyBox
    width 500px
.border-bottom::before
  z-index 9999
</style>
