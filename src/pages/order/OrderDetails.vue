<template>
  <div class="wrapper">
    <!-- 交易完成 -->
    <search-title v-if="orderStatus == 7" title="交易完成"></search-title>
    <!-- 订单失效 -->
    <search-title v-else-if="orderStatus == 8 || list.status === 8" title="支付超时"></search-title>
    <!-- 交易成功 -->
    <search-title v-else-if="orderStatus == 9" title="交易成功"></search-title>
    <!-- 订单取消 -->
    <search-title v-else-if="list.status == '7' || orderStatus == '10'" title="交易关闭"></search-title>
    <search-title v-else :title="title[type-1]"></search-title>
    <div class="orderDetatilCon">
      <div class="orderUserInfo">
        <div class="orderCode border-bottom">订单编号：{{list.orderSn}}</div>
        <div class="orderProvide" v-if="list.shippingMethod == '1'">
          <span class="shopName">提货店铺：{{list.franchiseeDetailVO.name}}  {{list.franchiseeDetailVO.phone}}</span>
          <span class="shopAddress">店铺地址：{{list.franchiseeDetailVO.province}}{{list.franchiseeDetailVO.city}}{{list.franchiseeDetailVO.area}}{{list.franchiseeDetailVO.address}}</span>
        </div>
        <div class="orderProvide" v-else-if="list.shippingMethod == '2'">
          <span class="orderName" v-if="list.delivery.receiverName">收货人：{{list.delivery.receiverName}}&nbsp;&nbsp;&nbsp;&nbsp;{{list.delivery.phone}}</span>
          <span class="orderAddress">收货地址：{{list.delivery.province}}{{list.delivery.city}}{{list.delivery.area}}{{list.delivery.detailedAddr}}</span>
        </div>
      </div>
      <!-- 上门自提二维码 -->
      <div class="deliveryDoodsCard" v-if="type=='3' && list.shippingMethod == '1'">
        <div class="deliveryText">
          <span>请向商家出示二维码</span>
          <span>商家扫码成功即验证成功</span>
        </div>
        <div class="memberCodeImg">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <qrcode class="Scavenging"  :value="codeValue" type="img"></qrcode>
        </div>
      </div>
      <div class="orderGoodsInfo">
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index" @click.stop.prevent="goodsDetails(item.goodsId)">
          <img v-if="item.pic != ''" :src="imageUrl+item.pic" alt="">
          <img v-else src="/static/images/personalHeader.png">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(item.spec)" :key="n">{{spec.value}}</span>
            </div>
            <span class="goodsPrice">￥ {{item.price}}</span>
            <span class="goodsNum">×{{item.num}}</span>
            <div class="afterSale" v-if="orderStatus===5" @click.stop.prevent="afterSale(item,list.orderSn)">申请售后</div>
            <div class="afterSale" v-if="orderStatus==10 || orderStatus===9" @click.stop.prevent="orderDetails(item.orderItemId)">查看售后</div>
          </div>
        </div>
      </div>
      <div class="orderTotal">
        <div class="orderCount border-bottom">
          <span class="goodsCount">商品金额<p>￥ {{list.totalAmount}}</p></span>
          <span class="goodsDiscount">优惠金额<p>￥ {{list.offerAmount}}</p></span>
          <span v-if="list.shippingAmount != '0' || list.shippingAmount != ''" class="goodsDiscount">运费<p>￥ {{list.shippingAmount}}</p></span>
        </div>
        <div class="orderTotalPrice">
          实付：￥{{list.needPayAmount}}
        </div>
      </div>
      <ul class="orderOther">
        <li v-if="list.shippingMethod === '1'">配送方式：上门自提</li>
        <li v-if="list.shippingMethod === '2'">配送方式：快递配送</li>
        <li v-if="list.createTime">下单时间：{{list.createTime.split('T')[0]}}&nbsp;&nbsp;{{list.createTime.split('T')[1]}}</li>
        <!-- <li>下单时间：{{list.createTime}}</li> -->
        <li v-if="list.invoiceDesc === undefined || list.invoiceDesc === ''">发票：无发票</li>
        <li v-else>发票：{{list.invoiceDesc}}</li>
        <li v-if="list.desc === undefined || list.desc === ''">备注：无备注</li>
        <li v-else>备注：{{list.desc}}</li>
      </ul>
    </div>
    <!-- 1、待付款订单 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="type == '1'">
      <span @click="cancelOrder(list.orderId)">取消订单</span>
      <span @click="immedPayment(list.orderSn)" class="immedPaymentBtn">立即支付<i class="time">{{time}}</i></span>
    </div>
    <!-- 2、待发货订单 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="type == '2'">
      <span @click="unGoodsapplyRefund(list.orderSn)">申请退款</span>
      <span>已付款</span>
    </div>
    <!-- 3、待收货订单 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="type == '3' && list.shippingMethod == '2'">
      <span @click="watchLogistics(list.memberOrderGoods[0].logisticsName,list.memberOrderGoods[0].logisticsNo)">查看物流</span>
      <span class="immedPaymentBtn" @click="confirmGoods(list.orderSn)">确认收货</span>
    </div>

    <!-- 4、待评价订单  上门自提 -->
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="type == '4' && list.shippingMethod == '1'" @click="immedEvaluate(list.orderSn)">立即评价</div>
    <!-- 4、待评价订单 收货 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="type == '4' && list.shippingMethod == '2'">
      <span @click="watchLogistics(list.memberOrderGoods[0].logisticsName,list.memberOrderGoods[0].logisticsNo)">查看物流</span>
      <span class="immedPaymentBtn" @click="immedEvaluate(list.orderSn)">立即评价</span>
    </div>
    <!-- 交易完成 已评价 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="orderStatus == 7">
      <span @click="watchLogistics(list.memberOrderGoods[0].logisticsName,list.memberOrderGoods[0].logisticsNo)">查看物流</span>
      <span>已评价</span>
    </div>

    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus == 8">支付超时</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus == 9">交易成功</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus == 10 || list.status == 7">交易关闭</div>
    <!-- 未发货退款 -->
    <!-- <div class="orderOperBtn orderOperBtn11 border-top" v-if="orderStatus == '11' || orderStatus == '1'">
      <span @click="unGoodsapplyRefund(list.orderSn)">申请退款</span>
      <span>已付款</span>
    </div> -->
    <!-- 已发货，分单退款 -->
    <!-- <div class="orderOperBtn orderOperBtn11 border-top" v-if="orderStatus == '9'">
      <span @click="unGoodsapplyRefund(list.orderId)">申请退款</span>
      <span>已付款</span>
    </div> -->
  </div>
