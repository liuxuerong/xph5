<template>
  <div class="orderList">
    <common-head-link title="退款/售后" />
     <div class="orderListStatus" ref="orderListStatus">
    <div>
      <ul v-if="list.length">
        <li  v-for="item in list" :key="item.orderId">
          <order-item  :pricesData="item"></order-item>
        </li>
      </ul>
       <common-empty v-if="!noMore&&!list.length" :emptyObj="emptyObj" />
      <divider v-if="noMore">已经到达最底部</divider>
    </div>
  </div>
  </div>
</template>

<script>
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
import {
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  afterSaleList
} from 'util/netApi'
import OrderItem from './components/OrderItem'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import BScroll from 'better-scroll'
export default {
  name: 'AfterSaleList',
  components: {
    CommonHeadLink,
    OrderItem,
    CommonEmpty,
    Divider
  },
  data () {
    return {
      list: [],
      page: 1,
      noMore: false,
      emptyObj: {
        emptyImg: '/static/images/commentEmptyGoods.png',
        emptyBold: '暂无商品',
        emptyP: '此类商品暂未上架，星品君正在努力挖掘中..',
        buttonText: null,
        buttonRouter: null
      }
    }
  },
  computed: {

  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'AfterSaleList') {
        this.noMore = false
        this.page = 1
        this.list = []
        this.getList()
      }
    }
  },
  methods: {
    // 获取订单列表
    getList () {
      let params = {
        page: this.page,
        rows: 20
      }
      if (!this.noMore) {
        http(afterSaleList, params).then((res) => {
          console.log(res)
          console.log(this.page)
          if (res.data.code === 0) {
            if (this.page != 1 && !res.data.body.list) {
              this.scroll.finishPullUp()
              this.noMore = true
              console.log(777)
              return
            }
            this.list = [...this.list, ...res.data.body.list]
            this.scrollInit()
          }
        })
      }
    },
    scrollInit () {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.orderListStatus, {
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
          this.getList()
        })
      } else {
        this.scroll.refresh()
        this.scroll.finishPullUp()
      }
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="stylus" scoped>
.orderList
  min-height 100%
  padding-top 120px
  background-color #f5f5f5
.orderListStatus
  height calc(100vh-(120px))
  padding 0 50px
  z-index -1
  overflow hidden
  &>div
    padding-top 40px
    padding-bottom 140px
  li
    background-color #fff
    border-radius 20px
    margin-bottom 30px
</style>
