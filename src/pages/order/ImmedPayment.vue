<template>
  <div class="wrapper">
    <search-title :title="title" :oper='false'></search-title>
    <div class="paymentCon">
      <div class="paymentTitle">支付中心</div>
      <div class="paymentOrder">
        <span>订单编号：{{list.orderSn}}</span>
        <span>付款总额：￥ {{list.totalAmount}}</span>
      </div>
      <div class="paymentTitle">请选择支付方式</div>
      <div class="paymentWay">
        <div class="paymentItem clearfix">
          <i class="paymentImg alipayImg"></i>
          <span>支付宝支付</span>
          <i class="redio" :class="readioActive===2?'active':''" @click="redioSelect(2)"></i>
        </div>
        <div class="paymentItem clearfix">
          <i class="paymentImg wechatImg"></i>
          <span>微信支付</span>
          <i class="redio" :class="readioActive===5?'active':''" @click="redioSelect(5)"></i>
        </div>
      </div>
    </div>
    <div class="immedPayment" @click="immedPayment">立即支付
      <!-- <span class="surplusTime">16:50:36</span> -->
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import {payMoney, subOrderDetail} from 'util/netApi'
import {http} from 'util/request'
// import axios from 'axios'
import notice from 'util/notice'
export default {
  data () {
    return {
      title: '支付方式',
      list: [],
      readioActive: ''
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    // 支付页面渲染
    paymentRender () {
      let orderSn = this.$route.params.orderCode
      console.log(orderSn)
      http(subOrderDetail, [orderSn]).then((response) => {
        console.log(response)
        this.list = response.data.body
      }).catch((err) => {
        console.log(err)
      })
    },
    // 选择支付方式
    redioSelect (paymentWay) {
      this.readioActive = paymentWay
    },
    // 立即支付
    immedPayment () {
      if (this.readioActive !== '') {
        let params = {
          orderSn: this.orderCode,
          payment: this.readioActive
        }
        http(payMoney, params).then((response) => {
          console.log(response)
          let data = response.data
          if (data.code === 0) {
            // let list = data.body
            // axios('https://api.mch.weixin.qq.com/pay/unifiedorder', {
            //   appid: list.appid, // 公众账号id
            //   nonce_str: list.noncestr, // 随机字符串
            //   out_trade_no: this.orderCode, // 订单号
            //   total_fee: this.totalNum,
            //   trade_type: 'MWEB' // 交易类型
            // }).then((response) => {
            //   console.log(response)
            // }).catch((err) => {
            //   console.log(err)
            // })
          }
        })
      } else {
        notice.toast('请选择支付方式', 2000, 'warn')
      }
    }
  },
  mounted () {
    this.paymentRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .paymentCon
    width 100%
    background #fff
    .paymentTitle
      width 100%
      height 170px
      line-height 140px
      background #F5F5F5
      font-size 46px
      color #262626
      font-weight bolder
      box-sizing border-box
      padding 30px 50px 0
  .paymentOrder
    width 100%
    box-sizing border-box
    padding 50px
    span
      display block
      width 100%
      font-size 36px
      color #262626
      line-height 66px
  .paymentWay
    width 100%
    box-sizing border-box
    padding 0 50px 0
    background #fff
    .paymentItem
      width 100%
      box-sizing border-box
      padding-top 80px
      .paymentImg
        float left
        width 116px
        height 116px
      .alipayImg
        bgImage('/static/icons/alipay')
      .wechatImg
        bgImage('/static/icons/wechat')
      span
        float left
        height 116px
        line-height 116px
        box-sizing border-box
        padding-left 54px
        font-size 40px
        color #000
      i.redio
        float right
        width 46px
        height 46px
        bgImage('/static/icons/payUnchecked')
        margin-top 40px
      i.redio.active
        bgImage('/static/icons/paySelect')
  .immedPayment
    display block
    width calc(100% - 100px)
    height 148px
    background #F0F0F0
    font-size 46px
    color #BA825A
    margin 40% auto 0
    text-align center
    line-height 120px
    position relative
    .surplusTime
      display block
      width 100%
      height 40px
      line-height 40px
      font-size 30px
      color #BA825A
      position absolute
      left 0
      bottom 15px
</style>
