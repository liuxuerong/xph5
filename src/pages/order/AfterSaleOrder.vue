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
      <!-- 退款进度详情 -->
      <div class="refundSpeed" v-if="goodsInfo.orderItemStatus !='6'">
        <h3 class="border-bottom">退款详情</h3>
        <div class="refundCon">
          <div class="refundItem active">
            <!-- hookIcon hookGreen hookActive  -->
            <i class="hookIcon hookGreen"></i>
            <span class="refundState">卖家退款</span>
            <span v-if="list.confirmTime" class="refundTime">{{list.createTime.split('T')[0]}} {{list.createTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem active">
            <i class="hookIcon" :class="goodsInfo.orderItemStatusDesc == '退款中'?'hookActive':'hookGreen'"></i>
            <span class="refundState">退款中</span>
            <span v-if="list.confirmTime" class="refundTime">{{list.confirmTime.split('T')[0]}} {{list.confirmTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem" v-if="goodsInfo.orderItemStatusDesc == '退款失败'" :class="goodsInfo.orderItemStatusDesc == '退款失败'?'active':''">
            <i class="hookIcon" :class="goodsInfo.orderItemStatusDesc == '退款失败'?'hookActive':''"></i>
            <span class="refundState">退款失败</span>
            <span v-if="goodsInfo.orderItemStatusDesc == '退款失败'" class="refundTime">{{list.allowPayTime.split('T')[0]}} {{list.allowPayTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem" v-else :class="goodsInfo.orderItemStatusDesc == '退款成功'?'active':''">
            <i class="hookIcon" :class="goodsInfo.orderItemStatusDesc == '退款成功'?'hookActive':''"></i>
            <span class="refundState">退款成功</span>
            <span v-if="goodsInfo.orderItemStatusDesc == '退款成功'" class="refundTime">{{list.allowPayTime.split('T')[0]}} {{list.allowPayTime.split('T')[1]}}</span>
          </div>
        </div>
      </div>
      <div class="orderGoodsInfo">
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index">
          <img v-if="item.pic !=''" :src="imageUrl+item.pic" alt="">
          <img v-else src="/static/images/personalHeader.png">
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
          <span class="goodsDiscount">运费<p>￥ {{list.shippingAmount}}</p></span>
        </div>
        <div class="orderTotalPrice">
          实付：￥{{list.needPayAmount}}
        </div>
      </div>
      <!-- 物流信息 -->
      <!-- <div class="logisticsInfo">
        <span>物流单号</span>
        <p>{{list.v}}</p>
      </div> -->
      <ul class="orderOther">
        <li v-if="list.shippingMethod === '1'">配送方式：上门自提</li>
        <li v-if="list.shippingMethod === '2'">配送方式：快递配送</li>
        <li>下单时间：{{list.createTime.split('T')[0]}}&nbsp;&nbsp;{{list.createTime.split('T')[1]}}</li>
        <!-- <li>下单时间：{{list.createTime}}</li> -->
        <li v-if="list.invoiceDesc === undefined || list.invoiceDesc === ''">发票：无发票</li>
        <li v-else>发票：{{list.invoiceDesc}}</li>
        <li v-if="list.desc === undefined || list.desc === ''">备注：无备注</li>
        <li v-else>备注：{{list.desc}}</li>
      </ul>
    </div>
    <!-- <div class="orderOperBtn orderOperBtn8 border-top" v-if="goodsInfo.orderItemStatus === 6">审核中</div> -->
    <div class="orderOperBtn orderOperBtn8 border-top" v-if="goodsInfo.orderItemStatusDesc == '退款中'">退款中</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="goodsInfo.orderItemStatusDesc == '退款成功'">退款成功</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="goodsInfo.orderItemStatusDesc == '退款失败'">退款失败</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else>审核中</div>
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
      title: '',
      list: [],
      imageUrl: config.imageUrl,
      goodsInfo: []
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
        console.log(response.data.body)
        if (response.data.code === 0) {
          this.title = response.data.body.afterSalesTypeDesc
          this.list = response.data.body
          this.goodsInfo = response.data.body.memberOrderGoods[0]
          let type = this.$route.params.type
          if (type === '-1') {
            // console.log(666)
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
  @import "~styles/mixins.styl";
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
  .refundSpeed
    width 100%
    height 500px
    margin-bottom 30px
    box-sizing border-box
    padding 0 50px
    background #fff
    h3
      width 100%
      height 110px
      line-height 110px
      font-size 40px
      margin-bottom 50px
      font-weight bold
      color #262626
    .refundCon
      width 100%
      height 290px
      display flex
      background #F5F5F5
      .refundItem
        flex 1
        height 290px
        box-sizing border-box
        padding-top 120px
        position relative
        overflow hidden
        span
          display block
          width 100%
          text-align center
        .refundState
          font-size 40px
          margin-bottom 10px
          color #CCCCCC
        .refundTime
          font-size 28px
          color #808080
        .hookIcon
          display block
          width 30px
          height 30px
          bgImage('/static/icons/hookGray')
          position absolute
          left 0
          right 0
          top 72px
          margin auto
        .hookIcon.hookGreen
          bgImage('/static/icons/hookGreen')
        .hookIcon.hookActive
          width 50px
          height 50px
          top 62px
          bgImage('/static/icons/hookActive')
        .hookIcon:after
          display block
          content ""
          width 200px
          height 5px
          background #CCCCCC
          position absolute
          left 30px
          top 12px
        .hookIcon:before
          display block
          content ""
          width 200px
          height 5px
          background #CCCCCC
          position absolute
          right 30px
          top 12px
      .refundItem:last-child .hookIcon:after,.refundItem:first-child .hookIcon:before
          display none
      .hookGreen.hookIcon:after,.hookGreen.hookIcon:before
        background #47D955
      .hookActive.hookIcon:after,.hookActive.hookIcon:before
        top 22px
        background #47D955
      .hookActive.hookIcon:after
        left 50px
      .hookActive.hookIcon:before
        right 50px
    .refundItem.active
      .refundState
        color #262626
</style>
