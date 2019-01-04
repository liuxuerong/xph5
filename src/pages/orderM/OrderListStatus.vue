<template>
  <div class="orderListStatus" ref="orderListStatus">
    <div>
      <ul>
        <li v-if="list.length" v-for="item in list" :key="item.orderId">
          <order-item v-if="item.memberOrderGoods" v-for="goods in item.memberOrderGoods" :key="goods.orderItemId" :orderSn="item.orderSn" :pricesData="goods" :status="item.status"></order-item>
          <div class="itemBottom">
            <div class="info clearfix">
              <i class="status">{{item.statusDesc}}</i>
              <span class="right">
                <em>
                  共<b>{{item.memberOrderGoods.length}}</b>件商品
                </em>
                <em>合计：
                  <i class="price">
                    ￥{{item.needPayAmount}}
                  </i>
                </em>
              </span>
            </div>
            <!--
            1: 待支付
            2: 待发货
            3: 待收货
            4: 待评价
            5: 交易成功
            6: 交易关闭 -->
            <div class="btnWrap">
              <span class="glod" v-if="item.status==1" @click="pay(item.orderSn)">
                去支付
              </span>
              <span class="glod" v-if="item.status==3" @click="confirmGoods(item.orderSn)">
                确认收货
              </span>
              <span class="gray"  v-if="item.status==3" @click="watchLogistics(item.orderSn)">
                查看物流
              </span>
             <span class="glod"  v-if="item.status==4" @click="immedEvaluate(item.orderSn)">
                评价
              </span>
               <span class="gray"  v-if="item.status==4">
                查看发票
              </span>
            </div>
          </div>
        </li>
      </ul>
       <common-empty v-if="!noMore&&!list.length" :emptyObj="emptyObj" />
      <divider v-if="noMore">已经到达最底部</divider>
    </div>
  </div>
</template>

<script>
import {
  Divider
} from 'vux'
import {
  http
} from 'util/request'
import {
  OrderList,
  confirmGoods
} from 'util/netApi'
import {
  Toast
} from 'mint-ui'
import notice from 'util/notice.js'
import OrderItem from './components/OrderItem'
import CommonEmpty from 'common/commonEmpty/CommonEmpty'
import BScroll from 'better-scroll'
export default {
  name: 'OrderListStatus',
  components: {
    OrderItem,
    CommonEmpty,
    Divider
  },
  data () {
    return {
      currentIndex: -1,
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
      if (to.name === 'orderListStatus') {
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
      this.currentIndex = this.$route.path.split('/')[2]
      let params = {
        page: this.page,
        rows: 20,
        status: this.currentIndex
      }
      if (!this.noMore) {
        http(OrderList, params).then((res) => {
          console.log(res)
          if (res.data.code === 0) {
            this.list = [...this.list, ...res.data.body.list]
            console.log(this.list)
            this.scrollInit()
            if (this.page !== 1 && res.data.body.list.length === 0) {
              this.scroll.finishPullUp()
              this.noMore = true
            }
          }
        })
      }
    },
    // 查看物流
    watchLogistics (orderSn) {
      this.$router.push(`/watchLogistics/${orderSn}`)
    },
    // 去支付
    pay (orderSn) {
      this.$router.push('/immedPayment/' + orderSn)
    },
    // 立即评价
    immedEvaluate (orderCode) {
      this.$router.push('/immedEvaluate/' + orderCode)
    },
    // 确认收货
    confirmGoods (orderCode) {
      let _this = this
      notice.confirm('您确定收到货物？', '否则可能钱财两空', function () {
        http(confirmGoods, [orderCode]).then((response) => {
          if (response.data.body === true) {
            Toast({
              message: '收货成功',
              position: 'center',
              duration: 2000
            })
            setTimeout(() => {
              _this.orderDetailRender()
            }, 2000)
          }
        })
      })
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
.orderListStatus
  height calc(100%-(120px))
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
  .itemBottom
    padding 0 50px 50px
    .info
      .status
        color #BA825A
        font-size 40px
        float left
      .right
        float right
        color #999999
        font-size 36px
        line-height 50px
        em
          padding-left 22px
        b
          color #333333
        .price
          color #262626
          font-size 50px
          font-weight 600
  .btnWrap
    margin-top 50px
    font-size 0
    text-align right
    span
      display inline-block
      font-size 40px
      width 240px
      height 86px
      line-height 86px
      border-radius 43px
      text-align center
      margin-left 30px
    .gray
      color #666666
      border 2px solid #808080
    .glod
      color #BA825A
      border 2px solid #BA825A
  .commonEmpty
    background-color #f5f5f5
</style>
