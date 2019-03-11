<template>
  <div class="xpCollect">
    <common-nav-header :title="title">
    </common-nav-header>
    <div class="top">
      <tab>
        <tab-item :selected="index==showWhich" @on-item-click="onItemClick" v-for="(item,index) in tabbar" :key="index">{{item}}</tab-item>
      </tab>
    </div>
    <div ref="xpCollectContent" class="xpCollectContent">
      <div>
        <div v-if="showWhich==0" class="goodsContainer">
          <ul class="goodsContainer" v-if="goods.length">
            <li v-for="item in goods" v-if="goods.length" :key="item.id">
              <common-img-prices :pricesData="item" />
            </li>
            <li class="emptyBox"></li>
          </ul>
          <common-empty v-else :emptyObj="emptyObj" />
          <divider v-if="noMore">已经到达最底部</divider>
        </div>
        <div v-else>
          <common-article-rec v-if="content.length" :articleRecommends="content" :linkTo="linkTo" />
          <common-empty v-else :emptyObj="emptyContent" />
          <divider v-if="noMore">已经到达最底部</divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonNavHeader from 'common/commonHeader/CommonNavHeader'
import {
  Tab,
  TabItem,
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  config
} from 'util/config.js'
import {
  articlecollectionlist,
  goodscollectionList
} from 'util/netApi'
import CommonImgPrices from 'common/commonImgPrices/CommonImgPrices'
import CommonArticleRec from '@/common/commonArticleRec/CommonArticleRec'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import BScroll from 'better-scroll'

export default {
  name: 'Collect',
  components: {
    CommonNavHeader,
    Tab,
    TabItem,
    CommonImgPrices,
    CommonArticleRec,
    CommonEmpty,
    Divider
  },
  data () {
    return {
      title: '我的收藏',
      content: [],
      goods: [],
      showWhich: 0,
      noMore: false,
      tabbar: ['商品', '内容'],
      page: 1,
      type: '1',
      linkTo: '/storyDetails/',
      emptyObj: {
        emptyImg: '/static/images/commentEmptyCollect.png',
        emptyBold: '暂无商品',
        emptyP: '您还没有收藏任何商品',
        buttonText: '去看看',
        buttonRouter: '/find'
      },
      emptyContent: {
        emptyImg: '/static/images/commentEmptyCollect.png',
        emptyBold: '暂无内容',
        emptyP: '您还没有收藏任何内容',
        buttonText: '去看看',
        buttonRouter: '/story'
      }
    }
  },
  methods: {
    onItemClick (index) {
      this.showWhich = index
      this.page = 1
      this.noMore = false
      if (index === 0) {
        this.goods = []
        this.getGoods(this.page)
      } else {
        this.content = []
        this.getContent(this.page)
      }
    },
    getGoods (page) {
      let params = {
        page: page,
        rows: 10
      }
      if (!this.noMore) {
        http(goodscollectionList, params).then(res => {
          if (this.page !== 1 && res.data.body.list.length === 0) {
            this.scroll.finishPullUp()
            this.noMore = true
          }
          let goods = res.data.body.list
          for (let i = 0; i < goods.length; i++) {
            goods[i].coverImage = goods[i].goodsImage
            goods[i].name = goods[i].goodsName
            goods[i].minPrice = goods[i].goodsPrice
            goods[i].id = goods[i].goodsId
            this.goods.push(goods[i])
          }
          this.scrollInit()
        })
      }
    },
    getContent (page) {
      let params = {
        page: page,
        rows: 10
      }
      if (!this.noMore) {
        http(articlecollectionlist, params)
          .then(res => {
            let content = res.data.body.list
            if (this.page !== 1 && res.data.body.list.length === 0) {
              this.scroll.finishPullUp()
              this.noMore = true
            }
            for (let i = 0; i < content.length; i++) {
              content[i].id = content[i].articleId
              this.content.push(content[i])
            }
            this.scrollInit()
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.xpCollectContent, {
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
        this.scroll.on('pullingUp', () => {
          this.page++
          if (this.showWhich === 0) {
            this.getGoods(this.page)
          } else {
            this.getContent(this.page)
          }
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    }
  },
  mounted () {
    // this.getContent(this.page)
    this.showWhich = this.$route.params.index
    if (this.$route.params.index === '0') {
      this.getGoods(this.page)
    } else {
      this.getContent(this.page)
    }
  }
}
</script>

<style lang="stylus" scoped>
.top>>>.vux-tab .vux-tab-item.vux-tab-selected
    color #333333
    border-bottom 8px solid #262626
.top>>>.vux-tab-ink-bar
    background transparent
.top>>>.vux-tab-ink-bar::before
  content ""
  position absolute
  top 0
  left 50%
  transform translateX(-50%)
  width 88px
  background-color #262626
  height 100%
.top>>>.vux-tab-container
    height 106px
.top>>>.vux-tab
    height 106px
.top>>>.vux-tab .vux-tab-item
    height 106px
    line-height 106px
    font-size 46px
.xpCollect
    padding-top 206px
    height 100%
  .xpCollectContent
    height 100%
  .top
    height 0.942222rem
    z-index 999999
    position fixed
    top 120px
    width 100%
  .goodsContainer
    display flex
    flex-wrap wrap
    justify-content space-around
    background-color #fff
    padding-top 50px
    li
      margin-bottom 150px
    .emptyBox
      width 3.395556rem !important
.commonEmpty
  padding-top  4.5rem !important
  background #fff !important
</style>