</template>
<script>
import { subOrderDetail, cancelOrder, confirmGoods } from 'util/netApi'
import { http } from 'util/request'
import SearchTitle from './ComOrderSearchTitle'
import { config } from 'util/config' // 图片路径
import notice from 'util/notice.js'
import {Toast} from 'mint-ui'
import { Qrcode } from 'vux'
import {storage} from 'util/storage'
import { logistics, aftersale } from 'util/const'
export default {
  data () {
    return {
      title: ['待付款订单', '待发货订单', '待收货订单', '待评价订单'],
      type: '',
      list: [],
      imageUrl: config.imageUrl,
      orderStatus: Number,
      computedTime: 0,
      time: '',
      codeValue: '',
      timeout: false // 定时器
      // 1 立即支付
      // 7 查看详情 --- 交易关闭
    }
  },
  components: {
    SearchTitle,
    Qrcode
  },
  watch: {
    '$route' (to, from) {
      // this.$router.go(0)
      if (to.name === 'orderDetails') {
        this.orderDetailRender()
      }
    }
  },
  methods: {
    // 订单列表页面渲染
    orderDetailRender () {
      let orderCode = this.$route.params.orderCode
      let type = this.$route.params.type
      this.type = type
      http(subOrderDetail, [orderCode]).then((response) => {
        console.log(response)
        let data = response.data.body
        this.list = data
        let memberOrderGoods = data.memberOrderGoods[0]
        if (data.status === 1 && memberOrderGoods.orderItemStatus === undefined) {
          this.type = '1'
        } else if (memberOrderGoods.orderItemStatus === 11) {
          this.type = '2'
        } else if (memberOrderGoods.orderItemStatus === 3) {
          this.type = '3'
        } else if (memberOrderGoods.orderItemStatus === 5) {
          this.type = '4'
        }
        if (memberOrderGoods.orderItemStatus === undefined && data.status === 8) {
          this.orderStatus = 8 // 订单失效
        } else if (memberOrderGoods.orderItemStatus === 11) {
          this.orderStatus = 11 // 未发货退款
        } else if (memberOrderGoods.orderItemStatus === 6 || memberOrderGoods.orderItemStatus === 8) {
          this.orderStatus = 9 // 交易成功 --6 申请售后 8 退款中 √
        } else if (memberOrderGoods.orderItemStatus === 9 || memberOrderGoods.orderItemStatus === 10) {
          this.orderStatus = 10 // 交易关闭 --9 退款成功 10  退货失败 √
        } else if (memberOrderGoods.orderItemStatus === 1 || memberOrderGoods.orderItemStatus === 2) {
          this.orderStatus = 1 // 待发货
        } else if (memberOrderGoods.orderItemStatus === 7) {
          this.orderStatus = 7 // 交易完成  --- 已评论  √
        } else if (memberOrderGoods.orderItemStatus === 5) {
          this.orderStatus = 5 // 交易完成  --- 带评论
        }
        // 立即支付倒计时
        if (data.allowPayTime) {
          this.timeout = true
          clearInterval(this.timer)
          let newDate1 = data.allowPayTime.split('T')[0] + ' ' + data.allowPayTime.split('T')[1]
          var time = new Date(newDate1).getTime() - new Date().getTime()
          this.computedTime = time / 1000
          this.timer = setInterval(() => {
            this.computedTime--
            let time1 = parseInt(this.computedTime / 3600)
            if (time1 < 10) {
              time1 = '0' + time1
            }
            let time2 = parseInt((this.computedTime % 3600) / 60)
            if (time2 < 10) {
              time2 = '0' + time2
            }
            let time3 = parseInt(this.computedTime % 60)
            if (time3 < 10) {
              time3 = '0' + time3
            }
            this.time = time1 + ' : ' + time2 + ' : ' + time3
            if (this.computedTime === 0) {
            }
          }, 1000)
        }
      })
    },
    // 查看售后
    orderDetails (orderId) {
      console.log(orderId)
      this.$router.push('/afterSaleOrder/5/' + orderId)
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
      console.log(orderId)
      http(cancelOrder, [orderId]).then((response) => {
        console.log(response)
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
      console.log(orderCode)
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
<style lang="stylus">
  html,body
    position relative
    background #F5F5F5!important
  .Scavenging
    display block
    width 600px
    height 600px
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    margin auto
    img
      display block
      width 600px!important
      height 600px!important
</style>
<style lang="stylus" scoped>
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .orderDetatilCon
    width 100%
    box-sizing border-box
    padding-bottom 148px
    background #F5F5F5
  .orderUserInfo
    width 100%
    background #fff
    margin-bottom 30px
    .orderCode
      width calc(100% - 100px)
      height 148px
      line-height 148px
      margin 0 auto
      font-size 46px
      color #262626
      font-weight bold
      // background #fff
    .orderProvide
      width 100%
      height auto
      box-sizing border-box
      padding 50px
      span
        display block
        width 100%
        line-height 64px
        font-size 40px
        color #808080
      span.orderName,span.shopName
        margin-bottom 50px
        line-height 40px
  .orderGoodsInfo
    width 100%
    height auto
    margin-bottom 30px
    background #fff
    .orderGoods
      width 100%
      box-sizing border-box
      padding 50px
      img
        float left
        width 286px
        height 286px
        margin-right 50px
      .orderText
        float left
        width calc(100% - 336px)
        height 286px
        box-sizing border-box
        padding-top 38px
        position relative
        .goodsName
          width 90%
          line-height 40px
          font-size 40px
          color #262626
          line-height 60px
          margin-bottom 10px
          font-weight blod
        .goodsPrice
          display block
          width 100%
          font-size 40px
          color #000000
          position absolute
          bottom 20px
          left 0
        .goodsNum
          width auto
          font-size 36px
          color #262626
          position absolute
          top 50px
          right 10px
  .orderOther
    width 100%
    box-sizing border-box
    padding 50px
    background #fff
    li
      display block
      width 100%
      line-height 50px
      font-size 36px
      color #808080
      margin-bottom 30px
    li:last-child
      margin-bottom 0
  .orderTotal
    width 100%
    margin-bottom 30px
    box-sizing border-box
    padding 50px 50px 0 50px
    background #fff
    .orderCount
      width 100%
      box-sizing border-box
      padding-bottom 50px
      span
        display block
        width 100%
        height 46px
        line-height 46px
        font-size 36px
        color #808080
        margin-bottom 50px
        p
          float right
          font-size 36px
          color #262626
    .orderTotalPrice
      width 100%
      height 180px
      line-height 180px
      font-size 46px
      color #262626
      font-weight bold
      text-align right
  .orderOperBtn
    width 100%
    height 148px
    line-height 148px
    position fixed
    left 0
    bottom 0
  .orderOperBtn8
    text-align center
    font-size 46px
    color #999999
    background #F0F0F0
  .orderOperBtn11
    font-size 36px
    color #808080
    span
      float left
    span:first-child
      background #fff
      width 24%
      text-align center
    span:last-child
      width 76%
      text-align center
      background #F0F0F0
  .goodsSpecWrapper
    width 100%
    margin-bottom 30px
    .goodsSpec
      float left
      width auto
      height 44px
      line-height 44px
      font-size 36px
      color #808080
      margin-right 20px
  .immedPaymentBtn
    font-size 46px
    color #BA825A
    position relative
    i.time
      display block
      width 100%
      height 20px
      line-height 20px
      position absolute
      bottom  16px
      left 0
      font-size 30px
      text-align center
  .afterSale
    width 220px
    height 84px
    text-align center
    line-height 84px
    border 1px solid #808080
    font-size 36px
    color #808080
    position absolute
    right 0
    top 160px
  .deliveryDoodsCard
    width 100%
    height 1200px
    margin-bottom 30px
    background #fff
  .deliveryText
    width 100%
    height 200px
    span
      display block
      width 100%
      text-align center
      line-height 100px
    span:nth-of-type(1)
      font-size 36px
      color #BA825A
    span:nth-of-type(2)
      font-size 46px
      color #262626
  .memberCodeImg
    width calc(100% - 100px)
    height 1000px
    margin 0 auto
    position relative
    background #fff
    span
      display block
      width 60px
      height 60px
      position absolute
    span:nth-of-type(1)
      left 160px
      top 120px
      border-top 6px solid #F2F2F2
      border-left 6px solid #F2F2F2
    span:nth-of-type(2)
      left 160px
      bottom  120px
      border-bottom 6px solid #F2F2F2
      border-left 6px solid #F2F2F2
    span:nth-of-type(3)
      right  160px
      top 120px
      border-top 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
    span:nth-of-type(4)
      right 160px
      bottom 120px
      border-bottom 6px solid #F2F2F2
      border-right 6px solid #F2F2F2
</style>
