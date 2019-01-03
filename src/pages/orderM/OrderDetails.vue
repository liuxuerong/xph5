<template>
  <div class="wrapper">
    <common-head-link title="订单详情" />
    <div class="orderDetatilCon" v-if="orderData">
      <div class="bgTop">
        <span class="statusDesc">
          {{orderData.statusDesc}}
        </span>
        <span class="time" v-if="orderData.status===1">距自动关闭剩<i>{{remainingTime.minutes}}</i>分<i>{{remainingTime.seconds}}</i>秒</span>
      </div>
      <div class="orderInfo">
        <div class="orderProvide wrap">
          <router-link class="cellLink" to="goodsAddress/1" v-if="orderData.status===5">
            <div class="text addAddress">订单签收成功，感谢您对我们无限的订单签收成功，感谢您对我们无限的...</div>
          </router-link>
          <router-link class="cellLink" to="goodsAddress/1" v-if="orderData.status===3">
            <div class="text addAddress">您已提交订单，请等待物流信息更新...</div>
          </router-link>
          <span class="orderName">{{orderData.deliveryPeople}}&nbsp;&nbsp;&nbsp;&nbsp;{{orderData.deliveryPhone}}</span>
          <span class="orderAddress">{{orderData.deliveryAddr}}</span>
        </div>
        <div class="wrap goods">
          <order-item v-if="orderData.memberOrderGoods" v-for="goods in orderData.memberOrderGoods" :key="goods.goodsId" :pricesData="goods" :isDetails="true" :status="orderData.status"></order-item>
          <ul class="priceItem">
            <li>
              <span class="name">商品总额</span><span class="price">￥{{orderData.totalAmount}}</span>
            </li>
            <li>
              <span class="name">优惠</span><span class="price">￥{{orderData.offerAmount}}</span>
            </li>
            <li>
              <span class="name">运费</span><span class="price">￥{{orderData.shippingAmount}}</span>
            </li>
            <li class="all">
              <span class="name"> 共<b>{{orderData.memberOrderGoods.length}}</b>件商品</span><span class="price">实付：￥{{orderData.needPayAmount}}</span>
            </li>
          </ul>
        </div>
        <div class="wrap">
          <div class="title">
            <h4>发票信息</h4>
            <div class="btn">查看发票</div>
          </div>
          <ul class="infoItem">
            <li><span class="name">订单编号：</span><span class="content">{{orderData.orderSn}}</span>
            </li>
            <li> <span class="name">支付方式：</span><span class="content">{{orderData.paymentDesc}}</span></li>
            <li> <span class="name">下单时间：</span><span class="content">{{orderData.createTime}}</span></li>
            <li> <span class="name" v-if="orderData.payTime">付款时间：</span><span class="content">{{orderData.payTime}}</span></li>
            <li> <span class="name" v-if="orderData.deliverTime">发货时间：</span><span class="content">{{orderData.deliverTime}}</span></li>
            <li> <span class="name" v-if="orderData.finishTime">成交时间：</span><span class="content">{{orderData.finishTime}}</span></li>
            <li> <span class="name" v-if="orderData.finishTime">获取积分：</span><span class="content">{{orderData.finishTime}}</span></li>
          </ul>
        </div>
        <div class="wrap">
          <div class="title">
            <h4>备注信息</h4>
          </div>
          <div class="infoContent">
            {{orderData.desc}}
          </div>
        </div>
        <div class="wrap">
          <div class="title">
            <h4>订单信息</h4>
          </div>
          <ul class="infoItem">
            <li><span class="name">订单编号：</span><span class="content">{{orderData.orderSn}}</span></li>
            <li> <span class="name">支付方式：</span><span class="content">{{orderData.paymentDesc}}</span></li>
            <li> <span class="name">下单时间：</span><span class="content">{{orderData.createTime}}</span></li>
            <li> <span class="name" v-if="orderData.payTime">付款时间：</span><span class="content">{{orderData.payTime}}</span></li>
            <li> <span class="name" v-if="orderData.deliverTime">发货时间：</span><span class="content">{{orderData.deliverTime}}</span></li>
            <li> <span class="name" v-if="orderData.finishTime">成交时间：</span><span class="content">{{orderData.finishTime}}</span></li>
            <li> <span class="name" v-if="orderData.finishTime">获取积分：</span><span class="content">{{orderData.finishTime}}</span></li>
          </ul>
        </div>
      </div>
      <div class="orderOperBtn">
        <span class="gray" v-if="orderData.status==2||orderData.status==3">查看物流</span>
        <span class="gray" v-if="orderData.status==2||orderData.status==6">删除订单</span>
        <span class="glod" v-if="orderData.status==2">评价</span>
        <span class="gray" v-if="orderData.status==3">延长收货</span>
        <span class="glod" v-if="orderData.status==3">确认收货</span>
        <span class="gray" v-if="orderData.status==6">联系客服</span>
      </div>
    </div>
  </div>
