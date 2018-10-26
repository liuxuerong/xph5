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
      <div class="orderTotal" v-for="(item,index) in list.memberOrderGoods" :key="index">
        <div class="orderCount border-bottom">
          <span class="goodsCount">商品金额<p>￥ {{item.actualPrice}}</p></span>
          <span class="goodsDiscount">优惠金额<p>￥ {{list.offerAmount}}</p></span>
        </div>
        <div class="orderTotalPrice">
          实付：￥{{item.actualPrice*item.num}}
        </div>
      </div>
      <ul class="orderOther">
        <li v-if="list.shippingMethod === '1'">配送方式：上门自提</li>
        <li v-if="list.shippingMethod === '2'">配送方式：快递配送</li>
        <li>下单时间：{{list.createTime}}</li>
        <li v-if="list.invoiceDesc === undefined || list.invoiceDesc === ''">发票：无发票</li>
        <li v-else>发票：{{list.invoiceDesc}}</li>
        <li v-if="list.desc === undefined || list.desc === ''">备注：无备注</li>
        <li v-else>备注：{{list.desc}}</li>
      </ul>
    </div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="orderStatus === 6">交易关闭</div>
  </div>
</template>
<script>
import { refundOrderDetail } from 'util/netApi'
import { http } from 'util/request'
import SearchTitle from './ComOrderSearchTitle'
import { config } from 'util/config' // 图片路径
export default {
  data () {
    return {
      title: '退款订单',
      list: [],
      imageUrl: config.imageUrl,
      orderStatus: Number
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    // 页面初始化数据
    afterSaleRender () {
      let orderId = this.$route.params.orderId
      console.log(orderId)
      http(refundOrderDetail, [orderId]).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.list = response.data.body
          let memberOrderGoods = response.data.body.memberOrderGoods[0]
          if (memberOrderGoods.orderItemStatus === 6) {
            this.orderStatus = 6 // 交易关闭
          }
        }
      })
    }
  },
  mounted () {
    this.afterSaleRender()
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
    padding-top 130px
    background #F5F5F5
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
        background #000
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
