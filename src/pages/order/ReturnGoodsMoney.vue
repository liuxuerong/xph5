<template>
  <div class="wrapper">
    <search-title :title="title"></search-title>
    <div class="orderDetatilCon" v-if="list">
      <div class="orderUserInfo">
        <div class="orderCode border-bottom">订单编号：{{list.orderSn}}</div>
        <div class="orderProvide" v-if="list.shippingMethod === '2'">
          <span class="orderName">收货人：{{list.delivery.receiverName}}   {{list.delivery.phone}}</span>
          <span class="orderAddress">收货地址：{{list.delivery.province}}{{list.delivery.city}}{{list.delivery.area}}{{list.delivery.detailedAddr}}</span>
        </div>
      </div>
      <!-- 填写物流单号 -->
      <router-link to="/returnLogistics" class="returnLogistics" v-if="afterSales && afterSales.status == 2">
        <span class="logisticsName" v-if="logisticsName">{{logisticsName}}</span>
        <span v-else class="logisticsName">填写物流单号</span>
        <i class="softSetIcon"></i>
        <span class="logisticsNum" v-if="logisticsNum">{{logisticsNum}}</span>
        <span class="logisticsNum" v-else>请填写物流单号</span>
      </router-link>
      <!-- 退款进度详情 -->
      <div class="refundSpeed" v-if="afterSales && (afterSales.status == 4 || afterSales.status == 5 || afterSales.status == 6)">
        <h3 class="border-bottom">退款详情</h3>
        <div class="refundCon">
          <div class="refundItem active">
            <i class="hookIcon hookGreen"></i>
            <span class="refundState">卖家退款</span>
            <span class="refundTime">{{afterSales.createTime.split('T')[0]}} {{afterSales.createTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem active">
            <i class="hookIcon" :class="afterSales.status == 4?'hookActive':'hookGreen'"></i>
            <span class="refundState">退款中</span>
            <span class="refundTime">{{afterSales.receiptsTime.split('T')[0]}} {{afterSales.receiptsTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem" v-if="afterSales.status == 6" :class="afterSales.status == 6?'active':''">
            <i class="hookIcon" :class="afterSales.status == 6?'hookActive':''"></i>
            <span class="refundState">退款失败</span>
            <span class="refundTime" v-if="afterSales.refundTime">{{afterSales.refundTime.split('T')[0]}} {{afterSales.refundTime.split('T')[1]}}</span>
          </div>
          <div class="refundItem" v-else :class="afterSales.status == 5?'active':''">
            <i class="hookIcon" :class="afterSales.status == 5?'hookActive':''"></i>
            <span class="refundState">退款成功</span>
            <span class="refundTime" v-if="afterSales.refundTime">{{afterSales.refundTime.split('T')[0]}} {{afterSales.refundTime.split('T')[1]}}</span>
          </div>
        </div>
      </div>
      <div class="orderGoodsInfo" v-if="afterSales">
        <div class="returnAddress" v-if="afterSales.status == 2">
          <span>寄回地址：{{afterSales.returnAddress}}</span>
          <span>联系电话：{{afterSales.returnMobile}}</span>
        </div>
        <div class="returnTips" v-if="afterSales.status && afterSales.status == 2">
          <span>温馨提示：</span>寄回物品时应不影响我司进行二次销售，即商品及包装保持出售时原状且配件齐全(含发票)，方可享受全额退货服务。若您对我们退换货政策还有任何疑问，欢迎联系我们在线客服。
        </div>
        <div class="orderGoods clearfix" v-for="(item,index) in list.memberOrderGoods" :key="index">
          <img v-if="item.pic !=''" :src="imageUrl+item.pic+imageAfterUrl" alt="">
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
          <span class="goodsDiscount">优惠金额<p>-￥ {{list.offerAmount}}</p></span>
          <span class="goodsDiscount">运费<p>￥ {{list.shippingAmount}}</p></span>
        </div>
        <div class="orderTotalPrice">
          实退：￥{{list.memberOrderGoods[0].actualPrice}}
        </div>
      </div>
      <!-- 物流信息 -->
      <div class="returnLogistics" v-if="afterSales && (afterSales.status == 3 || afterSales.status == 4)">
        <span class="logisticsName">物流单号</span>
        <span class="logisticsNum">{{afterSales.logisticsName}}&nbsp;&nbsp;&nbsp;&nbsp;{{afterSales.logisticsNo}}</span>
      </div>
      <ul class="orderOther">
        <li v-if="list.shippingMethod === '1'">配送方式：上门自提</li>
        <li v-if="list.shippingMethod === '2'">配送方式：快递配送</li>
        <li v-if="list.createTime">下单时间：{{list.createTime.split('T')[0]}}&nbsp;&nbsp;{{list.createTime.split('T')[1]}}</li>
        <li v-if="list.invoiceDesc === undefined || list.invoiceDesc === ''">发票：无发票</li>
        <li v-else>发票：{{list.invoiceDesc}}</li>
        <li v-if="list.desc === undefined || list.desc === ''">备注：无备注</li>
        <li v-else>备注：{{list.desc}}</li>
      </ul>
    </div>
    <div class="orderOperBtn orderOperBtn9 border-top" v-if="afterSales && afterSales.status == 2" @click="returnSubmit(afterSales.id)">提交</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="afterSales && afterSales.status == 1">审核中</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="afterSales && afterSales.status == 3">等待卖家收货</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="afterSales && afterSales.status == 4">退款中</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="afterSales && afterSales.status == 5">退款成功</div>
    <div class="orderOperBtn orderOperBtn8 border-top" v-else-if="afterSales && afterSales.status == 6">退款失败</div>
  </div>
</template>
<script>
import { refundOrderDetail, submitLogic } from 'util/netApi'
import {Toast} from 'mint-ui'
import { http } from 'util/request'
import SearchTitle from './ComOrderSearchTitle'
import { config } from 'util/config' // 图片路径
import {storage} from 'util/storage'
import {retrunLogistics} from 'util/const.js'
export default {
  data () {
    return {
      title: '退款订单',
      list: null,
      afterSales: '',
      imageUrl: config.imageUrl,
      imageAfterUrl: config.imageAfterUrl,
      goodsInfo: [],
      logisticsName: '',
      logisticsNum: ''
    }
  },
  components: {
    SearchTitle
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'returnGoodsMoney') {
        this.afterSaleRender()
      }
    }
  },
  methods: {
    // 页面初始化数据
    afterSaleRender () {
      let orderId = this.$route.params.orderId
      http(refundOrderDetail, [orderId]).then((response) => {
        if (response.data.code === 0) {
          this.title = response.data.body.afterSalesTypeDesc
          this.list = response.data.body
          this.afterSales = response.data.body.afterSales
          this.goodsInfo = response.data.body.memberOrderGoods[0]
        }
      })
      let logistics = storage.getLocalStorage(retrunLogistics)
      if (logistics) {
        this.logisticsName = logistics.logisticsName
        this.logisticsNum = logistics.logisticsNum
      }
    },
    // 退款提交
    returnSubmit (orderId) {
      let _this = this
      if (this.logisticsName && this.logisticsNum) {
        let params = {
          afterSalesId: orderId, // 售后订单id
          logisticsName: this.logisticsName, // 物流公司名称
          logisticsNo: this.logisticsNum // 物流单号
        }
        http(submitLogic, params).then((response) => {
          if (response.data.code === 0) {
            Toast({
              message: '提交成功',
              position: 'bottom',
              duration: 2000
            })
            storage.delLocalStorage(retrunLogistics)
            _this.$router.go(0)
          }
        })
      } else {
        Toast({
          message: '请选择物流',
          position: 'bottom',
          duration: 2000
        })
      }
    }
  },
  mounted () {
    this.afterSaleRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    min-height 100%
    padding-top 130px
    padding-bottom 148px
    background #F5F5F5
  .orderDetatilCon
    width 100%
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
  .orderOperBtn9
    text-align center
    font-size 46px
    background #F0F0F0
    color #BA825A
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
  .returnLogistics
    display block
    width 100%
    height 148px
    line-height 148px
    margin-bottom 30px
    box-sizing border-box
    padding 0 50px
    background #fff
    .logisticsName
      float left
      width auto
      font-size 40px
      color #262626
    .logisticsNum
      float right
      font-size 40px
      color #999999
    .logisticsNum.active
      color #262626
    .softSetIcon
        float right
        width 24px
        height 45px
        margin-left 30px
        margin-top 50px
        bgImage('/static/icons/enterNextGray')
  .returnAddress
    width 100%
    box-sizing border-box
    padding 50px 50px 20px
    span
      width 100%
      display block
      line-height 60px
      font-size 40px
      color #808080
      margin-bottom 30px
  .returnTips
    width 100%
    height 280px
    box-sizing border-box
    padding 50px
    line-height 60px
    font-size 36px
    color #808080
    background #f5f5f5
    span
      color #BA8258
</style>