</template>

<script>
import OrderItem from './components/OrderItem'
import {
  orderDetails,
  cancelOrder,
  confirmGoods,
  refundOrderDetail
} from 'util/netApi'
import {
  http
} from 'util/request'
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
import {
  config
} from 'util/config' // 图片路径
import notice from 'util/notice.js'
import {
  Toast
} from 'mint-ui'
import {
  storage
} from 'util/storage'
import {
  logistics,
  aftersale
} from 'util/const'
export default {
  data () {
    return {
      orderData: null,
      list: [],
      imageUrl: config.imageUrl,
      orderStatus: Number,
      computedTime: 0,
      time: '',
      codeValue: '',
      remainingTime: null,
      timer: null
    }
  },
  components: {
    CommonHeadLink,
    OrderItem
  },
  watch: {
    '$route' (to, from) {
      // this.$router.go(0)
      // if (to.name === 'orderDetails') {
      //   this.orderDetailRender()
      // }
    }
  },
  methods: {

    // 订单列表页面渲染
    orderDetailRender () {
      let orderCode = this.$route.params.orderSn
      http(orderDetails, [orderCode]).then((res) => {
        console.log(res)
        this.orderData = res.data.body
        let _this = this
        _this.remainingTime = _this.formatDuring(new Date(res.data.body.allowPayTime).getTime() - new Date())
        this.timer = setInterval(() => {
          let time = new Date(_this.confirmTime).getTime() - new Date()
          _this.remainingTime = _this.formatDuring(time)
        }, 1000)
      })
    },
    // 时间格式化
    formatDuring (mss) {
      if (mss > 0) {
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = parseInt(mss % (1000 * 60) / 1000)
        minutes = minutes > 9 ? minutes : '0' + minutes
        seconds = seconds > 9 ? seconds : '0' + seconds
        return {
          minutes,
          seconds
        }
      } else {
        return {
          minutes: '00',
          seconds: '00'
        }
      }
    },
    // 查看售后
    orderDetails (orderId) {
      let _this = this
      http(refundOrderDetail, [orderId]).then((response) => {
        if (response.data.code === 0) {
          if (response.data.body.afterSalesType === 1) {
            _this.$router.push('/afterSaleOrder/5/' + orderId)
          } else {
            _this.$router.push('/returnGoodsMoney/5/' + orderId)
          }
        }
      })
    },
    // 商品详情页面
    goodsDetails (goodsId) {
      this.$router.push('/details/' + goodsId)
    },
    // 申请退款
    unGoodsapplyRefund (orderId) {
      // type 1   未发货退款 2 退货退款
      this.$router.push('/applyRefund/1/' + orderId)
    },
    // 取消订单
    cancelOrder (orderId) {
      let _this = this
      http(cancelOrder, [orderId]).then((response) => {
        if (response.data.code === 0) {
          notice.confirm('取消订单', '是否取消此订单', function () {
            _this.$router.push('/orderList/1')
          })
        }
      })
    },
    // 立即付款
    immedPayment (orderSn) {
      this.$router.push('/immedPayment/' + orderSn)
    },
    // 确认收货
    confirmGoods (orderCode) {
      notice.confirm('您确定收到货物？', '否则可能钱财两空', function () {
        http(confirmGoods, [orderCode]).then((response) => {
          if (response.data.body === true) {
            Toast({
              message: '收货成功',
              position: 'bottom',
              duration: 2000
            })
            this.$router.go(0)
          }
        })
      })
    },
    // 查看物流
    watchLogistics (logisticsName, logisticsNo) {
      let params = {
        logino: logisticsNo,
        code: logisticsName
      }
      storage.setLocalStorage(logistics, params)
      this.$router.push('/watchLogistics')
    },
    // 立即评价
    immedEvaluate (orderCode) {
      this.$router.push('/immedEvaluate/' + orderCode)
    },
    // 申请售后
    afterSale (data, orderId) {
      storage.setLocalStorage(aftersale, data)
      this.$router.push('/returnGoods/' + orderId)
    }
  },
  mounted () {
    this.orderDetailRender()
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl'
  .wrapper
    width 100%
    height 100%
    padding-top 120px
    min-height 100%
    background #f5f5f5
  .addAddress
    border-bottom 2px dashed #E6E6E6
  .orderDetatilCon
    width 100%
    padding-bottom 148px
    background #F5F5F5
  .orderInfo
    width 100%
    padding 0 50px
    margin-top -140px
    .wrap
      background-color #fff
      border-radius 20px
      margin-bottom 30px
      padding-left 48px
      padding-right 48px
      .title
        height 146px
        line-height 146px
        display flex
        justify-content space-between
        align-items center
        h4
          font-size 46px
          color #333
          font-weight 600
        .btn
          font-size 40px
          width 200px
          height 70px
          line-height 70px
          border-radius 35px
          text-align center
          margin-left 30px
          color #BA825A
          border 2px solid #BA825A
  .orderOperBtn
    width 100%
    height 148px
    line-height 148px
    position fixed
    left 0
    bottom 0
    font-size 0
    text-align right
    background-color #fff
    padding 20px 50px
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
  .bgTop
    height 370px
    background url('/static/images/statusDescBg.png')
    .statusDesc
      font-size 66px
      color #FFFFFF
      line-height 227px
      padding-left 108px
      padding-right 307px
    .time
      font-size 40px
      line-height 227px
      color #FEFEFE
      i
        color #C39568
  .orderProvide
    padding 20px 50px
    .orderName
      font-size 46px
      line-height 83px
      display block
    .orderAddress
      font-size 40px
      line-height 74px
  .cellLink
      line-height 210px
      display inline-block
      width 100%
      div
        line-height 210px
        position relative
        width 100%
        font-size 50px
        color #333
        font-weight 600
        height 210px
        padding-right 60px
        ellipsis()
      .text
        span
          position absolute
          right 40px
      .text::after
        content ''
        position absolute
        right 10px
        top 50%
        margin-top -12px
        width 24px
        height 24px
        border-right 2px solid #B3B3B3
        border-top 2px solid #B3B3B3
        transform rotate(45deg)
  .orderInfo .wrap.goods
    padding 0
  .priceItem
    padding 0 48px
    font-size 40px
    li
      line-height 78px
      display flex
      align-items center
      justify-content space-between
    .name
      color #999
    .all
      .name
        font-size 36px
        b
          color #333
      .price
        font-size 50px
        color #333
        font-weight 600
        line-height 148px
  .infoItem
      font-size 40px
      padding-bottom 30px
      li
        line-height 78px
      .name
        color #999
  .infoContent
    color #999
    padding-bottom 40px
</style>
