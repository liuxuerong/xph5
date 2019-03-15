<template>
  <div class="wrapper">
    <common-nav-no-memory :title="title" :routeName="routeName"/>
    <div class="paymentCon">
      <div class="paymentTitle">支付中心</div>
      <div class="paymentOrder" v-if="list">
        <span class="needPay">需支付：<i>￥ {{list.needPayAmount.toFixed(2)}}</i></span>
        <span class="time">剩余时间: <i>{{remainingTime}}</i> </span>
      </div>
      <div class="paymentWay">
        <div class="paymentItem clearfix">
          <i class="paymentImg alipayImg"></i>
          <span>支付宝支付</span>
          <i class="redio" :class="readioActive===2?'active':''" @click="redioSelect(2)"></i>
        </div>
        <!-- <div class="paymentItem clearfix">
          <i class="paymentImg wechatImg"></i>
          <span>微信支付</span>
          <i class="redio" :class="readioActive===5?'active':''" @click="redioSelect(5)"></i>
        </div> -->
      </div>
    </div>
    <div class="immedPayment" @click="immedPayment">立即支付
    </div>
  </div>
</template>
<script>
import {
  storage
} from 'util/storage'
import {
  immedPaymentMony
} from 'util/const.js'
import CommonNavNoMemory from 'common/commonHeader/CommonNavNoMemory'
import {payMoney, orderDetails} from 'util/netApi'
import {http} from 'util/request'
import notice from 'util/notice'
import { Confirm } from 'vux'
export default {
  data () {
    return {
      title: '收银台',
      list: null,
      readioActive: '',
      confirmTime: '',
      remainingTime: '',
      routeName: '/orderList/-1'
    }
  },
  components: {
    CommonNavNoMemory,
    Confirm
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  beforeRouteLeave (to, from, next) {
    notice.confirm2('确认离开收银台', `离开后订单在${this.remainingTime}后将取消`, () => {
      // window.location.href = '/#/orderList/-1'
      // window.location.refresh
      next()
    }, '继续支付', '确认离开')
    clearInterval(this.timer)
  },
  methods: {
    // 支付页面渲染
    paymentRender () {
      let orderSn = this.$route.params.orderCode
      http(orderDetails, [orderSn]).then((response) => {
        console.log(response)
        this.list = response.data.body
        let _this = this
        _this.confirmTime = response.data.body.allowPayTimeSecond
        _this.remainingTime = _this.formatDuring(_this.confirmTime)
        this.timer = setInterval(() => {
          _this.confirmTime = _this.confirmTime - 1000
          _this.remainingTime = _this.formatDuring(_this.confirmTime)
          if (_this.confirmTime < 0) {
            _this.orderDetailRender()
            this.$router.go('/orderList/-1')
          }
        }, 1000)
      }).catch((err) => {
        console.log(err)
      })
    },
    // 时间格式化
    formatDuring (mss) {
      if (mss > 0) {
        let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = parseInt(mss % (1000 * 60) / 1000)
        minutes = minutes > 9 ? minutes : '0' + minutes
        seconds = seconds > 9 ? seconds : '0' + seconds
        return `${minutes}:${seconds}`
      } else {
        return `00:00`
      }
    },
    // 选择支付方式
    redioSelect (paymentWay) {
      this.readioActive = paymentWay
    },
    // 立即支付
    immedPayment () {
      if (this.remainingTime === '00:00') {
        notice.alert('继续支付')
        return
      }
      if (this.readioActive !== '') {
        let orderSn = this.$route.params.orderCode
        let params = {
          orderSn: orderSn,
          payment: this.readioActive
        }
        http(payMoney, params).then((response) => {
          // 提交接口成功
          if (response.data.code === 0) {
            // 支付宝
            let obj = {
              needPayAmount: this.list.needPayAmount,
              orderSn: this.list.orderSn,
              deliveryPeople: this.list.deliveryPeople
            }
            if (this.readioActive === 2) {
              obj = Object.assign(obj, {
                payWay: '支付宝'
              })
              let dom = document.createElement('div')
              dom.innerHTML = response.data.body
              document.body.appendChild(dom)
              document.forms[0].submit()
            } else if (this.readioActive === 5) {
              obj = Object.assign(obj, {
                payWay: '微信'
              })
            }
            storage.setLocalStorage(immedPaymentMony, obj)
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
  .wrapper
    min-height 100%
    background #F5F5F5
    padding-top 120px
  .paymentCon
    width 100%
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
    padding 50px
    display flex
    justify-content space-between
    align-items center
    .needPay
      font-size 46px
      color #333
      vertical-align middle
      display inline-block
      i
        font-size 76px
        font-weight bold
    .time
      font-size 36px
      color #999
      i
        color #BA825A
    span
      display block
      font-size 36px
      color #262626
      line-height 66px
  .paymentWay
    width 100%
    padding 50px
    background #fff
    .paymentItem
      width 100%
      padding 50px 0
      .paymentImg
        float left
        width 116px
        height 116px
      .alipayImg
        bgImage('../../icons/alipay')
      .wechatImg
        bgImage('../../icons/wechat')
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
        width 60px
        height 60px
        bgImage('../../icons/payUnchecked')
        margin-top 20px
      i.redio.active
        bgImage('../../icons/paySelect')
  .immedPayment
    display block
    width calc(100% - 100px)
    height 148px
    background #FFFFFF
    font-size 46px
    color #BA825A
    text-align center
    line-height 120px
    position fixed
    bottom 100px
    left 50px
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
