<template>
  <div class="wrapper">
    <search-title :title="title" :oper='false'></search-title>
    <div class="paymentCon">
      <div class="paymentTitle">支付中心</div>
      <div class="paymentOrder">
        <span>订单编号：{{list.orderSn}}</span>
        <span>付款总额：￥ {{list.needPayAmount}}</span>
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
        let orderSn = this.$route.params.orderCode
        let params = {
          orderSn: orderSn,
          payment: this.readioActive
        }
        console.log(params)
        http(payMoney, params).then((response) => {
          console.log(response)
          // 提交接口成功
          if (response.data.code === 0) {
            console.log(this.readioActive)
            // 支付宝
            if (this.readioActive === 2) {
              let dom = document.createElement('div')
              dom.innerHTML = response.data.body
              document.body.appendChild(dom)
              document.forms[0].submit()
            } else if (this.readioActive === 5) {
              // let weiXin = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
              // 'timeStamp': data.body.timeStamp.toString(),
              // 'nonceStr': data.body.nonceStr,
              // 'package': data.body.package,
              // 'signType': data.body.signType,
              // 'paySign': data.body.paySign,
              // let weixinData = {
              //   appid: response.data.body.appid,
              //   mch_id: response.data.body.partnerid,
              //   sub_mch_id: response.data.body.prepayid,
              //   nonce_str: response.data.body.noncestr,
              //   sign: response.data.body.sign,
              //   body: '深圳市星品优汇电子商务有限公司支付',
              //   out_trade_no: this.list.orderSn,
              //   total_fee: this.list.needPayAmount,
              //   spbill_create_ip: '',
              //   notify_url: '',
              //   trade_type: 'MWEB'
              // }

              // WeixinJSBridge.invoke(
              //   'getBrandWCPayRequest', {
              //     'appId': 'wx2421b1c4370ec43b', // 公众号名称，由商户传入
              //     'timeStamp': '1395712654', // 时间戳，自1970年以来的秒数
              //     'nonceStr': 'e61463f8efa94090b1f366cccfbbb444', // 随机串
              //     'package': 'prepay_id=u802345jgfjsdfgsdg888',
              //     'signType': 'MD5', // 微信签名方式：
              //     'paySign': '70EA570631E4BB79628FBCA90534C63FF7FADD89' // 微信签名
              //   }
              // )

              // let xml = '<xml><appid>' + response.data.body.appid + '</appid><body>深圳市星品优汇电子商务有限公司支付</body><mch_id>' + response.data.body.partnerid + '</mch_id><sign>' + response.data.body.sign + '</sign></xml>'
              // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + response.data.body.appid + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
              window.location.href = 'weixin://wap/pay?appid=' + response.data.body.appid + '&noncestr=' + response.data.body.noncestr + '&package=' + response.data.body.package + '&prepayid=' + response.data.body.prepayid + '&sign=' + response.data.body.sign + '&timestamp=' + response.data.body.timestamp
            }
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
