<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="orderDetatilCon">
      <div class="orderUserInfo">
        <div class="orderCode border-bottom">订单编号：{{list.orderSn}}</div>
        <div class="orderProvide" v-if="list.shippingMethod === '1'">
          <span class="shopName">提货店铺：{{list.franchiseeDetailVO.name}}  {{list.franchiseeDetailVO.phone}}</span>
          <span class="shopAddress">店铺地址：{{list.franchiseeDetailVO.province}}{{list.franchiseeDetailVO.city}}{{list.franchiseeDetailVO.area}}{{list.franchiseeDetailVO.address}}</span>
        </div>
        <div class="orderProvide" v-else-if="list.shippingMethod === '2'">
          <span class="orderName">收货人：{{list.delivery.receiverName}}   {{list.delivery.phone}}</span>
          <span class="orderAddress">收货地址：{{list.delivery.province}}{{list.delivery.city}}{{list.delivery.area}}{{list.delivery.detailedAddr}}</span>
        </div>
      </div>
      <div class="orderGoodsInfo">
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index" @click="goodsDetails(item.goodsId)">
          <img :src="imageUrl+item.pic" alt="">
          <div class="orderText">
            <h3 class="goodsName">{{item.goodsName}}</h3>
            <div class="goodsSpecWrapper clearfix">
              <span class="goodsSpec" v-for="(spec,n) in JSON.parse(item.spec)" :key="n">{{spec.value}}</span>
            </div>
            <span class="goodsPrice">￥ {{item.price}}</span>
            <span class="goodsNum">×{{item.num}}</span>
          </div>
        </div>
      </div>
      <div class="orderTotal">
        <div class="orderCount border-bottom">
          <span class="goodsCount">商品金额<p>￥ {{list.totalAmount}}</p></span>
          <span class="goodsDiscount">优惠金额<p>￥ {{list.offerAmount}}</p></span>
        </div>
        <div class="orderTotalPrice">
          实付：￥{{list.totalAmount}}
        </div>
      </div>
      <ul class="orderOther">
        <li v-if="list.shippingMethod === '1'">配送方式：上门自提</li>
        <li v-if="list.shippingMethod === '2'">配送方式：快递配送</li>
        <!-- <li>下单时间：{{list.createTime.split('T')[0]}}&nbsp;&nbsp;{{list.createTime.split('T')[1]}}</li> -->
        <li>下单时间：{{list.createTime}}</li>
        <li v-if="list.invoiceDesc === undefined || list.invoiceDesc === ''">发票：无发票</li>
        <li v-else>发票：{{list.invoiceDesc}}</li>
        <li v-if="list.desc === undefined || list.desc === ''">备注：无备注</li>
        <li v-else>备注：{{list.desc}}</li>
      </ul>
    </div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus == '8'">支付超时</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus == '6'">交易关闭</div>
    <!-- 未发货退款 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="orderStatus == '11' || orderStatus == '1'">
      <span @click="unGoodsapplyRefund(list.orderSn)">申请退款</span>
      <span>已付款</span>
    </div>
    <!-- 已发货，分单退款 -->
    <div class="orderOperBtn orderOperBtn11 border-top" v-if="orderStatus == '9' || orderStatus == '10'">
      <span @click="unGoodsapplyRefund(list.orderId)">申请退款</span>
      <span>已付款</span>
    </div>
  </div>
</template>
<script>
import router from '@/router/index.js'
import { subOrderDetail } from 'util/netApi'
import { http } from 'util/request'
import SearchTitle from './ComOrderSearchTitle'
import { config } from 'util/config' // 图片路径
export default {
  data () {
    return {
      title: '',
      list: [],
      imageUrl: config.imageUrl,
      orderStatus: Number
      // 1 立即支付
      // 7 查看详情 --- 交易关闭
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    orderDetailRender () {
      let orderCode = this.$route.params.orderCode
      http(subOrderDetail, [orderCode]).then((response) => {
        let data = response.data.body
        console.log(data)
        this.list = data
        let memberOrderGoods = data.memberOrderGoods[0]
        console.log(memberOrderGoods)
        if (data.status === 2) {
          this.title = '待发货订单'
        } else if (data.status === 7) {
          this.title = '交易关闭'
        } else if (data.status === 8) {
          this.title = '支付超时'
        } else if (data.status === 4) {
          this.title = '待评价订单'
        } else if (memberOrderGoods.orderItemStatus === 1) {
          this.title = '待发货订单'
        }
        if (memberOrderGoods.orderItemStatus === undefined && data.status === 8) {
          this.orderStatus = 8 // 交易关闭
        } else if (memberOrderGoods.orderItemStatus === 11) {
          this.orderStatus = 11 // 未发货退款
        } else if (memberOrderGoods.orderItemStatus === 6) {
          this.orderStatus = 6 // 交易关闭
        } else if (memberOrderGoods.orderItemStatus === 1) {
          this.orderStatus = 1
        }
      })
    },
    // 商品详情页面
    goodsDetails (goodsId) {
      router.push('../../details/' + goodsId)
    },
    // 申请退款
    unGoodsapplyRefund (orderId) {
      console.log(666)
      // type 1   未发货退款
      router.push('../../applyRefund/1/' + orderId)
    }
  },
  mounted () {
    this.orderDetailRender()
  }
}
</script>
<style lang="stylus" scoped>
  body,html
    position relative
    background #F5F5F5
  .wrapper
    width 100%
    box-sizing border-box
    padding-top 132px
  .orderDetatilCon
    width 100%
    box-sizing border-box
    padding-bottom 148px
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
      background #fff
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
        padding-top 50px
        position relative
        .goodsName
          width 100%
          line-height 40px
          font-size 40px
          color #262626
          margin-bottom 30px
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
</style>
