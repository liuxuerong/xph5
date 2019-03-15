<template>
  <div class="wrapper">
    <search-title title="支付成功" oper="2"></search-title>
    <div class="paymentSuccCon">
      <div class="paymentImg"></div>
      <span class="paymentText">支付成功</span>
      <p class="tip">我们将尽快为安排发货</p>
      <ul class="infoPay" v-if="immedPaymentMony">
        <li>
          <span class="name">订单号</span>
          <span class="info">{{immedPaymentMony.orderSn}}</span>
        </li>
        <li>
           <span class="name">支付方式</span>
          <span class="info">{{immedPaymentMony.payWay}}</span>
        </li>
        <li>
           <span class="name">收件人</span>
          <span class="info">{{immedPaymentMony.deliveryPeople}}</span>
        </li>
        <li>
           <span class="name">付款金额</span>
          <span class="info price">￥{{immedPaymentMony.needPayAmount}}</span>
        </li>
      </ul>
      <div class="paymentBtn clearfix" v-if="immedPaymentMony">
        <router-link class="pageJump" :to="'/orderDetails/'+immedPaymentMony.orderSn" replace>查看订单</router-link>
        <router-link class="pageJump" to="/find" replace>返回首页</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import SearchTitle from './ComOrderSearchTitle'
import {
  storage
} from 'util/storage'
import {
  immedPaymentMony
} from 'util/const.js'
export default {
  data () {
    return {
      immedPaymentMony: null
    }
  },
  components: {
    SearchTitle
  },
  methods: {
    immedPaymentRender () {
      this.immedPaymentMony = storage.getLocalStorage(immedPaymentMony)
    }
  },
  mounted () {
    this.immedPaymentRender()
  }
}
</script>
<style lang="stylus" scoped>
  @import "~styles/mixins.styl";
  .wrapper
    width 100%
    min-height 100%
    background-color #f5f5f5
    padding 252px 50px
    .paymentSuccCon
      width 100%
      padding-top 150px
      background rgba(255,255,255,1)
      border-radius 20px
      .paymentImg
        width 280px
        height 280px
        margin 0 auto 50px
        bgImage('../../images/paymentSucc')
    .paymentText,p
      display block
      width 100%
      text-align center
      margin-bottom 110px
    .paymentText
      font-size 50px
      margin-bottom 20px
      font-weight 600
      color #333333
    .tip
      color #666666
      font-size 36px
      margin-bottom 150px
    .paymentNum
      font-size 46px
      color #262626
  .paymentBtn
    height 383px
    display flex
    justify-content space-around
    .pageJump
      float left
      height 120px
      line-height 120px
      width 320px
      font-size 46px
      color #666
      margin-top 130px
      text-align center
      border-radius 60px
      border 2px solid #999999
    .pageJump:last-child
      color #BA825A
      border 2px solid #BA825A
.infoPay
  padding 0 50px 100px
  border-bottom 2px dashed #E6E6E6
  li
    line-height 120px
    font-size 40px
    display flex
    align-items center
    justify-content space-between
    .name
      color #999
    .price
      font-size 56px
      font-weight 600

</style>
