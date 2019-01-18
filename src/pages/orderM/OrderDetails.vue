<template>
  <div class="wrapper">
    <common-head-link title="订单详情" />
    <div class="orderDetatilCon" v-if="orderData">
      <div class="bgTop">
        <span class="statusDesc">
          {{orderData.statusDesc}}
        </span>
        <span class="reason" v-if="orderData.status===6">{{orderData.reasonDesc}}</span>
        <span class="time" v-if="orderData.status===1">距自动关闭剩<i>{{remainingTime.minutes}}</i>分<i>{{remainingTime.seconds}}</i>秒</span>
      </div>
      <div class="orderInfo">
        <div class="orderProvide wrap">
          <router-link class="cellLink" :to="`/watchLogistics/${orderSn}`" v-if="orderData.status===5">
            <div class="text addAddress">订单签收成功，感谢您对我们无限的订单签收成功，感谢您对我们无限的...</div>
          </router-link>
          <router-link class="cellLink" :to="`/watchLogistics/${orderSn}`" v-if="orderData.status===3||orderData.status===4">
            <div class="text addAddress">{{orderData.newExpressInfo}}</div>
          </router-link>
          <span class="orderName">{{orderData.deliveryPeople}}&nbsp;&nbsp;&nbsp;&nbsp;{{orderData.deliveryPhone}}</span>
          <span class="orderAddress">{{orderData.deliveryAddr}}</span>
        </div>
        <div class="wrap goods">
          <order-item v-if="orderData.memberOrderGoods" v-for="goods in orderData.memberOrderGoods" :key="goods.goodsItemId" :pricesData="goods" :isDetails="true" :status="orderData.status" @afterSale="afterSale"></order-item>
          <ul class="priceItem">
            <li class="border-top">
              <span class="name">商品总额</span><span class="price">￥{{orderData.totalAmount}}</span>
            </li>
            <li>
              <span class="name">优惠</span><span class="price">￥{{orderData.offerAmount}}</span>
            </li>
            <li>
              <span class="name">运费</span><span class="price">￥{{orderData.shippingAmount}}</span>
            </li>
            <li class="all border-top">
              <span class="name"> 共<b>{{orderData.memberOrderGoods.length}}</b>件商品</span><span class="price">实付：￥{{orderData.needPayAmount}}</span>
            </li>
          </ul>
        </div>
        <div class="wrap">
          <div class="title">
            <h4>发票信息</h4>
            <!-- <div class="btn" v-if="orderData.invoice">查看发票</div> -->
            <router-link to="/invoiceApply" class="btn" v-if="orderData.invoiceStatus==4">申请开票</router-link>
             <div class="btn" @click="invoiceToast" v-if="orderData.invoiceStatus==5">申请开票</div>
          </div>
          <ul class="infoItem" v-if="orderData.invoice">
            <li><span class="name">发票类型：</span><span class="content">{{orderData.invoice.invoiceStatus==1?'电子普通发票':'增值税专用发票'}}</span>
            </li>
            <li> <span class="name">发票抬头：</span><span class="content">{{orderData.invoice.name||'个人'}}</span></li>
            <li> <span class="name">发票内容：</span><span class="content">商品明细</span></li>
            <li> <span class="name" v-if="orderData.invoice.idCode">纳税人识别号：</span><span class="content">{{orderData.invoice.idCode}}</span></li>
          </ul>
          <ul class="infoItem" v-else>
            <li>
              <span class="name">发票类型：</span><span class="content">不开发票</span>
            </li>
          </ul>
        </div>
        <div class="wrap" v-if="orderData.desc&&orderData.desc!==''">
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
            <li> <span class="name" v-if="orderData.paymentDesc&&orderData.paymentDesc!=''">支付方式：</span><span class="content">{{orderData.paymentDesc}}</span></li>
            <li> <span class="name">下单时间：</span><span class="content">{{fromatTime(orderData.createTime)}}</span></li>
            <li> <span class="name" v-if="orderData.payTime">付款时间：</span><span class="content">{{fromatTime(orderData.payTime)}}</span></li>
            <li> <span class="name" v-if="orderData.deliverTime">发货时间：</span><span class="content">{{fromatTime(orderData.deliverTime)}}</span></li>
            <li> <span class="name" v-if="orderData.finishTime">成交时间：</span><span class="content">{{fromatTime(orderData.finishTime)}}</span></li>
            <li> <span class="name" v-if="orderData.integral&&(orderData.status==7||orderData.status==8)">获取积分：</span><span class="content">{{orderData.integral}}</span></li>
          </ul>
        </div>
      </div>
      <!--
              1: 待支付
              2: 待发货
              3: 待收货
              4: 待评价
              5: 交易成功
              6: 交易关闭
              7: 订单完成-->
      <div class="orderOperBtn">
        <span class="gray" v-if="orderData.status==1" @click="openReason">取消订单</span>
        <span class="glod" v-if="orderData.status==1" @click="pay(orderData.orderSn)">去支付</span>
        <span class="gray" v-if="orderData.status==3||orderData.status==4||orderData.status==5||orderData.status==7" @click="watchLogistics">查看物流</span>
        <span class="gray" v-if="orderData.status==4||orderData.status==5||orderData.status==6||orderData.status==7" @click="deleteSure">删除订单</span>
        <span class="glod" v-if="orderData.status==4" @click="immedEvaluate()">评价</span>
        <span class="gray" v-if="orderData.status==3&&delayState!=0" @click="delay">延长收货</span>
        <span class="glod" v-if="orderData.status==3" @click="confirmGoods(orderData.orderSn)">确认收货</span>
        <span class="gray" v-if="orderData.status==2||orderData.status==6" @click="customerService">联系客服</span>
      </div>
    </div>
    <!-- 取消订单 -->
     <mt-popup position="bottom" v-model="reasonVisible" @touchmove.prevent>
      <div class="popWrap">
        <div class="title">
          取消订单原因
          <div class="close" @click="closeReason">×</div>
        </div>
        <div class="reasonTip">
          <i>温馨提示：</i>订单取消，无法恢复，特价等优惠一并取消
        </div>
        <ul>
          <li>
            <label for="reason1">
              <div class="top">
                <h3 class="name">不想买了</h3>
                <span class="radioWrap">
                  <icon :type="reasonDesc==='不想买了'?'success':'circle'"></icon>
                  <input type="radio" value="不想买了" v-model="reasonDesc" id="reason1">
                </span>
              </div>
            </label>
          </li>
          <li>
            <label for="reason2">
              <div class="top">
                <h3 class="name">信息填写错误，重新拍</h3>
                <span class="radioWrap">
                  <icon :type="reasonDesc==='信息填写错误，重新拍'?'success':'circle'"></icon>
                  <input type="radio" value="信息填写错误，重新拍" v-model="reasonDesc" id="reason2">
                </span>
              </div>
            </label>
          </li>
           <li >
            <label for="reason3">
              <div class="top">
                <h3 class="name">其他原因</h3>
                <span class="radioWrap">
                  <icon :type="reasonDesc==='其他原因'?'success':'circle'"></icon>
                  <input type="radio" value="其他原因" v-model="reasonDesc" id="reason3">
                </span>
              </div>
            </label>
          </li>
        </ul>
        <div class="bottomClose" @click="cancelOrder(orderData.orderSn)">
          提交
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import OrderItem from './components/OrderItem'
import {
  orderDetails,
  cancelOrder,
  confirmGoods,
  refundOrderDetail,
  deleteOrder,
  customerService,
  delayGoods
} from 'util/netApi'
import {
  http
} from 'util/request'
import CommonHeadLink from 'common/commonHeader/CommonHeadLink'
import { config } from 'util/config' // 图片路径
import notice from 'util/notice.js'
import {
  Toast,
  Popup
} from 'mint-ui'
import {
  storage
} from 'util/storage'
import {
  aftersale,
  orderSn
} from 'util/const'
import {
  Icon
} from 'vux'
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
      orderSn: '',
      remainingTime: null,
      timer: null,
      reasonVisible: false,
      reasonDesc: '不想买了',
      surplus: 0,
      none: false,
      delayState: 0
    }
  },
  components: {
    CommonHeadLink,
    OrderItem,
    Icon,
    'mt-popup': Popup
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'orderDetails') {
        this.orderDetailRender()
      }
    }
    // 倒计时结束后重新渲染
    // surplus (v) {
    //   if (v > 1) {
    //     if (this.none) {
    //       this.orderDetailRender()
    //     }
    //   }
    // }
  },

  methods: {
    // 订单详情页面渲染
    orderDetailRender () {
      let orderCode = this.$route.params.orderSn
      storage.setLocalStorage(orderSn, orderCode)
      this.orderSn = orderCode
      http(orderDetails, [orderCode]).then((res) => {
        this.orderData = res.data.body
        this.delayState = res.data.body.delayState
        let _this = this
        _this.confirmTime = res.data.body.allowPayTimeSecond
        _this.remainingTime = _this.formatDuring(_this.confirmTime)
        if (_this.confirmTime > 0) {
          this.timer = setInterval(() => {
            _this.confirmTime = _this.confirmTime - 1000
            _this.remainingTime = _this.formatDuring(_this.confirmTime)
            if (_this.confirmTime < 0) {
              _this.orderDetailRender()
              clearInterval(this.timer)
            }
          }, 1000)
        } else {
          clearInterval(this.timer)
        }
      })
    },
    // 时间去'T'
    fromatTime (time) {
      if (time) return time.split('T').join(' ')
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
        this.none = true
        return {
          minutes: '00',
          seconds: '00'
        }
      }
    },
    // 去支付
    pay (orderSn) {
      this.$router.push('/immedPayment/' + orderSn)
    },
    // 立即评价
    immedEvaluate () {
      this.$router.push('/immedEvaluate/' + this.orderSn)
    },
    // 联系客服
    customerService () {
      window.location.href = customerService
    },
    // 确认删除弹窗
    deleteSure () {
      notice.confirm('确认删除订单？', '删除订单后无法恢复，请谨慎操作', this.deleteOrder)
    },
    // 删除订单
    deleteOrder () {
      http(deleteOrder, [this.orderSn]).then(res => {
        if (res.data.code === 0) {
          this.$router.push('/orderList/-1')
        }
      })
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
    // 延长收货
    delay () {
      if (this.delayState === 1) {
        Toast({
          message: '距离结束时间3天才可以申请延长收货哦',
          position: 'center',
          duration: 2000
        })
      } else {
        let _this = this
        notice.confirm('确认延长收货时间？', '每笔订单只能延长一次哦', function () {
          http(delayGoods, this.orderSn).then((response) => {
            if (response.data.body === true) {
              Toast({
                message: '延长收货成功',
                position: 'center',
                duration: 2000
              })
              setTimeout(() => {
                _this.orderDetailRender()
              }, 2000)
            }
          })
        })
      }
    },
    // 弹窗显示
    openReason () {
      this.reasonVisible = true
    },
    // 关闭弹窗
    closeReason () {
      this.reasonVisible = false
    },
    // 申请开票提示
    invoiceToast () {
      Toast({
        message: '抱歉开票时间已超过30天',
        position: 'center',
        duration: 2000
      })
    },
    // 取消订单
    cancelOrder (orderSn) {
      let params = {
        orderSn,
        reasonDesc: this.reasonDesc
      }
      http(cancelOrder, params).then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          this.closeReason()
          Toast({
            message: '取消订单成功',
            position: 'center',
            duration: 2000
          })
          setTimeout(() => {
            this.orderDetailRender()
          }, 2000)
        }
      })
    },
    // 立即付款
    immedPayment (orderSn) {
      this.$router.push('/immedPayment/' + orderSn)
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
    // 查看物流
    watchLogistics () {
      this.$router.push(`/watchLogistics/${this.orderSn}`)
    },
    // 申请售后 type 1:申请售后  2：直接退款
    afterSale (pricesData, orderItemId, type) {
      pricesData.orderSn = this.orderSn
      storage.setLocalStorage(aftersale, pricesData)
      if (type == 1) {
        if (this.orderData.status == 7) {
          this.$router.push(`/applyAfterSales/${this.orderData.status}/${orderItemId}/3`)
        } else {
          this.$router.push(`/afterSaleSelect/${this.orderData.status}/${orderItemId}`)
        }
      } else {
        this.$router.push(`/applyAfterSales/${this.orderData.status}/${orderItemId}/1`)
      }
    }
  },
  mounted () {
    this.orderDetailRender()
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
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
    background url('/static/images/statusDescBg.png') no-repeat center center /100% 100%
    display flex
    .statusDesc
      font-size 66px
      color #FFFFFF
      line-height 227px
      padding-left 108px
      padding-right 260px
    .time
      font-size 40px
      line-height 227px
      color #FEFEFE
      flex 1
      text-align right
      padding-right 50px
      i
        color #C39568
    .reason
      color #FEFEFE
      font-size 40px
      line-height 227px
      flex 1
      text-align right
      padding-right 50px
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
    .border-top
      padding-top 20px
    .all
      padding-top 0px
      margin-top 20px
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
    .tip
      color #C5A086
      font-size 36px
      line-height 50px
      padding-bottom 40px
      i
        width 32px
        height 32px
        border-radius 50%
        display inline-block
        border 2px solid #C5A086
        line-height 30px
        text-align center
        font-size 30px
        margin-right 20px
  .infoContent
    color #999
    padding-bottom 40px
.popWrap
  .bottomClose
    height 250px
    line-height 250px
    background-color #F0F0F0
    font-size 50px
    color #BA825A
    text-align center
  .title
    height 190px
    line-height 190px
    color #333333
    font-size 56px
    font-weight 600
    text-align center
    position relative
    .close
      position absolute
      right 0
      top 0
      color #999999
      font-weight normal
      width 100px
      height 190px
  .reasonTip
    font-size 40px
    padding-left 52px
    color #666666
    margin-bottom 40px
    i
      color #333
  ul
    padding 0 50px
    li
      line-height 148px
      .top
        display flex
        justify-content space-between
        align-items center
      label
        display inline-block
        width 100%
        height 100%
      .name
        font-size 46px
        color #333333
        line-height 148px
        display inline-block
        opacity 1
        font-weight 600
  .radioWrap
    position relative
    width 80px
    height 80px
    overflow hidden
    display inline-block
    input
      position absolute
      top 0
      left 0
      z-index 999999
      opacity 0
      width 60px
      height 60px

</style>
<style lang="stylus">
.wrapper
  .mint-popup
    width 100%
    z-index 999999 !important
.radioWrap
  .weui-icon
    width 60px
    height 60px
    font-size 50px
    line-height 70px
    position absolute
    top 0
    left 0
  .weui-icon-success
    color #BA825A
</style>
